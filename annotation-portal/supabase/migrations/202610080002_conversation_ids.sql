-- Preserve existing unique IDs. Repair only absent/invalid IDs and repeated IDs.
-- Assignments use conversations.id, so their relationships and evidence stay intact.
begin;
-- Source UID alignment can also change a legacy row UUID; preserve assignments.
alter table public.assignments drop constraint assignments_conversation_id_fkey;
alter table public.assignments add constraint assignments_conversation_id_fkey
  foreign key (conversation_id) references public.conversations(id) on update cascade;
with ranked as (
  select id, transcript,
    row_number() over (partition by transcript->>'conversation_id' order by created_at, id) as occurrence
  from public.conversations
), repair as (
  select id from ranked
  where jsonb_typeof(transcript->'conversation_id') is distinct from 'string'
     or length(btrim(transcript->>'conversation_id')) = 0
     or occurrence > 1
)
update public.conversations c
set transcript = c.transcript || jsonb_build_object(
  'source_conversation_id', coalesce(c.transcript->'source_conversation_id', c.transcript->'conversation_id', 'null'::jsonb),
  'conversation_id', 'legacy:' || c.id::text
)
from repair where c.id = repair.id;

alter table public.conversations add constraint conversation_identity_required
  check (coalesce(jsonb_typeof(transcript->'conversation_id') = 'string'
    and length(btrim(transcript->>'conversation_id')) > 0, false));
create unique index conversations_unique_conversation_id
  on public.conversations ((transcript->>'conversation_id'));
commit;
