import { expect,it,vi } from 'vitest';
import { bundledRubric,C } from '../src/lib';
import { annotationSchema,instructionalPrompt,promptVersion,resolveLLMAnnotations } from '../server/llm-annotation-core';
import fs from 'node:fs';
import {instructionalPromptText,instructionalRepairPrompt,instructionalPromptSource,instructionalPromptSha256} from '../server/generated/instructional-prompt';
import {createHash} from 'node:crypto';
import { generateInstructionalBaseline } from '../server/llm-provider';
import { compareWithBaseline } from '../src/baseline-comparison';
const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'😀 **Water evaporates.** Water evaporates. Why? Why?'},{turn_id:'s1',speaker:'student',text:'Water evaporates.'}]});
const output={annotations:[{feature:'examples',entry:{example:'Evaporation',concept_illustrated:null,detail_level:'Brief'},evidence:[{turn_id:'t1',quote:'Water evaporates.',occurrence:2}]}]};
it('uses both prompts and version from the single Markdown source and records its full hash',()=>{
 const source=fs.readFileSync(`../${instructionalPromptSource}`,'utf8');
 expect(instructionalPromptSource).toBe('conversation-evaluation/prompts/instructional-features.md');
 const expected=source.split('## Annotation prompt')[1].split('## Validation repair prompt')[0].trim();
 expect(instructionalPromptText).toBe(expected);expect(instructionalPrompt()).toBe(expected);
 expect(instructionalRepairPrompt).toBe(source.split('## Validation repair prompt')[1].trim());
 expect(instructionalPromptSha256).toBe(createHash('sha256').update(source).digest('hex'));
 expect(source).toContain(`prompt_version: ${promptVersion}`);
 const prompt=instructionalPrompt();expect(prompt).toContain('one-based occurrence numbers');expect(prompt).toContain('## JSON output instructions');
 for(const feature of bundledRubric.rubric.filter(feature=>feature.key!=='issues'))expect(prompt).toContain(`feature = ${feature.key}`);
 for(const section of ['### Pedagogical Characteristics','#### Instructional Sequence','### Conversation Quality','### Errors'])expect(prompt).not.toContain(section);
});
it('resolves raw quotations to exact UTF-16 spans and retains occurrence identity',()=>{
 const annotation=resolveLLMAnnotations(output,conversation,bundledRubric,'request')[0];
 expect(annotation.evidence[0].start).toBe(conversation.messages[0].text.lastIndexOf('Water evaporates.'));expect(annotation.evidence[0].occurrence).toBe(2);expect(annotation.entry.turn_locations).toEqual(['t1']);expect(annotation.id).toBe('llm-request-1');
 expect(()=>C.validateAnnotations(conversation,[annotation],bundledRubric.rubric)).not.toThrow();
});
it('rejects fabricated/student evidence, unknown/Issue categories, ratings, enum errors and mismatched question quotes',()=>{
 for(const modify of [(value:any)=>value.annotations[0].evidence[0].quote='fabricated',(value:any)=>value.annotations[0].evidence[0].turn_id='s1',(value:any)=>value.annotations[0].feature='issues',(value:any)=>value.ratings={},(value:any)=>value.annotations[0].entry.detail_level='Great',(value:any)=>value.annotations[0].evidence[0].occurrence=99]){const value=structuredClone(output);modify(value);expect(()=>resolveLLMAnnotations(value,conversation,bundledRubric,'request')).toThrow();}
 const question={annotations:[{feature:'questions',entry:{question:'Different question?',question_type:'Instructional',concept_checked:null},evidence:[{turn_id:'t1',quote:'Why?',occurrence:2}]}]};expect(()=>resolveLLMAnnotations(question,conversation,bundledRubric,'request')).toThrow(/exact/);
 expect(JSON.stringify(annotationSchema(bundledRubric))).not.toContain('"issues"');expect(resolveLLMAnnotations({annotations:[]},conversation,bundledRubric,'empty')).toEqual([]);
});
it('repairs invalid exact evidence once without switching models and returns full generation provenance',async()=>{
 const invalid=structuredClone(output);invalid.annotations[0].evidence[0].quote='fabricated';
 const fetcher=vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({choices:[{finish_reason:'stop',message:{content:JSON.stringify(invalid)}}]}))).mockResolvedValueOnce(new Response(JSON.stringify({id:'provider-id',model:'configured/model',usage:{total_tokens:100},choices:[{finish_reason:'stop',message:{content:JSON.stringify(output)}}]})));
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'request',apiKey:'private-key',config:{model:'configured/model',max_tokens:1000,timeout:10,repair_attempts:1,reasoning:null},fetcher});
 expect(fetcher).toHaveBeenCalledTimes(2);expect(result.generation_config.attempts).toBe(2);expect(result.model).toBe('configured/model');expect(result.generation_config.provider_request_id).toBe('provider-id');
 for(const call of fetcher.mock.calls){const request=JSON.parse(call[1].body);expect(request.model).toBe('configured/model');expect(request.provider.require_parameters).toBe(true);expect(request.response_format.type).toBe('json_schema');expect(request.messages[0].content).toBe(instructionalPromptText);}
 const repaired=JSON.parse(fetcher.mock.calls[1][1].body).messages.at(-1).content;
 let validationError='';try{resolveLLMAnnotations(invalid,conversation,bundledRubric,'request');}catch(error){validationError=(error as Error).message;}
 expect(repaired).toBe(instructionalRepairPrompt.replace('{{validation_error}}',()=>validationError));
 expect(result.prompt).toBe(instructionalPromptText);expect(result.generation_config.repair_prompt).toBe(repaired);
 expect(result.generation_config.instructional_prompt_source).toBe(instructionalPromptSource);expect(result.generation_config.instructional_prompt_sha256).toBe(instructionalPromptSha256);
});
it('does not retry provider errors or accept truncated model output',async()=>{
 const request={conversation,rubric:bundledRubric,requestId:'request',apiKey:'private-key',config:{model:'configured/model',max_tokens:1000,timeout:10,repair_attempts:1,reasoning:null}};
 const fetcher=vi.fn().mockResolvedValue(new Response('private provider details',{status:403}));await expect(generateInstructionalBaseline({...request,fetcher})).rejects.toThrow(/configured model/);expect(fetcher).toHaveBeenCalledTimes(1);
 const truncated=vi.fn().mockResolvedValue(new Response(JSON.stringify({choices:[{finish_reason:'length',message:{content:JSON.stringify(output)}}]})));await expect(generateInstructionalBaseline({...request,fetcher:truncated})).rejects.toThrow(/complete/);
});
it('compares independent human additions, removals, attribute edits and passage edits without mutating the baseline',()=>{
 const baseline=resolveLLMAnnotations(output,conversation,bundledRubric,'request');const second=structuredClone(baseline[0]);second.id='second';baseline.push(second);const original=structuredClone(baseline);
 const current=structuredClone(baseline.slice(0,1));current[0].entry.detail_level='Elaborated';current[0].evidence=[C.makeEvidence(conversation,'t1',5,22)];const added=structuredClone(second);added.id='human-new';current.push(added);
 const comparison=compareWithBaseline(baseline,current);expect(comparison.counts).toEqual({unchanged:0,edited:1,added:1,deleted:1});expect(comparison.edited[0].attribute_changes[0].key).toBe('detail_level');expect(comparison.edited[0].evidence_changed).toBe(true);expect(baseline).toEqual(original);
 const reordered={...baseline[0],entry:{turn_locations:baseline[0].entry.turn_locations,detail_level:'Brief',concept_illustrated:null,example:'Evaporation'}};expect(compareWithBaseline([baseline[0]],[reordered]).counts.unchanged).toBe(1);
});
