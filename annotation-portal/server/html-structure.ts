import {parse} from 'parse5';

type Node = {nodeName:string;tagName?:string;value?:string;attrs?:{name:string;value:string}[];childNodes?:Node[];content?:Node};
function text(node:Node):string { return node.nodeName==='#text'?node.value||'':(node.childNodes||node.content?.childNodes||[]).map(text).join(''); }
function descendants(node:Node,out:Node[]=[]):Node[]{if(node.tagName)out.push(node);for(const child of node.childNodes||[])descendants(child,out);if(node.content)descendants(node.content,out);return out;}
function isBoldTitle(node:Node){
 if(!['p','div'].includes(node.tagName||''))return false;
 const boldText=(current:Node):string=>{
  if(current.tagName==='strong'||current.tagName==='b')return '';
  return current.nodeName==='#text'?current.value||'':(current.childNodes||current.content?.childNodes||[]).map(boldText).join('');
 };
 const hasBold=(current:Node):boolean=>current.tagName==='strong'||current.tagName==='b'||(current.childNodes||current.content?.childNodes||[]).some(hasBold);
 return hasBold(node)&&/^[\s:.,!?;()\[\]{}\-]*$/.test(boldText(node));
}
export function htmlStructuralRanges(html:string,canonical:string){
 const root=parse(html) as unknown as Node;const nodes=descendants(root);const ranges:{start:number;end:number;kind:'heading'|'table_header'|'passage'}[]=[];let cursor=0;
 const add=(value:string,kind:'heading'|'table_header'|'passage')=>{const target=value.replace(/\s+/g,'');if(!target)return;let compact='',positions:number[]=[];for(let i=0;i<canonical.length;i++)if(!/\s/.test(canonical[i])){compact+=canonical[i];positions.push(i);}const minimum=positions.findIndex(position=>position>=cursor);let found=compact.indexOf(target,Math.max(0,minimum));if(found<0)found=compact.indexOf(target);if(found<0)return;const start=positions[found],end=positions[found+target.length-1]+1;ranges.push({start,end,kind});cursor=Math.max(cursor,end);};
 for(const node of nodes)if(/^h[1-6]$/.test(node.tagName||'')||isBoldTitle(node))add(text(node),'heading');
 for(const table of nodes.filter(node=>node.tagName==='table')){const rows=descendants(table).filter(node=>node.tagName==='tr');if(!rows.length)continue;const explicit=rows.filter(row=>(row.childNodes||[]).some(child=>child.tagName==='th'));for(const row of explicit.length?explicit:rows.slice(0,1))add(text(row),'table_header');}
 return ranges;
}
export function htmlHeadingRanges(html:string,canonical:string){return htmlStructuralRanges(html,canonical).filter(range=>range.kind==='heading');}
