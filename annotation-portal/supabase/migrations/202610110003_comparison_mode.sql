begin;
create table public.comparison_assignments (
 id uuid primary key default gen_random_uuid(),
 conversation_a_id uuid not null references public.conversations(id) on delete cascade,
 conversation_b_id uuid not null references public.conversations(id) on delete cascade,
 annotator_id uuid not null references public.profiles(id),
 questions jsonb not null check (jsonb_typeof(questions)='array'),
 answers jsonb not null default '[]' check (jsonb_typeof(answers)='array'),
 status text not null default 'not_started' check(status in ('not_started','in_progress','submitted')),
 revision integer not null default 0 check(revision>=0),
 created_by uuid not null references public.profiles(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), submitted_at timestamptz,
 check(conversation_a_id<>conversation_b_id)
);
create unique index comparison_pair_owner on public.comparison_assignments(least(conversation_a_id,conversation_b_id),greatest(conversation_a_id,conversation_b_id),annotator_id);
create index comparison_owner on public.comparison_assignments(annotator_id);
create table public.comparison_revisions (
 assignment_id uuid not null references public.comparison_assignments(id) on delete cascade,
 revision integer not null, answers jsonb not null, status text not null,
 actor_id uuid not null references public.profiles(id), saved_at timestamptz not null default now(),
 primary key(assignment_id,revision)
);
alter table public.comparison_assignments enable row level security;
alter table public.comparison_revisions enable row level security;
revoke all on public.comparison_assignments,public.comparison_revisions from anon,authenticated;
grant select on public.comparison_assignments,public.comparison_revisions to authenticated;
grant all on public.comparison_assignments,public.comparison_revisions to service_role;
create policy comparison_read on public.comparison_assignments for select to authenticated using(annotator_id=auth.uid() or public.is_admin());
create policy comparison_history_read on public.comparison_revisions for select to authenticated using(public.is_admin() or exists(select 1 from public.comparison_assignments a where a.id=assignment_id and a.annotator_id=auth.uid()));
create policy comparison_conversation_read on public.conversations for select to authenticated using(exists(select 1 from public.comparison_assignments a where a.annotator_id=auth.uid() and conversations.id in (a.conversation_a_id,a.conversation_b_id)));

create function public.create_comparison_assignment(p_conversation_a_id uuid,p_conversation_b_id uuid,p_annotator_id uuid,p_questions jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare a jsonb; b jsonb; count_a integer; count_b integer; q jsonb; result uuid;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if p_conversation_a_id=p_conversation_b_id then raise exception 'Choose two different conversations'; end if;
 if not exists(select 1 from public.profiles where id=p_annotator_id and role='annotator') then raise exception 'Choose an annotator'; end if;
 select transcript into a from public.conversations where id=p_conversation_a_id;
 select transcript into b from public.conversations where id=p_conversation_b_id;
 select count(*) into count_a from jsonb_array_elements(a->'messages') t where t->>'speaker'='tutor';
 select count(*) into count_b from jsonb_array_elements(b->'messages') t where t->>'speaker'='tutor';
 if count_a=0 or count_a<>count_b then raise exception 'Conversations must have the same nonzero number of tutor turns'; end if;
 if jsonb_typeof(p_questions) is distinct from 'array' or jsonb_array_length(p_questions)=0 or octet_length(p_questions::text)>131072 then raise exception 'Invalid comparison questions'; end if;
 for q in select value from jsonb_array_elements(p_questions) loop
  if jsonb_typeof(q) is distinct from 'object' or jsonb_typeof(q->'key') is distinct from 'string' or length(q->>'key')=0 or jsonb_typeof(q->'label') is distinct from 'string' or jsonb_typeof(q->'description') is distinct from 'string' or jsonb_typeof(q->'subsequent_only') is distinct from 'boolean' or q->>'key'='instructional_sequence' then raise exception 'Invalid comparison question'; end if;
 end loop;
 if (select count(distinct value->>'key') from jsonb_array_elements(p_questions))<>jsonb_array_length(p_questions) or not exists(select 1 from jsonb_array_elements(p_questions) question where question->>'subsequent_only'='false') then raise exception 'Invalid comparison questions'; end if;
 insert into public.comparison_assignments(conversation_a_id,conversation_b_id,annotator_id,questions,created_by)
 values(p_conversation_a_id,p_conversation_b_id,p_annotator_id,p_questions,auth.uid()) on conflict do nothing returning id into result;
 if result is null then select id into result from public.comparison_assignments where annotator_id=p_annotator_id and least(conversation_a_id,conversation_b_id)=least(p_conversation_a_id,p_conversation_b_id) and greatest(conversation_a_id,conversation_b_id)=greatest(p_conversation_a_id,p_conversation_b_id); end if;
 return result;
end; $$;

create function public.save_comparison_round(p_assignment_id uuid,p_revision integer,p_round integer,p_answer jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare a public.comparison_assignments; q jsonb; total integer; active_count integer; key text;
begin
 select * into a from public.comparison_assignments where id=p_assignment_id for update;
 if a.id is null or a.annotator_id is distinct from auth.uid() then raise exception 'Comparison access denied' using errcode='42501'; end if;
 if a.revision is distinct from p_revision then raise exception 'Revision conflict. Reload the comparison to continue.' using errcode='40001'; end if;
 if a.status='submitted' then raise exception 'Submitted comparison is read only'; end if;
 if p_round is distinct from jsonb_array_length(a.answers) then raise exception 'Complete the current comparison before the next turn'; end if;
 if jsonb_typeof(p_answer) is distinct from 'object' or jsonb_typeof(p_answer->'values') is distinct from 'object' or jsonb_typeof(p_answer->'notes') is distinct from 'string' or octet_length(p_answer::text)>65536 or exists(select 1 from jsonb_object_keys(p_answer) k where k not in ('values','notes')) then raise exception 'Invalid comparison answer'; end if;
 select count(*) into total from public.conversations c,jsonb_array_elements(c.transcript->'messages') t where c.id=a.conversation_a_id and t->>'speaker'='tutor';
 if p_round>=total then raise exception 'No remaining comparison turns'; end if;
 active_count:=0;
 for q in select value from jsonb_array_elements(a.questions) where p_round>0 or value->>'subsequent_only'='false' loop
  active_count:=active_count+1;
  if jsonb_typeof(p_answer->'values'->(q->>'key')) is distinct from 'string' or p_answer->'values'->>(q->>'key') not in ('a','b','tie') then raise exception 'Answer every rating question before continuing'; end if;
 end loop;
 for key in select jsonb_object_keys(p_answer->'values') loop
  if not exists(select 1 from jsonb_array_elements(a.questions) question where question->>'key'=key and (p_round>0 or question->>'subsequent_only'='false')) then raise exception 'Unexpected comparison question'; end if;
 end loop;
 if active_count=0 then raise exception 'No comparison questions'; end if;
 update public.comparison_assignments set answers=answers||jsonb_build_array(p_answer),revision=revision+1,
 status=case when p_round+1=total then 'submitted' else 'in_progress' end,
 submitted_at=case when p_round+1=total then now() else null end,updated_at=now()
 where id=a.id returning * into a;
 insert into public.comparison_revisions(assignment_id,revision,answers,status,actor_id) values(a.id,a.revision,a.answers,a.status,auth.uid());
 return to_jsonb(a);
end; $$;
revoke all on function public.create_comparison_assignment(uuid,uuid,uuid,jsonb),public.save_comparison_round(uuid,integer,integer,jsonb) from public,anon,authenticated;
grant execute on function public.create_comparison_assignment(uuid,uuid,uuid,jsonb),public.save_comparison_round(uuid,integer,integer,jsonb) to authenticated;
commit;
