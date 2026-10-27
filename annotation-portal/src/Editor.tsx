import {createSectionItemBadges} from './SectionItemBadges';
import sectionBadgeStyles from './section-item-badges.css?inline';
import {RichText} from './RichText';
import {LabelItemIcon} from './LabelItemIcon';
import {createPortal} from 'react-dom';
import {SectionLabelPanel} from './SectionLabelPanel';
import {ensureSections, readSections, sectionCandidates} from './section-registry';
import { mapCapturedArticle } from './captured-sections';
import { displayRubric } from './coverage-hierarchy';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { C, supabase } from './lib';
import type { Annotation, AssignmentType, Conversation, Evidence, Feature, ConversationSection, RubricSnapshot, TurnRatings } from './types';
import { TurnRatingsPanel } from './TurnRatingsPanel';
import { ratingComplete } from './turn-ratings';
import { CapturedTranscript, CaptureMedia, OriginalCapture, useCaptureAssets } from './CapturedTranscript';
import { translateCapturedLayout } from './translated-capture-layout';
import { normalizeCapturedSpeakerLabels } from './captured-speaker-labels';
import { styleCapturedUserBubbles } from './captured-user-bubbles';
import { MarkdownTranscript } from './MarkdownTranscript';
import { countFeatureItems, featureSubitemCounts } from './feature-counts';
import { contextualizeAnnotationError, missingFieldLabels } from './annotation-validation';


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
const guideDescription = (feature: Feature) => feature.category ? feature.description : guideDescriptions[feature.key] || feature.description;
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
    <button type="button" className="feature-count-trigger" aria-label={`Filter ${feature.name} highlights`} aria-pressed={selected} aria-describedby={position ? tooltipId : undefined} onClick={onToggle}><LabelItemIcon item={feature.key} style={{color:feature.color}}/><span>{feature.short_label}</span><strong>{countFeatureItems(annotations, feature.key)}</strong></button>
    {position && <div className="feature-count-tooltip" role="tooltip" id={tooltipId} style={position}><strong>{feature.name}</strong>{featureSubitemCounts(annotations, feature).map(group => <div className="feature-count-group" key={group.label}><span>{group.label}</span><dl>{group.counts.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.count}</dd></div>)}</dl></div>)}</div>}
  </div>;
}
interface Props { conversationId?: string; conversation: Conversation; rubric: RubricSnapshot; annotations: Annotation[]; onChange: (annotations: Annotation[]) => void; turnRatings?: TurnRatings; onRatingsChange?: (ratings: TurnRatings) => void; readonly?: boolean; completionAction?: ReactNode; onFinish?: () => void; taskType?: AssignmentType; focusAnnotation?: { id: string; request: number } | null; }
function optionExplanation(feature: Feature, key: string, value: string) {
  const text = feature.guidance.split(`**${value}:**`)[1];
  if (!text) return null;
  if (key === 'detail_level') return text.split(/\*\*(?:Brief|Explained|Elaborated):\*\*|<br><br>/)[0].trim().split(', for example,')[0].split(' These are')[0];
  if (key === 'question_type') return text.trim().split('. ')[0] + '.';
  return null;
}
function ExactCapture({ html, conversation, annotations, rubric, readonly, onSectionSelect, onHighlight, visibleTurnIds, sections: registeredSections, onSections, assets, selectedSection }: { selectedSection?:Evidence; assets?:Record<string,string>; sections?: ConversationSection[]; onSections?: (ranges: {turn_id:string;start:number;end:number}[] | null) => void; html: string; conversation: Conversation; annotations: Annotation[]; rubric: Feature[]; readonly: boolean; onSectionSelect?: (turnId: string, start: number | null, end: number | null, rect: DOMRect) => void; onHighlight: (ids: string[], rect: DOMRect) => void; visibleTurnIds?: string[] }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [readyHtml,setReadyHtml]=useState<string|null>(null);
  const callbacks = useRef({ onSectionSelect, onHighlight, onSections });
  callbacks.current = { onSectionSelect, onHighlight, onSections };
  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return;
    let removeDocumentListeners = () => {};
    const handleLoad = () => {
      const document = iframe.contentDocument;
      if (!document || document.URL==='about:blank') return;
      removeDocumentListeners();
      translateCapturedLayout(document, conversation);
      normalizeCapturedSpeakerLabels(document, conversation);
      styleCapturedUserBubbles(document, conversation);
      const articles = [...document.querySelectorAll<HTMLElement>('article')].filter(article => article.classList.contains('capture-message') || Boolean(article.dataset.turnId));
      const style = document.createElement('style');
      style.dataset.annotationStyle = 'true';
      style.textContent = '[data-d-hover-zoom],[data-d-hover-zoom] *{transform:none!important;animation:none!important;transition:none!important}[data-rating-turn-hidden="true"]{display:none!important}.exact-section-annotation-label,.exact-section-top-label{display:block;width:max-content;max-width:100%;position:relative;z-index:100;margin:16px 0 26px 24px;padding:4px 10px;border:2px solid var(--annotation-color,#263430);border-radius:0;background:var(--annotation-background,#fff);color:#263430;font:500 13px/1.4 system-ui,sans-serif;cursor:pointer;pointer-events:auto}';
      style.textContent+=sectionBadgeStyles+' .exact-section-controls{display:flex;align-items:center;flex-wrap:wrap;gap:8px;position:relative;z-index:100;width:max-content;max-width:calc(100% - 48px);margin:16px 0 26px 24px}.exact-section-controls>.exact-section-annotation-label{margin:0;flex:none}.exact-section-top-label:focus-visible,.exact-section-annotation-label:focus-visible{outline:2px solid #2563eb;outline-offset:3px}';
      const visible = visibleTurnIds ? new Set(visibleTurnIds) : null;
      articles.forEach((article, index) => {
        const turn = conversation.messages.find(item => item.turn_id === article.dataset.turnId) || conversation.messages[index];
        if (visible && turn) article.dataset.ratingTurnHidden = String(!visible.has(turn.turn_id));
        else delete article.dataset.ratingTurnHidden;
      });
      document.head.appendChild(style);
      const outlines = document.createElement('div');
      outlines.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99;background:transparent;border:0;margin:0;padding:0;';
      document.documentElement.appendChild(outlines);
      const sectionBounds: { bounds: Range; box: HTMLElement; label: HTMLElement; topLabel: HTMLElement; article: HTMLElement; color:string; selected:boolean; controls:HTMLElement }[] = [];
      const updateOutlines = () => {
        sectionBounds.forEach(({ bounds, box, label, topLabel, article, color, selected, controls }) => {
          const rect = bounds.getBoundingClientRect();
          const left = Math.max(4, rect.left - 12);
          const width = Math.max(rect.width + 24, article.getBoundingClientRect().right - left - 4);
          controls.style.left = '0px';
          controls.style.maxWidth = `${Math.max(0, width - 48)}px`;
          const originalLabel = controls.getBoundingClientRect();
          controls.style.left = `${left + 24 - originalLabel.left}px`;
          const labelRect = label.getBoundingClientRect();
          const top = rect.top - 20;
          const topLabelLeft = left + width - 24 - labelRect.width;
          topLabel.style.position = 'absolute';
          topLabel.style.margin = '0';
          topLabel.style.pointerEvents = 'auto';
          topLabel.style.boxSizing = 'border-box';
          topLabel.style.width = `${labelRect.width}px`;
          topLabel.style.left = `${topLabelLeft}px`;
          topLabel.style.top = `${top - labelRect.height / 2}px`;
          const topGapLeft = topLabelLeft - left - 2, topGapRight = topLabelLeft - left + labelRect.width + 2;
          const height = labelRect.top + labelRect.height / 2 - top;
          const controlRect=controls.getBoundingClientRect();
          const gapLeft = controlRect.left - left - 2, gapRight = controlRect.right - left + 2;
          box.style.cssText = `position:absolute;pointer-events:none;box-sizing:border-box;border:${selected?3:2}px dashed ${color};border-radius:0;background:transparent;left:${left}px;top:${top}px;width:${width}px;height:${height}px;display:${rect.width && rect.height ? 'block' : 'none'};clip-path:polygon(0 0,${topGapLeft}px 0,${topGapLeft}px 3px,${topGapRight}px 3px,${topGapRight}px 0,100% 0,100% 100%,${gapRight}px 100%,${gapRight}px calc(100% - 3px),${gapLeft}px calc(100% - 3px),${gapLeft}px 100%,0 100%);`;
        });
      };
      const renderSections = () => {
        document.querySelectorAll<HTMLElement>('[data-exact-section-controls],[data-exact-section-label],[data-exact-section-spacer]').forEach(label => label.remove());
        let turnNumber = 0;
        const inventory: {turn_id:string;start:number;end:number}[] = [];
        let allMapped = true;
        articles.forEach((article, index) => {
          const turn = conversation.messages.find(item => item.turn_id === article.dataset.turnId) || conversation.messages[index];
          if (!turn || turn.speaker !== 'tutor') return;
          turnNumber++;
          let sectionNumber = 0;
          article.dataset.turnId = turn.turn_id;
          article.dataset.speaker = turn.speaker;
          article.setAttribute('aria-label', `Tutor turn ${turn.turn_id}`);
          const speaker = article.querySelector<HTMLElement>('.capture-speaker');
          if (speaker) speaker.textContent = 'Bot';
          const sections = callbacks.current.onSectionSelect ? mapCapturedArticle(article, turn.text, assets?.[turn.turn_id], conversation.translation ? (conversation.translation.alignment||[]).filter(a=>a.turn_id===turn.turn_id&&a.kind==='heading').map(a=>({start:a.start,end:a.end})) : undefined) : [];
          if (sections.length) {
            const spacer = document.createElement('div');
            spacer.dataset.exactSectionSpacer = 'true';
            spacer.setAttribute('aria-hidden', 'true');
            spacer.style.height = '32px';
            article.prepend(spacer);
          }
          sections.forEach(({ before, offsets, bounds }) => {
            if(offsets)inventory.push({turn_id:turn.turn_id,...offsets});else allMapped=false;
            sectionNumber++;
            const box = document.createElement('div');
            box.className = 'exact-section-boundary';
            box.setAttribute('aria-hidden','true');
            box.dataset.sectionNumber = String(sectionNumber);
            const selected=selectedSection?.turn_id===turn.turn_id && selectedSection.start===offsets?.start && selectedSection.end===offsets?.end;
            box.dataset.selected=String(selected);
            outlines.appendChild(box);
            const matches = offsets ? annotations.filter(annotation => annotation.evidence.some(evidence => evidence.turn_id === turn.turn_id && evidence.start < offsets.end && evidence.end > offsets.start)) : [];
            const feature = rubric.find(item => item.key === matches[0]?.feature);
            const label = document.createElement('button');
            label.type = 'button';
            label.className = 'exact-section-annotation-label';
            label.dataset.exactSectionLabel = 'true';
            label.dataset.annotationIds = matches.map(annotation => annotation.id).join(',');
            label.dataset.sectionTurnId = turn.turn_id;
            const registered = registeredSections?.find(s => s.turn_id===turn.turn_id && s.start===offsets?.start && s.end===offsets?.end);
            if(registered){label.dataset.sectionId=registered.section_id;box.dataset.sectionId=registered.section_id;}
            label.setAttribute('aria-pressed',String(selected));
            if (offsets) { label.dataset.sectionStart = String(offsets.start); label.dataset.sectionEnd = String(offsets.end); }
            label.textContent = `Turn ${turnNumber} - Section ${sectionNumber}`;
            label.title = feature?.name || 'Annotate section';
            label.style.setProperty('--annotation-color', selected?'#2563eb':'#263430'); label.style.setProperty('--annotation-background', selected?'#eff6ff':'#fff');
            const controls=document.createElement('div');controls.className='exact-section-controls';controls.dataset.exactSectionControls='true';controls.append(label);
            const badges=createSectionItemBadges(document,matches,rubric);if(badges)controls.append(badges);
            if(before)before.before(controls);else article.appendChild(controls);
            const topLabel=label.cloneNode(true) as HTMLButtonElement;
            topLabel.className='exact-section-top-label';
            topLabel.setAttribute('aria-label',`Select ${label.textContent}`);
            outlines.appendChild(topLabel);
            sectionBounds.push({ bounds, box, label, topLabel, article, controls, selected, color:selected?'#2563eb':'#263430' });
          });
        });
        if(articles.length)callbacks.current.onSections?.(allMapped && inventory.length ? inventory : null);
      };
      renderSections();
      updateOutlines();
      const resizeObserver = new ResizeObserver(updateOutlines);
      articles.forEach(article => resizeObserver.observe(article));
      document.addEventListener('scroll', updateOutlines, true);
      document.addEventListener('load', updateOutlines, true);
      iframe.contentWindow?.addEventListener('resize', updateOutlines);
      const click = (event: MouseEvent) => {
        const target = (event.target as HTMLElement | null)?.closest?.('[data-exact-section-label]') as HTMLElement | null;
        if (!target || !target.dataset.exactSectionLabel) return;
        const ids = (target.dataset.annotationIds || '').split(',').filter(Boolean);
        const rect = target.getBoundingClientRect(), frameRect = iframe.getBoundingClientRect();
        if (target.dataset.exactSectionLabel) {
          const position = new DOMRect(frameRect.left + rect.left, frameRect.top + rect.top, rect.width, rect.height);
          if (ids.length) callbacks.current.onHighlight(ids, position);
          else if (!readonly) callbacks.current.onSectionSelect?.(target.dataset.sectionTurnId || '', target.dataset.sectionStart !== undefined ? Number(target.dataset.sectionStart) : null, target.dataset.sectionEnd !== undefined ? Number(target.dataset.sectionEnd) : null, position);
          return;
        }
      };
      document.addEventListener('click', click);
      if(document.readyState==='complete')setReadyHtml(html);
      removeDocumentListeners = () => {
        document.removeEventListener('click', click);
        document.removeEventListener('scroll', updateOutlines, true);
        document.removeEventListener('load', updateOutlines, true);
        iframe.contentWindow?.removeEventListener('resize', updateOutlines);
        resizeObserver.disconnect();
        outlines.remove();
        style.remove();
      };
    };
    iframe.addEventListener('load', handleLoad);
    if (iframe.contentDocument?.readyState === 'complete') handleLoad();
    return () => { iframe.removeEventListener('load', handleLoad); removeDocumentListeners(); };
  }, [annotations, conversation, html, readonly, rubric, registeredSections, assets, selectedSection?.turn_id, selectedSection?.start, selectedSection?.end, visibleTurnIds?.join('|')]);
  return <><iframe ref={frame} style={{visibility:readyHtml===html?'visible':'hidden'}} aria-busy={readyHtml!==html} title={conversation.translation ? 'Translated ChatGPT capture in original layout' : 'Exact original ChatGPT capture'} sandbox="allow-same-origin" srcDoc={html} />{readyHtml!==html&&<div className="capture-layout-loading capture-frame-pending" role="status">Loading captured conversation…</div>}</>;
}
export function Editor({ conversationId, conversation, rubric: snapshot, annotations, onChange, turnRatings = {}, onRatingsChange = () => {}, readonly = false, completionAction, onFinish, taskType = 'label', focusAnnotation }: Props) {
  const captured = useCaptureAssets(conversation);
  const exactHtml = captured.exactHtml;
  const rubric = useMemo(() => displayRubric(snapshot.rubric), [snapshot.rubric]);
  const itemLabels = snapshot.label_schema_version === 'section-items/1';
  const [registeredSections, setRegisteredSections] = useState<ConversationSection[]>([]);
  const [sectionInventory, setSectionInventory] = useState<{turn_id:string;start:number;end:number}[] | null>(null);
  const inventoryKey=JSON.stringify(sectionInventory);
  const receiveSections=(ranges:typeof sectionInventory)=>setSectionInventory(previous=>JSON.stringify(previous)===JSON.stringify(ranges)?previous:ranges);
  useEffect(()=>{
    if(!itemLabels || !conversationId || taskType==='rate' || captured.loading)return;
    let alive=true;
    void (async()=>{
      try{
        let rows=await readSections(supabase!,[conversationId]);
        if(!rows.length){
          if(exactHtml&&!sectionInventory?.length)return;
          rows=await ensureSections(supabase!,conversationId,sectionCandidates(conversation,exactHtml?sectionInventory!:undefined));
        }
        if(alive)setRegisteredSections(rows);
      }catch(err){if(alive)setError((err as Error).message);}
    })();
    return()=>{alive=false;};
  },[conversationId,itemLabels,taskType,captured.loading,exactHtml,inventoryKey]);
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
  const [popup, setPopup] = useState<{ x: number; y: number; evidence?: Evidence; sectionId?: string; ids?: string[]; id?: string; extend?: boolean; editing?: boolean } | null>(null);
  const [listDraft, setListDraft] = useState<{ id: string; key: string; value: string } | null>(null);
  const [guide, setGuide] = useState(!itemLabels && taskType !== 'rate'); const [guideKey, setGuideKey] = useState<string | null>(null);
  const guideOpen=useRef(guide);guideOpen.current=guide;
  useEffect(() => {
    if (!focusAnnotation || readonly || taskType !== 'label' || !annotations.some(annotation => annotation.id === focusAnnotation.id)) return;
    setGuide(false);
    setPopup({ x: Math.max(8, window.innerWidth / 2 - 170), y: 32, id: focusAnnotation.id, editing: true });
  }, [focusAnnotation?.request]);
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
  useEffect(() => { setGuide(!itemLabels && taskType !== 'rate'); setGuideKey(null); }, [taskType,itemLabels]);
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
    const outside = (event: PointerEvent) => { if (!itemLabels && menuRef.current && !menuRef.current.contains(event.target as Node) && !(event.target as Element).closest?.('mark')) close(); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && !event.defaultPrevented) {event.preventDefault();if(guideOpen.current)closeGuide();else close();} };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [itemLabels]);
  useLayoutEffect(() => {
    if (itemLabels || !popup || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    menuRef.current.style.left = `${Math.max(8, Math.min(popup.x, window.innerWidth - rect.width - 8))}px`;
    menuRef.current.style.top = `${Math.max(8, Math.min(popup.y, window.innerHeight - rect.height - 8))}px`;
  }, [popup, active?.feature,itemLabels]);
  function commit(next: Annotation[]) {
    try { C.validateAnnotations(conversation, next, rubric, { allowIncomplete: true }); setError(''); onChange(next); }
    catch (err) { setError(contextualizeAnnotationError(err, conversation, next, rubric).message); }
  }
  function update(annotation: Annotation) { commit(annotations.map(a => a.id === annotation.id ? annotation : a)); }
  function selectSourcePassage(turnId: string, start: number | null, end: number | null, rect: DOMRect) {
    if (labelReadonly) return;
    try {
      if (start === null || end === null) throw new Error('This passage could not be mapped to the conversation transcript.');
      const evidence = C.makeEvidence(conversation, turnId, start, end);
      const section=registeredSections.find(s=>s.turn_id===turnId&&s.start===start&&s.end===end);
      if(itemLabels&&conversationId&&!section)throw new Error(registeredSections.length?'This passage does not match a registered section. Reload the conversation.':'Section IDs are still loading. Please try again.');
      setPopup({ x: rect.left, y: rect.bottom + 8, evidence, sectionId:section?.section_id }); setError('');
    } catch (err) { setError((err as Error).message); }
  }
  function create(key: string) {
    if (!popup?.evidence) return;
    const evidence = popup.evidence;
    const existing = annotations.find(a => a.feature === key && a.evidence.some(e => e.turn_id === evidence.turn_id && e.start === evidence.start && e.end === evidence.end));
    const annotation = existing || C.createAnnotation(key, evidence, rubric, crypto.randomUUID());
    if(itemLabels&&popup.sectionId)annotation.section_id=popup.sectionId;
    if(!itemLabels&&!existing&&key==='examples')annotation.evidence[0].example_status='Fresh';
    if (!existing) commit([...annotations, annotation]);
    window.getSelection()?.removeAllRanges(); setPopup({ ...popup, id: annotation.id, evidence: undefined, editing: itemLabels });
  }
  function changeFeature(key: string) {
    if (!active || active.feature === key) return;
    const next = C.createAnnotation(key, active.evidence[0], rubric, active.id);
    next.section_id = active.section_id;
    next.evidence = structuredClone(active.evidence); next.entry.turn_locations = [...new Set(next.evidence.map(e => e.turn_id))];
    next.evidence.forEach((e,i)=>{if(!itemLabels&&key==='examples')e.example_status=e.example_status||(i===0?'Fresh':'Duplicate');else delete e.example_status;});
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
    catch (err) { setError(contextualizeAnnotationError(err, conversation, [next], rubric).message); }
  }
  function displayField(value: string | string[] | number | null | undefined) { return Array.isArray(value) ? value.join(', ') || 'Not provided' : String(value || 'Not provided'); }
  function listField(value: string | string[] | number | null | undefined) { return Array.isArray(value) ? value.join(', ') : ''; }
  function editHighlight(ids: string[], rect: DOMRect) {
    keepPopupOpen();
    if(itemLabels){const annotation=annotations.find(a=>a.id===ids[0]);if(annotation)setPopup({x:rect.left,y:rect.bottom+8,evidence:annotation.evidence[0],sectionId:annotation.section_id});return;}
    setPopup({ x: rect.left, y: rect.bottom + 8, ...(ids.length === 1 ? { id: ids[0] } : { ids }), editing: true });
  }
  function addSectionItem() {
    const evidence = active?.evidence[0] || annotations.find(a => popup?.ids?.includes(a.id))?.evidence[0];
    if (popup && evidence) setPopup({ x: popup.x, y: popup.y, evidence, sectionId: active?.section_id || annotations.find(a=>popup.ids?.includes(a.id))?.section_id });
  }
  const itemChoices = () => <>{[...new Set(rubric.map(f => f.category || 'Instructional features'))].map(category => <div key={category} className="item-choice-category"><h4>{category}</h4>{rubric.filter(f => (f.category || 'Instructional features') === category).map(f => <button className="choice feature-choice" key={f.key} onClick={() => create(f.key)}><LabelItemIcon item={f.key} style={{color:f.color}}/>{f.name}</button>)}</div>)}</>;
  const selectedEvidence=popup?.evidence || active?.evidence[0] || annotations.find(a=>popup?.ids?.includes(a.id))?.evidence[0];
  const selectedRecord=selectedEvidence?registeredSections.find(s=>s.turn_id===selectedEvidence.turn_id&&s.start===selectedEvidence.start&&s.end===selectedEvidence.end):undefined;
  const selectedId=popup?.sectionId||active?.section_id||selectedRecord?.section_id;
  const sectionAnnotations=selectedEvidence?annotations.filter(a=>selectedId?(a.section_id===selectedId||(!a.section_id&&a.evidence.some(e=>e.turn_id===selectedEvidence.turn_id&&e.start===selectedEvidence.start&&e.end===selectedEvidence.end))):a.evidence.some(e=>e.turn_id===selectedEvidence.turn_id&&e.start===selectedEvidence.start&&e.end===selectedEvidence.end)):[];
  function setSectionCount(key:string,count:number){
    if(labelReadonly||!selectedEvidence||!Number.isInteger(count)||count<0||count>1000)return;
    const existing=sectionAnnotations.find(a=>a.feature===key);
    if(count===0){if(existing){setUndo(structuredClone(existing));commit(annotations.filter(a=>a.id!==existing.id));}return;}
    const next=existing?structuredClone(existing):C.createAnnotation(key,selectedEvidence,rubric,crypto.randomUUID());
    if(selectedId)next.section_id=selectedId;
    next.entry.count=count;setUndo(null);
    commit(existing?annotations.map(a=>a.id===next.id?next:a):[...annotations,next]);
  }
  const guideFeature = guideKey ? rubric.find(item => item.key === guideKey) : null;
  return <div className={ratingsEnabled ? 'rating-workspace' : ''}>
    {(error || (captured.error && captured.error !== dismissedCaptureError) || (undo && !labelReadonly)) && <div className="editor-toast-stack">
      {error && <div className="editor-toast editor-toast-error" role="alert"><p>{error}</p><button type="button" aria-label="Dismiss error" onClick={() => setError('')}>×</button></div>}
      {captured.error && captured.error !== dismissedCaptureError && <div className="editor-toast editor-toast-error" role="alert"><p>{captured.error}</p><button type="button" aria-label="Dismiss capture error" onClick={() => setDismissedCaptureError(captured.error)}>×</button></div>}
      {undo && !labelReadonly && <div className="editor-toast" role="status"><p>{itemLabels?'Item label removed.':'Highlight deleted.'}</p><button type="button" className="editor-toast-action" onClick={() => { commit([...annotations, undo]); setUndo(null); }}>Undo</button><button type="button" aria-label="Dismiss deletion message" onClick={() => setUndo(null)}>×</button></div>}
    </div>}
    <div className={`annotation-layout${!itemLabels&&guide ? ' guide-open' : ''}${itemLabels&&taskType!=='rate'?' section-labeling-layout':''}`}><section className="document">
    <div className={`document-header${taskType !== 'rate' ? ' labeling-document-header' : ''}`}>
      <div className="labeling-title-row"><h2>{conversation.learning_topic || conversation.label}</h2>{itemLabels&&taskType!=='rate'&&<button ref={guideToggle} type="button" className="secondary guide-toolbar-button" onClick={()=>guide?closeGuide():setGuide(true)} aria-expanded={guide} aria-controls="coding-guide-panel">Labeling guide</button>}</div>
      {taskType !== 'rate' && <div className="feature-filter-row"><div className="feature-counts" role="list" aria-label="Feature counts">{rubric.map(item => <FeatureCountPill key={item.key} feature={item} annotations={annotations} selected={highlightFilters.includes(item.key)} onToggle={() => toggleHighlightFilter(item.key)} />)}</div>{highlightFilters.length > 0 && <button type="button" className="clear-highlight-filters" onClick={() => { close(); setHighlightFilters([]); }}>Show all highlights</button>}</div>}
    </div>
      {taskType === 'rate' ? <div className="rating-exchange" data-testid="rating-exchange" data-tutor-turn={ratedTurn} aria-live="polite">
        {exactHtml ? <div className="exact-capture rating-exact-capture"><ExactCapture html={exactHtml} conversation={conversation} annotations={[]} rubric={rubric} readonly onHighlight={() => {}} visibleTurnIds={ratingExchange.map(turn => turn.turn_id)} /></div> : captured.loading ? <div className="exact-capture rating-exact-capture"><div className="capture-layout-loading" role="status">Loading captured conversation…</div></div> : ratingExchange.map(turn => <article className={`turn ${turn.speaker}`} key={turn.turn_id} data-turn-id={turn.turn_id}><div className="turn-heading"><span className="speaker-badge">{turn.speaker === 'student' ? 'Y' : 'B'}</span><strong>{turn.speaker === 'student' ? 'You' : 'Bot'}</strong></div><div className="turn-body">{conversation.translation ? <><MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={rubric} readonly onHighlight={() => {}} />{captured.assets[turn.turn_id] && <CaptureMedia html={captured.assets[turn.turn_id]} />}</> : captured.assets[turn.turn_id] ? <CapturedTranscript html={captured.assets[turn.turn_id]} text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={rubric} readonly onHighlight={() => {}} /> : <MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={rubric} readonly onHighlight={() => {}} />}</div></article>)}
      </div> : exactHtml ? <div className="exact-capture"><ExactCapture html={exactHtml} conversation={conversation} annotations={visibleAnnotations} rubric={rubric} readonly={labelReadonly} selectedSection={selectedEvidence} assets={captured.assets} sections={registeredSections} onSections={receiveSections} onSectionSelect={selectSourcePassage} onHighlight={editHighlight} /></div> : captured.loading ? <div className="exact-capture"><div className="capture-layout-loading" role="status">Loading captured conversation…</div></div> : <div className="transcript">{conversation.messages.map(turn => <article className={`turn ${turn.speaker}`} key={turn.turn_id} data-turn-id={turn.turn_id}><div className="turn-heading"><span className="speaker-badge">{turn.speaker === 'student' ? 'Y' : 'B'}</span><strong>{turn.speaker === 'student' ? 'You' : 'Bot'}</strong></div><div className="turn-body"><MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={visibleAnnotations} rubric={rubric} readonly={labelReadonly} onHighlight={editHighlight} onHighlightLeave={leaveHighlight} selectedSection={selectedEvidence} sections={registeredSections} sectionLabels={turn.speaker === 'tutor'} turnNumber={tutorTurns.findIndex(item => item.turn_id === turn.turn_id) + 1} onSectionSelect={(start, end, rect) => selectSourcePassage(turn.turn_id, start, end, rect)} />{conversation.translation && captured.assets[turn.turn_id] && <CaptureMedia html={captured.assets[turn.turn_id]} />}</div></article>)}</div>}
    {captured.originalHtml && <OriginalCapture html={captured.originalHtml} conversation={conversation} />}
    {completionAction && taskType !== 'rate' && <div className="annotation-completion">{completionAction}</div>}
    {popup && !itemLabels && <div className="selection-menu" ref={menuRef} role="dialog" aria-label={active ? `${readonly ? 'View' : 'Edit'} ${feature(active.feature).name}` : readonly ? 'Choose a highlight to view' : 'Choose instructional feature'} onPointerDown={event => event.stopPropagation()} onMouseEnter={keepPopupOpen} style={{ left: popup.x, top: popup.y }}>
      <button className="dismiss" aria-label="Close annotation popup" onClick={close}>×</button>
      {active ? readonly ? <><h3>{feature(active.feature).name}</h3><small>Read only</small>{itemLabels && <p className="item-category-metadata">Category: {feature(active.feature).category}</p>}
        {C.formFields(feature(active.feature)).filter(field => field.key !== 'topic' && (!field.optional || hasFieldValue(active.entry[field.key]))).map(field => <div className="popup-field" key={field.key}><strong>{fieldLabel(field)}</strong><p>{displayField(active.entry[field.key])}</p></div>)}
        <details><summary>Supporting passages ({active.evidence.length})</summary>{active.evidence.map(ev => <div className="evidence" key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}{!itemLabels&&active.feature==='examples'&&` · ${ev.example_status||'Not classified'}`}</small><p>{ev.quote}</p></div>)}</details>
      </> : <><h3>{feature(active.feature).name}</h3>
        {itemLabels && <p className="item-category-metadata">Category: {feature(active.feature).category}</p>}{popup.editing && !itemLabels && <label>Instructional feature<select value={active.feature} onChange={e => changeFeature(e.target.value)}>{rubric.map(f => <option key={f.key} value={f.key} disabled={f.key === 'questions' && active.evidence.length > 1}>{f.name}</option>)}</select></label>}
        {C.formFields(feature(active.feature)).filter(field => field.key !== 'topic' && (field.key !== 'diagram_count' || ['Diagram', 'Flowchart'].includes(String(active.entry.representation_type)))).map(field => <div className="popup-field" key={field.key}><label htmlFor={`field-${field.key}`}>{fieldLabel(field)}</label>{field.numeric ? <><input id={`field-${field.key}`} type="number" min="1" max="1000" step="1" placeholder="1" value={typeof active.entry[field.key] === 'number' ? Number(active.entry[field.key]) : ''} onChange={e => setNumberField(field.key, e.target.value)} /><small>{itemLabels ? 'Number of occurrences in this section (1-1,000).' : 'Leave blank for one in this highlight.'}</small></> : field.options ? <div className="attribute-options" role="group" aria-label={fieldLabel(field)}>{field.optional && <button className="choice" aria-label={`No ${field.key.replaceAll('_', ' ')}`} aria-pressed={!active.entry[field.key]} onClick={() => setField(field.key, '')}>Not specified</button>}{field.options.map(value => <button className="choice" key={value} aria-label={value} aria-pressed={active.entry[field.key] === value} onClick={() => setField(field.key, value)}>{value}{optionExplanation(feature(active.feature), field.key, value) && <small><RichText text={optionExplanation(feature(active.feature), field.key, value)!} /></small>}</button>)}</div> : field.multiple ? <><textarea id={`field-${field.key}`} rows={2} placeholder={field.key === 'image_languages' ? 'en, ta' : 'One item, another item'} value={listDraft?.id === active.id && listDraft.key === field.key ? listDraft.value : listField(active.entry[field.key])} onChange={e => setListDraft({ id: active.id, key: field.key, value: e.target.value })} onBlur={e => commitListField(field.key, e.target.value)} /><small>{field.key === 'image_languages' ? 'Comma-separated BCP 47 language tags. Use zxx for no written language or und when text is unreadable.' : 'Separate items with commas.'}</small></> : <textarea id={`field-${field.key}`} rows={2} value={String(active.entry[field.key] || '')} onChange={e => setField(field.key, e.target.value)} />}</div>)}
        <small>{C.missingAttributes(active, rubric).length ? `Required before completion: ${missingFieldLabels(active, C.missingAttributes(active, rubric), rubric).join(', ')}` : 'Changes save automatically.'}</small>
        {!itemLabels&&active.feature==='examples'&&<fieldset><legend>Example occurrence</legend>{active.evidence.map((ev,i)=><label key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}: {ev.quote.slice(0,100)}</small><select aria-label={`Example status for passage ${i+1}`} value={ev.example_status||''} onChange={event=>{const next=structuredClone(active);next.evidence[i].example_status=event.target.value as 'Fresh'|'Duplicate';update(next);}}><option value="" disabled>Not classified</option><option value="Fresh">Fresh</option><option value="Duplicate">Duplicate</option></select></label>)}</fieldset>}
        {(popup.editing || itemLabels) && <><details><summary>Supporting passages ({active.evidence.length})</summary>{active.evidence.map((ev, i) => <div className="evidence" key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}</small><p>{ev.quote}</p>{active.evidence.length > 1 && <button className="secondary" onClick={() => { const next = structuredClone(active); next.evidence.splice(i, 1); next.entry.turn_locations = [...new Set(next.evidence.map(e => e.turn_id))]; const primary = feature(next.feature).fields[0].key; if (next.entry[primary] === ev.quote) next.entry[primary] = next.evidence[0].quote; update(next); }}>Remove passage</button>}</div>)}</details><button className="danger" onClick={() => { setUndo(structuredClone(active)); commit(annotations.filter(a => a.id !== active.id)); close(); }}>{itemLabels ? 'Delete item' : 'Delete highlight'}</button>{itemLabels && <button className="secondary" onClick={addSectionItem}>Add item</button>}</>}
      </> : popup.ids ? <><h3>Choose a highlight to {readonly ? 'view' : 'edit'}</h3>{popup.ids.map(id => { const a = annotations.find(item => item.id === id)!; return <button className="choice" key={id} onClick={() => setPopup({ ...popup, id, ids: undefined })}>{feature(a.feature).name}{itemLabels && ` \u00d7 ${a.entry.count}`}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>; })}{itemLabels && !readonly && <button className="secondary" onClick={addSectionItem}>Add item</button>}</> : popup.extend ? <><h3>Add supporting passage</h3>{annotations.filter(a => a.feature !== 'questions').map(a => <button className="choice" key={a.id} onClick={() => { const next = C.addEvidence(structuredClone(a), { ...popup.evidence!, ...(a.feature==='examples'?{example_status:'Duplicate' as const}:{}) }); update(next); window.getSelection()?.removeAllRanges(); setPopup({ ...popup, id: a.id, evidence: undefined, extend: false, editing: true }); }}>{feature(a.feature).name}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>)}</> : <><h3>Annotate as</h3>{itemChoices()}{!itemLabels && annotations.some(a => a.feature !== 'questions') && <button className="text-button" onClick={() => setPopup({ ...popup, extend: true })}>Add passage to an existing entry</button>}</>}
    </div>}
  </section>
    {itemLabels&&taskType!=='rate'&&<SectionLabelPanel rubric={rubric} selection={selectedEvidence} sectionId={selectedId} title={selectedRecord?`Turn ${selectedRecord.turn_number} - Section ${selectedRecord.section_number}`:undefined} annotations={sectionAnnotations} readonly={labelReadonly} onCount={setSectionCount} onClose={close}/>}
    {taskType !== 'rate' && !itemLabels && <button ref={guideToggle} className="guide-floating-button secondary" onClick={() => guide ? closeGuide() : setGuide(true)} aria-expanded={guide} aria-controls="coding-guide-panel">Labeling guide</button>}
    {taskType !== 'rate' && guide && createPortal(<aside className="coding-guide-panel" id="coding-guide-panel" aria-labelledby="coding-guide-title">
      <div className="coding-guide-heading"><h2 id="coding-guide-title">Labeling guide</h2><button className="dismiss" aria-label="Close labeling guide" onClick={closeGuide}>×</button></div>
      <div ref={guideContent} className="coding-guide-content">{guideFeature ? <div className="coding-guide-detail"><button ref={guideBackButton} type="button" className="coding-guide-back secondary" onClick={() => setGuideKey(null)}>← All features</button><h3>{guideFeature.name}</h3><p><RichText text={guideDescription(guideFeature)} /></p>{!guideFeature.category && guideCopy[guideFeature.key] ? <><ul>{guideCopy[guideFeature.key].tips.map(tip => <li key={tip}>{tip}</li>)}</ul>{guideChoices(guideFeature).length > 0 && <section className="coding-guide-choices" aria-label="Available choices"><h4>Available choices</h4>{guideChoices(guideFeature).map(field => <p key={field.label}><strong>{field.label}:</strong> {field.options.join(' · ')}</p>)}{guideFeature.key === 'examples' && <p><strong>Example occurrence:</strong> Fresh · Duplicate</p>}</section>}<p className="coding-guide-example"><strong>Example</strong><br />{guideCopy[guideFeature.key].example}</p></> : <div><RichText text={guideFeature.guidance} /></div>}</div> : <div className="coding-guide-list">{rubric.map((item, index) => <button ref={index === 0 ? guideFirstItem : undefined} type="button" className="coding-guide-item" key={item.key} onClick={() => setGuideKey(item.key)}><span className="coding-guide-item-title"><LabelItemIcon item={item.key} style={{color:item.color}}/><strong>{item.name}</strong></span><span className="coding-guide-item-summary"><RichText text={guideDescription(item)} /></span></button>)}</div>}</div>
    </aside>, document.body)}
  </div>{ratingsEnabled && <div ref={ratingsPanel} className="rating-sidebar"><TurnRatingsPanel conversation={conversation} rubric={snapshot} ratings={turnRatings} turnId={ratedTurn} turnIndex={ratedTurnIndex} readonly={readonly} onTurn={chooseRatedTurn} onChange={onRatingsChange} onFinish={onFinish} /></div>}</div>;
}
