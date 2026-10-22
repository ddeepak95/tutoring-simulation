begin;

create table public.comparison_pairs (
  id uuid primary key default gen_random_uuid(),
  conversation_a_id uuid not null references public.conversations(id) on delete cascade,
  conversation_b_id uuid not null references public.conversations(id) on delete cascade,
  questions jsonb not null check (jsonb_typeof(questions) = 'array'),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  check (conversation_a_id <> conversation_b_id)
);
create unique index comparison_pairs_unique_conversations on public.comparison_pairs (
  least(conversation_a_id, conversation_b_id), greatest(conversation_a_id, conversation_b_id)
);
delete from public.comparison_assignments;
alter table public.comparison_assignments add column pair_id uuid not null references public.comparison_pairs(id) on delete cascade;
create index comparison_assignments_pair_id on public.comparison_assignments(pair_id);

alter table public.comparison_pairs enable row level security;
revoke all on public.comparison_pairs from anon, authenticated;
grant select on public.comparison_pairs to authenticated;
grant all on public.comparison_pairs to service_role;
create policy comparison_pairs_read on public.comparison_pairs for select to authenticated using (public.is_admin());

create function public.create_comparison_pair(p_conversation_a_id uuid, p_conversation_b_id uuid, p_questions jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare a jsonb; b jsonb; count_a integer; count_b integer; q jsonb; result uuid;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
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
  if count_a = 0 or count_a <> count_b then raise exception 'Conversations must have the same nonzero number of tutor turns'; end if;
  if jsonb_typeof(p_questions) is distinct from 'array' or jsonb_array_length(p_questions) = 0
    or octet_length(p_questions::text) > 131072 then raise exception 'Invalid comparison questions'; end if;
  for q in select value from jsonb_array_elements(p_questions) loop
    if jsonb_typeof(q) is distinct from 'object' or jsonb_typeof(q->'key') is distinct from 'string'
      or length(q->>'key') = 0 or jsonb_typeof(q->'label') is distinct from 'string'
      or jsonb_typeof(q->'description') is distinct from 'string'
      or jsonb_typeof(q->'subsequent_only') is distinct from 'boolean'
      or q->>'key' = 'instructional_sequence' then raise exception 'Invalid comparison question'; end if;
  end loop;
  if (select count(distinct value->>'key') from jsonb_array_elements(p_questions)) <> jsonb_array_length(p_questions)
    or not exists(select 1 from jsonb_array_elements(p_questions) question where question->>'subsequent_only' = 'false')
    then raise exception 'Invalid comparison questions'; end if;
  insert into public.comparison_pairs(conversation_a_id, conversation_b_id, questions, created_by)
  values (p_conversation_a_id, p_conversation_b_id, p_questions, auth.uid())
  on conflict do nothing returning id into result;
  if result is null then
    select id into result from public.comparison_pairs
    where least(conversation_a_id, conversation_b_id) = least(p_conversation_a_id, p_conversation_b_id)
      and greatest(conversation_a_id, conversation_b_id) = greatest(p_conversation_a_id, p_conversation_b_id);
  end if;
  return result;
end; $$;

create function public.assign_comparison_pair(p_pair_id uuid, p_annotator_ids uuid[])
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
  insert into public.comparison_assignments(pair_id, conversation_a_id, conversation_b_id, annotator_id, questions, created_by)
  select pair.id, pair.conversation_a_id, pair.conversation_b_id, selected.annotator_id, pair.questions, auth.uid()
  from (select distinct annotator_id from unnest(p_annotator_ids) input(annotator_id)) selected
  on conflict do nothing;
  get diagnostics assigned = row_count;
  return assigned;
end; $$;

revoke all on function public.create_comparison_pair(uuid, uuid, jsonb), public.assign_comparison_pair(uuid, uuid[]) from public, anon, authenticated;
grant execute on function public.create_comparison_pair(uuid, uuid, jsonb), public.assign_comparison_pair(uuid, uuid[]) to authenticated;

commit;
