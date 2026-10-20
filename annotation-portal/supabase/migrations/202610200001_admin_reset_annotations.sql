-- Allow an administrator to reset any annotator assignment while retaining its audit trail.
begin;

create or replace function public.protect_unassigned_work() returns trigger language plpgsql set search_path='' as $$
begin
  if not old.is_active then
    if not new.is_active then
      if public.is_admin() and new.annotations = '[]'::jsonb and new.turn_ratings = '{}'::jsonb and new.status = 'not_started' and new.submitted_at is null then
        return new;
      end if;
      raise exception 'This assignment has been unassigned. Your draft is retained locally; contact the administrator.';
    end if;
    if new.annotations is distinct from old.annotations or new.turn_ratings is distinct from old.turn_ratings or new.status is distinct from old.status or new.rubric_hash is distinct from old.rubric_hash or new.submitted_at is distinct from old.submitted_at then
      raise exception 'Reassignment must preserve saved work';
    end if;
  end if;
  return new;
end;
$$;

create function public.reset_annotation_assignment(p_assignment_id uuid, p_revision integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare current_row public.assignments;
begin
  if not public.is_admin() then
    raise exception 'Admin access required' using errcode = '42501';
  end if;

  select * into current_row
  from public.assignments
  where id = p_assignment_id
  for update;

  if current_row.id is null then
    raise exception 'Annotator assignment not found';
  end if;
  if current_row.revision is distinct from p_revision then
    raise exception 'Annotation work changed. Refresh before resetting.' using errcode = '40001';
  end if;

  insert into public.annotation_revisions(assignment_id, revision, annotations, turn_ratings, status, actor_id, operation)
  values (current_row.id, current_row.revision, current_row.annotations, current_row.turn_ratings, current_row.status, auth.uid(), 'reset_before')
  on conflict (assignment_id, revision) do nothing;

  update public.assignments
  set annotations = '[]'::jsonb,
      turn_ratings = '{}'::jsonb,
      status = 'not_started',
      submitted_at = null,
      revision = revision + 1,
      updated_at = now()
  where id = current_row.id
  returning * into current_row;

  insert into public.annotation_revisions(assignment_id, revision, annotations, turn_ratings, status, actor_id, operation)
  values (current_row.id, current_row.revision, current_row.annotations, current_row.turn_ratings, current_row.status, auth.uid(), 'reset');

  return to_jsonb(current_row);
end;
$$;

revoke all on function public.protect_unassigned_work(), public.reset_annotation_assignment(uuid, integer) from public, anon, authenticated;
grant execute on function public.reset_annotation_assignment(uuid, integer) to authenticated;

commit;
