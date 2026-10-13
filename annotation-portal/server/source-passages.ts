import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type {Root,RootContent} from 'mdast';
import type {Conversation} from '../src/types';
import {headingRanges} from './heading-evidence.ts';

export interface SourcePassage {source_id:string;kind:'heading'|'table_header'|'passage';turn_id:string;quote:string;occurrence:number;start:number;end:number}
export function sourcePassages(conversation:Conversation):SourcePassage[]{
 return conversation.messages.filter(t=>t.speaker==='tutor').flatMap(turn=>{
  const ranges=new Map<string,{start:number;end:number;kind:SourcePassage['kind']}>();
  const add=(start:number|undefined,end:number|undefined,kind:SourcePassage['kind'])=>{if(start!==undefined&&end!==undefined&&end>start&&!ranges.has(`${start}:${end}`))ranges.set(`${start}:${end}`,{start,end,kind});};
  headingRanges(turn.text).forEach(h=>add(h.start,h.end,'heading'));
  const root=unified().use(remarkParse).use(remarkGfm).parse(turn.text) as Root;
  function visit(node:Root|RootContent){
   if(node.type==='table')node.children.forEach((row,i)=>add(row.position?.start.offset,row.position?.end.offset,i===0?'table_header':'passage'));
   if(node.type==='paragraph'||node.type==='code')add(node.position?.start.offset,node.position?.end.offset,'passage');
   if(node.type==='html'&&node.position?.start.offset!==undefined){
    add(node.position.start.offset,node.position.end.offset,'passage');
    const raw=turn.text.slice(node.position.start.offset,node.position.end.offset);
    for(const match of raw.matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr\s*>/gi))if(/<th\b/i.test(match[0]))add(node.position.start.offset+match.index!,node.position.start.offset+match.index!+match[0].length,'table_header');
   }
   if('children' in node)node.children.forEach(child=>visit(child as RootContent));
  }visit(root);
  return [...ranges.values()].sort((a,b)=>a.start-b.start||a.end-b.end).map((r,i)=>{
   const quote=turn.text.slice(r.start,r.end);let occurrence=0,at=-1;do{at=turn.text.indexOf(quote,at+1);occurrence++;}while(at<r.start);
   return {...r,source_id:`${turn.turn_id}:source_${i+1}`,turn_id:turn.turn_id,quote,occurrence};
  });
 });
}
export function modelSourcePassages(conversation:Conversation){return sourcePassages(conversation).map(({start:_start,end:_end,...passage})=>passage);}
