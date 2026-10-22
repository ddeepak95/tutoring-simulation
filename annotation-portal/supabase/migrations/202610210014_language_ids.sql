begin;

create or replace function public.language_id(value text) returns text
language plpgsql immutable set search_path = '' as $$
declare result text := lower(btrim(coalesce(value, '')));
begin
  result := case result when 'english' then 'en' when 'tamil' then 'ta' when 'unspecified' then 'und' when '' then 'und' else result end;
  if result !~ '^[a-z]{2,3}(-[a-z0-9]{2,8})*$' then
    raise exception 'Invalid language ID: %. Use a BCP 47 code such as en or ta.', value;
  end if;
  return result;
end; $$;

create or replace function public.normalize_conversation_language() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.language := public.language_id(new.language);
  if new.transcript ? 'language' and new.transcript->>'language' is not null then
    new.transcript := jsonb_set(new.transcript, '{language}', to_jsonb(new.language));
  end if;
  if new.transcript ? 'original_language' and new.transcript->>'original_language' is not null then
    new.transcript := jsonb_set(new.transcript, '{original_language}', to_jsonb(public.language_id(new.transcript->>'original_language')));
  end if;
  if new.transcript->'repository_source'->>'language' is not null then
    new.transcript := jsonb_set(new.transcript, '{repository_source,language}', to_jsonb(new.language));
  end if;
  if new.language = 'en' and nullif(new.transcript->>'topic_english_name', '') is null and nullif(new.transcript->>'learning_topic', '') is not null then
    new.transcript := jsonb_set(new.transcript, '{topic_english_name}', to_jsonb(new.transcript->>'learning_topic'));
  end if;
  return new;
end; $$;

create trigger normalize_conversation_language before insert or update on public.conversations
for each row execute function public.normalize_conversation_language();

create or replace function public.normalize_archive_language() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.language := public.language_id(new.language);
  return new;
end; $$;

create trigger normalize_archive_language before insert or update on public.chatgpt_html_archives
for each row execute function public.normalize_archive_language();

update public.conversations set language = language;
update public.chatgpt_html_archives set language = language;
alter table public.conversations alter column language set default 'und';
alter table public.conversations add constraint conversation_language_id check (language ~ '^[a-z]{2,3}(-[a-z0-9]{2,8})*$');
alter table public.chatgpt_html_archives add constraint archive_language_id check (language ~ '^[a-z]{2,3}(-[a-z0-9]{2,8})*$');

commit;
