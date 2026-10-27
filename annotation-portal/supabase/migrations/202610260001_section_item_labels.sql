begin;

create or replace function public.validate_annotations(transcript jsonb, annotations jsonb, rubric jsonb, complete boolean) returns void language plpgsql set search_path = '' as $$
declare a jsonb; ev jsonb; f jsonb; field jsonb; turn jsonb; item_key text; optional_key text; field_value jsonb; language_tag jsonb;
  ids text[] := '{}'; section_items text[] := '{}'; section_key text; turns text[]; start_position integer; end_position integer; matches integer; source text;
begin
  if jsonb_typeof(annotations) is distinct from 'array' or jsonb_array_length(annotations) > 10000 then raise exception 'Invalid annotation list'; end if;
  for a in select value from jsonb_array_elements(annotations) loop
    if jsonb_typeof(a->'id') is distinct from 'string' or length(a->>'id') = 0 or (a->>'id') = any(ids) then raise exception 'Invalid or duplicate annotation ID'; end if;
    ids := array_append(ids, a->>'id');
    select value into f from jsonb_array_elements(rubric->'rubric') where value->>'key' = a->>'feature';
    if f is null or jsonb_typeof(a->'entry') is distinct from 'object' or jsonb_typeof(a->'evidence') is distinct from 'array' or jsonb_array_length(a->'evidence') = 0 then raise exception 'Unknown feature or missing annotation evidence'; end if;
    if f ? 'category' then
      if a->'entry'->>'category' is distinct from f->>'category' then raise exception 'Category does not match item'; end if;
      if jsonb_array_length(a->'evidence') <> 1 then raise exception 'Item labels require exactly one section'; end if;
      ev := a->'evidence'->0;
      if ev ? 'example_status' then raise exception 'Item labels do not use Fresh/Duplicate'; end if;
      section_key := jsonb_build_array(a->>'feature',ev->>'turn_id',ev->'start',ev->'end')::text;
      if section_key=any(section_items) then raise exception 'Duplicate section item; edit quantity instead'; end if;
      section_items:=array_append(section_items,section_key);
    end if;
    optional_key := case a->>'feature' when 'concepts_and_subtopics_covered' then 'concept_level' when 'examples' then 'concept_illustrated' when 'analogies' then 'concept_explained' when 'representations' then 'concept_illustrated' when 'cultural_references' then 'concept_illustrated' when 'questions' then 'concept_checked' else null end;
    for item_key in select jsonb_object_keys(a->'entry') loop
      if item_key <> 'turn_locations' and not (f ? 'category' and item_key='category') and not (a->>'feature'='issues' and item_key='correction_status') and not exists(select 1 from jsonb_array_elements(f->'fields') where value->>'key' = item_key) then raise exception 'Unexpected annotation attribute'; end if;
    end loop;
    for field in select value from jsonb_array_elements(f->'fields') loop
      -- Retired issue metadata is preserved, but is no longer required.
      if a->>'feature'='issues' and field->>'key'='correction_status' then continue; end if;
      field_value := a->'entry'->(field->>'key');
      if field->>'key' = optional_key or field->'optional' = 'true'::jsonb then
        if field->>'key' = 'concept_checked' and a->'entry'->>'question_type' = 'Instructional' and field_value is not null and field_value not in ('null'::jsonb, '""'::jsonb) then raise exception 'Instructional questions must have no concept_checked'; end if;
        if field_value is null or field_value in ('null'::jsonb, '""'::jsonb) or (field->'multiple' = 'true'::jsonb and field_value = '[]'::jsonb) then continue; end if;
      end if;
      if field->'numeric' = 'true'::jsonb then
        if jsonb_typeof(field_value) is distinct from 'number' then raise exception 'Invalid annotation count: %', field->>'key'; end if;
        if (field_value #>> '{}') !~ '^[1-9][0-9]*$' or (field_value #>> '{}')::numeric > 1000 then raise exception 'Invalid annotation count: %', field->>'key'; end if;
        if field->>'key' = 'diagram_count' and a->'entry'->>'representation_type' not in ('Diagram', 'Flowchart') then raise exception 'Diagram count applies only to diagrams and flowcharts'; end if;
        continue;
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
    if not (f ? 'category') and a->>'feature' = 'questions' and (jsonb_array_length(a->'evidence') <> 1 or a->'entry'->>'question' is distinct from a->'evidence'->0->>'quote') then raise exception 'Record each exact question occurrence separately'; end if;
  end loop;
end; $$;

revoke all on function public.validate_annotations(jsonb,jsonb,jsonb,boolean) from public,anon,authenticated;

create table if not exists public.label_schema_replacements (
 old_assignment_id uuid primary key references public.assignments(id) on delete cascade,
 new_assignment_id uuid not null references public.assignments(id) on delete cascade,
 new_rubric_hash text not null references public.rubric_versions(hash),
 archived_at timestamptz not null default now()
);
alter table public.label_schema_replacements enable row level security;
drop policy if exists label_schema_replacements_read on public.label_schema_replacements;
create policy label_schema_replacements_read on public.label_schema_replacements for select to authenticated
 using (public.is_admin() or exists(select 1 from public.assignments a where a.id=old_assignment_id and a.annotator_id=auth.uid()));
grant select on public.label_schema_replacements to authenticated;

-- Archived assignments cannot be edited, reset, reopened, or reactivated, even by stale admin clients.
create or replace function public.protect_archived_label_schema() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if exists(select 1 from public.label_schema_replacements where old_assignment_id=old.id) then
   raise exception 'This Label assignment is archived. Open its replacement assignment.';
 end if;
 return new;
end; $$;
drop trigger if exists protect_archived_label_schema on public.assignments;
create trigger protect_archived_label_schema before update on public.assignments for each row execute function public.protect_archived_label_schema();
revoke all on function public.protect_archived_label_schema() from public,anon,authenticated;

-- Register the exact deployed snapshot before changing assignments.
insert into public.rubric_versions(hash,snapshot) values ('__CURRENT_RUBRIC_HASH__', '__CURRENT_RUBRIC_JSON__'::jsonb)
 on conflict(hash) do nothing;

do $$
declare old_task public.assignments; replacement_id uuid;
begin
 if not exists(select 1 from public.rubric_versions where hash='__CURRENT_RUBRIC_HASH__'
   and snapshot->>'label_schema_version'='section-items/1' and jsonb_array_length(snapshot->'rubric')=15) then
   raise exception 'Register the section-items rubric before transitioning Label assignments';
 end if;
 lock table public.assignments in share row exclusive mode;
 for old_task in select * from public.assignments where task_type='label' and is_active
   and rubric_hash<>'__CURRENT_RUBRIC_HASH__' order by id for update loop
   insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,annotations,turn_ratings,baseline_id,annotation_source)
     values(old_task.conversation_id,old_task.annotator_id,'__CURRENT_RUBRIC_HASH__','label','[]','{}',null,'blank')
     on conflict(conversation_id,annotator_id,rubric_hash,task_type) do nothing;
   select id into replacement_id from public.assignments where conversation_id=old_task.conversation_id
     and annotator_id=old_task.annotator_id and task_type='label' and rubric_hash='__CURRENT_RUBRIC_HASH__';
   update public.assignments set is_active=true,unassigned_at=null where id=replacement_id and not is_active;
   update public.assignments set is_active=false,unassigned_at=now() where id=old_task.id;
   insert into public.label_schema_replacements(old_assignment_id,new_assignment_id,new_rubric_hash)
     values(old_task.id,replacement_id,'__CURRENT_RUBRIC_HASH__') on conflict(old_assignment_id) do nothing;
 end loop;
end; $$;
create or replace function public.open_admin_annotation_assignment(p_conversation_id uuid,p_rubric_hash text) returns uuid language plpgsql security definer set search_path='' as $$
declare assignment public.assignments; baseline public.llm_baselines;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 perform 1 from public.conversations where id=p_conversation_id for update;
 if not found then raise exception 'Conversation not found'; end if;
 select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() and task_type='label' and is_active order by updated_at desc limit 1 for update;
 if assignment.id is not null and exists(select 1 from public.label_schema_replacements where new_assignment_id=assignment.id) then return assignment.id; end if;
 if assignment.id is not null and (assignment.baseline_id is not null or assignment.revision<>0 or assignment.status<>'not_started' or assignment.annotations<>'[]'::jsonb or assignment.turn_ratings<>'{}'::jsonb or assignment.submitted_at is not null or exists(select 1 from public.annotation_revisions where assignment_id=assignment.id)) then return assignment.id; end if;
 select * into baseline from public.llm_baselines where conversation_id=p_conversation_id and rubric_hash=p_rubric_hash order by created_at desc,id desc limit 1;
 if assignment.id is null then
  perform public.create_task_assignments(array[p_conversation_id],array[auth.uid()],array['label']::text[],p_rubric_hash,case when baseline.id is null then '{}'::jsonb else jsonb_build_object(p_conversation_id::text,baseline.id) end);
  select * into assignment from public.assignments where conversation_id=p_conversation_id and annotator_id=auth.uid() and task_type='label' and is_active order by updated_at desc limit 1;
 elsif baseline.id is not null then
  update public.assignments set baseline_id=baseline.id,annotation_source='llm',annotations=baseline.annotations,rubric_hash=baseline.rubric_hash,updated_at=now() where id=assignment.id returning * into assignment;
  insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
 end if;
 return assignment.id;
end; $$;


create or replace function public.create_task_assignments(p_conversation_ids uuid[],p_annotator_ids uuid[],p_task_types text[],p_rubric_hash text,p_baseline_ids jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare selected_conversation uuid; selected_annotator uuid; selected_task text; baseline public.llm_baselines; assignment public.assignments; created integer:=0; skipped integer:=0; restored integer:=0; chosen uuid; ids jsonb:='[]'::jsonb;
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if coalesce(cardinality(p_conversation_ids),0)=0 or coalesce(cardinality(p_annotator_ids),0)=0 or coalesce(cardinality(p_task_types),0)=0 or cardinality(p_conversation_ids)>200 or cardinality(p_annotator_ids)>200 or cardinality(p_task_types)>2 or array_position(p_conversation_ids,null) is not null or array_position(p_annotator_ids,null) is not null or array_position(p_task_types,null) is not null then raise exception 'Choose conversations, tasks, and annotators (maximum 200 each)'; end if;
 if exists(select 1 from unnest(p_task_types) t where t not in ('label','rate')) or cardinality(p_task_types)<>(select count(distinct t) from unnest(p_task_types) t) then raise exception 'Invalid task type'; end if;
 if jsonb_typeof(p_baseline_ids) is distinct from 'object' or exists(select 1 from jsonb_object_keys(p_baseline_ids) k where not k=any(select v::text from unnest(p_conversation_ids) v)) then raise exception 'Invalid baseline choices'; end if;
 if not exists(select 1 from public.rubric_versions where hash=p_rubric_hash) then raise exception 'Rubric not found'; end if;
 for selected_conversation in select distinct v from unnest(p_conversation_ids) v order by v loop
  perform 1 from public.conversations where id=selected_conversation for update;
  if not found then raise exception 'Conversation not found'; end if;
  chosen:=(p_baseline_ids->>selected_conversation::text)::uuid;
  for selected_task in select distinct t from unnest(p_task_types) t order by t loop
   baseline:=null;
   if selected_task='label' and chosen is not null then
    select * into baseline from public.llm_baselines where id=chosen;
    if baseline.id is null or baseline.conversation_id<>selected_conversation or baseline.rubric_hash<>p_rubric_hash then raise exception 'Baseline must belong to this conversation and current rubric'; end if;
   end if;
   for selected_annotator in select distinct v from unnest(p_annotator_ids) v loop
    if not exists(select 1 from public.profiles where id=selected_annotator) then raise exception 'Annotator not found'; end if;
    select * into assignment from public.assignments a where a.conversation_id=selected_conversation and a.annotator_id=selected_annotator and a.task_type=selected_task and (selected_task='rate' or a.rubric_hash=p_rubric_hash) order by a.is_active desc,a.updated_at desc limit 1 for update;
    if assignment.id is not null then
     if assignment.is_active then skipped:=skipped+1;
     else
      update public.assignments set is_active=true,unassigned_at=null,revision=revision+1,updated_at=now() where id=assignment.id returning * into assignment;
      insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,assignment.revision,assignment.annotations,assignment.turn_ratings,assignment.status,auth.uid(),'reassign');
      restored:=restored+1;
     end if;
     continue;
    end if;
    insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,annotations,turn_ratings,baseline_id,annotation_source)
    values(selected_conversation,selected_annotator,coalesce(baseline.rubric_hash,p_rubric_hash),selected_task,coalesce(baseline.annotations,'[]'::jsonb),'{}'::jsonb,baseline.id,case when baseline.id is null then 'blank' else 'llm' end) returning * into assignment;
    if baseline.id is not null then
     insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values(assignment.id,0,assignment.annotations,'{}'::jsonb,'not_started',auth.uid(),'seed_llm');
    end if;
    created:=created+1; ids:=ids||jsonb_build_array(assignment.id);
   end loop;
  end loop;
 end loop;
 return jsonb_build_object('created',created,'restored',restored,'skipped',skipped,'assignment_ids',ids);
end; $$;


commit;
