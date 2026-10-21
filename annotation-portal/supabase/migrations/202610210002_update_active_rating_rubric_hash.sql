begin;

do $$
begin
  if not exists (
    select 1 from public.rubric_versions
    where hash = '__CURRENT_RUBRIC_HASH__'
      and snapshot->>'rubric_sha256' = hash
      and jsonb_array_length(snapshot->'rating_dimensions') = 6
  ) then
    raise exception 'The current six-question rating rubric must be registered first';
  end if;
  if exists (
    select 1 from public.assignments old
    join public.assignments current
      on current.conversation_id=old.conversation_id
     and current.annotator_id=old.annotator_id
     and current.task_type='rate'
     and current.rubric_hash='__CURRENT_RUBRIC_HASH__'
     and current.id<>old.id
    where old.task_type='rate' and old.is_active and old.status<>'submitted'
      and old.rubric_hash<>'__CURRENT_RUBRIC_HASH__'
  ) then
    raise exception 'An active assignment already exists at the current rubric version';
  end if;
end;
$$;

-- The question keys and options are unchanged; only the visible label changed.
-- Keep all saved ratings and update the active assignment's rubric reference.
update public.assignments
set rubric_hash='__CURRENT_RUBRIC_HASH__', updated_at=now()
where task_type='rate' and is_active and status<>'submitted'
  and rubric_hash<>'__CURRENT_RUBRIC_HASH__';

commit;
