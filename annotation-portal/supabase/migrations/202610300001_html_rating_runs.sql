begin;

-- Screenshot ratings belong to an immutable HTML capture, independently of human work.
create table public.conversation_html_rating_runs (
 id uuid primary key,
 conversation_id uuid not null references public.html_conversations(conversation_id) on delete cascade,
 capture_version_hash text not null check(capture_version_hash ~ '^[0-9a-f]{64}$'),
 provider text not null check(provider = 'google'),
 model text not null,
 prompt_version text not null,
 prompt_sha256 text not null check(prompt_sha256 ~ '^[0-9a-f]{64}$'),
 prompt text not null,
 rubric_hash text not null check(rubric_hash ~ '^[0-9a-f]{64}$'),
 rubric_snapshot jsonb not null,
 request_sha256 text not null check(request_sha256 ~ '^[0-9a-f]{64}$'),
 request jsonb not null,
 response jsonb not null,
 ratings jsonb not null check(jsonb_typeof(ratings)='array'),
 generation_config jsonb not null,
 status text not null check(status in ('completed','failed')),
 error text,
 created_at timestamptz not null default now()
);
create index conversation_html_rating_runs_lookup on public.conversation_html_rating_runs(conversation_id,created_at desc);
alter table public.conversation_html_rating_runs enable row level security;
create policy html_rating_runs_admin_read on public.conversation_html_rating_runs for select to authenticated using(public.is_admin());
revoke all on public.conversation_html_rating_runs from public,anon,authenticated;
grant select on public.conversation_html_rating_runs to authenticated,service_role;

commit;
