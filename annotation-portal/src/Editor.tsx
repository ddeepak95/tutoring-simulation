import { conceptDisplayFeature } from './coverage-hierarchy';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { C } from './lib';
import type { Annotation, AssignmentType, Conversation, Evidence, Feature, RubricSnapshot, TurnRatings } from './types';
import { TurnRatingsPanel } from './TurnRatingsPanel';
import { ratingComplete } from './turn-ratings';
import { CapturedTranscript, CaptureMedia, OriginalCapture, useCaptureAssets } from './CapturedTranscript';
import { translateCapturedLayout } from './translated-capture-layout';
import { MarkdownTranscript } from './MarkdownTranscript';
import { countFeatureItems, featureSubitemCounts } from './feature-counts';

function RichText({ text }: { text: string }) {
  return <>{text.split(/(<br><br>|<br>|\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => part === '<br><br>' ? <span key={i}><br /><br /></span> : part === '<br>' ? <br key={i} /> : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part)}</>;
}
const guideDescriptions: Record<string, string> = {
  concepts_and_subtopics_covered: "This feature identifies the main concepts, explanatory units, and explanatory subunits that organize the tutor's explanation.",
  examples: 'This feature captures distinct cases or instances the tutor uses to illustrate a learning concept, rule, or principle.',
  analogies: 'This feature captures comparisons that explain a learning concept through shared features or relationships with another situation or system.',
  representations: 'This feature captures diagrams, flowcharts, graphs, tables, equations, and other visual or symbolic forms used to explain or illustrate a learning concept.',
  cultural_references: 'This feature captures references to cultural practices, traditions, artifacts, stories, media, or shared experiences used to explain or illustrate a learning concept.',
  memory_aids: 'This feature captures mnemonics and memory tips the tutor gives to help the learner remember a concept, sequence, rule, or step.',
  questions: 'This feature captures questions the tutor directs to the learner to elicit a response.',
  issues: "This feature captures distinct factual, conceptual, procedural, or reasoning issues in the tutor's contributions."
};
const guideCopy: Record<string, { tips: string[]; example: string }> = {
  concepts_and_subtopics_covered: {
    tips: [
      'Highlight each tutor heading, including standalone bold titles. Select the heading text only.',
      'The highlighted heading is the concept text. You do not need to type it again.',
      'You can optionally choose Main concept, Explanatory unit, or Explanatory subunit.',
      'Group repeated headings for the same topic and highlight each occurrence.',
      'Optional detail level: Brief states the idea; Explained develops it; Elaborated connects several ideas.'
    ],
    example: 'Highlight “Forces,” then optionally choose Explanatory unit and a detail level.'
  },
  examples: {
    tips: [
      'Highlight the case and name the concept it illustrates. Check paragraphs, lists, tables, and worked steps.',
      'Keep different cases or different uses of a case separate. Group repeated use of the same case and purpose.',
      'Mark an occurrence Fresh if it adds content or repeats only part of the case. Use Duplicate only for a complete repeat.',
      'Optional detail level: Brief names the case; Explained shows how it works; Elaborated adds connected reasoning or steps.'
    ],
    example: 'Wet clothes drying is an example of evaporation. A drying puddle is a separate example.'
  },
  analogies: {
    tips: [
      'Highlight the comparison and name the concept it explains.',
      'Record each distinct comparison once, with all places where it appears.',
      'Optional detail level: Brief names the shared feature; Explained maps the two sides; Elaborated develops several links.',
      'A simple use of “like” does not count unless the comparison helps explain the concept.'
    ],
    example: 'Comparing electric current with water flowing through a pipe is an analogy.'
  },
  representations: {
    tips: [
      'Record a representation the tutor actually shows, including an image, table, or displayed equation.',
      'Choose its type and name the concept it illustrates. Keep different representations separate.',
      'For a Diagram or Flowchart highlight containing several diagrams, set Number of diagrams. Leave it blank for one.',
      'You may list visible written languages. Use zxx if there is no text and und if the language is unclear.',
      'Do not label a graph or diagram that the tutor only suggests making.'
    ],
    example: 'A displayed F = ma equation is an Equation representation of Newton’s second law.'
  },
  cultural_references: {
    tips: [
      'Highlight a tradition, practice, or artifact when the tutor uses it to explain a concept.',
      'Name the reference and the concept it illustrates. Group repeated uses of the same reference.',
      'Optional detail level: Brief links them; Explained shows how; Elaborated adds reasoning or applications.',
      'A passing mention of a festival, place, or person does not count.'
    ],
    example: 'Using a traditional textile pattern to explain symmetry is a cultural reference.'
  },
  questions: {
    tips: [
      'Highlight a question or a contiguous group of questions. Set Number of questions when the highlight contains more than one; leave it blank for one.',
      'Choose Knowledge-checking when it asks the learner to use subject knowledge. Name the concept checked.',
      'Choose Instructional for understanding, preference, or interaction checks, such as “Does that make sense?”',
      'Skip headings, questions the tutor answers itself, and invitations to ask questions later.'
    ],
    example: '“Why do wet clothes dry faster in moving air?” is Knowledge-checking.'
  },
  memory_aids: {
    tips: [
      'Highlight the mnemonic or tip, plus enough context to show what it helps recall.',
      'Record each distinct aid once and include all places where it appears.',
      'A summary alone does not count. Add an analogy here only if the tutor presents it as a memory tip.'
    ],
    example: '“Remember PEMDAS for the order of operations” is a Memory Aid.'
  },
  issues: {
    tips: [
      'Highlight the exact incorrect claim or step.',
      'Describe the problem. You may add an explanation and the correct claim or step.',
      'Record each distinct issue once, including its repeats and any later correction.',
      'Leave out uncertain problems that you cannot support from the conversation.'
    ],
    example: '“Evaporation only happens at boiling temperature” is an issue because evaporation also happens below boiling.'
  }
};
const guideDescription = (feature: Feature) => guideDescriptions[feature.key] || feature.description;
const guideOptionLabels: Record<string, string> = { concept_level: 'Concept level (optional)', detail_level: 'Detail level (optional)', representation_type: 'Representation type', question_type: 'Question type' };
const guideChoices = (feature: Feature) => feature.fields.filter(field => field.options?.length).map(field => ({ label: guideOptionLabels[field.key] || field.label, options: field.options! }));
const fieldLabel = (field: Feature['fields'][number]) => field.optional && !field.label.includes('(optional)') ? `${field.label} (optional)` : field.label;
const hasFieldValue = (value: string | string[] | number | null | undefined) => Array.isArray(value) ? value.length > 0 : Boolean(value);
function FeatureCountPill({ feature, annotations, selected, onToggle }: { feature: Feature; annotations: Annotation[]; selected: boolean; onToggle: () => void }) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const showCounts = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    setPosition({ top: rect.bottom + 6, left: Math.max(8, Math.min(rect.left, window.innerWidth - 264)) });
  };
  const tooltipId = `feature-count-${feature.key}`;
  return <div className={`feature-count${selected ? ' selected' : ''}`} role="listitem" data-feature-key={feature.key} onMouseEnter={event => showCounts(event.currentTarget)} onMouseLeave={() => setPosition(null)} onFocus={event => showCounts(event.currentTarget)} onBlur={() => setPosition(null)}>
    <button type="button" className="feature-count-trigger" aria-label={`Filter ${feature.name} highlights`} aria-pressed={selected} aria-describedby={position ? tooltipId : undefined} onClick={onToggle}><span className="feature-count-dot" style={{ background: feature.color }} /><span>{feature.short_label}</span><strong>{countFeatureItems(annotations, feature.key)}</strong></button>
    {position && <div className="feature-count-tooltip" role="tooltip" id={tooltipId} style={position}><strong>{feature.name}</strong>{featureSubitemCounts(annotations, feature).map(group => <div className="feature-count-group" key={group.label}><span>{group.label}</span><dl>{group.counts.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.count}</dd></div>)}</dl></div>)}</div>}
  </div>;
}
interface Props { conversation: Conversation; rubric: RubricSnapshot; annotations: Annotation[]; onChange: (annotations: Annotation[]) => void; turnRatings?: TurnRatings; onRatingsChange?: (ratings: TurnRatings) => void; readonly?: boolean; completionAction?: ReactNode; onFinish?: () => void; taskType?: AssignmentType; }
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
function notationOffsets(source: string, element: Element, from: number) {
  const copy = element.cloneNode(true) as Element;
  copy.querySelectorAll('annotation,annotation-xml,.sr-only,[hidden]').forEach(node => node.remove());
  const quote = normalizedWithMap(copy.textContent || '').value;
  const transcript = normalizedWithMap(source);
  const index = quote ? transcript.value.indexOf(quote, from) : -1;
  if (index < 0) return null;
  return { start: transcript.map[index][0], end: transcript.map[index + quote.length - 1][1], next: index + quote.length };
}
function ExactCapture({ html, conversation, annotations, rubric, readonly, onSelect, onImageSelect, onNotationSelect, onHighlight, onHighlightLeave, visibleTurnIds }: { html: string; conversation: Conversation; annotations: Annotation[]; rubric: Feature[]; readonly: boolean; onSelect: (turnId: string, selected: string, rect: DOMRect) => void; onImageSelect: (turnId: string, imageIndex: number, rect: DOMRect) => void; onNotationSelect?: (turnId: string, start: number | null, end: number | null, rect: DOMRect) => void; onHighlight: (ids: string[], rect: DOMRect) => void; onHighlightLeave: () => void; visibleTurnIds?: string[] }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const callbacks = useRef({ onSelect, onImageSelect, onNotationSelect, onHighlight, onHighlightLeave });
  callbacks.current = { onSelect, onImageSelect, onNotationSelect, onHighlight, onHighlightLeave };
  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return;
    let removeDocumentListeners = () => {};
    const handleLoad = () => {
      const document = iframe.contentDocument;
      if (!document) return;
      removeDocumentListeners();
      translateCapturedLayout(document, conversation);
      const articles = [...document.querySelectorAll<HTMLElement>('article')].filter(article => article.classList.contains('capture-message') || Boolean(article.dataset.turnId));
      const style = document.createElement('style');
      style.dataset.annotationStyle = 'true';
      style.textContent = '[data-d-hover-zoom],[data-d-hover-zoom] *{transform:none!important;animation:none!important;transition:none!important}[data-rating-turn-hidden="true"]{display:none!important}.exact-annotation{cursor:pointer;border-radius:2px;padding:1px 0;box-decoration-break:clone;-webkit-box-decoration-break:clone}.exact-annotation-image{cursor:pointer}.exact-image-annotation-label,.exact-notation-annotation-label{display:block;width:max-content;max-width:100%;position:relative;z-index:100;margin:6px 0 12px;padding:3px 7px;border:1px solid var(--annotation-color,#87928b);border-radius:4px;background:var(--annotation-background,#fff);color:inherit;font:600 11px/1.4 system-ui,sans-serif;cursor:pointer;pointer-events:auto}[data-exact-notation-target][data-annotation-ids]:not([data-annotation-ids=""]){outline:2px solid var(--annotation-color);outline-offset:3px;border-radius:3px}';
      const visible = visibleTurnIds ? new Set(visibleTurnIds) : null;
      articles.forEach((article, index) => {
        const turn = conversation.messages.find(item => item.turn_id === article.dataset.turnId) || conversation.messages[index];
        if (visible && turn) article.dataset.ratingTurnHidden = String(!visible.has(turn.turn_id));
        else delete article.dataset.ratingTurnHidden;
      });
      document.head.appendChild(style);
      const clearHighlights = () => {
        document.querySelectorAll<HTMLElement>('mark.exact-annotation').forEach(mark => mark.replaceWith(...mark.childNodes));
        document.querySelectorAll<HTMLElement>('[data-exact-notation-target]').forEach(target => {
          delete target.dataset.exactNotationTarget;
          delete target.dataset.annotationIds;
          target.style.removeProperty('--annotation-color');
        });
        document.querySelectorAll<HTMLElement>('[data-exact-notation-label]').forEach(label => label.remove());
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
          if (node.parentElement?.closest('.katex,math')) continue;
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
        let notationNumber = 0;
        articles.forEach((article, index) => {
          const turn = conversation.messages.find(item => item.turn_id === article.dataset.turnId) || conversation.messages[index];
          if (!turn || turn.speaker !== 'tutor') return;
          article.dataset.turnId = turn.turn_id;
          article.dataset.speaker = turn.speaker;
          article.setAttribute('aria-label', `Tutor turn ${turn.turn_id}`);
          const speaker = article.querySelector<HTMLElement>('.capture-speaker');
          if (speaker) speaker.textContent = 'Bot';
          const notationTargets = callbacks.current.onNotationSelect ? [...article.querySelectorAll<HTMLElement>('.katex,math')].filter(element => !element.parentElement?.closest('.katex') && (element.matches('.katex') || !element.closest('.katex'))) : [];
          let searchFrom = 0;
          const notations = notationTargets.map(target => {
            const offsets = notationOffsets(turn.text, target, searchFrom);
            if (offsets) searchFrom = offsets.next;
            const anchor = target.closest('[data-d-component="math"]') || target.closest('.katex-display,p') || target;
            return { target, anchor, offsets };
          });
          const notationGroups: typeof notations[] = [];
          notations.forEach(notation => {
            const lastGroup = notationGroups.at(-1);
            const previous = lastGroup?.at(-1);
            const adjacentDisplayMath = previous && previous.anchor !== notation.anchor
              && previous.anchor.parentElement === notation.anchor.parentElement
              && previous.anchor.nextElementSibling === notation.anchor
              && previous.anchor.matches('[data-d-component="math"],.katex-display')
              && notation.anchor.matches('[data-d-component="math"],.katex-display');
            if (adjacentDisplayMath) lastGroup!.push(notation);
            else notationGroups.push([notation]);
          });
          annotations.forEach(annotation => annotation.evidence.filter(evidence => evidence.turn_id === turn.turn_id).forEach(evidence => markEvidence(article, evidence, annotation)));
          const insertionPoints = new Map<Element, Element>();
          notationGroups.forEach(group => {
            notationNumber++;
            const first = group[0].offsets, last = group.at(-1)?.offsets;
            const offsets = first && last && group.every(item => item.offsets) ? { start: first.start, end: last.end } : null;
            const matches = offsets ? annotations.filter(annotation => annotation.evidence.some(evidence => evidence.turn_id === turn.turn_id && evidence.start < offsets.end && evidence.end > offsets.start)) : [];
            const ids = matches.map(annotation => annotation.id);
            const feature = rubric.find(item => item.key === matches[0]?.feature);
            group.forEach(({ target }) => {
              target.dataset.exactNotationTarget = 'true';
              target.dataset.annotationIds = ids.join(',');
              if (feature) target.style.setProperty('--annotation-color', feature.color);
            });
            const label = document.createElement('button');
            label.type = 'button';
            label.className = 'exact-notation-annotation-label';
            label.dataset.exactNotationLabel = 'true';
            label.dataset.annotationIds = ids.join(',');
            label.dataset.notationTurnId = turn.turn_id;
            if (offsets) { label.dataset.notationStart = String(offsets.start); label.dataset.notationEnd = String(offsets.end); }
            label.textContent = `Notation ${notationNumber}`;
            label.title = feature?.name || 'Annotate notation';
            if (feature) { label.style.setProperty('--annotation-color', feature.color); label.style.setProperty('--annotation-background', feature.highlight); }
            const anchor = group.at(-1)!.anchor;
            const point = insertionPoints.get(anchor) || anchor;
            point.insertAdjacentElement('afterend', label);
            insertionPoints.set(anchor, label);
          });
          article.querySelectorAll<HTMLImageElement>('img').forEach(image => {
            const ids = (image.dataset.annotationIds || '').split(',').filter(Boolean);
            let imageContainer = image.closest<HTMLElement>('[data-d-component="image"]') || image.parentElement;
            while (imageContainer?.parentElement?.matches('[data-d-component="box"]')) imageContainer = imageContainer.parentElement;
            if (!imageContainer || imageContainer.nextElementSibling?.matches('[data-exact-annotation-label]')) return;
            const label = document.createElement('button');
            label.type = 'button';
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
            if (feature) { label.style.setProperty('--annotation-color', feature.color); label.style.setProperty('--annotation-background', feature.highlight); }
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
        const target = (event.target as HTMLElement | null)?.closest?.('.exact-annotation, .exact-image-annotation-label, .exact-notation-annotation-label') as HTMLElement | null;
        if (!target || (!target.dataset.exactAnnotationImage && !target.dataset.exactAnnotationLabel && !target.dataset.exactNotationLabel)) return;
        const ids = (target.dataset.annotationIds || '').split(',').filter(Boolean);
        const rect = target.getBoundingClientRect(), frameRect = iframe.getBoundingClientRect();
        if (target.dataset.exactNotationLabel) {
          const position = new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height);
          if (ids.length) callbacks.current.onHighlight(ids, position);
          else if (!readonly) callbacks.current.onNotationSelect?.(target.dataset.notationTurnId || '', target.dataset.notationStart ? Number(target.dataset.notationStart) : null, target.dataset.notationEnd ? Number(target.dataset.notationEnd) : null, position);
          return;
        }
        if (!ids.length) {
          const imageIndex = Number(target.dataset.exactImageIndex);
          if (!readonly && target.dataset.exactImageTurnId && Number.isInteger(imageIndex)) callbacks.current.onImageSelect(target.dataset.exactImageTurnId, imageIndex, new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height));
          return;
        }
        callbacks.current.onHighlight(ids, new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height));
      };
      const hover = (event: MouseEvent) => {
        const target = (event.target as HTMLElement | null)?.closest?.('.exact-annotation, .exact-image-annotation-label, .exact-notation-annotation-label') as HTMLElement | null;
        if (!target) return;
        const ids = (target.dataset.annotationIds || '').split(',').filter(Boolean);
        if (!ids.length) return;
        const rect = target.getBoundingClientRect(), frameRect = iframe.getBoundingClientRect();
        callbacks.current.onHighlight(ids, new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height));
      };
      const leave = (event: MouseEvent) => {
        const related = (event.relatedTarget as HTMLElement | null)?.closest?.('.exact-annotation, .exact-image-annotation-label, .exact-notation-annotation-label');
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
  }, [annotations, conversation, html, readonly, rubric, visibleTurnIds?.join('|')]);
  return <iframe ref={frame} title={conversation.translation ? 'Translated ChatGPT capture in original layout' : 'Exact original ChatGPT capture'} sandbox="allow-same-origin" srcDoc={html} />;
}
export function Editor({ conversation, rubric: snapshot, annotations, onChange, turnRatings = {}, onRatingsChange = () => {}, readonly = false, completionAction, onFinish, taskType = 'label' }: Props) {
  const captured = useCaptureAssets(conversation);
  const exactHtml = captured.exactHtml;
  const rubric = useMemo(() => snapshot.rubric.map(conceptDisplayFeature), [snapshot.rubric]);
  const [highlightFilters, setHighlightFilters] = useState<string[]>([]);
  const visibleAnnotations = useMemo(() => highlightFilters.length ? annotations.filter(annotation => highlightFilters.includes(annotation.feature)) : annotations, [annotations, highlightFilters]);
  const [ratedTurn, setRatedTurn] = useState(conversation.messages.find(turn => turn.speaker === 'tutor')?.turn_id || '');
  const tutorTurns = conversation.messages.filter(turn => turn.speaker === 'tutor');
  const ratedTurnIndex = Math.max(0, tutorTurns.findIndex(turn => turn.turn_id === ratedTurn));
  useEffect(() => {
    if (!tutorTurns.some(turn => turn.turn_id === ratedTurn)) setRatedTurn(tutorTurns[0]?.turn_id || '');
  }, [conversation, ratedTurn]);
  const ratingsEnabled = Boolean(taskType === 'rate' && snapshot.rating_dimensions?.length && ratedTurn);
  const labelReadonly = readonly || taskType === 'rate';
  const ratingsPanel = useRef<HTMLDivElement>(null);
  function chooseRatedTurn(id: string) { setRatedTurn(id); if (window.innerWidth < 1100) ratingsPanel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  const ratingExchange = (() => {
    const tutorIndex = conversation.messages.findIndex(turn => turn.turn_id === ratedTurn);
    if (tutorIndex < 0) return [];
    let start = tutorIndex;
    while (start > 0 && conversation.messages[start - 1].speaker !== 'tutor') start--;
    return conversation.messages.slice(start, tutorIndex + 1);
  })();
  const [popup, setPopup] = useState<{ x: number; y: number; evidence?: Evidence; ids?: string[]; id?: string; extend?: boolean; editing?: boolean } | null>(null);
  const [listDraft, setListDraft] = useState<{ id: string; key: string; value: string } | null>(null);
  const [guide, setGuide] = useState(taskType !== 'rate'); const [guideKey, setGuideKey] = useState<string | null>(null);
  const [error, setError] = useState(''); const [undo, setUndo] = useState<Annotation | null>(null);
  const [dismissedCaptureError, setDismissedCaptureError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverClose = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const skipInitialGuideFocus = useRef(taskType !== 'rate');
  const guideToggle = useRef<HTMLButtonElement>(null);
  const guideContent = useRef<HTMLDivElement>(null);
  const guideFirstItem = useRef<HTMLButtonElement>(null);
  const guideBackButton = useRef<HTMLButtonElement>(null);
  const feature = (key: string) => rubric.find(f => f.key === key)!;
  const active = annotations.find(a => a.id === popup?.id);
  const keepPopupOpen = () => clearTimeout(hoverClose.current);
  const close = () => { keepPopupOpen(); setPopup(null); };
  const toggleHighlightFilter = (key: string) => { close(); setHighlightFilters(current => current.includes(key) ? current.filter(value => value !== key) : [...current, key]); };
  function leaveHighlight() { keepPopupOpen(); hoverClose.current = setTimeout(() => setPopup(null), 250); }
  useEffect(() => () => clearTimeout(hoverClose.current), []);
  useEffect(() => { setGuide(taskType !== 'rate'); setGuideKey(null); }, [taskType]);
  useEffect(() => {
    if (!undo) return;
    const timeout = setTimeout(() => setUndo(null), 15000);
    return () => clearTimeout(timeout);
  }, [undo]);
  function closeGuide() { setGuide(false); setGuideKey(null); guideToggle.current?.focus({ preventScroll: true }); }
  useLayoutEffect(() => {
    if (!guide) return;
    guideContent.current?.scrollTo({ top: 0 });
    if (skipInitialGuideFocus.current) { skipInitialGuideFocus.current = false; return; }
    (guideKey ? guideBackButton : guideFirstItem).current?.focus({ preventScroll: true });
  }, [guide, guideKey]);
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
    if (labelReadonly) return;
    try {
      const turn = conversation.messages.find(message => message.turn_id === turnId);
      if (!turn) throw new Error('The selected conversation turn could not be identified.');
      const offsets = exactSelectionOffsets(turn.text, selected);
      const evidence = C.makeEvidence(conversation, turnId, offsets.start, offsets.end);
      setPopup({ x: rect.left, y: rect.bottom + 8, evidence }); setError('');
    } catch (err) { setError((err as Error).message); }
  }
  function selectMarkdownPassage(event: ReactMouseEvent<HTMLDivElement>) {
    if (labelReadonly) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const articleFor = (node: Node) => (node.nodeType === Node.ELEMENT_NODE ? node as Element : node.parentElement)?.closest<HTMLElement>('.turn[data-turn-id]');
    const article = articleFor(range.commonAncestorContainer), endArticle = articleFor(range.endContainer);
    if (!article || article !== endArticle || !article.classList.contains('tutor')) return;
    const rect = range.getBoundingClientRect();
    selectExactPassage(article.dataset.turnId || '', selection.toString(), rect);
  }
  function selectImage(turnId: string, imageIndex: number, rect: DOMRect) {
    if (labelReadonly) return;
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
  function selectNotation(turnId: string, start: number | null, end: number | null, rect: DOMRect) {
    if (labelReadonly) return;
    try {
      if (start === null || end === null) throw new Error('This notation could not be mapped to the conversation transcript.');
      const evidence = C.makeEvidence(conversation, turnId, start, end);
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
  function setField(key: string, value: string) {
    if (!active) return; const next = structuredClone(active); next.entry[key] = value;
    if (next.feature === 'questions' && next.entry.question_type === 'Instructional') next.entry.concept_checked = null;
    if (key === 'representation_type' && value !== 'Diagram' && value !== 'Flowchart') delete next.entry.diagram_count;
    update(next);
  }
  function setNumberField(key: string, value: string) {
    if (!active) return;
    const next = structuredClone(active);
    if (value === '') delete next.entry[key];
    else next.entry[key] = Number(value);
    update(next);
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
  function displayField(value: string | string[] | number | null | undefined) { return Array.isArray(value) ? value.join(', ') || 'Not provided' : String(value || 'Not provided'); }
  function listField(value: string | string[] | number | null | undefined) { return Array.isArray(value) ? value.join(', ') : ''; }
  function editHighlight(ids: string[], rect: DOMRect) {
    keepPopupOpen();
    if (window.getSelection()?.toString()) return;
    setPopup({ x: rect.left, y: rect.bottom + 8, ...(ids.length === 1 ? { id: ids[0] } : { ids }), editing: true });
  }
  const guideFeature = guideKey ? rubric.find(item => item.key === guideKey) : null;
  return <div className={ratingsEnabled ? 'rating-workspace' : ''}>
    {(error || (captured.error && captured.error !== dismissedCaptureError) || (undo && !labelReadonly)) && <div className="editor-toast-stack">
      {error && <div className="editor-toast editor-toast-error" role="alert"><p>{error}</p><button type="button" aria-label="Dismiss error" onClick={() => setError('')}>×</button></div>}
      {captured.error && captured.error !== dismissedCaptureError && <div className="editor-toast editor-toast-error" role="alert"><p>{captured.error}</p><button type="button" aria-label="Dismiss capture error" onClick={() => setDismissedCaptureError(captured.error)}>×</button></div>}
      {undo && !labelReadonly && <div className="editor-toast" role="status"><p>Highlight deleted.</p><button type="button" className="editor-toast-action" onClick={() => { commit([...annotations, undo]); setUndo(null); }}>Undo</button><button type="button" aria-label="Dismiss deletion message" onClick={() => setUndo(null)}>×</button></div>}
    </div>}
    <div className={`annotation-layout${guide ? ' guide-open' : ''}`}><section className="document">
    <div className={`document-header${taskType !== 'rate' ? ' labeling-document-header' : ''}`}>
      <h2>{conversation.learning_topic || conversation.label}</h2>
      {taskType !== 'rate' && <div className="feature-filter-row"><div className="feature-counts" role="list" aria-label="Feature counts">{rubric.map(item => <FeatureCountPill key={item.key} feature={item} annotations={annotations} selected={highlightFilters.includes(item.key)} onToggle={() => toggleHighlightFilter(item.key)} />)}</div>{highlightFilters.length > 0 && <button type="button" className="clear-highlight-filters" onClick={() => { close(); setHighlightFilters([]); }}>Show all highlights</button>}</div>}
    </div>
      {taskType === 'rate' ? <div className="rating-exchange" data-testid="rating-exchange" data-tutor-turn={ratedTurn} aria-live="polite">
        {exactHtml ? <div className="exact-capture rating-exact-capture"><ExactCapture html={exactHtml} conversation={conversation} annotations={[]} rubric={rubric} readonly onSelect={() => {}} onImageSelect={() => {}} onHighlight={() => {}} onHighlightLeave={() => {}} visibleTurnIds={ratingExchange.map(turn => turn.turn_id)} /></div> : captured.loading ? <div className="exact-capture rating-exact-capture"><div className="capture-layout-loading" role="status">Loading captured conversation…</div></div> : ratingExchange.map(turn => <article className={`turn ${turn.speaker}`} key={turn.turn_id} data-turn-id={turn.turn_id}><div className="turn-heading"><span className="speaker-badge">{turn.speaker === 'student' ? 'S' : 'B'}</span><strong>{turn.speaker === 'student' ? 'Student' : 'Bot'}</strong><span>{turn.turn_id}</span></div><div className="turn-body">{conversation.translation ? <><MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={rubric} readonly onHighlight={() => {}} />{captured.assets[turn.turn_id] && <CaptureMedia html={captured.assets[turn.turn_id]} />}</> : captured.assets[turn.turn_id] ? <CapturedTranscript html={captured.assets[turn.turn_id]} text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={rubric} readonly onHighlight={() => {}} /> : <MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={rubric} readonly onHighlight={() => {}} />}</div></article>)}
      </div> : exactHtml ? <div className="exact-capture"><ExactCapture html={exactHtml} conversation={conversation} annotations={visibleAnnotations} rubric={rubric} readonly={labelReadonly} onSelect={selectExactPassage} onImageSelect={selectImage} onNotationSelect={selectNotation} onHighlight={editHighlight} onHighlightLeave={leaveHighlight} /></div> : captured.loading ? <div className="exact-capture"><div className="capture-layout-loading" role="status">Loading captured conversation…</div></div> : <div className="transcript" onMouseUp={selectMarkdownPassage}>{conversation.messages.map(turn => <article className={`turn ${turn.speaker}`} key={turn.turn_id} data-turn-id={turn.turn_id}><div className="turn-heading"><span className="speaker-badge">{turn.speaker === 'student' ? 'S' : 'B'}</span><strong>{turn.speaker === 'student' ? 'Student' : 'Bot'}</strong><span>{turn.turn_id}</span></div><div className="turn-body"><MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={visibleAnnotations} rubric={rubric} readonly={labelReadonly} onHighlight={editHighlight} onHighlightLeave={leaveHighlight} />{conversation.translation && captured.assets[turn.turn_id] && <CaptureMedia html={captured.assets[turn.turn_id]} />}</div></article>)}</div>}
    {captured.originalHtml && <OriginalCapture html={captured.originalHtml} />}
    {completionAction && taskType !== 'rate' && <div className="annotation-completion">{completionAction}</div>}
    {popup && <div className="selection-menu" ref={menuRef} role="dialog" aria-label={active ? `${readonly ? 'View' : 'Edit'} ${feature(active.feature).name}` : readonly ? 'Choose a highlight to view' : 'Choose instructional feature'} onPointerDown={event => event.stopPropagation()} onMouseEnter={keepPopupOpen} style={{ left: popup.x, top: popup.y }}>
      <button className="dismiss" aria-label="Close annotation popup" onClick={close}>×</button>
      {active ? readonly ? <><h3>{feature(active.feature).name}</h3><small>Read only</small>
        {C.formFields(feature(active.feature)).filter(field => field.key !== 'topic' && (!field.optional || hasFieldValue(active.entry[field.key]))).map(field => <div className="popup-field" key={field.key}><strong>{fieldLabel(field)}</strong><p>{displayField(active.entry[field.key])}</p></div>)}
        <details><summary>Supporting passages ({active.evidence.length})</summary>{active.evidence.map(ev => <div className="evidence" key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}{active.feature==='examples'&&` · ${ev.example_status||'Not classified'}`}</small><p>{ev.quote}</p></div>)}</details>
      </> : <><h3>{feature(active.feature).name}</h3>
        {popup.editing && <label>Instructional feature<select value={active.feature} onChange={e => changeFeature(e.target.value)}>{rubric.map(f => <option key={f.key} value={f.key} disabled={f.key === 'questions' && active.evidence.length > 1}>{f.name}</option>)}</select></label>}
        {C.formFields(feature(active.feature)).filter(field => field.key !== 'topic' && (field.key !== 'diagram_count' || ['Diagram', 'Flowchart'].includes(String(active.entry.representation_type)))).map(field => <div className="popup-field" key={field.key}><label htmlFor={`field-${field.key}`}>{fieldLabel(field)}</label>{field.numeric ? <><input id={`field-${field.key}`} type="number" min="1" max="1000" step="1" placeholder="1" value={typeof active.entry[field.key] === 'number' ? Number(active.entry[field.key]) : ''} onChange={e => setNumberField(field.key, e.target.value)} /><small>Leave blank for one in this highlight.</small></> : field.options ? <div className="attribute-options" role="group" aria-label={fieldLabel(field)}>{field.optional && <button className="choice" aria-label={`No ${field.key.replaceAll('_', ' ')}`} aria-pressed={!active.entry[field.key]} onClick={() => setField(field.key, '')}>Not specified</button>}{field.options.map(value => <button className="choice" key={value} aria-label={value} aria-pressed={active.entry[field.key] === value} onClick={() => setField(field.key, value)}>{value}{optionExplanation(feature(active.feature), field.key, value) && <small><RichText text={optionExplanation(feature(active.feature), field.key, value)!} /></small>}</button>)}</div> : field.multiple ? <><textarea id={`field-${field.key}`} rows={2} placeholder={field.key === 'image_languages' ? 'en, ta' : 'One item, another item'} value={listDraft?.id === active.id && listDraft.key === field.key ? listDraft.value : listField(active.entry[field.key])} onChange={e => setListDraft({ id: active.id, key: field.key, value: e.target.value })} onBlur={e => commitListField(field.key, e.target.value)} /><small>{field.key === 'image_languages' ? 'Comma-separated BCP 47 language tags. Use zxx for no written language or und when text is unreadable.' : 'Separate items with commas.'}</small></> : <textarea id={`field-${field.key}`} rows={2} value={String(active.entry[field.key] || '')} onChange={e => setField(field.key, e.target.value)} />}</div>)}
        <small>{C.missingAttributes(active, rubric).length ? 'Details needed: ' + C.missingAttributes(active, rubric).join(', ').replaceAll('_', ' ') : 'Changes save automatically.'}</small>
        {active.feature==='examples'&&<fieldset><legend>Example occurrence</legend>{active.evidence.map((ev,i)=><label key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}: {ev.quote.slice(0,100)}</small><select aria-label={`Example status for passage ${i+1}`} value={ev.example_status||''} onChange={event=>{const next=structuredClone(active);next.evidence[i].example_status=event.target.value as 'Fresh'|'Duplicate';update(next);}}><option value="" disabled>Not classified</option><option value="Fresh">Fresh</option><option value="Duplicate">Duplicate</option></select></label>)}</fieldset>}
        {popup.editing && <><details><summary>Supporting passages ({active.evidence.length})</summary>{active.evidence.map((ev, i) => <div className="evidence" key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}</small><p>{ev.quote}</p>{active.evidence.length > 1 && <button className="secondary" onClick={() => { const next = structuredClone(active); next.evidence.splice(i, 1); next.entry.turn_locations = [...new Set(next.evidence.map(e => e.turn_id))]; const primary = feature(next.feature).fields[0].key; if (next.entry[primary] === ev.quote) next.entry[primary] = next.evidence[0].quote; update(next); }}>Remove passage</button>}</div>)}</details><button className="danger" onClick={() => { setUndo(structuredClone(active)); commit(annotations.filter(a => a.id !== active.id)); close(); }}>Delete highlight</button></>}
      </> : popup.ids ? <><h3>Choose a highlight to {readonly ? 'view' : 'edit'}</h3>{popup.ids.map(id => { const a = annotations.find(item => item.id === id)!; return <button className="choice" key={id} onClick={() => setPopup({ ...popup, id, ids: undefined })}>{feature(a.feature).name}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>; })}</> : popup.extend ? <><h3>Add supporting passage</h3>{annotations.filter(a => a.feature !== 'questions').map(a => <button className="choice" key={a.id} onClick={() => { const next = C.addEvidence(structuredClone(a), { ...popup.evidence!, ...(a.feature==='examples'?{example_status:'Duplicate' as const}:{}) }); update(next); window.getSelection()?.removeAllRanges(); setPopup({ ...popup, id: a.id, evidence: undefined, extend: false, editing: true }); }}>{feature(a.feature).name}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>)}</> : <><h3>Annotate as</h3>{rubric.map(f => <button className="choice feature-choice" key={f.key} onClick={() => create(f.key)}><i style={{ background: f.color }} />{f.name}</button>)}{annotations.some(a => a.feature !== 'questions') && <button className="text-button" onClick={() => setPopup({ ...popup, extend: true })}>Add passage to an existing entry</button>}</>}
    </div>}
  </section>
    {taskType !== 'rate' && <button ref={guideToggle} className="guide-floating-button secondary" onClick={() => guide ? closeGuide() : setGuide(true)} aria-expanded={guide} aria-controls="coding-guide-panel">Labeling guide</button>}
    {taskType !== 'rate' && guide && <aside className="coding-guide-panel" id="coding-guide-panel" aria-labelledby="coding-guide-title">
      <div className="coding-guide-heading"><h2 id="coding-guide-title">Labeling guide</h2><button className="dismiss" aria-label="Close labeling guide" onClick={closeGuide}>×</button></div>
      <div ref={guideContent} className="coding-guide-content">{guideFeature ? <div className="coding-guide-detail"><button ref={guideBackButton} type="button" className="coding-guide-back secondary" onClick={() => setGuideKey(null)}>← All features</button><h3>{guideFeature.name}</h3><p><RichText text={guideDescription(guideFeature)} /></p>{guideCopy[guideFeature.key] ? <><ul>{guideCopy[guideFeature.key].tips.map(tip => <li key={tip}>{tip}</li>)}</ul>{guideChoices(guideFeature).length > 0 && <section className="coding-guide-choices" aria-label="Available choices"><h4>Available choices</h4>{guideChoices(guideFeature).map(field => <p key={field.label}><strong>{field.label}:</strong> {field.options.join(' · ')}</p>)}{guideFeature.key === 'examples' && <p><strong>Example occurrence:</strong> Fresh · Duplicate</p>}</section>}<p className="coding-guide-example"><strong>Example</strong><br />{guideCopy[guideFeature.key].example}</p></> : <div><RichText text={guideFeature.guidance} /></div>}</div> : <div className="coding-guide-list">{rubric.map((item, index) => <button ref={index === 0 ? guideFirstItem : undefined} type="button" className="coding-guide-item" key={item.key} onClick={() => setGuideKey(item.key)}><span className="coding-guide-item-title"><span className="coding-guide-item-dot" style={{ background: item.color }} /><strong>{item.name}</strong></span><span className="coding-guide-item-summary"><RichText text={guideDescription(item)} /></span></button>)}</div>}</div>
    </aside>}
  </div>{ratingsEnabled && <div ref={ratingsPanel} className="rating-sidebar"><TurnRatingsPanel conversation={conversation} rubric={snapshot} ratings={turnRatings} turnId={ratedTurn} turnIndex={ratedTurnIndex} readonly={readonly} onTurn={chooseRatedTurn} onChange={onRatingsChange} onFinish={onFinish} /></div>}</div>;
}
