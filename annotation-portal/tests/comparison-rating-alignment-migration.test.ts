import { afterAll, beforeAll, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';

let db: PGlite;
beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create table public.comparison_assignments (
      id uuid primary key, status text not null, answers jsonb not null,
      overall_answer jsonb, questions jsonb not null, revision integer not null,
      created_by uuid not null, updated_at timestamptz not null default now()
    );
    create table public.comparison_revisions (
      assignment_id uuid not null, revision integer not null, answers jsonb not null,
      overall_answer jsonb, status text not null, actor_id uuid not null,
      question_snapshot jsonb, operation text not null,
      primary key (assignment_id, revision)
    );`);
  const oldQuestions = [{ key: 'principle_focus', question_set: 'instructional-comparison-v3' }];
  for (const [id, status, answers] of [
    ['00000000-0000-4000-8000-000000000001', 'not_started', []],
    ['00000000-0000-4000-8000-000000000002', 'in_progress', [{ values: { principle_focus: 'a' }, notes: '' }]],
  ] as const) await db.query('insert into public.comparison_assignments(id,status,answers,questions,revision,created_by) values($1,$2,$3::jsonb,$4::jsonb,$5,$6)', [id, status, JSON.stringify(answers), JSON.stringify(oldQuestions), answers.length, '00000000-0000-4000-8000-000000000010']);
});
afterAll(async () => { await db?.close(); });

it('upgrades untouched comparisons and audits old questions without changing saved work', async () => {
  const sql = fs.readFileSync('supabase/migrations/202610210019_comparison_rating_alignment.sql', 'utf8');
  await db.exec(sql);
  const assignments = (await db.query<{ id: string; questions: { question_set: string }[]; revision: number; answers: unknown[] }>('select id,questions,revision,answers from public.comparison_assignments order by id')).rows;
  expect(assignments[0].questions[0].question_set).toBe('instructional-comparison-v4');
  expect(assignments[0].revision).toBe(1);
  expect(assignments[0].answers).toEqual([]);
  expect(assignments[1].questions[0].question_set).toBe('instructional-comparison-v3');
  expect(assignments[1].revision).toBe(1);
  expect(assignments[1].answers).toHaveLength(1);
  const history = (await db.query<{ revision: number; operation: string; question_snapshot: { question_set: string }[] }>('select revision,operation,question_snapshot from public.comparison_revisions order by revision')).rows;
  expect(history.map(row => [row.revision, row.operation, row.question_snapshot[0].question_set])).toEqual([
    [0, 'reset_before', 'instructional-comparison-v3'],
    [1, 'reset', 'instructional-comparison-v4'],
  ]);
  await db.exec(sql);
  expect((await db.query('select * from public.comparison_revisions')).rows).toHaveLength(2);
});
