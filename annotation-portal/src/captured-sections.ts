import { sanitizeCapturedHtml } from './capture-document';

const metadataHeading = /^Agent-explored interactive state state_\d+ \(capture action, not a learner response\):?$/u;
const ignored = '.capture-speaker,script,style,annotation,annotation-xml,.sr-only,[hidden]';

function isHeading(element: HTMLElement) {
  if (element.closest(`${ignored},pre,code,table,.katex,math`)) return false;
  const copy = element.cloneNode(true) as HTMLElement;
  copy.querySelectorAll(ignored).forEach(node => node.remove());
  if (!copy.textContent?.trim()) return false;
  if (/^h[1-6]$/.test(element.localName)) return true;
  if (!element.matches('p,div') || !copy.querySelector('strong,b')) return false;
  copy.querySelectorAll('strong,b').forEach(node => node.remove());
  return /^[\s:.,!?;()\[\]{}\-]*$/.test(copy.textContent || '');
}

/** Build section boundaries before annotation controls or highlights enter the DOM. */
export function capturedSections(article: HTMLElement, source: string) {
  const headings = [...article.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6,p,div')]
    .filter(isHeading)
    // Bold-only wrapper divs must not create duplicate boundaries.
    .filter(element => ![...element.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6,p,div')].some(isHeading));
  const parts: { range: Range; before: Element | null; excluded: boolean }[] = [];
  let start = article.ownerDocument.createRange();
  start.selectNodeContents(article);
  start.collapse(true);
  for (const heading of headings) {
    const range = start.cloneRange();
    range.setEndBefore(heading);
    parts.push({ range, before: heading, excluded: false });
    start.setStartBefore(heading);
    start.collapse(true);
    if (metadataHeading.test((heading.textContent || '').trim())) {
      const metadata = start.cloneRange();
      metadata.setEndAfter(heading);
      parts.push({ range: metadata, before: null, excluded: true });
      start.setStartAfter(heading);
      start.collapse(true);
    }
  }
  const end = start.cloneRange();
  end.setEnd(article, article.childNodes.length);
  parts.push({ range: end, before: null, excluded: false });

  const positions: number[] = [];
  let canonical = '';
  for (let index = 0; index < source.length; index++) {
    if (!/\s/.test(source[index])) { canonical += source[index]; positions.push(index); }
  }
  let cursor = 0;
  let mapped = true;
  const sections = parts.flatMap(({ range, before, excluded }) => {
    const copy = article.ownerDocument.createElement('div');
    copy.append(range.cloneContents());
    copy.querySelectorAll(ignored).forEach(node => node.remove());
    const text = sanitizeCapturedHtml(copy.innerHTML).text.replace(/\s/g, '');
    if (!text) return [];
    // Capture metadata may be present only in the layout, or in both sources.
    const matches = canonical.startsWith(text, cursor);
    if (excluded) {
      // Captured HTML and canonical transcripts can differ in the metadata's
      // trailing colon. Neither spelling is instructional response content.
      const marker = text.replace(/:$/u, '');
      if (canonical.startsWith(marker, cursor)) {
        cursor += marker.length;
        if (canonical[cursor] === ':') cursor++;
      }
      return [];
    }
    const start = cursor;
    if (!matches) mapped = false;
    cursor += text.length;
    // Anchor outlines to original content nodes, so inserting buttons cannot
    // move a section boundary or include the preceding section's button.
    const walker = article.ownerDocument.createTreeWalker(article, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    const content: Node[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const element = node.nodeType === Node.ELEMENT_NODE ? node as Element : node.parentElement;
      if (!element || element.closest(ignored) || element.parentElement?.closest('svg,math')) continue;
      if ((node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) || element.matches('img,svg,math')) {
        if (range.intersectsNode(node)) content.push(node);
      }
    }
    const bounds = range.cloneRange();
    if (content.length) {
      const first = content[0], last = content.at(-1)!;
      if (first.nodeType === Node.TEXT_NODE) bounds.setStart(first, 0);
      else bounds.setStartBefore(first);
      if (last.nodeType === Node.TEXT_NODE) bounds.setEnd(last, last.textContent!.length);
      else bounds.setEndAfter(last);
    }
    return [{ before, bounds, offsets: { start: positions[start], end: (positions[cursor - 1] ?? -1) + 1 } }];
  });
  // Interactive capture states can be appended to the canonical turn while
  // the exact document shows only its original response. Their explicit
  // metadata marks that boundary; the already matched visible prefix still
  // has exact offsets. Ordinary missing or different response text must fail.
  const remaining = source.slice(positions[cursor] ?? source.length).trimStart();
  const unseenCaptureStates = metadataHeading.test(remaining.split(/\r?\n/u)[0].trim());
  mapped &&= cursor === canonical.length || unseenCaptureStates;
  // Never guess which repeated occurrence an unmatched layout refers to.
  return sections.map(section => ({ ...section, offsets: mapped ? section.offsets : null }));
}

/** A snapshot can show a later interactive state than its canonical turn asset. */
export function mapCapturedArticle(article:HTMLElement, source:string, canonicalHtml?:string, translatedHeadings?:{start:number;end:number}[]) {
  let sections=capturedSections(article,source);
  if(sections.length&&sections.every(section=>section.offsets))return sections;
  if(!canonicalHtml&&!translatedHeadings)return sections;
  const candidate=article.ownerDocument.createElement('article');
  candidate.innerHTML='<strong class="capture-speaker">Bot</strong>'+(canonicalHtml||'');
  const fallback=capturedSections(candidate,source);
  if(!fallback.length||fallback.some(section=>!section.offsets)) {
    if(!translatedHeadings)return sections;
    // An interactive source snapshot may not match the translated alignment.
    // Render the authoritative translated text using its supplied heading
    // boundaries instead of assigning offsets to different visible wording.
    const headings=[...translatedHeadings];
    for(const marker of source.matchAll(/^Agent-explored interactive state state_\d+ \(capture action, not a learner response\):?[\t ]*\r?$/gm))headings.push({start:marker.index!,end:marker.index!+marker[0].length});
    headings.sort((a,b)=>a.start-b.start||a.end-b.end);
    const fragment=article.ownerDocument.createDocumentFragment();let cursor=0;
    const paragraph=(value:string)=>{if(!value.trim())return;const p=article.ownerDocument.createElement('p');p.style.whiteSpace='pre-wrap';p.textContent=value;fragment.append(p);};
    for(const heading of headings){
      if(heading.start<cursor)continue;
      paragraph(source.slice(cursor,heading.start));
      const h=article.ownerDocument.createElement('h2');h.textContent=source.slice(heading.start,heading.end);fragment.append(h);cursor=heading.end;
    }
    paragraph(source.slice(cursor));
    candidate.replaceChildren(fragment);
    const translated=capturedSections(candidate,source);
    if(!translated.length||translated.some(section=>!section.offsets))return sections;
  }
  article.replaceChildren(...candidate.childNodes);
  sections=capturedSections(article,source);
  return sections;
}
