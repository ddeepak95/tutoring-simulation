import { it, expect, vi } from 'vitest';
import { connectManagementSource } from '../scripts/supabase-management-source.mjs';

it('exports all rows in one read-only statement and retains exact PostgreSQL row strings', async () => {
  const row = '{"amount": 12345678901234567890.123456789012345678}';
  const captured = { tables: [{ schema: 'public', name: 'probe', rows: [row] }], sequences: [], objects: [] };
  const fetcher = vi.fn().mockResolvedValueOnce(new Response('[]')).mockResolvedValueOnce(new Response(JSON.stringify([{ snapshot: captured }])));
  const source = connectManagementSource({ SUPABASE_CLOUD_URL: 'https://study.supabase.co', SUPABASE_CLOUD_SERVICE_ROLE_KEY: 'server-only-key', SUPABASE_ACCESS_TOKEN: 'private-token' }, fetcher);
  const result = await source.readDatabaseSnapshot({ tables: [{ schema: 'public', name: 'probe' }] });
  expect(result.tables[0].rows[0]).toBe(row);
  for (const [, options] of fetcher.mock.calls) {
    const body = JSON.parse(options.body);
    expect(body.read_only).toBe(true);
    expect(body.query).toMatch(/^select /i);
    expect(body.query).not.toMatch(/truncate|insert|update|delete|create/i);
  }
  expect(JSON.parse(fetcher.mock.calls[1][1].body).query).toContain('jsonb_agg(to_jsonb(t)::text)');
});

it('fails without returning potentially sensitive Management API response bodies', async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response('sensitive diagnostic', { status: 403 }));
  const source = connectManagementSource({ SUPABASE_CLOUD_URL: 'https://study.supabase.co', SUPABASE_CLOUD_SERVICE_ROLE_KEY: 'key', SUPABASE_ACCESS_TOKEN: 'token' }, fetcher);
  await expect(source.db.query('select 1')).rejects.toThrow('Cloud read-only export failed (HTTP 403).');
});
