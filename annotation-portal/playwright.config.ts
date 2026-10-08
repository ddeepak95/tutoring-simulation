import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', timeout: 45000, workers: 1,
  use: { baseURL: 'http://127.0.0.1:5174', headless: true, launchOptions: process.platform === 'win32' ? { channel: 'msedge' } : {}, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev -- --port 5174 --strictPort', url: 'http://127.0.0.1:5174', reuseExistingServer: false, env: { VITE_SUPABASE_URL: 'https://portal-test.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: 'test-public-key' } }
});
