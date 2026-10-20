import { initializeStorage, signIn, signOut, currentProfile, saveCapture, SessionExpired, portalUrl } from './client.js';
import { readOriginalArchive } from './archive-store.js';
import { createArchiveZip } from './original.js';
import { initializeSelectableUI, setSelectableCapture, selectableCaptureForSave } from './selectable-ui.js';

const $ = id => document.getElementById(id);
const jobId = new URL(location.href).searchParams.get('job');
let job; let profile; let saving = false; let signingIn = false;
let renderedCapture; let activePortal;
let draftWrite = Promise.resolve();

function error(message = '') { $('error').textContent = message; $('error').hidden = !message; }
function updateAccount() {
  $('start-assisted').disabled = saving || !profile || job?.status !== 'ready' || job?.assisted?.status === 'running';
  $('account').hidden = !profile;
  $('account-name').textContent = profile ? `${profile.username} · ${profile.role === 'admin' ? 'Administrator' : 'Annotator'}` : '';
  $('login-card').hidden = Boolean(profile);
  $('save-button').disabled = saving || !profile || job?.status !== 'ready' || job?.assisted?.status === 'running';
  $('save-button').textContent = saving ? 'Saving...' : 'Save to database';
  for (const input of $('save-form').querySelectorAll('input')) input.disabled = saving;
  $('save-hint').textContent = profile ? (job?.capture?.html ? 'Saves an HTML archive for later cleanup and conversion.' : 'Saved conversations will await admin assignment.') : 'Sign in to save.';
  $('sign-out').disabled = saving;
}

async function loadJob() {
  job = jobId ? (await chrome.storage.session.get(jobId))[jobId] : null;
  const assisted = job?.assisted; const assisting = assisted?.status === 'running';
  $('assisted-card').hidden = !job?.tabId || !job?.capture?.html;
  $('start-assisted').disabled = saving || !profile || job?.status !== 'ready' || assisting;
  $('stop-assisted').hidden = !assisting;
  $('assisted-answers').disabled = assisting;
  $('assisted-status').textContent = assisted ? `${assisted.status} · ${assisted.steps.length} actions · ${assisted.states_saved} saved views${assisted.model ? ' · ' + assisted.model + ' (direct Gemini)' : ''}${assisted.limitations.length ? ' · ' + assisted.limitations.join(' ') : ''}` : 'Ready for assisted capture. Your current snapshot is retained.';
  $('assisted-log').replaceChildren(...(assisted?.steps || []).map(step => { const li = document.createElement('li'); li.textContent = `${step.action}${step.target ? ': ' + step.target : ''} — ${step.reason} → ${step.result}`; return li; }));
  $('original-card').hidden = !job?.tabId;
  $('quiz-capture-card').hidden = !job?.tabId || job.status !== 'ready' || !job.capture?.report?.quizzes?.some(quiz => !quiz.complete || !quiz.restored);
  $('capture-quizzes').disabled = !$('allow-quiz-answers').checked || saving || job?.status === 'capturing';
  $('capture-original').disabled = assisting || job?.status === 'capturing' || job?.original?.status === 'capturing';
  const original = job?.original;
  $('download-mhtml').hidden = original?.status !== 'ready' || !original.mhtml_bytes;
  $('download-original-zip').hidden = original?.status !== 'ready';
  $('original-status').textContent = original?.status === 'capturing' ? 'Capturing the original page and resource files. Keep ChatGPT open; this may take about 30 seconds.' : original?.status === 'error' ? original.error : original?.status === 'ready' ? `Ready: ${original.mhtml_bytes ? Math.ceil(original.mhtml_bytes / 1024) + ' KB native archive; ' : ''}${original.files} local files; ${original.missing} resources unavailable.${original.errors?.length ? ' ' + original.errors.join(' ') : ''}` : 'Run this capture to compare the original archive with the reconstructed preview below.';
  $('recapture').hidden = !job?.tabId || job.status === 'capturing';
  $('recapture').disabled = assisting;
  $('review').hidden = job?.status !== 'ready';
  $('capture-state').hidden = false;
  $('capture-diagnostics').hidden = !job?.diagnostics;
  $('diagnostics-text').textContent = job?.diagnostics ? JSON.stringify(job.diagnostics, null, 2) : '';
  if (!job) $('capture-status').textContent = 'This capture is no longer available. Open ChatGPT and click the extension again.';
  else if (job.status === 'capturing') $('capture-status').textContent = 'Loading conversation history and capturing images. This may take up to 75 seconds.';
  else if (job.status === 'error') $('capture-status').textContent = job.error;
  else if (job.status === 'ready' && job.capture !== renderedCapture) {
    $('capture-status').textContent = 'Capture ready. Review the conversation below before saving.';
    const capture = job.capture;
    if (JSON.stringify(capture) !== JSON.stringify(renderedCapture)) {
      renderedCapture = capture;
      await setSelectableCapture(capture, jobId);
      $('receipt').hidden = true;
      $('message-count').textContent = capture.html ? `HTML archive · ${Math.ceil(new TextEncoder().encode(capture.html).length / 1024)} KB${capture.report.scrolling ? ' · history scrolled' : ' · loaded page only'}` : `${capture.messages.length} messages · ${capture.messages.filter(message => message.role === 'assistant').length} assistant responses`;
      $('source').href = capture.source.url;
      $('limitations').replaceChildren(...capture.report.limitations.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
      $('messages').replaceChildren(...(capture.messages || []).map((message, i) => {
        const article = document.createElement('article'); article.className = 'message ' + message.role;
        const heading = document.createElement('h3'); heading.textContent = `${i + 1}. ${message.role === 'user' ? 'You' : 'ChatGPT'}`;
        const body = document.createElement('pre'); body.textContent = message.content;
        article.append(heading, body); return article;
      }));
      if (capture.html) {
        const frame = document.createElement('iframe');
        frame.title = 'Styled captured page'; frame.className = 'page-preview';
        frame.setAttribute('sandbox', ''); frame.referrerPolicy = 'no-referrer';
        // Opaque sandbox origin; scripts, forms, popups and top navigation have
        // no permission. Archive CSP permits image display and blocks scripts.
        frame.srcdoc = capture.html;
        const preview = document.createElement('pre'); preview.textContent = capture.text;
        const textDetails = document.createElement('details');
        const textSummary = document.createElement('summary'); textSummary.textContent = 'View page text';
        textDetails.append(textSummary, preview);
        const details = document.createElement('details');
        const summary = document.createElement('summary'); summary.textContent = 'View captured HTML';
        const markup = document.createElement('pre'); markup.textContent = capture.html;
        details.append(summary, markup); $('messages').append(frame, textDetails, details);
      }
      const stored = (await chrome.storage.session.get('draft:' + jobId))['draft:' + jobId];
      const settings = await chrome.storage.local.get(['lastLanguage']);
      const fields = $('save-form').elements;
      fields.title.value = stored?.title ?? capture.title;
      fields.topic.value = stored?.topic ?? '';
      fields.language.value = stored?.language ?? settings.lastLanguage ?? '';
    }
  }
  updateAccount();
}

async function authenticate() {
  try { profile = await currentProfile(); }
  catch (failure) { profile = null; if (!(failure instanceof SessionExpired)) error(failure.message); }
  updateAccount();
}

$('login-form').addEventListener('submit', async event => {
  event.preventDefault(); if (signingIn) return;
  signingIn = true; error(); $('login-button').disabled = true;
  const fields = event.currentTarget.elements;
  const username = fields.username.value; const password = fields.password.value;
  fields.password.value = '';
  try { profile = await signIn(username, password); updateAccount(); }
  catch (failure) { error(failure.message); }
  finally { signingIn = false; $('login-button').disabled = false; }
});
$('sign-out').addEventListener('click', async () => {
  if (saving) return;
  await signOut(); profile = null; updateAccount(); $('receipt').hidden = true;
});
$('save-form').addEventListener('input', () => {
  const fields = $('save-form').elements;
  const draft = { title: fields.title.value, topic: fields.topic.value, language: fields.language.value };
  draftWrite = draftWrite.then(() => chrome.storage.session.set({ ['draft:' + jobId]: draft })).catch(() => { error('Could not retain your draft. Keep this tab open until the save succeeds.'); });
  $('receipt').hidden = true;
});
$('save-form').addEventListener('submit', async event => {
  event.preventDefault(); if (saving || !profile || job?.status !== 'ready') return;
  saving = true; error(); updateAccount();
  const actor = profile;
  const fields = event.currentTarget.elements;
  const metadata = { title: fields.title.value.trim(), topic: fields.topic.value.trim(), language: fields.language.value.trim() };
  try {
    if (!Object.values(metadata).every(Boolean)) throw new Error('Provide a title, topic, and language.');
    // Freeze this capture and metadata throughout the request; retries are idempotent.
    const selectable = selectableCaptureForSave();
    if (selectable?.report.selectable.language) metadata.language = selectable.report.selectable.language;
    const receipt = await saveCapture({ ...(selectable || job.capture), ...metadata }, actor.id);
    const archive = Boolean(job.capture.html);
    if (!/^[a-f0-9-]{36}$/i.test((archive ? receipt?.archive_id : receipt?.conversation_id) || '') || typeof receipt.created !== 'boolean') throw new Error('The save result could not be confirmed. Retry to check for an existing snapshot.');
    if (profile?.id !== actor.id) throw new Error('The snapshot was saved for ' + actor.username + ', but the account changed in another tab. Sign in to that account to review it.');
    await chrome.storage.local.set({ lastLanguage: metadata.language });
    $('receipt-title').textContent = receipt.created ? (archive ? 'HTML archive saved' : 'Conversation saved') : 'This snapshot is already saved';
    $('receipt-description').textContent = archive ? 'Saved to the database. An admin can download it under HTML archives in the portal. Cleanup and conversion are needed before assignment.' : profile.role === 'admin' ? 'The conversation is ready for review and assignment in the portal.' : 'Saved—awaiting admin assignment.';
    $('open-portal').hidden = profile.role !== 'admin';
    $('open-portal').href = activePortal + (archive ? '/#html-archives' : '/conversations/' + receipt.conversation_id);
    $('receipt').hidden = false; $('receipt').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  } catch (failure) {
    if (failure instanceof SessionExpired) { profile = null; updateAccount(); }
    error(failure.message);
  } finally { saving = false; updateAccount(); }
});
$('recapture').addEventListener('click', async () => {
  error(); $('recapture').disabled = true;
  try { const result = await chrome.runtime.sendMessage({ type: 'recapture', jobId }); if (result?.error) throw new Error(result.error); }
  catch (failure) { error(failure.message); }
  finally { $('recapture').disabled = false; await loadJob(); }
});
$('start-assisted').addEventListener('click', async () => {
  if (!profile || saving || job?.assisted?.status === 'running') return;
  error(); $('start-assisted').disabled = true;
  try {
    const result = await chrome.runtime.sendMessage({ type: 'start-assisted', jobId, allowAnswers: $('assisted-answers').checked });
    if (result?.error) throw new Error(result.error);
  } catch (failure) { error(failure.message); }
  finally { await loadJob(); }
});
$('stop-assisted').addEventListener('click', async () => {
  try { await chrome.runtime.sendMessage({ type: 'stop-assisted', jobId }); $('assisted-status').textContent = 'Stopping after the current capture operation…'; }
  catch (failure) { error(failure.message); }
});
$('allow-quiz-answers').addEventListener('change', () => { $('capture-quizzes').disabled = !$('allow-quiz-answers').checked || saving || job?.status !== 'ready'; });
$('capture-quizzes').addEventListener('click', async () => {
  if (!$('allow-quiz-answers').checked || saving || job?.status !== 'ready') return;
  error(); $('capture-quizzes').disabled = true;
  try {
    const result = await chrome.runtime.sendMessage({ type: 'capture-quizzes', jobId, allowQuizAnswers: true });
    if (result?.error) throw new Error(result.error);
  } catch (failure) { error(failure.message); }
  finally { $('allow-quiz-answers').checked = true; await loadJob(); }
});
$('capture-original').addEventListener('click', async () => {
  error(); $('capture-original').disabled = true;
  try {
    const result = await chrome.runtime.sendMessage({ type: 'capture-original', jobId });
    if (result?.error) throw new Error(result.error);
  } catch (failure) { error(failure.message); }
  finally { await loadJob(); }
});
async function downloadOriginal(zip) {
  const button = $(zip ? 'download-original-zip' : 'download-mhtml'); button.disabled = true; error();
  try {
    const archive = await readOriginalArchive(jobId);
    if (!archive) throw new Error('The local archive expired. Capture the original page again.');
    let blob = archive.mhtml;
    if (zip) {
      const resources = archive.resources;
      const { files = [], ...manifest } = resources || {};
      const entries = [...files];
      if (archive.mhtml) entries.push({ path: 'page.mhtml', content: new Uint8Array(await archive.mhtml.arrayBuffer()) });
      entries.push({ path: 'manifest.json', content: JSON.stringify({ format_version: 'chatgpt-original-experiment/1', ...manifest, capture_errors: archive.errors }, null, 2) });
      entries.push({ path: 'README.txt', content: `ORIGINAL CHATGPT PAGE EXPERIMENT\n\n1. Open page.mhtml in a new Chrome tab from the downloaded file. This is Chrome's native archive with original layout and available resources; it is not a script replay.\n2. For the JavaScript experiment, extract this ZIP, open a terminal in that folder and run:\n\n   python -m http.server 8765 --bind 127.0.0.1\n\n   Open http://127.0.0.1:8765/index.html in Chrome. Stop the server with Ctrl+C when finished.\n\nindex.html preserves original page structure and CSS and points available resources to local assets. Original scripts execute here, but remote API calls are blocked. Runtime state, cookies, unloaded history, dynamic URLs and server responses are not archived. Some code or animations may not replay. Check manifest.json for missing resources. source.html.txt retains the captured source for inspection.\n\nThe cleaned conversation.html includes the separate history capture and may rearrange earlier turns. Native archives reflect only the DOM present at native capture time.\n\nThese original files are local experiments. Save to database stores the separate cleaned HTML, not this ZIP or MHTML.\n` });
      if (job?.capture?.html) entries.push({ path: 'conversation.html', content: job.capture.html });
      blob = createArchiveZip(entries);
    }
    if (!blob) throw new Error('No native archive is available. Download the ZIP to inspect the capture report.');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url;
    link.download = `chatgpt-original-${job?.capture?.source?.conversation_id || jobId.replace('capture:', '')}.${zip ? 'zip' : 'mhtml'}`;
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (failure) { error(failure.message); }
  finally { button.disabled = false; }
}
$('download-mhtml').addEventListener('click', () => void downloadOriginal(false));
$('download-original-zip').addEventListener('click', () => void downloadOriginal(true));
$('copy-diagnostics').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify({ error: job?.error, diagnostics: job?.diagnostics }, null, 2));
    $('copy-status').textContent = 'Copied. Paste these diagnostics into the chat.';
  } catch { $('copy-status').textContent = 'Select the diagnostics below and copy them manually.'; }
});
$('settings-form').addEventListener('submit', async event => {
  event.preventDefault();
  try {
    activePortal = portalUrl(event.currentTarget.elements.portal.value.trim());
    await chrome.storage.local.set({ portalUrl: activePortal });
    $('settings-status').textContent = 'Portal address saved.';
    if ($('open-portal').href) {
      const path = new URL($('open-portal').href).pathname;
      $('open-portal').href = activePortal + path;
    }
  } catch (failure) { error(failure.message); }
});

initializeSelectableUI();
await initializeStorage();
$('extension-version').textContent = 'Extension ' + chrome.runtime.getManifest().version + ' · ';
const settings = await chrome.storage.local.get('portalUrl');
try { activePortal = portalUrl(settings.portalUrl); }
catch { activePortal = portalUrl(); error('The saved portal address was invalid. Update it in Portal settings.'); }
$('settings-form').elements.portal.value = activePortal;
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'session' && changes[jobId]) void loadJob().catch(failure => error(failure.message));
  if (area === 'session' && changes.auth && !changes.auth.newValue) { profile = null; updateAccount(); $('receipt').hidden = true; }
  else if (area === 'session' && changes.auth?.newValue) void authenticate();
});
await Promise.all([loadJob(), authenticate()]);
// A terminated service worker should never leave an indefinitely spinning review.
setInterval(() => {
  if (job?.status === 'capturing' && Date.now() - job.startedAt > 90000) {
    $('capture-status').textContent = 'Capture was interrupted. Return to ChatGPT and click the extension again.';
    $('recapture').hidden = !job.tabId;
  }
}, 5000);
