import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import questions from '../src/generated/rating-questions.json';
import newQuestions from '../src/generated/comparison-questions.json';
import { comparisonQuestions, overallComparisonQuestions } from '../src/comparison';

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
  await db.exec(fs.readFileSync('supabase/migrations/202610140001_comparison_overall.sql', 'utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/202610140002_comparison_reset.sql', 'utf8'));
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


describe.sequential('final overall comparison ratings', () => {
  let newId: string;
  const turnValues = (round: number) => Object.fromEntries(comparisonQuestions(newQuestions, round).map(q => [q.key, 'tie']));
  const overallValues = () => Object.fromEntries(overallComparisonQuestions(newQuestions).map(q => [q.key, 'a']));
  const overall = (revision: number, values = overallValues()) => db.query<{ result: { status: string; revision: number; overall_answer: unknown } }>('select public.save_comparison_overall($1,$2,$3::jsonb) as result', [newId, revision, JSON.stringify({ values, notes: 'Whole conversation judgment' })]);
  it('stores all questions but prevents overall answers before all turns', async () => {
    await asUser(admin);
    newId = (await db.query<{ id: string }>('select public.create_comparison_assignment($1,$2,$3,$4::jsonb) as id', [docA, docB, bob, JSON.stringify(newQuestions)])).rows[0].id;
    await asUser(alice); await expect(overall(0)).rejects.toThrow(/denied/);
    await asUser(bob); await expect(overall(0)).rejects.toThrow(/Complete all turn/);
    await expect(db.query('select public.save_comparison_round($1,0,0,$2::jsonb)', [newId, JSON.stringify({ values: { ...turnValues(0), ...overallValues() }, notes: '' })])).rejects.toThrow(/Unexpected/);
  });
  it('keeps the comparison in progress after the final tutor turn', async () => {
    for (let round = 0; round < 2; round++) {
      const result = (await db.query<{ result: { status: string; submitted_at: string | null } }>('select public.save_comparison_round($1,$2,$3,$4::jsonb) as result', [newId, round, round, JSON.stringify({ values: turnValues(round), notes: '' })])).rows[0].result;
      expect(result.status).toBe('in_progress'); expect(result.submitted_at).toBeNull();
    }
  });
  it('requires both valid overall choices, checks revisions, and submits with audited answers', async () => {
    await expect(overall(1)).rejects.toThrow(/Revision conflict/);
    await expect(overall(2, {})).rejects.toThrow(/every overall/);
    await expect(overall(2, { ...overallValues(), overall_learning_goal: 'invalid' })).rejects.toThrow(/every overall/);
    await expect(overall(2, { ...overallValues(), principle_focus: 'b' })).rejects.toThrow(/Unexpected/);
    const result = (await overall(2)).rows[0].result;
    expect(result.status).toBe('submitted'); expect(result.revision).toBe(3);
    expect(result.overall_answer).toEqual({ values: overallValues(), notes: 'Whole conversation judgment' });
    await expect(overall(3)).rejects.toThrow(/read only/);
    const history = await db.query<{ overall_answer: unknown }>('select overall_answer from public.comparison_revisions where assignment_id=$1 order by revision desc', [newId]);
    expect(history.rows).toHaveLength(3); expect(history.rows[0].overall_answer).toEqual(result.overall_answer);
  });
});


describe.sequential('admin comparison reset', () => {
  const reset = (revision: number, selectedQuestions = newQuestions) => db.query<{ result: { status: string; revision: number; answers: unknown[]; questions: unknown[]; overall_answer: unknown; submitted_at: unknown } }>('select public.reset_comparison_assignment($1,$2,$3::jsonb) as result', [assignment, revision, JSON.stringify(selectedQuestions)]);
  it('rejects annotators, stale revisions, and invalid question sets without changing saved work', async () => {
    await asUser(alice); await expect(reset(2)).rejects.toThrow(/Admin/);
    await asUser(bob); await expect(reset(2)).rejects.toThrow(/Admin/);
    await asUser(admin); await expect(reset(1)).rejects.toThrow(/Revision conflict/);
    await expect(reset(2, [])).rejects.toThrow(/Invalid comparison questions/);
    const row = (await db.query<{ status: string; revision: number }>('select status,revision from public.comparison_assignments where id=$1', [assignment])).rows[0];
    expect(row).toEqual({ status: 'submitted', revision: 2 });
  });
  it('reopens the assignment with current questions, clears responses, and audits both states', async () => {
    const result = (await reset(2)).rows[0].result;
    expect(result.status).toBe('not_started'); expect(result.revision).toBe(3);
    expect(result.answers).toEqual([]); expect(result.overall_answer).toBeNull(); expect(result.submitted_at).toBeNull();
    expect(result.questions).toEqual(newQuestions);
    const history = (await db.query<{ revision: number; operation: string; actor_id: string; question_snapshot: unknown; answers: unknown[] }>('select revision,operation,actor_id,question_snapshot,answers from public.comparison_revisions where assignment_id=$1 order by revision', [assignment])).rows;
    expect(history).toHaveLength(3);
    expect(history[1].answers).toHaveLength(2); expect(history[1].question_snapshot).toEqual(questions);
    expect(history[2].operation).toBe('reset'); expect(history[2].actor_id).toBe(admin); expect(history[2].question_snapshot).toEqual(newQuestions);
    await asUser(alice); await expect(save(2, 0, values(0))).rejects.toThrow(/Revision conflict/);
    const newValues = Object.fromEntries(comparisonQuestions(newQuestions, 0).map(q => [q.key, 'tie']));
    expect((await save(3, 0, newValues)).rows[0].result.status).toBe('in_progress');
  });
  it('preserves overall ratings when resetting a fully completed new comparison', async () => {
    await asUser(admin);
    const target = (await db.query<{ id: string; revision: number }>('select id,revision from public.comparison_assignments where annotator_id=$1', [bob])).rows[0];
    const result = (await db.query<{ result: { overall_answer: unknown } }>('select public.reset_comparison_assignment($1,$2,$3::jsonb) as result', [target.id,target.revision,JSON.stringify(newQuestions)])).rows[0].result;
    expect(result.overall_answer).toBeNull();
    const history = (await db.query<{ overall_answer: unknown; question_snapshot: unknown }>('select overall_answer,question_snapshot from public.comparison_revisions where assignment_id=$1 and revision=$2', [target.id,target.revision])).rows[0];
    expect(history.overall_answer).not.toBeNull(); expect(history.question_snapshot).toEqual(newQuestions);
  });
});
