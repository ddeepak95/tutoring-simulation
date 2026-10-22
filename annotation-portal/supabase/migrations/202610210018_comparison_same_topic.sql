begin;

do $$
begin
  if exists (
    select 1 from public.comparison_assignments comparison
    join public.conversations a on a.id = comparison.conversation_a_id
    join public.conversations b on b.id = comparison.conversation_b_id
    where a.topic_id is null or b.topic_id is null or a.topic_id <> b.topic_id
  ) then raise exception 'Existing comparisons include different or missing topic IDs; review them before applying this migration'; end if;
end; $$;

create function public.require_comparison_same_topic() returns trigger
language plpgsql set search_path = '' as $$
declare topic_a text; topic_b text;
begin
  select topic_id into topic_a from public.conversations where id = new.conversation_a_id;
  select topic_id into topic_b from public.conversations where id = new.conversation_b_id;
  if topic_a is null or topic_b is null or topic_a <> topic_b then
    raise exception 'Comparisons require two conversations with the same topic ID';
  end if;
  return new;
end; $$;

create trigger comparison_same_topic before insert or update of conversation_a_id, conversation_b_id
on public.comparison_assignments for each row execute function public.require_comparison_same_topic();

commit;
