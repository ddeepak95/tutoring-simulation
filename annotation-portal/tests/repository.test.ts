import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { buildRepositoryCatalog, syncRepositoryCatalog, CATALOG_PATH } from '../scripts/repository-catalog.mjs';
import { addRepositoryConversations, prepareRepositoryConversation, resolveRepositoryAdmin } from '../scripts/repository-conversations.mjs';

const roots: string[] = [];
const run = '20260930T200335588721Z';
const input = { conversation_id: '12345678-1234-4234-8234-123456789012', metadata: { topic_english_name: 'Covalent radius', native_language: 'Tamil' }, messages: [
  { turn_id: 'original_tutor', speaker: 'tutor', text: 'தமிழ் 😀 74 pm\n**H₂** = x + 1.\nRepeat? Repeat?' },
  { turn_id: 'original_student', speaker: 'student', text: 'ஏன்?' }
] };
function fixture() {
  const repositoryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-repository-')); roots.push(repositoryRoot);
  const folder = path.join(repositoryRoot, 'simulated-conversation-openrouter/outputs', run, 'topic__ta'); fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'conversation.json'), JSON.stringify(input, null, 2));
  return { repositoryRoot, folder };
}
afterEach(() => { for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true }); });

describe('repository conversation discovery and sync', () => {
  it('keeps originals exact and distinct from reviewed translations, excluding drafts, turns and evaluations', () => {
    const { repositoryRoot, folder } = fixture();
    const originalBytes = fs.readFileSync(path.join(folder, 'conversation.json'));
    const translated = { ...input, conversation_id: '23456789-1234-4234-8234-123456789012', source_conversation_id: input.conversation_id, metadata: { ...input.metadata, native_language: 'English' }, messages: input.messages.map(message => ({ ...message, text: 'English' })) };
    for (const filename of ['conversation.english.json', 'conversation.comparative.english.json', 'conversation.comparative.english.draft.json', 'evaluation.json']) fs.writeFileSync(path.join(folder, filename), JSON.stringify(translated));
    fs.mkdirSync(path.join(folder, 'turns')); fs.writeFileSync(path.join(folder, 'turns/01-tutor.json'), JSON.stringify(input));
    const result = buildRepositoryCatalog({ repositoryRoot, runIds: [run] });
    expect(result.catalog.entries).toHaveLength(2); expect(result.skipped).toEqual([]);
    expect(result.catalog.entries.map((entry: any) => entry.version)).toEqual(['Original', 'Reviewed English translation']);
    expect(result.catalog.entries.map((entry: any) => entry.original_language)).toEqual(['Tamil', 'Tamil']);
    expect(result.catalog.entries.map((entry: any) => entry.language)).toEqual(['Tamil', 'English']);
    expect(new Set(result.catalog.entries.map((entry: any) => entry.id)).size).toBe(2);
    expect(result.files[0].bytes.equals(originalBytes)).toBe(true);
    expect(fs.readFileSync(path.join(folder, 'conversation.json')).equals(originalBytes)).toBe(true);
    const unchanged = buildRepositoryCatalog({ repositoryRoot, runIds: [run] }); expect(unchanged.catalog.entries.map((entry: any) => entry.id)).toEqual(result.catalog.entries.map((entry: any) => entry.id));
    fs.writeFileSync(path.join(folder, 'conversation.json'), JSON.stringify({ ...input, messages: [{ ...input.messages[0], text: 'Changed' }] }));
    expect(buildRepositoryCatalog({ repositoryRoot, runIds: [run] }).catalog.entries[0].id).not.toBe(result.catalog.entries[0].id);
  });

  it('requires explicit runs, blocks traversal, reports malformed files, and can discover all runs', () => {
    const { repositoryRoot, folder } = fixture();
    expect(() => buildRepositoryCatalog({ repositoryRoot, runIds: [] })).toThrow(/Specify/);
    expect(() => buildRepositoryCatalog({ repositoryRoot, runIds: ['../../outside'] })).toThrow(/Run IDs/);
    fs.writeFileSync(path.join(folder, 'conversation.english.json'), '{invalid');
    const result = buildRepositoryCatalog({ repositoryRoot, allRuns: true }); expect(result.catalog.entries).toHaveLength(1); expect(result.skipped[0].reason).toBe('Source is not valid JSON.');
    expect(() => buildRepositoryCatalog({ repositoryRoot, runIds: [run], allRuns: true })).toThrow(/not both/);
  });

  it('syncs immutable source bytes privately and merges the catalog without dropping previous entries', async () => {
    const result = buildRepositoryCatalog({ ...fixture(), runIds: [run] });
    const prior = { ...result.catalog.entries[0], id: 'f'.repeat(64), storage_path: `repository/files/${'f'.repeat(64)}.json` };
    const storage = { download: vi.fn().mockResolvedValue({ data: new Blob([JSON.stringify({ ...result.catalog, entries: [prior] })]), error: null }), upload: vi.fn().mockResolvedValue({ error: null }) };
    const client = { storage: { from: vi.fn().mockReturnValue(storage) } };
    expect(await syncRepositoryCatalog({ client, ...result })).toEqual({ synced: 1, available: 2 });
    expect(client.storage.from).toHaveBeenCalledWith('transcripts');
    expect(storage.upload.mock.calls[0][1].equals(result.files[0].bytes)).toBe(true); expect(storage.upload.mock.calls[0][2].upsert).toBe(false);
    expect(storage.upload.mock.calls[1][0]).toBe(CATALOG_PATH); expect(storage.upload.mock.calls[1][2].upsert).toBe(true);
    expect(JSON.parse(storage.upload.mock.calls[1][1]).entries).toHaveLength(2);
    storage.upload.mockReset().mockResolvedValueOnce({ error: { statusCode: '409' } }).mockResolvedValueOnce({ error: null });
    await expect(syncRepositoryCatalog({ client, ...result })).resolves.toEqual({ synced: 1, available: 2 });
  });

  it('does not publish a catalog after an upload failure or unreadable prior catalog', async () => {
    const result = buildRepositoryCatalog({ ...fixture(), runIds: [run] });
    const storage = { download: vi.fn().mockResolvedValue({ data: null, error: { statusCode: '404' } }), upload: vi.fn().mockResolvedValue({ error: { statusCode: '500' } }) };
    const client = { storage: { from: vi.fn().mockReturnValue(storage) } };
    await expect(syncRepositoryCatalog({ client, ...result })).rejects.toThrow(/catalog was not replaced/); expect(storage.upload).toHaveBeenCalledTimes(1);
    storage.upload.mockClear(); storage.download.mockResolvedValue({ data: null, error: { statusCode: '403' } });
    await expect(syncRepositoryCatalog({ client, ...result })).rejects.toThrow(/Could not read/); expect(storage.upload).not.toHaveBeenCalled();
  });
});

describe('direct repository registration', () => {
  const adminId = '00000000-0000-4000-8000-000000000001';
  function mockAdd() {
    const built = buildRepositoryCatalog({ ...fixture(), runIds: [run] });
    const rows: any[] = []; let failNext = false;
    const insert = vi.fn(async (row: any) => {
      if (failNext) { failNext = false; return { error: { code: 'offline' } }; }
      rows.push(structuredClone(row)); return { error: null };
    });
    const client = { from: vi.fn().mockImplementation(() => ({ select: () => ({ eq: (_: string, sourcePath: string) => ({ maybeSingle: async () => ({ data: rows.find(row => row.source_path === sourcePath) || null, error: null }) }) }), insert })) };
    return { built, rows, client, insert, fail: () => { failNext = true; } };
  }
  it('adds source conversations directly with canonical IDs, exact turns, metadata, and administrator attribution', async () => {
    const mock = mockAdd(); const result = await addRepositoryConversations({ client: mock.client, files: mock.built.files, adminId });
    expect(result).toEqual({ added: 1, already_present: 0 });
    const row = mock.rows[0]; expect(row.id).toBe(input.conversation_id); expect(row.created_by).toBe(adminId);
    expect(row.transcript.messages).toEqual(input.messages); expect(row.transcript.conversation_id).toBe(input.conversation_id);
    expect(row.transcript.topic_english_name).toBe('Covalent radius'); expect(row.transcript.original_language).toBe('Tamil');
    expect(row.source_path).toBe(mock.built.files[0].entry.storage_path); expect(row.transcript.repository_source.file_sha256).toBe(mock.built.files[0].entry.file_sha256);
    expect(row.transcript.repository_source.original_conversation_id).toBe(input.conversation_id);
  });
  it('skips repeat syncs without overwriting records or annotations, and allows deliberate resync after deletion', async () => {
    const mock = mockAdd(); const options = { client: mock.client, files: mock.built.files, adminId };
    await addRepositoryConversations(options); mock.rows[0].assignment_marker = 'keep work';
    expect(await addRepositoryConversations(options)).toEqual({ added: 0, already_present: 1 });
    expect(mock.insert).toHaveBeenCalledTimes(1); expect(mock.rows[0].assignment_marker).toBe('keep work');
    mock.rows.splice(0); expect(await addRepositoryConversations(options)).toEqual({ added: 1, already_present: 0 });
  });
  it('rejects corrupted sources and duplicate version IDs before database changes, reports partial failures, and retries safely', async () => {
    const mock = mockAdd(); const original = mock.built.files[0];
    expect(() => prepareRepositoryConversation(original.entry, Buffer.from('corrupt'), adminId)).toThrow(/no longer match/);
    expect(() => prepareRepositoryConversation({ ...original.entry, turn_count: 20 }, original.bytes, adminId)).toThrow(/turn count/);
    await expect(addRepositoryConversations({ client: mock.client, files: [original, original], adminId })).rejects.toThrow(/own conversation ID/); expect(mock.client.from).not.toHaveBeenCalled();
    mock.fail(); await expect(addRepositoryConversations({ client: mock.client, files: [original], adminId })).rejects.toThrow(/0 added.*before the failure/);
    expect(mock.rows).toHaveLength(0); expect(await addRepositoryConversations({ client: mock.client, files: [original], adminId })).toEqual({ added: 1, already_present: 0 });
    mock.rows[0].transcript.conversation_id = 'unexpected';
    await expect(addRepositoryConversations({ client: mock.client, files: [original], adminId })).rejects.toThrow(/identity mismatch/);
  });
  it('checks administrator attribution and requires an explicit username for ambiguous admin accounts', async () => {
    const data = [{ id: adminId, username: 'admin' }, { id: 'another', username: 'manager' }];
    const client = { from: () => ({ select: () => ({ eq: async () => ({ data, error: null }) }) }) };
    await expect(resolveRepositoryAdmin(client)).rejects.toThrow(/multiple administrators/);
    expect(await resolveRepositoryAdmin(client, 'Admin')).toBe(adminId);
    await expect(resolveRepositoryAdmin(client, 'missing')).rejects.toThrow(/must identify/);
    await expect(addRepositoryConversations({ client, files: [], adminId: null })).rejects.toThrow(/administrator is required/);
  });
});
