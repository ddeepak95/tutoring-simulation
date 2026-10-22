begin;

alter table public.comparison_revisions drop constraint comparison_revisions_operation_check;
alter table public.comparison_revisions add constraint comparison_revisions_operation_check
  check (operation in ('save', 'reset_before', 'reset', 'rubric_update'));

-- Retain completed responses and their question snapshots for the audit trail.
insert into public.comparison_revisions
  (assignment_id, revision, answers, overall_answer, status, actor_id, question_snapshot, operation)
select id, revision, answers, overall_answer, status, created_by, questions, 'rubric_update'
from public.comparison_assignments a
where status <> 'submitted' and exists (
  select 1 from jsonb_array_elements(a.questions) q where q->>'key' = 'overall_conversational_naturalness'
)
on conflict (assignment_id, revision) do update
  set question_snapshot = coalesce(public.comparison_revisions.question_snapshot, excluded.question_snapshot);

update public.comparison_pairs p
set questions = (select jsonb_agg(q.value order by q.ordinality)
  from jsonb_array_elements(p.questions) with ordinality q(value, ordinality)
  where q.value->>'key' <> 'overall_conversational_naturalness')
where exists (select 1 from jsonb_array_elements(p.questions) q where q->>'key' = 'overall_conversational_naturalness');

with updated as (
  update public.comparison_assignments a
  set questions = (select jsonb_agg(q.value order by q.ordinality)
    from jsonb_array_elements(a.questions) with ordinality q(value, ordinality)
    where q.value->>'key' <> 'overall_conversational_naturalness'),
    revision = revision + 1, updated_at = now()
  where status <> 'submitted' and exists (
    select 1 from jsonb_array_elements(a.questions) q where q->>'key' = 'overall_conversational_naturalness'
  )
  returning *
)
insert into public.comparison_revisions
  (assignment_id, revision, answers, overall_answer, status, actor_id, question_snapshot, operation)
select id, revision, answers, overall_answer, status, created_by, questions, 'rubric_update' from updated;

commit;
