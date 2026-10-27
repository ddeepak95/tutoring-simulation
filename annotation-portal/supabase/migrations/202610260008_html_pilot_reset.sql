begin;
create table public.html_rollout_resets(id uuid primary key default gen_random_uuid(),source_id uuid not null,english_id uuid not null,baseline_id uuid not null,deleted_ids uuid[] not null,proof jsonb not null,actor uuid not null,created_at timestamptz not null default now());
alter table public.html_rollout_resets enable row level security;
create policy html_reset_read on public.html_rollout_resets for select to authenticated using(public.is_admin());
revoke all on public.html_rollout_resets from public,anon,authenticated;grant select on public.html_rollout_resets to authenticated,service_role;
create function public.reset_to_html_pilot(p_source_id uuid,p_english_id uuid,p_baseline_id uuid,p_expected_ids uuid[],p_proof jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare actual uuid[];result uuid;source jsonb;english jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501';end if;
 lock table public.conversations in share row exclusive mode;
 select transcript->'html_content' into source from public.conversations where id=p_source_id;
 select transcript->'html_content' into english from public.conversations where id=p_english_id and source_conversation_id=p_source_id;
 if source is null or english is null or source->'metadata'->>'language'<>'ta' or english->'metadata'->>'language'<>'en' or not exists(select 1 from public.llm_baselines where id=p_baseline_id and conversation_id=p_english_id and generation_config->>'input_mode'='turn-images/1') then raise exception 'Verified HTML pilot pair and English image baseline required';end if;
 perform public.validate_html_capture(source);perform public.validate_html_capture(english);
 if p_proof->'portal_verified' is distinct from 'true'::jsonb or p_proof->'tests_passed' is distinct from 'true'::jsonb or p_proof->>'baseline_id' is distinct from p_baseline_id::text or p_proof->>'source_version_hash' is distinct from source->>'version_hash' or p_proof->>'english_version_hash' is distinct from english->>'version_hash' then raise exception 'Pilot acceptance checks are missing or stale';end if;
 select coalesce(array_agg(id order by id),'{}') into actual from public.conversations where id not in(p_source_id,p_english_id);
 if actual is distinct from (select coalesce(array_agg(v order by v),'{}') from unnest(p_expected_ids) v) then raise exception 'Conversation inventory changed; refresh reset inventory' using errcode='40001';end if;
 delete from public.annotation_revisions r using public.assignments a where r.assignment_id=a.id and a.conversation_id=any(actual);
 delete from public.assignments where conversation_id=any(actual);
 delete from public.conversations where id=any(actual);
 insert into public.html_rollout_resets(source_id,english_id,baseline_id,deleted_ids,proof,actor) values(p_source_id,p_english_id,p_baseline_id,actual,p_proof,auth.uid()) returning id into result;
 return jsonb_build_object('reset_id',result,'deleted_conversations',cardinality(actual),'retained_conversations',jsonb_build_array(p_source_id,p_english_id));
end;$$;
revoke all on function public.reset_to_html_pilot(uuid,uuid,uuid,uuid[],jsonb) from public,anon;
grant execute on function public.reset_to_html_pilot(uuid,uuid,uuid,uuid[],jsonb) to authenticated;
commit;
