import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot,root} from './config.mjs';
import {validateMarkerFreeOutput} from './marker-free-label-core.mjs';

const conversationId=process.argv[2],versionKey='marker-free-v1',model='gemini-3.8-flash';
if(process.argv.length!==3||!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/.test(conversationId||''))throw Error('Pass exactly one conversation UUID.');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local'),apiKey=process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY;
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname)||!apiKey)throw Error('Local Supabase and a direct Google API key are required');
const rubric=JSON.parse(await fsp.readFile(path.join(root,'annotation-portal/src/generated/marker-free-rubric.json'),'utf8'));
const prompt=await fsp.readFile(path.join(root,'conversation-evaluation/prompts/marker-free-features.md'),'utf8');
const keys=rubric.rubric.map(feature=>feature.key);
if(keys.length!==14||rubric.label_schema_version!=='marker-free-occurrences/1'||!keys.includes('bot_errors_hallucinations'))throw Error('Marker-free rubric is not ready');
const checkpointFile=path.join(runRoot,'marker-free-labels',`${conversationId}.${rubric.prompt_version.replaceAll('/','-')}.json`);
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
try{
 const [version]=(await db.query('select transcript,section_mode from public.conversation_versions where conversation_id=$1 and version_key=$2',[conversationId,versionKey])).rows;
 if(!version||version.section_mode!=='none'||!Array.isArray(version.transcript.messages)||!version.transcript.messages.some(turn=>turn.speaker==='tutor'))throw Error('Specified marker-free conversation version is unavailable');
 const migration=await fsp.readFile(path.join(root,'annotation-portal/supabase/migrations/202610290003_marker_free_label_runs.sql'),'utf8');
 await db.query(migration);
 const prior=(await db.query('select id,status from public.conversation_version_label_runs where conversation_id=$1 and version_key=$2 and prompt_version=$3',[conversationId,versionKey,rubric.prompt_version])).rows;
 if(prior.length)throw Error(`Pilot already has a saved ${prior[0].status} result: ${prior[0].id}`);
 await fsp.mkdir(path.dirname(checkpointFile),{recursive:true});
 let checkpoint;
 if(fs.existsSync(checkpointFile))checkpoint=JSON.parse(await fsp.readFile(checkpointFile,'utf8'));
 const transcriptHash=createHash('sha256').update(JSON.stringify(version.transcript)).digest('hex');
 if(checkpoint&&checkpoint.transcript_hash!==transcriptHash)throw Error('Pilot checkpoint belongs to a different transcript');
 checkpoint||={id:randomUUID(),conversation_id:conversationId,version_key:versionKey,transcript_hash:transcriptHash,model,prompt_version:rubric.prompt_version,rubric_hash:rubric.rubric_sha256,created_at:new Date().toISOString()};
 const save=()=>fsp.writeFile(checkpointFile,JSON.stringify(checkpoint,null,2)+'\n');
 const request={systemInstruction:{parts:[{text:prompt}]},contents:[{role:'user',parts:[{text:JSON.stringify({conversation_id:conversationId,messages:version.transcript.messages})}]}],generationConfig:{temperature:0,responseMimeType:'application/json',maxOutputTokens:65536}};
 if(!checkpoint.request){checkpoint.request=request;await save();}
 else if(JSON.stringify(checkpoint.request)!==JSON.stringify(request))throw Error('Pilot request changed since checkpoint');
 if(!checkpoint.response){
  let response;
  for(let attempt=1;attempt<=4;attempt++){
   response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'x-goog-api-key':apiKey,'Content-Type':'application/json'},body:JSON.stringify(request),signal:AbortSignal.timeout(1200000)});
   if(response.ok)break;
   const error=await response.text();
   if(attempt===4||![429,500,502,503,504].includes(response.status))throw Error(`Direct Gemini HTTP ${response.status}: ${error.slice(0,240)}`);
   await new Promise(resolve=>setTimeout(resolve,Math.min(30000,attempt*5000)));
  }
  checkpoint.response=await response.json();await save();
 }
 let validated,error=null;
 try{
  const candidate=checkpoint.response.candidates?.[0];
  if(candidate?.finishReason!=='STOP')throw Error(`Gemini finish reason ${candidate?.finishReason||'missing'}`);
  const raw=(candidate.content?.parts||[]).filter(part=>typeof part.text==='string'&&!part.thought).map(part=>part.text).join('');
  validated=validateMarkerFreeOutput(JSON.parse(raw),version.transcript,keys);
 }catch(caught){error=caught.message;}
 const status=error?'failed':'completed';
 checkpoint.status=status;checkpoint.error=error;checkpoint.validated=validated||null;await save();
 await db.query(`insert into public.conversation_version_label_runs(id,conversation_id,version_key,rubric_hash,rubric_snapshot,prompt_version,prompt,model,request,response,annotations,counts,status,error)
  values($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::jsonb,$10::jsonb,$11::jsonb,$12::jsonb,$13,$14)`,[
  checkpoint.id,conversationId,versionKey,rubric.rubric_sha256,JSON.stringify(rubric),rubric.prompt_version,prompt,model,JSON.stringify(request),JSON.stringify(checkpoint.response),JSON.stringify(validated?.annotations||[]),JSON.stringify(validated?.counts||{}),status,error
 ]);
 if(error)throw Error(`Pilot output failed validation: ${error}. Raw response saved at ${checkpointFile}`);
 console.log(JSON.stringify({result:'completed',conversation_id:conversationId,run_id:checkpoint.id,model,occurrences:validated.annotations.length,counts:validated.counts,checkpoint:checkpointFile}));
}finally{await db.end();}
