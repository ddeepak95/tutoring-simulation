-- Allow validated Issues in new immutable LLM baselines. Preserve existing baseline data and function grants.
create or replace function public.complete_llm_generation(p_request_id uuid,p_rubric_hash text,p_annotations jsonb,p_model text,p_prompt_version text,p_prompt text,p_generation_config jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare run public.llm_generation_runs; conversation jsonb; rubric jsonb; baseline public.llm_baselines;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 -- Parent-before-child lock order also serializes generation against deletion.
 perform 1 from public.conversations where id=(select conversation_id from public.llm_generation_runs where id=p_request_id) for update;
 select * into run from public.llm_generation_runs where id=p_request_id for update;
 if run.id is null then raise exception 'Generation request not found'; end if;
 if run.status='completed' then select * into baseline from public.llm_baselines where id=p_request_id; return to_jsonb(baseline); end if;
 if run.status<>'generating' or run.created_by<>auth.uid() or run.created_at<now()-interval '10 minutes' then raise exception 'Generation is no longer active'; end if;
 select transcript into conversation from public.conversations where id=run.conversation_id;
 select snapshot into rubric from public.rubric_versions where hash=p_rubric_hash;
 if rubric is null then raise exception 'Rubric not found'; end if;
 if jsonb_typeof(p_annotations) is distinct from 'array' or exists(select 1 from jsonb_array_elements(p_annotations) a where a->>'feature' not in ('concepts_and_subtopics_covered','examples','analogies','representations','cultural_references','questions','issues')) then raise exception 'Baselines contain only instructional features and issues'; end if;
 perform public.validate_annotations(conversation,p_annotations,rubric,true);
 insert into public.llm_baselines(id,conversation_id,rubric_hash,annotations,model,prompt_version,prompt,prompt_sha256,transcript_sha256,generation_config,created_by)
 values(p_request_id,run.conversation_id,p_rubric_hash,p_annotations,p_model,p_prompt_version,p_prompt,encode(sha256(convert_to(p_prompt,'UTF8')),'hex'),encode(sha256(convert_to(conversation::text,'UTF8')),'hex'),p_generation_config,auth.uid()) returning * into baseline;
 update public.llm_generation_runs set status='completed',finished_at=now() where id=p_request_id;
 return to_jsonb(baseline);
end; $$;

create or replace function public.import_llm_baseline(p_conversation_id uuid,p_baseline_id uuid,p_rubric_hash text,p_annotations jsonb,p_model text,p_prompt_version text,p_prompt text,p_generation_config jsonb,p_admin_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare conversation jsonb; rubric jsonb; baseline public.llm_baselines;
begin
 if not exists(select 1 from public.profiles where id=p_admin_id and role='admin') then raise exception 'A verified admin attribution is required'; end if;
 select transcript into conversation from public.conversations where id=p_conversation_id for update;
 if conversation is null then raise exception 'Conversation not found'; end if;
 select * into baseline from public.llm_baselines where id=p_baseline_id;
 if baseline.id is not null then
  if baseline.conversation_id<>p_conversation_id or baseline.rubric_hash<>p_rubric_hash or baseline.annotations is distinct from p_annotations or baseline.model<>p_model or baseline.prompt<>p_prompt or baseline.prompt_version<>p_prompt_version or baseline.generation_config is distinct from p_generation_config then raise exception 'Baseline ID already stores a different immutable version'; end if;
  return to_jsonb(baseline);
 end if;
 select snapshot into rubric from public.rubric_versions where hash=p_rubric_hash;
 if rubric is null then raise exception 'Rubric not found'; end if;
 if jsonb_typeof(p_annotations) is distinct from 'array' or exists(select 1 from jsonb_array_elements(p_annotations) a where a->>'feature' not in ('concepts_and_subtopics_covered','examples','analogies','representations','cultural_references','questions','issues')) then raise exception 'Baselines contain only instructional features and issues'; end if;
 perform public.validate_annotations(conversation,p_annotations,rubric,true);
 insert into public.llm_generation_runs(id,conversation_id,created_by,status,finished_at) values(p_baseline_id,p_conversation_id,p_admin_id,'completed',now());
 insert into public.llm_baselines(id,conversation_id,rubric_hash,annotations,model,prompt_version,prompt,prompt_sha256,transcript_sha256,generation_config,created_by)
 values(p_baseline_id,p_conversation_id,p_rubric_hash,p_annotations,p_model,p_prompt_version,p_prompt,encode(sha256(convert_to(p_prompt,'UTF8')),'hex'),encode(sha256(convert_to(conversation::text,'UTF8')),'hex'),p_generation_config,p_admin_id) returning * into baseline;
 return to_jsonb(baseline);
end; $$;

