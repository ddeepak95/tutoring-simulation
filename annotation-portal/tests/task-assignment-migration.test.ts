import { afterAll, beforeAll, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { C } from '../src/lib';
import {bundledRubric} from './fixtures/legacy-rubric';
import { completeRatings } from './ratings-fixture';

const admin='00000000-0000-4000-8000-000000000001', alice='00000000-0000-4000-8000-000000000002';
const doc='00000000-0000-4000-8000-000000000010';
const conversation=C.normalizeConversation({conversation_id:doc,messages:[{turn_id:'t1',speaker:'tutor',text:'Water evaporates.'}]});
const annotation=(()=>{const value=C.createAnnotation('examples',C.makeEvidence(conversation,'t1',0,17),bundledRubric.rubric,'example-1');value.entry.detail_level='Brief';return value;})();
let db:PGlite;
async function asAdmin(){await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','${admin}',false);`);}

beforeAll(async()=>{
 db=new PGlite();
 await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;`);
 const migrations=fs.readdirSync('supabase/migrations').filter(file=>file.endsWith('.sql')&&!file.startsWith('202610200005')).sort();
 for(const file of migrations)await db.exec(fs.readFileSync(`supabase/migrations/${file}`,'utf8'));
 for(const [id,name] of [[admin,'admin'],[alice,'alice']])await db.query('insert into auth.users(id,email) values($1,$2)',[id,`${name}@users.annotation.invalid`]);
 await db.query("update profiles set role='admin' where id=$1",[admin]);
 await db.query('insert into rubric_versions(hash,snapshot) values($1,$2::jsonb)',[bundledRubric.rubric_sha256,JSON.stringify(bundledRubric)]);
 await db.query('insert into conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)',[doc,'Task split',JSON.stringify(conversation),admin]);
 await db.query(`insert into assignments(conversation_id,annotator_id,rubric_hash,status,revision,annotations,turn_ratings,submitted_at)
   values($1,$2,$3,'in_progress',1,$4::jsonb,$5::jsonb,null)`,[doc,alice,bundledRubric.rubric_sha256,JSON.stringify([annotation]),JSON.stringify(completeRatings(conversation,bundledRubric))]);
 const assignment=(await db.query<any>('select id from assignments where conversation_id=$1',[doc])).rows[0];
 await db.query('insert into annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values($1,0,$2::jsonb,$3::jsonb,$4,$5,$6),($1,1,$7::jsonb,$8::jsonb,$9,$5,$6)',[assignment.id,'[]','{}','not_started',admin,'save',JSON.stringify([annotation]),JSON.stringify(completeRatings(conversation,bundledRubric)),'in_progress']);
 await db.exec(fs.readFileSync('supabase/migrations/202610200005_split_label_rate_assignments.sql','utf8'));
});
afterAll(async()=>{await db?.close();});

it('splits existing assignments and every revision snapshot into independent Label and Rate work',async()=>{
 const rows=(await db.query<any>('select * from assignments where conversation_id=$1 order by task_type',[doc])).rows;
 expect(rows).toHaveLength(2);
 const label=rows.find(row=>row.task_type==='label')!,rate=rows.find(row=>row.task_type==='rate')!;
 expect(label).toMatchObject({annotator_id:alice,status:'in_progress',revision:1});expect(label.annotations).toEqual([annotation]);expect(label.turn_ratings).toEqual({});
 expect(rate).toMatchObject({annotator_id:alice,status:'in_progress',revision:1,annotations:[]});expect(rate.turn_ratings).toEqual(completeRatings(conversation,bundledRubric));
 const labelHistory=(await db.query<any>('select * from annotation_revisions where assignment_id=$1 order by revision',[label.id])).rows;
 const rateHistory=(await db.query<any>('select * from annotation_revisions where assignment_id=$1 order by revision',[rate.id])).rows;
 expect(labelHistory).toHaveLength(2);expect(labelHistory.every(row=>Object.keys(row.turn_ratings).length===0)).toBe(true);
 expect(rateHistory).toHaveLength(2);expect(rateHistory.every(row=>row.annotations.length===0)).toBe(true);expect(rateHistory[1].turn_ratings).toEqual(completeRatings(conversation,bundledRubric));
 await expect(db.query('insert into assignments(conversation_id,annotator_id,rubric_hash,task_type) values($1,$2,$3,$4)',[doc,alice,bundledRubric.rubric_sha256,'label'])).rejects.toThrow(/unique/i);
});

it('enforces task-specific saves and idempotent assignment creation',async()=>{
 const rows=(await db.query<any>('select * from assignments where conversation_id=$1',[doc])).rows;
 const label=rows.find(row=>row.task_type==='label')!,rate=rows.find(row=>row.task_type==='rate')!;
 await asAdmin();
 await expect(db.query('select public.save_assignment($1,1,$2::jsonb,false,$3::jsonb)',[label.id,JSON.stringify([annotation]),JSON.stringify(completeRatings(conversation,bundledRubric))])).rejects.toThrow(/Label assignments cannot contain/);
 await expect(db.query('select public.save_assignment($1,1,$2::jsonb,false,$3::jsonb)',[rate.id,JSON.stringify([annotation]),'{}'])).rejects.toThrow(/Rate assignments cannot contain/);
 const value=(await db.query<any>(`select public.create_task_assignments(array[$1]::uuid[],array[$2]::uuid[],array['rate']::text[],$3,'{}'::jsonb) as value`,[doc,alice,bundledRubric.rubric_sha256])).rows[0].value;
 expect(value.created).toBe(0);expect(value.skipped).toBe(1);
});
