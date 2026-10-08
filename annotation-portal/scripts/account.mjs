// Provision accounts without invitations. Secrets are read only in this local process.
import { createClient } from '@supabase/supabase-js';
import { loginIdentifier, validatePassword } from './credentials.mjs';
import { removeNewAccount } from './remove-new-account.mjs';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import fs from 'node:fs';
if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
const [username, ...args] = process.argv.slice(2);
const resetting = args.includes('--reset');
const role = args.find(value => value !== '--reset') || 'annotator';
if (!username || !['admin', 'annotator'].includes(role) || args.filter(value => value !== '--reset').length > 1) throw new Error('Usage: npm run account -- USERNAME [admin|annotator] or USERNAME --reset');
const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment or ignored .env.local.');
const email = loginIdentifier(username);
// Hidden password entry avoids credentials in shell history or terminal output.
const { Writable } = await import('node:stream');
let muted = false;
const output = new Writable({ write(chunk, encoding, callback) { if (!muted) stdout.write(chunk, encoding); callback(); } });
const prompt = readline.createInterface({ input: stdin, output, terminal: true });
stdout.write(`${resetting ? 'New' : 'Initial'} password (hidden, minimum 8 characters): `); muted = true;
const password = await prompt.question(''); muted = false; stdout.write('\n'); prompt.close();
validatePassword(password);
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
if (resetting) {
  const { data: profile, error } = await client.from('profiles').select('id').eq('username', email.split('@')[0]).single();
  if (error) throw new Error('Account lookup failed: ' + error.message);
  const { error: resetError } = await client.auth.admin.updateUserById(profile.id, { password });
  if (resetError) throw new Error(resetError.message);
  console.log(`Password reset for ${username.trim().toLowerCase()}. User ID, role and annotations are preserved.`);
} else {
  const { data, error } = await client.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw new Error(error.message);
  const { error: profileError } = await client.from('profiles').update({ role }).eq('id', data.user.id);
  if (profileError) { const removed = await removeNewAccount(client, data.user.id); throw new Error(removed ? 'Role setup failed; the new account was removed.' : 'Role setup failed and cleanup was incomplete. Check the new account before retrying.'); }
  console.log(`Created ${role} account ${username.trim().toLowerCase()}. No email was sent.`);
}
