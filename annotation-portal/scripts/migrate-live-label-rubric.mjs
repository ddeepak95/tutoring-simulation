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
  const sql = fs.readFileSync('supabase/migrations/202610210020_live_label_rubric.sql', 'utf8');
  const prefix = 'annotation_portal_202610210020_';
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
  if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('A different live-label-rubric migration fingerprint is recorded; review required.');
  const exists = history.some(item => item.name === name);
  if (!exists) await request('database/migrations', { query: sql, name });
  const rows = await request('database/query', { query: `select to_regprocedure('public.upgrade_label_assignment_rubric(uuid,text)') is not null as function_exists, exists(select 1 from pg_class where oid='public.assignment_rubric_upgrades'::regclass and relrowsecurity) as audit_rls, exists(select 1 from pg_constraint where conrelid='public.rubric_versions'::regclass and conname='rubric_versions_snapshot_check' and pg_get_constraintdef(oid) like '%64%') as flexible_count`, read_only: true });
  if (rows.length !== 1 || !rows[0].function_exists || !rows[0].audit_rls || !rows[0].flexible_count) throw new Error('Live label rubric migration verification failed.');
  console.log(JSON.stringify({ project: ref, result: exists ? 'already_applied' : 'applied', verified: true }));
} catch (error) { console.error(error.message); process.exitCode = 1; }
