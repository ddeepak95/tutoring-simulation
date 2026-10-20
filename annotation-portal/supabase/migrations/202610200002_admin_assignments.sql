-- Permit admin-owned annotation assignments to use the existing assignment and unassignment flows.
begin;

create or replace function public.unassign_annotation_assignments(p_assignments jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare requested jsonb; assignment public.assignments; removed integer:=0; selected_conversation uuid;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
  if jsonb_typeof(p_assignments) is distinct from 'array' then raise exception 'Choose assignments to unassign'; end if;
  if jsonb_array_length(p_assignments) not between 1 and 200 or exists(select 1 from jsonb_array_elements(p_assignments) x where jsonb_typeof(x) is distinct from 'object' or jsonb_typeof(x->'id') is distinct from 'string' or jsonb_typeof(x->'revision') is distinct from 'number' or (x->>'revision') !~ '^[0-9]+$') then raise exception 'Invalid assignments'; end if;
  if (select count(distinct x->>'id') from jsonb_array_elements(p_assignments) x)<>jsonb_array_length(p_assignments) then raise exception 'Duplicate assignment IDs'; end if;

  for selected_conversation in
    select distinct a.conversation_id
    from public.assignments a join jsonb_array_elements(p_assignments) x on a.id=(x->>'id')::uuid
    order by a.conversation_id
  loop
    perform 1 from public.conversations c where c.id=selected_conversation for update;
  end loop;

  for requested in select value from jsonb_array_elements(p_assignments) order by value->>'id' loop
    select * into assignment from public.assignments where id=(requested->>'id')::uuid for update;
    if assignment.id is null or not exists(select 1 from public.profiles where id=assignment.annotator_id and role in ('annotator','admin')) then raise exception 'Assignment not found'; end if;
    if not assignment.is_active then continue; end if;
    if assignment.revision<>(requested->>'revision')::integer then raise exception 'Annotation work changed. Review the refreshed assignment before unassigning.' using errcode='40001'; end if;
    update public.assignments set is_active=false,unassigned_at=now(),revision=revision+1,updated_at=now() where id=assignment.id returning * into assignment;
    insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation)
    values(assignment.id,assignment.revision,assignment.annotations,assignment.turn_ratings,assignment.status,auth.uid(),'unassign');
    removed:=removed+1;
  end loop;

  return jsonb_build_object('unassigned',removed);
end;
$$;

revoke all on function public.unassign_annotation_assignments(jsonb) from public,anon,authenticated;
grant execute on function public.unassign_annotation_assignments(jsonb) to authenticated;

commit;
