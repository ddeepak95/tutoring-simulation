import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {createAdaptiveFetch} from '../annotation-portal/scripts/adaptive-fetch.mjs';
import {checkpointWriter} from '../annotation-portal/scripts/checkpoint-file.mjs';
import {tutorSystemPrompt} from '../agentic_conversation_capture/direct-api-conversation.mjs';
import {archiveRoot,languages,loadEnvironment,models,newLanguages,root,runRoot,selectedTopics,translationModel,tries} from './config.mjs';

const sha256=value=>createHash('sha256').update(value).digest('hex');
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const readJsonl=file=>fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const log=value=>console.log(JSON.stringify({time:new Date().toISOString(),...value}));

loadEnvironment();
loadSupabaseEnvironment();
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(process.env.SUPABASE_URL).hostname))throw Error('This experiment requires loopback local Supabase.');
const geminiKey=process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY;
if(!geminiKey)throw Error('Set GEMINI_API_KEY or GOOGLE_API_KEY for prompt localization.');

const sourceTopics=[...readJson(path.join(root,'agentic_conversation_capture/topics_v2.json')),...readJson(path.join(root,'agentic_conversation_capture/topics.json'))];
const topicById=new Map(sourceTopics.map(topic=>[topic['topic-id'],topic]));
assert.equal(selectedTopics.length,6);
for(const id of selectedTopics){const topic=topicById.get(id);if(!topic)throw Error(`Missing topic ${id}`);for(const language of ['en','ta'])if(topic[language]?.prompts?.length!==3)throw Error(`Missing ${language} prompts for ${id}`);}
await fsp.mkdir(path.join(runRoot,'generations','reused'),{recursive:true});
await fsp.mkdir(path.join(runRoot,'prompt-translations'),{recursive:true});
const archiveIndex=readJsonl(path.join(archiveRoot,'index.jsonl'));
const archiveManifest=readJson(path.join(archiveRoot,'manifest.json'));
const archiveHashes=new Map(archiveManifest.files.map(file=>[file.path,file.sha256]));
const groups=new Map();
for(const item of archiveIndex){
 if(!selectedTopics.includes(item.topic_id)||!models.includes(item.model)||!['en','ta'].includes(item.language))continue;
 const key=JSON.stringify([item.topic_id,item.model,item.language]);
 if(!groups.has(key))groups.set(key,[]);
 groups.get(key).push(item);
}
const reused=[];
for(const topic of selectedTopics)for(const model of models)for(const language of ['en','ta']){
 const group=groups.get(JSON.stringify([topic,model,language]))||[];
 if(group.length!==5)throw Error(`Expected five archived runs for ${topic}/${model}/${language}, found ${group.length}`);
 group.sort((a,b)=>a.created_at.localeCompare(b.created_at)||a.id.localeCompare(b.id));
 group.slice(0,tries).forEach((item,index)=>reused.push({...item,attempt:index+1,origin:'reused'}));
}
assert.equal(reused.length,252);
const db=new pg.Client({connectionString:profile(process.env,'local').dbUrl});
await db.connect();
try{
 const rows=(await db.query('select id,transcript,created_at from public.conversations where id=any($1::uuid[])',[reused.map(item=>item.id)])).rows;
 if(rows.length!==reused.length)throw Error(`Only ${rows.length} of ${reused.length} reused IDs exist in local Supabase`);
 const byId=new Map(rows.map(row=>[row.id,row]));
 const sectionRows=(await db.query('select conversation_id,section_id,turn_id,start,"end",quote from public.conversation_sections where conversation_id=any($1::uuid[])',[reused.map(item=>item.id)])).rows;
 const byConversation=new Map();for(const section of sectionRows){if(!byConversation.has(section.conversation_id))byConversation.set(section.conversation_id,[]);byConversation.get(section.conversation_id).push(section);}
 for(const item of reused){
  const source=path.join(archiveRoot,item.generation_file), bytes=fs.readFileSync(source),expectedHash=archiveHashes.get(item.generation_file);
  if(!expectedHash||sha256(bytes)!==expectedHash)throw Error(`Archive checksum differs for ${item.id}`);
  const artifact=JSON.parse(bytes),conversation=artifact.conversation;
  if(artifact.status!=='completed'||conversation?.conversation_id!==item.id||conversation.topic_id!==item.topic_id||conversation.provider!==item.model||conversation.language!==item.language||conversation.api_source?.system_prompt!==tutorSystemPrompt)throw Error(`Archive provenance mismatch for ${item.id}`);
  if(byId.get(item.id)?.transcript?.conversation_id!==item.id||!isSameJson(byId.get(item.id).transcript,conversation))throw Error(`Portal transcript differs from archive for ${item.id}`);
  const sections=byConversation.get(item.id)||[];
  for(const turn of conversation.messages.filter(message=>message.speaker==='tutor')){
   const inTurn=sections.filter(section=>section.turn_id===turn.turn_id).sort((a,b)=>a.start-b.start);
   if(!inTurn.length)throw Error(`Missing sections for ${item.id}/${turn.turn_id}`);
   for(const section of inTurn)if(turn.text.slice(section.start,section.end)!==section.quote)throw Error(`Section text mismatch for ${item.id}/${section.section_id}`);
  }
  const destination=path.join(runRoot,'generations','reused',`${item.id}.json`);
  if(fs.existsSync(destination)&&sha256(fs.readFileSync(destination))!==expectedHash)throw Error(`Existing reused copy differs: ${destination}`);
  if(!fs.existsSync(destination))await fsp.copyFile(source,destination);
  item.file=path.relative(runRoot,destination).split(path.sep).join('/');item.sha256=expectedHash;item.sections=sections.length;
 }
}finally{await db.end();}
log({event:'archive_copies_verified',conversations:reused.length});

const manifestFile=path.join(runRoot,'manifest.json');
let manifest=fs.existsSync(manifestFile)?readJson(manifestFile):null;
const frozen={format_version:'multilingual-experiment/1',topics:selectedTopics,models,languages,tries,translation_model:translationModel,tutor_system_prompt:tutorSystemPrompt,archive_source:'research-archive/oct-29'};
if(manifest){for(const [key,value] of Object.entries(frozen))if(!isSameJson(manifest[key],value))throw Error(`Run manifest differs on ${key}`);}else manifest={...frozen,created_at:new Date().toISOString(),items:[]};
const old=new Map((manifest.items||[]).map(item=>[JSON.stringify([item.topic,item.model,item.language,item.attempt]),item]));
const items=[];
for(const item of reused){
 const previous=old.get(JSON.stringify([item.topic_id,item.model,item.language,item.attempt]));
 items.push({topic:item.topic_id,model:item.model,language:item.language,attempt:item.attempt,id:item.id,file:item.file,sha256:item.sha256,sections:item.sections,origin:'reused',registered:true,...(previous?.translation?{translation:previous.translation}:{})});
}
for(const topic of selectedTopics)for(const model of models)for(const language of newLanguages)for(let attempt=1;attempt<=tries;attempt++){
 const previous=old.get(JSON.stringify([topic,model,language,attempt]));
 items.push({topic,model,language,attempt,origin:'new',...(previous||{})});
}
manifest.items=items;
if(manifest.items.length!==882||new Set(manifest.items.map(item=>JSON.stringify([item.topic,item.model,item.language,item.attempt]))).size!==882)throw Error('Experiment cell inventory is not 882 unique originals');
const save=checkpointWriter(manifestFile);await save(manifest);

const gate=createAdaptiveFetch({initialConcurrency:2,maxConcurrency:4,minIntervalMs:900,onChange:info=>log({event:'prompt_concurrency',...info}),onRetry:info=>log({event:'prompt_retry',...info})});
const locale={th:['Thai','Thai'],zh:['Simplified Chinese','Han'],hi:['Hindi','Devanagari'],bn:['Bengali','Bengali'],kn:['Kannada','Kannada']};
const jobs=selectedTopics.flatMap(topic=>newLanguages.map(language=>({topic,language})));
let next=0;
await Promise.all(Array.from({length:3},async()=>{while(next<jobs.length){
 const job=jobs[next++],source=topicById.get(job.topic),file=path.join(runRoot,'prompt-translations',`${job.topic}.${job.language}.json`);
 const sourceHash=sha256(JSON.stringify({title:source.en.title,prompts:source.en.prompts,language:job.language,model:translationModel}));
 if(fs.existsSync(file)){const saved=readJson(file);if(saved.source_hash!==sourceHash)throw Error(`Prompt checkpoint mismatch: ${file}`);validatePrompt(saved.localized,job.language);continue;}
 const languageName=locale[job.language][0];let lastError;
 for(let attempt=1;attempt<=4;attempt++)try{
  const request={systemInstruction:{parts:[{text:`Translate a high-school science topic title and exactly three student messages into ${languageName}. Keep each message's question or request, scientific concepts, numbers, and level of specificity. Write natural student language. For Chinese use Simplified Chinese characters. Return only a JSON object with keys "title" (string) and "prompts" (array of exactly three strings). Do not add or remove questions.`}]},contents:[{role:'user',parts:[{text:JSON.stringify({title:source.en.title,prompts:source.en.prompts})}]}],generationConfig:{temperature:0,responseMimeType:'application/json',maxOutputTokens:4096}};
  const response=await gate(`https://generativelanguage.googleapis.com/v1beta/models/${translationModel}:generateContent`,{method:'POST',headers:{'x-goog-api-key':geminiKey,'Content-Type':'application/json'},body:JSON.stringify(request),signal:AbortSignal.timeout(180000)});
  if(!response.ok)throw Error(`Gemini prompt translation HTTP ${response.status}: ${(await response.text()).slice(0,180)}`);
  const raw=await response.json(),candidate=raw.candidates?.[0];
  if(candidate?.finishReason!=='STOP')throw Error(`Gemini prompt translation stopped: ${candidate?.finishReason}`);
  const content=(candidate.content?.parts||[]).filter(part=>typeof part.text==='string'&&!part.thought).map(part=>part.text).join('').trim();
  const localized=JSON.parse(content.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,''));validatePrompt(localized,job.language);
  const record={topic_id:job.topic,language:job.language,model:translationModel,source_hash:sourceHash,generated_at:new Date().toISOString(),localized,request,response:raw};
  await fsp.writeFile(file,JSON.stringify(record,null,2)+'\n');log({event:'prompt_localized',topic:job.topic,language:job.language});lastError=null;break;
 }catch(error){lastError=error;log({event:'prompt_attempt_failed',topic:job.topic,language:job.language,attempt,message:error.message});}
 if(lastError)throw lastError;
}}));

const catalog=selectedTopics.map(id=>{
 const source=topicById.get(id),item={subject:source.subject||({brain:'biology'}[id]),'topic-id':id,'topic-name':source['topic-name'],en:source.en,ta:source.ta};
 for(const language of newLanguages)item[language]=readJson(path.join(runRoot,'prompt-translations',`${id}.${language}.json`)).localized;
 return item;
});
const catalogFile=path.join(runRoot,'topics.json');
const catalogBytes=JSON.stringify(catalog,null,2)+'\n';
if(fs.existsSync(catalogFile)&&fs.readFileSync(catalogFile,'utf8')!==catalogBytes)throw Error('Existing run topic catalog differs from generated prompts');
await fsp.writeFile(catalogFile,catalogBytes);
manifest.topic_catalog_sha256=sha256(catalogBytes);manifest.prompt_translations=jobs.length;await save(manifest);
log({event:'prepared',topics:catalog.length,reused:reused.length,new_jobs:630,prompt_sets:jobs.length,catalog:catalogFile});

function isSameJson(a,b){if(Array.isArray(a)||Array.isArray(b))return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((item,i)=>isSameJson(item,b[i]));if(a&&b&&typeof a==='object'&&typeof b==='object'){const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(key=>Object.hasOwn(b,key)&&isSameJson(a[key],b[key]));}return a===b;}
function validatePrompt(value,language){
 if(!value||typeof value.title!=='string'||!value.title.trim()||!Array.isArray(value.prompts)||value.prompts.length!==3||value.prompts.some(prompt=>typeof prompt!=='string'||!prompt.trim())||new Set(value.prompts).size!==3)throw Error(`Invalid localized prompt structure for ${language}`);
 const script=locale[language][1];
 for(const text of [value.title,...value.prompts])if(([...text.matchAll(new RegExp(`\\p{Script=${script}}`,'gu'))].length)<Math.min(8,Math.max(3,Math.floor(text.length/20))))throw Error(`Localized prompt lacks ${language} script`);
}
