import {isHeading,isHeadingCandidate} from '../annotation-portal/src/captured-sections';
export {isStructuredUnit} from '../annotation-portal/src/captured-sections';
export {renderHtmlDocument} from '../annotation-portal/src/html-renderer';
export {componentStateHtml} from '../annotation-portal/src/html-renderer';
export {galleryReplayHtml} from './gallery-replay.mjs';
export {validateSectionStructure} from './section-structure.browser';
import {structuralBlocks} from './section-structure.browser';
const controls='button,input,select,textarea,summary,[role="button"],[role="tab"],[role="radio"],[role="switch"]';
/** Stamp the initial DOM before capture actions. Live React content is not wrapped. */
export function freezeTurn(root:HTMLElement,number:number,legacyUnitHeadings=false) {
  if(root.dataset.captureFrozenTurn)return;
  const candidates=[...root.querySelectorAll<HTMLElement>(controls)].map(control=>{
    let node=control.closest<HTMLElement>('[data-d-component="box"],details,[role="tablist"],[data-interactive]')||control.parentElement!;
    while(node.parentElement&&node.parentElement!==root&&node.parentElement.querySelectorAll(controls).length>node.querySelectorAll(controls).length&&!node.parentElement.querySelector('h1,h2,h3,h4,h5,h6'))node=node.parentElement;
    return node;
  }).filter((node,i,all)=>node!==root&&all.indexOf(node)===i&&!all.some(other=>other!==node&&other.contains(node)));
  candidates.forEach((node,i)=>node.dataset.captureComponentAnchor=String(i+1));
  structuralBlocks(root).forEach((node,i)=>node.dataset.captureBlockId=`t${number}b${i+1}`);
  const heading=legacyUnitHeadings?isHeadingCandidate:isHeading;
  const headings=[...root.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6,p,div')].filter(heading)
    .filter(el=>!el.closest('[data-capture-component-anchor]'))
    .filter(el=>![...el.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6,p,div')].some(heading));
  headings.forEach((h,i)=>h.dataset.captureSectionStart=String(i+1));root.dataset.captureFrozenTurn=String(number);
  snapshotTurn(root,number).sections.forEach(s=>{
    for(const node of root.querySelectorAll<HTMLElement>('[data-capture-component-anchor]'))if(s.anchors.includes(node.dataset.captureComponentAnchor!))node.dataset.captureOwnerSection=s.section_id;
  });
}
export function snapshotTurn(root:HTMLElement,number:number) {
  const doc=root.ownerDocument,headings=[...root.querySelectorAll<HTMLElement>('[data-capture-section-start]')];
  const parts:Range[]=[];let start=doc.createRange();start.selectNodeContents(root);start.collapse(true);
  for(const heading of headings){const part=start.cloneRange();part.setEndBefore(heading);parts.push(part);start.setStartBefore(heading);start.collapse(true);}
  const last=start.cloneRange();last.setEnd(root,root.childNodes.length);parts.push(last);
  const sections=parts.flatMap(range=>{
    const copy=doc.createElement('div');copy.append(range.cloneContents());
    if(!copy.textContent?.trim()&&!copy.querySelector('img,svg,canvas,video,math'))return [];
    return [{html:copy.innerHTML,heading:copy.querySelector('[data-capture-section-start]')?.textContent?.trim()||null,
      anchors:[...copy.querySelectorAll<HTMLElement>('[data-capture-component-anchor]')].map(n=>n.dataset.captureComponentAnchor!)}];
  }).map((s,i)=>({...s,section_id:`t${number}s${i+1}`,turn_number:number,section_number:i+1}));
  const content_attributes=Object.fromEntries(['class','dir','style','data-markdown-text-style','data-assistant-markdown-root'].filter(name=>root.hasAttribute(name)).map(name=>[name,root.getAttribute(name)!]));
  return {sections,boundary_count:headings.length,content_attributes};
}
/** Repair provisional boundaries only; preserve every content node and component. */
export function repairFrozenTurn(root:HTMLElement,number:number,previous:ReturnType<typeof snapshotTurn>){
 const oldIds=new Map<string,string>();
 for(const section of previous.sections){const doc=new DOMParser().parseFromString(section.html,'text/html'),marker=doc.querySelector('[data-capture-section-start]')?.getAttribute('data-capture-section-start');if(marker)oldIds.set(marker,section.section_id);}
 const blocks=structuralBlocks(root),headings=[...root.querySelectorAll<HTMLElement>('[data-capture-section-start]')];let removed=0,next=0;
 for(const heading of headings){const old=oldIds.get(heading.dataset.captureSectionStart!);if(old)heading.dataset.previousSectionId=old;
  if(blocks.some(block=>block.contains(heading))){heading.removeAttribute('data-capture-section-start');removed++;}else heading.dataset.captureSectionStart=String(++next);
 }
 const layout=snapshotTurn(root,number),mapping:Record<string,string>={};
 if(previous.sections[0]?.heading===null)mapping[previous.sections[0].section_id]=layout.sections[0].section_id;
 for(const section of layout.sections){const doc=new DOMParser().parseFromString(section.html,'text/html');for(const node of doc.querySelectorAll<HTMLElement>('[data-previous-section-id]'))mapping[node.dataset.previousSectionId!]=section.section_id;}
 root.querySelectorAll('[data-previous-section-id]').forEach(node=>node.removeAttribute('data-previous-section-id'));
 for(const section of layout.sections)for(const anchor of section.anchors){const component=[...root.querySelectorAll<HTMLElement>('[data-capture-component-anchor]')].find(node=>node.dataset.captureComponentAnchor===anchor);if(component)component.dataset.captureOwnerSection=section.section_id;}
 return {layout:snapshotTurn(root,number),section_id_map:mapping,removed_boundaries:removed};
}
export function extractComponent(html:string,anchor:string) {
  const doc=new DOMParser().parseFromString(html,'text/html');
  const matches=[...doc.querySelectorAll<HTMLElement>('[data-capture-component-anchor]')].filter(n=>n.dataset.captureComponentAnchor===anchor);
  if(matches.length!==1)throw Error(`Lost interactive component ${anchor}; resume capture with persistent anchors.`);
  return matches[0].outerHTML;
}
export function questionView(html:string){
  const doc=new DOMParser().parseFromString(html,'text/html');
  const quiz=!!doc.querySelector('[role="radiogroup"],[data-d-component="radio-group"]')||/\bquestion\s+\d+\s+of\s+\d+/i.test(doc.body.textContent||'');
  const feedback=!!doc.querySelector('[aria-checked="true"],input:checked,[data-selected="true"]')||[...doc.querySelectorAll('*')].some(el=>!el.children.length&&!el.closest('button')&&/^(?:correct!?|correct answer!?|not quite\.?|good try!?|incorrect[.!]?)$/i.test((el.textContent||'').trim()))||[...doc.querySelectorAll<HTMLElement>('[data-d-component="pressable"]')].some(el=>el.style.border.includes('--color-border-strong'));
  const counter=(doc.body.textContent||'').match(/\bquestion\s+(\d+)\s+of\s+(\d+)/i);
  const navigation=[...doc.querySelectorAll<HTMLElement>('button[data-capture-agent-control]')].flatMap(button=>{const label=(button.textContent||'').trim();return /^(previous|next)(?: question)?$/i.test(label)?[{control_id:button.dataset.captureAgentControl!,direction:/^next/i.test(label)?1:-1}]:[];});
  return {quiz,feedback,position:counter?Number(counter[1]):null,total:counter?Number(counter[2]):null,navigation};
}
export function translationUnits(html:string) {
  const doc=new DOMParser().parseFromString(html,'text/html'),units:{path:number[];attribute:string|null;text:string}[]=[];
  const blocks=new Set([...doc.body.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,td,th,figcaption,button')].filter(el=>!el.querySelector('p,h1,h2,h3,h4,h5,h6,li,td,th,figcaption,button')&&!el.closest('script,style,math,.katex,svg,code,pre')));
  const name=(n:number):string=>n<26?String.fromCharCode(97+n):name(Math.floor(n/26)-1)+String.fromCharCode(97+n%26);
  function rich(el:Element){const nodes:{path:number[];name:string;atomic:boolean}[]=[];
    function serialize(node:Node,path:number[]):string{
      if(node.nodeType===Node.TEXT_NODE)return node.textContent||'';
      if(node.nodeType!==Node.ELEMENT_NODE)return '';
      const element=node as Element,atomic=element.matches('math,.katex,svg,code,pre,img,br,input');
      const id=name(nodes.length);nodes.push({path,name:id,atomic});
      if(atomic)return `{{NODE:${id}}}`;
      return `{{OPEN:${id}}}`+[...node.childNodes].map((child,i)=>serialize(child,[...path,i])).join('')+`{{CLOSE:${id}}}`;
    }
    return {nodes,text:[...el.childNodes].map((child,i)=>serialize(child,[i])).join('')};
  }
  function walk(node:Node,path:number[]){
    if(node.nodeType===Node.ELEMENT_NODE){const el=node as Element;if(el.matches('script,style,math,.katex,svg,code,pre'))return;
      for(const attribute of ['alt','title','aria-label','data-capture-label']){const text=el.getAttribute(attribute);if(text?.trim())units.push({path,attribute,text});}}
    if(node.nodeType===Node.ELEMENT_NODE&&blocks.has(node as Element)){
      const passage=rich(node as Element);if(/\p{L}/u.test(passage.text.replace(/\{\{(?:OPEN|CLOSE|NODE):[a-z]+\}\}/g,'')))units.push({path,attribute:null,...passage} as any);
    }
    if(node.nodeType===Node.TEXT_NODE&&node.textContent?.trim()&&!/^[\d\s\p{P}\p{S}]+$/u.test(node.textContent)&&![...blocks].some(b=>b.contains(node)))units.push({path,attribute:null,text:node.textContent});
    [...node.childNodes].forEach((child,i)=>walk(child,[...path,i]));
  }walk(doc.body,[]);return units;
}
export function applyTranslations(html:string,units:ReturnType<typeof translationUnits>,values:string[]) {
  if(values.length!==units.length)throw Error('Translation passage count changed.');
  const doc=new DOMParser().parseFromString(html,'text/html');
  const targets=units.map(unit=>{let node:Node=doc.body;for(const p of unit.path)node=node.childNodes[p];return node;});
  units.forEach((unit,i)=>{const node=targets[i];if(!node||!values[i]?.trim())throw Error('Translation DOM alignment failed.');
    if(unit.attribute)(node as Element).setAttribute(unit.attribute,values[i]);else if(!(unit as any).nodes)node.textContent=values[i];});
  units.forEach((unit,i)=>{
    const blueprint=(unit as any).nodes as {path:number[];name:string;atomic:boolean}[]|undefined;if(!blueprint)return;
    const expected=(unit.text.match(/\{\{(?:OPEN|CLOSE|NODE):[a-z]+\}\}/g)||[]).sort(),actual=(values[i].match(/\{\{(?:OPEN|CLOSE|NODE):[a-z]+\}\}/g)||[]).sort();
    if(JSON.stringify(expected)!==JSON.stringify(actual))throw Error('Translation changed an inline markup/equation token.');
    const sourceNodes=new Map(blueprint.map(b=>{let node=targets[i];for(const p of b.path)node=node.childNodes[p];return [b.name,node];}));
    const fragment=doc.createDocumentFragment(),stack:{name:string;node:Node}[]=[{name:'',node:fragment}];
    for(const part of values[i].split(/(\{\{(?:OPEN|CLOSE|NODE):[a-z]+\}\})/g)){
      const token=part.match(/^\{\{(OPEN|CLOSE|NODE):([a-z]+)\}\}$/);if(!token){stack.at(-1)!.node.appendChild(doc.createTextNode(part));continue;}
      const [,kind,name]=token;if(kind==='CLOSE'){if(stack.at(-1)?.name!==name)throw Error('Translation unbalanced inline markup.');stack.pop();continue;}
      const original=sourceNodes.get(name);if(!original)throw Error('Unknown inline markup token.');const copy=original.cloneNode(kind==='NODE');stack.at(-1)!.node.appendChild(copy);if(kind==='OPEN')stack.push({name,node:copy});
    }
    if(stack.length!==1)throw Error('Translation unbalanced inline markup.');(targets[i] as Element).replaceChildren(fragment);
  });
  return doc.body.innerHTML;
}
