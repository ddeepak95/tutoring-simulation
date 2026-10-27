begin;
create table public.conversation_section_states (
 conversation_id uuid not null,
 turn_id text not null,
 state_key text not null check(state_key ~ '^state_[0-9]+$'),
 section_id text not null,
 start integer not null check(start>=0),
 "end" integer not null check("end">start),
 legacy_section_ids text[] not null default '{}',
 primary key(conversation_id,turn_id,state_key),
 constraint conversation_section_states_owner_fkey foreign key(conversation_id,section_id) references public.conversation_sections(conversation_id,section_id) on delete cascade
);
alter table public.conversation_section_states enable row level security;
create policy section_state_read on public.conversation_section_states for select to authenticated using(public.can_read_conversation_sections(conversation_id));
revoke all on public.conversation_section_states from public,anon,authenticated;
grant select on public.conversation_section_states to authenticated,service_role;
create trigger preserve_section_state before update on public.conversation_section_states for each row execute function public.preserve_conversation_section();

create function public.register_conversation_section_states(p_conversation_id uuid,p_states jsonb) returns void language plpgsql security definer set search_path='' as $$
declare candidate jsonb; owner public.conversation_sections; previous public.conversation_section_states; source text; body text; aliases text[]; alias text;
begin
 if not public.can_read_conversation_sections(p_conversation_id) and coalesce(current_setting('role',true),'none') not in ('service_role','none') then raise exception 'Conversation access denied' using errcode='42501'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 if jsonb_typeof(p_states) is distinct from 'array' or jsonb_array_length(p_states)>10000 then raise exception 'Invalid state inventory'; end if;
 for candidate in select value from jsonb_array_elements(p_states) loop
  select * into owner from public.conversation_sections where conversation_id=p_conversation_id and section_id=candidate->>'section_id';
  if owner.section_id is null or owner.turn_id is distinct from candidate->>'turn_id' then raise exception 'State owner must be an original section in the same tutor turn'; end if;
  select value->>'text' into source from public.conversations c,jsonb_array_elements(c.transcript->'messages') where c.id=p_conversation_id and value->>'turn_id'=owner.turn_id;
  if position('Agent-explored interactive state ' in substr(source,1,public.utf16_offset(source,owner."end")))>0 then raise exception 'Captured states cannot own other states'; end if;
  if candidate->>'state_key' !~ '^state_[0-9]+$' or candidate->>'start' !~ '^[0-9]+$' or candidate->>'end' !~ '^[0-9]+$' then raise exception 'Invalid state identity or offsets'; end if;
  body:=substr(source,public.utf16_offset(source,(candidate->>'start')::int)+1,public.utf16_offset(source,(candidate->>'end')::int)-public.utf16_offset(source,(candidate->>'start')::int));
  if length(btrim(body))=0 or owner."end">=(candidate->>'start')::int then raise exception 'State must have exact supplemental source evidence after its owner'; end if;
  if rtrim(substr(source,1,public.utf16_offset(source,(candidate->>'start')::int)),E' \t\r\n') not like '%Agent-explored interactive state '||(candidate->>'state_key')||' (capture action, not a learner response)%' then raise exception 'State key does not match source marker'; end if;
  select coalesce(array_agg(value),array[]::text[]) into aliases from jsonb_array_elements_text(coalesce(candidate->'legacy_section_ids','[]'));
  foreach alias in array aliases loop
   if not exists(select 1 from public.conversation_sections s where s.conversation_id=p_conversation_id and s.section_id=alias and s.turn_id=owner.turn_id and s.start>=(candidate->>'start')::int and s."end"<=(candidate->>'end')::int) then raise exception 'Historical state alias must be contained in the captured state'; end if;
  end loop;
  select * into previous from public.conversation_section_states where conversation_id=p_conversation_id and turn_id=owner.turn_id and state_key=candidate->>'state_key';
  if found then
   if previous.section_id<>owner.section_id or previous.start<>(candidate->>'start')::int or previous."end"<>(candidate->>'end')::int or previous.legacy_section_ids is distinct from aliases then raise exception 'Section state ownership is permanent'; end if;
  else
   insert into public.conversation_section_states values(p_conversation_id,owner.turn_id,candidate->>'state_key',owner.section_id,(candidate->>'start')::int,(candidate->>'end')::int,aliases);
  end if;
 end loop;
end; $$;
revoke all on function public.register_conversation_section_states(uuid,jsonb) from public,anon;
grant execute on function public.register_conversation_section_states(uuid,jsonb) to authenticated,service_role;

create function public.reject_state_section_labels() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if exists(select 1 from jsonb_array_elements(new.annotations) a,public.conversation_section_states s where s.conversation_id=new.conversation_id and a->>'section_id'=any(s.legacy_section_ids)) then raise exception 'Captured interactive states belong to their original section; label the owning section instead'; end if;
 return new;
end; $$;
revoke all on function public.reject_state_section_labels() from public,anon,authenticated;
create trigger a0_reject_state_sections before insert or update of annotations on public.assignments for each row execute function public.reject_state_section_labels();
create trigger a0_reject_state_sections before insert on public.llm_baselines for each row execute function public.reject_state_section_labels();
commit;
