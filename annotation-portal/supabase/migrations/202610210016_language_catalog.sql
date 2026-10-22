begin;

create or replace function public.language_id(value text) returns text
language plpgsql stable set search_path = '' as $$
declare input text := lower(btrim(coalesce(value, ''))); result text;
begin
  if input = '' then input := 'und'; end if;
  select id into result from public.languages where id = input or lower(name) = input order by (id = input) desc limit 1;
  if result is null then raise exception 'Unsupported language: %. Add its code and name to languages.json, then sync the topic catalog.', value; end if;
  return result;
end; $$;

alter table public.conversations add constraint conversations_language_catalog foreign key (language) references public.languages(id);
alter table public.chatgpt_html_archives add constraint archives_language_catalog foreign key (language) references public.languages(id);

commit;
