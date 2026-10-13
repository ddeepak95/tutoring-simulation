import {googleRequest,googleResponse} from './google-provider.ts';
import {createHash} from 'node:crypto';
import { annotationSchema, instructionalPrompt, resolveLLMAnnotations } from './llm-annotation-core.ts';
import {instructionalPromptSource,instructionalPromptSha256,instructionalRepairPrompt,instructionalReviewPrompt} from './generated/instructional-prompt.ts';
import type { Annotation, Conversation, RubricSnapshot } from '../src/types.ts';
import {tutorHeadingInventory} from './heading-evidence.ts';
import {modelSourcePassages} from './source-passages.ts';
import {inspectAnnotations,applyRepair,repairSchema,type RepairIssue} from './annotation-repair.ts';
export class GenerationError extends Error {
  code: string;
  constructor(message: string, code: string) { super(message); this.code=code; }
}
export interface GenerationCheckpoint {
 fingerprint:string;draft?:unknown;attempts:number;repairs_used:number;provider_request_id?:string;model?:string;usage?:Record<string,number>;
 repair_log:unknown[];repair_prompt?:string;validation_errors?:unknown;pending_request?:boolean;pending_response?:{payload:any;targeted:boolean;issues:RepairIssue[]};
}
export async function generateInstructionalBaseline({ conversation, rubric, requestId, config, apiKey, previousAnnotations, initialContent, initialResponseId, checkpoint, onCheckpoint, onProviderResponse, fetcher=fetch }: {
 conversation:Conversation;rubric:RubricSnapshot;requestId:string;config:{model:string;max_tokens?:number|null;timeout:number;repair_attempts:number;reasoning:unknown;stream?:boolean;provider?:'google'|'openrouter'};apiKey:string;previousAnnotations?:Annotation[];initialContent?:string;initialResponseId?:string;checkpoint?:GenerationCheckpoint;onCheckpoint?:(state:GenerationCheckpoint)=>void|Promise<void>;onProviderResponse?:(payload:unknown,attempt:number)=>void|Promise<void>;fetcher?:typeof fetch;
}) {
 const draft=previousAnnotations===undefined?null:{annotations:previousAnnotations.map(({feature,entry,evidence})=>({feature,entry:Object.fromEntries(Object.entries(entry).filter(([key])=>key!=='turn_locations')),evidence:evidence.map(({turn_id,quote,occurrence,example_status})=>({turn_id,quote,occurrence,...(example_status?{example_status}:{})}))}))};
 if(draft)resolveLLMAnnotations(draft,conversation,rubric,'review-input');
 const prompt=draft?`${instructionalPrompt()}\n\n${instructionalReviewPrompt}`:instructionalPrompt();
 const fingerprint=createHash('sha256').update(JSON.stringify({conversation,rubric:rubric.rubric_sha256,prompt,model:config.model,reasoning:config.reasoning,max_tokens:config.max_tokens,previousAnnotations})).digest('hex');
 if(checkpoint&&checkpoint.fingerprint!==fingerprint)throw new GenerationError('Checkpoint does not match this transcript, prompt, rubric, model, or review draft.','checkpoint_mismatch');
 const state:GenerationCheckpoint=checkpoint?structuredClone(checkpoint):{fingerprint,attempts:0,repairs_used:0,repair_log:[]};
 if(initialContent!==undefined&&!checkpoint){try{state.draft=JSON.parse(initialContent);}catch{state.draft=initialContent;}state.attempts=1;state.provider_request_id=initialResponseId;}
 const budget=Math.min(3,Math.max(initialContent===undefined?0:1,Math.max(0,config.repair_attempts)));
 const {label:_displayLabel,...modelConversation}=conversation;
 const base=[{role:'system',content:prompt},{role:'user',content:JSON.stringify({...modelConversation,tutor_heading_inventory:tutorHeadingInventory(conversation),tutor_source_passages:modelSourcePassages(conversation)})}];
 if(draft)base.push({role:'user',content:JSON.stringify(draft)});
 let repairPrompt:string|null=state.repair_prompt||null;
 const persist=async()=>{await onCheckpoint?.(structuredClone(state));};
 const consumeResponse=async()=>{const pending=state.pending_response!;const payload=pending.payload;
  state.provider_request_id=payload.id;state.model=payload.model||config.model;state.usage=payload.usage;state.pending_request=false;
  const content=payload.choices?.[0]?.message?.content;
  if(typeof content!=='string'||payload.choices?.[0]?.finish_reason!=='stop'){await persist();throw new GenerationError('The model did not finish a complete annotation response.','invalid_output');}
  let output:unknown;try{output=JSON.parse(content);}catch{output=content;}
  if(pending.targeted){
   const record:{attempt:number;issues:unknown;response:unknown;provider_request_id:unknown;applied:boolean;prompt?:string;error?:string}={attempt:state.repairs_used,issues:pending.issues,response:output,provider_request_id:payload.id,prompt:state.repair_prompt,applied:false};
   try{state.draft=applyRepair(state.draft as {annotations:unknown[]},output,pending.issues,conversation,rubric);record.applied=true;}catch(error){record.error=(error as Error).message;}
   state.repair_log.push(record);
  }else{state.draft=output;if(pending.issues.length)state.repair_log.push({attempt:state.repairs_used,mode:'full',issues:pending.issues,response:output,provider_request_id:payload.id});}
  delete state.pending_response;await persist();
 };
 for(;;){
  if(state.pending_response)await consumeResponse();
  const inspection=state.draft===undefined?null:inspectAnnotations(state.draft,conversation,rubric,requestId);
  if(inspection&&!inspection.issues.length){
   const annotations=resolveLLMAnnotations(state.draft,conversation,rubric,requestId);state.validation_errors=[];state.pending_request=false;await persist();
   return {annotations,prompt,model:state.model||config.model,generation_config:{...config,provider:config.provider||'openrouter',resumed_checkpoint:Boolean(checkpoint),pass:draft?'review':'extraction',repair_prompt:repairPrompt,instructional_prompt_source:instructionalPromptSource,instructional_prompt_sha256:instructionalPromptSha256,configured_model:config.model,provider_request_id:state.provider_request_id||null,resumed_from_provider_response:initialResponseId||null,attempts:state.attempts,repairs_used:state.repairs_used,repair_log:state.repair_log,source_passages_sha256:createHash('sha256').update(JSON.stringify(modelSourcePassages(conversation))).digest('hex'),usage:state.usage||null}};
  }
  if(inspection){state.validation_errors=inspection.issues;await persist();if(state.repairs_used>=budget)throw new GenerationError(`The model output failed exact-highlight validation after ${state.repairs_used} repair attempts. No invalid baseline was saved.`,'invalid_output');}
  const targeted=Boolean(inspection&&!inspection.structural);
  const messages=[...base];
  if(inspection){
   repairPrompt=instructionalRepairPrompt.replace('{{validation_error}}',()=>JSON.stringify(inspection.issues));
   state.repair_prompt=repairPrompt;
   messages.push({role:'user',content:repairPrompt},{role:'user',content:JSON.stringify({repair_mode:targeted?'targeted':'full',...(targeted?{invalid_entries:inspection.issues}:{invalid_output:state.draft}),previous_repair_error:state.repair_log.at(-1)})});
   state.repairs_used++;
  }
  state.attempts++;state.pending_request=true;await persist();
  const schema=targeted?repairSchema(rubric):annotationSchema(rubric,true);
  const google=config.provider==='google'?googleRequest(messages,schema,config,apiKey):null;
  const response=await fetcher(google?.url||'https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:google?.headers||{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(Math.min(config.timeout,600)*1000),body:google?.body||JSON.stringify({model:config.model,...(config.max_tokens==null?{}:{max_tokens:config.max_tokens}),temperature:0,messages,...(config.stream?{stream:true,stream_options:{include_usage:true}}:{}),provider:{require_parameters:true,allow_fallbacks:false},...(config.reasoning?{reasoning:config.reasoning}:{}),response_format:{type:'json_schema',json_schema:{name:targeted?'instructional_repairs':'instructional_highlights',strict:true,schema:targeted?repairSchema(rubric):annotationSchema(rubric,true)}}})});
  if(!response.ok)throw new GenerationError(`The configured model could not generate annotations (HTTP ${response.status}).`,'provider_error');
  const text=await response.text();if(Buffer.byteLength(text)>2097152)throw new GenerationError('The model response is too large.','invalid_output');
  let payload;try{payload=google?googleResponse(text,Boolean(config.stream),config.model):config.stream?parseStreamResponse(text):JSON.parse(text);}catch{throw new GenerationError('The provider response was not valid JSON.','invalid_output');}
  state.pending_response={payload,targeted,issues:inspection?.issues||[]};await persist();
  await onProviderResponse?.(payload,state.attempts);await consumeResponse();
 }
}

function parseStreamResponse(text:string){
 let id:string|undefined,model:string|undefined,usage:unknown,content='',finishReason:string|null=null;
 for(const line of text.split(/\r?\n/)){
  if(!line.startsWith('data:'))continue;
  const data=line.slice(5).trim();if(!data||data==='[DONE]')continue;
  const chunk=JSON.parse(data);if(chunk.error)throw new Error('Provider stream error');
  if(chunk.id)id=chunk.id;if(chunk.model)model=chunk.model;if(chunk.usage)usage=chunk.usage;
  const choice=chunk.choices?.find((value:{index:number})=>value.index===0);
  if(typeof choice?.delta?.content==='string')content+=choice.delta.content;
  if(choice?.finish_reason)finishReason=choice.finish_reason;
 }
 return {id,model,usage,choices:[{finish_reason:finishReason,message:{content}}]};
}
