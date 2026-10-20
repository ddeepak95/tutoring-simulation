import { assistedPage } from './assisted-page.js';
import { capturePageHtml } from './capture.js';
import { accessToken } from './client.js';
import { writeOriginalArchive } from './archive-store.js';

const active = new Map();
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export function stopAssisted(jobId) { const run = active.get(jobId); if (run) { run.stopped = true; run.abort.abort(); } return Boolean(run); }
export function assistedRunning(jobId) { return active.has(jobId); }

export function mergeAssisted(base, states, report) {
  let html = base.html; let text = base.text; let saved = 0;
  for (const [index, state] of states.entries()) {
    const body = state.capture.html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1];
    if (!body) continue;
    const heading = 'Interactive state ' + (index + 1) + ': ' + state.label;
    const entry = `<article data-turn="assistant" data-turn-id="assisted-${index + 1}" data-portal-assisted-state="true" style="position:relative;display:block;max-width:1000px;margin:24px auto;padding:24px;border:1px solid #888"><h3>${escape(heading)}</h3>${body}</article>`;
    const next = html.replace(/<\/body>/i, entry + '</body>');
    const nextText = text + '\n\n' + heading + '\n' + state.capture.text;
    if (new TextEncoder().encode(JSON.stringify({ ...base, html: next, text: nextText, report: { ...base.report, assisted: report } })).length > 5900000) { report.limitations.push('Some interactive states exceeded the combined capture size limit and were omitted.'); break; }
    html = next; text = nextText; saved++;
  }
  report.states_saved = saved;
  report.coverage = 'observed states only; exhaustive interactivity and pixel fidelity are not verified';
  return { ...base, html, text, report: { ...base.report, assisted: report, limitations: [...base.report.limitations, `Assisted capture saved ${saved} interactive states. These supplement the original page snapshot; they are not additional conversational turns.`, ...report.limitations] } };
}

export async function runAssisted(jobId, tabId, { allowAnswers = false, takeScreenshot, assertSource, token }) {
  if (active.has(jobId)) throw new Error('Assisted capture is already running.');
  const initial = (await chrome.storage.session.get(jobId))[jobId];
  if (!initial?.capture?.html) throw new Error('Make a normal capture first.');
  const url = (await chrome.tabs.get(tabId)).url;
  if (new URL(url).pathname.replace(/\/$/, '') !== new URL(initial.capture.source.url).pathname.replace(/\/$/, '')) throw new Error('The source conversation changed.');
  const run = { stopped: false, abort: new AbortController() }; active.set(jobId, run);
  const report = { status: 'running', model: null, provider: 'google', steps: [], limitations: [], states_saved: 0, allow_answers: allowAnswers, synthetic_answers: false, started_at: new Date().toISOString() };
  const states = []; const seen = new Set(); const attempts = new Map(); let lastScope; let initialized = false; let stateBytes = 0; const started = Date.now();
  const execute = async (mode, input = {}) => {
    if (mode === 'cleanup') { if ((await chrome.tabs.get(tabId)).url !== url) throw new Error('Source changed.'); }
    else await assertSource(url);
    const [result] = await chrome.scripting.executeScript({ target: { tabId }, func: assistedPage, args: [mode, token, url, input] });
    return result.result;
  };
  const publish = async () => {
    const current = (await chrome.storage.session.get(jobId))[jobId];
    await chrome.storage.session.set({ [jobId]: { ...current, assisted: structuredClone(report) } });
  };
  async function snapshot(scopeId, label) {
    if (!scopeId || run.stopped) return;
    await assertSource(url);
    await execute('overlay', { hidden: true });
    let result;
    try { [result] = await chrome.scripting.executeScript({ target: { tabId }, func: capturePageHtml, args: [true, token, false, { token, scope_id: scopeId }] }); }
    finally { await execute('overlay', { hidden: false }); }
    const capture = result.result;
    if (capture?.capture_error) { report.limitations.push('An interactive state could not be preserved: ' + capture.capture_error); return; }
    const signature = capture.text + '|' + (capture.html.match(/<img[^>]+src="[^"]+"/g) || []).join('');
    if (seen.has(signature)) return;
    const size = new TextEncoder().encode(capture.html).length;
    if (states.length >= 24 || stateBytes + size > 10000000) { report.limitations.push('Stopped at the interactive-state storage budget.'); run.limitReached = true; return; }
    stateBytes += size;
    seen.add(signature); states.push({ capture, label, synthetic: report.synthetic_answers });
    report.states_saved = states.length;
    await writeOriginalArchive('assisted:' + jobId, { source: initial.capture.source, states });
  }
  try {
    await publish(); await execute('init'); initialized = true;
    for (let step = 0; step < 18 && Date.now() - started < 180000 && !run.stopped && !run.limitReached; step++) {
      const observation = await execute('observe');
      if (!observation.known_responses) { report.limitations.push('Assistant message boundaries were not recognized. No dynamic actions were attempted.'); break; }
      if (lastScope) await snapshot(lastScope.id, lastScope.label);
      if (observation.unreadable_frames && !report.limitations.includes('Some embedded frames could not be inspected or interacted with.')) report.limitations.push('Some embedded frames could not be inspected or interacted with.');
      if (!observation.candidates.length) break;
      let screenshot = null;
      try { await execute('overlay', { hidden: true }); screenshot = await takeScreenshot(observation.viewport, observation.capture_rect); if (screenshot.length > 2500000) screenshot = null; } catch { report.limitations.push('A visual observation was unavailable; the agent used the DOM observation.'); }
      finally { await execute('overlay', { hidden: false }); }
      if (run.stopped) break;
      const auth = await accessToken();
      const response = await fetch('http://127.0.0.1:8766/step', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth }, signal: AbortSignal.any([run.abort.signal, AbortSignal.timeout(25000)]), body: JSON.stringify({ observation, screenshot, allow_answers: allowAnswers, history: report.steps.slice(-10) }) });
      const decision = await response.json();
      if (!response.ok) throw new Error(decision.error || 'The local agent helper rejected the request.');
      if (run.stopped) break;
      await assertSource(url);
      report.model = decision.model; const action = decision.action;
      if (!action || !['click', 'set_value', 'scroll', 'wait', 'finish'].includes(action.type) || typeof action.reason !== 'string') throw new Error('The model returned an invalid action.');
      if (action.type === 'finish') { report.steps.push({ action: 'finish', reason: action.reason.slice(0, 500), result: 'Model reported finished; coverage remains unverified.' }); break; }
      const candidate = observation.candidates.find(candidate => candidate.id === action.target_id);
      if (['click', 'set_value'].includes(action.type) && !candidate) throw new Error('The model chose a control that was not observed.');
      const attempt = action.type + ':' + (candidate?.scope_id || '') + ':' + (candidate?.label || '') + ':' + (action.value || '') + ':' + (candidate?.context || observation.excerpt);
      attempts.set(attempt, (attempts.get(attempt) || 0) + 1);
      if (attempts.get(attempt) > 2) { report.limitations.push('Stopped because the agent repeated an action without useful progress.'); break; }
      if (candidate) await snapshot(candidate.scope_id, 'Before ' + candidate.label);
      if (run.stopped || run.limitReached) break;
      try {
        const result = await execute('act', { action: action.type, target_id: action.target_id, value: action.value, revision: observation.revision, allow_answers: allowAnswers });
        if (result.synthetic_answer) report.synthetic_answers = true;
        lastScope = result.scope_id ? { id: result.scope_id, label: result.description } : null;
        // Save the revealed state immediately, including before Stop can be used.
        if (lastScope) await snapshot(lastScope.id, 'After ' + lastScope.label);
        report.steps.push({ action: action.type, target: candidate?.label || null, reason: action.reason.slice(0, 500), result: result.description, synthetic_answer: Boolean(result.synthetic_answer) });
      } catch (error) { report.steps.push({ action: action.type, target: candidate?.label || null, reason: action.reason.slice(0, 500), result: error.message }); }
      await publish();
    }
    report.status = run.stopped ? 'stopped' : 'completed';
    if (report.steps.length >= 18 || Date.now() - started >= 180000) report.limitations.push('Assisted capture reached its action or time budget.');
  } catch (error) {
    report.status = run.stopped ? 'stopped' : 'error';
    if (!run.stopped) report.limitations.push(error.message.includes('fetch') ? 'Could not reach the local agent helper. Run npm run agent in the extension folder.' : error.message);
  } finally {
    if (initialized) { try { await execute('cleanup'); } catch { report.limitations.push('Source controls or scroll positions could not be restored.'); } }
    report.finished_at = new Date().toISOString();
    report.limitations.push('The agent may leave tabs, navigation and quiz answers changed. Capture-generated answers and feedback are not learner responses.');
    const capture = mergeAssisted(initial.capture, states, report);
    const current = (await chrome.storage.session.get(jobId))[jobId];
    await chrome.storage.session.set({ [jobId]: { ...current, status: 'ready', capture, assisted: structuredClone(report) } });
    active.delete(jobId);
  }
  return report;
}
