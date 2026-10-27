import {inventoryTurn,readViewer,ROOTS,ADAPTER_VERSION} from './image-inventory.mjs';
import {routeCandidates,POLICY_VERSION} from './decisions-router.mjs';
import {createHash} from 'node:crypto';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
export async function waitViewer(page,{changed,timeout=6000}={}){const end=Date.now()+timeout;while(Date.now()<end){const view=await page.evaluate(readViewer);if(view&&view.key!==changed&&view.images.some(i=>i.visible)&&view.images.filter(i=>i.visible).every(i=>i.loaded))return view;await delay(100);}throw Error('Gallery did not finish rendering a new image view.');}
/** Shared target session; checkpoint every inventory and gallery view. */
export async function collectFocusedImages(page,{checkpoint={},persist=async()=>{},apiKey,routingMode='dom-only',maxStates=200,adoptOpenCandidate}={}){
 const initialUrl=await page.evaluate(()=>location.href);
 checkpoint.adapter_version??=ADAPTER_VERSION;checkpoint.policy_version??=POLICY_VERSION;
 if(checkpoint.adapter_version!==ADAPTER_VERSION||checkpoint.policy_version!==POLICY_VERSION)throw Error('Capture policy changed; review the saved draft.');
 checkpoint.turns??=[];checkpoint.galleries??=[];checkpoint.decisions??={};checkpoint.metrics??={clicks:0,screenshots:0,model_calls:0,cache_hits:0,routing_ms:0,discovery_ms:0,exploration_ms:0,usage:[]};
 const metrics=checkpoint.metrics,count=await page.evaluate(selector=>document.querySelectorAll(selector).length,ROOTS);
 for(let index=0;index<count;index++)if(!checkpoint.turns[index]){const start=Date.now();checkpoint.turns[index]=await page.evaluate(inventoryTurn,{index,selector:ROOTS});metrics.discovery_ms+=Date.now()-start;await persist(checkpoint);}
 const allImages=checkpoint.turns.flatMap(t=>t.images);
 if(allImages.some(i=>!i.section_id||!i.sources.length))throw Error('An image has ambiguous section ownership or no exposed source.');
 for(const turn of checkpoint.turns){
  const ambiguous=turn.candidates.filter(c=>!c.choice);
  if(turn.routing_error)throw Error(`Saved routing failure requires review: ${turn.routing_error}`);
  if(ambiguous.length&&!turn.routing){
   if(routingMode!=='decisions'){checkpoint.unresolved=ambiguous.map(c=>({candidate_id:c.candidate_id,section_id:c.section_id,reason:'Unsupported DOM pattern; review required.'}));await persist(checkpoint);throw Error('Unsupported media controls need review; deterministic capture does not call a model.');}
   const start=Date.now();const candidates=[];
   if(ambiguous.length>8)throw Error('Too many ambiguous components; capture remains a draft.');
   for(const c of ambiguous){const crop=await page.screenshot(c.candidate_id);metrics.screenshots++;candidates.push({candidate_id:c.candidate_id,summary:c,crop});}
   turn.routing_evidence=candidates.map(c=>({...c,screenshot_sha256:createHash('sha256').update(Buffer.from(c.crop,'base64')).digest('hex')}));await persist(checkpoint);
   try{turn.routing=await routeCandidates(candidates,{apiKey,cache:checkpoint.decisions,onAttempt:async()=>{turn.routing_attempts=(turn.routing_attempts||0)+1;if(turn.routing_attempts>2)throw Error('Routing retry budget exhausted.');metrics.model_calls++;await persist(checkpoint);}});}catch(error){turn.routing_error=error.message;metrics.routing_ms+=Date.now()-start;await persist(checkpoint);throw error;}
   metrics.cache_hits+=turn.routing.cache_hits;metrics.usage.push(turn.routing.usage);metrics.routing_ms+=Date.now()-start;await persist(checkpoint);
  }
  for(const candidate of turn.candidates){
   const choice=candidate.choice||turn.routing?.routes.find(r=>r.candidate_id===candidate.candidate_id)?.choice;
   if(choice==='needs_review'||!choice)throw Error(`Component ${candidate.candidate_id} needs review.`);
   if(choice==='no_image_exploration')continue;
   if(choice==='probe_image_reveal'){
    if(candidate.reveal_complete)continue;
    // Binary reveals have a verifiable terminal state. Tabs, ranges and opaque
    // widgets need their own bounded adapter rather than guessed exploration.
    if(candidate.role!=='summary'||!candidate.anchor)throw Error(`Image reveal ${candidate.candidate_id} needs an ownership adapter.`);
    await page.click(candidate.candidate_id);metrics.clicks++;
    const revealed=await page.evaluate(({id,selector,index})=>{const root=document.querySelectorAll(selector)[index],control=root.querySelector(`[data-image-capture-control="${id}"]`),component=control?.closest('[data-capture-component-anchor]');if(!control?.closest('details')?.open||!component)throw Error('Image reveal did not reach a verified open state.');const clone=component.cloneNode(true),live=[...root.querySelectorAll('button,input,select,textarea,summary,[role="button"],[role="tab"],[role="radio"],[role="switch"],a[href]')];for(const [i,c] of [...component.querySelectorAll('button,input,select,textarea,summary,[role="button"],[role="tab"],[role="radio"],[role="switch"],a[href]')].entries())clone.querySelectorAll('button,input,select,textarea,summary,[role="button"],[role="tab"],[role="radio"],[role="switch"],a[href]')[i].dataset.captureAgentControl=String(live.indexOf(c));return {html:clone.outerHTML,images:[...component.querySelectorAll('img')].map(img=>({url:img.currentSrc||img.src||img.getAttribute('data-src'),alt:img.alt||''}))};},{id:candidate.candidate_id,selector:ROOTS,index:checkpoint.turns.indexOf(turn)});
    const ids=[];for(const [i,picture] of revealed.images.entries()){
     if(!picture.url)throw Error('Revealed image has no exposed source.');let image=allImages.find(img=>img.section_id===candidate.section_id&&img.anchor===candidate.anchor&&img.sources.some(s=>s.url===picture.url));
     if(!image){image={occurrence_id:`${candidate.candidate_id}i${i+1}`,turn_id:turn.turn_id,section_id:candidate.section_id,anchor:candidate.anchor,alt:picture.alt,source:'gallery',sources:[{url:picture.url,rank:1}]};allImages.push(image);turn.images.push(image);}ids.push(image.occurrence_id);
    }
    if(ids.length){checkpoint.galleries.push({kind:'reveal',gallery_id:candidate.candidate_id,turn_id:turn.turn_id,section_id:candidate.section_id,anchor:candidate.anchor,opener:candidate.candidate_id,candidates:[candidate.candidate_id],views:[{...revealed,image_ids:ids,controls:[],key:candidate.candidate_id}],complete:true,terminal:'binary reveal open'});candidate.image_ids=ids;}
    await page.click(candidate.candidate_id);metrics.clicks++;candidate.reveal_complete=true;await persist(checkpoint);continue;
   }
   const done=checkpoint.galleries.find(g=>g.candidates.includes(candidate.candidate_id)&&g.complete);if(done){
    const open=await page.evaluate(readViewer);if(open&&done.views.some(v=>v.key===open.key)){const close=open.controls.find(c=>c.action==='close'&&!c.disabled);if(!close)throw Error('Recovered viewer has no close control.');await page.click(close.id);metrics.clicks++;for(let i=0;i<20&&await page.evaluate(readViewer);i++)await delay(50);}continue;
   }
   if(!candidate.anchor||!candidate.section_id)throw Error('Viewer opener has no frozen component owner.');
   let gallery=checkpoint.galleries.find(g=>g.opener===candidate.candidate_id);
   
   const start=Date.now();gallery??={gallery_id:`${candidate.section_id}g${turn.candidates.indexOf(candidate)+1}`,turn_id:turn.turn_id,section_id:candidate.section_id,anchor:candidate.anchor,opener:candidate.candidate_id,candidates:[candidate.candidate_id],views:[],complete:false};
   if(!checkpoint.galleries.includes(gallery))checkpoint.galleries.push(gallery);
   await persist(checkpoint);
   const open=await page.evaluate(readViewer);
   if(!open){await page.click(candidate.candidate_id);metrics.clicks++;}
   else if(!gallery.views.length&&adoptOpenCandidate!==candidate.candidate_id)throw Error('An unrelated viewer is already open.');
   let view=await waitViewer(page);const keys=new Set();
   for(let step=0;step<maxStates;step++){
    if(keys.has(view.key))throw Error('Gallery repeated without a verified completed inventory.');keys.add(view.key);
    if(view.total&&gallery.expected&&view.total!==gallery.expected)throw Error('Gallery advertised count changed.');gallery.expected=view.total||gallery.expected||null;
    const visible=view.images.filter(i=>i.visible);if(visible.length!==1)throw Error('Viewer image ownership is ambiguous.');
    const picture=visible[0];let image=allImages.find(i=>i.sources.some(s=>s.url===picture.url));
    // Full-size sources are often opaque. Alt identity is used only when unique
    // within the whole conversation; otherwise block instead of guessing.
    if(!image){const matches=allImages.filter(i=>i.alt&&i.alt===picture.alt);if(matches.length===1)image=matches[0];}
    if(image&&image.section_id!==candidate.section_id)throw Error('Viewer crossed frozen section ownership.');
    if(!image){image={occurrence_id:`${gallery.gallery_id}i${view.position||gallery.views.length+1}`,turn_id:turn.turn_id,section_id:candidate.section_id,anchor:candidate.anchor,alt:picture.alt,source:'gallery',sources:[]};allImages.push(image);turn.images.push(image);}
    if(!image.sources.some(s=>s.url===picture.url))image.sources.unshift({url:picture.url,rank:1000000});
    image.gallery_id=gallery.gallery_id;image.position=view.position||gallery.views.length+1;
    const existingView=gallery.views.find(v=>v.key===view.key);if(!existingView)gallery.views.push({...view,image_ids:[image.occurrence_id]});
    for(const other of turn.candidates.filter(c=>c.choice==='probe_media_opener'&&c.anchor===candidate.anchor&&c.section_id===candidate.section_id&&c.image_ids.includes(image.occurrence_id)))if(!gallery.candidates.includes(other.candidate_id))gallery.candidates.push(other.candidate_id);
    await persist(checkpoint);
    const next=view.controls.find(c=>c.action==='next'&&!c.disabled)||view.controls.find(c=>c.action==='position'&&!c.disabled&&!gallery.views.some(v=>v.position===c.position));
    if(gallery.expected&&new Set(gallery.views.map(v=>v.position)).size===gallery.expected){gallery.complete=true;gallery.terminal='advertised inventory complete';break;}
    if(!next){if(!gallery.expected){gallery.complete=true;gallery.terminal='verified terminal control';break;}throw Error('Gallery ended before its advertised image count.');}
    await page.click(next.id);metrics.clicks++;const following=await waitViewer(page,{changed:view.key});
    if(following.key===gallery.views[0].key&&!gallery.expected){gallery.complete=true;gallery.terminal='full cycle';break;}view=following;
   }
   if(!gallery.complete)throw Error('Gallery safety limit reached; coverage is incomplete.');
   await persist(checkpoint);
   const close=view.controls.find(c=>c.action==='close'&&!c.disabled);if(!close)throw Error('Viewer has no recognized Close control.');await page.click(close.id);metrics.clicks++;
   for(let i=0;i<20&&await page.evaluate(readViewer);i++)await delay(50);if(await page.evaluate(readViewer))throw Error('Viewer did not close.');metrics.exploration_ms+=Date.now()-start;await persist(checkpoint);
  }
 }
 if(await page.evaluate(()=>location.href)!==initialUrl)throw Error('Image exploration changed the conversation URL.');
 delete checkpoint.unresolved;checkpoint.complete=checkpoint.galleries.every(g=>g.complete);await persist(checkpoint);
 return {images:allImages.map(({sources,anchor,...i})=>({...i,url:sources[0].url,aliases:sources.map(s=>s.url)})),galleries:checkpoint.galleries,complete:checkpoint.complete,scope:{version:'image-focused/1',images:'all-discoverable',text_interactions:'initial-only'}};
}
