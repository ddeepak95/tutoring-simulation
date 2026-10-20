import {parseFragment} from 'parse5';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import {htmlHeadingRanges} from './html-structure.ts';
import {isCaptureMetadataHeading} from './heading-evidence.ts';
import type {Conversation} from '../src/types.ts';

export interface EvidenceSegment {segment_id:string;turn_id:string;start:number;end:number;block_start:number;block_end:number;quote:string;source_text:string;kind:string;source_path:number[]|null}
type Node=any;
const blockTags=new Set(['p','h1','h2','h3','h4','h5','h6','li','tr','pre','blockquote']);
const droppedTags=new Set(['script','style','noscript','template','svg','canvas']);
const allowedAttributes=new Set(['alt','colspan','rowspan','scope','start','value','open','reversed','type','align']);
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const safeTags=new Set(['a','b','blockquote','br','caption','code','del','em','figcaption','figure','h1','h2','h3','h4','h5','h6','hr','i','img','li','ol','p','pre','s','small','strong','sub','sup','table','tbody','td','th','thead','tr','u','ul']);
function esc(value:string){return value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
function nodeText(node:Node):string {if(droppedTags.has(node?.tagName))return '';return node?.nodeName==='#text'?node.value||'':(node?.childNodes||node?.content?.childNodes||[]).map(nodeText).join('');}
function compactKey(value:string){return value.replace(/[\s\u200b\ufeff]+/gu,'');}
function canonicalRange(canonical:string,value:string,cursor:number):{start:number;end:number}|null{
 const needle=compactKey(value);if(!needle)return null;
 let key='',positions:number[]=[];for(let i=0;i<canonical.length;i++)if(!/[\s\u200b\ufeff]/u.test(canonical[i])){key+=canonical[i];positions.push(i);}
 const from=positions.findIndex(position=>position>=cursor);let found=key.indexOf(needle,Math.max(0,from));
 if(found<0)return null;return {start:positions[found],end:positions[found+needle.length-1]+1};
}
function sentenceRanges(text:string,start:number,end:number){
 const value=text.slice(start,end);const result:{start:number;end:number}[]=[];
 try{for(const item of new Intl.Segmenter(undefined,{granularity:'sentence'}).segment(value)){const left=item.index+item.segment.search(/\S/u);const right=item.index+item.segment.trimEnd().length;if(right>left&&/[\p{L}\p{N}]/u.test(item.segment))result.push({start:start+left,end:start+right});}}catch{}
 return result.length?result:[{start,end}];
}
function semanticKind(tag:string){return /^h[1-6]$/.test(tag)?'heading':tag==='tr'?'table_row':tag==='li'?'list_item':tag==='pre'?'code':tag==='blockquote'?'blockquote':'paragraph';}
function addVisualSegment(turnId:string,canonical:string,segments:EvidenceSegment[],nextId:{value:number},sourcePath:number[]|null,cursor:{value:number},alt=''){
 const candidates=[alt,'Captured diagram'].filter(Boolean);let start=-1,quote='';
 for(const candidate of candidates){const at=canonical.indexOf(candidate,cursor.value);if(at>=0&&(start<0||at<start)){start=at;quote=candidate;}}
 if(start<0)return null;
 const id=`${turnId}:s${String(++nextId.value).padStart(4,'0')}`;cursor.value=start+quote.length;
 segments.push({segment_id:id,turn_id:turnId,start,end:start+quote.length,block_start:start,block_end:start+quote.length,quote,source_text:quote,kind:'visual',source_path:sourcePath});return {id,quote};
}
function descendants(node:Node):Node[]{const out:Node[]=[];const visit=(current:Node)=>{if(current?.tagName)out.push(current);for(const child of current?.childNodes||[])visit(child);if(current?.content)visit(current.content);};visit(node);return out;}
function hasBlockDescendant(node:Node){return descendants(node).some(child=>child!==node&&blockTags.has(child.tagName));}
function compactSourceHtml(source:string,turnId:string,canonical:string,segments:EvidenceSegment[],nextId:{value:number},visualIds:Map<number,string>,usedVisualIds:Set<string>,visualCaptions:Record<string,string>){
 const root=parseFragment(source) as Node;const nodePaths=new Map<Node,number[]>();let imageIndex=0,headingIndex=0;const headings=htmlHeadingRanges(source,canonical);const visualCursor={value:0};const standaloneHeadingNodes=new WeakSet<object>();const captureMetadataNodes=new WeakSet<object>();
 const remember=(node:Node,path:number[])=>{nodePaths.set(node,path);(node.childNodes||[]).forEach((child:Node,index:number)=>remember(child,[...path,index]));};remember(root,[]);
 const segmentAttrs=new WeakMap<object,string>();let cursor=0;
 for(const node of descendants(root)){
  const tag=node.tagName as string;
  const isBlock=blockTags.has(tag)&&!hasBlockDescendant(node);
  const looseDiv=tag==='div'&&!hasBlockDescendant(node)&&Boolean(nodeText(node).trim());
  if(!isBlock&&!looseDiv)continue;
  let range:{start:number;end:number}|null=null;
  if(/^h[1-6]$/.test(tag)){
   const needle=compactKey(nodeText(node));
   while(headingIndex<headings.length){const candidate=headings[headingIndex++];if(compactKey(canonical.slice(candidate.start,candidate.end))===needle){range=candidate;break;}}
  }
  range||=canonicalRange(canonical,nodeText(node),cursor);if(!range)continue;
  cursor=range.end;
  const sentenceSpans=sentenceRanges(canonical,range.start,range.end);const ids:string[]=[];const captureMetadata=isCaptureMetadataHeading(canonical.slice(range.start,range.end));const isHeading=!captureMetadata&&(/^h[1-6]$/.test(tag)||headings.some(candidate=>candidate.start===range!.start&&candidate.end===range!.end));if(captureMetadata)captureMetadataNodes.add(node);if(isHeading&&!/^h[1-6]$/.test(tag))standaloneHeadingNodes.add(node);
  for(const span of sentenceSpans){const id=`${turnId}:s${String(++nextId.value).padStart(4,'0')}`;ids.push(id);segments.push({segment_id:id,turn_id:turnId,start:span.start,end:span.end,block_start:range.start,block_end:range.end,quote:canonical.slice(span.start,span.end),source_text:nodeText(node),kind:isHeading?'heading':captureMetadata?'paragraph':semanticKind(tag),source_path:nodePaths.get(node)||null});}
  if(ids.length)segmentAttrs.set(node,ids.join(' '));
 }
 const attrsFor=(node:Node)=>{
  const base=(node.attrs||[]).filter((a:any)=>allowedAttributes.has(a.name)).map((a:any)=>` ${a.name}="${esc(a.value)}"`).join('');
  const ids=segmentAttrs.get(node);return base+(standaloneHeadingNodes.has(node)?' data-heading="standalone-bold-title"':'')+(ids?` data-evidence-ids="${esc(ids)}"`:'' );
 };
 const render=(node:Node):string=>{
  if(node.nodeName==='#text')return node.value||'';
  if(node.nodeName==='#comment'||node.nodeName==='#documentType'||droppedTags.has(node.tagName))return '';
  const tag=node.tagName as string|undefined;const children=(node.childNodes||[]).map(render).join('');if(!tag)return children;
  if(tag==='img'){const id=visualIds.get(imageIndex++);const alt=(node.attrs||[]).find((a:any)=>a.name==='alt')?.value||'';if(id){usedVisualIds.add(id);const evidence=addVisualSegment(turnId,canonical,segments,nextId,nodePaths.get(node)||null,visualCursor,alt);const caption=evidence?.quote||alt||'Image';visualCaptions[id]=caption;const captionHtml=evidence?`<span data-evidence-ids="${esc(evidence.id)}">${esc(caption)}</span>`:`<span>${esc(caption)}</span>`;return `<figure data-visual-id="${esc(id)}"><figcaption><span>${esc(id)}</span>: ${captionHtml}</figcaption></figure>`;}return alt?`<figure><figcaption>${esc(alt)}</figcaption></figure>`:'';}
  const attrs=attrsFor(node);
  if(captureMetadataNodes.has(node))return `<p${attrs}>${children}</p>`;
  if(tag==='div'||tag==='span'||!safeTags.has(tag))return segmentAttrs.has(node)?`<p${attrs}>${children}</p>`:children;
  return voidTags.has(tag)?`<${tag}${attrs}>`:`<${tag}${attrs}>${children}</${tag}>`;
 };
 return render(root);
}
function markdownHtml(source:string,turnId:string,canonical:string,segments:EvidenceSegment[],nextId:{value:number},visualIds:Map<number,string>,usedVisualIds:Set<string>,visualCaptions:Record<string,string>){
 const root=unified().use(remarkParse).use(remarkGfm).parse(source) as any;let cursor=0,imageIndex=0;const visualCursor={value:0};
 const render=(node:any):string=>{
  if(node.type==='text')return esc(node.value);
  if(node.type==='html')return compactSourceHtml(node.value,turnId,canonical,segments,nextId,visualIds,usedVisualIds,visualCaptions);
  if(node.type==='image'){const id=visualIds.get(imageIndex++);if(id){usedVisualIds.add(id);const evidence=addVisualSegment(turnId,canonical,segments,nextId,null,visualCursor,node.alt||'');const caption=evidence?.quote||node.alt||'Image';visualCaptions[id]=caption;const captionHtml=evidence?`<span data-evidence-ids="${esc(evidence.id)}">${esc(caption)}</span>`:`<span>${esc(caption)}</span>`;return `<figure data-visual-id="${esc(id)}"><figcaption><span>${esc(id)}</span>: ${captionHtml}</figcaption></figure>`;}return `<figure><figcaption>${esc(node.alt||'image')}</figcaption></figure>`;}
  if(node.type==='inlineCode')return `<code>${esc(node.value)}</code>`;
  const children=()=>((node.children||[]).map(render).join(''));
  const p=node.position;const start=p?.start?.offset,end=p?.end?.offset;let marker='';
  if(start!==undefined&&end!==undefined&&end>start&&['heading','paragraph','code','table','listItem','blockquote'].includes(node.type)){
   const range=canonicalRange(canonical,source.slice(start,end),cursor);
   if(range){cursor=range.end;const ids:string[]=[];for(const span of sentenceRanges(canonical,range.start,range.end)){const id=`${turnId}:s${String(++nextId.value).padStart(4,'0')}`;ids.push(id);segments.push({segment_id:id,turn_id:turnId,start:span.start,end:span.end,block_start:range.start,block_end:range.end,quote:canonical.slice(span.start,span.end),source_text:canonical.slice(range.start,range.end),kind:node.type,source_path:null});}if(ids.length)marker=` data-evidence-ids="${esc(ids.join(' '))}"`;}
  }
  switch(node.type){
   case 'root':return children();case 'paragraph':return `<p${marker}>${children()}</p>`;
   case 'heading':return `<h${node.depth}${marker}>${children()}</h${node.depth}>`;
   case 'strong':return `<strong>${children()}</strong>`;case 'emphasis':return `<em>${children()}</em>`;
   case 'delete':return `<del>${children()}</del>`;case 'break':return '<br>';
   case 'link':return `<a>${children()}</a>`;case 'blockquote':return `<blockquote${marker}>${children()}</blockquote>`;
   case 'list':return `<${node.ordered?'ol':'ul'}${node.ordered&&node.start>1?` start="${node.start}"`:''}>${children()}</${node.ordered?'ol':'ul'}>`;
   case 'listItem':return `<li${marker}>${children()}</li>`;case 'thematicBreak':return '<hr>';
   case 'code':return `<pre${marker}><code>${esc(node.value)}</code></pre>`;
   case 'table':return `<table${marker}><thead><tr>${node.children[0].children.map((cell:any)=>`<th>${cell.children.map(render).join('')}</th>`).join('')}</tr></thead><tbody>${node.children.slice(1).map(render).join('')}</tbody></table>`;
   case 'tableRow':return `<tr>${children()}</tr>`;case 'tableCell':return `<td>${children()}</td>`;
   default:return children();
  }
 };
 return render(root);
}
export function modelConversationHtml(conversation:Conversation,captureHtml:Record<string,string>={},visuals:{id:string;turn_id:string}[]=[]){
 const segments:EvidenceSegment[]=[];const visualCaptions:Record<string,string>={};const visualRefs=new Map<string,string[]>();
 for(const visual of visuals)visualRefs.set(visual.turn_id,[...(visualRefs.get(visual.turn_id)||[]),visual.id]);
 const turns=conversation.messages.map(turn=>{
  const counter={value:0};
  const turnVisuals=visualRefs.get(turn.turn_id)||[];const visualByIndex=new Map<number,string>();
  turnVisuals.forEach((id,index)=>{const match=id.match(/image-(\d+)$/);visualByIndex.set(match?Number(match[1])-1:index,id);});
  const usedVisualIds=new Set<string>();
  const body=captureHtml[turn.turn_id]?compactSourceHtml(captureHtml[turn.turn_id],turn.turn_id,turn.text,segments,counter,visualByIndex,usedVisualIds,visualCaptions):markdownHtml(turn.text,turn.turn_id,turn.text,segments,counter,visualByIndex,usedVisualIds,visualCaptions);
  const refs=turnVisuals.filter(id=>!usedVisualIds.has(id)).map(id=>{visualCaptions[id]='Image';return `<figure data-visual-id="${esc(id)}"><figcaption><span>${esc(id)}</span>: Image</figcaption></figure>`;}).join('');
  return `<turn id="${esc(turn.turn_id)}" speaker="${esc(turn.speaker)}">${body}${refs}</turn>`;
 }).join('');
 return {html:`<conversation>${turns}</conversation>`,segments,visualCaptions};
}
export function resolveSegmentEvidence(output:any,segments:EvidenceSegment[],conversation:Conversation){
 const byId=new Map(segments.map(segment=>[segment.segment_id,segment]));
 const resolveAnnotation=(annotation:any)=>{
  if(!annotation||!Array.isArray(annotation.evidence))return annotation;
  annotation.evidence=annotation.evidence.map((item:any)=>{
   if(!item||typeof item!=='object'||!Object.hasOwn(item,'segment_id'))return item;
   const segment=byId.get(item.segment_id);if(!segment)return item;
   const keys=['segment_id','quote',...(item.example_status?['example_status']:[])];if(Object.keys(item).some(key=>!keys.includes(key))||keys.some(key=>!Object.hasOwn(item,key))||typeof item.quote!=='string'||!item.quote.trim())return item;
   const turn=conversation.messages.find(t=>t.turn_id===segment.turn_id);if(turn?.speaker!=='tutor')return item;
   if(!compactKey(segment.source_text).includes(compactKey(item.quote)))return item;
   const blockStart=segment.block_start??segment.start,blockEnd=segment.block_end??segment.end;const start=turn.text.indexOf(item.quote,blockStart);if(start<blockStart||start+item.quote.length>blockEnd)return item;
   let occurrence=0,at=-1;do{at=turn.text.indexOf(item.quote,at+1);occurrence++;}while(at>=0&&at<start);
   return {turn_id:segment.turn_id,quote:item.quote,occurrence,...(item.example_status?{example_status:item.example_status}:{})};
  });return annotation;
 };
 if(Array.isArray(output?.annotations))output.annotations=output.annotations.map(resolveAnnotation);
 if(Array.isArray(output?.replacements))output.replacements=output.replacements.map((item:any)=>({...item,annotation:resolveAnnotation(item.annotation)}));
 if(Array.isArray(output?.additions))output.additions=output.additions.map(resolveAnnotation);
 return output;
}
