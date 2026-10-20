begin;

create function public.import_chatgpt_direct_capture(p_capture jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 caller uuid := auth.uid(); item jsonb; source_id text; source_url text; fingerprint text;
 result_id uuid; new_id uuid := gen_random_uuid(); captured timestamptz; title text; topic text; lang text;
 report jsonb; messages jsonb := '[]'::jsonb; seen text[] := '{}'; provenance jsonb;
begin
 if caller is null or not exists(select 1 from public.profiles where id=caller and role in ('admin','annotator')) then
  raise exception 'Sign in with a portal admin or annotator account' using errcode='42501';
 end if;
 if jsonb_typeof(p_capture) is distinct from 'object' or octet_length(p_capture::text)>8388608 then raise exception 'Invalid capture or capture exceeds 8 MB'; end if;
 if exists(select 1 from jsonb_object_keys(p_capture) k where k not in ('format_version','source','captured_at','extractor_version','report','turns','title','topic','language'))
 or p_capture->>'format_version' is distinct from 'chatgpt-direct-capture/1'
 or jsonb_typeof(p_capture->'turns') is distinct from 'array'
 or jsonb_array_length(p_capture->'turns') not between 1 and 10000 then raise exception 'Invalid direct capture format'; end if;
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
 or jsonb_typeof(report->'limitations') is distinct from 'array'
 or report->'message_count' is distinct from to_jsonb(jsonb_array_length(p_capture->'turns')) then raise exception 'Invalid capture report'; end if;
 if exists(select 1 from jsonb_array_elements(report->'limitations') l where jsonb_typeof(l) is distinct from 'string' or length(l#>>'{}')>1000) then raise exception 'Invalid capture limitations'; end if;
 for item in select value from jsonb_array_elements(p_capture->'turns') loop
  if jsonb_typeof(item) is distinct from 'object' or exists(select 1 from jsonb_object_keys(item) k where k not in ('turn_id','speaker','text','html','source_ids'))
  or jsonb_typeof(item->'turn_id') is distinct from 'string' or item->>'turn_id' !~ '^[A-Za-z0-9_.:-]{1,160}$' or item->>'turn_id'=any(seen)
  or jsonb_typeof(item->'speaker') is distinct from 'string' or item->>'speaker' not in ('student','tutor')
  or jsonb_typeof(item->'text') is distinct from 'string' or length(btrim(item->>'text'))=0 or octet_length(item->>'text')>2000000
  or jsonb_typeof(item->'html') is distinct from 'string' or length(btrim(item->>'html'))=0 or octet_length(item->>'html')>2000000
  or jsonb_typeof(item->'source_ids') is distinct from 'array' or jsonb_array_length(item->'source_ids')>1000 then raise exception 'Invalid or duplicate turn'; end if;
  if exists(select 1 from jsonb_array_elements(item->'source_ids') value where jsonb_typeof(value) is distinct from 'string' or length(value#>>'{}')>256) then raise exception 'Invalid source message ID'; end if;
  seen:=array_append(seen,item->>'turn_id');
  messages:=messages||jsonb_build_array(jsonb_build_object('turn_id',item->>'turn_id','speaker',item->>'speaker','text',item->>'text'));
 end loop;
 if not exists(select 1 from jsonb_array_elements(messages) m where m->>'speaker'='tutor') then raise exception 'No assistant responses found'; end if;
 fingerprint:=encode(sha256(convert_to(jsonb_build_object('title',title,'topic',topic,'language',lang,'turns',p_capture->'turns')::text,'UTF8')),'hex');
 perform pg_advisory_xact_lock(hashtextextended(caller::text||source_id||fingerprint,0));
 select conversation_id into result_id from public.chatgpt_imports where imported_by=caller and source_conversation_id=source_id and snapshot_sha256=fingerprint;
 if result_id is not null then return jsonb_build_object('conversation_id',result_id,'created',false,'snapshot_sha256',fingerprint); end if;
 provenance:=jsonb_build_object('source_conversation_id',source_id,'source_url',source_url,'captured_at',captured,'imported_by',caller,'imported_at',now(),'extractor_version',p_capture->>'extractor_version','snapshot_sha256',fingerprint,'capture_report',report);
 insert into public.conversations(id,label,language,transcript,created_by)
 values(new_id,title,lang,jsonb_build_object('conversation_id',new_id,'label',title,'learning_topic',topic,'original_language',lang,'topic_english_name',case when lower(lang)='english' then topic else null end,'messages',messages,'chatgpt_source',provenance),caller);
 insert into public.chatgpt_imports(conversation_id,imported_by,source_conversation_id,source_url,snapshot_sha256,captured_at,extractor_version,capture_report)
 values(new_id,caller,source_id,source_url,fingerprint,captured,p_capture->>'extractor_version',report);
 for item in select value from jsonb_array_elements(p_capture->'turns') loop
  insert into public.conversation_capture_assets(conversation_id,turn_id,html,source_ids)
  values(new_id,item->>'turn_id',item->>'html',item->'source_ids');
 end loop;
 return jsonb_build_object('conversation_id',new_id,'created',true,'snapshot_sha256',fingerprint);
end; $$;
revoke all on function public.import_chatgpt_direct_capture(jsonb) from public,anon,authenticated;
grant execute on function public.import_chatgpt_direct_capture(jsonb) to authenticated;
commit;
