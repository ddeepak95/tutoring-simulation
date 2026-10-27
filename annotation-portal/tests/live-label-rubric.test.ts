import { expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { C } from '../src/lib';
import {bundledRubric} from './fixtures/legacy-rubric';

it('makes an added feature available on active labels without changing saved work or submissions', async () => {
  const db = new PGlite();
  const admin = '00000000-0000-4000-8000-000000000001';
  const alice = '00000000-0000-4000-8000-000000000002';
  const bob = '00000000-0000-4000-8000-000000000003';
  const doc = '00000000-0000-4000-8000-000000000010';
  const activeId = '00000000-0000-4000-8000-000000000011';
  const submittedId = '00000000-0000-4000-8000-000000000012';
  const newHash = 'f'.repeat(64);
  try {
    await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;`);
    for (const file of fs.readdirSync('supabase/migrations').filter(file => file.endsWith('.sql') && file < '202610210001').sort()) {
      await db.exec(fs.readFileSync(`supabase/migrations/${file}`, 'utf8'));
    }
    await db.exec(fs.readFileSync('supabase/migrations/202610210004_memory_aid_rubric.sql', 'utf8'));
    await db.exec(fs.readFileSync('supabase/migrations/202610210011_highlight_item_counts.sql', 'utf8').split('-- Keep active Label work')[0] + 'commit;');
    await db.exec(fs.readFileSync('supabase/migrations/202610210020_live_label_rubric.sql', 'utf8'));
    await db.query('insert into auth.users(id,email) values($1,$2),($3,$4),($5,$6)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid', bob, 'bob@users.annotation.invalid']);
    await db.query("update public.profiles set role='admin' where id=$1", [admin]);
    const newer = { ...bundledRubric, rubric_sha256: newHash, rubric: [...bundledRubric.rubric, { key: 'worked_steps', name: 'Worked Steps', short_label: 'Worked steps', color: '#36759c', highlight: '#e7f2fa', description: 'Worked steps', entry_attributes: '`step`', guidance: 'Record worked steps.', fields: [{ key: 'step', label: 'Step' }] }] };
    expect(C.formFields(newer.rubric.at(-1)!)).toEqual([{ key: 'step', label: 'Step' }]);
    await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2::jsonb),($3,$4::jsonb)', [bundledRubric.rubric_sha256, JSON.stringify(bundledRubric), newHash, JSON.stringify(newer)]);
    const conversation = C.normalizeConversation({ conversation_id: doc, messages: [{ turn_id: 't1', speaker: 'tutor', text: 'Water evaporates.' }] });
    const annotation = C.createAnnotation('examples', C.makeEvidence(conversation, 't1', 0, 17), bundledRubric.rubric, 'example-1');
    annotation.entry.detail_level = 'Brief';
    await db.query('insert into public.conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)', [doc, 'Live feature test', JSON.stringify(conversation), admin]);
    await db.query("insert into public.assignments(id,conversation_id,annotator_id,rubric_hash,task_type,status,revision,annotations) values($1,$2,$3,$4,'label','in_progress',1,$5::jsonb),($6,$2,$7,$4,'label','submitted',1,$5::jsonb)", [activeId, doc, alice, bundledRubric.rubric_sha256, JSON.stringify([annotation]), submittedId, bob]);
    await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${alice}',false);`);
    const upgrade = () => db.query<{ changed: boolean }>('select public.upgrade_label_assignment_rubric($1,$2) as changed', [activeId, newHash]);
    expect((await upgrade()).rows[0].changed).toBe(true);
    expect((await upgrade()).rows[0].changed).toBe(true);
    const row = (await db.query<any>('select rubric_hash,annotations,revision,status from public.assignments where id=$1', [activeId])).rows[0];
    expect(row).toEqual({ rubric_hash: newHash, annotations: [annotation], revision: 1, status: 'in_progress' });
    const added = C.createAnnotation('worked_steps', C.makeEvidence(conversation, 't1', 0, 17), newer.rubric, 'step-1');
    const saved = (await db.query<any>('select public.save_assignment($1,1,$2::jsonb,false,$3::jsonb) as value', [activeId, JSON.stringify([annotation, added]), '{}'])).rows[0].value;
    expect(saved.annotations).toEqual([annotation, added]);
    await expect(db.query('select public.upgrade_label_assignment_rubric($1,$2)', [submittedId, newHash])).rejects.toThrow(/access denied/i);
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','${bob}',false);`);
    expect((await db.query<{ changed: boolean }>('select public.upgrade_label_assignment_rubric($1,$2) as changed', [submittedId, newHash])).rows[0].changed).toBe(false);
    await db.exec('reset role;');
    const submitted = (await db.query<any>('select rubric_hash,annotations from public.assignments where id=$1', [submittedId])).rows[0];
    expect(submitted).toEqual({ rubric_hash: bundledRubric.rubric_sha256, annotations: [annotation] });
    const audit = (await db.query<any>('select old_rubric_hash,new_rubric_hash from public.assignment_rubric_upgrades where assignment_id=$1', [activeId])).rows;
    expect(audit).toEqual([{ old_rubric_hash: bundledRubric.rubric_sha256, new_rubric_hash: newHash }]);
  } finally { await db.close(); }
});
