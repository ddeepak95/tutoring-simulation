import fs from 'node:fs';
import crypto from 'node:crypto';

if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
const args = process.argv.slice(2);
const expected = args.includes('--project') ? args[args.indexOf('--project') + 1] : null;
const url = new URL(process.env.VITE_SUPABASE_URL || '');
const project = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!expected || url.protocol !== 'https:' || project !== expected || !token) throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');

const snapshot = JSON.parse(fs.readFileSync('src/generated/rubric.json', 'utf8'));
const hash = snapshot.rubric_sha256;
if (snapshot.rating_dimensions?.length !== 6 || snapshot.rating_dimensions[0]?.label !== 'Explaining the Core Principle') throw new Error('Expected the current six-question rubric and updated criterion label.');
const sql = fs.readFileSync('supabase/migrations/202610210002_update_active_rating_rubric_hash.sql', 'utf8').replaceAll('__CURRENT_RUBRIC_HASH__', hash);
const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
const prefix = 'annotation_portal_202610210002_';
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

const tag = `$current_rubric_${hash.slice(0, 12)}$`;
await request('database/query', { query: `insert into public.rubric_versions(hash,snapshot) values ('${hash}', ${tag}${JSON.stringify(snapshot)}${tag}::jsonb) on conflict(hash) do nothing` });
const history = await request('database/migrations');
if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('A different assignment rubric migration fingerprint is recorded.');
const exists = history.some(item => item.name === name);
if (!exists) await request('database/migrations', { query: sql, name });
const rows = await request('database/query', { query: `select (select count(*) from public.assignments where task_type='rate' and is_active and status<>'submitted' and rubric_hash<>'${hash}')::integer as outdated_active_assignments, (select count(*) from public.assignments where task_type='rate' and is_active and status<>'submitted' and rubric_hash='${hash}')::integer as current_active_assignments`, read_only: true });
if (!Array.isArray(rows) || rows.length !== 1 || rows[0].outdated_active_assignments !== 0) throw new Error('Could not verify that active Rate assignments use the new criterion label.');
console.log(JSON.stringify({ project, result: exists ? 'already_applied' : 'applied', rubric_hash: hash, ...rows[0] }));
