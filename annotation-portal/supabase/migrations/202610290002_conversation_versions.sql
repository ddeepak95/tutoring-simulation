begin;

-- Experimental copies of transcripts. Section inventories remain attached only
-- to the source conversations; a version has no registered section markers.
create table if not exists public.conversation_versions (
  conversation_id uuid not null references public.conversations(id) on delete restrict,
  version_key text not null,
  transcript jsonb not null,
  source_transcript_sha256 text not null check (source_transcript_sha256 ~ '^[0-9a-f]{64}$'),
  section_mode text not null default 'none' check (section_mode = 'none'),
  created_at timestamptz not null default now(),
  primary key (conversation_id, version_key),
  constraint conversation_version_messages check (jsonb_typeof(transcript->'messages') = 'array')
);

alter table public.conversation_versions enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='conversation_versions' and policyname='conversation_versions_admin_read') then
    create policy conversation_versions_admin_read on public.conversation_versions for select to authenticated using (public.is_admin());
  end if;
end $$;
revoke all on public.conversation_versions from public, anon, authenticated;
grant select on public.conversation_versions to authenticated, service_role;

commit;
