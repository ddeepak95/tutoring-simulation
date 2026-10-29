import {withItemSections} from './item-sections.ts';
import {googleRequest,googleResponse,type GeminiVisual} from './google-provider.ts';
import {createHash} from 'node:crypto';
import { annotationSchema, instructionalPrompt, resolveLLMAnnotations } from './llm-annotation-core.ts';
import {instructionalPromptSource,instructionalPromptSha256,instructionalRepairPrompt,instructionalReviewPrompt} from './generated/instructional-prompt.ts';
import type { Annotation, Conversation, ConversationSection, RubricSnapshot } from '../src/types.ts';
import {expandRepeatedQuestionOccurrences,modelConversationHtml,resolveSegmentEvidence} from './model-conversation-html.ts';
import {inspectAnnotations,applyRepair,repairSchema,type RepairIssue} from './annotation-repair.ts';
export class GenerationError extends Error {
  code: string;
  constructor(message: string, code: string) { super(message); this.code=code; }
}
export interface GenerationCheckpoint {
 fingerprint:string;draft?:unknown;attempts:number;repairs_used:number;provider_request_id?:string;model?:string;usage?:Record<string,number>;
 repair_log:unknown[];repair_prompt?:string;validation_errors?:unknown;pending_request?:boolean;pending_response?:{payload:any;targeted:boolean;issues:RepairIssue[]};
}
export async function generateInstructionalBaseline({ conversation, rubric, requestId, config, apiKey, visuals, contextScreenshots, captureHtml, sections, previousAnnotations, initialContent, initialResponseId, checkpoint, onCheckpoint, onProviderRequest, onProviderResponse, fetcher=fetch }: {
 conversation:Conversation;rubric:RubricSnapshot;requestId:string;config:{model:string;max_tokens?:number|null;timeout:number;repair_attempts:number;reasoning:unknown;stream?:boolean;provider?:'google'|'openrouter'};apiKey:string;visuals?:GeminiVisual[];contextScreenshots?:GeminiVisual[];captureHtml?:Record<string,string>;sections?:ConversationSection[];previousAnnotations?:Annotation[];initialContent?:string;initialResponseId?:string;checkpoint?:GenerationCheckpoint;onCheckpoint?:(state:GenerationCheckpoint)=>void|Promise<void>;onProviderRequest?:(request:unknown,attempt:number)=>void|Promise<void>;onProviderResponse?:(payload:unknown,attempt:number)=>void|Promise<void>;fetcher?:typeof fetch;
}) {
 const modelRubric=rubric;
 const draft=previousAnnotations===undefined?null:{annotations:previousAnnotations.map(({feature,entry,evidence})=>({feature,entry:Object.fromEntries(Object.entries(entry).filter(([key])=>key!=='turn_locations')),evidence:evidence.map(({turn_id,quote,occurrence,example_status})=>({turn_id,quote,occurrence,...(example_status?{example_status}:{})}))}))};

 if(draft&&sections)draft.annotations=previousAnnotations!.map(a=>({feature:a.feature,entry:{category:a.entry.category,count:a.entry.count},section_id:a.section_id,...(a.highlights?{highlights:a.highlights}:{})})) as any;
 if(draft)resolveLLMAnnotations(draft,conversation,modelRubric,'review-input',captureHtml,sections);
 const prompt=draft?`${instructionalPrompt()}\n\n${instructionalReviewPrompt}`:instructionalPrompt();
 const modelInput=modelConversationHtml(conversation,captureHtml,visuals);
 if(rubric.label_schema_version)withItemSections(modelInput,conversation,captureHtml,sections);
 if(draft)draft.annotations=expandRepeatedQuestionOccurrences(draft,modelInput.segments,conversation).annotations;
 const visualsWithCaptions=(visuals||[]).map(visual=>({...visual,caption:modelInput.visualCaptions[visual.id]||'Image'}));
 const visualInventory=visualsWithCaptions.map(visual=>({id:visual.id,turn_id:visual.turn_id,mime_type:visual.mime_type,caption:visual.caption,sha256:createHash('sha256').update(visual.data||visual.uri||'').digest('hex')}));
 const screenshotInventory=(contextScreenshots||[]).map((visual,index)=>({id:visual.id||`screenshot-${index+1}`,mime_type:visual.mime_type,sha256:createHash('sha256').update(visual.data||visual.uri||'').digest('hex')}));
 if((visuals?.length||contextScreenshots?.length)&&config.provider!=='google')throw new GenerationError('Visual annotation requires the direct Gemini provider.','provider_error');
 const fingerprint=createHash('sha256').update(JSON.stringify({conversation,captureHtml,sections,rubric:rubric.rubric_sha256,prompt,model:config.model,reasoning:config.reasoning,max_tokens:config.max_tokens,previousAnnotations,visualInventory,screenshotInventory})).digest('hex');
 if(checkpoint&&checkpoint.fingerprint!==fingerprint)throw new GenerationError('Checkpoint does not match this transcript, prompt, rubric, model, or review draft.','checkpoint_mismatch');
 const state:GenerationCheckpoint=checkpoint?structuredClone(checkpoint):{fingerprint,attempts:0,repairs_used:0,repair_log:[]};
 if(initialContent!==undefined&&!checkpoint){try{state.draft=JSON.parse(initialContent);}catch{state.draft=initialContent;}state.attempts=1;state.provider_request_id=initialResponseId;}
 if(state.draft)state.draft=expandRepeatedQuestionOccurrences(state.draft,modelInput.segments,conversation);
 const budget=Math.min(3,Math.max(initialContent===undefined?0:1,Math.max(0,config.repair_attempts)));
 const base=[{role:'system',content:prompt},{role:'user',content:modelInput.html}];
 if(draft)base.push({role:'user',content:JSON.stringify(draft)});
 let repairPrompt:string|null=state.repair_prompt||null;
 const persist=async()=>{await onCheckpoint?.(structuredClone(state));};
 const compactIssues=(issues:RepairIssue[])=>issues.map(issue=>({index:issue.index,error:issue.error,...(issue.entry?{entry:issue.entry}:{}),...(issue.index===null?{headings:issue.sources.filter(source=>source.kind==='heading').map(source=>({turn_id:source.turn_id,quote:source.quote,occurrence:source.occurrence,segment_ids:modelInput.segments.filter(segment=>segment.turn_id===source.turn_id&&segment.kind==='heading'&&segment.source_text.replace(/[\s\u200b\ufeff]+/gu,'').includes(source.quote.replace(/[\s\u200b\ufeff]+/gu,''))).map(segment=>segment.segment_id)}))}:{})}));
 const consumeResponse=async()=>{const pending=state.pending_response!;const payload=pending.payload;
  state.provider_request_id=payload.id;state.model=payload.model||config.model;state.usage=payload.usage;state.pending_request=false;
  const content=payload.choices?.[0]?.message?.content;
  if(typeof content!=='string'||payload.choices?.[0]?.finish_reason!=='stop'){await persist();throw new GenerationError('The model did not finish a complete annotation response.','invalid_output');}
  let output:unknown;try{output=JSON.parse(content);output=resolveSegmentEvidence(output,modelInput.segments,conversation);}catch{output=content;}
  if(pending.targeted){
   const record:{attempt:number;issues:unknown;response:unknown;provider_request_id:unknown;applied:boolean;prompt?:string;error?:string}={attempt:state.repairs_used,issues:pending.issues,response:output,provider_request_id:payload.id,prompt:state.repair_prompt,applied:false};
   try{state.draft=applyRepair(state.draft as {annotations:unknown[]},output,pending.issues,conversation,modelRubric,captureHtml,sections);record.applied=true;}catch(error){record.error=(error as Error).message;}
   state.repair_log.push(record);
  }else{state.draft=output;if(pending.issues.length)state.repair_log.push({attempt:state.repairs_used,mode:'full',issues:pending.issues,response:output,provider_request_id:payload.id});}
  state.draft=expandRepeatedQuestionOccurrences(state.draft,modelInput.segments,conversation);
  delete state.pending_response;await persist();
 };
 for(;;){
  if(state.pending_response)await consumeResponse();
  const inspection=state.draft===undefined?null:inspectAnnotations(state.draft,conversation,modelRubric,requestId,captureHtml,sections);
  if(inspection&&!inspection.issues.length){
   const annotations=resolveLLMAnnotations(state.draft,conversation,modelRubric,requestId,captureHtml,sections);state.validation_errors=[];state.pending_request=false;await persist();
   return {annotations,prompt,model:state.model||config.model,generation_config:{...config,provider:config.provider||'openrouter',resumed_checkpoint:Boolean(checkpoint),pass:draft?'review':'extraction',repair_prompt:repairPrompt,instructional_prompt_source:instructionalPromptSource,instructional_prompt_sha256:instructionalPromptSha256,model_segments_sha256:createHash('sha256').update(JSON.stringify(modelInput.segments)).digest('hex'),configured_model:config.model,provider_request_id:state.provider_request_id||null,resumed_from_provider_response:initialResponseId||null,attempts:state.attempts,repairs_used:state.repairs_used,repair_log:state.repair_log,visual_inventory:visualInventory,screenshot_inventory:screenshotInventory,usage:state.usage||null}};
  }
  if(inspection){state.validation_errors=inspection.issues;await persist();if(state.repairs_used>=budget)throw new GenerationError(`The model output failed exact-highlight validation after ${state.repairs_used} repair attempts. No invalid baseline was saved.`,'invalid_output');}
  const targeted=Boolean(inspection&&!inspection.structural);
  const messages=[...base];
  if(inspection){
   repairPrompt=instructionalRepairPrompt.replace('{{validation_error}}','See the compact validation details in the accompanying JSON payload.');
   state.repair_prompt=repairPrompt;
   messages.push({role:'user',content:repairPrompt},{role:'user',content:JSON.stringify({repair_mode:targeted?'targeted':'full',...(targeted?{invalid_entries:compactIssues(inspection.issues)}:{invalid_entries:compactIssues(inspection.issues),invalid_output:state.draft}),previous_repair_error:(state.repair_log.at(-1) as {error?:string}|undefined)?.error||null})});
   state.repairs_used++;
  }
  state.attempts++;state.pending_request=true;await persist();
  const schema=targeted?repairSchema(modelRubric,sections):annotationSchema(modelRubric,true,sections);
  const requestOptions=(visualSet=visualsWithCaptions)=>{const direct=config.provider==='google'?googleRequest(messages,schema,config,apiKey,visualSet,contextScreenshots):null;return {direct,url:direct?.url||'https://openrouter.ai/api/v1/chat/completions',body:direct?.body||JSON.stringify({model:config.model,...(config.max_tokens==null?{}:{max_tokens:config.max_tokens}),temperature:0,messages,...(config.stream?{stream:true,stream_options:{include_usage:true}}:{}),provider:{require_parameters:true,allow_fallbacks:false},...(config.reasoning?{reasoning:config.reasoning}:{}),response_format:{type:'json_schema',json_schema:{name:targeted?'instructional_repairs':'instructional_highlights',strict:true,schema}}})};};
  const requestOptionsForImages=requestOptions();let {direct:google,url:requestUrl,body:requestBody}=requestOptionsForImages;let requestLogAttempt=state.attempts;
  const logRequest=async()=>onProviderRequest?.({url:requestUrl,headers:google?{'Content-Type':'application/json','x-goog-api-key':'[redacted]'}:{'Content-Type':'application/json',Authorization:'Bearer [redacted]'},body:JSON.parse(requestBody)},requestLogAttempt);
  await logRequest();
  const fetchRequest=()=>fetcher(requestUrl,{method:'POST',headers:google?.headers||{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(Math.min(config.timeout,1200)*1000),body:requestBody});
  let response=await fetchRequest();
  if(!response.ok&&google&&visualsWithCaptions.some(visual=>visual.uri&&visual.data)){
   const failedText=await response.text();await onProviderResponse?.({http_status:response.status,raw_body:failedText,retrying_with_inline_images:true},requestLogAttempt);
   const fallbackVisuals=visualsWithCaptions.map(({uri:_uri,...visual})=>visual);const fallback=requestOptions(fallbackVisuals);google=fallback.direct;requestUrl=fallback.url;requestBody=fallback.body;requestLogAttempt=state.attempts+1000;await logRequest();response=await fetchRequest();
  }
  const text=await response.text();
  if(!response.ok){await onProviderResponse?.({http_status:response.status,raw_body:text},requestLogAttempt);throw new GenerationError(`The configured model could not generate annotations (HTTP ${response.status}).`,'provider_error');}
  if(Buffer.byteLength(text)>2097152){await onProviderResponse?.({http_status:response.status,error:'response_too_large',byte_length:Buffer.byteLength(text)},requestLogAttempt);throw new GenerationError('The model response is too large.','invalid_output');}
  let payload;try{payload=google?googleResponse(text,Boolean(config.stream),config.model):config.stream?parseStreamResponse(text):JSON.parse(text);}catch{await onProviderResponse?.({http_status:response.status,error:'invalid_json',raw_body:text},requestLogAttempt);throw new GenerationError('The provider response was not valid JSON.','invalid_output');}
  state.pending_response={payload,targeted,issues:inspection?.issues||[]};await persist();
  await onProviderResponse?.(payload,requestLogAttempt);await consumeResponse();
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
