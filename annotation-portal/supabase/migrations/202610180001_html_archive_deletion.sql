begin;
-- Prepared transcripts keep their own HTML assets and immutable source metadata.
-- Removing a source archive must not remove annotation or comparison work.
alter table public.chatgpt_archive_preparations alter column archive_id drop not null;
alter table public.chatgpt_archive_preparations drop constraint chatgpt_archive_preparations_archive_id_fkey;
alter table public.chatgpt_archive_preparations add constraint chatgpt_archive_preparations_archive_id_fkey
 foreign key(archive_id) references public.chatgpt_html_archives(id) on delete set null;

create function public.delete_chatgpt_html_archive(p_archive_id uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare removed uuid;
begin
 if auth.uid() is null or not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 if p_archive_id is null then raise exception 'Provide an HTML archive ID'; end if;
 delete from public.chatgpt_html_archives where id=p_archive_id returning id into removed;
 return jsonb_build_object('archive_id',p_archive_id,'deleted',removed is not null);
end; $$;
revoke all on function public.delete_chatgpt_html_archive(uuid) from public,anon,authenticated;
grant execute on function public.delete_chatgpt_html_archive(uuid) to authenticated;
commit;
