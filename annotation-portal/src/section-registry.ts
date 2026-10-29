import type {SupabaseClient} from '@supabase/supabase-js';
import type {Annotation, Conversation, ConversationSection,ConversationSectionState} from './types';
import {parseMarkdown} from './markdown-source.ts';
import type {Nodes} from 'mdast';

export const apiGroupingVersion='api-cohesive/2';
export type SectionCandidate = {turn_id:string;turn_number:number;section_number:number;start:number;end:number;grouping_version?:string};
const stateStart=/^Agent-explored interactive state state_\d+ \(capture action, not a learner response\):?[\t ]*\r?$/m;

export function markdownSectionGroups(text:string, options:{api?:boolean;ranges?:{start:number;end:number}[]} = {}) {
  if(options.ranges?.length)return [...options.ranges].sort((a,b)=>a.start-b.start).map(({start,end})=>{
    const tree=parseMarkdown(text.slice(start,end));
    function shift(node:Nodes){
      if(node.position){node.position.start.offset!+=start;node.position.end.offset!+=start;}
      const math=node.data?.mathSource;
      if(math)node.data!.mathSource={...math,start:math.start+start,end:math.end+start,contentStart:math.contentStart+start,contentEnd:math.contentEnd+start};
      if('children' in node)node.children.forEach(shift);
    }
    shift(tree);return tree.children;
  });
  const groups: ReturnType<typeof parseMarkdown>['children'][] = []; let group: ReturnType<typeof parseMarkdown>['children'] = [];
  const marker=text.match(stateStart);const primary=marker?text.slice(0,marker.index).trimEnd():text;
  const nodes=parseMarkdown(primary).children;
  if(options.api){
    const plain=(node:Nodes):string=>'value' in node?String(node.value):'children' in node?node.children.map(plain).join(''):'';
    const title=(node:typeof nodes[number])=>{
      if(node.type==='heading')return true;
      if(node.type!=='paragraph'||!node.children.some(c=>c.type==='strong')||!node.children.every(c=>c.type==='strong'||c.type==='text'&&/^[\s:：]*$/u.test(c.value)))return false;
      const value=plain(node).trim();
      return [...value].length<=100&&/\p{L}/u.test(value)&&!/[.!?。！？…]$/u.test(value)&&!/[=<>≤≥→←↔⇒⇐⇔]/u.test(value)&&!/^\s*\d+[.)]/u.test(value)&&!node.children.some(c=>'children' in c&&c.children.some(n=>n.type==='inlineCode'||n.data?.mathSource));
    };
    const meaningful=nodes.filter(n=>n.type!=='definition'&&n.type!=='thematicBreak');
    const final=meaningful.at(-1);
    const closingQuestion=final?.type==='paragraph'&&/[?？]\s*$/u.test(plain(final))?final:null;
    let sawTitle=false,contentSinceTitle=false;
    const flush=()=>{if(group.some(n=>n.type!=='thematicBreak'&&n.type!=='definition'))groups.push(group);group=[];contentSinceTitle=false;};
    for(const node of nodes){
      if(node.type==='definition'){group.push(node);continue;}
      if(node.type==='thematicBreak'){if(group.length)group.push(node);flush();continue;}
      if(title(node)){
        // A leading introduction belongs to the first titled teaching block.
        const introduction=!sawTitle&&groups.length===0&&group.every(n=>n.type==='paragraph'||n.type==='definition')&&group.filter(n=>n.type==='paragraph').length<=2;
        if(contentSinceTitle&&(sawTitle||!introduction))flush();
        sawTitle=true;contentSinceTitle=false;
      }else if(node===closingQuestion&&group.some(n=>!title(n))){flush();}
      if(!title(node))contentSinceTitle=true;
      group.push(node);
    }
    flush();return groups;
  }
  const isTitle=(node:typeof nodes[number])=>node.type==='heading'||(node.type==='paragraph'&&node.children.some(child=>child.type==='strong')&&node.children.every(child=>child.type==='strong'||(child.type==='text'&&/^[\s:.,!?;()\[\]{}\-]*$/.test(child.value))));
  const titled=nodes.some(isTitle);
  const flush=()=>{if(group.length){groups.push(group);group=[];}};
  for(const node of nodes) {
    if(node.type==='definition')continue;
    if(options.api&&node.type==='thematicBreak'){
      if(group.length)group.push(node);
      flush();continue;
    }
    const previous=group.at(-1);
    const equation=node.type==='paragraph'&&node.children.length===1&&node.children[0].data?.mathSource?.display;
    const introducedBlock=previous?.type==='paragraph'&&/[:：]\s*$/.test(primary.slice(previous.position!.start.offset,previous.position!.end.offset))&&['list','table','code','blockquote'].includes(node.type);
    if((isTitle(node)&&(!options.api||group.some(item=>!isTitle(item))))||(options.api&&!titled&&!equation&&!introducedBlock))flush();
    group.push(node);
  }
  flush();
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
    const ranges=(visible?.length ? visible.map(({start,end})=>({start,end})) : markdownSectionGroups(turn.text,{api:conversation.access_type==='API'}).map(nodes=>({start:nodes[0].position!.start.offset!,end:nodes.at(-1)!.position!.end.offset!}))).filter(r=>r.end<=cutoff);
    return ranges.map((range,index)=>({turn_id:turn.turn_id,turn_number:turnNumber,section_number:index+1,...range,...(conversation.access_type==='API'&&!visible?.length?{grouping_version:apiGroupingVersion}:{})}));
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
