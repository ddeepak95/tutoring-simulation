import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

export async function renderLLMTurns({conversation,sections,html,assets,folder,origin='http://127.0.0.1:5173'}) {
 if(!['127.0.0.1','localhost'].includes(new URL(origin).hostname))throw Error('Use a local portal URL for capture rendering.');
 if(!html&&conversation.html_content)html='<!doctype html><html><head></head><body></body></html>';
 if(!html)throw Error('Image-only labeling requires captured HTML.');
 const katexFolder=fileURLToPath(new URL('../node_modules/katex/dist/',import.meta.url));
 const katexCSS=fs.readFileSync(path.join(katexFolder,'katex.min.css'),'utf8').replace(/url\((fonts\/[^)]+)\)/g,(_match,file)=>`url(data:font/${file.endsWith('.woff2')?'woff2':file.endsWith('.woff')?'woff':'ttf'};base64,${fs.readFileSync(path.join(katexFolder,file)).toString('base64')})`);
 html=html.includes('</head>')?html.replace('</head>',`<style>${katexCSS}</style></head>`):`<style>${katexCSS}</style>${html}`;
 fs.mkdirSync(folder,{recursive:true});
 const browser=await chromium.launch({headless:true});
 try {
  const turns=[];
  for(const turn of conversation.messages.filter(t=>t.speaker==='tutor')) {
   const page=await browser.newPage({viewport:{width:1200,height:2000},deviceScaleFactor:1});
   try {
    await page.goto(origin,{waitUntil:'domcontentloaded'});
    const inventory=await page.evaluate(async ({conversation,sections,html,assets,turnId})=>{
     document.body.replaceChildren();document.body.style.cssText='margin:0;width:1200px;height:auto;overflow:visible;display:block';document.documentElement.style.cssText='width:1200px;height:auto;overflow:visible';
     const frame=document.createElement('iframe');frame.sandbox.add('allow-same-origin');frame.style.cssText='border:0;width:1200px;height:2000px;display:block';
     const loaded=new Promise((resolve,reject)=>{frame.onload=resolve;setTimeout(()=>reject(Error('Capture load timed out.')),60000);});
     frame.srcdoc=html;document.body.append(frame);await loaded;
     const moduleUrl='/src/llm-capture.ts';
     const {prepareLLMTurn}=await import(/* @vite-ignore */ moduleUrl);
     const doc=frame.contentDocument;
     const inventory=prepareLLMTurn(doc,conversation,sections,assets,turnId);
     await Promise.race([doc.fonts.ready,new Promise((_,reject)=>setTimeout(()=>reject(Error('Capture fonts timed out.')),60000))]);
     if([...doc.querySelectorAll('link[rel="stylesheet"]')].some(link=>!link.sheet))throw Error('A captured stylesheet failed to load.');
     await Promise.all([...doc.images].map(async image=>{image.loading='eager';if(!image.complete)await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error('A captured image failed to load.'));setTimeout(()=>reject(Error('A captured image timed out.')),60000);});if(!image.naturalWidth)throw Error('A captured image is missing.');await image.decode();}));
     await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
     frame.style.height=doc.documentElement.scrollHeight+'px';
     return inventory;
    },{conversation,sections,html,assets,turnId:turn.turn_id});
    const article=page.frameLocator('iframe').locator('article[data-llm-turn]');
    const bounds=await article.boundingBox();
    if(!bounds||bounds.height<=0)throw Error('The captured turn is empty.');
    if(await article.evaluate(el=>el.scrollWidth>el.clientWidth+2))throw Error('Captured content exceeds the 1200px viewport.');
    const tiles=[];
    for(let y=0;y<Math.ceil(bounds.height);y+=2000){
     const id=`turn-${sections.find(s=>s.turn_id===turn.turn_id).turn_number}-tile-${tiles.length+1}`;
     const bytes=await page.screenshot({fullPage:true,clip:{x:0,y:Math.floor(bounds.y)+y,width:1200,height:Math.min(2000,Math.ceil(bounds.height)-y)},animations:'disabled'});
     const file=path.join(folder,id+'.png');fs.writeFileSync(file,bytes);
     tiles.push({id,file,mime_type:'image/png',sha256:createHash('sha256').update(bytes).digest('hex'),width:1200,height:Math.min(2000,Math.ceil(bounds.height)-y)});
    }
    turns.push({turn_id:turn.turn_id,sections:inventory,tiles});
   } finally {await page.close();}
  }
  fs.writeFileSync(path.join(folder,'manifest.json'),JSON.stringify({version:'turn-images/1',turns},null,2)+'\n');
  return turns;
 } finally {await browser.close();}
}
