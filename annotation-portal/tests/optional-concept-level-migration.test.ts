import { expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { C } from '../src/lib';
import {bundledRubric} from './fixtures/legacy-rubric';

it('upgrades active Label tasks and saves an optional Concept level without changing submitted work', async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;`);
    for (const migration of fs.readdirSync('supabase/migrations').filter(file => file.endsWith('.sql') && file < '202610210001').sort()) await db.exec(fs.readFileSync(`supabase/migrations/${migration}`, 'utf8'));
    await db.exec(fs.readFileSync('supabase/migrations/202610210004_memory_aid_rubric.sql', 'utf8'));
    const admin = '00000000-0000-4000-8000-000000000001', alice = '00000000-0000-4000-8000-000000000002', bob = '00000000-0000-4000-8000-000000000003';
    const doc = '00000000-0000-4000-8000-000000000010', activeId = '00000000-0000-4000-8000-000000000011', submittedId = '00000000-0000-4000-8000-000000000012';
    const conversation = C.normalizeConversation({ conversation_id: doc, messages: [{ turn_id: 't1', speaker: 'tutor', text: 'Forces' }] });
    const annotation = C.createAnnotation('concepts_and_subtopics_covered', C.makeEvidence(conversation, 't1', 0, 6), bundledRubric.rubric, 'concept-1');
    annotation.entry.detail_level = 'Brief';
    delete annotation.entry.concept_level;
    await db.query('insert into auth.users(id,email) values($1,$2),($3,$4),($5,$6)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid', bob, 'bob@users.annotation.invalid']);
    await db.query("update public.profiles set role='admin' where id=$1", [admin]);
    const old = (await db.query<{ hash: string }>("select hash from public.rubric_versions where jsonb_array_length(snapshot->'rubric')=7 order by created_at desc limit 1")).rows[0].hash;
    await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2::jsonb)', [bundledRubric.rubric_sha256, JSON.stringify(bundledRubric)]);
    await db.query('insert into public.conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)', [doc, 'Concept level migration', JSON.stringify(conversation), admin]);
    await db.query("insert into public.assignments(id,conversation_id,annotator_id,rubric_hash,task_type,status,revision,annotations) values($1,$2,$3,$4,'label','in_progress',1,$5::jsonb),($6,$2,$7,$4,'label','submitted',1,$5::jsonb)", [activeId, doc, alice, old, JSON.stringify([annotation]), submittedId, bob]);

    const migration = fs.readFileSync('supabase/migrations/202610210007_optional_concept_level.sql', 'utf8').replaceAll('__CURRENT_RUBRIC_HASH__', bundledRubric.rubric_sha256);
    await db.exec(migration);
    const rows = (await db.query<any>('select id,rubric_hash,annotations,revision from public.assignments where id in ($1,$2) order by id', [activeId, submittedId])).rows;
    expect(rows[0]).toMatchObject({ id: activeId, rubric_hash: bundledRubric.rubric_sha256, annotations: [annotation], revision: 1 });
    expect(rows[1]).toMatchObject({ id: submittedId, rubric_hash: old, annotations: [annotation], revision: 1 });

    await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${alice}',false);`);
    const leveled = structuredClone(annotation);
    leveled.entry.concept_level = 'Explanatory unit';
    const saved = (await db.query<any>('select public.save_assignment($1,$2,$3::jsonb,false,$4::jsonb) as value', [activeId, 1, JSON.stringify([leveled]), '{}'])).rows[0].value;
    expect(saved.annotations[0].entry.concept_level).toBe('Explanatory unit');
    const invalid = structuredClone(leveled);
    invalid.entry.concept_level = 'Other';
    await expect(db.query('select public.save_assignment($1,$2,$3::jsonb,false,$4::jsonb)', [activeId, 2, JSON.stringify([invalid]), '{}'])).rejects.toThrow(/Invalid annotation enum/);

    await db.exec('reset role;set role service_role;');
    const oldBaselineId = '00000000-0000-4000-8000-000000000020';
    await db.query('select public.import_llm_baseline($1,$2,$3,$4::jsonb,$5,$6,$7,$8::jsonb,$9)', [doc, oldBaselineId, old, JSON.stringify([annotation]), 'configured/model', 'test/old', 'Old prompt', '{}', admin]);
    await db.exec('reset role');
    await db.exec(fs.readFileSync('supabase/migrations/202610210008_admin_current_baseline.sql', 'utf8'));
    await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${admin}',false);`);
    const adminAssignmentId = (await db.query<any>('select public.open_admin_annotation_assignment($1,$2) as id', [doc, bundledRubric.rubric_sha256])).rows[0].id;
    const adminAssignment = (await db.query<any>('select rubric_hash,baseline_id,annotations from public.assignments where id=$1', [adminAssignmentId])).rows[0];
    expect(adminAssignment).toMatchObject({ rubric_hash: bundledRubric.rubric_sha256, baseline_id: null, annotations: [] });
  } finally {
    await db.close();
  }
});
