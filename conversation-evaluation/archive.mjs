import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import {pipeline} from 'node:stream/promises';
import {Transform} from 'node:stream';
import {fileURLToPath} from 'node:url';
import {isDeepStrictEqual} from 'node:util';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {instructionalPromptSha256,instructionalPromptVersion} from '../annotation-portal/server/generated/instructional-prompt.ts';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const defaultArchive=path.join(root,'research-archive/current');
const sources=[
 {from:path.join(root,'agentic_conversation_capture/outputs/api'),to:'generations'},
 {from:path.join(root,'annotation-portal/.runtime/llm-baselines'),to:'evaluations'},
];
const tables=['conversations','conversation_sections','conversation_section_sets','conversation_section_states','llm_baselines','llm_generation_runs','rubric_versions','topics','topic_titles','languages'];
const args=process.argv.slice(2),command=args.shift();
const options={archive:defaultArchive,limit:20};
while(args.length){const flag=args.shift();if(!['--archive','--conversation','--topic','--model','--language','--limit','--rerun','--dry-run'].includes(flag))throw Error('Unknown option: '+flag);if(['--rerun','--dry-run'].includes(flag)){options[flag.slice(2).replace('-','_')]=true;continue;}if(!args.length)throw Error('Missing value for '+flag);options[flag.slice(2)]=args.shift();}
options.archive=path.resolve(options.archive);
if(!['sync','verify','list','evaluate'].includes(command))throw Error('Use: node conversation-evaluation/archive.mjs sync|verify|list|evaluate [--archive DIR] [--conversation UUID] [--topic ID] [--model ID] [--language en|ta] [--rerun] [--dry-run]');
if(options.limit!==undefined&&(!Number.isInteger(Number(options.limit))||Number(options.limit)<1))throw Error('Limit must be a positive integer');
for(const f of ['.env','annotation-portal/.env.local'])if(fs.existsSync(path.join(root,f)))process.loadEnvFile(path.join(root,f));
if(['sync','evaluate'].includes(command)){loadSupabaseEnvironment();if(process.env.SUPABASE_TARGET!=='local')throw Error('This command only reads or evaluates the configured local Supabase.');}
const sha=()=>crypto.createHash('sha256');
const slash=p=>p.split(path.sep).join('/');
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const fileHash=async file=>{const hash=sha();for await(const chunk of fs.createReadStream(file))hash.update(chunk);return hash.digest('hex');};
const saveJson=async(file,value)=>{await fsp.mkdir(path.dirname(file),{recursive:true});const tmp=file+'.tmp-'+process.pid;await fsp.writeFile(tmp,JSON.stringify(value,null,2)+'\n');await fsp.rename(tmp,file);};
const enumerate=dir=>{const result=[];if(!fs.existsSync(dir))return result;const walk=(here,relative)=>{for(const entry of fs.readdirSync(here,{withFileTypes:true})){const next=path.join(here,entry.name),name=path.join(relative,entry.name);if(entry.isDirectory())walk(next,name);else if(entry.isFile())result.push(name);}};walk(dir,'');return result;};
const manifestFile=path.join(options.archive,'manifest.json'),indexFile=path.join(options.archive,'index.jsonl');
const loadIndex=()=>fs.readFileSync(indexFile,'utf8').trim().split('\n').filter(Boolean).map(line=>JSON.parse(line));
const selected=rows=>rows.filter(r=>(!options.conversation||r.id===options.conversation)&&(!options.topic||r.topic_id===options.topic)&&(!options.model||r.model===options.model)&&(!options.language||r.language===options.language));

async function openDb(){const db=new pg.Client({connectionString:profile(process.env,'local').dbUrl});await db.connect();return db;}
async function primaryKeys(db,table){const rows=(await db.query(`select a.attname from pg_index i join pg_attribute a on a.attrelid=i.indrelid and a.attnum=any(i.indkey) where i.indrelid=$1::regclass and i.indisprimary order by array_position(i.indkey,a.attnum)`,[`public.${table}`])).rows;return rows.map(r=>r.attname);}
async function exportTable(db,table){
 const keys=await primaryKeys(db,table),file=path.join(options.archive,'database',table+'.jsonl');
 await fsp.mkdir(path.dirname(file),{recursive:true});const tmp=file+'.tmp-'+process.pid,writer=fs.createWriteStream(tmp);const hash=sha();let count=0;
 // Keyset pagination keeps the largest section inventory within a small memory budget.
 let offset=0;try{for(;;){const order=keys.length?' order by '+keys.map(k=>'"'+k+'"').join(','):'';
  const rows=(await db.query(`select row_to_json(t) as row from public."${table}" t${order} limit 500 offset $1`,[offset])).rows;
  for(const {row} of rows){const line=JSON.stringify(row)+'\n';hash.update(line);if(!writer.write(line))await new Promise(resolve=>writer.once('drain',resolve));count++;}
  offset+=rows.length;if(rows.length<500)break;
 }}finally{writer.end();await new Promise((resolve,reject)=>{writer.once('finish',resolve);writer.once('error',reject);});}
 await fsp.rename(tmp,file);return {rows:count,sha256:hash.digest('hex'),path:slash(path.relative(options.archive,file))};
}
async function copySource(source,previous){
 const files=enumerate(source.from),previousByPath=new Map((previous||[]).map(f=>[f.path,f]));let copied=0,skipped=0,bytes=0;
 const inventory=[];let next=0;const workers=Array.from({length:8},async()=>{while(next<files.length){const relative=files[next++],from=path.join(source.from,relative),targetRelative=slash(path.join(source.to,relative)),to=path.join(options.archive,targetRelative);
  const stat=await fsp.stat(from),prior=previousByPath.get(targetRelative);
  if(prior&&prior.bytes===stat.size&&prior.mtime_ms===stat.mtimeMs&&fs.existsSync(to)){inventory.push(prior);skipped++;bytes+=stat.size;continue;}
  await fsp.mkdir(path.dirname(to),{recursive:true});const tmp=to+'.tmp-'+process.pid,hash=sha();
  await pipeline(fs.createReadStream(from),new Transform({transform(chunk,encoding,callback){hash.update(chunk);callback(null,chunk);}}),fs.createWriteStream(tmp));
  const end=await fsp.stat(from);if(end.size!==stat.size||end.mtimeMs!==stat.mtimeMs){await fsp.rm(tmp);throw Error('Source changed while archiving: '+from);}
  await fsp.rename(tmp,to);await fsp.utimes(to,stat.atime,stat.mtime);
  inventory.push({path:targetRelative,bytes:stat.size,mtime_ms:stat.mtimeMs,sha256:hash.digest('hex')});copied++;bytes+=stat.size;
 }});await Promise.all(workers);
 return {inventory:inventory.sort((a,b)=>a.path.localeCompare(b.path)),copied,skipped,bytes};
}
async function sync(){
 const previous=fs.existsSync(manifestFile)?readJson(manifestFile):null;
 const db=await openDb();let records={};try{await db.query('begin isolation level repeatable read read only');
  for(const table of tables){records[table]=await exportTable(db,table);console.log(JSON.stringify({event:'database_export',table,rows:records[table].rows}));}
  await db.query('commit');
 }catch(error){await db.query('rollback');throw error;}finally{await db.end();}
 const sourceResults=[];for(const source of sources){const result=await copySource(source,previous?.files?.filter(f=>f.path.startsWith(source.to+'/')));sourceResults.push(result);console.log(JSON.stringify({event:'files_copied',source:source.to,copied:result.copied,unchanged:result.skipped,bytes:result.bytes}));}
 const files=sourceResults.flatMap(r=>r.inventory);
 const conversations=fs.readFileSync(path.join(options.archive,'database/conversations.jsonl'),'utf8').trim().split('\n').map(line=>JSON.parse(line));
 const baselines=fs.readFileSync(path.join(options.archive,'database/llm_baselines.jsonl'),'utf8').trim().split('\n').map(line=>JSON.parse(line));
 const fileById=new Map();for(const f of files.filter(f=>f.path.endsWith('/conversation.json'))){const a=readJson(path.join(options.archive,f.path));if(a?.conversation?.conversation_id)fileById.set(a.conversation.conversation_id,f.path);}
 const baselinesByConversation=new Map();for(const b of baselines){const items=baselinesByConversation.get(b.conversation_id)||[];items.push({id:b.id,model:b.model,prompt_version:b.prompt_version,rubric_hash:b.rubric_hash,file:fs.existsSync(path.join(options.archive,'evaluations',b.id+'.json'))?'evaluations/'+b.id+'.json':null});baselinesByConversation.set(b.conversation_id,items);}
 const index=conversations.map(c=>({id:c.id,topic_id:c.topic_id,language:c.language,model:c.transcript?.provider||null,created_at:c.created_at,generation_file:fileById.get(c.id)||null,evaluations:baselinesByConversation.get(c.id)||[]})).sort((a,b)=>a.id.localeCompare(b.id));
 const missingGeneration=index.filter(i=>!i.generation_file),missingEvaluationArtifacts=index.flatMap(i=>i.evaluations.filter(e=>!e.file));
 if(missingGeneration.length||missingEvaluationArtifacts.length)throw Error(`Archive source artifacts missing: ${missingGeneration.length} conversations, ${missingEvaluationArtifacts.length} evaluations`);
 await fsp.writeFile(indexFile,index.map(r=>JSON.stringify(r)).join('\n')+'\n');const indexHash=await fileHash(indexFile);
 const manifest={format:'conversation-evaluation-archive/1',created_at:new Date().toISOString(),source:'local Supabase and local API/evaluation artifacts',records,conversations:index.length,evaluations:baselines.length,index:{path:'index.jsonl',sha256:indexHash},files};
 await saveJson(manifestFile,manifest);console.log(JSON.stringify({event:'archive_complete',archive:options.archive,conversations:index.length,evaluations:baselines.length,files:files.length}));
}
async function verify(){
 const manifest=readJson(manifestFile);if(manifest.format!=='conversation-evaluation-archive/1')throw Error('Unknown archive format');
 const index=loadIndex();if(index.length!==manifest.conversations||await fileHash(indexFile)!==manifest.index.sha256)throw Error('Index mismatch');
 for(const [table,record] of Object.entries(manifest.records)){const file=path.join(options.archive,record.path),content=fs.readFileSync(file,'utf8');if(await fileHash(file)!==record.sha256||(content.trim()?content.trim().split('\n').length:0)!==record.rows)throw Error('Database export mismatch: '+table);}
 let checked=0,bytes=0,next=0;await Promise.all(Array.from({length:8},async()=>{while(next<manifest.files.length){const entry=manifest.files[next++],file=path.join(options.archive,entry.path);if((await fsp.stat(file)).size!==entry.bytes||await fileHash(file)!==entry.sha256)throw Error('Artifact mismatch: '+entry.path);checked++;bytes+=entry.bytes;}}));
 const known=new Set(manifest.files.map(f=>f.path));for(const entry of index){if(!known.has(entry.generation_file)||entry.evaluations.some(e=>!known.has(e.file)))throw Error('Index points to a missing artifact: '+entry.id);}
 console.log(JSON.stringify({event:'verified',archive:options.archive,conversations:index.length,evaluations:index.reduce((n,i)=>n+i.evaluations.length,0),files:checked,bytes}));
}
function list(){const rows=selected(loadIndex());console.log(JSON.stringify({matched:rows.length,shown:rows.slice(0,Number(options.limit))},null,2));}
async function evaluate(){
 const rows=selected(loadIndex());if(!rows.length)throw Error('No archived conversations match those filters');
 const db=await openDb();let selectedRows=[];try{
  const ids=rows.map(r=>r.id),docs=(await db.query('select id,transcript from conversations where id=any($1::uuid[])',[ids])).rows;
  if(docs.length!==ids.length)throw Error('Archive conversations are not all present in local Supabase; restore the local database before evaluating.');
  const byId=new Map(docs.map(d=>[d.id,d]));for(const row of rows){const saved=readJson(path.join(options.archive,row.generation_file));if(!isDeepStrictEqual(byId.get(row.id).transcript,saved.conversation))throw Error('Local transcript differs from archived generation: '+row.id);}
  const rubric=readJson(path.join(root,'annotation-portal/src/generated/rubric.json'));
  const baselines=(await db.query("select distinct conversation_id from llm_baselines where conversation_id=any($1::uuid[]) and prompt_version=$2 and rubric_hash=$3 and generation_config->>'instructional_prompt_sha256'=$4 and generation_config->>'provider'='google'",[ids,instructionalPromptVersion,rubric.rubric_sha256,instructionalPromptSha256])).rows;
  const done=new Set(baselines.map(b=>b.conversation_id));selectedRows=options.rerun?rows:rows.filter(r=>!done.has(r.id));
 }finally{await db.end();}
 console.log(JSON.stringify({event:'evaluation_plan',matched:rows.length,to_evaluate:selectedRows.length,mode:options.rerun?'new_version':'missing_current_version',provider:'google',model:'google/gemini-4-argon',prompt:instructionalPromptVersion}));
 if(options.dry_run||!selectedRows.length)return;
 const portal=path.join(root,'annotation-portal');let failure;
 try{for(let start=0;start<selectedRows.length;start+=10){const batch=selectedRows.slice(start,start+10),args=['scripts/llm-baselines.mjs','--project','local','--provider','google','--concurrency','5','--regenerate',...batch.flatMap(r=>['--conversation',r.id])];
  const exit=await new Promise((resolve,reject)=>{const c=spawn(process.execPath,args,{cwd:portal,stdio:'inherit',windowsHide:true});c.on('error',reject);c.on('close',resolve);});if(exit!==0)throw Error(`Evaluation batch failed at ${start}; completed results are saved. Resume this command to finish.`);
 }}catch(error){failure=error;}finally{await sync();}
 if(failure)throw failure;
}
try{if(command==='sync')await sync();else if(command==='verify')await verify();else if(command==='list')list();else await evaluate();}
catch(error){console.error(error.message);process.exitCode=1;}
