import {annotationSchema,resolveLLMAnnotations} from './llm-annotation-core.ts';
import {sourcePassages,modelSourcePassages} from './source-passages.ts';
import type {Annotation,Conversation,RubricSnapshot} from '../src/types';

export interface RepairIssue {index:number|null;error:string;entry?:unknown;sources:ReturnType<typeof modelSourcePassages>}
export function inspectAnnotations(value:unknown,conversation:Conversation,rubric:RubricSnapshot,requestId:string){
 const issues:RepairIssue[]=[];const resolved:Annotation[]=[];
 if(!value||typeof value!=='object'||Array.isArray(value)||!Array.isArray((value as {annotations?:unknown}).annotations)||Object.keys(value).some(k=>k!=='annotations'))return {issues:[{index:null,error:'Expected one object containing only an annotations array.',sources:modelSourcePassages(conversation)}],resolved,structural:true};
 const entries=(value as {annotations:unknown[]}).annotations;
 if(entries.length>10000)return {issues:[{index:null,error:'Too many annotations.',sources:[]}],resolved,structural:true};
 const allSources=modelSourcePassages(conversation);
 entries.forEach((entry,index)=>{
  try{
   const [annotation]=resolveLLMAnnotations({annotations:[entry]},conversation,rubric,`${requestId}-${index}`);
   if(annotation.feature==='examples'&&annotation.evidence.some(e=>!e.example_status))throw new Error('Every example highlight requires example_status: Fresh or Duplicate.');
   resolved.push(annotation);
  }catch(error){
   const raw=entry as {evidence?:{turn_id?:string;source_id?:string}[]};
   const turns=new Set(Array.isArray(raw?.evidence)?raw.evidence.flatMap(e=>e?.turn_id?[e.turn_id]:allSources.filter(s=>s.source_id===e?.source_id).map(s=>s.turn_id)):[]);
   issues.push({index,error:(error as Error).message,entry,sources:turns.size?allSources.filter(s=>turns.has(s.turn_id)):allSources});
  }
 });
 for(const source of sourcePassages(conversation).filter(s=>s.kind==='heading')){
  if(!resolved.some(a=>a.feature==='concepts_and_subtopics_covered'&&a.evidence.some(e=>e.turn_id===source.turn_id&&e.start>=source.start&&e.end<=source.end)))issues.push({index:null,error:'Missing content-hierarchy highlight for this heading occurrence.',sources:allSources.filter(s=>s.source_id===source.source_id)});
 }
 return {issues,resolved,structural:false};
}
export function repairSchema(rubric:RubricSnapshot){
 const annotation=annotationSchema(rubric,true).properties.annotations.items;
 return {type:'object',additionalProperties:false,required:['replacements','additions'],properties:{replacements:{type:'array',items:{type:'object',additionalProperties:false,required:['index','annotation'],properties:{index:{type:'integer',minimum:0},annotation}}},additions:{type:'array',items:annotation}}};
}
export function applyRepair(value:{annotations:unknown[]},patch:unknown,issues:RepairIssue[],conversation:Conversation,rubric:RubricSnapshot){
 if(!patch||typeof patch!=='object'||Array.isArray(patch)||Object.keys(patch).some(k=>!['replacements','additions'].includes(k)))throw new Error('Expected replacements and additions only.');
 const p=patch as {replacements:{index:number;annotation:unknown}[];additions:unknown[]};if(!Array.isArray(p.replacements)||!Array.isArray(p.additions))throw new Error('Missing repair arrays.');
 const permitted=new Set(issues.flatMap(i=>i.index===null?[]:[i.index]));const replaced=new Set<number>();const next=structuredClone(value);
 for(const replacement of p.replacements){
  if(!replacement||Object.keys(replacement).some(k=>!['index','annotation'].includes(k))||!Number.isInteger(replacement.index)||!permitted.has(replacement.index)||replaced.has(replacement.index))throw new Error('Repair attempted to overwrite a valid entry or repeated an index.');
  replaced.add(replacement.index);next.annotations[replacement.index]=replacement.annotation;
 }
 const inventory=sourcePassages(conversation);
 const missing=issues.filter(i=>i.index===null).flatMap(i=>i.sources.filter(s=>s.kind==='heading')).map(s=>inventory.find(p=>p.source_id===s.source_id)!);
 const existing=next.annotations.flatMap(entry=>{try{return resolveLLMAnnotations({annotations:[entry]},conversation,rubric,'existing');}catch{return [];}});
 const covered=new Set<string>();
 for(const addition of p.additions){
  const [a]=resolveLLMAnnotations({annotations:[addition]},conversation,rubric,'repair-addition');
  if(a.feature!=='concepts_and_subtopics_covered'||a.evidence.some(e=>!missing.some(s=>s.turn_id===e.turn_id&&e.start>=s.start&&e.end<=s.end)||existing.some(x=>x.feature==='concepts_and_subtopics_covered'&&x.evidence.some(ev=>missing.some(s=>s.turn_id===e.turn_id&&s.turn_id===ev.turn_id&&e.start>=s.start&&e.end<=s.end&&ev.start>=s.start&&ev.end<=s.end)))))throw new Error('Repair additions must highlight a missing heading, without duplicating repaired headings or inventing other entries.');
  for(const e of a.evidence){const key=`${e.turn_id}:${e.start}:${e.end}`;if(covered.has(key))throw new Error('Duplicate repair addition.');covered.add(key);}
  const same=next.annotations.find(x=>{const raw=x as {feature?:string;entry?:{topic?:string}};return raw.feature===a.feature&&raw.entry?.topic===a.entry.topic;}) as {evidence:unknown[]}|undefined;
  if(same)same.evidence.push(...(addition as {evidence:unknown[]}).evidence);else next.annotations.push(addition);
 }
 return next;
}
