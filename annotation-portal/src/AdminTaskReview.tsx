import {resolveCaptureDocument} from './capture-content';
import {hydrateRows} from './section-registry';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Editor } from './Editor';
import { C, supabase } from './lib';
import type { Annotation, Assignment, AssignmentType, DocumentRow, LLMBaseline, RubricSnapshot, TurnRatings } from './types';
import { validateTurnRatings } from './turn-ratings';

type Source = { key:string; label:string; rubricHash:string; annotations:Annotation[]; ratings:TurnRatings; baseline?:LLMBaseline };
const errorText=(error:unknown)=>error instanceof Error?error.message:(error as {message?:string})?.message||String(error);

export function AdminTaskReview({ taskType }: { taskType: AssignmentType }) {
  const { id }=useParams();
  const [document,setDocument]=useState<DocumentRow|null>(null);
  const [assignments,setAssignments]=useState<Assignment[]>([]);
  const [baselines,setBaselines]=useState<LLMBaseline[]>([]);
  const [sourceKey,setSourceKey]=useState('');
  const [rubric,setRubric]=useState<RubricSnapshot|null>(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    let alive=true;
    void (async()=>{
      setLoading(true);setError('');
      try{
        const [doc,work,versions]=await Promise.all([
          supabase!.from('conversations').select('*').eq('id',id).single(),
          supabase!.from('assignments').select('*, profiles!assignments_annotator_id_fkey(id, username, role)').eq('conversation_id',id).eq('task_type',taskType).eq('is_active',true).order('updated_at',{ascending:false}),
          taskType==='label'?supabase!.from('llm_baselines').select('*').eq('conversation_id',id).order('created_at',{ascending:false}):Promise.resolve({data:[],error:null})
        ]);
        if(doc.error)throw doc.error;if(work.error)throw work.error;if(versions.error)throw versions.error;
        const fullDocument=await resolveCaptureDocument(supabase!,doc.data as DocumentRow);
        const hydratedWork=await hydrateRows(supabase!,work.data as Assignment[]);
        const hydratedVersions=await hydrateRows(supabase!,versions.data as LLMBaseline[]);
        if(alive){setDocument(fullDocument);setAssignments(hydratedWork);setBaselines(hydratedVersions);}
      }catch(err){if(alive)setError(errorText(err));}
      finally{if(alive)setLoading(false);}
    })();
    return()=>{alive=false;};
  },[id,taskType]);
  const sources=useMemo<Source[]>(()=>[
    ...baselines.map((baseline,index)=>({key:`baseline:${baseline.id}`,label:`LLM baseline · ${new Date(baseline.created_at).toLocaleString()}${index===0?' · Latest':''}`,rubricHash:baseline.rubric_hash,annotations:baseline.annotations,ratings:{},baseline})),
    ...assignments.map(row=>({key:`assignment:${row.id}`,label:`${row.profiles?.username||'Annotator'} · ${row.status.replace('_',' ')} · ${new Date(row.updated_at).toLocaleString()}`,rubricHash:row.rubric_hash,annotations:row.annotations,ratings:row.turn_ratings||{}}))
  ],[assignments,baselines]);
  useEffect(()=>{if(!sources.some(source=>source.key===sourceKey))setSourceKey(sources[0]?.key||'');},[sources,sourceKey]);
  const source=sources.find(item=>item.key===sourceKey);
  useEffect(()=>{
    let alive=true;setRubric(null);
    if(!source)return;
    void (async()=>{
      try{
        const {data,error}=await supabase!.from('rubric_versions').select('snapshot').eq('hash',source.rubricHash).single();if(error)throw error;
        const snapshot=data.snapshot as RubricSnapshot;
        if(taskType==='label')C.validateAnnotations(document!.transcript,source.annotations,snapshot.rubric,{allowIncomplete:true});
        else validateTurnRatings(document!.transcript,source.ratings,snapshot);
        if(alive)setRubric(snapshot);
      }catch(err){if(alive)setError(errorText(err));}
    })();
    return()=>{alive=false;};
  },[source?.key,document?.id,taskType]);
  const title=taskType==='label'?'View Labeling':'View Rating';
  if(loading)return <main className="center"><p role="status">Loading {taskType==='label'?'label annotations':'turn ratings'}…</p></main>;
  if(error)return <main className="center"><p className="error" role="alert">{error}</p><Link to="/">Back to conversations</Link></main>;
  if(!document)return <main className="center"><p>Conversation not found.</p><Link to="/">Back to conversations</Link></main>;
  return <main className="editor-page admin-task-review">
    <div className="page-heading"><div><span className="eyebrow">{taskType.toUpperCase()} REVIEW</span><h1>{title}</h1><p>{document.transcript.learning_topic||document.label}</p></div><Link to="/" className="secondary">Back to conversations</Link></div>
    {sources.length>0&&<section className="card review-source"><label htmlFor="review-source">{taskType==='label'?'Annotation source':'Annotator'}</label><select id="review-source" value={sourceKey} onChange={event=>setSourceKey(event.target.value)}>{sources.map(item=><option key={item.key} value={item.key}>{item.label}</option>)}</select></section>}
    {!sources.length?<section className="card empty"><h2>No {taskType==='label'?'label annotations':'ratings'} yet</h2><p>Assign this task to an annotator to see their work here.</p></section>:source&&rubric&&<>
      <Editor key={source.key} conversationId={document.id} conversation={document.transcript} rubric={rubric} annotations={source.annotations} onChange={()=>{}} turnRatings={source.ratings} readonly taskType={taskType}/>
    </>}
  </main>;
}
