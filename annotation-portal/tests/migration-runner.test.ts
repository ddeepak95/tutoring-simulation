import { expect, it, vi } from 'vitest';
// CLI modules are JavaScript and never included in the frontend bundle.
import { applyPortalMigration } from '../scripts/migration-api.mjs';
const options = { token: 'mock-management-token', projectUrl: 'https://portalref.supabase.co', expectedProject: 'portalref', sql: 'create table public.test(id integer);' };
const empty = { tables: [], functions: [], rls_enabled: false, profile_trigger: false, source_bucket: false, source_bucket_private: false, existing_users: 0 };
const ready = { tables: ['profiles','rubric_versions','conversations','assignments','annotation_revisions'], functions: ['provision_profile','is_admin','utf16_offset','validate_transcript','validate_annotations','save_assignment','reopen_assignment'], rls_enabled: true, profile_trigger: true, source_bucket: true, source_bucket_private: true, existing_users: 0 };
const response = (value: unknown) => new Response(JSON.stringify(value), { status: 200 });
it('requires administrative access and an explicit matching project before any request', async () => {
  const fetcher = vi.fn(); await expect(applyPortalMigration({ ...options, token: '', fetcher })).rejects.toThrow(/SUPABASE_ACCESS_TOKEN/);
  await expect(applyPortalMigration({ ...options, expectedProject: 'anotherref', fetcher })).rejects.toThrow(/match/); expect(fetcher).not.toHaveBeenCalled();
});
it('refuses existing tables or unrelated Auth users without sending a migration', async () => {
  for (const state of [{ ...empty, tables: ['profiles'] }, { ...empty, existing_users: 1 }]) {
    const fetcher = vi.fn().mockResolvedValueOnce(response([])).mockResolvedValueOnce(response([state]));
    await expect(applyPortalMigration({ ...options, fetcher })).rejects.toThrow(/nothing has been overwritten/); expect(fetcher).toHaveBeenCalledTimes(2);
  }
});
it('applies the exact SQL once and verifies protections, then safely recognizes a repeat', async () => {
  const fetcher = vi.fn().mockResolvedValueOnce(response([])).mockResolvedValueOnce(response([empty])).mockResolvedValueOnce(response({})).mockResolvedValueOnce(response([ready]));
  const result = await applyPortalMigration({ ...options, fetcher }); expect(result.result).toBe('applied');
  const request = fetcher.mock.calls[2]; expect(request[0]).toBe('https://api.supabase.com/v1/projects/portalref/database/migrations');
  const sent = JSON.parse(request[1].body); expect(sent.query).toBe(options.sql);
  const repeat = vi.fn().mockResolvedValueOnce(response([{ name: sent.name }])).mockResolvedValueOnce(response([ready]));
  expect((await applyPortalMigration({ ...options, fetcher: repeat })).result).toBe('already_applied'); expect(repeat).toHaveBeenCalledTimes(2);
});
it('reports API permission failures without exposing credentials', async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response(options.token, { status: 403 }));
  await expect(applyPortalMigration({ ...options, fetcher })).rejects.toThrow('HTTP 403');
  try { await applyPortalMigration({ ...options, fetcher }); } catch (error) { expect(String(error)).not.toContain(options.token); }
});
