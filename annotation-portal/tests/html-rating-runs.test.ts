import {expect,it} from 'vitest';
import {PGlite} from '@electric-sql/pglite';
import fs from 'node:fs';

it('allows admins to read screenshot rating provenance while hiding model ratings from annotators',async()=>{
 const db=new PGlite();
 try{
  await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;
   create schema auth;
   create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
   create table public.profiles(id uuid primary key,role text);
   create function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$select exists(select 1 from public.profiles where id=auth.uid() and role='admin')$$;
   create table public.html_conversations(conversation_id uuid primary key);
   insert into public.profiles values('00000000-0000-4000-8000-000000000001','admin'),('00000000-0000-4000-8000-000000000002','annotator');
   insert into public.html_conversations values('00000000-0000-4000-8000-000000000010');`);
  await db.exec(fs.readFileSync('supabase/migrations/202610300001_html_rating_runs.sql','utf8'));
  await db.query(`insert into public.conversation_html_rating_runs(id,conversation_id,capture_version_hash,provider,model,prompt_version,prompt_sha256,prompt,rubric_hash,rubric_snapshot,request_sha256,request,response,ratings,generation_config,status)
   values('00000000-0000-4000-8000-000000000020','00000000-0000-4000-8000-000000000010',$1,'google','gemini-4-argon','html-turn-screenshot-ratings/2',$1,'Neutral tutor rating instructions',$1,'{}',$1,'{}','{}','[]','{"input_mode":"html-turn-screenshots/1"}','completed')`,['a'.repeat(64)]);
  await db.exec("set role authenticated;select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000002',false);");
  expect((await db.query('select * from public.conversation_html_rating_runs')).rows).toHaveLength(0);
  await db.exec("select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000001',false);");
  const rows=(await db.query<{provider:string;prompt_version:string}>('select provider,prompt_version from public.conversation_html_rating_runs')).rows;
  expect(rows).toEqual([{provider:'google',prompt_version:'html-turn-screenshot-ratings/2'}]);
  await expect(db.query('delete from public.conversation_html_rating_runs')).rejects.toThrow(/permission denied/);
  await db.exec('reset role;set role anon;');
  await expect(db.query('select * from public.conversation_html_rating_runs')).rejects.toThrow(/permission denied/);
 }finally{await db.close();}
});
