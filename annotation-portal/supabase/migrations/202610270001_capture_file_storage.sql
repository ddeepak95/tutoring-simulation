begin;
create function public.capture_file_storage_version() returns text language sql immutable set search_path='' as $$select 'capture-file-storage/1'::text$$;
revoke all on function public.capture_file_storage_version() from public,anon;
grant execute on function public.capture_file_storage_version() to authenticated;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('conversation-packages','conversation-packages',false,20971520,array['application/json']) on conflict(id) do nothing;
create policy capture_package_insert on storage.objects for insert to authenticated with check(bucket_id='conversation-packages' and public.is_admin() and (storage.foldername(name))[1]='packages' and (storage.foldername(name))[2]=auth.uid()::text);
create policy capture_package_read on storage.objects for select to authenticated using(bucket_id='conversation-packages' and (public.is_admin() or exists(select 1 from public.conversations c where c.transcript->'html_content_ref'->>'path'=name and public.can_read_conversation_sections(c.id))));

create function public.html_capture_index(p jsonb) returns jsonb language plpgsql immutable set search_path='' as $$
declare result jsonb:=p-'styles'-'assets'-'svg_sprites'-'presentation'-'image_inventory';turns jsonb:='[]';sections jsonb;components jsonb;states jsonb;t jsonb;s jsonb;c jsonb;v jsonb;
begin
 for t in select value from jsonb_array_elements(p->'turns') loop
  sections:='[]';for s in select value from jsonb_array_elements(t->'sections') loop
   components:='[]';for c in select value from jsonb_array_elements(s->'components') loop
    states:='[]';for v in select value from jsonb_array_elements(c->'states') loop states:=states||jsonb_build_array(v-'html');end loop;
    components:=components||jsonb_build_array(jsonb_set(c,'{states}',states));
   end loop;
   sections:=sections||jsonb_build_array(jsonb_set(s-'html','{components}',components));
  end loop;
  turns:=turns||jsonb_build_array(jsonb_set(t-'html'-'content_attributes','{sections}',sections));
 end loop;
 return jsonb_set(result,'{turns}',turns);
end;$$;
create function public.check_capture_file_reference(p jsonb,r jsonb) returns void language plpgsql security definer set search_path='' as $$
begin
 if not public.is_admin() or r->>'bucket' is distinct from 'conversation-packages' or r->>'path' is distinct from ('packages/'||auth.uid()::text||'/'||(p->>'version_hash')||'.json') or r->>'version_hash' is distinct from p->>'version_hash' or r->>'capture_id' is distinct from p->>'capture_id' or coalesce(r->>'sha256','') !~ '^[a-f0-9]{64}$' or coalesce((r->>'bytes')::bigint,0) not between 1 and 20971520 or not exists(select 1 from storage.objects where bucket_id='conversation-packages' and name=r->>'path') then raise exception 'Invalid or unavailable capture package reference';end if;
end;$$;

do $$declare definition text;begin
 definition:=pg_get_functiondef('public.validate_transcript()'::regprocedure);
 definition:=regexp_replace(definition,'begin',E'begin\n if new.transcript ? ''html_content_ref'' then perform public.check_capture_file_reference(new.transcript->''html_content'',new.transcript->''html_content_ref''); return new;end if;','i');execute definition;
end;$$;
create or replace function public.preserve_html_content() returns trigger language plpgsql set search_path='' as $$
begin
 if old.transcript ? 'html_content' and (new.transcript is distinct from old.transcript or new.source_conversation_id is distinct from old.source_conversation_id) then
  if public.is_admin() and not (old.transcript ? 'html_content_ref') and new.source_conversation_id is not distinct from old.source_conversation_id and new.transcript=jsonb_set(jsonb_set(old.transcript,'{html_content}',public.html_capture_index(old.transcript->'html_content')),'{html_content_ref}',new.transcript->'html_content_ref') then
   perform public.check_capture_file_reference(old.transcript->'html_content',new.transcript->'html_content_ref');return new;
  end if;
  raise exception 'Finalized HTML content is immutable; create another capture version';
 end if;return new;
end;$$;
create or replace function public.preserve_conversation_section() returns trigger language plpgsql set search_path='' as $$
begin
 if tg_table_name='html_conversation_sections' and public.is_admin() and (to_jsonb(new)-'html'-'components')=(to_jsonb(old)-'html'-'components') and to_jsonb(new)->>'html'='' and to_jsonb(new)->'components'='[]'::jsonb and exists(select 1 from public.conversations where id=(to_jsonb(new)->>'conversation_id')::uuid and transcript ? 'html_content_ref') then return new;end if;
 raise exception 'Conversation section IDs and boundaries are permanent; create a new conversation for revised source text';
end;$$;
create function public.externalize_html_conversation(p_conversation_id uuid,p_reference jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare row public.conversations;begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501';end if;
 select * into row from public.conversations where id=p_conversation_id for update;
 if row.id is null then raise exception 'Conversation not found';end if;
 if row.transcript ? 'html_content_ref' then
  if row.transcript->'html_content_ref' is distinct from p_reference then raise exception 'Capture storage reference is immutable';end if;
  return jsonb_build_object('conversation_id',row.id,'externalized',false);
 end if;
 perform public.check_capture_file_reference(row.transcript->'html_content',p_reference);
 update public.conversations set transcript=jsonb_set(jsonb_set(transcript,'{html_content}',public.html_capture_index(transcript->'html_content')),'{html_content_ref}',p_reference) where id=row.id;
 update public.html_conversation_sections set html='',components='[]' where conversation_id=row.id;
 return jsonb_build_object('conversation_id',row.id,'externalized',true);
end;$$;
create function public.import_html_conversation_file(p_package jsonb,p_reference jsonb,p_source_id uuid default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare caller uuid:=auth.uid();result uuid;source jsonb;inventory jsonb;t jsonb;s jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501';end if;
 perform public.validate_html_capture(p_package);
 perform public.check_capture_file_reference(p_package,p_reference);
 if p_package->'source_version'<>'null'::jsonb then
  select transcript->'html_content' into source from public.conversations where id=p_source_id;
  if source is null or source->>'capture_id' is distinct from p_package->'source_version'->>'capture_id' or source->>'version_hash' is distinct from p_package->'source_version'->>'version_hash' or public.html_capture_structure(source) is distinct from public.html_capture_structure(p_package) then raise exception 'Translation source or structure differs';end if;
 elsif p_source_id is not null then raise exception 'Source capture cannot specify a translation parent';end if;
 perform pg_advisory_xact_lock(hashtextextended((p_package->>'capture_id')||(p_package->>'version_hash'),0));
 select conversation_id into result from public.html_conversations where capture_id=p_package->>'capture_id' and version_hash=p_package->>'version_hash';
 if result is not null then perform public.externalize_html_conversation(result,p_reference);return jsonb_build_object('conversation_id',result,'created',false);end if;
 result:=gen_random_uuid();select jsonb_agg(jsonb_build_object('turn_id',v->>'turn_id','speaker',v->>'speaker','text','')) into inventory from jsonb_array_elements(p_package->'turns') v;
 insert into public.conversations(id,label,language,source_conversation_id,transcript,created_by) values(result,p_package->'metadata'->>'title',p_package->'metadata'->>'language',p_source_id,jsonb_build_object('conversation_id',result,'label',p_package->'metadata'->>'title','learning_topic',p_package->'metadata'->>'topic','topic_id',p_package->'metadata'->>'topic_id','provider',p_package->'metadata'->>'provider','access_type',p_package->'metadata'->>'access_type','messages',inventory,'html_content',public.html_capture_index(p_package),'html_content_ref',p_reference),caller);
 insert into public.html_conversations values(result,p_package->>'capture_id',p_package->>'version_hash',p_source_id);
 for t in select value from jsonb_array_elements(p_package->'turns') loop for s in select value from jsonb_array_elements(t->'sections') loop
  insert into public.html_conversation_sections values(result,s->>'section_id',t->>'turn_id',(s->>'turn_number')::int,(s->>'section_number')::int,s->>'heading','','[]'::jsonb);
 end loop;end loop;
 return jsonb_build_object('conversation_id',result,'created',true);
end;$$;

revoke all on function public.html_capture_index(jsonb),public.check_capture_file_reference(jsonb,jsonb),public.externalize_html_conversation(uuid,jsonb),public.import_html_conversation_file(jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function public.check_capture_file_reference(jsonb,jsonb),public.externalize_html_conversation(uuid,jsonb),public.import_html_conversation_file(jsonb,jsonb,uuid) to authenticated;
commit;
