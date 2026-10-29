import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { loadEnv, type Plugin, type ViteDevServer } from 'vite';
import { createAnnotatorHandler } from './server/annotators';
import { createLLMAnnotationHandler } from './server/llm-annotations';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { resolveSupabaseEnvironment } from './scripts/supabase-environment.mjs';

const portalRoot = process.cwd();
const repositoryRoot = path.resolve(portalRoot, '..');
function rubricSync(): Plugin {
  const sources = new Set([
    'conversation-evaluation/human-annotation/coding-guidebook.md',
    'conversation-evaluation/human-annotation/rating-questions.md',
    'conversation-evaluation/human-annotation/ui/data.js',
    'conversation-evaluation/human-annotation/ui/core.js',
    'conversation-evaluation/schemas/evaluator-v3.schema.json',
    'conversation-evaluation/prompts/instructional-features.md',
    'conversation-evaluation/config.json',
  ].map(source => path.resolve(repositoryRoot, source)));
  return {
    name: 'sync-rubric-on-source-change',
    configureServer(server) {
      server.watcher.add([...sources]);
      let timer: ReturnType<typeof setTimeout> | undefined;
      let running = false;
      let rerun = false;
      const sync = () => {
        if (running) { rerun = true; return; }
        running = true;
        execFile(process.execPath, [path.join(portalRoot, 'scripts/sync-rubric.mjs')], { cwd: portalRoot }, (error, stdout, stderr) => {
          if (stdout) server.config.logger.info(stdout.trim());
          if (stderr) server.config.logger.error(stderr.trim());
          if (error) {
            running = false;
            server.config.logger.error(`Rubric sync failed: ${error.message}`);
            if (rerun) { rerun = false; sync(); }
            return;
          }
          execFile(process.execPath, [path.join(portalRoot, 'scripts/sync-comparison-questions.mjs')], { cwd: portalRoot }, (comparisonError, comparisonOutput, comparisonStderr) => {
            running = false;
            if (comparisonOutput) server.config.logger.info(comparisonOutput.trim());
            if (comparisonStderr) server.config.logger.error(comparisonStderr.trim());
            if (comparisonError) server.config.logger.error(`Comparison question sync failed: ${comparisonError.message}`);
            else server.ws.send({ type: 'full-reload' });
            if (rerun) { rerun = false; sync(); }
          });
        });
      };
      server.watcher.on('change', file => {
        if (!sources.has(path.resolve(file))) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(sync, 150);
      });
      server.httpServer?.on('close', () => { if (timer) clearTimeout(timer); });
    },
  };
}
function localAccountsApi(): Plugin {
  let env: Record<string, string> = {};
  const install = (server: Pick<ViteDevServer, 'middlewares'>) => {
    const handler = createAnnotatorHandler({ getEnvironment: () => resolveSupabaseEnvironment({ ...env, ...process.env }) });
    const llmHandler = createLLMAnnotationHandler({ getEnvironment: () => resolveSupabaseEnvironment({ ...env, ...process.env }) });
    server.middlewares.use((request, response, next) => {
      if (request.url?.split('?')[0] === '/api/annotators') void handler(request, response);
      else if (request.url?.split('?')[0] === '/api/llm-annotations') void llmHandler(request, response);
      else next();
    });
  };
  return { name: 'local-accounts-api', configResolved(config) { env = { ...loadEnv(config.mode,path.dirname(config.root),''), ...loadEnv(config.mode, config.root, '') }; }, configureServer: install, configurePreviewServer: install };
}
export default defineConfig(({ mode }) => {
  const env = resolveSupabaseEnvironment({ ...loadEnv(mode, portalRoot, ''), ...process.env });
  return { define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
    'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(env.VITE_SUPABASE_PUBLISHABLE_KEY || ''),
  }, plugins: [react(), rubricSync(), localAccountsApi()], build: { rollupOptions: { output: { manualChunks(id) { if (id.includes('node_modules')) return id.includes('@supabase') ? 'supabase' : 'vendor'; } } } }, test: { include: ['tests/**/*.test.{ts,tsx}'], testTimeout: 30000, hookTimeout: 30000 } };
});
