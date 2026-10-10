import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { bundledRubric, C } from '../src/lib';
import { completeRatings } from './ratings-fixture';
const admin='00000000-0000-4000-8000-000000000001',alice='00000000-0000-4000-8000-000000000002',bob='00000000-0000-4000-8000-000000000003',charlie='00000000-0000-4000-8000-000000000004';
const doc='00000000-0000-4000-8000-000000000010',otherDoc='00000000-0000-4000-8000-000000000011',baseId='00000000-0000-4000-8000-000000000020',nextId='00000000-0000-4000-8000-000000000021';
const conversation=C.normalizeConversation({conversation_id:doc,messages:[{turn_id:'t1',speaker:'tutor',text:'😀 Water evaporates. Water evaporates.'},{turn_id:'s1',speaker:'student',text:'Why?'},{turn_id:'t2',speaker:'tutor',text:'Heat helps.'}]});
const annotations=['t1','t2'].map((turnId,index)=>{const turn=conversation.messages.find(turn=>turn.turn_id===turnId)!;const start=index?0:3;const annotation=C.createAnnotation('examples',C.makeEvidence(conversation,turnId,start,index?11:20),bundledRubric.rubric,`llm-${baseId}-${index+1}`);annotation.entry.detail_level='Brief';return annotation;});
let db:PGlite;let aliceAssignment:string;let bobAssignment:string;
async function user(id:string){await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','${id}',false);`);}
async function claim(id:string,document=doc){return (await db.query<any>('select public.claim_llm_generation($1,$2) as value',[document,id])).rows[0].value;}
async function complete(id:string,payload:unknown=annotations){return (await db.query<any>('select public.complete_llm_generation($1,$2,$3::jsonb,$4,$5,$6,$7::jsonb) as value',[id,bundledRubric.rubric_sha256,JSON.stringify(payload),'configured/model','test/1','Exact prompt','{"max_tokens":100}'])).rows[0].value;}
async function assign(ids:string[],baseline=baseId,document=doc){return (await db.query<any>('select public.create_annotation_assignments($1::uuid[],$2::uuid[],$3,$4::jsonb) as value',[[document],ids,bundledRubric.rubric_sha256,JSON.stringify(baseline?{[document]:baseline}:{})])).rows[0].value;}
beforeAll(async()=>{
 db=new PGlite();await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;`);
 for(const migration of fs.readdirSync('supabase/migrations').filter(file=>file.endsWith('.sql')).sort())await db.exec(fs.readFileSync(`supabase/migrations/${migration}`,'utf8'));
 for(const [id,name] of [[admin,'admin'],[alice,'alice'],[bob,'bob'],[charlie,'charlie']])await db.query('insert into auth.users(id,email) values($1,$2)',[id,`${name}@users.annotation.invalid`]);
 await db.query("update profiles set role='admin' where id=$1",[admin]);await db.query('insert into rubric_versions(hash,snapshot) values($1,$2::jsonb)',[bundledRubric.rubric_sha256,JSON.stringify(bundledRubric)]);
 for(const id of [doc,otherDoc])await db.query('insert into conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)',[id,'Baseline test',JSON.stringify({...conversation,conversation_id:id}),admin]);
 await user(admin);

});
afterAll(async()=>{await db?.close();});
describe.sequential('immutable LLM baselines and human copies',()=>{
 it('claims generation once, validates exact evidence and instructional-only content, and preserves completed versions',async()=>{
  expect((await claim(baseId)).claimed).toBe(true);expect((await claim(baseId)).claimed).toBe(false);
  await expect(claim(nextId)).rejects.toThrow(/already running/);
  const wrong=structuredClone(annotations);wrong[0].evidence[0].quote='wrong';await expect(complete(baseId,wrong)).rejects.toThrow(/exactly match/);
  await expect(complete(baseId,[{...annotations[0],feature:'issues'}])).rejects.toThrow(/only instructional/);
  const baseline=await complete(baseId);expect(baseline.annotations).toEqual(annotations);expect(baseline.prompt).toBe('Exact prompt');expect(baseline.transcript_sha256).toMatch(/^[a-f0-9]{64}$/);
  expect((await complete(baseId,[])).annotations).toEqual(annotations);
  await expect(db.exec("update llm_baselines set annotations='[]'")).rejects.toThrow(/permission denied/);
  await db.exec('reset role');await expect(db.exec("update llm_baselines set annotations='[]'")).rejects.toThrow(/immutable/);await user(admin);
 });
 it('creates independent copies with blank ratings and a seeded audit revision; rejects unauthorized and forged origins',async()=>{
  const result=await assign([alice,bob]);expect(result.created).toBe(2);
  const rows=(await db.query<any>('select * from assignments order by annotator_id')).rows;aliceAssignment=rows[0].id;bobAssignment=rows[1].id;
  for(const row of rows){expect(row.annotations).toEqual(annotations);expect(row.turn_ratings).toEqual({});expect(row.revision).toBe(0);expect(row.status).toBe('not_started');expect(row.baseline_id).toBe(baseId);expect(row.annotation_source).toBe('llm');}
  const history=(await db.query<any>('select * from annotation_revisions')).rows;expect(history).toHaveLength(2);expect(history.every(row=>row.operation==='seed_llm'&&row.actor_id===admin&&row.revision===0)).toBe(true);
  await expect(db.query("insert into assignments(conversation_id,annotator_id,rubric_hash,baseline_id,annotation_source,annotations) values($1,$2,$3,$4,'llm',$5::jsonb)",[doc,charlie,bundledRubric.rubric_sha256,baseId,JSON.stringify(annotations)])).rejects.toThrow(/row-level security/);
  await user(charlie);expect((await db.query('select * from llm_baselines')).rows).toHaveLength(0);await expect(assign([charlie])).rejects.toThrow(/Admin/);await expect(claim(nextId)).rejects.toThrow(/Admin/);
  await user(alice);expect((await db.query('select * from llm_baselines')).rows).toHaveLength(1);await expect(db.query('select public.save_assignment($1,0,$2::jsonb,false,$3::jsonb)',[bobAssignment,'[]','{}'])).rejects.toThrow(/denied/);
  const changed=structuredClone(annotations);changed[0].entry.detail_level='Elaborated';changed.pop();const added=C.createAnnotation('concepts_and_subtopics_covered',annotations[1].evidence[0],bundledRubric.rubric,'human-added');added.entry.topic='Heat';added.entry.detail_level='Explained';changed.push(added);
  await db.query('select public.save_assignment($1,0,$2::jsonb,false,$3::jsonb)',[aliceAssignment,JSON.stringify(changed),'{}']);
  await expect(db.query('select public.save_assignment($1,1,$2::jsonb,true,$3::jsonb)',[aliceAssignment,JSON.stringify(changed),'{}'])).rejects.toThrow(/Rate every tutor turn/);
  await user(admin);expect((await db.query<any>('select annotations from assignments where id=$1',[bobAssignment])).rows[0].annotations).toEqual(annotations);expect((await db.query<any>('select annotations from llm_baselines where id=$1',[baseId])).rows[0].annotations).toEqual(annotations);
  await db.exec('reset role');await expect(db.query('update assignments set baseline_id=null,annotation_source=\'blank\' where id=$1',[aliceAssignment])).rejects.toThrow(/origin/);await user(admin);
 });
 it('regeneration never overwrites human work or earlier baselines and assignment retries never reset existing work',async()=>{
  await claim(nextId);const newer=structuredClone(annotations);newer[0].entry.detail_level='Explained';await complete(nextId,newer);
  const before=(await db.query<any>('select * from assignments where id=$1',[aliceAssignment])).rows[0];expect((await assign([alice,bob],nextId)).skipped).toBe(2);expect((await db.query<any>('select * from assignments where id=$1',[aliceAssignment])).rows[0]).toEqual(before);
  expect((await assign([charlie],nextId)).created).toBe(1);
  await expect(assign([charlie],baseId,otherDoc)).rejects.toThrow(/another conversation/);
  await user(alice);expect((await db.query<any>('select id from llm_baselines')).rows.map(row=>row.id)).toEqual([baseId]);
  await db.query('select public.save_assignment($1,1,$2::jsonb,true,$3::jsonb)',[aliceAssignment,JSON.stringify(before.annotations),JSON.stringify(completeRatings(conversation,bundledRubric))]);
  await user(admin);await expect(db.query('select public.save_assignment($1,2,$2::jsonb,false,$3::jsonb)',[aliceAssignment,'[]','{}'])).rejects.toThrow(/read only/);
 });
 it('includes baseline/generation changes in deletion previews and cascades only the confirmed conversation',async()=>{
  const preview=(await db.query<any>('select public.preview_conversation_deletion($1) as value',[doc])).rows[0].value;expect(preview.baseline_count).toBe(2);
  const activeId='00000000-0000-4000-8000-000000000022';await claim(activeId);
  await expect(db.query('select public.delete_conversation($1,$2)',[doc,preview.snapshot])).rejects.toThrow(/changed/);
  const refreshed=(await db.query<any>('select public.preview_conversation_deletion($1) as value',[doc])).rows[0].value;
  await db.query('select public.delete_conversation($1,$2)',[doc,refreshed.snapshot]);
  expect((await db.query('select * from llm_baselines')).rows).toHaveLength(0);expect((await db.query('select * from llm_generation_runs')).rows).toHaveLength(0);expect((await db.query('select * from assignments')).rows).toHaveLength(0);expect((await db.query('select * from conversations')).rows).toHaveLength(1);await expect(complete(activeId)).rejects.toThrow(/not found/);
 });
 it('imports a locally generated baseline only through the service role, with verified admin attribution and idempotent immutable content',async()=>{
  const id='00000000-0000-4000-8000-000000000030';
  const args=[otherDoc,id,bundledRubric.rubric_sha256,JSON.stringify(annotations),'configured/model','test/1','Local exact prompt','{"origin":"local_llm_generation"}',admin];
  const sql='select public.import_llm_baseline($1,$2,$3,$4::jsonb,$5,$6,$7,$8::jsonb,$9) as value';
  await user(admin);await expect(db.query(sql,args)).rejects.toThrow(/permission denied/);
  await db.exec('reset role;set role service_role;');
  await expect(db.query(sql,[...args.slice(0,8),alice])).rejects.toThrow(/admin/i);
  const first=(await db.query<any>(sql,args)).rows[0].value;
  expect(first.annotations).toEqual(annotations);expect(first.created_by).toBe(admin);expect(first.generation_config.origin).toBe('local_llm_generation');
  expect((await db.query<any>(sql,args)).rows[0].value).toEqual(first);
  const changed=[...args];changed[6]='Different prompt';await expect(db.query(sql,changed)).rejects.toThrow(/different|immutable|match/i);
  expect((await db.query('select * from assignments')).rows).toHaveLength(0);
  expect((await db.query<any>('select status from llm_generation_runs where id=$1',[id])).rows[0].status).toBe('completed');
 });
 it('seeds untouched admin work in place, starts new admin copies from the baseline, and preserves started work',async()=>{
  await user(admin);
  const blank=(await db.query<any>('insert into assignments(conversation_id,annotator_id,rubric_hash) values($1,$2,$3) returning *',[otherDoc,admin,bundledRubric.rubric_sha256])).rows[0];
  const open=async()=> (await db.query<any>('select public.open_admin_annotation_assignment($1,$2) as id',[otherDoc,bundledRubric.rubric_sha256])).rows[0].id;
  expect(await open()).toBe(blank.id);
  const seeded=(await db.query<any>('select * from assignments where id=$1',[blank.id])).rows[0];
  expect(seeded.annotations).toEqual(annotations);expect(seeded.turn_ratings).toEqual({});expect(seeded.baseline_id).toBe('00000000-0000-4000-8000-000000000030');
  expect((await db.query<any>('select operation from annotation_revisions where assignment_id=$1',[blank.id])).rows).toEqual([{operation:'seed_llm'}]);
  await db.query('select public.save_assignment($1,0,$2::jsonb,false,$3::jsonb)',[blank.id,'[]','{}']);
  const started=(await db.query<any>('select * from assignments where id=$1',[blank.id])).rows[0];expect(await open()).toBe(blank.id);expect((await db.query<any>('select * from assignments where id=$1',[blank.id])).rows[0]).toEqual(started);
  for(const [index,hasWork] of [[5,false],[6,true]] as const){
   const id=`00000000-0000-4000-8000-00000000000${index}`;await db.exec('reset role');await db.query('insert into auth.users(id,email) values($1,$2)',[id,`admin${index}@users.annotation.invalid`]);await db.query("update profiles set role='admin' where id=$1",[id]);await user(id);
   let old:any;
   if(hasWork){old=(await db.query<any>('insert into assignments(conversation_id,annotator_id,rubric_hash) values($1,$2,$3) returning *',[otherDoc,id,bundledRubric.rubric_sha256])).rows[0];await db.query('select public.save_assignment($1,0,$2::jsonb,false,$3::jsonb)',[old.id,'[]','{}']);}
   const assignmentId=await open();const row=(await db.query<any>('select * from assignments where id=$1',[assignmentId])).rows[0];
   expect(row.baseline_id).toBe(hasWork?null:seeded.baseline_id);expect(row.annotations).toEqual(hasWork?[]:annotations);
  }
  await user(charlie);await expect(open()).rejects.toThrow(/Admin/);
 });
 it('unassigns with revision checks, revokes access and saving, and restores the same saved work on reassignment',async()=>{
  await user(admin);const baseline='00000000-0000-4000-8000-000000000030';await assign([alice,bob],baseline,otherDoc);
  const rows=(await db.query<any>('select * from assignments where conversation_id=$1 and annotator_id=any($2::uuid[])',[otherDoc,[alice,bob]])).rows;
  const a=rows.find(row=>row.annotator_id===alice),b=rows.find(row=>row.annotator_id===bob);
  const changed=structuredClone(annotations);changed[0].entry.detail_level='Elaborated';
  await user(alice);await db.query('select public.save_assignment($1,0,$2::jsonb,false,$3::jsonb)',[a.id,JSON.stringify(changed),'{}']);
  await user(bob);await db.query('select public.save_assignment($1,0,$2::jsonb,true,$3::jsonb)',[b.id,JSON.stringify(annotations),JSON.stringify(completeRatings(conversation,bundledRubric))]);
  const remove=async(items:any[])=> (await db.query<any>('select public.unassign_annotation_assignments($1::jsonb) as value',[JSON.stringify(items)])).rows[0].value;
  await expect(remove([{id:a.id,revision:1}])).rejects.toThrow(/Admin/);
  await user(admin);await expect(remove([{id:a.id,revision:1},{id:b.id,revision:0}])).rejects.toThrow(/changed/);
  expect((await db.query<any>('select is_active from assignments where id=$1',[a.id])).rows[0].is_active).toBe(true);
  expect((await remove([{id:a.id,revision:1},{id:b.id,revision:1}])).unassigned).toBe(2);
  expect((await remove([{id:a.id,revision:1}])).unassigned).toBe(0);
  const saved=(await db.query<any>('select * from assignments where id=$1',[a.id])).rows[0];expect(saved.annotations).toEqual(changed);expect(saved.is_active).toBe(false);expect(saved.baseline_id).toBe(baseline);
  const history=(await db.query<any>('select operation,actor_id from annotation_revisions where assignment_id=$1 order by revision',[a.id])).rows;
  expect(history.at(-1)).toEqual({operation:'unassign',actor_id:admin});
  await user(alice);for(const table of ['assignments','conversations','llm_baselines','annotation_revisions'])expect((await db.query(`select * from public.${table}`)).rows).toHaveLength(0);
  await expect(db.query('select public.save_assignment($1,2,$2::jsonb,false,$3::jsonb)',[a.id,'[]','{}'])).rejects.toThrow(/unassigned/);
  await user(admin);const restored=await assign([alice,bob],baseline,otherDoc);expect(restored.restored).toBe(2);expect(restored.created).toBe(0);
  const resumed=(await db.query<any>('select * from assignments where id=$1',[a.id])).rows[0];expect(resumed.annotations).toEqual(changed);expect(resumed.turn_ratings).toEqual(saved.turn_ratings);expect(resumed.baseline_id).toBe(saved.baseline_id);expect(resumed.revision).toBe(3);expect(resumed.is_active).toBe(true);
  const submitted=(await db.query<any>('select * from assignments where id=$1',[b.id])).rows[0];expect(submitted.status).toBe('submitted');expect(submitted.turn_ratings).toEqual(completeRatings(conversation,bundledRubric));
  expect((await assign([alice,bob],baseline,otherDoc)).skipped).toBe(2);
  await user(alice);expect((await db.query('select * from assignments')).rows).toHaveLength(1);expect((await db.query('select * from llm_baselines')).rows).toHaveLength(1);
 });
});
