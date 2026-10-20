const turnSelector = '[data-testid^="conversation-turn-"],[data-testid="user-message"],[data-user-message-bubble],[data-turn="user"],[data-turn="assistant"],[data-message-author-role="user"],[data-message-author-role="assistant"],[data-conversation-role],[data-chatgpt-agent-turn-start],[data-dil-message-id],[data-chatgpt-selection-message-id]';
function sourceRole(node) {
  const value = (node.getAttribute('data-message-author-role') || node.getAttribute('data-conversation-role') || node.getAttribute('data-turn') || '').trim().toLowerCase();
  if (node.hasAttribute('data-user-message-bubble') || node.getAttribute('data-testid') === 'user-message' || ['user','human','student'].includes(value)) return 'user';
  if (node.hasAttribute('data-chatgpt-agent-turn-start') || ['assistant','ai','model','tutor'].includes(value)) return 'assistant';
  return 'unknown';
}
const hash = value => { let result = 2166136261; for (let i = 0; i < value.length; i++) result = Math.imul(result ^ value.charCodeAt(i), 16777619); return (result >>> 0).toString(16); };
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const blocked = 'script,style,link,meta,iframe,object,embed,button,input,textarea,select,form,nav,aside,header,footer,noscript,[hidden],.sr-only,[data-testid*="reasoning"],[data-testid*="thinking"]';

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

export function buildSelectableDocument(capture) {
  const source = new DOMParser().parseFromString(capture.html, 'text/html');
  stripLeadingSpeakerLabels(source);
  const all = [...source.querySelectorAll(turnSelector)].filter(node => node.textContent.trim() || node.querySelector('img,svg,canvas'));
  const set = new Set(all);
  let roots = all.filter(node => {
    const role = sourceRole(node);
    if (role === 'unknown' && all.some(child => node !== child && node.contains(child) && sourceRole(child) !== 'unknown')) {
      const remainder = node.cloneNode(true);
      for (const child of remainder.querySelectorAll(turnSelector)) if (sourceRole(child) !== 'unknown') child.remove();
      remainder.querySelectorAll(blocked).forEach(child => child.remove());
      if (!remainder.textContent.trim() && !remainder.querySelector('img,svg,canvas')) return false;
    }
    for (let parent = node.parentElement; parent; parent = parent.parentElement) if (set.has(parent)) {
      const parentRole = sourceRole(parent);
      if (role === 'unknown' || parentRole === role) return false;
    }
    return true;
  });
  const rootSet = new Set(roots);
  function anchor(root) {
    const walker = source.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let text = walker.nextNode(); text; text = walker.nextNode()) {
      if (!text.textContent.trim() || text.parentElement.closest(blocked)) continue;
      let owner = text.parentElement; while (owner && !rootSet.has(owner)) owner = owner.parentElement;
      if (owner === root) return text;
    }
    return root;
  }
  roots.sort((a, b) => { const first = anchor(a); const second = anchor(b); return first === second ? 0 : first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });
  const warnings = []; const units = []; const messages = []; const seen = new Map();
  for (const [index, quiz] of (capture.report?.quizzes || []).entries()) {
    warnings.push(`Quiz ${index + 1}: ${quiz.captured} of ${quiz.total} questions captured.${quiz.complete ? '' : ' ' + quiz.limitation}${quiz.restored ? '' : ' The original question could not be restored; check the source quiz.'}`);
  }
  if (capture.report?.unreadable_frames) warnings.push('Embedded frame content could not be read. Screenshots show only the visible screen; questions hidden inside those frames are not included.');
  let imageCount = 0; let screenshotCount = 0; let linkedImages = 0; let unavailableVisuals = 0; let partialImages = 0;
  if (!roots.length) {
    roots = [...source.querySelectorAll('[data-portal-earlier-turns] > main,[data-portal-earlier-turns] > div')];
    roots.push(source.querySelector('#thread,main,[role="main"]') || source.body);
    roots = [...new Set(roots)];
    warnings.push('Message boundaries were not recognized. Available content is shown as sections; speaker roles are not inferred.');
  }
  const doc = document.implementation.createHTMLDocument('');
  const allowed = new Set('p div span h1 h2 h3 h4 h5 h6 ul ol li table thead tbody tfoot tr th td caption colgroup col blockquote pre code br hr strong em b i u s del sup sub a figure figcaption details summary'.split(' '));
  const mathTags = new Set('math semantics mrow mi mn mo ms mtext mspace mfrac msqrt mroot msub msup msubsup munder mover munderover mtable mtr mtd mfenced menclose mpadded mphantom mmultiscripts mprescripts none annotation'.split(' '));
  for (let index = 0; index < roots.length; index++) {
    const root = roots[index];
    const role = sourceRole(root);
    let originalId = '';
    for (const attr of ['data-message-id', 'data-dil-message-id', 'data-chatgpt-selection-message-id', 'data-turn-id', 'data-turn-key', 'data-testid']) {
      const value = root.getAttribute(attr);
      if (value && (attr !== 'data-testid' || value.startsWith('conversation-turn-'))) { originalId = value; break; }
    }
    const identity = role + ':' + (originalId || 'section-' + index);
    const signature = root.textContent + [...root.querySelectorAll('img')].map(image => image.getAttribute('src')).join('|');
    if (originalId && seen.get(identity)?.has(signature)) continue;
    const occurrence = seen.get(identity)?.size || 0;
    if (!seen.has(identity)) seen.set(identity, new Set()); seen.get(identity).add(signature);
    // Shared source IDs must not discard a user turn or a different response.
    const id = 'message-' + hash(identity + (occurrence ? ':' + hash(signature) : '')); let unitIndex = 0;
    function clean(node, protectedText = false) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text.trim() || protectedText) return doc.createTextNode(text);
        const span = doc.createElement('span'); const unitId = `${id}-text-${++unitIndex}`;
        span.dataset.unit = unitId; span.textContent = text;
        const group = node.parentElement?.closest('p,li,td,th,h1,h2,h3,h4,h5,h6,blockquote') || root;
        units.push({ id: unitId, message_id: id, source: text, context: group.textContent.trim().slice(0, 3000) }); return span;
      }
      if (node.nodeType !== Node.ELEMENT_NODE || (node !== root && rootSet.has(node)) || (node.matches(blocked) && !node.matches('[data-user-message-bubble],[data-testid="user-message"]')) || node.style?.display === 'none') return null;
      const tag = node.localName;
      if (node.matches('.katex') && node.querySelector('math')) return clean(node.querySelector('math'), true);
      if (tag === 'svg') {
        if (node.querySelector('foreignObject') || (node.querySelector('use') && !node.querySelector('defs'))) {
          unavailableVisuals++; const missing = doc.createElement('p'); missing.className = 'visual-unavailable'; missing.textContent = '[Diagram requires a screenshot fallback. Capture again with this diagram visible.]'; return missing;
        }
        const svg = node.cloneNode(true); svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.querySelectorAll('script,foreignObject,animate,animateTransform,set').forEach(child => child.remove());
        for (const child of [svg, ...svg.querySelectorAll('*')]) for (const attr of [...child.attributes]) if (/^on/i.test(attr.name)) child.removeAttribute(attr.name);
        const bytes = new TextEncoder().encode(new XMLSerializer().serializeToString(svg));
        let binary = ''; for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
        const image = doc.createElement('img'); image.src = 'data:image/svg+xml;base64,' + btoa(binary); image.alt = node.getAttribute('aria-label') || 'Diagram'; image.dataset.assetKind = 'svg'; imageCount++; return image;
      }
      if (tag === 'img') {
        const image = doc.createElement('img'); const src = node.getAttribute('src') || '';
        if (!/^data:image\//i.test(src) && !/^https:\/\//i.test(src)) {
          unavailableVisuals++; const missing = doc.createElement('p'); missing.className = 'visual-unavailable'; missing.textContent = '[Visual unavailable: ' + (node.getAttribute('alt') || 'image') + ']'; return missing;
        }
        image.src = src; image.alt = node.getAttribute('alt') || 'Conversation image'; image.referrerPolicy = 'no-referrer';
        image.dataset.assetKind = node.getAttribute('data-portal-visual-kind') || 'image';
        if (image.dataset.assetKind === 'screenshot') screenshotCount++;
        if (node.hasAttribute('data-portal-visual-partial')) { image.dataset.partial = 'true'; partialImages++; }
        if (src.startsWith('https:')) linkedImages++;
        imageCount++; return image;
      }
      if (tag === 'canvas') { unavailableVisuals++; const missing = doc.createElement('p'); missing.className = 'visual-unavailable'; missing.textContent = '[Canvas not captured. Reload the extension and capture again for a visual fallback.]'; return missing; }
      if (mathTags.has(tag)) {
        const result = doc.createElementNS('http://www.w3.org/1998/Math/MathML', tag);
        for (const attr of ['display', 'mathvariant', 'encoding', 'columnalign', 'rowalign', 'stretchy', 'fence', 'separator']) if (node.hasAttribute(attr)) result.setAttribute(attr, node.getAttribute(attr));
        for (const child of node.childNodes) { const cleaned = clean(child, true); if (cleaned) result.append(cleaned); }
        return result;
      }
      const result = doc.createElement(allowed.has(tag) ? tag : 'div');
      if (tag === 'details') result.setAttribute('open', '');
      if (tag === 'a') {
        const href = node.getAttribute('href') || '';
        if (/^(https?:|mailto:|#)/i.test(href)) { result.setAttribute('href', href); result.setAttribute('rel', 'noopener noreferrer'); result.setAttribute('target', '_blank'); }
      }
      for (const attr of ['colspan', 'rowspan', 'start', 'dir', 'lang']) if (node.hasAttribute(attr)) result.setAttribute(attr, node.getAttribute(attr));
      // Keep text emphasis/alignment; discard viewport coordinates and fixed
      // sizes, so translations participate in normal document flow.
      for (const property of ['font-weight', 'font-style', 'text-decoration', 'text-align']) {
        const value = node.style?.getPropertyValue(property); if (value) result.style.setProperty(property, value);
      }
      for (const child of node.childNodes) { const cleaned = clean(child, protectedText || tag === 'pre' || tag === 'code'); if (cleaned) result.append(cleaned); }
      if (result.childElementCount >= 2 && result.childElementCount <= 4 && ['div', 'section', 'figure'].includes(tag)) {
        const display = node.style?.display;
        if (display === 'grid' || (display === 'flex' && !/column/.test(node.style.flexDirection))) {
          const columns = display === 'grid' ? (node.style.gridTemplateColumns.match(/[\d.]+px/g)?.length || result.childElementCount) : result.childElementCount;
          result.className = 'layout-grid'; result.style.display = 'grid'; result.style.gridTemplateColumns = `repeat(${Math.min(4, Math.max(1, columns))},minmax(0,1fr))`; result.style.gap = '16px';
        }
      }
      return result;
    }
    const container = doc.createElement('div');
    for (const child of root.childNodes) { const cleaned = clean(child); if (cleaned) container.append(cleaned); }
    // Run again after interface controls and nested turns have been removed.
    // An outer source wrapper may otherwise survive as a label-only response.
    container.setAttribute('data-conversation-role', role);
    stripLeadingSpeakerLabels(container);
    container.removeAttribute('data-conversation-role');
    if (!container.textContent.trim() && !container.querySelector('img,math')) continue;
    messages.push({ id, source_id: originalId || null, role, html: container.innerHTML });
  }
  if (!messages.length) throw new Error('No readable conversation content was found for the selectable viewer.');
  if (linkedImages) warnings.push(`${linkedImages} image(s) remain linked and may require sign-in or expire.`);
  if (unavailableVisuals) warnings.push(`${unavailableVisuals} visual block(s) could not be preserved. Recapture with the source tab active.`);
  if (partialImages) warnings.push(`${partialImages} visual snapshot(s) contain only the visible part of a larger visual.`);
  warnings.push('Text inside images/screenshots is not translated. Paragraphs, tables, lists, code and available MathML remain HTML.');
  const documentId = (capture.source?.conversation_id || 'conversation') + '-' + hash(messages.map(message => message.id + message.html).join('\n'));
  return { format_version: 'selectable-conversation/1', document_id: documentId, title: capture.title, source: capture.source, captured_at: capture.captured_at, messages, units: units.filter(unit => messages.some(message => message.id === unit.message_id && message.html.includes('data-unit="' + unit.id + '"'))), media: { images: imageCount, screenshots: screenshotCount, linked: linkedImages, unavailable: unavailableVisuals, partial: partialImages }, warnings };
}

export function translationTemplate(model) {
  return { format_version: 'conversation-translation/1', document_id: model.document_id, language: '', units: model.units.map(unit => ({ id: unit.id, source: unit.source, text: '', context: unit.context })) };
}

export function validateTranslation(model, input) {
  if (!input || input.format_version !== 'conversation-translation/1' || input.document_id !== model.document_id || typeof input.language !== 'string' || !input.language.trim() || input.language.length > 80 || !Array.isArray(input.units) || input.units.length > model.units.length) throw new Error('Use a translation for this exact captured conversation and provide its language.');
  const known = new Map(model.units.map(unit => [unit.id, unit])); const seen = new Set();
  for (const unit of input.units) {
    if (!known.has(unit.id) || seen.has(unit.id) || unit.source !== known.get(unit.id).source || typeof unit.text !== 'string' || unit.text.length > 64000) throw new Error('A translation contains an unknown, duplicate, changed or invalid text block.');
    seen.add(unit.id);
  }
  return { ...input, language: input.language.trim() };
}

export function renderSelectableDocument(model, translation = null) {
  if (translation) validateTranslation(model, translation);
  const changes = new Map((translation?.units || []).filter(unit => unit.text.trim()).map(unit => [unit.id, unit.text]));
  const parser = new DOMParser();
  const messages = model.messages.map(message => {
    const doc = parser.parseFromString('<body>' + message.html, 'text/html');
    for (const span of doc.querySelectorAll('[data-unit]')) if (changes.has(span.dataset.unit)) span.textContent = changes.get(span.dataset.unit);
    return `<article class="turn ${message.role}" data-message-id="${escape(message.id)}"><h2 class="speaker">${message.role === 'user' ? 'You' : 'ChatGPT'}</h2><div class="content">${doc.body.innerHTML}</div></article>`;
  }).join('\n');
  const metadata = { format_version: model.format_version, document_id: model.document_id, source: model.source, captured_at: model.captured_at, units: model.units, translation };
  return `<!doctype html><html lang="${escape(translation?.language || 'und')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https:; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>${escape(model.title || 'Conversation')}</title><style>
*{box-sizing:border-box}html{color-scheme:light}body{margin:0;background:#fff;color:#202123;font:17px/1.7 system-ui,'Segoe UI',Arial,sans-serif;overflow-wrap:anywhere;user-select:text}main{max-width:960px;margin:0 auto;padding:32px 28px 80px}.document-title{font-size:22px;margin:0 0 30px}.turn{margin:0 0 38px;min-width:0}.turn.user{background:#f1f1f1;border-radius:20px;padding:18px 24px;margin-left:18%}.speaker{font:600 12px/1.5 system-ui;color:#616670;letter-spacing:.04em;margin:0 0 12px}.content h1{font-size:1.65em}.content h2{font-size:1.4em}.content h3{font-size:1.2em}.content p{margin:.7em 0}.content ul,.content ol{padding-left:1.6em}.content li{margin:.35em 0}.content table{border-collapse:collapse;max-width:100%;margin:18px 0}.content td,.content th{border:1px solid #d6d8dc;padding:10px 14px;vertical-align:top}.content th{background:#f6f7f8}.content pre{background:#f5f6f7;padding:18px;border-radius:10px;white-space:pre-wrap;overflow-wrap:anywhere}.content code{font:14px/1.6 Consolas,monospace}.content img{display:block;max-width:100%;height:auto;margin:18px 0;object-fit:contain}.content blockquote{border-left:3px solid #d1d5db;padding-left:18px;margin-left:0}.content math{font-size:1.15em}.visual-unavailable{padding:16px;background:#fff3df;border:1px solid #e0c899}a{color:#176b56}.translation-label{color:#616670;font-size:13px}@media(max-width:600px){main{padding:20px 16px}.turn.user{margin-left:8%;padding:16px}}
</style></head><body><main><h1 class="document-title">${escape(model.title || 'Conversation')}</h1>${translation ? `<p class="translation-label">${escape(translation.language)} · ${changes.size}/${model.units.length} translated text segments</p>` : ''}${messages}</main><script type="application/json" id="conversation-metadata">${JSON.stringify(metadata).replace(/</g, '\\u003c')}</script></body></html>`;
}
