import { expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { bundledRubric, C } from '../src/lib';

it('stores Memory Aid annotations in generated and imported LLM baselines', async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;`);
    for (const migration of fs.readdirSync('supabase/migrations').filter(file => file.endsWith('.sql') && file < '202610210001').sort()) await db.exec(fs.readFileSync(`supabase/migrations/${migration}`, 'utf8'));
    for (const migration of ['202610210004_memory_aid_rubric.sql', '202610210006_memory_aid_baselines.sql']) await db.exec(fs.readFileSync(`supabase/migrations/${migration}`, 'utf8'));

    const admin = '00000000-0000-4000-8000-000000000001';
    const doc = '00000000-0000-4000-8000-000000000090';
    const generatedId = '00000000-0000-4000-8000-000000000091';
    const importedId = '00000000-0000-4000-8000-000000000092';
    const conversation = C.normalizeConversation({ conversation_id: doc, messages: [{ turn_id: 'm1', speaker: 'tutor', text: 'Remember PEMDAS to recall the order of operations.' }] });
    const aid = C.createAnnotation('memory_aids', C.makeEvidence(conversation, 'm1', 9, 15), bundledRubric.rubric, 'llm-memory-aid');
    aid.entry.memory_aid = 'PEMDAS for the order of operations';
    await db.query('insert into auth.users(id,email) values($1,$2)', [admin, 'admin@users.annotation.invalid']);
    await db.query("update public.profiles set role='admin' where id=$1", [admin]);
    await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2::jsonb)', [bundledRubric.rubric_sha256, JSON.stringify(bundledRubric)]);
    await db.query('insert into public.conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)', [doc, 'Memory aid baseline', JSON.stringify(conversation), admin]);
    await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${admin}',false);`);
    await db.query('select public.claim_llm_generation($1,$2)', [doc, generatedId]);
    const generated = (await db.query<any>('select public.complete_llm_generation($1,$2,$3::jsonb,$4,$5,$6,$7::jsonb) as value', [generatedId, bundledRubric.rubric_sha256, JSON.stringify([aid]), 'configured/model', 'test/memory-aids', 'Memory aid prompt', '{}'])).rows[0].value;
    expect(generated.annotations).toEqual([aid]);

    await db.exec('reset role;set role service_role');
    const imported = (await db.query<any>('select public.import_llm_baseline($1,$2,$3,$4::jsonb,$5,$6,$7,$8::jsonb,$9) as value', [doc, importedId, bundledRubric.rubric_sha256, JSON.stringify([aid]), 'configured/model', 'test/memory-aids', 'Memory aid prompt', '{}', admin])).rows[0].value;
    expect(imported.annotations).toEqual([aid]);
    expect((await db.query<any>('select count(*)::integer as count from public.llm_baselines where conversation_id=$1', [doc])).rows[0].count).toBe(2);
  } finally {
    await db.close();
  }
});
