import {expect,it,vi} from 'vitest';
import {C,bundledRubric} from '../src/lib';
import {sourcePassages} from '../server/source-passages';
import {resolveLLMAnnotations} from '../server/llm-annotation-core';
import {generateInstructionalBaseline,type GenerationCheckpoint} from '../server/llm-provider';
import {runCheckpointedPipeline} from '../scripts/llm-pipeline.mjs';

const config={model:'configured/model',max_tokens:null,timeout:10,repair_attempts:3,reasoning:{effort:'medium'}};
const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'Hydrogen has a 74 pm bond.\n\nCovalent radius is half of the bond length.'}]});
const example={feature:'examples',entry:{example:'Hydrogen',concept_illustrated:'Bond length',detail_level:'Brief'},evidence:[{turn_id:'t1',quote:'Hydrogen has a 74 pm bond.',occurrence:1,example_status:'Fresh'}]};
const issue={feature:'issues',entry:{issue:'Definition error',explanation:'Assess the actual definition.'},evidence:[{turn_id:'t1',quote:'Invented definition wording.',occurrence:1}]};
const initial={annotations:[example,issue]};
const response=(value:unknown)=>new Response(JSON.stringify({id:'response-id',choices:[{finish_reason:'stop',message:{content:typeof value==='string'?value:JSON.stringify(value)}}]}));

it('resolves source IDs to untouched headings and table headers, including Unicode and repeats',()=>{
 const c=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'**எடுத்துக்காட்டு:**\nBody.\n\n**எடுத்துக்காட்டு:**\nMore.\n\n| Atom | Radius |\n| --- | --- |\n| H | 37 |\n\n```md\n**Fake title:**\n```'}]});
 const sources=sourcePassages(c);expect(sources.filter(s=>s.kind==='heading').map(s=>s.occurrence)).toEqual([1,2]);
 const header=sources.find(s=>s.kind==='table_header')!;
 const table={feature:'representations',entry:{representation:'Atomic radii',representation_type:'Table',concept_illustrated:'Covalent radius'},evidence:[{source_id:header.source_id}]};
 expect(resolveLLMAnnotations({annotations:[table]},c,bundledRubric,'source')[0].evidence[0].quote).toBe('| Atom | Radius |');
 const body=sources.find(s=>s.quote==='| H | 37 |')!;
 expect(()=>resolveLLMAnnotations({annotations:[{...table,evidence:[{source_id:body.source_id}]}]},c,bundledRubric,'bad')).toThrow(/header row/);
 expect(()=>resolveLLMAnnotations({annotations:[{...table,evidence:[{source_id:'invented'}]}]},c,bundledRubric,'bad')).toThrow(/Unknown source_id/);
 expect(sources.filter(s=>s.kind==='heading')).toHaveLength(2);
});

it('repairs only a bad quote with a source ID and rejects patches that overwrite valid observations',async()=>{
 const source=sourcePassages(conversation).find(s=>s.quote.startsWith('Covalent radius'))!;
 const patch={replacements:[{index:1,annotation:{...issue,evidence:[{source_id:source.source_id}]}}],additions:[]};
 const fetcher=vi.fn().mockResolvedValueOnce(response(initial)).mockResolvedValueOnce(response({replacements:[{index:0,annotation:issue}],additions:[]})).mockResolvedValueOnce(response(patch));
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'targeted',config,apiKey:'private',fetcher});
 expect(result.annotations[0].entry.example).toBe('Hydrogen');expect(result.annotations[0].evidence[0].quote).toBe(example.evidence[0].quote);
 expect(result.annotations[1].evidence[0].quote).toBe('Covalent radius is half of the bond length.');
 expect(result.generation_config.repairs_used).toBe(2);expect(result.generation_config.repair_log[0]).toMatchObject({applied:false,error:expect.stringContaining('valid entry')});
 const repairRequest=JSON.parse(fetcher.mock.calls[1][1].body);expect(repairRequest.response_format.json_schema.name).toBe('instructional_repairs');
 expect(JSON.parse(repairRequest.messages.at(-1).content).invalid_entries[0]).toMatchObject({index:1,entry:issue});
});

it('retains the three-repair budget after restart and refuses changed source/configuration',async()=>{
 let checkpoint:GenerationCheckpoint|undefined;
 const badPatch={replacements:[{index:0,annotation:issue}],additions:[]};
 const fetcher=vi.fn().mockResolvedValueOnce(response(initial)).mockImplementation(()=>Promise.resolve(response(badPatch)));
 await expect(generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'bounded',config,apiKey:'private',fetcher,onCheckpoint:s=>{checkpoint=s;}})).rejects.toThrow(/after 3 repair attempts/);
 expect(fetcher).toHaveBeenCalledTimes(4);expect(checkpoint!.repairs_used).toBe(3);
 const resumed=vi.fn();await expect(generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'bounded',config,apiKey:'private',fetcher:resumed,checkpoint})).rejects.toThrow(/after 3 repair attempts/);expect(resumed).not.toHaveBeenCalled();
 await expect(generateInstructionalBaseline({conversation:{...conversation,learning_topic:'Changed topic'},rubric:bundledRubric,requestId:'bounded',config,apiKey:'private',fetcher:resumed,checkpoint})).rejects.toThrow(/Checkpoint does not match/);
});

it('reuses a paid response after interruption before it was applied',async()=>{
 let checkpoint:GenerationCheckpoint|undefined;let interrupted=false;
 const fetcher=vi.fn().mockResolvedValue(response({annotations:[example]}));
 await expect(generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'crash',config,apiKey:'private',fetcher,onCheckpoint:s=>{checkpoint=s;if(s.pending_response&&!interrupted){interrupted=true;throw new Error('Interrupted after response');}}})).rejects.toThrow(/Interrupted/);
 const resumed=vi.fn();const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'crash',config,apiKey:'private',fetcher:resumed,checkpoint});
 expect(result.annotations).toHaveLength(1);expect(result.generation_config.attempts).toBe(1);expect(resumed).not.toHaveBeenCalled();
});

it('falls back to full-format repair only when the original output cannot be read',async()=>{
 const fetcher=vi.fn().mockResolvedValueOnce(response('{broken')).mockResolvedValueOnce(response({annotations:[example]}));
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'format',config,apiKey:'private',fetcher});
 expect(result.annotations).toHaveLength(1);expect(result.generation_config.repair_log[0]).toMatchObject({mode:'full'});
});

it('resumes review without regenerating extraction and retries publishing without new generation',async()=>{
 const state:any={fingerprint:'same',stages:[{pass:'extraction',baseline_id:'first'},{pass:'review',baseline_id:'second'}]};
 const persist=vi.fn();const generate=vi.fn(async(stage:any,previous:any)=>{if(stage.pass==='review'&&!previous)throw new Error('Missing extraction');return {id:stage.baseline_id};});
 let fail=true;const publish=vi.fn(async(artifact:any)=>{if(artifact.id==='second'&&fail){fail=false;throw new Error('Storage interrupted');}});
 await expect(runCheckpointedPipeline({state,fingerprint:'same',generate,publish,persist})).rejects.toThrow(/Storage interrupted/);
 expect(state.status).toBe('failed');expect(state.stages[0].published).toBe(true);expect(state.stages[1].artifact.id).toBe('second');
 await runCheckpointedPipeline({state,fingerprint:'same',generate,publish,persist});expect(generate).toHaveBeenCalledTimes(2);expect(state.status).toBe('completed');
 await expect(runCheckpointedPipeline({state,fingerprint:'changed',generate,publish,persist})).rejects.toThrow(/does not match/);expect(generate).toHaveBeenCalledTimes(2);
});
