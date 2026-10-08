-- Apply to a Supabase project. All client writes are scoped by RLS or checked RPCs.
create table public.profiles (
  id uuid primary key references auth.users(id),
  username text unique not null check (username ~ '^[a-z0-9][a-z0-9._-]{2,31}$'),
  role text not null default 'annotator' check (role in ('admin', 'annotator'))
);
create function public.provision_profile() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.email !~ '^[a-z0-9][a-z0-9._-]{2,31}@users\.annotation\.invalid$' then
    raise exception 'Portal accounts must be provisioned with an internal username identifier';
  end if;
  insert into public.profiles(id, username) values (new.id, split_part(new.email, '@', 1));
  return new;
end; $$;
create trigger portal_user_created after insert on auth.users for each row execute function public.provision_profile();
create function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create table public.rubric_versions (
  hash text primary key check (hash ~ '^[0-9a-f]{64}$'),
  snapshot jsonb not null check (jsonb_typeof(snapshot->'rubric') = 'array' and jsonb_array_length(snapshot->'rubric') = 6 and snapshot->>'rubric_sha256' = hash),
  created_at timestamptz not null default now()
);
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  label text not null check (length(btrim(label)) > 0),
  language text not null default 'Unspecified',
  transcript jsonb not null,
  source_path text unique,
  created_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references public.profiles(id)
);
create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id),
  annotator_id uuid not null references public.profiles(id),
  rubric_hash text not null references public.rubric_versions(hash),
  status text not null default 'not_started' check (status in ('not_started','in_progress','submitted')),
  revision integer not null default 0 check (revision >= 0),
  annotations jsonb not null default '[]' check (jsonb_typeof(annotations) = 'array'),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  unique(conversation_id, annotator_id, rubric_hash)
);
create table public.annotation_revisions (
  assignment_id uuid not null references public.assignments(id),
  revision integer not null,
  annotations jsonb not null,
  status text not null,
  actor_id uuid not null references public.profiles(id),
  saved_at timestamptz not null default now(),
  primary key(assignment_id, revision)
);
create index assignments_owner on public.assignments(annotator_id);
create index assignments_conversation on public.assignments(conversation_id);

-- JavaScript offsets count UTF-16 code units; PostgreSQL counts Unicode characters.
create function public.utf16_offset(source text, units integer) returns integer language plpgsql immutable strict set search_path = '' as $$
declare consumed integer := 0; position integer := 0;
begin
  if units < 0 then raise exception 'Invalid evidence offset'; end if;
  while consumed < units and position < char_length(source) loop
    position := position + 1;
    consumed := consumed + case when ascii(substr(source, position, 1)) > 65535 then 2 else 1 end;
  end loop;
  if consumed <> units then raise exception 'Evidence offset is outside text or splits a Unicode character'; end if;
  return position;
end; $$;
create function public.validate_transcript() returns trigger language plpgsql set search_path = '' as $$
declare item jsonb; ids text[] := '{}';
begin
  if jsonb_typeof(new.transcript) <> 'object' or jsonb_typeof(new.transcript->'messages') is distinct from 'array' or jsonb_array_length(new.transcript->'messages') = 0 then raise exception 'Conversation must contain turns'; end if;
  if octet_length(new.transcript::text) > 2097152 then raise exception 'Transcript exceeds 2 MB'; end if;
  for item in select value from jsonb_array_elements(new.transcript->'messages') loop
    if jsonb_typeof(item->'text') is distinct from 'string' or item->>'speaker' not in ('tutor','student') or item->>'speaker' is null or jsonb_typeof(item->'turn_id') is distinct from 'string' or length(item->>'turn_id') = 0 or (item->>'turn_id') = any(ids) then raise exception 'Invalid or duplicate conversation turn'; end if;
    ids := array_append(ids, item->>'turn_id');
  end loop;
  return new;
end; $$;
create trigger check_transcript before insert on public.conversations for each row execute function public.validate_transcript();

create function public.validate_annotations(transcript jsonb, annotations jsonb, rubric jsonb, complete boolean) returns void language plpgsql set search_path = '' as $$
declare a jsonb; ev jsonb; f jsonb; field jsonb; turn jsonb; item_key text; optional_key text; field_value jsonb;
  ids text[] := '{}'; turns text[]; start_position integer; end_position integer; matches integer; i integer; source text;
begin
  if jsonb_typeof(annotations) is distinct from 'array' or jsonb_array_length(annotations) > 10000 then raise exception 'Invalid annotation list'; end if;
  for a in select value from jsonb_array_elements(annotations) loop
    if jsonb_typeof(a->'id') is distinct from 'string' or length(a->>'id') = 0 or (a->>'id') = any(ids) then raise exception 'Invalid or duplicate annotation ID'; end if;
    ids := array_append(ids, a->>'id');
    select value into f from jsonb_array_elements(rubric->'rubric') where value->>'key' = a->>'feature';
    if f is null or jsonb_typeof(a->'entry') is distinct from 'object' or jsonb_typeof(a->'evidence') is distinct from 'array' or jsonb_array_length(a->'evidence') = 0 then raise exception 'Unknown feature or missing annotation evidence'; end if;
    optional_key := case a->>'feature' when 'examples' then 'concept_illustrated' when 'analogies' then 'concept_explained' when 'representations' then 'concept_illustrated' when 'cultural_references' then 'concept_illustrated' when 'questions' then 'concept_checked' else null end;
    for item_key in select jsonb_object_keys(a->'entry') loop
      if item_key <> 'turn_locations' and not exists(select 1 from jsonb_array_elements(f->'fields') where value->>'key' = item_key) then raise exception 'Unexpected annotation attribute'; end if;
    end loop;
    for field in select value from jsonb_array_elements(f->'fields') loop
      field_value := a->'entry'->(field->>'key');
      if field->>'key' = optional_key then
        if optional_key = 'concept_checked' and a->'entry'->>'question_type' = 'Instructional' and field_value is not null and field_value not in ('null'::jsonb, '""'::jsonb) then raise exception 'Instructional questions must have no concept_checked'; end if;
        if field_value is null or field_value in ('null'::jsonb, '""'::jsonb) then continue; end if;
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
      matches := 0;
      for i in 0..start_position loop if substr(source, i + 1, char_length(ev->>'quote')) = ev->>'quote' then matches := matches + 1; end if; end loop;
      if matches <> (ev->>'occurrence')::integer then raise exception 'Evidence occurrence does not match'; end if;
      if not (ev->>'turn_id') = any(turns) then turns := array_append(turns, ev->>'turn_id'); end if;
    end loop;
    if a->'entry'->'turn_locations' is distinct from to_jsonb(turns) then raise exception 'Turn locations must match evidence'; end if;
    if a->>'feature' = 'questions' and (jsonb_array_length(a->'evidence') <> 1 or a->'entry'->>'question' is distinct from a->'evidence'->0->>'quote') then raise exception 'Record each exact question occurrence separately'; end if;
  end loop;
end; $$;

create function public.save_assignment(p_assignment_id uuid, p_revision integer, p_annotations jsonb, p_submit boolean default false) returns jsonb language plpgsql security definer set search_path = '' as $$
declare current_row public.assignments; transcript jsonb; rubric jsonb;
begin
  select * into current_row from public.assignments where id = p_assignment_id for update;
  if current_row.id is null or current_row.annotator_id is distinct from auth.uid() then raise exception 'Assignment access denied' using errcode = '42501'; end if;
  if current_row.revision <> p_revision then raise exception 'Revision conflict. Export your draft and reload the latest saved version before editing.' using errcode = '40001'; end if;
  if current_row.status = 'submitted' then raise exception 'Submitted assignment is read only'; end if;
  select c.transcript into transcript from public.conversations c where id = current_row.conversation_id;
  select snapshot into rubric from public.rubric_versions where hash = current_row.rubric_hash;
  perform public.validate_annotations(transcript, p_annotations, rubric, p_submit);
  update public.assignments set annotations = p_annotations, revision = revision + 1, status = case when p_submit then 'submitted' else 'in_progress' end, updated_at = now(), submitted_at = case when p_submit then now() else null end where id = p_assignment_id returning * into current_row;
  insert into public.annotation_revisions(assignment_id, revision, annotations, status, actor_id) values (current_row.id, current_row.revision, current_row.annotations, current_row.status, auth.uid());
  return to_jsonb(current_row);
end; $$;
create function public.reopen_assignment(p_assignment_id uuid, p_revision integer) returns void language plpgsql security definer set search_path = '' as $$
declare current_row public.assignments;
begin
  if not public.is_admin() then raise exception 'Admin access required' using errcode = '42501'; end if;
  select * into current_row from public.assignments where id = p_assignment_id for update;
  if current_row.id is null or current_row.revision <> p_revision or current_row.status <> 'submitted' then raise exception 'Assignment has changed or is not submitted'; end if;
  update public.assignments set status = 'in_progress', submitted_at = null, revision = revision + 1, updated_at = now() where id = p_assignment_id returning * into current_row;
  insert into public.annotation_revisions(assignment_id, revision, annotations, status, actor_id) values (current_row.id, current_row.revision, current_row.annotations, current_row.status, auth.uid());
end; $$;

alter table public.profiles enable row level security;
alter table public.rubric_versions enable row level security;
alter table public.conversations enable row level security;
alter table public.assignments enable row level security;
alter table public.annotation_revisions enable row level security;
revoke all on public.profiles, public.rubric_versions, public.conversations, public.assignments, public.annotation_revisions from anon, authenticated;
grant select on public.profiles, public.rubric_versions, public.conversations, public.assignments, public.annotation_revisions to authenticated;
grant insert on public.rubric_versions, public.conversations, public.assignments to authenticated;
grant all on public.profiles, public.rubric_versions, public.conversations, public.assignments, public.annotation_revisions to service_role;
create policy profiles_read on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
create policy rubric_read on public.rubric_versions for select to authenticated using (true);
create policy rubric_create on public.rubric_versions for insert to authenticated with check (public.is_admin());
create policy conversation_read on public.conversations for select to authenticated using (public.is_admin() or exists(select 1 from public.assignments a where a.conversation_id = conversations.id and a.annotator_id = auth.uid()));
create policy conversation_create on public.conversations for insert to authenticated with check (public.is_admin() and created_by = auth.uid());
create policy assignment_read on public.assignments for select to authenticated using (annotator_id = auth.uid() or public.is_admin());
create policy assignment_create on public.assignments for insert to authenticated with check (public.is_admin() and status = 'not_started' and revision = 0 and annotations = '[]'::jsonb and submitted_at is null);
create policy revisions_read on public.annotation_revisions for select to authenticated using (public.is_admin() or exists(select 1 from public.assignments a where a.id = annotation_revisions.assignment_id and a.annotator_id = auth.uid()));

-- Function EXECUTE is public by default; restrict all privileged helpers explicitly.
revoke all on function public.provision_profile(), public.is_admin(), public.utf16_offset(text, integer), public.validate_transcript(), public.validate_annotations(jsonb, jsonb, jsonb, boolean), public.save_assignment(uuid, integer, jsonb, boolean), public.reopen_assignment(uuid, integer) from public, anon, authenticated;
grant execute on function public.is_admin(), public.save_assignment(uuid, integer, jsonb, boolean), public.reopen_assignment(uuid, integer) to authenticated;

insert into storage.buckets(id, name, public, file_size_limit) values ('transcripts', 'transcripts', false, 2097152);
create policy source_upload on storage.objects for insert to authenticated with check (bucket_id = 'transcripts' and public.is_admin());
create policy source_read on storage.objects for select to authenticated using (bucket_id = 'transcripts' and public.is_admin());
create policy source_remove_orphan on storage.objects for delete to authenticated using (bucket_id = 'transcripts' and public.is_admin() and not exists(select 1 from public.conversations where source_path = name));
