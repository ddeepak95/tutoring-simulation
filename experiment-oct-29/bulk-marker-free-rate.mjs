import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {createAdaptiveFetch} from '../annotation-portal/scripts/adaptive-fetch.mjs';
import {checkpointWriter} from '../annotation-portal/scripts/checkpoint-file.mjs';
import {loadEnvironment,runRoot,root,languages} from './config.mjs';
import {normalizeBareRatingArray,normalizeConversationIdRatingWrapper,normalizeNumericStringScores,normalizeSplitRatingObjects,parseEscapedJsonObject,validateMarkerFreeRatings} from './marker-free-rating-core.mjs';

const command=process.argv[2]||'status';
const cohort=process.argv[3]||'originals';
if(!['status','pilot','all','verify'].includes(command)||!['originals','translations'].includes(cohort)||process.argv.length>4)throw Error('Use status, pilot, all, or verify, optionally followed by translations');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local Supabase required');
const model='gemini-3.8-flash',versionKey='marker-free-v1';
const apiKey=process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY;
if(['pilot','all'].includes(command)&&!apiKey)throw Error('Direct Google API key required');
const prompt=await fsp.readFile(path.join(root,'conversation-evaluation/prompts/marker-free-ratings.md'),'utf8');
const promptVersion=prompt.match(/^prompt_version:\s*(\S+)/m)?.[1];
if(promptVersion!=='marker-free-turn-ratings/4')throw Error('This batch is pinned to rating prompt version 4');
const dimensions=JSON.parse(await fsp.readFile(path.join(root,'annotation-portal/src/generated/rating-questions.json'),'utf8'));
if(dimensions.length!==9)throw Error('Unexpected rating dimension count');
const hash=value=>createHash('sha256').update(value).digest('hex');
const rubricHash=hash(JSON.stringify(dimensions)+prompt);
const manifest=JSON.parse(await fsp.readFile(path.join(runRoot,'manifest.json'),'utf8'));
if(manifest.items.length!==882)throw Error('Experiment manifest does not contain 882 originals');
const expected=new Map(cohort==='originals'?manifest.items.map(item=>[item.id,item]):manifest.items.filter(item=>item.language!=='en').map(item=>[item.translation?.id,item]));
const expectedCount=cohort==='originals'?882:756;
const groupLanguages=cohort==='originals'?languages:languages.filter(language=>language!=='en');
const lockKey=cohort==='originals'?4:5;
if(expected.size!==expectedCount||expected.has(undefined))throw Error(`Experiment manifest does not contain ${expectedCount} distinct ${cohort}`);
const pool=new pg.Pool({connectionString:config.dbUrl,max:14});
const log=value=>console.log(JSON.stringify({time:new Date().toISOString(),...value}));
const reportFile=path.join(runRoot,'marker-free-ratings',cohort==='originals'?'batch-v4-progress.json':'batch-v4-translations-progress.json');
const saveReport=checkpointWriter(reportFile);
const readInventory=async()=>{
 const result=await pool.query(`select c.id,${cohort==='originals'?'c.language':'source.language'} as language,c.language as transcript_language,
 c.source_conversation_id as source_id,c.topic_id,c.transcript->>'provider' as provider,
 v.section_mode,v.transcript from public.conversations c
 join public.conversation_versions v on v.conversation_id=c.id and v.version_key=$1
 ${cohort==='translations'?'join public.conversations source on source.id=c.source_conversation_id':''}
 where c.source_conversation_id is ${cohort==='originals'?'null':'not null'} order by c.id`,[versionKey]);
 if(result.rows.length!==expectedCount)throw Error(`Expected ${expectedCount} ${cohort} marker-free versions; found ${result.rows.length}`);
 for(const row of result.rows){
  const item=expected.get(row.id);
  if(!item||row.language!==item.language||row.transcript_language!==(cohort==='originals'?item.language:'en')||row.source_id!==(cohort==='originals'?null:item.id)||row.topic_id!==item.topic||row.provider!==item.model||row.section_mode!=='none'||!Array.isArray(row.transcript.messages)||row.transcript.messages.length!==6||row.transcript.messages.filter(turn=>turn.speaker==='tutor').length!==3)throw Error(`${cohort} inventory mismatch: ${row.id}`);
 }
 return result.rows;
};
const readRuns=async()=>{
 const rows=(await pool.query(`select r.id,r.conversation_id,r.version_key,r.prompt_version,r.rubric_hash,r.status,r.error,r.ratings
 from public.conversation_version_rating_runs r join public.conversations c on c.id=r.conversation_id
 where r.prompt_version=$1 and c.source_conversation_id is ${cohort==='originals'?'null':'not null'}`,[promptVersion])).rows;
 const runs=new Map();
 for(const row of rows){
  if(!expected.has(row.conversation_id)||row.version_key!==versionKey||row.rubric_hash!==rubricHash||runs.has(row.conversation_id))throw Error(`Conflicting version 4 rating run: ${row.conversation_id} (manifest=${expected.has(row.conversation_id)}, version=${row.version_key}, saved_hash=${row.rubric_hash}, current_hash=${rubricHash}, duplicate=${runs.has(row.conversation_id)})`);
  runs.set(row.conversation_id,row);
 }
 return runs;
};
function summarize(inventory,runs,errors={}){
 const byLanguage=Object.fromEntries(groupLanguages.map(language=>[language,{expected:126,completed:0,failed:0,pending:0}]));
 const failures={};let completed=0,failed=0,pending=0;
 for(const row of inventory){
  const run=runs.get(row.id),error=errors[row.id];
  if(run?.status==='completed'){completed++;byLanguage[row.language].completed++;}
  else if(run?.status==='failed'||error){failed++;byLanguage[row.language].failed++;failures[row.id]={language:row.language,topic:row.topic_id,provider:row.provider,error:error||run?.error||'Saved response failed validation'};}
  else{pending++;byLanguage[row.language].pending++;}
 }
 return {cohort,prompt_version:promptVersion,rubric_hash:rubricHash,expected:expectedCount,completed,failed,pending,by_language:byLanguage,failures,updated_at:new Date().toISOString()};
}
function parseResponse(response,transcript,conversationId){
 const candidate=response.candidates?.[0];
 if(candidate?.finishReason!=='STOP')throw Error(`Gemini finish reason ${candidate?.finishReason||'missing'}`);
 const raw=(candidate.content?.parts||[]).filter(part=>typeof part.text==='string'&&!part.thought).map(part=>part.text).join('');
 let output,escaped=false,wrapped=false;
 try{output=JSON.parse(raw);}catch{output=parseEscapedJsonObject(raw);escaped=true;}
 if(output&&typeof output==='object'&&!Array.isArray(output)&&Object.hasOwn(output,'conversation_id')){output=normalizeConversationIdRatingWrapper(output,conversationId);wrapped=true;}
 const policy=value=>`${escaped?'escaped-json-object+':''}${wrapped?'conversation-id-wrapper+':''}${value}`;
 try{return {ratings:validateMarkerFreeRatings(output,transcript,dimensions),normalizationPolicy:policy('exact-json/1')};}
 catch{
  if(Array.isArray(output)){
   try{return {ratings:validateMarkerFreeRatings(normalizeBareRatingArray(output),transcript,dimensions),normalizationPolicy:policy('bare-ratings-array/1')};}
   catch{return {ratings:validateMarkerFreeRatings(normalizeNumericStringScores(normalizeBareRatingArray(output)),transcript,dimensions),normalizationPolicy:policy('bare-array-numeric-string-scores/1')};}
  }
  try{return {ratings:validateMarkerFreeRatings(normalizeNumericStringScores(output),transcript,dimensions),normalizationPolicy:policy('numeric-string-scores/1')};}
  catch{return {ratings:validateMarkerFreeRatings(normalizeSplitRatingObjects(output,transcript,dimensions),transcript,dimensions),normalizationPolicy:policy('split-rating-objects/1')};}
 }
}
const fetcher=createAdaptiveFetch({
 initialConcurrency:12,maxConcurrency:24,minIntervalMs:300,maxRetries:4,
 onChange:state=>log({event:'concurrency',...state}),
 onRetry:retry=>log({event:'provider_retry',...retry}),
});
async function rateOne(row,runs){
 const file=path.join(runRoot,'marker-free-ratings',`${row.id}.${promptVersion.replaceAll('/','-')}.json`);
 const save=checkpointWriter(file),transcriptHash=hash(JSON.stringify(row.transcript));
 let checkpoint=fs.existsSync(file)?JSON.parse(await fsp.readFile(file,'utf8')):null;
 if(checkpoint&&(checkpoint.conversation_id!==row.id||checkpoint.version_key!==versionKey||checkpoint.prompt_version!==promptVersion||checkpoint.transcript_hash!==transcriptHash||checkpoint.rubric_hash!==rubricHash))throw Error('Saved checkpoint does not match conversation or rubric');
 checkpoint||={id:randomUUID(),conversation_id:row.id,version_key:versionKey,transcript_hash:transcriptHash,model,prompt_version:promptVersion,rubric_hash:rubricHash,created_at:new Date().toISOString()};
 const request={systemInstruction:{parts:[{text:prompt}]},contents:[{role:'user',parts:[{text:JSON.stringify({conversation_id:row.id,messages:row.transcript.messages,rating_questions:dimensions})}]}],generationConfig:{temperature:0,responseMimeType:'application/json',maxOutputTokens:65536}};
 if(checkpoint.request&&JSON.stringify(checkpoint.request)!==JSON.stringify(request))throw Error('Saved request differs from current prompt or rubric');
 if(!checkpoint.request){checkpoint.request=request;await save(checkpoint);}
 if(!checkpoint.response){
  const response=await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'x-goog-api-key':apiKey,'Content-Type':'application/json'},body:JSON.stringify(request),signal:AbortSignal.timeout(1200000)});
  if(!response.ok)throw Error(`Direct Gemini HTTP ${response.status}: ${(await response.text()).slice(0,240)}`);
  checkpoint.response=await response.json();await save(checkpoint);
 }
 let ratings,error=null,normalizationPolicy='exact-json/1';
 try{({ratings,normalizationPolicy}=parseResponse(checkpoint.response,row.transcript,row.id));}
 catch(caught){error=caught.message;}
 checkpoint.status=error?'failed':'completed';checkpoint.error=error;checkpoint.ratings=ratings||null;checkpoint.normalization_policy=normalizationPolicy;
 await save(checkpoint);
 await pool.query(`insert into public.conversation_version_rating_runs(id,conversation_id,version_key,rubric_hash,rubric_snapshot,prompt_version,prompt,model,request,response,ratings,status,error,normalization_policy)
 values($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::jsonb,$10::jsonb,$11::jsonb,$12,$13,$14)`,[
  checkpoint.id,row.id,versionKey,rubricHash,JSON.stringify({rating_dimensions:dimensions,source:'conversation-evaluation/human-annotation/rating-questions.md'}),promptVersion,prompt,model,JSON.stringify(request),JSON.stringify(checkpoint.response),JSON.stringify(ratings||[]),checkpoint.status,error,normalizationPolicy,
 ]);
 runs.set(row.id,{id:checkpoint.id,conversation_id:row.id,version_key:versionKey,prompt_version:promptVersion,rubric_hash:rubricHash,status:checkpoint.status,ratings:ratings||[]});
 if(error)throw Error(`Invalid saved response: ${error}`);
}
try{
 const inventory=await readInventory(),runs=await readRuns();
 if(command==='status'){log({event:'status',...summarize(inventory,runs)});}
 else if(command==='verify'){
  const summary=summarize(inventory,runs);
  for(const row of inventory){
   const run=runs.get(row.id);
   if(run?.status!=='completed')continue;
   validateMarkerFreeRatings({ratings:run.ratings},row.transcript,dimensions);
  }
  log({event:'verification',...summary});
  if(summary.completed!==expectedCount||summary.failed||summary.pending)throw Error('Rating batch is incomplete');
 }else{
  await fsp.mkdir(path.dirname(reportFile),{recursive:true});
  const lock=await pool.connect();
  const [{locked}]=(await lock.query('select pg_try_advisory_lock(20261029,$1) as locked',[lockKey])).rows;
  if(!locked){lock.release();throw Error('Another version 4 rating batch is already running');}
  try{
   const remaining=inventory.filter(row=>!runs.has(row.id));
   const jobs=command==='pilot'?groupLanguages.map(language=>remaining.find(row=>row.language===language)).filter(Boolean):remaining;
   log({event:'batch_start',mode:command,cohort,jobs:jobs.length,already_completed:expectedCount-remaining.length,rubric_hash:rubricHash});
   const errors={};let index=0,finished=0;
   await Promise.all(Array.from({length:Math.min(24,jobs.length)},async()=>{
    while(index<jobs.length){
     const row=jobs[index++];
     try{await rateOne(row,runs);}
     catch(error){errors[row.id]=error.message;log({event:'job_failed',conversation_id:row.id,message:error.message});}
     if(++finished%10===0||finished===jobs.length){
      const summary=summarize(inventory,runs,errors);
      await saveReport(summary);
      log({event:'progress',finished,jobs:jobs.length,completed:summary.completed,failed:summary.failed,pending:summary.pending,gate:fetcher.state()});
     }
    }
   }));
   const summary=summarize(inventory,runs,errors);await saveReport(summary);log({event:'batch_end',...summary});
   if(Object.keys(errors).length)process.exitCode=1;
  }finally{await lock.query('select pg_advisory_unlock(20261029,$1)',[lockKey]);lock.release();}
 }
}finally{await pool.end();}
