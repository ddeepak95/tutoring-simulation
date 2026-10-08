import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import C from '../src/generated/core.js';

export const CATALOG_PATH = 'repository/catalog.json';
export const CATALOG_FORMAT = 'annotation-portal-repository/1.0';
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const languages = { en: 'English', ta: 'Tamil' };

export function buildRepositoryCatalog({ repositoryRoot, runIds, allRuns = false }) {
  const outputs = path.join(repositoryRoot, 'simulated-conversation-openrouter/outputs');
  const topicsPath = path.join(repositoryRoot, 'simulated-conversation-openrouter/config/topic.json');
  const englishTopics = new Map((fs.existsSync(topicsPath) ? JSON.parse(fs.readFileSync(topicsPath, 'utf8')) : []).map(topic => [topic.topic_id, topic.terminology?.en]));
  if (allRuns && runIds?.length) throw new Error('Choose --run or --all-runs, not both.');
  if (!allRuns && !runIds?.length) throw new Error('Specify at least one --run, or explicitly use --all-runs.');
  const runs = allRuns ? fs.readdirSync(outputs, { withFileTypes: true }).filter(entry => entry.isDirectory() && /^\d{8}T\d+Z$/.test(entry.name)).map(entry => entry.name) : [...new Set(runIds)];
  const entries = [], files = [], skipped = [];
  for (const run of runs.sort()) {
    if (!/^\d{8}T\d+Z$/.test(run)) throw new Error('Run IDs must name a timestamped output directory.');
    const runPath = path.join(outputs, run);
    if (fs.lstatSync(runPath).isSymbolicLink() || !fs.statSync(runPath).isDirectory()) throw new Error('Run directories must be real directories inside outputs.');
    for (const directory of fs.readdirSync(runPath, { withFileTypes: true }).filter(entry => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
      const folder = path.join(runPath, directory.name);
      // Prefer the reviewed translation. Drafts, turn fragments, and evaluations are excluded.
      const translated = fs.existsSync(path.join(folder, 'conversation.comparative.english.json')) ? 'conversation.comparative.english.json' : 'conversation.english.json';
      for (const name of ['conversation.json', translated]) {
        const filename = path.join(folder, name);
        if (!fs.existsSync(filename)) continue;
        const sourceRelativePath = path.relative(repositoryRoot, filename).split(path.sep).join('/');
        try {
          const stat = fs.lstatSync(filename);
          if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Source must be a regular file.');
          if (stat.size > 2097152) throw new Error('Source exceeds 2 MB.');
          const bytes = fs.readFileSync(filename);
          const raw = JSON.parse(bytes.toString('utf8')); const input = raw.conversation || raw;
          const topic = input.learning_topic || input.configuration?.topic_name || input.metadata?.topic_english_name || input.metadata?.topic_native_name || directory.name.split('__')[0];
          const original = name === 'conversation.json';
          const language = original ? input.configuration?.language || input.metadata?.native_language || languages[input.configuration?.language_code || directory.name.split('__').at(-1)] || 'Unspecified' : 'English';
          const version = original ? 'Original' : name.includes('comparative') ? 'Reviewed English translation' : 'English translation';
          const normalized = C.normalizeConversation({ ...input, learning_topic: topic });
          const originalInput = original ? input : JSON.parse(fs.readFileSync(path.join(folder, 'conversation.json'), 'utf8'));
          const sourceInput = originalInput.conversation || originalInput;
          const original_language = sourceInput.configuration?.language || sourceInput.metadata?.native_language || languages[sourceInput.configuration?.language_code || directory.name.split('__').at(-1)] || 'Unspecified';
          const topic_english_name = input.topic_english_name || input.metadata?.topic_english_name || englishTopics.get(input.configuration?.topic_id || directory.name.split('__')[0]) || (language === 'English' ? topic : null);
          const file_sha256 = digest(bytes); const id = digest(sourceRelativePath + '\0' + file_sha256);
          if (!normalized.conversation_id) throw new Error('Assign a conversation_id in the source file before syncing.');
          const entry = { id, label: `${topic} — ${original ? `${language} original` : version} · ${String(normalized.conversation_id).slice(0, 8)}`, run_id: run, topic, topic_english_name, topic_id: input.configuration?.topic_id || directory.name.split('__')[0], language, original_language, version, turn_count: normalized.messages.length, source_relative_path: sourceRelativePath, source_conversation_id: normalized.conversation_id, file_sha256, storage_path: `repository/files/${id}.json` };
          entries.push(entry); files.push({ entry, bytes });
        } catch (error) { skipped.push({ source_relative_path: sourceRelativePath, reason: error instanceof SyntaxError ? 'Source is not valid JSON.' : error.message }); }
      }
    }
  }
  return { catalog: { format_version: CATALOG_FORMAT, generated_at: new Date().toISOString(), entries }, files, skipped };
}

export async function syncRepositoryCatalog({ client, catalog, files, replaceIdentities = false }) {
  const storage = client.storage.from('transcripts');
  const { data: previous, error: readError } = await storage.download(CATALOG_PATH);
  let priorEntries = [];
  if (readError && !['404', 'not_found'].includes(String(readError.statusCode || readError.code))) throw new Error('Could not read the private repository catalog.');
  if (previous) {
    const prior = JSON.parse(await previous.text());
    if (prior.format_version !== CATALOG_FORMAT || !Array.isArray(prior.entries)) throw new Error('Existing repository catalog has an unsupported format.');
    priorEntries = prior.entries;
  }
  for (const { entry, bytes } of files) {
    const { error } = await storage.upload(entry.storage_path, bytes, { contentType: 'application/json', cacheControl: '0', upsert: false });
    if (error && !['409', 'Duplicate'].includes(String(error.statusCode || error.code))) throw new Error(`Could not sync ${entry.source_relative_path}. The catalog was not replaced.`);
  }
  const replacedPaths = new Set(catalog.entries.map(entry => entry.source_relative_path));
  const merged = new Map(priorEntries.filter(entry => !replaceIdentities || !replacedPaths.has(entry.source_relative_path)).map(entry => [entry.id, entry]));
  for (const entry of catalog.entries) merged.set(entry.id, entry);
  const published = { ...catalog, entries: [...merged.values()].sort((a, b) => b.run_id.localeCompare(a.run_id) || a.label.localeCompare(b.label)) };
  const { error } = await storage.upload(CATALOG_PATH, JSON.stringify(published, null, 2), { contentType: 'application/json', cacheControl: '0', upsert: true });
  if (error) throw new Error('Could not publish the private repository catalog.');
  return { synced: files.length, available: published.entries.length };
}
