import { expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { bundledRubric, C } from '../src/lib';

it('upgrades active Label tasks for Memory Aid without changing submitted work', async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;`);
    for (const migration of fs.readdirSync('supabase/migrations').filter(file => file.endsWith('.sql') && file < '202610210001').sort()) await db.exec(fs.readFileSync(`supabase/migrations/${migration}`, 'utf8'));
    await db.exec(fs.readFileSync('supabase/migrations/202610210004_memory_aid_rubric.sql', 'utf8'));
    const admin = '00000000-0000-4000-8000-000000000001', alice = '00000000-0000-4000-8000-000000000002', bob = '00000000-0000-4000-8000-000000000003';
    const doc = '00000000-0000-4000-8000-000000000010', activeId = '00000000-0000-4000-8000-000000000011', submittedId = '00000000-0000-4000-8000-000000000012';
    const conversation = C.normalizeConversation({ conversation_id: doc, messages: [{ turn_id: 't1', speaker: 'tutor', text: 'Remember PEMDAS for the order of operations.' }] });
    await db.query('insert into auth.users(id,email) values($1,$2),($3,$4),($5,$6)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid', bob, 'bob@users.annotation.invalid']);
    await db.query("update public.profiles set role='admin' where id=$1", [admin]);
    const old = (await db.query<{ hash: string }>("select hash from public.rubric_versions where jsonb_array_length(snapshot->'rubric')=7 order by created_at desc limit 1")).rows[0].hash;
    await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2::jsonb)', [bundledRubric.rubric_sha256, JSON.stringify(bundledRubric)]);
    await db.query('insert into public.conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)', [doc, 'Memory Aid migration', JSON.stringify(conversation), admin]);
    const oldAnnotation = C.createAnnotation('examples', C.makeEvidence(conversation, 't1', 9, 15), bundledRubric.rubric, 'example-1');
    oldAnnotation.entry.detail_level = 'Brief';
    await db.query("insert into public.assignments(id,conversation_id,annotator_id,rubric_hash,task_type,status,revision,annotations) values($1,$2,$3,$4,'label','in_progress',1,$5::jsonb),($6,$2,$7,$4,'label','submitted',1,$5::jsonb)", [activeId, doc, alice, old, JSON.stringify([oldAnnotation]), submittedId, bob]);
    const sql = fs.readFileSync('supabase/migrations/202610210005_memory_aid_active_labels.sql', 'utf8').replaceAll('__CURRENT_RUBRIC_HASH__', bundledRubric.rubric_sha256);
    await db.exec(sql);
    const rows = (await db.query<any>('select id,rubric_hash,annotations,revision from public.assignments where id in ($1,$2) order by id', [activeId, submittedId])).rows;
    expect(rows[0]).toMatchObject({ id: activeId, rubric_hash: bundledRubric.rubric_sha256, annotations: [oldAnnotation], revision: 1 });
    expect(rows[1]).toMatchObject({ id: submittedId, rubric_hash: old, annotations: [oldAnnotation], revision: 1 });
  } finally { await db.close(); }
});
