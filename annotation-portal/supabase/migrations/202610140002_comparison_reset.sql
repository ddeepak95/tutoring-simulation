-- Admin-only reset with revision checks and preserved response/question snapshots.
begin;
alter table public.comparison_revisions add column question_snapshot jsonb;
alter table public.comparison_revisions add column operation text not null default 'save' check(operation in ('save','reset_before','reset'));
create function public.reset_comparison_assignment(p_assignment_id uuid,p_revision integer,p_questions jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare a public.comparison_assignments; q jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 select * into a from public.comparison_assignments where id=p_assignment_id for update;
 if a.id is null then raise exception 'Comparison not found'; end if;
 if a.revision is distinct from p_revision then raise exception 'Revision conflict. Reload the comparison before resetting.' using errcode='40001'; end if;
 if jsonb_typeof(p_questions) is distinct from 'array' or jsonb_array_length(p_questions)=0 or octet_length(p_questions::text)>131072 then raise exception 'Invalid comparison questions'; end if;
 for q in select value from jsonb_array_elements(p_questions) loop
  if jsonb_typeof(q) is distinct from 'object' or jsonb_typeof(q->'key') is distinct from 'string' or length(q->>'key')=0 or jsonb_typeof(q->'label') is distinct from 'string' or jsonb_typeof(q->'description') is distinct from 'string' or jsonb_typeof(q->'subsequent_only') is distinct from 'boolean' or q->>'key'='instructional_sequence' or coalesce(q->>'scope','turn') not in ('turn','overall') then raise exception 'Invalid comparison question'; end if;
 end loop;
 if (select count(distinct value->>'key') from jsonb_array_elements(p_questions))<>jsonb_array_length(p_questions) or not exists(select 1 from jsonb_array_elements(p_questions) question where coalesce(question->>'scope','turn')<>'overall' and question->>'subsequent_only'='false') then raise exception 'Invalid comparison questions'; end if;

 insert into public.comparison_revisions(assignment_id,revision,answers,overall_answer,status,actor_id,question_snapshot,operation)
 values(a.id,a.revision,a.answers,a.overall_answer,a.status,auth.uid(),a.questions,'reset_before')
 on conflict(assignment_id,revision) do update set question_snapshot=coalesce(public.comparison_revisions.question_snapshot,excluded.question_snapshot);
 update public.comparison_assignments set questions=p_questions,answers='[]'::jsonb,overall_answer=null,status='not_started',submitted_at=null,revision=revision+1,updated_at=now() where id=a.id returning * into a;
 insert into public.comparison_revisions(assignment_id,revision,answers,overall_answer,status,actor_id,question_snapshot,operation)
 values(a.id,a.revision,a.answers,a.overall_answer,a.status,auth.uid(),a.questions,'reset');
 return to_jsonb(a);
end; $$;
revoke all on function public.reset_comparison_assignment(uuid,integer,jsonb) from public,anon,authenticated;
grant execute on function public.reset_comparison_assignment(uuid,integer,jsonb) to authenticated;
commit;
