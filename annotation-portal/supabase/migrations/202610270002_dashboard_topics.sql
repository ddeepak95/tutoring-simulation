begin;
create function public.dashboard_topic_key(c public.conversations) returns text language sql immutable set search_path='' as $$
 select coalesce(nullif(c.topic_id,''),nullif(c.transcript->>'topic_id',''),nullif(c.transcript->'repository_source'->>'topic_id',''),lower(btrim(coalesce(nullif(c.transcript->>'topic_name',''),nullif(c.transcript->>'topic_english_name',''),nullif(c.transcript->>'learning_topic',''),c.label))));
$$;
create function public.dashboard_topics() returns table(key text,name text,conversation_count integer) language sql stable security definer set search_path='' as $$
 select public.dashboard_topic_key(c),min(coalesce(t.name,nullif(c.transcript->>'topic_name',''),nullif(c.transcript->>'topic_english_name',''),nullif(c.transcript->>'learning_topic',''),c.label)),count(*)::integer
 from public.conversations c left join public.topics t on t.id=c.topic_id
 where public.is_admin() group by public.dashboard_topic_key(c) order by 2,1;
$$;
create function public.dashboard_topic_conversations(p_topic_key text) returns setof public.conversation_details language sql stable security definer set search_path='' as $$
 select d.* from public.conversation_details d join public.conversations c on c.id=d.id
 where public.is_admin() and public.dashboard_topic_key(c)=p_topic_key order by d.id;
$$;
revoke all on function public.dashboard_topic_key(public.conversations),public.dashboard_topics(),public.dashboard_topic_conversations(text) from public,anon,authenticated;
grant execute on function public.dashboard_topics(),public.dashboard_topic_conversations(text) to authenticated;
commit;
