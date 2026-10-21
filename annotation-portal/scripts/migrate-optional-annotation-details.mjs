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
const optionalFields = { concepts_and_subtopics_covered: ['detail_level'], examples: ['detail_level'], analogies: ['detail_level'], representations: ['image_languages'], cultural_references: ['detail_level'], issues: ['explanation'] };
for (const [featureKey, fieldKeys] of Object.entries(optionalFields)) {
  const fields = snapshot.rubric.find(feature => feature.key === featureKey)?.fields;
  if (fieldKeys.some(key => !fields?.find(field => field.key === key)?.optional)) throw new Error(`Optional fields are missing for ${featureKey}.`);
}

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

const prefix = 'annotation_portal_202610210010_';
const migration = fs.readFileSync('supabase/migrations/202610210010_optional_annotation_details.sql', 'utf8').replaceAll('__CURRENT_RUBRIC_HASH__', rubricHash);
const name = prefix + crypto.createHash('sha256').update(migration).digest('hex').slice(0, 16);
const history = await request('database/migrations');
if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('A different optional details migration fingerprint is recorded; review required.');
const dollarTag = `$optional_details_${rubricHash.slice(0, 12)}$`;
await request('database/query', { query: `insert into public.rubric_versions(hash,snapshot) values ('${rubricHash}', ${dollarTag}${JSON.stringify(snapshot)}${dollarTag}::jsonb) on conflict(hash) do nothing` });
const status = history.some(item => item.name === name) ? 'already_applied' : (await request('database/migrations', { query: migration, name }), 'applied');
const result = await request('database/query', { query: `select (select count(*) from public.assignments where task_type='label' and is_active and status<>'submitted' and rubric_hash<>'${rubricHash}')::integer as old_active_label_tasks, (select count(*) from public.assignments where task_type='label' and is_active and status<>'submitted' and rubric_hash='${rubricHash}')::integer as current_label_tasks`, read_only: true });
if (!Array.isArray(result) || result.length !== 1 || result[0].old_active_label_tasks !== 0) throw new Error('Migration verification failed: active Label tasks still use an older rubric.');
console.log(JSON.stringify({ project, rubric_hash: rubricHash, migration: status, ...result[0] }));
