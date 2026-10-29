-- Compatible provenance update only. Local regrouping is a separate backed-up operation.
begin;
create or replace function public.register_conversation_sections(p_conversation_id uuid,p_sections jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
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
 if exists(select 1 from jsonb_array_elements(p_sections) x where coalesce(x->>'grouping_version','conversation-sections/1')<>coalesce(p_sections->0->>'grouping_version','conversation-sections/1')) or coalesce(p_sections->0->>'grouping_version','conversation-sections/1') !~ '^[a-z0-9][a-z0-9/._-]{0,79}$' then raise exception 'Invalid or mixed section grouping versions'; end if;
 insert into public.conversation_section_sets(conversation_id,source_hash,parser_version) values(p_conversation_id,fingerprint,coalesce(p_sections->0->>'grouping_version','conversation-sections/1'));
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
commit;
