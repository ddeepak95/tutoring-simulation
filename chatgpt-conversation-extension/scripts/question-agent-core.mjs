import crypto from 'node:crypto';

export function parseQuestionSet(value) {
  if (!value || typeof value !== 'object' || !Array.isArray(value.questions) || value.questions.length < 1 || value.questions.length > 100) {
    throw new Error('Question file must contain between 1 and 100 questions in a "questions" array.');
  }
  const ids = new Set();
  return value.questions.map((question, index) => {
    if (!question || typeof question !== 'object' || Array.isArray(question)) throw new Error(`Question ${index + 1} must be an object.`);
    const fields = {};
    for (const key of ['id', 'prompt', 'title', 'topic', 'language']) {
      if (typeof question[key] !== 'string' || !question[key].trim()) throw new Error(`Question ${index + 1} needs a non-empty ${key}.`);
      fields[key] = question[key].trim();
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(fields.id) || ids.has(fields.id)) throw new Error(`Question ${index + 1} has an invalid or duplicate id.`);
    if (fields.prompt.length > 12000 || fields.title.length > 250 || fields.topic.length > 1000 || fields.language.length > 80) throw new Error(`Question ${fields.id} exceeds a field length limit.`);
    ids.add(fields.id);
    return fields;
  });
}

export function questionFingerprint(question) {
  return crypto.createHash('sha256').update(JSON.stringify(question)).digest('hex');
}

export function answerSelectionIsNeeded(candidates) {
  return answerSelectionScopes(candidates).size > 0;
}

export function answerSelectionScopes(candidates) {
  const groups = new Map();
  for (const candidate of candidates) {
    const key = candidate.scope_id || candidate.context || '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(candidate);
  }
  const allowed = new Set();
  for (const [scopeId, group] of groups) {
    const unansweredOption = group.some(candidate => candidate.kind === 'answer' && !candidate.selected && !candidate.disabled);
    // A disabled Previous button on the first question does not block forward
    // progress. Only gate answer selection when moving on is actually blocked.
    const blockedNavigation = group.some(candidate => candidate.disabled && /^(?:next|continue)(?:\b|\s)/i.test(candidate.label));
    if (unansweredOption && blockedNavigation) allowed.add(scopeId);
  }
  return allowed;
}

export function mergeInteractiveStates(base, states, report) {
  let html = base.html;
  let text = base.text;
  let saved = 0;
  const seen = new Set();
  for (const state of states) {
    const body = state.capture.html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1];
    if (!body) continue;
    const signature = state.capture.text + '|' + (state.capture.html.match(/<img[^>]+src="[^"]+"/g) || []).join('');
    if (seen.has(signature)) continue;
    seen.add(signature);
    const article = `<article data-turn="assistant" data-turn-id="agent-state-${saved + 1}" data-portal-assisted-state="true" style="position:relative;display:block;max-width:1000px;margin:24px auto;padding:24px;border:1px solid #888">${body}</article>`;
    const nextHtml = html.replace(/<\/body>/i, article + '</body>');
    const nextText = text + '\n\n' + state.capture.text;
    const next = { ...base, html: nextHtml, text: nextText, report: { ...base.report, assisted: { ...report, states_saved: saved + 1 } } };
    if (new TextEncoder().encode(JSON.stringify(next)).length > 5_700_000) {
      report.limitations.push('Some interactive states exceeded the capture size limit and were omitted.');
      break;
    }
    html = nextHtml;
    text = nextText;
    saved++;
  }
  report.states_saved = saved;
  report.coverage = 'observed states only; exhaustive interactivity and pixel fidelity are not verified';
  const limitations = [...base.report.limitations, ...report.limitations];
  return {
    ...base,
    html,
    text,
    report: { ...base.report, assisted: report, limitations },
  };
}

export function isAnswerAllowed(action, candidates, allowedAnswerScopes) {
  if (action?.type !== 'click' && action?.type !== 'set_value') return true;
  const candidate = candidates.find(item => item.id === action.target_id);
  if (!candidate) return false;
  return candidate.kind !== 'answer' || (allowedAnswerScopes.has(candidate.scope_id || candidate.context || '') && !candidate.selected && !candidate.disabled);
}
