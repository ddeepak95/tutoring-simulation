import { chromium, expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { assistedPage } from '../../../chatgpt-conversation-extension/src/assisted-page.js';

const sourceUrl = 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0';
const extension = path.resolve('../chatgpt-conversation-extension/dist');
const config = JSON.parse(fs.readFileSync(path.join(extension, 'config.js'), 'utf8').replace(/^export default /, '').replace(/;\s*$/, ''));
const jobId = 'capture:00000000-0000-4000-8000-000000000040';
const userId = '00000000-0000-4000-8000-000000000002';
const fixture = `<!doctype html><meta charset="utf-8"><main><article data-turn="user">Explain water.</article><article data-turn="assistant" data-turn-id="a1"><h2>Water</h2><p>Water changes state.</p>
<section><details><summary>Show an example</summary><p>Hidden example: heat a pan of water.</p></details></section>
<section><button role="tab" aria-selected="true" id="liquid">Liquid</button><button role="tab" aria-selected="false" id="vapour">Vapour</button><p id="tab-content">Liquid particles stay close together.</p></section>
<section><label>Temperature<input type="range" min="0" max="100" value="20"></label><p id="temperature">Cool water</p></section>
<button id="delete">Delete conversation</button><form><button>Submit</button></form></article></main><script>
document.querySelector('#vapour').onclick=()=>{document.querySelector('#tab-content').textContent='Vapour particles move farther apart.';document.querySelector('#liquid').setAttribute('aria-selected','false');document.querySelector('#vapour').setAttribute('aria-selected','true')};
document.querySelector('#liquid').onclick=()=>{document.querySelector('#tab-content').textContent='Liquid particles stay close together.';document.querySelector('#liquid').setAttribute('aria-selected','true');document.querySelector('#vapour').setAttribute('aria-selected','false')};
document.querySelector('input').oninput=event=>document.querySelector('#temperature').textContent=Number(event.target.value)>60?'Hot water':'Cool water';window.deleted=false;document.querySelector('#delete').onclick=()=>window.deleted=true;
</script>`;

test('page adapter exposes bounded response controls and rejects stale, unapproved and unobserved actions', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: fixture + '<article data-turn="assistant"><section><label><input type="radio">Quiz choice</label><button>Next</button></section></article>' }));
  await page.goto(sourceUrl);
  const run = (mode: string, input: any = {}) => page.evaluate(`(${assistedPage.toString()})(${JSON.stringify(mode)}, "test-token", ${JSON.stringify(sourceUrl)}, ${JSON.stringify(input)})`);
  await run('init');
  const observation = await run('observe');
  expect(observation.candidates.map((item: any) => item.label)).not.toContain('Delete conversation');
  expect(observation.candidates.map((item: any) => item.label)).not.toContain('Submit');
  const answer = observation.candidates.find((item: any) => item.kind === 'answer');
  await expect(run('act', { action: 'click', target_id: answer.id, revision: observation.revision, allow_answers: false })).rejects.toThrow('not enabled');
  await expect(run('act', { action: 'click', target_id: 'node-999', revision: observation.revision })).rejects.toThrow('no longer available');
  await expect(run('act', { action: 'click', target_id: answer.id, revision: 0 })).rejects.toThrow('Stale observation');
  expect(await page.evaluate(() => (window as any).deleted)).toBe(false);
  await run('cleanup');
});

for (const stopping of [false, true]) test(stopping ? 'Stop aborts the in-flight decision and retains the initial snapshot' : 'assisted workflow records revealed HTML states, preserves the baseline and saves provenance', async ({}, testInfo) => {
  test.setTimeout(60000);
  const dir = testInfo.outputPath('extension'); fs.cpSync(extension, dir, { recursive: true });
  const manifestPath = path.join(dir, 'manifest.json'); const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.host_permissions.push('<all_urls>'); manifest.background.service_worker = 'test-background.js';
  fs.writeFileSync(path.join(dir, 'test-background.js'), "import {captureJob} from './background.js';globalThis.__capture=captureJob;"); fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  const context = await chromium.launchPersistentContext('', { channel: 'chromium', headless: true, args: ['--disable-extensions-except=' + dir, '--load-extension=' + dir] });
  let saved: any; let decisions = 0;
  try {
    await context.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: fixture }));
    await context.route(config.supabaseUrl + '/**', route => {
      const pathname = new URL(route.request().url()).pathname;
      const reply = (body: unknown) => route.fulfill({ contentType: 'application/json', body: JSON.stringify(body) });
      if (pathname === '/auth/v1/user') return reply({ id: userId });
      if (pathname === '/rest/v1/profiles') return reply([{ id: userId, username: 'admin', role: 'admin' }]);
      if (pathname.includes('/rpc/save_chatgpt_html_archive')) { saved = route.request().postDataJSON().p_capture; return reply({ archive_id: userId, created: true }); }
      return reply({});
    });
    await context.route('http://127.0.0.1:8766/step', async route => {
      decisions++;
      if (stopping) { await new Promise(resolve => setTimeout(resolve, 1500)); return route.abort().catch(() => {}); }
      const { observation, history } = route.request().postDataJSON();
      const names = new Set(history.map((step: any) => step.target));
      const target = observation.candidates.find((item: any) => item.kind === 'expand' && !item.expanded && !names.has(item.label)) || observation.candidates.find((item: any) => item.label === 'Vapour' && !item.selected) || observation.candidates.find((item: any) => item.kind === 'range' && item.value !== '80');
      const action = target ? { type: target.kind === 'range' ? 'set_value' : 'click', target_id: target.id, value: target.kind === 'range' ? '80' : '', reason: 'Reveal another educational state.' } : { type: 'finish', target_id: '', value: '', reason: 'All useful fixture states visited.' };
      return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ action, provider: 'google', model: 'google/gemini-3.8-flash' }) });
    });
    const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
    const source = await context.newPage(); await source.goto(sourceUrl);
    await worker.evaluate(async jobId => {
      const [tab] = await chrome.tabs.query({ url: 'https://chatgpt.com/*' }); await globalThis.__capture(jobId, tab.id);
      await chrome.storage.session.set({ auth: { access_token: 'test', refresh_token: 'test', expires_at: Date.now() / 1000 + 3600 } });
    }, jobId);
    const review = await context.newPage(); await review.goto(worker.url().replace(/test-background\.js$/, 'review.html') + '?job=' + encodeURIComponent(jobId));
    await expect(review.getByRole('button', { name: 'Start assisted capture', exact: true })).toBeEnabled();
    await review.getByRole('button', { name: 'Start assisted capture', exact: true }).click();
    if (stopping) {
      await expect.poll(() => decisions).toBe(1);
      await source.locator('#portal-assisted-controls button').click();
      await expect(review.locator('#assisted-status')).toContainText('stopped', { timeout: 15000 });
    } else {
      await expect(review.locator('#assisted-status')).toContainText('completed', { timeout: 30000 });
      const viewer = review.frameLocator('#selectable-frame');
      await expect(viewer.getByText('Vapour particles move farther apart.')).toBeVisible();
      await expect(viewer.getByText('Hot water')).toBeVisible();
      await expect(viewer.getByText('Liquid particles stay close together.').first()).toBeVisible();
      await expect(review.locator('#assisted-log')).toContainText('Vapour');
      expect(decisions).toBe(4);
      expect(await source.locator('details').evaluate(node => (node as HTMLDetailsElement).open)).toBe(false);
      await expect(source.locator('input[type="range"]')).toHaveValue('20');
      await review.getByLabel('Topic', { exact: true }).fill('States of water'); await review.getByLabel('Language', { exact: true }).fill('English');
      await review.getByRole('button', { name: 'Save to database', exact: true }).click();
      await expect(review.getByRole('heading', { name: 'HTML archive saved', exact: true })).toBeVisible();
      expect(saved.report.assisted.provider).toBe('google'); expect(saved.report.assisted.states_saved).toBeGreaterThanOrEqual(4);
      expect(saved.html).toContain('Vapour particles move farther apart.'); expect(saved.html).toContain('Water changes state.');
    }
    expect(await source.evaluate(() => (window as any).deleted)).toBe(false);
    await expect(source.locator('#portal-assisted-controls')).toHaveCount(0);
  } finally { await context.close(); }
});
