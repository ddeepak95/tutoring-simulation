import {isStructuredUnit} from '../annotation-portal/src/captured-sections';

const atomicSelector='[data-d-component="grid"],[role="grid"],table,ul,ol,dl,figure,[data-d-component="image"],[data-capture-component-anchor]';
const rowSelector='[data-d-component="row"],[data-d-direction="row"]';
type Issue={turn_number:number;section_id?:string;code:string;message:string};
export interface StructureInput {turn_number:number;source_html?:string;sections:{section_id:string;html:string;heading?:string|null}[]}

/** Discover complete units before considering their internal heading tags. */
export function structuralBlocks(root:Element){
 const candidates=[...root.querySelectorAll<HTMLElement>(atomicSelector+','+rowSelector)].filter(node=>!node.matches(rowSelector)||[...node.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6')].some(isStructuredUnit));
 return candidates.filter(node=>!candidates.some(parent=>parent!==node&&parent.contains(node)));
}

function clean(root:Element){
 root.querySelectorAll('script,style,.capture-speaker,[data-capture-validation-metadata]').forEach(node=>node.remove());
 // Image-source chips arrive asynchronously and are viewer chrome.
 root.querySelectorAll('[data-d-component="image"] a[href]').forEach(link=>{if(!link.querySelector('img'))link.remove();});
 return root;
}
function content(root:Element){
 const text=(root.textContent||'').replace(/\s+/g,' ').trim();
 const media=[...root.querySelectorAll('img,svg,canvas,video,math')].map(node=>[node.localName,node.getAttribute('alt')||node.getAttribute('aria-label')||'']);
 return JSON.stringify({text,media});
}
function blockSignature(node:Element){
 const copy=clean(node.cloneNode(true) as Element);
 // URLs and styles can be localized; the block's structure/content must survive.
 return JSON.stringify({kind:copy.getAttribute('data-d-component')||copy.getAttribute('role')||copy.localName,content:content(copy),tags:[copy,...copy.querySelectorAll('*')].map(n=>n.localName)});
}

export function validateSectionStructure(inputs:StructureInput[]){
 const issues:Issue[]=[],turns:{turn_number:number;sections:number;blocks:number}[]=[];
 for(const input of inputs){
  const sectionDocs=input.sections.map(section=>({section,root:clean(new DOMParser().parseFromString(section.html,'text/html').body)}));
  const combined=new DOMParser().parseFromString(input.sections.map(s=>s.html).join(''),'text/html').body;
  const source=clean(new DOMParser().parseFromString(input.source_html||input.sections.map(s=>s.html).join(''),'text/html').body);
  const blocks=structuralBlocks(source);
  const add=(code:string,message:string,section_id?:string)=>issues.push({turn_number:input.turn_number,section_id,code,message});
  for(const node of source.querySelectorAll<HTMLElement>('[data-capture-section-start]')){
   if(isStructuredUnit(node)||node.closest(atomicSelector))add('boundary_inside_block',`Section boundary “${node.textContent?.trim().slice(0,80)}” cuts through a structured block.`);
  }
  for(const {section,root} of sectionDocs){
   for(const node of root.querySelectorAll<HTMLElement>('[data-capture-section-start]'))if(isStructuredUnit(node)||node.closest(atomicSelector))add('section_fragment',`Section ${section.section_id} starts inside a grid, diagram, list, table, figure or component.`,section.section_id);
   const heading=(section.heading||root.querySelector('[data-capture-section-start]')?.textContent||'').trim(),text=(root.textContent||'').replace(/\s+/g,' ').trim();
   if(/^[A-Z][a-z]?$/.test(heading)&&text===heading)add('isolated_unit_label',`Section ${section.section_id} contains only the unit label “${heading}”.`,section.section_id);
  }
  if(content(source)!==content(clean(combined)))add('content_changed','Section output has missing, duplicated, reordered or changed text/media.');
  if(input.source_html){
   const expected=new Map<string,number>(),actual=new Map<string,number>();
   for(const block of blocks){const key=blockSignature(block);expected.set(key,(expected.get(key)||0)+1);}
   for(const {root} of sectionDocs)for(const block of structuralBlocks(root)){const key=blockSignature(block);actual.set(key,(actual.get(key)||0)+1);}
   for(const [signature,count] of expected)if(actual.get(signature)!==count)add('block_not_preserved',`A complete structured block must occur ${count} time(s), entirely within its owning section.`);
   for(const [signature,count] of actual)if(!expected.has(signature)||count!==expected.get(signature))add('extra_block_fragment','Section output contains a duplicated or partial structured block.');
  }
  const owners=new Map<string,Set<string>>();for(const {section,root} of sectionDocs)for(const node of root.querySelectorAll('[data-capture-block-id]')){const id=node.getAttribute('data-capture-block-id')!;if(!owners.has(id))owners.set(id,new Set());owners.get(id)!.add(section.section_id);}
  for(const [id,sections] of owners)if(sections.size!==1)add('multiple_block_owners',`Block ${id} appears in multiple sections.`);
  turns.push({turn_number:input.turn_number,sections:input.sections.length,blocks:blocks.length});
 }
 return {passed:issues.length===0,issues,turns};
}
