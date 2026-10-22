import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const portal = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const capture = path.resolve(portal, '../agentic_conversation_capture');
if (fs.existsSync(path.join(portal, '.env.local'))) process.loadEnvFile(path.join(portal, '.env.local'));
const quote = value => `'${String(value).replaceAll("'", "''")}'`;

try {
  const args = process.argv.slice(2);
  const expected = args.includes('--project') ? args[args.indexOf('--project') + 1] : null;
  const url = new URL(process.env.VITE_SUPABASE_URL);
  const ref = url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!expected || ref !== expected || !token) throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');
  const languages = JSON.parse(fs.readFileSync(path.join(capture, 'languages.json'), 'utf8'));
  const topics = JSON.parse(fs.readFileSync(path.join(capture, 'topics.json'), 'utf8'));
  if (!Array.isArray(topics) || !topics.length || !languages.en || !languages.ta) throw new Error('Invalid topic or language catalog.');
  const ids = new Set();
  const statements = [];
  for (const [id, entry] of Object.entries(languages)) {
    if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/.test(id) || !entry?.name?.trim()) throw new Error(`Invalid language key: ${id}`);
    statements.push(`insert into public.languages(id,name) values(${quote(id)},${quote(entry.name.trim())}) on conflict(id) do update set name=excluded.name`);
  }
  for (const topic of topics) {
    const id = topic?.['topic-id'], name = topic?.['topic-name'];
    if (typeof id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id) || typeof name !== 'string' || !name.trim()) throw new Error(`Invalid or duplicate topic ID: ${id}`);
    ids.add(id);
    const keys = Object.keys(topic).filter(key => !['topic-id', 'topic-name'].includes(key));
    if (!keys.includes('en')) throw new Error(`Topic ${id} needs an English title.`);
    statements.push(`insert into public.topics(id,name) values(${quote(id)},${quote(name.trim())}) on conflict(id) do update set name=excluded.name`);
    for (const key of keys) {
      if (!languages[key] || typeof topic[key]?.title !== 'string' || !topic[key].title.trim()) throw new Error(`Topic ${id} has an unsupported language key or missing title: ${key}`);
      statements.push(`insert into public.topic_titles(topic_id,language_id,title) values(${quote(id)},${quote(key)},${quote(topic[key].title.trim())}) on conflict(topic_id,language_id) do update set title=excluded.title`);
    }
  }
  if (!ids.has('covalent-radius')) throw new Error('The canonical covalent-radius topic is missing.');
  async function request(endpoint, body) {
    const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/${endpoint}`, {
      method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error(`Supabase Management API returned HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return response.json();
  }
  const sql = fs.readFileSync(path.join(portal, 'supabase/migrations/202610210015_topic_catalog.sql'), 'utf8');
  const prefix = 'annotation_portal_202610210015_';
  const name = prefix + crypto.createHash('sha256').update(sql).digest('hex').slice(0, 16);
  const history = await request('database/migrations');
  if (history.some(item => item.name?.startsWith(prefix) && item.name !== name)) throw new Error('Different topic catalog migration fingerprint recorded; review required.');
  const exists = history.some(item => item.name === name);
  if (!exists) await request('database/migrations', { query: sql, name });
  await request('database/query', { query: `begin; ${statements.join('; ')}; update public.conversations set topic_id=topic_id; commit;` });
  const languageSql = fs.readFileSync(path.join(portal, 'supabase/migrations/202610210016_language_catalog.sql'), 'utf8');
  const languagePrefix = 'annotation_portal_202610210016_';
  const languageName = languagePrefix + crypto.createHash('sha256').update(languageSql).digest('hex').slice(0, 16);
  if (history.some(item => item.name?.startsWith(languagePrefix) && item.name !== languageName)) throw new Error('Different language catalog migration fingerprint recorded; review required.');
  const languageExists = history.some(item => item.name === languageName);
  if (!languageExists) await request('database/migrations', { query: languageSql, name: languageName });
  const serviceSql = fs.readFileSync(path.join(portal, 'supabase/migrations/202610210017_topic_catalog_service_read.sql'), 'utf8');
  const servicePrefix = 'annotation_portal_202610210017_';
  const serviceName = servicePrefix + crypto.createHash('sha256').update(serviceSql).digest('hex').slice(0, 16);
  if (history.some(item => item.name?.startsWith(servicePrefix) && item.name !== serviceName)) throw new Error('Different topic view permission migration fingerprint recorded; review required.');
  const serviceExists = history.some(item => item.name === serviceName);
  if (!serviceExists) await request('database/migrations', { query: serviceSql, name: serviceName });
  const rows = await request('database/query', { query: `select count(*)::integer as missing from public.conversations where topic_id is null and coalesce(transcript->>'topic_id',transcript->'repository_source'->>'topic_id') is not null`, read_only: true });
  if (rows.length !== 1 || rows[0].missing !== 0) throw new Error('Conversation topic backfill verification failed.');
  const catalogRows = await request('database/query', { query: `select (select jsonb_agg(id order by id) from public.languages) as languages, (select jsonb_agg(id order by id) from public.topics) as topics, (select count(*)::integer from public.topic_titles) as title_count`, read_only: true });
  const expectedLanguages = Object.keys(languages).sort();
  const expectedTopics = [...ids].sort();
  const expectedTitleCount = topics.reduce((sum, topic) => sum + Object.keys(topic).filter(key => languages[key]).length, 0);
  if (catalogRows.length !== 1 || JSON.stringify(catalogRows[0].languages) !== JSON.stringify(expectedLanguages) || JSON.stringify(catalogRows[0].topics) !== JSON.stringify(expectedTopics) || catalogRows[0].title_count !== expectedTitleCount) throw new Error('Database catalog has extra or missing language/topic keys. Review entries before removing referenced catalog rows.');
  console.log(JSON.stringify({ project: ref, schema: exists ? 'already_applied' : 'applied', language_constraints: languageExists ? 'already_applied' : 'applied', topics: topics.length, languages: Object.keys(languages).length, verified: true }));
} catch (error) { console.error(error.message); process.exitCode = 1; }
