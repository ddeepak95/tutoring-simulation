import fs from 'node:fs';
import crypto from 'node:crypto';

if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
try {
  const args = process.argv.slice(2);
  const expected = args.includes('--project') ? args[args.indexOf('--project') + 1] : null;
  const url = new URL(process.env.VITE_SUPABASE_URL);
  const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!expected || ref !== expected || !token) throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');
  const snapshot = JSON.parse(fs.readFileSync('src/generated/rubric.json', 'utf8'));
  if (snapshot.label_schema_version !== 'section-items/1') throw new Error('Build the section-items rubric first.');
  const sql = fs.readFileSync('supabase/migrations/202610260001_section_item_labels.sql', 'utf8').replaceAll('__CURRENT_RUBRIC_HASH__', snapshot.rubric_sha256).replaceAll('__CURRENT_RUBRIC_JSON__', JSON.stringify(snapshot).replaceAll("'", "''"));
  const prefix = 'annotation_portal_202610260001_';
  const name = prefix + crypto.createHash('sha256').update(sql).digest('hex').slice(0, 16);
  async function request(endpoint, body) {
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/${endpoint}`, {
      method: body ? 'POST' : 'GET',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}. Check project access and migration history.`);
    return response.json();
  }
  const history = await request('database/migrations');
  if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
  if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('A different section-items migration fingerprint is recorded; review required.');
  const exists = history.some(item => item.name === name);
  if (!exists) await request('database/migrations', { query: sql, name });
  const rows = await request('database/query', { query: `select exists(select 1 from public.rubric_versions where hash='${snapshot.rubric_sha256}') as registered, not exists(select 1 from public.assignments where task_type='label' and is_active and rubric_hash<>'${snapshot.rubric_sha256}') as transitioned`, read_only: true });
  if (rows.length !== 1 || !rows[0].registered || !rows[0].transitioned) throw new Error('Section item rollout verification failed.');
  console.log(JSON.stringify({ project: ref, result: exists ? 'already_applied' : 'applied', verified: true }));
} catch (error) { console.error(error.message); process.exitCode = 1; }
