import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import type { Assignment, AssignmentType, DocumentRow, LLMBaseline, Profile } from './types';
import { bundledRubric, supabase } from './lib';

interface Props {
  initialPanel?:'menu'|'assign';
  documents: DocumentRow[]; users: Profile[]; assignments: Assignment[]; anchor: HTMLButtonElement;
  onAssign: (documentIds: string[], userIds: string[], baselineIds: Record<string,string>, taskTypes: AssignmentType[]) => Promise<void>; onClose: () => void;
  onDelete: (document: DocumentRow) => void;
  onUnassign: (assignments: Assignment[]) => Promise<void>;
}

export function AssignmentMenu({ documents, users, assignments, anchor, onAssign, onClose, onDelete, onUnassign,initialPanel='menu' }: Props) {
  const [panel, setPanel] = useState<'menu'|'assign'>(initialPanel);
  const [task, setTask] = useState<AssignmentType>('label');
  const [selected, setSelected] = useState<Record<AssignmentType,string[]>>({ label: [], rate: [] });
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [removing, setRemoving] = useState<Profile|null>(null);
  const [baselines, setBaselines] = useState<LLMBaseline[]>([]); const [baselineIds, setBaselineIds] = useState<Record<string,string>>({});
  const [loadingBaselines, setLoadingBaselines] = useState(true); const [baselineError, setBaselineError] = useState('');
  const menu = useRef<HTMLFormElement>(null); const close = useRef(onClose); close.current=onClose; const working=useRef(false);
  const rect=anchor.getBoundingClientRect(); const width=Math.min(390,window.innerWidth-24); const left=Math.max(12,Math.min(rect.right-width,window.innerWidth-width-12));
  const spaceBelow=window.innerHeight-rect.bottom-20; const above=spaceBelow<Math.min(350,window.innerHeight/2)&&rect.top>spaceBelow;
  const position=above?{bottom:Math.max(12,window.innerHeight-rect.top+8)}:{top:Math.min(rect.bottom+8,window.innerHeight-100)};
  const maxHeight=Math.max(100,above?rect.top-20:spaceBelow); const ids=new Set(documents.map(doc=>doc.id));
  const current=assignments.filter(row=>ids.has(row.conversation_id)); const taskRows=current.filter(row=>row.task_type===task);
  const documentKey=documents.map(document=>document.id).join(':');
  const selectedUsers=selected[task];
  function count(userId:string){return new Set(taskRows.filter(row=>row.annotator_id===userId).map(row=>row.conversation_id)).size;}
  function fullyAssigned(userId:string){return documents.length>0&&documents.every(doc=>taskRows.some(row=>row.conversation_id===doc.id&&row.annotator_id===userId));}
  useEffect(()=>{let alive=true;setLoadingBaselines(true);void supabase!.from('llm_baselines').select('*').in('conversation_id',documents.map(d=>d.id)).order('created_at',{ascending:false}).then(({data,error})=>{
    if(!alive)return;if(error)setBaselineError('Could not load LLM baselines. Blank assignments are still available.');else{const rows=(data as LLMBaseline[]).filter(row=>row.rubric_hash===bundledRubric.rubric_sha256);setBaselines(rows);setBaselineIds(Object.fromEntries(documents.map(d=>[d.id,rows.find(row=>row.conversation_id===d.id)?.id||''])));}setLoadingBaselines(false);
  });return()=>{alive=false;};},[documentKey]);
  useEffect(()=>{const element=menu.current!;element.querySelector<HTMLButtonElement>('button')?.focus({preventScroll:true});
    function dismiss(event:PointerEvent){if(!working.current&&!element.contains(event.target as Node)&&!anchor.contains(event.target as Node))close.current();}
    function key(event:KeyboardEvent){if(event.key==='Escape'&&!working.current){event.preventDefault();close.current();}}
    document.addEventListener('pointerdown',dismiss);element.addEventListener('keydown',key);return()=>{document.removeEventListener('pointerdown',dismiss);element.removeEventListener('keydown',key);if(anchor.isConnected)anchor.focus({preventScroll:true});};
  },[anchor]);
  async function submit(event:FormEvent){event.preventDefault();if(working.current||!selectedUsers.length)return;working.current=true;setBusy(true);setError('');
    try{await onAssign(documents.map(d=>d.id),selectedUsers,Object.fromEntries(Object.entries(baselineIds).filter(([,value])=>value)),[task]);setSelected(previous=>({...previous,[task]:[]}));}
    catch(err){setError(err instanceof Error?err.message:'Could not assign conversations. Try again.');}finally{working.current=false;setBusy(false);}
  }
  async function unassign(){if(!removing||working.current)return;working.current=true;setBusy(true);setError('');try{await onUnassign(taskRows.filter(row=>row.annotator_id===removing.id));setRemoving(null);}catch(err){setError(err instanceof Error?err.message:'Could not unassign annotator.');}finally{working.current=false;setBusy(false);}}
  return createPortal(<form ref={menu} className="assignment-menu" role="dialog" aria-label={panel==='menu'?'Conversation actions':'Assign tasks'} style={{left,width,maxHeight,...position}} onSubmit={submit}>
    <button className="dismiss" type="button" disabled={busy} onClick={onClose} aria-label="Close menu">×</button>
    <h3>{panel==='menu'?'Conversation actions':'Assign annotators'}</h3><p>{documents.length===1?documents[0].transcript.learning_topic||documents[0].label:`${documents.length} selected conversations`}</p>
    {panel==='menu'?<>
      {documents.length===1&&<><Link className="view-annotate-link" to={`/conversations/${documents[0].id}/labeling`}>View Labeling</Link><Link className="view-annotate-link" to={`/conversations/${documents[0].id}/rating`}>View Rating</Link><Link className="view-annotate-link" to={`/conversations/${documents[0].id}`}>View conversation</Link></>}
      <button type="button" className="primary assignment-open" onClick={()=>{setPanel('assign');setError('');}}>Assign</button>
      {documents.length===1&&<div className="conversation-menu-delete"><button className="delete-action" type="button" disabled={busy} onClick={()=>onDelete(documents[0])}>Delete conversation</button></div>}
    </>:<>
      <div className="task-tabs" role="tablist" aria-label="Assignment type"><button type="button" role="tab" aria-selected={task==='label'} className={task==='label'?'active':''} onClick={()=>{setTask('label');setError('');}}>Instructional features</button><button type="button" role="tab" aria-selected={task==='rate'} className={task==='rate'?'active':''} onClick={()=>{setTask('rate');setError('');}}>Turn rating</button></div>
      {task==='label'&&<fieldset><legend>Start from an LLM baseline</legend><p className="field-hint">Choose a baseline version for each conversation, or start with blank annotations.</p>{documents.map(document=><label key={document.id}>Baseline{documents.length>1?` · ${document.transcript.learning_topic||document.label}`:''}<select aria-label={`LLM baseline for ${document.label}`} disabled={busy||loadingBaselines} value={baselineIds[document.id]||''} onChange={event=>setBaselineIds(previous=>({...previous,[document.id]:event.target.value}))}><option value="">Blank annotations</option>{baselines.filter(row=>row.conversation_id===document.id).map((row,index)=><option key={row.id} value={row.id}>{row.model} · {new Date(row.created_at).toLocaleString()}{index===0?' · Latest':''}</option>)}</select></label>)}</fieldset>}
      {baselineError&&task==='label'&&<p className="error" role="alert">{baselineError}</p>}
      {users.length?<fieldset><legend>Select annotators</legend>{users.map(user=>{const assigned=fullyAssigned(user.id);const n=count(user.id);return <label className="checkbox" key={user.id}><input type="checkbox" disabled={busy||assigned} checked={assigned||selectedUsers.includes(user.id)} onChange={event=>setSelected(previous=>({...previous,[task]:event.target.checked?[...previous[task],user.id]:previous[task].filter(id=>id!==user.id)}))}/><span>{user.username}<small>{user.role==='admin'?'Administrator':'Annotator'}{n>0&&` · Assigned to ${n} of ${documents.length}`}</small></span></label>;})}</fieldset>:<p>No portal users are available to assign.</p>}
      {taskRows.length>0&&<fieldset><legend>Currently assigned</legend>{users.filter(user=>count(user.id)>0).map(user=><div key={user.id} className="actions"><span>{user.username}{documents.length>1?` (${count(user.id)} conversations)`:''}</span><button type="button" className="text-button" disabled={busy} onClick={()=>{setRemoving(user);setError('');}}>Unassign</button></div>)}</fieldset>}
      {removing&&<div className="notice"><strong>Unassign {removing.username} from {count(removing.id)} conversation{count(removing.id)===1?'':'s'}?</strong><p>Saved work and history are retained.</p><div className="actions"><button type="button" className="secondary" disabled={busy} onClick={()=>setRemoving(null)}>Cancel</button><button type="button" className="delete-confirm" disabled={busy} onClick={()=>void unassign()}>Confirm unassign</button></div></div>}
      {error&&<p className="error" role="alert">{error}</p>}
      <div className="actions">{initialPanel!=='assign'&&<button type="button" className="secondary" disabled={busy} onClick={()=>{setPanel('menu');setError('');}}>Back</button>}<button type="submit" className="primary" disabled={busy||Boolean(removing)||loadingBaselines||!selectedUsers.length}>{busy?'Assigning…':`Assign ${task==='label'?'labeling':'rating'}`}</button></div>
    </>}
  </form>,document.body);
}
