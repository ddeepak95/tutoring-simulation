import { loadSupabaseEnvironment } from './load-supabase-env.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { buildRepositoryCatalog, syncRepositoryCatalog } from './repository-catalog.mjs';
import { addRepositoryConversations, resolveRepositoryAdmin } from './repository-conversations.mjs';

const portal = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadSupabaseEnvironment();
const args = process.argv.slice(2), runs = []; let expectedProject, adminUsername, allRuns = false, dryRun = false, replaceIdentities = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--run') runs.push(args[++i]);
  else if (args[i] === '--project') expectedProject = args[++i];
  else if (args[i] === '--admin') adminUsername = args[++i];
  else if (args[i] === '--all-runs') allRuns = true;
  else if (args[i] === '--dry-run') dryRun = true;
  else if (args[i] === '--replace-identities') replaceIdentities = true;
  else throw new Error('Usage: npm run sync:conversations -- --run RUN_ID [--run RUN_ID] --project PROJECT_REF [--admin USERNAME] [--dry-run], or --all-runs.');
}
const result = buildRepositoryCatalog({ repositoryRoot: path.dirname(portal), runIds: runs, allRuns });
console.log(JSON.stringify({ conversations: result.catalog.entries.map(({ label, language, version, turn_count }) => ({ label, language, version, turn_count })), skipped: result.skipped }, null, 2));
if (!dryRun) {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const ref = url && new URL(url).hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  if (process.env.SUPABASE_TARGET === 'local' ? expectedProject !== 'local' : !ref || new URL(url).protocol !== 'https:' || ref !== expectedProject) throw new Error('--project must match the configured Supabase project. No sync was sent.');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Set server-only SUPABASE_SERVICE_ROLE_KEY in the ignored .env.local.');
  if (!result.files.length) throw new Error('No valid repository conversations were found; nothing was synced.');
  const client = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const adminId = await resolveRepositoryAdmin(client, adminUsername);
  const synced = await syncRepositoryCatalog({ client, ...result, replaceIdentities });
  const registered = await addRepositoryConversations({ client, files: result.files, adminId });
  console.log(JSON.stringify({ ...synced, ...registered }));
}
