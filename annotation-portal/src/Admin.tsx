import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { bundledRubric, C, download, fetchAssignments, fetchAllRows, supabase } from './lib';
import type { Assignment, AssignmentType, DocumentRow, Profile, RubricSnapshot } from './types';
import { AssignmentMenu } from './AssignmentMenu';
import { DeleteConversation } from './DeleteConversation';

import { captureAssetsForExport } from './CapturedTranscript';
import { identifyUploadedConversation } from './conversation-identity';
import { ratingQuestionMetadata } from './turn-ratings';
import { compareWithBaseline } from './baseline-comparison';
import type { LLMBaseline } from './types';

const message = (error: unknown) => error instanceof Error ? error.message : (error as { message?: string })?.message || String(error);
const statusText = (status: string) => ({ not_started: 'Not started', in_progress: 'In progress', submitted: 'Submitted' })[status] || status;

export function Admin() {
  const [rows, setRows] = useState<Assignment[]>([]); const [documents, setDocuments] = useState<DocumentRow[]>([]); const [users, setUsers] = useState<Profile[]>([]);
  const [error, setError] = useState(''); const [notice, setNotice] = useState(''); const [busy, setBusy] = useState(false); const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]); const [language, setLanguage] = useState('English');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteDocument, setDeleteDocument] = useState<DocumentRow | null>(null);
  const [menu, setMenu] = useState<{ ids: string[]; anchor: HTMLButtonElement } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null); const uploadDialog = useRef<HTMLDialogElement>(null);
  async function refresh() {
    try {
      const [assignments, docs, people] = await Promise.all([fetchAssignments(), supabase!.from('conversations').select('*').order('created_at', { ascending: false }), supabase!.from('profiles').select('*').order('username')]);
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
  async function assign(documentIds: string[], userIds: string[], baselineIds: Record<string,string>, taskTypes: AssignmentType[]) {
    if (!documentIds.length || !userIds.length || !taskTypes.length) return;
    setError(''); setNotice('');
    const { data: version, error: readError } = await supabase!.from('rubric_versions').select('hash').eq('hash', bundledRubric.rubric_sha256).maybeSingle(); if (readError) throw new Error(message(readError));
    if (!version) { const { error } = await supabase!.from('rubric_versions').insert({ hash: bundledRubric.rubric_sha256, snapshot: bundledRubric }); if (error && error.code !== '23505') throw new Error(message(error)); }
    const {data,error}=await supabase!.rpc('create_task_assignments',{p_conversation_ids:documentIds,p_annotator_ids:userIds,p_task_types:taskTypes,p_rubric_hash:bundledRubric.rubric_sha256,p_baseline_ids:baselineIds});
    if(error) {await refresh();throw new Error(message(error));}
    setNotice(data.restored ? `Resumed ${data.restored} saved assignment${data.restored===1?'':'s'}. Created ${data.created} new assignments.` : data.created ? `Created ${data.created} independent assignment${data.created===1?'':'s'}.` : 'These annotators already have this conversation.'); setSelected([]); await refresh();
  }
  async function reopen(row: Assignment) {
    setError(''); setBusy(true);
    try { const { error } = await supabase!.rpc('reopen_assignment', { p_assignment_id: row.id, p_revision: row.revision }); if (error) throw error; await refresh(); } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  async function resetAnnotations(row: Assignment) {
    if (!window.confirm(`Reset the ${row.task_type === 'label' ? 'Label' : 'Rate'} task for ${row.profiles?.username || 'this annotator'} on “${row.conversations?.label || 'this conversation'}”? It will return to Not started. Previous work will remain in revision history.`)) return;
    setError(''); setNotice(''); setBusy(true);
    try {
      const { data, error } = await supabase!.rpc('reset_annotation_assignment', { p_assignment_id: row.id, p_revision: row.revision });
      if (error) throw error;
      if (data?.id !== row.id || data.revision !== row.revision + 1 || data.status !== 'not_started' || data.annotations?.length !== 0 || Object.keys(data.turn_ratings || {}).length !== 0) throw new Error('Could not confirm reset. Refresh the assignment list before trying again.');
      setNotice(`Reset the ${row.task_type === 'label' ? 'Label' : 'Rate'} task for ${row.profiles?.username || 'the annotator'}. Previous work remains in revision history.`);
      await refresh();
    } catch (err) { setError(message(err)); }
    finally { setBusy(false); }
  }
  async function unassign(assignments: Assignment[]) {
    setError('');setNotice('');
    const {data,error}=await supabase!.rpc('unassign_annotation_assignments',{p_assignments:assignments.map(row=>({id:row.id,revision:row.revision}))});
    await refresh();
    if(error) throw new Error(message(error));
    setNotice(`Unassigned ${data.unassigned} conversation${data.unassigned===1?'':'s'}. Saved annotation work is retained.`);
  }
  async function exportAll() {
    setBusy(true); setError('');
    try {
      const fresh = await fetchAllRows<Assignment>('assignments','*, conversations(*), profiles!assignments_annotator_id_fkey(id, username, role)'); const data = await fetchAllRows<{hash:string;snapshot:RubricSnapshot}>('rubric_versions','hash, snapshot',['hash']);
      const versions = new Map(data.map(row => [row.hash, row.snapshot as RubricSnapshot]));
      const [baselines,revisionRows,captureAssets]=await Promise.all([fetchAllRows<LLMBaseline>('llm_baselines'),fetchAllRows('annotation_revisions','*',['assignment_id','revision']),captureAssetsForExport()]);
      const baselinesById=new Map(baselines.map(baseline=>[baseline.id,baseline]));
      download('study-annotations.json', { format_version: 'annotation-portal-study/2.1', exported_at: new Date().toISOString(), llm_baselines:baselines, revision_history:revisionRows, capture_assets:captureAssets, assignments: fresh.map(row => ({ assignment_id: row.id, task_type: row.task_type, annotator_id: row.annotator_id, annotation_source:row.annotation_source || 'blank', baseline_id:row.baseline_id || null, baseline_comparison:row.task_type==='label'&&row.baseline_id&&baselinesById.has(row.baseline_id)?compareWithBaseline(baselinesById.get(row.baseline_id)!.annotations,row.annotations):null, is_active:row.is_active!==false, unassigned_at:row.unassigned_at || null, status: row.status, revision: row.revision, rubric_hash: row.rubric_hash, submitted_at: row.submitted_at, turn_ratings: row.turn_ratings || {}, ...ratingQuestionMetadata(versions.get(row.rubric_hash)!), source_conversation_id: row.conversations!.transcript.source_conversation_id || null, repository_source: row.conversations!.transcript.repository_source || null, chatgpt_source: row.conversations!.transcript.chatgpt_source || null, ...C.buildExport(row.conversations!.transcript, row.annotations, versions.get(row.rubric_hash)!.rubric, row.profiles!.username) })) });
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  function originalLanguage(doc: DocumentRow) {
    if (doc.transcript.original_language) return doc.transcript.original_language;
    const original = documents.find(source => source.transcript.conversation_id === doc.transcript.source_conversation_id);
    if (original) return original.language;
    return doc.transcript.source_conversation_id || doc.transcript.repository_source?.version.includes('translation') ? 'Unknown' : doc.language;
  }
  const visible = rows;
  const menuDocuments = menu ? documents.filter(doc => menu.ids.includes(doc.id)) : [];
  return <main className="dashboard admin-dashboard">
    <div className="page-heading"><div><span className="eyebrow">ADMINISTRATION</span><h1>Conversations</h1><p>Manage transcripts and assign annotation work.</p></div><div className="actions"><button className="secondary" disabled={busy} onClick={() => { setError(''); void refresh(); }}>Refresh</button><button className="primary" onClick={() => setUploadOpen(true)}>Upload</button></div></div>
    {error && !uploadOpen && <p className="error" role="alert">{error}</p>}{notice && !uploadOpen && <p className="notice" role="status">{notice}</p>}
    
    <section className="card conversation-card" aria-label="Conversations">
      <div className="conversation-toolbar"><span>{documents.length} conversation{documents.length === 1 ? '' : 's'}{selected.length > 0 && ` · ${selected.length} selected`}</span>{selected.length > 0 && <button className="secondary" aria-haspopup="dialog" aria-expanded={menu?.ids.length === selected.length && menu?.anchor.dataset.bulk === 'true'} data-bulk="true" onClick={event => setMenu({ ids: selected, anchor: event.currentTarget })}>Assign selected</button>}</div>
      <div className="table-wrap"><table className="conversation-table"><thead><tr>
        <th className="select-column"><input type="checkbox" aria-label="Select all conversations" checked={documents.length > 0 && selected.length === documents.length} disabled={!documents.length} onChange={event => setSelected(event.target.checked ? documents.map(doc => doc.id) : [])} /></th>
        <th>Topic</th><th>Topic ID</th><th>Provider</th><th>Access type</th><th>Original language</th><th>Transcript language</th><th>ID</th><th>Assigned to</th><th aria-label="Actions"></th>
      </tr></thead><tbody>{documents.map(doc => {
        const assigned = rows.filter(row => row.conversation_id === doc.id);
        const people = [...new Set(assigned.map(row => row.annotator_id))].map(id => ({ id, username: assigned.find(row => row.annotator_id === id)?.profiles?.username || users.find(user => user.id === id)?.username || 'Annotator', tasks: [...new Set(assigned.filter(row => row.annotator_id === id).map(row => row.task_type))] }));
        const topic = doc.transcript.topic_name || doc.transcript.learning_topic || doc.label;
        const englishTopic = doc.transcript.topic_english_name || (doc.language === 'English' ? topic : documents.find(other => other.language === 'English' && doc.transcript.repository_source?.topic_id && other.transcript.repository_source?.topic_id === doc.transcript.repository_source.topic_id)?.transcript.learning_topic);
        return <tr key={doc.id} data-conversation-id={doc.id} className={selected.includes(doc.id) ? 'selected-row' : ''}>
          <td><input type="checkbox" aria-label={`Select ${doc.label}`} checked={selected.includes(doc.id)} onChange={event => setSelected(previous => event.target.checked ? [...previous, doc.id] : previous.filter(id => id !== doc.id))} /></td>
          <td className="topic-cell">{englishTopic && <small className="english-topic" lang="en">{englishTopic}</small>}<Link className="conversation-topic-link" to={`/conversations/${doc.id}/labeling`} title="View Labeling"><strong>{topic}</strong></Link><small>{doc.transcript.archive_source ? 'Prepared ChatGPT capture' : doc.transcript.chatgpt_source ? 'ChatGPT import' : doc.transcript.repository_source?.version || (doc.transcript.source_conversation_id ? 'Translation' : 'Original')} · {doc.transcript.messages.length} turns</small></td>
          <td className="metadata-id-cell"><code>{doc.transcript.topic_id || doc.transcript.repository_source?.topic_id || '—'}</code></td><td>{doc.transcript.provider || (doc.transcript.chatgpt_source ? 'ChatGPT' : '-')}</td><td>{doc.transcript.access_type || (doc.transcript.chatgpt_source ? 'chatbot' : '-')}</td>
          <td>{originalLanguage(doc)}</td><td>{doc.language}</td><td className="id-cell"><code>{doc.transcript.conversation_id || doc.id}</code></td>
          <td>{people.length ? <div className="assigned-users">{people.map(person => <span className="pill" key={person.id}>{person.username}<small>{person.tasks.map(task => task === 'label' ? 'Label' : 'Rate').join(' · ')}</small></span>)}</div> : <span className="unassigned">Unassigned</span>}</td>
          <td className="row-actions"><button className="conversation-menu-button" aria-label={`Assign users for ${doc.label}`} title="Assign users" aria-haspopup="dialog" aria-expanded={Boolean(menu?.ids.length === 1 && menu.ids[0] === doc.id)} disabled={busy} onClick={event => { const anchor = event.currentTarget; setMenu(previous => previous?.ids.length === 1 && previous.ids[0] === doc.id ? null : { ids: [doc.id], anchor }); }}>⋮</button></td>
        </tr>;
      })}</tbody></table></div>
      {loading ? <p className="empty" role="status">Loading conversations…</p> : !documents.length && <p className="empty">No conversations yet. Upload transcript files to get started.</p>}
    </section>
    {menu && menuDocuments.length > 0 && <AssignmentMenu key={menu.ids.join(':')} documents={menuDocuments} users={users} assignments={rows} anchor={menu.anchor} onUnassign={unassign} onAssign={assign} onClose={() => setMenu(null)} onDelete={document => { setMenu(null); setDeleteDocument(document); }} />}
    {deleteDocument && <DeleteConversation document={deleteDocument} onClose={() => setDeleteDocument(null)} onDeleted={async id => { setSelected(previous => previous.filter(value => value !== id)); setDocuments(previous => previous.filter(doc => doc.id !== id)); setRows(previous => previous.filter(row => row.conversation_id !== id)); setNotice('Conversation and associated annotation work deleted.'); await refresh(); }} />}
    <section className="card progress"><div className="progress-heading"><h2>Annotation progress</h2><button className="secondary" disabled={busy} onClick={() => void exportAll()}>Export all annotations</button></div><div className="table-wrap"><table><thead><tr><th>Conversation</th><th>Task</th><th>Annotator</th><th>Status</th><th>Work</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{visible.map(row => <tr key={row.id}><td>{row.conversations?.label}</td><td>{row.task_type === 'label' ? 'Label' : 'Rate'}</td><td>{row.profiles?.username}</td><td><span className={`status ${row.status}`}>{statusText(row.status)}</span></td><td>{row.task_type === 'label' ? `${row.annotations.length} highlights` : `${Object.keys(row.turn_ratings || {}).length} tutor turns rated`}</td><td>{new Date(row.updated_at).toLocaleString()}</td><td><Link to={`/assignments/${row.id}`}>View</Link>{row.status === 'submitted' && <button className="text-button" disabled={busy} onClick={() => void reopen(row)}>Reopen</button>}<button className="text-button" disabled={busy} onClick={() => void resetAnnotations(row)}>Reset</button></td></tr>)}</tbody></table>{!visible.length && <p className="empty">No assignments in this view.</p>}</div></section>
    <dialog ref={uploadDialog} className="upload-dialog" aria-labelledby="upload-title" onCancel={event => { if (busy) event.preventDefault(); else setUploadOpen(false); }} onClose={() => setUploadOpen(false)}>
      <div className="upload-heading"><div><h2 id="upload-title">Upload conversations</h2><p>Add transcript files directly to the conversation table.</p></div><button className="secondary" aria-label="Close upload" disabled={busy} onClick={() => setUploadOpen(false)}>Close</button></div>
      {uploadOpen && error && <p className="error" role="alert">{error}</p>}{uploadOpen && notice && <p className="notice" role="status">{notice}</p>}
      <section className="card"><h3>Upload files</h3><p>JSON conversations or text files with Tutor: and Student: turns.</p><label>Transcript language<input value={language} onChange={event => setLanguage(event.target.value)} required /></label><input ref={fileRef} type="file" accept=".json,.txt,.md" multiple disabled={busy} aria-label="Choose transcript files" onChange={event => void upload(event.target.files)} /><small>Used when a file has no language metadata. Original files are stored privately.</small></section>
    </dialog>
  </main>;
}
