// Selector-independent archive. Chrome serializes this into the source tab.
export async function capturePageHtml(serializeErrors = false, visualToken = null, allowQuizAnswers = false, assisted = null, fullScreenshot = null) {
  const restore = [];
  const initialUrl = location.href;
  const started = Date.now();
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  try {
    const url = new URL(location.href);
    const match = url.pathname.match(/^(?:\/g\/[a-zA-Z0-9_/-]+)?\/c\/([a-f0-9-]{36})\/?$/i);
    if (url.origin !== 'https://chatgpt.com' || !match || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(match[1])) throw new Error('Open a saved conversation on chatgpt.com, then click the extension again.');
    if (!document.body || !document.body.innerText.trim()) throw new Error('The page is empty. Wait for ChatGPT to load and capture again.');
    function check() {
      if (location.href !== initialUrl) throw new Error('The conversation changed during capture. Capture it again.');
      if (Date.now() - started > 65000) throw new Error('History loading took too long. Load earlier messages in ChatGPT and capture again.');
      if (document.querySelector('[data-testid="stop-button"],button[aria-label="Stop generating"],[data-is-streaming="true"],.result-streaming')) throw new Error('Wait until ChatGPT finishes responding, then capture again.');
    }
    check();
    const turnSelector = '[data-testid^="conversation-turn-"],[data-testid="user-message"],[data-user-message-bubble],[data-turn="user"],[data-turn="assistant"],[data-message-author-role="user"],[data-message-author-role="assistant"],[data-conversation-role],[data-chatgpt-agent-turn-start],[data-dil-message-id],[data-chatgpt-selection-message-id]';
    function sourceRole(node) {
      const value = (node.getAttribute('data-message-author-role') || node.getAttribute('data-conversation-role') || node.getAttribute('data-turn') || '').trim().toLowerCase();
      if (node.hasAttribute('data-user-message-bubble') || node.getAttribute('data-testid') === 'user-message' || ['user','human','student'].includes(value)) return 'user';
      if (node.hasAttribute('data-chatgpt-agent-turn-start') || ['assistant','ai','model','tutor'].includes(value)) return 'assistant';
      return 'unknown';
    }
    function stripLeadingSpeakerLabels(scope) {
      const roots = [...(scope.matches?.(turnSelector) ? [scope] : []), ...scope.querySelectorAll(turnSelector)];
      if (!roots.length) roots.push(scope.querySelector('main,[role="main"]') || scope);
      const label = { test: value => /^(?:(?:ChatGPT(?:\s*said\s*:)?|Conversation section)\s*)+$/i.test(value.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '').replace(/(?:^|\n)\s*#{1,6}\s*/g, '').trim()) };
      for (const root of roots) {
        if (sourceRole(root) === 'user') continue;
        const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const remove = new Set();
        for (let text = walker.nextNode(); text; text = walker.nextNode()) {
          if (!text.textContent.trim()) continue;
          const parent = text.parentElement;
          if ((parent.closest(turnSelector) && parent.closest(turnSelector) !== root) || parent.closest('script,style,button,[role="button"],form,nav,aside,header,footer,.sr-only,[hidden],[aria-hidden="true"]')) continue;
          if (parent.closest('pre,code,blockquote')) break;
          // Match whole label containers as well as split spans (ChatGPT / said:).
          let candidate = label.test(text.textContent.trim()) ? text : null;
          for (let node = parent; node && node !== root; node = node.parentElement) {
            if (node.querySelector(turnSelector) || node.querySelector('img,svg,canvas,math,iframe')) break;
            if (label.test(node.textContent.trim())) candidate = node;
          }
          if (!candidate) break;
          remove.add(candidate);
        }
        for (const node of remove) node.remove();
      }
    }
    const turns = () => {
      const nodes = [...document.querySelectorAll(turnSelector)].filter(node => node.textContent.trim() || node.querySelector('img,svg,canvas,iframe'));
      const set = new Set(nodes);
      return nodes.filter(node => {
        const role = sourceRole(node);
        if (role === 'unknown' && nodes.some(child => child !== node && node.contains(child) && sourceRole(child) !== 'unknown')) {
          const remainder = node.cloneNode(true);
          for (const child of remainder.querySelectorAll(turnSelector)) if (sourceRole(child) !== 'unknown') child.remove();
          remainder.querySelectorAll('script,style,button,nav,aside,header,footer,.sr-only').forEach(child => child.remove());
          if (!remainder.textContent.trim() && !remainder.querySelector('img,svg,canvas,iframe')) return false;
        }
        for (let parent = node.parentElement; parent; parent = parent.parentElement) if (set.has(parent) && (role === 'unknown' || sourceRole(parent) === role)) return false;
        return true;
      });
    };
    function key(node) {
      for (const name of ['data-message-id','data-dil-message-id','data-chatgpt-selection-message-id','data-turn-id','data-turn-key','data-testid','id']) {
        const value = node.getAttribute(name);
        if (value && (name !== 'data-testid' || /^conversation-turn-/.test(value))) return sourceRole(node) + ':' + name + ':' + value;
      }
      // A content key is only a fallback for archiving fragments, never a claim
      // that source message identities or full history have been verified.
      return 'content:' + node.textContent + ':' + [...node.querySelectorAll('img')].map(image => image.currentSrc || image.src).join('|');
    }
    const interactive = assisted?.token && globalThis.__portalAssistedCapture?.token === assisted.token ? globalThis.__portalAssistedCapture.scopes.get(assisted.scope_id) : null;
    if (assisted && !interactive?.isConnected) throw new Error('The interactive panel is no longer available.');
    const root = interactive || [...document.querySelectorAll('[data-chatgpt-conversation-selection-target],#thread,main,[role="main"]')].find(node => node.querySelector(turnSelector)) || document.querySelector('main,[role="main"]') || document.body;
    const candidates = new Set([document.scrollingElement, root, ...root.querySelectorAll('*')]);
    for (let node = root.parentElement; node; node = node.parentElement) candidates.add(node);
    const scrollable = [...candidates].filter(node => node && node.clientHeight > 60 && node.clientWidth > 150 && node.scrollHeight > node.clientHeight + 8 && !node.closest('nav,aside,[role="navigation"]') && (node === document.scrollingElement || /auto|scroll/.test(getComputedStyle(node).overflowY)));
    const sourceTurns = turns();
    scrollable.sort((a, b) => {
      const score = node => sourceTurns.filter(turn => node.contains(turn)).length * 1e9 + node.clientWidth * node.clientHeight;
      return score(b) - score(a);
    });
    const scroller = interactive ? null : scrollable[0];
    if (scroller) {
      restore.push({ node: scroller, top: scroller.scrollTop, left: scroller.scrollLeft, style: scroller.getAttribute('style') });
      scroller.style.setProperty('scroll-behavior', 'auto', 'important');
      scroller.style.setProperty('overflow-anchor', 'none', 'important');
    }
    const fragments = new Map();
    const unmarkedWindows = new Map();
    const imageCache = new Map();
    const imageStats = { embedded: 0, linked: 0, failed: 0 };
    const quizPanels = new Map(); const quizFrames = new Map(); const quizReports = []; const unreadableFrames = new Set();
    let quizSpent = 0;
    const counterPattern = /^Question\s+(\d+)\s+(?:of|\/)\s*(\d+)$/i;
    const textOf = node => (node?.textContent || '').replace(/\s+/g, ' ').trim();
    function quizCounter(panel) {
      return [...panel.querySelectorAll('*')].map(node => ({ node, match: textOf(node).match(counterPattern) }))
        .find(({ node, match }) => match && ![...node.children].some(child => counterPattern.test(textOf(child))));
    }
    function quizControl(panel, direction) {
      const pattern = direction < 0 ? /^(?:←\s*)?(?:Previous|Prev)(?:\s+question)?(?:\s*←)?$/i : /^(?:→\s*)?Next(?:\s+question)?(?:\s*→)?$/i;
      return [...panel.querySelectorAll('button,[role="button"]')].find(button => pattern.test(textOf(button)) || pattern.test(button.getAttribute('aria-label') || ''));
    }
    function quizChoiceButtons(panel) {
      const navigation = button => /^(?:Previous|Prev|Next)(?:\s+question)?$/i.test(textOf(button) || button.getAttribute('aria-label') || '');
      return [...panel.querySelectorAll('button[data-d-component="pressable"],[role="button"][data-d-component="pressable"]')]
        .filter(button => !navigation(button) && !button.disabled && button.getAttribute('aria-disabled') !== 'true');
    }
    function findQuizzes(scope) {
      const panels = new Set();
      for (const counter of scope.querySelectorAll('*')) {
        if (!counterPattern.test(textOf(counter)) || [...counter.children].some(child => counterPattern.test(textOf(child)))) continue;
        for (let panel = counter.parentElement, depth = 0; panel && depth < 7; panel = panel.parentElement, depth++) {
          if (panel.matches('main,body,html') || panel.matches(turnSelector)) break;
          const hasChoices = panel.querySelector('input[type="radio"],[role="radio"],label,fieldset') || quizChoiceButtons(panel).length >= 2;
          if (hasChoices && ((quizControl(panel, -1) && quizControl(panel, 1)) || quizChoiceButtons(panel).length >= 2)) { panels.add(panel); break; }
        }
      }
      return [...panels];
    }
    async function captureQuiz(panel) {
      if (quizPanels.has(panel)) return;
      const initial = quizCounter(panel); if (!initial) return;
      const original = Number(initial.match[1]); const total = Number(initial.match[2]);
      if (original < 1 || total < original || total > 100) return;
      const questions = new Map(); const autoAnswered = new Set(); let reason = ''; let restored = true;
      const quizStarted = Date.now();
      const current = () => { const counter = quizCounter(panel); return counter && Number(counter.match[2]) === total ? Number(counter.match[1]) : 0; };
      const budget = () => quizSpent + Date.now() - quizStarted < 18000 && Date.now() - started < 52000;
      async function move(direction, restoring = false) {
        if (!panel.isConnected || (!restoring && !budget())) return false;
        let button = quizControl(panel, direction); const before = current();
        const disabled = control => !control || control.disabled || control.getAttribute('aria-disabled') === 'true';
        const selected = () => panel.querySelector('input[type="radio"]:checked,[role="radio"][aria-checked="true"],[aria-pressed="true"],[aria-selected="true"],[data-state="checked"],[data-state="selected"]');
        if (disabled(button) && allowQuizAnswers === true && !selected()) {
          const option = [...panel.querySelectorAll('input[type="radio"],[role="radio"]')].find(control => !disabled(control)) || quizChoiceButtons(panel)[0];
          if (option) {
            // This branch is enabled only by the explicit review-tab action.
            // These choices are capture artifacts, never learner responses.
            autoAnswered.add(before); option.click();
            for (let attempt = 0; attempt < 16; attempt++) {
              await sleep(50);
              if (location.href !== initialUrl) throw new Error('The conversation changed during quiz capture. Capture it again.');
              if (current() === before + direction) return true;
              button = quizControl(panel, direction);
              if (!disabled(button)) break;
            }
          }
        }
        if (disabled(button) || (button.form && button.type === 'submit')) return false;
        // Never click Submit/Finish or replace an existing selected answer.
        button.click();
        for (let attempt = 0; attempt < 16; attempt++) {
          await sleep(50);
          if (location.href !== initialUrl) throw new Error('The conversation changed during quiz capture. Capture it again.');
          if (current() === before + direction) return true;
          if (!panel.isConnected) return false;
        }
        return false;
      }
      async function rememberQuestion() {
        const number = current();
        if (!number || questions.has(number)) return;
        const saved = await snapshot(panel);
        // Keep options and existing feedback; convert controls to static HTML.
        for (const button of saved.querySelectorAll('button,[role="button"]')) {
          if (/^(?:←\s*)?(?:Previous|Prev|Next)(?:\s+question)?(?:\s*[←→])?$/i.test(textOf(button)) || button === quizControl(saved, -1) || button === quizControl(saved, 1)) { button.remove(); continue; }
          const option = document.createElement('div'); option.append(...button.childNodes); button.replaceWith(option);
        }
        for (const input of saved.querySelectorAll('input[type="radio"],[role="radio"]')) {
          const marker = document.createElement('span'); marker.textContent = input.checked || input.getAttribute('aria-checked') === 'true' ? '● ' : '○ ';
          if (input.localName !== 'input') marker.append(...input.childNodes);
          input.replaceWith(marker);
        }
        saved.querySelectorAll('input,textarea,select,[role="progressbar"],progress').forEach(node => node.remove());
        for (const form of saved.querySelectorAll('form')) { const block = document.createElement('div'); block.append(...form.childNodes); form.replaceWith(block); }
        const entry = document.createElement('section'); entry.dataset.portalQuizQuestion = String(number);
        entry.style.cssText = 'display:block;position:relative;height:auto;max-height:none;overflow:visible;margin:20px 0;padding:16px;border:1px solid #888;border-radius:12px';
        entry.append(...saved.childNodes); questions.set(number, entry);
      }
      try {
        await rememberQuestion();
        for (let count = 0; current() > 1 && count < total && budget(); count++) {
          if (!await move(-1)) { reason = 'Previous is unavailable or the quiz layout changed.'; break; }
          await rememberQuestion();
        }
        for (let count = 0; current() < total && count < total && budget(); count++) {
          if (!await move(1)) { reason = 'Next is unavailable, requires an answer, or the quiz layout changed.' + (autoAnswered.size ? ' Capture-generated selections are labeled.' : ' No answers were selected.'); break; }
          await rememberQuestion();
        }
        if (questions.size < total && !reason) reason = 'Quiz capture reached its time limit.';
      } finally {
        const restoreStarted = Date.now();
        while (panel.isConnected && current() && current() !== original && Date.now() - restoreStarted < 4000 && location.href === initialUrl) {
          if (!await move(current() < original ? 1 : -1, true)) break;
        }
        restored = current() === original;
        quizSpent += Date.now() - quizStarted;
      }
      const complete = questions.size === total;
      const collection = document.createElement('section'); collection.dataset.portalQuiz = 'true';
      collection.style.cssText = 'display:block;position:relative;height:auto;max-height:none;overflow:visible';
      const heading = document.createElement('h3'); heading.textContent = complete ? `Quiz — all ${total} questions` : `Quiz — ${questions.size} of ${total} questions captured`;
      collection.append(heading, ...[...questions].sort(([a], [b]) => a - b).map(([, question]) => question));
      if (!complete || !restored) { const warning = document.createElement('p'); warning.textContent = [!complete ? reason : '', !restored ? 'The original question could not be restored; check the source quiz.' : ''].filter(Boolean).join(' '); collection.append(warning); }
      quizPanels.set(panel, collection);
      quizReports.push({ total, captured: questions.size, complete, original_question: original, restored, limitation: reason, ...(autoAnswered.size ? { auto_answered_questions: [...autoAnswered].sort((a, b) => a - b), selections_are_learner_responses: false } : {}) });
    }
    async function collectQuizzes() {
      for (const panel of findQuizzes(root)) await captureQuiz(panel);
      for (const frame of root.querySelectorAll('iframe')) {
        try {
          const body = frame.contentDocument?.body;
          if (!body) { unreadableFrames.add(frame); continue; }
          const panels = findQuizzes(body);
          if (!panels.length) continue;
          for (const panel of panels) await captureQuiz(panel);
          const saved = await snapshot(body); const wrapper = document.createElement('div');
          wrapper.dataset.portalFrameContent = 'true'; wrapper.append(...saved.childNodes); quizFrames.set(frame, wrapper);
        } catch (error) {
          if (location.href !== initialUrl) throw error;
          unreadableFrames.add(frame);
        }
      }
    }
    function visualId(node) {
      const owner = node.closest(turnSelector) || root;
      const value = key(owner) + ':' + node.tagName + ':' + [...owner.querySelectorAll(node.tagName)].indexOf(node);
      let hash = 2166136261; for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
      return 'visual-' + (hash >>> 0).toString(16);
    }
    let embeddedBytes = 0;
    async function imageData(image) {
      const source = image.currentSrc || image.src;
      if (!source) return null;
      if (imageCache.has(source)) return imageCache.get(source);
      if (source.startsWith('data:image/')) {
        if (embeddedBytes + source.length > 3 * 1024 * 1024) { imageStats.failed++; imageCache.set(source, null); return null; }
        embeddedBytes += source.length; imageStats.embedded++;
        imageCache.set(source, source); return source;
      }
      // Keep regular web images as URLs. Downloading every image and serializing
      // it as a data URI balloons the archive and duplicates bytes in the
      // capture/save pipeline. Rendered-only visuals are described as omitted
      // placeholders instead of being converted to screenshots.
      if (/^https:\/\//i.test(source)) {
        imageStats.linked++;
        if (!image.naturalWidth) imageStats.failed++;
        imageCache.set(source, source);
        return source;
      }
      const result = (async () => {
        try {
          // Preserve the original bytes and format (including GIF/SVG), rather
          // than rasterizing or resizing the rendered image through a canvas.
          const parsed = new URL(source, location.href);
          if (!['https:', 'blob:'].includes(parsed.protocol) || Date.now() - started > 57000) throw new Error('Unavailable image');
          const response = await fetch(parsed.href, { credentials: parsed.origin === location.origin ? 'same-origin' : 'omit', signal: AbortSignal.timeout(1800) });
          if (!response.ok || !/^image\//i.test(response.headers.get('content-type') || '')) throw new Error('Unavailable image');
          const budget = 3 * 1024 * 1024;
          if (Number(response.headers.get('content-length')) > budget) throw new Error('Large image');
          const chunks = []; let length = 0;
          const stream = response.body.getReader();
          try {
            while (true) {
              const chunk = await stream.read(); if (chunk.done) break;
              length += chunk.value.byteLength;
              if (length > budget || embeddedBytes + Math.ceil(length / 3) * 4 + 100 > budget) throw new Error('Image budget');
              chunks.push(chunk.value);
            }
          } finally { await stream.cancel().catch(() => {}); }
          const blob = new Blob(chunks, { type: response.headers.get('content-type') });
          const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); });
          // Other image fetches can finish while this one is being encoded.
          if (embeddedBytes + data.length > budget) throw new Error('Image budget');
          embeddedBytes += data.length; imageStats.embedded++; return data;
        } catch {
          imageStats.linked++;
          if (!/^https:/.test(source) || !image.naturalWidth) imageStats.failed++;
          return /^https:/.test(source) ? source : null;
        }
      })();
      imageCache.set(source, result); return result;
    }
    // Capture resolved layout and typography as well as readable stylesheets.
    // CSS files on another origin may not expose cssRules; computed styles
    // still preserve their visible effect without fetching authenticated assets.
    const properties = ('display visibility opacity position top right bottom left z-index box-sizing width height min-width min-height max-width max-height margin-top margin-right margin-bottom margin-left padding-top padding-right padding-bottom padding-left color background-color background-image background-size background-position background-repeat font-family font-size font-weight font-style line-height letter-spacing text-align text-decoration text-transform text-indent white-space overflow-wrap word-break vertical-align border-top border-right border-bottom border-left border-radius box-shadow outline list-style-type list-style-position border-collapse border-spacing table-layout flex-direction flex-wrap flex-grow flex-shrink flex-basis align-items align-self align-content justify-content justify-items justify-self gap row-gap column-gap grid-template-columns grid-template-rows grid-auto-flow grid-column grid-row overflow-x overflow-y transform transform-origin object-fit object-position fill stroke stroke-width color-scheme').split(' ');
    function normalizeCssUrls(value) {
      return value.replace(/url\(\s*(['\"]?)([^'\")]+)\1\s*\)/gi, (whole, quote, raw) => {
        const target = raw.trim();
        if (/^(?:data:image\/|#)/i.test(target)) return whole;
        try {
          const resolved = new URL(target, location.href);
          if (resolved.protocol === 'https:') return `url(\"${resolved.href}\")`;
        } catch { /* Drop invalid or browser-local resources from the archive. */ }
        return 'none';
      });
    }
    async function snapshot(sourceRoot) {
    if (quizPanels.has(sourceRoot)) return quizPanels.get(sourceRoot).cloneNode(true);
    const clone = sourceRoot.cloneNode(true);
    const originals = [sourceRoot, ...sourceRoot.querySelectorAll('*')];
    const copies = [clone, ...clone.querySelectorAll('*')];
    for (let i = 0; i < originals.length; i++) {
      const original = originals[i]; const copy = copies[i];
      if (original.matches('svg')) copy.setAttribute('data-portal-visual-id', visualId(original));
      if (!copy.style || original.matches('script,style,link,meta,title,head,noscript')) continue;
      const computed = getComputedStyle(original);
      for (const property of properties) {
        const value = computed.getPropertyValue(property);
        if (value) copy.style.setProperty(property, normalizeCssUrls(value));
      }
      // Remove scroll clipping and virtualization containment in the static copy.
      // Keep ordinary overflow (code blocks, menus) unless it hides page content.
      if ((original.scrollHeight > original.clientHeight + 4 && /auto|scroll|hidden|clip/.test(computed.overflowY)) || original === document.body || original === document.documentElement || (scroller && (original === scroller || original.contains(scroller)))) {
        copy.style.setProperty('height', 'auto', 'important'); copy.style.setProperty('max-height', 'none', 'important');
        copy.style.setProperty('min-height', '0', 'important'); copy.style.setProperty('overflow-y', 'visible', 'important');
        copy.style.setProperty('overflow-x', 'visible', 'important'); copy.style.setProperty('flex-shrink', '0', 'important');
        if (['fixed', 'absolute'].includes(computed.position)) { copy.style.position = 'relative'; copy.style.top = 'auto'; copy.style.bottom = 'auto'; }
      }
      copy.style.setProperty('content-visibility', 'visible', 'important');
      copy.style.setProperty('contain', 'none', 'important');
      // Resource URLs were relative to ChatGPT, not the extension review page.
      // External resources remain blocked by the archive's CSP.
      for (const name of ['src', 'href', 'poster']) {
        if (copy.hasAttribute(name) && !copy.getAttribute(name).startsWith('#')) {
          try { copy.setAttribute(name, new URL(copy.getAttribute(name), location.href).href); } catch { /* Preserve malformed source as data. */ }
        }
      }
    }
    const images = originals.map((node, index) => ({ node, copy: copies[index] })).filter(({ node }) => node.matches('img'));
    // Small batches bound network/conversion work while retaining image order.
    for (let i = 0; i < images.length; i += 4) {
      await Promise.all(images.slice(i, i + 4).map(async ({ node, copy }) => {
        const data = await imageData(node);
        if (!(node.currentSrc || node.src).startsWith('data:')) copy.setAttribute('data-portal-original-src', node.currentSrc || node.src);
        copy.setAttribute('data-portal-visual-id', visualId(node));
        copy.removeAttribute('srcset'); copy.removeAttribute('sizes'); copy.removeAttribute('loading');
        copy.removeAttribute('crossorigin'); copy.removeAttribute('onerror'); copy.referrerPolicy = 'no-referrer';
        if (data) copy.src = data;
        else { copy.removeAttribute('src'); copy.alt = `[Image unavailable: ${node.alt || 'image'}]`; }
      }));
    }
    clone.querySelectorAll('picture source').forEach(node => node.remove());
    for (let i = 0; i < originals.length; i++) {
      const node = originals[i]; const copy = copies[i];
      if (quizFrames.has(node)) { copy.replaceWith(quizFrames.get(node).cloneNode(true)); continue; }
      if (!node.matches('canvas,iframe')) continue;
      const placeholder = document.createElement('div');
      placeholder.setAttribute('data-portal-visual-kind', node.localName);
      placeholder.setAttribute('role', 'note');
      placeholder.style.cssText = copy.style.cssText;
      placeholder.textContent = node.matches('iframe') ? '[Embedded frame omitted; no screenshot was taken.]' : '[Canvas omitted; no screenshot was taken.]';
      copy.replaceWith(placeholder);
    }
    for (let i = 0; i < originals.length; i++) if (quizPanels.has(originals[i])) copies[i].replaceWith(quizPanels.get(originals[i]).cloneNode(true));
    stripLeadingSpeakerLabels(clone);
    return clone;
    }
    let topReached = !scroller; let bottomReached = !scroller; let windows = 0;
    async function collect() {
      check(); windows++;
      if (!interactive) await collectQuizzes();
      const nodes = interactive ? [] : turns();
      for (const node of nodes) {
        const id = key(node);
        if (!fragments.has(id)) fragments.set(id, { html: await snapshot(node), text: node.innerText || node.textContent });
      }
      if (!nodes.length && scroller) {
        // Unknown virtualized layouts still get an archive of each distinct
        // loaded window. Overlapping text is preferable to silently losing it.
        const content = root.innerText;
        if (content.trim() && !unmarkedWindows.has(content)) {
          let html = await snapshot(root);
          if (html.tagName === 'BODY') {
            const wrapper = document.createElement('div');
            for (const attr of html.attributes) wrapper.setAttribute(attr.name, attr.value);
            wrapper.append(...html.childNodes); html = wrapper;
          }
          unmarkedWindows.set(content, { html, text: content });
        }
      }
    }
    if (scroller) {
      // Repeatedly reach the top: lazy prepending may change scrollTop/height.
      let stable = 0;
      for (let i = 0; i < 40 && stable < 4; i++) {
        check(); const height = scroller.scrollHeight;
        scroller.scrollTop = 0; await sleep(400);
        stable = scroller.scrollTop <= 2 && scroller.scrollHeight === height ? stable + 1 : 0;
      }
      topReached = scroller.scrollTop <= 2 && stable >= 4;
      if (!topReached) throw new Error('Earlier history is still loading. Wait for it to finish and capture again.');
      for (let i = 0; i < 180; i++) {
        await collect();
        const bottom = scroller.scrollHeight - scroller.clientHeight;
        if (scroller.scrollTop >= bottom - 3) {
          const height = scroller.scrollHeight; await sleep(450); check();
          if (height === scroller.scrollHeight && scroller.scrollTop >= scroller.scrollHeight - scroller.clientHeight - 3) { bottomReached = true; break; }
        }
        scroller.scrollTop = Math.min(scroller.scrollHeight, scroller.scrollTop + Math.max(60, scroller.clientHeight * 0.65));
        await sleep(180);
      }
      if (!bottomReached) throw new Error('Could not reach the end of this conversation. Load the remaining history and capture again.');
    } else await collect();
    check();
    const currentKeys = new Set(turns().map(key));
    const missing = [...fragments].filter(([id]) => !currentKeys.has(id)).map(([, value]) => value);
    const restoredTurns = missing.length;
    const currentText = root.innerText;
    const restoredWindows = [...unmarkedWindows.values()].filter(fragment => !currentText.includes(fragment.text));
    missing.push(...restoredWindows);
    let clone;
    if (interactive) {
      clone = document.createElement('html'); const head = document.createElement('head'); const body = document.createElement('body');
      body.append(await snapshot(root)); clone.append(head, body);
      // Preserve the visible control labels/values as selectable static text.
      for (const node of body.querySelectorAll('button,[role="button"]')) { const block = document.createElement('div'); block.style.cssText = node.style.cssText; block.append(...node.childNodes); node.replaceWith(block); }
      for (const node of body.querySelectorAll('input[type="radio"],[role="radio"]')) { const marker = document.createElement('span'); marker.textContent = node.checked || node.getAttribute('aria-checked') === 'true' ? '● ' : '○ '; if (node.localName !== 'input') marker.append(...node.childNodes); node.replaceWith(marker); }
      for (const node of body.querySelectorAll('select,input[type="range"]')) { const value = document.createElement('p'); value.textContent = node.localName === 'select' ? node.selectedOptions[0]?.text || node.value : 'Slider value: ' + node.value; node.replaceWith(value); }
    } else clone = await snapshot(document.documentElement);
    if (missing.length) {
      const earlier = document.createElement('section'); earlier.setAttribute('data-portal-earlier-turns', '');
      earlier.style.cssText = 'position:relative;display:block;max-width:1000px;margin:0 auto;padding:24px;background:Canvas;color:CanvasText';
      const heading = document.createElement('h2'); heading.textContent = 'Earlier conversation content'; earlier.append(heading);
      if (restoredWindows.length) {
        const explanation = document.createElement('p'); explanation.textContent = 'This page uses an unrecognized conversation layout. Earlier loaded portions are retained below and may overlap.'; earlier.append(explanation);
      }
      for (const fragment of missing) {
        const node = fragment.html;
        node.style.setProperty('position', 'relative', 'important'); node.style.setProperty('transform', 'none', 'important');
        node.style.setProperty('top', 'auto', 'important'); node.style.setProperty('height', 'auto', 'important');
        earlier.append(node);
      }
      clone.querySelector('body')?.prepend(earlier);
    }
    let text = [...missing.map(fragment => fragment.text), interactive ? root.innerText : document.body.innerText, ...[...quizPanels.values()].map(panel => panel.textContent)].join('\n\n');
    let css = ''; let omittedStylesheets = 0;
    for (const sheet of [...root.ownerDocument.styleSheets, ...(root.ownerDocument.adoptedStyleSheets || [])]) {
      try {
        if (sheet.disabled) continue;
        let rules = [...sheet.cssRules].map(rule => normalizeCssUrls(rule.cssText)).join('\n');
        if (sheet.media?.mediaText) rules = `@media ${sheet.media.mediaText}{${rules}}`;
        if (css.length + rules.length > 750000) { omittedStylesheets++; continue; }
        css += rules + '\n';
      } catch { omittedStylesheets++; }
    }
    clone.querySelectorAll('style,link').forEach(node => node.remove());
    const capturedStyle = document.createElement('style'); capturedStyle.textContent = css;
    clone.querySelector('head')?.append(capturedStyle);
    // Preserve the loaded page, including sidebar and shell, without executable
    // scripts, embedded documents, or form values. Never insert it into our DOM.
    clone.querySelectorAll('script,noscript,iframe,object,embed,base,link,meta[http-equiv]').forEach(node => node.remove());
    // External SVG <use> references are same-origin restricted in about:srcdoc.
    // Keep symbols defined within the archived SVG and drop remote symbol links.
    clone.querySelectorAll('svg use,use').forEach(node => {
      const reference = node.getAttribute('href') || node.getAttribute('xlink:href') || '';
      if (reference && !reference.startsWith('#')) node.remove();
    });
    for (const node of clone.querySelectorAll('*')) {
      for (const attr of [...node.attributes]) {
        if (/^on/i.test(attr.name) || attr.name === 'srcdoc' || (['href', 'src', 'action', 'formaction', 'xlink:href'].includes(attr.name) && /^\s*(javascript|vbscript|chrome-extension|moz-extension|file):/i.test(attr.value))) node.removeAttribute(attr.name);
      }
      for (const property of [...node.style]) node.style.setProperty(property, normalizeCssUrls(node.style.getPropertyValue(property)), node.style.getPropertyPriority(property));
      if (node.matches('input,textarea,select')) {
        node.removeAttribute('value'); node.removeAttribute('checked');
        if (node.matches('textarea,select')) node.replaceChildren();
      }
    }
    stripLeadingSpeakerLabels(clone);
    const head = clone.querySelector('head');
    const policy = document.createElement('meta');
    policy.httpEquiv = 'Content-Security-Policy';
    policy.content = "default-src 'none'; style-src 'unsafe-inline'; img-src data: https:; form-action 'none'; base-uri 'none'";
    head?.prepend(policy);
    // Keep the receipt transcript consistent with the cleaned snapshot.
    const readable = clone.querySelector('body').cloneNode(true);
    readable.querySelectorAll('script,style,[hidden],.sr-only,input,textarea,select').forEach(node => node.remove());
    for (const node of readable.querySelectorAll('p,div,article,section,h1,h2,h3,h4,h5,h6,li,tr,pre,br')) node.append('\n');
    text = readable.textContent.replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, '\n\n').trim();
    imageStats.screenshots = 0;
    imageStats.partial_screenshots = 0;
    if (fullScreenshot) {
        const figure = document.createElement('figure'); figure.dataset.portalFullScreenshot = 'true';
        figure.style.cssText = 'display:block;position:relative;max-width:100%;margin:24px auto;text-align:center';
        const caption = document.createElement('figcaption'); caption.textContent = 'Full viewport screenshot (chat input hidden)';
        const image = document.createElement('img'); image.src = fullScreenshot; image.alt = 'Screenshot of the full visible ChatGPT viewport with the chat input hidden';
        image.style.cssText = 'display:block;max-width:100%;height:auto;margin:auto';
        figure.append(caption, image); clone.querySelector('body')?.append(figure); imageStats.screenshots = 1;
    }
    const capture = {
      format_version: 'chatgpt-html-archive/1',
      source: { conversation_id: match[1], url: url.origin + url.pathname.replace(/\/$/, '') },
      title: document.title.replace(/\s*[-–—|]\s*ChatGPT\s*$/i, '').trim().slice(0, 250) || 'ChatGPT conversation',
      captured_at: new Date().toISOString(), extractor_version: 'page-html-v1.7.19',
      html: '<!doctype html>\n' + clone.outerHTML, text,
      report: { scope: 'loaded-page', history_verified: false, quizzes: quizReports, unreadable_frames: unreadableFrames.size, scrolling: { top_reached: topReached, bottom_reached: bottomReached, windows, collected_turns: fragments.size, restored_earlier_turns: restoredTurns, restored_page_windows: restoredWindows.length }, images: imageStats, viewport: { width: innerWidth, height: innerHeight }, styling: { computed_styles: true, omitted_stylesheets: omittedStylesheets }, limitations: [
        'Includes the loaded page, sidebar, and other interface components. These can be removed later.',
        ...quizReports.map((quiz, index) => `Quiz ${index + 1}: ${quiz.captured} of ${quiz.total} questions captured. ${quiz.complete ? 'All questions are preserved as selectable HTML.' : quiz.limitation} ${quiz.restored ? 'Original question restored.' : 'Check the source quiz: the original question could not be restored.'}`),
        ...(unreadableFrames.size ? ['Some embedded frames cannot be read with the current page access and are represented as omitted placeholders; their content is not captured.'] : []),
        'A full viewport screenshot is included when available; the chat input is hidden during the screenshot. Canvas and non-quiz frame content is represented by a placeholder. SVG markup stays as HTML.',
        'Scrolls through available history and expands clipped containers. Identifiable earlier turns removed by page virtualization are retained above the page snapshot. Full server-side history completeness is not verified.',
        ...(restoredWindows.length ? ['Earlier portions from an unrecognized page layout are retained as overlapping sections for later cleanup.'] : []),
        `Images embedded: ${imageStats.embedded}; external image links: ${imageStats.linked}; unavailable image sources: ${imageStats.failed}. Linked images may expire or require ChatGPT sign-in.`,
        'Captures resolved styling and readable CSS. External fonts and attachments are not downloaded; some icons and visual effects may differ.',
        'Scripts, embedded frames, and form values are excluded. The preview is a static snapshot; page controls are inactive.',
        'This HTML archive must be converted into conversation turns before annotation or comparison.',
      ] },
    };
    const captureLimit = 6 * 1024 * 1024;
    if (new TextEncoder().encode(JSON.stringify(capture)).length > captureLimit) {
      // Computed styles copied onto every node make large ChatGPT pages much
      // bigger than their useful content. Retry serialization with semantic
      // HTML intact (headings, tables, images and text), but without styling.
      clone.querySelectorAll('style,[style]').forEach(node => {
        if (node.matches('style')) node.remove(); else node.removeAttribute('style');
      });
      capture.html = '<!doctype html>\n' + clone.outerHTML;
      capture.report.styling = { computed_styles: false, omitted_stylesheets: omittedStylesheets };
      capture.report.limitations.push('The styled snapshot exceeded the capture size limit, so inline styling was omitted. HTML structure, text and image sources were retained.');
    }
    if (new TextEncoder().encode(JSON.stringify(capture)).length > captureLimit) {
      // If the full page shell is still too large, keep the conversation's
      // main content and any separately restored earlier turns. This avoids
      // carrying the ChatGPT sidebar, menus, and other unrelated page chrome.
      const body = clone.querySelector('body');
      const main = clone.querySelector('main') || clone.querySelector('#thread');
      if (body && main && !main.contains(body)) {
        const earlier = clone.querySelector('[data-portal-earlier-turns]');
        const retained = [];
        if (earlier && !main.contains(earlier)) retained.push(earlier.cloneNode(true));
        retained.push(main.cloneNode(true));
        body.replaceChildren(...retained);
      }
      const allowedAttributes = new Set(['id', 'class', 'role', 'aria-label', 'aria-checked', 'aria-pressed', 'aria-selected', 'aria-expanded', 'data-testid', 'data-message-id', 'data-turn-id', 'data-portal-visual-id', 'data-portal-original-src', 'href', 'src', 'alt', 'title', 'colspan', 'rowspan', 'scope', 'headers', 'start', 'value', 'type', 'name', 'checked', 'selected', 'disabled', 'lang', 'dir', 'width', 'height', 'viewbox', 'xmlns', 'mathvariant', 'display', 'encoding']);
      clone.querySelectorAll('*').forEach(node => {
        for (const attribute of [...node.attributes]) if (!allowedAttributes.has(attribute.name.toLowerCase())) node.removeAttribute(attribute.name);
      });
      capture.html = '<!doctype html>\n' + clone.outerHTML;
      capture.report.scope = 'conversation-content';
      capture.report.limitations.push('The full page still exceeded the capture size limit, so unrelated page interface markup and nonessential HTML attributes were omitted. Conversation content and semantic HTML were retained.');
    }
    if (new TextEncoder().encode(JSON.stringify(capture)).length > captureLimit) throw new Error('This conversation still exceeds the 6 MiB limit after compacting its HTML. Shorten the conversation or capture fewer embedded images.');
    check();
    return capture;
  } catch (error) {
    if (serializeErrors) return { capture_error: error.message || 'Could not capture the page.' };
    throw error;
  } finally {
    for (const saved of restore.reverse()) {
      // Restore scrolling before restoring smooth-scroll/anchoring styles.
      saved.node.scrollTop = saved.top; saved.node.scrollLeft = saved.left;
      if (saved.style === null) saved.node.removeAttribute('style'); else saved.node.setAttribute('style', saved.style);
    }
  }
}

// Self-contained: Chrome serializes this function into the isolated tab world.
export async function captureConversation(serializeErrors = false) {
  try {
  const version = 'dom-scroll-v1.0.2';
  const started = Date.now();
  const originalUrl = location.href;
  const url = new URL(originalUrl);
  const match = url.pathname.match(/^(?:\/g\/[a-zA-Z0-9_/-]+)?\/c\/([a-f0-9-]{36})\/?$/i);
  if (url.origin !== 'https://chatgpt.com' || !match || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(match[1])) throw new Error('Open a saved conversation on chatgpt.com, then click the extension again.');
  if (globalThis.__portalCaptureRunning) throw new Error('A capture is already running in this tab.');
  globalThis.__portalCaptureRunning = true;
  const limitations = new Set();
  let scroller;
  let originalTop;
  const pausedStyles = [];
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  function check() {
    if (location.href !== originalUrl) throw new Error('The conversation changed during capture. Capture it again.');
    if (Date.now() - started > 75000) throw new Error('Capture timed out before all messages could be checked. Reload the conversation and try again.');
    if (document.querySelector('[data-testid="stop-button"], button[aria-label="Stop generating"], [data-is-streaming="true"], .result-streaming')) throw new Error('Wait until ChatGPT finishes responding, then capture again.');
  }
  const ignored = 'button,script,style,noscript,[hidden],[aria-hidden="true"],.sr-only,.katex-html,[data-testid*="reasoning"],[data-testid*="thinking"],[data-message-author-role="tool"]';
  function markdown(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node.nodeType !== Node.ELEMENT_NODE || node.matches(ignored)) return '';
    const tag = node.tagName.toLowerCase();
    const children = () => [...node.childNodes].map(markdown).join('');
    const tex = node.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
    if (node.matches('.katex-display')) {
      if (!tex) throw new Error('A formula could not be captured.');
      return `\n\n$$\n${tex}\n$$\n\n`;
    }
    if (node.matches('.katex, math')) {
      const formula = tex || node.getAttribute('alttext');
      if (!formula) throw new Error('A formula could not be captured.');
      return `$${formula}$`;
    }
    if (tag === 'pre') {
      const code = node.querySelector('code');
      if (!code) throw new Error('A code block could not be captured.');
      const text = code.textContent;
      const language = (code.className.match(/language-([a-zA-Z0-9_+-]+)/) || [])[1] || '';
      const longest = Math.max(2, ...[...text.matchAll(/`+/g)].map(item => item[0].length));
      const fence = '`'.repeat(longest + 1);
      return `\n\n${fence}${language}\n${text}${text.endsWith('\n') ? '' : '\n'}${fence}\n\n`;
    }
    if (tag === 'code') {
      const text = node.textContent;
      const fence = '`'.repeat(Math.max(0, ...[...text.matchAll(/`+/g)].map(item => item[0].length)) + 1);
      return `${fence}${text.includes('`') ? ' ' : ''}${text}${text.includes('`') ? ' ' : ''}${fence}`;
    }
    if (/^h[1-6]$/.test(tag)) return `\n\n${'#'.repeat(Number(tag[1]))} ${children().trim()}\n\n`;
    if (tag === 'br') return '\n';
    if (tag === 'hr') return '\n\n---\n\n';
    if (tag === 'strong' || tag === 'b') return `**${children()}**`;
    if (tag === 'em' || tag === 'i') return `*${children()}*`;
    if (tag === 'del' || tag === 's') return `~~${children()}~~`;
    if (tag === 'blockquote') return '\n\n' + children().trim().split('\n').map(line => '> ' + line).join('\n') + '\n\n';
    if (tag === 'ul' || tag === 'ol') {
      return '\n\n' + [...node.children].filter(el => el.tagName === 'LI').map((li, i) => {
        const lines = [...li.childNodes].map(markdown).join('').trim().split('\n');
        const prefix = tag === 'ol' ? `${Number(node.getAttribute('start') || 1) + i}. ` : '- ';
        return prefix + lines[0] + lines.slice(1).map(line => '\n' + ' '.repeat(prefix.length) + line).join('');
      }).join('\n') + '\n\n';
    }
    if (tag === 'table') {
      const rows = [...node.querySelectorAll('tr')].map(row => [...row.children].filter(cell => /^(TH|TD)$/.test(cell.tagName)).map(cell => markdown(cell).trim().replaceAll('|', '\\|').replace(/\n+/g, '<br>')));
      if (!rows.length || !rows[0].length) throw new Error('A table could not be captured.');
      const width = Math.max(...rows.map(row => row.length));
      const line = row => '| ' + Array.from({ length: width }, (_, i) => row[i] || '').join(' | ') + ' |';
      return '\n\n' + [line(rows[0]), line(Array(width).fill('---')), ...rows.slice(1).map(line)].join('\n') + '\n\n';
    }
    if (tag === 'img' || ['video', 'audio', 'canvas', 'svg'].includes(tag) || node.matches('[data-testid*="attachment"], a[download]')) {
      limitations.add('Images, attachments, and other media are represented by placeholders; their contents are not downloaded.');
      const label = (node.getAttribute('alt') || node.getAttribute('title') || (tag === 'a' ? node.textContent : '') || tag).trim();
      return `\n[Media/attachment: ${label}; content not captured]\n`;
    }
    if (tag === 'a') {
      const label = children();
      try {
        const target = new URL(node.getAttribute('href'), location.href);
        if (['http:', 'https:', 'mailto:'].includes(target.protocol)) return `[${label}](<${target.href.replaceAll('>', '%3E')}>)`;
      } catch { /* Unsafe destinations become plain text. */ }
      return label;
    }
    if (['p', 'div', 'section', 'article', 'figure'].includes(tag)) return '\n\n' + children() + '\n\n';
    return children();
  }
  const turnSelector = '[data-turn="user"], [data-turn="assistant"], [data-testid^="conversation-turn-"]';
  function visible(node) { return node.getClientRects().length && !node.closest('[hidden],[aria-hidden="true"]'); }
  function messageEntries() {
    // ChatGPT has used both <main> and non-semantic thread containers. Match
    // explicit message/turn markers; never scrape body text as a fallback.
    const root = [...document.querySelectorAll('#thread,main,[role="main"]')].find(candidate => candidate.querySelector('[data-message-author-role], ' + turnSelector)) || document.body;
    const entries = [...root.querySelectorAll('[data-message-author-role]')]
      .filter(node => ['user', 'assistant'].includes(node.getAttribute('data-message-author-role')) && visible(node))
      .map(node => ({ node, role: node.getAttribute('data-message-author-role'), turn: node.closest(turnSelector) }));
    for (const turn of root.querySelectorAll(turnSelector)) {
      if (!visible(turn) || turn.parentElement.closest(turnSelector) || entries.some(entry => turn.contains(entry.node))) continue;
      let role = turn.getAttribute('data-turn') || turn.getAttribute('data-author-role');
      if (!['user', 'assistant'].includes(role)) {
        const markers = [
          turn.querySelector('[data-testid="user-message"]') ? 'user' : null,
          turn.querySelector('[data-testid="assistant-message"]') ? 'assistant' : null,
          ...[...turn.querySelectorAll('.sr-only, :scope > h5, :scope > h6')].map(label => {
            const text = label.textContent.trim().toLowerCase();
            return /^(you said|you):?$/.test(text) ? 'user' : /^(chatgpt said|chatgpt):?$/.test(text) ? 'assistant' : null;
          }),
        ].filter(Boolean);
        const roles = [...new Set(markers)];
        if (roles.length !== 1) throw new Error('A conversation turn has an unknown or ambiguous speaker. Capture was not saved.');
        role = roles[0];
      }
      entries.push({ node: turn, turn, role });
    }
    return entries.sort((a, b) => a.node === b.node ? 0 : (a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  }
  function readMessages() {
    check();
    const messages = messageEntries().map(({ node, turn, role }) => {
      let id = node.getAttribute('data-message-id') || turn?.getAttribute('data-message-id') || turn?.getAttribute('data-turn-id');
      if (!id && turn?.id?.startsWith('conversation-turn-')) id = turn.id;
      if (!id && /^conversation-turn-\d+$/.test(turn?.getAttribute('data-testid') || '')) {
        id = turn.getAttribute('data-testid') + ':' + role;
        limitations.add('ChatGPT exposed page turn identifiers instead of message UUIDs. These identifiers are preserved within this captured branch.');
      }
      if (!id) throw new Error('ChatGPT page layout is unsupported: stable message IDs not found.');
      let blocks = [...node.querySelectorAll('.markdown')].filter(el => !el.parentElement.closest('.markdown') && !el.closest('[data-testid*="reasoning"],[data-testid*="thinking"]'));
      if (!blocks.length) blocks = [node.querySelector('[data-message-content], .whitespace-pre-wrap, [data-testid="user-message"], [data-testid="assistant-message"]') || node];
      let content = blocks.map(markdown).join('\n\n').trim();
      // Attachments may sit outside the text body but still inside the message.
      for (const attachment of node.querySelectorAll('[data-testid*="attachment"], a[download]')) {
        if (!blocks.some(block => block.contains(attachment))) content += '\n\n' + markdown(attachment).trim();
      }
      if (!content.trim()) throw new Error('An empty or unsupported message was found. Capture was not saved.');
      return { id, role, content };
    });
    if (!messages.length) throw new Error('No conversation messages found. Open a conversation and let it finish loading.');
    if (new Set(messages.map(message => message.id)).size !== messages.length) throw new Error('Duplicate or alternative message branches were detected.');
    return messages;
  }
  function findScroller() {
    const message = messageEntries()[0]?.node;
    if (!message) throw new Error('No conversation messages found.');
    for (let node = message.parentElement; node && node !== document.documentElement; node = node.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight + 1) return node;
    }
    return document.scrollingElement;
  }
  async function settle() {
    let previous = ''; let stable = 0;
    while (stable < 3) {
      await sleep(140); check();
      const messages = readMessages();
      const current = JSON.stringify([scroller.scrollHeight, messages]);
      stable = current === previous ? stable + 1 : 0;
      previous = current;
    }
    if ([...document.querySelectorAll('main [aria-busy="true"], main [data-testid*="loading"], #thread [aria-busy="true"]')].some(visible)) throw new Error('The conversation is still loading. Try again after loading finishes.');
  }
  async function pass() {
    scroller.scrollTop = 0; await settle();
    if (scroller.scrollTop > 2) throw new Error('Could not reach the start of the conversation.');
    const collected = [];
    const positions = new Map();
    while (true) {
      check();
      let last = -1;
      const batch = readMessages();
      if (collected.length && !batch.some(message => positions.has(message.id))) throw new Error('Missing messages detected between capture windows.');
      for (const message of batch) {
        if (positions.has(message.id)) {
          const position = positions.get(message.id);
          if (position <= last || JSON.stringify(collected[position]) !== JSON.stringify(message)) throw new Error('The selected branch changed during capture.');
          last = position;
        } else {
          // A newly loaded earlier message cannot safely be appended out of order.
          if (last >= 0 && last < collected.length - 1) throw new Error('Message order changed during capture.');
          positions.set(message.id, collected.length); collected.push(message); last = collected.length - 1;
        }
      }
      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) {
        await settle();
        if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) break;
      }
      const before = scroller.scrollTop;
      scroller.scrollTop = Math.min(scroller.scrollTop + Math.max(100, scroller.clientHeight * .65), scroller.scrollHeight);
      await sleep(110);
      if (scroller.scrollTop === before) throw new Error('Could not continue scrolling the conversation.');
    }
    return collected;
  }
  try {
    check();
    const waitUntil = Date.now() + 8000;
    while (!messageEntries().length && Date.now() < waitUntil) { await sleep(200); check(); }
    scroller = findScroller(); originalTop = scroller.scrollTop;
    // Disable smooth scrolling and anchoring only for the duration of capture.
    for (const property of ['scroll-behavior', 'overflow-anchor']) {
      pausedStyles.push([property, scroller.style.getPropertyValue(property), scroller.style.getPropertyPriority(property)]);
      scroller.style.setProperty(property, property === 'scroll-behavior' ? 'auto' : 'none', 'important');
    }
    const first = await pass();
    const second = await pass();
    check();
    if (JSON.stringify(first) !== JSON.stringify(second)) throw new Error('The conversation changed or more history loaded. Capture again.');
    if (!second.some(message => message.role === 'assistant')) throw new Error('No assistant responses found.');
    const capture = {
      format_version: 'chatgpt-portal-capture/1',
      source: { conversation_id: match[1], url: url.origin + url.pathname.replace(/\/$/, '') },
      title: (document.title.replace(/\s*[-–|]\s*ChatGPT\s*$/, '').trim() || 'ChatGPT conversation').slice(0, 250),
      captured_at: new Date().toISOString(), extractor_version: version,
      report: { complete: true, top_reached: true, bottom_reached: true, consistent_passes: true, message_count: second.length, limitations: [...limitations] },
      messages: second,
    };
    if (new TextEncoder().encode(JSON.stringify(capture)).length > 2000000) throw new Error('Conversation is too large for the 2 MB import limit.');
    return capture;
  } finally {
    if (scroller) {
      scroller.scrollTop = originalTop;
      for (const [property, value, priority] of pausedStyles) {
        if (value) scroller.style.setProperty(property, value, priority); else scroller.style.removeProperty(property);
      }
    }
    globalThis.__portalCaptureRunning = false;
  }
  } catch (error) {
    if (serializeErrors) {
      // Structural diagnostics only: never copy textContent, HTML, arbitrary
      // attribute values, class names, URLs, element IDs, or form values.
      const main = document.querySelector('main,[role="main"]');
      const nodes = [...(main || document.body).querySelectorAll('*')].slice(0, 15000);
      const tags = {};
      const dataAttributes = {};
      const speakerAttributes = {};
      let shadowRoots = 0;
      for (const node of nodes) {
        const tag = node.tagName.toLowerCase();
        tags[tag] = (tags[tag] || 0) + 1;
        if (node.shadowRoot) shadowRoots++;
        for (const attribute of node.getAttributeNames()) {
          if (attribute.startsWith('data-')) dataAttributes[attribute] = (dataAttributes[attribute] || 0) + 1;
        }
        for (const attribute of ['role','data-role','data-speaker','data-author','data-author-role','data-message-role','data-message-author-role']) {
          const value = node.getAttribute(attribute)?.toLowerCase();
          if (['user','assistant','human','ai','model','student','tutor','article','log','listitem'].includes(value)) {
            const key = attribute + '=' + value;
            speakerAttributes[key] = (speakerAttributes[key] || 0) + 1;
          }
        }
      }
      const structure = (node, depth = 0, budget = { remaining: 60 }) => {
        if (depth > 7 || budget.remaining-- <= 0) return null;
        return { tag: node.tagName.toLowerCase(), attributes: node.getAttributeNames().filter(name => name.startsWith('data-') || ['role','id','class'].includes(name)), children: [...node.children].map(child => structure(child, depth + 1, budget)).filter(Boolean) };
      };
      return {
      capture_error: error.message || 'Could not capture this conversation.',
      capture_diagnostics: {
        extractor_version: 'dom-scroll-v1.0.2',
        document_ready: document.readyState,
        main_containers: document.querySelectorAll('main,[role="main"]').length,
        thread_containers: document.querySelectorAll('#thread').length,
        role_markers: document.querySelectorAll('[data-message-author-role]').length,
        turn_markers: document.querySelectorAll('[data-testid^="conversation-turn-"],[data-turn="user"],[data-turn="assistant"]').length,
        inspected_elements: nodes.length,
        tag_counts: tags,
        data_attribute_counts: dataAttributes,
        recognized_speaker_attributes: speakerAttributes,
        open_shadow_roots: shadowRoots,
        main_structure: main ? structure(main) : null,
      },
      };
    }
    throw error;
  }
}
