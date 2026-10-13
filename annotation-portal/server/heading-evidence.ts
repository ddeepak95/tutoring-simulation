import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type {Root,RootContent} from 'mdast';

// Parse Markdown so heading-like text inside code fences is never accepted.
export function headingRanges(text:string) {
 const root=unified().use(remarkParse).use(remarkGfm).parse(text) as Root;
 const ranges:{start:number;end:number}[]=[];
 function visit(node:Root|RootContent){
  if(node.type==='heading'&&node.position?.start.offset!==undefined&&node.position.end.offset!==undefined)ranges.push({start:node.position.start.offset,end:node.position.end.offset});
  if(node.type==='paragraph'&&node.position?.start.offset!==undefined&&node.position.end.offset!==undefined){
   // A bold title and the following body can belong to the same Markdown
   // paragraph when there is no blank line. Inspect physical lines instead.
   const strong=node.children.filter(child=>child.type==='strong'&&child.position?.start.offset!==undefined&&child.position.end.offset!==undefined);
   let start=node.position.start.offset;
   for(const line of text.slice(start,node.position.end.offset).split('\n')){
    const end=start+line.length;
    const titles=strong.filter(child=>child.position!.start.offset!>=start&&child.position!.end.offset!<=end);
    let remainder='';let cursor=start;
    for(const child of titles){remainder+=text.slice(cursor,child.position!.start.offset!);cursor=child.position!.end.offset!;}
    remainder+=text.slice(cursor,end);
    if(titles.length&&/^[\s:]*$/.test(remainder))ranges.push({start:start+line.length-line.trimStart().length,end:end-(line.length-line.trimEnd().length)});
    start=end+1;
   }
  }
  if('children' in node)for(const child of node.children)visit(child as RootContent);
 }
 visit(root);return ranges;
}

export function tutorHeadingInventory(conversation:{messages:{speaker:string;turn_id:string;text:string}[]}){
 return conversation.messages.filter(turn=>turn.speaker==='tutor').flatMap(turn=>headingRanges(turn.text).map(range=>{
  const quote=turn.text.slice(range.start,range.end);let occurrence=0;let at=-1;
  do{at=turn.text.indexOf(quote,at+1);occurrence++;}while(at<range.start);
  return {turn_id:turn.turn_id,quote,occurrence};
 }));
}
