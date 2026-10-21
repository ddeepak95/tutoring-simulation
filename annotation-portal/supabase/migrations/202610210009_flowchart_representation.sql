begin;

do $$
begin
  if not exists (
    select 1 from public.rubric_versions
    where hash = '__CURRENT_RUBRIC_HASH__'
      and snapshot->>'rubric_sha256' = hash
      and exists (
        select 1 from jsonb_array_elements(snapshot->'rubric') feature,
                     jsonb_array_elements(feature->'fields') field
        where feature->>'key' = 'representations'
          and field->>'key' = 'representation_type'
          and field->'options' @> '["Flowchart"]'::jsonb
      )
  ) then raise exception 'Register the Flowchart rubric before upgrading Label assignments'; end if;
end;
$$;

alter table public.assignments disable trigger protect_unassigned_work;
update public.assignments
set rubric_hash = '__CURRENT_RUBRIC_HASH__', updated_at = now()
where task_type = 'label' and is_active and status <> 'submitted'
  and rubric_hash <> '__CURRENT_RUBRIC_HASH__';
alter table public.assignments enable trigger protect_unassigned_work;

commit;
