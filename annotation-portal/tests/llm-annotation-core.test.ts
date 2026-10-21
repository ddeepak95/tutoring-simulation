import { expect,it,vi } from 'vitest';
import { bundledRubric,C } from '../src/lib';
import { annotationSchema,instructionalPrompt,promptVersion,resolveLLMAnnotations } from '../server/llm-annotation-core';
import fs from 'node:fs';
import {instructionalPromptText,instructionalReviewPrompt,instructionalRepairPrompt,instructionalPromptSource,instructionalPromptSha256} from '../server/generated/instructional-prompt';
import {createHash} from 'node:crypto';
import { generateInstructionalBaseline } from '../server/llm-provider';
import { compareWithBaseline } from '../src/baseline-comparison';
import {modelSourcePassages} from '../server/source-passages';
const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'😀 **Water evaporates.** Water evaporates. Why? Why?'},{turn_id:'s1',speaker:'student',text:'Water evaporates.'}]});
const output={annotations:[{feature:'examples',entry:{example:'Evaporation',concept_illustrated:null,detail_level:'Brief'},evidence:[{turn_id:'t1',quote:'Water evaporates.',occurrence:2,example_status:'Fresh' as const}]}]};
const repairPatch={replacements:[{index:0,annotation:output.annotations[0]}],additions:[]};
it('uses both prompts and version from the single Markdown source and records its full hash',()=>{
 const source=fs.readFileSync(`../${instructionalPromptSource}`,'utf8');
 expect(instructionalPromptSource).toBe('conversation-evaluation/prompts/instructional-features.md');
 const expected=source.split('## Annotation prompt')[1].split('## Review prompt')[0].trim();
 expect(instructionalReviewPrompt).toBe(source.split('## Review prompt')[1].split('## Validation repair prompt')[0].trim());
 expect(instructionalPromptText).not.toContain('## Review prompt');
 expect(instructionalPromptText).toBe(expected);expect(instructionalPrompt()).toBe(expected);
 expect(instructionalRepairPrompt).toBe(source.split('## Validation repair prompt')[1].trim());
 expect(instructionalPromptSha256).toBe(createHash('sha256').update(source).digest('hex'));
 expect(source).toContain(`prompt_version: ${promptVersion}`);
 const prompt=instructionalPrompt();expect(prompt).toContain('segment_id');expect(prompt).toContain('data-evidence-ids');expect(prompt.length).toBeLessThan(12000);
  for(const feature of bundledRubric.rubric)expect(prompt).toContain(feature.key);
 for(const section of ['### Pedagogical Characteristics','#### Instructional Sequence','### Conversation Quality','### Errors'])expect(prompt).not.toContain(section);
});
it('resolves raw quotations to exact UTF-16 spans and retains occurrence identity',()=>{
 const annotation=resolveLLMAnnotations(output,conversation,bundledRubric,'request')[0];
 expect(annotation.evidence[0].start).toBe(conversation.messages[0].text.lastIndexOf('Water evaporates.'));expect(annotation.evidence[0].occurrence).toBe(2);expect(annotation.entry.turn_locations).toEqual(['t1']);expect(annotation.id).toBe('llm-request-1');
 expect(()=>C.validateAnnotations(conversation,[annotation],bundledRubric.rubric)).not.toThrow();
});
it('maps HTML headings and table header rows back onto exact canonical transcript spans',()=>{
 const value=C.normalizeConversation({conversation_id:'html-conversation',messages:[{turn_id:'html-1',speaker:'tutor',text:'Evaporation\nAB\nrow\n'}]});
 const html={ 'html-1':'<h2>Evaporation</h2><table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>row</td></tr></tbody></table>' };
 expect(modelSourcePassages(value,html).filter(source=>source.kind!=='passage').map(source=>[source.kind,source.quote])).toEqual([['heading','Evaporation'],['table_header','AB']]);
 const concept={annotations:[{feature:'concepts_and_subtopics_covered',entry:{topic:'Evaporation',detail_level:'Brief'},evidence:[{turn_id:'html-1',quote:'Evaporation',occurrence:1}]}]};
 expect(resolveLLMAnnotations(concept,value,bundledRubric,'html',html)[0].evidence[0]).toMatchObject({start:0,end:11});
 const response={annotations:[{feature:'concepts_and_subtopics_covered',entry:{topic:'Evaporation',detail_level:'Brief'},evidence:[{segment_id:'html-1:s0001',quote:'Evaporation'}]}]};
 const sent={conversation:value,rubric:bundledRubric,requestId:'html-request',apiKey:'unused',config:{model:'configured/model',timeout:1,repair_attempts:0,reasoning:null},fetcher:vi.fn().mockResolvedValue(new Response(JSON.stringify({choices:[{finish_reason:'stop',message:{content:JSON.stringify(response)}}]})))};
 return generateInstructionalBaseline({...sent,captureHtml:html}).then(result=>{const request=JSON.parse(sent.fetcher.mock.calls[0][1].body);const input=request.messages[1].content;expect(input).toContain('<h2 data-evidence-ids="html-1:s0001">Evaporation</h2>');expect(input).toContain('<th>A</th><th>B</th>');expect(input).not.toContain('tutor_source_passages');expect(input).not.toContain('canonical_text');expect(result.annotations[0].evidence[0]).toMatchObject({turn_id:'html-1',quote:'Evaporation',start:0,end:11});});
});
it('preserves per-highlight freshness, supports legacy evidence, and rejects invalid statuses',()=>{
 const value=structuredClone(output);value.annotations[0].evidence.push({...value.annotations[0].evidence[0],occurrence:1,example_status:'Duplicate'});
 const resolved=resolveLLMAnnotations(value,conversation,bundledRubric,'example-status');
 expect(resolved[0].evidence.map(e=>e.example_status)).toEqual(['Fresh','Duplicate']);
 const invalid:any=structuredClone(value);invalid.annotations[0].evidence[0].example_status='New';expect(()=>resolveLLMAnnotations(invalid,conversation,bundledRubric,'invalid')).toThrow(/Fresh or Duplicate/);
 const historical:any=structuredClone(output);delete historical.annotations[0].evidence[0].example_status;expect(resolveLLMAnnotations(historical,conversation,bundledRubric,'old')).toHaveLength(1);
 const exampleVariant=annotationSchema(bundledRubric).properties.annotations.items.anyOf.find(v=>v.properties.feature.enum[0]==='examples')!;
 expect(exampleVariant.properties.evidence.items.required).toContain('example_status');
 const generatedEvidence=annotationSchema(bundledRubric,true).properties.annotations.items.anyOf.find(v=>v.properties.feature.enum[0]==='examples')!.properties.evidence.items;
 expect(generatedEvidence.required).toEqual(['segment_id','quote','example_status']);expect(generatedEvidence).not.toHaveProperty('anyOf');
 const conceptVariant=annotationSchema(bundledRubric,true).properties.annotations.items.anyOf.find(v=>v.properties.feature.enum[0]==='concepts_and_subtopics_covered')!;
 expect(conceptVariant.properties.entry.properties.concept_level.enum).toEqual(['Main concept','Explanatory unit','Explanatory subunit',null]);
 const wrongFeature=structuredClone(resolved);wrongFeature[0].feature='analogies';expect(()=>C.validateAnnotations(conversation,wrongFeature,bundledRubric.rubric,{allowIncomplete:true})).toThrow(/only to examples/);
});
it('rejects fabricated/student evidence, unknown categories, ratings, enum errors and mismatched question quotes',()=>{
 for(const modify of [(value:any)=>value.annotations[0].evidence[0].quote='fabricated',(value:any)=>value.annotations[0].evidence[0].turn_id='s1',(value:any)=>value.annotations[0].feature='unknown',(value:any)=>value.ratings={},(value:any)=>value.annotations[0].entry.detail_level='Great',(value:any)=>value.annotations[0].evidence[0].occurrence=99]){const value=structuredClone(output);modify(value);expect(()=>resolveLLMAnnotations(value,conversation,bundledRubric,'request')).toThrow();}
 const question={annotations:[{feature:'questions',entry:{question:'Different question?',question_type:'Instructional',concept_checked:null},evidence:[{turn_id:'t1',quote:'Why?',occurrence:2}]}]};expect(()=>resolveLLMAnnotations(question,conversation,bundledRubric,'request')).toThrow(/exact/);
 expect(JSON.stringify(annotationSchema(bundledRubric))).toContain('"issues"');expect(resolveLLMAnnotations({annotations:[]},conversation,bundledRubric,'empty')).toEqual([]);
});
it('repairs invalid exact evidence once without switching models and returns full generation provenance',async()=>{
 const invalid=structuredClone(output);invalid.annotations[0].evidence[0].quote='fabricated';
 const fetcher=vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({choices:[{finish_reason:'stop',message:{content:JSON.stringify(invalid)}}]}))).mockResolvedValueOnce(new Response(JSON.stringify({id:'provider-id',model:'configured/model',usage:{total_tokens:100},choices:[{finish_reason:'stop',message:{content:JSON.stringify(repairPatch)}}]})));
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'request',apiKey:'private-key',config:{model:'configured/model',max_tokens:1000,timeout:10,repair_attempts:1,reasoning:null},fetcher});
 expect(fetcher).toHaveBeenCalledTimes(2);expect(result.generation_config.attempts).toBe(2);expect(result.model).toBe('configured/model');expect(result.generation_config.provider_request_id).toBe('provider-id');
 for(const call of fetcher.mock.calls){const request=JSON.parse(call[1].body);expect(request.model).toBe('configured/model');expect(request.provider.require_parameters).toBe(true);expect(request.response_format.type).toBe('json_schema');expect(JSON.stringify(request.response_format.json_schema.schema)).toContain('memory_aids');expect(request.messages[0].content).toBe(instructionalPromptText);}
 const repairRequest=JSON.parse(fetcher.mock.calls[1][1].body);const repaired=repairRequest.messages.at(-2).content;const repairData=JSON.parse(repairRequest.messages.at(-1).content);
 for(const call of fetcher.mock.calls){const input=JSON.parse(call[1].body).messages[1].content;expect(input).toContain('<conversation>');expect(input).toContain('speaker="tutor"');expect(input).not.toContain('tutor_source_passages');expect(input).not.toContain('tutor_heading_inventory');expect(input).not.toContain('visual_inventory');}
 expect(conversation).toHaveProperty('label');
 let validationError='';try{resolveLLMAnnotations(invalid,conversation,bundledRubric,'request');}catch(error){validationError=(error as Error).message;}
 expect(repaired).toContain('compact validation details');expect(repairData.invalid_entries[0].error).toBe(validationError);expect(JSON.stringify(repairData)).toContain('fabricated');expect(result.generation_config.repair_log).toHaveLength(1);
 expect(result.prompt).toBe(instructionalPromptText);expect(result.generation_config.repair_prompt).toBe(repaired);
 expect(result.generation_config.instructional_prompt_source).toBe(instructionalPromptSource);expect(result.generation_config.instructional_prompt_sha256).toBe(instructionalPromptSha256);
});
it('reviews a validated draft with the original instructions and high reasoning without sending derived fields or labels',async()=>{
 const previous=resolveLLMAnnotations(output,conversation,bundledRubric,'first');const unchanged=structuredClone(previous);
 const fetcher=vi.fn().mockResolvedValue(new Response(JSON.stringify({model:'configured/model',choices:[{finish_reason:'stop',message:{content:JSON.stringify(output)}}]})));
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'second',previousAnnotations:previous,apiKey:'private-key',config:{model:'configured/model',max_tokens:null,timeout:10,repair_attempts:0,reasoning:{effort:'high',exclude:true}},fetcher});
 const request=JSON.parse(fetcher.mock.calls[0][1].body);expect(request.reasoning.effort).toBe('high');expect(request).not.toHaveProperty('max_tokens');expect(request.messages[0].content).toBe(`${instructionalPromptText}\n\n${instructionalReviewPrompt}`);
 expect(request.messages[1].content).toContain('<conversation>');expect(request.messages[1].content).not.toContain('label');expect(JSON.parse(request.messages[2].content)).toEqual(output);expect(previous).toEqual(unchanged);
 expect(result.generation_config.pass).toBe('review');expect(result.annotations[0].id).toBe('llm-second-1');
 const invalid=structuredClone(previous);invalid[0].evidence[0].quote='fabricated';await expect(generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'bad',previousAnnotations:invalid,apiKey:'private-key',config:{model:'configured/model',max_tokens:1000,timeout:10,repair_attempts:0,reasoning:null},fetcher})).rejects.toThrow(/exactly match/);expect(fetcher).toHaveBeenCalledTimes(1);
});
it('resumes evidence repair with streamed JSON, preserves usage, and omits token limits',async()=>{
 const invalid=structuredClone(output);invalid.annotations[0].evidence[0].quote='fabricated';
 const content=JSON.stringify(repairPatch);const chunks=[{id:'stream-id',model:'configured/model',choices:[{index:0,delta:{content:content.slice(0,20)},finish_reason:null}]},{choices:[{index:0,delta:{content:content.slice(20)},finish_reason:'stop'}]},{choices:[],usage:{total_tokens:200}}];
 const stream=': keepalive\n\n'+chunks.map(chunk=>'data: '+JSON.stringify(chunk)+'\n\n').join('')+'data: [DONE]\n\n';
 const fetcher=vi.fn().mockResolvedValue(new Response(stream));const capture=vi.fn();
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'resumed',apiKey:'private-key',initialContent:JSON.stringify(invalid),initialResponseId:'old-response',onProviderResponse:capture,config:{model:'configured/model',max_tokens:null,timeout:10,repair_attempts:0,reasoning:{effort:'high'},stream:true},fetcher});
 const request=JSON.parse(fetcher.mock.calls[0][1].body);expect(request.stream).toBe(true);expect(request).not.toHaveProperty('max_tokens');expect(request.messages[2].content).toContain('Validation problem:');expect(JSON.parse(request.messages[3].content).repair_mode).toBe('targeted');
 expect(result.annotations).toHaveLength(1);expect(result.generation_config.resumed_from_provider_response).toBe('old-response');expect(result.generation_config.usage?.total_tokens).toBe(200);expect(result.generation_config.attempts).toBe(2);expect(capture).toHaveBeenCalledOnce();
});
it('resumes a failed review while retaining the validated draft and review provenance',async()=>{
 const previous=resolveLLMAnnotations(output,conversation,bundledRubric,'first');
 const invalid=structuredClone(output);invalid.annotations[0].evidence[0].quote='fabricated';
 const fetcher=vi.fn().mockResolvedValue(new Response(JSON.stringify({id:'repaired-review',choices:[{finish_reason:'stop',message:{content:JSON.stringify(repairPatch)}}]})));
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'review-recovery',previousAnnotations:previous,initialContent:JSON.stringify(invalid),initialResponseId:'failed-review',apiKey:'private-key',config:{model:'configured/model',max_tokens:null,timeout:10,repair_attempts:0,reasoning:{effort:'medium'}},fetcher});
 const request=JSON.parse(fetcher.mock.calls[0][1].body);
 expect(request.messages[0].content).toBe(`${instructionalPromptText}\n\n${instructionalReviewPrompt}`);
 expect(JSON.parse(request.messages[2].content)).toEqual(output);
 expect(request.messages[3].content).toContain('Validation problem:');
 expect(JSON.parse(request.messages[4].content).repair_mode).toBe('targeted');
 expect(result.generation_config.pass).toBe('review');expect(result.generation_config.resumed_from_provider_response).toBe('failed-review');
 expect(result.annotations).toHaveLength(1);expect(fetcher).toHaveBeenCalledTimes(1);
});
it.each([false,true])('repairs omitted bold heading occurrences during generation (review=%s)',async(review)=>{
 const headed=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'# Measurement\nExplanation.\n\n**Example:**\nCase one.\n\n**Example:**\nCase two.'}]});
 const incomplete={annotations:[{feature:'concepts_and_subtopics_covered',entry:{topic:'Measurement',detail_level:'Brief'},evidence:[{turn_id:'t1',quote:'# Measurement',occurrence:1}]},{feature:'concepts_and_subtopics_covered',entry:{topic:'Measurement :: Examples',detail_level:'Brief'},evidence:[{turn_id:'t1',quote:'**Example:**',occurrence:1}]}]};
 const complete=structuredClone(incomplete);complete.annotations[1].evidence.push({turn_id:'t1',quote:'**Example:**',occurrence:2});
 const patch={replacements:[],additions:[{...incomplete.annotations[1],evidence:[{turn_id:'t1',quote:'**Example:**',occurrence:2}]}]};
 const response=(value:unknown)=>new Response(JSON.stringify({choices:[{finish_reason:'stop',message:{content:JSON.stringify(value)}}]}));
 const fetcher=vi.fn().mockResolvedValueOnce(response(incomplete)).mockResolvedValueOnce(response(patch));
 const result=await generateInstructionalBaseline({conversation:headed,rubric:bundledRubric,requestId:'headings',...(review?{previousAnnotations:resolveLLMAnnotations(incomplete,headed,bundledRubric,'draft')}:{ }),apiKey:'private-key',config:{model:'configured/model',timeout:10,repair_attempts:1,reasoning:null},fetcher});
 const request=JSON.parse(fetcher.mock.calls[0][1].body);expect(request.messages[1].content).toContain('<h1 data-evidence-ids="t1:s0001">Measurement</h1>');expect(request.messages[1].content).toContain('<strong>Example:</strong>');
 expect(JSON.stringify(JSON.parse(fetcher.mock.calls[1][1].body).messages.at(-1).content)).toContain('Missing content-hierarchy highlight');
 expect(result.annotations[1].evidence).toHaveLength(2);expect(result.generation_config.pass).toBe(review?'review':'extraction');
 const failed=vi.fn().mockResolvedValue(response(incomplete));
 await expect(generateInstructionalBaseline({conversation:headed,rubric:bundledRubric,requestId:'reject',apiKey:'private-key',config:{model:'configured/model',timeout:10,repair_attempts:0,reasoning:null},fetcher:failed})).rejects.toThrow(/failed exact-highlight validation/);
 const resumed=vi.fn().mockResolvedValue(response(patch));
 const recovery=await generateInstructionalBaseline({conversation:headed,rubric:bundledRubric,requestId:'resume',initialContent:JSON.stringify(incomplete),apiKey:'private-key',config:{model:'configured/model',timeout:10,repair_attempts:0,reasoning:null},fetcher:resumed});
 expect(recovery.annotations[1].evidence).toHaveLength(2);expect(resumed).toHaveBeenCalledTimes(1);
});
it('accepts plain concept names and optional levels while requiring heading-only evidence',()=>{
 const headed=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'# Evaporation\nWater evaporates.'}]});
 const coverage={annotations:[{feature:'concepts_and_subtopics_covered',entry:{topic:'Evaporation :: Meaning :: Definition',detail_level:'Brief'},evidence:[{turn_id:'t1',quote:'# Evaporation',occurrence:1}]}]};
 const resolved=resolveLLMAnnotations(coverage,headed,bundledRubric,'hierarchy');expect(resolved[0].entry.topic).toBe('Evaporation :: Meaning :: Definition');
 for(const topic of ['Evaporation','Evaporation :: Meaning']){const value=structuredClone(coverage);value.annotations[0].entry.topic=topic;expect(resolveLLMAnnotations(value,headed,bundledRubric,'node')).toHaveLength(1);}
 const leveled=structuredClone(coverage);leveled.annotations[0].entry.topic='Evaporation';leveled.annotations[0].entry.concept_level='Main concept';expect(resolveLLMAnnotations(leveled,headed,bundledRubric,'leveled')[0].entry.concept_level).toBe('Main concept');
 const invalid=structuredClone(leveled);invalid.annotations[0].entry.concept_level='Other';expect(()=>resolveLLMAnnotations(invalid,headed,bundledRubric,'invalid-level')).toThrow(/invalid value/);
 const body=structuredClone(coverage);body.annotations[0].evidence[0].quote='Water evaporates.';expect(()=>resolveLLMAnnotations(body,headed,bundledRubric,'body')).toThrow(/heading/);
 const example=structuredClone(output);example.annotations[0].evidence[0].occurrence=1;expect(resolveLLMAnnotations(example,headed,bundledRubric,'example')).toHaveLength(1);
 const historical=structuredClone(resolved);historical[0].entry.topic='Evaporation';historical[0].evidence=[C.makeEvidence(headed,'t1',13,30)];historical[0].entry.turn_locations=['t1'];expect(()=>C.validateAnnotations(headed,historical,bundledRubric.rubric)).not.toThrow();
});
it('accepts exact issue highlights with an optional explanation',()=>{
 const issue={annotations:[{feature:'issues',entry:{issue:'Conceptual error: evaporation description',explanation:'Explain the specific mistake and correct physical process.'},evidence:[{turn_id:'t1',quote:'Water evaporates.',occurrence:1}]}]};
 const resolved=resolveLLMAnnotations(issue,conversation,bundledRubric,'issue');expect(resolved[0].feature).toBe('issues');expect(resolved[0].entry.turn_locations).toEqual(['t1']);
 const incomplete=structuredClone(issue);incomplete.annotations[0].entry.explanation='';expect(()=>resolveLLMAnnotations(incomplete,conversation,bundledRubric,'issue')).not.toThrow();
 const extra=structuredClone(issue);Object.assign(extra.annotations[0].entry,{correction_status:'uncorrected'});expect(()=>resolveLLMAnnotations(extra,conversation,bundledRubric,'issue')).toThrow();
});
it('does not retry provider errors or accept truncated model output',async()=>{
 const request={conversation,rubric:bundledRubric,requestId:'request',apiKey:'private-key',config:{model:'configured/model',max_tokens:1000,timeout:10,repair_attempts:1,reasoning:null}};
 const fetcher=vi.fn().mockResolvedValue(new Response('private provider details',{status:403}));const saveResponse=vi.fn();await expect(generateInstructionalBaseline({...request,fetcher,onProviderResponse:saveResponse})).rejects.toThrow(/configured model/);expect(fetcher).toHaveBeenCalledTimes(1);expect(saveResponse).toHaveBeenCalledWith({http_status:403,raw_body:'private provider details'},1);
 const truncated=vi.fn().mockResolvedValue(new Response(JSON.stringify({choices:[{finish_reason:'length',message:{content:JSON.stringify(output)}}]})));await expect(generateInstructionalBaseline({...request,fetcher:truncated})).rejects.toThrow(/complete/);
});
it('compares independent human additions, removals, attribute edits and passage edits without mutating the baseline',()=>{
 const baseline=resolveLLMAnnotations(output,conversation,bundledRubric,'request');const second=structuredClone(baseline[0]);second.id='second';baseline.push(second);const original=structuredClone(baseline);
 const current=structuredClone(baseline.slice(0,1));current[0].entry.detail_level='Elaborated';current[0].evidence=[C.makeEvidence(conversation,'t1',5,22)];const added=structuredClone(second);added.id='human-new';current.push(added);
 const comparison=compareWithBaseline(baseline,current);expect(comparison.counts).toEqual({unchanged:0,edited:1,added:1,deleted:1});expect(comparison.edited[0].attribute_changes[0].key).toBe('detail_level');expect(comparison.edited[0].evidence_changed).toBe(true);expect(baseline).toEqual(original);
 const reordered={...baseline[0],entry:{turn_locations:baseline[0].entry.turn_locations,detail_level:'Brief',concept_illustrated:null,example:'Evaporation'}};expect(compareWithBaseline([baseline[0]],[reordered]).counts.unchanged).toBe(1);
});
