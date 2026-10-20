import { conceptLevel, conceptDisplayFeature } from './coverage-hierarchy';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { C } from './lib';
import type { Annotation, Conversation, Evidence, Feature, RubricSnapshot, TurnRatings } from './types';
import { TurnRatingsPanel } from './TurnRatingsPanel';
import { ratingComplete } from './turn-ratings';
import { useCaptureAssets } from './CapturedTranscript';

function RichText({ text }: { text: string }) {
  return <>{text.split(/(<br><br>|<br>|\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => part === '<br><br>' ? <span key={i}><br /><br /></span> : part === '<br>' ? <br key={i} /> : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part)}</>;
}
interface Props { conversation: Conversation; rubric: RubricSnapshot; annotations: Annotation[]; onChange: (annotations: Annotation[]) => void; turnRatings?: TurnRatings; onRatingsChange?: (ratings: TurnRatings) => void; readonly?: boolean; completionAction?: ReactNode; }
function optionExplanation(feature: Feature, key: string, value: string) {
  const text = feature.guidance.split(`**${value}:**`)[1];
  if (!text) return null;
  if (key === 'detail_level') return text.split(/\*\*(?:Brief|Explained|Elaborated):\*\*|<br><br>/)[0].trim().split(', for example,')[0].split(' These are')[0];
  if (key === 'question_type') return text.trim().split('. ')[0] + '.';
  return null;
}
function normalizedWithMap(value: string) {
  const chars: string[] = [], map: [number, number][] = [];
  let pendingSpace: [number, number] | undefined;
  for (let index = 0; index < value.length; index++) {
    if (/\s/.test(value[index])) { pendingSpace ??= [index, index + 1]; continue; }
    if (pendingSpace && chars.length) { chars.push(' '); map.push(pendingSpace); }
    pendingSpace = undefined;
    chars.push(value[index]); map.push([index, index + 1]);
  }
  return { value: chars.join(''), map };
}
function exactSelectionOffsets(source: string, selected: string) {
  const normalizedSource = normalizedWithMap(source), normalizedSelected = normalizedWithMap(selected);
  const start = normalizedSource.value.indexOf(normalizedSelected.value);
  if (start < 0 || !normalizedSelected.value) throw new Error('Select transcript text to annotate.');
  const end = start + normalizedSelected.value.length - 1;
  return { start: normalizedSource.map[start][0], end: normalizedSource.map[end][1] };
}
function ExactCapture({ html, conversation, annotations, rubric, readonly, onSelect, onImageSelect, onHighlight, onHighlightLeave }: { html: string; conversation: Conversation; annotations: Annotation[]; rubric: Feature[]; readonly: boolean; onSelect: (turnId: string, selected: string, rect: DOMRect) => void; onImageSelect: (turnId: string, imageIndex: number, rect: DOMRect) => void; onHighlight: (ids: string[], rect: DOMRect) => void; onHighlightLeave: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const callbacks = useRef({ onSelect, onImageSelect, onHighlight, onHighlightLeave });
  callbacks.current = { onSelect, onImageSelect, onHighlight, onHighlightLeave };
  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return;
    let removeDocumentListeners = () => {};
    const handleLoad = () => {
      const document = iframe.contentDocument;
      if (!document) return;
      removeDocumentListeners();
      const articles = [...document.querySelectorAll<HTMLElement>('article')].filter(article => article.classList.contains('capture-message') || Boolean(article.dataset.turnId));
      const style = document.createElement('style');
      style.dataset.annotationStyle = 'true';
      style.textContent = '[data-d-hover-zoom],[data-d-hover-zoom] *{transform:none!important;animation:none!important;transition:none!important}.exact-annotation{cursor:pointer;border-radius:2px;padding:1px 0;box-decoration-break:clone;-webkit-box-decoration-break:clone}.exact-annotation-image{cursor:pointer}.exact-image-annotation-label{display:inline-block;position:relative;z-index:100;margin:6px 0 12px;padding:1px 0;border-radius:2px;color:inherit;font:inherit;line-height:inherit;cursor:pointer;pointer-events:auto;box-decoration-break:clone;-webkit-box-decoration-break:clone}';
      document.head.appendChild(style);
      const clearHighlights = () => {
        document.querySelectorAll<HTMLElement>('mark.exact-annotation').forEach(mark => mark.replaceWith(...mark.childNodes));
        document.querySelectorAll<HTMLElement>('[data-exact-annotation-image]').forEach(image => {
          image.classList.remove('exact-annotation', 'exact-annotation-image');
          delete image.dataset.annotationIds;
          delete image.dataset.exactAnnotationImage;
          image.style.outline = '';
          image.style.outlineOffset = '';
          image.style.boxShadow = '';
          image.style.removeProperty('--annotation-color');
        });
        document.querySelectorAll<HTMLElement>('[data-exact-annotation-label]').forEach(label => label.remove());
      };
      const textNodes = (article: HTMLElement) => {
        const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
        const nodes: Text[] = []; let node: Node | null;
        while ((node = walker.nextNode())) nodes.push(node as Text);
        return nodes;
      };
      const markEvidence = (article: HTMLElement, evidence: Evidence, annotation: Annotation) => {
        const source = conversation.messages.find(turn => turn.turn_id === evidence.turn_id)?.text;
        if (!source) return;
        const imageMatches = [...evidence.quote.matchAll(/Captured (?:diagram|image)/gi)];
        if (imageMatches.length) {
          const imageIndexBefore = [...source.slice(0, evidence.start).matchAll(/Captured (?:diagram|image)/gi)].length;
          const images = [...article.querySelectorAll<HTMLImageElement>('img')];
          imageMatches.forEach((_, index) => {
            const image = images[imageIndexBefore + index];
            if (!image) return;
            const ids = new Set((image.dataset.annotationIds || '').split(',').filter(Boolean));
            ids.add(annotation.id);
            image.dataset.annotationIds = [...ids].join(',');
            image.dataset.exactAnnotationImage = 'true';
            const feature = rubric.find(item => item.key === annotation.feature);
            if (feature) {
              image.style.setProperty('--annotation-color', feature.color);
              image.title = feature.name;
            }
          });
          return;
        }
        const exact = normalizedWithMap(article.textContent || ''), quote = normalizedWithMap(evidence.quote).value;
        const starts: number[] = []; let cursor = exact.value.indexOf(quote);
        while (cursor >= 0) { starts.push(cursor); cursor = exact.value.indexOf(quote, cursor + 1); }
        const start = starts[Math.max(0, evidence.occurrence - 1)];
        if (start === undefined) return;
        const rawStart = exact.map[start][0], rawEnd = exact.map[start + quote.length - 1][1];
        let offset = 0;
        for (const node of textNodes(article)) {
          const nodeStart = offset, nodeEnd = offset + (node.nodeValue || '').length; offset = nodeEnd;
          const localStart = Math.max(rawStart, nodeStart) - nodeStart, localEnd = Math.min(rawEnd, nodeEnd) - nodeStart;
          if (localEnd <= localStart) continue;
          const mark = document.createElement('mark');
          mark.className = 'exact-annotation'; mark.dataset.annotationIds = annotation.id;
          const feature = rubric.find(item => item.key === annotation.feature);
          if (feature) { mark.style.backgroundColor = feature.highlight; mark.style.borderBottom = `2px solid ${feature.color}`; mark.title = feature.name; }
          const range = document.createRange(); range.setStart(node, localStart); range.setEnd(node, localEnd);
          mark.appendChild(range.extractContents()); range.insertNode(mark);
        }
      };
      const renderHighlights = () => {
        clearHighlights();
        articles.forEach((article, index) => {
          const turn = conversation.messages.find(item => item.turn_id === article.dataset.turnId) || conversation.messages[index];
          if (!turn || turn.speaker !== 'tutor') return;
          article.dataset.turnId = turn.turn_id;
          article.dataset.speaker = turn.speaker;
          article.setAttribute('aria-label', `Tutor turn ${turn.turn_id}`);
          const speaker = article.querySelector<HTMLElement>('.capture-speaker');
          if (speaker) speaker.textContent = 'Bot';
          annotations.forEach(annotation => annotation.evidence.filter(evidence => evidence.turn_id === turn.turn_id).forEach(evidence => markEvidence(article, evidence, annotation)));
          article.querySelectorAll<HTMLImageElement>('img').forEach(image => {
            const ids = (image.dataset.annotationIds || '').split(',').filter(Boolean);
            const imageContainer = image.closest<HTMLElement>('[data-d-component="image"]') || image.parentElement;
            if (!imageContainer || imageContainer.nextElementSibling?.matches('[data-exact-annotation-label]')) return;
            const label = document.createElement('span');
            label.className = 'exact-image-annotation-label';
            label.dataset.annotationIds = ids.join(',');
            label.dataset.exactAnnotationLabel = 'true';
            label.dataset.exactImageIndex = String([...article.querySelectorAll<HTMLImageElement>('img')].indexOf(image));
            label.dataset.exactImageTurnId = turn.turn_id;
            const visualId = `${turn.turn_id}-image-${Number(label.dataset.exactImageIndex) + 1}`;
            label.dataset.visualId = visualId;
            label.textContent = visualId;
            label.title = ids.map(id => rubric.find(item => item.key === annotations.find(annotation => annotation.id === id)?.feature)?.name).filter(Boolean).join(' · ') || 'Unannotated image';
            const feature = rubric.find(item => item.key === annotations.find(annotation => annotation.id === ids[0])?.feature);
            if (feature) { label.style.setProperty('--annotation-color', feature.color); label.style.backgroundColor = feature.highlight; label.style.borderBottom = `2px solid ${feature.color}`; }
            else { label.style.setProperty('--annotation-color', '#87928b'); label.style.borderBottom = '2px solid #87928b'; }
            imageContainer.insertAdjacentElement('afterend', label);
          });
        });
      };
      renderHighlights();
      const select = () => {
        const selection = iframe.contentWindow?.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const article = (range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE ? range.commonAncestorContainer as Element : range.commonAncestorContainer.parentElement)?.closest<HTMLElement>('article.capture-message');
        const endArticle = (range.endContainer.nodeType === Node.ELEMENT_NODE ? range.endContainer as Element : range.endContainer.parentElement)?.closest<HTMLElement>('article.capture-message');
        if (!article || article !== endArticle || !article.classList.contains('capture-assistant')) return;
        const turn = conversation.messages.find(item => item.turn_id === article.dataset.turnId) || conversation.messages[articles.indexOf(article)];
        if (!turn || turn.speaker !== 'tutor') return;
        const clickedMark = selection.anchorNode?.parentElement?.closest<HTMLElement>('.exact-annotation');
        if (clickedMark && selection.isCollapsed) {
          const ids = (clickedMark.dataset.annotationIds || '').split(',').filter(Boolean);
          if (ids.length) { const rect = clickedMark.getBoundingClientRect(), frameRect = iframe.getBoundingClientRect(); callbacks.current.onHighlight(ids, new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height)); }
          return;
        }
        if (readonly || selection.isCollapsed) return;
        const rect = range.getBoundingClientRect(), frameRect = iframe.getBoundingClientRect();
        callbacks.current.onSelect(turn.turn_id, selection.toString(), new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height));
      };
      const click = (event: MouseEvent) => {
        const target = (event.target as HTMLElement | null)?.closest?.('.exact-annotation, .exact-image-annotation-label') as HTMLElement | null;
        if (!target || (!target.dataset.exactAnnotationImage && !target.dataset.exactAnnotationLabel)) return;
        const ids = (target.dataset.annotationIds || '').split(',').filter(Boolean);
        const rect = target.getBoundingClientRect(), frameRect = iframe.getBoundingClientRect();
        if (!ids.length) {
          const imageIndex = Number(target.dataset.exactImageIndex);
          if (!readonly && target.dataset.exactImageTurnId && Number.isInteger(imageIndex)) callbacks.current.onImageSelect(target.dataset.exactImageTurnId, imageIndex, new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height));
          return;
        }
        callbacks.current.onHighlight(ids, new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height));
      };
      const hover = (event: MouseEvent) => {
        const target = (event.target as HTMLElement | null)?.closest?.('.exact-annotation, .exact-image-annotation-label') as HTMLElement | null;
        if (!target) return;
        const ids = (target.dataset.annotationIds || '').split(',').filter(Boolean);
        if (!ids.length) return;
        const rect = target.getBoundingClientRect(), frameRect = iframe.getBoundingClientRect();
        callbacks.current.onHighlight(ids, new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height));
      };
      const leave = (event: MouseEvent) => {
        const related = (event.relatedTarget as HTMLElement | null)?.closest?.('.exact-annotation, .exact-image-annotation-label');
        if (related) return;
        callbacks.current.onHighlightLeave();
      };
      document.addEventListener('mouseup', select);
      document.addEventListener('keyup', select);
      document.addEventListener('click', click);
      removeDocumentListeners = () => { document.removeEventListener('mouseup', select); document.removeEventListener('keyup', select); document.removeEventListener('click', click); style.remove(); };
    };
    iframe.addEventListener('load', handleLoad);
    if (iframe.contentDocument?.readyState === 'complete') handleLoad();
    return () => { iframe.removeEventListener('load', handleLoad); removeDocumentListeners(); };
  }, [annotations, conversation, html, readonly, rubric]);
  return <iframe ref={frame} title="Exact original ChatGPT capture" sandbox="allow-same-origin" srcDoc={html} />;
}
export function Editor({ conversation, rubric: snapshot, annotations, onChange, turnRatings = {}, onRatingsChange = () => {}, readonly = false, completionAction }: Props) {
  const captured = useCaptureAssets(conversation);
  const exactHtml = captured.exactHtml;
  const rubric = useMemo(() => snapshot.rubric.map(conceptDisplayFeature), [snapshot.rubric]);
  const [ratedTurn, setRatedTurn] = useState(conversation.messages.find(turn => turn.speaker === 'tutor')?.turn_id || '');
  const ratingsEnabled = Boolean(snapshot.rating_dimensions?.length && ratedTurn);
  const ratingsPanel = useRef<HTMLDivElement>(null);
  function chooseRatedTurn(id: string) { setRatedTurn(id); if (window.innerWidth < 1100) ratingsPanel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  const [popup, setPopup] = useState<{ x: number; y: number; evidence?: Evidence; ids?: string[]; id?: string; extend?: boolean; editing?: boolean } | null>(null);
  const [listDraft, setListDraft] = useState<{ id: string; key: string; value: string } | null>(null);
  const [guide, setGuide] = useState(false); const [guideKey, setGuideKey] = useState(rubric[0].key);
  const [error, setError] = useState(''); const [undo, setUndo] = useState<Annotation | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverClose = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const guideToggle = useRef<HTMLButtonElement>(null);
  const feature = (key: string) => rubric.find(f => f.key === key)!;
  const active = annotations.find(a => a.id === popup?.id);
  const keepPopupOpen = () => clearTimeout(hoverClose.current);
  const close = () => { keepPopupOpen(); setPopup(null); };
  function leaveHighlight() { keepPopupOpen(); hoverClose.current = setTimeout(() => setPopup(null), 250); }
  useEffect(() => () => clearTimeout(hoverClose.current), []);
  function closeGuide() { setGuide(false); guideToggle.current?.focus({ preventScroll: true }); }
  useEffect(() => {
    const media = window.matchMedia('(min-width:1100px)');
    const narrow = () => { if (!media.matches) setGuide(false); };
    media.addEventListener('change', narrow);
    return () => media.removeEventListener('change', narrow);
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && guide && !popup) closeGuide(); };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [guide, popup]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (menuRef.current && !menuRef.current.contains(event.target as Node) && !(event.target as Element).closest?.('mark')) close(); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, []);
  useLayoutEffect(() => {
    if (!popup || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    menuRef.current.style.left = `${Math.max(8, Math.min(popup.x, window.innerWidth - rect.width - 8))}px`;
    menuRef.current.style.top = `${Math.max(8, Math.min(popup.y, window.innerHeight - rect.height - 8))}px`;
  }, [popup, active?.feature]);
  function commit(next: Annotation[]) {
    try { C.validateAnnotations(conversation, next, rubric, { allowIncomplete: true }); setError(''); onChange(next); }
    catch (err) { setError((err as Error).message); }
  }
  function update(annotation: Annotation) { commit(annotations.map(a => a.id === annotation.id ? annotation : a)); }
  function selectExactPassage(turnId: string, selected: string, rect: DOMRect) {
    if (readonly) return;
    try {
      const turn = conversation.messages.find(message => message.turn_id === turnId);
      if (!turn) throw new Error('The selected conversation turn could not be identified.');
      const offsets = exactSelectionOffsets(turn.text, selected);
      const evidence = C.makeEvidence(conversation, turnId, offsets.start, offsets.end);
      setPopup({ x: rect.left, y: rect.bottom + 8, evidence }); setError('');
    } catch (err) { setError((err as Error).message); }
  }
  function selectImage(turnId: string, imageIndex: number, rect: DOMRect) {
    if (readonly) return;
    try {
      const turn = conversation.messages.find(message => message.turn_id === turnId);
      if (!turn) throw new Error('The selected image turn could not be identified.');
      const matches = [...turn.text.matchAll(/Captured (?:diagram|image)/gi)];
      const match = matches[imageIndex];
      if (!match || match.index === undefined) throw new Error('This image could not be mapped to the conversation transcript.');
      const evidence = C.makeEvidence(conversation, turnId, match.index, match.index + match[0].length);
      setPopup({ x: rect.left, y: rect.bottom + 8, evidence }); setError('');
    } catch (err) { setError((err as Error).message); }
  }
  function create(key: string) {
    if (!popup?.evidence) return;
    const evidence = popup.evidence;
    const existing = annotations.find(a => a.feature === key && a.evidence.some(e => e.turn_id === evidence.turn_id && e.start === evidence.start && e.end === evidence.end));
    const annotation = existing || C.createAnnotation(key, evidence, rubric, crypto.randomUUID());
    if(!existing&&key==='examples')annotation.evidence[0].example_status='Fresh';
    if (!existing) commit([...annotations, annotation]);
    window.getSelection()?.removeAllRanges(); setPopup({ ...popup, id: annotation.id, evidence: undefined, editing: false });
  }
  function changeFeature(key: string) {
    if (!active || active.feature === key) return;
    const next = C.createAnnotation(key, active.evidence[0], rubric, active.id);
    next.evidence = structuredClone(active.evidence); next.entry.turn_locations = [...new Set(next.evidence.map(e => e.turn_id))];
    next.evidence.forEach((e,i)=>{if(key==='examples')e.example_status=e.example_status||(i===0?'Fresh':'Duplicate');else delete e.example_status;});
    for (const field of C.formFields(feature(key))) {
      const value = active.entry[field.key]; if (typeof value === 'string' && (!field.options || field.options.includes(value))) next.entry[field.key] = value;
    }
    update(next);
  }
  function setField(key: string, value: string, autoClose = true) {
    if (!active) return; const next = structuredClone(active); next.entry[key] = value;
    if (next.feature === 'questions' && next.entry.question_type === 'Instructional') next.entry.concept_checked = null;
    update(next); if (autoClose && !popup?.editing && !C.missingAttributes(next, rubric).length) close();
  }
  function setListField(key: string, value: string) {
    if (!active) return;
    const next = structuredClone(active); next.entry[key] = [...new Set(value.split(',').map(item => item.trim()).filter(Boolean))]; update(next);
  }
  function commitListField(key: string, value: string) {
    if (!active) return;
    const next = structuredClone(active); next.entry[key] = [...new Set(value.split(',').map(item => item.trim()).filter(Boolean))];
    try { C.validateAnnotations(conversation, [next], rubric, { allowIncomplete: true }); setError(''); onChange(annotations.map(annotation => annotation.id === next.id ? next : annotation)); setListDraft(null); }
    catch (err) { setError((err as Error).message); }
  }
  function displayField(value: string | string[] | null | undefined) { return Array.isArray(value) ? value.join(', ') || 'Not provided' : String(value || 'Not provided'); }
  function listField(value: string | string[] | null | undefined) { return Array.isArray(value) ? value.join(', ') : ''; }
  function editHighlight(ids: string[], rect: DOMRect) {
    keepPopupOpen();
    if (window.getSelection()?.toString()) return;
    setPopup({ x: rect.left, y: rect.bottom + 8, ...(ids.length === 1 ? { id: ids[0] } : { ids }), editing: true });
  }
  const guideFeature = feature(guideKey);
  return <div className={ratingsEnabled ? 'rating-workspace' : ''}><div className={`annotation-layout${guide ? ' guide-open' : ''}`}><section className="document">
    <div className="document-header"><h2>{conversation.learning_topic || conversation.label}</h2></div>
    {error && <p className="error" role="alert">{error}</p>}
    {captured.error && <p className="notice" role="status">{captured.error}</p>}
    {undo && !readonly && <p className="notice">Highlight deleted. <button className="text-button" onClick={() => { commit([...annotations, undo]); setUndo(null); }}>Undo</button></p>}
      {exactHtml && <div className="exact-capture"><ExactCapture html={exactHtml} conversation={conversation} annotations={annotations} rubric={rubric} readonly={readonly} onSelect={selectExactPassage} onImageSelect={selectImage} onHighlight={editHighlight} onHighlightLeave={leaveHighlight} /></div>}
    {completionAction && <div className="annotation-completion">{completionAction}</div>}
    {popup && <div className="selection-menu" ref={menuRef} role="dialog" aria-label={active ? `${readonly ? 'View' : 'Edit'} ${feature(active.feature).name}` : readonly ? 'Choose a highlight to view' : 'Choose instructional feature'} onPointerDown={event => event.stopPropagation()} onMouseEnter={keepPopupOpen} style={{ left: popup.x, top: popup.y }}>
      <button className="dismiss" aria-label="Close annotation popup" onClick={close}>×</button>
      {active ? readonly ? <><h3>{feature(active.feature).name}</h3><small>Read only</small>
        {conceptLevel(active) && <div className="popup-field"><strong>Concept level</strong><p>{conceptLevel(active)}</p>{!readonly && popup.editing && <small>Determined by the concept hierarchy path: Concept :: Unit :: Subunit.</small>}</div>}{C.formFields(feature(active.feature)).map(field => <div className="popup-field" key={field.key}><strong>{field.label}</strong><p>{displayField(active.entry[field.key])}</p></div>)}
        <details><summary>Supporting passages ({active.evidence.length})</summary>{active.evidence.map(ev => <div className="evidence" key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}{active.feature==='examples'&&` · ${ev.example_status||'Not classified'}`}</small><p>{ev.quote}</p></div>)}</details>
      </> : <><h3>{feature(active.feature).name}</h3>
        {popup.editing && <label>Instructional feature<select value={active.feature} onChange={e => changeFeature(e.target.value)}>{rubric.map(f => <option key={f.key} value={f.key} disabled={f.key === 'questions' && active.evidence.length > 1}>{f.name}</option>)}</select></label>}
        {conceptLevel(active) && <div className="popup-field"><strong>Concept level</strong><p>{conceptLevel(active)}</p>{!readonly && popup.editing && <small>Determined by the concept hierarchy path: Concept :: Unit :: Subunit.</small>}</div>}{C.formFields(feature(active.feature)).map(field => <div className="popup-field" key={field.key}><label htmlFor={`field-${field.key}`}>{field.label}</label>{field.options ? <div className="attribute-options" role="group" aria-label={field.label}>{field.options.map(value => <button className="choice" key={value} aria-label={value} aria-pressed={active.entry[field.key] === value} onClick={() => setField(field.key, value)}>{value}{optionExplanation(feature(active.feature), field.key, value) && <small><RichText text={optionExplanation(feature(active.feature), field.key, value)!} /></small>}</button>)}</div> : field.multiple ? <><textarea id={`field-${field.key}`} rows={2} placeholder="en, ta" value={listDraft?.id === active.id && listDraft.key === field.key ? listDraft.value : listField(active.entry[field.key])} onChange={e => setListDraft({ id: active.id, key: field.key, value: e.target.value })} onBlur={e => commitListField(field.key, e.target.value)} /><small>Comma-separated BCP 47 language tags. Use <code>zxx</code> for no written language or <code>und</code> when text is unreadable.</small></> : <textarea id={`field-${field.key}`} rows={2} value={String(active.entry[field.key] || '')} onChange={e => setField(field.key, e.target.value, false)} />}</div>)}
        <small>{C.missingAttributes(active, rubric).length ? 'Details needed: ' + C.missingAttributes(active, rubric).join(', ').replaceAll('_', ' ') : 'Changes save automatically.'}</small>
        {active.feature==='examples'&&<fieldset><legend>Example occurrence</legend>{active.evidence.map((ev,i)=><label key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}: {ev.quote.slice(0,100)}</small><select aria-label={`Example status for passage ${i+1}`} value={ev.example_status||''} onChange={event=>{const next=structuredClone(active);next.evidence[i].example_status=event.target.value as 'Fresh'|'Duplicate';update(next);}}><option value="" disabled>Not classified</option><option value="Fresh">Fresh</option><option value="Duplicate">Duplicate</option></select></label>)}</fieldset>}
        {popup.editing && <><details><summary>Supporting passages ({active.evidence.length})</summary>{active.evidence.map((ev, i) => <div className="evidence" key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}</small><p>{ev.quote}</p>{active.evidence.length > 1 && <button className="secondary" onClick={() => { const next = structuredClone(active); next.evidence.splice(i, 1); next.entry.turn_locations = [...new Set(next.evidence.map(e => e.turn_id))]; const primary = feature(next.feature).fields[0].key; if (next.entry[primary] === ev.quote) next.entry[primary] = next.evidence[0].quote; update(next); }}>Remove passage</button>}</div>)}</details><button className="danger" onClick={() => { setUndo(structuredClone(active)); commit(annotations.filter(a => a.id !== active.id)); close(); }}>Delete highlight</button></>}
      </> : popup.ids ? <><h3>Choose a highlight to {readonly ? 'view' : 'edit'}</h3>{popup.ids.map(id => { const a = annotations.find(item => item.id === id)!; return <button className="choice" key={id} onClick={() => setPopup({ ...popup, id, ids: undefined })}>{feature(a.feature).name}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>; })}</> : popup.extend ? <><h3>Add supporting passage</h3>{annotations.filter(a => a.feature !== 'questions').map(a => <button className="choice" key={a.id} onClick={() => { const next = C.addEvidence(structuredClone(a), { ...popup.evidence!, ...(a.feature==='examples'?{example_status:'Duplicate' as const}:{}) }); update(next); window.getSelection()?.removeAllRanges(); setPopup({ ...popup, id: a.id, evidence: undefined, extend: false, editing: true }); }}>{feature(a.feature).name}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>)}</> : <><h3>Annotate as</h3>{rubric.map(f => <button className="choice feature-choice" key={f.key} onClick={() => create(f.key)}><i style={{ background: f.color }} />{f.name}</button>)}{annotations.some(a => a.feature !== 'questions') && <button className="text-button" onClick={() => setPopup({ ...popup, extend: true })}>Add passage to an existing entry</button>}</>}
    </div>}
  </section>
    <button ref={guideToggle} className="guide-floating-button secondary" onClick={() => setGuide(!guide)} aria-expanded={guide} aria-controls="coding-guide-panel">Coding guide</button>
    {guide && <aside className="coding-guide-panel" id="coding-guide-panel" aria-labelledby="coding-guide-title">
      <div className="coding-guide-heading"><h2 id="coding-guide-title">Coding guide</h2><button className="dismiss" aria-label="Close coding guide" onClick={closeGuide}>×</button></div>
      <div className="coding-guide-content"><label htmlFor="guide-feature">Feature</label><select id="guide-feature" value={guideKey} onChange={e => setGuideKey(e.target.value)}>{rubric.map(f => <option key={f.key} value={f.key}>{f.name}</option>)}</select><h3>{guideFeature.name}</h3><p><RichText text={guideFeature.description} /></p><div><RichText text={guideFeature.guidance} /></div></div>
    </aside>}
  </div>{ratingsEnabled && <div ref={ratingsPanel} className="rating-sidebar"><TurnRatingsPanel conversation={conversation} rubric={snapshot} ratings={turnRatings} turnId={ratedTurn} readonly={readonly} onTurn={chooseRatedTurn} onChange={onRatingsChange} /></div>}</div>;
}
