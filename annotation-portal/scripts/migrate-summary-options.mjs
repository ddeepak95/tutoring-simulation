import fs from 'node:fs';
import crypto from 'node:crypto';
if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
try {
  const args = process.argv.slice(2);
  const expected = args.includes('--project') ? args[args.indexOf('--project') + 1] : null;
  const url = new URL(process.env.VITE_SUPABASE_URL);
  const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!expected || url.protocol !== 'https:' || ref !== expected || !token) throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');
  const sql = fs.readFileSync('supabase/migrations/202610100002_summary_options.sql', 'utf8');
  const fingerprint = crypto.createHash('sha256').update(sql).digest('hex');
  const prefix = 'annotation_portal_202610100002_';
  const name = prefix + fingerprint.slice(0, 16);
  async function request(path, body) {
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/${path}`, { method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}.`);
    return response.json();
  }
  const history = await request('database/migrations');
  if (!Array.isArray(history)) throw new Error('Unexpected migration history response.');
  if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('Different migration fingerprint recorded; review required.');
  const exists = history.some(item => item.name === name);
  if (!exists) await request('database/migrations', { query: sql, name });
  const rows = await request('database/query', { query: `select position('Choose a Concept Summarization answer' in prosrc)>0 and position('then continue' in prosrc)>0 and not has_function_privilege('authenticated',oid,'EXECUTE') and not has_function_privilege('anon',oid,'EXECUTE') as verified from pg_proc where oid=to_regprocedure('public.validate_turn_ratings(jsonb,jsonb,jsonb,boolean)')`, read_only: true });
  if (rows.length !== 1 || rows[0].verified !== true) throw new Error('Migration validation verification failed.');
  console.log(JSON.stringify({ project: ref, result: exists ? 'already_applied' : 'applied', verified: true }));
} catch (error) { console.error(error.message); process.exitCode = 1; }
