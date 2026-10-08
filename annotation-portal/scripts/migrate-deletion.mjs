import fs from 'node:fs';
import { applyConversationDeletionMigration } from './deletion-migration-api.mjs';
if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
const args = process.argv.slice(2); const expectedProject = args[args.indexOf('--project') + 1];
if (!args.includes('--project') || !expectedProject) throw new Error('Usage: npm run migrate:deletion -- --project YOUR_PROJECT_REF');
try {
  console.log(JSON.stringify(await applyConversationDeletionMigration({ token: process.env.SUPABASE_ACCESS_TOKEN, projectUrl: process.env.VITE_SUPABASE_URL, expectedProject, sql: fs.readFileSync('supabase/migrations/202610080003_conversation_deletion.sql', 'utf8') }), null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
