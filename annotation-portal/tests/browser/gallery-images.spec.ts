import {test,expect} from '@playwright/test';
import {collectGalleryImages} from '../../../agentic_conversation_capture/gallery-images.mjs';
import {backend,ids,login} from './mock';
import {htmlFixture,captureHash,sha} from '../fixtures/html-conversation';
import fs from 'node:fs';
const rubric=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));

async function gallery(page:any){
 await page.route('http://capture.test/**',async(route:any)=>{
  const name=new URL(route.request().url()).pathname;
  if(name!=='/')return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text y="30">'+name+'</text></svg>'});
  return route.fulfill({contentType:'text/html',body:`<div data-message-role="assistant"><div data-assistant-markdown-root><button aria-label="Open gallery" onclick="openGallery()"><img src="/one.svg" alt="First illustration"></button></div></div>
  <div role="dialog" aria-label="Image gallery" hidden><span id="counter"></span><img id="active" alt="Gallery view"><img data-src="/three.svg" alt="Hidden thumbnail" hidden><button onclick="nextImage()" id="next" aria-label="Next image">Next</button><button onclick="document.querySelector('[role=dialog]').hidden=true" aria-label="Close">Close</button></div>
  <script>let index=0;const files=['one','two','three'];function show(){document.getElementById('active').src='/'+files[index]+'.svg';document.getElementById('counter').textContent=(index+1)+' of 3';document.getElementById('next').disabled=index===2;}function openGallery(){index=0;show();document.querySelector('[role=dialog]').hidden=false;}function nextImage(){index++;show();}</script>`});
 });
 await page.goto('http://capture.test/');
}
test('collects every gallery image including lazy hidden thumbnails and closes the viewer',async({page})=>{
 await gallery(page);const result=await collectGalleryImages(page);
 expect(result.complete).toBe(true);expect(result.galleries[0]).toMatchObject({states:3,expected:3,complete:true});
 expect([...new Set(result.images.map((i:any)=>new URL(i.url).pathname))].sort()).toEqual(['/one.svg','/three.svg','/two.svg']);
 expect(result.images.some((i:any)=>i.source==='gallery'&&i.url.endsWith('/two.svg'))).toBe(true);
 expect(result.images.every((i:any)=>i.turn_id==='turn_0001')).toBe(true);
 await expect(page.getByRole('dialog')).toBeHidden();
});
test('marks a gallery incomplete when exploration cannot cover its advertised total',async({page})=>{
 await gallery(page);const result=await collectGalleryImages(page,{maxStates:1});expect(result.complete).toBe(false);expect(result.galleries[0].complete).toBe(false);await expect(page.getByRole('dialog')).toBeHidden();
});
test('stores standalone SVG illustrations while excluding decorative icons',async({page})=>{
 await page.goto('/');await page.setContent('<div data-message-role="assistant"><div data-assistant-markdown-root><svg viewBox="0 0 200 100" aria-label="A diagram"><rect width="150" height="80" fill="red"/></svg><button><svg viewBox="0 0 24 24"><path d="M1 1L10 10"/></svg></button></div></div>');
 const result=await collectGalleryImages(page);expect(result.images).toHaveLength(1);expect(result.images[0].url).toMatch(/^data:image\/svg\+xml,/);expect(result.images[0].alt).toBe('A diagram');expect(result.complete).toBe(true);
});
test('admin image tab lists manifest images absent from the outward response, including after annotation work exists',async({page})=>{
 const state=await backend(page,rubric),pkg=htmlFixture();
 for(const [index,source] of ['inline','gallery'].entries()){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><text y="30">Image ${index+1}</text></svg>`,digest=sha(svg);
  pkg.assets.push({sha256:digest,mime:'image/svg+xml',bytes:Buffer.byteLength(svg),file:'data:image/svg+xml,'+encodeURIComponent(svg)});
  pkg.image_inventory??=[];pkg.image_inventory.push({sha256:digest,turn_id:'turn_0002',section_id:'t1s1',source:source as any,alt:index?'Hidden gallery illustration':'Visible illustration',...(index?{gallery_id:'g1',position:2}:{})});
 }
 pkg.version_hash=captureHash(pkg);
 state.documents[0].transcript={conversation_id:ids.doc,label:'Images',learning_topic:'Images',messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg} as any;
 state.assignments[0].annotations=[{id:'saved',section_id:'t1s1',feature:'examples',entry:{category:'Content',count:1}}];
 await login(page,'admin');await page.goto('/conversations/'+ids.doc);
 await page.getByRole('tab',{name:'Images (2)',exact:true}).click();
 const panel=page.getByRole('tabpanel',{name:'Images (2)',exact:true});
 await expect(panel.getByRole('img')).toHaveCount(2);await expect(panel.getByRole('img',{name:'Hidden gallery illustration',exact:true})).toBeVisible();
 await expect(panel).toContainText('Gallery image');await expect(panel.getByRole('link',{name:'Open full size',exact:true})).toHaveCount(2);
 await page.getByRole('tab',{name:'Conversation',exact:true}).click();await expect(page.getByRole('tabpanel',{name:'Conversation',exact:true})).toBeVisible();
 await page.setViewportSize({width:390,height:844});await page.getByRole('tab',{name:'Images (2)',exact:true}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
