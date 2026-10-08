begin;

-- Preview and delete are admin-only RPCs. Direct table deletes stay forbidden.
create function public.preview_conversation_deletion(p_conversation_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare result jsonb;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  select jsonb_build_object(
    'conversation_id', c.id, 'label', c.label,
    'assignment_count', (select count(*) from public.assignments a where a.conversation_id = c.id),
    'annotation_count', (select coalesce(sum(jsonb_array_length(a.annotations)), 0) from public.assignments a where a.conversation_id = c.id),
    'revision_count', (select count(*) from public.annotation_revisions r join public.assignments a on a.id = r.assignment_id where a.conversation_id = c.id),
    'snapshot', md5(to_jsonb(c)::text || coalesce((select jsonb_agg(to_jsonb(a) order by a.id)::text from public.assignments a where a.conversation_id = c.id), '[]'))
  ) into result from public.conversations c where c.id = p_conversation_id;
  if result is null then raise exception 'Conversation no longer exists. Refresh the dashboard.' using errcode = 'P0002'; end if;
  return result;
end; $$;

create function public.delete_conversation(p_conversation_id uuid, p_expected_snapshot text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare preview jsonb;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  -- Lock the parent before children: new assignments cannot appear during deletion.
  perform 1 from public.conversations where id = p_conversation_id for update;
  if not found then raise exception 'Conversation no longer exists. Refresh the dashboard.' using errcode = 'P0002'; end if;
  perform 1 from public.assignments where conversation_id = p_conversation_id order by id for update;
  preview := public.preview_conversation_deletion(p_conversation_id);
  if p_expected_snapshot is null or p_expected_snapshot is distinct from preview->>'snapshot' then
    raise exception 'Conversation or annotations changed. Review the updated deletion details before confirming again.' using errcode = '40001';
  end if;
  delete from public.annotation_revisions r using public.assignments a where r.assignment_id = a.id and a.conversation_id = p_conversation_id;
  delete from public.assignments where conversation_id = p_conversation_id;
  delete from public.conversations where id = p_conversation_id;
  -- Private source files are retained for deliberate reimport or study archiving.
  return (preview - 'snapshot') || jsonb_build_object('deleted', true);
end; $$;

revoke all on function public.preview_conversation_deletion(uuid), public.delete_conversation(uuid, text) from public, anon, authenticated;
grant execute on function public.preview_conversation_deletion(uuid), public.delete_conversation(uuid, text) to authenticated;
commit;
