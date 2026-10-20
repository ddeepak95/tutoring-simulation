begin;

create table public.chatgpt_imports (
 conversation_id uuid primary key references public.conversations(id) on delete cascade,
 imported_by uuid not null references public.profiles(id),
 source_conversation_id text not null,
 source_url text not null,
 snapshot_sha256 text not null,
 captured_at timestamptz not null,
 imported_at timestamptz not null default now(),
 extractor_version text not null,
 capture_report jsonb not null,
 unique(imported_by, source_conversation_id, snapshot_sha256)
);
alter table public.chatgpt_imports enable row level security;
revoke all on public.chatgpt_imports from public,anon,authenticated;
grant select on public.chatgpt_imports to authenticated;
grant all on public.chatgpt_imports to service_role;
create policy chatgpt_import_read on public.chatgpt_imports for select to authenticated
 using(imported_by=auth.uid() or public.is_admin());

-- Importers can read their own saved conversations, without gaining general insert access.
create policy chatgpt_import_conversation_read on public.conversations for select to authenticated
 using(exists(select 1 from public.chatgpt_imports i where i.conversation_id=conversations.id and i.imported_by=auth.uid()));

create function public.import_chatgpt_conversation(p_capture jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 caller uuid := auth.uid(); item jsonb; message_list jsonb := '[]'; seen text[] := '{}';
 source_id text; source_url text; fingerprint text; result_id uuid; new_id uuid := gen_random_uuid();
 captured timestamptz; provenance jsonb; title text; topic text; lang text; report jsonb;
begin
 if caller is null or not exists(select 1 from public.profiles where id=caller and role in ('admin','annotator')) then
  raise exception 'Sign in with a portal admin or annotator account' using errcode='42501';
 end if;
 if jsonb_typeof(p_capture) is distinct from 'object' or octet_length(p_capture::text)>2097152 then raise exception 'Invalid capture or capture exceeds 2 MB'; end if;
 if exists(select 1 from jsonb_object_keys(p_capture) k where k not in ('format_version','source','captured_at','extractor_version','report','messages','title','topic','language'))
 or p_capture->>'format_version' is distinct from 'chatgpt-portal-capture/1'
 or jsonb_typeof(p_capture->'messages') is distinct from 'array' or jsonb_array_length(p_capture->'messages')=0
 or jsonb_array_length(p_capture->'messages')>10000 then raise exception 'Invalid capture format'; end if;
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
 if jsonb_typeof(report) is distinct from 'object' or report->'complete' is distinct from 'true'::jsonb
 or report->'top_reached' is distinct from 'true'::jsonb or report->'bottom_reached' is distinct from 'true'::jsonb
 or report->'consistent_passes' is distinct from 'true'::jsonb
 or report->'message_count' is distinct from to_jsonb(jsonb_array_length(p_capture->'messages'))
 or jsonb_typeof(report->'limitations') is distinct from 'array' then raise exception 'Capture is incomplete; capture the conversation again'; end if;
 if exists(select 1 from jsonb_array_elements(report->'limitations') l where jsonb_typeof(l) is distinct from 'string' or length(l#>>'{}')>1000) then raise exception 'Invalid capture limitations'; end if;
 for item in select value from jsonb_array_elements(p_capture->'messages') loop
  if jsonb_typeof(item) is distinct from 'object' or exists(select 1 from jsonb_object_keys(item) k where k not in ('id','role','content'))
  or jsonb_typeof(item->'id') is distinct from 'string' or length(item->>'id') not between 1 and 200
  or (item->>'id')=any(seen)
  or jsonb_typeof(item->'role') is distinct from 'string' or item->>'role' not in ('user','assistant')
  or jsonb_typeof(item->'content') is distinct from 'string' or length(btrim(item->>'content'))=0 then raise exception 'Invalid, empty, or duplicate message'; end if;
  seen:=array_append(seen,item->>'id');
  message_list:=message_list||jsonb_build_array(jsonb_build_object('turn_id',item->>'id','speaker',case when item->>'role'='assistant' then 'tutor' else 'student' end,'text',item->>'content'));
 end loop;
 if not exists(select 1 from jsonb_array_elements(message_list) m where m->>'speaker'='tutor') then raise exception 'No assistant responses found'; end if;
 fingerprint:=encode(sha256(convert_to(jsonb_build_object('title',title,'topic',topic,'language',lang,'messages',message_list)::text,'UTF8')),'hex');
 -- Serialize identical imports, including retries after a lost success response.
 perform pg_advisory_xact_lock(hashtextextended(caller::text||source_id||fingerprint,0));
 select conversation_id into result_id from public.chatgpt_imports where imported_by=caller and source_conversation_id=source_id and snapshot_sha256=fingerprint;
 if result_id is not null then return jsonb_build_object('conversation_id',result_id,'created',false,'snapshot_sha256',fingerprint); end if;
 provenance:=jsonb_build_object('source_conversation_id',source_id,'source_url',source_url,'captured_at',captured,'imported_by',caller,'imported_at',now(),'extractor_version',p_capture->>'extractor_version','snapshot_sha256',fingerprint,'capture_report',report);
 insert into public.conversations(id,label,language,transcript,created_by)
 values(new_id,title,lang,jsonb_build_object('conversation_id',new_id,'label',title,'learning_topic',topic,'original_language',lang,'topic_english_name',case when lower(lang)='english' then topic else null end,'messages',message_list,'chatgpt_source',provenance),caller);
 insert into public.chatgpt_imports(conversation_id,imported_by,source_conversation_id,source_url,snapshot_sha256,captured_at,extractor_version,capture_report)
 values(new_id,caller,source_id,source_url,fingerprint,captured,p_capture->>'extractor_version',report);
 return jsonb_build_object('conversation_id',new_id,'created',true,'snapshot_sha256',fingerprint);
end; $$;
revoke all on function public.import_chatgpt_conversation(jsonb) from public,anon,authenticated;
grant execute on function public.import_chatgpt_conversation(jsonb) to authenticated;
commit;
