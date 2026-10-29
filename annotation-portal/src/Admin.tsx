import {ConversationRowLinks} from './ConversationRowLinks';
import {resolveCaptureDocument} from './capture-content';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { bundledRubric, C, download, fetchAllRows, supabase } from './lib';
import {fetchDashboardTopics,fetchTopicDashboardData,type DashboardTopic} from './dashboard-data';
import type { Assignment, AssignmentType, DocumentRow, Profile, RubricSnapshot } from './types';
import { AssignmentMenu } from './AssignmentMenu';
import { DeleteConversation } from './DeleteConversation';

import { captureAssetsForExport } from './CapturedTranscript';
import { identifyUploadedConversation } from './conversation-identity';
import { ratingQuestionMetadata } from './turn-ratings';
import { languageId, languageName } from './languages';
import { featureItemCount } from './feature-counts';
import { compareWithBaseline } from './baseline-comparison';
import type { LLMBaseline } from './types';
import { Toast, useToast } from './Toast';
import { conversationTitle } from './topic-groups';
import {conversationOrigin} from './conversation-origin';
import { providerGroups, providerLanguageGroups, providerLanguagePath } from './admin-conversation-groups';
import { ProviderOccurrenceComparison, SetOccurrenceComparison } from './SetOccurrenceComparison';
import { ProviderAccordion } from './ProviderAccordion';

const message = (error: unknown) => error instanceof Error ? error.message : (error as { message?: string })?.message || String(error);
const statusText = (status: string) => ({ not_started: 'Not started', in_progress: 'In progress', submitted: 'Submitted' })[status] || status;

export function Admin() {
  const { topicKey, provider, sourceLanguage } = useParams();
  const isGroupPage = Boolean(provider && sourceLanguage);
  const isTopicPage = Boolean(topicKey) && !isGroupPage;
  useEffect(() => { if (topicKey) void loadTopic(topicKey); setSelected([]); setMenu(null); setAssignmentPopup(null); }, [topicKey, provider, sourceLanguage]);
  const [rows, setRows] = useState<Assignment[]>([]); const [documents, setDocuments] = useState<DocumentRow[]>([]); const [users, setUsers] = useState<Profile[]>([]);
  const [topicHeaders,setTopicHeaders]=useState<DashboardTopic[]>([]);
  const [topicStatus,setTopicStatus]=useState<Record<string,'loading'|'loaded'|'error'>>({});
  const [topicErrors,setTopicErrors]=useState<Record<string,string>>({});
  const loadedTopics=useRef(new Map<string,Set<string>>());
  const topicRequests=useRef(new Map<string,Promise<void>>());
  const [error, setError] = useState(''); const [notice, setNotice] = useToast(); const [busy, setBusy] = useState(false); const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]); const [language, setLanguage] = useState('en');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteDocument, setDeleteDocument] = useState<DocumentRow | null>(null);
  const [menu, setMenu] = useState<{ ids: string[]; anchor: HTMLButtonElement; initialPanel?:'assign' } | null>(null);
  const [assignmentPopup, setAssignmentPopup] = useState<{ key: string; task: AssignmentType; assignments: Assignment[]; left: number; top: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null); const uploadDialog = useRef<HTMLDialogElement>(null);
  const refreshing=useRef(false);const rubricRegistered=useRef(false);
  function loadTopic(key:string,force=false):Promise<void>{
    const existing=topicRequests.current.get(key);if(existing)return existing;
    if(!force&&loadedTopics.current.has(key))return Promise.resolve();
    setTopicStatus(previous=>({...previous,[key]:'loading'}));
    const pending=(async()=>{
      try{
        const data=await fetchTopicDashboardData(key),oldIds=loadedTopics.current.get(key)||new Set<string>();
        loadedTopics.current.set(key,new Set(data.documents.map(d=>d.id)));
        setDocuments(previous=>[...previous.filter(d=>!oldIds.has(d.id)),...data.documents]);
        setRows(previous=>[...previous.filter(r=>!oldIds.has(r.conversation_id)),...data.assignments]);
        const available=new Set(data.documents.map(d=>d.id));setSelected(previous=>previous.filter(id=>!oldIds.has(id)||available.has(id)));
        setTopicStatus(previous=>({...previous,[key]:'loaded'}));setTopicErrors(previous=>({...previous,[key]:''}));
      }catch(err){setTopicErrors(previous=>({...previous,[key]:message(err)}));setTopicStatus(previous=>({...previous,[key]:'error'}));}
      finally{topicRequests.current.delete(key);}
    })();
    topicRequests.current.set(key,pending);return pending;
  }
  async function refresh(reloadLoaded=true) {
    if(refreshing.current)return;refreshing.current=true;
    try {
      const registration=(async()=>{
      if(rubricRegistered.current)return;
      const { data: version, error: rubricError } = await supabase!.from('rubric_versions').select('hash').eq('hash', bundledRubric.rubric_sha256).maybeSingle();
      if (rubricError) throw rubricError;
      if (!version) { const { error: insertError } = await supabase!.from('rubric_versions').insert({ hash: bundledRubric.rubric_sha256, snapshot: bundledRubric }); if (insertError && insertError.code !== '23505') throw insertError; }
      rubricRegistered.current=true;
      })();
      const [data]=await Promise.all([fetchDashboardTopics(),registration]);
      setTopicHeaders(data.topics);setUsers(data.users);
      const available=new Set(data.topics.map(t=>t.key)),removedIds=new Set<string>();
      for(const [key,ids] of loadedTopics.current)if(!available.has(key)){ids.forEach(id=>removedIds.add(id));loadedTopics.current.delete(key);}
      if(removedIds.size){setDocuments(previous=>previous.filter(d=>!removedIds.has(d.id)));setRows(previous=>previous.filter(r=>!removedIds.has(r.conversation_id)));setSelected(previous=>previous.filter(id=>!removedIds.has(id)));}
      if(reloadLoaded && topicKey)await loadTopic(topicKey,true);
    } catch (err) { setError(message(err)); } finally { refreshing.current=false;setLoading(false); }
  }
  useEffect(() => { void refresh(); const timer = setInterval(() => {if(globalThis.document.visibilityState==='visible')void refresh(false);}, 30000); return () => clearInterval(timer); }, []);
  useEffect(() => { if (uploadOpen) uploadDialog.current?.showModal(); else uploadDialog.current?.close(); }, [uploadOpen]);

  async function upload(files: FileList | null) {
    if (!files?.length) return; setBusy(true); setError(''); setNotice(''); let uploaded = 0;
    try {
      for (const file of Array.from(files)) {
        if (file.size > 2097152) throw new Error(`${file.name}: maximum size is 2 MB.`);
        const text = await file.text(); const parsed = file.name.endsWith('.json') ? JSON.parse(text) : null; const input = parsed?.conversation || parsed;
        const source = input ? C.normalizeConversation(input, file.name) : C.parseTranscript(text, file.name);
        if (input?.source_conversation_id) source.source_conversation_id = input.source_conversation_id;
        const originalLanguageInput = input?.original_language || input?.translation?.original_language || (!input?.source_conversation_id ? input?.configuration?.language || input?.metadata?.native_language || input?.language || language : null);
        source.original_language = originalLanguageInput ? languageId(originalLanguageInput) : null;
        const transcriptLanguage = languageId(input?.configuration?.language || input?.metadata?.native_language || input?.language || language);
        source.topic_id = input?.topic_id || input?.configuration?.topic_id || source.topic_id || null;
        source.topic_english_name = input?.topic_english_name || input?.metadata?.topic_english_name || (transcriptLanguage === 'en' ? source.learning_topic : null);
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
      await Promise.all(fresh.map(async row=>{if(row.conversations)row.conversations=await resolveCaptureDocument(supabase!,row.conversations);}));
      const versions = new Map(data.map(row => [row.hash, row.snapshot as RubricSnapshot]));
      const [baselines,revisionRows,captureAssets,sections]=await Promise.all([fetchAllRows<LLMBaseline>('llm_baselines'),fetchAllRows('annotation_revisions','*',['assignment_id','revision']),captureAssetsForExport(),fetchAllRows('conversation_sections','*',['conversation_id','turn_number','section_number'])]);
      const baselinesById=new Map(baselines.map(baseline=>[baseline.id,baseline]));
      download('study-annotations.json', { format_version: 'annotation-portal-study/2.1', exported_at: new Date().toISOString(), sections, llm_baselines:baselines, revision_history:revisionRows, capture_assets:captureAssets, assignments: fresh.map(row => ({ assignment_id: row.id, conversation_id: row.conversation_id, task_type: row.task_type, annotator_id: row.annotator_id, annotation_source:row.annotation_source || 'blank', baseline_id:row.baseline_id || null, baseline_comparison:row.task_type==='label'&&row.baseline_id&&baselinesById.has(row.baseline_id)?compareWithBaseline(baselinesById.get(row.baseline_id)!.annotations,row.annotations):null, is_active:row.is_active!==false, unassigned_at:row.unassigned_at || null, status: row.status, revision: row.revision, rubric_hash: row.rubric_hash, submitted_at: row.submitted_at, turn_ratings: row.turn_ratings || {}, ...ratingQuestionMetadata(versions.get(row.rubric_hash)!), source_conversation_id: conversationOrigin(row.conversations!).sourceId, repository_source: row.conversations!.transcript.repository_source || null, chatgpt_source: row.conversations!.transcript.chatgpt_source || null, ...C.buildExport(row.conversations!.transcript, row.annotations, versions.get(row.rubric_hash)!.rubric, row.profiles!.username) })) });
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  }
  function originalLanguage(doc: DocumentRow) {
    const language=conversationOrigin(doc,documents).originalLanguage;
    return language?languageName(language):'Unknown';
  }
  function showAssignmentPopup(anchor: HTMLButtonElement, key: string, task: AssignmentType, assignments: Assignment[]) {
    const rect = anchor.getBoundingClientRect();
    const height = Math.min(240, 64 + assignments.length * 32);
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - 268));
    const top = rect.bottom + height + 8 <= window.innerHeight ? rect.bottom + 8 : Math.max(8, rect.top - height - 8);
    setAssignmentPopup({ key, task, assignments, left, top });
  }
  const activeTopic = topicHeaders.find(topic => topic.key === topicKey);
  const topicDocuments = topicKey ? documents.filter(doc => loadedTopics.current.get(topicKey)?.has(doc.id)) : [];
  const activeGroup = providerLanguageGroups(topicDocuments).find(group => group.provider === provider && group.language === sourceLanguage);
  const groupDocuments = activeGroup?.attempts.flatMap(attempt => [attempt.document, ...attempt.translations]) || [];
  const groupIds = new Set(groupDocuments.map(doc => doc.id));
  const selectableDocuments = isGroupPage ? activeGroup?.attempts.map(attempt => attempt.document) || [] : [];
  const visible = isGroupPage ? rows.filter(row => groupIds.has(row.conversation_id)) : rows;
  const menuDocuments = menu ? documents.filter(doc => menu.ids.includes(doc.id)) : [];
  return <main className="dashboard admin-dashboard">
    <div className="page-heading"><div><span className="eyebrow">ADMINISTRATION</span><h1>{isGroupPage ? `${provider} / ${languageName(sourceLanguage)}` : isTopicPage ? activeTopic?.name || (loading ? 'Loading topic...' : topicKey) : 'Topics'}</h1><p>{isGroupPage ? activeTopic?.name || 'Loading topic...' : isTopicPage ? 'Choose a provider and language to view its conversation tries.' : 'Choose a topic to browse its conversations.'}</p></div><div className="actions"><Link className="secondary link-button" to="/statistics">Compare languages across topics</Link><Link className="secondary link-button" to={`/statistics?compare=models${topicKey ? `&topic=${encodeURIComponent(topicKey)}` : ''}`}>Compare models</Link><button className="secondary" disabled={busy} onClick={() => { setError(''); void refresh(); }}>Refresh</button><button className="primary" onClick={() => setUploadOpen(true)}>Upload</button></div></div>
    {error && !uploadOpen && <p className="error" role="alert">{error}</p>}{!uploadOpen && <Toast notice={notice} onDismiss={() => setNotice('')} />}
    
    {topicKey && <nav className="conversation-breadcrumbs" aria-label="Conversation navigation"><Link to="/">All topics</Link><span aria-hidden="true">/</span>{isGroupPage ? <><Link to={`/topics/${encodeURIComponent(topicKey)}`}>{activeTopic?.name || topicKey}</Link><span aria-hidden="true">/</span><span>{provider} / {languageName(sourceLanguage)}</span></> : <span>{activeTopic?.name || topicKey}</span>}</nav>}
    <section className="conversation-overview" aria-label="Conversations">
      {!topicKey ? <>
        {topicHeaders.map(topic => <Link className="card topic-link" key={topic.key} data-topic-key={topic.key} to={`/topics/${encodeURIComponent(topic.key)}`}><h2 lang="en">{topic.name}</h2><small>{topic.conversation_count} conversation records</small><span aria-hidden="true">&rarr;</span></Link>)}
        {loading ? <p className="card empty" role="status">Loading topics...</p> : !topicHeaders.length && <p className="card empty">No topics yet. Upload transcript files to get started.</p>}
      </> : isTopicPage ? <section className="card topic-provider-page" aria-label="Provider and language combinations">
        <div className="topic-group-actions"><Link to={`/topics/${encodeURIComponent(topicKey)}/labels`}>Compare feature labels</Link></div>
        {topicStatus[topicKey] === 'loading' && <p role="status">Loading providers and languages...</p>}
        {topicErrors[topicKey] && <div role="alert"><p className="error">{topicErrors[topicKey]}</p><button className="secondary" onClick={() => void loadTopic(topicKey, true)}>Retry loading conversations</button></div>}
        <div className="topic-providers">{providerGroups(topicDocuments).map(group => <ProviderAccordion topicKey={topicKey} provider={group.provider} key={`${topicKey}:${group.provider}`} summary={<><strong>{group.provider}</strong><small>{group.languages.length} {group.languages.length === 1 ? 'language' : 'languages'} &middot; {group.languages.reduce((n, language) => n + language.attempts.length, 0)} tries</small></>}>
          <div className="provider-language-list">{group.languages.map(entry => <Link className="provider-language-link" key={entry.language} to={providerLanguagePath(topicKey, entry.provider, entry.language)}><span><strong>{languageName(entry.language)}</strong></span><small>{entry.attempts.length} {entry.attempts.length === 1 ? 'try' : 'tries'} &middot; {entry.translationCount} {entry.translationCount === 1 ? 'translation' : 'translations'}</small><span aria-hidden="true">&rarr;</span></Link>)}</div>
          <ProviderOccurrenceComparison documents={topicDocuments} provider={group.provider} />
        </ProviderAccordion>)}</div>
        {topicStatus[topicKey] === 'loaded' && !topicDocuments.length && <p>No provider and language combinations for this topic.</p>}
      </section> : <>
        <div className="card conversation-toolbar"><span>{activeGroup?.attempts.length || 0} {activeGroup?.attempts.length === 1 ? 'try' : 'tries'} · {activeGroup?.translationCount || 0} {activeGroup?.translationCount === 1 ? 'translation' : 'translations'}{selected.length > 0 && ` · ${selected.length} selected`}</span><div className="conversation-toolbar-actions"><Link to={`/topics/${encodeURIComponent(topicKey!)}/labels`}>Compare feature labels</Link><label className="checkbox"><input type="checkbox" aria-label="Select all conversations in this group" checked={selectableDocuments.length > 0 && selectableDocuments.every(doc => selected.includes(doc.id))} disabled={!selectableDocuments.length} onChange={event => setSelected(event.target.checked ? selectableDocuments.map(doc => doc.id) : [])} />Select all tries</label>{selected.length > 0 && <button className="secondary" data-bulk="true" onClick={event => setMenu({ ids: selected, anchor: event.currentTarget })}>Assign selected</button>}</div></div>
        {activeGroup && topicStatus[topicKey!] === 'loaded' && <SetOccurrenceComparison key={`${topicKey}:${provider}:${sourceLanguage}`} documents={topicDocuments} currentGroup={activeGroup} />}
        {topicStatus[topicKey!] === 'loading' || loading ? <p role="status">Loading conversations...</p> : topicErrors[topicKey!] ? <div role="alert"><p>{topicErrors[topicKey!]}</p><button onClick={() => void loadTopic(topicKey!, true)}>Retry loading conversations</button></div> : activeGroup ? <section className="card conversation-attempts" aria-label="Conversation tries">
      <div className="table-wrap"><table className="conversation-table"><thead><tr>
        <th className="select-column" aria-label="Select"></th>
        <th>Try</th><th>Conversation and translations</th><th>Access type</th><th>Label</th><th>Rate</th>
      </tr></thead><tbody>{activeGroup.attempts.map(({ document: doc, translations }, attemptIndex) => {
        const assigned = rows.filter(row => row.conversation_id === doc.id);
        const assignmentsFor = (task: AssignmentType) => [...new Map(assigned.filter(row => row.task_type === task).map(row => [row.annotator_id, row])).values()].sort((a, b) => (a.profiles?.username || users.find(user => user.id === a.annotator_id)?.username || '').localeCompare(b.profiles?.username || users.find(user => user.id === b.annotator_id)?.username || ''));
        const labelAssignments = assignmentsFor('label');
        const rateAssignments = assignmentsFor('rate');
        const topic = conversationTitle(doc);
        return <tr key={doc.id} data-conversation-id={doc.id} className={selected.includes(doc.id) ? 'selected-row' : ''}>
          <td><input type="checkbox" aria-label={`Select ${doc.label}`} checked={selected.includes(doc.id)} onChange={event => setSelected(previous => event.target.checked ? [...previous, doc.id] : previous.filter(id => id !== doc.id))} /></td>
          <td className="attempt-number">Try {attemptIndex + 1}<small><time dateTime={doc.created_at}>{new Date(doc.created_at).toLocaleDateString()}</time></small></td>
          <td className="topic-cell"><div className="conversation-title-links"><Link className="conversation-topic-link" to={`/conversations/${doc.id}/labeling`} title="View Labeling"><strong lang={doc.language}>{topic}</strong></Link><ConversationRowLinks document={doc} busy={busy} onAssign={anchor=>setMenu({ids:[doc.id],anchor,initialPanel:'assign'})} onDelete={()=>{setMenu(null);setDeleteDocument(doc);}}/></div><small>{(doc.is_html_capture || doc.transcript.html_content) ? (conversationOrigin(doc,documents).translated?`Translated from ${originalLanguage(doc)}`:'Original HTML capture') : doc.transcript.archive_source ? 'Prepared ChatGPT capture' : doc.transcript.chatgpt_source ? 'ChatGPT import' : doc.transcript.repository_source?.version || (doc.transcript.source_conversation_id ? 'Translation' : 'Original')} · {doc.turn_count ?? doc.transcript.messages.length} turns</small>{conversationOrigin(doc,documents).sourceId && documents.some(other => other.id === conversationOrigin(doc,documents).sourceId) && <small><Link to={`/conversations/${conversationOrigin(doc,documents).sourceId}/labeling`}>View original capture</Link></small>}{translations.map(translation => <div className="conversation-translation" key={translation.id} data-translation-id={translation.id}><strong>{languageName(translation.language)} translation</strong>{translation.transcript.translation?.alignment_status==='stale'&&<small role="status">Retranslation needed: section grouping changed.</small>}<Link to={`/conversations/${translation.id}`}>View</Link><Link to={`/conversations/${translation.id}/labeling`}>Label</Link><Link to={`/conversations/${translation.id}/rating`}>Rate</Link><Link to={`/conversations/${translation.id}/baselines`}>Baselines</Link><button type="button" className="text-button" aria-label={`Assign users for ${translation.label}`} onClick={event => setMenu({ ids: [translation.id], anchor: event.currentTarget })}>Manage</button></div>)}</td>
          <td>{doc.transcript.access_type || (doc.transcript.chatgpt_source ? 'chatbot' : '-')}</td>
          <td><button type="button" className="assignment-count" aria-label={`Label: ${labelAssignments.filter(row => row.status === 'submitted').length} completed of ${labelAssignments.length} assigned`} aria-describedby={assignmentPopup?.key === `${doc.id}:label` ? 'assignment-progress-popup' : undefined} onMouseEnter={event => showAssignmentPopup(event.currentTarget, `${doc.id}:label`, 'label', labelAssignments)} onMouseLeave={() => setAssignmentPopup(null)} onFocus={event => showAssignmentPopup(event.currentTarget, `${doc.id}:label`, 'label', labelAssignments)} onBlur={() => setAssignmentPopup(null)}>{labelAssignments.filter(row => row.status === 'submitted').length}/{labelAssignments.length}</button></td>
          <td><button type="button" className="assignment-count" aria-label={`Rate: ${rateAssignments.filter(row => row.status === 'submitted').length} completed of ${rateAssignments.length} assigned`} aria-describedby={assignmentPopup?.key === `${doc.id}:rate` ? 'assignment-progress-popup' : undefined} onMouseEnter={event => showAssignmentPopup(event.currentTarget, `${doc.id}:rate`, 'rate', rateAssignments)} onMouseLeave={() => setAssignmentPopup(null)} onFocus={event => showAssignmentPopup(event.currentTarget, `${doc.id}:rate`, 'rate', rateAssignments)} onBlur={() => setAssignmentPopup(null)}>{rateAssignments.filter(row => row.status === 'submitted').length}/{rateAssignments.length}</button></td>
        </tr>;
      })}</tbody></table></div>
        </section> : <p className="card empty">No conversations for this provider and language. <Link to="/">Browse topics</Link></p>}
      </>}
    </section>
    {assignmentPopup && createPortal(<div id="assignment-progress-popup" className="assignment-progress-popup" role="tooltip" style={{ left: assignmentPopup.left, top: assignmentPopup.top }}><strong>{assignmentPopup.task === 'label' ? 'Label' : 'Rate'} · {assignmentPopup.assignments.filter(row => row.status === 'submitted').length}/{assignmentPopup.assignments.length} completed</strong>{assignmentPopup.assignments.length ? <ul>{assignmentPopup.assignments.map(row => <li key={row.annotator_id}><span>{row.profiles?.username || users.find(user => user.id === row.annotator_id)?.username || 'Annotator'}</span><small>{statusText(row.status)}</small></li>)}</ul> : <p>No annotators assigned</p>}</div>, document.body)}
    {menu && menuDocuments.length > 0 && <AssignmentMenu initialPanel={menu.initialPanel} key={menu.ids.join(':')} documents={menuDocuments} users={users} assignments={rows} anchor={menu.anchor} onUnassign={unassign} onAssign={assign} onClose={() => setMenu(null)} onDelete={document => { setMenu(null); setDeleteDocument(document); }} />}
    {deleteDocument && <DeleteConversation document={deleteDocument} onClose={() => setDeleteDocument(null)} onDeleted={async id => { setSelected(previous => previous.filter(value => value !== id)); setDocuments(previous => previous.filter(doc => doc.id !== id)); setRows(previous => previous.filter(row => row.conversation_id !== id)); setNotice('Conversation and associated annotation work deleted.'); await refresh(); }} />}
    {isGroupPage && <section className="card progress"><div className="progress-heading"><h2>{isGroupPage ? 'Annotation progress for this group' : 'Annotation progress for loaded topics'}</h2><button className="secondary" disabled={busy} onClick={() => void exportAll()}>Export all annotations</button></div><div className="table-wrap"><table><thead><tr><th>Conversation</th><th>Task</th><th>Annotator</th><th>Status</th><th>Work</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{visible.map(row => <tr key={row.id}><td>{row.conversations?.label}</td><td>{row.task_type === 'label' ? 'Label' : 'Rate'}</td><td>{row.profiles?.username}</td><td><span className={`status ${row.status}`}>{statusText(row.status)}</span></td><td>{row.task_type === 'label' ? (row.rubric_hash === bundledRubric.rubric_sha256 || row.annotations.some(a => a.entry.category) ? `${row.annotations.reduce((n, a) => n + featureItemCount(a), 0)} occurrences; ${new Set(row.annotations.flatMap(a => a.section_id ? [a.section_id] : a.evidence.map(e => `${e.turn_id}:${e.start}:${e.end}`))).size} sections` : `${row.annotations.length} highlights`) : `${Object.keys(row.turn_ratings || {}).length} tutor turns rated`}</td><td>{new Date(row.updated_at).toLocaleString()}</td><td><Link to={`/assignments/${row.id}`}>View</Link>{row.status === 'submitted' && <button className="text-button" disabled={busy} onClick={() => void reopen(row)}>Reopen</button>}<button className="text-button" disabled={busy} onClick={() => void resetAnnotations(row)}>Reset</button></td></tr>)}</tbody></table>{!visible.length && <p className="empty">No assignments in this view.</p>}</div></section>}
    <dialog ref={uploadDialog} className="upload-dialog" aria-labelledby="upload-title" onCancel={event => { if (busy) event.preventDefault(); else setUploadOpen(false); }} onClose={() => setUploadOpen(false)}>
      <div className="upload-heading"><div><h2 id="upload-title">Upload conversations</h2><p>Add transcript files directly to the conversation table.</p></div><button className="secondary" aria-label="Close upload" disabled={busy} onClick={() => setUploadOpen(false)}>Close</button></div>
      {uploadOpen && error && <p className="error" role="alert">{error}</p>}{uploadOpen && <Toast notice={notice} onDismiss={() => setNotice('')} />}
      <section className="card"><h3>Upload files</h3><p>JSON conversations or text files with Tutor: and Student: turns.</p><label>Transcript language code<input value={language} onChange={event => setLanguage(event.target.value)} required /></label><input ref={fileRef} type="file" accept=".json,.txt,.md" multiple disabled={busy} aria-label="Choose transcript files" onChange={event => void upload(event.target.files)} /><small>Use en or ta. Used when a file has no language metadata. Original files are stored privately.</small></section>
    </dialog>
  </main>;
}
