import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {prepareCaptureChecks,verifyCaptureImages} from './capture-checks.mjs';
import {withCaptureDOM,hash} from './html-sections.mjs';
import {summary} from './agent-capture.mjs';

test('automates images and visible quizzes while retaining review for unfamiliar controls',async()=>{
 const session=await withCaptureDOM(page=>page.evaluate(()=>{
  const root=document.createElement('div');root.innerHTML='<h2>Images</h2><div data-interactive><img src="test.png"><button aria-label="Open image"></button><button aria-label="Add to Favorites" aria-expanded="false"></button></div><h2>Quiz</h2><div data-interactive role="radiogroup"><button role="radio">விடை</button></div><h2>Unknown</h2><div data-interactive><button role="tab">Reveal image</button></div>';
  document.body.append(root);globalThis.CaptureSections.freezeTurn(root,1);
  return {messages:[{index:0,initial:'s0',active:'s0',transitions:[],states:[{id:'s0',html:root.outerHTML,section_layout:globalThis.CaptureSections.snapshotTurn(root,1),controls:[{index:8,component_anchor:'3',context:'Reveal image',label:'Reveal image'}]}]}],actions:[]};
 }));
 const pending=await prepareCaptureChecks(session);
 assert.equal(pending.length,1);assert.equal(pending[0].anchor,'3');
 assert.match(session.messages[0].coverage['1'].notes,/automated gallery/);
 assert.match(session.messages[0].coverage['2'].notes,/visible-only/i);
 const report=summary(session);assert.equal(report.messages[0].controls[0].index,8);
 assert.deepEqual(await prepareCaptureChecks(session),pending);
});

test('verifies saved image hashes and browser decoding; rejects corrupted or undecodable assets',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'capture-images-'));
 try{
  const svg=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="20"><rect width="10" height="20"/></svg>');
  await writeFile(path.join(dir,'image.svg'),svg);
  const asset={file:'image.svg',mime:'image/svg+xml',bytes:svg.length,sha256:hash(svg)};
  const result=await verifyCaptureImages(dir,[asset]);assert.equal(result.images[0].width,10);assert.equal(result.images[0].height,20);
  await assert.rejects(verifyCaptureImages(dir,[{...asset,sha256:'0'.repeat(64)}]),/hash\/size/);
  const bad=Buffer.from('not an image');await writeFile(path.join(dir,'bad.png'),bad);
  await assert.rejects(verifyCaptureImages(dir,[{file:'bad.png',mime:'image/png',bytes:bad.length,sha256:hash(bad)}]),/decode|decoded|source image/i);
 }finally{await rm(dir,{recursive:true,force:true});}
});


test('image-focused scope completes text widgets without launching exploration',async()=>{
 const {finalizeImageFocusedCoverage}=await import('./capture-checks.mjs');
 const session={messages:[{initial:'initial',states:[{id:'initial',section_layout:{sections:[{anchors:['1']} ]}}]}],gallery_images:{complete:true,scope:{version:'image-focused/1',images:'all-discoverable',text_interactions:'initial-only'}}};
 assert.equal(finalizeImageFocusedCoverage(session),true);assert.equal(session.messages[0].coverage['1'].status,'complete');
 session.gallery_images.complete=false;assert.throws(()=>finalizeImageFocusedCoverage(session),/incomplete/);
});
