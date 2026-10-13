begin;
alter table public.llm_generation_runs add column checkpoint jsonb not null default '{}'::jsonb;
alter table public.llm_generation_runs add column started_at timestamptz;
update public.llm_generation_runs set started_at=created_at;
alter table public.llm_generation_runs alter column started_at set default now();
alter table public.llm_generation_runs alter column started_at set not null;

create function public.save_llm_generation_checkpoint(p_request_id uuid,p_checkpoint jsonb) returns void language plpgsql security definer set search_path='' as $$
declare run public.llm_generation_runs;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 select * into run from public.llm_generation_runs where id=p_request_id for update;
 if run.id is null or run.created_by<>auth.uid() or run.status<>'generating' then raise exception 'Generation is not owned or active'; end if;
 if jsonb_typeof(p_checkpoint) is distinct from 'object' or octet_length(p_checkpoint::text)>16777216 or coalesce(p_checkpoint->>'fingerprint','') !~ '^[a-f0-9]{64}$' or coalesce(p_checkpoint->>'repairs_used','') !~ '^[0-3]$' then raise exception 'Invalid generation checkpoint'; end if;
 if run.checkpoint ? 'fingerprint' and (run.checkpoint->>'fingerprint'<>p_checkpoint->>'fingerprint' or (run.checkpoint->>'repairs_used')::integer>(p_checkpoint->>'repairs_used')::integer) then raise exception 'Checkpoint identity and repair budget cannot be reset'; end if;
 -- created_at is the existing generation lease; started_at retains its origin.
 update public.llm_generation_runs set checkpoint=p_checkpoint,created_at=now() where id=p_request_id;
end; $$;

create function public.resume_llm_generation(p_conversation_id uuid,p_request_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare run public.llm_generation_runs;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 select * into run from public.llm_generation_runs where id=p_request_id for update;
 if run.id is null or run.conversation_id<>p_conversation_id or run.created_by<>auth.uid() or not (run.checkpoint ? 'fingerprint') then raise exception 'No owned generation checkpoint'; end if;
 if run.status='completed' then return to_jsonb(run)||jsonb_build_object('claimed',false); end if;
 if run.status='generating' and run.created_at>=now()-interval '10 minutes' then return to_jsonb(run)||jsonb_build_object('claimed',false); end if;
 if exists(select 1 from public.llm_generation_runs where conversation_id=p_conversation_id and id<>p_request_id and status='generating' and created_at>=now()-interval '10 minutes') then raise exception 'Another generation is running'; end if;
 update public.llm_generation_runs set status='generating',error_code=null,finished_at=null,created_at=now() where id=p_request_id returning * into run;
 return to_jsonb(run)||jsonb_build_object('claimed',true);
end; $$;
revoke all on function public.save_llm_generation_checkpoint(uuid,jsonb),public.resume_llm_generation(uuid,uuid) from public,anon,authenticated;
grant execute on function public.save_llm_generation_checkpoint(uuid,jsonb),public.resume_llm_generation(uuid,uuid) to authenticated;
commit;
