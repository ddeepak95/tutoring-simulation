import crypto from 'node:crypto';
import fs from 'node:fs';

if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');

const args = process.argv.slice(2);
const expected = args.includes('--project') ? args[args.indexOf('--project') + 1] : null;
const url = new URL(process.env.VITE_SUPABASE_URL);
const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!expected || url.protocol !== 'https:' || ref !== expected || !token) {
  throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');
}

async function request(path, body) {
  const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) {
    let detail = '';
    try {
      const body = await response.json();
      detail = [body.message, body.error, body.hint, body.code].filter(Boolean).join(' ');
    } catch {}
    throw new Error(`Supabase Management API returned HTTP ${response.status}.${detail ? ` ${detail}` : ''}`);
  }
  return response.json();
}

const migrations = [
  ['202610200003', '202610200003_chatgpt_topic_metadata.sql'],
  ['202610200004', '202610200004_conversation_provider_access_type.sql'],
  ['202610200005', '202610200005_split_label_rate_assignments.sql'],
];
let history = await request('database/migrations');
if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
const results = [];
for (const [version, file] of migrations) {
  const sql = fs.readFileSync(`supabase/migrations/${file}`, 'utf8');
  const prefix = `annotation_portal_${version}_`;
  const name = prefix + crypto.createHash('sha256').update(sql).digest('hex').slice(0, 16);
  if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) {
    throw new Error(`A different fingerprint for migration ${version} is recorded; review required.`);
  }
  const exists = history.some(item => item.name === name);
  if (!exists) {
    await request('database/migrations', { query: sql, name });
    history = await request('database/migrations');
    if (!Array.isArray(history) || !history.some(item => item.name === name)) {
      throw new Error(`Migration ${version} could not be confirmed in migration history.`);
    }
  }
  results.push({ version, result: exists ? 'already_applied' : 'applied' });
}

const checks = await request('database/query', { query: `select
  exists(select 1 from public.conversations where transcript ? 'topic_name') as topic_metadata,
  exists(select 1 from pg_proc where oid=to_regprocedure('public.import_chatgpt_exact_capture(jsonb)') and prosrc like '%access_type%') as provider_metadata,
  exists(select 1 from information_schema.columns where table_schema='public' and table_name='assignments' and column_name='task_type')
    and exists(select 1 from pg_constraint where conname='assignments_task_owner_unique')
    and to_regprocedure('public.create_task_assignments(uuid[],uuid[],text[],text,jsonb)') is not null
    and to_regprocedure('public.save_assignment(uuid,integer,jsonb,boolean,jsonb)') is not null
    and (select count(*) from public.assignments where task_type='label')=(select count(*) from public.assignments where task_type='rate')
    and not exists(select 1 from public.assignments l where l.task_type='label' and (l.turn_ratings<>'{}'::jsonb or not exists(select 1 from public.assignments r where r.conversation_id=l.conversation_id and r.annotator_id=l.annotator_id and r.rubric_hash=l.rubric_hash and r.task_type='rate')))
    and not exists(select 1 from public.assignments r where r.task_type='rate' and (r.annotations<>'[]'::jsonb or not exists(select 1 from public.assignments l where l.conversation_id=r.conversation_id and l.annotator_id=r.annotator_id and l.rubric_hash=r.rubric_hash and l.task_type='label'))) as label_rate`, read_only: true });
if (!Array.isArray(checks) || checks.length !== 1 || checks[0].topic_metadata !== true || checks[0].provider_metadata !== true || checks[0].label_rate !== true) {
  throw new Error('Migration verification failed after applying the pending migrations.');
}
console.log(JSON.stringify({ project: ref, migrations: results, verified: true }));
