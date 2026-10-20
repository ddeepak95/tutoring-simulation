import { chromium, expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const sourceId = '058c1f12-8046-4a9d-ba3f-a29d558fcbf0';
const jobId = 'capture:00000000-0000-4000-8000-000000000080';

test('original-page experiment captures native MHTML and a local JavaScript/CSS/SVG replay ZIP', async ({}, testInfo) => {
  const extension = testInfo.outputPath('extension');
  fs.cpSync(path.resolve('../chatgpt-conversation-extension/dist'), extension, { recursive: true });
  const manifestPath = path.join(extension, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  // Fixture-only host permission simulates a toolbar activeTab grant.
  manifest.host_permissions.push('https://chatgpt.com/*');
  manifest.background.service_worker = 'test-background.js';
  fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  fs.writeFileSync(path.join(extension, 'test-background.js'), "import './background.js'; import { readOriginalArchive } from './archive-store.js'; globalThis.readArchive = readOriginalArchive;");
  const context = await chromium.launchPersistentContext('', { channel: 'chromium', headless: true, acceptDownloads: true, args: ['--disable-extensions-except=' + extension, '--load-extension=' + extension] });
  try {
    await context.route('https://**/*', route => {
      const url = new URL(route.request().url());
      if (url.hostname !== 'chatgpt.com') return route.fulfill({ status: 401, body: '{}' });
      if (url.pathname === '/assets/app.js') return route.fulfill({ contentType: 'text/javascript', body: "document.body.dataset.executions=String(Number(document.body.dataset.executions||0)+1); document.querySelector('#status').textContent='JavaScript initialized';" });
      if (url.pathname === '/assets/site.css') return route.fulfill({ contentType: 'text/css', body: '@keyframes pulse{from{opacity:.4}to{opacity:1}}.box{width:120px;height:60px;background:rgb(12,34,56);animation:pulse 1s infinite alternate;background-image:url("diagram.svg")}' });
      if (url.pathname === '/assets/diagram.svg') return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="red"/></svg>' });
      if (url.pathname === '/assets/missing.js') return route.fulfill({ status: 403, body: 'Unavailable' });
      return route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><head><meta charset="utf-8"><title>Original experiment</title><link rel="stylesheet" href="/assets/site.css"><script src="/assets/app.js" defer></script><script src="/assets/missing.js" defer></script></head><body><script>window.inlineScript="preserved";</script><h1>தமிழ் conversation</h1><p id="status">Loading</p><div class="box"></div><img src="/assets/diagram.svg"><svg width="100" height="20"><rect width="10" height="10"><animate attributeName="x" from="0" to="80" dur="1s" repeatCount="indefinite"/></rect></svg></body></html>' });
    });
    const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
    const source = await context.newPage(); await source.goto('https://chatgpt.com/c/' + sourceId);
    await expect(source.locator('#status')).toHaveText('JavaScript initialized');
    const tabId = await worker.evaluate(async () => (await chrome.tabs.query({ url: 'https://chatgpt.com/*' }))[0].id);
    // Allow startup/session cleanup to complete before seeding this fixture job.
    await expect.poll(() => worker.evaluate(async () => (await chrome.storage.session.get('originalArchiveSession')).originalArchiveSession)).toBe(true);
    await worker.evaluate(async ({ jobId, tabId, sourceId }) => {
      await chrome.storage.session.set({ [jobId]: { status: 'ready', tabId, capture: { format_version: 'chatgpt-html-archive/1', source: { conversation_id: sourceId, url: 'https://chatgpt.com/c/' + sourceId }, title: 'Test', html: '<p>Separate cleaned transcript</p>', text: 'Separate cleaned transcript', report: { limitations: [] } } } });
    }, { jobId, tabId, sourceId });
    const review = await context.newPage();
    await review.goto(worker.url().replace(/test-background\.js$/, 'review.html') + '?job=' + encodeURIComponent(jobId));
    await review.getByRole('button', { name: 'Capture original page + JavaScript', exact: true }).click();
    await expect.poll(() => review.locator('#original-status').innerText(), { timeout: 35000 }).toMatch(/Ready:|Could not|failed|timed out/i);
    await expect(review.locator('#original-status')).toContainText('Ready:');
    await expect(review.getByRole('button', { name: 'Download original page (.mhtml)', exact: true })).toBeVisible();
    const record = await worker.evaluate(async jobId => {
      const data = await globalThis.readArchive(jobId);
      return { mhtml: await data.mhtml?.text(), resources: data.resources, errors: data.errors };
    }, jobId);
    expect(record.errors).toEqual([]);
    expect(record.mhtml).toContain('multipart/related'); expect(record.mhtml).toContain('site.css');
    expect(record.resources.resources.find((item: any) => item.url.endsWith('/missing.js')).status).toBe('missing');
    const files = record.resources.files;
    const script = files.find((file: any) => file.source?.endsWith('/app.js'));
    expect(script.content).toContain('dataset.executions');
    const index = files.find((file: any) => file.path === 'index.html').content;
    expect(index).toContain('window.inlineScript'); expect(index).toContain('<animate');
    expect(index).not.toContain('data-portal-earlier-turns');
    const downloadEvent = review.waitForEvent('download');
    await review.getByRole('button', { name: 'Download experiment (.zip)', exact: true }).click();
    const download = await downloadEvent; const zipPath = testInfo.outputPath('original.zip'); await download.saveAs(zipPath);
    const zip = JSON.parse(execFileSync('python', ['-c', 'import zipfile,json,sys; z=zipfile.ZipFile(sys.argv[1]); print(json.dumps({"names":z.namelist(),"bad":z.testzip()}))', zipPath], { encoding: 'utf8' }));
    expect(zip.bad).toBeNull(); expect(zip.names).toEqual(expect.arrayContaining(['index.html', 'source.html.txt', 'page.mhtml', 'manifest.json', 'README.txt', 'conversation.html']));
    await context.route('http://127.0.0.1:8765/**', route => {
      const pathname = new URL(route.request().url()).pathname.slice(1) || 'index.html';
      const file = files.find((item: any) => item.path === pathname);
      if (!file) return route.fulfill({ status: 404, body: 'Not archived' });
      return route.fulfill({ contentType: pathname.endsWith('.html') ? 'text/html; charset=utf-8' : file.type || 'text/plain', body: file.encoding === 'base64' ? Buffer.from(file.content, 'base64') : file.content });
    });
    const replay = await context.newPage(); await replay.goto('http://127.0.0.1:8765/index.html');
    await expect(replay.locator('body')).toHaveAttribute('data-executions', '2');
    expect(await replay.evaluate(() => window.inlineScript)).toBe('preserved');
    await expect(replay.locator('.box')).toHaveCSS('background-color', 'rgb(12, 34, 56)');
    await expect(replay.locator('.box')).toHaveCSS('animation-name', 'pulse');
    expect(await replay.locator('img').evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(16);
    const motion = await replay.locator('svg rect').evaluate(async (node: SVGRectElement) => {
      const first = node.x.animVal.value; await new Promise(resolve => setTimeout(resolve, 150)); return Math.abs(first - node.x.animVal.value);
    });
    expect(motion).toBeGreaterThan(0);
    await replay.close();
    // Native file must be opened as a top-level local file, not an iframe.
    const nativeDownloadEvent = review.waitForEvent('download');
    await review.getByRole('button', { name: 'Download original page (.mhtml)', exact: true }).click();
    const nativeDownload = await nativeDownloadEvent; const nativePath = testInfo.outputPath('page.mhtml'); await nativeDownload.saveAs(nativePath);
    const nativeView = await context.newPage(); await nativeView.goto('file:///' + nativePath.replace(/\\/g, '/'));
    await expect(nativeView.locator('h1')).toContainText('தமிழ்');
    await expect(nativeView.locator('.box')).toHaveCSS('background-color', 'rgb(12, 34, 56)');
  } finally { await context.close(); }
});
