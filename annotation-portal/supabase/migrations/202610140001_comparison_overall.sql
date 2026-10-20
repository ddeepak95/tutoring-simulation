-- Separate turn ratings from the final whole-conversation ratings; preserve existing saved work.
begin;
alter table public.comparison_assignments add column overall_answer jsonb check(overall_answer is null or jsonb_typeof(overall_answer)='object');
alter table public.comparison_revisions add column overall_answer jsonb check(overall_answer is null or jsonb_typeof(overall_answer)='object');
create or replace function public.create_comparison_assignment(p_conversation_a_id uuid,p_conversation_b_id uuid,p_annotator_id uuid,p_questions jsonb) returns uuid language plpgsql security definer set search_path='' as $$
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
  if jsonb_typeof(q) is distinct from 'object' or jsonb_typeof(q->'key') is distinct from 'string' or length(q->>'key')=0 or jsonb_typeof(q->'label') is distinct from 'string' or jsonb_typeof(q->'description') is distinct from 'string' or jsonb_typeof(q->'subsequent_only') is distinct from 'boolean' or q->>'key'='instructional_sequence' or coalesce(q->>'scope','turn') not in ('turn','overall') then raise exception 'Invalid comparison question'; end if;
 end loop;
 if (select count(distinct value->>'key') from jsonb_array_elements(p_questions))<>jsonb_array_length(p_questions) or not exists(select 1 from jsonb_array_elements(p_questions) question where coalesce(question->>'scope','turn')<>'overall' and question->>'subsequent_only'='false') then raise exception 'Invalid comparison questions'; end if;
 insert into public.comparison_assignments(conversation_a_id,conversation_b_id,annotator_id,questions,created_by)
 values(p_conversation_a_id,p_conversation_b_id,p_annotator_id,p_questions,auth.uid()) on conflict do nothing returning id into result;
 if result is null then select id into result from public.comparison_assignments where annotator_id=p_annotator_id and least(conversation_a_id,conversation_b_id)=least(p_conversation_a_id,p_conversation_b_id) and greatest(conversation_a_id,conversation_b_id)=greatest(p_conversation_a_id,p_conversation_b_id); end if;
 return result;
end; $$;

create or replace function public.save_comparison_round(p_assignment_id uuid,p_revision integer,p_round integer,p_answer jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
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
 for q in select value from jsonb_array_elements(a.questions) where coalesce(value->>'scope','turn')<>'overall' and (p_round>0 or value->>'subsequent_only'='false') loop
  active_count:=active_count+1;
  if jsonb_typeof(p_answer->'values'->(q->>'key')) is distinct from 'string' or p_answer->'values'->>(q->>'key') not in ('a','b','tie') then raise exception 'Answer every rating question before continuing'; end if;
 end loop;
 for key in select jsonb_object_keys(p_answer->'values') loop
  if not exists(select 1 from jsonb_array_elements(a.questions) question where coalesce(question->>'scope','turn')<>'overall' and question->>'key'=key and (p_round>0 or question->>'subsequent_only'='false')) then raise exception 'Unexpected comparison question'; end if;
 end loop;
 if active_count=0 then raise exception 'No comparison questions'; end if;
 update public.comparison_assignments set answers=answers||jsonb_build_array(p_answer),revision=revision+1,
 status=case when p_round+1=total and not exists(select 1 from jsonb_array_elements(a.questions) as elements(question_item) where question_item->>'scope'='overall') then 'submitted' else 'in_progress' end,
 submitted_at=case when p_round+1=total and not exists(select 1 from jsonb_array_elements(a.questions) as elements(question_item) where question_item->>'scope'='overall') then now() else null end,updated_at=now()
 where id=a.id returning * into a;
 insert into public.comparison_revisions(assignment_id,revision,answers,status,actor_id) values(a.id,a.revision,a.answers,a.status,auth.uid());
 return to_jsonb(a);
end; $$;
create function public.save_comparison_overall(p_assignment_id uuid,p_revision integer,p_answer jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare a public.comparison_assignments; q jsonb; total integer; active_count integer := 0; key text;
begin
 select * into a from public.comparison_assignments where id=p_assignment_id for update;
 if a.id is null or a.annotator_id is distinct from auth.uid() then raise exception 'Comparison access denied' using errcode='42501'; end if;
 if a.revision is distinct from p_revision then raise exception 'Revision conflict. Reload the comparison to continue.' using errcode='40001'; end if;
 if a.status='submitted' then raise exception 'Submitted comparison is read only'; end if;
 select count(*) into total from public.conversations c,jsonb_array_elements(c.transcript->'messages') t where c.id=a.conversation_a_id and t->>'speaker'='tutor';
 if total=0 or jsonb_array_length(a.answers)<>total then raise exception 'Complete all turn comparisons before the overall conversation ratings'; end if;
 if jsonb_typeof(p_answer) is distinct from 'object' or jsonb_typeof(p_answer->'values') is distinct from 'object' or jsonb_typeof(p_answer->'notes') is distinct from 'string' or octet_length(p_answer::text)>65536 or exists(select 1 from jsonb_object_keys(p_answer) k where k not in ('values','notes')) then raise exception 'Invalid comparison answer'; end if;
 for q in select value from jsonb_array_elements(a.questions) where value->>'scope'='overall' loop
  active_count:=active_count+1;
  if jsonb_typeof(p_answer->'values'->(q->>'key')) is distinct from 'string' or p_answer->'values'->>(q->>'key') not in ('a','b','tie') then raise exception 'Answer every overall question before finishing'; end if;
 end loop;
 if active_count=0 then raise exception 'This comparison has no overall questions'; end if;
 for key in select jsonb_object_keys(p_answer->'values') loop
  if not exists(select 1 from jsonb_array_elements(a.questions) as elements(question_item) where question_item->>'scope'='overall' and question_item->>'key'=key) then raise exception 'Unexpected overall comparison question'; end if;
 end loop;
 update public.comparison_assignments set overall_answer=p_answer,status='submitted',revision=revision+1,submitted_at=now(),updated_at=now() where id=a.id returning * into a;
 insert into public.comparison_revisions(assignment_id,revision,answers,overall_answer,status,actor_id) values(a.id,a.revision,a.answers,a.overall_answer,a.status,auth.uid());
 return to_jsonb(a);
end; $$;
revoke all on function public.save_comparison_overall(uuid,integer,jsonb) from public,anon,authenticated;
grant execute on function public.save_comparison_overall(uuid,integer,jsonb) to authenticated;
-- Upgrade only comparisons with no saved answers. Increment revision to invalidate old drafts.
with upgraded as (
 update public.comparison_assignments set questions='[{"key": "principle_focus", "label": "Understanding the Core Principle", "description": "Which of the two responses better explains the underlying concept or principle, rather than only presenting facts or steps?", "guidance": "Compare whether the response explains why or how the concept works and connects facts or steps to the underlying principle.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": false, "scope": "turn", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "S1: Core idea 6 and Factor 8; S2: Feature 14."}, {"key": "learner_fit", "label": "Fit for a High-School Student", "description": "Which of the two responses better matches a high-school student''s understanding level through its content, language, and use of formulas and mathematical notation?", "guidance": "Consider suitable content depth, accessible wording, explained technical terms, and understandable formulas and notation where relevant. Do not reward unnecessary formulas or oversimplification.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": false, "scope": "turn", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "S1: Core ideas 1 and 2; S2: Features 3, 7, and 8. High-school level is the study''s chosen target."}, {"key": "explanatory_aids_usefulness", "label": "Usefulness of Explanatory Aids", "description": "Which of the two responses uses examples, analogies, models, or representations more effectively to clarify the concept?", "guidance": "Judge the clarity, accuracy, and instructional value of the aids used, not their number. Plain explanation may be sufficient. Judge only representations actually available in the transcript.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": false, "scope": "turn", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "S1: Core idea 2; S2: Features 4, 5, and 6."}, {"key": "focus_and_information_load", "label": "Focus and Amount of Information", "description": "Which of the two responses stays focused on the essential ideas while providing the right amount of information for the learner without information overload?", "guidance": "Prefer enough reasoning and detail to understand the concept without digressions, needless repetition, or excessive information. Shorter is not automatically better.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": false, "scope": "turn", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "S1: Core idea 5 and Factor 3; S2: Feature 9."}, {"key": "opportunities_to_demonstrate_understanding", "label": "Demonstrating Understanding", "description": "Which of the two responses provides a better opportunity for the learner to demonstrate their understanding of the concepts learned?", "guidance": "Compare questions or tasks that invite the learner to explain, predict, or apply the concept. A generic understanding check gives less evidence than a concrete task. Consider whether a task is appropriate at this point.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": false, "scope": "turn", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "S1: Core idea 7, Factors 5 and 6; S2: Feature 13."}, {"key": "follow_up_responsiveness", "label": "Addressing the Student''s Follow-Up", "description": "Which of the two responses better addresses the student''s follow-up?", "guidance": "Compare how directly and helpfully each tutor responds to its own student''s questions, requests, confusion, or demonstrated understanding. Consider adaptation when needed; do not assume the two student replies are identical.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": true, "scope": "turn", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "S1: explanation-diagnosis-adaptation process, Core ideas 1 and 7."}, {"key": "overall_conversational_naturalness", "label": "Overall Conversational Naturalness", "description": "Which of the two conversations felt more natural and conversational?", "guidance": "Consider the full exchange, including flow, wording, and how tutor contributions connect with student contributions. Judge from original wording, not translation polish.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": false, "scope": "overall", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "Study-specific whole-conversation judgment; related to direct address in S2 Feature 12, broader than that paper criterion."}, {"key": "overall_learning_goal", "label": "Overall Learning Goal", "description": "Which of the two conversations overall addressed the learning goal better?", "guidance": "Consider how well the full conversation develops the intended topic and addresses learner needs. Do not equate this preference judgment with measured learning gains.", "options": ["a", "b", "tie"], "scale_items": {"a": "A is better", "b": "B is better", "tie": "Tie / equally good"}, "subsequent_only": false, "scope": "overall", "question_set": "instructional-comparison-v3", "source": "comparative-evaluation/prompts/comparative-questions.md", "source_basis": "Study-specific synthesis informed by S1''s explanatory process and S2''s goal-sensitive framework."}]'::jsonb,revision=revision+1,updated_at=now()
 where status='not_started' and answers='[]'::jsonb and overall_answer is null
 returning *
)
insert into public.comparison_revisions(assignment_id,revision,answers,overall_answer,status,actor_id)
select id,revision,answers,overall_answer,status,created_by from upgraded;
commit;
