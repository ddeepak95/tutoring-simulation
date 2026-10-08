import crypto from 'node:crypto';
import C from '../src/generated/core.js';

export function prepareRepositoryConversation(entry, bytes, adminId) {
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  if (hash !== entry.file_sha256) throw new Error('Source bytes no longer match the repository catalog.');
  const raw = JSON.parse(bytes.toString('utf8')); const input = raw.conversation || raw;
  const normalized = C.normalizeConversation({ ...input, learning_topic: entry.topic }, entry.label);
  if (!normalized.conversation_id || normalized.conversation_id !== entry.source_conversation_id || normalized.messages.length !== entry.turn_count) throw new Error('Source conversation ID or turn count no longer matches the catalog.');
  const transcript = { ...normalized, label: entry.label,
    topic_english_name: input.topic_english_name || input.metadata?.topic_english_name || entry.topic_english_name || (entry.language === 'English' ? entry.topic : null),
    source_conversation_id: input.source_conversation_id || null,
    original_language: entry.original_language || input.translation?.original_language || (entry.version === 'Original' ? entry.language : null),
    repository_source: { run_id: entry.run_id, relative_path: entry.source_relative_path, original_conversation_id: normalized.conversation_id, file_sha256: hash, version: entry.version, language: entry.language, topic_id: entry.topic_id }
  };
  const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(normalized.conversation_id);
  return { ...(uuid ? { id: normalized.conversation_id } : {}), label: entry.label, language: entry.language, transcript, source_path: entry.storage_path, created_by: adminId };
}

export async function resolveRepositoryAdmin(client, username) {
  const { data, error } = await client.from('profiles').select('id, username').eq('role', 'admin');
  if (error || !Array.isArray(data)) throw new Error('Could not verify the portal administrator.');
  const admins = username ? data.filter(profile => profile.username === username.trim().toLowerCase()) : data;
  if (admins.length !== 1) throw new Error(username ? 'The supplied --admin username must identify a portal administrator.' : 'Use --admin USERNAME when the portal has multiple administrators. Provision an admin if none exists.');
  return admins[0].id;
}

export async function addRepositoryConversations({ client, files, adminId }) {
  if (!adminId) throw new Error('A verified portal administrator is required.');
  // Validate every source before creating any records.
  const records = files.map(({ entry, bytes }) => ({ entry, row: prepareRepositoryConversation(entry, bytes, adminId) }));
  const seen = new Set();
  for (const { row } of records) {
    if (seen.has(row.transcript.conversation_id)) throw new Error('Each repository original and translation must have its own conversation ID.');
    seen.add(row.transcript.conversation_id);
  }
  let added = 0, alreadyPresent = 0;
  async function existingSource(row) {
    const { data, error } = await client.from('conversations').select('id, transcript').eq('source_path', row.source_path).maybeSingle();
    if (error) throw new Error('Could not check an existing conversation.');
    if (data && (data.transcript?.conversation_id !== row.transcript.conversation_id || (row.id && data.id !== row.id))) throw new Error('The stored source has a different conversation ID. Resolve the identity mismatch before syncing.');
    return data;
  }
  for (const { entry, row } of records) {
    try {
      if (await existingSource(row)) { alreadyPresent++; continue; }
      const { error } = await client.from('conversations').insert(row);
      if (error?.code === '23505' && await existingSource(row)) { alreadyPresent++; continue; }
      if (error?.code === '23505') throw new Error('This conversation ID is already in use by a different source. Assign a unique ID to a deliberately changed version.');
      if (error) throw new Error('Could not add the conversation to the portal. Retry syncing; completed records will be skipped.');
      added++;
    } catch (error) {
      throw new Error(`${entry.source_relative_path}: ${error.message} ${added} added and ${alreadyPresent} already present before the failure.`);
    }
  }
  return { added, already_present: alreadyPresent };
}
