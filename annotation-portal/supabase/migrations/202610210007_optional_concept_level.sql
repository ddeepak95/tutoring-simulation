begin;

create or replace function public.validate_annotations(transcript jsonb, annotations jsonb, rubric jsonb, complete boolean) returns void language plpgsql set search_path = '' as $$
declare a jsonb; ev jsonb; f jsonb; field jsonb; turn jsonb; item_key text; optional_key text; field_value jsonb; language_tag jsonb;
  ids text[] := '{}'; turns text[]; start_position integer; end_position integer; matches integer; source text;
begin
  if jsonb_typeof(annotations) is distinct from 'array' or jsonb_array_length(annotations) > 10000 then raise exception 'Invalid annotation list'; end if;
  for a in select value from jsonb_array_elements(annotations) loop
    if jsonb_typeof(a->'id') is distinct from 'string' or length(a->>'id') = 0 or (a->>'id') = any(ids) then raise exception 'Invalid or duplicate annotation ID'; end if;
    ids := array_append(ids, a->>'id');
    select value into f from jsonb_array_elements(rubric->'rubric') where value->>'key' = a->>'feature';
    if f is null or jsonb_typeof(a->'entry') is distinct from 'object' or jsonb_typeof(a->'evidence') is distinct from 'array' or jsonb_array_length(a->'evidence') = 0 then raise exception 'Unknown feature or missing annotation evidence'; end if;
    optional_key := case a->>'feature' when 'concepts_and_subtopics_covered' then 'concept_level' when 'examples' then 'concept_illustrated' when 'analogies' then 'concept_explained' when 'representations' then 'concept_illustrated' when 'cultural_references' then 'concept_illustrated' when 'questions' then 'concept_checked' else null end;
    for item_key in select jsonb_object_keys(a->'entry') loop
      if item_key <> 'turn_locations' and not (a->>'feature'='issues' and item_key='correction_status') and not exists(select 1 from jsonb_array_elements(f->'fields') where value->>'key' = item_key) then raise exception 'Unexpected annotation attribute'; end if;
    end loop;
    for field in select value from jsonb_array_elements(f->'fields') loop
      -- Retired issue metadata is preserved, but is no longer required.
      if a->>'feature'='issues' and field->>'key'='correction_status' then continue; end if;
      field_value := a->'entry'->(field->>'key');
      if field->>'key' = optional_key then
        if optional_key = 'concept_checked' and a->'entry'->>'question_type' = 'Instructional' and field_value is not null and field_value not in ('null'::jsonb, '""'::jsonb) then raise exception 'Instructional questions must have no concept_checked'; end if;
        if field_value is null or field_value in ('null'::jsonb, '""'::jsonb) then continue; end if;
      end if;
      if field->'multiple' = 'true'::jsonb then
        if not complete and field_value = '[]'::jsonb then continue; end if;
        if jsonb_typeof(field_value) is distinct from 'array' or jsonb_array_length(field_value) = 0 then raise exception 'Required annotation attribute is missing: %', field->>'key'; end if;
        if exists(select 1 from jsonb_array_elements(field_value) value where jsonb_typeof(value) is distinct from 'string' or length(btrim(value #>> '{}')) = 0) then raise exception 'Invalid list annotation attribute: %', field->>'key'; end if;
        if (select count(*) from jsonb_array_elements(field_value)) <> (select count(distinct value #>> '{}') from jsonb_array_elements(field_value) value) then raise exception 'Duplicate values in list annotation attribute: %', field->>'key'; end if;
        if field->>'key' = 'image_languages' then
          for language_tag in select value from jsonb_array_elements(field_value) loop
            if language_tag #>> '{}' !~ '^(?:[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*|und|zxx)$' then raise exception 'Invalid image language tag'; end if;
          end loop;
        end if;
        continue;
      end if;
      if not complete and field_value = '""'::jsonb then continue; end if;
      if jsonb_typeof(field_value) is distinct from 'string' or length(btrim(field_value #>> '{}')) = 0 then raise exception 'Required annotation attribute is missing: %', field->>'key'; end if;
      if field ? 'options' and not (field->'options' @> jsonb_build_array(field_value)) then raise exception 'Invalid annotation enum'; end if;
    end loop;
    turns := '{}';
    for ev in select value from jsonb_array_elements(a->'evidence') loop
      select value into turn from jsonb_array_elements(transcript->'messages') where value->>'turn_id' = ev->>'turn_id';
      if turn is null or turn->>'speaker' <> 'tutor' or jsonb_typeof(ev->'quote') is distinct from 'string' or length(btrim(ev->>'quote')) = 0 or jsonb_typeof(ev->'start') is distinct from 'number' or jsonb_typeof(ev->'end') is distinct from 'number' or jsonb_typeof(ev->'occurrence') is distinct from 'number' or (ev->>'start') !~ '^[0-9]+$' or (ev->>'end') !~ '^[0-9]+$' or (ev->>'occurrence') !~ '^[1-9][0-9]*$' then raise exception 'Invalid tutor evidence'; end if;
      source := turn->>'text'; start_position := public.utf16_offset(source, (ev->>'start')::integer); end_position := public.utf16_offset(source, (ev->>'end')::integer);
      if end_position <= start_position or substr(source, start_position + 1, end_position - start_position) <> ev->>'quote' then raise exception 'Evidence must exactly match the source turn'; end if;
      matches := public.evidence_occurrence(source,ev->>'quote',start_position);
      if matches <> (ev->>'occurrence')::integer then raise exception 'Evidence occurrence does not match'; end if;
      if not (ev->>'turn_id') = any(turns) then turns := array_append(turns, ev->>'turn_id'); end if;
    end loop;
    if a->'entry'->'turn_locations' is distinct from to_jsonb(turns) then raise exception 'Turn locations must match evidence'; end if;
    if a->>'feature' = 'questions' and (jsonb_array_length(a->'evidence') <> 1 or a->'entry'->>'question' is distinct from a->'evidence'->0->>'quote') then raise exception 'Record each exact question occurrence separately'; end if;
  end loop;
end; $$;

revoke all on function public.validate_annotations(jsonb,jsonb,jsonb,boolean) from public,anon,authenticated;
-- Keep active Label work and its revisions while enabling the optional concept level.
do $$
begin
  if not exists (
    select 1 from public.rubric_versions
    where hash = '__CURRENT_RUBRIC_HASH__'
      and snapshot->>'rubric_sha256' = hash
      and exists (
        select 1 from jsonb_array_elements(snapshot->'rubric') feature,
                     jsonb_array_elements(feature->'fields') field
        where feature->>'key' = 'concepts_and_subtopics_covered'
          and field->>'key' = 'concept_level'
      )
  ) then raise exception 'Register the optional Concept level rubric before upgrading Label assignments'; end if;
end;
$$;

alter table public.assignments disable trigger protect_unassigned_work;
update public.assignments
set rubric_hash = '__CURRENT_RUBRIC_HASH__', updated_at = now()
where task_type = 'label' and is_active and status <> 'submitted'
  and rubric_hash <> '__CURRENT_RUBRIC_HASH__';
alter table public.assignments enable trigger protect_unassigned_work;
commit;
