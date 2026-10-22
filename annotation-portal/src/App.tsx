import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { bundledRubric, C, configured, download, fetchAssignments, loginIdentifier, supabase, validateSubmission } from './lib';
import type { Annotation, AnnotationWork, Assignment, AssignmentType, LLMBaseline, Profile, RubricSnapshot, TurnRatings } from './types';
import { SaveQueue, type SaveState } from './save-queue';
import { Editor } from './Editor';
import { Admin } from './Admin';
import { Settings } from './Settings';
import { openAdminAnnotations } from './admin-annotations';
import { AnnotatorSwitcher } from './AnnotatorSwitcher';
import { AnnotationSummary } from './AnnotationSummary';
import { ratingQuestionMetadata, validateTurnRatings } from './turn-ratings';
import { LLMBaselines } from './LLMBaselines';
import { BaselineComparison } from './BaselineComparison';
import { Comparisons, ComparisonEditor } from './Comparisons';
import { CapturedTranscript, CaptureFrame, CaptureMedia, OriginalCapture, useCaptureAssets } from './CapturedTranscript';
import { MarkdownTranscript } from './MarkdownTranscript';
import { AdminTaskReview } from './AdminTaskReview';
import { ConfirmDialog } from './ConfirmDialog';

interface Context { profile: Profile; beforeExit: React.MutableRefObject<null | (() => Promise<void>)>; }
const PortalContext = createContext<Context | null>(null);
const usePortal = () => useContext(PortalContext)!;
const message = (error: unknown) => error instanceof Error ? error.message : (error as { message?: string })?.message || String(error);
const statusText = (status: string) => ({ not_started: 'Not started', in_progress: 'In progress', submitted: 'Submitted' })[status] || status;

function Login() {
  const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { const email = loginIdentifier(username); const { error } = await supabase!.auth.signInWithPassword({ email, password }); if (error) throw new Error('Username or password is incorrect.'); setPassword(''); }
    catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  return <main className="login-layout"><form className="login-card" onSubmit={submit}><h2>Welcome back</h2><p>Sign in with your assigned username and password.</p><label>Username<input name="username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required autoFocus /></label><label>Password<input name="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label>{error && <p className="error" role="alert">{error}</p>}<button className="primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button><small>Contact your study administrator if you need your credentials reset.</small></form></main>;
}
function Setup() { return <main className="setup card"><h1>Connect your annotation portal</h1><p>Configure the Supabase project URL and publishable key to enable login and cloud saving.</p><p>Follow <code>annotation-portal/README.md</code> to apply the database migration, provision accounts, and connect Vercel.</p><p>Research transcripts and accounts are loaded from your project after login.</p></main>; }

function WorkspaceLink({ to, children, className, end, beforeExit, onError }: { to: string; children: ReactNode; className?: string; end?: boolean; beforeExit: Context['beforeExit']; onError: (error: string) => void }) {
  const navigate = useNavigate();
  return <NavLink to={to} end={end} className={className} onClick={event => {
    if (!beforeExit.current || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void beforeExit.current().then(() => { onError(''); navigate(to); }).catch(error => onError(message(error)));
  }}>{children}</NavLink>;
}

function ConversationOnly({ conversation }: { conversation: import('./types').Conversation }) {
  const captured = useCaptureAssets(conversation);
  const rubric = bundledRubric.rubric;
  const noAnnotations: Annotation[] = [];
  const noHighlight = () => {};
  return <main className="editor-page"><div className="editor-bar"><Link className="secondary" to="/">← Conversations</Link></div><section className="document"><div className="document-header"><h2>{conversation.learning_topic || conversation.label}</h2></div>{captured.error && <p className="notice" role="status">{captured.error}</p>}{captured.exactHtml ? <div className="exact-capture"><CaptureFrame html={captured.exactHtml} conversation={conversation} /></div> : <div className="transcript">{conversation.messages.map(turn => <article className={`turn ${turn.speaker === 'tutor' ? 'tutor' : 'student'}`} key={turn.turn_id}><div className="turn-heading"><span className="speaker-badge">{turn.speaker === 'tutor' ? 'B' : 'Y'}</span><strong>{turn.speaker === 'tutor' ? 'Bot' : 'You'}</strong></div><div className="turn-body">{conversation.translation ? <><MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={noAnnotations} rubric={rubric} readonly onHighlight={noHighlight} />{captured.assets[turn.turn_id] && <CaptureMedia html={captured.assets[turn.turn_id]} />}</> : captured.assets[turn.turn_id] ? <CapturedTranscript html={captured.assets[turn.turn_id]} text={turn.text} turnId={turn.turn_id} annotations={noAnnotations} rubric={rubric} readonly onHighlight={noHighlight} /> : <MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={noAnnotations} rubric={rubric} readonly onHighlight={noHighlight} />}</div></article>)}</div>}{captured.originalHtml && <OriginalCapture html={captured.originalHtml} conversation={conversation} />}</section></main>;
}

function AdminAnnotationReview() {
  const { id } = useParams(); const { profile } = usePortal(); const navigate = useNavigate();
  const [error, setError] = useState(''); const [conversation, setConversation] = useState<import('./types').Conversation | null>(null);
  useEffect(() => {
    let alive = true;
    setError(''); setConversation(null);
    void (async () => {
      try {
        const [{ data, error }, { data: document, error: documentError }] = await Promise.all([
          supabase!.from('assignments').select('id, annotator_id, annotations, turn_ratings, profiles!assignments_annotator_id_fkey(username)').eq('conversation_id', id).eq('is_active',true).returns<{ id: string; annotator_id: string; annotations: Annotation[]; turn_ratings: TurnRatings; profiles: { username: string } | null }[]>(),
          supabase!.from('conversations').select('transcript').eq('id', id).single()
        ]);
        if (error) throw error;
        if (documentError) throw documentError;
        if (!alive) return;
        const rows = (data || []).filter(row => row.annotations.length > 0 || Object.keys(row.turn_ratings || {}).length > 0).sort((a, b) => Number(a.annotator_id === profile.id) - Number(b.annotator_id === profile.id) || (a.profiles?.username || '').localeCompare(b.profiles?.username || ''));
        if (rows.length) navigate(`/assignments/${rows[0].id}/view`, { replace: true });
        else setConversation(document.transcript);
      } catch (err) { if (alive) setError(message(err)); }
    })();
    return () => { alive = false; };
  }, [id, profile.id, navigate]);
  return error ? <main className="center"><p className="error" role="alert">{error}</p><Link to="/">Back to conversations</Link></main> : conversation ? <ConversationOnly conversation={conversation} /> : <main className="center"><p role="status">Loading conversation…</p></main>;
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null); const [profile, setProfile] = useState<Profile | null>(null); const [loading, setLoading] = useState(configured); const [error, setError] = useState('');
  const beforeExit = useRef<null | (() => Promise<void>)>(null);
  useEffect(() => {
    if (!supabase) return; let alive = true, sequence = 0;
    async function load(next: Session | null) {
      const request = ++sequence;
      if (!alive) return; setSession(next); setError('');
      if (!next) { setProfile(null); setLoading(false); return; }
      const { data, error } = await supabase!.from('profiles').select('*').eq('id', next.user.id).single();
      if (!alive || request !== sequence) return;
      setProfile(data as Profile | null); if (error) setError('Could not load your account. Ask the administrator to verify the database setup.'); setLoading(false);
    }
    void supabase.auth.getSession().then(({ data, error }) => { if (!alive) return; if (error) { setError(error.message); setLoading(false); } else void load(data.session); });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => { queueMicrotask(() => { void load(next); }); });
    return () => { alive = false; data.subscription.unsubscribe(); };
  }, []);
  async function signOut() {
    try { await beforeExit.current?.(); const { error } = await supabase!.auth.signOut(); if (error) throw error; }
    catch (err) { setError(message(err)); }
  }
  return <BrowserRouter><header className="topbar"><WorkspaceLink className="brand" to="/" end beforeExit={beforeExit} onError={setError}><span className="brand-icon">a.</span><span><strong>AI Explanation Evaluation</strong></span></WorkspaceLink>{profile && <div className="top-actions">{profile.role === 'admin' ? <nav aria-label="Administration"><WorkspaceLink to="/" end beforeExit={beforeExit} onError={setError}>Conversations</WorkspaceLink><WorkspaceLink to="/comparisons" beforeExit={beforeExit} onError={setError}>Comparisons</WorkspaceLink><WorkspaceLink to="/settings" beforeExit={beforeExit} onError={setError}>Settings</WorkspaceLink></nav> : <nav aria-label="Annotator navigation"><WorkspaceLink to="/" end beforeExit={beforeExit} onError={setError}>Dashboard</WorkspaceLink></nav>}<span>{profile.username}<small>{profile.role === 'admin' ? 'Administrator' : 'Annotator'}</small></span><button className="secondary" onClick={() => void signOut()}>Sign out</button></div>}</header>
    {!configured ? <Setup /> : loading ? <main className="center" role="status">Loading your workspace…</main> : !session ? <Login /> : !profile ? <main className="card center"><p className="error" role="alert">{error || 'Account profile is missing.'}</p><button onClick={() => void signOut()}>Sign out</button></main> : <PortalContext.Provider value={{ profile, beforeExit }}>{error && <div className="global-error error" role="alert">{error}</div>}<Routes><Route path="/" element={profile.role === 'admin' ? <Admin /> : <Assignments />} /><Route path="/label" element={<Navigate to="/" replace />} /><Route path="/rate" element={<Navigate to="/" replace />} /><Route path="/comparisons" element={profile.role === 'admin' ? <Comparisons profile={profile} /> : <Navigate to="/#compare" replace />} /><Route path="/comparisons/:id" element={<ComparisonEditor profile={profile} />} /><Route path="/settings" element={profile.role === 'admin' ? <Settings /> : <Navigate to="/" replace />} /><Route path="/conversations/:id" element={profile.role === 'admin' ? <AdminAnnotationReview /> : <Navigate to="/" replace />} /><Route path="/conversations/:id/baselines" element={profile.role === 'admin' ? <LLMBaselines /> : <Navigate to="/" replace />} /><Route path="/conversations/:id/labeling" element={profile.role === 'admin' ? <AdminTaskReview taskType="label" /> : <Navigate to="/" replace />} /><Route path="/conversations/:id/rating" element={profile.role === 'admin' ? <AdminTaskReview taskType="rate" /> : <Navigate to="/" replace />} /><Route path="/conversations/:id/view" element={<Navigate to="/conversations/:id/labeling" replace />} /><Route path="/assignments/:id/view" element={profile.role === 'admin' ? <AssignmentEditor viewOnly /> : <Navigate to="/" replace />} /><Route path="/assignments/:id" element={<AssignmentEditor />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></PortalContext.Provider>}
  </BrowserRouter>;
}
function AssignmentList({ rows, taskType }: { rows: Assignment[]; taskType: AssignmentType }) {
  const taskRows = rows.filter(row => row.task_type === taskType);
  return !taskRows.length ? <div className="card empty"><h2>No {taskType} assignments yet</h2><p>Your administrator will assign {taskType} tasks here.</p></div> : <ul className="assignment-list">{taskRows.map(row => <li key={row.id}><Link className="assignment-row" to={`/assignments/${row.id}`}><div className="assignment-row-content"><h2>{row.conversations?.transcript.learning_topic || row.conversations?.label}</h2><p>{row.conversations?.transcript.topic_english_name || row.conversations?.label}</p></div><span className={`status ${row.status}`}>{statusText(row.status)}</span><span className="primary assignment-open">Open</span></Link></li>)}</ul>;
}

function Assignments() {
  const { profile } = usePortal();
  const [rows, setRows] = useState<Assignment[]>([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true);
  async function refresh() { setError(''); try { setRows(await fetchAssignments()); } catch (err) { setError(message(err)); } finally { setLoading(false); } }
  useEffect(() => { void refresh(); }, []);
  return <main className="dashboard"><div className="page-heading"><h1>Annotator dashboard</h1></div>{error && <p className="error" role="alert">{error}</p>}{loading ? <p role="status">Loading assignments…</p> : <><section aria-labelledby="label-heading"><h2 id="label-heading">Label instructional features</h2><AssignmentList rows={rows} taskType="label" /></section><section className="dashboard-task-section" aria-labelledby="rate-heading"><h2 id="rate-heading">Rate tutor turns</h2><AssignmentList rows={rows} taskType="rate" /></section></>}<Comparisons profile={profile} embedded /></main>;
}

function AssignmentEditor({ viewOnly = false }: { viewOnly?: boolean }) {
  const { id } = useParams(); const navigate = useNavigate(); const { profile, beforeExit } = usePortal();
  const [assignment, setAssignment] = useState<Assignment | null>(null); const [rubric, setRubric] = useState<RubricSnapshot | null>(null); const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [state, setState] = useState<SaveState>('saved'); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const [confirmCompletion, setConfirmCompletion] = useState(false);
  const [turnRatings, setTurnRatings] = useState<TurnRatings>({});
  const [baseline, setBaseline] = useState<LLMBaseline | null>(null);
  const [reload, setReload] = useState(0);
  const [draft, setDraft] = useState<(AnnotationWork & { revision: number; rubric_hash: string }) | null>(null);
  const queue = useRef<SaveQueue<AnnotationWork> | null>(null); const draftKey = `annotation-portal:draft:${profile.id}:${id}`;
  useEffect(() => {
    let alive = true;
    async function load() {
      setAssignment(null); setRubric(null); setAnnotations([]); setTurnRatings({}); setBaseline(null); setDraft(null); setError(''); setState('saved');
      try {
        const { data, error } = await supabase!.from('assignments').select('*, conversations(*), profiles!assignments_annotator_id_fkey(id, username, role)').eq('id', id).single(); if (error) throw error;
        let row = data as Assignment;
        if (!viewOnly && row.task_type === 'label' && row.is_active !== false && row.status !== 'submitted' && row.rubric_hash !== bundledRubric.rubric_sha256) {
          const { data: upgraded, error: upgradeError } = await supabase!.rpc('upgrade_label_assignment_rubric', { p_assignment_id: row.id, p_rubric_hash: bundledRubric.rubric_sha256 });
          if (upgradeError) throw new Error(`Could not check the current labeling features: ${upgradeError.message}`);
          if (upgraded) {
            const { data: refreshed, error: refreshError } = await supabase!.from('assignments').select('*, conversations(*), profiles!assignments_annotator_id_fkey(id, username, role)').eq('id', id).single();
            if (refreshError) throw refreshError;
            row = refreshed as Assignment;
          }
        }
        const { data: version, error: versionError } = await supabase!.from('rubric_versions').select('snapshot').eq('hash', row.rubric_hash).single(); if (versionError) throw versionError;
        if (!alive) return;
        const snapshot = version.snapshot as RubricSnapshot;
        C.validateAnnotations(row.conversations!.transcript, row.annotations, snapshot.rubric, { allowIncomplete: true });
        validateTurnRatings(row.conversations!.transcript, row.turn_ratings || {}, snapshot);
        if(row.baseline_id) {
          const {data,error}=await supabase!.from('llm_baselines').select('*').eq('id',row.baseline_id).single();
          if(error) throw new Error('Could not load the original LLM baseline. Reload to try again.');
          if(alive) setBaseline(data as LLMBaseline);
        }
        if(!alive) return;
        setAssignment(row); setRubric(snapshot); setAnnotations(row.annotations); setTurnRatings(row.turn_ratings || {});
        if (viewOnly) return;
        try {
          let cached = JSON.parse(localStorage.getItem(draftKey) || 'null');
          const siblingType: AssignmentType = row.task_type === 'label' ? 'rate' : 'label';
          if ((row.task_type === 'label' && Object.keys(cached?.turn_ratings || {}).length) || (row.task_type === 'rate' && !Object.keys(cached?.turn_ratings || {}).length)) {
            const { data: sibling } = await supabase!.from('assignments').select('id, revision, rubric_hash').eq('conversation_id', row.conversation_id).eq('annotator_id', row.annotator_id).eq('task_type', siblingType).eq('is_active', true).maybeSingle();
            if (sibling) {
              const siblingDraft = JSON.parse(localStorage.getItem(`annotation-portal:draft:${profile.id}:${sibling.id}`) || 'null');
              if (row.task_type === 'label' && Object.keys(cached?.turn_ratings || {}).length) {
                localStorage.setItem(`annotation-portal:draft:${profile.id}:${sibling.id}`, JSON.stringify({ annotations: [], turn_ratings: cached.turn_ratings, revision: sibling.revision, rubric_hash: sibling.rubric_hash }));
              } else if (row.task_type === 'rate' && siblingDraft?.turn_ratings && Object.keys(siblingDraft.turn_ratings).length) {
                cached = { annotations: [], turn_ratings: siblingDraft.turn_ratings, revision: row.revision, rubric_hash: row.rubric_hash };
                localStorage.setItem(draftKey, JSON.stringify(cached));
              }
            }
          }
          if (cached) { cached.turn_ratings ||= {}; if(row.task_type==='label') cached.turn_ratings={}; else cached.annotations=[]; C.validateAnnotations(row.conversations!.transcript, cached.annotations, snapshot.rubric, { allowIncomplete: true }); validateTurnRatings(row.conversations!.transcript, cached.turn_ratings, snapshot); if (row.task_type === 'label' && cached.revision === row.revision && cached.rubric_hash !== row.rubric_hash) { cached.rubric_hash = row.rubric_hash; localStorage.setItem(draftKey, JSON.stringify(cached)); } if (JSON.stringify(cached.annotations) !== JSON.stringify(row.annotations) || JSON.stringify(cached.turn_ratings) !== JSON.stringify(row.turn_ratings || {})) setDraft(cached); else localStorage.removeItem(draftKey); }
        } catch { setError('A local recovery draft could not be read. Cloud data has been kept.'); }
        queue.current = new SaveQueue<AnnotationWork>(row.revision, async (next, revision) => {
          const { data, error } = await supabase!.rpc('save_assignment', { p_assignment_id: row.id, p_revision: revision, p_annotations: next.annotations, p_turn_ratings: next.turn_ratings, p_submit: false }); if (error) throw new Error(error.message);
          if (alive) setAssignment(previous => previous && ({ ...previous, ...data })); return data.revision;
        }, (next, detail) => { if (alive) { setState(next); if (detail) setError(detail); } }, (next, revision) => {
          try { if (next) localStorage.setItem(draftKey, JSON.stringify({ ...next, revision, rubric_hash: row.rubric_hash })); else localStorage.removeItem(draftKey); }
          catch { if (alive) setError('Local recovery storage is unavailable. Keep this page open until cloud saving succeeds.'); }
        });
        beforeExit.current = async () => { await queue.current?.flush(); };
      } catch (err) { if (alive) setError(message(err)); }
    }
    void load();
    const unload = (event: BeforeUnloadEvent) => { if (queue.current?.dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', unload);
    return () => { alive = false; queue.current?.dispose(); queue.current = null; beforeExit.current = null; window.removeEventListener('beforeunload', unload); };
  }, [id, profile.id, draftKey, beforeExit, viewOnly, reload]);
  const readonly = viewOnly || assignment?.is_active===false || assignment?.status === 'submitted' || (assignment?.annotator_id !== profile.id && profile.role !== 'admin');
  function change(next: Annotation[]) { if (readonly || draft) return; setAnnotations(next); queue.current?.enqueue({ annotations: next, turn_ratings: turnRatings }); }
  function changeRatings(next: TurnRatings) { if (readonly || draft || busy) return; setTurnRatings(next); queue.current?.enqueue({ annotations, turn_ratings: next }); }
  async function exit() { setBusy(true); try { await queue.current?.flush(); navigate('/'); } catch (err) { setError(message(err)); } finally { setBusy(false); } }
  async function switchAnnotator(target: string) {
    if (!assignment || profile.role !== 'admin' || busy) return;
    setBusy(true); setError('');
    try {
      await queue.current?.flush();
      const nextId = !viewOnly && target === 'own' ? await openAdminAnnotations(assignment.conversation_id, profile, undefined, assignment.task_type) : target;
      if (nextId !== assignment.id) navigate(`/assignments/${nextId}${viewOnly ? '/view' : ''}`);
    } catch (err) { setError(message(err)); }
    finally { setBusy(false); }
  }
  function requestCompletion() {
    if (!assignment || !rubric || readonly || busy || draft) return;
    try { validateSubmission(assignment.conversations!.transcript, annotations, rubric, profile.username, turnRatings, assignment.task_type); } catch (err) { setError(message(err)); return; }
    setError(''); setConfirmCompletion(true);
  }
  async function submit() {
    if (!assignment || !rubric || readonly || busy || draft) throw new Error('This task is no longer available to complete. Refresh the page and try again.');
    setBusy(true); setError('');
    try { validateSubmission(assignment.conversations!.transcript, annotations, rubric, profile.username, turnRatings, assignment.task_type); await queue.current!.flush(); const { data, error } = await supabase!.rpc('save_assignment', { p_assignment_id: assignment.id, p_revision: queue.current!.revision, p_annotations: annotations, p_turn_ratings: turnRatings, p_submit: true }); if (error) throw error; queue.current!.revision = data.revision; setAssignment(previous => ({ ...previous!, ...data })); }
    finally { setBusy(false); }
  }
  async function reopenForEditing() {
    if (!assignment || profile.role !== 'admin' || busy) return;
    setBusy(true); setError('');
    try {
      const { error } = await supabase!.rpc('reopen_assignment', { p_assignment_id: assignment.id, p_revision: assignment.revision });
      if (error) throw error;
      navigate(`/assignments/${assignment.id}`);
      setReload(value => value + 1);
    } catch (err) { setError(message(err)); }
    finally { setBusy(false); }
  }
  if (!assignment || !rubric) return <main className="center">{error ? <><p className="error" role="alert">{error}</p><Link to="/">Back to workspace</Link></> : <p role="status">Loading conversation…</p>}</main>;
  return <main className="editor-page"><div className="editor-bar"><button className="secondary" disabled={busy} onClick={() => void exit()}>← {profile.role === 'admin' ? 'Dashboard' : 'Assignments'}</button>{profile.role === 'admin' && <AnnotatorSwitcher assignment={assignment} profile={profile} busy={busy} viewOnly={viewOnly} onSwitch={target => void switchAnnotator(target)} />}{profile.role === 'admin' && assignment.is_active!==false && assignment.status === 'submitted' && <button className="secondary" disabled={busy} onClick={() => void reopenForEditing()}>Reopen and edit</button>}{profile.role === 'admin' && assignment.is_active!==false && viewOnly && assignment.status !== 'submitted' && <Link className="secondary" to={`/assignments/${assignment.id}`}>Edit annotations</Link>}<div className="save-status" role="status">{readonly ? statusText(assignment.status) : ({ saved: 'Saved to cloud', saving: 'Saving…', pending: 'Unsaved changes', error: 'Cloud save failed' })[state]}{profile.role === 'admin' && <small>{readonly ? `${assignment.profiles?.username} · Read only` : `Editing ${assignment.profiles?.username}'s annotations`}</small>}</div></div>
    {profile.role === 'admin' && viewOnly && assignment.task_type === 'label' && <AnnotationSummary key={assignment.id} annotations={annotations} rubric={rubric} />}
    {baseline && profile.role==='admin' && viewOnly && <BaselineComparison baseline={baseline} annotations={annotations} rubric={rubric}/>}
    {error && <div className="error" role="alert">{error}{state === 'error' && <button className="secondary" onClick={() => { setError(''); void queue.current!.flush().catch(err => setError(message(err))); }}>Retry saving</button>}</div>}
    {draft && <div className="notice"><strong>A local recovery draft is available.</strong><p>{draft.revision !== assignment.revision ? 'The cloud version has changed. Export your draft before reloading; it will not overwrite the newer version.' : 'Restore your unsaved work or keep the cloud version.'}</p><button className="secondary" onClick={() => download('recovery-draft.json', { ...C.buildExport(assignment.conversations!.transcript, draft.annotations, rubric.rubric, profile.username), rubric_sha256: rubric.rubric_sha256, turn_ratings: draft.turn_ratings, ...ratingQuestionMetadata(rubric) })}>Export recovery draft</button>{!readonly && draft.revision === assignment.revision && draft.rubric_hash === assignment.rubric_hash && <button className="primary" onClick={() => { setAnnotations(draft.annotations); setTurnRatings(draft.turn_ratings); queue.current?.enqueue({ annotations: draft.annotations, turn_ratings: draft.turn_ratings }); setDraft(null); }}>Restore draft</button>}<button className="secondary" onClick={() => { localStorage.removeItem(draftKey); setDraft(null); }}>Keep cloud version</button></div>}
    <Editor key={assignment.id} conversation={assignment.conversations!.transcript} annotations={annotations} rubric={rubric} onChange={change} turnRatings={turnRatings} onRatingsChange={changeRatings} taskType={assignment.task_type} readonly={Boolean(readonly || draft || busy)} onFinish={assignment.task_type === 'rate' && !readonly ? requestCompletion : undefined} completionAction={!readonly ? <button className="primary" disabled={busy || Boolean(draft)} onClick={requestCompletion}>{busy ? 'Please wait…' : `Complete ${assignment.task_type === 'label' ? 'Label' : 'Rate'} task`}</button> : undefined} />
    {confirmCompletion && <ConfirmDialog title={`Complete ${assignment.task_type === 'label' ? 'Label' : 'Rate'} task?`} confirmLabel={`Complete ${assignment.task_type === 'label' ? 'Label' : 'Rate'} task`} pendingLabel="Completing…" onCancel={() => setConfirmCompletion(false)} onConfirm={submit}><p>This task will become read only until an administrator reopens it.</p></ConfirmDialog>}
  </main>;
}

