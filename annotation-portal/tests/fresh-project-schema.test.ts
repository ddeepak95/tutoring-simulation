import {expect,it} from 'vitest';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';
import {freshProjectMigration} from '../scripts/fresh-project-schema.mjs';
import {bundledRubric} from '../src/lib';
it('installs the current portal and private capture storage into an empty Supabase database',async()=>{
 const db=new PGlite();
 try{
  await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;`);
  for(const file of fs.readdirSync('supabase/migrations').filter(f=>f.endsWith('.sql')).sort()){
   try{await db.exec(freshProjectMigration(file,fs.readFileSync('supabase/migrations/'+file,'utf8'),bundledRubric));}catch(e){throw Error(`${file}: ${(e as Error).message}`);}
  }
  const buckets=await db.query<any>("select public from storage.buckets where id='conversation-packages'");expect(buckets.rows[0].public).toBe(false);
  expect((await db.query<any>("select snapshot->>'label_schema_version' as version from public.rubric_versions where hash=$1",[bundledRubric.rubric_sha256])).rows[0].version).toBe('section-items/1');
  expect((await db.query<any>('select count(*)::int as n from public.conversations')).rows[0].n).toBe(0);
  const admin='00000000-0000-4000-8000-000000000001',alice='00000000-0000-4000-8000-000000000002';
  await db.query("insert into auth.users values($1,'admin@users.annotation.invalid'),($2,'alice@users.annotation.invalid')",[admin,alice]);
  await db.query("update public.profiles set role='admin' where id=$1",[admin]);
  await db.exec("insert into public.topics(id,name) values('brain','Brain')");
  await db.exec("insert into public.languages(id,name) values('en','English') on conflict(id) do nothing");
  const transcript={conversation_id:'topic-test',label:'Brain',learning_topic:'Brain',messages:[{turn_id:'t1',speaker:'tutor',text:'Content.'}]};
  await db.query("insert into public.conversations(label,language,topic_id,transcript,created_by) values('Brain','en','brain',$1,$2)",[JSON.stringify(transcript),admin]);
  await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${admin}',false)`);
  expect((await db.query<any>('select * from public.dashboard_topics()')).rows).toEqual([{key:'brain',name:'Brain',conversation_count:1}]);
  expect((await db.query("select id,label from public.dashboard_topic_conversations('brain')")).rows).toHaveLength(1);
  expect((await db.query("select id from public.dashboard_topic_conversations('other')")).rows).toHaveLength(0);
  await db.exec(`select set_config('request.jwt.claim.sub','${alice}',false)`);
  expect((await db.query('select * from public.dashboard_topics()')).rows).toHaveLength(0);
  expect((await db.query("select id from public.dashboard_topic_conversations('brain')")).rows).toHaveLength(0);
 }finally{await db.close();}
},30000);
