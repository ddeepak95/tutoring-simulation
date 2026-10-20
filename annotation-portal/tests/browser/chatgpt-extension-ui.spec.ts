import { chromium, expect, test, type BrowserContext } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const extension = path.resolve('../chatgpt-conversation-extension/dist');
const extensionVersion = JSON.parse(fs.readFileSync(path.join(extension, 'manifest.json'), 'utf8')).version;
const config = JSON.parse(fs.readFileSync(path.join(extension, 'config.js'), 'utf8').replace(/^export default /, '').replace(/;\s*$/, ''));
const id = '00000000-0000-4000-8000-000000000002';
const savedId = '00000000-0000-4000-8000-000000000020';
const sourceId = '058c1f12-8046-4a9d-ba3f-a29d558fcbf0';
const jobId = 'capture:00000000-0000-4000-8000-000000000030';

async function setup(role: 'admin' | 'annotator' = 'annotator') {
  const context = await chromium.launchPersistentContext('', { channel: 'chromium', headless: true, args: ['--disable-extensions-except=' + extension, '--load-extension=' + extension] });
  const state = { role, failSave: false, expired: false, saved: false, lastCapture: null as any, signIns: 0 };
  await context.route('https://**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== config.supabaseUrl) return route.abort();
    const send = (body: unknown, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
    if (url.pathname === '/auth/v1/token') {
      state.signIns++; state.expired = false;
      return send({ access_token: 'test-access', refresh_token: 'test-refresh', expires_in: 3600 });
    }
    if (state.expired) return send({ message: 'Expired session' }, 401);
    if (url.pathname === '/auth/v1/user') return send({ id });
    if (url.pathname === '/rest/v1/profiles') return send([{ id, username: role === 'admin' ? 'admin' : 'alice', role: state.role }]);
    if (url.pathname === '/auth/v1/logout') return send({});
    if (['/rest/v1/rpc/import_chatgpt_conversation', '/rest/v1/rpc/save_chatgpt_html_archive'].includes(url.pathname)) {
      state.lastCapture = route.request().postDataJSON().p_capture;
      const created = !state.saved; state.saved = true;
      // Model a committed save with a lost/error response: retry must be safe.
      if (state.failSave) return send({ message: 'Lost save response' }, 503);
      return send({ conversation_id: savedId, archive_id: savedId, created, snapshot_sha256: 'a'.repeat(64) });
    }
    return send({ message: 'Unexpected request' }, 400);
  });
  const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
  await worker.evaluate(async ({ jobId, sourceId }) => {
    await chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' });
    await chrome.storage.session.set({ [jobId]: { status: 'ready', capture: {
      format_version: 'chatgpt-portal-capture/1', source: { conversation_id: sourceId, url: 'https://chatgpt.com/c/' + sourceId },
      title: 'Evaporation', extractor_version: 'dom-scroll-v1.0.0', captured_at: new Date().toISOString(),
      report: { complete: true, top_reached: true, bottom_reached: true, consistent_passes: true, message_count: 2, limitations: [] },
      messages: [{ id: 'user-1', role: 'user', content: 'Explain evaporation' }, { id: 'assistant-1', role: 'assistant', content: '## Evaporation\nWater becomes vapour. <script>unsafe()</script>' }],
    } } });
  }, { jobId, sourceId });
  const page = await context.newPage();
  await page.goto(worker.url().replace(/background\.js$/, 'review.html') + '?job=' + encodeURIComponent(jobId));
  const login = async () => {
    await page.getByLabel('Username', { exact: true }).fill('alice');
    await page.getByLabel('Password', { exact: true }).fill('private-test-password');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Sign out', exact: true })).toBeVisible();
  };
  return { context, state, page, worker, login };
}

test('extension previews safely, signs in, retains drafts and retries a lost save without duplication', async () => {
  const { context, page, state, worker, login } = await setup();
  try {
    await expect(page.getByText('2 messages · 1 assistant responses', { exact: true })).toBeVisible();
    await expect(page.locator('#messages script')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Save to database', exact: true })).toBeDisabled();
    await login();
    await page.getByLabel('Topic', { exact: true }).fill('ஆவியாதல்');
    await page.getByLabel('Language', { exact: true }).fill('Tamil');
    await page.reload();
    await expect(page.getByLabel('Topic', { exact: true })).toHaveValue('ஆவியாதல்');
    await expect(page.getByRole('button', { name: 'Sign out', exact: true })).toBeVisible();
    state.failSave = true;
    await page.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('temporarily unavailable');
    await expect(page.getByLabel('Topic', { exact: true })).toHaveValue('ஆவியாதல்');
    state.failSave = false;
    await page.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'This snapshot is already saved', exact: true })).toBeVisible();
    await expect(page.getByText('Saved—awaiting admin assignment.', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open in portal', exact: true })).toBeHidden();
    expect(state.lastCapture.messages[1].role).toBe('assistant');
    expect(state.lastCapture.language).toBe('Tamil');
    const storage = await worker.evaluate(async () => ({ session: await chrome.storage.session.get(null), local: await chrome.storage.local.get(null) }));
    expect(JSON.stringify(storage)).not.toContain('private-test-password');
    expect(JSON.stringify(storage.local)).not.toContain('test-access');
    expect(storage.local.lastLanguage).toBe('Tamil');
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
    expect((await worker.evaluate(() => chrome.storage.session.get('auth'))).auth).toBeUndefined();
  } finally { await context.close(); }
});

test('extension recovers an expired session and gives admins a configurable portal link', async () => {
  const { context, page, state, login } = await setup('admin');
  try {
    await login();
    await page.getByLabel('Topic', { exact: true }).fill('Evaporation');
    await page.getByLabel('Language', { exact: true }).fill('English');
    state.expired = true;
    await page.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('session has expired');
    await login();
    await expect(page.getByLabel('Topic', { exact: true })).toHaveValue('Evaporation');
    await page.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Open in portal', exact: true })).toHaveAttribute('href', 'http://127.0.0.1:5173/conversations/' + savedId);
    await page.getByText('Portal settings', { exact: true }).click();
    await page.getByLabel('Portal address', { exact: true }).fill('https://evaluation.example.com');
    await page.getByRole('button', { name: 'Save address', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Open in portal', exact: true })).toHaveAttribute('href', 'https://evaluation.example.com/conversations/' + savedId);
  } finally { await context.close(); }
});

test('HTML archive preview stays inert, retries saves and links admins to archives', async () => {
  const { context, page, state, worker, login } = await setup('admin');
  try {
    await worker.evaluate(async jobId => {
      const job = (await chrome.storage.session.get(jobId))[jobId];
      job.capture = { ...job.capture, format_version: 'chatgpt-html-archive/1', html: '<html><head><style>p{color:rgb(12,34,56);padding:24px;background:rgb(240,220,200)}</style></head><body><script>document.body.dataset.executed="yes"</script><nav>Sidebar</nav><p>தமிழ் answer</p></body></html>', text: 'Sidebar\nதமிழ் answer', report: { scope: 'loaded-page', history_verified: false, limitations: ['Loaded page only'] } };
      delete job.capture.messages;
      await chrome.storage.session.set({ [jobId]: job });
    }, jobId);
    await expect(page.locator('#message-count')).toContainText('HTML archive');
    await expect(page.locator('iframe.page-preview')).toHaveAttribute('sandbox', '');
    const previewFrame = page.frameLocator('iframe.page-preview');
    await expect(previewFrame.locator('p')).toHaveCSS('color', 'rgb(12, 34, 56)');
    await expect(previewFrame.locator('p')).toHaveCSS('padding-top', '24px');
    await expect(previewFrame.locator('p')).toHaveCSS('background-color', 'rgb(240, 220, 200)');
    await expect(previewFrame.locator('body')).not.toHaveAttribute('data-executed', 'yes');
    await expect(page.locator('#messages details pre').first()).toContainText('தமிழ் answer');
    await page.getByText('View captured HTML', { exact: true }).click();
    await expect(page.locator('#messages script')).toHaveCount(0);
    await login();
    await page.getByLabel('Topic', { exact: true }).fill('Evaporation');
    await page.getByLabel('Language', { exact: true }).fill('Tamil');
    state.failSave = true;
    await page.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('temporarily unavailable');
    state.failSave = false;
    await page.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'This snapshot is already saved', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open in portal', exact: true })).toHaveAttribute('href', 'http://127.0.0.1:5173/#html-archives');
    expect(state.lastCapture.html).toContain('தமிழ் answer'); expect(state.lastCapture.messages).toBeUndefined();
  } finally { await context.close(); }
});

test('selectable viewer edits/imports translations and saves the translated layout', async () => {
  const { context, page, state, worker, login } = await setup('admin');
  try {
    await worker.evaluate(async jobId => {
      const job = (await chrome.storage.session.get(jobId))[jobId];
      job.capture = { ...job.capture, format_version: 'chatgpt-html-archive/1', html: '<article data-chatgpt-agent-turn-start data-dil-message-id="shared"><button data-user-message-bubble data-dil-message-id="shared">Explain water.</button><p>Water becomes vapour.</p><p>End of explanation.</p></article>', text: 'Explain water. Water becomes vapour. End of explanation.', report: { scope: 'loaded-page', history_verified: false, limitations: [] } }; delete job.capture.messages;
      await chrome.storage.session.set({ [jobId]: job });
    }, jobId);
    await expect(page.locator('#selectable-status')).toContainText('3 selectable text segments');
    await page.getByLabel('Translation language', { exact: true }).fill('Tamil');
    await page.getByText('Edit translated text segments', { exact: true }).click();
    await page.locator('#translation-fields label').filter({ hasText: 'Water becomes vapour.' }).locator('textarea').fill('நீர் ஆவியாக மாறுகிறது. '.repeat(30));
    const viewer = page.frameLocator('#selectable-frame');
    await expect(viewer.locator('.turn.assistant')).toContainText('நீர் ஆவியாக');
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Export translation JSON', exact: true }).click();
    const file = await downloadEvent; const exported = JSON.parse(fs.readFileSync((await file.path())!, 'utf8'));
    expect(exported.language).toBe('Tamil'); expect(exported.units.some((unit: any) => unit.source === 'Water becomes vapour.' && unit.text.includes('நீர்'))).toBe(true);
    await page.locator('#translation-import').setInputFiles({ name: 'wrong.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ ...exported, document_id: 'wrong-capture' })) });
    await expect(page.locator('#selectable-status')).toContainText('this exact captured conversation');
    await page.locator('#translation-import').setInputFiles({ name: 'correct.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(exported)) });
    await expect(page.locator('#selectable-status')).toContainText('1 translated segments');
    await page.reload();
    await expect(page.getByLabel('Translation language', { exact: true })).toHaveValue('Tamil');
    await expect(page.frameLocator('#selectable-frame').locator('.turn.assistant')).toContainText('நீர் ஆவியாக');
    await login(); await page.getByLabel('Topic', { exact: true }).fill('Water'); await page.getByLabel('Language', { exact: true }).fill('English');
    await page.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'HTML archive saved', exact: true })).toBeVisible();
    expect(state.lastCapture.language).toBe('Tamil'); expect(state.lastCapture.report.selectable.translated_segments).toBe(1);
    expect(state.lastCapture.html).toContain('conversation-metadata'); expect(state.lastCapture.html).toContain('நீர் ஆவியாக');
    expect(state.lastCapture.html).toContain('Explain water.'); expect(state.lastCapture.html).toContain('class="turn user"');
  } finally { await context.close(); }
});

test('real script injection captures a thread layout and feeds the review page', async ({}, testInfo) => {
  const testExtension = testInfo.outputPath('injection-extension');
  fs.cpSync(extension, testExtension, { recursive: true });
  const manifestPath = path.join(testExtension, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  // Only this isolated test build gets host access, to simulate an activeTab
  // toolbar grant without depending on OS-level Chrome toolbar automation.
  manifest.host_permissions.push('<all_urls>'); // Test-only grant also permits captureVisibleTab.
  manifest.background.service_worker = 'test-background.js';
  fs.writeFileSync(path.join(testExtension, 'test-background.js'), "import { captureJob } from './background.js'; globalThis.__testCapture = captureJob;");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  const context = await chromium.launchPersistentContext('', { channel: 'chromium', headless: true, args: ['--disable-extensions-except=' + testExtension, '--load-extension=' + testExtension] });
  try {
    await context.route('https://**/*', route => new URL(route.request().url()).hostname === 'chatgpt.com'
      ? route.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><title>Injection test - ChatGPT</title><style>.markdown{background:rgb(210,230,240);padding:18px;font-size:21px}</style><div id="thread"><article data-testid="conversation-turn-0" data-turn="user" data-turn-id="u1"><div class="whitespace-pre-wrap">Question</div></article><article data-testid="conversation-turn-1" data-turn="assistant" data-turn-id="a1"><div class="markdown"><p>Answer from injected capture</p></div></article></div>' })
      : route.fulfill({ status: 401, contentType: 'application/json', body: '{}' }));
    const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
    await context.route('https://visual.test/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><style>body{margin:0;background:rgb(10,80,160)}.dot{width:10px;height:10px;background:red;animation:slide 1s infinite}@keyframes slide{from{transform:translateX(0)}to{transform:translateX(100px)}}</style><div class="dot"></div>' }));
    let savedCapture: any; const storageUploads: string[] = [];
    await context.route(config.supabaseUrl + '/**', route => {
      const pathname = new URL(route.request().url()).pathname;
      const send = (body: unknown) => route.fulfill({ contentType: 'application/json', body: JSON.stringify(body) });
      if (pathname === '/auth/v1/token') return send({ access_token: 'fixture-token', refresh_token: 'fixture-refresh', expires_in: 3600 });
      if (pathname === '/auth/v1/user') return send({ id });
      if (pathname === '/rest/v1/profiles') return send([{ id, username: 'admin', role: 'admin' }]);
      if (pathname.startsWith('/storage/v1/object/capture-images/')) { storageUploads.push(pathname); return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }); }
      if (pathname === '/rest/v1/rpc/save_chatgpt_html_archive') { savedCapture = route.request().postDataJSON().p_capture; return send({ archive_id: savedId, created: true }); }
      return send({});
    });
    const source = await context.newPage();
    await source.goto('https://chatgpt.com/c/' + sourceId);
    await source.evaluate(async () => {
      const canvas = document.createElement('canvas'); canvas.width = 10; canvas.height = 10;
      canvas.getContext('2d')!.fillRect(0, 0, 10, 10);
      const image = document.createElement('img'); image.src = canvas.toDataURL(); image.alt = 'Captured diagram';
      document.querySelector('.markdown')!.append(image); await image.decode();
      const blocked = document.createElement('img'); blocked.src = 'https://blocked.example/image.png'; blocked.alt = 'Remote image'; document.querySelector('.markdown')!.append(blocked);
      const diagram = document.createElement('canvas'); diagram.width = 80; diagram.height = 50;
      diagram.getContext('2d')!.fillStyle = 'rgb(200,30,60)'; diagram.getContext('2d')!.fillRect(0, 0, 80, 50);
      document.querySelector('.markdown')!.append(diagram);
      const frame = document.createElement('iframe'); frame.src = 'https://visual.test/animation'; frame.title = 'Framed animation'; frame.width = '140'; frame.height = '90'; frame.style.cssText = 'display:block;border:0';
      const loaded = new Promise(resolve => frame.onload = resolve); document.querySelector('.markdown')!.append(frame); await loaded;
      const tall = frame.cloneNode() as HTMLIFrameElement; tall.title = 'Tall animation'; tall.height = '1000';
      const tallLoaded = new Promise(resolve => tall.onload = resolve); document.querySelector('.markdown')!.append(tall); await tallLoaded;
      const style = document.createElement('style'); style.textContent = '.html-motion{width:140px;height:100px;background:rgb(30,150,80);animation:motion-opacity 1s infinite alternate}@keyframes motion-opacity{from{opacity:.8}to{opacity:1}}'; document.head.append(style);
      const motion = document.createElement('div'); motion.className = 'html-motion'; motion.setAttribute('aria-label', 'CSS animation'); document.querySelector('.markdown')!.append(motion);
      const quiz = document.createElement('section'); quiz.id = 'gated-quiz'; document.querySelector('.markdown')!.append(quiz);
      let question = 1; const answered: Record<number, number> = {};
      function renderQuiz() {
        quiz.innerHTML = '<h4>Question ' + question + ' of 3</h4><p>Captured quiz question ' + question + '</p>' + ['First choice', 'Second choice'].map((choice, index) => '<label><input type="radio" name="quiz-answer" data-index="' + index + '" ' + (answered[question] === index ? 'checked' : '') + '>' + choice + '</label>').join('') + (answered[question] !== undefined ? '<p>Quiz feedback ' + question + '</p>' : '') + '<button type="button" id="quiz-prev" ' + (question === 1 || answered[question] === undefined ? 'disabled' : '') + '>Previous</button><button type="button" id="quiz-next" ' + (question === 3 || answered[question] === undefined ? 'disabled' : '') + '>Next</button>';
        for (const input of quiz.querySelectorAll<HTMLInputElement>('input')) input.onchange = () => { answered[question] = Number(input.dataset.index); renderQuiz(); };
        quiz.querySelector<HTMLButtonElement>('#quiz-prev')!.onclick = () => { question--; renderQuiz(); };
        quiz.querySelector<HTMLButtonElement>('#quiz-next')!.onclick = () => { question++; renderQuiz(); };
      }
      renderQuiz();
    });
    let job = await worker.evaluate(async jobId => {
      const [tab] = await chrome.tabs.query({ url: 'https://chatgpt.com/*' });
      await globalThis.__testCapture(jobId, tab.id);
      return (await chrome.storage.session.get(jobId))[jobId];
    }, jobId);
    expect(job.status).toBe('ready'); expect(job.capture.html).toContain('Answer from injected capture');
    const review = await context.newPage();
    await review.goto(worker.url().replace(/test-background\.js$/, 'review.html') + '?job=' + encodeURIComponent(jobId));
    await expect(review.locator('#messages details pre').first()).toContainText('Answer from injected capture');
    await expect(review.locator('#capture-status')).toContainText('Capture ready');
    await expect(review.locator('#extension-version')).toContainText(extensionVersion);
    // Initial toolbar capture now answers all questions without a second action.
    expect(job.capture.report.quizzes[0]).toMatchObject({ captured: 3, total: 3, complete: true });
    await expect(review.getByLabel('Allow the agent to select quiz answers to reveal content (changes source answers)')).toBeChecked();
    await expect(review.locator('#selectable-warnings')).toContainText('3 of 3 questions captured', { timeout: 15000 });
    await expect(review.locator('#selectable-warnings')).toContainText('not learner responses');
    job = await worker.evaluate(async jobId => (await chrome.storage.session.get(jobId))[jobId], jobId);
    expect(job.capture.report.quizzes[0]).toMatchObject({ captured: 3, complete: true, restored: true, auto_answered_questions: [1, 2, 3] });
    await expect(source.locator('#gated-quiz h4')).toHaveText('Question 1 of 3');
    const denied = await review.evaluate(() => chrome.runtime.sendMessage({ type: 'capture-visual', token: 'invalid', rect: { x: 0, y: 0, width: 50, height: 50 }, viewport: { width: 1280, height: 720 } }));
    expect(denied.error).toContain('No active visual capture');
    const styled = review.frameLocator('iframe.page-preview').locator('.markdown');
    await expect(styled).toHaveCSS('background-color', 'rgb(210, 230, 240)');
    await expect(styled).toHaveCSS('padding-top', '18px');
    await expect(styled).toHaveCSS('font-size', '21px');
    await expect(styled.locator('img').first()).toBeVisible();
    expect(await styled.locator('img').first().evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(10);
    expect(job.capture.report.images.screenshots).toBeGreaterThan(0);
    const diagram = styled.locator('img[data-portal-visual-kind="screenshot"][alt="Captured diagram"]');
    await expect(diagram).toBeVisible();
    expect(await diagram.evaluate((node: HTMLImageElement) => {
      const canvas = document.createElement('canvas'); canvas.width = node.naturalWidth; canvas.height = node.naturalHeight;
      canvas.getContext('2d')!.drawImage(node, 0, 0); return [...canvas.getContext('2d')!.getImageData(20, 20, 1, 1).data];
    })).toEqual([200, 30, 60, 255]);
    const animation = review.frameLocator('#selectable-frame').locator('img[alt="Framed animation"]');
    await expect(animation).toBeVisible();
    expect(await animation.evaluate((node: HTMLImageElement) => {
      const canvas = document.createElement('canvas'); canvas.width = node.naturalWidth; canvas.height = node.naturalHeight;
      canvas.getContext('2d')!.drawImage(node, 0, 0); return [...canvas.getContext('2d')!.getImageData(70, 60, 1, 1).data];
    })).toEqual([10, 80, 160, 255]);
    expect(job.capture.report.images.partial_screenshots).toBeGreaterThan(0);
    await expect(review.locator('#selectable-warnings')).toContainText('visible part');
    await review.getByLabel('Username', { exact: true }).fill('admin'); await review.getByLabel('Password', { exact: true }).fill('fixture-password');
    await review.getByRole('button', { name: 'Sign in', exact: true }).click();
    await review.getByLabel('Topic', { exact: true }).fill('Motion'); await review.getByLabel('Language', { exact: true }).fill('English');
    await review.getByRole('button', { name: 'Save to database', exact: true }).click();
    await expect(review.getByRole('heading', { name: 'HTML archive saved', exact: true })).toBeVisible();
    expect(savedCapture.html).toContain('Framed animation'); expect(savedCapture.html).toContain('/storage/v1/object/public/capture-images/captures/'); expect(storageUploads.length).toBeGreaterThan(0);
    expect(savedCapture.html).not.toMatch(/<img\b[^>]*src=["']data:image\//i);
    expect(savedCapture.html).toContain('https://blocked.example/image.png');
    expect(savedCapture.html).toContain('CSS animation');
    expect(savedCapture.html).toContain('Captured quiz question 3');
    expect(savedCapture.html).toContain('Capture-generated answer');
    expect(savedCapture.report.quizzes[0].selections_are_learner_responses).toBe(false);
    expect(savedCapture.report.selectable.media.screenshots).toBeGreaterThanOrEqual(4);
    expect(savedCapture.report.selectable.media.partial).toBeGreaterThan(0);
    expect(savedCapture.html).toContain('Question'); expect(savedCapture.html).toContain('class="turn user"');
    await source.evaluate(() => {
      document.querySelector('#thread')!.innerHTML = '<section data-part="private-marker-value"><p>Secret conversation content</p></section>';
    });
    await worker.evaluate(async jobId => {
      const [tab] = await chrome.tabs.query({ url: 'https://chatgpt.com/*' });
      await globalThis.__testCapture(jobId, tab.id);
    }, jobId);
    await expect(review.locator('#messages details pre').first()).toContainText('Secret conversation content');
    await expect(review.locator('#message-count')).toContainText('HTML archive');
    await expect(review.locator('#capture-diagnostics')).toBeHidden();

  } finally { await context.close(); }
});
