import { afterAll, beforeAll, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import questions from '../src/generated/comparison-questions.json';
import { comparisonQuestions } from '../src/comparison';

const admin = '00000000-0000-4000-8000-000000000001';
const alice = '00000000-0000-4000-8000-000000000002';
const bob = '00000000-0000-4000-8000-000000000003';
const a = '00000000-0000-4000-8000-000000000010';
const b = '00000000-0000-4000-8000-000000000011';
const otherTopic = '00000000-0000-4000-8000-000000000012';
let db: PGlite;
const asUser = (id: string) => db.exec(`reset role; set role authenticated; select set_config('request.jwt.claim.sub','${id}',false);`);
const create = (first = a, second = b, mode = 'turn_wise') => db.query<{ id: string }>('select public.create_comparison_pair($1,$2,$3::jsonb,$4) as id', [first, second, JSON.stringify(questions), mode]);
const assign = (pair: string, ids: string[]) => db.query<{ count: number }>('select public.assign_comparison_pair($1,$2::uuid[]) as count', [pair, ids]);

beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create schema storage; create table auth.users(id uuid primary key,email text); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema public,auth,storage to anon,authenticated,service_role; grant execute on function auth.uid() to authenticated; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint); create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text); alter table storage.objects enable row level security; grant select,insert,delete on storage.objects to authenticated;`);
  await db.exec(fs.readFileSync('supabase/migrations/202610080001_portal.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610110003_comparison_mode.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610140001_comparison_overall.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610140002_comparison_reset.sql', 'utf8'));
  await db.exec('alter table public.conversations add column topic_id text');
  await db.query('insert into auth.users(id,email) values($1,$2),($3,$4),($5,$6)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid', bob, 'bob@users.annotation.invalid']);
  await db.exec(`update public.profiles set role='admin' where id='${admin}'`);
  for (const [id, topic] of [[a, 'metals'], [b, 'metals'], [otherTopic, 'brain']]) {
    await db.query('insert into public.conversations(id,label,topic_id,transcript,created_by) values($1,$2,$3,$4::jsonb,$5)', [id, id, topic, JSON.stringify({ messages: [{ turn_id: 't1', speaker: 'tutor', text: 'First' }] }), admin]);
  }
  await db.query('insert into public.comparison_assignments(conversation_a_id,conversation_b_id,annotator_id,questions,created_by) values($1,$2,$3,$4::jsonb,$5)', [a, b, alice, JSON.stringify(questions), admin]);
  await db.exec(fs.readFileSync('supabase/migrations/202610220001_comparison_pairs.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610220002_comparison_delete.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610220003_comparison_modes.sql', 'utf8'));
});
afterAll(async () => { await db?.close(); });

it('clears existing assignments and allows an unassigned pair', async () => {
  expect((await db.query('select id from public.comparison_assignments')).rows).toHaveLength(0);
  await asUser(alice);
  await expect(create()).rejects.toThrow(/Admin/);
  await asUser(admin);
  await expect(create(a, a)).rejects.toThrow(/different/);
  await expect(create(a, otherTopic)).rejects.toThrow(/same topic/);
  const pair = (await create()).rows[0].id;
  expect((await create(b, a)).rows[0].id).toBe(pair);
  expect((await db.query('select id from public.comparison_assignments')).rows).toHaveLength(0);
});

it('assigns multiple annotators once each while preserving pair access rules', async () => {
  await asUser(admin);
  const pair = (await create()).rows[0].id;
  await expect(assign(pair, [alice, admin])).rejects.toThrow(/valid annotators/);
  expect((await assign(pair, [alice, bob, bob])).rows[0].count).toBe(2);
  expect((await assign(pair, [alice, bob])).rows[0].count).toBe(0);
  const rows = (await db.query<{ annotator_id: string; pair_id: string }>('select annotator_id,pair_id from public.comparison_assignments order by annotator_id')).rows;
  expect(rows).toEqual([{ annotator_id: alice, pair_id: pair }, { annotator_id: bob, pair_id: pair }]);
  await asUser(alice);
  expect((await db.query('select id from public.comparison_pairs')).rows).toHaveLength(0);
  await expect(assign(pair, [alice])).rejects.toThrow(/Admin/);
  expect((await db.query('select id from public.comparison_assignments')).rows).toHaveLength(1);
});

it('deletes one annotator assignment only with admin access and the current revision', async () => {
  await asUser(alice);
  const assignment = (await db.query<{ id: string }>('select id from public.comparison_assignments')).rows[0].id;
  const remove = (revision: number) => db.query('select public.delete_comparison_assignment($1,$2)', [assignment, revision]);
  await expect(remove(0)).rejects.toThrow(/Admin/);
  await asUser(admin);
  await expect(remove(1)).rejects.toThrow(/Revision conflict/);
  await db.exec('reset role');
  await db.query('insert into public.comparison_revisions(assignment_id,revision,answers,status,actor_id) values($1,0,$2::jsonb,$3,$4)', [assignment, '[]', 'not_started', admin]);
  await asUser(admin);
  const result = (await remove(0)).rows[0] as { delete_comparison_assignment: { deleted: boolean } };
  expect(result.delete_comparison_assignment.deleted).toBe(true);
  expect((await db.query('select id from public.comparison_assignments')).rows).toHaveLength(1);
  expect((await db.query('select id from public.comparison_pairs')).rows).toHaveLength(1);
  expect((await db.query('select * from public.comparison_revisions')).rows).toHaveLength(0);
});

it('deletes the pair and its assignments only when the expected work is unchanged', async () => {
  await asUser(admin);
  const pair = (await db.query<{ id: string }>('select id from public.comparison_pairs')).rows[0].id;
  const current = (await db.query<{ id: string; revision: number }>('select id,revision from public.comparison_assignments where pair_id=$1 order by id', [pair])).rows;
  const remove = (expected: unknown) => db.query('select public.delete_comparison_pair($1,$2::jsonb)', [pair, JSON.stringify(expected)]);
  await expect(remove([])).rejects.toThrow(/changed/);
  await asUser(bob);
  await expect(remove(current)).rejects.toThrow(/Admin/);
  await asUser(admin);
  const result = (await remove(current)).rows[0] as { delete_comparison_pair: { deleted: boolean; deleted_assignments: number } };
  expect(result.delete_comparison_pair).toEqual({ deleted: true, deleted_assignments: 1, pair_id: pair });
  expect((await db.query('select id from public.comparison_pairs')).rows).toHaveLength(0);
  expect((await db.query('select id from public.comparison_assignments')).rows).toHaveLength(0);
});

it('keeps both modes for the same conversations and saves one whole-conversation answer', async () => {
  await asUser(admin);
  const turnPair = (await create()).rows[0].id;
  const wholePair = (await create(a, b, 'whole_conversation')).rows[0].id;
  expect(wholePair).not.toBe(turnPair);
  expect((await assign(turnPair, [alice])).rows[0].count).toBe(1);
  expect((await assign(wholePair, [alice])).rows[0].count).toBe(1);
  const whole = (await db.query<{ id: string; mode: string }>('select id,mode from public.comparison_assignments where pair_id=$1', [wholePair])).rows[0];
  expect(whole.mode).toBe('whole_conversation');
  await asUser(alice);
  const save = (values: Record<string, string>) => db.query<{ result: { status: string; answers: unknown[]; overall_answer: { values: Record<string, string> } } }>('select public.save_whole_comparison($1,0,$2::jsonb) as result', [whole.id, JSON.stringify({ values, notes: 'Compared complete transcripts' })]);
  await expect(save({})).rejects.toThrow(/every comparison question/);
  const values = Object.fromEntries(questions.map(question => [question.key, 'tie']));
  const result = (await save(values)).rows[0].result;
  expect(result.status).toBe('submitted');
  expect(result.answers).toEqual([]);
  expect(result.overall_answer.values).toEqual(values);
  await expect(save(values)).rejects.toThrow(/Revision conflict/);
});

it('removes the retired question from active assignments while retaining completed history', async () => {
  await db.exec('reset role');
  const retired = { ...questions.at(-1), key: 'overall_conversational_naturalness', label: 'Overall Conversational Naturalness', description: 'Which of the two conversations felt more natural and conversational?' };
  const oldQuestions = JSON.stringify([...questions, retired]);
  const active = (await db.query<{ id: string; pair_id: string }>('select id,pair_id from public.comparison_assignments where status <> $1 limit 1', ['submitted'])).rows[0];
  const completed = (await db.query<{ id: string; questions: unknown }>('select id,questions from public.comparison_assignments where status = $1 limit 1', ['submitted'])).rows[0];
  await db.query('update public.comparison_pairs set questions=$2::jsonb where id=$1', [active.pair_id, oldQuestions]);
  await db.query('update public.comparison_assignments set questions=$2::jsonb where id=$1', [active.id, oldQuestions]);
  await db.exec(fs.readFileSync('supabase/migrations/202610220004_remove_comparison_naturalness.sql', 'utf8'));
  const changed = (await db.query<{ revision: number; questions: { key: string }[] }>('select revision,questions from public.comparison_assignments where id=$1', [active.id])).rows[0];
  expect(changed.revision).toBe(1);
  expect(changed.questions.some(q => q.key === retired.key)).toBe(false);
  expect((await db.query<{ questions: { key: string }[] }>('select questions from public.comparison_pairs where id=$1', [active.pair_id])).rows[0].questions.some(q => q.key === retired.key)).toBe(false);
  expect((await db.query<{ operation: string; question_snapshot: { key: string }[] }>('select operation,question_snapshot from public.comparison_revisions where assignment_id=$1 order by revision', [active.id])).rows.map(row => row.operation)).toEqual(['rubric_update', 'rubric_update']);
  expect((await db.query<{ questions: unknown }>('select questions from public.comparison_assignments where id=$1', [completed.id])).rows[0].questions).toEqual(completed.questions);
});

it('unassigns comparisons without losing revisions, blocks further saves, and permits reassignment', async () => {
  await db.exec(fs.readFileSync('supabase/migrations/202610220005_comparison_unassignment.sql', 'utf8'));
  await asUser(admin);
  const assignments = (await db.query<{ id: string; pair_id: string; revision: number; mode: string }>('select id,pair_id,revision,mode from public.comparison_assignments order by mode')).rows;
  const turn = assignments.find(row => row.mode === 'turn_wise')!;
  const whole = assignments.find(row => row.mode === 'whole_conversation')!;
  const unassign = (row: typeof turn) => db.query<{ result: { unassigned: boolean } }>('select public.unassign_comparison_assignment($1,$2) as result', [row.id, row.revision]);
  await expect(db.query('select public.unassign_comparison_assignment($1,$2)', [whole.id, whole.revision + 1])).rejects.toThrow(/Revision conflict/);
  expect((await unassign(whole)).rows[0].result.unassigned).toBe(true);
  expect((await unassign(turn)).rows[0].result.unassigned).toBe(true);
  expect((await db.query<{ count: number }>('select count(*) from public.comparison_revisions where assignment_id=$1', [whole.id])).rows[0].count).toBe(1);
  await asUser(alice);
  expect((await db.query('select id from public.comparison_assignments')).rows).toHaveLength(0);
  expect((await db.query('select id from public.conversations')).rows).toHaveLength(0);
  const answers = Object.fromEntries(comparisonQuestions(questions, 0).map(question => [question.key, 'tie']));
  await expect(db.query('select public.save_comparison_round($1,$2,0,$3::jsonb)', [turn.id, turn.revision, JSON.stringify({ values: answers, notes: '' })])).rejects.toThrow(/no longer active/);
  await asUser(admin);
  expect((await assign(turn.pair_id, [alice])).rows[0].count).toBe(1);
  const rows = (await db.query<{ id: string; is_active: boolean }>('select id,is_active from public.comparison_assignments where pair_id=$1 order by created_at,id', [turn.pair_id])).rows;
  expect(rows).toHaveLength(2);
  expect(rows.find(row => row.id === turn.id)?.is_active).toBe(false);
  expect(rows.find(row => row.id !== turn.id)?.is_active).toBe(true);
});
