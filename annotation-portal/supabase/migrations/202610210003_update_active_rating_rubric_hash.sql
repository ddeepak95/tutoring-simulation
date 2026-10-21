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
    where old.task_type='rate' and old.status<>'submitted'
      and old.rubric_hash<>'__CURRENT_RUBRIC_HASH__'
  ) then
    raise exception 'An assignment already exists at the current rubric version';
  end if;
end;
$$;

-- The rating key and choices are unchanged, so keep saved answers intact.
alter table public.assignments disable trigger protect_unassigned_work;
update public.assignments
set rubric_hash='__CURRENT_RUBRIC_HASH__', updated_at=now()
where task_type='rate' and status<>'submitted'
  and rubric_hash<>'__CURRENT_RUBRIC_HASH__';
alter table public.assignments enable trigger protect_unassigned_work;

commit;
