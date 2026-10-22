begin;

create table public.languages (
  id text primary key check (id ~ '^[a-z]{2,3}(-[a-z0-9]{2,8})*$'),
  name text not null check (length(btrim(name)) > 0)
);
create table public.topics (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(btrim(name)) > 0)
);
create table public.topic_titles (
  topic_id text not null references public.topics(id) on update cascade on delete cascade,
  language_id text not null references public.languages(id) on update cascade,
  title text not null check (length(btrim(title)) > 0),
  primary key (topic_id, language_id)
);

alter table public.languages enable row level security;
alter table public.topics enable row level security;
alter table public.topic_titles enable row level security;
create policy language_catalog_read on public.languages for select to authenticated using (true);
create policy topic_catalog_read on public.topics for select to authenticated using (true);
create policy topic_title_catalog_read on public.topic_titles for select to authenticated using (true);
revoke all on public.languages, public.topics, public.topic_titles from public, anon, authenticated;
grant select on public.languages, public.topics, public.topic_titles to authenticated;
grant all on public.languages, public.topics, public.topic_titles to service_role;

alter table public.conversations add column topic_id text references public.topics(id) on update cascade;
create index conversations_topic_id on public.conversations(topic_id);

create or replace function public.set_conversation_topic() returns trigger
language plpgsql set search_path = '' as $$
declare candidate text; generic_name text;
begin
  candidate := coalesce(nullif(new.topic_id, ''), nullif(new.transcript->>'topic_id', ''), nullif(new.transcript->'repository_source'->>'topic_id', ''));
  if candidate = 'covalent-redius' then candidate := 'covalent-radius'; end if;
  if candidate is null then return new; end if;
  select name into generic_name from public.topics where id = candidate;
  if generic_name is null then raise exception 'Unknown topic ID: %. Add it to topics.json and sync the topic catalog.', candidate; end if;
  new.topic_id := candidate;
  new.transcript := jsonb_set(new.transcript, '{topic_id}', to_jsonb(candidate));
  new.transcript := jsonb_set(new.transcript, '{topic_name}', to_jsonb(generic_name));
  new.transcript := jsonb_set(new.transcript, '{topic_english_name}', to_jsonb(generic_name));
  return new;
end; $$;
create trigger set_conversation_topic before insert or update on public.conversations
for each row execute function public.set_conversation_topic();

create view public.conversation_details with (security_invoker = true) as
select c.*, t.name as generic_topic_name, coalesce(tt.title, c.label) as conversation_title
from public.conversations c
left join public.topics t on t.id = c.topic_id
left join public.topic_titles tt on tt.topic_id = c.topic_id and tt.language_id = c.language;
revoke all on public.conversation_details from public, anon, authenticated;
grant select on public.conversation_details to authenticated;

commit;
