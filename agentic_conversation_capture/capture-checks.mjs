import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {withCaptureDOM,hash} from './html-sections.mjs';

/** Text widgets intentionally keep their initial view in this scope. */
export function finalizeImageFocusedCoverage(session){
 if(session.gallery_images?.scope?.version!=='image-focused/1')return false;
 if(!session.gallery_images.complete||session.stopReason||session.gallery_checkpoint?.unresolved?.length)throw Error('Image coverage is incomplete; review the draft.');
 session.capture_scope=session.gallery_images.scope;
 for(const message of session.messages){const initial=message.states.find(s=>s.id===message.initial);message.coverage??={};for(const section of initial.section_layout.sections)for(const anchor of section.anchors)message.coverage[anchor]={status:'complete',expected:null,notes:'image-focused/1: image inventory verified by DOM adapters; text-only widgets retain initial views. File integrity is checked during export.'};}
 return true;
}

/** Preclassify only controls whose capture scope is known; leave others to review. */
export async function prepareCaptureChecks(session){
 const pending=[];
 await withCaptureDOM(async page=>{
  for(const message of session.messages){
   const initial=message.states.find(s=>s.id===message.initial);
   for(const section of initial.section_layout.sections)for(const anchor of section.anchors){
    if(message.coverage?.[anchor]?.status==='complete')continue;
    const html=await page.evaluate(({html,anchor})=>globalThis.CaptureSections.extractComponent(html,anchor),{html:initial.html,anchor});
    const kind=await page.evaluate(html=>{
     const doc=new DOMParser().parseFromString(html,'text/html');
     // A quiz containing tabs/reveals still needs review for hidden images.
     if(doc.querySelector('[role="tab"],select,input[type="range"],details'))return null;
     if([...doc.querySelectorAll('[aria-expanded]')].some(c=>!/^Add to Favorites\b/i.test(c.getAttribute('aria-label')||'')))return null;
     if(globalThis.CaptureSections.questionView(html).quiz)return 'quiz';
     const controls=[...doc.querySelectorAll('button,input,select,textarea,summary,[role="button"],[role="tab"]')];
     if(doc.querySelector('img')&&controls.every(c=>c.tagName==='BUTTON'&&/^(Open\b|Add to Favorites\b|Source\b)/i.test(c.getAttribute('aria-label')||c.textContent||'')))return 'image';
     return null;
    },html);
    if(kind){
     message.coverage??={};message.coverage[anchor]={status:'complete',expected:null,notes:kind==='quiz'?'Visible-only quiz scope: initial question and options retained. Additional questions, answers, feedback, and scores are not explored.':'Image controls handled by the automated gallery collector. Publication requires verified image files and complete gallery coverage.'};
    }else pending.push({message:message.index+1,anchor,section_id:section.section_id});
   }
  }
 });
 return pending;
}

/** Verify the exact downloaded bytes, then decode them in Chromium before publishing. */
export async function verifyCaptureImages(directory,assets,{cacheFile}={}){
 let cache={};if(cacheFile)try{cache=JSON.parse(await readFile(cacheFile,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
 if(assets.every(a=>cache[a.sha256]?.width>0&&cache[a.sha256]?.height>0)){
  for(const asset of assets){const bytes=await readFile(path.join(directory,asset.file));if(bytes.length!==asset.bytes||hash(bytes)!==asset.sha256)throw Error(`Image asset hash/size mismatch: ${asset.file}`);}
  return {verified_at:new Date().toISOString(),cache_hits:assets.length,images:assets.map(a=>({file:a.file,sha256:a.sha256,...cache[a.sha256]}))};
 }
 return withCaptureDOM(async page=>{
  const verified=[];
  for(const asset of assets){
   const bytes=await readFile(path.join(directory,asset.file));
   if(bytes.length!==asset.bytes||hash(bytes)!==asset.sha256)throw Error(`Image asset hash/size mismatch: ${asset.file}`);
   const dimensions=cache[asset.sha256]||await page.evaluate(async src=>{
    const image=new Image();image.src=src;
    await Promise.race([image.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error('Image decode timed out.')),15000))]);
    if(!image.naturalWidth||!image.naturalHeight)throw Error('Image has no dimensions.');
    return {width:image.naturalWidth,height:image.naturalHeight};
   },`data:${asset.mime};base64,${bytes.toString('base64')}`);
   cache[asset.sha256]=dimensions;if(cacheFile)await (await import('node:fs/promises')).writeFile(cacheFile,JSON.stringify(cache));
   verified.push({file:asset.file,sha256:asset.sha256,...dimensions});
  }
  return {verified_at:new Date().toISOString(),images:verified};
 });
}
