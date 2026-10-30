import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {supabase} from './lib';
import {Editor} from './Editor';
import {ConversationBreadcrumbs} from './ConversationBreadcrumbs';
import {AdminTaskReview} from './AdminTaskReview';
import ratingQuestions from './generated/rating-questions.json';
import type {Conversation,DocumentRow,RatingDimension,RubricSnapshot,TurnRatings} from './types';

type Score={score:number|'N/A';reason:string};
type RatedTurn={turn_id:string;values:Record<string,Score>};
type RatingRun={id:string;status:'completed'|'failed';model:string;prompt_version:string;ratings:RatedTurn[];error:string|null;created_at:string;rubric_hash:string;rubric_snapshot:{rating_dimensions:RatingDimension[]}};

export function MarkerFreeRatingReview(){
 const {id}=useParams();
 const [version,setVersion]=useState<Conversation|null>(null),[document,setDocument]=useState<DocumentRow|null>(null),[runs,setRuns]=useState<RatingRun[]>([]),[selected,setSelected]=useState('');
 const [loading,setLoading]=useState(true),[fallback,setFallback]=useState(false),[error,setError]=useState('');
 useEffect(()=>{
  let alive=true;setLoading(true);setError('');setFallback(false);
  void (async()=>{
   const [versionResult,documentResult,runsResult]=await Promise.all([
    supabase!.from('conversation_versions').select('transcript,section_mode').eq('conversation_id',id).eq('version_key','marker-free-v1').maybeSingle(),
    supabase!.from('conversation_details').select('id,label,language,created_at,source_path,source_conversation_id,topic_id,generic_topic_name,conversation_title,transcript').eq('id',id).single(),
    supabase!.from('conversation_version_rating_runs').select('id,status,model,prompt_version,ratings,error,created_at,rubric_hash,rubric_snapshot').eq('conversation_id',id).eq('version_key','marker-free-v1').order('created_at',{ascending:false})
   ]);
   if(versionResult.error&&['PGRST205','42P01'].includes(versionResult.error.code)){if(alive)setFallback(true);return;}
   if(versionResult.error)throw versionResult.error;
   if(!versionResult.data){if(alive)setFallback(true);return;}
   if(documentResult.error)throw documentResult.error;
   if(runsResult.error&&!['PGRST205','42P01'].includes(runsResult.error.code))throw runsResult.error;
   if(versionResult.data.section_mode!=='none')throw Error('This conversation version is not marker-free.');
   if(alive){
    const loadedRuns=(runsResult.data||[]) as RatingRun[];
    setVersion(versionResult.data.transcript as Conversation);
    setDocument(documentResult.data as DocumentRow);
    setRuns(loadedRuns);
    setSelected(current=>loadedRuns.some(run=>run.id===current)?current:loadedRuns[0]?.id||'');
   }
  })().catch(caught=>{if(alive)setError(caught.message||'Could not load marker-free ratings.');}).finally(()=>{if(alive)setLoading(false);});
  return()=>{alive=false;};
 },[id]);
 if(loading)return <main className="center" role="status">Loading ratings…</main>;
 if(fallback)return <AdminTaskReview taskType="rate"/>;
 if(error||!version)return <main className="center"><p role="alert" className="error">{error||'Marker-free version unavailable.'}</p></main>;
 const run=runs.find(item=>item.id===selected)||runs[0];
 if(run&&!Array.isArray(run.rubric_snapshot?.rating_dimensions))return <main className="center"><p role="alert" className="error">This rating run has no saved rating rubric.</p></main>;
 const turnRatings:TurnRatings=Object.fromEntries((run?.status==='completed'?run.ratings:[]).map(item=>[item.turn_id,{values:Object.fromEntries(Object.entries(item.values).map(([key,value])=>[key,String(value.score)])),notes:''}]));
 const ratingReasons=Object.fromEntries((run?.status==='completed'?run.ratings:[]).map(item=>[item.turn_id,Object.fromEntries(Object.entries(item.values).map(([key,value])=>[key,value.reason]))]));
 const rubric:RubricSnapshot={rubric_source:'conversation-evaluation/human-annotation/rating-questions.md',rubric_sha256:run?.rubric_hash||'',rubric:[],rating_dimensions:run?.rubric_snapshot.rating_dimensions||ratingQuestions};
 return <main className="editor-page admin-task-review"><ConversationBreadcrumbs document={document} currentPage="Rating"/>
  <div className="page-heading"><div><span className="eyebrow">MODEL RATING REVIEW</span><h1>View Rating</h1><p>{version.learning_topic||version.label}</p></div><Link className="secondary" to={`/conversations/${id}/labeling`}>View labeling</Link></div>
  {runs.length>0&&<section className="card review-source"><label htmlFor="marker-free-rating-run">Rating run</label><select id="marker-free-rating-run" value={run?.id||''} onChange={event=>setSelected(event.target.value)}>{runs.map((item,index)=><option key={item.id} value={item.id}>{item.model} · {item.prompt_version} · {new Date(item.created_at).toLocaleString()} · {item.status}{index===0?' · Latest':''}</option>)}</select></section>}
  {run?.status==='failed'&&<p className="notice" role="status">Rating validation failed: {run.error}</p>}
  {!run&&<p className="notice">No marker-free model rating has been run for this conversation.</p>}
  <Editor key={run?.id||'unrated'} conversationId={id} conversation={version} rubric={rubric} annotations={[]} onChange={()=>{}} turnRatings={turnRatings} ratingReasons={ratingReasons} readonly taskType="rate"/>
 </main>;
}
