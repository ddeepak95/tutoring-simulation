import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { C, bundledRubric } from '../src/lib';

const admin = '00000000-0000-4000-8000-000000000001';
const alice = '00000000-0000-4000-8000-000000000002';
const bob = '00000000-0000-4000-8000-000000000003';
const source = '058c1f12-8046-4a9d-ba3f-a29d558fcbf0';
let db: PGlite;
let imported: string;
function capture() {
  return { format_version: 'chatgpt-portal-capture/1', source: { conversation_id: source, url: 'https://chatgpt.com/c/' + source }, title: 'Evaporation', topic: 'ஆவியாதல்', language: 'Tamil', captured_at: new Date().toISOString(), extractor_version: 'dom-scroll-v1.0.0',
    report: { complete: true, top_reached: true, bottom_reached: true, consistent_passes: true, message_count: 2, limitations: [] },
    messages: [{ id: 'user-1', role: 'user', content: 'Explain evaporation.' }, { id: 'assistant-1', role: 'assistant', content: '## ஆவியாதல்\n\nWater changes into vapour.\n\n$E = mc^2$' }] };
}
async function asUser(id: string, role = 'authenticated') { await db.exec(`reset role; set role ${role}; select set_config('request.jwt.claim.sub','${id}',false);`); }
async function save(value: unknown = capture()) {
  return (await db.query<{ result: { conversation_id: string; created: boolean; snapshot_sha256: string } }>('select public.import_chatgpt_conversation($1::jsonb) as result', [JSON.stringify(value)])).rows[0].result;
}
beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create schema storage; create table auth.users(id uuid primary key,email text); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema public,auth,storage to anon,authenticated,service_role; grant execute on function auth.uid() to authenticated; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint); create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text); alter table storage.objects enable row level security; grant select,insert,delete on storage.objects to authenticated;`);
  for (const migration of ['202610080001_portal.sql', '202610090001_turn_ratings_issues.sql', '202610080002_conversation_ids.sql', '202610080003_conversation_deletion.sql', '202610110003_comparison_mode.sql', '202610160001_chatgpt_import.sql', '202610160002_chatgpt_html_archives.sql', '202610160003_archive_preparation.sql', '202610180001_html_archive_deletion.sql', '202610190003_direct_chatgpt_capture.sql']) await db.exec(fs.readFileSync('supabase/migrations/' + migration, 'utf8'));
  await db.query('insert into auth.users(id,email) values($1,$2),($3,$4),($5,$6)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid', bob, 'bob@users.annotation.invalid']);
  await db.exec(`update public.profiles set role='admin' where id='${admin}'`);
});

afterAll(async () => { await db?.close(); });

describe.sequential('HTML archives without parsed turns', () => {
  const archive = () => ({ format_version: 'chatgpt-html-archive/1', source: { conversation_id: source, url: 'https://chatgpt.com/c/' + source }, title: 'HTML capture', topic: 'Evaporation', language: 'Tamil', captured_at: new Date().toISOString(), extractor_version: 'page-html-v1.1.0', html: '<html><body><nav>Sidebar</nav><main>தமிழ் <table><tr><td>Water</td></tr></table></main></body></html>', text: 'Sidebar\nதமிழ்\nWater', report: { scope: 'loaded-page', history_verified: false, limitations: ['Loaded page only'] } });
  async function saveHtml(value: unknown = archive()) {
    return (await db.query<{ result: { archive_id: string; created: boolean } }>('select public.save_chatgpt_html_archive($1::jsonb) as result', [JSON.stringify(value)])).rows[0].result;
  }
  it('saves lossless archives, serializes retries, and keeps them out of assignment transcripts', async () => {
    await asUser(alice);
    const before = (await db.query('select * from public.conversations')).rows.length;
    const input = archive(); const first = await saveHtml(input);
    expect(first.created).toBe(true);
    const retries = await Promise.all([saveHtml(input), saveHtml({ ...input, captured_at: '2026-01-01T00:00:00Z' })]);
    expect(retries.every(row => row.archive_id === first.archive_id && !row.created)).toBe(true);
    const row = (await db.query<any>('select * from public.chatgpt_html_archives where id=$1', [first.archive_id])).rows[0];
    expect(row.html).toBe(input.html); expect(row.page_text).toBe(input.text); expect(row.imported_by).toBe(alice);
    expect((await db.query('select * from public.conversations')).rows.length).toBe(before);
    expect((await saveHtml({ ...input, html: input.html + '<p>Changed</p>' })).archive_id).not.toBe(first.archive_id);
  });
  it('enforces ownership, authenticated roles, and immutable archives', async () => {
    await asUser('', 'anon'); await expect(saveHtml()).rejects.toThrow(/permission/);
    await asUser(bob); expect((await db.query('select * from public.chatgpt_html_archives')).rows).toHaveLength(0);
    await expect(db.query("insert into public.chatgpt_html_archives(title) values('Bypass')")).rejects.toThrow(/permission/);
    await asUser(admin); expect((await db.query('select * from public.chatgpt_html_archives')).rows.length).toBeGreaterThan(0);
    await expect(db.exec("update public.chatgpt_html_archives set title='Changed'")).rejects.toThrow(/permission/);
    await expect(db.exec('delete from public.chatgpt_html_archives')).rejects.toThrow(/permission/);
  });
  it('rejects empty, malformed, oversized, and incorrectly labeled archives atomically', async () => {
    await asUser(alice);
    const before = (await db.query('select * from public.chatgpt_html_archives')).rows.length;
    for (const input of [null, {}, { ...archive(), html: '' }, { ...archive(), text: '' }, { ...archive(), title: '' }, { ...archive(), topic: null }, { ...archive(), captured_at: 'infinity' }, { ...archive(), messages: [] }, { ...archive(), report: { ...archive().report, history_verified: true } }, { ...archive(), source: { conversation_id: source, url: 'https://example.com/c/' + source } }, { ...archive(), html: 'a'.repeat(8388608) }]) await expect(saveHtml(input)).rejects.toThrow();
    expect((await db.query('select * from public.chatgpt_html_archives')).rows).toHaveLength(before);
  });
});

describe.sequential('ChatGPT snapshot imports', () => {
  it('rejects anonymous calls and does not grant annotators direct inserts', async () => {
    await asUser('', 'anon'); await expect(save()).rejects.toThrow(/permission/);
    await asUser(alice);
    await expect(db.query('insert into public.conversations(label,transcript) values($1,$2)', ['Bypass', { conversation_id: 'bypass', messages: [{ turn_id: 'one', speaker: 'tutor', text: 'Valid transcript' }] }])).rejects.toThrow(/row-level security/);
    await expect(db.query('insert into public.chatgpt_imports(conversation_id) values(gen_random_uuid())')).rejects.toThrow(/permission/);
  });
  it('imports text losslessly and preserves separate source provenance without an assignment', async () => {
    const input = capture();
    const result = await save(input); imported = result.conversation_id;
    expect(result.created).toBe(true); expect(result.snapshot_sha256).toMatch(/^[a-f0-9]{64}$/);
    const row = (await db.query<{ transcript: any; created_by: string; source_path: string | null }>('select * from public.conversations where id=$1', [imported])).rows[0];
    expect(row.created_by).toBe(alice); expect(row.source_path).toBeNull();
    expect(row.transcript.messages).toEqual(input.messages.map(m => ({ turn_id: m.id, speaker: m.role === 'assistant' ? 'tutor' : 'student', text: m.content })));
    expect(row.transcript.chatgpt_source.source_conversation_id).toBe(source);
    expect(row.transcript.source_conversation_id).toBeUndefined();
    expect(row.transcript.conversation_id).toBe(imported);
    expect(C.buildExport(row.transcript, [], bundledRubric.rubric, 'alice').conversation.chatgpt_source).toEqual(row.transcript.chatgpt_source);
    expect((await db.query('select * from public.assignments')).rows).toEqual([]);
    expect((await db.query('select * from public.chatgpt_imports')).rows).toHaveLength(1);
  });
  it('makes retries idempotent, including parallel attempts, but creates changed snapshots', async () => {
    const retry = capture(); retry.captured_at = '2026-01-01T00:00:00Z';
    const results = await Promise.all([save(retry), save(retry)]);
    expect(results.every(row => row.conversation_id === imported && !row.created)).toBe(true);
    const changed = capture(); changed.messages[1].content += '\nMore explanation.';
    expect((await save(changed)).conversation_id).not.toBe(imported);
    const metadata = capture(); metadata.topic = 'Another topic';
    expect((await save(metadata)).conversation_id).not.toBe(imported);
    expect((await db.query('select * from public.chatgpt_imports')).rows).toHaveLength(3);
  });
  it('isolates ownership and deduplication while allowing admins to review all imports', async () => {
    await asUser(bob);
    expect((await db.query('select * from public.chatgpt_imports')).rows).toHaveLength(0);
    expect((await db.query('select * from public.conversations')).rows).toHaveLength(0);
    expect((await save()).conversation_id).not.toBe(imported);
    await asUser(admin);
    expect((await db.query('select * from public.chatgpt_imports')).rows).toHaveLength(4);
    expect((await db.query('select * from public.conversations')).rows).toHaveLength(4);
    expect((await save()).created).toBe(true);
  });
  it('rejects malformed, oversized, incomplete, or unsafe captures without partial rows', async () => {
    await asUser(alice);
    const before = (await db.query('select * from public.conversations')).rows.length;
    const invalid: any[] = [null, {}, { ...capture(), title: '' }, { ...capture(), language: [] }, { ...capture(), topic: ' ' }, { ...capture(), captured_at: 'infinity' }, { ...capture(), source: { conversation_id: source, url: 'https://example.com/c/' + source } }, { ...capture(), report: { ...capture().report, complete: false } }, { ...capture(), report: { ...capture().report, message_count: 3 } }];
    const duplicate = capture(); duplicate.messages[1].id = duplicate.messages[0].id; invalid.push(duplicate);
    const role = capture(); role.messages[1].role = 'system'; invalid.push(role);
    const oversized = capture(); oversized.messages[1].content = 'x'.repeat(2097152); invalid.push(oversized);
    const empty = capture(); empty.messages[1].content = ' '; invalid.push(empty);
    for (const value of invalid) await expect(save(value)).rejects.toThrow();
    expect((await db.query('select * from public.conversations')).rows).toHaveLength(before);
    await expect(db.query('update public.conversations set label=$1 where id=$2', ['Changed', imported])).rejects.toThrow(/permission/);
  });
  it('allows normal annotation/comparison assignment and cascades provenance on deliberate admin deletion', async () => {
    await asUser(admin);
    await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2)', [bundledRubric.rubric_sha256, JSON.stringify(bundledRubric)]);
    await db.query('insert into public.assignments(conversation_id,annotator_id,rubric_hash) values($1,$2,$3)', [imported, bob, bundledRubric.rubric_sha256]);
    const other = (await save()).conversation_id;
    const q = [{ key: 'quality', label: 'Quality', description: 'Which response?', subsequent_only: false }];
    const comparison = await db.query('select public.create_comparison_assignment($1,$2,$3,$4::jsonb)', [imported, other, bob, JSON.stringify(q)]);
    expect(comparison.rows).toHaveLength(1);
    await asUser(bob);
    expect((await db.query('select id from public.conversations where id=$1', [imported])).rows).toHaveLength(1);
    // Receipt ownership is independent of assignment access.
    expect((await db.query('select * from public.chatgpt_imports where conversation_id=$1', [imported])).rows).toHaveLength(0);
    await asUser(admin);
    // This test uses the original deletion RPC; remove the comparison first as its later production migration does.
    await db.exec('reset role'); await db.query('delete from public.comparison_assignments where conversation_a_id=$1', [imported]);
    await asUser(admin);
    const preview = (await db.query<{ value: { snapshot: string } }>('select public.preview_conversation_deletion($1) as value', [imported])).rows[0].value;
    await db.query('select public.delete_conversation($1,$2)', [imported, preview.snapshot]);
    expect((await db.query('select * from public.chatgpt_imports where conversation_id=$1', [imported])).rows).toHaveLength(0);
  });
});

describe.sequential('reviewed HTML archive preparation', () => {
  let archiveId: string; let preparedId: string; let changedId: string;
  const turns = () => [{ turn_id: 'turn_0001', speaker: 'student', text: 'Explain water.', html: '<p>Explain water.</p>', source_ids: ['user-1'] }, { turn_id: 'turn_0002', speaker: 'tutor', text: 'தமிழ் 😀 Water becomes vapour.\nAdditional quiz question.', html: '<p>தமிழ் 😀 Water becomes <strong>vapour</strong>.</p><img src="data:image/png;base64,AA=="><section>Additional quiz question.</section>', source_ids: ['assistant-1', 'assisted-state-1'] }];
  const prepare = async (value: unknown = turns()) => (await db.query<{ result: { conversation_id: string; created: boolean } }>('select public.prepare_chatgpt_html_archive($1,$2::jsonb) as result', [archiveId, JSON.stringify(value)])).rows[0].result;
  it('prepares immutable transcript/assets atomically and serializes duplicate retries', async () => {
    await asUser(alice);
    const input = { format_version: 'chatgpt-html-archive/1', source: { conversation_id: source, url: 'https://chatgpt.com/c/' + source }, title: 'Preparation fixture', topic: 'Water', language: 'Tamil', captured_at: new Date().toISOString(), extractor_version: 'page-html-v1.7.1', html: '<p>Original archive bytes</p>', text: 'Original archive bytes', report: { scope: 'loaded-page', history_verified: false, limitations: [] } };
    archiveId = (await db.query<any>('select public.save_chatgpt_html_archive($1::jsonb) as value', [JSON.stringify(input)])).rows[0].value.archive_id;
    await asUser(admin);
    const before = (await db.query('select id from public.assignments')).rows.length;
    const first = await prepare(); preparedId = first.conversation_id; expect(first.created).toBe(true);
    const repeat = await Promise.all([prepare(), prepare()]); expect(repeat.every(result => !result.created && result.conversation_id === preparedId)).toBe(true);
    const conversation = (await db.query<any>('select transcript from public.conversations where id=$1', [preparedId])).rows[0].transcript;
    expect(conversation.messages).toEqual(turns().map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })));
    expect(conversation.archive_source.archive_id).toBe(archiveId); expect(conversation.archive_source.imported_by).toBe(alice); expect(conversation.archive_source.prepared_by).toBe(admin);
    expect(conversation.source_conversation_id).toBeUndefined();
    expect((await db.query<any>('select html from public.conversation_capture_assets where conversation_id=$1 order by turn_id', [preparedId])).rows.map(row => row.html)).toEqual(turns().map(turn => turn.html));
    expect((await db.query<any>('select html from public.chatgpt_html_archives where id=$1', [archiveId])).rows[0].html).toBe(input.html);
    expect((await db.query('select id from public.assignments')).rows).toHaveLength(before);
    const changed = turns(); changed[1].text += ' Reviewed correction.'; changed[1].html += '<p>Reviewed correction.</p>';
    changedId = (await prepare(changed)).conversation_id; expect(changedId).not.toBe(preparedId);
    expect((await db.query<any>('select transcript from public.conversations where id=$1', [preparedId])).rows[0].transcript.messages[1].text).toBe(turns()[1].text);
    await expect(db.exec("update public.conversation_capture_assets set html='changed' where conversation_id='" + preparedId + "'")).rejects.toThrow(/permission/);
  });
  it('checks admin role and invalid/oversized payloads without partial inserts', async () => {
    await asUser('', 'anon'); await expect(prepare()).rejects.toThrow(/permission/);
    await asUser(alice); await expect(prepare()).rejects.toThrow(/Admin/);
    await asUser(admin);
    const before = (await db.query('select * from public.chatgpt_archive_preparations')).rows.length;
    for (const invalid of [null, [], {}, [{ ...turns()[0], speaker: 'unknown' }], [turns()[0], turns()[0]], [{ ...turns()[1], source_ids: [null] }], [{ ...turns()[1], html: '' }], [{ ...turns()[1], text: '' }], [{ ...turns()[1], html: 'x'.repeat(8388608) }]]) await expect(prepare(invalid)).rejects.toThrow();
    expect((await db.query('select * from public.chatgpt_archive_preparations')).rows).toHaveLength(before);
  });
  it('shares assets through annotation/comparison access without granting source archive access', async () => {
    await asUser(alice); expect((await db.query('select * from public.conversation_capture_assets where conversation_id=$1', [preparedId])).rows).toHaveLength(0);
    await asUser(bob); expect((await db.query('select * from public.conversation_capture_assets where conversation_id=$1', [preparedId])).rows).toHaveLength(0);
    await asUser(admin);
    await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2) on conflict do nothing', [bundledRubric.rubric_sha256, bundledRubric]);
    await db.query('insert into public.assignments(conversation_id,annotator_id,rubric_hash) values($1,$2,$3)', [preparedId, bob, bundledRubric.rubric_sha256]);
    await asUser(bob);
    expect((await db.query('select * from public.conversation_capture_assets where conversation_id=$1', [preparedId])).rows).toHaveLength(2);
    expect((await db.query('select * from public.chatgpt_html_archives where id=$1', [archiveId])).rows).toHaveLength(0);
    const conversation = (await db.query<any>('select transcript from public.conversations where id=$1', [preparedId])).rows[0].transcript;
    const quote = 'Water becomes vapour.'; const start = conversation.messages[1].text.indexOf(quote);
    const annotation = C.createAnnotation('examples', C.makeEvidence(conversation, 'turn_0002', start, start + quote.length), bundledRubric.rubric, 'prepared-example'); annotation.entry.detail_level = 'Brief';
    const assignment = (await db.query<any>('select id from public.assignments where conversation_id=$1 and annotator_id=$2', [preparedId, bob])).rows[0];
    const dimension = bundledRubric.rating_dimensions!.find(item => !item.subsequent_only)!;
    const ratings = { turn_0002: { values: { [dimension.key]: dimension.options[0] }, notes: '' } };
    const saved = (await db.query<any>('select public.save_assignment($1,0,$2::jsonb,false,$3::jsonb) as result', [assignment.id, JSON.stringify([annotation]), JSON.stringify(ratings)])).rows[0].result;
    expect(saved.annotations[0].evidence[0].quote).toBe(quote); expect(saved.turn_ratings).toEqual(ratings);
    await asUser(admin);
    await db.query('select public.create_comparison_assignment($1,$2,$3,$4::jsonb)', [preparedId, changedId, alice, JSON.stringify([{ key: 'clarity', label: 'Clarity', description: 'Compare clarity.', subsequent_only: false }])]);
    await asUser(alice); expect((await db.query('select * from public.conversation_capture_assets where conversation_id in ($1,$2)', [preparedId, changedId])).rows).toHaveLength(4);
  });
  it('only admins can delete archives and deletion preserves prepared transcripts, assets and saved work', async () => {
    const remove = () => db.query<any>('select public.delete_chatgpt_html_archive($1) as result', [archiveId]);
    await asUser('', 'anon'); await expect(remove()).rejects.toThrow(/permission/);
    await asUser(alice); await expect(remove()).rejects.toThrow(/Admin/);
    await asUser(bob); await expect(remove()).rejects.toThrow(/Admin/);
    await asUser(admin);
    const before = {} as Record<string, unknown>;
    for (const table of ['conversations', 'conversation_capture_assets', 'assignments', 'comparison_assignments', 'chatgpt_archive_preparations']) before[table] = (await db.query(`select count(*)::int as n from public.${table}`)).rows;
    const transcript = (await db.query('select transcript from public.conversations where id=$1', [preparedId])).rows;
    expect((await remove()).rows[0].result).toEqual({ archive_id: archiveId, deleted: true });
    expect((await db.query('select * from public.chatgpt_html_archives where id=$1', [archiveId])).rows).toHaveLength(0);
    for (const [table, rows] of Object.entries(before)) expect((await db.query(`select count(*)::int as n from public.${table}`)).rows).toEqual(rows);
    expect((await db.query('select transcript from public.conversations where id=$1', [preparedId])).rows).toEqual(transcript);
    expect((await db.query<any>('select archive_id from public.chatgpt_archive_preparations where conversation_id=$1', [preparedId])).rows[0].archive_id).toBeNull();
    expect((await remove()).rows[0].result.deleted).toBe(false);
    await expect(db.exec('delete from public.chatgpt_html_archives')).rejects.toThrow(/permission/);
  });

});

describe.sequential('direct ChatGPT captures', () => {
  const direct = () => ({
    format_version: 'chatgpt-direct-capture/1', source: { conversation_id: source, url: 'https://chatgpt.com/c/' + source },
    title: 'Direct heart capture', topic: 'Heart', language: 'en', captured_at: new Date().toISOString(), extractor_version: 'agentic-conversation-capture/1',
    report: { scope: 'loaded-page', history_verified: false, message_count: 2, limitations: ['Loaded page only'] },
    turns: [
      { turn_id: 'turn_0001', speaker: 'student', text: 'Explain the heart.\n', html: '<div><p>Explain the heart.</p></div>', source_ids: [] },
      { turn_id: 'turn_0002', speaker: 'tutor', text: 'The heart pumps blood.\n', html: '<div><p>The heart pumps blood.</p><img src="https://example.supabase.co/storage/v1/object/public/capture-images/captures/user/image.png" alt="Diagram"></div>', source_ids: [] },
    ],
  });
  const saveDirect = async (value: unknown = direct()) => (await db.query<{ result: { conversation_id: string; created: boolean } }>('select public.import_chatgpt_direct_capture($1::jsonb) as result', [JSON.stringify(value)])).rows[0].result;
  it('creates an annotatable conversation with per-turn image HTML, not an archive', async () => {
    await asUser(alice);
    const before = (await db.query('select id from public.chatgpt_html_archives')).rows.length;
    const first = await saveDirect();
    expect(first.created).toBe(true);
    expect((await saveDirect()).conversation_id).toBe(first.conversation_id);
    expect((await saveDirect()).created).toBe(false);
    const conversation = (await db.query<any>('select transcript from public.conversations where id=$1', [first.conversation_id])).rows[0].transcript;
    expect(conversation.messages).toEqual(direct().turns.map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })));
    expect(conversation.chatgpt_source.source_conversation_id).toBe(source);
    expect((await db.query<any>('select html from public.conversation_capture_assets where conversation_id=$1 order by turn_id', [first.conversation_id])).rows.map(row => row.html)).toEqual(direct().turns.map(turn => turn.html));
    expect((await db.query('select id from public.chatgpt_html_archives')).rows).toHaveLength(before);
    const changed = direct(); changed.turns[1].html += '<p>More detail.</p>';
    expect((await saveDirect(changed)).conversation_id).not.toBe(first.conversation_id);
  });
  it('rejects malformed turns and unauthorized callers without partial records', async () => {
    await asUser('', 'anon'); await expect(saveDirect()).rejects.toThrow(/permission/);
    await asUser(alice);
    const before = (await db.query('select id from public.conversations')).rows.length;
    const invalid = [
      { ...direct(), turns: [] },
      { ...direct(), report: { ...direct().report, message_count: 3 } },
      { ...direct(), turns: [direct().turns[0], direct().turns[0]] },
      { ...direct(), turns: [{ ...direct().turns[1], speaker: 'system' }] },
      { ...direct(), turns: [{ ...direct().turns[1], html: '' }] },
    ];
    for (const value of invalid) await expect(saveDirect(value)).rejects.toThrow();
    expect((await db.query('select id from public.conversations')).rows).toHaveLength(before);
  });
});

