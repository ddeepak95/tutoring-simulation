import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { C } from '../src/lib';
import {bundledRubric} from './fixtures/legacy-rubric';
import { completeRatings } from './ratings-fixture';

const admin = '00000000-0000-4000-8000-000000000001', alice = '00000000-0000-4000-8000-000000000002';
const doomed = '00000000-0000-4000-8000-000000000010', other = '00000000-0000-4000-8000-000000000020';
const assignment = '00000000-0000-4000-8000-000000000011', otherAssignment = '00000000-0000-4000-8000-000000000021';
const transcript = C.normalizeConversation({ conversation_id: doomed, messages: [{ turn_id: 't1', speaker: 'tutor', text: 'Water evaporates.' }] });
let db: PGlite;
async function asUser(id: string) { await db.exec(`reset role; set role authenticated; select set_config('request.jwt.claim.sub', '${id}', false);`); }
async function preview(id = doomed) { return (await db.query<{ value: any }>('select public.preview_conversation_deletion($1) as value', [id])).rows[0].value; }
async function remove(snapshot: string | null, id = doomed) { return (await db.query<{ value: any }>('select public.delete_conversation($1,$2) as value', [id, snapshot])).rows[0].value; }
beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create schema storage; create table auth.users(id uuid primary key, email text); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$; grant usage on schema public, auth, storage to anon, authenticated, service_role; grant execute on function auth.uid() to authenticated; create table storage.buckets(id text primary key, name text, public boolean, file_size_limit bigint); create table storage.objects(id uuid primary key default gen_random_uuid(), bucket_id text, name text); alter table storage.objects enable row level security; grant select, insert, delete on storage.objects to authenticated;`);
  await db.exec(fs.readFileSync('supabase/migrations/202610080001_portal.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610090001_turn_ratings_issues.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610210004_memory_aid_rubric.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610080002_conversation_ids.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610080003_conversation_deletion.sql', 'utf8'));
  await db.query('insert into auth.users(id,email) values($1,$2),($3,$4)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid']);
  await db.exec(`update public.profiles set role='admin' where id='${admin}'`);
  await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2) on conflict(hash) do nothing', [bundledRubric.rubric_sha256, JSON.stringify(bundledRubric)]);
  for (const [id, assignmentId] of [[doomed, assignment], [other, otherAssignment]]) {
    await db.query('insert into public.conversations(id,label,transcript,created_by,source_path) values($1,$2,$3,$4,$5)', [id, 'Test', JSON.stringify({ ...transcript, conversation_id: id }), admin, `repository/${id}.json`]);
    await db.query('insert into public.assignments(id,conversation_id,annotator_id,rubric_hash) values($1,$2,$3,$4)', [assignmentId, id, alice, bundledRubric.rubric_sha256]);
    await db.query("insert into storage.objects(bucket_id,name) values('transcripts',$1)", [`repository/${id}.json`]);
  }
});
afterAll(async () => { await db?.close(); });

describe.sequential('admin conversation deletion', () => {
  it('denies preview and deletion to annotators and anonymous callers, and forbids direct deletes', async () => {
    await asUser(alice); await expect(preview()).rejects.toThrow(/Admin/); await expect(remove('fake')).rejects.toThrow(/Admin/);
    await db.exec('reset role; set role anon;'); await expect(preview()).rejects.toThrow(/permission/); await expect(remove('fake')).rejects.toThrow(/permission/);
    await asUser(admin); await expect(db.exec('delete from public.conversations')).rejects.toThrow(/permission/); await expect(db.exec('delete from public.assignments')).rejects.toThrow(/permission/);
  });
  it('shows exact work counts and rejects stale confirmations after saves or new assignments', async () => {
    await asUser(admin); const first = await preview(); expect(first.assignment_count).toBe(1); expect(first.annotation_count).toBe(0); expect(first.revision_count).toBe(0);
    await expect(remove(null)).rejects.toThrow(/changed/);
    const annotation = C.createAnnotation('examples', C.makeEvidence(transcript, 't1', 0, 16), bundledRubric.rubric, 'example'); annotation.entry.detail_level = 'Brief';
    await asUser(alice); await db.query('select public.save_assignment($1,0,$2,true,$3::jsonb)', [assignment, JSON.stringify([annotation]), JSON.stringify(completeRatings(transcript, bundledRubric))]);
    await asUser(admin); await expect(remove(first.snapshot)).rejects.toThrow(/changed/);
    const second = await preview(); expect(second.assignment_count).toBe(1); expect(second.annotation_count).toBe(1); expect(second.revision_count).toBe(1);
    await db.exec('reset role;');
    await db.query('insert into public.assignments(conversation_id,annotator_id,rubric_hash) values($1,$2,$3)', [doomed, admin, bundledRubric.rubric_sha256]);
    await asUser(admin); await expect(remove(second.snapshot)).rejects.toThrow(/changed/);
    expect((await db.query('select * from conversations')).rows).toHaveLength(2); expect((await db.query('select * from annotation_revisions')).rows).toHaveLength(1);
  });
  it('atomically deletes only the confirmed conversation and its work, retaining sources and other conversations', async () => {
    await asUser(admin); const before = await preview(); const retained = await preview(other);
    const result = await remove(before.snapshot); expect(result.deleted).toBe(true); expect(result.assignment_count).toBe(2); expect(result.revision_count).toBe(1);
    expect((await db.query('select id from conversations')).rows).toEqual([{ id: other }]);
    expect((await db.query('select id from assignments')).rows).toEqual([{ id: otherAssignment }]); expect((await db.query('select * from annotation_revisions')).rows).toHaveLength(0);
    expect(await preview(other)).toEqual(retained); expect((await db.query('select * from storage.objects')).rows).toHaveLength(2);
    await expect(remove(before.snapshot)).rejects.toThrow(/no longer exists/);
    await asUser(alice); expect((await db.query('select id from assignments')).rows).toEqual([{ id: otherAssignment }]);
    await expect(db.query('select public.save_assignment($1,1,$2,false)', [assignment, '[]'])).rejects.toThrow(/denied/);
  });
});
