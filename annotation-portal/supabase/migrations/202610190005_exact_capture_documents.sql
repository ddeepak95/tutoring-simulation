begin;
create table public.conversation_capture_documents (
 conversation_id uuid primary key references public.conversations(id) on delete cascade,
 html text not null,
 imported_by uuid not null references public.profiles(id),
 created_at timestamptz not null default now()
);
alter table public.conversation_capture_documents enable row level security;
revoke all on public.conversation_capture_documents from public,anon,authenticated;
grant select on public.conversation_capture_documents to authenticated;
create policy conversation_capture_document_read on public.conversation_capture_documents for select to authenticated using (exists(select 1 from public.conversations c where c.id=conversation_id));

create or replace function public.import_chatgpt_exact_capture(p_capture jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 caller uuid:=auth.uid(); item jsonb; source_id text; source_url text; fingerprint text; result_id uuid; new_id uuid:=gen_random_uuid(); captured timestamptz; title text; topic text; lang text; report jsonb; safe_report jsonb; messages jsonb:='[]'; seen text[]:='{}'; provenance jsonb;
begin
 if caller is null or not exists(select 1 from public.profiles where id=caller and role in ('admin','annotator')) then raise exception 'Sign in with a portal admin or annotator account' using errcode='42501'; end if;
 if jsonb_typeof(p_capture) is distinct from 'object' or octet_length(p_capture::text)>8388608 or p_capture->>'format_version' is distinct from 'chatgpt-direct-capture/1' or jsonb_typeof(p_capture->'turns') is distinct from 'array' or jsonb_array_length(p_capture->'turns') not between 1 and 10000 then raise exception 'Invalid exact capture format'; end if;
 source_id:=p_capture->'source'->>'conversation_id'; source_url:=p_capture->'source'->>'url'; report:=p_capture->'report'; title:=btrim(p_capture->>'title'); topic:=btrim(p_capture->>'topic'); lang:=btrim(p_capture->>'language');
 if source_id is null or source_id !~* '^[a-f0-9-]{36}$' or source_url is null or source_url !~ ('^https://chatgpt[.]com/(g/[a-zA-Z0-9_/-]+/)?c/'||source_id||'$') or title is null or length(title) not between 1 and 250 or topic is null or length(topic) not between 1 and 1000 or lang is null or length(lang) not between 1 and 80 or jsonb_typeof(report) is distinct from 'object' or report->>'scope' is distinct from 'loaded-page' or report->'history_verified' is distinct from 'false'::jsonb or jsonb_typeof(report->'limitations') is distinct from 'array' or jsonb_typeof(report->'exact_html') is distinct from 'string' then raise exception 'Incomplete exact capture metadata'; end if;
 begin captured:=(p_capture->>'captured_at')::timestamptz; exception when others then raise exception 'Invalid capture timestamp'; end;
 if not isfinite(captured) or captured<'1970-01-01'::timestamptz or captured>now()+interval '5 minutes' then raise exception 'Invalid capture timestamp'; end if;
 for item in select value from jsonb_array_elements(p_capture->'turns') loop
  if jsonb_typeof(item) is distinct from 'object' or item->>'turn_id' !~ '^[A-Za-z0-9_.:-]{1,160}$' or item->>'turn_id'=any(seen) or item->>'speaker' not in ('student','tutor') or jsonb_typeof(item->'text') is distinct from 'string' or length(btrim(item->>'text'))=0 or jsonb_typeof(item->'html') is distinct from 'string' or length(btrim(item->>'html'))=0 or jsonb_typeof(item->'source_ids') is distinct from 'array' then raise exception 'Invalid or duplicate exact turn'; end if;
  seen:=array_append(seen,item->>'turn_id'); messages:=messages||jsonb_build_array(jsonb_build_object('turn_id',item->>'turn_id','speaker',item->>'speaker','text',item->>'text'));
 end loop;
 if not exists(select 1 from jsonb_array_elements(messages) m where m->>'speaker'='tutor') then raise exception 'No assistant responses found'; end if;
 fingerprint:=encode(sha256(convert_to(jsonb_build_object('title',title,'topic',topic,'language',lang,'turns',p_capture->'turns','exact_html',report->>'exact_html')::text,'UTF8')),'hex');
 perform pg_advisory_xact_lock(hashtextextended(caller::text||source_id||fingerprint,0)); select conversation_id into result_id from public.chatgpt_imports where imported_by=caller and source_conversation_id=source_id and snapshot_sha256=fingerprint;
 if result_id is not null then return jsonb_build_object('conversation_id',result_id,'created',false,'snapshot_sha256',fingerprint); end if;
 safe_report:=report-'exact_html'; provenance:=jsonb_build_object('source_conversation_id',source_id,'source_url',source_url,'captured_at',captured,'imported_by',caller,'imported_at',now(),'extractor_version',p_capture->>'extractor_version','snapshot_sha256',fingerprint,'capture_report',safe_report);
 insert into public.conversations(id,label,language,transcript,created_by) values(new_id,title,lang,jsonb_build_object('conversation_id',new_id,'label',title,'learning_topic',topic,'original_language',lang,'topic_english_name',case when lower(lang)='english' then topic else null end,'messages',messages,'chatgpt_source',provenance),caller);
 insert into public.chatgpt_imports(conversation_id,imported_by,source_conversation_id,source_url,snapshot_sha256,captured_at,extractor_version,capture_report) values(new_id,caller,source_id,source_url,fingerprint,captured,p_capture->>'extractor_version',safe_report);
 update public.chatgpt_imports set capture_report=report where conversation_id=new_id;
 insert into public.conversation_capture_documents(conversation_id,html,imported_by) values(new_id,report->>'exact_html',caller);
 for item in select value from jsonb_array_elements(p_capture->'turns') loop insert into public.conversation_capture_assets(conversation_id,turn_id,html,source_ids) values(new_id,item->>'turn_id',item->>'html',item->'source_ids'); end loop;
 return jsonb_build_object('conversation_id',new_id,'created',true,'snapshot_sha256',fingerprint);
end; $$;
revoke all on function public.import_chatgpt_exact_capture(jsonb) from public,anon,authenticated;
grant execute on function public.import_chatgpt_exact_capture(jsonb) to authenticated;
commit;
