import { describe, expect, it, vi } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import { openAdminAnnotations } from '../src/admin-annotations';
import { bundledRubric } from '../src/lib';
import type { Profile } from '../src/types';

const admin: Profile = { id: 'admin-id', username: 'admin', role: 'admin' };
function backend(reads: unknown[], insertError: unknown = null) {
  const filters: unknown[][] = [], writes: unknown[][] = [];
  const from = vi.fn((table: string) => {
    const query = {
      select: () => query,
      eq: (key: string, value: unknown) => { filters.push([table, key, value]); return query; },
      order: () => query, limit: () => query,
      maybeSingle: async () => reads.shift(),
      insert: async (value: unknown) => { writes.push([table, value]); return { error: insertError }; }
    };
    return query;
  });
  const rpc=vi.fn(async(name:string,value:unknown)=>{writes.push([name,value]);return {error:(insertError as {code?:string})?.code==='23505'?null:insertError};});
  return { client: { from,rpc } as unknown as SupabaseClient, from, rpc, filters, writes };
}
describe('admin annotation records', () => {
  it('rejects non-admins before making requests', async () => {
    const state = backend([]);
    await expect(openAdminAnnotations('doc', { ...admin, role: 'annotator' }, state.client)).rejects.toThrow('Admin access required');
    expect(state.from).not.toHaveBeenCalled();
  });
  it('continues existing own work without changing its pinned rubric', async () => {
    const state = backend([{ data: { id: 'own-work' }, error: null }]);
    expect(await openAdminAnnotations('doc', admin, state.client)).toBe('own-work');
    expect(state.filters).toContainEqual(['assignments', 'annotator_id', admin.id]);
    expect(state.filters).toContainEqual(['assignments', 'conversation_id', 'doc']);
    expect(state.writes).toEqual([]);
    expect(state.from).toHaveBeenCalledTimes(1);
  });
  it('registers the rubric and creates a separate record owned by the admin', async () => {
    const state = backend([{ data: null }, { data: null }, { data: { id: 'new-own-work' } }]);
    expect(await openAdminAnnotations('doc', admin, state.client)).toBe('new-own-work');
    expect(state.writes).toEqual([
      ['rubric_versions', { hash: bundledRubric.rubric_sha256, snapshot: bundledRubric }],
      ['open_admin_annotation_assignment', { p_conversation_id: 'doc', p_rubric_hash: bundledRubric.rubric_sha256 }]
    ]);
  });
  it('recovers a concurrent insert by re-reading the same owner record', async () => {
    const state = backend([{ data: null }, { data: { hash: 'registered' } }, { data: { id: 'concurrent-own-work' } }], { code: '23505' });
    expect(await openAdminAnnotations('doc', admin, state.client)).toBe('concurrent-own-work');
    expect(state.filters.filter(filter => filter[1] === 'annotator_id')).toEqual([
      ['assignments', 'annotator_id', admin.id], ['assignments', 'annotator_id', admin.id]
    ]);
  });
  it('reports failed reads and inserts without inventing a record', async () => {
    const read = backend([{ data: null, error: { code: 'offline' } }]);
    await expect(openAdminAnnotations('doc', admin, read.client)).rejects.toThrow('Could not load');
    expect(read.writes).toEqual([]);
    const insert = backend([{ data: null }, { data: { hash: 'registered' } }], { code: '42501' });
    await expect(openAdminAnnotations('doc', admin, insert.client)).rejects.toThrow('Could not open');
    const unconfirmed = backend([{ data: null }, { data: { hash: 'registered' } }, { data: null }]);
    await expect(openAdminAnnotations('doc', admin, unconfirmed.client)).rejects.toThrow('Could not confirm');
  });
});
