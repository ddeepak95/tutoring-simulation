import crypto from 'node:crypto';

const tables = ['profiles', 'rubric_versions', 'conversations', 'assignments', 'annotation_revisions'];
const functions = ['provision_profile', 'is_admin', 'utf16_offset', 'validate_transcript', 'validate_annotations', 'save_assignment', 'reopen_assignment'];
const inspection = `select
  coalesce((select jsonb_agg(c.relname order by c.relname) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname in ('profiles','rubric_versions','conversations','assignments','annotation_revisions')), '[]'::jsonb) as tables,
  coalesce((select bool_and(c.relrowsecurity) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname in ('profiles','rubric_versions','conversations','assignments','annotation_revisions')), false) as rls_enabled,
  coalesce((select jsonb_agg(distinct p.proname) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('provision_profile','is_admin','utf16_offset','validate_transcript','validate_annotations','save_assignment','reopen_assignment')), '[]'::jsonb) as functions,
  exists(select 1 from pg_trigger where tgname='portal_user_created' and not tgisinternal) as profile_trigger,
  exists(select 1 from storage.buckets where id='transcripts') as source_bucket,
  exists(select 1 from storage.buckets where id='transcripts' and not public) as source_bucket_private,
  (select count(*)::integer from auth.users) as existing_users`;

export async function applyPortalMigration({ token, projectUrl, expectedProject, sql, fetcher = fetch }) {
  if (!token) throw new Error('Set SUPABASE_ACCESS_TOKEN in the ignored .env.local file. The publishable and service-role keys cannot authenticate the Management API.');
  const parsed = new URL(projectUrl);
  const ref = parsed.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  if (!ref || parsed.protocol !== 'https:' || !expectedProject || ref !== expectedProject) throw new Error('The explicit --project reference must match VITE_SUPABASE_URL. No migration was sent.');
  if (!sql.trim()) throw new Error('Migration SQL is empty.');
  const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
  const name = `annotation_portal_202610080001_${fingerprint.slice(0, 16)}`;
  async function request(path, body) {
    const response = await fetcher(`https://api.supabase.com/v1/projects/${ref}/${path}`, { method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}. Check token scope and project access. No credentials or response body are logged.`);
    return response.json();
  }
  const history = await request('database/migrations');
  if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
  const inspect = async () => {
    const result = await request('database/query', { query: inspection, read_only: true });
    if (!Array.isArray(result) || result.length !== 1 || !Array.isArray(result[0].tables) || !Array.isArray(result[0].functions)) throw new Error('Unexpected database inspection response.');
    return result[0];
  };
  const ready = state => tables.every(table => state.tables.includes(table)) && functions.every(fn => state.functions.includes(fn)) && state.rls_enabled && state.profile_trigger && state.source_bucket_private;
  const state = await inspect();
  if (history.some(migration => migration.name === name)) {
    if (!ready(state)) throw new Error('Migration is recorded, but its tables or protections are incomplete. No changes were made.');
    return { project: ref, fingerprint, result: 'already_applied' };
  }
  if (history.some(migration => String(migration.name || '').startsWith('annotation_portal_202610080001_'))) throw new Error('A different version of this migration is recorded. Review the difference before applying a new migration.');
  if (state.tables.length || state.functions.length || state.profile_trigger || state.source_bucket || state.existing_users) throw new Error('Existing portal objects or Auth users were found. Review the database before applying this initial migration; nothing has been overwritten.');
  await request('database/migrations', { query: sql, name });
  if (!ready(await inspect())) throw new Error('The API accepted the migration, but verification failed. Inspect the project before retrying.');
  return { project: ref, fingerprint, result: 'applied' };
}
