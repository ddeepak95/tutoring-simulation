begin;

create function public.capture_english_source_messages() returns trigger
language plpgsql security definer set search_path='' as $$
declare parent_messages jsonb;
begin
 if new.source_conversation_id is null or new.transcript->'translation'->>'version' is distinct from 'capture-english/1' then return new; end if;
 select transcript->'messages' into parent_messages from public.conversations where id=new.source_conversation_id;
 if parent_messages is null then raise exception 'Translation source conversation is missing'; end if;
 new.transcript:=jsonb_set(new.transcript,'{translation,source_messages}',parent_messages,true);
 return new;
end; $$;

create trigger capture_english_source_messages_before_write
before insert or update of transcript,source_conversation_id on public.conversations
for each row execute function public.capture_english_source_messages();

update public.conversations translated
set transcript=jsonb_set(translated.transcript,'{translation,source_messages}',source.transcript->'messages',true)
from public.conversations source
where translated.source_conversation_id=source.id
 and translated.transcript->'translation'->>'version'='capture-english/1';

commit;
