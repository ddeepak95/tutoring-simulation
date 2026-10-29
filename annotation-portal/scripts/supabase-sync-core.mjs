import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
import { resolveSupabaseEnvironment } from './supabase-environment.mjs';

export const quote = value => '"' + value.replaceAll('"', '""') + '"';
const tableName = table => `${quote(table.schema)}.${quote(table.name)}`;
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const checked = result => { if (result.error) throw new Error('Storage operation failed: ' + result.error.message); return result.data; };
export function syncOptions(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (['--from', '--to', '--confirm-target', '--restore'].includes(arg)) {
      if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Missing value for ${arg}.`);
      options[arg.slice(2)] = args[++i];
    } else if (arg === '--apply') options.apply = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!['local', 'cloud'].includes(options.to) || (options.restore ? options.from : !['local', 'cloud'].includes(options.from) || options.from === options.to)) throw new Error('Use --from cloud --to local, --from local --to cloud, or --restore BACKUP --to TARGET.');
  if (options.apply && options['confirm-target'] !== options.to) throw new Error(`Applying a replacement requires --confirm-target ${options.to}. Preview without --apply first.`);
  return options;
}
export function profile(env, target) {
  const selected = resolveSupabaseEnvironment({ ...env, SUPABASE_TARGET: target });
  const dbUrl = env[`SUPABASE_${target.toUpperCase()}_DB_URL`];
  if (!dbUrl || !selected.SUPABASE_SERVICE_ROLE_KEY || !selected.SUPABASE_URL) throw new Error(`Configure SUPABASE_${target.toUpperCase()}_DB_URL, URL and SERVICE_ROLE_KEY in .env.local.`);
  const db = new URL(dbUrl);
  if (!['postgres:', 'postgresql:'].includes(db.protocol)) throw new Error('DB_URL must be a PostgreSQL connection string.');
  if (target === 'local' && !['localhost', '127.0.0.1', '[::1]'].includes(db.hostname)) throw new Error('Local DB_URL must use loopback.');
  if (target === 'cloud') {
    const ref = new URL(selected.SUPABASE_URL).hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
    if (!ref || !(db.hostname === `db.${ref}.supabase.co` || (db.hostname.endsWith('.pooler.supabase.com') && decodeURIComponent(db.username) === `postgres.${ref}`))) throw new Error('Cloud DB_URL must belong to the configured cloud API project (direct or session pooler URL).');
    if (db.port === '6543') throw new Error('Use the direct connection or session pooler (port 5432), not transaction pooling.');
  }
  return { target, dbUrl, url: selected.SUPABASE_URL, key: selected.SUPABASE_SERVICE_ROLE_KEY };
}
export async function connectProfile(config) {
  const db = new pg.Client({ connectionString: config.dbUrl, connectionTimeoutMillis: 15000 });
  await db.connect();
  const storage = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } }).storage;
  return { ...config, db, storage };
}
export async function inventory(connection) {
  const { rows } = await connection.db.query(`select table_schema as schema, table_name as name,
    jsonb_agg(jsonb_build_object('name',column_name,'type',udt_schema||'.'||udt_name,'nullable',is_nullable,'generated',is_generated,'identity',is_identity) order by ordinal_position) as columns
    from information_schema.columns where table_schema in ('public','auth')
    and table_name in (select tablename from pg_tables where schemaname=table_schema)
    and not (table_schema='auth' and table_name='schema_migrations')
    group by table_schema, table_name order by table_schema, table_name`);
  const counts = rows.length ? (await connection.db.query(rows.map((table, index) => `select ${index} as index, count(*)::text as count from ${tableName(table)}`).join(' union all '))).rows : [];
  const tables = rows.map((table, index) => ({ ...table, count: counts.find(row => Number(row.index) === index).count }));
  const buckets = checked(await connection.storage.listBuckets());
  if (buckets.some(bucket => bucket.type && bucket.type !== 'STANDARD')) throw new Error('Only ordinary Storage buckets are supported by this application-data sync.');
  const objects = (await connection.db.query('select bucket_id, name, metadata, user_metadata from storage.objects order by bucket_id, name')).rows;
  const definitions = (await connection.db.query(`select 'function' as kind, p.proname||'('||pg_get_function_identity_arguments(p.oid)||')' as name, pg_get_functiondef(p.oid) as definition
    from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.prokind='f'
    and not exists(select 1 from pg_depend d where d.objid=p.oid and d.deptype='e')
    union all select 'policy', schemaname||'.'||tablename||'.'||policyname, concat_ws('|',permissive,roles::text,cmd,qual,with_check) from pg_policies where schemaname in ('public','storage')
    union all select 'constraint', n.nspname||'.'||c.relname||'.'||con.conname, pg_get_constraintdef(con.oid) from pg_constraint con join pg_class c on c.oid=con.conrelid join pg_namespace n on n.oid=c.relnamespace where n.nspname='public'
    union all select 'trigger', n.nspname||'.'||c.relname||'.'||t.tgname, pg_get_triggerdef(t.oid) from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_namespace n on n.oid=c.relnamespace where not t.tgisinternal and (n.nspname='public' or (n.nspname='auth' and c.relname='users' and t.tgname='on_auth_user_created'))
    order by kind,name`)).rows;
  return { tables, buckets, objects, definitions };
}
export function assertCompatible(source, destination) {
  const structure = data => JSON.stringify({ tables: data.tables.map(({ schema, name, columns }) => ({ schema, name, columns })), definitions: data.definitions });
  if (structure(source) !== structure(destination)) throw new Error('Database schemas differ. Apply the same repository migrations and use compatible Supabase Auth versions before syncing. No destination data changed.');
}
export async function snapshot(connection, directory) {
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  if (!connection.readDatabaseSnapshot) await connection.db.query('begin isolation level repeatable read read only');
  try {
    const manifest = { format: 1, createdAt: new Date().toISOString(), source: connection.target, inventory: await inventory(connection), tables: [], objects: [], sequences: [] };
    const captured = connection.readDatabaseSnapshot ? await connection.readDatabaseSnapshot(manifest.inventory) : null;
    if (captured) {
      manifest.inventory.objects = captured.objects;
      for (const table of manifest.inventory.tables) {
        const data = captured.tables.find(row => row.schema === table.schema && row.name === table.name);
        if (!data || !Array.isArray(data.rows)) throw new Error('Cloud snapshot was incomplete.');
        table.count = String(data.rows.length);
      }
    }
    for (const [index, table] of manifest.inventory.tables.entries()) {
      // Keep PostgreSQL JSON as strings: JS parsing would round bigint/numeric values.
      const rows = captured ? captured.tables.find(row => row.schema === table.schema && row.name === table.name).rows.sort() : (await connection.db.query(`select to_jsonb(t)::text as row from ${tableName(table)} t`)).rows.map(item => item.row).sort();
      const bytes = JSON.stringify(rows);
      const file = `table-${index}.json`;
      await fs.writeFile(path.join(directory, file), bytes, { mode: 0o600 });
      manifest.tables.push({ ...table, file, sha256: sha(bytes) });
    }
    const sequences = captured ? [] : (await connection.db.query("select schemaname as schema, sequencename as name from pg_sequences where schemaname in ('public','auth') order by schemaname,sequencename")).rows;
    if (captured) manifest.sequences = captured.sequences;
    for (const sequence of sequences) {
      const value = (await connection.db.query(`select last_value::text as value,is_called from ${tableName(sequence)}`)).rows[0];
      manifest.sequences.push({ ...sequence, ...value });
    }
    for (const [index, object] of manifest.inventory.objects.entries()) {
      const blob = checked(await connection.storage.from(object.bucket_id).download(object.name));
      const bytes = Buffer.from(await blob.arrayBuffer());
      const file = `object-${index}.bin`;
      await fs.writeFile(path.join(directory, file), bytes, { mode: 0o600 });
      manifest.objects.push({ ...object, file, sha256: sha(bytes), contentType: blob.type || 'application/octet-stream' });
      if ((index + 1) % 50 === 0) console.log(`${connection.target}: backed up ${index + 1}/${manifest.inventory.objects.length} Storage files.`);
    }
    if (!connection.readDatabaseSnapshot) await connection.db.query('commit');
    await fs.writeFile(path.join(directory, 'manifest.json'), JSON.stringify(manifest, null, 2), { mode: 0o600 });
    return manifest;
  } catch (error) { if (!connection.readDatabaseSnapshot) await connection.db.query('rollback'); throw error; }
}
export async function readSnapshot(directory) {
  const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8'));
  if (manifest.format !== 1 || !manifest.inventory || !Array.isArray(manifest.tables) || !Array.isArray(manifest.objects) || !Array.isArray(manifest.sequences)) throw new Error('Invalid backup manifest.');
  for (const entry of [...manifest.tables, ...manifest.objects]) {
    if (!/^(table-\d+\.json|object-\d+\.bin)$/.test(entry.file) || sha(await fs.readFile(path.join(directory, entry.file))) !== entry.sha256) throw new Error('Backup missing data or failed its checksum.');
  }
  return manifest;
}
export async function restore(connection, directory, manifest) {
  assertCompatible(manifest.inventory, await inventory(connection));
  // Storage is a separate service: stage and verify bytes before changing database rows.
  for (const bucket of manifest.inventory.buckets) {
    const options = { public: bucket.public, fileSizeLimit: bucket.file_size_limit, allowedMimeTypes: bucket.allowed_mime_types };
    const existing = checked(await connection.storage.listBuckets()).some(item => item.id === bucket.id);
    checked(existing ? await connection.storage.updateBucket(bucket.id, options) : await connection.storage.createBucket(bucket.id, options));
  }
  for (const [index, object] of manifest.objects.entries()) {
    const bytes = await fs.readFile(path.join(directory, object.file));
    const cacheControl = object.metadata?.cacheControl?.match(/(?:max-age=)?(\d+)/)?.[1];
    checked(await connection.storage.from(object.bucket_id).upload(object.name, bytes, { upsert: true, contentType: object.contentType, ...(cacheControl ? { cacheControl } : {}), ...(object.user_metadata ? { metadata: object.user_metadata } : {}) }));
    const downloaded = checked(await connection.storage.from(object.bucket_id).download(object.name));
    if (sha(Buffer.from(await downloaded.arrayBuffer())) !== object.sha256) throw new Error('Storage verification failed. Database rows were not replaced.');
    if ((index + 1) % 50 === 0) console.log(`${connection.target}: copied and verified ${index + 1}/${manifest.objects.length} Storage files.`);
  }
  await connection.db.query('begin');
  try {
    await connection.db.query("set local lock_timeout='10s'");
    await connection.db.query("set local session_replication_role='replica'");
    // No CASCADE: a dependency outside the synchronized tables must abort the copy.
    await connection.db.query(`truncate ${manifest.tables.map(tableName).join(', ')}`);
    for (const table of manifest.tables) {
      const rows = JSON.parse(await fs.readFile(path.join(directory, table.file), 'utf8'));
      const columns = table.columns.filter(column => column.generated === 'NEVER').map(column => quote(column.name)).join(',');
      for (let offset = 0; offset < rows.length; offset += 100) {
        await connection.db.query(`insert into ${tableName(table)} (${columns}) overriding system value select ${columns} from json_populate_recordset(null::${tableName(table)}, $1::json)`, ['[' + rows.slice(offset, offset + 100).join(',') + ']']);
      }
      const actual = (await connection.db.query(`select to_jsonb(t)::text as row from ${tableName(table)} t`)).rows.map(item => item.row).sort();
      if (sha(JSON.stringify(actual)) !== table.sha256) throw new Error(`Row verification failed for ${tableName(table)}; rolling back.`);
    }
    for (const sequence of manifest.sequences) await connection.db.query('select setval($1::regclass,$2::bigint,$3)', [tableName(sequence), sequence.value, sequence.is_called]);
    await connection.db.query('commit');
  } catch (error) { await connection.db.query('rollback'); throw error; }
  const wanted = new Set(manifest.objects.map(object => JSON.stringify([object.bucket_id, object.name])));
  const current = await inventory(connection);
  for (const object of current.objects) if (!wanted.has(JSON.stringify([object.bucket_id, object.name]))) checked(await connection.storage.from(object.bucket_id).remove([object.name]));
  for (const bucket of current.buckets) if (!manifest.inventory.buckets.some(item => item.id === bucket.id)) checked(await connection.storage.deleteBucket(bucket.id));
  const final = await inventory(connection);
  if (final.objects.length !== manifest.objects.length || final.buckets.length !== manifest.inventory.buckets.length) throw new Error('Final Storage inventory differs; use the saved destination backup to recover.');
}
