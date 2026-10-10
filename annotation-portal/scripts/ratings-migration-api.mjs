import crypto from 'node:crypto';
const inspection = `select
 exists(select 1 from information_schema.columns where table_schema='public' and table_name='assignments' and column_name='turn_ratings') as rating_storage,
 exists(select 1 from information_schema.columns where table_schema='public' and table_name='annotation_revisions' and column_name='turn_ratings') as rating_history,
 to_regprocedure('public.validate_turn_ratings(jsonb,jsonb,jsonb,boolean)') is not null as validation_exists,
 exists(select 1 from pg_proc where oid=to_regprocedure('public.save_assignment(uuid,integer,jsonb,boolean,jsonb)') and prosecdef and proconfig @> array['search_path=""'] and has_function_privilege('authenticated',oid,'EXECUTE') and not has_function_privilege('anon',oid,'EXECUTE')) as protected_write,
 exists(select 1 from pg_proc where oid=to_regprocedure('public.validate_turn_ratings(jsonb,jsonb,jsonb,boolean)') and not has_function_privilege('authenticated',oid,'EXECUTE') and not has_function_privilege('anon',oid,'EXECUTE')) as private_validation,
 exists(select 1 from pg_trigger where tgname='pin_assignment_rating_rubric' and not tgisinternal) as trigger_exists,
 exists(select 1 from public.rubric_versions where jsonb_array_length(snapshot->'rating_dimensions')=11 and exists(select 1 from jsonb_array_elements(snapshot->'rubric') f where f->>'key'='issues')) as extended_rubric,
 not has_table_privilege('authenticated','public.assignments','UPDATE') as direct_writes_forbidden`;
export async function applyRatingsMigration({ token, projectUrl, expectedProject, sql, fetcher = fetch }) {
  if (!token) throw new Error('Set SUPABASE_ACCESS_TOKEN in the ignored .env.local file.');
  const url = new URL(projectUrl); const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  if (url.protocol !== 'https:' || !ref || !expectedProject || ref !== expectedProject) throw new Error('--project must match VITE_SUPABASE_URL. No migration was sent.');
  if (!sql?.trim()) throw new Error('Migration SQL is empty.');
  const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
  const prefix = 'annotation_portal_202610090001_'; const name = prefix + fingerprint.slice(0, 16);
  async function request(path, body) {
    const response = await fetcher(`https://api.supabase.com/v1/projects/${ref}/${path}`, { method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}. Check project access and token scope.`);
    return response.json();
  }
  const history = await request('database/migrations');
  if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
  async function inspect() {
    const rows = await request('database/query', { query: inspection, read_only: true });
    if (!Array.isArray(rows) || rows.length !== 1) throw new Error('Unexpected ratings inspection response.');
    return rows[0];
  }
  const ready = state => ['rating_storage', 'rating_history', 'validation_exists', 'protected_write', 'private_validation', 'trigger_exists', 'extended_rubric', 'direct_writes_forbidden'].every(key => state[key] === true);
  const before = await inspect();
  if (history.some(migration => migration.name === name)) {
    if (!ready(before)) throw new Error('Ratings migration is recorded, but validation or permissions verification failed.');
    return { project: ref, fingerprint, result: 'already_applied' };
  }
  if (history.some(migration => String(migration.name || '').startsWith(prefix))) throw new Error('A different ratings migration version is recorded. Review the difference first.');
  if (before.rating_storage || before.validation_exists) throw new Error('Rating storage already exists without this migration record. No changes were made.');
  await request('database/migrations', { query: sql, name });
  if (!ready(await inspect())) throw new Error('Migration was accepted, but ratings validation or permissions verification failed.');
  return { project: ref, fingerprint, result: 'applied' };
}
