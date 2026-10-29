import {supabase} from './lib';
import type {DocumentRow,RubricSnapshot} from './types';
import {evaluationCohorts,type EvaluationCohort,type OccurrenceBaseline} from './set-occurrences';

interface Generation {model_id?:string;system_prompt?:string;system_prompt_sha256?:string;settings?:Record<string,unknown>}
export interface StatisticalDocument extends DocumentRow {generation?:Generation;translationModel?:string}
export interface GenerationCondition {key:string;label:string;prompt:string;latest:string;ids:Set<string>}
export interface StatisticsData {documents:StatisticalDocument[];cohorts:EvaluationCohort[]}
const stable=(value:unknown):string=>value&&typeof value==='object'?Array.isArray(value)?`[${value.map(stable).join(',')}]`:`{${Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>JSON.stringify(k)+':'+stable(v)).join(',')}}`:JSON.stringify(value)??'null';
export function generationConditions(documents:StatisticalDocument[],provider:string):GenerationCondition[]{
 const conditions=new Map<string,GenerationCondition>();
 for(const doc of documents.filter(d=>!d.source_conversation_id&&!d.transcript.source_conversation_id&&d.transcript.provider===provider)){
  const g=doc.generation,prompt=g?(g.system_prompt??'No custom system prompt'):'Unrecorded generation settings';
  const key=stable([g?.model_id||provider,prompt,g?.settings??null,doc.transcript.access_type??null]);
  const condition=conditions.get(key)||{key,label:prompt.length>85?prompt.slice(0,82)+'…':prompt,prompt,latest:doc.created_at,ids:new Set<string>()};
  condition.ids.add(doc.id);if(doc.created_at>condition.latest)condition.latest=doc.created_at;conditions.set(key,condition);
 }
 const result=[...conditions.values()].sort((a,b)=>b.latest.localeCompare(a.latest)||a.key.localeCompare(b.key));
 return result.map((c,i)=>({...c,label:`${c.label} · condition ${i+1}`}));
}
export async function fetchStatisticsData():Promise<StatisticsData>{
 const documents:StatisticalDocument[]=[];
 const columns='id,label,language,created_at,source_path,source_conversation_id,topic_id,generic_topic_name,conversation_title,conversation_id:transcript->>conversation_id,provider:transcript->>provider,access_type:transcript->>access_type,original_language:transcript->>original_language,topic_name:transcript->>topic_name,api_source:transcript->api_source,translation_model:transcript->translation->>model,translation_status:transcript->translation->>alignment_status';
 for(let offset=0;;offset+=500){
  const {data,error}=await supabase!.from('conversation_details').select(columns).order('id').range(offset,offset+499);if(error)throw error;
  for(const row of data as unknown as Record<string,any>[]){
   // The fallback supports older summary fixtures without fetching full production transcripts.
   const t=row.transcript||{};
   documents.push({id:row.id,label:row.label,language:row.language,created_at:row.created_at,source_path:row.source_path,source_conversation_id:row.source_conversation_id,topic_id:row.topic_id,generic_topic_name:row.generic_topic_name,conversation_title:row.conversation_title,
    transcript:{conversation_id:row.conversation_id||t.conversation_id||row.id,label:row.label,learning_topic:null,messages:[],provider:row.provider||t.provider||'Unknown provider',access_type:row.access_type||t.access_type,original_language:row.original_language||t.original_language,source_conversation_id:row.source_conversation_id||t.source_conversation_id,topic_id:row.topic_id,topic_name:row.topic_name||t.topic_name,translation:row.translation_status==='stale'||t.translation?.alignment_status==='stale'?{version:'api-english/1',sha256:'',alignment_status:'stale'}:undefined},generation:row.api_source||t.api_source,translationModel:row.translation_model||t.translation?.model});
  }
  if(data.length<500)break;
 }
 const baselines:OccurrenceBaseline[]=[];
 for(let start=0;start<documents.length;start+=100)for(let offset=0;;offset+=500){
  const {data,error}=await supabase!.from('llm_baselines').select('id,conversation_id,rubric_hash,annotations,model,prompt_version,prompt_sha256,generation_config,created_at').in('conversation_id',documents.slice(start,start+100).map(d=>d.id)).order('created_at',{ascending:false}).order('id').range(offset,offset+499);
  if(error)throw error;baselines.push(...data as OccurrenceBaseline[]);if(data.length<500)break;
 }
 const hashes=[...new Set(baselines.map(b=>b.rubric_hash))],rubrics=new Map<string,RubricSnapshot>();
 for(let start=0;start<hashes.length;start+=100){const {data,error}=await supabase!.from('rubric_versions').select('hash,snapshot').in('hash',hashes.slice(start,start+100));if(error)throw error;for(const row of data)rubrics.set(row.hash,row.snapshot as RubricSnapshot);}
 if(baselines.some(b=>!rubrics.has(b.rubric_hash)))throw Error('A saved evaluation is missing its rubric.');
 return {documents,cohorts:evaluationCohorts(baselines,rubrics)};
}
