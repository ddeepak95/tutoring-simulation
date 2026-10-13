import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { createClient } from '@supabase/supabase-js';
import { generateInstructionalBaseline } from '../server/llm-provider.ts';
import { promptVersion } from '../server/llm-annotation-core.ts';
import {instructionalPromptSha256} from '../server/generated/instructional-prompt.ts';
import {createHash} from 'node:crypto';
import {runCheckpointedPipeline} from './llm-pipeline.mjs';
import C from '../src/generated/core.js';
import { resolveRepositoryAdmin } from './repository-conversations.mjs';
const portal=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
if(fs.existsSync(path.join(portal,'.env.local')))process.loadEnvFile(path.join(portal,'.env.local'));
if(fs.existsSync(path.join(portal,'../.env')))process.loadEnvFile(path.join(portal,'../.env'));
const args=process.argv.slice(2);let project,admin,pilot=false,all=false,dry=false,regenerate=false,review=false,reasoningHigh=false,reviewFrom,repairFrom,importFile,resume,resumedState,provider;const requested=[];
try{
 for(let i=0;i<args.length;i++){
  if(args[i]==='--provider')provider=args[++i];else if(args[i]==='--project')project=args[++i];else if(args[i]==='--admin')admin=args[++i];else if(args[i]==='--conversation')requested.push(args[++i]);
  else if(args[i]==='--pilot')pilot=true;else if(args[i]==='--all-missing')all=true;else if(args[i]==='--dry-run')dry=true;else if(args[i]==='--regenerate')regenerate=true;else if(args[i]==='--import')importFile=args[++i];else if(args[i]==='--review')review=true;else if(args[i]==='--reasoning-high')reasoningHigh=true;else if(args[i]==='--review-from'){review=true;reviewFrom=args[++i];}else if(args[i]==='--repair-from-response')repairFrom=args[++i];else if(args[i]==='--resume')resume=args[++i];
  else throw new Error('Usage: npm run llm:baselines -- --project PROJECT (--pilot | --conversation ID | --all-missing | --import FILE) [--dry-run] [--regenerate] [--admin USERNAME] [--review] [--reasoning-high] [--review-from BASELINE_ID]');
 }
 if(provider&&!['google','openrouter'].includes(provider))throw new Error('--provider must be google or openrouter.');
 if(resume){
  if(!/^[0-9a-f-]{36}$/i.test(resume)||pilot||all||requested.length||importFile||reviewFrom||repairFrom)throw new Error('--resume requires only --project and a saved job UUID.');
  resumedState=JSON.parse(fs.readFileSync(path.join(portal,'.runtime/llm-baselines/jobs',resume+'.json'),'utf8'));
  if(resumedState.project!==project||resumedState.id!==resume||!Array.isArray(resumedState.stages)||resumedState.stages.some(s=>!['extraction','review'].includes(s.pass)||!/^[0-9a-f-]{36}$/i.test(s.baseline_id)))throw new Error('Invalid job checkpoint.');
  requested.push(resumedState.conversation_id);regenerate=true;review=resumedState.stages.some(s=>s.pass==='review');reviewFrom=resumedState.review_from;
 }
 if(Number(pilot)+Number(all)+Number(Boolean(requested.length))+Number(Boolean(importFile))!==1)throw new Error('Choose exactly one conversation selection or a local baseline file to import.');
 const url=process.env.VITE_SUPABASE_URL;const ref=url&&new URL(url).hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
 if(!ref||new URL(url).protocol!=='https:'||project!==ref)throw new Error('--project must match VITE_SUPABASE_URL. No requests sent.');
 if(!process.env.SUPABASE_SERVICE_ROLE_KEY)throw new Error('Set the server-only SUPABASE_SERVICE_ROLE_KEY in .env.local.');
 const client=createClient(url,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
 const adminId=await resolveRepositoryAdmin(client,admin);
 async function readAll(table,columns='*'){
  const rows=[];for(let offset=0;;offset+=500){const {data,error}=await client.from(table).select(columns).order('id').range(offset,offset+499);if(error)throw new Error(`Could not read ${table}. Check the project and baseline migration.`);rows.push(...data);if(data.length<500)return rows;}
 }
 const documents=await readAll('conversations');const baselines=await readAll('llm_baselines','id,conversation_id');
 const rubric=JSON.parse(fs.readFileSync(path.join(portal,'src/generated/rubric.json'),'utf8'));
 const config=JSON.parse(fs.readFileSync(path.join(portal,'server/generated/evaluation-config.json'),'utf8'));
 config.timeout=600;config.stream=true;config.max_tokens=null;config.repair_attempts=3;
 if(provider)config.provider=provider;
 const apiKey=provider==='google'?(process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY):process.env.OPENROUTER_API_KEY;
 if(reasoningHigh)config.reasoning={effort:'high',exclude:true};
 if(repairFrom && (requested.length!==1 || !regenerate))throw new Error('--repair-from-response requires one --conversation and --regenerate.');
 if(reviewFrom && (requested.length!==1 || !regenerate))throw new Error('--review-from requires one --conversation and --regenerate.');
 const existing=new Set(baselines.map(baseline=>baseline.conversation_id));
 let selection=documents.filter(doc=>regenerate||!existing.has(doc.id));
 if(requested.length){const unknown=requested.filter(id=>!documents.some(doc=>doc.id===id));if(unknown.length)throw new Error('A requested conversation does not exist in this portal.');selection=selection.filter(doc=>requested.includes(doc.id));}
 if(pilot){selection.sort((a,b)=>Number(b.language==='English'&&!b.transcript.source_conversation_id)-Number(a.language==='English'&&!a.transcript.source_conversation_id)||Number(b.transcript.messages.filter(turn=>turn.speaker==='tutor').length>=2)-Number(a.transcript.messages.filter(turn=>turn.speaker==='tutor').length>=2)||a.transcript.messages.reduce((sum,turn)=>sum+turn.text.length,0)-b.transcript.messages.reduce((sum,turn)=>sum+turn.text.length,0));selection=selection.slice(0,1);}
 async function push(artifact){
  const document=documents.find(doc=>doc.id===artifact.conversation_id);if(!document)throw new Error('The baseline conversation is not in the configured portal.');
  if(!isDeepStrictEqual(artifact.conversation,document.transcript))throw new Error('The local baseline does not contain this exact saved transcript.');
  if(artifact.format_version!=='llm-baseline-local/1.0'||artifact.rubric_snapshot?.rubric_sha256!==artifact.rubric_hash||!Array.isArray(artifact.annotations)||artifact.annotations.some(annotation=>!['concepts_and_subtopics_covered','examples','analogies','representations','cultural_references','questions','issues'].includes(annotation.feature)))throw new Error('Invalid local baseline format.');
  C.validateAnnotations(document.transcript,artifact.annotations,artifact.rubric_snapshot.rubric);
  const {data:version,error:readError}=await client.from('rubric_versions').select('snapshot').eq('hash',artifact.rubric_hash).maybeSingle();if(readError)throw new Error('Could not read the baseline rubric.');
  if(version && !isDeepStrictEqual(version.snapshot.rubric,artifact.rubric_snapshot.rubric))throw new Error('The saved rubric definition differs from the local baseline.');
  if(!version){const {error}=await client.from('rubric_versions').insert({hash:artifact.rubric_hash,snapshot:artifact.rubric_snapshot});if(error&&error.code!=='23505')throw new Error('Could not register the baseline rubric.');}
  const {data,error}=await client.rpc('import_llm_baseline',{p_conversation_id:artifact.conversation_id,p_baseline_id:artifact.id,p_rubric_hash:artifact.rubric_hash,p_annotations:artifact.annotations,p_model:artifact.model,p_prompt_version:artifact.prompt_version,p_prompt:artifact.prompt,p_generation_config:artifact.generation_config,p_admin_id:adminId});
  if(error)throw new Error('Could not import the baseline. The local JSON is retained; use --import to retry without another model call.');
  console.log(JSON.stringify({result:'imported',conversation_id:data.conversation_id,baseline_id:data.id,annotation_count:data.annotations.length,model:data.model,ratings:'blank when assigned'}));
 }
 if(importFile){const artifact=JSON.parse(fs.readFileSync(path.resolve(importFile),'utf8'));if(dry){console.log(JSON.stringify({result:'dry_run',conversation_id:artifact.conversation_id,baseline_id:artifact.id}));}else await push(artifact);}
 else{
  console.log(JSON.stringify({model:config.model,dry_run:dry,conversations:selection.map(doc=>({id:doc.id,label:doc.label,language:doc.language,tutor_turns:doc.transcript.messages.filter(turn=>turn.speaker==='tutor').length}))},null,2));
  if(!selection.length)throw new Error('No conversations need a baseline. Use --conversation ID --regenerate to create another version deliberately.');
  if(!dry){
   if(!apiKey)throw new Error(provider==='google'?'Set GEMINI_API_KEY or GOOGLE_API_KEY locally.':'Set OPENROUTER_API_KEY locally.');
   for(const document of selection){
    let previous;
    if(reviewFrom){const {data,error}=await client.from('llm_baselines').select('*').eq('id',reviewFrom).single();if(error||data.conversation_id!==document.id||data.rubric_hash!==rubric.rubric_sha256)throw new Error('Review baseline must match the selected conversation and rubric.');previous=data;}
    const passes=reviewFrom?['review']:review?['extraction','review']:['extraction'];
    const fingerprint=createHash('sha256').update(JSON.stringify({project,conversation:document.transcript,rubric:rubric.rubric_sha256,prompt:instructionalPromptSha256,config,passes,reviewFrom})).digest('hex');
    if(resumedState&&provider&&resumedState.fingerprint!==fingerprint){
     const {provider:excludedProvider,...originalConfig}=config;
     const originalFingerprint=createHash('sha256').update(JSON.stringify({project,conversation:document.transcript,rubric:rubric.rubric_sha256,prompt:instructionalPromptSha256,config:originalConfig,passes,reviewFrom})).digest('hex');
     if(resumedState.fingerprint!==originalFingerprint)throw new Error('Checkpoint differs beyond the requested provider switch.');
     resumedState.provider_transitions=[...(resumedState.provider_transitions||[]),{from:'openrouter',to:provider,previous_fingerprint:resumedState.fingerprint,at:new Date().toISOString()}];
     resumedState.fingerprint=fingerprint;
    }
    const job=resumedState||{id:crypto.randomUUID(),project,conversation_id:document.id,fingerprint,review_from:reviewFrom,previous,status:'pending',stages:passes.map(pass=>({pass,baseline_id:crypto.randomUUID(),published:false}))};
    const folder=path.join(portal,'.runtime/llm-baselines');const jobFolder=path.join(folder,'jobs');fs.mkdirSync(jobFolder,{recursive:true});
    const jobFile=path.join(jobFolder,job.id+'.json');
    const persist=()=>{fs.writeFileSync(jobFile+'.tmp',JSON.stringify(job,null,2)+'\n');fs.renameSync(jobFile+'.tmp',jobFile);};
    console.log(JSON.stringify({result:resume?'resuming_job':'created_job',job_id:job.id,checkpoint_file:jobFile,resume_command:`npm run llm:baselines -- --project ${project} --resume ${job.id}${provider?` --provider ${provider}`:''}`}));
    const lockFile=jobFile+'.lock';
    if(fs.existsSync(lockFile)){const pid=Number(fs.readFileSync(lockFile,'utf8'));let alive=false;try{process.kill(pid,0);alive=true;}catch(e){if(e.code!=='ESRCH')alive=true;}if(alive)throw new Error('This job is already running.');fs.unlinkSync(lockFile);}
    const lock=fs.openSync(lockFile,'wx');fs.writeFileSync(lock,String(process.pid));
    try{await runCheckpointedPipeline({state:job,fingerprint,persist,publish:push,onStage:stage=>console.log(JSON.stringify({result:stage.published?'stage_already_saved':'starting',conversation_id:document.id,pass:stage.pass,reasoning:config.reasoning})),generate:async(stage,previous)=>{
     const id=stage.baseline_id;const file=path.join(folder,`${id}.json`);
     if(fs.existsSync(file)){const artifact=JSON.parse(fs.readFileSync(file,'utf8'));if(artifact.id!==id||artifact.generation_config.pipeline_job_id!==job.id||artifact.rubric_hash!==rubric.rubric_sha256||artifact.prompt_version!==promptVersion||!isDeepStrictEqual(artifact.conversation,document.transcript))throw new Error('Validated artifact does not match this job.');C.validateAnnotations(document.transcript,artifact.annotations,rubric.rubric);return artifact;}
     const responseFolder=path.join(folder,'provider-responses');fs.mkdirSync(responseFolder,{recursive:true});
     const recovered=repairFrom&&stage===job.stages[0]?JSON.parse(fs.readFileSync(path.resolve(repairFrom),'utf8')):null;
     const generated=await generateInstructionalBaseline({...(recovered?{initialContent:recovered.choices[0].message.content,initialResponseId:recovered.id}:{}),checkpoint:stage.generation_checkpoint,onCheckpoint:checkpoint=>{stage.generation_checkpoint=checkpoint;persist();},onProviderResponse:(payload,attempt)=>fs.writeFileSync(path.join(responseFolder,`${id}-${attempt}.json`),JSON.stringify(payload,null,2)+'\n',{flag:'wx'}),conversation:document.transcript,rubric,requestId:id,config,apiKey,...(stage.pass==='review'?{previousAnnotations:previous.annotations}:{})});
     const artifact={format_version:'llm-baseline-local/1.0',id,conversation_id:document.id,rubric_hash:rubric.rubric_sha256,rubric_snapshot:rubric,conversation:document.transcript,annotations:generated.annotations,model:generated.model,prompt_version:promptVersion,prompt:generated.prompt,generation_config:{...generated.generation_config,origin:'local_llm_generation',provider_transitions:job.provider_transitions||[],pipeline_job_id:job.id,reviewed_baseline_id:stage.pass==='review'?previous.id:null},generated_at:new Date().toISOString()};
     fs.writeFileSync(file,JSON.stringify(artifact,null,2)+'\n',{flag:'wx'});
     console.log(JSON.stringify({result:'generated_and_validated',conversation_id:document.id,baseline_id:id,pass:stage.pass,annotation_count:artifact.annotations.length,local_file:file}));return artifact;
    }});}finally{fs.closeSync(lock);fs.unlinkSync(lockFile);}
   }
  }
 }
}catch(error){console.error(error instanceof Error&&error.name==='TimeoutError'?'Generation timed out; no baseline was imported.':error instanceof Error&&error.name==='TypeError'?'Could not reach the configured provider or database.':error.message);process.exitCode=1;}
