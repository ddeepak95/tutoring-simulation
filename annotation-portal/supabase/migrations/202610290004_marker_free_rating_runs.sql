begin;
create table if not exists public.conversation_version_rating_runs (
 id uuid primary key,
 conversation_id uuid not null,
 version_key text not null,
 rubric_hash text not null check(rubric_hash ~ '^[0-9a-f]{64}$'),
 rubric_snapshot jsonb not null,
 prompt_version text not null,
 prompt text not null,
 model text not null,
 request jsonb not null,
 response jsonb,
 ratings jsonb not null default '[]'::jsonb check(jsonb_typeof(ratings)='array'),
 status text not null check(status in ('completed','failed')),
 error text,
 normalization_policy text not null default 'exact-json/1',
 created_at timestamptz not null default now(),
 foreign key(conversation_id,version_key) references public.conversation_versions(conversation_id,version_key) on delete restrict
);
alter table public.conversation_version_rating_runs add column if not exists normalization_policy text not null default 'exact-json/1';
create index if not exists conversation_version_rating_runs_lookup on public.conversation_version_rating_runs(conversation_id,version_key,created_at desc);
alter table public.conversation_version_rating_runs enable row level security;
do $$ begin
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='conversation_version_rating_runs' and policyname='marker_free_rating_runs_admin_read') then
  create policy marker_free_rating_runs_admin_read on public.conversation_version_rating_runs for select to authenticated using(public.is_admin());
 end if;
end $$;
revoke all on public.conversation_version_rating_runs from public,anon,authenticated;
grant select on public.conversation_version_rating_runs to authenticated,service_role;
commit;
