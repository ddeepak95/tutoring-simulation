begin;

do $$
begin
  if not exists (
    select 1 from public.rubric_versions
    where hash = '__CURRENT_RUBRIC_HASH__'
      and snapshot->>'rubric_sha256' = hash
      and jsonb_array_length(snapshot->'rubric') = 8
      and exists (select 1 from jsonb_array_elements(snapshot->'rubric') f where f->>'key' = 'memory_aids')
  ) then
    raise exception 'Register the eight-feature Memory Aid rubric before upgrading Label assignments';
  end if;
end;
$$;

-- Preserve annotations, assignment revisions, and immutable baseline links.
alter table public.assignments disable trigger protect_unassigned_work;
update public.assignments
set rubric_hash = '__CURRENT_RUBRIC_HASH__', updated_at = now()
where task_type = 'label' and is_active and status <> 'submitted'
  and rubric_hash <> '__CURRENT_RUBRIC_HASH__';
alter table public.assignments enable trigger protect_unassigned_work;

commit;
