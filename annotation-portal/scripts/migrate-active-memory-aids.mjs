import fs from 'node:fs';
import crypto from 'node:crypto';

if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
const args = process.argv.slice(2);
const expected = args.includes('--project') ? args[args.indexOf('--project') + 1] : null;
const projectUrl = new URL(process.env.VITE_SUPABASE_URL || '');
const project = projectUrl.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!expected || projectUrl.protocol !== 'https:' || project !== expected || !token) throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');

const snapshot = JSON.parse(fs.readFileSync('src/generated/rubric.json', 'utf8'));
const rubricHash = snapshot.rubric_sha256;
if (snapshot.rubric.length !== 8 || !snapshot.rubric.some(feature => feature.key === 'memory_aids')) throw new Error('Expected the eight-feature Memory Aid rubric.');

async function request(path, body) {
  const response = await fetch(`https://api.supabase.com/v1/projects/${project}/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(60000)
  });
  if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}.`);
  return response.json();
}

let history = await request('database/migrations');
if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
async function apply(namePrefix, sql) {
  const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
  const name = namePrefix + fingerprint.slice(0, 16);
  if (history.some(item => item.name?.startsWith(namePrefix) && item.name !== name)) throw new Error(`A different ${namePrefix} migration fingerprint is recorded; review required.`);
  if (history.some(item => item.name === name)) return 'already_applied';
  await request('database/migrations', { query: sql, name });
  history = [...history, { name }];
  return 'applied';
}

const constraintSql = fs.readFileSync('supabase/migrations/202610210004_memory_aid_rubric.sql', 'utf8');
const constraint = await apply('annotation_portal_202610210004_', constraintSql);
const dollarTag = `$memory_aids_${rubricHash.slice(0, 12)}$`;
await request('database/query', { query: `insert into public.rubric_versions(hash,snapshot) values ('${rubricHash}', ${dollarTag}${JSON.stringify(snapshot)}${dollarTag}::jsonb) on conflict(hash) do nothing` });
const upgradeSql = fs.readFileSync('supabase/migrations/202610210005_memory_aid_active_labels.sql', 'utf8').replaceAll('__CURRENT_RUBRIC_HASH__', rubricHash);
const upgrade = await apply('annotation_portal_202610210005_', upgradeSql);
const baselineSql = fs.readFileSync('supabase/migrations/202610210006_memory_aid_baselines.sql', 'utf8');
const baselines = await apply('annotation_portal_202610210006_', baselineSql);
const result = await request('database/query', { query: `select (select count(*) from public.assignments where task_type='label' and is_active and status<>'submitted' and rubric_hash<>'${rubricHash}')::integer as old_active_label_tasks, (select count(*) from public.assignments where task_type='label' and is_active and rubric_hash='${rubricHash}')::integer as current_label_tasks`, read_only: true });
if (!Array.isArray(result) || result.length !== 1 || result[0].old_active_label_tasks !== 0) throw new Error('Migration verification failed: active Label tasks still use an older rubric.');
console.log(JSON.stringify({ project, rubric_hash: rubricHash, constraint, upgrade, baselines, ...result[0] }));
