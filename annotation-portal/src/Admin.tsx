import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { bundledRubric, C, download, fetchAssignments, supabase } from './lib';
import type { Assignment, DocumentRow, Profile, RubricSnapshot } from './types';
import { AssignmentMenu } from './AssignmentMenu';
import { DeleteConversation } from './DeleteConversation';
import { identifyUploadedConversation } from './conversation-identity';

const message = (error: unknown) => error instanceof Error ? error.message : (error as { message?: string })?.message || String(error);
const statusText = (status: string) => ({ not_started: 'Not started', in_progress: 'In progress', submitted: 'Submitted' })[status] || status;

export function Admin() {
  const [rows, setRows] = useState<Assignment[]>([]); const [documents, setDocuments] = useState<DocumentRow[]>([]); const [users, setUsers] = useState<Profile[]>([]);
  const [error, setError] = useState(''); const [notice, setNotice] = useState(''); const [busy, setBusy] = useState(false); const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]); const [language, setLanguage] = useState('English'); const [filter, setFilter] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteDocument, setDeleteDocument] = useState<DocumentRow | null>(null);
  const [menu, setMenu] = useState<{ ids: string[]; anchor: HTMLButtonElement } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null); const uploadDialog = useRef<HTMLDialogElement>(null);
  async function refresh() {
    try {
      const [assignments, docs, people] = await Promise.all([fetchAssignments(), supabase!.from('conversations').select('*').order('created_at', { ascending: false }), supabase!.from('profiles').select('*').eq('role', 'annotator').order('username')]);
      if (docs.error) throw docs.error; if (people.error) throw people.error;
      setRows(assignments); setDocuments(docs.data as DocumentRow[]); setUsers(people.data as Profile[]);
    } catch (err) { setError(message(err)); } finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); const timer = setInterval(() => void refresh(), 30000); return () => clearInterval(timer); }, []);
  useEffect(() => { if (uploadOpen) uploadDialog.current?.showModal(); else uploadDialog.current?.close(); }, [uploadOpen]);

  async function upload(files: FileList | null) {
    if (!files?.length) return; setBusy(true); setError(''); setNotice(''); let uploaded = 0;
    try {
      for (const file of Array.from(files)) {
        if (file.size > 2097152) throw new Error(`${file.name}: maximum size is 2 MB.`);
        const text = await file.text(); const parsed = file.name.endsWith('.json') ? JSON.parse(text) : null; const input = parsed?.conversation || parsed;
        const source = input ? C.normalizeConversation(input, file.name) : C.parseTranscript(text, file.name);
        if (input?.source_conversation_id) source.source_conversation_id = input.source_conversation_id;
        source.original_language = input?.original_language || input?.translation?.original_language || (!input?.source_conversation_id ? input?.configuration?.language || input?.metadata?.native_language || language : null);
        const transcriptLanguage = input?.configuration?.language || input?.metadata?.native_language || language;
        source.topic_english_name = input?.topic_english_name || input?.metadata?.topic_english_name || (transcriptLanguage === 'English' ? source.learning_topic : null);
        const { id, transcript } = identifyUploadedConversation(source);
        const path = `${id}/${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const { error: storageError } = await supabase!.storage.from('transcripts').upload(path, file); if (storageError) throw storageError;
        const { error: dbError } = await supabase!.from('conversations').insert({ id, label: transcript.label, language: transcriptLanguage, transcript, source_path: path });
        if (dbError) { await supabase!.storage.from('transcripts').remove([path]); if (dbError.code === '23505') throw new Error('This conversation ID already exists. Give every original and translation a unique ID in its source file.'); throw dbError; }
        uploaded++;
      }
      setNotice(`${uploaded} conversation${uploaded === 1 ? '' : 's'} uploaded.`);
    } catch (err) { setError(`${uploaded ? `${uploaded} uploaded before the error. ` : ''}${message(err)}`); }
    finally { if (fileRef.current) fileRef.current.value = ''; setBusy(false); await refresh(); }
  }
  async function assign(documentIds: string[], userIds: string[]) {
    if (!documentIds.length || !userIds.length) return;
    setError(''); setNotice('');
    const { data: version, error: readError } = await supabase!.from('rubric_versions').select('hash').eq('hash', bundledRubric.rubric_sha256).maybeSingle(); if (readError) throw new Error(message(readError));
    if (!version) { const { error } = await supabase!.from('rubric_versions').insert({ hash: bundledRubric.rubric_sha256, snapshot: bundledRubric }); if (error && error.code !== '23505') throw new Error(message(error)); }
    // Fetch current assignments so an older dashboard view cannot recreate existing work.
    const current = await fetchAssignments();
    const existing = new Set(current.map(row => `${row.conversation_id}:${row.annotator_id}`));
    const payload = documentIds.flatMap(conversation_id => userIds.filter(annotator_id => !existing.has(`${conversation_id}:${annotator_id}`)).map(annotator_id => ({ conversation_id, annotator_id, rubric_hash: bundledRubric.rubric_sha256 })));
    if (payload.length) {
      const { error } = await supabase!.from('assignments').insert(payload);
      if (error) {
        await refresh();
        throw new Error(error.code === '23505' ? 'Assignments changed while you were selecting. Existing work is safe; try assigning again.' : message(error));
      }
    }
    setNotice(payload.length ? `Created ${payload.length} independent assignment${payload.length === 1 ? '' : 's'}.` : 'These annotators already have this conversation.'); setSelected([]); await refresh();
  }
  async function reopen(row: Assignment) {
    setError(''); setBusy(true);
    try { const { error } = await supabase!.rpc('reopen_assignment', { p_assignment_id: row.id, p_revision: row.revision }); if (error) throw error; await refresh(); } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  async function exportAll() {
    setBusy(true); setError('');
    try {
      const fresh = await fetchAssignments(); const { data, error } = await supabase!.from('rubric_versions').select('hash, snapshot'); if (error) throw error;
      const versions = new Map(data.map(row => [row.hash, row.snapshot as RubricSnapshot]));
      download('study-annotations.json', { format_version: 'annotation-portal-study/1.0', exported_at: new Date().toISOString(), assignments: fresh.map(row => ({ assignment_id: row.id, annotator_id: row.annotator_id, status: row.status, revision: row.revision, rubric_hash: row.rubric_hash, submitted_at: row.submitted_at, turn_ratings: row.turn_ratings || {}, rating_dimensions: versions.get(row.rubric_hash)?.rating_dimensions || [], rating_scope: versions.get(row.rubric_hash)?.rating_scope || null, source_conversation_id: row.conversations!.transcript.source_conversation_id || null, repository_source: row.conversations!.transcript.repository_source || null, ...C.buildExport(row.conversations!.transcript, row.annotations, versions.get(row.rubric_hash)!.rubric, row.profiles!.username) })) });
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  function originalLanguage(doc: DocumentRow) {
    if (doc.transcript.original_language) return doc.transcript.original_language;
    const original = documents.find(source => source.transcript.conversation_id === doc.transcript.source_conversation_id);
    if (original) return original.language;
    return doc.transcript.source_conversation_id || doc.transcript.repository_source?.version.includes('translation') ? 'Unknown' : doc.language;
  }
  const visible = rows.filter(row => filter === 'all' || row.status === filter);
  const menuDocuments = menu ? documents.filter(doc => menu.ids.includes(doc.id)) : [];
  return <main className="dashboard admin-dashboard">
    <div className="page-heading"><div><span className="eyebrow">ADMINISTRATION</span><h1>Conversations</h1><p>Manage transcripts and assign annotation work.</p></div><div className="actions"><button className="secondary" disabled={busy} onClick={() => { setError(''); void refresh(); }}>Refresh</button><button className="primary" onClick={() => setUploadOpen(true)}>Upload</button></div></div>
    {error && !uploadOpen && <p className="error" role="alert">{error}</p>}{notice && !uploadOpen && <p className="notice" role="status">{notice}</p>}
    <section className="card conversation-card" aria-label="Conversations">
      <div className="conversation-toolbar"><span>{documents.length} conversation{documents.length === 1 ? '' : 's'}{selected.length > 0 && ` · ${selected.length} selected`}</span>{selected.length > 0 && <button className="secondary" aria-haspopup="dialog" aria-expanded={menu?.ids.length === selected.length && menu?.anchor.dataset.bulk === 'true'} data-bulk="true" onClick={event => setMenu({ ids: selected, anchor: event.currentTarget })}>Assign selected</button>}</div>
      <div className="table-wrap"><table className="conversation-table"><thead><tr>
        <th className="select-column"><input type="checkbox" aria-label="Select all conversations" checked={documents.length > 0 && selected.length === documents.length} disabled={!documents.length} onChange={event => setSelected(event.target.checked ? documents.map(doc => doc.id) : [])} /></th>
        <th>Topic</th><th>Original language</th><th>Transcript language</th><th>ID</th><th>Assigned to</th><th aria-label="Actions"></th>
      </tr></thead><tbody>{documents.map(doc => {
        const assigned = rows.filter(row => row.conversation_id === doc.id);
        const people = [...new Map(assigned.map(row => [row.annotator_id, row.profiles?.username || users.find(user => user.id === row.annotator_id)?.username || 'Annotator'])).entries()];
        const topic = doc.transcript.learning_topic || doc.label;
        const englishTopic = doc.transcript.topic_english_name || (doc.language === 'English' ? topic : documents.find(other => other.language === 'English' && doc.transcript.repository_source?.topic_id && other.transcript.repository_source?.topic_id === doc.transcript.repository_source.topic_id)?.transcript.learning_topic);
        return <tr key={doc.id} data-conversation-id={doc.id} className={selected.includes(doc.id) ? 'selected-row' : ''}>
          <td><input type="checkbox" aria-label={`Select ${doc.label}`} checked={selected.includes(doc.id)} onChange={event => setSelected(previous => event.target.checked ? [...previous, doc.id] : previous.filter(id => id !== doc.id))} /></td>
          <td className="topic-cell">{englishTopic && <small className="english-topic" lang="en">{englishTopic}</small>}<Link className="conversation-topic-link" to={`/conversations/${doc.id}`} title="View and annotate"><strong>{topic}</strong></Link><small>{doc.transcript.repository_source?.version || (doc.transcript.source_conversation_id ? 'Translation' : 'Original')} · {doc.transcript.messages.length} turns</small></td>
          <td>{originalLanguage(doc)}</td><td>{doc.language}</td><td className="id-cell"><code>{doc.transcript.conversation_id || doc.id}</code></td>
          <td>{people.length ? <div className="assigned-users">{people.map(([id, username]) => <span className="pill" key={id}>{username}</span>)}</div> : <span className="unassigned">Unassigned</span>}</td>
          <td className="row-actions"><button className="conversation-menu-button" aria-label={`Assign annotators for ${doc.label}`} title="Assign annotators" aria-haspopup="dialog" aria-expanded={Boolean(menu?.ids.length === 1 && menu.ids[0] === doc.id)} disabled={busy} onClick={event => { const anchor = event.currentTarget; setMenu(previous => previous?.ids.length === 1 && previous.ids[0] === doc.id ? null : { ids: [doc.id], anchor }); }}>⋮</button></td>
        </tr>;
      })}</tbody></table></div>
      {loading ? <p className="empty" role="status">Loading conversations…</p> : !documents.length && <p className="empty">No conversations yet. Upload transcript files to get started.</p>}
    </section>
    {menu && menuDocuments.length > 0 && <AssignmentMenu key={menu.ids.join(':')} documents={menuDocuments} users={users} assignments={rows} anchor={menu.anchor} onAssign={assign} onClose={() => setMenu(null)} onDelete={document => { setMenu(null); setDeleteDocument(document); }} />}
    {deleteDocument && <DeleteConversation document={deleteDocument} onClose={() => setDeleteDocument(null)} onDeleted={async id => { setSelected(previous => previous.filter(value => value !== id)); setDocuments(previous => previous.filter(doc => doc.id !== id)); setRows(previous => previous.filter(row => row.conversation_id !== id)); setNotice('Conversation and associated annotation work deleted.'); await refresh(); }} />}
    <div className="stat-grid">{(['all', 'not_started', 'in_progress', 'submitted'] as const).map(status => <button className={`card stat-card ${filter === status ? 'selected' : ''}`} key={status} onClick={() => setFilter(status)}><strong>{status === 'all' ? rows.length : rows.filter(row => row.status === status).length}</strong><span>{status === 'all' ? 'Total assignments' : statusText(status)}</span></button>)}</div>
    <section className="card progress"><div className="progress-heading"><h2>Annotation progress</h2><button className="secondary" disabled={busy} onClick={() => void exportAll()}>Export all annotations</button></div><div className="table-wrap"><table><thead><tr><th>Conversation</th><th>Annotator</th><th>Status</th><th>Highlights</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{visible.map(row => <tr key={row.id}><td>{row.conversations?.label}</td><td>{row.profiles?.username}</td><td><span className={`status ${row.status}`}>{statusText(row.status)}</span></td><td>{row.annotations.length}</td><td>{new Date(row.updated_at).toLocaleString()}</td><td><Link to={`/assignments/${row.id}`}>View</Link>{row.status === 'submitted' && <button className="text-button" disabled={busy} onClick={() => void reopen(row)}>Reopen</button>}</td></tr>)}</tbody></table>{!visible.length && <p className="empty">No assignments in this view.</p>}</div></section>
    <dialog ref={uploadDialog} className="upload-dialog" aria-labelledby="upload-title" onCancel={event => { if (busy) event.preventDefault(); else setUploadOpen(false); }} onClose={() => setUploadOpen(false)}>
      <div className="upload-heading"><div><h2 id="upload-title">Upload conversations</h2><p>Add transcript files directly to the conversation table.</p></div><button className="secondary" aria-label="Close upload" disabled={busy} onClick={() => setUploadOpen(false)}>Close</button></div>
      {uploadOpen && error && <p className="error" role="alert">{error}</p>}{uploadOpen && notice && <p className="notice" role="status">{notice}</p>}
      <section className="card"><h3>Upload files</h3><p>JSON conversations or text files with Tutor: and Student: turns.</p><label>Transcript language<input value={language} onChange={event => setLanguage(event.target.value)} required /></label><input ref={fileRef} type="file" accept=".json,.txt,.md" multiple disabled={busy} aria-label="Choose transcript files" onChange={event => void upload(event.target.files)} /><small>Used when a file has no language metadata. Original files are stored privately.</small></section>
    </dialog>
  </main>;
}
