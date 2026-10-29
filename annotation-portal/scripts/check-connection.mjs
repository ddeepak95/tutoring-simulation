import { loadSupabaseEnvironment } from './load-supabase-env.mjs';
import fs from 'node:fs';
loadSupabaseEnvironment();
const url = process.env.VITE_SUPABASE_URL, key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.');
const headers = { apikey: key };
const auth = await fetch(`${url}/auth/v1/settings`, { headers });
console.log(`Supabase authentication: HTTP ${auth.status}`);
if (auth.ok) { const settings = await auth.json(); console.log(`Public signups: ${settings.disable_signup ? 'disabled' : 'enabled — disable for provisioned accounts'}`); }
const database = await fetch(`${url}/rest/v1/profiles?select=id&limit=0`, { headers });
console.log(`Portal database: HTTP ${database.status}`);
if (database.status === 404) { console.log('Apply supabase/migrations/202610080001_portal.sql in the Supabase SQL Editor.'); process.exitCode = 1; }
else if (database.status === 401 || database.status === 403) console.log('Anonymous access is restricted, as expected. Verify the migration and provision an account before login.');
else if (!database.ok) { console.log((await database.text()).slice(0, 500)); process.exitCode = 1; }
