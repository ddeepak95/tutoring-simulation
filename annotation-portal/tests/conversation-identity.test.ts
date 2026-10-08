import { afterAll, expect, it } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import { identifyUploadedConversation } from '../src/conversation-identity';
import { C } from '../src/lib';

it('preserves source IDs exactly, including translation IDs, and allocates IDs only when absent', () => {
  const id = '12345678-1234-4234-8234-123456789012';
  const source = C.normalizeConversation({ conversation_id: id, messages: [{ speaker: 'tutor', text: 'தமிழ் 😀 H₂ + O₂\n  exact whitespace.' }] });
  const first = identifyUploadedConversation(source); const second = identifyUploadedConversation(source);
  expect(first.id).toBe(id); expect(first.transcript.conversation_id).toBe(id); expect(second.transcript.conversation_id).toBe(id);
  expect(first.transcript.messages).toEqual(source.messages);
  const translated = identifyUploadedConversation({ ...source, conversation_id: '23456789-1234-4234-8234-123456789012', source_conversation_id: id });
  expect(translated.transcript.conversation_id).not.toBe(id); expect(translated.transcript.source_conversation_id).toBe(id);
  const missing = { ...source, conversation_id: null }; const a = identifyUploadedConversation(missing), b = identifyUploadedConversation(missing);
  expect(a.transcript.conversation_id).not.toBe(b.transcript.conversation_id); expect(a.transcript.conversation_id).toBe(a.id);
});

const db = new PGlite(); afterAll(async () => { await db.close(); });
it('repairs missing/repeated legacy IDs, enforces uniqueness, and preserves assignments when aligning record UUIDs', async () => {
  const ids = ['00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000003'];
  await db.exec('create table public.conversations(id uuid primary key, transcript jsonb not null, created_at timestamptz default now()); create table public.assignments(id integer primary key, conversation_id uuid references public.conversations(id), annotations jsonb);');
  const messages = [{ turn_id: 't1', speaker: 'tutor', text: 'தமிழ் 😀 74 pm' }];
  for (const [i, id] of ids.entries()) await db.query('insert into conversations(id,transcript) values($1,$2)', [id, JSON.stringify({ conversation_id: i < 2 ? 'shared-old-id' : null, messages })]);
  await db.query('insert into assignments values(1,$1,$2)', [ids[1], JSON.stringify([{ evidence: 'தமிழ் 😀 74 pm' }])]);
  await db.exec(fs.readFileSync('supabase/migrations/202610080002_conversation_ids.sql', 'utf8'));
  const rows = (await db.query<{ id: string; transcript: any }>('select * from conversations order by id')).rows;
  expect(new Set(rows.map(row => row.transcript.conversation_id)).size).toBe(3);
  expect(rows[0].transcript.conversation_id).toBe('shared-old-id'); expect(rows[1].transcript.source_conversation_id).toBe('shared-old-id');
  for (const row of rows) expect(row.transcript.messages).toEqual(messages);
  await expect(db.query('insert into conversations values(gen_random_uuid(),$1,now())', [JSON.stringify({ conversation_id: 'shared-old-id', messages })])).rejects.toThrow(/unique/);
  for (const conversation_id of [null, '', '  ', 123]) await expect(db.query('insert into conversations values(gen_random_uuid(),$1,now())', [JSON.stringify({ conversation_id, messages })])).rejects.toThrow(/conversation_identity_required/);
  const aligned = '00000000-0000-4000-8000-000000000099';
  await db.query('update conversations set id=$1::uuid,transcript=jsonb_set(transcript,\'{conversation_id}\',to_jsonb($1::uuid::text)) where id=$2::uuid', [aligned, ids[1]]);
  expect((await db.query<any>('select * from assignments')).rows[0]).toEqual({ id: 1, conversation_id: aligned, annotations: [{ evidence: 'தமிழ் 😀 74 pm' }] });
});
