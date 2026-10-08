import crypto from 'node:crypto';

const inspection = `select
  exists(select 1 from pg_constraint where conrelid='public.conversations'::regclass and conname='conversation_identity_required' and convalidated) as required_id,
  exists(select 1 from pg_index where indrelid='public.conversations'::regclass and indexrelid=to_regclass('public.conversations_unique_conversation_id') and indisunique and indisvalid) as unique_id,
  exists(select 1 from pg_constraint where conrelid='public.assignments'::regclass and conname='assignments_conversation_id_fkey' and confupdtype='c') as update_cascade,
  (select count(*)::integer from public.conversations where jsonb_typeof(transcript->'conversation_id') is distinct from 'string' or length(btrim(transcript->>'conversation_id'))=0) as missing_ids,
  (select count(*)::integer from (select transcript->>'conversation_id' from public.conversations group by transcript->>'conversation_id' having count(*)>1) repeated) as duplicate_groups`;

export async function applyConversationIdentityMigration({ token, projectUrl, expectedProject, sql, fetcher = fetch }) {
  if (!token) throw new Error('Set SUPABASE_ACCESS_TOKEN in the ignored .env.local file.');
  const url = new URL(projectUrl); const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  if (url.protocol !== 'https:' || !ref || ref !== expectedProject) throw new Error('--project must match VITE_SUPABASE_URL. No migration was sent.');
  if (!sql?.trim()) throw new Error('Migration SQL is empty.');
  const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
  const name = `annotation_portal_202610080002_${fingerprint.slice(0, 16)}`;
  async function request(path, body) {
    const response = await fetcher(`https://api.supabase.com/v1/projects/${ref}/${path}`, { method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}. Check project access, token scope, and the initial portal migration.`);
    return response.json();
  }
  const history = await request('database/migrations');
  if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
  const inspect = async () => {
    const rows = await request('database/query', { query: inspection, read_only: true });
    if (!Array.isArray(rows) || rows.length !== 1) throw new Error('Unexpected identity inspection response.');
    return rows[0];
  };
  const ready = state => state.required_id && state.unique_id && state.update_cascade && state.missing_ids === 0 && state.duplicate_groups === 0;
  const before = await inspect();
  if (history.some(migration => migration.name === name)) {
    if (!ready(before)) throw new Error('Identity migration is recorded, but uniqueness verification failed.');
    return { project: ref, fingerprint, result: 'already_applied' };
  }
  if (history.some(migration => String(migration.name || '').startsWith('annotation_portal_202610080002_'))) throw new Error('A different identity migration version is recorded. Review the difference first.');
  if (before.required_id || before.unique_id) throw new Error('Identity constraints already exist without this migration record. No changes were made.');
  await request('database/migrations', { query: sql, name });
  if (!ready(await inspect())) throw new Error('Migration was accepted, but conversation ID verification failed.');
  return { project: ref, fingerprint, result: 'applied' };
}
