-- Optional exact-source display anchors. Historical section-only records stay valid.
begin;
create function public.validate_section_highlights(source text,highlights jsonb) returns void language plpgsql set search_path='' as $$
declare h jsonb; requested integer; found integer; relative integer; from_position integer; seen text[]:='{}'; anchor text;
begin
 if jsonb_typeof(highlights) is distinct from 'array' or jsonb_array_length(highlights)<1 or jsonb_array_length(highlights)>1000 then raise exception 'Invalid section highlights';end if;
 for h in select value from jsonb_array_elements(highlights) loop
  if jsonb_typeof(h) is distinct from 'object' or h-'quote'-'occurrence'<>'{}'::jsonb or jsonb_typeof(h->'quote') is distinct from 'string' or nullif(btrim(h->>'quote'),'') is null or length(h->>'quote')>500 or jsonb_typeof(h->'occurrence') is distinct from 'number' or coalesce(h->>'occurrence','')!~'^[1-9][0-9]*$' or (h->>'occurrence')::numeric>2147483647 then raise exception 'Invalid section highlight';end if;
  requested:=(h->>'occurrence')::integer;found:=0;from_position:=1;
  for i in 1..requested loop
   relative:=strpos(substr(source,from_position),h->>'quote');
   if relative=0 then raise exception 'Highlight is outside its owning section';end if;
   found:=from_position+relative-1;from_position:=found+1;
  end loop;
  anchor:=found||':'||length(h->>'quote');if anchor=any(seen) then raise exception 'Duplicate occurrence highlight';end if;seen:=array_append(seen,anchor);
 end loop;
end;$$;
revoke all on function public.validate_section_highlights(text,jsonb) from public,anon,authenticated;
-- Validate against the pinned quote before storage strips full-section evidence.
do $$ declare definition text;begin
 definition:=pg_get_functiondef('public.store_legacy_section_annotations(uuid,jsonb)'::regprocedure);
 if strpos(definition,'public.validate_section_highlights')=0 then
  definition:=replace(definition,'a:=(a-''evidence'')','if a ? ''highlights'' then perform public.validate_section_highlights(s.quote,a->''highlights''); end if; a:=(a-''evidence'')');
  if strpos(definition,'public.validate_section_highlights')=0 then raise exception 'Section storage function did not match expected contract';end if;
  execute definition;
 end if;
end;$$;
commit;
