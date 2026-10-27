import fs from 'node:fs';
import {CaptureSession} from '../../browser-session.mjs';
import {browserBundle} from '../../html-sections.mjs';
import {inventoryTurn,ROOTS} from '../../image-inventory.mjs';
const t=JSON.parse(fs.readFileSync(new URL('./target.json',import.meta.url)));
const g=JSON.parse(fs.readFileSync(new URL('../../outputs/newtons-laws/bn/20261027T054749609Z/newtons-laws-bn.agent-states.json',import.meta.url)));
const s=await CaptureSession.connect(t.ws);
try{
 await s.evaluate(await browserBundle());
 const l=await s.evaluate(selector=>[...document.querySelectorAll(selector)].map((r,i)=>{CaptureSections.freezeTurn(r,i+1);return {text:r.textContent,layout:CaptureSections.snapshotTurn(r,i+1),imgs:r.querySelectorAll('img').length};}),ROOTS);
 fs.writeFileSync(new URL('./recovery.json',import.meta.url),JSON.stringify(l,null,2));
 console.log(l.map((v,i)=>({turn:i+1,sections:v.layout.sections.map(x=>x.section_id),match:JSON.stringify(v.layout.sections.map(x=>[x.section_id,x.heading,x.anchors]))===JSON.stringify(g.messages[i]?.states[0].section_layout.sections.map(x=>[x.section_id,x.heading,x.anchors])),imgs:v.imgs})));
 const inventories=[];for(let index=0;index<l.length;index++)inventories.push(await s.evaluate(inventoryTurn,{index,selector:ROOTS}));
 fs.writeFileSync(new URL('./inventory.json',import.meta.url),JSON.stringify(inventories,null,2));
 console.log(inventories.map(i=>({turn:i.turn_id,images:i.images.length,candidates:i.candidates})));
}finally{s.close();}
