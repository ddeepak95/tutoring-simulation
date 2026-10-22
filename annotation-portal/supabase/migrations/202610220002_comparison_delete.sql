begin;

create function public.delete_comparison_assignment(p_assignment_id uuid, p_revision integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare assignment public.comparison_assignments;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  select * into assignment from public.comparison_assignments where id = p_assignment_id for update;
  if assignment.id is null then raise exception 'Comparison assignment not found'; end if;
  if assignment.revision is distinct from p_revision then
    raise exception 'Revision conflict. Reload the comparison before deleting.' using errcode = '40001';
  end if;
  delete from public.comparison_assignments where id = assignment.id;
  return jsonb_build_object('assignment_id', assignment.id, 'pair_id', assignment.pair_id, 'deleted', true);
end; $$;

create function public.delete_comparison_pair(p_pair_id uuid, p_expected_assignments jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare pair public.comparison_pairs; current_assignments jsonb; assignment_count integer;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  select * into pair from public.comparison_pairs where id = p_pair_id for update;
  if pair.id is null then raise exception 'Comparison pair not found'; end if;
  if jsonb_typeof(p_expected_assignments) is distinct from 'array' then raise exception 'Invalid expected assignments'; end if;
  perform 1 from public.comparison_assignments where pair_id = pair.id for update;
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'revision', revision) order by id), '[]'::jsonb), count(*)
    into current_assignments, assignment_count
    from public.comparison_assignments where pair_id = pair.id;
  if current_assignments <> p_expected_assignments then
    raise exception 'Comparison assignments changed. Refresh before deleting the pair.' using errcode = '40001';
  end if;
  delete from public.comparison_pairs where id = pair.id;
  return jsonb_build_object('pair_id', pair.id, 'deleted_assignments', assignment_count, 'deleted', true);
end; $$;

revoke all on function public.delete_comparison_assignment(uuid, integer), public.delete_comparison_pair(uuid, jsonb) from public, anon, authenticated;
grant execute on function public.delete_comparison_assignment(uuid, integer), public.delete_comparison_pair(uuid, jsonb) to authenticated;

commit;
