import crypto from 'node:crypto';

const inspection = `select
  to_regprocedure('public.preview_conversation_deletion(uuid)') is not null as preview_exists,
  to_regprocedure('public.delete_conversation(uuid,text)') is not null as delete_exists,
  (select count(*)::integer from pg_proc where oid in (to_regprocedure('public.preview_conversation_deletion(uuid)'), to_regprocedure('public.delete_conversation(uuid,text)')) and prosecdef and proconfig @> array['search_path=""']) as protected_functions,
  (select count(*)::integer from pg_proc where oid in (to_regprocedure('public.preview_conversation_deletion(uuid)'), to_regprocedure('public.delete_conversation(uuid,text)')) and has_function_privilege('authenticated',oid,'EXECUTE') and not has_function_privilege('anon',oid,'EXECUTE')) as scoped_functions,
  not has_table_privilege('authenticated','public.conversations','DELETE') and not has_table_privilege('authenticated','public.assignments','DELETE') and not has_table_privilege('authenticated','public.annotation_revisions','DELETE') as direct_deletes_forbidden`;

export async function applyConversationDeletionMigration({ token, projectUrl, expectedProject, sql, fetcher = fetch }) {
  if (!token) throw new Error('Set SUPABASE_ACCESS_TOKEN in the ignored .env.local file.');
  const url = new URL(projectUrl); const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  if (url.protocol !== 'https:' || !ref || ref !== expectedProject) throw new Error('--project must match VITE_SUPABASE_URL. No migration was sent.');
  if (!sql?.trim()) throw new Error('Migration SQL is empty.');
  const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
  const prefix = 'annotation_portal_202610080003_'; const name = prefix + fingerprint.slice(0, 16);
  async function request(path, body) {
    const response = await fetcher(`https://api.supabase.com/v1/projects/${ref}/${path}`, { method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}. Check project access and token scope.`);
    return response.json();
  }
  const history = await request('database/migrations');
  if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
  async function inspect() {
    const rows = await request('database/query', { query: inspection, read_only: true });
    if (!Array.isArray(rows) || rows.length !== 1) throw new Error('Unexpected deletion protection inspection response.');
    return rows[0];
  }
  const ready = state => state.preview_exists && state.delete_exists && state.protected_functions === 2 && state.scoped_functions === 2 && state.direct_deletes_forbidden;
  const before = await inspect();
  if (history.some(migration => migration.name === name)) {
    if (!ready(before)) throw new Error('Deletion migration is recorded, but permissions verification failed.');
    return { project: ref, fingerprint, result: 'already_applied' };
  }
  if (history.some(migration => String(migration.name || '').startsWith(prefix))) throw new Error('A different deletion migration version is recorded. Review the difference first.');
  if (before.preview_exists || before.delete_exists) throw new Error('Deletion functions already exist without this migration record. No changes were made.');
  await request('database/migrations', { query: sql, name });
  if (!ready(await inspect())) throw new Error('Migration was accepted, but deletion permissions verification failed.');
  return { project: ref, fingerprint, result: 'applied' };
}
