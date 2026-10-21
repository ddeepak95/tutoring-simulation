-- Separate instructional-feature labeling from tutor-turn rating.
begin;

alter table public.assignments
  add column task_type text not null default 'label' check (task_type in ('label','rate'));

-- Keep a copy of the combined work and its audit trail while splitting each
-- existing assignment into a Label row and a Rate row for the same annotator.
create temporary table split_assignment_snapshot on commit drop as
  select * from public.assignments;
create temporary table split_revision_snapshot on commit drop as
  select * from public.annotation_revisions;
create temporary table split_assignment_map (
  old_id uuid primary key,
  rate_id uuid not null unique
) on commit drop;
insert into split_assignment_map(old_id, rate_id)
  select id, gen_random_uuid() from split_assignment_snapshot;

alter table public.assignments drop constraint assignments_conversation_id_annotator_id_rubric_hash_key;

-- This privileged migration must split inactive assignments too. Keep their
-- saved work and activity state, while bypassing the runtime unassignment guard.
alter table public.assignments disable trigger protect_unassigned_work;
update public.assignments set turn_ratings='{}'::jsonb;
alter table public.assignments enable trigger protect_unassigned_work;

insert into public.assignments(
  id,conversation_id,annotator_id,rubric_hash,task_type,status,revision,
  annotations,turn_ratings,updated_at,submitted_at,baseline_id,
  annotation_source,is_active,unassigned_at
)
select m.rate_id,s.conversation_id,s.annotator_id,s.rubric_hash,'rate',s.status,
  s.revision,'[]'::jsonb,s.turn_ratings,s.updated_at,s.submitted_at,null,
  'blank',s.is_active,s.unassigned_at
from split_assignment_snapshot s
join split_assignment_map m on m.old_id=s.id;

-- The original history becomes Label history; its paired Rate history keeps
-- the saved rating snapshots and the same actor, operation, revision, and time.
update public.annotation_revisions set turn_ratings='{}'::jsonb;
insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,saved_at,operation)
select m.rate_id,r.revision,'[]'::jsonb,r.turn_ratings,r.status,r.actor_id,r.saved_at,r.operation
from split_revision_snapshot r
join split_assignment_map m on m.old_id=r.assignment_id;

alter table public.assignments add constraint assignments_task_owner_unique
  unique(conversation_id,annotator_id,rubric_hash,task_type);
alter table public.assignments add constraint assignment_task_data_check check (
  (task_type='label' and turn_ratings='{}'::jsonb)
  or (task_type='rate' and annotations='[]'::jsonb and baseline_id is null and annotation_source='blank')
);

create or replace function public.verify_assignment_origin() returns trigger language plpgsql security definer set search_path='' as $$
declare baseline public.llm_baselines; initial_seed boolean:=false;
begin
 if tg_op='UPDATE' then
  if new.task_type is distinct from old.task_type or new.annotator_id is distinct from old.annotator_id or new.conversation_id is distinct from old.conversation_id then raise exception 'Assignment task type and owner cannot change'; end if;
  if new.baseline_id is distinct from old.baseline_id or new.annotation_source is distinct from old.annotation_source then
   initial_seed:=old.task_type='label' and old.baseline_id is null and old.annotation_source='blank' and old.revision=0 and old.status='not_started' and old.annotations='[]'::jsonb and old.turn_ratings='{}'::jsonb and old.submitted_at is null
    and exists(select 1 from public.profiles where id=old.annotator_id and role='admin')
    and not exists(select 1 from public.annotation_revisions where assignment_id=old.id)
    and new.baseline_id is not null and new.annotation_source='llm';
   if not initial_seed then raise exception 'Assignment origin and owner cannot change'; end if;
  end if;
 end if;
 if (tg_op='INSERT' or initial_seed) and new.baseline_id is not null then
  if new.task_type<>'label' then raise exception 'Only Label assignments can start from an LLM baseline'; end if;
  select * into baseline from public.llm_baselines where id=new.baseline_id;
  if baseline.id is null or baseline.conversation_id<>new.conversation_id or baseline.rubric_hash<>new.rubric_hash or new.annotations is distinct from baseline.annotations or new.turn_ratings<>'{}'::jsonb or new.revision<>0 or new.status<>'not_started' or new.submitted_at is not null then raise exception 'Invalid seeded assignment'; end if;
 end if;
 return new;
end; $$;

create or replace function public.save_assignment(p_assignment_id uuid,p_revision integer,p_annotations jsonb,p_submit boolean,p_turn_ratings jsonb) returns jsonb language plpgsql security definer set search_path = '' as $$
declare current_row public.assignments; transcript jsonb; rubric jsonb;
begin
 select * into current_row from public.assignments where id=p_assignment_id for update;
 if current_row.id is null or (current_row.annotator_id is distinct from auth.uid() and not public.is_admin()) then raise exception 'Assignment access denied' using errcode='42501'; end if;
 if current_row.revision<>p_revision then raise exception 'Revision conflict. Export your draft and reload the latest saved version before editing.' using errcode='40001'; end if;
 if current_row.status='submitted' then raise exception 'Submitted assignment is read only'; end if;
 if not current_row.is_active and not public.is_admin() then raise exception 'This assignment is no longer active'; end if;
 select c.transcript into transcript from public.conversations c where id=current_row.conversation_id;
 select snapshot into rubric from public.rubric_versions where hash=current_row.rubric_hash;
 if current_row.task_type='label' then
  if p_turn_ratings<>'{}'::jsonb then raise exception 'Label assignments cannot contain turn ratings'; end if;
  perform public.validate_annotations(transcript,p_annotations,rubric,p_submit);
 else
  if p_annotations<>'[]'::jsonb then raise exception 'Rate assignments cannot contain feature labels'; end if;
  perform public.validate_turn_ratings(transcript,p_turn_ratings,rubric,p_submit);
 end if;
 update public.assignments set annotations=p_annotations,turn_ratings=p_turn_ratings,revision=revision+1,status=case when p_submit then 'submitted' else 'in_progress' end,updated_at=now(),submitted_at=case when p_submit then now() else null end where id=p_assignment_id returning * into current_row;
 insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(current_row.id,current_row.revision,current_row.annotations,current_row.turn_ratings,current_row.status,auth.uid(),case when current_row.annotator_id is distinct from auth.uid() then case when p_submit then 'admin_submit' else 'admin_edit' end else 'save' end);
 return to_jsonb(current_row);
end; $$;

create function public.create_task_assignments(p_conversation_ids uuid[],p_annotator_ids uuid[],p_task_types text[],p_rubric_hash text,p_baseline_ids jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare selected_conversation uuid; selected_annotator uuid; selected_task text; baseline public.llm_baselines; assignment public.assignments; created integer:=0; skipped integer:=0; restored integer:=0; chosen uuid; ids jsonb:='[]'::jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if coalesce(cardinality(p_conversation_ids),0)=0 or coalesce(cardinality(p_annotator_ids),0)=0 or coalesce(cardinality(p_task_types),0)=0 or cardinality(p_conversation_ids)>200 or cardinality(p_annotator_ids)>200 or cardinality(p_task_types)>2 or array_position(p_conversation_ids,null) is not null or array_position(p_annotator_ids,null) is not null or array_position(p_task_types,null) is not null then raise exception 'Choose conversations, tasks, and annotators (maximum 200 each)'; end if;
 if exists(select 1 from unnest(p_task_types) t where t not in ('label','rate')) or cardinality(p_task_types)<>(select count(distinct t) from unnest(p_task_types) t) then raise exception 'Invalid task type'; end if;
 if jsonb_typeof(p_baseline_ids) is distinct from 'object' or exists(select 1 from jsonb_object_keys(p_baseline_ids) k where not k=any(select v::text from unnest(p_conversation_ids) v)) then raise exception 'Invalid baseline choices'; end if;
 if not exists(select 1 from public.rubric_versions where hash=p_rubric_hash) then raise exception 'Rubric not found'; end if;
 for selected_conversation in select distinct v from unnest(p_conversation_ids) v order by v loop
  perform 1 from public.conversations where id=selected_conversation for update;
  if not found then raise exception 'Conversation not found'; end if;
  chosen:=(p_baseline_ids->>selected_conversation::text)::uuid;
  for selected_task in select distinct t from unnest(p_task_types) t order by t loop
   baseline:=null;
   if selected_task='label' and chosen is not null then
    select * into baseline from public.llm_baselines where id=chosen;
    if baseline.id is null or baseline.conversation_id<>selected_conversation then raise exception 'Baseline belongs to another conversation or no longer exists'; end if;
   end if;
   for selected_annotator in select distinct v from unnest(p_annotator_ids) v loop
    if not exists(select 1 from public.profiles where id=selected_annotator) then raise exception 'Annotator not found'; end if;
    select * into assignment from public.assignments a where a.conversation_id=selected_conversation and a.annotator_id=selected_annotator and a.task_type=selected_task order by a.is_active desc,a.updated_at desc limit 1 for update;
    if assignment.id is not null then
     if assignment.is_active then skipped:=skipped+1;
     else
      update public.assignments set is_active=true,unassigned_at=null,revision=revision+1,updated_at=now() where id=assignment.id returning * into assignment;
      insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,assignment.revision,assignment.annotations,assignment.turn_ratings,assignment.status,auth.uid(),'reassign');
      restored:=restored+1;
     end if;
     continue;
    end if;
    insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,annotations,turn_ratings,baseline_id,annotation_source)
    values(selected_conversation,selected_annotator,coalesce(baseline.rubric_hash,p_rubric_hash),selected_task,coalesce(baseline.annotations,'[]'::jsonb),'{}'::jsonb,baseline.id,case when baseline.id is null then 'blank' else 'llm' end) returning * into assignment;
    if baseline.id is not null then
     insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
    end if;
    created:=created+1; ids:=ids||jsonb_build_array(assignment.id);
   end loop;
  end loop;
 end loop;
 return jsonb_build_object('created',created,'restored',restored,'skipped',skipped,'assignment_ids',ids);
end; $$;

-- Keep older admin helpers on Label assignments now that both task types can
-- exist for the same conversation and annotator.
create or replace function public.create_annotation_assignments(p_conversation_ids uuid[],p_annotator_ids uuid[],p_rubric_hash text,p_baseline_ids jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
begin
 return public.create_task_assignments(p_conversation_ids,p_annotator_ids,array['label']::text[],p_rubric_hash,p_baseline_ids);
end; $$;

create or replace function public.open_admin_annotation_assignment(p_conversation_id uuid,p_rubric_hash text) returns uuid language plpgsql security definer set search_path='' as $$
declare assignment public.assignments; baseline public.llm_baselines;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 if not found then raise exception 'Conversation not found'; end if;
 select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() and task_type='label' order by updated_at desc limit 1 for update;
 if assignment.id is not null and (assignment.baseline_id is not null or assignment.revision<>0 or assignment.status<>'not_started' or assignment.annotations<>'[]'::jsonb or assignment.turn_ratings<>'{}'::jsonb or assignment.submitted_at is not null or exists(select 1 from public.annotation_revisions where assignment_id=assignment.id)) then return assignment.id; end if;
 select * into baseline from public.llm_baselines where conversation_id=p_conversation_id order by created_at desc,id desc limit 1;
 if assignment.id is null then
  perform public.create_task_assignments(array[p_conversation_id],array[auth.uid()],array['label']::text[],p_rubric_hash,case when baseline.id is null then '{}'::jsonb else jsonb_build_object(p_conversation_id::text,baseline.id) end);
  select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() and task_type='label' order by updated_at desc limit 1;
 elsif baseline.id is not null then
  update public.assignments set baseline_id=baseline.id,annotation_source='llm',annotations=baseline.annotations,rubric_hash=baseline.rubric_hash,updated_at=now() where id=assignment.id returning * into assignment;
  insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
 end if;
 return assignment.id;
end; $$;

revoke all on function public.create_task_assignments(uuid[],uuid[],text[],text,jsonb) from public,anon,authenticated;
grant execute on function public.create_task_assignments(uuid[],uuid[],text[],text,jsonb) to authenticated;
revoke all on function public.create_annotation_assignments(uuid[],uuid[],text,jsonb),public.open_admin_annotation_assignment(uuid,text) from public,anon,authenticated;
grant execute on function public.create_annotation_assignments(uuid[],uuid[],text,jsonb),public.open_admin_annotation_assignment(uuid,text) to authenticated;
commit;
