begin;

-- Archival pages are kept separate from transcripts until their turns are parsed.
create table public.chatgpt_html_archives (
 id uuid primary key default gen_random_uuid(),
 imported_by uuid not null references public.profiles(id),
 source_conversation_id text not null,
 source_url text not null,
 title text not null, topic text not null, language text not null,
 captured_at timestamptz not null, imported_at timestamptz not null default now(),
 extractor_version text not null, capture_report jsonb not null,
 html text not null, page_text text not null,
 snapshot_sha256 text not null,
 unique(imported_by,source_conversation_id,snapshot_sha256)
);
alter table public.chatgpt_html_archives enable row level security;
revoke all on public.chatgpt_html_archives from public,anon,authenticated;
grant select on public.chatgpt_html_archives to authenticated;
grant all on public.chatgpt_html_archives to service_role;
create policy chatgpt_html_archive_read on public.chatgpt_html_archives for select to authenticated
 using(imported_by=auth.uid() or public.is_admin());

create function public.save_chatgpt_html_archive(p_capture jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 caller uuid := auth.uid(); source_id text; source_url text; fingerprint text;
 result_id uuid; captured timestamptz; title text; topic text; lang text; report jsonb;
begin
 if caller is null or not exists(select 1 from public.profiles where id=caller and role in ('admin','annotator')) then
  raise exception 'Sign in with a portal admin or annotator account' using errcode='42501';
 end if;
 if jsonb_typeof(p_capture) is distinct from 'object' or octet_length(p_capture::text)>8388608 then raise exception 'Invalid archive or archive exceeds 8 MB'; end if;
 if exists(select 1 from jsonb_object_keys(p_capture) k where k not in ('format_version','source','captured_at','extractor_version','report','html','text','title','topic','language'))
 or p_capture->>'format_version' is distinct from 'chatgpt-html-archive/1'
 or jsonb_typeof(p_capture->'html') is distinct from 'string' or length(btrim(p_capture->>'html'))=0
 or jsonb_typeof(p_capture->'text') is distinct from 'string' or length(btrim(p_capture->>'text'))=0 then raise exception 'Invalid HTML archive format'; end if;
 source_id:=p_capture->'source'->>'conversation_id'; source_url:=p_capture->'source'->>'url';
 if source_id is null or source_id !~* '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$'
 or source_url is null or source_url !~ ('^https://chatgpt[.]com/(g/[a-zA-Z0-9_/-]+/)?c/'||source_id||'$') then raise exception 'Use a saved conversation on chatgpt.com'; end if;
 title:=btrim(p_capture->>'title'); topic:=btrim(p_capture->>'topic'); lang:=btrim(p_capture->>'language');
 if jsonb_typeof(p_capture->'title') is distinct from 'string' or coalesce(length(title),0) not between 1 and 250
 or jsonb_typeof(p_capture->'topic') is distinct from 'string' or coalesce(length(topic),0) not between 1 and 1000
 or jsonb_typeof(p_capture->'language') is distinct from 'string' or coalesce(length(lang),0) not between 1 and 80 then raise exception 'Provide a title, topic, and language'; end if;
 if jsonb_typeof(p_capture->'extractor_version') is distinct from 'string' or length(p_capture->>'extractor_version') not between 1 and 80
 or jsonb_typeof(p_capture->'captured_at') is distinct from 'string' then raise exception 'Invalid capture metadata'; end if;
 begin captured:=(p_capture->>'captured_at')::timestamptz;
 exception when others then raise exception 'Invalid capture timestamp'; end;
 if not isfinite(captured) or captured<'1970-01-01'::timestamptz or captured>now()+interval '5 minutes' then raise exception 'Invalid capture timestamp'; end if;
 report:=p_capture->'report';
 if jsonb_typeof(report) is distinct from 'object' or report->>'scope' is distinct from 'loaded-page'
 or report->'history_verified' is distinct from 'false'::jsonb
 or jsonb_typeof(report->'limitations') is distinct from 'array' then raise exception 'Invalid archive report'; end if;
 if exists(select 1 from jsonb_array_elements(report->'limitations') l where jsonb_typeof(l) is distinct from 'string' or length(l#>>'{}')>1000) then raise exception 'Invalid archive limitations'; end if;
 fingerprint:=encode(sha256(convert_to(jsonb_build_object('title',title,'topic',topic,'language',lang,'html',p_capture->>'html','text',p_capture->>'text')::text,'UTF8')),'hex');
 perform pg_advisory_xact_lock(hashtextextended(caller::text||source_id||fingerprint,0));
 select id into result_id from public.chatgpt_html_archives where imported_by=caller and source_conversation_id=source_id and snapshot_sha256=fingerprint;
 if result_id is not null then return jsonb_build_object('archive_id',result_id,'created',false,'snapshot_sha256',fingerprint); end if;
 insert into public.chatgpt_html_archives(imported_by,source_conversation_id,source_url,title,topic,language,captured_at,extractor_version,capture_report,html,page_text,snapshot_sha256)
 values(caller,source_id,source_url,title,topic,lang,captured,p_capture->>'extractor_version',report,p_capture->>'html',p_capture->>'text',fingerprint) returning id into result_id;
 return jsonb_build_object('archive_id',result_id,'created',true,'snapshot_sha256',fingerprint);
end; $$;
revoke all on function public.save_chatgpt_html_archive(jsonb) from public,anon,authenticated;
grant execute on function public.save_chatgpt_html_archive(jsonb) to authenticated;
commit;
