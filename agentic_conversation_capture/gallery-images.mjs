import {createRequire} from 'node:module';
const require=createRequire(new URL('../annotation-portal/package.json',import.meta.url));
const messages='[data-message-role], [data-content-search-unit-key$=":user"], [data-content-search-unit-key$=":assistant"]';
const content='[data-user-message-bubble],[data-assistant-markdown-root],[data-markdown-text-style="assistant-message"]';

/** Gallery dialogs live outside the response DOM; retain their owning turn. */
export async function collectGalleryImages(page,{maxStates=200}={}) {
 const initialUrl=page.url(),images=[],galleries=[],seen=new Set();
 const add=(records,context)=>{for(const record of records){if(!/^(https?:|data:image\/)/i.test(record.url))continue;const row={...record,...context};const key=JSON.stringify([row.url,row.turn_id,row.gallery_id,row.position]);if(!seen.has(key)){seen.add(key);images.push(row);}}};
 const read=async locator=>{
  const images=await locator.locator('img').evaluateAll(nodes=>nodes.flatMap(img=>{
  const urls=[img.currentSrc||img.getAttribute('src'),img.getAttribute('data-src')];
  // Unmounted/lazy pictures can expose their source only through srcset.
  if(!urls[0])for(const source of [img,...(img.closest('picture')?.querySelectorAll('source')||[])])urls.push(...((source.getAttribute('srcset')||source.getAttribute('data-srcset')||'').match(/https?:\/\/[^\s,]+/g)||[]));
  return urls.filter(Boolean).map(url=>({url:new URL(url,document.baseURI).href,alt:img.getAttribute('alt')||'',section_id:img.closest('[data-capture-owner-section]')?.getAttribute('data-capture-owner-section')||undefined}));
  }));
  const drawings=await locator.locator('svg').evaluateAll(nodes=>nodes.flatMap(svg=>{
   if(svg.parentElement?.closest('svg')||svg.closest('button,[role="button"],.katex,math,[data-d-component="icon"]')||svg.getAttribute('aria-hidden')==='true')return [];
   const box=svg.getBoundingClientRect(),view=svg.viewBox.baseVal;
   if(Math.max(box.width,box.height,view.width,view.height)<80)return [];
   const copy=svg.cloneNode(true);copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
   const originals=[svg,...svg.querySelectorAll('*')],clones=[copy,...copy.querySelectorAll('*')];
   clones.forEach((node,i)=>{for(const attr of [...node.attributes])if(/^on/i.test(attr.name))node.removeAttribute(attr.name);const style=getComputedStyle(originals[i]);for(const name of ['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','opacity','font-family','font-size','font-weight','color','stop-color','stop-opacity'])node.style.setProperty(name,style.getPropertyValue(name));});
   copy.querySelectorAll('script,foreignObject').forEach(node=>node.remove());
   return [{url:'data:image/svg+xml,'+encodeURIComponent(new XMLSerializer().serializeToString(copy)),alt:svg.getAttribute('aria-label')||svg.querySelector('title')?.textContent||'Captured SVG illustration',section_id:svg.closest('[data-capture-owner-section]')?.getAttribute('data-capture-owner-section')||undefined}];
  }));
  return [...images,...drawings];
 };
 const roots=page.locator(messages);const count=await roots.count();
 for(let m=0;m<count;m++){
  const root=roots.nth(m).locator(content).first();if(!await root.count())continue;
  const turn_id='turn_'+String(m+1).padStart(4,'0');add(await read(root),{turn_id,source:'inline'});
  const total=await root.locator('img').count();
  for(let index=0;index<total;index++){
   const image=root.locator('img').nth(index);
   const clickable=await image.evaluate(img=>{
    if(img.closest('a[href]'))return false;
    const button=img.closest('button,[role="button"]');if(button)return !/source|favorite|bookmark/i.test(button.getAttribute('aria-label')||button.textContent||'');
    let node=img;for(let n=0;node&&n<5;n++,node=node.parentElement)if(['pointer','zoom-in'].includes(getComputedStyle(node).cursor))return true;
    // Some ChatGPT viewers attach a click handler without a pointer cursor.
    return true;
   });
   if(!clickable)continue;
   const gallery_id=`${turn_id}-gallery-${index+1}`;
   const imageCount=await page.locator('img').count();
   await image.evaluate(img=>img.click());
   const dialog=page.locator('[role="dialog"],[aria-modal="true"],dialog[open]').filter({visible:true}).last();
   try{await dialog.waitFor({state:'visible',timeout:1000});}catch{
    if(page.url()!==initialUrl)throw Error('An image click navigated outside the captured conversation.');
    const revealed=await page.locator('img').count()>imageCount;
    await page.keyboard.press('Escape');if(revealed)galleries.push({gallery_id,turn_id,complete:false,reason:'An image viewer opened without a supported dialog; its coverage could not be verified.'});continue;
   }
   const states=new Set();let expected=null,complete=false,reason='Gallery exploration reached its safety limit.';
   try{
    for(let step=0;step<maxStates;step++){
     if(page.url()!==initialUrl)throw Error('Gallery navigation changed the conversation URL.');
     await dialog.locator('img').first().waitFor({state:'attached',timeout:10000});
     await dialog.evaluate(async el=>{await Promise.all([...el.querySelectorAll('img')].filter(img=>getComputedStyle(img).display!=='none').map(img=>img.decode().catch(()=>{})));});
     const snapshot=await dialog.evaluate(el=>{
      const text=(el.textContent||'')+' '+[...el.querySelectorAll('[aria-label]')].map(n=>n.getAttribute('aria-label')).join(' ');
      const counter=text.match(/(?:image\s*)?(\d+)\s*(?:of|\/)\s*(\d+)/i);
      const visible=[...el.querySelectorAll('img')].filter(img=>{const s=getComputedStyle(img);return s.display!=='none'&&s.visibility!=='hidden'&&img.getBoundingClientRect().width>0;}).map(img=>img.currentSrc||img.src);
      return {position:counter?Number(counter[1]):null,total:counter?Number(counter[2]):null,key:JSON.stringify([counter?.[1],visible])};
     });
     if(snapshot.total)expected=snapshot.total;
     if(states.has(snapshot.key)){complete=expected===null||states.size>=expected;reason=complete?'All reachable gallery states captured.':'Gallery repeated before reaching its advertised total.';break;}
     states.add(snapshot.key);
     // Includes hidden thumbnails and lazy images in addition to the active view.
     add(await read(dialog),{turn_id,source:'gallery',gallery_id,position:snapshot.position||step+1});
     let next=dialog.getByRole('button',{name:/\bnext(?: image| photo| slide| picture)?\b/i}).first();
     const thumbnails=dialog.getByRole('button',{name:/(?:image|photo|slide)\s+\d|thumbnail/i});
     if(!await next.count()&&await thumbnails.count()>1){expected??=await thumbnails.count();next=thumbnails.nth(step+1);}
     if(!await next.count()||!await next.isEnabled()||await next.getAttribute('aria-disabled')==='true'){
      complete=expected===null||states.size>=expected;reason=complete?'Reached the final gallery image.':'Gallery navigation ended before its advertised total.';break;
     }
     await next.click();
     await page.waitForFunction(({selector,key})=>{const dialogs=[...document.querySelectorAll(selector)].filter(el=>el.getBoundingClientRect().width>0);const el=dialogs.at(-1);if(!el)return true;const text=(el.textContent||'')+' '+[...el.querySelectorAll('[aria-label]')].map(n=>n.getAttribute('aria-label')).join(' ');const counter=text.match(/(?:image\s*)?(\d+)\s*(?:of|\/)\s*(\d+)/i);const visible=[...el.querySelectorAll('img')].filter(img=>{const s=getComputedStyle(img);return s.display!=='none'&&s.visibility!=='hidden'&&img.getBoundingClientRect().width>0;}).map(img=>img.currentSrc||img.src);return JSON.stringify([counter?.[1],visible])!==key;},{selector:'[role="dialog"],[aria-modal="true"],dialog[open]',key:snapshot.key},{timeout:5000}).catch(()=>{});
    }
   }finally{
    const close=dialog.getByRole('button',{name:/^(?:close|close image|close gallery|close dialog)$/i}).first();
    if(await close.count())await close.click();else await page.keyboard.press('Escape');
    await dialog.waitFor({state:'hidden',timeout:3000});
   }
   galleries.push({gallery_id,turn_id,complete,expected,states:states.size,reason});
  }
 }
 if(page.url()!==initialUrl)throw Error('Image capture changed the conversation URL.');
 return {images,galleries,complete:galleries.every(g=>g.complete)};
}

export async function captureGalleryImages(url,{session,...options}={}) {
 const {collectFocusedImages}=await import('./image-focused.mjs');
 if(session)return collectFocusedImages(session,options);
 const {browserTargets,CaptureSession}=await import('./browser-session.mjs');
 const target=(await browserTargets()).find(t=>t.type==='page'&&t.url===url);
 if(!target)throw Error('Live conversation target is unavailable.');
 const page=await CaptureSession.connect(target.webSocketDebuggerUrl);
 try{return await collectFocusedImages(page,options);}finally{page.close();}
}
