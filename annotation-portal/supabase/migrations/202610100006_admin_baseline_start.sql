-- Seed untouched admin assignments, preserving all started work and baseline versions.
begin;
create or replace function public.verify_assignment_origin() returns trigger language plpgsql security definer set search_path='' as $$
declare baseline public.llm_baselines; initial_seed boolean:=false;
begin
 if tg_op='UPDATE' then
  if new.annotator_id is distinct from old.annotator_id or new.conversation_id is distinct from old.conversation_id then raise exception 'Assignment origin and owner cannot change'; end if;
  if new.baseline_id is distinct from old.baseline_id or new.annotation_source is distinct from old.annotation_source then
   initial_seed:=old.baseline_id is null and old.annotation_source='blank' and old.revision=0 and old.status='not_started' and old.annotations='[]'::jsonb and old.turn_ratings='{}'::jsonb and old.submitted_at is null
    and exists(select 1 from public.profiles where id=old.annotator_id and role='admin')
    and not exists(select 1 from public.annotation_revisions where assignment_id=old.id)
    and new.baseline_id is not null and new.annotation_source='llm';
   if not initial_seed then raise exception 'Assignment origin and owner cannot change'; end if;
  end if;
 end if;
 if (tg_op='INSERT' or initial_seed) and new.baseline_id is not null then
  select * into baseline from public.llm_baselines where id=new.baseline_id;
  if baseline.id is null or baseline.conversation_id<>new.conversation_id or baseline.rubric_hash<>new.rubric_hash or new.annotations is distinct from baseline.annotations or new.turn_ratings<>'{}'::jsonb or new.revision<>0 or new.status<>'not_started' or new.submitted_at is not null then raise exception 'Invalid seeded assignment'; end if;
 end if;
 return new;
end; $$;
create function public.open_admin_annotation_assignment(p_conversation_id uuid,p_rubric_hash text) returns uuid language plpgsql security definer set search_path='' as $$
declare assignment public.assignments; baseline public.llm_baselines;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 if not found then raise exception 'Conversation not found'; end if;
 select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() order by updated_at desc limit 1 for update;
 if assignment.id is not null and (assignment.baseline_id is not null or assignment.revision<>0 or assignment.status<>'not_started' or assignment.annotations<>'[]'::jsonb or assignment.turn_ratings<>'{}'::jsonb or assignment.submitted_at is not null or exists(select 1 from public.annotation_revisions where assignment_id=assignment.id)) then return assignment.id; end if;
 select * into baseline from public.llm_baselines where conversation_id=p_conversation_id order by created_at desc,id desc limit 1;
 if assignment.id is null then
  perform public.create_annotation_assignments(array[p_conversation_id],array[auth.uid()],p_rubric_hash,case when baseline.id is null then '{}'::jsonb else jsonb_build_object(p_conversation_id::text,baseline.id) end);
  select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() order by updated_at desc limit 1;
 elsif baseline.id is not null then
  update public.assignments set baseline_id=baseline.id,annotation_source='llm',annotations=baseline.annotations,rubric_hash=baseline.rubric_hash,updated_at=now() where id=assignment.id returning * into assignment;
  insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
 end if;
 return assignment.id;
end; $$;
revoke all on function public.verify_assignment_origin(),public.open_admin_annotation_assignment(uuid,text) from public,anon,authenticated;
grant execute on function public.open_admin_annotation_assignment(uuid,text) to authenticated;
commit;
