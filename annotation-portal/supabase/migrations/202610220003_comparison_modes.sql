begin;

alter table public.comparison_pairs add column mode text not null default 'turn_wise'
  check (mode in ('turn_wise', 'whole_conversation'));
alter table public.comparison_assignments add column mode text not null default 'turn_wise'
  check (mode in ('turn_wise', 'whole_conversation'));
alter table public.comparison_assignments add constraint whole_comparison_has_no_turn_answers
  check (mode = 'turn_wise' or answers = '[]'::jsonb);

drop index public.comparison_pairs_unique_conversations;
create unique index comparison_pairs_unique_conversations on public.comparison_pairs (
  least(conversation_a_id, conversation_b_id), greatest(conversation_a_id, conversation_b_id), mode
);
drop index public.comparison_pair_owner;
create unique index comparison_pair_owner on public.comparison_assignments(pair_id, annotator_id);

create function public.require_comparison_assignment_mode() returns trigger
language plpgsql set search_path = '' as $$
declare pair_mode text;
begin
  select mode into pair_mode from public.comparison_pairs where id = new.pair_id;
  if pair_mode is distinct from new.mode then raise exception 'Comparison assignment mode must match its pair'; end if;
  return new;
end; $$;
create trigger comparison_assignment_mode before insert or update of pair_id, mode
on public.comparison_assignments for each row execute function public.require_comparison_assignment_mode();

drop function public.create_comparison_pair(uuid, uuid, jsonb);
create function public.create_comparison_pair(p_conversation_a_id uuid, p_conversation_b_id uuid, p_questions jsonb, p_mode text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare a jsonb; b jsonb; count_a integer; count_b integer; q jsonb; result uuid;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  if p_mode not in ('turn_wise', 'whole_conversation') or p_mode is null then raise exception 'Choose a comparison mode'; end if;
  if p_conversation_a_id is null or p_conversation_b_id is null or p_conversation_a_id = p_conversation_b_id then
    raise exception 'Choose two different conversations';
  end if;
  select transcript into a from public.conversations where id = p_conversation_a_id;
  select transcript into b from public.conversations where id = p_conversation_b_id;
  if a is null or b is null or (select topic_id from public.conversations where id = p_conversation_a_id) is null
    or (select topic_id from public.conversations where id = p_conversation_a_id) is distinct from
       (select topic_id from public.conversations where id = p_conversation_b_id) then
    raise exception 'Comparisons require two conversations with the same topic ID';
  end if;
  select count(*) into count_a from jsonb_array_elements(a->'messages') t where t->>'speaker' = 'tutor';
  select count(*) into count_b from jsonb_array_elements(b->'messages') t where t->>'speaker' = 'tutor';
  if count_a = 0 or count_b = 0 then raise exception 'Conversations must each have a tutor turn'; end if;
  if p_mode = 'turn_wise' and count_a <> count_b then raise exception 'Turn-wise comparisons require the same number of tutor turns'; end if;
  if jsonb_typeof(p_questions) is distinct from 'array' or jsonb_array_length(p_questions) = 0
    or octet_length(p_questions::text) > 131072 then raise exception 'Invalid comparison questions'; end if;
  for q in select value from jsonb_array_elements(p_questions) loop
    if jsonb_typeof(q) is distinct from 'object' or jsonb_typeof(q->'key') is distinct from 'string'
      or length(q->>'key') = 0 or jsonb_typeof(q->'label') is distinct from 'string'
      or jsonb_typeof(q->'description') is distinct from 'string'
      or jsonb_typeof(q->'subsequent_only') is distinct from 'boolean'
      or q->>'key' = 'instructional_sequence' or coalesce(q->>'scope', 'turn') not in ('turn', 'overall')
      then raise exception 'Invalid comparison question'; end if;
  end loop;
  if (select count(distinct value->>'key') from jsonb_array_elements(p_questions)) <> jsonb_array_length(p_questions)
    or not exists(select 1 from jsonb_array_elements(p_questions) question where coalesce(question->>'scope', 'turn') <> 'overall' and question->>'subsequent_only' = 'false')
    then raise exception 'Invalid comparison questions'; end if;
  insert into public.comparison_pairs(conversation_a_id, conversation_b_id, questions, mode, created_by)
  values (p_conversation_a_id, p_conversation_b_id, p_questions, p_mode, auth.uid())
  on conflict do nothing returning id into result;
  if result is null then
    select id into result from public.comparison_pairs
    where least(conversation_a_id, conversation_b_id) = least(p_conversation_a_id, p_conversation_b_id)
      and greatest(conversation_a_id, conversation_b_id) = greatest(p_conversation_a_id, p_conversation_b_id)
      and mode = p_mode;
  end if;
  return result;
end; $$;
revoke all on function public.create_comparison_pair(uuid, uuid, jsonb, text) from public, anon, authenticated;
grant execute on function public.create_comparison_pair(uuid, uuid, jsonb, text) to authenticated;

create or replace function public.assign_comparison_pair(p_pair_id uuid, p_annotator_ids uuid[])
returns integer language plpgsql security definer set search_path = '' as $$
declare pair public.comparison_pairs; assigned integer;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  select * into pair from public.comparison_pairs where id = p_pair_id for update;
  if pair.id is null then raise exception 'Comparison pair not found'; end if;
  if p_annotator_ids is null or cardinality(p_annotator_ids) = 0 or cardinality(p_annotator_ids) > 100
    or exists(select 1 from unnest(p_annotator_ids) selected(annotator_id)
              where selected.annotator_id is null or not exists(select 1 from public.profiles profile where profile.id = selected.annotator_id and profile.role = 'annotator'))
    then raise exception 'Choose valid annotators'; end if;
  insert into public.comparison_assignments(pair_id, mode, conversation_a_id, conversation_b_id, annotator_id, questions, created_by)
  select pair.id, pair.mode, pair.conversation_a_id, pair.conversation_b_id, selected.annotator_id, pair.questions, auth.uid()
  from (select distinct annotator_id from unnest(p_annotator_ids) input(annotator_id)) selected
  on conflict do nothing;
  get diagnostics assigned = row_count;
  return assigned;
end; $$;

create function public.save_whole_comparison(p_assignment_id uuid, p_revision integer, p_answer jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare assignment public.comparison_assignments; q jsonb; key text; question_count integer := 0;
begin
  select * into assignment from public.comparison_assignments where id = p_assignment_id for update;
  if assignment.id is null or assignment.annotator_id is distinct from auth.uid() then raise exception 'Comparison access denied' using errcode = '42501'; end if;
  if assignment.mode <> 'whole_conversation' then raise exception 'This assignment uses turn-wise comparison'; end if;
  if assignment.revision is distinct from p_revision then raise exception 'Revision conflict. Reload the comparison to continue.' using errcode = '40001'; end if;
  if assignment.status = 'submitted' then raise exception 'Submitted comparison is read only'; end if;
  if jsonb_typeof(p_answer) is distinct from 'object' or jsonb_typeof(p_answer->'values') is distinct from 'object'
    or jsonb_typeof(p_answer->'notes') is distinct from 'string' or octet_length(p_answer::text) > 65536
    or exists(select 1 from jsonb_object_keys(p_answer) k where k not in ('values', 'notes'))
    then raise exception 'Invalid comparison answer'; end if;
  for q in select value from jsonb_array_elements(assignment.questions) loop
    question_count := question_count + 1;
    if jsonb_typeof(p_answer->'values'->(q->>'key')) is distinct from 'string'
      or p_answer->'values'->>(q->>'key') not in ('a', 'b', 'tie') then raise exception 'Answer every comparison question before finishing'; end if;
  end loop;
  if question_count = 0 or (select count(*) from jsonb_object_keys(p_answer->'values')) <> question_count
    then raise exception 'Unexpected comparison question'; end if;
  for key in select jsonb_object_keys(p_answer->'values') loop
    if not exists(select 1 from jsonb_array_elements(assignment.questions) question where question->>'key' = key)
      then raise exception 'Unexpected comparison question'; end if;
  end loop;
  update public.comparison_assignments set overall_answer = p_answer, status = 'submitted', revision = revision + 1,
    submitted_at = now(), updated_at = now() where id = assignment.id returning * into assignment;
  insert into public.comparison_revisions(assignment_id, revision, answers, overall_answer, status, actor_id, question_snapshot)
  values(assignment.id, assignment.revision, assignment.answers, assignment.overall_answer, assignment.status, auth.uid(), assignment.questions);
  return to_jsonb(assignment);
end; $$;
revoke all on function public.save_whole_comparison(uuid, integer, jsonb) from public, anon, authenticated;
grant execute on function public.save_whole_comparison(uuid, integer, jsonb) to authenticated;

commit;
