import path from 'node:path';
import fs from 'node:fs';
import { syncOptions, profile, connectProfile, inventory, assertCompatible, snapshot, readSnapshot, restore } from './supabase-sync-core.mjs';
import { connectManagementSource } from './supabase-management-source.mjs';
const root = path.resolve(import.meta.dirname, '..');
if (fs.existsSync(path.join(root, '.env.local'))) process.loadEnvFile(path.join(root, '.env.local'));
const connections = [];
try {
  const options = syncOptions(process.argv.slice(2));
  const destinationConfig = profile(process.env, options.to);
  const destination = await connectProfile(destinationConfig); connections.push(destination);
  const managementExport = options.from === 'cloud' && options.to === 'local' && !process.env.SUPABASE_CLOUD_DB_URL;
  const source = options.restore ? null : managementExport ? connectManagementSource(process.env) : await connectProfile(profile(process.env, options.from));
  if (source) connections.push(source);
  if (source?.dbUrl === destination.dbUrl || source?.url === destination.url) throw new Error('Source and destination must be different instances.');
  const saved = options.restore ? await readSnapshot(path.resolve(options.restore)) : null;
  const sourceInventory = source ? await inventory(source) : saved.inventory;
  const destinationInventory = await inventory(destination);
  assertCompatible(sourceInventory, destinationInventory);
  const summary = data => ({ tables: data.tables.map(({ schema, name, count }) => ({ table: `${schema}.${name}`, rows: count })), buckets: data.buckets.length, files: data.objects.length });
  console.log(JSON.stringify({ mode: options.apply ? 'replace' : 'preview (no writes)', from: options.from || 'backup', to: options.to, source: summary(sourceInventory), destination: summary(destinationInventory) }, null, 2));
  if (options.apply) {
    // Serializes our sync commands; users should stop portal writes during the copy.
    await destination.db.query("select pg_advisory_lock(hashtext('annotation-portal-full-sync'))");
    const directory = path.join(root, '.runtime/supabase-sync', new Date().toISOString().replaceAll(/[:.]/g, '-'));
    console.log('Backing up destination database rows and Storage files before replacement.');
    await snapshot(destination, path.join(directory, 'destination'));
    console.log(`Recovery backup: ${path.join(directory, 'destination')}`);
    const sourceDirectory = source ? path.join(directory, 'source') : path.resolve(options.restore);
    const manifest = source ? await snapshot(source, sourceDirectory) : saved;
    await restore(destination, sourceDirectory, manifest);
    console.log('Sync complete. Database rows and Storage file checksums verified. Sign in again on the destination.');
  }
} catch (error) {
  // Driver errors may embed credentials, SQL parameters, password hashes or research data.
  const message = String(error.message || '').replace(/postgres(?:ql)?:\/\/\S+/g, '[redacted database URL]');
  const safe = /^(Configure |Use |Applying |Missing |Unknown |The local |Local DB_URL |Cloud DB_URL |DB_URL |Database schemas |Backup |Invalid backup |Source and destination |Storage verification |Row verification |Final Storage )/.test(message);
  console.error(safe ? message : 'Supabase sync failed. Check database connectivity/permissions and Storage access. If applying, the destination recovery backup is under .runtime/supabase-sync; Storage changes may need recovery.');
  process.exitCode = 1;
} finally { await Promise.allSettled(connections.map(connection => connection.db.end())); }
