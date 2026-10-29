import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { prepareLocalProject } from './supabase-local-bootstrap.mjs';
import pg from 'pg';
const root = path.resolve(import.meta.dirname, '..');
const binary = path.join(root, 'node_modules/supabase/dist/supabase.js');
const action = process.argv[2] || 'start';
if (!['start', 'stop', 'status'].includes(action)) throw new Error('Use start, stop or status.');
try {
  const workdir = prepareLocalProject(root);
  // Capture CLI status: its output includes service-role credentials.
  if (action !== 'status') execFileSync(process.execPath, [binary, action, '--workdir', workdir], { cwd: root, stdio: ['ignore', 'pipe', 'inherit'], maxBuffer: 16 * 1024 * 1024 });
  if (action === 'stop') { console.log('Local Supabase stopped; data volumes retained.'); process.exit(0); }
  const status = JSON.parse(execFileSync(process.execPath, [binary, 'status', '--workdir', workdir, '-o', 'json'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' }));
  const file = path.join(root, '.env.local');
  let contents = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const values = { SUPABASE_LOCAL_URL: status.API_URL, SUPABASE_LOCAL_PUBLISHABLE_KEY: status.ANON_KEY,
    SUPABASE_LOCAL_SERVICE_ROLE_KEY: status.SERVICE_ROLE_KEY, SUPABASE_LOCAL_DB_URL: status.DB_URL };
  for (const [name, value] of Object.entries(values)) {
    if (!value) throw new Error(`Local Supabase did not return ${name}.`);
    const line = `${name}=${value}`;
    contents = new RegExp(`^${name}=.*$`, 'm').test(contents) ? contents.replace(new RegExp(`^${name}=.*$`, 'm'), () => line) : contents.trimEnd() + '\n' + line + '\n';
  }
  fs.writeFileSync(file, contents, { mode: 0o600 });
  const db = new pg.Client({ connectionString: status.DB_URL });
  await db.connect();
  try {
    // Restarting after a cloud copy preserves its catalog exactly.
    await db.query('begin');
    const { rows } = await db.query('select count(*)::int as count from public.languages');
    if (!rows[0].count) {
      const languages = JSON.parse(fs.readFileSync(path.resolve(root, '../agentic_conversation_capture/languages.json'), 'utf8'));
      const topics = JSON.parse(fs.readFileSync(path.resolve(root, '../agentic_conversation_capture/topics.json'), 'utf8'));
      for (const [id, language] of Object.entries(languages)) await db.query('insert into public.languages(id,name) values($1,$2)', [id, language.name]);
      for (const topic of topics) {
        await db.query('insert into public.topics(id,name) values($1,$2)', [topic['topic-id'], topic['topic-name']]);
        for (const [id, content] of Object.entries(topic)) if (languages[id]) await db.query('insert into public.topic_titles(topic_id,language_id,title) values($1,$2,$3)', [topic['topic-id'], id, content.title]);
      }
    }
    await db.query('commit');
  } catch (error) { await db.query('rollback'); throw error; }
  finally { await db.end(); }
  console.log(`Local Supabase ready: ${status.API_URL}\nStudio: ${status.STUDIO_URL}\nLocal credentials saved to ignored .env.local. Set SUPABASE_TARGET=local and restart the portal to use it.`);
} catch {
  console.error('Local Supabase command failed. Check Docker Desktop and port availability. Diagnose with: npx supabase start --workdir .runtime/supabase-local');
  process.exitCode = 1;
}
