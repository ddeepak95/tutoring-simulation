begin;

create table public.html_conversations (
 conversation_id uuid primary key references public.conversations(id) on delete cascade,
 capture_id text not null,version_hash text not null check(version_hash ~ '^[a-f0-9]{64}$'),
 source_id uuid references public.html_conversations(conversation_id),
 unique(capture_id,version_hash)
);
create table public.html_conversation_sections (
 conversation_id uuid not null references public.html_conversations(conversation_id) on delete cascade,
 section_id text not null,turn_id text not null,turn_number integer not null,section_number integer not null,
 heading text,html text not null,components jsonb not null,
 primary key(conversation_id,section_id),unique(conversation_id,turn_number,section_number)
);
alter table public.html_conversations enable row level security;
alter table public.html_conversation_sections enable row level security;
create policy html_conversation_read on public.html_conversations for select to authenticated using(public.can_read_conversation_sections(conversation_id));
create policy html_section_read on public.html_conversation_sections for select to authenticated using(public.can_read_conversation_sections(conversation_id));
revoke all on public.html_conversations,public.html_conversation_sections from public,anon,authenticated;
grant select on public.html_conversations,public.html_conversation_sections to authenticated,service_role;
create trigger preserve_html_conversation before update on public.html_conversations for each row execute function public.preserve_conversation_section();
create trigger preserve_html_section before update on public.html_conversation_sections for each row execute function public.preserve_conversation_section();

create function public.canonical_capture_json(v jsonb) returns text language plpgsql immutable set search_path='' as $$
declare result text;
begin
 if jsonb_typeof(v)='object' then select '{'||coalesce(string_agg(to_jsonb(key)::text||':'||public.canonical_capture_json(value),',' order by key collate "C"),'')||'}' into result from jsonb_each(v);return result;end if;
 if jsonb_typeof(v)='array' then select '['||coalesce(string_agg(public.canonical_capture_json(value),',' order by n),'')||']' into result from jsonb_array_elements(v) with ordinality a(value,n);return result;end if;
 return v::text;
end;$$;

create function public.html_capture_structure(p jsonb) returns jsonb language sql immutable set search_path='' as $$
 select jsonb_agg(jsonb_build_object('turn_id',t->>'turn_id','speaker',t->>'speaker','sections',
 coalesce((select jsonb_agg(jsonb_build_object('section_id',s->>'section_id','components',coalesce((select jsonb_agg(jsonb_build_object('component_id',c->>'component_id','initial_state',c->>'initial_state','states',(select jsonb_agg(v->>'state_id') from jsonb_array_elements(c->'states') v),'transitions',c->'transitions','coverage',c->'coverage')) from jsonb_array_elements(s->'components') c),'[]'::jsonb))) from jsonb_array_elements(t->'sections') s),'[]'::jsonb))) from jsonb_array_elements(p->'turns') t;
$$;
create function public.validate_html_capture(p jsonb) returns void language plpgsql set search_path='' as $$
declare t jsonb;s jsonb;c jsonb;v jsonb;e jsonb;a jsonb;ids text[]:='{}';state_ids text[];edges text[];edge text;tn integer:=0;sn integer;cn integer;vn integer;id text;
begin
 if p->>'format_version' is distinct from 'html-conversation/2' or p->>'status' is distinct from 'complete' or nullif(btrim(p->'metadata'->>'title'),'') is null or nullif(p->'metadata'->>'language','') is null or nullif(p->>'capture_id','') is null or jsonb_typeof(p->'turns') is distinct from 'array' or jsonb_array_length(p->'turns')=0 or jsonb_typeof(p->'assets') is distinct from 'array' or octet_length(p::text)>20971520 then raise exception 'Invalid or incomplete HTML capture';end if;
 if p->>'version_hash' is distinct from encode(sha256(convert_to(public.canonical_capture_json(p-'version_hash'),'UTF8')),'hex') then raise exception 'HTML package hash mismatch';end if;
 for t in select value from jsonb_array_elements(p->'turns') loop
  id:=t->>'turn_id';if nullif(id,'') is null or id=any(ids) or t->>'speaker' not in ('student','tutor') or jsonb_typeof(t->'sections') is distinct from 'array' then raise exception 'Invalid HTML turn';end if;ids:=array_append(ids,id);
  if t->>'speaker'='student' then if jsonb_array_length(t->'sections')<>0 or nullif(btrim(t->>'html'),'') is null then raise exception 'Invalid student HTML';end if;continue;end if;
  tn:=tn+1;sn:=0;if jsonb_array_length(t->'sections')=0 then raise exception 'Tutor turn has no sections';end if;
  for s in select value from jsonb_array_elements(t->'sections') loop
   sn:=sn+1;id:='t'||tn||'s'||sn;
   if s->>'section_id' is distinct from id or (s->>'turn_number')::int is distinct from tn or (s->>'section_number')::int is distinct from sn or id=any(ids) or nullif(btrim(s->>'html'),'') is null or jsonb_typeof(s->'components') is distinct from 'array' then raise exception 'Invalid HTML section order or content';end if;ids:=array_append(ids,id);cn:=0;
   for c in select value from jsonb_array_elements(s->'components') loop
    cn:=cn+1;id:=(s->>'section_id')||'c'||cn;
    if c->>'component_id' is distinct from id or id=any(ids) or jsonb_typeof(c->'states') is distinct from 'array' or jsonb_array_length(c->'states')=0 or jsonb_typeof(c->'transitions') is distinct from 'array' or c->'coverage'->>'status' is distinct from 'complete' or (c->'coverage'->>'captured')::int is distinct from jsonb_array_length(c->'states') then raise exception 'Invalid or incomplete interactive component';end if;ids:=array_append(ids,id);vn:=0;state_ids:='{}';
    for v in select value from jsonb_array_elements(c->'states') loop
     vn:=vn+1;id:=(c->>'component_id')||'v'||vn;
     if v->>'state_id' is distinct from id or id=any(ids) or nullif(btrim(v->>'html'),'') is null or v->>'sha256' is distinct from encode(sha256(convert_to(v->>'html','UTF8')),'hex') then raise exception 'Invalid component state or hash';end if;
     ids:=array_append(ids,id);state_ids:=array_append(state_ids,id);
    end loop;
    if not coalesce(c->>'initial_state'=any(state_ids),false) then raise exception 'Unknown initial component state';end if;edges:='{}';
    for e in select value from jsonb_array_elements(c->'transitions') loop
     edge:=(e->>'from')||':'||(e->>'control_id');
     if not coalesce(e->>'from'=any(state_ids),false) or not coalesce(e->>'to'=any(state_ids),false) or nullif(e->>'control_id','') is null or edge=any(edges) then raise exception 'Invalid or ambiguous component transition';end if;edges:=array_append(edges,edge);
    end loop;
   end loop;
  end loop;
 end loop;
 ids:='{}';for a in select value from jsonb_array_elements(p->'assets') loop
  if coalesce(a->>'sha256','') !~ '^[a-f0-9]{64}$' or a->>'sha256'=any(ids) or coalesce(a->>'mime','') !~ '^image/' or coalesce(a->>'bytes','') !~ '^[1-9][0-9]*$' or nullif(a->>'file','') is null then raise exception 'Invalid HTML asset manifest';end if;ids:=array_append(ids,a->>'sha256');
 end loop;
end;$$;

-- Existing metadata consumers keep their turn inventory. It contains no text
-- content: all content and labeling references come from the HTML package.
do $$declare definition text;begin
 definition:=pg_get_functiondef('public.validate_transcript()'::regprocedure);
 definition:=regexp_replace(definition,'begin',E'begin\n if new.transcript ? ''html_content'' then perform public.validate_html_capture(new.transcript->''html_content''); return new;end if;','i');execute definition;
end;$$;
create function public.import_html_conversation(p_package jsonb,p_source_id uuid default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare caller uuid:=auth.uid();result uuid;source jsonb;inventory jsonb;t jsonb;s jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501';end if;
 perform public.validate_html_capture(p_package);
 if p_package->'source_version'<>'null'::jsonb then
  select transcript->'html_content' into source from public.conversations where id=p_source_id;
  if source is null or source->>'capture_id' is distinct from p_package->'source_version'->>'capture_id' or source->>'version_hash' is distinct from p_package->'source_version'->>'version_hash' or public.html_capture_structure(source) is distinct from public.html_capture_structure(p_package) then raise exception 'Translation source or structure differs';end if;
 elsif p_source_id is not null then raise exception 'Source capture cannot specify a translation parent';end if;
 perform pg_advisory_xact_lock(hashtextextended((p_package->>'capture_id')||(p_package->>'version_hash'),0));
 select conversation_id into result from public.html_conversations where capture_id=p_package->>'capture_id' and version_hash=p_package->>'version_hash';
 if result is not null then return jsonb_build_object('conversation_id',result,'created',false);end if;
 result:=gen_random_uuid();select jsonb_agg(jsonb_build_object('turn_id',v->>'turn_id','speaker',v->>'speaker','text','')) into inventory from jsonb_array_elements(p_package->'turns') v;
 insert into public.conversations(id,label,language,source_conversation_id,transcript,created_by) values(result,p_package->'metadata'->>'title',p_package->'metadata'->>'language',p_source_id,jsonb_build_object('conversation_id',result,'label',p_package->'metadata'->>'title','learning_topic',p_package->'metadata'->>'topic','topic_id',p_package->'metadata'->>'topic_id','provider',p_package->'metadata'->>'provider','access_type',p_package->'metadata'->>'access_type','messages',inventory,'html_content',p_package),caller);
 insert into public.html_conversations values(result,p_package->>'capture_id',p_package->>'version_hash',p_source_id);
 for t in select value from jsonb_array_elements(p_package->'turns') loop for s in select value from jsonb_array_elements(t->'sections') loop
  insert into public.html_conversation_sections values(result,s->>'section_id',t->>'turn_id',(s->>'turn_number')::int,(s->>'section_number')::int,s->>'heading',s->>'html',s->'components');
 end loop;end loop;
 return jsonb_build_object('conversation_id',result,'created',true);
end;$$;

alter function public.validate_annotations(jsonb,jsonb,jsonb,boolean) rename to validate_annotations_legacy_html;
create function public.validate_annotations(transcript jsonb,annotations jsonb,rubric jsonb,complete boolean) returns void language plpgsql set search_path='' as $$
declare a jsonb;f jsonb;ids text[]:='{}';pairs text[]:='{}';pair text;
begin
 if not transcript ? 'html_content' then perform public.validate_annotations_legacy_html(transcript,annotations,rubric,complete);return;end if;
 if jsonb_typeof(annotations) is distinct from 'array' or jsonb_array_length(annotations)>10000 then raise exception 'Invalid annotation list';end if;
 for a in select value from jsonb_array_elements(annotations) loop
  select value into f from jsonb_array_elements(rubric->'rubric') where value->>'key'=a->>'feature';
  if nullif(a->>'id','') is null or a->>'id'=any(ids) or f is null or not f ? 'category' or not exists(select 1 from jsonb_array_elements(transcript->'html_content'->'turns') t cross join lateral jsonb_array_elements(t->'sections') s where s->>'section_id'=a->>'section_id') then raise exception 'Invalid annotation ID, item or section';end if;ids:=array_append(ids,a->>'id');
  if a->'entry'->>'category' is distinct from f->>'category' or jsonb_typeof(a->'entry') is distinct from 'object' or ((a->'entry')-'category'-'count')<>'{}'::jsonb then raise exception 'Invalid item attributes or category';end if;
  if jsonb_typeof(a->'entry'->'count') is distinct from 'number' or coalesce(a->'entry'->>'count','') !~ '^[1-9][0-9]*$' or (a->'entry'->>'count')::numeric>1000 then raise exception 'Invalid item quantity';end if;
  if a ? 'evidence' and a->'evidence'<>'[]'::jsonb then raise exception 'HTML labels do not use transcript spans';end if;
  if a ? 'llm_evidence' and (jsonb_typeof(a->'llm_evidence') is distinct from 'string' or nullif(btrim(a->>'llm_evidence'),'') is null or length(a->>'llm_evidence')>1000 or a->>'llm_evidence' ~ E'[\r\n\u2028\u2029]') then raise exception 'Invalid LLM evidence';end if;
  pair:=(a->>'section_id')||':'||(a->>'feature');if pair=any(pairs) then raise exception 'Duplicate section item';end if;pairs:=array_append(pairs,pair);
 end loop;
end;$$;
alter function public.hydrate_section_annotations(uuid,jsonb) rename to hydrate_legacy_section_annotations;
create function public.hydrate_section_annotations(p_conversation_id uuid,p_annotations jsonb) returns jsonb language plpgsql security definer set search_path='' as $$begin
 if exists(select 1 from public.html_conversations where conversation_id=p_conversation_id) then return p_annotations;end if;
 return public.hydrate_legacy_section_annotations(p_conversation_id,p_annotations);end;$$;
alter function public.store_section_annotations(uuid,jsonb) rename to store_legacy_section_annotations;
create function public.store_section_annotations(p_conversation_id uuid,p_annotations jsonb) returns jsonb language plpgsql security definer set search_path='' as $$declare result jsonb;conversation jsonb;rubric jsonb;begin
 if exists(select 1 from public.html_conversations where conversation_id=p_conversation_id) then
  select transcript into conversation from public.conversations where id=p_conversation_id;
  select snapshot into rubric from public.rubric_versions where snapshot->>'label_schema_version'='section-items/1' order by created_at desc limit 1;
  perform public.validate_annotations(conversation,p_annotations,rubric,false);
  select coalesce(jsonb_agg(value-'evidence'),'[]'::jsonb) into result from jsonb_array_elements(p_annotations);return result;
 end if;return public.store_legacy_section_annotations(p_conversation_id,p_annotations);end;$$;

create function public.preserve_html_content() returns trigger language plpgsql set search_path='' as $$begin
 if old.transcript ? 'html_content' and (new.transcript is distinct from old.transcript or new.source_conversation_id is distinct from old.source_conversation_id) then raise exception 'Finalized HTML content is immutable; create another capture version';end if;return new;end;$$;
create trigger preserve_html_content before update on public.conversations for each row execute function public.preserve_html_content();
revoke all on function public.canonical_capture_json(jsonb),public.html_capture_structure(jsonb),public.validate_html_capture(jsonb),public.import_html_conversation(jsonb,uuid),public.validate_annotations(jsonb,jsonb,jsonb,boolean),public.validate_annotations_legacy_html(jsonb,jsonb,jsonb,boolean),public.hydrate_section_annotations(uuid,jsonb),public.hydrate_legacy_section_annotations(uuid,jsonb),public.store_section_annotations(uuid,jsonb),public.store_legacy_section_annotations(uuid,jsonb),public.preserve_html_content() from public,anon,authenticated;
grant execute on function public.import_html_conversation(jsonb,uuid) to authenticated;
commit;
