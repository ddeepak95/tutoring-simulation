import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';import {fileURLToPath} from 'node:url';
import {openCaptureTarget,CaptureSession,browserTargets} from './browser-session.mjs';
import {browserBundle,hash,canonicalJSON,verifyPackage} from './html-sections.mjs';
import {ROOTS} from './image-inventory.mjs';import {collectFocusedImages} from './image-focused.mjs';
import {saveConversation} from './chatgpt-flow.mjs';
const directory=path.dirname(fileURLToPath(import.meta.url));
export async function recoverStructure(page,graph){
 await page.evaluate(await browserBundle());
 const expected=graph.messages.map(m=>m.states.find(s=>s.id===m.initial).section_layout);
 const result=await page.evaluate(({selector,expected,originalHtml})=>{
  const roots=[...document.querySelectorAll(selector)];
  if(roots.length!==expected.length)throw Error('Saved tutor-turn inventory differs from the source.');
  const normalize=html=>{const d=new DOMParser().parseFromString(html,'text/html');for(const link of d.querySelectorAll('[data-d-component="image"] a[href]'))if(!link.querySelector('img'))link.remove();return {text:d.body.textContent.replace(/\s+/g,' ').trim(),images:[...d.querySelectorAll('img')].map(i=>i.alt)};};
  const inventory=[];
  roots.forEach((root,i)=>{
   // Response shells exist before their contents arrive. Never freeze an empty
   // or partially rendered shell, or its later headings will remain unstamped.
   if(JSON.stringify(normalize(root.innerHTML))!==JSON.stringify(normalize(expected[i].sections.map(s=>s.html).join(''))))throw Error(`Tutor turn ${i+1} has not matched the saved content yet.`);
   if(root.dataset.captureFrozenTurn&&root.querySelectorAll('[data-capture-section-start]').length!==expected[i].boundary_count){root.removeAttribute('data-capture-frozen-turn');for(const node of root.querySelectorAll('[data-capture-section-start],[data-capture-component-anchor],[data-capture-owner-section]'))for(const name of ['data-capture-section-start','data-capture-component-anchor','data-capture-owner-section'])node.removeAttribute(name);}
   const original=new DOMParser().parseFromString(originalHtml[i],'text/html');
   const legacyUnits=[...original.querySelectorAll('[data-capture-section-start]')].some(node=>globalThis.CaptureSections.isStructuredUnit(node));
   globalThis.CaptureSections.freezeTurn(root,i+1,legacyUnits);const layout=globalThis.CaptureSections.snapshotTurn(root,i+1),signature=l=>l.sections.map(s=>({id:s.section_id,heading:s.heading,anchors:s.anchors,...normalize(s.html)}));
   if(JSON.stringify(signature(layout))!==JSON.stringify(signature(expected[i])))throw Error(`Saved section structure/content differs in tutor turn ${i+1}. Draft retained.`);
   inventory.push(signature(layout));});
  const users=[...document.querySelectorAll('[data-message-role="user"],[data-content-search-unit-key$=":user"]')];if(users.length!==expected.length)throw Error('Saved prompt inventory differs from source.');
  return inventory;
 },{selector:ROOTS,expected,originalHtml:graph.messages.map(m=>m.states.find(s=>s.id===m.initial).html)});return hash(canonicalJSON(result));
}
/** This entry point only recovers an existing source. It cannot generate prompts. */
export async function runImagePilot({draftFile,outputDirectory,targetId,publish=false,routingMode='dom-only'}={}){
 draftFile=path.resolve(draftFile||path.join(directory,'outputs/newtons-laws/bn/20261027T054749609Z/newtons-laws-bn.agent-states.json'));
 outputDirectory=path.resolve(outputDirectory||path.join(directory,'outputs/newtons-laws/bn/image-focused-pilot-v2'));
 const graph=JSON.parse(await readFile(draftFile,'utf8'));
 if(graph.messages.length!==3||!draftFile.includes(path.join('newtons-laws','bn')))throw Error('This pilot is limited to the saved Bengali Newton’s Laws draft.');
 await mkdir(outputDirectory,{recursive:true});const checkpointFile=path.join(outputDirectory,'pilot-job.json');
 let job;try{job=JSON.parse(await readFile(checkpointFile,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;job={version:'image-pilot/1',source_url:graph.url,draft_hash:hash(await readFile(draftFile)),completed_prompts:3,metrics:{},media:{}};}
 if(job.source_url!==graph.url||job.draft_hash!==hash(await readFile(draftFile)))throw Error('Saved pilot source changed.');
 const persist=async()=>{await writeFile(checkpointFile+'.tmp',JSON.stringify(job,null,2));await rename(checkpointFile+'.tmp',checkpointFile);};
 const output=path.join(outputDirectory,'newtons-laws-bn.html'),packageFile=output.replace(/\.html$/,'.html-conversation.json');
 let owned,session;const start=Date.now();
 try{
  // A saved target ID is job-owned; arbitrary existing user tabs are never adopted.
  const targets=await browserTargets(),id=job.target_id||targetId,target=id&&targets.find(t=>t.id===id&&t.url===graph.url);
  if(target){session=await CaptureSession.connect(target.webSocketDebuggerUrl);owned={target,close:async()=>{session.close();await fetch('http://127.0.0.1:9222/json/close/'+target.id,{signal:AbortSignal.timeout(3000)});}};}
  else {owned=await openCaptureTarget(graph.url);session=owned.session;}
  job.target_id=owned.target.id;job.target_owned=true;await persist();
  const until=Date.now()+30000;while(Date.now()<until){if(await session.evaluate(selector=>document.querySelectorAll(selector).length===3,ROOTS))break;await new Promise(r=>setTimeout(r,200));}
  const fingerprint=await recoverStructure(session,graph);if(job.structure_hash&&job.structure_hash!==fingerprint)throw Error('Frozen structure fingerprint changed.');job.structure_hash=fingerprint;job.metrics.source_loading_ms=Date.now()-start;await persist();
  if(!job.package){
   const media=await collectFocusedImages(session,{checkpoint:job.media,routingMode,apiKey:process.env.OPENAI_API_KEY,persist:async media=>{job.media=media;await persist();}});
   for(const m of graph.messages){m.coverage={};for(const section of m.states[0].section_layout.sections)for(const anchor of section.anchors)m.coverage[anchor]={status:'complete',expected:null,notes:'image-focused/1: all discovered image viewers verified; text widgets retain initial views only.'};}
   const exportStart=Date.now();job.package=await saveConversation(session,output,{agentStates:graph,mediaInventory:media,mediaCandidates:job.media.turns.flatMap(t=>t.candidates),title:'নিউটনের গতিসূত্র',topic:'নিউটনের গতিসূত্র',topicId:'newtons-laws',language:'bn'});job.metrics.export_ms=Date.now()-exportStart;await persist();
  }
  const pkg=JSON.parse(await readFile(packageFile,'utf8'));await verifyPackage(pkg,{assetReader:a=>readFile(path.resolve(outputDirectory,a.file))});
  job.asset_hashes=pkg.assets.map(({sha256,bytes,file})=>({sha256,bytes,file}));await persist();
  if(publish&&!job.receipt){
   const audit=JSON.parse(await readFile(path.join(outputDirectory,'visual-audit.json'),'utf8'));
   if(audit.version_hash!==pkg.version_hash||audit.status!=='passed')throw Error('A visual audit of this exact package is required before pilot publication.');
   const importStart=Date.now();const {uploadConversation,portalPublicConfig}=await import('./upload-supabase.mjs');if((await portalPublicConfig()).supabaseUrl!=='https://ersdkjgyixcgqwjwmosc.supabase.co')throw Error('Pilot publication is limited to the configured new Supabase project.');job.receipt=await uploadConversation(packageFile);job.metrics.import_ms=Date.now()-importStart;await persist();
  }
  job.status=job.receipt?'published':'awaiting_visual_audit';delete job.error;await persist();
  if(job.receipt){await owned.close();job.target_closed=true;await persist();}else session.close();
  return job;
 }catch(error){job.status='draft';job.error=error.message;await persist();session?.close();throw error;}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const {parseEnv}=await import('node:util');const env=parseEnv(await readFile(path.resolve(directory,'../.env'),'utf8'));process.env.OPENAI_API_KEY||=env.OPENAI_API_KEY;}catch{}try{process.loadEnvFile(path.join(directory,'.env.local'));}catch{}
 runImagePilot({publish:process.argv.includes('--publish'),routingMode:process.argv.includes('--decisions')?'decisions':'dom-only'}).then(j=>console.log(JSON.stringify({status:j.status,metrics:j.metrics,media_metrics:j.media.metrics,receipt:j.receipt},null,2))).catch(e=>{console.error(e.message);process.exitCode=1;});
}
