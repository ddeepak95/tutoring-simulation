import { capturePageHtml } from './capture.js';
import { captureOriginalResources } from './original.js';
import { writeOriginalArchive, deleteOriginalArchive, clearOriginalArchives } from './archive-store.js';
import { runAssisted, stopAssisted } from './assisted.js';

const sessionReady = chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' });
const localReady = chrome.storage.local.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' });
const runningTabs = new Set();
const visualSessions = new Map(); let screenshotQueue = Promise.resolve(); let lastScreenshot = 0;
async function captureSourceScreenshot(tabId, token) {
  const tab = await chrome.tabs.get(tabId);
  const marker = crypto.randomUUID();
  const [frame] = await chrome.scripting.executeScript({
    target: { tabId },
    func: marker => {
      const prompt = document.querySelector('#prompt-textarea,[data-testid="prompt-textarea"],textarea,[contenteditable="true"][data-placeholder*="Message" i]');
      const composer = prompt?.closest('form,[data-testid*="composer" i]') || prompt?.parentElement;
      const bounds = composer?.getBoundingClientRect();
      const result = { width: innerWidth, height: innerHeight, cropHeight: bounds && bounds.top > 0 && bounds.top < innerHeight ? Math.floor(bounds.top) : innerHeight, style: composer?.getAttribute('style') ?? null };
      if (composer) { composer.setAttribute('data-portal-capture-hidden-composer', marker); composer.style.setProperty('visibility', 'hidden', 'important'); }
      return result;
    },
    args: [marker],
  });
  const viewport = frame?.result;
  if (!viewport || !Number.isFinite(viewport.width) || !Number.isFinite(viewport.height) || !Number.isFinite(viewport.cropHeight)) throw new Error('Could not prepare the page for a full screenshot.');
  try {
    const result = await captureVisual({ token, format: 'jpeg', viewport: { width: viewport.width, height: viewport.height }, rect: { x: 0, y: 0, width: viewport.width, height: viewport.cropHeight } }, { id: chrome.runtime.id, frameId: 0, tab, url: tab.url });
    return result.data;
  } finally {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: (marker, style) => {
        const composer = document.querySelector(`[data-portal-capture-hidden-composer="${marker}"]`);
        if (!composer) return;
        composer.removeAttribute('data-portal-capture-hidden-composer');
        if (style === null) composer.removeAttribute('style'); else composer.setAttribute('style', style);
      },
      args: [marker, viewport.style],
    }).catch(() => {});
  }
}

async function captureVisual(message, sender) {
  const session = visualSessions.get(sender.tab?.id);
  if (sender.id !== chrome.runtime.id || sender.frameId !== 0 || !session || session.token !== message.token || sender.url !== session.url) throw new Error('No active visual capture.');
  const { rect, viewport } = message;
  if (![rect?.x, rect?.y, rect?.width, rect?.height, viewport?.width, viewport?.height].every(Number.isFinite) || rect.x < 0 || rect.y < 0 || rect.width < 1 || rect.height < 1 || rect.x + rect.width > viewport.width + 1 || rect.y + rect.height > viewport.height + 1 || viewport.width > 10000 || viewport.height > 10000) throw new Error('Invalid visual crop.');
  const run = async () => {
    const active = async () => (await chrome.tabs.query({ active: true, windowId: sender.tab.windowId }))[0];
    if ((await active())?.id !== sender.tab.id || (await chrome.tabs.get(sender.tab.id)).url !== session.url) throw new Error('Keep the source conversation active during capture.');
    const delay = 600 - (Date.now() - lastScreenshot); if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));
    const data = await chrome.tabs.captureVisibleTab(sender.tab.windowId, { format: 'png' }); lastScreenshot = Date.now();
    if ((await active())?.id !== sender.tab.id || (await chrome.tabs.get(sender.tab.id)).url !== session.url) throw new Error('Source changed during visual capture.');
    const bitmap = await createImageBitmap(await (await fetch(data)).blob());
    const scaleX = bitmap.width / viewport.width; const scaleY = bitmap.height / viewport.height;
    const canvas = new OffscreenCanvas(Math.max(1, Math.round(rect.width * scaleX)), Math.max(1, Math.round(rect.height * scaleY)));
    canvas.getContext('2d').drawImage(bitmap, rect.x * scaleX, rect.y * scaleY, rect.width * scaleX, rect.height * scaleY, 0, 0, canvas.width, canvas.height); bitmap.close();
    const mime = message.format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const bytes = new Uint8Array(await (await canvas.convertToBlob({ type: mime, quality: 0.82 })).arrayBuffer());
    let binary = ''; for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return { data: `data:${mime};base64,` + btoa(binary) };
  };
  const result = screenshotQueue.then(run); screenshotQueue = result.catch(() => {}); return result;
}
const originalStorageReady = sessionReady.then(async () => {
  if (!(await chrome.storage.session.get('originalArchiveSession')).originalArchiveSession) {
    await clearOriginalArchives();
    await chrome.storage.session.set({ originalArchiveSession: true });
  }
});
const recoveryReady = originalStorageReady.then(async () => {
  const entries = Object.entries(await chrome.storage.session.get(null));
  for (const [key, job] of entries) if (key.startsWith('capture:') && job.assisted?.status === 'running') {
    await chrome.storage.session.set({ [key]: { ...job, assisted: { ...job.assisted, status: 'interrupted', limitations: [...job.assisted.limitations, 'The extension worker restarted during assisted capture. The previous snapshot is retained; source interactions may remain changed. Run assisted capture again to retry.'] } } });
  }
});

export async function captureOriginalJob(jobId, tabId) {
  await recoveryReady;
  if (runningTabs.has(tabId)) throw new Error('Wait for the current capture to finish.');
  const job = (await chrome.storage.session.get(jobId))[jobId];
  if (!job || job.tabId !== tabId) throw new Error('Open ChatGPT and start a new capture.');
  const expected = job.capture?.source?.conversation_id || job.sourceId;
  runningTabs.add(tabId);
  await chrome.storage.session.set({ [jobId]: { ...job, original: { status: 'capturing' } } });
  try {
    const sourceTab = await chrome.tabs.get(tabId);
    if (!/^https:\/\/chatgpt\.com\/(?:g\/[a-zA-Z0-9_/-]+\/)?c\/[a-f0-9-]{36}\/?(?:[?#].*)?$/i.test(sourceTab.url || '')) throw new Error('Open a saved ChatGPT conversation.');
    if (expected && !new URL(sourceTab.url).pathname.replace(/\/$/, '').endsWith('/c/' + expected)) throw new Error('The source tab shows a different conversation. Start a new capture.');
    // Native capture preserves original layout/resources without our style edits.
    // Script files are collected separately: MHTML is not a JavaScript replay VM.
    const native = new Promise((resolve, reject) => {
      // Chromium releases its temporary-file reference after this callback.
      // Start reading inside the callback, before its response acknowledgement;
      // a Promise continuation can otherwise race temporary-file deletion.
      chrome.pageCapture.saveAsMHTML({ tabId }, blob => {
        if (chrome.runtime.lastError) { reject(new Error(chrome.runtime.lastError.message)); return; }
        if (!blob) { reject(new Error('Chrome returned an empty MHTML archive.')); return; }
        if (blob.size > 64 * 1024 * 1024) { reject(new Error('Native archive exceeds the 64 MB experiment limit.')); return; }
        blob.arrayBuffer().then(bytes => resolve(new Blob([bytes], { type: 'multipart/related' })), reject);
      });
    });
    const nativeResult = Promise.race([native, new Promise((_, reject) => setTimeout(() => reject(new Error('Native archive capture timed out.')), 30000))]);
    const [mhtml, captured] = await Promise.allSettled([
      nativeResult,
      chrome.scripting.executeScript({ target: { tabId }, func: captureOriginalResources }),
    ]);
    if ((await chrome.tabs.get(tabId)).url !== sourceTab.url) throw new Error('The source page changed. Capture it again.');
    const resources = captured.status === 'fulfilled' ? captured.value[0]?.result : null;
    if (resources && expected && resources.source_conversation_id !== expected) throw new Error('The source conversation changed. Start a new capture.');
    const errors = [mhtml.status === 'rejected' ? mhtml.reason.message : null, captured.status === 'rejected' ? captured.reason.message : null].filter(Boolean);
    if (mhtml.status !== 'fulfilled' && !resources) throw new Error(errors.join(' ') || 'Original-page capture failed.');
    await writeOriginalArchive(jobId, { mhtml: mhtml.status === 'fulfilled' ? mhtml.value : null, resources, errors });
    const current = (await chrome.storage.session.get(jobId))[jobId];
    await chrome.storage.session.set({ [jobId]: { ...current, original: { status: 'ready', mhtml_bytes: mhtml.status === 'fulfilled' ? mhtml.value.size : 0, files: resources?.files.length || 0, missing: (resources?.resources.filter(resource => resource.status !== 'saved').length || 0) + (resources?.omitted_resources || 0), errors } } });
  } catch (error) {
    const current = (await chrome.storage.session.get(jobId))[jobId];
    await chrome.storage.session.set({ [jobId]: { ...current, original: { status: 'error', error: error.message } } });
  } finally { runningTabs.delete(tabId); }
}

export async function captureJob(jobId, tabId, options = {}) {
  await recoveryReady;
  if (runningTabs.has(tabId)) throw new Error('A capture is already running in that tab.');
  runningTabs.add(tabId);
  await deleteOriginalArchive(jobId);
  await deleteOriginalArchive('selectable:' + jobId);
  await deleteOriginalArchive('assisted:' + jobId);
  const previous = (await chrome.storage.session.get(jobId))[jobId];
  const expectedSource = previous?.capture?.source?.conversation_id || previous?.sourceId;
  const startedAt = Date.now();
  await chrome.storage.session.set({ [jobId]: { status: 'capturing', tabId, startedAt, sourceId: expectedSource || null } });
  try {
    const token = crypto.randomUUID();
    visualSessions.set(tabId, { token, url: (await chrome.tabs.get(tabId)).url });
    const screenshot = await captureSourceScreenshot(tabId, token);
    const [frame] = await chrome.scripting.executeScript({ target: { tabId }, func: capturePageHtml, args: [true, token, options.allowQuizAnswers !== false, null, screenshot] });
    if (frame?.result?.capture_error) {
      const failure = new Error(frame.result.capture_error);
      failure.diagnostics = frame.result.capture_diagnostics;
      throw failure;
    }
    if (frame?.result?.format_version !== 'chatgpt-html-archive/1' || !frame.result.html) throw new Error('The page could not be captured. Return to ChatGPT and try again.');
    if (expectedSource && frame.result.source.conversation_id !== expectedSource) throw new Error('The source tab now shows a different conversation. Click the extension on that conversation to start a new capture.');
    await chrome.storage.session.set({ [jobId]: { status: 'ready', tabId, startedAt, capture: frame.result } });
  } catch (error) {
    await chrome.storage.session.set({ [jobId]: { status: 'error', tabId, startedAt, sourceId: expectedSource || null, error: error.message || 'Could not capture this conversation.', ...(error.diagnostics ? { diagnostics: error.diagnostics } : {}) } });
  } finally { visualSessions.delete(tabId); runningTabs.delete(tabId); }
}

chrome.action.onClicked.addListener(async tab => {
  await Promise.all([sessionReady, localReady]);
  const jobId = 'capture:' + crypto.randomUUID();
  // HTML is larger than parsed turns. Keep one capture within session quotas.
  const entries = Object.entries(await chrome.storage.session.get(null)).filter(([key]) => key.startsWith('capture:'));
  const unused = entries.filter(([, job]) => !runningTabs.has(job.tabId) && (job.status !== 'capturing' || Date.now() - job.startedAt > 90000)).sort((a, b) => (a[1].startedAt || 0) - (b[1].startedAt || 0));
  if (unused.length > 0) {
    for (const [key] of unused) { await deleteOriginalArchive(key); await deleteOriginalArchive('selectable:' + key); await deleteOriginalArchive('assisted:' + key); }
    const old = unused.flatMap(([key]) => [key, 'draft:' + key]);
    await chrome.storage.session.remove(old);
  }
  const valid = tab.id && /^https:\/\/chatgpt\.com\/(?:g\/[a-zA-Z0-9_/-]+\/)?c\/[a-f0-9-]{36}\/?(?:[?#].*)?$/i.test(tab.url || '');
  await chrome.storage.session.set({ [jobId]: valid ? { status: 'capturing', tabId: tab.id, startedAt: Date.now() } : { status: 'error', error: 'Open a saved conversation on chatgpt.com, then click the extension.' } });
  const review = await chrome.tabs.create({ active: !valid, url: chrome.runtime.getURL('review.html') + '?job=' + encodeURIComponent(jobId) });
  if (valid) {
    await chrome.action.setBadgeText({ text: '...' });
    try { await captureJob(jobId, tab.id); }
    catch (error) { await chrome.storage.session.set({ [jobId]: { status: 'error', error: error.message } }); }
    finally {
      await chrome.action.setBadgeText({ text: '' });
      await chrome.tabs.update(review.id, { active: true }).catch(() => {});
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  if (message?.type === 'stop-assisted-source') {
    const session = visualSessions.get(sender.tab?.id);
    if (sender.id === chrome.runtime.id && sender.frameId === 0 && session?.token === message.token && sender.url === session.url && session.jobId) reply({ stopped: stopAssisted(session.jobId) });
    else reply({ error: 'No active assisted capture.' });
    return;
  }
  if (message?.type === 'capture-visual') {
    void captureVisual(message, sender).then(reply).catch(error => reply({ error: error.message })); return true;
  }
  if (sender.id !== chrome.runtime.id || !sender.url?.startsWith(chrome.runtime.getURL('review.html')) || !['recapture', 'capture-original', 'capture-quizzes', 'start-assisted', 'stop-assisted'].includes(message?.type) || !/^capture:[a-f0-9-]{36}$/.test(message.jobId || '')) return;
  if (message.type === 'stop-assisted') { reply({ stopped: stopAssisted(message.jobId) }); return; }
  (async () => {
    await recoveryReady;
    const job = (await chrome.storage.session.get(message.jobId))[message.jobId];
    if (!job?.tabId) throw new Error('The source tab is no longer available. Click the extension on ChatGPT again.');
    if (runningTabs.has(job.tabId)) throw new Error('Wait for the current capture to finish.');
    // Keep source-page lazy loading and timers active during the scroll pass.
    await chrome.tabs.update(job.tabId, { active: true });
    try {
      if (message.type === 'start-assisted') {
        runningTabs.add(job.tabId); const token = crypto.randomUUID(); const tab = await chrome.tabs.get(job.tabId);
        visualSessions.set(job.tabId, { token, url: tab.url, jobId: message.jobId });
        try {
          const assertSource = async url => { const current = await chrome.tabs.get(job.tabId); if (current.url !== url || !current.active) throw new Error('Keep the source conversation active during assisted capture.'); };
          await runAssisted(message.jobId, job.tabId, { token, allowAnswers: message.allowAnswers !== false, assertSource, takeScreenshot: (viewport, rect) => captureVisual({ token, viewport, rect }, { id: chrome.runtime.id, frameId: 0, tab, url: tab.url }).then(result => result.data) });
        } finally { runningTabs.delete(job.tabId); visualSessions.delete(job.tabId); }
      }
      else if (message.type === 'capture-original') await captureOriginalJob(message.jobId, job.tabId);
      else await captureJob(message.jobId, job.tabId, { allowQuizAnswers: message.allowQuizAnswers !== false });
    }
    finally { if (sender.tab?.id) await chrome.tabs.update(sender.tab.id, { active: true }).catch(() => {}); }
  })().then(() => reply({ ok: true })).catch(error => reply({ error: error.message }));
  return true;
});
