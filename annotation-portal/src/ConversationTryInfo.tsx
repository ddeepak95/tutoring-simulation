import {useEffect,useState} from 'react';
import {supabase} from './lib';
import {dashboardColumns,dashboardDocument} from './dashboard-data';
import {topicKey} from './topic-groups';
import {conversationTry,type ConversationTry} from './conversation-try';
import type {DocumentRow} from './types';

// Numbering requires provenance and dates, not transcript messages or assignments.
const columns=dashboardColumns.split(',').filter(column=>!column.startsWith('messages:')).join(',');

export function ConversationTryInfo({document}:{document:DocumentRow}){
 const key=topicKey(document);
 const [state,setState]=useState<{id:string;info:ConversationTry|null;loading:boolean}>({id:document.id,info:null,loading:true});
 useEffect(()=>{
  let alive=true;setState({id:document.id,info:null,loading:true});
  void(async()=>{
   const documents:DocumentRow[]=[];
   for(let offset=0;;offset+=500){
    const {data,error}=await supabase!.rpc('dashboard_topic_conversations',{p_topic_key:key}).select(columns).order('id').range(offset,offset+499);
    if(error)throw error;
    const rows=data as unknown as Parameters<typeof dashboardDocument>[0][];
    documents.push(...rows.map(dashboardDocument));
    if(data.length<500)break;
   }
   if(alive)setState({id:document.id,info:conversationTry(documents,document.id),loading:false});
  })().catch(()=>{if(alive)setState({id:document.id,info:null,loading:false});});
  return()=>{alive=false;};
 },[document.id,key]);
 const loading=state.id!==document.id||state.loading,info=state.id===document.id?state.info:null;
 return <p className="conversation-try-info" aria-live="polite">{loading?'Loading try information…':info?<>Try {info.number} of {info.total}{info.translated?' · Translation':''}</>:'Try information unavailable'}</p>;
}
