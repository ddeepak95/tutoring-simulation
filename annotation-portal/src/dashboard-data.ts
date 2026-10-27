import {supabase} from './lib';
import type {Assignment,DocumentRow,Profile,Conversation} from './types';

// Project individual JSON metadata fields on the server. Never select transcript
// or html_content wholesale: captured CSS/fonts/HTML can be several MB per row.
export const dashboardColumns='id,label,language,created_at,source_path,source_conversation_id,topic_id,generic_topic_name,conversation_title,conversation_id:transcript->>conversation_id,learning_topic:transcript->>learning_topic,topic_name:transcript->>topic_name,topic_english_name:transcript->>topic_english_name,provider:transcript->>provider,access_type:transcript->>access_type,original_language:transcript->>original_language,transcript_source_id:transcript->>source_conversation_id,messages:transcript->messages,repository_source:transcript->repository_source,archive_id:transcript->archive_source->>archive_id,chatgpt_id:transcript->chatgpt_source->>source_conversation_id,html_format:transcript->html_content->>format_version,html_source_language:transcript->html_content->source_version->>language';
type SummaryRow=Omit<DocumentRow,'transcript'>&Partial<Conversation>&{transcript_source_id?:string;archive_id?:string;chatgpt_id?:string;html_format?:string;html_source_language?:string};

export function dashboardDocument(row:SummaryRow):DocumentRow{
 const transcript:Conversation={conversation_id:row.conversation_id||row.id,label:row.label,learning_topic:row.learning_topic||null,messages:[],topic_id:row.topic_id,topic_name:row.topic_name,topic_english_name:row.topic_english_name,provider:row.provider,access_type:row.access_type,original_language:row.original_language||row.html_source_language,source_conversation_id:row.transcript_source_id,repository_source:row.repository_source};
 // Minimal provenance markers; the detail views fetch the complete records.
 if(row.archive_id)transcript.archive_source={archive_id:row.archive_id} as Conversation['archive_source'];
 if(row.chatgpt_id)transcript.chatgpt_source={source_conversation_id:row.chatgpt_id} as Conversation['chatgpt_source'];
 return {id:row.id,label:row.label,language:row.language,created_at:row.created_at,source_path:row.source_path,source_conversation_id:row.source_conversation_id,topic_id:row.topic_id,generic_topic_name:row.generic_topic_name,conversation_title:row.conversation_title,is_html_capture:row.html_format==='html-conversation/2',turn_count:row.messages?.length||0,transcript};
}

export interface DashboardTopic {key:string;name:string;conversation_count:number}
export async function fetchDashboardTopics(){
 const [topics,people]=await Promise.all([supabase!.rpc('dashboard_topics'),supabase!.from('profiles').select('id, username, role').order('username')]);
 if(topics.error)throw topics.error;if(people.error)throw people.error;
 return {topics:topics.data as DashboardTopic[],users:people.data as Profile[]};
}
export async function fetchTopicDashboardData(key:string){
 const documents:DocumentRow[]=[];
 for(let offset=0;;offset+=500){
  const {data,error}=await supabase!.rpc('dashboard_topic_conversations',{p_topic_key:key}).select(dashboardColumns).order('id').range(offset,offset+499);
  if(error)throw error;const page=data as unknown as SummaryRow[];documents.push(...page.map(dashboardDocument));if(page.length<500)break;
 }
 const assignments:Assignment[]=[];
 for(let start=0;start<documents.length;start+=100){
  const ids=documents.slice(start,start+100).map(d=>d.id);
  for(let offset=0;;offset+=500){
   const {data,error}=await supabase!.from('assignments').select('*, profiles!assignments_annotator_id_fkey(id, username, role)').eq('is_active',true).in('conversation_id',ids).order('updated_at',{ascending:false}).order('id').range(offset,offset+499);
   if(error)throw error;assignments.push(...data as Assignment[]);if(data.length<500)break;
  }
 }
 const byId=new Map(documents.map(doc=>[doc.id,doc]));
 return {documents,assignments:assignments.map(row=>({...row,conversations:byId.get(row.conversation_id),annotations:row.annotations.map(a=>({...a,evidence:a.evidence||[]}))}))};
}
