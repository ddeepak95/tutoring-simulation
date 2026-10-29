import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {preflightPortal} from '../agentic_conversation_capture/direct-api-conversation.mjs';
import {runRoot,translationModel} from './config.mjs';

const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const json=async response=>{const text=await response.text();return text?JSON.parse(text):null;};
export function parseGeminiJson(raw){
 try{return JSON.parse(raw);}catch{}
 let repaired='',inside=false;
 for(let index=0;index<raw.length;index++){
  const char=raw[index];
  if(char==='"'){inside=!inside;repaired+=char;continue;}
  if(inside&&char==='\\'){
   const next=raw[index+1];
   if(next&&!'"\\/bfnrtu'.includes(next)){repaired+='\\\\';continue;}
   if(next==='u'&&!/^[0-9a-fA-F]{4}$/.test(raw.slice(index+2,index+6))){repaired+='\\\\';continue;}
   repaired+=char;if(next){repaired+=next;index++;}continue;
  }
  repaired+=char;
 }
 return JSON.parse(repaired);
}

export function wholeTranslationRequest(source,model=translationModel){
 const inventory={title:source.topic_english_name||source.label,messages:source.messages.map(({turn_id,speaker,text})=>({turn_id,speaker,text}))};
 return {model,body:{
  systemInstruction:{parts:[{text:'Translate this complete educational conversation into faithful, natural English in one pass. Return only a JSON object with a translated title and a turns array. Each turn must retain its exact turn_id and its original position; translate all text, including student questions and tutor answers. Keep Markdown, equations, numbers, URLs, and scientific meaning. Do not add, remove, merge, or reorder turns. The keys must be title and turns, and each turn must have turn_id and text. Do not segment the conversation into sections.'}]},
  contents:[{role:'user',parts:[{text:JSON.stringify(inventory)}]}],
  generationConfig:{temperature:0,responseMimeType:'application/json',maxOutputTokens:65536},
 }};
}

export function assembleWholeTranslation(source,output,{id,model,generatedAt}){
 const outputTurns=output?.turns||output?.messages;
 if(!output||typeof output.title!=='string'||!output.title.trim()||!Array.isArray(outputTurns)||outputTurns.length!==source.messages.length)throw Error('Invalid whole-conversation translation inventory');
 const messages=source.messages.map((turn,index)=>{
  const translated=outputTurns[index];
  if(translated?.turn_id!==turn.turn_id||(translated.speaker&&translated.speaker!==turn.speaker)||typeof translated.text!=='string'||!translated.text.trim())throw Error('Invalid whole-conversation translation turn order');
  return {...turn,text:translated.text};
 });
 const title=output.title.trim();
 return {
  conversation_id:id,label:title,learning_topic:title,language:'en',original_language:source.original_language||source.language,
  topic_id:source.topic_id,topic_name:source.topic_name,topic_english_name:source.topic_english_name,
  source_conversation_id:source.conversation_id,provider:source.provider,access_type:'API',messages,
  translation:{version:'api-english-whole/1',model,generated_at:generatedAt,sha256:hash({source:source.messages,output,model}),source_messages:source.messages},
 };
}

export async function translateWhole(sourceId,{geminiKey,geminiFetcher=fetch,portalFetcher=fetch,supabaseUrl,serviceRoleKey,project='local',model=translationModel,outputRoot=path.join(runRoot,'translations-whole')}={}){
 if(!/^[a-f0-9-]{36}$/i.test(sourceId||'')||!geminiKey||!supabaseUrl||!serviceRoleKey)throw Error('A source ID and local API credentials are required');
 const {base,adminId}=await preflightPortal({fetcher:portalFetcher,supabaseUrl,serviceRoleKey,project});
 const headers={apikey:serviceRoleKey,Authorization:`Bearer ${serviceRoleKey}`,'Content-Type':'application/json'};
 async function request(route,body){
  const response=await portalFetcher(`${base}/rest/v1/${route}`,{method:body?'POST':'GET',headers:{...headers,Prefer:'return=representation'},...(body?{body:JSON.stringify(body)}:{})});
  if(!response.ok)throw Error(`Portal HTTP ${response.status} for ${route.split('?')[0]}: ${(await response.text()).slice(0,200)}`);
  return json(response);
 }
 const [sourceRow]=await request(`conversation_details?id=eq.${sourceId}&select=transcript`);
 const source=sourceRow?.transcript;
 if(!source||source.access_type!=='API'||source.translation||source.language==='en')throw Error('Choose an original non-English API conversation');
 const file=path.join(outputRoot,source.topic_id,source.language,`${sourceId}.english.json`);
 const oldFile=path.join(runRoot,'translations',source.topic_id,source.language,`${sourceId}.english.json`);
 const linked=await request(`conversations?source_conversation_id=eq.${sourceId}&select=id,transcript,source_path`);
 if(linked.length){
  if(linked.length!==1)throw Error('More than one English translation is linked to this original');
  const existing=linked[0],artifact=fs.existsSync(file)?file:oldFile;
  if(!fs.existsSync(artifact)||existing.transcript?.translation?.model!==model)throw Error('Linked translation has no matching run artifact');
  return {conversation_id:existing.id,artifact,conversation:existing.transcript,reused:true};
 }
 await fsp.mkdir(path.dirname(file),{recursive:true});
 const sourceHash=hash({source,model,version:'api-english-whole/1'});
 let checkpoint;
 try{checkpoint=JSON.parse(await fsp.readFile(file,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
 if(checkpoint&&checkpoint.source_hash!==sourceHash)throw Error('Whole-translation checkpoint source differs');
 checkpoint||={format_version:'api-whole-translation/1',source_hash:sourceHash,source_id:sourceId,id:randomUUID(),generated_at:new Date().toISOString(),model};
 const save=()=>fsp.writeFile(file,JSON.stringify(checkpoint,null,2)+'\n');
 if(!checkpoint.request){checkpoint.request=wholeTranslationRequest(source,model).body;await save();}
 if(!checkpoint.response){
  const response=await geminiFetcher(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'x-goog-api-key':geminiKey,'Content-Type':'application/json'},body:JSON.stringify(checkpoint.request),signal:AbortSignal.timeout(1200000)});
  if(!response.ok)throw Error(`Gemini whole translation HTTP ${response.status}: ${(await response.text()).slice(0,200)}`);
  checkpoint.response=await json(response);await save();
 }
 if(!checkpoint.result){
  const candidate=checkpoint.response.candidates?.[0];
  if(candidate?.finishReason!=='STOP')throw Error(`Invalid whole-conversation translation finish: ${candidate?.finishReason||'missing'}`);
  const raw=(candidate.content?.parts||[]).filter(part=>typeof part.text==='string'&&!part.thought).map(part=>part.text).join('');
  let output;try{output=parseGeminiJson(raw);}catch{throw Error('Invalid whole-conversation translation JSON');}
  checkpoint.result=assembleWholeTranslation(source,output,{id:checkpoint.id,model,generatedAt:checkpoint.generated_at});
  checkpoint.usage=checkpoint.response.usageMetadata||null;await save();
 }
 const conversation=checkpoint.result,id=conversation.conversation_id,storagePath=`api-generated/${id}.english.json`;
 const bytes=JSON.stringify({format_version:checkpoint.format_version,conversation,request:checkpoint.request,response:checkpoint.response,usage:checkpoint.usage},null,2)+'\n';
 const storageUrl=`${base}/storage/v1/object/transcripts/${storagePath}`;
 const upload=await portalFetcher(storageUrl,{method:'POST',headers:{...headers,'x-upsert':'false'},body:bytes});
 if(!upload.ok){
  if(![400,409].includes(upload.status))throw Error(`Whole-translation storage HTTP ${upload.status}`);
  const stored=await portalFetcher(storageUrl,{headers});
  if(!stored.ok||await stored.text()!==bytes)throw Error('Stored whole translation differs from this artifact');
 }
 const existing=await request(`conversation_details?id=eq.${id}&select=transcript,source_conversation_id`);
 if(!existing.length)await request('conversations',{id,label:conversation.label,language:'en',topic_id:source.topic_id,transcript:conversation,source_conversation_id:sourceId,source_path:storagePath,created_by:adminId});
 const [saved]=await request(`conversation_details?id=eq.${id}&select=transcript,source_conversation_id`);
 if(saved?.source_conversation_id!==sourceId||saved?.transcript?.translation?.sha256!==conversation.translation.sha256)throw Error('Could not verify saved whole translation');
 checkpoint.uploaded={conversation_id:id,source_conversation_id:sourceId};await save();
 return {conversation_id:id,artifact:file,conversation};
}
