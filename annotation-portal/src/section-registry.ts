import type {SupabaseClient} from '@supabase/supabase-js';
import type {Annotation, Conversation, ConversationSection,ConversationSectionState} from './types';
import {parseMarkdown} from './markdown-source.ts';

export type SectionCandidate = {turn_id:string;turn_number:number;section_number:number;start:number;end:number};
const stateStart=/^Agent-explored interactive state state_\d+ \(capture action, not a learner response\):?[\t ]*\r?$/m;

export function markdownSectionGroups(text:string) {
  const groups: ReturnType<typeof parseMarkdown>['children'][] = []; let group: ReturnType<typeof parseMarkdown>['children'] = [];
  const marker=text.match(stateStart);const primary=marker?text.slice(0,marker.index).trimEnd():text;
  for(const node of parseMarkdown(primary).children) {
    if(node.type==='definition')continue;
    const bold=node.type==='paragraph'&&node.children.some(child=>child.type==='strong')&&node.children.every(child=>child.type==='strong'||(child.type==='text'&&/^[\s:.,!?;()\[\]{}\-]*$/.test(child.value)));
    if((node.type==='heading'||bold)&&group.length){groups.push(group);group=[];}
    group.push(node);
  }
  if(group.length)groups.push(group);
  return groups;
}

/** The registry is initialized once; later callers use the persisted boundaries. */
export function sectionCandidates(conversation:Conversation, captured?: {turn_id:string;start:number;end:number}[]):SectionCandidate[] {
  let turnNumber=0;
  return conversation.messages.flatMap(turn=>{
    if(turn.speaker!=='tutor')return [];
    turnNumber++;
    const visible=captured?.filter(s=>s.turn_id===turn.turn_id);
    const cutoff=turn.text.match(stateStart)?.index??turn.text.length;
    const ranges=(visible?.length ? visible.map(({start,end})=>({start,end})) : markdownSectionGroups(turn.text).map(nodes=>({start:nodes[0].position!.start.offset!,end:nodes.at(-1)!.position!.end.offset!}))).filter(r=>r.end<=cutoff);
    return ranges.map((range,index)=>({turn_id:turn.turn_id,turn_number:turnNumber,section_number:index+1,...range}));
  });
}

export async function readSections(client:SupabaseClient, ids:string[],includeHistoricalStates:boolean|Annotation[]=false):Promise<ConversationSection[]> {
  if(!ids.length)return [];
  const rows:ConversationSection[]=[];
  const htmlRows:{conversation_id:string;section_id:string;turn_id:string;turn_number:number;section_number:number}[]=[];
  for(let offset=0;;offset+=500){
    const {data,error}=await client.from('html_conversation_sections').select('conversation_id,section_id,turn_id,turn_number,section_number').in('conversation_id',[...new Set(ids)]).order('conversation_id').order('turn_number').order('section_number').range(offset,offset+499);
    if(error){if(['PGRST205','42P01'].includes(error.code))break;throw Error(`Could not load HTML sections: ${error.message}`);}
    htmlRows.push(...data);if(data.length<500)break;
  }
  const htmlIds=new Set((htmlRows||[]).map(r=>r.conversation_id));
  rows.push(...(htmlRows||[]).map(r=>({...r,html:'',content_version:'html-conversation/2'})) as ConversationSection[]);
  ids=ids.filter(id=>!htmlIds.has(id));if(!ids.length)return rows;
  for(let offset=0;;offset+=500){
    const {data,error}=await client.from('conversation_sections').select('*,states:conversation_section_states!conversation_section_states_owner_fkey(*)').in('conversation_id',[...new Set(ids)]).order('conversation_id').order('turn_number').order('section_number').range(offset,offset+499);
    if(error)throw new Error(`Could not load persistent sections: ${error.message}`);
    rows.push(...data as ConversationSection[]);if(data.length<500){const aliases=new Set(rows.flatMap(s=>(s.states||[]).flatMap(state=>state.legacy_section_ids.map(id=>`${s.conversation_id}:${id}`))));return includeHistoricalStates===true?rows:rows.filter(s=>!aliases.has(`${s.conversation_id}:${s.section_id}`)||(Array.isArray(includeHistoricalStates)&&includeHistoricalStates.some(a=>a.section_id===s.section_id)));}
  }
}

export async function ensureSectionStates(client:SupabaseClient,id:string,states:ConversationSectionState[]){
 if(!states.length)return;
 const {error}=await client.rpc('register_conversation_section_states',{p_conversation_id:id,p_states:states});
 if(error)throw Error(`Could not register section states: ${error.message}`);
}

export async function ensureSections(client:SupabaseClient,id:string,candidates:SectionCandidate[]):Promise<ConversationSection[]> {
  const {data,error}=await client.rpc('register_conversation_sections',{p_conversation_id:id,p_sections:candidates});
  if(error)throw new Error(`Could not register persistent sections: ${error.message}`);
  return data as ConversationSection[];
}

export function hydrateAnnotations(annotations:Annotation[],sections:ConversationSection[]):Annotation[] {
  return annotations.map(annotation=>{
    if(!annotation.section_id)return annotation;
    const section=sections.find(s=>s.section_id===annotation.section_id);
    if(!section)throw new Error(`Unknown section: ${annotation.section_id}. Reload the conversation.`);
    if(section.content_version==='html-conversation/2')return {...annotation,evidence:[]};
    return {...annotation,entry:{...annotation.entry,turn_locations:[section.turn_id]},evidence:[{turn_id:section.turn_id,start:section.start,end:section.end,quote:section.quote,occurrence:section.occurrence}]};
  });
}

export function storedAnnotations(annotations:Annotation[]) {
  return annotations.map(annotation=>{
    if(!annotation.section_id)return annotation;
    const {evidence:_evidence,entry,...reference}=annotation;
    const {turn_locations:_turns,...attributes}=entry;
    return {...reference,entry:attributes};
  });
}

export async function hydrateRows<T extends {conversation_id:string;annotations:Annotation[]}>(client:SupabaseClient,rows:T[]):Promise<T[]> {
  const needed=rows.filter(row=>row.annotations?.some(a=>a.section_id));
  if(!needed.length)return rows;
  const sections=await readSections(client,needed.map(row=>row.conversation_id),true);
  return rows.map(row=>({...row,annotations:hydrateAnnotations(row.annotations,sections.filter(s=>s.conversation_id===row.conversation_id))}));
}
