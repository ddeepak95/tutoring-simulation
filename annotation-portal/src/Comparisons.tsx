import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { download, fetchAllRows, supabase } from './lib';
import type { Conversation, DocumentRow, Profile } from './types';
import questions from './generated/comparison-questions.json';
import { comparisonComplete, comparisonQuestions, comparisonRounds, overallComparisonQuestions, type ComparisonAnswer, type ComparisonAssignment, type ComparisonChoice, type ComparisonRound } from './comparison';
import { MarkdownTranscript } from './MarkdownTranscript';
import { CapturedTranscript, useCaptureAssets, captureAssetsForExport } from './CapturedTranscript';
import './comparisons.css';
import { ResetComparison } from './ResetComparison';

const message = (error: unknown) => (error as { message?: string })?.message || String(error);
const statusText = (status: string) => ({ not_started: 'Not started', in_progress: 'In progress', submitted: 'Submitted' })[status] || status;
const emptyAnswer = (): ComparisonAnswer => ({ values: {}, notes: '' });

export function Comparisons({ profile, embedded = false }: { profile: Profile; embedded?: boolean }) {
  const Container = embedded ? 'section' : 'main';
  const location = useLocation();
  const compareHeading = useRef<HTMLHeadingElement>(null);
  const [rows, setRows] = useState<ComparisonAssignment[]>([]);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [a, setA] = useState(''); const [b, setB] = useState(''); const [annotator, setAnnotator] = useState('');
  const [search, setSearch] = useState(''); const [error, setError] = useState('');
  const [notice, setNotice] = useState(''); const [busy, setBusy] = useState(false); const [loading, setLoading] = useState(true);
  async function refresh() {
    setError('');
    try {
      const [assignments, docs, people] = await Promise.all([
        fetchAllRows<ComparisonAssignment>('comparison_assignments', profile.role === 'admin' ? '*, profiles!comparison_assignments_annotator_id_fkey(id, username, role)' : '*'),
        fetchAllRows<DocumentRow>('conversations'),
        profile.role === 'admin' ? fetchAllRows<Profile>('profiles') : Promise.resolve([]),
      ]);
      setRows(assignments.sort((a, b) => b.updated_at.localeCompare(a.updated_at))); setDocuments(docs); setUsers(people.filter(user => user.role === 'annotator'));
    } catch (err) { setError(message(err)); } finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, [profile.id]);
  useEffect(() => {
    if (!embedded || loading || location.hash !== '#compare') return;
    const frame = requestAnimationFrame(() => {
      compareHeading.current?.scrollIntoView({ block: 'start' });
      compareHeading.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [embedded, loading, location.hash]);
  const docA = documents.find(doc => doc.id === a), docB = documents.find(doc => doc.id === b);
  const countA = docA ? comparisonRounds(docA.transcript).length : 0, countB = docB ? comparisonRounds(docB.transcript).length : 0;
  const validPair = Boolean(a && b && a !== b && countA > 0 && countA === countB);
  const label = (doc: DocumentRow) => `${doc.label} · ${doc.language} · ${doc.id}`;
  const options = documents.filter(doc => `${doc.label} ${doc.language} ${doc.transcript.learning_topic || ''} ${doc.id}`.toLowerCase().includes(search.toLowerCase()));
  async function create(event: FormEvent) {
    event.preventDefault(); if (busy || !validPair || !annotator) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const { error } = await supabase!.rpc('create_comparison_assignment', { p_conversation_a_id: a, p_conversation_b_id: b, p_annotator_id: annotator, p_questions: questions });
      if (error) throw error;
      setNotice('Comparison assigned. Existing work for this pair and annotator is preserved.'); await refresh();
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  return <Container className={embedded ? "dashboard-compare" : "dashboard comparisons-page"} aria-label={embedded ? "Compare" : undefined}><div className="page-heading">{embedded ? <h1 id="compare" ref={compareHeading} tabIndex={-1}>Compare</h1> : <div><span className="eyebrow">COMPARISON MODE</span><h1>{profile.role === 'admin' ? 'Conversation comparisons' : 'Your comparisons'}</h1><p>Compare tutor responses one turn at a time using the existing rating questions.</p></div>}{!embedded && <button className="secondary" disabled={busy || loading} onClick={() => void refresh()}>Refresh</button>}</div>
    {error && <p className="error" role="alert">{error}</p>}{notice && <p className="notice" role="status">{notice}</p>}
    {profile.role === 'admin' && <form className="card comparison-create" onSubmit={create}><h2>Assign a comparison</h2><label>Filter conversations<input value={search} onChange={event => setSearch(event.target.value)} placeholder="Topic, language, label, or ID" /></label><div className="comparison-columns">{(['a', 'b'] as const).map(side => {
      const selected = side === 'a' ? a : b; const selectedDoc = side === 'a' ? docA : docB;
      const choices = selectedDoc && !options.some(doc => doc.id === selected) ? [selectedDoc, ...options] : options;
      return <label key={side}>Conversation {side.toUpperCase()}<select aria-label={`Conversation ${side.toUpperCase()}`} required disabled={busy || loading} value={selected} onChange={event => side === 'a' ? setA(event.target.value) : setB(event.target.value)}><option value="">Select a conversation</option>{choices.map(doc => <option key={doc.id} value={doc.id}>{label(doc)}</option>)}</select>{selectedDoc && <small>{selectedDoc.transcript.learning_topic} · {comparisonRounds(selectedDoc.transcript).length} tutor turns</small>}</label>;
    })}</div><label>Annotator<select aria-label="Annotator" required disabled={busy || loading} value={annotator} onChange={event => setAnnotator(event.target.value)}><option value="">Select an annotator</option>{users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}</select></label>
      {a && b && !validPair && <p className="error">Choose two different conversations with the same nonzero number of tutor turns.</p>}<p>Turns are paired in order. Select conversations covering the same topic. Annotators see anonymous labels A and B.</p><button className="primary" disabled={busy || loading || !validPair || !annotator}>{busy ? 'Assigning…' : 'Assign comparison'}</button></form>}
    {loading ? <p role="status">Loading comparisons…</p> : <section className={embedded ? undefined : "card"}><div className="progress-heading">{!embedded && <h2>Comparison assignments</h2>}{profile.role === 'admin' && <button className="secondary" onClick={() => void (async () => { try { const capture_assets = await captureAssetsForExport(); download('study-comparisons.json', { format_version: 'annotation-portal-comparisons/1.0', exported_at: new Date().toISOString(), capture_assets, assignments: rows.map(row => ({ ...row, conversation_a: documents.find(doc => doc.id === row.conversation_a_id)?.transcript, conversation_b: documents.find(doc => doc.id === row.conversation_b_id)?.transcript })) }); } catch (failure) { setError(message(failure)); } })()}>Export comparisons</button>}</div>{!rows.length ? <p className="empty">No comparison assignments yet.</p> : <ul className="assignment-list">{rows.map(row => <li key={row.id}><Link className="assignment-row" to={`/comparisons/${row.id}`}><div className="assignment-row-content"><h3>{profile.role === 'admin' ? `${documents.find(doc => doc.id === row.conversation_a_id)?.label || 'Conversation A'} / ${documents.find(doc => doc.id === row.conversation_b_id)?.label || 'Conversation B'}` : documents.find(doc => doc.id === row.conversation_a_id)?.transcript.learning_topic || 'Tutor response comparison'}</h3><div className="assignment-row-meta">{profile.role === 'admin' && <span>{row.profiles?.username}</span>}<span>{row.answers.length} turns compared</span></div></div><span className={`status ${row.status}`}>{statusText(row.status)}</span><span className="primary assignment-open">Open</span></Link></li>)}</ul>}</section>}
  </Container>;
}

function SelectionTick() {
  return <span className="comparison-selection-feedback" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" /><path d="M13 24l8 8 15-16" /></svg></span>;
}

function TranscriptRound({ conversation, round, side, selectable, selected, confirming, onChoose }: { conversation: Conversation; round: ComparisonRound; side: 'A' | 'B'; selectable: boolean; selected: boolean; confirming: boolean; onChoose: () => void }) {
  const captured = useCaptureAssets(conversation);
  return <section className={`card comparison-transcript${selectable ? ' selectable' : ''}${selected ? ' selected' : ''}`}
    role={selectable ? 'button' : 'region'} tabIndex={selectable ? 0 : undefined}
    aria-label={selectable ? `Choose conversation ${side}` : `Conversation ${side}`} aria-pressed={selectable ? selected : undefined}
    onClick={event => {
      if (!selectable || event.detail > 1 || (event.target as HTMLElement).closest('a, input, button, summary') || window.getSelection()?.toString()) return;
      onChoose();
    }} onKeyDown={event => {
      if (selectable && event.target === event.currentTarget && !event.repeat && ['Enter', ' '].includes(event.key)) { event.preventDefault(); onChoose(); }
    }}>
    {confirming && <SelectionTick />}
    {captured.error && <p className="notice">{captured.error}</p>}
    <div className="comparison-scroll" tabIndex={0} role="region" aria-label={`Conversation ${side} transcript`}>
      {[...round.students, round.tutor].map(turn => <article className={`comparison-message ${turn.speaker}`} key={turn.turn_id}><strong>{turn.speaker === 'student' ? 'Student response' : 'Tutor response'}</strong><div className="markdown-body"><>{captured.assets[turn.turn_id] ? <CapturedTranscript html={captured.assets[turn.turn_id]} text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={[]} readonly onHighlight={() => {}} /> : <MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={[]} rubric={[]} readonly onHighlight={() => {}} />}</></div></article>)}
    </div>
  </section>;
}

function RoundForm({ conversationA, conversationB, assignment, index, saved, busy, editable, last, roundA, roundB, onSave }: { conversationA: Conversation; conversationB: Conversation; assignment: ComparisonAssignment; index: number; saved?: ComparisonAnswer; busy: boolean; editable: boolean; last: boolean; roundA: ComparisonRound; roundB: ComparisonRound; onSave: (answer: ComparisonAnswer) => Promise<void> }) {
  const draftKey = `annotation-portal:comparison:${assignment.annotator_id}:${assignment.id}:${assignment.revision}`;
  const [storageError, setStorageError] = useState('');
  const [answer, setAnswer] = useState<ComparisonAnswer>(() => {
    if (saved) return saved;
    if (!editable) return emptyAnswer();
    try {
      const cached = JSON.parse(localStorage.getItem(draftKey) || 'null');
      if (cached && typeof cached.notes === 'string' && cached.values && typeof cached.values === 'object' && !Array.isArray(cached.values) && Object.entries(cached.values).every(([key, value]) => comparisonQuestions(assignment.questions, index).some(q => q.key === key) && ['a', 'b', 'tie'].includes(value as string))) return cached;
    } catch { /* Invalid local drafts do not replace cloud work. */ }
    return emptyAnswer();
  });
  const activeQuestions = comparisonQuestions(assignment.questions, index);
  const [questionIndex, setQuestionIndex] = useState(() => {
    const missing = activeQuestions.findIndex(question => !answer.values[question.key]);
    return missing < 0 ? activeQuestions.length : missing;
  });
  const question = activeQuestions[questionIndex];
  const [confirmation, setConfirmation] = useState<ComparisonChoice | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (advanceTimer.current !== null) clearTimeout(advanceTimer.current); }, []);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!editable) return;
    if (question) questionHeading.current?.focus({ preventScroll: true });
    else {
      reviewHeading.current?.focus({ preventScroll: true });
      reviewHeading.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }, [questionIndex, editable, question]);
  function change(next: ComparisonAnswer) {
    setAnswer(next);
    try { localStorage.setItem(draftKey, JSON.stringify(next)); setStorageError(''); }
    catch { setStorageError('Local draft storage is unavailable. Save this turn before leaving.'); }
  }
  function choose(choice: ComparisonChoice) {
    if (!editable || busy || !question || advanceTimer.current !== null) return;
    change({ ...answer, values: { ...answer.values, [question.key]: choice } });
    setConfirmation(choice);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      setConfirmation(null);
      setQuestionIndex(current => current + 1);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 420);
  }
  async function submit(event: FormEvent) { event.preventDefault(); if (!busy && editable && comparisonComplete(answer, assignment.questions, index)) await onSave(answer); }
  const selectable = editable && !busy && Boolean(question) && confirmation === null;
  return <form className="comparison-ratings" onSubmit={submit}>
    {!saved && <div key={questionIndex} className="card comparison-question comparison-question-enter" aria-live="polite">
      {question ? <><span className="eyebrow">Question {questionIndex + 1} of {activeQuestions.length} · {question.label}</span><h3 ref={questionHeading} tabIndex={-1}>{question.description}</h3><details><summary>Judging guidance</summary><p>{question.guidance}</p></details>{questionIndex > 0 && editable && <button className="text-button" type="button" disabled={busy || confirmation !== null} onClick={() => setQuestionIndex(current => current - 1)}>Previous question</button>}</> : <><h3 ref={questionHeading} tabIndex={-1}>All questions answered</h3><p>Review your choices and save this turn to continue.</p>{editable && <button type="button" className="secondary" disabled={busy || confirmation !== null} onClick={() => setQuestionIndex(activeQuestions.length - 1)}>Previous question</button>}</>}
    </div>}
    <div className="comparison-choice-grid"><TranscriptRound conversation={conversationA} round={roundA} side="A" confirming={confirmation === 'a'} selectable={selectable} selected={Boolean(question && answer.values[question.key] === 'a')} onChoose={() => choose('a')} />{saved ? <span aria-hidden="true" /> : <button className="comparison-tie" type="button" aria-label="Tie / equally good" title="Tie / equally good" aria-pressed={Boolean(question && answer.values[question.key] === 'tie')} disabled={!selectable} onClick={() => choose('tie')}>{confirmation === 'tie' && <SelectionTick />}<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 9h14M5 15h14" /></svg></button>}<TranscriptRound conversation={conversationB} round={roundB} side="B" confirming={confirmation === 'b'} selectable={selectable} selected={Boolean(question && answer.values[question.key] === 'b')} onChoose={() => choose('b')} /></div>
    {(saved || !question) && <div className="card comparison-review"><h3 ref={reviewHeading} tabIndex={-1}>{saved ? 'Saved comparison' : 'Review your choices'}</h3><dl>{activeQuestions.map((item, itemIndex) => <div key={item.key}><dt>{item.label}</dt><dd>{({ a: 'A is better', b: 'B is better', tie: 'Tie / equally good' })[answer.values[item.key]] || 'Not answered'}{editable && <button className="text-button" type="button" disabled={busy} aria-label={`Change answer for ${item.label}`} onClick={() => setQuestionIndex(itemIndex)}>Change</button>}</dd></div>)}</dl><label>Notes (optional)<textarea disabled={busy || !editable} value={answer.notes} onChange={event => change({ ...answer, notes: event.target.value })} /></label>{editable && <button className="primary" disabled={busy || !comparisonComplete(answer, assignment.questions, index)}>{busy ? 'Saving…' : last ? 'Save comparison and finish' : 'Save comparison and continue'}</button>}</div>}
    {storageError && <p className="error" role="alert">{storageError}</p>}
  </form>;
}

function OverallComparisonForm({ assignment, editable, busy, onSave }: { assignment: ComparisonAssignment; editable: boolean; busy: boolean; onSave: (answer: ComparisonAnswer) => Promise<void> }) {
  const questions = overallComparisonQuestions(assignment.questions);
  const draftKey = `annotation-portal:comparison-overall:${assignment.annotator_id}:${assignment.id}:${assignment.revision}`;
  const [storageError, setStorageError] = useState('');
  const [answer, setAnswer] = useState<ComparisonAnswer>(() => {
    if (assignment.overall_answer) return assignment.overall_answer;
    if (editable) {
      try {
        const cached = JSON.parse(localStorage.getItem(draftKey) || 'null');
        if (cached && typeof cached.notes === 'string' && cached.values && typeof cached.values === 'object' && !Array.isArray(cached.values) && Object.entries(cached.values).every(([key, value]) => questions.some(q => q.key === key) && ['a', 'b', 'tie'].includes(value as string))) return cached;
      } catch { /* Keep cloud data if a local draft is unreadable. */ }
    }
    return emptyAnswer();
  });
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!editable) return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [editable]);
  function change(next: ComparisonAnswer) {
    setAnswer(next);
    try { localStorage.setItem(draftKey, JSON.stringify(next)); setStorageError(''); }
    catch { setStorageError('Local draft storage is unavailable. Save the overall comparison before leaving.'); }
  }
  const complete = questions.every(q => ['a', 'b', 'tie'].includes(answer.values[q.key]));
  return <form className="card comparison-overall" aria-labelledby="overall-heading" onSubmit={event => { event.preventDefault(); if (editable && !busy && complete) void onSave(answer); }}>
    <h2 id="overall-heading" ref={heading} tabIndex={-1}>Overall conversation</h2>
    <p>All turns have been compared. Consider the complete conversations for these final two questions.</p>
    {questions.map(question => <fieldset key={question.key} disabled={!editable || busy}><legend>{question.description}</legend><div className="overall-options">{(['a', 'b', 'tie'] as const).map(choice => <label className="overall-option" key={choice}><input type="radio" name={question.key} value={choice} checked={answer.values[question.key] === choice} onChange={() => change({ ...answer, values: { ...answer.values, [question.key]: choice } })} />{({ a: 'A is better', b: 'B is better', tie: 'Tie / equally good' })[choice]}</label>)}</div></fieldset>)}
    <label>Overall notes (optional)<textarea disabled={!editable || busy} value={answer.notes} onChange={event => change({ ...answer, notes: event.target.value })} /></label>
    {storageError && <p className="error" role="alert">{storageError}</p>}
    {editable && <button className="primary" disabled={busy || !complete}>{busy ? 'Saving?' : 'Save overall comparison and finish'}</button>}
  </form>;
}

export function ComparisonEditor({ profile }: { profile: Profile }) {
  const { id } = useParams();
  const backTo = profile.role === 'admin' ? '/comparisons' : '/#compare';
  const [assignment, setAssignment] = useState<ComparisonAssignment | null>(null);
  const [a, setA] = useState<DocumentRow | null>(null); const [b, setB] = useState<DocumentRow | null>(null);
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false); const [reload, setReload] = useState(0);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetGeneration, setResetGeneration] = useState(0);
  const nextHeading = useRef<HTMLElement>(null);
  useEffect(() => {
    let alive = true; setAssignment(null); setA(null); setB(null); setError('');
    void (async () => {
      try {
        const { data, error } = await supabase!.from('comparison_assignments').select('*').eq('id', id).single(); if (error) throw error;
        const row = data as ComparisonAssignment;
        const { data: docs, error: docsError } = await supabase!.from('conversations').select('*').in('id', [row.conversation_a_id, row.conversation_b_id]); if (docsError) throw docsError;
        const docA = docs.find(doc => doc.id === row.conversation_a_id) as DocumentRow | undefined, docB = docs.find(doc => doc.id === row.conversation_b_id) as DocumentRow | undefined;
        if (!docA || !docB) throw new Error('Could not load both conversations.');
        if (alive) { setAssignment(row); setA(docA); setB(docB); }
      } catch (err) { if (alive) setError(message(err)); }
    })(); return () => { alive = false; };
  }, [id, reload]);
  useEffect(() => { nextHeading.current?.focus(); }, [assignment?.answers.length]);
  async function resetResponses() {
    if (!assignment || profile.role !== 'admin') throw new Error('Admin access required.');
    const { data, error } = await supabase!.rpc('reset_comparison_assignment', { p_assignment_id: assignment.id, p_revision: assignment.revision, p_questions: questions });
    if (error) throw new Error(error.message);
    if (data?.id !== assignment.id || data.revision !== assignment.revision + 1 || data.status !== 'not_started' || data.answers?.length !== 0 || data.overall_answer !== null) throw new Error('Could not confirm reset. Reload the comparison before trying again.');
    setAssignment(data as ComparisonAssignment);
    setResetGeneration(value => value + 1);
    setError('');
  }
  async function save(answer: ComparisonAnswer, overall = false) {
    if (!assignment || busy) return;
    setBusy(true); setError('');
    try {
      const { data, error } = await supabase!.rpc(overall ? 'save_comparison_overall' : 'save_comparison_round', { p_assignment_id: assignment.id, p_revision: assignment.revision, ...(!overall ? { p_round: assignment.answers.length } : {}), p_answer: answer });
      if (error) throw error;
      try { localStorage.removeItem(`annotation-portal:${overall ? 'comparison-overall' : 'comparison'}:${assignment.annotator_id}:${assignment.id}:${assignment.revision}`); } catch { /* Cloud save succeeded. */ }
      setAssignment(data as ComparisonAssignment);
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  if (!assignment || !a || !b) return <main className="center">{error ? <p className="error" role="alert">{error}</p> : <p role="status">Loading comparison…</p>}<Link to={backTo}>{profile.role === 'admin' ? 'Back to comparisons' : 'Back to dashboard'}</Link></main>;
  const roundsA = comparisonRounds(a.transcript), roundsB = comparisonRounds(b.transcript);
  const editable = assignment.annotator_id === profile.id && assignment.status !== 'submitted';
  const hasOverall = overallComparisonQuestions(assignment.questions).length > 0;
  const turnsComplete = assignment.answers.length === roundsA.length;
  const visibleCount = Math.min(roundsA.length, assignment.answers.length + 1);
  const topic = a.transcript.topic_english_name || b.transcript.topic_english_name || a.transcript.learning_topic || b.transcript.learning_topic || a.label;
  return <main className="dashboard comparisons-page"><div className="page-heading"><div className="comparison-heading-content"><Link to={backTo}>← {profile.role === 'admin' ? 'Comparisons' : 'Dashboard'}</Link><div className="comparison-title"><h1>{topic}</h1>{profile.role === 'admin' && <details className="comparison-info" onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}><summary aria-label="Comparison details" title="Comparison details"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" /></svg></summary><div className="comparison-info-panel"><dl><dt>Conversation A</dt><dd>{a.label}</dd><dt>Conversation B</dt><dd>{b.label}</dd><dt>Annotator ID</dt><dd>{assignment.annotator_id}</dd></dl></div></details>}{profile.role === 'admin' && <button className="secondary" disabled={busy} onClick={() => setResetOpen(true)}>Reset responses</button>}<p className="comparison-progress">{assignment.answers.length} of {roundsA.length} turns compared · {statusText(assignment.status)}</p></div></div></div>{error && <p className="error" role="alert">{error} <button className="secondary" disabled={busy} onClick={() => setReload(value => value + 1)}>Reload saved comparison</button></p>}
    {roundsA.slice(0, visibleCount).map((round, index) => <section className="comparison-round" key={index} ref={index === assignment.answers.length ? nextHeading : undefined} tabIndex={-1} aria-label={`Comparison round ${index + 1}`}><RoundForm conversationA={a!.transcript} conversationB={b!.transcript} key={`${assignment.id}:${resetGeneration}:${index}:${Boolean(assignment.answers[index])}`} assignment={assignment} index={index} roundA={round} roundB={roundsB[index]} last={index === roundsA.length - 1 && !hasOverall} saved={assignment.answers[index]} editable={editable && index === assignment.answers.length} busy={busy} onSave={save} /></section>)}
    {resetOpen && profile.role === 'admin' && <ResetComparison assignment={assignment} onClose={() => setResetOpen(false)} onReset={resetResponses} />}
    {turnsComplete && hasOverall && <OverallComparisonForm key={`${assignment.id}:${resetGeneration}:overall:${Boolean(assignment.overall_answer)}`} assignment={assignment} editable={editable} busy={busy} onSave={answer => save(answer, true)} />}
    {assignment.status === 'submitted' ? <p className="notice" role="status">Comparison complete. All ratings have been saved.</p> : turnsComplete && hasOverall ? <p className="notice">Complete the overall conversation ratings to finish.</p> : <p className="notice">The next turn appears after every question for the current turn is answered and saved.</p>}
  </main>;
}
