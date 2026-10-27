export type CaptureSpeaker = 'tutor' | 'student' | 'unknown';
export interface CaptureBlock { id: string; source_id: string | null; speaker: CaptureSpeaker; kind: 'turn' | 'state'; html: string; text: string; included: boolean; attach_to: string; }
export interface PreparedCaptureTurn { turn_id: string; speaker: 'tutor' | 'student'; text: string; html: string; source_ids: string[]; }
const tags = new Set('p div section article span h1 h2 h3 h4 h5 h6 ul ol li table thead tbody tfoot tr th td caption colgroup col blockquote pre code br hr strong em b i u s del sup sub a figure figcaption details summary img math semantics mrow mi mn mo ms mtext mspace mfrac msqrt mroot msub msup msubsup munder mover munderover mtable mtr mtd mfenced menclose mpadded mphantom'.split(' '));
const drop = 'script,style,link,meta,iframe,object,embed,base,input,textarea,select,nav,aside,header,footer,noscript,[hidden],.sr-only,annotation,annotation-xml,[data-testid*="reasoning"],[data-testid*="thinking"]';
const blocks = new Set('p div section article h1 h2 h3 h4 h5 h6 ul ol li table tr blockquote pre figure figcaption details'.split(' '));
const styleKeys = new Set('color background-color font-family font-size font-weight font-style line-height text-align text-decoration border border-radius padding padding-top padding-bottom padding-left padding-right margin-top margin-bottom gap column-gap row-gap flex-direction flex-wrap align-items justify-content grid-template-columns'.split(' '));
export function safeCapturedUrl(value: string, image = false) {
  if (image && /^data:image\/(?:png|jpe?g|gif|webp|avif|bmp|svg\+xml)(?:;[^,]*)?,/i.test(value)) return value;
  try { const url = new URL(value); if ((image ? ['https:'] : ['https:', 'http:', 'mailto:']).includes(url.protocol)) return value; } catch { /* Reject relative, executable and unknown URLs. */ }
}
export function sanitizeCapturedHtml(html: string, options: { preserveLayout?: boolean;imageUrls?:ReadonlySet<string> } = {}): { html: string; text: string; root: HTMLElement } {
  const preserveLayout = options.preserveLayout === true;
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const root = parsed.createElement('div');
  function clean(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.textContent?.trim() && /[\r\n]/.test(node.textContent || '')) return null;
      return parsed.createTextNode(node.textContent || '');
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const source = node as HTMLElement;
    if (source.matches(drop) || source.style?.display === 'none' || source.style?.visibility === 'hidden') return null;
    const tag = source.localName;
    const output = parsed.createElement(preserveLayout || tags.has(tag) || tag === 'svg' ? tag : 'div');
    if (tag === 'svg') {
      const svg = source.cloneNode(true) as Element; svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.querySelectorAll('script,foreignObject,animate,animateTransform,set').forEach(node => node.remove());
      for (const node of [svg, ...svg.querySelectorAll('*')]) for (const attr of [...node.attributes]) if (/^on/i.test(attr.name) || (!preserveLayout && ['href', 'xlink:href'].includes(attr.name) && !attr.value.startsWith('#'))) node.removeAttribute(attr.name);
      if (preserveLayout) {
        // SVG presentation attributes and fragment references are significant:
        // rebuilding through the HTML attribute list loses strokes, transforms,
        // clipping paths and shared-symbol icons.
        for(const node of [svg,...svg.querySelectorAll('*')])for(const attr of [...node.attributes]){
          if(/^on/i.test(attr.name))node.removeAttribute(attr.name);
          if(['href','xlink:href'].includes(attr.name)){
            const local=attr.value.startsWith('#');
            const sprite=node.localName==='use'&&/^\/cdn\/assets\/[A-Za-z0-9_.-]+\.svg#[A-Za-z0-9_.:-]+$/.test(attr.value);
            if(!local&&!sprite)node.removeAttribute(attr.name);
          }
          if(attr.name==='style'&&/expression\s*\(|url\s*\(\s*['"]?(?!#)/i.test(attr.value))node.removeAttribute(attr.name);
        }
        return svg;
      }
      const image = parsed.createElement('img'); image.src = 'data:image/svg+xml,' + encodeURIComponent(new XMLSerializer().serializeToString(svg)); image.alt = source.getAttribute('aria-label') || 'Captured diagram'; return clean(image);
    }
    if (tag === 'img') {
      const raw=source.getAttribute('src')||'';
      const src = options.imageUrls?.has(raw)?raw:safeCapturedUrl(raw, true);
      if (!src) { const missing = parsed.createElement('span'); missing.textContent = '[Image unavailable: ' + (source.getAttribute('alt') || 'image') + ']'; return missing; }
      output.setAttribute('src', src); output.setAttribute('alt', source.getAttribute('alt') || 'Captured image'); output.setAttribute('referrerpolicy', 'no-referrer');
      if (!preserveLayout && !source.closest('figure')?.querySelector('figcaption') && !source.closest('[data-capture-image]')?.querySelector('[data-capture-caption]')) {
        const inline = Boolean(source.closest('p,span,a,h1,h2,h3,h4,h5,h6,code'));
        const figure = parsed.createElement(inline ? 'span' : 'figure'); const caption = parsed.createElement(inline ? 'span' : 'figcaption');
        figure.setAttribute('data-capture-image', ''); caption.setAttribute('data-capture-caption', '');
        caption.textContent = source.getAttribute('alt') || 'Captured image'; figure.append(output, caption); return figure;
      }
      if(!preserveLayout)return output;
    }
    if (tag === 'a') { const href = safeCapturedUrl(source.getAttribute('href') || ''); if (href) { output.setAttribute('href', href); output.setAttribute('target', '_blank'); output.setAttribute('rel', 'noopener noreferrer'); } }
    if (tag === 'details') output.setAttribute('open', '');
    if (preserveLayout) {
      if (source.hasAttribute('class')) output.setAttribute('class', source.getAttribute('class')!);
      for (const attr of source.attributes) {
        if (attr.name === 'class' || attr.name === 'style' || /^on/i.test(attr.name)) continue;
        if (['src', 'href', 'xlink:href'].includes(attr.name) && !safeCapturedUrl(attr.value, attr.name === 'src')) continue;
        if (/^(?:data-|aria-)/i.test(attr.name) || ['id', 'role', 'alt', 'title', 'width', 'height', 'viewbox', 'fill', 'stroke', 'd', 'points', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'xmlns', 'preserveAspectRatio'].includes(attr.name)) output.setAttribute(attr.name, attr.value);
      }
    }
    for (const attr of ['data-capture-image', 'data-capture-caption']) if (source.hasAttribute(attr)) output.setAttribute(attr, '');
    for (const attr of ['colspan', 'rowspan', 'start', 'dir', 'lang', 'display', 'mathvariant', 'columnalign', 'rowalign', 'stretchy', 'fence', 'separator']) if (source.hasAttribute(attr)) output.setAttribute(attr, source.getAttribute(attr)!);
    if(preserveLayout&&!/url\s*\(|expression\s*\(/i.test(source.style.cssText)){
      // CSSOM exposes empty longhands for variable-based shorthands. Copying
      // them property by property silently drops borders, padding and gaps.
      output.style.cssText=source.style.cssText;
    }else for (const property of source.style || []) {
      const value = source.style.getPropertyValue(property);
      if ((preserveLayout || styleKeys.has(property)) && !/url\s*\(|expression\s*\(/i.test(value) && (preserveLayout||!/var\s*\(/i.test(value))) output.style.setProperty(property, value);
    }
    const rgb = source.style.color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!preserveLayout && rgb && rgb.slice(1).every(value => Number(value) > 220) && (!source.style.backgroundColor || /transparent|rgba\([^)]*,\s*0\)/.test(source.style.backgroundColor))) output.style.color = 'inherit';
    if (!preserveLayout && ['grid', 'flex'].includes(source.style?.display)) {
      output.style.display = source.style.display;
      if (output.style.display === 'grid') {
        const columns = Number(source.style.gridTemplateColumns.match(/^repeat\(\s*(\d+)/)?.[1]) || source.style.gridTemplateColumns.match(/(?:^|\s)\d+(?:\.\d+)?px/g)?.length || Math.min(2, source.children.length);
        output.style.gridTemplateColumns = `repeat(${Math.min(4, Math.max(1, columns))},minmax(0,1fr))`;
      }
    }
    for (const child of source.childNodes) { const cleaned = clean(child); if (cleaned) output.append(cleaned); }
    return output;
  }
  function append(parent: Node, child: Node) {
    parent.appendChild(child);
    if (child.nodeType === Node.ELEMENT_NODE && blocks.has((child as Element).localName)) parent.appendChild(parsed.createTextNode('\n'));
  }
  // Normalize block separators as actual text nodes, so DOM selection offsets
  // and canonical evidence strings agree, including after another sanitization.
  for (const child of parsed.body.childNodes) { const cleaned = clean(child); if (cleaned) append(root, cleaned); }
  function separators(parent: Element) {
    for (const child of [...parent.children]) { separators(child); if (blocks.has(child.localName) && child.nextSibling?.nodeType !== Node.TEXT_NODE) child.after(parsed.createTextNode('\n')); }
  }
  separators(root);
  return { html: root.innerHTML, text: root.textContent || '', root };
}

export function extractCaptureBlocks(html: string): CaptureBlock[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const selector = '.turn[data-message-id],[data-testid^="conversation-turn-"],[data-testid="user-message"],[data-message-author-role],[data-conversation-role],[data-turn],[data-chatgpt-agent-turn-start],[data-user-message-bubble],[data-dil-message-id],[data-chatgpt-selection-message-id]';
  const labelText = (text: string) => text.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '').replace(/(?:^|\n)\s*#{1,6}\s*/g, '').trim();
  const labelRole = (text: string): CaptureSpeaker => {
    const label = labelText(text);
    if (/^(?:you(?:\s+said)?|student|user)\s*:?$/i.test(label)) return 'student';
    if (/^(?:ChatGPT(?:\s+said)?|assistant|tutor)\s*:?$/i.test(label)) return 'tutor';
    return 'unknown';
  };
  const speakerLabel = (node: Element) => [...node.querySelectorAll('.speaker,h1,h2,h3,h4,h5,h6')].find(label => {
    // Labels belong to their own turn, never to a nested student's bubble.
    if (label.closest(selector) !== node || label.closest('pre,code,blockquote,.content')) return false;
    const before = doc.createRange(); before.setStart(node, 0); before.setEndBefore(label);
    const preceding = before.cloneContents(); preceding.querySelectorAll(selector + ',' + drop + ',button,form').forEach(child => child.remove());
    return !preceding.textContent?.trim() && labelRole(label.textContent || '') !== 'unknown';
  });
  const role = (node: Element): CaptureSpeaker => {
    const value = (node.getAttribute('data-message-author-role') || node.getAttribute('data-conversation-role') || node.getAttribute('data-turn') || '').trim().toLowerCase();
    if (node.hasAttribute('data-user-message-bubble') || node.getAttribute('data-testid') === 'user-message' || ['user', 'student', 'human'].includes(value)) return 'student';
    if (['assistant', 'tutor', 'model', 'ai'].includes(value)) return 'tutor';
    if (node.classList.contains('user')) return 'student';
    if (node.classList.contains('assistant') || node.hasAttribute('data-chatgpt-agent-turn-start')) return 'tutor';
    const label = speakerLabel(node);
    return label ? labelRole(label.textContent || '') : 'unknown';
  };
  const all = [...doc.querySelectorAll(selector)]; const set = new Set(all);
  let roots = all.filter(node => {
    for (let parent = node.parentElement; parent; parent = parent.parentElement) if (set.has(parent) && (role(node) === 'unknown' || role(parent) === role(node))) return false;
    return true;
  });
  if (!roots.length) roots = [doc.querySelector('main,[role="main"]') || doc.body];
  const rootSet = new Set(roots);
  const anchor = (node: Element) => {
    const walker = doc.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    for (let text = walker.nextNode(); text; text = walker.nextNode()) {
      if (!text.textContent?.trim() || text.parentElement?.closest(drop)) continue;
      let owner = text.parentElement; while (owner && !rootSet.has(owner)) owner = owner.parentElement;
      if (owner === node) return text;
    }
    return node;
  };
  roots = roots.sort((a, b) => anchor(a).compareDocumentPosition(anchor(b)) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  return roots.flatMap((node, index) => {
    const clone = node.cloneNode(true) as Element;
    const originals = [...node.querySelectorAll(selector)];
    const copies = [...clone.querySelectorAll(selector)];
    originals.forEach((original, nestedIndex) => { if (rootSet.has(original)) copies[nestedIndex].remove(); });
    if (role(node) !== 'unknown') {
      const label = speakerLabel(clone); if (label) label.remove();
    }
    clone.querySelectorAll(':scope > .speaker').forEach(label => label.remove());
    const content = clone.querySelector(':scope > .content') || clone;
    const normalized = sanitizeCapturedHtml(content.innerHTML);
    if (!normalized.text.trim() && !normalized.root.querySelector('img,math')) return [];
    const state = node.hasAttribute('data-portal-assisted-state') || /^Interactive state \d+:/i.test(content.querySelector('h3')?.textContent || '');
    return [{ id: 'block-' + index, source_id: node.getAttribute('data-message-id') || node.getAttribute('data-dil-message-id') || node.getAttribute('data-chatgpt-selection-message-id') || node.getAttribute('data-turn-id'), speaker: role(node), kind: state ? 'state' : 'turn', html: normalized.html, text: normalized.text, included: true, attach_to: '' } satisfies CaptureBlock];
  });
}

export function prepareCaptureTurns(draft: CaptureBlock[], options: { labelStates?: boolean } = {}): PreparedCaptureTurn[] {
  const included = draft.filter(block => block.included);
  const turns = included.filter(block => block.kind === 'turn');
  if (!turns.length || !turns.some(block => block.speaker === 'tutor')) throw new Error('Include at least one tutor response.');
  if (turns.some(block => block.speaker === 'unknown')) throw new Error('Choose Student or Tutor for every included conversation turn.');
  for (const state of included.filter(block => block.kind === 'state')) if (!turns.some(turn => turn.id === state.attach_to && turn.speaker === 'tutor')) throw new Error('Attach every included interactive view to its tutor response.');
  return turns.map((turn, index) => {
    const attached = included.filter(block => block.kind === 'state' && block.attach_to === turn.id);
    const html = turn.html + attached.map(state => `<section>${options.labelStates === false ? '' : '<h3>Additional captured view</h3>'}${state.html}</section>`).join('');
    const canonical = sanitizeCapturedHtml(html);
    if (!canonical.text.trim()) throw new Error('Every included turn needs readable text or an image caption.');
    return { turn_id: 'turn_' + String(index + 1).padStart(4, '0'), speaker: turn.speaker as 'student' | 'tutor', text: canonical.text, html: canonical.html, source_ids: [turn.source_id, ...attached.map(state => state.source_id)].filter((id): id is string => Boolean(id)) };
  });
}

export function splitCaptureBlock(block: CaptureBlock): CaptureBlock[] {
  const { root } = sanitizeCapturedHtml(block.html);
  let container: Element = root;
  while (container.children.length === 1 && ['div', 'section', 'article'].includes(container.firstElementChild!.localName)) container = container.firstElementChild!;
  const parts = [...container.childNodes].filter(node => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim()).map(node => {
    const wrapper = root.ownerDocument.createElement('div'); wrapper.append(node.cloneNode(true)); return sanitizeCapturedHtml(wrapper.innerHTML);
  }).filter(part => part.text.trim());
  if (parts.length < 2) throw new Error('This block has no separate sections to split.');
  return parts.map((part, index) => ({ ...block, id: index ? block.id + '-part-' + index : block.id, html: part.html, text: part.text }));
}
