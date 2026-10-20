begin;
create table public.chatgpt_archive_preparations (
 conversation_id uuid primary key references public.conversations(id) on delete cascade,
 archive_id uuid not null references public.chatgpt_html_archives(id),
 prepared_by uuid not null references public.profiles(id), prepared_at timestamptz not null default now(),
 preparation_sha256 text not null, turn_count integer not null,
 unique(archive_id,preparation_sha256)
);
create table public.conversation_capture_assets (
 conversation_id uuid not null references public.conversations(id) on delete cascade,
 turn_id text not null, html text not null, source_ids jsonb not null,
 primary key(conversation_id,turn_id)
);
alter table public.chatgpt_archive_preparations enable row level security;
alter table public.conversation_capture_assets enable row level security;
revoke all on public.chatgpt_archive_preparations,public.conversation_capture_assets from public,anon,authenticated;
grant select on public.chatgpt_archive_preparations,public.conversation_capture_assets to authenticated;
grant all on public.chatgpt_archive_preparations,public.conversation_capture_assets to service_role;
-- Reuse conversation RLS: assets are readable only by admins or by people who
-- already have access through annotation/comparison assignments.
create policy archive_preparation_read on public.chatgpt_archive_preparations for select to authenticated
 using(exists(select 1 from public.conversations c where c.id=conversation_id));
create policy conversation_capture_asset_read on public.conversation_capture_assets for select to authenticated
 using(exists(select 1 from public.conversations c where c.id=conversation_id));

create function public.prepare_chatgpt_html_archive(p_archive_id uuid,p_turns jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 archive public.chatgpt_html_archives; item jsonb; ids text[]:='{}'; messages jsonb:='[]';
 result_id uuid; fingerprint text; caller uuid:=auth.uid(); provenance jsonb;
begin
 if caller is null or not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 select * into archive from public.chatgpt_html_archives where id=p_archive_id;
 if archive.id is null then raise exception 'HTML archive not found'; end if;
 if jsonb_typeof(p_turns) is distinct from 'array' or octet_length(p_turns::text)>8388608
 or jsonb_array_length(p_turns) not between 1 and 10000 then raise exception 'Provide reviewed turns within the 8 MB preparation limit'; end if;
 for item in select value from jsonb_array_elements(p_turns) loop
  if jsonb_typeof(item) is distinct from 'object'
  or exists(select 1 from jsonb_object_keys(item) k where k not in ('turn_id','speaker','text','html','source_ids'))
  or jsonb_typeof(item->'turn_id') is distinct from 'string' or item->>'turn_id' !~ '^[A-Za-z0-9_.:-]{1,160}$' or item->>'turn_id'=any(ids)
  or jsonb_typeof(item->'speaker') is distinct from 'string' or item->>'speaker' not in ('tutor','student')
  or jsonb_typeof(item->'text') is distinct from 'string' or length(btrim(item->>'text'))=0 or octet_length(item->>'text')>2000000
  or jsonb_typeof(item->'html') is distinct from 'string' or length(btrim(item->>'html'))=0
  or jsonb_typeof(item->'source_ids') is distinct from 'array' or jsonb_array_length(item->'source_ids')>1000 then raise exception 'Invalid or duplicate reviewed turn'; end if;
  if exists(select 1 from jsonb_array_elements(item->'source_ids') value where jsonb_typeof(value) is distinct from 'string' or length(value#>>'{}')>256) then raise exception 'Invalid source message ID'; end if;
  ids:=array_append(ids,item->>'turn_id');
  messages:=messages||jsonb_build_array(jsonb_build_object('turn_id',item->>'turn_id','speaker',item->>'speaker','text',item->>'text'));
 end loop;
 if not exists(select 1 from jsonb_array_elements(messages) m where m->>'speaker'='tutor') then raise exception 'Include at least one tutor response'; end if;
 fingerprint:=encode(sha256(convert_to(jsonb_build_object('archive_id',p_archive_id,'turns',p_turns)::text,'UTF8')),'hex');
 perform pg_advisory_xact_lock(hashtextextended(p_archive_id::text||fingerprint,0));
 select conversation_id into result_id from public.chatgpt_archive_preparations where archive_id=p_archive_id and preparation_sha256=fingerprint;
 if result_id is not null then return jsonb_build_object('conversation_id',result_id,'created',false); end if;
 result_id:=gen_random_uuid();
 provenance:=jsonb_build_object('archive_id',archive.id,'source_conversation_id',archive.source_conversation_id,'source_url',archive.source_url,
  'captured_at',archive.captured_at,'imported_by',archive.imported_by,'extractor_version',archive.extractor_version,'snapshot_sha256',archive.snapshot_sha256,
  'prepared_by',caller,'prepared_at',now(),'preparation_sha256',fingerprint,'capture_report',archive.capture_report);
 insert into public.conversations(id,label,language,transcript,created_by)
 values(result_id,archive.title,archive.language,jsonb_build_object('conversation_id',result_id,'label',archive.title,'learning_topic',archive.topic,
 'original_language',archive.language,'topic_english_name',case when lower(archive.language)='english' then archive.topic else null end,
 'messages',messages,'archive_source',provenance),caller);
 insert into public.chatgpt_archive_preparations(conversation_id,archive_id,prepared_by,preparation_sha256,turn_count)
 values(result_id,p_archive_id,caller,fingerprint,jsonb_array_length(messages));
 for item in select value from jsonb_array_elements(p_turns) loop
  insert into public.conversation_capture_assets(conversation_id,turn_id,html,source_ids) values(result_id,item->>'turn_id',item->>'html',item->'source_ids');
 end loop;
 return jsonb_build_object('conversation_id',result_id,'created',true);
end; $$;
revoke all on function public.prepare_chatgpt_html_archive(uuid,jsonb) from public,anon,authenticated;
grant execute on function public.prepare_chatgpt_html_archive(uuid,jsonb) to authenticated;
commit;
