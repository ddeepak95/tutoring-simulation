import {resolveCaptureDocument} from './capture-content';
import {hydrateRows} from './section-registry';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from './Editor';
import { C, supabase, bundledRubric } from './lib';
import type { Annotation, Assignment, AssignmentType, DocumentRow, LLMBaseline, RubricSnapshot, TurnRatings } from './types';
import { validateTurnRatings } from './turn-ratings';
import { ApiLabelComparison } from './ApiLabelComparison';
import { canCompareApiTranslation } from './api-translation';
import { ConversationBreadcrumbs } from './ConversationBreadcrumbs';

type HtmlRatingRun = {id:string;model:string;prompt_version:string;capture_version_hash:string;created_at:string;rubric_hash:string;rubric_snapshot:RubricSnapshot;ratings:{turn_id:string;values:Record<string,{score:number|'N/A';reason:string}>}[]};
type Source = { key:string; label:string; rubricHash:string; annotations:Annotation[]; ratings:TurnRatings; baseline?:LLMBaseline; rubricSnapshot?:RubricSnapshot; ratingReasons?:Record<string,Record<string,string>> };
const errorText=(error:unknown)=>error instanceof Error?error.message:(error as {message?:string})?.message||String(error);

export function AdminTaskReview({ taskType }: { taskType: AssignmentType }) {
  const { id }=useParams();
  const [document,setDocument]=useState<DocumentRow|null>(null);
  const [assignments,setAssignments]=useState<Assignment[]>([]);
  const [baselines,setBaselines]=useState<LLMBaseline[]>([]);
  const [htmlRatingRuns,setHtmlRatingRuns]=useState<HtmlRatingRun[]>([]);
  const [sourceKey,setSourceKey]=useState('');
  const [rubric,setRubric]=useState<RubricSnapshot|null>(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  const [compareLanguages,setCompareLanguages]=useState(false);
  useEffect(()=>{
    let alive=true;
    void (async()=>{
      setLoading(true);setError('');setCompareLanguages(false);
      try{
        const [doc,work,versions,modelRatings]=await Promise.all([
          supabase!.from('conversations').select('*').eq('id',id).single(),
          supabase!.from('assignments').select('*, profiles!assignments_annotator_id_fkey(id, username, role)').eq('conversation_id',id).eq('task_type',taskType).eq('is_active',true).order('updated_at',{ascending:false}),
          taskType==='label'?supabase!.from('llm_baselines').select('*').eq('conversation_id',id).order('created_at',{ascending:false}):Promise.resolve({data:[],error:null}),
          taskType==='rate'?supabase!.from('conversation_html_rating_runs').select('id,model,prompt_version,capture_version_hash,created_at,rubric_hash,rubric_snapshot,ratings').eq('conversation_id',id).eq('status','completed').order('created_at',{ascending:false}):Promise.resolve({data:[],error:null})
        ]);
        if(doc.error)throw doc.error;if(work.error)throw work.error;if(versions.error)throw versions.error;
        // Other deployments may not have installed the screenshot-rating migration yet.
        if(modelRatings.error&&!['PGRST205','42P01'].includes(modelRatings.error.code))throw modelRatings.error;
        const fullDocument=await resolveCaptureDocument(supabase!,doc.data as DocumentRow);
        const hydratedWork=await hydrateRows(supabase!,work.data as Assignment[]);
        const hydratedVersions=await hydrateRows(supabase!,versions.data as LLMBaseline[]);
        if(alive){setDocument(fullDocument);setAssignments(hydratedWork);setBaselines(hydratedVersions);setHtmlRatingRuns(((modelRatings.data||[]) as HtmlRatingRun[]).filter(run=>run.capture_version_hash===fullDocument.transcript.html_content?.version_hash));}
      }catch(err){if(alive)setError(errorText(err));}
      finally{if(alive)setLoading(false);}
    })();
    return()=>{alive=false;};
  },[id,taskType]);
  const sources=useMemo<Source[]>(()=>[
    ...baselines.map((baseline,index)=>({key:`baseline:${baseline.id}`,label:`LLM baseline · Prompt ${baseline.prompt_version || 'not recorded'} · ${baseline.model} · ${new Date(baseline.created_at).toLocaleString()}${index===0?' · Latest':''}`,rubricHash:baseline.rubric_hash,annotations:baseline.annotations,ratings:{},baseline})),
    ...htmlRatingRuns.map((run,index)=>({key:`model:${run.id}`,label:`Model rating · ${run.model} · ${run.prompt_version} · ${new Date(run.created_at).toLocaleString()}${index===0?' · Latest':''}`,rubricHash:run.rubric_hash,rubricSnapshot:run.rubric_snapshot,annotations:[],ratings:Object.fromEntries(run.ratings.map(turn=>[turn.turn_id,{values:Object.fromEntries(Object.entries(turn.values).map(([key,value])=>[key,String(value.score)])),notes:''}])),ratingReasons:Object.fromEntries(run.ratings.map(turn=>[turn.turn_id,Object.fromEntries(Object.entries(turn.values).map(([key,value])=>[key,value.reason]))]))})),
    ...assignments.map(row=>({key:`assignment:${row.id}`,label:`${row.profiles?.username||'Annotator'} · ${row.status.replace('_',' ')} · ${new Date(row.updated_at).toLocaleString()}`,rubricHash:row.rubric_hash,annotations:row.annotations,ratings:row.turn_ratings||{}}))
  ],[assignments,baselines,htmlRatingRuns]);
  useEffect(()=>{if(!sources.some(source=>source.key===sourceKey))setSourceKey(sources[0]?.key||'');},[sources,sourceKey]);
  const source=sources.find(item=>item.key===sourceKey);
  useEffect(()=>{
    let alive=true;setRubric(null);
    if(!source)return;
    void (async()=>{
      try{
        const {data,error}=source.rubricSnapshot?{data:{snapshot:source.rubricSnapshot},error:null}:await supabase!.from('rubric_versions').select('snapshot').eq('hash',source.rubricHash).single();if(error)throw error;
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
  if(error)return <main className="center"><p className="error" role="alert">{error}</p><ConversationBreadcrumbs document={document}/></main>;
  if(!document)return <main className="center"><p>Conversation not found.</p><ConversationBreadcrumbs document={null}/></main>;
  return <main className="editor-page admin-task-review">
    <div className="page-heading"><div><span className="eyebrow">{taskType.toUpperCase()} REVIEW</span><h1>{title}</h1><p>{document.transcript.learning_topic||document.label}</p></div></div>
    {document.transcript.translation?.alignment_status==='stale'&&<p className="notice" role="status">Retranslation needed: section grouping changed. This translation uses the previous section map.</p>}
    <ConversationBreadcrumbs document={document} currentPage={taskType === 'label' ? 'Labeling' : 'Rating'}/>
    {taskType==='label'&&canCompareApiTranslation(document.transcript)&&<button type="button" className="secondary" aria-pressed={compareLanguages} onClick={()=>setCompareLanguages(value=>!value)}>{compareLanguages?'Show single-language labels':'Compare labels side by side'}</button>}
    {sources.length>0&&!compareLanguages&&<section className="card review-source"><label htmlFor="review-source">{taskType==='label'?'Annotation source':htmlRatingRuns.length?'Rating source':'Annotator'}</label><select id="review-source" value={sourceKey} onChange={event=>setSourceKey(event.target.value)}>{sources.map(item=><option key={item.key} value={item.key}>{item.label}</option>)}</select></section>}
    {compareLanguages?<ApiLabelComparison key={document.id} conversationId={document.id} conversation={document.transcript} initialSourceKey={sourceKey}/>:!sources.length?<section className="card empty"><h2>No {taskType==='label'?'label annotations':'ratings'} yet</h2><p>Assign this task to an annotator to see their work here.</p></section>:source&&rubric&&<>
      <Editor key={source.key} conversationId={document.id} conversation={document.transcript} rubric={rubric} annotations={source.annotations} onChange={()=>{}} turnRatings={source.ratings} ratingReasons={source.ratingReasons} readonly taskType={taskType}/>
    </>}
    {!sources.length&&taskType==='rate'&&document.transcript.html_content&&<Editor key={document.id} conversationId={document.id} conversation={document.transcript} rubric={bundledRubric} annotations={[]} onChange={()=>{}} turnRatings={{}} readonly taskType="rate"/>}
  </main>;
}
