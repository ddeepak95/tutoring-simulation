import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { C } from './lib';
import type { Annotation, Conversation, Evidence, Feature, RubricSnapshot } from './types';
import { MarkdownTranscript } from './MarkdownTranscript';
import { selectedSourceRange } from './markdown-source';

function RichText({ text }: { text: string }) {
  return <>{text.split(/(<br><br>|<br>|\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => part === '<br><br>' ? <span key={i}><br /><br /></span> : part === '<br>' ? <br key={i} /> : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part)}</>;
}
interface Props { conversation: Conversation; rubric: RubricSnapshot; annotations: Annotation[]; onChange: (annotations: Annotation[]) => void; readonly?: boolean; completionAction?: ReactNode; }
function optionExplanation(feature: Feature, key: string, value: string) {
  const text = feature.guidance.split(`**${value}:**`)[1];
  if (!text) return null;
  if (key === 'detail_level') return text.split(/\*\*(?:Brief|Explained|Elaborated):\*\*|<br><br>/)[0].trim().split(', for example,')[0].split(' These are')[0];
  if (key === 'question_type') return text.trim().split('. ')[0] + '.';
  return null;
}
export function Editor({ conversation, rubric: snapshot, annotations, onChange, readonly = false, completionAction }: Props) {
  const rubric = snapshot.rubric;
  const [popup, setPopup] = useState<{ x: number; y: number; evidence?: Evidence; ids?: string[]; id?: string; extend?: boolean; editing?: boolean } | null>(null);
  const [guide, setGuide] = useState(false); const [guideKey, setGuideKey] = useState(rubric[0].key);
  const [error, setError] = useState(''); const [undo, setUndo] = useState<Annotation | null>(null);
  const menuRef = useRef<HTMLDivElement>(null); const transcript = useRef<HTMLDivElement>(null);
  const guideToggle = useRef<HTMLButtonElement>(null);
  const feature = (key: string) => rubric.find(f => f.key === key)!;
  const active = annotations.find(a => a.id === popup?.id);
  const close = () => setPopup(null);
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
  function selectPassage() {
    if (readonly) return;
    const selection = window.getSelection(); if (!selection || selection.isCollapsed || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const ancestor = (node: Node) => (node.nodeType === Node.ELEMENT_NODE ? node as Element : node.parentElement)?.closest<HTMLElement>('[data-turn-id]');
    const start = ancestor(range.startContainer), end = ancestor(range.endContainer);
    if (!start || start !== end || start.dataset.speaker !== 'tutor' || !transcript.current?.contains(start)) { setError('Select a passage within one tutor turn.'); return; }
    try {
      const offsets = selectedSourceRange(start, range);
      const evidence = C.makeEvidence(conversation, start.dataset.turnId!, offsets.start, offsets.end);
      const rect = range.getBoundingClientRect(); setPopup({ x: rect.left, y: rect.bottom + 8, evidence }); setError('');
    } catch (err) { setError((err as Error).message); }
  }
  function create(key: string) {
    if (!popup?.evidence) return;
    const evidence = popup.evidence;
    const existing = annotations.find(a => a.feature === key && a.evidence.some(e => e.turn_id === evidence.turn_id && e.start === evidence.start && e.end === evidence.end));
    const annotation = existing || C.createAnnotation(key, evidence, rubric, crypto.randomUUID());
    if (!existing) commit([...annotations, annotation]);
    window.getSelection()?.removeAllRanges(); setPopup({ ...popup, id: annotation.id, evidence: undefined, editing: false });
  }
  function changeFeature(key: string) {
    if (!active || active.feature === key) return;
    const next = C.createAnnotation(key, active.evidence[0], rubric, active.id);
    next.evidence = structuredClone(active.evidence); next.entry.turn_locations = [...new Set(next.evidence.map(e => e.turn_id))];
    for (const field of C.formFields(feature(key))) {
      const value = active.entry[field.key]; if (typeof value === 'string' && (!field.options || field.options.includes(value))) next.entry[field.key] = value;
    }
    update(next);
  }
  function setField(key: string, value: string) {
    if (!active) return; const next = structuredClone(active); next.entry[key] = value;
    if (next.feature === 'questions' && next.entry.question_type === 'Instructional') next.entry.concept_checked = null;
    update(next); if (!popup?.editing && !C.missingAttributes(next, rubric).length) close();
  }
  function editHighlight(ids: string[], rect: DOMRect) {
    if (readonly || window.getSelection()?.toString()) return;
    setPopup({ x: rect.left, y: rect.bottom + 8, ...(ids.length === 1 ? { id: ids[0] } : { ids }), editing: true });
  }
  const guideFeature = feature(guideKey);
  return <div className={`annotation-layout${guide ? ' guide-open' : ''}`}><section className="document">
    <div className="document-header"><h2>{conversation.learning_topic || conversation.label}</h2></div>
    {error && <p className="error" role="alert">{error}</p>}
    {undo && !readonly && <p className="notice">Highlight deleted. <button className="text-button" onClick={() => { commit([...annotations, undo]); setUndo(null); }}>Undo</button></p>}
    <div className="transcript" ref={transcript} onMouseUp={selectPassage} onKeyUp={event => { if (event.key === 'Shift') selectPassage(); }} onTouchEnd={() => setTimeout(selectPassage, 50)}>
      {conversation.messages.map(turn => <article className={`turn ${turn.speaker}`} key={turn.turn_id}>
        <div className="turn-heading"><span className="speaker-badge">{turn.speaker === 'tutor' ? 'T' : 'S'}</span><strong>{turn.speaker === 'tutor' ? 'Tutor' : 'Student'}</strong><span>{turn.turn_id}</span></div>
        <div className="turn-body" data-turn-id={turn.turn_id} data-speaker={turn.speaker}><MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={annotations} rubric={rubric} readonly={readonly} onHighlight={editHighlight} /></div>
      </article>)}
    </div>
    {completionAction && <div className="annotation-completion">{completionAction}</div>}
    {popup && !readonly && <div className="selection-menu" ref={menuRef} role="dialog" aria-label={active ? `Edit ${feature(active.feature).name}` : 'Choose instructional feature'} style={{ left: popup.x, top: popup.y }}>
      <button className="dismiss" aria-label="Close annotation popup" onClick={close}>×</button>
      {active ? <><h3>{feature(active.feature).name}</h3>
        {popup.editing && <label>Instructional feature<select value={active.feature} onChange={e => changeFeature(e.target.value)}>{rubric.map(f => <option key={f.key} value={f.key} disabled={f.key === 'questions' && active.evidence.length > 1}>{f.name}</option>)}</select></label>}
        {C.formFields(feature(active.feature)).map(field => <div className="popup-field" key={field.key}><label htmlFor={`field-${field.key}`}>{field.label}</label>{field.options ? <div className="attribute-options" role="group" aria-label={field.label}>{field.options.map(value => <button className="choice" key={value} aria-label={value} aria-pressed={active.entry[field.key] === value} onClick={() => setField(field.key, value)}>{value}{optionExplanation(feature(active.feature), field.key, value) && <small><RichText text={optionExplanation(feature(active.feature), field.key, value)!} /></small>}</button>)}</div> : <textarea id={`field-${field.key}`} rows={2} value={String(active.entry[field.key] || '')} onChange={e => setField(field.key, e.target.value)} />}</div>)}
        <small>{C.missingAttributes(active, rubric).length ? 'Details needed: ' + C.missingAttributes(active, rubric).join(', ').replaceAll('_', ' ') : 'Changes save automatically.'}</small>
        {popup.editing && <><details><summary>Supporting passages ({active.evidence.length})</summary>{active.evidence.map((ev, i) => <div className="evidence" key={`${ev.turn_id}-${ev.start}`}><small>{ev.turn_id}</small><p>{ev.quote}</p>{active.evidence.length > 1 && <button className="secondary" onClick={() => { const next = structuredClone(active); next.evidence.splice(i, 1); next.entry.turn_locations = [...new Set(next.evidence.map(e => e.turn_id))]; const primary = feature(next.feature).fields[0].key; if (next.entry[primary] === ev.quote) next.entry[primary] = next.evidence[0].quote; update(next); }}>Remove passage</button>}</div>)}</details><button className="danger" onClick={() => { setUndo(structuredClone(active)); commit(annotations.filter(a => a.id !== active.id)); close(); }}>Delete highlight</button></>}
      </> : popup.ids ? <><h3>Choose a highlight to edit</h3>{popup.ids.map(id => { const a = annotations.find(item => item.id === id)!; return <button className="choice" key={id} onClick={() => setPopup({ ...popup, id, ids: undefined })}>{feature(a.feature).name}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>; })}</> : popup.extend ? <><h3>Add supporting passage</h3>{annotations.filter(a => a.feature !== 'questions').map(a => <button className="choice" key={a.id} onClick={() => { const next = C.addEvidence(structuredClone(a), popup.evidence!); update(next); window.getSelection()?.removeAllRanges(); setPopup({ ...popup, id: a.id, evidence: undefined, extend: false, editing: true }); }}>{feature(a.feature).name}<small>{a.evidence[0].quote.slice(0, 100)}</small></button>)}</> : <><h3>Annotate as</h3>{rubric.map(f => <button className="choice feature-choice" key={f.key} onClick={() => create(f.key)}><i style={{ background: f.color }} />{f.name}</button>)}{annotations.some(a => a.feature !== 'questions') && <button className="text-button" onClick={() => setPopup({ ...popup, extend: true })}>Add passage to an existing entry</button>}</>}
    </div>}
  </section>
    <button ref={guideToggle} className="guide-floating-button secondary" onClick={() => setGuide(!guide)} aria-expanded={guide} aria-controls="coding-guide-panel">Coding guide</button>
    {guide && <aside className="coding-guide-panel" id="coding-guide-panel" aria-labelledby="coding-guide-title">
      <div className="coding-guide-heading"><h2 id="coding-guide-title">Coding guide</h2><button className="dismiss" aria-label="Close coding guide" onClick={closeGuide}>×</button></div>
      <div className="coding-guide-content"><label htmlFor="guide-feature">Feature</label><select id="guide-feature" value={guideKey} onChange={e => setGuideKey(e.target.value)}>{rubric.map(f => <option key={f.key} value={f.key}>{f.name}</option>)}</select><h3>{guideFeature.name}</h3><p><RichText text={guideFeature.description} /></p><div><RichText text={guideFeature.guidance} /></div></div>
    </aside>}
  </div>;
}
