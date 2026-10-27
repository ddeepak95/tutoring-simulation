import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {withCaptureDOM,hash} from './html-sections.mjs';
export const STRUCTURE_POLICY_VERSION='section-structure/1';

export function graphStructureInputs(graph,pkg){
 const tutorTurns=pkg?.turns.filter(t=>t.speaker==='tutor');
 if(tutorTurns&&tutorTurns.length!==graph.messages.length)throw Error('Exported tutor-turn inventory differs from the source graph.');
 return graph.messages.map((message,index)=>{const initial=message.states.find(s=>s.id===message.initial);if(!initial?.html||!initial.section_layout?.sections?.length)throw Error('A frozen initial section layout is required for structural validation.');return {turn_number:index+1,source_html:initial.html,sections:(tutorTurns?tutorTurns[index].sections:initial.section_layout.sections).map(({section_id,html,heading})=>({section_id,html,heading}))};});
}
export async function checkSectionStructure(inputs,{reportFile}={}){
 const fingerprint=hash(JSON.stringify({policy:STRUCTURE_POLICY_VERSION,inputs}));
 if(reportFile)try{const previous=JSON.parse(await readFile(reportFile,'utf8'));if(previous.version===STRUCTURE_POLICY_VERSION&&previous.fingerprint===fingerprint)return {...previous,cache_hit:true};}catch(e){if(e.code!=='ENOENT')throw e;}
 const result=await withCaptureDOM(page=>page.evaluate(inputs=>globalThis.CaptureSections.validateSectionStructure(inputs),inputs));
 const report={version:STRUCTURE_POLICY_VERSION,fingerprint,...result,checked_at:new Date().toISOString(),cache_hit:false};
 if(reportFile){await mkdir(path.dirname(reportFile),{recursive:true});await writeFile(reportFile,JSON.stringify(report,null,2)+'\n');}return report;
}
export async function requireSectionStructure(inputs,options={}){
 const report=await checkSectionStructure(inputs,options);
 if(!report.passed){const error=Error('Section structure needs review: '+report.issues.slice(0,3).map(i=>i.message).join(' ')+(options.reportFile?' Report: '+options.reportFile:''));error.code='section_structure_invalid';error.report=report;throw error;}return report;
}
export function packageStructureInputs(pkg){return pkg.turns.filter(t=>t.speaker==='tutor').map((t,i)=>({turn_number:i+1,sections:t.sections.map(({section_id,html,heading})=>({section_id,html,heading}))}));}
