import { expect, it, vi } from 'vitest';
import { applyConversationDeletionMigration } from '../scripts/deletion-migration-api.mjs';
const options = { token: 'mock-token', projectUrl: 'https://portalref.supabase.co', expectedProject: 'portalref', sql: 'create function test() returns void language sql as $$ select $$;' };
const empty = { preview_exists: false, delete_exists: false, protected_functions: 0, scoped_functions: 0, direct_deletes_forbidden: true };
const ready = { preview_exists: true, delete_exists: true, protected_functions: 2, scoped_functions: 2, direct_deletes_forbidden: true };
const response = (value: unknown) => new Response(JSON.stringify(value), { status: 200 });
it('requires matching project and credentials before sending any request', async () => {
  const fetcher = vi.fn(); await expect(applyConversationDeletionMigration({ ...options, token: '', fetcher })).rejects.toThrow(/SUPABASE_ACCESS_TOKEN/);
  await expect(applyConversationDeletionMigration({ ...options, expectedProject: 'different', fetcher })).rejects.toThrow(/match/); expect(fetcher).not.toHaveBeenCalled();
});
it('applies the exact SQL and verifies privileges, and recognizes a verified repeat', async () => {
  const fetcher = vi.fn().mockResolvedValueOnce(response([])).mockResolvedValueOnce(response([empty])).mockResolvedValueOnce(response({})).mockResolvedValueOnce(response([ready]));
  expect((await applyConversationDeletionMigration({ ...options, fetcher })).result).toBe('applied');
  const sent = JSON.parse(fetcher.mock.calls[2][1].body); expect(sent.query).toBe(options.sql);
  const repeat = vi.fn().mockResolvedValueOnce(response([{ name: sent.name }])).mockResolvedValueOnce(response([ready]));
  expect((await applyConversationDeletionMigration({ ...options, fetcher: repeat })).result).toBe('already_applied'); expect(repeat).toHaveBeenCalledTimes(2);
});
it('rejects unrecorded functions and unsafe permissions instead of overwriting them', async () => {
  const existing = vi.fn().mockResolvedValueOnce(response([])).mockResolvedValueOnce(response([ready]));
  await expect(applyConversationDeletionMigration({ ...options, fetcher: existing })).rejects.toThrow(/already exist/); expect(existing).toHaveBeenCalledTimes(2);
  const unsafe = vi.fn().mockResolvedValueOnce(response([])).mockResolvedValueOnce(response([empty])).mockResolvedValueOnce(response({})).mockResolvedValueOnce(response([{ ...ready, scoped_functions: 0 }]));
  await expect(applyConversationDeletionMigration({ ...options, fetcher: unsafe })).rejects.toThrow(/verification failed/);
});
