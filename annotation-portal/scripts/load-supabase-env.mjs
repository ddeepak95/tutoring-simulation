import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolveSupabaseEnvironment } from './supabase-environment.mjs';
export function loadSupabaseEnvironment() {
  const file = fileURLToPath(new URL('../.env.local', import.meta.url));
  if (fs.existsSync(file)) process.loadEnvFile(file);
  const resolved = resolveSupabaseEnvironment(process.env);
  for (const name of ['SUPABASE_TARGET', 'SUPABASE_URL', 'VITE_SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY', 'VITE_SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_SERVICE_ROLE_KEY']) {
    if (resolved[name] === undefined) delete process.env[name]; else process.env[name] = resolved[name];
  }
  return resolved;
}
