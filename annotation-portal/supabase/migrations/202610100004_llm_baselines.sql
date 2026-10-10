-- Immutable LLM instructional-feature baselines and independent human copies.
begin;
create table public.llm_generation_runs (
 id uuid primary key,
 conversation_id uuid not null references public.conversations(id) on delete cascade,
 created_by uuid not null references public.profiles(id),
 status text not null default 'generating' check(status in ('generating','completed','failed')),
 error_code text,
 created_at timestamptz not null default now(),
 finished_at timestamptz
);
create index llm_runs_conversation on public.llm_generation_runs(conversation_id,created_at desc);
create table public.llm_baselines (
 id uuid primary key references public.llm_generation_runs(id) on delete cascade,
 conversation_id uuid not null references public.conversations(id) on delete cascade,
 rubric_hash text not null references public.rubric_versions(hash),
 annotations jsonb not null check(jsonb_typeof(annotations)='array' and octet_length(annotations::text)<=2097152),
 model text not null check(length(btrim(model)) between 1 and 200),
 prompt_version text not null,
 prompt text not null check(octet_length(prompt)<=262144),
 prompt_sha256 text not null check(prompt_sha256 ~ '^[0-9a-f]{64}$'),
 transcript_sha256 text not null check(transcript_sha256 ~ '^[0-9a-f]{64}$'),
 generation_config jsonb not null check(jsonb_typeof(generation_config)='object'),
 created_by uuid not null references public.profiles(id),
 created_at timestamptz not null default now()
);
create index llm_baselines_conversation on public.llm_baselines(conversation_id,created_at desc);
alter table public.assignments add column baseline_id uuid references public.llm_baselines(id);
alter table public.assignments add column annotation_source text not null default 'blank' check(annotation_source in ('blank','llm'));
alter table public.assignments add constraint assignment_baseline_source check((annotation_source='blank' and baseline_id is null) or (annotation_source='llm' and baseline_id is not null));
alter table public.llm_baselines enable row level security;
alter table public.llm_generation_runs enable row level security;
revoke all on public.llm_baselines,public.llm_generation_runs from public,anon,authenticated;
grant select on public.llm_baselines,public.llm_generation_runs to authenticated;
grant all on public.llm_baselines,public.llm_generation_runs to service_role;
create policy baseline_read on public.llm_baselines for select to authenticated using(public.is_admin() or exists(select 1 from public.assignments a where a.baseline_id=llm_baselines.id and a.annotator_id=auth.uid()));
create policy generation_read on public.llm_generation_runs for select to authenticated using(public.is_admin());
create function public.immutable_llm_baseline() returns trigger language plpgsql set search_path='' as $$
begin raise exception 'LLM baselines are immutable; generate a new version'; end; $$;
create trigger preserve_llm_baseline before update on public.llm_baselines for each row execute function public.immutable_llm_baseline();
create function public.verify_assignment_origin() returns trigger language plpgsql security definer set search_path='' as $$
declare baseline public.llm_baselines;
begin
 if tg_op='UPDATE' then
  if new.baseline_id is distinct from old.baseline_id or new.annotation_source is distinct from old.annotation_source or new.annotator_id is distinct from old.annotator_id or new.conversation_id is distinct from old.conversation_id then raise exception 'Assignment origin and owner cannot change'; end if;
 elsif new.baseline_id is not null then
  select * into baseline from public.llm_baselines where id=new.baseline_id;
  if baseline.id is null or baseline.conversation_id<>new.conversation_id or baseline.rubric_hash<>new.rubric_hash or new.annotations is distinct from baseline.annotations or new.turn_ratings<>'{}'::jsonb or new.revision<>0 or new.status<>'not_started' then raise exception 'Invalid seeded assignment'; end if;
 end if;
 return new;
end; $$;
create trigger verify_assignment_origin before insert or update on public.assignments for each row execute function public.verify_assignment_origin();
drop policy assignment_create on public.assignments;
create policy assignment_create on public.assignments for insert to authenticated with check(public.is_admin() and status='not_started' and revision=0 and annotations='[]'::jsonb and turn_ratings='{}'::jsonb and submitted_at is null and baseline_id is null and annotation_source='blank');

create function public.claim_llm_generation(p_conversation_id uuid,p_request_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare run public.llm_generation_runs;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if p_request_id is null then raise exception 'Generation request ID required'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 if not found then raise exception 'Conversation not found'; end if;
 select * into run from public.llm_generation_runs where id=p_request_id;
 if run.id is not null then
  if run.conversation_id<>p_conversation_id then raise exception 'Generation request belongs to another conversation'; end if;
  return to_jsonb(run)||jsonb_build_object('claimed',false);
 end if;
 update public.llm_generation_runs set status='failed',error_code='expired',finished_at=now() where conversation_id=p_conversation_id and status='generating' and created_at<now()-interval '10 minutes';
 if exists(select 1 from public.llm_generation_runs where conversation_id=p_conversation_id and status='generating') then raise exception 'Generation is already running for this conversation'; end if;
 insert into public.llm_generation_runs(id,conversation_id,created_by) values(p_request_id,p_conversation_id,auth.uid()) returning * into run;
 return to_jsonb(run)||jsonb_build_object('claimed',true);
end; $$;
create function public.complete_llm_generation(p_request_id uuid,p_rubric_hash text,p_annotations jsonb,p_model text,p_prompt_version text,p_prompt text,p_generation_config jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
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
 if jsonb_typeof(p_annotations) is distinct from 'array' or exists(select 1 from jsonb_array_elements(p_annotations) a where a->>'feature' not in ('concepts_and_subtopics_covered','examples','analogies','representations','cultural_references','questions')) then raise exception 'Baselines contain only instructional features'; end if;
 perform public.validate_annotations(conversation,p_annotations,rubric,true);
 insert into public.llm_baselines(id,conversation_id,rubric_hash,annotations,model,prompt_version,prompt,prompt_sha256,transcript_sha256,generation_config,created_by)
 values(p_request_id,run.conversation_id,p_rubric_hash,p_annotations,p_model,p_prompt_version,p_prompt,encode(sha256(convert_to(p_prompt,'UTF8')),'hex'),encode(sha256(convert_to(conversation::text,'UTF8')),'hex'),p_generation_config,auth.uid()) returning * into baseline;
 update public.llm_generation_runs set status='completed',finished_at=now() where id=p_request_id;
 return to_jsonb(baseline);
end; $$;
create function public.fail_llm_generation(p_request_id uuid,p_code text) returns void language plpgsql security definer set search_path='' as $$
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if p_code not in ('provider_error','invalid_output','timeout','save_failed') then raise exception 'Invalid generation failure code'; end if;
 update public.llm_generation_runs set status='failed',error_code=p_code,finished_at=now() where id=p_request_id and created_by=auth.uid() and status='generating';
end; $$;

-- Local generation/import uses the existing server-only service key. The acting
-- admin is explicit, verified, and retained without minting or impersonating a session.
create function public.import_llm_baseline(p_conversation_id uuid,p_baseline_id uuid,p_rubric_hash text,p_annotations jsonb,p_model text,p_prompt_version text,p_prompt text,p_generation_config jsonb,p_admin_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
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
 if jsonb_typeof(p_annotations) is distinct from 'array' or exists(select 1 from jsonb_array_elements(p_annotations) a where a->>'feature' not in ('concepts_and_subtopics_covered','examples','analogies','representations','cultural_references','questions')) then raise exception 'Baselines contain only instructional features'; end if;
 perform public.validate_annotations(conversation,p_annotations,rubric,true);
 insert into public.llm_generation_runs(id,conversation_id,created_by,status,finished_at) values(p_baseline_id,p_conversation_id,p_admin_id,'completed',now());
 insert into public.llm_baselines(id,conversation_id,rubric_hash,annotations,model,prompt_version,prompt,prompt_sha256,transcript_sha256,generation_config,created_by)
 values(p_baseline_id,p_conversation_id,p_rubric_hash,p_annotations,p_model,p_prompt_version,p_prompt,encode(sha256(convert_to(p_prompt,'UTF8')),'hex'),encode(sha256(convert_to(conversation::text,'UTF8')),'hex'),p_generation_config,p_admin_id) returning * into baseline;
 return to_jsonb(baseline);
end; $$;

create function public.create_annotation_assignments(p_conversation_ids uuid[],p_annotator_ids uuid[],p_rubric_hash text,p_baseline_ids jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare selected_conversation uuid; selected_annotator uuid; baseline public.llm_baselines; assignment public.assignments; created integer:=0; skipped integer:=0; chosen uuid; ids jsonb:='[]'::jsonb;
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
   if exists(select 1 from public.assignments a where a.conversation_id=selected_conversation and a.annotator_id=selected_annotator) then skipped:=skipped+1; continue; end if;
   insert into public.assignments(conversation_id,annotator_id,rubric_hash,annotations,baseline_id,annotation_source)
   values(selected_conversation,selected_annotator,coalesce(baseline.rubric_hash,p_rubric_hash),coalesce(baseline.annotations,'[]'::jsonb),baseline.id,case when baseline.id is null then 'blank' else 'llm' end) returning * into assignment;
   if baseline.id is not null then
    insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
   end if;
   created:=created+1; ids:=ids||jsonb_build_array(assignment.id);
  end loop;
 end loop;
 return jsonb_build_object('created',created,'skipped',skipped,'assignment_ids',ids);
end; $$;

create or replace function public.preview_conversation_deletion(p_conversation_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 select jsonb_build_object('conversation_id',c.id,'label',c.label,
 'assignment_count',(select count(*) from public.assignments where conversation_id=c.id),
 'annotation_count',(select coalesce(sum(jsonb_array_length(annotations)),0) from public.assignments where conversation_id=c.id),
 'revision_count',(select count(*) from public.annotation_revisions r join public.assignments a on a.id=r.assignment_id where a.conversation_id=c.id),
 'baseline_count',(select count(*) from public.llm_baselines where conversation_id=c.id),
 'generation_count',(select count(*) from public.llm_generation_runs where conversation_id=c.id),
 'snapshot',md5(to_jsonb(c)::text||coalesce((select jsonb_agg(to_jsonb(a) order by a.id)::text from public.assignments a where a.conversation_id=c.id),'[]')||coalesce((select jsonb_agg(to_jsonb(b) order by b.id)::text from public.llm_baselines b where b.conversation_id=c.id),'[]')||coalesce((select jsonb_agg(to_jsonb(g) order by g.id)::text from public.llm_generation_runs g where g.conversation_id=c.id),'[]')))
 into result from public.conversations c where c.id=p_conversation_id;
 if result is null then raise exception 'Conversation no longer exists. Refresh the dashboard.' using errcode='P0002'; end if;
 return result;
end; $$;
create or replace function public.delete_conversation(p_conversation_id uuid,p_expected_snapshot text) returns jsonb language plpgsql security definer set search_path='' as $$
declare preview jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 if not found then raise exception 'Conversation no longer exists. Refresh the dashboard.' using errcode='P0002'; end if;
 perform 1 from public.assignments where conversation_id=p_conversation_id order by id for update;
 perform 1 from public.llm_generation_runs where conversation_id=p_conversation_id order by id for update;
 preview:=public.preview_conversation_deletion(p_conversation_id);
 if p_expected_snapshot is null or p_expected_snapshot is distinct from preview->>'snapshot' then raise exception 'Conversation or annotation work changed. Review updated deletion details before confirming.' using errcode='40001'; end if;
 delete from public.annotation_revisions r using public.assignments a where r.assignment_id=a.id and a.conversation_id=p_conversation_id;
 delete from public.assignments where conversation_id=p_conversation_id;
 delete from public.conversations where id=p_conversation_id;
 return (preview-'snapshot')||jsonb_build_object('deleted',true);
end; $$;
revoke all on function public.immutable_llm_baseline(),public.verify_assignment_origin(),public.claim_llm_generation(uuid,uuid),public.complete_llm_generation(uuid,text,jsonb,text,text,text,jsonb),public.fail_llm_generation(uuid,text),public.create_annotation_assignments(uuid[],uuid[],text,jsonb) from public,anon,authenticated;
revoke all on function public.import_llm_baseline(uuid,uuid,text,jsonb,text,text,text,jsonb,uuid) from public,anon,authenticated;
grant execute on function public.import_llm_baseline(uuid,uuid,text,jsonb,text,text,text,jsonb,uuid) to service_role;
grant execute on function public.claim_llm_generation(uuid,uuid),public.complete_llm_generation(uuid,text,jsonb,text,text,text,jsonb),public.fail_llm_generation(uuid,text),public.create_annotation_assignments(uuid[],uuid[],text,jsonb) to authenticated;
commit;
