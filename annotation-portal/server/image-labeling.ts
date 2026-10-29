import {turnImagePromptText} from './generated/turn-image-prompt.ts';
import {createHash} from 'node:crypto';
import {googleRequest,googleResponse} from './google-provider.ts';
import {resolveLLMAnnotations} from './llm-annotation-core.ts';
import type {Annotation,Conversation,ConversationSection,RubricSnapshot} from '../src/types';

export const imagePromptVersion=turnImagePromptText.match(/^Prompt version: (.+)$/m)![1];
export interface TurnImages {turn_id:string;sections:{section_id:string;name:string;heading:string|null}[];tiles:{id:string;sha256:string;mime_type:string;data:string}[]}
export interface ImageCheckpoint {fingerprint:string;turns:Record<string,{attempts:number;annotations?:Annotation[];usage?:Record<string,number>;response_id?:string;native_model?:string}>}
export function imagePrompt(rubric:RubricSnapshot) {
 return turnImagePromptText+`\n\nFeature definitions:\n${rubric.rubric.map(f=>`${f.key} (${f.name}; ${f.category}): ${f.description}`).join('\n')}`;
}
export function imageOutputSchema(rubric:RubricSnapshot,sections:{section_id:string}[]) {
 return {type:'object',additionalProperties:false,required:['sections'],properties:{sections:{type:'array',items:{type:'object',additionalProperties:false,required:['section_id','features'],properties:{section_id:{type:'string',enum:sections.map(s=>s.section_id)},features:{type:'object',additionalProperties:false,required:rubric.rubric.map(f=>f.key),properties:Object.fromEntries(rubric.rubric.map(f=>[f.key,{type:'object',additionalProperties:false,required:['count','evidence'],properties:{count:{type:'integer',minimum:0,maximum:1000},evidence:{type:['string','null'],maxLength:1000}}}]))}}}}}};
}
function keys(value:unknown,expected:string[]):value is Record<string,any>{return !!value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===expected.length&&expected.every(k=>Object.hasOwn(value,k));}
export function resolveImageCounts(output:unknown,conversation:Conversation,rubric:RubricSnapshot,sections:ConversationSection[],requestId:string):Annotation[] {
 if(!keys(output,['sections'])||!Array.isArray(output.sections)||output.sections.length!==sections.length)throw Error('Return exactly the requested sections.');
 const seen=new Set<string>();const entries:{feature:string;section_id:string;entry:{category:string|undefined;count:number};llm_evidence:string}[]=[];
 for(const section of output.sections){
  if(!keys(section,['section_id','features'])||!sections.some(s=>s.section_id===section.section_id)||seen.has(section.section_id))throw Error('Unknown or duplicate section ID.');
  seen.add(section.section_id);
  if(!keys(section.features,rubric.rubric.map(f=>f.key)))throw Error('Return all 15 feature keys exactly once.');
  for(const f of rubric.rubric){const value=section.features[f.key];
   if(!keys(value,['count','evidence'])||!Number.isInteger(value.count)||value.count<0||value.count>1000)throw Error(`Invalid count for ${section.section_id}/${f.key}.`);
   if(value.count===0){if(value.evidence!==null)throw Error('Zero counts require null evidence.');continue;}
   if(typeof value.evidence!=='string'||!value.evidence.trim()||value.evidence.length>1000||/[\r\n\u2028\u2029]/u.test(value.evidence))throw Error('Positive counts require single-line evidence of at most 1000 characters.');
   entries.push({feature:f.key,section_id:section.section_id,entry:{category:f.category,count:value.count},llm_evidence:value.evidence.trim()});
  }
 }
 const resolved=resolveLLMAnnotations({annotations:entries.map(({llm_evidence:_line,...a})=>a)},conversation,rubric,requestId,{},sections);
 return resolved.map((a,i)=>({...a,llm_evidence:entries[i].llm_evidence}));
}

export async function generateImageBaseline({conversation,rubric,sections,turns,requestId,config,apiKey,checkpoint,onCheckpoint,onExchange,fetcher=fetch}:{conversation:Conversation;rubric:RubricSnapshot;sections:ConversationSection[];turns:TurnImages[];requestId:string;config:{model:string;timeout:number;reasoning:unknown;max_tokens?:number|null};apiKey:string;checkpoint?:ImageCheckpoint;onCheckpoint:(checkpoint:ImageCheckpoint)=>void|Promise<void>;onExchange:(turn:string,attempt:number,kind:'request'|'response',value:unknown)=>void;fetcher?:typeof fetch}) {
 const tutorIds=conversation.messages.filter(t=>t.speaker==='tutor').map(t=>t.turn_id);
 if(turns.length!==tutorIds.length||new Set(turns.map(t=>t.turn_id)).size!==turns.length||turns.some(t=>!tutorIds.includes(t.turn_id)||!t.tiles.length))throw Error('Images must cover every tutor turn exactly once.');
 for(const t of turns){const expected=sections.filter(s=>s.turn_id===t.turn_id).map(s=>s.section_id);if(JSON.stringify(t.sections.map(s=>s.section_id))!==JSON.stringify(expected))throw Error('Image section inventory differs from the permanent registry.');for(const tile of t.tiles)if(createHash('sha256').update(Buffer.from(tile.data,'base64')).digest('hex')!==tile.sha256)throw Error('Image hash mismatch.');}
 const prompt=imagePrompt(rubric);
 const fingerprint=createHash('sha256').update(JSON.stringify({version:imagePromptVersion,conversation,rubric:rubric.rubric_sha256,sections,prompt,config,turns:turns.map(t=>({...t,tiles:t.tiles.map(({data:_data,...tile})=>tile)}))})).digest('hex');
 if(checkpoint&&checkpoint.fingerprint!==fingerprint)throw Error('Image checkpoint differs from the current model, prompt, rubric, registry or images.');
 const state:ImageCheckpoint=checkpoint?structuredClone(checkpoint):{fingerprint,turns:{}};
 const orderedTurns=[...turns].sort((a,b)=>tutorIds.indexOf(a.turn_id)-tutorIds.indexOf(b.turn_id));
 for(const turn of orderedTurns){
  const saved=state.turns[turn.turn_id]||{attempts:0};state.turns[turn.turn_id]=saved;
  if(saved.annotations)continue;
  let error='';
  for(;saved.attempts<4;){
   saved.attempts++;await onCheckpoint(structuredClone(state));
   const previousWalkthroughTurns=orderedTurns.filter(t=>tutorIds.indexOf(t.turn_id)<tutorIds.indexOf(turn.turn_id)&&state.turns[t.turn_id]?.annotations?.some(a=>a.feature==='step_by_step_walkthroughs'));
   const previousWalkthroughs=previousWalkthroughTurns.flatMap(t=>state.turns[t.turn_id].annotations!.filter(a=>a.feature==='step_by_step_walkthroughs').map(a=>({turn_id:t.turn_id,section_id:a.section_id,count:a.entry.count})));
   const messages=[{role:'system',content:prompt},{role:'user',content:JSON.stringify({sections:turn.sections,...(previousWalkthroughs.length?{previously_counted_walkthroughs:previousWalkthroughs,reference_turns:previousWalkthroughTurns.map(t=>({turn_id:t.turn_id,sections:t.sections}))}:{})})+(error?`\nPrevious response failed validation: ${error}. Return the complete corrected result.`:'')}];
   // Screenshot mode deliberately bypasses semantic HTML, source captions and legacy repair evidence.
   const imageInputs=[...previousWalkthroughTurns,turn].flatMap(t=>t.tiles.map(tile=>({...tile,turn_id:t.turn_id})));
   const request=googleRequest(messages,imageOutputSchema(rubric,turn.sections),{...config,stream:false},apiKey,[],imageInputs,true);
   onExchange(turn.turn_id,saved.attempts,'request',JSON.parse(request.body));
   const response=await fetcher(request.url,{method:'POST',headers:request.headers,body:request.body,signal:AbortSignal.timeout(config.timeout*1000)});
   const raw=await response.text();let payload:unknown;try{payload=JSON.parse(raw);}catch{payload={invalid_json:true};}
   onExchange(turn.turn_id,saved.attempts,'response',payload);
   if(!response.ok)throw Error(`Gemini image labeling returned HTTP ${response.status}; checkpoint retained.`);
   try{
    const parsed=googleResponse(raw,false,config.model);
    for(const [key,n] of Object.entries(parsed.usage||{})){saved.usage||={};saved.usage[key]=(saved.usage[key]||0)+Number(n);}
    if(parsed.choices[0].finish_reason!=='stop')throw Error('Gemini response was incomplete.');
    saved.annotations=resolveImageCounts(JSON.parse(parsed.choices[0].message.content),conversation,rubric,sections.filter(s=>s.turn_id===turn.turn_id),`${requestId}-${turn.turn_id}`);
    saved.response_id=parsed.id;saved.native_model=parsed.native_model;
   }catch(e){error=(e as Error).message;await onCheckpoint(structuredClone(state));if(saved.attempts>=4)throw Error(`Image labeling failed validation for ${turn.turn_id}: ${error}`);continue;}
   await onCheckpoint(structuredClone(state));break;
  }
  if(!saved.annotations)throw Error(`Image labeling retry budget exhausted for ${turn.turn_id}.`);
 }
 const usage:Record<string,number>={};for(const t of Object.values(state.turns))for(const [key,n] of Object.entries(t.usage||{}))usage[key]=(usage[key]||0)+n;
 return {annotations:turns.flatMap(t=>state.turns[t.turn_id].annotations!),model:config.model,prompt,generation_config:{...config,provider:'google',input_mode:'turn-images/1',output_contract:imagePromptVersion,usage,image_manifest:turns.map(t=>({...t,tiles:t.tiles.map(({data:_data,...tile})=>tile)})),turn_results:Object.fromEntries(Object.entries(state.turns).map(([id,{annotations,...result}])=>[id,{...result,label_count:annotations?.length}]))}};
}
