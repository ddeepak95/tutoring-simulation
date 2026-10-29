import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {selectTopic,generateConversation,uploadConversation,preflightPortal,tutorSystemPrompt} from '../agentic_conversation_capture/direct-api-conversation.mjs';
import {translateWhole} from './translate-whole.mjs';
import {createAdaptiveFetch} from '../annotation-portal/scripts/adaptive-fetch.mjs';
import {createRateLimitedFetch} from '../annotation-portal/scripts/rate-limited-fetch.mjs';
import {createBufferedOpenRouterFetch} from '../agentic_conversation_capture/openrouter-fetch.mjs';
import {checkpointWriter} from '../annotation-portal/scripts/checkpoint-file.mjs';
import {sectionCandidates} from '../annotation-portal/src/section-registry.ts';
import {languages,loadEnvironment,models,newLanguages,runRoot,selectedTopics,translationModel,tries} from './config.mjs';

const command=process.argv[2]||'status';
if(!['status','pilot','pilot-whole','generate','translate','verify','all'].includes(command)||process.argv.length>3)throw Error('Use status, pilot, pilot-whole, generate, translate, verify, or all.');
loadEnvironment();loadSupabaseEnvironment();
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(process.env.SUPABASE_URL).hostname))throw Error('Run requires local Supabase on loopback.');
const manifestFile=path.join(runRoot,'manifest.json'),topicFile=path.join(runRoot,'topics.json');
const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
if(manifest.items.length!==882||manifest.tutor_system_prompt!==tutorSystemPrompt||manifest.translation_model!==translationModel||!fs.existsSync(path.join(runRoot,'prune-report.json')))throw Error('Prepare and prune this experiment before running.');
const save=checkpointWriter(manifestFile);
const log=value=>console.log(JSON.stringify({time:new Date().toISOString(),...value}));
const sha256=value=>createHash('sha256').update(value).digest('hex');
const newItems=manifest.items.filter(item=>item.origin==='new');
const sourceItems=manifest.items;
if(newItems.length!==630||sourceItems.filter(item=>item.origin==='reused').length!==252)throw Error('Manifest job inventory differs from experiment.');

const providerFor=model=>model==='gpt-6.1-terra'?'openai':model==='google/gemini-3.8-flash'?'google':'openrouter';
const apiKeys={openai:process.env.OPENAI_API_KEY,google:process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY,openrouter:process.env.OPENROUTER_API_KEY};
const portalFetcher=createRateLimitedFetch({minIntervalMs:30,fetcher:(url,init)=>fetch(url,{...init,signal:AbortSignal.timeout(60000)}),onRetry:info=>log({event:'portal_retry',...info})});
const portal={project:'local',supabaseUrl:process.env.SUPABASE_URL,serviceRoleKey:process.env.SUPABASE_SERVICE_ROLE_KEY,fetcher:portalFetcher};
const selections=new Map();
const gates={};
let preflighted=false;
const ensurePreflight=async()=>{if(!preflighted){await preflightPortal(portal);preflighted=true;}};
const keyFor=item=>JSON.stringify([item.topic,item.model,item.language]);
async function selectionFor(item){
 const key=keyFor(item);
 if(!selections.has(key))selections.set(key,await selectTopic({topicId:item.topic,language:item.language,modelId:item.model,topicsFile:topicFile}));
 return selections.get(key);
}
function gateFor(provider,model){
 const key=provider==='openrouter'?`openrouter:${model}`:provider;
 if(!gates[key])gates[key]=createAdaptiveFetch({
  ...(provider==='openrouter'?{fetcher:createBufferedOpenRouterFetch()}:{}),
  initialConcurrency:provider==='google'?12:provider==='openrouter'&&model==='moonshotai/kimi-k3.1-pro'?5:provider==='openrouter'?2:4,maxConcurrency:provider==='openrouter'?8:provider==='google'?24:16,
  minIntervalMs:provider==='openrouter'?400:provider==='google'?300:150,
  onChange:info=>log({event:'provider_concurrency',provider:key,...info}),
  onRetry:info=>log({event:'provider_retry',provider:key,...info}),
 });
 return gates[key];
}
async function registerSections(conversation){
 const candidates=sectionCandidates(conversation);
 const tutorTurns=conversation.messages.filter(turn=>turn.speaker==='tutor');
 if(!candidates.length||tutorTurns.some(turn=>!candidates.some(section=>section.turn_id===turn.turn_id)))throw Error('Source has a tutor turn without sections');
 const url=new URL('/rest/v1/rpc/register_conversation_sections',process.env.SUPABASE_URL).toString();
 const response=await portalFetcher(url,{method:'POST',headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({p_conversation_id:conversation.conversation_id,p_sections:candidates})});
 if(!response.ok)throw Error(`Section registration HTTP ${response.status}: ${(await response.text()).slice(0,250)}`);
 const saved=await response.json();
 if(saved.length!==candidates.length)throw Error('Saved section count differs from candidates');
 for(const [index,section] of saved.entries()){
  const candidate=candidates[index],turn=tutorTurns.find(t=>t.turn_id===section.turn_id);
  if(section.section_id!==`t${candidate.turn_number}s${candidate.section_number}`||section.start!==candidate.start||section.end!==candidate.end||turn?.text.slice(section.start,section.end)!==section.quote)throw Error(`Saved section mismatch for ${conversation.conversation_id}`);
 }
 return saved.length;
}
async function runPool(items,workers,task){
 let next=0;const errors=[];
 await Promise.all(Array.from({length:Math.min(workers,items.length)},async()=>{while(next<items.length){const item=items[next++];try{await task(item);}catch(error){errors.push({item:[item.topic,item.model,item.language,item.attempt],message:error.message});}}}));
 if(errors.length)throw new AggregateError(errors.map(error=>Error(`${error.item.join('/')} — ${error.message}`)),`${errors.length} jobs failed; first: ${errors[0].item.join('/')} — ${errors[0].message}`);
}
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function generateOne(item){
 if(item.registered)return;
 const selection=await selectionFor(item),provider=selection.apiProvider;
 if(provider!==providerFor(item.model)||!apiKeys[provider])throw Error(`Missing or incorrect API route/key for ${item.model}`);
 for(let attempt=1;attempt<=4;attempt++)try{
  item.generation_attempts=(item.generation_attempts||0)+1;await save(manifest);
  const existing=item.file?path.join(runRoot,item.file):null;
  const result=await generateConversation(selection,{apiKey:apiKeys[provider],fetcher:gateFor(provider,item.model),outputRoot:path.join(runRoot,'generations','new'),requestTimeoutMs:1200000,...(existing?{resumeFile:existing}:{}),onArtifact:async file=>{item.file=path.relative(runRoot,file).split(path.sep).join('/');await save(manifest);}});
  const artifact=result.artifact;
  item.id=artifact.conversation.conversation_id;item.sha256=sha256(fs.readFileSync(result.file));
  await save(manifest);
  if(!item.uploaded){await uploadConversation(artifact,portal);item.uploaded=true;await save(manifest);}
  item.sections=await registerSections(artifact.conversation);item.registered=true;
  item.language_flag=languageFlag(artifact.conversation);
  delete item.generation_error;await save(manifest);
  log({event:'generated',topic:item.topic,model:item.model,language:item.language,attempt:item.attempt,id:item.id,sections:item.sections,...(item.language_flag?{language_flag:true}:{})});return;
 }catch(error){
  const partial=error.message.match(/Partial run saved at (.+)$/);
  if(partial)item.file=path.relative(runRoot,partial[1]).split(path.sep).join('/');
  item.generation_error=error.message;await save(manifest);
  log({event:'generation_retry',topic:item.topic,model:item.model,language:item.language,attempt:item.attempt,retry:attempt,message:error.message.slice(0,300)});
  if(attempt<4)await delay(3000*attempt);
 }
 throw Error(item.generation_error);
}
function languageFlag(conversation){
 const script={th:'Thai',ta:'Tamil',zh:'Han',hi:'Devanagari',bn:'Bengali',kn:'Kannada'}[conversation.language];
 if(!script)return false;
 const text=conversation.messages.filter(turn=>turn.speaker==='tutor').map(turn=>turn.text).join('\n');
 const letters=[...text.matchAll(/\p{L}/gu)].length,expected=[...text.matchAll(new RegExp(`\\p{Script=${script}}`,'gu'))].length;
 return letters>100&&expected/letters<0.15;
}
async function translateOne(item){
 if(item.language==='en'||item.translation)return;
 if(!item.registered||!item.id)throw Error('Original conversation is not registered');
 for(let attempt=1;attempt<=4;attempt++){
  try{
   item.translation_attempts=(item.translation_attempts||0)+1;await save(manifest);
   const result=await translateWhole(item.id,{geminiKey:apiKeys.google,geminiFetcher:gateFor('google'),portalFetcher,supabaseUrl:process.env.SUPABASE_URL,serviceRoleKey:process.env.SUPABASE_SERVICE_ROLE_KEY});
   const sections=await registerSections(result.conversation);
   item.translation={id:result.conversation_id,file:path.relative(runRoot,result.artifact).split(path.sep).join('/'),sections,mode:result.conversation.translation?.version==='api-english-whole/1'?'whole':'aligned'};
   delete item.translation_error;await save(manifest);
   log({event:'translated',mode:item.translation.mode,topic:item.topic,model:item.model,language:item.language,attempt:item.attempt,source:item.id,id:result.conversation_id});return;
  }catch(error){
   item.translation_error=error.message;await save(manifest);
   log({event:'translation_retry',mode:'whole',topic:item.topic,model:item.model,language:item.language,attempt:item.attempt,retry:attempt,message:error.message.slice(0,300)});
   if(attempt===4||/Invalid whole-conversation translation|checkpoint source differs|Stored whole translation differs/i.test(error.message))break;
   await delay(4000*attempt);
  }
 }
 throw Error(item.translation_error);
}
function summary(){return {reused:252,new_registered:newItems.filter(item=>item.registered).length,new_total:630,translations:sourceItems.filter(item=>item.translation).length,translation_total:756,generation_errors:newItems.filter(item=>item.generation_error&&!item.registered).length,translation_errors:sourceItems.filter(item=>item.translation_error&&!item.translation).length,language_flags:sourceItems.filter(item=>item.language_flag).length};}
async function verify(){
 const db=new pg.Client({connectionString:profile(process.env,'local').dbUrl});await db.connect();
 try{
  const counts=(await db.query(`select (select count(*)::int from public.conversations) conversations,
    (select count(*)::int from public.conversations where source_conversation_id is null) originals,
    (select count(*)::int from public.conversations where source_conversation_id is not null) translations,
    (select count(*)::int from public.topics) topics,
    (select count(*)::int from public.llm_baselines) baselines,
    (select count(*)::int from public.llm_generation_runs) generation_runs`)).rows[0];
  const originalRows=(await db.query("select topic_id,transcript->>'provider' as model,language,count(*)::int n from public.conversations where source_conversation_id is null group by topic_id,model,language")).rows;
  const translationRows=(await db.query("select c.id,c.source_conversation_id,c.language,c.topic_id,c.transcript->'translation'->>'model' translation_model from public.conversations c where source_conversation_id is not null")).rows;
  const expectedOriginals=selectedTopics.length*models.length*languages.length*tries;
  if(counts.originals!==expectedOriginals||counts.translations!==756||counts.conversations!==1638||counts.topics!==6||counts.baselines||counts.generation_runs)throw Error(`Final portal counts differ: ${JSON.stringify(counts)}`);
  if(originalRows.length!==selectedTopics.length*models.length*languages.length||originalRows.some(row=>!selectedTopics.includes(row.topic_id)||!models.includes(row.model)||!languages.includes(row.language)||row.n!==tries))throw Error('Original topic/model/language cells are incomplete');
  const byId=new Map(sourceItems.map(item=>[item.id,item]));
  if(byId.size!==882||sourceItems.some(item=>!item.registered||!item.id)||translationRows.length!==756||translationRows.some(row=>row.language!=='en'||row.translation_model!==translationModel||!byId.has(row.source_conversation_id)||byId.get(row.source_conversation_id).language==='en'||byId.get(row.source_conversation_id).translation?.id!==row.id))throw Error('Translation or manifest links are incomplete');
  const sectionCounts=(await db.query('select conversation_id,count(*)::int n from public.conversation_sections group by conversation_id')).rows;
  if(sectionCounts.length!==1638||sectionCounts.some(row=>row.n<1))throw Error('A conversation has no registered sections');
  const result={verified_at:new Date().toISOString(),...counts,models:models.length,languages:languages.length,tries,section_rows:sectionCounts.reduce((n,row)=>n+row.n,0),language_flags:sourceItems.filter(item=>item.language_flag).length};
  await fsp.writeFile(path.join(runRoot,'verified.json'),JSON.stringify(result,null,2)+'\n');
  log({event:'verified',...result});
 }finally{await db.end();}
}

if(command==='status'){console.log(JSON.stringify(summary(),null,2));process.exit(0);}
const timer=setInterval(()=>log({event:'progress',...summary(),gates:Object.fromEntries(Object.entries(gates).map(([name,gate])=>[name,gate.state()]))}),30000);
try{
 await ensurePreflight();
 if(command==='pilot'){
  const pilot=[...newLanguages.map(language=>newItems.find(item=>item.model===models[0]&&item.language===language)),newItems.find(item=>item.model==='gpt-6.1-terra'&&item.language==='th'),newItems.find(item=>item.model==='google/gemini-3.8-flash'&&item.language==='th')];
  await runPool(pilot,5,generateOne);await runPool(pilot,3,translateOne);
 }else if(command==='pilot-whole'){
  const item=sourceItems.find(item=>item.language!=='en'&&item.registered&&!item.translation);
  if(!item)throw Error('No untranslated original is available for the whole-conversation pilot');
  await translateOne(item);
 }else{
  const generation=()=>Promise.all(models.map(model=>
   runPool(newItems.filter(item=>item.model===model),model==='moonshotai/kimi-k3.1-pro'?Number(process.env.EXPERIMENT_KIMI_WORKERS||8):providerFor(model)==='openrouter'?6:providerFor(model)==='google'?6:5,generateOne)
  ));
  if(command==='all'){
   let generationDone=false,generationFailure;
   const generationTask=generation().then(()=>{generationDone=true;},error=>{generationDone=true;generationFailure=error;});
   const candidates=sourceItems.filter(item=>item.language!=='en'),claimed=new Set(),translationErrors=[];
   await Promise.all(Array.from({length:20},async()=>{
    while(true){
     const item=candidates.find(candidate=>candidate.registered&&!candidate.translation&&!claimed.has(candidate));
     if(item){
      claimed.add(item);
      try{await translateOne(item);}catch(error){translationErrors.push(Error(`${item.topic}/${item.model}/${item.language}/${item.attempt}: ${error.message}`));}
      continue;
     }
     if(generationDone)break;
     await delay(1000);
    }
   }));
   await generationTask;
   if(generationFailure||translationErrors.length)throw new AggregateError([...(generationFailure?[generationFailure]:[]),...translationErrors],'Generation or translation failed; completed work is checkpointed');
  }else if(command==='generate')await generation();
  else if(command==='translate')await runPool(sourceItems.filter(item=>item.language!=='en'),20,translateOne);
  if(command==='verify'||command==='all')await verify();
 }
 log({event:'finished',command,...summary()});
}finally{clearInterval(timer);}
