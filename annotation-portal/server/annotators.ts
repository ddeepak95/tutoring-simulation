import type { IncomingMessage, ServerResponse } from 'node:http';
import { createClient } from '@supabase/supabase-js';
import { loginIdentifier, validatePassword } from '../scripts/credentials.mjs';
import { removeNewAccount } from '../scripts/remove-new-account.mjs';

type Environment = Record<string, string | undefined>;
type Request = IncomingMessage & { body?: unknown };
class RequestError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function readBody(request: Request): Promise<unknown> {
  if (request.body !== undefined) {
    const text = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
    if (Buffer.byteLength(text) > 4096) throw new RequestError(413, 'Request is too large.');
    return typeof request.body === 'string' ? JSON.parse(text) : request.body;
  }
  const chunks: Buffer[] = []; let size = 0;
  for await (const chunk of request) {
    const bytes = Buffer.from(chunk); size += bytes.length;
    if (size > 4096) throw new RequestError(413, 'Request is too large.');
    chunks.push(bytes);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

// Shared by the Vercel function and Vite's local API. No server secrets enter src/.
export function createAnnotatorHandler({ getEnvironment = () => process.env, createSupabaseClient = createClient }: {
  getEnvironment?: () => Environment; createSupabaseClient?: typeof createClient;
} = {}) {
  return async (request: Request, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Cache-Control', 'no-store');
    const send = (status: number, data: unknown) => { response.statusCode = status; response.end(JSON.stringify(data)); };
    try {
      if (request.method !== 'POST') { response.setHeader('Allow', 'POST'); throw new RequestError(405, 'Use POST to create an annotator.'); }
      const token = request.headers.authorization?.match(/^Bearer (\S+)$/i)?.[1];
      if (!token) throw new RequestError(401, 'Sign in as an administrator to create annotators.');
      if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new RequestError(415, 'Send a JSON request.');

      const env = getEnvironment();
      const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
      const publicKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY;
      if (!url || !publicKey) throw new RequestError(503, 'Account creation is not configured on the server.');
      // Verify the token with Supabase Auth, then read the protected profile using RLS.
      const caller = createSupabaseClient(url, publicKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
        global: { headers: { Authorization: `Bearer ${token}` } }
      });
      const { data: auth, error: authError } = await caller.auth.getUser(token);
      if (authError || !auth.user) throw new RequestError(401, 'Your session has expired. Sign in again.');
      const { data: profile, error: profileError } = await caller.from('profiles').select('role').eq('id', auth.user.id).single();
      if (profileError) throw new RequestError(503, 'Could not verify administrator access. Try again.');
      if (profile?.role !== 'admin') throw new RequestError(403, 'Only administrators can create annotators.');

      const body = await readBody(request);
      if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => !['username', 'password'].includes(key))) throw new RequestError(400, 'Provide only a username and password.');
      const { username, password } = body as { username?: unknown; password?: unknown };
      let email: string;
      try {
        if (typeof username !== 'string') throw new Error('Provide a username.');
        email = loginIdentifier(username); validatePassword(password);
      } catch (error) { throw new RequestError(400, (error as Error).message); }

      const key = env.SUPABASE_SERVICE_ROLE_KEY;
      if (!key) throw new RequestError(503, 'Account creation is not configured on the server.');
      const privileged = createSupabaseClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
      const { data: existing, error: lookupError } = await privileged.from('profiles').select('id').eq('username', email.split('@')[0]).maybeSingle();
      if (lookupError) throw new RequestError(503, 'Could not check the username. Try again.');
      if (existing) throw new RequestError(409, 'This username already exists. Choose another username.');
      const { data: created, error: createError } = await privileged.auth.admin.createUser({ email, password: password as string, email_confirm: true });
      if (createError) {
        if (['email_exists', 'user_already_exists'].includes(createError.code || '')) throw new RequestError(409, 'This username already exists. Choose another username.');
        if (createError.code === 'weak_password') throw new RequestError(400, 'Supabase rejected this password. Choose a different password that meets the project password policy.');
        throw new RequestError(502, 'Could not create the annotator. Refresh the dashboard before trying again.');
      }
      if (!created.user) throw new RequestError(502, 'Could not confirm account creation. Refresh the dashboard before trying again.');
      // The database trigger assigns the role. Never accept roles or metadata from the browser.
      const { data: annotator, error: newProfileError } = await privileged.from('profiles').select('id, username, role').eq('id', created.user.id).single();
      if (newProfileError || annotator?.role !== 'annotator' || annotator?.username !== email.split('@')[0]) {
        const removed = await removeNewAccount(privileged, created.user.id);
        throw new RequestError(502, removed ? 'Account setup failed; the new account was removed. Try again.' : 'Account setup was incomplete. Contact the administrator before retrying.');
      }
      send(201, { annotator: { id: annotator.id, username: annotator.username, role: 'annotator' } });
    } catch (error) {
      // Never echo Supabase errors, tokens, request bodies, or passwords.
      if (error instanceof RequestError) send(error.status, { error: error.message });
      else if (error instanceof SyntaxError) send(400, { error: 'Request must contain valid JSON.' });
      else send(500, { error: 'Account creation could not be completed. Refresh the dashboard before trying again.' });
    }
  };
}
