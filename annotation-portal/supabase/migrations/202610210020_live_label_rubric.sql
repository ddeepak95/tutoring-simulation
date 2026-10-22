-- Allow future instructional categories without a feature-count migration.
begin;

alter table public.rubric_versions drop constraint rubric_versions_snapshot_check;
alter table public.rubric_versions add constraint rubric_versions_snapshot_check
  check (jsonb_typeof(snapshot->'rubric') = 'array'
    and jsonb_array_length(snapshot->'rubric') between 1 and 64
    and snapshot->>'rubric_sha256' = hash);

create table public.assignment_rubric_upgrades (
  assignment_id uuid not null references public.assignments(id),
  old_rubric_hash text not null references public.rubric_versions(hash),
  new_rubric_hash text not null references public.rubric_versions(hash),
  actor_id uuid not null references public.profiles(id),
  upgraded_at timestamptz not null default now(),
  primary key (assignment_id, new_rubric_hash)
);
alter table public.assignment_rubric_upgrades enable row level security;
create policy assignment_rubric_upgrades_read on public.assignment_rubric_upgrades
  for select to authenticated using (public.is_admin());
grant select on public.assignment_rubric_upgrades to authenticated;

create function public.upgrade_label_assignment_rubric(p_assignment_id uuid, p_rubric_hash text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare current_row public.assignments; old_snapshot jsonb; next_snapshot jsonb;
  old_feature jsonb; next_feature jsonb; old_field jsonb; next_field jsonb; transcript jsonb;
begin
  select * into current_row from public.assignments where id = p_assignment_id for update;
  if current_row.id is null or (current_row.annotator_id is distinct from auth.uid() and not public.is_admin()) then
    raise exception 'Assignment access denied' using errcode = '42501';
  end if;
  if current_row.task_type <> 'label' or not current_row.is_active or current_row.status = 'submitted' then return false; end if;
  if current_row.rubric_hash = p_rubric_hash then return true; end if;
  select snapshot into old_snapshot from public.rubric_versions where hash = current_row.rubric_hash;
  select snapshot into next_snapshot from public.rubric_versions where hash = p_rubric_hash;
  if next_snapshot is null then return false; end if;
  if exists (select 1 from public.assignments other
             where other.id <> current_row.id and other.conversation_id = current_row.conversation_id
               and other.annotator_id = current_row.annotator_id and other.task_type = 'label'
               and other.rubric_hash = p_rubric_hash) then return false; end if;

  -- Existing categories and attributes must remain valid. Newly added fields on an
  -- existing category must be optional, so saved highlights need no rewriting.
  for old_feature in select value from jsonb_array_elements(old_snapshot->'rubric') loop
    select value into next_feature from jsonb_array_elements(next_snapshot->'rubric')
      where value->>'key' = old_feature->>'key';
    if next_feature is null then return false; end if;
    for old_field in select value from jsonb_array_elements(old_feature->'fields') loop
      select value into next_field from jsonb_array_elements(next_feature->'fields')
        where value->>'key' = old_field->>'key';
      if next_field is null or old_field - 'label' is distinct from next_field - 'label' then return false; end if;
    end loop;
    for next_field in select value from jsonb_array_elements(next_feature->'fields') loop
      if not exists (select 1 from jsonb_array_elements(old_feature->'fields')
                     where value->>'key' = next_field->>'key')
         and next_field->'optional' is distinct from 'true'::jsonb then return false; end if;
    end loop;
  end loop;

  select c.transcript into transcript from public.conversations c where c.id = current_row.conversation_id;
  begin
    perform public.validate_annotations(transcript, current_row.annotations, next_snapshot, false);
  exception when others then
    return false;
  end;
  update public.assignments set rubric_hash = p_rubric_hash, updated_at = now()
    where id = p_assignment_id;
  insert into public.assignment_rubric_upgrades(assignment_id, old_rubric_hash, new_rubric_hash, actor_id)
    values (p_assignment_id, current_row.rubric_hash, p_rubric_hash, auth.uid());
  return true;
end; $$;

revoke all on function public.upgrade_label_assignment_rubric(uuid,text) from public, anon, authenticated;
grant execute on function public.upgrade_label_assignment_rubric(uuid,text) to authenticated;

commit;
