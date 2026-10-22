begin;

alter table public.conversations add column source_conversation_id uuid;
create index conversations_source_conversation_id_idx on public.conversations(source_conversation_id);
update public.conversations
set source_conversation_id=(transcript->>'source_conversation_id')::uuid
where transcript->>'source_conversation_id' ~* '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$';

create function public.import_capture_english_translation(p_source_id uuid, p_title text, p_topic text, p_turns jsonb, p_alignment jsonb default '[]'::jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare
 caller uuid:=auth.uid(); source_row public.conversations%rowtype; item jsonb; original_item jsonb;
 messages jsonb:='[]'::jsonb; fingerprint text; result_id uuid; new_id uuid:=gen_random_uuid(); seen_alignment text[]:='{}';
begin
 if caller is null or not exists(select 1 from public.profiles where id=caller and role in ('admin','annotator')) then
  raise exception 'Sign in with a portal admin or annotator account' using errcode='42501';
 end if;
 select * into source_row from public.conversations where id=p_source_id;
 if source_row.id is null or not source_row.transcript ? 'chatgpt_source' then raise exception 'Original capture not found or unavailable'; end if;
 if source_row.created_by is distinct from caller and not exists(select 1 from public.profiles where id=caller and role='admin') then
  raise exception 'Only the capture owner or an administrator can translate it' using errcode='42501';
 end if;
 if nullif(btrim(p_title),'') is null or length(p_title)>250 or nullif(btrim(p_topic),'') is null or length(p_topic)>1000 then raise exception 'English title and topic are required'; end if;
 if jsonb_typeof(p_turns) is distinct from 'array' or jsonb_array_length(p_turns)<>jsonb_array_length(source_row.transcript->'messages') then raise exception 'Translation must contain every original turn'; end if;
 for item,original_item in
  select t.value,s.value from jsonb_array_elements(p_turns) with ordinality t(value,n)
  join jsonb_array_elements(source_row.transcript->'messages') with ordinality s(value,n) using(n)
  order by t.n
 loop
  if item->>'turn_id' is distinct from original_item->>'turn_id' or item->>'speaker' is distinct from original_item->>'speaker'
     or jsonb_typeof(item->'text') is distinct from 'string' or nullif(btrim(item->>'text'),'') is null then
   raise exception 'Translation turn IDs, speakers, and text must match the original structure';
  end if;
  messages:=messages||jsonb_build_array(jsonb_build_object('turn_id',item->>'turn_id','speaker',item->>'speaker','text',item->>'text'));
 end loop;
 if jsonb_typeof(p_alignment) is distinct from 'array' then raise exception 'Translation alignment must be a list'; end if;
 for item in select value from jsonb_array_elements(p_alignment) loop
  if item->>'segment_id' is null or item->>'segment_id'=any(seen_alignment) or item->>'turn_id' is null
     or (item->>'segment_id') !~ ('^'||(item->>'turn_id')||':s[0-9]+$')
     or jsonb_typeof(item->'start') is distinct from 'number' or jsonb_typeof(item->'end') is distinct from 'number'
     or jsonb_typeof(item->'source_start') is distinct from 'number' or jsonb_typeof(item->'source_end') is distinct from 'number'
     or (item->>'start') !~ '^[0-9]+$' or (item->>'end') !~ '^[0-9]+$'
     or (item->>'source_start') !~ '^[0-9]+$' or (item->>'source_end') !~ '^[0-9]+$'
     or (item->>'start')::integer >= (item->>'end')::integer
     or (item->>'source_start')::integer >= (item->>'source_end')::integer
     or not exists(select 1 from jsonb_array_elements(messages) m where m->>'turn_id'=item->>'turn_id' and (item->>'end')::integer<=octet_length(convert_to(m->>'text','UTF8')))
     or not exists(select 1 from jsonb_array_elements(source_row.transcript->'messages') m where m->>'turn_id'=item->>'turn_id' and (item->>'source_end')::integer<=octet_length(convert_to(m->>'text','UTF8')))
     or not exists(select 1 from jsonb_array_elements(messages) m where m->>'turn_id'=item->>'turn_id') then
   raise exception 'Invalid or duplicate source segment alignment';
  end if;
  seen_alignment:=array_append(seen_alignment,item->>'segment_id');
 end loop;
 fingerprint:=encode(sha256(convert_to(jsonb_build_object('title',p_title,'topic',p_topic,'turns',messages,'alignment',p_alignment)::text,'UTF8')),'hex');
 perform pg_advisory_xact_lock(hashtextextended(p_source_id::text||fingerprint,0));
 select id into result_id from public.conversations where source_conversation_id=p_source_id and transcript->'translation'->>'sha256'=fingerprint;
 if result_id is not null then return jsonb_build_object('conversation_id',result_id,'source_conversation_id',p_source_id,'created',false); end if;
 insert into public.conversations(id,label,language,source_conversation_id,transcript,created_by)
 values(new_id,p_title,'English',p_source_id,
  (source_row.transcript-'chatgpt_source'-'archive_source'-'repository_source') ||
  jsonb_build_object('conversation_id',new_id,'label',p_title,'learning_topic',p_topic,'topic_name',p_topic,
   'topic_english_name',p_topic,'language','English','original_language',source_row.language,
   'source_conversation_id',p_source_id,'messages',messages,
   'translation',jsonb_build_object('version','capture-english/1','sha256',fingerprint,'alignment',p_alignment)),caller);
 insert into public.conversation_capture_assets(conversation_id,turn_id,html,media_html,source_ids)
 select new_id,turn_id,html,media_html,source_ids from public.conversation_capture_assets where conversation_id=p_source_id;
 insert into public.conversation_capture_documents(conversation_id,html,imported_by)
 select new_id,html,caller from public.conversation_capture_documents where conversation_id=p_source_id;
 return jsonb_build_object('conversation_id',new_id,'source_conversation_id',p_source_id,'created',true);
end; $$;
revoke all on function public.import_capture_english_translation(uuid,text,text,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.import_capture_english_translation(uuid,text,text,jsonb,jsonb) to authenticated;
commit;
