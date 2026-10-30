import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {supabase} from './lib';
import {MarkdownTranscript} from './MarkdownTranscript';
import {ConversationBreadcrumbs} from './ConversationBreadcrumbs';
import {AdminTaskReview} from './AdminTaskReview';
import markerRubric from './generated/marker-free-rubric.json';
import type {Annotation,Conversation,DocumentRow,Feature} from './types';

type Occurrence={feature:string;turn_id:string;quote:string;occurrence:number;reason:string|null;start:number;end:number};
type LabelRun={id:string;status:'completed'|'failed';model:string;prompt_version:string;annotations:Occurrence[];counts:Record<string,number>;error:string|null;created_at:string};

export function MarkerFreeLabelReview(){
 const {id}=useParams();
 const [version,setVersion]=useState<Conversation|null>(null),[document,setDocument]=useState<DocumentRow|null>(null),[run,setRun]=useState<LabelRun|null>(null);
 const [loading,setLoading]=useState(true),[fallback,setFallback]=useState(false),[error,setError]=useState('');
 useEffect(()=>{
  let alive=true;setLoading(true);setError('');setFallback(false);
  void (async()=>{
   const [versionResult,documentResult,runsResult]=await Promise.all([
    supabase!.from('conversation_versions').select('transcript,section_mode').eq('conversation_id',id).eq('version_key','marker-free-v1').maybeSingle(),
    supabase!.from('conversation_details').select('id,label,language,created_at,source_path,source_conversation_id,topic_id,generic_topic_name,conversation_title,transcript').eq('id',id).single(),
    supabase!.from('conversation_version_label_runs').select('id,status,model,prompt_version,annotations,counts,error,created_at').eq('conversation_id',id).eq('version_key','marker-free-v1').order('created_at',{ascending:false}).limit(1)
   ]);
   if(versionResult.error&&['PGRST205','42P01'].includes(versionResult.error.code)){if(alive)setFallback(true);return;}
   if(versionResult.error)throw versionResult.error;
   if(!versionResult.data){if(alive)setFallback(true);return;}
   if(documentResult.error)throw documentResult.error;
   if(runsResult.error&&!['PGRST205','42P01'].includes(runsResult.error.code))throw runsResult.error;
   if(versionResult.data.section_mode!=='none')throw Error('This conversation version is not marker-free.');
   if(alive){setVersion(versionResult.data.transcript as Conversation);setDocument(documentResult.data as DocumentRow);setRun((runsResult.data?.[0]||null) as LabelRun|null);}
  })().catch(caught=>{if(alive)setError(caught.message||'Could not load marker-free labeling.');}).finally(()=>{if(alive)setLoading(false);});
  return()=>{alive=false;};
 },[id]);
 if(loading)return <main className="center" role="status">Loading marker-free labeling…</main>;
 if(fallback)return <AdminTaskReview taskType="label"/>;
 if(error||!version)return <main className="center"><p role="alert" className="error">{error||'Marker-free version unavailable.'}</p></main>;
 const rubric=markerRubric.rubric as unknown as Feature[];
 const annotations:Annotation[]=run?.status==='completed'?run.annotations.map((item,index)=>({
  id:`marker-free-${run.id}-${index+1}`,feature:item.feature,
  entry:{category:rubric.find(feature=>feature.key===item.feature)?.category||'',count:1},
  evidence:[{turn_id:item.turn_id,quote:item.quote,occurrence:item.occurrence,start:item.start,end:item.end}],
  ...(item.reason?{llm_evidence:item.reason}:{})
 })):[];
 return <main className="editor-page"><ConversationBreadcrumbs document={document} currentPage="Labeling"/><section className="document"><div className="document-header"><div><h2>{version.learning_topic||version.label}</h2><p>Marker-free labeling · {run?.model||'Awaiting evaluation'} · {markerRubric.rubric.length} features</p></div><Link className="secondary" to={`/conversations/${id}/rating`}>View rating</Link></div>
  {run?.status==='failed'&&<p className="notice" role="status">Pilot validation failed: {run.error}</p>}
  {!run&&<p className="notice">No marker-free evaluation has been run for this conversation.</p>}
  {run?.status==='completed'&&<div className="card"><h3>Feature counts</h3><div className="section-item-badges">{markerRubric.rubric.map(feature=><span key={feature.key} title={feature.name} style={{color:feature.color,background:feature.highlight,padding:'4px 8px',margin:'3px',borderRadius:4}}>{feature.name}: {run.counts[feature.key]||0}</span>)}</div></div>}
  <div className="transcript">{version.messages.map(turn=><article className={`turn ${turn.speaker==='tutor'?'tutor':'student'}`} key={turn.turn_id}><div className="turn-heading"><span className="speaker-badge">{turn.speaker==='tutor'?'B':'Y'}</span><strong>{turn.speaker==='tutor'?'Bot':'You'}</strong></div><div className="turn-body"><MarkdownTranscript text={turn.text} turnId={turn.turn_id} annotations={annotations} rubric={rubric} readonly onHighlight={()=>{}}/></div></article>)}</div>
 </section></main>;
}
