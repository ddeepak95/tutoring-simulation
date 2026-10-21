-- Seed admin Label work only from a baseline using the requested rubric.
create or replace function public.open_admin_annotation_assignment(p_conversation_id uuid,p_rubric_hash text) returns uuid language plpgsql security definer set search_path='' as $$
declare assignment public.assignments; baseline public.llm_baselines;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 if not found then raise exception 'Conversation not found'; end if;
 select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() and task_type='label' order by updated_at desc limit 1 for update;
 if assignment.id is not null and (assignment.baseline_id is not null or assignment.revision<>0 or assignment.status<>'not_started' or assignment.annotations<>'[]'::jsonb or assignment.turn_ratings<>'{}'::jsonb or assignment.submitted_at is not null or exists(select 1 from public.annotation_revisions where assignment_id=assignment.id)) then return assignment.id; end if;
 select * into baseline from public.llm_baselines where conversation_id=p_conversation_id and rubric_hash=p_rubric_hash order by created_at desc,id desc limit 1;
 if assignment.id is null then
  perform public.create_task_assignments(array[p_conversation_id],array[auth.uid()],array['label']::text[],p_rubric_hash,case when baseline.id is null then '{}'::jsonb else jsonb_build_object(p_conversation_id::text,baseline.id) end);
  select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() and task_type='label' order by updated_at desc limit 1;
 elsif baseline.id is not null then
  update public.assignments set baseline_id=baseline.id,annotation_source='llm',annotations=baseline.annotations,rubric_hash=baseline.rubric_hash,updated_at=now() where id=assignment.id returning * into assignment;
  insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
 end if;
 return assignment.id;
end; $$;
