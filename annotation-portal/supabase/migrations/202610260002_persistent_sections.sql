begin;

create table public.conversation_section_sets (
 conversation_id uuid primary key references public.conversations(id) on delete cascade,
 source_hash text not null,
 parser_version text not null default 'conversation-sections/1',
 created_at timestamptz not null default now()
);
create table public.conversation_sections (
 conversation_id uuid not null references public.conversation_section_sets(conversation_id) on delete cascade,
 section_id text not null check(section_id ~ '^t[1-9][0-9]*s[1-9][0-9]*$'),
 turn_id text not null, turn_number integer not null check(turn_number>0),
 section_number integer not null check(section_number>0),
 start integer not null check(start>=0), "end" integer not null check("end">start),
 quote text not null check(length(btrim(quote))>0), occurrence integer not null check(occurrence>0),
 source_hash text not null,
 primary key(conversation_id,section_id),
 unique(conversation_id,turn_id,start,"end"),
 unique(conversation_id,turn_number,section_number)
);
alter table public.conversation_section_sets enable row level security;
alter table public.conversation_sections enable row level security;
create function public.can_read_conversation_sections(p_id uuid) returns boolean language sql stable security definer set search_path='' as $$
 select public.is_admin() or exists(select 1 from public.assignments where conversation_id=p_id and annotator_id=auth.uid());
$$;
create policy section_set_read on public.conversation_section_sets for select to authenticated using(public.can_read_conversation_sections(conversation_id));
create policy section_read on public.conversation_sections for select to authenticated using(public.can_read_conversation_sections(conversation_id));
revoke all on public.conversation_sections,public.conversation_section_sets from public,anon,authenticated;
grant select on public.conversation_sections,public.conversation_section_sets to authenticated,service_role;

create function public.preserve_conversation_section() returns trigger language plpgsql set search_path='' as $$
begin raise exception 'Conversation section IDs and boundaries are permanent; create a new conversation for revised source text'; end; $$;
create trigger preserve_conversation_section before update on public.conversation_sections for each row execute function public.preserve_conversation_section();
create trigger preserve_conversation_section_set before update on public.conversation_section_sets for each row execute function public.preserve_conversation_section();

create function public.register_conversation_sections(p_conversation_id uuid,p_sections jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare transcript jsonb; fingerprint text; candidate jsonb; turn jsonb; previous_turn integer:=0;
 expected_number integer:=0; previous_end integer:=0; turn_number integer; source text; first_position integer; last_position integer; section_quote text;
begin
 if not public.can_read_conversation_sections(p_conversation_id) and coalesce(current_setting('role',true),'none') not in ('service_role','none') then raise exception 'Conversation access denied' using errcode='42501'; end if;
 select c.transcript into transcript from public.conversations c where c.id=p_conversation_id for update;
 if transcript is null then raise exception 'Conversation not found'; end if;
 fingerprint:=md5(transcript::text);
 if exists(select 1 from public.conversation_section_sets where conversation_id=p_conversation_id) then
   if not exists(select 1 from public.conversation_section_sets where conversation_id=p_conversation_id and source_hash=fingerprint) then raise exception 'Conversation source changed; existing section IDs cannot be reassigned'; end if;
   return coalesce((select jsonb_agg(to_jsonb(s) order by s.turn_number,s.section_number) from public.conversation_sections s where conversation_id=p_conversation_id),'[]');
 end if;
 if jsonb_typeof(p_sections) is distinct from 'array' or jsonb_array_length(p_sections)=0 or jsonb_array_length(p_sections)>10000 then raise exception 'Provide a complete, ordered section inventory'; end if;
 insert into public.conversation_section_sets(conversation_id,source_hash) values(p_conversation_id,fingerprint);
 for candidate in select value from jsonb_array_elements(p_sections) loop
   select value into turn from jsonb_array_elements(transcript->'messages') where value->>'turn_id'=candidate->>'turn_id' and value->>'speaker'='tutor';
   if turn is null then raise exception 'Sections must belong to tutor turns'; end if;
   select count(*) into turn_number from jsonb_array_elements(transcript->'messages') with ordinality m(value,n)
    where value->>'speaker'='tutor' and n<=(select n from jsonb_array_elements(transcript->'messages') with ordinality t(value,n) where value->>'turn_id'=turn->>'turn_id');
   if (candidate->>'turn_number')::integer<>turn_number or turn_number<previous_turn then raise exception 'Incorrect section turn number or order'; end if;
   if turn_number<>previous_turn then
     if turn_number<>previous_turn+1 then raise exception 'Every tutor turn needs its sections'; end if;
     expected_number:=0;previous_end:=0;previous_turn:=turn_number;
   end if;
   expected_number:=expected_number+1;
   if (candidate->>'section_number')::integer<>expected_number then raise exception 'Section numbers must be consecutive within each turn'; end if;
   if jsonb_typeof(candidate->'start') is distinct from 'number' or jsonb_typeof(candidate->'end') is distinct from 'number' or candidate->>'start' !~ '^[0-9]+$' or candidate->>'end' !~ '^[0-9]+$' then raise exception 'Invalid section offsets'; end if;
   source:=turn->>'text';
   first_position:=public.utf16_offset(source,(candidate->>'start')::integer);
   last_position:=public.utf16_offset(source,(candidate->>'end')::integer);
   section_quote:=substr(source,first_position+1,last_position-first_position);
   if last_position<=first_position or (candidate->>'start')::integer<previous_end or length(btrim(section_quote))=0 then raise exception 'Invalid or overlapping section'; end if;
   insert into public.conversation_sections(conversation_id,section_id,turn_id,turn_number,section_number,start,"end",quote,occurrence,source_hash)
    values(p_conversation_id,'t'||turn_number||'s'||expected_number,turn->>'turn_id',turn_number,expected_number,(candidate->>'start')::integer,(candidate->>'end')::integer,section_quote,public.evidence_occurrence(source,section_quote,first_position),fingerprint);
   previous_end:=(candidate->>'end')::integer;
 end loop;
 if previous_turn<>(select count(*) from jsonb_array_elements(transcript->'messages') t where t->>'speaker'='tutor') then raise exception 'Every tutor turn needs its sections'; end if;
 return (select jsonb_agg(to_jsonb(s) order by s.turn_number,s.section_number) from public.conversation_sections s where conversation_id=p_conversation_id);
end; $$;
revoke all on function public.register_conversation_sections(uuid,jsonb),public.can_read_conversation_sections(uuid),public.preserve_conversation_section() from public,anon;
grant execute on function public.register_conversation_sections(uuid,jsonb),public.can_read_conversation_sections(uuid) to authenticated,service_role;

create function public.hydrate_section_annotations(p_conversation_id uuid,p_annotations jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare a jsonb; s public.conversation_sections; result jsonb:='[]';
begin
 for a in select value from jsonb_array_elements(p_annotations) loop
   if a ? 'section_id' then
     select * into s from public.conversation_sections where conversation_id=p_conversation_id and section_id=a->>'section_id';
     if s.section_id is null then raise exception 'Unknown section ID for this conversation'; end if;
     if not exists(select 1 from public.conversations c where c.id=p_conversation_id and md5(c.transcript::text)=s.source_hash) then raise exception 'Section source no longer matches conversation'; end if;
     a:=a||jsonb_build_object('entry',(a->'entry')||jsonb_build_object('turn_locations',jsonb_build_array(s.turn_id)),'evidence',jsonb_build_array(jsonb_build_object('turn_id',s.turn_id,'start',s.start,'end',s."end",'quote',s.quote,'occurrence',s.occurrence)));
   end if;
   result:=result||jsonb_build_array(a);
 end loop;
 return result;
end; $$;

create function public.store_section_annotations(p_conversation_id uuid,p_annotations jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare a jsonb; s public.conversation_sections; ev jsonb; result jsonb:='[]';
begin
 for a in select value from jsonb_array_elements(p_annotations) loop
   if a->'entry' ? 'category' then
     if a ? 'section_id' then
       select * into s from public.conversation_sections where conversation_id=p_conversation_id and section_id=a->>'section_id';
     else
       if jsonb_array_length(a->'evidence')<>1 then raise exception 'Each item must refer to one persistent section'; end if;
       ev:=a->'evidence'->0;
       select * into s from public.conversation_sections where conversation_id=p_conversation_id and turn_id=ev->>'turn_id' and start=(ev->>'start')::integer and "end"=(ev->>'end')::integer and quote=ev->>'quote';
     end if;
     if s.section_id is null then raise exception 'Section has not been registered for this conversation'; end if;
     if a ? 'evidence' and a->'evidence' is distinct from (public.hydrate_section_annotations(p_conversation_id,jsonb_build_array(a||jsonb_build_object('section_id',s.section_id)))->0->'evidence') then raise exception 'Section evidence does not match its permanent ID'; end if;
     a:=(a-'evidence')||jsonb_build_object('section_id',s.section_id,'entry',(a->'entry')-'turn_locations');
   end if;
   result:=result||jsonb_build_array(a);
 end loop;
 return result;
end; $$;

-- Persist only references. Existing validators continue to validate fully
-- resolved source evidence before the storage trigger removes duplicated text.
create function public.normalize_section_storage() returns trigger language plpgsql security definer set search_path='' as $$
begin
 new.annotations:=public.store_section_annotations(new.conversation_id,new.annotations);
 return new;
end; $$;
create trigger a_normalize_section_storage before insert or update of annotations on public.assignments for each row execute function public.normalize_section_storage();
create trigger a_normalize_section_storage before insert on public.llm_baselines for each row execute function public.normalize_section_storage();

alter function public.save_assignment(uuid,integer,jsonb,boolean,jsonb) rename to save_assignment_with_source_spans;
create function public.save_assignment(p_assignment_id uuid,p_revision integer,p_annotations jsonb,p_submit boolean,p_turn_ratings jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare conversation_id uuid;
begin
 select a.conversation_id into conversation_id from public.assignments a where a.id=p_assignment_id and (a.annotator_id=auth.uid() or public.is_admin());
 if conversation_id is null then raise exception 'Assignment access denied' using errcode='42501'; end if;
 return public.save_assignment_with_source_spans(p_assignment_id,p_revision,public.hydrate_section_annotations(conversation_id,p_annotations),p_submit,p_turn_ratings);
end; $$;
revoke all on function public.save_assignment_with_source_spans(uuid,integer,jsonb,boolean,jsonb),public.hydrate_section_annotations(uuid,jsonb),public.store_section_annotations(uuid,jsonb),public.normalize_section_storage() from public,anon,authenticated;
revoke all on function public.save_assignment(uuid,integer,jsonb,boolean,jsonb) from public,anon;
grant execute on function public.save_assignment(uuid,integer,jsonb,boolean,jsonb) to authenticated;

do $$
declare definition text;
begin
 definition:=pg_get_functiondef('public.upgrade_label_assignment_rubric(uuid,text)'::regprocedure);
 execute replace(definition,'perform public.validate_annotations(transcript, current_row.annotations, next_snapshot, false);','perform public.validate_annotations(transcript, public.hydrate_section_annotations(current_row.conversation_id,current_row.annotations), next_snapshot, false);');
end; $$;

-- Backfill is inserted by the project-checked rollout script, in this same
-- transaction, before old item annotations are normalized.
-- __SECTION_REGISTRY_BACKFILL__

commit;
