import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot} from './config.mjs';
import {markerFreeTranscript} from './marker-free-core.mjs';

const command=process.argv[2];
if(!['backup','apply','verify'].includes(command)||process.argv.length!==3)throw Error('Use backup, apply, or verify.');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(process.env.SUPABASE_URL).hostname)||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('This operation requires local Supabase on loopback.');
const backupDir=path.join(runRoot,'backups','sectioned-v1');
const versionKey='marker-free-v1';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const tables=[
 ['conversations','id'],
 ['conversation_section_sets','conversation_id'],
 ['conversation_sections','conversation_id,turn_number,section_number'],
 ['conversation_section_states','conversation_id,turn_id,state_key'],
 ['assignments','id'],
 ['annotation_revisions','assignment_id,revision'],
 ['rubric_versions','hash'],
];
async function exportTable(db,table,order){
 const rows=[];
 for(let offset=0;;offset+=500){
  const page=(await db.query(`select to_jsonb(t) as row from public.${table} t order by ${order} limit 500 offset $1`,[offset])).rows.map(item=>item.row);
  rows.push(...page);if(page.length<500)break;
 }
 return rows;
}
async function readBackup(){
 const manifest=JSON.parse(await fsp.readFile(path.join(backupDir,'manifest.json'),'utf8'));
 if(manifest.version!=='sectioned-v1'||manifest.conversations!==1638)throw Error('Sectioned backup manifest is incomplete');
 const result={manifest};
 for(const [table] of tables){
  const bytes=await fsp.readFile(path.join(backupDir,`${table}.jsonl`));
  if(sha(bytes)!==manifest.files[table].sha256)throw Error(`Backup checksum differs: ${table}`);
  const rows=bytes.toString('utf8').trimEnd().split('\n').filter(Boolean).map(line=>JSON.parse(line));
  if(rows.length!==manifest.files[table].rows)throw Error(`Backup count differs: ${table}`);
  result[table]=rows;
 }
 return result;
}
function validateSectioned(data){
 const byId=new Map(data.conversations.map(c=>[c.id,c]));
 assert.equal(byId.size,1638);
 assert.equal(data.conversation_section_sets.length,1638);
 assert.equal(data.conversation_sections.length,25743);
 const covered=new Set();
 for(const section of data.conversation_sections){
  const conversation=byId.get(section.conversation_id),turn=conversation?.transcript?.messages?.find(item=>item.turn_id===section.turn_id);
  if(!turn||turn.speaker!=='tutor'||turn.text.slice(section.start,section.end)!==section.quote)throw Error(`Section quote differs from source: ${section.conversation_id}/${section.section_id}`);
  covered.add(section.conversation_id);
 }
 assert.equal(covered.size,1638);
 for(const conversation of data.conversations)markerFreeTranscript(conversation.transcript);
}
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
try{
 if(command==='backup'){
  if(fs.existsSync(backupDir))throw Error(`Backup already exists: ${backupDir}`);
  await db.query('begin isolation level repeatable read read only');
  const snapshot={};
  try{for(const [table,order] of tables)snapshot[table]=await exportTable(db,table,order);validateSectioned(snapshot);await db.query('commit');}
  catch(error){await db.query('rollback');throw error;}
  const temp=`${backupDir}.building-${process.pid}`;await fsp.mkdir(temp,{recursive:true});
  const files={};
  for(const [table] of tables){
   const bytes=Buffer.from(snapshot[table].map(row=>JSON.stringify(row)).join('\n')+'\n');
   await fsp.writeFile(path.join(temp,`${table}.jsonl`),bytes);files[table]={rows:snapshot[table].length,sha256:sha(bytes)};
  }
  const manifest={version:'sectioned-v1',created_at:new Date().toISOString(),source:'local-supabase',conversations:1638,section_sets:1638,sections:25743,files};
  await fsp.writeFile(path.join(temp,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  await fsp.rename(temp,backupDir);
  console.log(JSON.stringify({backup:backupDir,conversations:manifest.conversations,sections:manifest.sections}));
 }else{
  const backup=await readBackup();validateSectioned(backup);
  const expected=new Map(backup.conversations.map(row=>[row.id,sha(JSON.stringify(row.transcript))]));
  await db.query('begin isolation level repeatable read');
  try{
   await db.query('lock table public.conversations in share row exclusive mode');
   const current=await exportTable(db,'conversations','id');
   if(current.length!==expected.size||current.some(row=>expected.get(row.id)!==sha(JSON.stringify(row.transcript))))throw Error('Local conversation transcripts changed since the sectioned backup');
   for(const [table,order] of tables.slice(1)){
    const rows=await exportTable(db,table,order);
    if(JSON.stringify(rows)!==JSON.stringify(backup[table]))throw Error(`Local ${table} changed since the sectioned backup`);
   }
   if(command==='apply'){
    const migration=await fsp.readFile(path.join(import.meta.dirname,'../annotation-portal/supabase/migrations/202610290002_conversation_versions.sql'),'utf8');
    await db.query(migration.replace(/^begin;\s*/i,'').replace(/\s*commit;\s*$/i,''));
    for(let offset=0;offset<current.length;offset+=100){
     const batch=current.slice(offset,offset+100).map(row=>({conversation_id:row.id,version_key:versionKey,transcript:markerFreeTranscript(row.transcript),source_transcript_sha256:expected.get(row.id)}));
     await db.query(`insert into public.conversation_versions(conversation_id,version_key,transcript,source_transcript_sha256)
      select conversation_id,version_key,transcript,source_transcript_sha256 from jsonb_to_recordset($1::jsonb)
      as t(conversation_id uuid,version_key text,transcript jsonb,source_transcript_sha256 text)
      on conflict(conversation_id,version_key) do nothing`,[JSON.stringify(batch)]);
    }
   }
   const exists=(await db.query("select to_regclass('public.conversation_versions') as name")).rows[0].name;
   if(command==='verify'&&!exists)throw Error('Marker-free version table does not exist');
   if(exists){
    const versions=(await db.query('select conversation_id,transcript,source_transcript_sha256,section_mode from public.conversation_versions where version_key=$1 order by conversation_id',[versionKey])).rows;
    if(versions.length!==current.length)throw Error(`Only ${versions.length} marker-free versions exist`);
    for(const version of versions){
     const original=current.find(row=>row.id===version.conversation_id);
     if(version.section_mode!=='none'||version.source_transcript_sha256!==expected.get(version.conversation_id)||JSON.stringify(version.transcript)!==JSON.stringify(markerFreeTranscript(original.transcript)))throw Error(`Marker-free version differs: ${version.conversation_id}`);
    }
   }
   await db.query('commit');
   const report={version:versionKey,conversations:current.length,sectioned_backup:backupDir,source_sections_preserved:backup.conversation_sections.length,section_mode:'none',labeling:'not run',verified_at:new Date().toISOString()};
   if(command==='verify'){
    const sample=current[0].id;
    const response=await fetch(`${config.url}/rest/v1/conversation_versions?select=conversation_id,section_mode&conversation_id=eq.${sample}&version_key=eq.${versionKey}`,{headers:{apikey:config.key,Authorization:`Bearer ${config.key}`}});
    if(!response.ok)throw Error(`Local portal API cannot read marker-free versions: HTTP ${response.status}`);
    const rows=await response.json();
    if(rows.length!==1||rows[0].conversation_id!==sample||rows[0].section_mode!=='none')throw Error('Local portal API returned an incomplete marker-free version');
   }
   await fsp.writeFile(path.join(runRoot,'marker-free-version.json'),JSON.stringify(report,null,2)+'\n');
   console.log(JSON.stringify(report));
  }catch(error){await db.query('rollback');throw error;}
 }
}finally{await db.end();}
