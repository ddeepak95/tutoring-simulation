import { afterEach, describe, expect, it, vi } from 'vitest';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createClient } from '@supabase/supabase-js';
import { createAnnotatorHandler } from '../server/annotators';
import { validatePassword } from '../scripts/credentials.mjs';

const servers: Server[] = [];
afterEach(async () => { await Promise.all(servers.splice(0).map(server => new Promise<void>(resolve => { server.close(() => resolve()); server.closeAllConnections(); }))); });

async function setup(options: { role?: string; invalidToken?: boolean; profileError?: boolean; duplicate?: boolean; createError?: any; newProfileError?: boolean; cleanupError?: boolean; profileDeleteError?: boolean; key?: string; crash?: boolean; parsedBody?: unknown } = {}) {
  const account = { id: 'new-user', username: 'alice', role: 'annotator' };
  const createUser = vi.fn().mockResolvedValue({ data: { user: { id: account.id } }, error: options.createError || null });
  if (options.crash) createUser.mockRejectedValue(new Error('password=Eight123 secret=server-secret token=admin-token'));
  const deleteUser = vi.fn().mockResolvedValue({ error: options.cleanupError ? { message: 'secret' } : null });
  const deleteProfileEq = vi.fn().mockResolvedValue({ error: options.profileDeleteError ? { code: '23503' } : null });
  const callerSingle = vi.fn().mockResolvedValue({ data: { role: options.role || 'admin' }, error: options.profileError ? { message: 'private error' } : null });
  const callerEq = vi.fn().mockReturnValue({ single: callerSingle });
  const caller = { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: options.invalidToken ? null : { id: 'admin-id', user_metadata: { role: 'admin' } } }, error: options.invalidToken ? { message: 'Invalid JWT' } : null }) }, from: vi.fn().mockReturnValue({ select: vi.fn().mockReturnValue({ eq: callerEq }) }) };
  const privileged = {
    auth: { admin: { createUser, deleteUser } },
    from: vi.fn().mockReturnValue({ delete: vi.fn().mockReturnValue({ eq: deleteProfileEq }), select: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({
      maybeSingle: vi.fn().mockResolvedValue({ data: options.duplicate ? { id: 'existing-user' } : null, error: null }),
      single: vi.fn().mockResolvedValue({ data: account, error: options.newProfileError ? { message: 'private error' } : null })
    }) }) })
  };
  const factory = vi.fn((_url: string, key: string) => key === 'public-key' ? caller : privileged);
  const handler = createAnnotatorHandler({ getEnvironment: () => ({ VITE_SUPABASE_URL: 'https://test.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: 'public-key', SUPABASE_SERVICE_ROLE_KEY: options.key ?? 'server-secret' }), createSupabaseClient: factory as unknown as typeof createClient });
  const server = createServer((request, response) => { if (options.parsedBody !== undefined) Object.assign(request, { body: options.parsedBody }); void handler(request, response); });
  servers.push(server); await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/annotators`;
  async function send(body: unknown = { username: ' Alice ', password: 'Eight123' }, overrides: RequestInit = {}) {
    const response = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer admin-token', 'Content-Type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body), ...overrides });
    return { status: response.status, headers: response.headers, body: await response.json() };
  }
  return { send, factory, createUser, deleteUser, deleteProfileEq, caller, callerEq };
}

describe('admin account creation', () => {
  it('verifies admin with Auth and RLS, accepts exactly 8 characters, and creates only a confirmed annotator', async () => {
    const mock = await setup(); const response = await mock.send();
    expect(response.status).toBe(201); expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.body).toEqual({ annotator: { id: 'new-user', username: 'alice', role: 'annotator' } });
    expect(mock.caller.auth.getUser).toHaveBeenCalledWith('admin-token');
    expect(mock.callerEq).toHaveBeenCalledWith('id', 'admin-id');
    expect(mock.factory.mock.calls.map(call => call[1])).toEqual(['public-key', 'server-secret']);
    expect(mock.createUser).toHaveBeenCalledExactlyOnceWith({ email: 'alice@users.annotation.invalid', password: 'Eight123', email_confirm: true });
    expect(mock.deleteUser).not.toHaveBeenCalled();
  });

  it('rejects anonymous callers, forged/expired tokens, and annotators even with admin user metadata', async () => {
    const anonymous = await setup(); expect((await anonymous.send(undefined, { headers: { 'Content-Type': 'application/json' } })).status).toBe(401); expect(anonymous.factory).not.toHaveBeenCalled();
    const expired = await setup({ invalidToken: true }); expect((await expired.send()).status).toBe(401); expect(expired.createUser).not.toHaveBeenCalled();
    const annotator = await setup({ role: 'annotator' }); expect((await annotator.send()).status).toBe(403); expect(annotator.factory).toHaveBeenCalledTimes(1); expect(annotator.createUser).not.toHaveBeenCalled();
    const unavailable = await setup({ profileError: true }); expect((await unavailable.send()).status).toBe(503); expect(unavailable.createUser).not.toHaveBeenCalled();
  });

  it('rejects short passwords, invalid usernames, role injection, malformed JSON, and oversized bodies', async () => {
    const mock = await setup();
    for (const body of [{ username: 'alice', password: 'Seven12' }, { username: 'a@b', password: 'Eight123' }, { username: 'alice', password: 'Eight123', role: 'admin' }, '{invalid', [], null]) expect((await mock.send(body)).status).toBe(400);
    expect((await mock.send({ username: 'alice', password: 'x'.repeat(5000) })).status).toBe(413);
    expect(mock.createUser).not.toHaveBeenCalled();
    expect(() => validatePassword('Seven12')).toThrow('at least 8'); expect(() => validatePassword('Eight123')).not.toThrow();
  });

  it('handles the Vercel parsed-body format and rejects unsupported methods/content types', async () => {
    const mock = await setup({ parsedBody: { username: 'alice', password: 'Eight123' } });
    expect((await mock.send()).status).toBe(201);
    const get = await mock.send(undefined, { method: 'GET', body: undefined }); expect(get.status).toBe(405); expect(get.headers.get('allow')).toBe('POST');
    expect((await mock.send(undefined, { headers: { Authorization: 'Bearer admin-token', 'Content-Type': 'text/plain' } })).status).toBe(415);
  });

  it('reports duplicates without modifying existing users, including racing requests', async () => {
    const duplicate = await setup({ duplicate: true }); expect((await duplicate.send()).status).toBe(409); expect(duplicate.createUser).not.toHaveBeenCalled(); expect(duplicate.deleteUser).not.toHaveBeenCalled();
    const racing = await setup({ createError: { code: 'email_exists', message: 'private error' } }); expect((await racing.send()).status).toBe(409); expect(racing.deleteUser).not.toHaveBeenCalled();
  });

  it('removes only the newly created Auth user when profile setup fails and reports failed cleanup', async () => {
    const mock = await setup({ newProfileError: true }); const result = await mock.send(); expect(result.status).toBe(502); expect(result.body.error).toContain('was removed'); expect(mock.deleteProfileEq).toHaveBeenCalledExactlyOnceWith('id', 'new-user'); expect(mock.deleteUser).toHaveBeenCalledExactlyOnceWith('new-user');
    const cleanup = await setup({ newProfileError: true, cleanupError: true }); const failure = await cleanup.send(); expect(failure.status).toBe(502); expect(failure.body.error).toContain('before retrying');
    const protectedProfile = await setup({ newProfileError: true, profileDeleteError: true }); expect((await protectedProfile.send()).status).toBe(502); expect(protectedProfile.deleteUser).not.toHaveBeenCalled();
  });

  it('reports server configuration and password policy errors without leaking secrets', async () => {
    const missing = await setup({ key: '' }); expect((await missing.send()).status).toBe(503); expect(missing.createUser).not.toHaveBeenCalled();
    const weak = await setup({ createError: { code: 'weak_password', message: 'Eight123' } }); const weakResponse = await weak.send(); expect(weakResponse.status).toBe(400); expect(weakResponse.body.error).not.toContain('Eight123');
    const crashed = await setup({ crash: true }); const result = await crashed.send(); expect(result.status).toBe(500); expect(JSON.stringify(result.body)).not.toMatch(/Eight123|server-secret|admin-token/);
  });
});
