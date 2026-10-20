import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
const envPath = path.resolve(root, '../annotation-portal/.env.local');
if (fs.existsSync(envPath)) process.loadEnvFile(envPath);
const supabaseUrl = new URL(process.env.VITE_SUPABASE_URL || '');
const publicKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (supabaseUrl.protocol !== 'https:' || !/^[a-z0-9-]+\.supabase\.co$/.test(supabaseUrl.hostname) || supabaseUrl.username || supabaseUrl.password || supabaseUrl.search || supabaseUrl.hash || supabaseUrl.pathname !== '/') throw new Error('Set VITE_SUPABASE_URL to the portal Supabase HTTPS origin.');
if (!publicKey) throw new Error('Set VITE_SUPABASE_PUBLISHABLE_KEY.');
if (!publicKey.startsWith('sb_publishable_')) {
  let claims;
  try { claims = JSON.parse(Buffer.from(publicKey.split('.')[1], 'base64url').toString()); } catch { /* Reject all keys except public anon/publishable keys. */ }
  if (claims?.role !== 'anon') throw new Error('Only a public Supabase publishable or anon key may be bundled.');
}
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
const files = ['background.js', 'assisted.js', 'assisted-page.js', 'capture.js', 'original.js', 'archive-store.js', 'selectable.js', 'selectable-ui.js', 'client.js', 'review.js', 'review.html', 'review.css'];
for (const filename of files) fs.copyFileSync(path.join(root, 'src', filename), path.join(dist, filename));
fs.writeFileSync(path.join(dist, 'config.js'), 'export default ' + JSON.stringify({ supabaseUrl: supabaseUrl.origin, publicKey, portalUrl: 'http://127.0.0.1:5173' }, null, 2) + ';\n');
fs.writeFileSync(path.join(dist, 'manifest.json'), JSON.stringify({
  manifest_version: 3, name: 'AI Explanation Evaluation — Save ChatGPT', version, minimum_chrome_version: '116',
  description: 'Preview and save the loaded ChatGPT page HTML to your evaluation portal for later cleanup.',
  permissions: ['activeTab', 'scripting', 'storage', 'pageCapture'], host_permissions: [supabaseUrl.origin + '/*', 'http://127.0.0.1:8766/*'],
  background: { service_worker: 'background.js', type: 'module' }, action: { default_title: 'Save ChatGPT conversation' },
  content_security_policy: { extension_pages: "script-src 'self'; object-src 'none'; base-uri 'none'" },
}, null, 2) + '\n');
// Audit the actual distributable, not just the source/config object.
const output = fs.readdirSync(dist);
if (output.some(filename => ![...files, 'manifest.json', 'config.js'].includes(filename))) throw new Error('Unexpected file in dist; review before packaging.');
for (const filename of output) {
  const contents = fs.readFileSync(path.join(dist, filename), 'utf8');
  if (/sb_secret_|SUPABASE_SERVICE_ROLE_KEY|SUPABASE_ACCESS_TOKEN|-----BEGIN .*PRIVATE KEY/.test(contents)) throw new Error('Private credential material found in distributable.');
}
console.log('Built chatgpt-conversation-extension/dist (public configuration only).');
