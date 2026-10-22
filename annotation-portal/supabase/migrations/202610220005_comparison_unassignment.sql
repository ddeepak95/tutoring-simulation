begin;

alter table public.comparison_assignments
  add column is_active boolean not null default true,
  add column unassigned_at timestamptz,
  add constraint comparison_active_unassigned_at check (is_active = (unassigned_at is null));

drop index public.comparison_pair_owner;
create unique index comparison_pair_owner on public.comparison_assignments(pair_id, annotator_id)
  where is_active;

create or replace function public.guard_inactive_comparison_assignment()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not old.is_active and not new.is_active then
    raise exception 'This comparison assignment is no longer active';
  end if;
  return new;
end; $$;
create trigger guard_inactive_comparison_assignment
  before update on public.comparison_assignments
  for each row execute function public.guard_inactive_comparison_assignment();

drop policy comparison_read on public.comparison_assignments;
create policy comparison_read on public.comparison_assignments for select to authenticated
  using (public.is_admin() or (annotator_id = auth.uid() and is_active));
drop policy comparison_history_read on public.comparison_revisions;
create policy comparison_history_read on public.comparison_revisions for select to authenticated
  using (public.is_admin() or exists (
    select 1 from public.comparison_assignments a
    where a.id = assignment_id and a.annotator_id = auth.uid() and a.is_active
  ));
drop policy comparison_conversation_read on public.conversations;
create policy comparison_conversation_read on public.conversations for select to authenticated
  using (exists (
    select 1 from public.comparison_assignments a
    where a.annotator_id = auth.uid() and a.is_active
      and conversations.id in (a.conversation_a_id, a.conversation_b_id)
  ));

create function public.unassign_comparison_assignment(p_assignment_id uuid, p_revision integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare assignment public.comparison_assignments;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  select * into assignment from public.comparison_assignments where id = p_assignment_id for update;
  if assignment.id is null then raise exception 'Comparison assignment not found'; end if;
  if assignment.revision is distinct from p_revision then
    raise exception 'Revision conflict. Reload the comparison before unassigning.' using errcode = '40001';
  end if;
  if not assignment.is_active then raise exception 'Comparison assignment is already inactive'; end if;
  update public.comparison_assignments set is_active = false, unassigned_at = now(), updated_at = now()
  where id = assignment.id;
  return jsonb_build_object('assignment_id', assignment.id, 'pair_id', assignment.pair_id, 'unassigned', true);
end; $$;
revoke all on function public.unassign_comparison_assignment(uuid, integer) from public, anon, authenticated;
grant execute on function public.unassign_comparison_assignment(uuid, integer) to authenticated;

commit;
