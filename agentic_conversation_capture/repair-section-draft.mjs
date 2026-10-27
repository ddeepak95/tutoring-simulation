import {withCaptureDOM,hash} from './html-sections.mjs';
import {requireSectionStructure,graphStructureInputs} from './section-structure.mjs';

export function canRepairSectionDraft(error,job,enabled=true){
 const known=new Set(['boundary_inside_block','section_fragment','isolated_unit_label','block_not_preserved','extra_block_fragment','multiple_block_owners']);
 const issues=error?.report?.issues;
 return enabled&&error?.code==='section_structure_invalid'&&!job.package&&!job.receipt&&!job.media?.turns?.length&&Array.isArray(issues)&&issues.some(i=>i.code==='boundary_inside_block')&&issues.every(i=>known.has(i.code));
}

export async function repairSectionDraft(original){
 if(original.messages.some(m=>m.states.length!==1||m.transitions?.length)||original.actions?.length)throw Error('Automatic boundary repair requires an unexplored draft; existing interaction work needs explicit revision.');
 const graph=structuredClone(original),mapping={};let removed=0;
 await withCaptureDOM(async page=>{
  for(const [index,message] of graph.messages.entries()){
   const initial=message.states.find(s=>s.id===message.initial);
   const result=await page.evaluate(({html,layout,number})=>{
    const doc=new DOMParser().parseFromString(html,'text/html'),root=doc.body.firstElementChild;if(!root)throw Error('Initial response HTML is empty.');
    const content=()=>JSON.stringify({text:root.textContent,media:[...root.querySelectorAll('img,svg,canvas,video,math')].map(n=>n.outerHTML)}),before=content();
    const repaired=CaptureSections.repairFrozenTurn(root,number,layout);if(content()!==before)throw Error('Boundary repair changed response content.');
    return {...repaired,html:root.outerHTML};
   },{html:initial.html,layout:initial.section_layout,number:index+1});
   for(const section of initial.section_layout.sections)if(!result.section_id_map[section.section_id])throw Error('Boundary repair could not map section '+section.section_id);
   initial.html=result.html;initial.section_layout=result.layout;initial.key=hash(initial.html);delete message.coverage;Object.assign(mapping,result.section_id_map);removed+=result.removed_boundaries;
  }
 });
 const report=await requireSectionStructure(graphStructureInputs(graph));
 graph.section_repair={version:'section-boundary-repair/1',original_graph_sha256:hash(JSON.stringify(original)),section_id_map:mapping,removed_boundaries:removed};
 return {graph,report,repair:graph.section_repair};
}
