import { it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { profile, connectProfile, snapshot, readSnapshot, restore } from '../scripts/supabase-sync-core.mjs';
import { renderLocalMigration } from '../scripts/supabase-local-bootstrap.mjs';

it('renders cloud migration templates for a fresh local database without weakening existing-work guards', () => {
  const sql = "if not exists (select 1 from public.rubric_versions where hash='__CURRENT_RUBRIC_HASH__') then raise exception 'missing'; end if; select '__CURRENT_RUBRIC_JSON__';";
  const rendered = renderLocalMigration(sql, { rubric_sha256: 'historical', name: "Tutor's rubric" });
  expect(rendered).toContain('if exists(select 1 from public.assignments) and not exists');
  expect(rendered).toContain("hash='historical'");
  expect(rendered).toContain("Tutor''s rubric");
  expect(rendered).not.toContain('__CURRENT_');
  const runtimeGuard = "if not exists(select 1 from public.rubric_versions where hash=p_rubric_hash) then raise exception 'Rubric not found'; end if;";
  expect(renderLocalMigration(runtimeGuard, { rubric_sha256: 'historical' })).toBe(runtimeGuard);
});

// Explicit opt-in, and only an empty local instance: never connects to cloud.
it.runIf(process.env.TEST_LOCAL_SUPABASE_SYNC === '1')('round-trips exact numeric data, Auth login and Storage bytes through real local Supabase', async () => {
  process.loadEnvFile('.env.local');
  const config = profile(process.env, 'local');
  const connection = await connectProfile(config);
  const client = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } });
  const directory = path.resolve('.runtime/supabase-sync-tests', randomUUID());
  let initial: Awaited<ReturnType<typeof snapshot>> | undefined;
  try {
    const users = await connection.db.query('select count(*)::int as n from auth.users');
    if (users.rows[0].n !== 0) throw new Error('Round-trip integration test requires an empty local Auth database.');
    await connection.db.query('create table public.sync_precision_probe(id bigint generated always as identity primary key, value numeric(40,18), doubled numeric generated always as (value*2) stored)');
    initial = await snapshot(connection, path.join(directory, 'initial'));
    await connection.db.query("insert into public.sync_precision_probe(value) values('12345678901234567890.123456789012345678')");
    const password = randomUUID() + 'aA1!';
    const email = 'sync-probe@users.annotation.invalid';
    const user = await client.auth.admin.createUser({ email, password, email_confirm: true });
    if (user.error) throw user.error;
    const bucket = 'sync-probe-' + randomUUID();
    expect((await client.storage.createBucket(bucket, { public: false })).error).toBeNull();
    const bytes = Buffer.from([0, 255, 14, 37, 128]);
    expect((await client.storage.from(bucket).upload('folder/data.bin', bytes, { cacheControl: '42', metadata: { caption: 'round-trip' } })).error).toBeNull();
    const saved = await snapshot(connection, path.join(directory, 'populated'));
    await connection.db.query('truncate public.sync_precision_probe');
    await client.storage.from(bucket).remove(['folder/data.bin']);
    await client.storage.from(bucket).upload('destination-only.bin', Buffer.from('remove me'));
    await restore(connection, path.join(directory, 'populated'), await readSnapshot(path.join(directory, 'populated')));
    expect((await connection.db.query('select value::text from public.sync_precision_probe')).rows[0].value).toBe('12345678901234567890.123456789012345678');
    const authClient = createClient(config.url, process.env.SUPABASE_LOCAL_PUBLISHABLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
    expect((await authClient.auth.signInWithPassword({ email, password })).error).toBeNull();
    const file = await client.storage.from(bucket).download('folder/data.bin');
    expect(file.error).toBeNull();
    expect(Buffer.from(await file.data!.arrayBuffer())).toEqual(bytes);
    const metadata = (await connection.db.query('select user_metadata,metadata from storage.objects where bucket_id=$1 and name=$2', [bucket, 'folder/data.bin'])).rows[0];
    expect(metadata.user_metadata).toEqual({ caption: 'round-trip' });
    expect(metadata.metadata.cacheControl).toContain('42');
    expect((await client.storage.from(bucket).list()).data?.some(object => object.name === 'destination-only.bin')).toBe(false);
    expect(saved.tables.find(table => table.name === 'users')?.count).toBe('1');
    await authClient.auth.signOut();
  } finally {
    try {
      if (initial) await restore(connection, path.join(directory, 'initial'), initial);
      await connection.db.query('drop table if exists public.sync_precision_probe');
    } finally { await connection.db.end(); }
  }
}, 180000);
