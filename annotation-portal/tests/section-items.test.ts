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
it('defines precisely the 24 item labels and immutable category metadata',()=>{
 expect(bundledRubric.label_schema_version).toBe('section-items/1');
 expect(bundledRubric.rating_dimensions).toHaveLength(9);
 expect(bundledRubric.rubric.map(f=>f.key)).toEqual(['diagrams_and_illustrations', 'flow_diagrams', 'graphs', 'static_images', 'interactive_animated_media', 'headings', 'lists', 'tables', 'callouts', 'equations', 'definitions', 'step_by_step_walkthroughs', 'examples', 'real_world_connections', 'analogies', 'misconceptions_pitfalls', 'memory_aids', 'summaries_key_takeaways', 'social_cues', 'questions', 'comprehension_checks', 'hints_scaffolding', 'next_step_suggestions', 'bot_errors_hallucinations']);
 expect(bundledRubric.rubric.map(f=>f.category)).toEqual([...Array(5).fill('Visuals & Rich Media'),...Array(5).fill('Formatting & Notation'),...Array(8).fill('Explanatory & Pedagogical Devices'),...Array(5).fill('Conversational & Tutoring Moves'),'Quality & Error Tracking']);
 for(const f of bundledRubric.rubric){
  const a=C.createAnnotation(f.key,evidence,bundledRubric.rubric,f.key);
  expect(a.entry).toEqual({category:f.category,count:1,turn_locations:['t1']});
  expect(C.formFields(f)).toEqual([{key:'count',label:'Occurrences',numeric:true}]);
  expect(C.validateAnnotations(conversation,[a],bundledRubric.rubric)).toHaveLength(1);
 }
});
it('generates section quantities through the provider and resolves section IDs without old metadata',async()=>{
 const output={annotations:[{feature:'examples',entry:{category:'Explanatory & Pedagogical Devices',count:3},evidence:[{segment_id:'t1:section_2',quote:evidence.quote}]}]};
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'section-provider',config:{model:'test/model',timeout:10,repair_attempts:0,reasoning:null},apiKey:'test',fetcher:async(_url,options)=>{
  const request=JSON.parse(String(options?.body));
  expect(request.messages[1].content).toContain('<section-inventory>');
  expect(request.messages[0].content).toContain('one annotation per section/item pair');
  return new Response(JSON.stringify({model:'test/model',choices:[{finish_reason:'stop',message:{content:JSON.stringify(output)}}]}),{headers:{'Content-Type':'application/json'}});
 }});
 expect(result.annotations).toHaveLength(1);
 expect(result.annotations[0].entry).toEqual({category:'Explanatory & Pedagogical Devices',count:3,turn_locations:['t1']});
 expect(result.annotations[0].evidence[0].start).toBe(end+2);
});
it('supports section-wise Callout counts in LLM schemas, validation and exports',()=>{
 const section={conversation_id:'test',section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end,quote:evidence.quote,occurrence:1,source_hash:'test'};
 const schema=annotationSchema(bundledRubric,false,[section]);
 const variant=schema.properties.annotations.items.anyOf.find(v=>v.properties.feature.enum.includes('callouts'))!;
 expect(variant.properties.entry.properties.category.enum).toContain('Formatting & Notation');
 const annotations=resolveLLMAnnotations({annotations:[{feature:'callouts',section_id:'t1s1',entry:{category:'Formatting & Notation',count:2}}]},conversation,bundledRubric,'callout-test',{},[section]);
 expect(annotations[0]).toMatchObject({section_id:'t1s1',feature:'callouts',entry:{count:2}});
 expect(annotations[0].evidence[0].quote).toBe(evidence.quote);
 const exported=C.buildExport(conversation,annotations,bundledRubric.rubric,'test');
 expect(exported.feature_counts.callouts).toBe(2);
 expect(exported.section_counts.callouts).toBe(1);
});
it('counts mathematical comparisons as notation and excludes bold-only callouts in both evaluators',async()=>{
 const {instructionalPrompt}=await import('../server/llm-annotation-core');
 const {imagePrompt}=await import('../server/image-labeling');
 const callout=bundledRubric.rubric.find(f=>f.key==='callouts')!;
 expect(callout.category).toBe('Formatting & Notation');
 expect(callout.guidance).toContain('Count each distinct callout block once');
 expect(callout.guidance).toContain('Bold or italic formatting alone never qualifies');
 const notation=bundledRubric.rubric.find(f=>f.key==='equations')!;
 expect(notation.name).toBe('Mathematical Notation');
 expect(notation.short_label).toBe('Mathematical Notation');
 expect(notation.guidance).toContain('Standalone formal symbolic variables qualify');
 for(const prompt of [instructionalPrompt(),imagePrompt(bundledRubric)]){
   expect(prompt).toContain('Symbolic comparisons and ordered relationships qualify');
   expect(prompt).toContain('variables, numerical values, or descriptive labels');
   expect(prompt).not.toContain('single bond length > double bond length');
   expect(prompt).not.toContain('r = d/2 followed by');
   expect(prompt).toContain('Bold or italic formatting alone never qualifies');
   expect(prompt).toContain('word, phrase, complete sentence, or paragraph');
   expect(prompt).toContain('ordinary bold or italic body text');
   expect(prompt).toContain('both Callouts and a pedagogical label');
   expect(prompt).toContain('heading titles');
 }
});
it('applies the same text-drawn diagram rule in the rubric, text prompt and image prompt',async()=>{
 const {instructionalPrompt}=await import('../server/llm-annotation-core');
 const {imagePrompt}=await import('../server/image-labeling');
 const diagram=bundledRubric.rubric.find(f=>f.key==='diagrams_and_illustrations')!;
 expect(diagram.category).toBe('Visuals & Rich Media');
 for(const text of [diagram.description,instructionalPrompt(),imagePrompt(bundledRubric)]){
   expect(text).toContain('ASCII or Unicode characters');
   expect(text).toContain('fenced code or preformatted blocks');
   expect(text).toContain('An image attachment is not required');
   expect(text).toContain('Inspect preserved line breaks, spacing, endpoints, and connectors');
   expect(text).toContain('isolated chemical formulas');
   expect(text).toContain('translating labels alone does not add or remove a diagram');
 }
});
it('retains text-drawn layouts in the model input and saves their section-wise diagram count',async()=>{
 const text='# Bond\n\n```text\nNucleus A       Nucleus B\n    o---------------o\n        198 pm\n```';
 const source=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text}]});
 const section={conversation_id:'test',section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end:text.length,quote:text,occurrence:1,source_hash:'test'};
 const result=await generateInstructionalBaseline({conversation:source,rubric:bundledRubric,sections:[section],requestId:'diagram',config:{model:'test/model',timeout:10,repair_attempts:0,reasoning:null},apiKey:'test',fetcher:async(_url,options)=>{
   const request=JSON.parse(String(options?.body));
   expect(request.messages[1].content).toContain('Nucleus A       Nucleus B\n    o---------------o\n        198 pm');
   expect(request.messages[0].content).toContain('An image attachment is not required');
   return new Response(JSON.stringify({model:'test/model',choices:[{finish_reason:'stop',message:{content:JSON.stringify({annotations:[{feature:'diagrams_and_illustrations',section_id:'t1s1',entry:{category:'Visuals & Rich Media',count:1}}]})}}]}));
 }});
 expect(result.annotations[0]).toMatchObject({feature:'diagrams_and_illustrations',section_id:'t1s1',entry:{count:1},evidence:[{quote:text}]});
});
it('defines an example by its instructional application and counts a developed case once in every evaluator',async()=>{
 const {instructionalPrompt}=await import('../server/llm-annotation-core');
 const {imagePrompt}=await import('../server/image-labeling');
 const example=bundledRubric.rubric.find(f=>f.key==='examples')!;
 expect(example.category).toBe('Explanatory & Pedagogical Devices');
 for(const text of [example.description,instructionalPrompt(),imagePrompt(bundledRubric)]){
   expect(text).toContain('concrete instances');
   expect(text).toContain('Unsolved practice questions');
   expect(text).toContain('Count each concrete case once within its section');
   expect(text).toContain('Continuing or referring back to that case does not create another occurrence');
   expect(text).toContain('independently presented again in another section');
   expect(text).toContain('both Examples and Step-by-Step Walkthroughs');
   expect(text).toContain('An analogy is not automatically an Example');
 }
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
 expect(()=>C.validateAnnotations(conversation,[{...a,entry:{...a.entry,category:'Visuals & Rich Media'}}],bundledRubric.rubric)).toThrow(/Category/);
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
 const output={annotations:[{feature:'examples',entry:{category:'Explanatory & Pedagogical Devices',count:3},evidence:[{turn_id:'t1',quote:evidence.quote,occurrence:2}]}]};
 const annotations=resolveLLMAnnotations(output,conversation,bundledRubric,'new');
 expect(annotations[0].evidence[0].start).toBe(end+2);
 expect(inspectAnnotations(output,conversation,bundledRubric,'new').issues).toEqual([]);
});
