import { describe, it, expect } from 'vitest';
import { resolveSupabaseEnvironment } from '../scripts/supabase-environment.mjs';
import { profile, syncOptions, assertCompatible, quote } from '../scripts/supabase-sync-core.mjs';

const cloud = { VITE_SUPABASE_URL: 'https://study.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: 'cloud-public', SUPABASE_SERVICE_ROLE_KEY: 'cloud-secret' };
describe('Supabase instance selection', () => {
  it('keeps legacy cloud deployments working', () => {
    expect(resolveSupabaseEnvironment(cloud)).toMatchObject({ ...cloud, SUPABASE_TARGET: 'cloud', SUPABASE_URL: cloud.VITE_SUPABASE_URL });
  });
  it('selects all local credentials together despite stale generic cloud settings', () => {
    expect(resolveSupabaseEnvironment({ ...cloud, SUPABASE_TARGET: 'local', SUPABASE_URL: cloud.VITE_SUPABASE_URL, SUPABASE_LOCAL_PUBLISHABLE_KEY: 'local-public', SUPABASE_LOCAL_SERVICE_ROLE_KEY: 'local-secret' })).toMatchObject({ VITE_SUPABASE_URL: 'http://127.0.0.1:55321', SUPABASE_URL: 'http://127.0.0.1:55321', VITE_SUPABASE_PUBLISHABLE_KEY: 'local-public', SUPABASE_SERVICE_ROLE_KEY: 'local-secret' });
  });
  it('never falls back to cloud credentials for an incomplete local profile', () => {
    const local = resolveSupabaseEnvironment({ ...cloud, SUPABASE_TARGET: 'local' });
    expect(local.VITE_SUPABASE_PUBLISHABLE_KEY).toBeUndefined();
    expect(local.SUPABASE_SERVICE_ROLE_KEY).toBeUndefined();
  });
  it('validates target names and local origins', () => {
    expect(() => resolveSupabaseEnvironment({ SUPABASE_TARGET: 'prod' })).toThrow();
    expect(() => resolveSupabaseEnvironment({ SUPABASE_TARGET: 'local', SUPABASE_LOCAL_URL: cloud.VITE_SUPABASE_URL })).toThrow(/loopback/);
  });
});
describe('full sync boundaries', () => {
  it('defaults to a preview and requires explicit replacement confirmation', () => {
    expect(syncOptions(['--from', 'cloud', '--to', 'local']).apply).toBeUndefined();
    expect(() => syncOptions(['--from', 'local', '--to', 'cloud', '--apply'])).toThrow(/confirm-target cloud/);
    expect(syncOptions(['--from', 'local', '--to', 'cloud', '--apply', '--confirm-target', 'cloud']).apply).toBe(true);
    expect(syncOptions(['--restore', 'backup', '--to', 'local'])).toMatchObject({ restore: 'backup', to: 'local' });
  });
  it('rejects ambiguous or accidental directions and unknown arguments', () => {
    for (const args of [[], ['--from', 'cloud', '--to', 'cloud'], ['--from', 'cloud', '--to'], ['--from', 'cloud', '--to', 'local', '--force'], ['--restore', 'backup', '--from', 'cloud', '--to', 'local']]) expect(() => syncOptions(args)).toThrow();
  });
  it('refuses cross-project database credentials and remote local profiles', () => {
    const env = { ...cloud, SUPABASE_CLOUD_DB_URL: 'postgresql://postgres:secret@db.other.supabase.co:5432/postgres' };
    expect(() => profile(env, 'cloud')).toThrow(/belong/);
    expect(profile({ ...env, SUPABASE_CLOUD_DB_URL: 'postgresql://postgres.study:secret@aws-0-region.pooler.supabase.com:5432/postgres' }, 'cloud').url).toBe(cloud.VITE_SUPABASE_URL);
    expect(() => profile({ ...env, SUPABASE_LOCAL_DB_URL: env.SUPABASE_CLOUD_DB_URL, SUPABASE_LOCAL_SERVICE_ROLE_KEY: 'local' }, 'local')).toThrow(/loopback/);
  });
  it('requires matching schemas and safely quotes SQL identifiers', () => {
    const inventory = { tables: [{ schema: 'public', name: 'data', columns: [{ name: 'id', type: 'uuid' }], count: '1' }] };
    expect(() => assertCompatible(inventory, { ...inventory, tables: inventory.tables.map(table => ({ ...table, count: '9' })) })).not.toThrow();
    expect(() => assertCompatible(inventory, { tables: [] })).toThrow(/schemas differ/);
    expect(quote('a"b')).toBe('"a""b"');
  });
});
