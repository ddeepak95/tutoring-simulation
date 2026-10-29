-- Honor rubric-defined first/subsequent turn timing; keep historical scores and choices.
begin;
create or replace function public.validate_turn_ratings(transcript jsonb, ratings jsonb, rubric jsonb, complete boolean) returns void language plpgsql set search_path = '' as $$
declare turn_id text; rating jsonb; dimension jsonb; key text; rating_value jsonb; turn jsonb; dimensions jsonb := coalesce(rubric->'rating_dimensions','[]'::jsonb);
begin
 if jsonb_typeof(ratings) is distinct from 'object' or octet_length(ratings::text)>2097152 then raise exception 'Invalid turn ratings'; end if;
 for turn_id,rating in select * from jsonb_each(ratings) loop
  if not exists(select 1 from jsonb_array_elements(transcript->'messages') where value->>'turn_id'=turn_id and value->>'speaker'='tutor') then raise exception 'Ratings must belong to tutor turns'; end if;
  if jsonb_typeof(rating) is distinct from 'object' or jsonb_typeof(rating->'values') is distinct from 'object' or jsonb_typeof(rating->'notes') is distinct from 'string' or exists(select 1 from jsonb_object_keys(rating) k where k not in ('values','notes')) then raise exception 'Invalid turn rating attributes'; end if;
  for key,rating_value in select * from jsonb_each(rating->'values') loop
   if key='instructional_sequence' and jsonb_typeof(rating_value)='string' and rating_value in ('""'::jsonb,'"Rule → Example"'::jsonb,'"Example → Rule"'::jsonb,'"Not determinable"'::jsonb) then continue; end if;
   if key='appropriateness_for_the_learners_level' and rating_value='"Insufficient evidence"'::jsonb then continue; end if;
   if key='concept_summarization' and rating_value='"Not applicable"'::jsonb then continue; end if;
   select d into dimension from jsonb_array_elements(dimensions) d where d->>'key'=key;
   if dimension is null or jsonb_typeof(rating_value) is distinct from 'string' or (rating_value<>'""'::jsonb and not (dimension->'options' @> jsonb_build_array(rating_value))) then raise exception 'Invalid turn rating value'; end if;
  end loop;
 end loop;
 if complete and jsonb_array_length(dimensions)>0 then
  for turn in select value from jsonb_array_elements(transcript->'messages') where value->>'speaker'='tutor' loop
   rating := ratings->(turn->>'turn_id');
   for dimension in select value from jsonb_array_elements(dimensions) loop
    -- Retired dimension is preserved in saved work but never required.
    if dimension->>'key'='instructional_sequence' then continue; end if;
    if (dimension->>'subsequent_only'='true' or dimension->>'key' in ('coherence','responsiveness')) and turn->>'turn_id'=(select value->>'turn_id' from jsonb_array_elements(transcript->'messages') with ordinality as messages(value,position) where value->>'speaker'='tutor' order by position limit 1) then continue; end if;
    if dimension->>'first_only'='true' and turn->>'turn_id'<>(select value->>'turn_id' from jsonb_array_elements(transcript->'messages') with ordinality as messages(value,position) where value->>'speaker'='tutor' order by position limit 1) then continue; end if;
    rating_value := rating->'values'->(dimension->>'key');
    if dimension->>'key'='appropriateness_for_the_learners_level' and rating_value='"Insufficient evidence"'::jsonb then continue; end if;
    if dimension->>'key'='concept_summarization' and rating_value='"Not applicable"'::jsonb then raise exception 'Choose a Concept Summarization answer before submitting: %',turn->>'turn_id'; end if;
    if rating_value is null or jsonb_typeof(rating_value) is distinct from 'string' or not (dimension->'options' @> jsonb_build_array(rating_value)) then raise exception 'Rate every tutor turn before submitting. Ratings needed for %: %',turn->>'turn_id',dimension->>'label'; end if;
   end loop;
   if rating->'values'->>'appropriateness_for_the_learners_level'='Insufficient evidence' and length(btrim(rating->>'notes'))=0 then raise exception 'Record the learner-level evidence limitation in turn notes'; end if;
  end loop;
 end if;
end; $$;


revoke all on function public.validate_turn_ratings(jsonb,jsonb,jsonb,boolean) from public,anon,authenticated;
commit;
