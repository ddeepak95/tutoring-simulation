// Keep profile secrets outside VITE_*: only the selected public URL/key reach the browser.
export function resolveSupabaseEnvironment(env) {
  const target = env.SUPABASE_TARGET || 'cloud';
  if (!['cloud', 'local'].includes(target)) throw new Error('SUPABASE_TARGET must be cloud or local.');
  const prefix = `SUPABASE_${target.toUpperCase()}_`;
  const legacy = target === 'cloud';
  const url = env[prefix + 'URL'] || (legacy ? env.VITE_SUPABASE_URL || env.SUPABASE_URL : 'http://127.0.0.1:55321');
  const publicKey = env[prefix + 'PUBLISHABLE_KEY'] || (legacy ? env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY : undefined);
  const serviceKey = env[prefix + 'SERVICE_ROLE_KEY'] || (legacy ? env.SUPABASE_SERVICE_ROLE_KEY : undefined);
  if (target === 'local' && !['127.0.0.1', 'localhost', '[::1]'].includes(new URL(url).hostname)) throw new Error('The local Supabase profile must use a loopback URL.');
  return { ...env, SUPABASE_TARGET: target, SUPABASE_URL: url, VITE_SUPABASE_URL: url,
    SUPABASE_PUBLISHABLE_KEY: publicKey, VITE_SUPABASE_PUBLISHABLE_KEY: publicKey,
    SUPABASE_SERVICE_ROLE_KEY: serviceKey };
}
