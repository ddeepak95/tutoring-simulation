// Self-contained: executed in Chrome's isolated world, never supplied by a model.
export async function assistedPage(mode, token, expectedUrl, input = {}) {
  if (location.href !== expectedUrl || location.origin !== 'https://chatgpt.com') throw new Error('The source conversation changed.');
  const key = '__portalAssistedCapture';
  const state = globalThis[key];
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  if (mode === 'init') {
    document.getElementById('portal-assisted-controls')?.remove();
    const overlay = document.createElement('aside'); overlay.id = 'portal-assisted-controls';
    overlay.style.cssText = 'position:fixed!important;top:8px!important;right:8px!important;z-index:2147483647!important;padding:12px!important;background:#fff!important;color:#17251e!important;border:2px solid #235f48!important;border-radius:10px!important;font:14px/1.5 system-ui!important;box-shadow:0 3px 20px #0003!important';
    const label = document.createElement('span'); label.textContent = 'Assisted capture running ';
    const stop = document.createElement('button'); stop.textContent = 'Stop'; stop.type = 'button';
    stop.onclick = () => { stop.disabled = true; label.textContent = 'Stopping after the current operation… '; void chrome.runtime.sendMessage({ type: 'stop-assisted-source', token }); };
    overlay.append(label, stop); if (!input.detached) document.body.append(overlay);
    globalThis[key] = { token, revision: 0, targets: new Map(), scopes: new Map(), ids: new WeakMap(), next: 0, touched: new Map(), scroll: [], overlay };
    return { ready: true };
  }
  if (!state || state.token !== token) throw new Error('Assisted capture session expired.');
  if (mode === 'overlay') { state.overlay.hidden = Boolean(input.hidden); return { ready: true }; }
  const blocked = 'nav,aside,header,footer,[role="navigation"],[data-testid="composer"],[data-user-message-bubble],[data-message-author-role="user"],[data-conversation-role="user"],[data-turn="user"],[data-testid*="reasoning"],[data-testid*="thinking"]';
  const turn = '[data-message-author-role="assistant"],[data-conversation-role="assistant"],[data-conversation-role="model"],[data-turn="assistant"],[data-chatgpt-agent-turn-start]';
  const deny = /\b(send|submit|finish|delete|remove|reset|restart|share|publish|buy|purchase|sign.?out|log.?out|regenerate|edit|copy|report|download|upload|good response|bad response|read aloud|dislike|thumbs)\b/i;
  const name = node => (node.getAttribute('aria-label') || node.innerText || node.getAttribute('title') || node.labels?.[0]?.innerText || node.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().slice(0, 240);
  const visible = node => !!node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden';
  const id = node => { if (!state.ids.has(node)) state.ids.set(node, 'node-' + ++state.next); return state.ids.get(node); };
  function scopeFor(node, root) {
    for (let panel = node.parentElement, depth = 0; panel && panel !== root && depth < 6; panel = panel.parentElement, depth++) {
      if (/Question\s*\d+\s*(?:of|\/)\s*\d+/i.test(panel.innerText || '') && [...panel.querySelectorAll('button,[role="button"]')].some(button => /^(?:Next|Previous|Prev)\b/i.test(name(button)))) return panel;
    }
    const semantic = node.closest('section,details,fieldset,[role="group"],[role="tabpanel"],[data-quiz]');
    if (semantic && root.contains(semantic) && semantic !== root) return semantic;
    let scope = node.parentElement || root;
    for (let i = 0; i < 4 && scope.parentElement && scope.parentElement !== root && scope.innerText.length < 5000; i++) scope = scope.parentElement;
    return scope;
  }
  function rememberScroll(node) {
    for (let parent = node; parent; parent = parent.parentElement) if (parent.scrollHeight > parent.clientHeight + 2 && !state.scroll.some(saved => saved.node === parent)) state.scroll.push({ node: parent, top: parent.scrollTop, left: parent.scrollLeft });
  }
  if (mode === 'cleanup') {
    for (const [node, original] of [...state.touched].reverse()) {
      if (!node.isConnected) continue;
      try {
        if (node.localName === 'details') node.open = original;
        else if (node.matches('input[type="range"],select')) {
          const setter = Object.getOwnPropertyDescriptor(node.ownerDocument.defaultView[node.localName === 'select' ? 'HTMLSelectElement' : 'HTMLInputElement'].prototype, 'value')?.set;
          setter?.call(node, original); node.dispatchEvent(new Event('input', { bubbles: true })); node.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } catch { /* Remaining differences are reported by the controller. */ }
    }
    for (const saved of state.scroll.reverse()) { saved.node.scrollTop = saved.top; saved.node.scrollLeft = saved.left; }
    state.overlay.remove(); delete globalThis[key]; return { restored: 'scroll positions, details and value controls; button navigation and answers can remain changed' };
  }
  if (mode === 'observe') {
    state.revision++; state.targets.clear();
    const roots = [...document.querySelectorAll(turn)].filter(node => !node.closest(blocked));
    const documents = [...roots]; let unreadableFrames = 0;
    for (const root of roots) for (const frame of root.querySelectorAll('iframe')) {
      try { if (frame.contentDocument?.body) documents.push(frame.contentDocument.body); else unreadableFrames++; } catch { unreadableFrames++; }
    }
    const candidates = [];
    for (const root of documents) for (const node of root.querySelectorAll('button,[role="button"],summary,[role="tab"],input[type="radio"],[role="radio"],input[type="range"],select')) {
      if (candidates.length >= 80 || node.closest(blocked) || state.targets.has(id(node))) continue;
      if (!visible(node) && !node.matches('input[type="radio"]')) continue;
      const label = name(node);
      if (deny.test(label) || (node.form && node.type === 'submit')) continue;
      const scope = scopeFor(node, root); const scopeId = id(scope); state.scopes.set(scopeId, scope);
      const quizOption = node.matches('input[type="radio"],[role="radio"]') || (node.matches('button,[role="button"]') && /Question\s*\d+\s*(?:of|\/)\s*\d+/i.test(scope.innerText || '') && !/^(?:Next|Previous|Prev|Show|Expand)\b/i.test(label));
      const candidate = { id: id(node), scope_id: scopeId, label: label || 'Unlabeled ' + node.localName, kind: quizOption ? 'answer' : node.matches('input[type="range"]') ? 'range' : node.localName === 'select' ? 'select' : node.localName === 'summary' ? 'expand' : 'click', disabled: Boolean(node.disabled || node.getAttribute('aria-disabled') === 'true'), selected: Boolean(node.checked || node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true' || node.getAttribute('aria-pressed') === 'true'), expanded: node.localName === 'summary' ? node.parentElement.open : node.getAttribute('aria-expanded'), context: (scope.innerText || '').slice(0, 4500), ...(node.localName === 'select' ? { options: [...node.options].slice(0, 30).map(option => ({ value: option.value, label: option.text, disabled: option.disabled })) } : {}), ...(node.matches('input[type="range"]') ? { value: node.value, min: node.min || '0', max: node.max || '100', step: node.step || '1' } : {}) };
      state.targets.set(candidate.id, { node, scope, candidate }); candidates.push(candidate);
    }
    const excerpt = [...roots].map(node => node.innerText).join('\n\n').slice(0, 40000);
    const bounds = (document.querySelector('main') || roots[0])?.getBoundingClientRect();
    const x = Math.max(0, bounds?.left || 0); const y = Math.max(0, bounds?.top || 0);
    const captureRect = bounds ? { x, y, width: Math.min(innerWidth, bounds.right) - x, height: Math.min(innerHeight, bounds.bottom) - y } : null;
    return { url: location.href, revision: state.revision, excerpt, candidates, unreadable_frames: unreadableFrames, known_responses: roots.length, viewport: { width: innerWidth, height: innerHeight }, capture_rect: captureRect };
  }
  if (mode === 'act') {
    if (input.revision !== state.revision) throw new Error('Stale observation; inspect the page again.');
    if (input.action === 'wait') { await delay(600); return { changed: false, description: 'Waited for rendering' }; }
    if (input.action === 'scroll') {
      const root = document.querySelector(turn) || document.querySelector('main');
      if (!root) throw new Error('No conversation content to scroll.');
      const nodes = [document.scrollingElement, ...document.querySelectorAll('main,main *')].filter(node => node && node.scrollHeight > node.clientHeight + 8 && node.clientHeight > 100 && !node.closest(blocked));
      const node = nodes.sort((a, b) => b.clientHeight * b.clientWidth - a.clientHeight * a.clientWidth)[0];
      if (!node) return { changed: false, description: 'No scrollable conversation found' };
      rememberScroll(node); const before = node.scrollTop; node.scrollTop += Math.max(200, node.clientHeight * .7); await delay(300);
      return { changed: node.scrollTop !== before, description: 'Scrolled conversation down' };
    }
    const target = state.targets.get(input.target_id);
    if (!target?.node.isConnected || target.node.closest(blocked) || deny.test(name(target.node))) throw new Error('That control is no longer available.');
    const { node, scope, candidate } = target;
    if (node.disabled || node.getAttribute('aria-disabled') === 'true') throw new Error('That control is disabled.');
    if (candidate.kind === 'answer' && input.allow_answers !== true) throw new Error('Quiz answers were not enabled for assisted capture.');
    if (candidate.kind === 'answer' && scope.querySelector('input[type="radio"]:checked,[role="radio"][aria-checked="true"],[aria-pressed="true"]')) throw new Error('An existing answer is already selected; it will not be replaced.');
    rememberScroll(node); node.scrollIntoView({ block: 'center', behavior: 'instant' }); await delay(100);
    if (candidate.kind === 'expand' && !state.touched.has(node.parentElement)) state.touched.set(node.parentElement, node.parentElement.open);
    if (input.action === 'set_value' && ['range', 'select'].includes(candidate.kind)) {
      if (!state.touched.has(node)) state.touched.set(node, node.value);
      if (candidate.kind === 'select' && !candidate.options.some(option => !option.disabled && option.value === input.value)) throw new Error('Choose an available select option.');
      if (candidate.kind === 'range' && (!Number.isFinite(Number(input.value)) || Number(input.value) < Number(candidate.min) || Number(input.value) > Number(candidate.max))) throw new Error('Slider value is out of range.');
      const setter = Object.getOwnPropertyDescriptor(node.ownerDocument.defaultView[node.localName === 'select' ? 'HTMLSelectElement' : 'HTMLInputElement'].prototype, 'value').set;
      setter.call(node, input.value); node.dispatchEvent(new Event('input', { bubbles: true })); node.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (input.action === 'click' && !['range', 'select'].includes(candidate.kind)) node.click();
    else throw new Error('Unsupported action for this control.');
    await delay(350);
    if (location.href !== expectedUrl) throw new Error('The source conversation changed.');
    return { changed: true, scope_id: candidate.scope_id, synthetic_answer: candidate.kind === 'answer', description: candidate.label };
  }
  throw new Error('Unknown assisted capture operation.');
}
