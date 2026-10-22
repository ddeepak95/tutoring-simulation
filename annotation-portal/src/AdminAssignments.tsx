import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllRows } from './lib';
import { comparisonModeLabel, type ComparisonMode } from './comparison';
import { languageName } from './languages';
import type { AssignmentType, Profile, Status } from './types';
import './admin-assignments.css';

interface ConversationSummary {
  id: string;
  label: string;
  language: string;
  generic_topic_name?: string | null;
  conversation_title?: string | null;
}
interface AnnotationTask {
  id: string;
  conversation_id: string;
  annotator_id: string;
  task_type: AssignmentType;
  status: Status;
  is_active: boolean;
}
interface ComparisonTask {
  id: string;
  conversation_a_id: string;
  conversation_b_id: string;
  annotator_id: string;
  mode: ComparisonMode;
  status: Status;
  is_active: boolean;
}
type Task = { id: string; kind: 'compare' | AssignmentType; status: Status; title: string; detail: string; href: string };
const statusText = (status: Status) => ({ not_started: 'Not started', in_progress: 'In progress', submitted: 'Submitted' })[status];
const count = (tasks: Task[]) => `${tasks.filter(task => task.status === 'submitted').length}/${tasks.length}`;

function TaskList({ title, tasks }: { title: string; tasks: Task[] }) {
  return <section className="admin-assignment-group"><h3>{title} <span>{count(tasks)} completed</span></h3>{tasks.length ? <ul>{tasks.map(task => <li key={task.id}><div><Link to={task.href}>{task.title}</Link><small>{task.detail}</small></div><span className={`status ${task.status}`}>{statusText(task.status)}</span></li>)}</ul> : <p>No assignments</p>}</section>;
}

export function AdminAssignments() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [byUser, setByUser] = useState<Map<string, Task[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  async function refresh() {
    setLoading(true); setError('');
    try {
      const [profiles, annotationTasks, comparisonTasks, conversations] = await Promise.all([
        fetchAllRows<Profile>('profiles', 'id,username,role', ['username']),
        fetchAllRows<AnnotationTask>('assignments', 'id,conversation_id,annotator_id,task_type,status,is_active'),
        fetchAllRows<ComparisonTask>('comparison_assignments', 'id,conversation_a_id,conversation_b_id,annotator_id,mode,status,is_active'),
        fetchAllRows<ConversationSummary>('conversation_details', 'id,label,language,generic_topic_name,conversation_title'),
      ]);
      const documents = new Map(conversations.map(doc => [doc.id, doc]));
      const topic = (doc?: ConversationSummary) => doc?.generic_topic_name || doc?.label || 'Conversation unavailable';
      const title = (doc?: ConversationSummary) => doc?.conversation_title || doc?.label || 'Conversation unavailable';
      const rowsByUser = new Map<string, Task[]>();
      for (const row of annotationTasks.filter(row => row.is_active)) {
        const doc = documents.get(row.conversation_id);
        const task: Task = { id: row.id, kind: row.task_type, status: row.status, title: title(doc), detail: `${topic(doc)}${doc ? ` · ${languageName(doc.language)}` : ''}`, href: `/assignments/${row.id}/view` };
        rowsByUser.set(row.annotator_id, [...(rowsByUser.get(row.annotator_id) || []), task]);
      }
      for (const row of comparisonTasks.filter(row => row.is_active)) {
        const first = documents.get(row.conversation_a_id), second = documents.get(row.conversation_b_id);
        const task: Task = { id: row.id, kind: 'compare', status: row.status, title: `${topic(first)} · ${comparisonModeLabel(row.mode)}`, detail: `A: ${title(first)}${first ? ` (${languageName(first.language)})` : ''} · B: ${title(second)}${second ? ` (${languageName(second.language)})` : ''}`, href: `/comparisons/${row.id}` };
        rowsByUser.set(row.annotator_id, [...(rowsByUser.get(row.annotator_id) || []), task]);
      }
      for (const work of rowsByUser.values()) work.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
      setUsers(profiles.filter(user => user.role === 'annotator'));
      setByUser(rowsByUser);
      setTasks([...rowsByUser.values()].flat());
    } catch (failure) { setError(failure instanceof Error ? failure.message : String(failure)); }
    finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, []);
  return <main className="dashboard admin-assignments-page"><div className="page-heading"><div><h1>Annotator assignments</h1><p>Active comparison, labeling, and rating work grouped by annotator.</p></div><button className="secondary" disabled={loading} onClick={() => void refresh()}>Refresh</button></div>
    {error && <p className="error" role="alert">{error}</p>}
    {loading ? <p role="status">Loading assignments…</p> : <><p className="admin-assignments-summary">{users.length} annotators · {tasks.length} active assignments · {tasks.filter(task => task.status === 'submitted').length} completed</p><div className="admin-annotator-list">{users.map(user => {
      const assigned = byUser.get(user.id) || [];
      return <details className="card admin-annotator" key={user.id}><summary><strong>{user.username}</strong><span>{count(assigned)} completed</span><span>{assigned.length} assigned</span></summary><div className="admin-annotator-work"><TaskList title="Compare" tasks={assigned.filter(task => task.kind === 'compare')} /><TaskList title="Label" tasks={assigned.filter(task => task.kind === 'label')} /><TaskList title="Rate" tasks={assigned.filter(task => task.kind === 'rate')} /></div></details>;
    })}{!users.length && <p className="card empty">No annotators yet.</p>}</div></>}
  </main>;
}
