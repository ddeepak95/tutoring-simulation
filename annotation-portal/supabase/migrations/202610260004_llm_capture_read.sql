begin;
-- Local baseline generation uses the server-only service role to render captures.
grant select on public.conversation_capture_documents to service_role;
commit;
