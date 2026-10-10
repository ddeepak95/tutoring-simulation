import { expect, it } from 'vitest';
import { createHash } from 'node:crypto';
// @ts-expect-error ESM migration helper is shared with the CLI.
import { applyRatingsMigration } from '../scripts/ratings-migration-api.mjs';
const sql = 'reviewed ratings migration';
const name = 'annotation_portal_202610090001_' + createHash('sha256').update(sql).digest('hex').slice(0, 16);
const ready = Object.fromEntries(['rating_storage', 'rating_history', 'validation_exists', 'protected_write', 'private_validation', 'trigger_exists', 'extended_rubric', 'direct_writes_forbidden'].map(key => [key, true]));
const input = { token: 'private-test-token', projectUrl: 'https://study.supabase.co', expectedProject: 'study', sql };
function mock(history: { name: string }[] = [], initial = false) {
  let applied = initial; const requests: { url: string; body: any }[] = [];
  const fetcher = async (url: string, options: RequestInit) => {
    const body = options.body ? JSON.parse(String(options.body)) : null; requests.push({ url, body });
    if (url.endsWith('/database/query')) return Response.json([applied ? ready : Object.fromEntries(Object.keys(ready).map(key => [key, false]))]);
    if (options.method === 'POST') { applied = true; return Response.json({}); }
    return Response.json(history);
  };
  return { fetcher, requests };
}
it('applies the exact migration and verifies rating storage and protected writes', async () => {
  const backend = mock(); expect((await applyRatingsMigration({ ...input, fetcher: backend.fetcher })).result).toBe('applied');
  expect(backend.requests.find(request => request.body?.name)?.body).toEqual({ query: sql, name });
});
it('verifies recorded migrations and refuses changed versions or untracked storage', async () => {
  const existing = mock([{ name }], true); expect((await applyRatingsMigration({ ...input, fetcher: existing.fetcher })).result).toBe('already_applied');
  expect(existing.requests.some(request => request.body?.name)).toBe(false);
  await expect(applyRatingsMigration({ ...input, fetcher: mock([{ name: 'annotation_portal_202610090001_other' }]).fetcher })).rejects.toThrow(/different/);
  await expect(applyRatingsMigration({ ...input, fetcher: mock([], true).fetcher })).rejects.toThrow(/without/);
});
it('rejects missing credentials, mismatched projects and unsuccessful API responses without exposing credentials', async () => {
  await expect(applyRatingsMigration({ ...input, token: '' })).rejects.toThrow(/SUPABASE_ACCESS_TOKEN/);
  await expect(applyRatingsMigration({ ...input, expectedProject: 'wrong' })).rejects.toThrow(/must match/);
  await expect(applyRatingsMigration({ ...input, fetcher: async () => new Response('private response', { status: 403 }) })).rejects.toThrow('HTTP 403');
});
