-- Preserve historical six- and seven-feature rubrics while allowing Memory Aid.
do $$
declare constraint_name text;
begin
  select conname into constraint_name
  from pg_constraint
  where conrelid = 'public.rubric_versions'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%jsonb_array_length%';
  if constraint_name is null then raise exception 'Rubric feature-count constraint not found'; end if;
  execute format('alter table public.rubric_versions drop constraint %I', constraint_name);
end;
$$;

alter table public.rubric_versions add constraint rubric_versions_snapshot_check
  check (jsonb_typeof(snapshot->'rubric') = 'array'
    and jsonb_array_length(snapshot->'rubric') in (6, 7, 8)
    and snapshot->>'rubric_sha256' = hash);
