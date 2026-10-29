import {expect,it} from 'vitest';
import {PGlite} from '@electric-sql/pglite';
import {bundledRubric} from '../src/lib';
import {assertLocalResetTarget,resetLocalLabeling} from '../scripts/reset-local-labeling-core.mjs';

const config={target:'local',url:'http://127.0.0.1:55321',dbUrl:'postgresql://localhost:55322/postgres'};

async function fixture(){
 const db=new PGlite();
 await db.exec(`create schema auth; create schema storage;
 create table auth.users(id text primary key); insert into auth.users values('annotator');
 create table public.profiles(id text primary key); insert into public.profiles values('annotator');
 create table public.rubric_versions(hash text primary key,snapshot jsonb);
 insert into public.rubric_versions values('old','{"rubric":[]}');
 create table public.conversations(id text primary key,source_conversation_id text references public.conversations(id),transcript jsonb);
 insert into public.conversations values('ta',null,'{"text":"original"}'),('en','ta','{"text":"translation"}');
 create table public.conversation_sections(conversation_id text references public.conversations(id),section_id text);
 insert into public.conversation_sections values('ta','t1s1'),('en','t1s1');
 create table public.conversation_capture_documents(id text,content text);
 insert into public.conversation_capture_documents values('ta','capture');
 create table storage.objects(id text,name text);insert into storage.objects values('image','original.png');
 create table public.llm_generation_runs(id text primary key);insert into public.llm_generation_runs values('baseline'),('failed');
 create table public.llm_baselines(id text primary key references public.llm_generation_runs(id),annotations jsonb);
 insert into public.llm_baselines values('baseline','[{"count":2}]');
 create table public.assignments(id uuid primary key default gen_random_uuid(),conversation_id text references public.conversations(id),
 annotator_id text references public.profiles(id),rubric_hash text references public.rubric_versions(hash),task_type text,
 annotations jsonb default '[]',turn_ratings jsonb default '{}',status text default 'not_started',revision int default 0,
 baseline_id text references public.llm_baselines(id),annotation_source text default 'blank',is_active boolean default true,submitted_at timestamptz);
 insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,annotations,status,revision,baseline_id,annotation_source)
 values('ta','annotator','old','label','[{"count":2}]','submitted',1,'baseline','llm');
 insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,is_active)
 values('en','annotator','old','label',false),('ta','annotator','old','rate',true);
 create table public.annotation_revisions(assignment_id uuid references public.assignments(id),annotations jsonb);
 insert into public.annotation_revisions select id,annotations from public.assignments;
 create table public.assignment_rubric_upgrades(assignment_id uuid references public.assignments(id));
 insert into public.assignment_rubric_upgrades select id from public.assignments where task_type='label';
 create table public.label_schema_replacements(old_assignment_id uuid references public.assignments(id),new_assignment_id uuid references public.assignments(id));
 insert into public.label_schema_replacements select id,id from public.assignments where task_type='label';`);
 return db;
}

it('refuses cloud targets and non-loopback endpoints',()=>{
 for(const invalid of [{...config,target:'cloud'},{...config,dbUrl:'postgresql://db.project.supabase.co/postgres'},
  {...config,url:'https://project.supabase.co'}])expect(()=>assertLocalResetTarget(invalid)).toThrow(/local loopback/);
});

it('previews without changing work and resets labels while preserving originals, translations, sections, users and rating revisions',async()=>{
 const db=await fixture();
 try{
  expect(await resetLocalLabeling(db,bundledRubric,config)).toMatchObject({mode:'preview',labeling_assignments:2,labeling_revisions:2,evaluations:1,generation_runs:2,blank_assignments:1});
  expect((await db.query('select count(*)::int as n from public.llm_baselines')).rows).toEqual([{n:1}]);
  const result=await resetLocalLabeling(db,bundledRubric,config,{apply:true});
  expect(result).toMatchObject({mode:'applied',blank_assignments:1,ratings_preserved:1,rating_revisions_preserved:1});
  expect((await db.query("select conversation_id,annotations,status,baseline_id from public.assignments where task_type='label'")).rows)
   .toEqual([{conversation_id:'ta',annotations:[],status:'not_started',baseline_id:null}]);
  for(const table of ['llm_baselines','llm_generation_runs','assignment_rubric_upgrades','label_schema_replacements']){
   expect((await db.query(`select count(*)::int as n from public.${table}`)).rows).toEqual([{n:0}]);
  }
  expect((await db.query('select id,source_conversation_id from public.conversations order by id')).rows)
   .toEqual([{id:'en',source_conversation_id:'ta'},{id:'ta',source_conversation_id:null}]);
  expect((await db.query('select count(*)::int as n from public.conversation_sections')).rows).toEqual([{n:2}]);
  expect((await db.query("select hash from public.rubric_versions where hash='old'")).rows).toHaveLength(1);
 }finally{await db.close();}
});

it('rolls the entire reset back when a dependent trigger changes protected records',async()=>{
 const db=await fixture();
 try{
  await db.exec(`create function public.bad_delete() returns trigger language plpgsql as $$begin
    update public.conversations set transcript='{}'::jsonb;return old;end;$$;
    create trigger mutate_protected before delete on public.assignments for each row execute function public.bad_delete();`);
  await expect(resetLocalLabeling(db,bundledRubric,config,{apply:true})).rejects.toThrow(/Protected records changed/);
  expect((await db.query('select count(*)::int as n from public.assignments')).rows).toEqual([{n:3}]);
  expect((await db.query('select count(*)::int as n from public.llm_baselines')).rows).toEqual([{n:1}]);
  expect((await db.query("select transcript from public.conversations where id='ta'")).rows).toEqual([{transcript:{text:'original'}}]);
  expect((await db.query('select count(*)::int as n from public.rubric_versions')).rows).toEqual([{n:1}]);
 }finally{await db.close();}
});
