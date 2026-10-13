import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import questions from '../src/generated/rating-questions.json';
import { comparisonQuestions } from '../src/comparison';

const admin = '00000000-0000-4000-8000-000000000001', alice = '00000000-0000-4000-8000-000000000002', bob = '00000000-0000-4000-8000-000000000003';
const docA = '00000000-0000-4000-8000-000000000010', docB = '00000000-0000-4000-8000-000000000011', short = '00000000-0000-4000-8000-000000000012';
let db: PGlite; let assignment: string;
async function asUser(id: string) { await db.exec(`reset role; set role authenticated; select set_config('request.jwt.claim.sub','${id}',false);`); }
async function create(a = docA, b = docB) { return db.query<{ id: string }>('select public.create_comparison_assignment($1,$2,$3,$4::jsonb) as id', [a, b, alice, JSON.stringify(questions)]); }
async function save(revision: number, round: number, values: Record<string, string>) {
  return db.query<{ result: { revision: number; status: string; answers: unknown[] } }>('select public.save_comparison_round($1,$2,$3,$4::jsonb) as result', [assignment, revision, round, JSON.stringify({ values, notes: '' })]);
}
const values = (round: number) => Object.fromEntries(comparisonQuestions(questions, round).map(q => [q.key, 'tie']));
beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create schema storage; create table auth.users(id uuid primary key,email text); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema public,auth,storage to anon,authenticated,service_role; grant execute on function auth.uid() to authenticated; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint); create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text); alter table storage.objects enable row level security; grant select,insert,delete on storage.objects to authenticated;`);
  await db.exec(fs.readFileSync('supabase/migrations/202610080001_portal.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610110003_comparison_mode.sql', 'utf8'));
  await db.query('insert into auth.users(id,email) values($1,$2),($3,$4),($5,$6)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid', bob, 'bob@users.annotation.invalid']);
  await db.exec(`update public.profiles set role='admin' where id='${admin}'`);
  for (const id of [docA, docB, short]) await db.query('insert into public.conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)', [id, id, JSON.stringify({ messages: [{ turn_id: 't1', speaker: 'tutor', text: 'First' }, ...(id === short ? [] : [{ turn_id: 's1', speaker: 'student', text: 'Reply' }, { turn_id: 't2', speaker: 'tutor', text: 'Second' }])] }), admin]);
});
afterAll(async () => { await db?.close(); });
describe.sequential('comparison permissions and sequential saving', () => {
  it('restricts creation to admins, validates pairs, and preserves duplicate work', async () => {
    await asUser(alice); await expect(create()).rejects.toThrow(/Admin/);
    await asUser(admin); await expect(create(docA, docA)).rejects.toThrow(/different/);
    await expect(create(docA, short)).rejects.toThrow(/same nonzero/);
    assignment = (await create()).rows[0].id;
    expect((await create(docB, docA)).rows[0].id).toBe(assignment);
    await expect(db.exec(`update public.comparison_assignments set answers='[]'`)).rejects.toThrow(/permission denied/);
  });
  it('grants both transcripts only to the assigned annotator and admin', async () => {
    await asUser(bob); expect((await db.query('select * from public.comparison_assignments')).rows).toHaveLength(0);
    expect((await db.query('select * from public.conversations')).rows).toHaveLength(0);
    await expect(save(0, 0, values(0))).rejects.toThrow(/denied/);
    await asUser(admin); await expect(save(0, 0, values(0))).rejects.toThrow(/denied/);
    await asUser(alice); expect((await db.query('select * from public.conversations')).rows).toHaveLength(2);
  });
  it('blocks skipped turns, missing questions, invalid choices, and later-only questions', async () => {
    await expect(save(0, 1, values(1))).rejects.toThrow(/current comparison/);
    await expect(save(0, 0, {})).rejects.toThrow(/every rating/);
    await expect(save(0, 0, { ...values(0), [questions[0].key]: 'invalid' })).rejects.toThrow(/every rating/);
    await expect(save(0, 0, { ...values(0), coherence: 'a' })).rejects.toThrow(/Unexpected/);
    const result = (await save(0, 0, values(0))).rows[0].result;
    expect(result.status).toBe('in_progress'); expect(result.answers).toHaveLength(1);
  });
  it('rejects stale saves, requires subsequent questions, submits the final turn, and audits', async () => {
    await expect(save(0, 1, values(1))).rejects.toThrow(/Revision conflict/);
    await expect(save(1, 1, values(0))).rejects.toThrow(/every rating/);
    const result = (await save(1, 1, values(1))).rows[0].result;
    expect(result.status).toBe('submitted'); expect(result.revision).toBe(2); expect(result.answers).toHaveLength(2);
    await expect(save(2, 2, values(1))).rejects.toThrow(/read only/);
    expect((await db.query('select * from public.comparison_revisions')).rows).toHaveLength(2);
    await asUser(bob); expect((await db.query('select * from public.comparison_revisions')).rows).toHaveLength(0);
  });
});
