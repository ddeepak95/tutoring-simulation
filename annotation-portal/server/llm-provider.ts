import { annotationSchema, instructionalPrompt, resolveLLMAnnotations } from './llm-annotation-core.ts';
import {instructionalPromptSource,instructionalPromptSha256,instructionalRepairPrompt} from './generated/instructional-prompt.ts';
import type { Conversation, RubricSnapshot } from '../src/types.ts';
export class GenerationError extends Error {
  code: string;
  constructor(message: string, code: string) { super(message); this.code=code; }
}
export async function generateInstructionalBaseline({ conversation, rubric, requestId, config, apiKey, fetcher=fetch }: {
  conversation: Conversation; rubric: RubricSnapshot; requestId:string; config:{model:string;max_tokens:number;timeout:number;repair_attempts:number;reasoning:unknown};apiKey:string;fetcher?:typeof fetch;
}) {
  const prompt=instructionalPrompt();
  let repairPrompt:string|null=null;
  const messages=[{role:'system',content:prompt},{role:'user',content:JSON.stringify(conversation)}];
  const signal=AbortSignal.timeout(Math.min(config.timeout,180)*1000);
  for(let attempt=0;attempt<=Math.min(config.repair_attempts,1);attempt++) {
    const response=await fetcher('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},signal,body:JSON.stringify({model:config.model,max_tokens:config.max_tokens,temperature:0,messages,provider:{require_parameters:true,allow_fallbacks:false},...(config.reasoning?{reasoning:config.reasoning}:{}),response_format:{type:'json_schema',json_schema:{name:'instructional_highlights',strict:true,schema:annotationSchema(rubric)}}})});
    if(!response.ok)throw new GenerationError(`The configured model could not generate annotations (HTTP ${response.status}). Check model access and provider configuration.`,'provider_error');
    const text=await response.text();if(Buffer.byteLength(text)>2097152)throw new GenerationError('The model response is too large.','invalid_output');
    let payload;try{payload=JSON.parse(text);}catch{throw new GenerationError('The provider response was not valid JSON.','invalid_output');}
    const content=payload.choices?.[0]?.message?.content;
    if(typeof content!=='string'||payload.choices?.[0]?.finish_reason!=='stop')throw new GenerationError('The model did not finish a complete annotation response.','invalid_output');
    let annotations;
    try{annotations=resolveLLMAnnotations(JSON.parse(content),conversation,rubric,requestId);}
    catch(error){
      if(attempt>=Math.min(config.repair_attempts,1))throw new GenerationError('The model output failed exact-highlight validation. No baseline or assignments were created.','invalid_output');
      repairPrompt=instructionalRepairPrompt.replace('{{validation_error}}',()=>String((error as Error).message));
      messages.push({role:'assistant',content},{role:'user',content:repairPrompt});continue;
    }
    return {annotations,prompt,model:typeof payload.model==='string'?payload.model:config.model,generation_config:{...config,repair_prompt:repairPrompt,instructional_prompt_source:instructionalPromptSource,instructional_prompt_sha256:instructionalPromptSha256,configured_model:config.model,provider_request_id:typeof payload.id==='string'?payload.id:null,attempts:attempt+1,usage:payload.usage?{prompt_tokens:payload.usage.prompt_tokens,completion_tokens:payload.usage.completion_tokens,total_tokens:payload.usage.total_tokens}:null}};
  }
  throw new GenerationError('No valid instructional highlights were returned.','invalid_output');
}
