import type {SupabaseClient} from '@supabase/supabase-js';
import type {Annotation, Conversation, ConversationSection} from './types';
import {parseMarkdown} from './markdown-source.ts';

export type SectionCandidate = {turn_id:string;turn_number:number;section_number:number;start:number;end:number};
const metadata = /^Agent-explored interactive state state_\d+ \(capture action, not a learner response\):?$/u;

export function markdownSectionGroups(text:string) {
  const groups: ReturnType<typeof parseMarkdown>['children'][] = []; let group: ReturnType<typeof parseMarkdown>['children'] = [];
  for(const node of parseMarkdown(text).children) {
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
    const ranges=visible?.length ? visible.map(({start,end})=>({start,end})) : markdownSectionGroups(turn.text).map(nodes=>({start:nodes[0].position!.start.offset!,end:nodes.at(-1)!.position!.end.offset!}));
    // Additional interactive states belong to the source even when the original
    // captured document does not display them. Register their bodies separately.
    const last=ranges.at(-1)?.end??0;
    const tail=turn.text.slice(last);
    const markers=[...tail.matchAll(/^Agent-explored interactive state state_\d+ \(capture action, not a learner response\):?[\t ]*\r?$/gm)];
    if(captured&&markers.length&&metadata.test(tail.trimStart().split(/\r?\n/u)[0].trim())){
      markers.forEach((marker,i)=>{
        const from=last+marker.index!+marker[0].length, to=i+1<markers.length?last+markers[i+1].index!:turn.text.length;
        const value=turn.text.slice(from,to), start=from+value.length-value.trimStart().length,end=to-(value.length-value.trimEnd().length);
        if(end>start)ranges.push({start,end});
      });
    }
    return ranges.map((range,index)=>({turn_id:turn.turn_id,turn_number:turnNumber,section_number:index+1,...range}));
  });
}

export async function readSections(client:SupabaseClient, ids:string[]):Promise<ConversationSection[]> {
  if(!ids.length)return [];
  const rows:ConversationSection[]=[];
  for(let offset=0;;offset+=500){
    const {data,error}=await client.from('conversation_sections').select('*').in('conversation_id',[...new Set(ids)]).order('conversation_id').order('turn_number').order('section_number').range(offset,offset+499);
    if(error)throw new Error(`Could not load persistent sections: ${error.message}`);
    rows.push(...data as ConversationSection[]);if(data.length<500)return rows;
  }
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
  const sections=await readSections(client,needed.map(row=>row.conversation_id));
  return rows.map(row=>({...row,annotations:hydrateAnnotations(row.annotations,sections.filter(s=>s.conversation_id===row.conversation_id))}));
}
