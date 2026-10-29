import { createClient } from '@supabase/supabase-js';
import { resolveSupabaseEnvironment } from './supabase-environment.mjs';
import { quote } from './supabase-sync-core.mjs';
const literal = value => "'" + value.replaceAll("'", "''") + "'";
const qualified = table => `${quote(table.schema)}.${quote(table.name)}`;

// Cloud -> local only: every Management API query is explicitly read-only.
export function connectManagementSource(env, fetcher = fetch) {
  const config = resolveSupabaseEnvironment({ ...env, SUPABASE_TARGET: 'cloud' });
  const ref = config.SUPABASE_URL && new URL(config.SUPABASE_URL).hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  if (!ref || !env.SUPABASE_ACCESS_TOKEN || !config.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Configure the cloud profile and SUPABASE_ACCESS_TOKEN for read-only cloud export.');
  const query = async sql => {
    const request = () => fetcher(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
      method: 'POST', headers: { Authorization: `Bearer ${env.SUPABASE_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sql, read_only: true }), signal: AbortSignal.timeout(120000),
    });
    let response = await request();
    for (let retry = 0; response.status === 429 && retry < 4; retry++) {
      const delay = Math.min(30, Math.max(2, Number(response.headers.get('retry-after')) || 4 * 2 ** retry));
      await response.body?.cancel();
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      response = await request();
    }
    if (!response.ok) throw new Error(`Cloud read-only export failed (HTTP ${response.status}).`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error('Cloud read-only export returned an invalid result.');
    return { rows };
  };
  return { target: 'cloud', url: config.SUPABASE_URL, db: { query, end: async () => {} },
    storage: createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } }).storage,
    async readDatabaseSnapshot(inventory) {
      const sequences = (await query("select schemaname as schema, sequencename as name from pg_sequences where schemaname in ('public','auth') order by schemaname,sequencename")).rows;
      const tableExpressions = inventory.tables.map(table => `jsonb_build_object('schema',${literal(table.schema)},'name',${literal(table.name)},'rows',(select coalesce(jsonb_agg(to_jsonb(t)::text),'[]'::jsonb) from ${qualified(table)} t))`);
      const sequenceExpressions = sequences.map(sequence => `(select jsonb_build_object('schema',${literal(sequence.schema)},'name',${literal(sequence.name)},'value',last_value::text,'is_called',is_called) from ${qualified(sequence)})`);
      // One SELECT gives all database rows one PostgreSQL statement snapshot.
      // Encode individual rows as strings to retain bigint/numeric precision.
      const sql = `select jsonb_build_object('tables',jsonb_build_array(${tableExpressions.join(',')}),'sequences',jsonb_build_array(${sequenceExpressions.join(',')}),'objects',(select coalesce(jsonb_agg(to_jsonb(o) order by bucket_id,name),'[]'::jsonb) from (select bucket_id,name,metadata,user_metadata from storage.objects) o)) as snapshot`;
      const rows = (await query(sql)).rows;
      if (rows.length !== 1 || !rows[0].snapshot?.tables) throw new Error('Cloud snapshot was incomplete.');
      return rows[0].snapshot;
    },
  };
}
