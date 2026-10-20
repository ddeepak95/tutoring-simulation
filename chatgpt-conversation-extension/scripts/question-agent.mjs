import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { parseQuestionSet, questionFingerprint, answerSelectionScopes, mergeInteractiveStates, isAnswerAllowed } from './question-agent-core.mjs';

const extensionRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = path.resolve(extensionRoot, '..');
const portalRoot = path.join(workspaceRoot, 'annotation-portal');
const portalRequire = createRequire(path.join(portalRoot, 'package.json'));
const { chromium } = portalRequire('@playwright/test');
const ts = portalRequire('typescript');
const parse5 = await import(pathToFileURL(portalRequire.resolve('parse5')).href);
const { capturePageHtml } = await import(pathToFileURL(path.join(extensionRoot, 'src/capture.js')).href);
const { assistedPage } = await import(pathToFileURL(path.join(extensionRoot, 'src/assisted-page.js')).href);
const { decide } = await import(pathToFileURL(path.join(extensionRoot, 'scripts/agent-server.mjs')).href);

const runtimeRoot = path.join(extensionRoot, '.runtime', 'question-agent');
const defaultQuestionsPath = path.join(runtimeRoot, 'questions.json');
const progressPath = path.join(runtimeRoot, 'progress.json');
const profilePath = path.join(runtimeRoot, 'chrome-profile');
const composerSelector = '#prompt-textarea,[data-testid="prompt-textarea"],textarea,[contenteditable="true"][data-placeholder*="Message" i]';
const conversationPattern = /^https:\/\/chatgpt\.com\/(?:g\/[a-zA-Z0-9_/-]+\/)?c\/[a-f0-9-]{36}\/?(?:[?#].*)?$/i;
let context;
let stopRequested = false;

function loadEnvironment() {
  for (const file of [path.join(portalRoot, '.env.local'), path.join(workspaceRoot, '.env')]) {
    if (fs.existsSync(file)) process.loadEnvFile(file);
  }
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return fallback; throw new Error('Could not read ' + file + ': ' + error.message); }
}

function writeJsonAtomic(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = file + '.' + process.pid + '.tmp';
  fs.writeFileSync(temporary, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 });
  fs.renameSync(temporary, file);
}

async function readSecret(prompt) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') throw new Error('Run this command in an interactive terminal so the portal password can be entered without echo.');
  stdout.write(prompt);
  stdin.setRawMode(true); stdin.resume(); stdin.setEncoding('utf8');
  return new Promise((resolve, reject) => {
    let value = '';
    const cleanup = () => { stdin.off('data', onData); stdin.setRawMode(false); stdout.write('\n'); };
    const onData = chunk => {
      for (const char of chunk) {
        if (char === '\u0003') { cleanup(); reject(new Error('Cancelled.')); return; }
        if (char === '\r' || char === '\n') { cleanup(); resolve(value); return; }
        if (char === '\u007f' || char === '\b') value = value.slice(0, -1);
        else if (char >= ' ') value += char;
      }
    };
    stdin.on('data', onData);
  });
}

async function portalCredentials() {
  const line = createInterface({ input: stdin, output: stdout });
  const username = (await line.question('Portal admin username: ')).trim().toLowerCase();
  line.close();
  if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(username)) throw new Error('Use a portal username with 3 to 32 letters, numbers, dots, underscores, or hyphens.');
  const password = await readSecret('Portal admin password: ');
  if (!password) throw new Error('A portal password is required.');
  return { username, password };
}

async function readConfig() {
  const urlText = process.env.VITE_SUPABASE_URL;
  const publicKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!urlText || !publicKey || !process.env.GEMINI_API_KEY) throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in annotation-portal/.env.local, and GEMINI_API_KEY in the workspace .env.');
  let supabase;
  try { supabase = new URL(urlText); } catch { throw new Error('VITE_SUPABASE_URL must be a valid HTTPS origin.'); }
  if (supabase.protocol !== 'https:' || !/^[a-z0-9-]+\.supabase\.co$/.test(supabase.hostname) || supabase.username || supabase.password || supabase.pathname !== '/' || supabase.search || supabase.hash) throw new Error('VITE_SUPABASE_URL must be a Supabase HTTPS origin.');
  if (!publicKey.startsWith('sb_publishable_')) {
    let claims;
    try { claims = JSON.parse(Buffer.from(publicKey.split('.')[1], 'base64url').toString('utf8')); } catch { /* validate below */ }
    if (claims?.role !== 'anon') throw new Error('Only a public Supabase publishable/anon key may be used.');
  }
  const evaluation = JSON.parse(fs.readFileSync(path.join(portalRoot, 'server/generated/evaluation-config.json'), 'utf8'));
  const model = String(evaluation.model || '').replace(/^google\//, '');
  if (!/^gemini-[a-z0-9.-]+$/.test(model)) throw new Error('The configured evaluation model must be Gemini.');
  return { supabase: supabase.origin, publicKey, geminiKey: process.env.GEMINI_API_KEY, model };
}

async function portalRequest(config, token, endpoint, options = {}) {
  const response = await fetch(config.supabase + endpoint, {
    ...options,
    headers: { apikey: config.publicKey, ...(token ? { Authorization: 'Bearer ' + token } : {}), ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) },
    signal: options.signal || AbortSignal.timeout(30000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = body.message || body.error_description || body.msg;
    throw new Error(detail && response.status < 500 ? String(detail).slice(0, 500) : 'Portal API request failed with HTTP ' + response.status + '.');
  }
  return body;
}

async function signInPortal(config) {
  const { username, password } = await portalCredentials();
  const tokenData = await portalRequest(config, null, '/auth/v1/token?grant_type=password', {
    method: 'POST', body: JSON.stringify({ email: username + '@users.annotation.invalid', password }),
  });
  if (!tokenData.user?.id || !tokenData.access_token) throw new Error('Portal sign-in did not return an authenticated user.');
  const rows = await portalRequest(config, tokenData.access_token, '/rest/v1/profiles?id=eq.' + encodeURIComponent(tokenData.user.id) + '&select=id,role');
  if (rows.length !== 1 || rows[0].role !== 'admin') throw new Error('Automatic archive preparation requires a portal admin account.');
  return { token: tokenData.access_token, userId: tokenData.user.id };
}

function visitElements(node, callback) {
  if (node.tagName) callback(node);
  for (const child of node.childNodes || []) visitElements(child, callback);
  if (node.content) visitElements(node.content, callback);
}

async function uploadEmbeddedImages(config, auth, html) {
  const document = parse5.parse(html);
  const targets = [];
  visitElements(document, node => {
    if (node.tagName !== 'img') return;
    const attr = node.attrs?.find(item => item.name === 'src');
    if (attr?.value.startsWith('data:image/')) targets.push(attr);
  });
  const urls = new Map(); let uploaded = 0; let fallbacks = 0;
  for (const attr of targets) {
    const match = attr.value.match(/^data:(image\/[a-z0-9.+-]+)((?:;[^,]*)*),([\s\S]*)$/i);
    if (!match) { fallbacks++; continue; }
    let bytes;
    try { bytes = /;base64(?:;|$)/i.test(match[2]) ? Buffer.from(match[3], 'base64') : Buffer.from(decodeURIComponent(match[3]), 'utf8'); }
    catch { fallbacks++; continue; }
    const mime = match[1].toLowerCase();
    if (!/^image\/(?:png|jpe?g|gif|webp|avif|bmp|svg\+xml)$/.test(mime) || !bytes.length || bytes.length > 10 * 1024 * 1024) { fallbacks++; continue; }
    const digest = crypto.createHash('sha256').update(bytes).digest('hex');
    if (urls.has(digest)) { attr.value = urls.get(digest); continue; }
    const ext = ({ 'image/jpeg': 'jpg', 'image/svg+xml': 'svg' })[mime] || mime.split('/')[1];
    const objectPath = 'captures/' + auth.userId + '/' + digest + '.' + ext;
    try {
      const response = await fetch(config.supabase + '/storage/v1/object/capture-images/' + objectPath, {
        method: 'POST', headers: { apikey: config.publicKey, Authorization: 'Bearer ' + auth.token, 'Content-Type': mime, 'x-upsert': 'true' }, body: bytes, signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const url = config.supabase + '/storage/v1/object/public/capture-images/' + objectPath;
      urls.set(digest, url); attr.value = url; uploaded++;
    } catch { urls.set(digest, attr.value); fallbacks++; }
  }
  return { html: parse5.serialize(document), uploaded, fallbacks };
}

async function saveArchive(config, auth, capture, question) {
  capture.title = question.title;
  capture.topic = question.topic;
  capture.language = question.language;
  const media = await uploadEmbeddedImages(config, auth, capture.html);
  capture.html = media.html;
  capture.report.image_storage = { uploaded_unique_images: media.uploaded, embedded_fallback_images: media.fallbacks };
  if (new TextEncoder().encode(JSON.stringify(capture)).length > 6 * 1024 * 1024) throw new Error('The captured archive exceeds the 6 MiB limit after image processing.');
  return portalRequest(config, auth.token, '/rest/v1/rpc/save_chatgpt_html_archive', { method: 'POST', body: JSON.stringify({ p_capture: capture }) });
}

async function prepareTurns(parserPage, html) {
  const source = fs.readFileSync(path.join(portalRoot, 'src/capture-document.ts'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  await parserPage.setContent('<!doctype html><html><head></head><body></body></html>');
  await parserPage.addScriptTag({ content: '(() => { const module = { exports: {} }; const exports = module.exports; ' + compiled + '; globalThis.__captureDocument = module.exports; })();' });
  return parserPage.evaluate(sourceHtml => {
    const api = globalThis.__captureDocument;
    const blocks = api.extractCaptureBlocks(sourceHtml);
    const tutors = blocks.filter(block => block.kind === 'turn' && block.speaker === 'tutor');
    if (!tutors.length) throw new Error('No assistant response was recognized in the archive.');
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];
      if (block.kind === 'turn' && block.speaker === 'unknown') {
        // Some ChatGPT layouts put the role on a visually hidden heading and
        // the message body in a sibling container. Infer that body's role from
        // adjacent turns only when the surrounding sequence is unambiguous.
        const previous = [...blocks.slice(0, index)].reverse().find(candidate => candidate.kind === 'turn' && candidate.speaker !== 'unknown');
        const next = blocks.slice(index + 1).find(candidate => candidate.kind === 'turn' && candidate.speaker !== 'unknown');
        const opposite = speaker => speaker === 'student' ? 'tutor' : 'student';
        const inferred = previous ? opposite(previous.speaker) : next ? opposite(next.speaker) : null;
        if (!inferred || (next && inferred !== opposite(next.speaker))) throw new Error('A turn speaker was not recognized; the archive was saved for review.');
        block.speaker = inferred;
      }
      if (block.kind === 'state') block.attach_to = tutors[tutors.length - 1].id;
    }
    return api.prepareCaptureTurns(blocks, { labelStates: false });
  }, html);
}

async function prepareArchive(config, auth, archiveId, parserPage, html) {
  if (!html) {
    const rows = await portalRequest(config, auth.token, '/rest/v1/chatgpt_html_archives?id=eq.' + encodeURIComponent(archiveId) + '&select=html');
    if (rows.length !== 1) throw new Error('The saved HTML archive could not be loaded for preparation.');
    html = rows[0].html;
  }
  const turns = await prepareTurns(parserPage, html);
  if (new TextEncoder().encode(JSON.stringify(turns)).length > 8 * 1024 * 1024) throw new Error('Prepared turns exceed the portal preparation limit.');
  return portalRequest(config, auth.token, '/rest/v1/rpc/prepare_chatgpt_html_archive', { method: 'POST', body: JSON.stringify({ p_archive_id: archiveId, p_turns: turns }) });
}

async function screenshotWithoutComposer(page, type, clipToMain = false) {
  const marker = 'data-question-agent-hidden-composer';
  const state = await page.evaluate(marker => {
    const prompt = document.querySelector('#prompt-textarea,[data-testid="prompt-textarea"],textarea,[contenteditable="true"][data-placeholder*="Message" i]');
    const composer = prompt?.closest('form,[data-testid*="composer" i]') || prompt?.parentElement;
    if (!composer) return { height: innerHeight, style: null };
    const bounds = composer.getBoundingClientRect();
    const style = composer.getAttribute('style');
    composer.setAttribute(marker, 'true');
    composer.style.setProperty('visibility', 'hidden', 'important');
    return { height: bounds.top > 0 && bounds.top < innerHeight ? Math.floor(bounds.top) : innerHeight, style };
  }, marker);
  try {
    const viewport = page.viewportSize();
    const clip = clipToMain ? await page.evaluate(height => {
      const bounds = document.querySelector('main,[role="main"]')?.getBoundingClientRect();
      if (!bounds) return { x: 0, y: 0, width: innerWidth, height };
      const x = Math.max(0, bounds.left); const y = Math.max(0, bounds.top);
      return { x, y, width: Math.max(1, Math.min(innerWidth, bounds.right) - x), height: Math.max(1, Math.min(height, bounds.bottom) - y) };
    }, state.height) : { x: 0, y: 0, width: viewport.width, height: viewport.height };
    return await page.screenshot({ type, ...(type === 'jpeg' ? { quality: 82 } : {}), clip, animations: 'disabled', timeout: 15000 });
  } finally {
    await page.evaluate(({ marker, style }) => {
      const composer = document.querySelector('[' + marker + '="true"]');
      if (!composer) return;
      composer.removeAttribute(marker);
      if (style === null) composer.removeAttribute('style'); else composer.setAttribute('style', style);
    }, { marker, style: state.style }).catch(() => {});
  }
}

async function waitForAnswer(page, timeoutMs = 180000) {
  const deadline = Date.now() + timeoutMs;
  let previous = ''; let stable = 0;
  while (Date.now() < deadline) {
    if (stopRequested) throw new Error('Stopped by user.');
    const state = await page.evaluate(() => {
      const markerSelector = '[data-message-author-role="assistant"],[data-conversation-role="assistant"],[data-turn="assistant"],[data-chatgpt-agent-turn-start]';
      const markers = [...document.querySelectorAll(markerSelector)].filter(node => node.getClientRects().length);
      const messages = [...new Set(markers.map(node => {
        if (node.matches('[data-message-author-role="assistant"],[data-turn="assistant"],[data-chatgpt-agent-turn-start]')) return node;
        return node.closest('[data-content-search-unit-key]') || node.parentElement;
      }).filter(node => node && node.getClientRects().length))];
      const busy = Boolean(document.querySelector('[data-testid="stop-button"],button[aria-label="Stop generating"],[data-is-streaming="true"],.result-streaming,main [aria-busy="true"],#thread [aria-busy="true"]'));
      const text = (messages.at(-1)?.innerText || '').trim().replace(/^ChatGPT said:\s*/i, '').trim();
      const users = document.querySelectorAll('[data-message-author-role="user"],[data-conversation-role="user"],[data-turn="user"],[data-testid="user-message"],[data-user-message-bubble]').length;
      return { url: location.href, busy, text, assistants: messages.length, users, composer: Boolean(document.querySelector('#prompt-textarea,[data-testid="prompt-textarea"],textarea,[contenteditable="true"][data-placeholder*="Message" i]')) };
    });
    if (!state.composer && /\/auth\/|\/login/.test(new URL(state.url).pathname)) throw new Error('ChatGPT sign-in expired. Sign in in Chrome and rerun this question.');
    if (state.assistants && state.text && !state.busy && state.users) {
      if (state.text === previous) stable++; else { previous = state.text; stable = 0; }
      if (stable >= 3) return state;
    } else { previous = ''; stable = 0; }
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
  throw new Error('Timed out waiting for ChatGPT to finish. Rerun to resume from the same conversation.');
}

async function waitForManualLogin(page) {
  await page.goto('https://chatgpt.com/', { waitUntil: 'domcontentloaded' });
  const signedIn = () => page.evaluate(() => {
    const composer = Boolean(document.querySelector('#prompt-textarea,[data-testid="prompt-textarea"],textarea,[contenteditable="true"][data-placeholder*="Message" i]'));
    const path = location.pathname;
    const signInAction = [...document.querySelectorAll('a,button,[role="button"]')].some(node => /^(?:log in|sign in|sign up)$/i.test((node.innerText || node.getAttribute('aria-label') || '').trim()));
    return composer && !/^\/uc(?:\/|$)/i.test(path) && !signInAction;
  }).catch(() => false);
  if (await signedIn()) return page;
  console.log('Google sign-in can reject an automation-controlled browser. Opening the same profile in ordinary Chrome for sign-in.');
  await context?.close();
  context = null;
  const chromePath = [
    path.join(process.env.PROGRAMFILES || 'C:\\Program Files', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
  ].find(candidate => candidate && fs.existsSync(candidate));
  if (!chromePath) throw new Error('Could not find installed Chrome for the manual Google sign-in step.');
  const chrome = spawn(chromePath, ['--user-data-dir=' + profilePath, '--no-first-run', '--no-default-browser-check', 'https://chatgpt.com/'], { stdio: 'ignore', windowsHide: false });
  await new Promise((resolve, reject) => { chrome.once('spawn', resolve); chrome.once('error', reject); });
  console.log('Sign in to ChatGPT in the ordinary Chrome window. Close that window, then return here.');
  const line = createInterface({ input: stdin, output: stdout });
  await line.question('Press Enter after closing Chrome...'); line.close();
  if (chrome.exitCode === null && chrome.signalCode === null) chrome.kill();
  context = await chromium.launchPersistentContext(profilePath, { channel: 'chrome', headless: false, viewport: { width: 1365, height: 900 }, acceptDownloads: false });
  await context.addInitScript(injectAgentFunctions());
  const authenticatedPage = context.pages()[0] || await context.newPage();
  await authenticatedPage.goto('https://chatgpt.com/', { waitUntil: 'domcontentloaded' });
  if (!await signedInForPage(authenticatedPage)) throw new Error('ChatGPT sign-in was not detected after reopening the profile. Complete sign-in in ordinary Chrome and retry.');
  return authenticatedPage;
}

async function signedInForPage(page) {
  return page.evaluate(() => {
    const composer = Boolean(document.querySelector('#prompt-textarea,[data-testid="prompt-textarea"],textarea,[contenteditable="true"][data-placeholder*="Message" i]'));
    const signInAction = [...document.querySelectorAll('a,button,[role="button"]')].some(node => /^(?:log in|sign in|sign up)$/i.test((node.innerText || node.getAttribute('aria-label') || '').trim()));
    return composer && !/^\/uc(?:\/|$)/i.test(location.pathname) && !signInAction;
  }).catch(() => false);
}

async function startQuestion(page, prompt) {
  await page.goto('https://chatgpt.com/', { waitUntil: 'domcontentloaded' });
  const composer = page.locator(composerSelector).first();
  await composer.waitFor({ state: 'visible', timeout: 60000 });
  await composer.fill(prompt, { timeout: 30000 });
  // ChatGPT's current composer can treat Enter as a line break. Click its
  // explicit Send control so the prompt is actually submitted.
  const send = page.getByRole('button', { name: /^send$/i }).last();
  await send.waitFor({ state: 'visible', timeout: 15000 });
  await send.click({ timeout: 15000 });
  await page.waitForURL(url => conversationPattern.test(url.href), { timeout: 60000 });
  return page.url();
}

async function capturePage(page, screenshot) {
  const result = await page.evaluate(args => globalThis.__questionAgentCapture(...args), [true, null, false, null, screenshot]);
  if (result?.capture_error) throw new Error(result.capture_error);
  return result;
}

async function addState(page, token, scopeId, states, signatures, report) {
  if (states.length >= 24) { report.limitations.push('Interactive exploration reached its 24-state limit.'); return; }
  const capture = await page.evaluate(args => globalThis.__questionAgentCapture(...args), [true, token, false, { token, scope_id: scopeId }, null]);
  if (capture?.capture_error) { report.limitations.push('A revealed state could not be captured.'); return; }
  const signature = capture.text + '|' + (capture.html.match(/<img[^>]+src=\"[^\"]+\"/g) || []).join('');
  if (signatures.has(signature)) return;
  signatures.add(signature); states.push({ capture }); report.states_saved = states.length;
}

async function assistedPass(page, config, sourceUrl) {
  const report = { status: 'running', model: config.model, provider: 'google', steps: [], limitations: [], states_saved: 0, allow_answers: 'only to unlock blocked navigation', synthetic_answers: false, started_at: new Date().toISOString() };
  const states = []; const signatures = new Set(); const attempts = new Map(); const token = crypto.randomUUID();
  const execute = (mode, input = {}) => page.evaluate(args => globalThis.__questionAgentAssisted(...args), [mode, token, sourceUrl, input]);
  let initialized = false;
  try {
    await execute('init', { detached: true }); initialized = true;
    for (let step = 0; step < 18 && !stopRequested; step++) {
      const observation = await execute('observe');
      if (!observation.known_responses) { report.limitations.push('Assistant response controls were not recognized.'); break; }
      if (!observation.candidates.length) break;
      const allowedAnswerScopes = answerSelectionScopes(observation.candidates);
      const allowAnswers = allowedAnswerScopes.size > 0;
      let screenshot = null;
      try {
        const png = await screenshotWithoutComposer(page, 'png', true);
        if (png.length <= 1800000) screenshot = 'data:image/png;base64,' + png.toString('base64');
      } catch { report.limitations.push('A visual observation was unavailable; DOM controls were used.'); }
      const result = await decide({ observation, screenshot, allow_answers: allowAnswers, history: report.steps.slice(-10) }, { apiKey: config.geminiKey, model: config.model, signal: AbortSignal.timeout(25000) });
      const action = result.action;
      if (!isAnswerAllowed(action, observation.candidates, allowedAnswerScopes)) throw new Error('Gemini selected an answer or control that was not allowed by the observed page state.');
      report.model = result.model;
      if (action.type === 'finish') { report.steps.push({ action: 'finish', reason: action.reason.slice(0, 500) }); break; }
      const candidate = observation.candidates.find(item => item.id === action.target_id);
      const identity = [action.type, candidate?.scope_id, candidate?.label, action.value, candidate?.context].join(':');
      attempts.set(identity, (attempts.get(identity) || 0) + 1);
      if (attempts.get(identity) > 2) { report.limitations.push('Stopped after an action repeated without useful progress.'); break; }
      if (candidate?.scope_id) await addState(page, token, candidate.scope_id, states, signatures, report);
      if (stopRequested) break;
      try {
        const actionResult = await execute('act', { action: action.type, target_id: action.target_id, value: action.value, revision: observation.revision, allow_answers: allowAnswers });
        if (actionResult.synthetic_answer) report.synthetic_answers = true;
        if (actionResult.scope_id) await addState(page, token, actionResult.scope_id, states, signatures, report);
        report.steps.push({ action: action.type, target: candidate?.label || null, reason: action.reason.slice(0, 500), result: actionResult.description, synthetic_answer: Boolean(actionResult.synthetic_answer) });
      } catch (error) { report.steps.push({ action: action.type, target: candidate?.label || null, reason: action.reason.slice(0, 500), result: error.message }); }
    }
    report.status = stopRequested ? 'stopped' : 'completed';
  } catch (error) {
    report.status = stopRequested ? 'stopped' : 'error';
    if (!stopRequested) report.limitations.push(error.message);
  } finally {
    if (initialized) try { await execute('cleanup'); } catch { report.limitations.push('Some page controls could not be restored.'); }
  }
  if (report.steps.length >= 18) report.limitations.push('Interactive exploration reached its 18-action limit.');
  report.finished_at = new Date().toISOString();
  return { states, report };
}

function injectAgentFunctions() {
  return capturePageHtml.toString() + '\n' + assistedPage.toString() + '\nglobalThis.__questionAgentCapture = capturePageHtml; globalThis.__questionAgentAssisted = assistedPage;';
}

function acquireLock() {
  fs.mkdirSync(runtimeRoot, { recursive: true });
  const file = path.join(runtimeRoot, 'run.lock');
  try { return fs.openSync(file, 'wx', 0o600); }
  catch { throw new Error('Another question-agent run may already be active. If not, remove .runtime/question-agent/run.lock and retry.'); }
}

async function run() {
  const lockFd = acquireLock();
  const lockFile = path.join(runtimeRoot, 'run.lock');
  const release = () => { try { fs.closeSync(lockFd); fs.unlinkSync(lockFile); } catch { /* already removed */ } };
  process.once('SIGINT', () => { stopRequested = true; console.log('\nStopping after the current operation...'); });
  try {
    loadEnvironment();
    const config = await readConfig();
    if (process.argv.includes('--help')) {
      console.log('Run: npm --prefix chatgpt-conversation-extension run agent:questions -- [--questions path/to/questions.json]');
      console.log('Default question file: ' + defaultQuestionsPath);
      return;
    }
    const questionIndex = process.argv.indexOf('--questions');
    if (questionIndex >= 0 && (!process.argv[questionIndex + 1] || process.argv[questionIndex + 1].startsWith('--'))) throw new Error('Pass a file path after --questions.');
    const questionsPath = questionIndex >= 0 ? path.resolve(process.argv[questionIndex + 1] || '') : defaultQuestionsPath;
    if (!fs.existsSync(questionsPath)) {
      writeJsonAtomic(questionsPath, { questions: [{ id: 'replace-me', prompt: 'Replace this with a question to ask ChatGPT.', title: 'Replace with title', topic: 'Replace with topic', language: 'English' }] });
      console.log('Created a question template at ' + questionsPath + '. Edit it, then run the agent again.');
      return;
    }
    const questions = parseQuestionSet(readJson(questionsPath, null));
    const auth = await signInPortal(config);
    const checkpoint = readJson(progressPath, { format_version: 'chatgpt-question-agent-progress/1', questions: {} });
    checkpoint.questions ||= {};
    let page = context.pages()[0] || await context.newPage();
    let parserPage = context.pages()[1] || await context.newPage();

    for (const question of questions) {
      if (stopRequested) break;
      const fingerprint = questionFingerprint(question);
      let item = checkpoint.questions[question.id];
      if (!item || item.fingerprint !== fingerprint) item = checkpoint.questions[question.id] = { fingerprint, status: 'pending' };
      if (item.status === 'complete') { console.log('Skipping ' + question.id + ': already saved as ' + item.conversation_id + '.'); continue; }
      console.log('Processing ' + question.id + '...');
      try {
        if (!item.archive_id) {
          if (!item.source_url) {
            page = await waitForManualLogin(page);
            if (parserPage.isClosed()) parserPage = await context.newPage();
            item.status = 'sending'; writeJsonAtomic(progressPath, checkpoint);
            item.source_url = await startQuestion(page, question.prompt);
            item.status = 'waiting'; writeJsonAtomic(progressPath, checkpoint);
          } else await page.goto(item.source_url, { waitUntil: 'domcontentloaded' });
          await waitForAnswer(page);
          const screenshot = await screenshotWithoutComposer(page, 'jpeg');
          let capture = await capturePage(page, 'data:image/jpeg;base64,' + screenshot.toString('base64'));
          if (!capture.text.trim()) throw new Error('The captured page contains no readable response.');
          const interactive = await assistedPass(page, config, item.source_url);
          capture = mergeInteractiveStates(capture, interactive.states, interactive.report);
          if (stopRequested) throw new Error('Stopped before saving the archive. Rerun to resume from the same ChatGPT conversation.');
          const saved = await saveArchive(config, auth, capture, question);
          item.archive_id = saved.archive_id;
          item.source_url = capture.source.url;
          item.status = 'archive_saved';
          writeJsonAtomic(progressPath, checkpoint);
          const prepared = await prepareArchive(config, auth, item.archive_id, parserPage, capture.html);
          item.conversation_id = prepared.conversation_id;
          item.status = 'complete'; delete item.error; item.completed_at = new Date().toISOString();
          writeJsonAtomic(progressPath, checkpoint);
          console.log('Saved ' + question.id + ': archive ' + item.archive_id + '; conversation ' + item.conversation_id + '.');
        } else {
          const prepared = await prepareArchive(config, auth, item.archive_id, parserPage, null);
          item.conversation_id = prepared.conversation_id;
          item.status = 'complete'; delete item.error; item.completed_at = new Date().toISOString();
          writeJsonAtomic(progressPath, checkpoint);
          console.log('Prepared ' + question.id + ': conversation ' + item.conversation_id + '.');
        }
      } catch (error) {
        item.status = item.archive_id ? 'archive_saved' : 'failed';
        item.error = String(error.message || 'Capture failed.').slice(0, 1000);
        item.updated_at = new Date().toISOString();
        writeJsonAtomic(progressPath, checkpoint);
        console.error('Stopped at ' + question.id + ': ' + item.error);
        throw error;
      }
    }
  } finally {
    await context?.close().catch(() => {});
    release();
  }
}

loadEnvironment();
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes('--help')) {
      console.log('Run: npm --prefix chatgpt-conversation-extension run agent:questions -- [--questions path/to/questions.json]');
      console.log('Default question file: ' + defaultQuestionsPath);
      process.exit(0);
    }
    fs.mkdirSync(runtimeRoot, { recursive: true });
    context = await chromium.launchPersistentContext(profilePath, { channel: 'chrome', headless: false, viewport: { width: 1365, height: 900 }, acceptDownloads: false });
    await context.addInitScript(injectAgentFunctions());
    await run();
  } catch (error) {
    console.error(error.message || 'Question agent stopped.');
    process.exitCode = 1;
  } finally { await context?.close().catch(() => {}); }
}
