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
if (snapshot.rating_dimensions?.length !== 6 || snapshot.rating_dimensions.filter(item => !item.subsequent_only).length !== 5) throw new Error('Expected the current five-plus-one rating rubric.');
const sql = fs.readFileSync('supabase/migrations/202610210001_rating_rubric_upgrade.sql', 'utf8');
if (!sql.includes(rubricHash)) throw new Error('Migration hash does not match the generated rubric.');
const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
const prefix = 'annotation_portal_202610210001_';
const name = prefix + fingerprint.slice(0, 16);

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

const snapshotLiteral = JSON.stringify(snapshot);
const dollarTag = `$rating_rubric_${rubricHash.slice(0, 12)}$`;
const insertSnapshot = `insert into public.rubric_versions(hash,snapshot) values ('${rubricHash}', ${dollarTag}${snapshotLiteral}${dollarTag}::jsonb) on conflict(hash) do nothing`;
await request('database/query', { query: insertSnapshot });
const history = await request('database/migrations');
if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('A different active-rating migration fingerprint is recorded; review required.');
const exists = history.some(item => item.name === name);
if (!exists) await request('database/migrations', { query: sql, name });
const result = await request('database/query', { query: `select (select count(*) from public.assignments where task_type='rate' and is_active and status<>'submitted' and rubric_hash<>'${rubricHash}')::integer as old_active_rate_tasks, (select count(*) from public.assignments where task_type='rate' and rubric_hash='${rubricHash}')::integer as current_rate_tasks, (select count(*) from public.annotation_revisions where operation='rubric_upgrade')::integer as upgraded_history_rows`, read_only: true });
if (!Array.isArray(result) || result.length !== 1 || result[0].old_active_rate_tasks !== 0) throw new Error('Migration verification failed: active Rate tasks still use an older rubric.');
console.log(JSON.stringify({ project, result: exists ? 'already_applied' : 'applied', rubric_hash: rubricHash, ...result[0] }));
