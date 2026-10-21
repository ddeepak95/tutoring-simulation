begin;

do $$
begin
  if not exists (
    select 1 from public.rubric_versions
    where hash = '552b7ff42e32582b1ad0e9d26215c7e0954e61fbfcc59f81d30f83dc839d65de'
      and snapshot->>'rubric_sha256' = hash
      and jsonb_array_length(snapshot->'rating_dimensions') = 6
  ) then
    raise exception 'The current six-question rating rubric must be registered before upgrading assignments';
  end if;
end;
$$;

-- Move unfinished Rate tasks to the current questions. Preserve their former
-- responses at the existing revision before clearing them for rerating.
alter table public.assignments disable trigger protect_unassigned_work;
do $$
declare
  old_task public.assignments;
  current_task public.assignments;
  admin_id uuid;
begin
  select id into admin_id from public.profiles where role='admin' order by id limit 1;
  for old_task in
    select * from public.assignments
    where task_type='rate' and status<>'submitted'
      and rubric_hash<>'552b7ff42e32582b1ad0e9d26215c7e0954e61fbfcc59f81d30f83dc839d65de'
    order by conversation_id, annotator_id, id
    for update
  loop
    insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation)
    values(old_task.id,old_task.revision,old_task.annotations,old_task.turn_ratings,old_task.status,coalesce(admin_id,old_task.annotator_id),'rubric_upgrade_before')
    on conflict(assignment_id,revision) do nothing;

    select * into current_task from public.assignments
    where conversation_id=old_task.conversation_id
      and annotator_id=old_task.annotator_id
      and task_type='rate'
      and rubric_hash='552b7ff42e32582b1ad0e9d26215c7e0954e61fbfcc59f81d30f83dc839d65de'
      and id<>old_task.id
    for update;

    if current_task.id is not null then
      if not current_task.is_active then
        update public.assignments
        set is_active=true, unassigned_at=null, revision=revision+1, updated_at=now()
        where id=current_task.id returning * into current_task;
        insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation)
        values(current_task.id,current_task.revision,current_task.annotations,current_task.turn_ratings,current_task.status,coalesce(admin_id,current_task.annotator_id),'rubric_upgrade_reactivate')
        on conflict(assignment_id,revision) do nothing;
      end if;

      update public.assignments
      set is_active=false, unassigned_at=coalesce(unassigned_at,now()), revision=revision+1, updated_at=now()
      where id=old_task.id returning * into old_task;
      insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation)
      values(old_task.id,old_task.revision,old_task.annotations,old_task.turn_ratings,old_task.status,coalesce(admin_id,old_task.annotator_id),'rubric_upgrade_superseded')
      on conflict(assignment_id,revision) do nothing;
    else
      update public.assignments
      set rubric_hash='552b7ff42e32582b1ad0e9d26215c7e0954e61fbfcc59f81d30f83dc839d65de',
          turn_ratings='{}'::jsonb, status='not_started', submitted_at=null,
          revision=revision+1, updated_at=now()
      where id=old_task.id returning * into old_task;
      insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation)
      values(old_task.id,old_task.revision,old_task.annotations,old_task.turn_ratings,old_task.status,coalesce(admin_id,old_task.annotator_id),'rubric_upgrade')
      on conflict(assignment_id,revision) do nothing;
    end if;
  end loop;
end;
$$;
alter table public.assignments enable trigger protect_unassigned_work;

commit;
