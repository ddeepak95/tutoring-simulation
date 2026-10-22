import fs from 'node:fs';
import crypto from 'node:crypto';

if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
const args = process.argv.slice(2);
const expectedProject = args[args.indexOf('--project') + 1];
if (!args.includes('--project') || !expectedProject) throw new Error('Usage: npm run migrate:remove-comparison-naturalness -- --project YOUR_PROJECT_REF');
try {
  const url = new URL(process.env.VITE_SUPABASE_URL);
  const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (ref !== expectedProject || !token) throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');
  const sql = fs.readFileSync('supabase/migrations/202610220004_remove_comparison_naturalness.sql', 'utf8');
  const prefix = 'annotation_portal_202610220004_';
  const name = prefix + crypto.createHash('sha256').update(sql).digest('hex').slice(0, 16);
  async function request(endpoint, body) {
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/${endpoint}`, {
      method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}: ${(await response.text()).slice(0, 250)}`);
    return response.json();
  }
  const history = await request('database/migrations');
  if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('Different comparison question migration fingerprint recorded; review required.');
  const exists = history.some(item => item.name === name);
  if (!exists) await request('database/migrations', { query: sql, name });
  const rows = await request('database/query', { query: `select (select count(*) from public.comparison_pairs p where exists(select 1 from jsonb_array_elements(p.questions) q where q->>'key'='overall_conversational_naturalness'))::integer as pairs_with_question, (select count(*) from public.comparison_assignments a where status<>'submitted' and exists(select 1 from jsonb_array_elements(a.questions) q where q->>'key'='overall_conversational_naturalness'))::integer as active_assignments_with_question`, read_only: true });
  if (rows.length !== 1 || rows[0].pairs_with_question !== 0 || rows[0].active_assignments_with_question !== 0) throw new Error('Comparison question migration verification failed.');
  console.log(JSON.stringify({ project: ref, result: exists ? 'already_applied' : 'applied', verified: true }));
} catch (error) { console.error(error.message); process.exitCode = 1; }
