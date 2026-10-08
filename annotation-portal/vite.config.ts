import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { loadEnv, type Plugin, type ViteDevServer } from 'vite';
import { createAnnotatorHandler } from './server/annotators';
function localAccountsApi(): Plugin {
  let env: Record<string, string> = {};
  const install = (server: Pick<ViteDevServer, 'middlewares'>) => {
    const handler = createAnnotatorHandler({ getEnvironment: () => ({ ...env, ...process.env }) });
    server.middlewares.use((request, response, next) => {
      if (request.url?.split('?')[0] === '/api/annotators') void handler(request, response);
      else next();
    });
  };
  return { name: 'local-accounts-api', configResolved(config) { env = loadEnv(config.mode, config.root, ''); }, configureServer: install, configurePreviewServer: install };
}
export default defineConfig({ plugins: [react(), localAccountsApi()], build: { rollupOptions: { output: { manualChunks(id) { if (id.includes('node_modules')) return id.includes('@supabase') ? 'supabase' : 'vendor'; } } } }, test: { include: ['tests/**/*.test.{ts,tsx}'], testTimeout: 30000, hookTimeout: 30000 } });
