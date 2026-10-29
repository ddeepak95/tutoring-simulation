import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {languages,loadEnvironment,models,runRoot,selectedTopics,tries} from './config.mjs';

const args=process.argv.slice(2),apply=args.includes('--apply');
if(args.some(arg=>arg!=='--apply'))throw Error('Use no argument for a preview or --apply to prune local Supabase.');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(process.env.SUPABASE_URL).hostname)||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Cleanup requires local Supabase on loopback.');
const backup=path.join(runRoot,'backups','local-supabase-pre-prune.dump');
if(!fs.existsSync(backup)||fs.statSync(backup).size<1000000)throw Error('Verified local database backup is required before pruning.');
const backupHash=createHash('sha256').update(fs.readFileSync(backup)).digest('hex');
const manifest=JSON.parse(fs.readFileSync(path.join(runRoot,'manifest.json'),'utf8'));
const catalog=JSON.parse(fs.readFileSync(path.join(runRoot,'topics.json'),'utf8'));
const kept=manifest.items.filter(item=>item.origin==='reused');
if(kept.length!==selectedTopics.length*models.length*2*tries||manifest.items.length!==882||catalog.length!==selectedTopics.length||kept.some(item=>!selectedTopics.includes(item.topic)||!models.includes(item.model)||!['en','ta'].includes(item.language)))throw Error('Run manifest is incomplete or does not match the six-topic experiment.');
const keepIds=kept.map(item=>item.id);
if(new Set(keepIds).size!==keepIds.length)throw Error('Duplicate reused conversation ID.');
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
try{
 await db.query('begin');
 await db.query('lock table public.conversations in share row exclusive mode');
 const one=async(sql,params=[])=>{const result=await db.query(sql,params);return result.rows[0];};
 const before=await one(`select
   (select count(*)::int from public.conversations) conversations,
   (select count(*)::int from public.assignments) assignments,
   (select count(*)::int from public.annotation_revisions) revisions,
   (select count(*)::int from public.llm_baselines) baselines,
   (select count(*)::int from public.llm_generation_runs) generation_runs,
   (select count(*)::int from public.topics) topics,
   (select count(*)::int from public.conversation_sections) sections`);
 if(before.assignments||before.revisions)throw Error('Annotation or rating work appeared after preflight; review before pruning.');
 const rows=(await db.query('select id,topic_id,language,transcript from public.conversations where id=any($1::uuid[])',[keepIds])).rows;
 if(rows.length!==kept.length)throw Error(`Only ${rows.length} of ${kept.length} selected originals exist.`);
 const expected=new Map(kept.map(item=>[item.id,item]));
 for(const row of rows){const item=expected.get(row.id);if(row.topic_id!==item.topic||row.language!==item.language||row.transcript.provider!==item.model||row.transcript.translation||row.transcript.source_conversation_id)throw Error(`Kept conversation metadata mismatch: ${row.id}`);}
 const summary={mode:apply?'applied':'preview',backup,backup_sha256:backupHash,before,keep_conversations:keepIds.length,remove_conversations:before.conversations-keepIds.length,keep_topics:selectedTopics};
 if(!apply){await db.query('rollback');console.log(JSON.stringify(summary,null,2));process.exit(0);}
 await db.query('delete from public.annotation_revisions');
 await db.query('delete from public.assignments');
 await db.query('delete from public.llm_baselines');
 await db.query('delete from public.llm_generation_runs');
 await db.query('delete from public.conversations where not(id=any($1::uuid[]))',[keepIds]);
 await db.query('delete from public.topics where not(id=any($1::text[]))',[selectedTopics]);
 await db.query("insert into public.languages(id,name) values('kn','Kannada') on conflict(id) do update set name=excluded.name");
 for(const topic of catalog){
  await db.query('insert into public.topics(id,name) values($1,$2) on conflict(id) do update set name=excluded.name',[topic['topic-id'],topic['topic-name']]);
  for(const language of languages){await db.query('insert into public.topic_titles(topic_id,language_id,title) values($1,$2,$3) on conflict(topic_id,language_id) do update set title=excluded.title',[topic['topic-id'],language,topic[language].title]);}
 }
 const after=await one(`select
   (select count(*)::int from public.conversations) conversations,
   (select count(*)::int from public.llm_baselines) baselines,
   (select count(*)::int from public.llm_generation_runs) generation_runs,
   (select count(*)::int from public.topics) topics,
   (select count(*)::int from public.conversation_sections) sections,
   (select count(*)::int from public.topic_titles where topic_id=any($1::text[]) and language_id=any($2::text[])) selected_titles,
   (select count(*)::int from public.languages where id='kn') kannada_languages`,[selectedTopics,languages]);
 const expectedSections=kept.reduce((sum,item)=>sum+item.sections,0);
 assert.equal(after.conversations,252);assert.equal(after.baselines,0);assert.equal(after.generation_runs,0);assert.equal(after.topics,6);assert.equal(after.sections,expectedSections);assert.equal(after.selected_titles,42);assert.equal(after.kannada_languages,1);
 const survivors=(await db.query('select id from public.conversations order by id')).rows.map(row=>row.id).sort();
 assert.deepEqual(survivors,[...keepIds].sort());
 await db.query('commit');
 const report={...summary,after};
 fs.writeFileSync(path.join(runRoot,'prune-report.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
}catch(error){await db.query('rollback').catch(()=>{});throw error;}finally{await db.end();}
