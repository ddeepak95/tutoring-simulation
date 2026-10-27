import {readFile,writeFile,mkdir,readdir,rename,open,unlink} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseEnv} from 'node:util';
import {createRequire} from 'node:module';
import {openCaptureTarget,CaptureSession,browserTargets} from './browser-session.mjs';
import {recoverStructure} from './pilot-image-capture.mjs';
import {collectFocusedImages} from './image-focused.mjs';
import {finalizeImageFocusedCoverage} from './capture-checks.mjs';
import {saveConversation} from './chatgpt-flow.mjs';
import {uploadConversation,portalPublicConfig} from './upload-supabase.mjs';
import {verifyPackage,hash} from './html-sections.mjs';
import {requireSectionStructure,graphStructureInputs} from './section-structure.mjs';
import {repairSectionDraft,canRepairSectionDraft} from './repair-section-draft.mjs';

const directory=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(new URL('../annotation-portal/package.json',import.meta.url));
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const readJSON=file=>readFile(file,'utf8').then(JSON.parse);
async function optionalJSON(file){try{return await readJSON(file);}catch(e){if(e.code!=='ENOENT')throw e;return null;}}
async function saveJSON(file,value){await mkdir(path.dirname(file),{recursive:true});await writeFile(file+'.tmp',JSON.stringify(value,null,2)+'\n');await rename(file+'.tmp',file);}

export function parseArguments(args){
 const options={limit:1,list:false,decisions:false,repairDraft:true};
 for(let i=0;i<args.length;i++){
  const arg=args[i];
  if(arg==='--next')options.limit=1;
  else if(arg==='--remaining')options.limit=Infinity;
  else if(arg==='--list'||arg==='--dry-run')options.list=true;
  else if(arg==='--decisions')options.decisions=true;
  else if(arg==='--repair-draft')options.repairDraft=true;
  else if(arg==='--no-repair-draft')options.repairDraft=false;
  else if(arg==='--resume'){} // Checkpoints always resume automatically.
  else if(arg==='--help'||arg==='-h')options.help=true;
  else if(['--limit','--topic','--lang'].includes(arg)){
   const value=args[++i];if(!value||value.startsWith('--'))throw Error(`Missing value for ${arg}.`);
   if(arg==='--limit'){if(!/^\d+$/.test(value)||Number(value)<1)throw Error('--limit must be a positive integer.');options.limit=Number(value);}
   else options[arg.slice(2)]=value;
  }else throw Error(`Unknown option: ${arg}`);
 }
 return options;
}

export function pendingCaptures(topics,languages,existing,options={}){
 const imported=new Set(existing.map(c=>`${c.topic_id}/${c.language}`));
 if(options.topic&&!topics.some(t=>t['topic-id']===options.topic))throw Error('Unknown topic.');
 if(options.lang&&!Object.hasOwn(languages,options.lang))throw Error('Unknown language.');
 return topics.flatMap(t=>Object.keys(t).filter(language=>Object.hasOwn(languages,language)&&!imported.has(`${t['topic-id']}/${language}`)&&(!options.topic||t['topic-id']===options.topic)&&(!options.lang||language===options.lang)).map(language=>({topic:t['topic-id'],language,title:t[language].title,prompts:t[language].prompts.length})));
}

/** Only reuse saved responses. This command has no prompt-generation path. */
export async function findSavedDraft(outputs,job){
 const base=path.join(outputs,job.topic,job.language);
 let entries;try{entries=await readdir(base,{withFileTypes:true});}catch(e){if(e.code==='ENOENT')return null;throw e;}
 for(const entry of entries.filter(e=>e.isDirectory()&&/^\d{8}T/.test(e.name)).sort((a,b)=>b.name.localeCompare(a.name))){
  const file=path.join(base,entry.name,`${job.topic}-${job.language}.agent-states.json`),graph=await optionalJSON(file);
  if(graph?.formatVersion==='agent-interactions/1'&&graph.messages?.length===job.prompts&&graph.messages.every(m=>m.states?.find(s=>s.id===m.initial)?.section_layout?.sections?.length))return file;
 }
 return null;
}

function connectionFailure(error){return error.code==='browser_unavailable'||/Capture target disconnected|Capture target connection|Capture circuit breaker|Chrome debugging endpoint/.test(error.message);}
function authenticationFailure(error){return /HTTP (401|403)|Supabase request failed \((401|403)\)|Invalid login credentials/i.test(error.message);}
function transientFailure(error){return /timeout|timed out|fetch failed|ECONNRESET|HTTP (408|429|500|502|503|504)|Supabase request failed \((408|429|500|502|503|504)\)/i.test(error.message);}

async function connectPortal(){
 const envFile=path.join(directory,'.env.local');
 try{const values=parseEnv(await readFile(envFile,'utf8'));for(const [key,value] of Object.entries(values))process.env[key]??=value;}catch(e){if(e.code!=='ENOENT')throw e;}
 const config=await portalPublicConfig(),{createClient}=require('@supabase/supabase-js');
 if(!process.env.PORTAL_USERNAME||!process.env.PORTAL_PASSWORD)throw Error('Configure PORTAL_USERNAME and PORTAL_PASSWORD in agentic_conversation_capture/.env.local.');
 const client=createClient(config.supabaseUrl,config.publicKey,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(url,init)=>fetch(url,{...init,signal:AbortSignal.timeout(30000)})}});
 const auth=await client.auth.signInWithPassword({email:process.env.PORTAL_USERNAME+'@users.annotation.invalid',password:process.env.PORTAL_PASSWORD});if(auth.error)throw auth.error;
 const inventory=async()=>{const result=await client.from('conversations').select('id,topic_id,language');if(result.error)throw result.error;return result.data;};
 return {...config,client,token:auth.data.session.access_token,inventory};
}

async function recoverOne(pair,context,{decisions=false,repairDraft=true}={}){
 const folder=path.join(directory,'outputs',pair.topic,pair.language,'image-focused-recovery'),file=path.join(folder,'capture-job.json');
 let job=await optionalJSON(file);
 let draftFile=job?.draft_file||await findSavedDraft(path.join(directory,'outputs'),pair);
 if(!draftFile)throw Error('No complete saved response graph exists; needs review. No new conversation was generated.');
 let bytes=await readFile(draftFile),graph=JSON.parse(bytes),draftHash=hash(bytes);
 job??={version:'image-recovery/1',source_url:graph.url,draft_hash:draftHash,completed_prompts:graph.messages.length,media:{},timings:{},status:'draft'};
 if(job.draft_hash!==draftHash||job.source_url!==graph.url)throw Error('Saved draft identity changed; needs review.');
 if(job.project_url&&job.project_url!==context.supabaseUrl)throw Error('Checkpoint belongs to another Supabase project.');
 Object.assign(job,{draft_file:draftFile,project_url:context.supabaseUrl});const persist=()=>saveJSON(file,job);await persist();
 // Recover the committed export if the process stopped before recording its path.
 if(!job.package){const packagePath=path.join(folder,`${pair.topic}-${pair.language}.html-conversation.json`),ready=await optionalJSON(packagePath);if(ready?.status==='complete'&&ready.capture_scope?.version==='image-focused/1'&&ready.metadata.source_url===job.source_url&&ready.metadata.topic_id===pair.topic&&ready.metadata.language===pair.language){job.package={packagePath};await persist();}}
 const phase=async(name,action)=>{job.stage=name;await persist();console.log(`  ${name}`);const start=Date.now();try{return await action();}finally{job.timings[name+'_ms']=(job.timings[name+'_ms']||0)+Date.now()-start;await persist();}};
 let owned;
 try{
  try{job.section_validation=await phase('section_structure',()=>requireSectionStructure(graphStructureInputs(graph),{reportFile:path.join(folder,'section-validation-source.json')}));}
  catch(error){
   if(!canRepairSectionDraft(error,job,repairDraft))throw error;
   console.log('  Recognized split-block boundaries; repairing the unpublished draft automatically.');
   await phase('repair_section_draft',async()=>{
    const fixed=await repairSectionDraft(graph),target=path.join(folder,'repaired.agent-states.json');await saveJSON(target,fixed.graph);
    job.original_draft_file??=draftFile;job.original_draft_hash??=draftHash;draftFile=target;bytes=await readFile(target);graph=fixed.graph;draftHash=hash(bytes);
    Object.assign(job,{draft_file:draftFile,draft_hash:draftHash,section_repair:fixed.repair,section_validation:fixed.report,status:'draft'});delete job.structure_hash;delete job.error;
    await saveJSON(path.join(folder,'section-validation-source.json'),fixed.report);await persist();
   });
  }
  await persist();
  // Upload retries resume here without opening Chrome or exploring again.
  if(!job.package){
   await phase('source_loading',async()=>{
    const targets=await browserTargets(),target=job.target_id&&targets.find(t=>t.id===job.target_id&&t.url===graph.url);
    if(target){const session=await CaptureSession.connect(target.webSocketDebuggerUrl);owned={target,session,close:async()=>{session.close();await fetch('http://127.0.0.1:9222/json/close/'+target.id,{signal:AbortSignal.timeout(3000)});}};}
    else owned=await openCaptureTarget(graph.url);
    job.target_id=owned.target.id;await persist();
    await owned.session.send('Emulation.setFocusEmulationEnabled',{enabled:true});
    const deadline=Date.now()+45000;let fingerprint,last;
    while(Date.now()<deadline){try{fingerprint=await recoverStructure(owned.session,graph);break;}catch(e){if(connectionFailure(e))throw e;last=e;await delay(500);}}
    if(!fingerprint)throw last||Error('Source did not finish loading.');
    if(job.structure_hash&&job.structure_hash!==fingerprint)throw Error('Frozen section structure changed; needs review.');job.structure_hash=fingerprint;
   });
   const media=await phase('images',()=>collectFocusedImages(owned.session,{checkpoint:job.media,routingMode:decisions?'decisions':'dom-only',apiKey:process.env.OPENAI_API_KEY,persist:async value=>{job.media=value;await persist();}}));
   graph.gallery_images=media;graph.gallery_checkpoint=job.media;finalizeImageFocusedCoverage(graph);
   job.package=await phase('export',()=>saveConversation(owned.session,path.join(folder,`${pair.topic}-${pair.language}.html`),{agentStates:graph,mediaInventory:media,mediaCandidates:job.media.turns.flatMap(t=>t.candidates),title:pair.title,topic:pair.title,topicId:pair.topic,language:pair.language}));await persist();
  }
  const pkg=await readJSON(job.package.packagePath);
  if(pkg.metadata.topic_id!==pair.topic||pkg.metadata.language!==pair.language||pkg.capture_scope?.version!=='image-focused/1'||job.media.complete!==true||job.media.unresolved?.length)throw Error('Package identity or media coverage is incomplete.');
  await verifyPackage(pkg,{assetReader:a=>{const resolved=path.resolve(folder,a.file),relative=path.relative(folder,resolved);if(relative.startsWith('..')||path.isAbsolute(relative))throw Error('Asset path escapes capture folder.');return readFile(resolved);}});
  job.section_validation=await phase('section_structure_export',()=>requireSectionStructure(graphStructureInputs(graph,pkg),{reportFile:path.join(folder,'section-validation-export.json')}));await persist();
  await phase('import',async()=>{
   if((await portalPublicConfig()).supabaseUrl!==context.supabaseUrl)throw Error('Supabase configuration changed during the run.');
   const before=await context.inventory(),existing=before.find(c=>c.topic_id===pair.topic&&c.language===pair.language);
   if(existing){job.receipt={created:false,conversation_id:existing.id};return;}
   job.receipt=await uploadConversation(job.package.packagePath,context.token);await persist();
   const after=await context.inventory();if(!after.some(c=>c.id===job.receipt.conversation_id)||before.some(c=>!after.some(a=>a.id===c.id)))throw Error('Import inventory verification failed.');
  });
  Object.assign(job,{status:'complete',stage:'complete',sections:pkg.turns.reduce((n,t)=>n+t.sections.length,0),images:pkg.image_inventory.length,completed_at:new Date().toISOString()});delete job.error;await persist();
  if(owned){await owned.close();job.target_closed=true;await persist();}
  else if(job.target_id&&!job.target_closed){const target=(await browserTargets().catch(()=>[])).find(t=>t.id===job.target_id&&t.url===job.source_url);if(target){await fetch('http://127.0.0.1:9222/json/close/'+target.id,{signal:AbortSignal.timeout(3000)});job.target_closed=true;await persist();}}
  return job;
 }catch(error){job.status='needs_review';job.error=error.message;if(error.report)job.section_validation=error.report;await persist();owned?.session.close();throw error;}
}

export async function runCapture(options){
 const topics=await readJSON(path.join(directory,'topics.json')),languages=await readJSON(path.join(directory,'languages.json')),context=await connectPortal();
 const pending=pendingCaptures(topics,languages,await context.inventory(),options),selected=pending.slice(0,options.limit);
 console.log(`${pending.length} pending; ${options.list?'listing':'selected'} ${selected.length}.`);
 for(const pair of selected)console.log(`  ${pair.topic}/${pair.language}`);
 if(options.list||!selected.length)return {pending:pending.length,selected};
 const stateFolder=path.join(directory,'.runtime','capture-queue'),project=hash(context.supabaseUrl).slice(0,12),lockFile=path.join(stateFolder,project+'.lock'),stateFile=path.join(stateFolder,project+'.json');await mkdir(stateFolder,{recursive:true});
 let lock;
 try{lock=await open(lockFile,'wx');}catch(e){if(e.code!=='EEXIST')throw e;const owner=await optionalJSON(lockFile);let active=false;if(owner?.pid)try{process.kill(owner.pid,0);active=true;}catch{}if(active||!owner?.pid)throw Error('A capture command is already running; do not run another against this browser.');await unlink(lockFile);lock=await open(lockFile,'wx');}
 await lock.writeFile(JSON.stringify({pid:process.pid,started_at:new Date().toISOString()}));await lock.close();
 const state=await optionalJSON(stateFile)||{project_url:context.supabaseUrl,results:[]};let completed=0,review=0;
 try{
  for(const pair of selected){
   const key=pair.topic+'/'+pair.language;
   const remaining=60000-(Date.now()-Date.parse(state.last_finished_at||'1970-01-01'));
   if(remaining>0){console.log(`Waiting ${Math.ceil(remaining/1000)}s between captures.`);await delay(remaining);}
   console.log(`Capturing ${key} (saved responses only).`);
   let result;
   for(let attempt=0;attempt<2;attempt++){
    try{const job=await recoverOne(pair,context,options);result={key,status:'complete',conversation_id:job.receipt.conversation_id,sections:job.sections,images:job.images};completed++;console.log(`Complete: ${key}; ${job.sections} sections, ${job.images} images; ${job.receipt.conversation_id}`);break;}
    catch(error){if(connectionFailure(error)||authenticationFailure(error)){state.circuit_breaker={key,reason:error.message};await saveJSON(stateFile,state);throw error;}
     if(!attempt&&transientFailure(error)){console.log('Transient failure; waiting 180s before retrying the unfinished stage.');await delay(180000);continue;}
     result={key,status:'needs_review',error:error.message};review++;console.error(`Needs review: ${key}: ${error.message}`);break;
    }
   }
   state.results=state.results.filter(r=>r.key!==key);state.results.push(result);state.last_finished_at=new Date().toISOString();delete state.circuit_breaker;await saveJSON(stateFile,state);
  }
 }finally{await unlink(lockFile);}
 console.log(`Finished: ${completed} imported, ${review} need review. Remaining pairs: ${pendingCaptures(topics,languages,await context.inventory()).length}.`);
 if(review)process.exitCode=1;return {completed,review};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const options=parseArguments(process.argv.slice(2));if(options.help)console.log('Usage: node agentic_conversation_capture/capture.mjs [--next | --remaining | --limit N] [--topic ID] [--lang CODE] [--list] [--resume] [--decisions] [--no-repair-draft]\nDefault: next pending saved conversation. Resume and known split-block draft repair are automatic. No new conversations are generated.');else await runCapture(options);}
 catch(error){console.error(error.message);process.exitCode=1;}
}
