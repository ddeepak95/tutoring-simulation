begin;
alter table public.chatgpt_html_archives add column if not exists media_html text;
alter table public.conversation_capture_assets add column if not exists media_html text;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('capture-images','capture-images',true,10485760,array['image/png','image/jpeg','image/gif','image/webp','image/avif','image/bmp','image/svg+xml'])
on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
create policy capture_images_owner_insert on storage.objects for insert to authenticated
with check(bucket_id='capture-images' and (storage.foldername(name))[1]='captures' and (storage.foldername(name))[2]=auth.uid()::text
 and exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','annotator')));
create policy capture_images_owner_update on storage.objects for update to authenticated
using(bucket_id='capture-images' and (storage.foldername(name))[1]='captures' and (storage.foldername(name))[2]=auth.uid()::text)
with check(bucket_id='capture-images' and (storage.foldername(name))[1]='captures' and (storage.foldername(name))[2]=auth.uid()::text);
create policy capture_images_owner_delete on storage.objects for delete to authenticated
using(bucket_id='capture-images' and (storage.foldername(name))[1]='captures' and (storage.foldername(name))[2]=auth.uid()::text);
commit;
