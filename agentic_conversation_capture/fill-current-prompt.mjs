import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {selectTopic,generateConversation,uploadConversation,preflightPortal,tutorSystemPrompt} from './direct-api-conversation.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {createAdaptiveFetch} from '../annotation-portal/scripts/adaptive-fetch.mjs';
import {checkpointWriter} from '../annotation-portal/scripts/checkpoint-file.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const options={languages:['en','ta'],tries:5,initial:4,maximum:12,apply:false};
const args=process.argv.slice(2);
while(args.length){const flag=args.shift();if(flag==='--apply')options.apply=true;else if(['--languages','--tries','--initial','--maximum'].includes(flag)&&args.length){const value=args.shift();options[flag.slice(2)]=flag==='--languages'?value.split(','):Number(value);}else throw Error('Use --languages en,ta --tries 5 --initial 4 --maximum 12 [--apply]');}
if(!Number.isInteger(options.tries)||options.tries<1||options.tries>100)throw Error('Tries must be 1–100.');
for(const name of ['.env','agentic_conversation_capture/.env.local','annotation-portal/.env.local'])if(fs.existsSync(path.join(root,name)))process.loadEnvFile(path.join(root,name));
loadSupabaseEnvironment();if(process.env.SUPABASE_TARGET!=='local')throw Error('This batch is explicitly local.');
const portal={supabaseUrl:process.env.SUPABASE_URL,serviceRoleKey:process.env.SUPABASE_SERVICE_ROLE_KEY,project:'local'};
await preflightPortal(portal);
const log=event=>console.log(JSON.stringify({time:new Date().toISOString(),...event}));
const fetcher=createAdaptiveFetch({initialConcurrency:options.initial,maxConcurrency:options.maximum,onChange:s=>log({event:'concurrency',...s}),onRetry:s=>log({event:'retry',...s})});
const read=async(route)=>{const response=await fetch(portal.supabaseUrl+'/rest/v1/'+route,{headers:{apikey:portal.serviceRoleKey,Authorization:`Bearer ${portal.serviceRoleKey}`}});if(!response.ok)throw Error(`Portal read HTTP ${response.status}`);return response.json();};
const documents=[];for(let offset=0;;offset+=500){const page=await read(`conversation_details?select=id,topic_id,language,source_conversation_id,prompt:transcript->api_source->>system_prompt,provider:transcript->>provider&order=id&offset=${offset}&limit=500`);documents.push(...page);if(page.length<500)break;}
const topics=JSON.parse(fs.readFileSync(path.join(root,'agentic_conversation_capture/topics.json'),'utf8'));
const selections=[];for(const topic of topics)for(const language of options.languages)selections.push(await selectTopic({topicId:topic['topic-id'],language}));
const pairs=selections.map(s=>({topic:s.topicId,language:s.language,existing:documents.filter(d=>!d.source_conversation_id&&d.topic_id===s.topicId&&d.language===s.language&&d.prompt===tutorSystemPrompt&&d.provider===s.modelId).length}));
log({event:'inventory',pairs,missing:pairs.reduce((n,p)=>n+Math.max(0,options.tries-p.existing),0),system_prompt:tutorSystemPrompt});
if(!options.apply)process.exit(0);
if(!process.env.OPENAI_API_KEY)throw Error('OPENAI_API_KEY is required.');
const folder=path.join(root,'.runtime');fs.mkdirSync(folder,{recursive:true});
const file=path.join(folder,`fill-current-prompt-${options.languages.join('-')}-${options.tries}.json`);
const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{system_prompt:tutorSystemPrompt,model:'gpt-6.1-sol',items:pairs.flatMap(p=>Array.from({length:Math.max(0,options.tries-p.existing)},(_,i)=>({topic:p.topic,language:p.language,attempt:p.existing+i+1})))};
if(state.system_prompt!==tutorSystemPrompt)throw Error('Checkpoint belongs to another prompt; use a new checkpoint file.');
const save=checkpointWriter(file);await save(state);
let next=0;const failures=[];
// More jobs may wait than requests: the adaptive gate owns the provider budget.
await Promise.all(Array.from({length:Math.min(options.maximum,state.items.length)},async()=>{
 while(next<state.items.length){const item=state.items[next++];try{
  if(item.uploaded){if(!documents.some(d=>d.id===item.id))throw Error('Previously uploaded checkpoint record is missing; inspect before resuming.');continue;}
  if(!item.file){log({event:'generating',topic:item.topic,language:item.language,attempt:item.attempt});const selection=selections.find(s=>s.topicId===item.topic&&s.language===item.language);const result=await generateConversation(selection,{apiKey:process.env.OPENAI_API_KEY,fetcher});item.file=result.file;item.id=result.artifact.conversation.conversation_id;await save(state);}
  const artifact=JSON.parse(fs.readFileSync(item.file,'utf8'));
  if(artifact.calls.some(c=>c.request.input[0]?.content!==tutorSystemPrompt))throw Error('Tutor prompt mismatch.');
  await uploadConversation(artifact,portal);item.uploaded=true;delete item.error;await save(state);log({event:'uploaded',topic:item.topic,language:item.language,attempt:item.attempt,id:item.id});
 }catch(error){item.error=error.message;failures.push(error);await save(state);log({event:'failed',topic:item.topic,language:item.language,message:error.message});}}
}));
// Register sections using the existing renderer; no evaluator or translation calls.
for(const item of state.items.filter(i=>i.uploaded&&!i.registered)){
 await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['scripts/preview-api-sections.mjs',item.file,'--register','--project','local'],{cwd:path.join(root,'annotation-portal'),stdio:'ignore',windowsHide:true});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(`Section registration failed for ${item.id}`)));});item.registered=true;await save(state);
}
log({event:'completed',uploaded:state.items.filter(i=>i.uploaded).length,registered:state.items.filter(i=>i.registered).length,failed:failures.length,concurrency:fetcher.state()});
if(failures.length)throw new AggregateError(failures,'Some generation jobs failed; successful artifacts and uploads are retained.');
