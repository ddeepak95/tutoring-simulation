-- Unassignment revokes annotator access while preserving study data and audit history.
begin;
alter table public.assignments add column is_active boolean not null default true;
alter table public.assignments add column unassigned_at timestamptz;
alter table public.assignments add constraint assignment_activity_timestamp check(is_active=(unassigned_at is null));
drop policy assignment_read on public.assignments;
create policy assignment_read on public.assignments for select to authenticated using(public.is_admin() or (annotator_id=auth.uid() and is_active));
drop policy conversation_read on public.conversations;
create policy conversation_read on public.conversations for select to authenticated using(public.is_admin() or exists(select 1 from public.assignments a where a.conversation_id=conversations.id and a.annotator_id=auth.uid() and a.is_active));
drop policy revisions_read on public.annotation_revisions;
create policy revisions_read on public.annotation_revisions for select to authenticated using(public.is_admin() or exists(select 1 from public.assignments a where a.id=annotation_revisions.assignment_id and a.annotator_id=auth.uid() and a.is_active));
drop policy baseline_read on public.llm_baselines;
create policy baseline_read on public.llm_baselines for select to authenticated using(public.is_admin() or exists(select 1 from public.assignments a where a.baseline_id=llm_baselines.id and a.annotator_id=auth.uid() and a.is_active));
drop policy assignment_create on public.assignments;
create policy assignment_create on public.assignments for insert to authenticated with check(public.is_admin() and is_active and unassigned_at is null and status='not_started' and revision=0 and annotations='[]'::jsonb and turn_ratings='{}'::jsonb and submitted_at is null and baseline_id is null and annotation_source='blank');
create function public.protect_unassigned_work() returns trigger language plpgsql set search_path='' as $$
begin
 if not old.is_active then
  if not new.is_active then raise exception 'This assignment has been unassigned. Your draft is retained locally; contact the administrator.'; end if;
  if new.annotations is distinct from old.annotations or new.turn_ratings is distinct from old.turn_ratings or new.status is distinct from old.status or new.rubric_hash is distinct from old.rubric_hash or new.submitted_at is distinct from old.submitted_at then raise exception 'Reassignment must preserve saved work'; end if;
 end if;
 return new;
end; $$;
create trigger protect_unassigned_work before update on public.assignments for each row execute function public.protect_unassigned_work();
create function public.unassign_annotation_assignments(p_assignments jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare requested jsonb; assignment public.assignments; removed integer:=0; selected_conversation uuid;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if jsonb_typeof(p_assignments) is distinct from 'array' then raise exception 'Choose assignments to unassign'; end if;
 if jsonb_array_length(p_assignments) not between 1 and 200 or exists(select 1 from jsonb_array_elements(p_assignments) x where jsonb_typeof(x) is distinct from 'object' or jsonb_typeof(x->'id') is distinct from 'string' or jsonb_typeof(x->'revision') is distinct from 'number' or (x->>'revision') !~ '^[0-9]+$') then raise exception 'Invalid assignments'; end if;
 if (select count(distinct x->>'id') from jsonb_array_elements(p_assignments) x)<>jsonb_array_length(p_assignments) then raise exception 'Duplicate assignment IDs'; end if;
 for selected_conversation in select distinct a.conversation_id from public.assignments a join jsonb_array_elements(p_assignments) x on a.id=(x->>'id')::uuid order by a.conversation_id loop
  perform 1 from public.conversations c where c.id=selected_conversation for update;
 end loop;
 for requested in select value from jsonb_array_elements(p_assignments) order by value->>'id' loop
  select * into assignment from public.assignments where id=(requested->>'id')::uuid for update;
  if assignment.id is null or not exists(select 1 from public.profiles where id=assignment.annotator_id and role='annotator') then raise exception 'Annotator assignment not found'; end if;
  if not assignment.is_active then continue; end if;
  if assignment.revision<>(requested->>'revision')::integer then raise exception 'Annotation work changed. Review the refreshed assignment before unassigning.' using errcode='40001'; end if;
  update public.assignments set is_active=false,unassigned_at=now(),revision=revision+1,updated_at=now() where id=assignment.id returning * into assignment;
  insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,assignment.revision,assignment.annotations,assignment.turn_ratings,assignment.status,auth.uid(),'unassign');
  removed:=removed+1;
 end loop;
 return jsonb_build_object('unassigned',removed);
end; $$;
create or replace function public.create_annotation_assignments(p_conversation_ids uuid[],p_annotator_ids uuid[],p_rubric_hash text,p_baseline_ids jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare selected_conversation uuid; selected_annotator uuid; baseline public.llm_baselines; assignment public.assignments; created integer:=0; skipped integer:=0; restored integer:=0; chosen uuid; ids jsonb:='[]'::jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if coalesce(cardinality(p_conversation_ids),0)=0 or coalesce(cardinality(p_annotator_ids),0)=0 or cardinality(p_conversation_ids)>200 or cardinality(p_annotator_ids)>200 or array_position(p_conversation_ids,null) is not null or array_position(p_annotator_ids,null) is not null then raise exception 'Choose conversations and annotators (maximum 200 each)'; end if;
 if jsonb_typeof(p_baseline_ids) is distinct from 'object' or exists(select 1 from jsonb_object_keys(p_baseline_ids) k where not k=any(select v::text from unnest(p_conversation_ids) v)) then raise exception 'Invalid baseline choices'; end if;
 if not exists(select 1 from public.rubric_versions where hash=p_rubric_hash) then raise exception 'Rubric not found'; end if;
 for selected_conversation in select distinct v from unnest(p_conversation_ids) v order by v loop
  perform 1 from public.conversations where id=selected_conversation for update;
  if not found then raise exception 'Conversation not found'; end if;
  chosen:=(p_baseline_ids->>selected_conversation::text)::uuid;
  baseline:=null;
  if chosen is not null then
   select * into baseline from public.llm_baselines where id=chosen;
   if baseline.id is null or baseline.conversation_id<>selected_conversation then raise exception 'Baseline belongs to another conversation or no longer exists'; end if;
  end if;
  for selected_annotator in select distinct v from unnest(p_annotator_ids) v loop
   if not exists(select 1 from public.profiles where id=selected_annotator) then raise exception 'Annotator not found'; end if;
   select * into assignment from public.assignments a where a.conversation_id=selected_conversation and a.annotator_id=selected_annotator order by a.is_active desc,a.updated_at desc limit 1 for update;
   if assignment.id is not null then
    if assignment.is_active then skipped:=skipped+1;
    else
     update public.assignments set is_active=true,unassigned_at=null,revision=revision+1,updated_at=now() where id=assignment.id returning * into assignment;
     insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,assignment.revision,assignment.annotations,assignment.turn_ratings,assignment.status,auth.uid(),'reassign');
     restored:=restored+1;
    end if;
    continue;
   end if;
   insert into public.assignments(conversation_id,annotator_id,rubric_hash,annotations,baseline_id,annotation_source)
   values(selected_conversation,selected_annotator,coalesce(baseline.rubric_hash,p_rubric_hash),coalesce(baseline.annotations,'[]'::jsonb),baseline.id,case when baseline.id is null then 'blank' else 'llm' end) returning * into assignment;
   if baseline.id is not null then
    insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
   end if;
   created:=created+1; ids:=ids||jsonb_build_array(assignment.id);
  end loop;
 end loop;
 return jsonb_build_object('created',created,'restored',restored,'skipped',skipped,'assignment_ids',ids);
end; $$;
revoke all on function public.protect_unassigned_work(),public.unassign_annotation_assignments(jsonb) from public,anon,authenticated;
grant execute on function public.unassign_annotation_assignments(jsonb) to authenticated;
commit;
