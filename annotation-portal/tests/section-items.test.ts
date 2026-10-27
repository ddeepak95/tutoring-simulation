import {expect,it} from 'vitest';
import {bundledRubric,C,validateSubmission} from '../src/lib';
import {bundledRubric as legacy} from './fixtures/legacy-rubric';
import {countFeatureItems} from '../src/feature-counts';
import {annotationSchema,resolveLLMAnnotations} from '../server/llm-annotation-core';
import {inspectAnnotations} from '../server/annotation-repair';
import {generateInstructionalBaseline} from '../server/llm-provider';

const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'# Practice\n\nThree examples. x = 1. y = 2.\n\n# Practice\n\nThree examples. x = 1. y = 2.'}]});
const end=conversation.messages[0].text.indexOf('\n\n# Practice');
const evidence=C.makeEvidence(conversation,'t1',0,end);
it('defines precisely the 15 item labels and immutable category metadata',()=>{
 expect(bundledRubric.label_schema_version).toBe('section-items/1');
 expect(bundledRubric.rating_dimensions).toEqual(legacy.rating_dimensions);
 expect(bundledRubric.rubric.map(f=>f.key)).toEqual(['photographs','diagrams_and_illustrations','flow_diagrams','graphs','maps','animations','interactive_media','other_images','headings','tables','equations','examples','analogies','memory_aids','questions']);
 expect(bundledRubric.rubric.map(f=>f.category)).toEqual([...Array(8).fill('Multimedia'),...Array(3).fill('Textual Representations'),...Array(4).fill('Content')]);
 for(const f of bundledRubric.rubric){
  const a=C.createAnnotation(f.key,evidence,bundledRubric.rubric,f.key);
  expect(a.entry).toEqual({category:f.category,count:1,turn_locations:['t1']});
  expect(C.formFields(f)).toEqual([{key:'count',label:'Occurrences',numeric:true}]);
  expect(C.validateAnnotations(conversation,[a],bundledRubric.rubric)).toHaveLength(1);
 }
});
it('generates section quantities through the provider and resolves section IDs without old metadata',async()=>{
 const output={annotations:[{feature:'examples',entry:{category:'Content',count:3},evidence:[{segment_id:'t1:section_2',quote:evidence.quote}]}]};
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'section-provider',config:{model:'test/model',timeout:10,repair_attempts:0,reasoning:null},apiKey:'test',fetcher:async(_url,options)=>{
  const request=JSON.parse(String(options?.body));
  expect(request.messages[1].content).toContain('<section-inventory>');
  expect(request.messages[0].content).toContain('one annotation per section/item pair');
  return new Response(JSON.stringify({model:'test/model',choices:[{finish_reason:'stop',message:{content:JSON.stringify(output)}}]}),{headers:{'Content-Type':'application/json'}});
 }});
 expect(result.annotations).toHaveLength(1);
 expect(result.annotations[0].entry).toEqual({category:'Content',count:3,turn_locations:['t1']});
 expect(result.annotations[0].evidence[0].start).toBe(end+2);
});
it('sums quantities, exports category metadata, and counts sections separately',()=>{
 const examples=C.createAnnotation('examples',evidence,bundledRubric.rubric,'ex');examples.entry.count=3;
 const equations=C.createAnnotation('equations',evidence,bundledRubric.rubric,'eq');equations.entry.count=2;
 const result=validateSubmission(conversation,[examples,equations],bundledRubric,'alice',{},'label');
 expect(result.feature_counts.examples).toBe(3);expect(result.feature_counts.equations).toBe(2);
 expect(result.section_counts).toMatchObject({examples:1,equations:1});
 expect(countFeatureItems([examples,equations],'examples')).toBe(3);
 expect(JSON.parse(JSON.stringify(result)).annotations[0].entry).toEqual(examples.entry);
});
it('rejects invalid quantities, metadata, duplicate items, and merged sections',()=>{
 const a=C.createAnnotation('examples',evidence,bundledRubric.rubric,'a');
 for(const count of [0,-1,1.5,1001,NaN,'3',null])expect(()=>C.validateAnnotations(conversation,[{...a,entry:{...a.entry,count} as typeof a.entry}],bundledRubric.rubric,{allowIncomplete:true})).toThrow();
 expect(()=>C.validateAnnotations(conversation,[{...a,entry:{...a.entry,category:'Multimedia'}}],bundledRubric.rubric)).toThrow(/Category/);
 expect(()=>C.validateAnnotations(conversation,[a,{...a,id:'b'}],bundledRubric.rubric)).toThrow(/already labels/);
 expect(()=>C.addEvidence(a,evidence)).toThrow(/merge sections/);
 const secondStart=end+2;
 const second=C.createAnnotation('examples',C.makeEvidence(conversation,'t1',secondStart,conversation.messages[0].text.length),bundledRubric.rubric,'b');
 expect(second.evidence[0].occurrence).toBe(2);
 expect(C.validateAnnotations(conversation,[a,second],bundledRubric.rubric)).toHaveLength(2);
});
it('keeps historical descriptive annotations readable and exportable',()=>{
 const a=C.createAnnotation('examples',evidence,legacy.rubric,'old');a.entry.detail_level='Brief';
 expect(C.buildExport(conversation,[a],legacy.rubric,'alice').feature_counts.examples).toBe(1);
});
it('uses quantity-only LLM schemas and resolves the correct repeated section',()=>{
 const variants=annotationSchema(bundledRubric,true).properties.annotations.items.anyOf;
 expect(variants.find(v=>v.properties.feature.enum[0]==='examples')!.properties.entry.required).toEqual(['count','category']);
 const output={annotations:[{feature:'examples',entry:{category:'Content',count:3},evidence:[{turn_id:'t1',quote:evidence.quote,occurrence:2}]}]};
 const annotations=resolveLLMAnnotations(output,conversation,bundledRubric,'new');
 expect(annotations[0].evidence[0].start).toBe(end+2);
 expect(inspectAnnotations(output,conversation,bundledRubric,'new').issues).toEqual([]);
});
