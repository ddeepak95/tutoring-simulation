import test from 'node:test';
import assert from 'node:assert/strict';
import {withCaptureDOM,buildHtmlPackage,verifyPackage,packageHash,hash,canonicalJSON} from './html-sections.mjs';
import {translateCaptureToEnglish} from './translate-english.mjs';
import {recoverStructure} from './pilot-image-capture.mjs';

test('element cards stay in their enclosing section while older frozen boundaries remain recoverable',async()=>{
 await withCaptureDOM(async page=>{
  const result=await page.evaluate(()=>{
   document.body.innerHTML='<div data-message-role="user">Teach metals</div><div data-message-role="assistant"><div data-assistant-markdown-root><h2>2. Elements</h2><div data-d-component="grid"><div data-d-component="grid-item"><p>4</p><h1>Be</h1><p>Beryllium</p></div><div data-d-component="grid-item"><p>12</p><h1>Mg</h1><p>Magnesium</p></div></div><div data-d-component="row"><div><h3>Be</h3><h3>Mg</h3></div><p>Radius increases</p></div><p>Two electrons.</p><h3>Properties</h3><ul><li><p><strong>List label</strong></p><p>List content</p></li></ul><p><strong>Real bold title</strong></p><p>Explanation.</p></div></div>';
   const root=document.querySelector('[data-assistant-markdown-root]');globalThis.CaptureSections.freezeTurn(root,1);const fixed=globalThis.CaptureSections.snapshotTurn(root,1);
   root.removeAttribute('data-capture-frozen-turn');root.querySelectorAll('[data-capture-section-start]').forEach(n=>n.removeAttribute('data-capture-section-start'));globalThis.CaptureSections.freezeTurn(root,1,true);const legacy=globalThis.CaptureSections.snapshotTurn(root,1),html=root.outerHTML;
   root.removeAttribute('data-capture-frozen-turn');root.querySelectorAll('[data-capture-section-start]').forEach(n=>n.removeAttribute('data-capture-section-start'));
   return {fixed,legacy,html};
  });
  assert.deepEqual(result.fixed.sections.map(s=>s.heading),['2. Elements','Properties','Real bold title']);
  assert.match(result.fixed.sections[0].html,/Beryllium/);assert.match(result.fixed.sections[0].html,/Magnesium/);assert.match(result.fixed.sections[0].html,/Two electrons/);
  assert.ok(result.legacy.sections.length>result.fixed.sections.length);
  const fingerprint=await recoverStructure(page,{messages:[{initial:'s0',states:[{id:'s0',html:result.html,section_layout:result.legacy}]}]});assert.match(fingerprint,/^[a-f0-9]{64}$/);
 });
});

test('package hashing survives JSON persistence of optional undefined fields',()=>{
 const value={a:undefined,b:[undefined,1],c:{d:undefined,e:'kept'}};
 assert.equal(canonicalJSON(value),canonicalJSON(JSON.parse(JSON.stringify(value))));
});

test('quiz export skips grading outcomes and links unanswered question views',async()=>{
 const session=await withCaptureDOM(page=>page.evaluate(()=>{
  const root=document.createElement('div');
  root.innerHTML='<h2>Quiz</h2><div data-interactive><p>Question 1 of 2</p><button data-capture-agent-control="0">Answer</button><button data-capture-agent-control="1" disabled>Next</button></div>';
  document.body.append(root);globalThis.CaptureSections.freezeTurn(root,1);
  const anchor=root.querySelector('[data-capture-component-anchor]').getAttribute('data-capture-component-anchor');
  const controls=[{component_anchor:anchor,label:'Answer'},{component_anchor:anchor,label:'Next'}];
  const snap=id=>({id,html:root.outerHTML,section_layout:globalThis.CaptureSections.snapshotTurn(root,1),controls});
  const initial=snap('initial');
  root.querySelector('[data-interactive]').insertAdjacentHTML('beforeend','<p>Correct!</p><p>Grading explanation</p>');const graded=snap('graded');
  root.querySelector('[data-interactive]').innerHTML='<p>Question 2 of 2</p><button data-capture-agent-control="0">Answer two</button><button data-capture-agent-control="1">Previous</button><button>Try again</button>';const second=snap('second');
  return {messages:[{initial:'initial',states:[initial,graded,second],transitions:[{from:'initial',to:'graded',control:0},{from:'graded',to:'second',control:1}],coverage:{[anchor]:{status:'complete',expected:2,notes:'Both questions captured; feedback excluded.'}}}]};
 }));
 const pkg=await buildHtmlPackage({metadata:{title:'Quiz',topic:'Quiz',language:'en',topic_id:'quiz',provider:'ChatGPT',access_type:'chatbot',source_url:'https://chatgpt.com/c/test'},turns:[{turn_id:'tutor',speaker:'tutor'}],session});
 const component=pkg.turns[0].sections[0].components[0];
 assert.equal(component.states.length,2);assert.ok(!JSON.stringify(pkg).includes('Grading explanation'));
 assert.deepEqual(component.transitions,[{from:component.states[0].state_id,control_id:'1',to:component.states[1].state_id},{from:component.states[1].state_id,control_id:'1',to:component.states[0].state_id}]);
 const rendered=await withCaptureDOM(page=>page.evaluate(pkg=>globalThis.CaptureSections.renderHtmlDocument(pkg),pkg));
 assert.ok(!/data-capture-agent-control="1"[^>]* disabled/.test(rendered));
 await verifyPackage(pkg);
});

test('translates whole inline passages while preserving markup, math, attributes and safe text',async()=>{
 await withCaptureDOM(async page=>{
  const result=await page.evaluate(()=>{
   const html='<p data-original="fixed">Original <strong id="term">term</strong> with <math><mn>74</mn></math>.</p>';
   const units=globalThis.CaptureSections.translationUnits(html);
   const rich=units.find(u=>u.nodes);
   const output=globalThis.CaptureSections.applyTranslations(html,units,units.map(u=>u===rich?'A fluent {{OPEN:a}}translated term{{CLOSE:a}} with {{NODE:b}}.':u.text));
   let rejected=false;try{globalThis.CaptureSections.applyTranslations(html,units,['Missing inline tokens']);}catch{rejected=true;}
   const escaped=globalThis.CaptureSections.applyTranslations(html,units,units.map(u=>u.text+'<script>alert(1)</script>'));
   return {output,rejected,escaped};
  });
  assert.match(result.output,/<strong id="term">translated term<\/strong>/);assert.match(result.output,/<math><mn>74<\/mn><\/math>/);assert.match(result.output,/data-original="fixed"/);assert.ok(result.rejected);assert.ok(!result.escaped.includes('<script>'));
 });
});

test('freezes HTML sections before exploration and keeps all component views inside their owner',async()=>{
 const graph=await withCaptureDOM(async page=>page.evaluate(()=>{
  const root=document.createElement('div');root.innerHTML='<p>Intro.</p><h2>Repeated</h2><ul><li>Example</li></ul><div data-interactive><p>Question 1 of 2</p><button>Next</button></div><h3>Repeated</h3><p><b>Bold title</b></p><table><tr><td>Table</td></tr></table><math><mi>x</mi></math>';
  document.body.append(root);globalThis.CaptureSections.freezeTurn(root,1);
  const snap=()=>({html:root.outerHTML,section_layout:globalThis.CaptureSections.snapshotTurn(root,1),controls:[{component_anchor:'1'}]});
  const initial=snap();root.querySelector('[data-interactive] p').textContent='Question 2 of 2';
  // A heading revealed within a component must not create another section.
  const heading=document.createElement('h4');heading.textContent='Question details';root.querySelector('[data-interactive]').append(heading);
  return {initial,after:snap()};
 }));
 assert.deepEqual(graph.initial.section_layout.sections.map(s=>s.section_id),['t1s1','t1s2','t1s3','t1s4']);
 assert.equal(graph.after.section_layout.sections.length,4);
 const session={messages:[{initial:'state_0',states:[{id:'state_0',...graph.initial},{id:'state_1',...graph.after}],transitions:[{from:'state_0',to:'state_1',control:0}],coverage:{'1':{status:'complete',expected:2,notes:'Both questions captured.'}}}]};
 const hidden='<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100"/></svg>',digest=hash(hidden);
 const pkg=await buildHtmlPackage({metadata:{title:'Title',topic:'Title',language:'ta',topic_id:'test',provider:'ChatGPT',access_type:'chatbot',source_url:'https://chatgpt.com/c/test'},turns:[{turn_id:'tutor',speaker:'tutor'}],session,assets:[{sha256:digest,mime:'image/svg+xml',bytes:Buffer.byteLength(hidden),file:'img/'+digest+'.svg'}],image_inventory:[{sha256:digest,turn_id:'tutor',section_id:'t1s2',alt:'Hidden gallery image',source:'gallery',gallery_id:'g1',position:2}]});
 await verifyPackage(pkg,{assetReader:async()=>Buffer.from(hidden)});assert.equal(pkg.turns[0].sections[1].components[0].states.length,2);assert.equal(JSON.stringify(pkg).includes('"text":'),false);assert.equal(pkg.image_inventory[0].sha256,digest);
 const requests=[];
 const fetcher=async(_url,options)=>{const input=JSON.parse(options.body).contents[0].parts[0].text;requests.push(input);const texts=JSON.parse(input);return {ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(texts.map(s=>s.replaceAll('Title','English title').replaceAll('Repeated','English heading')))}]}}]})};};
 const translated=await translateCaptureToEnglish(pkg,{apiKey:'test',fetcher});await verifyPackage(translated,{source:pkg});
 assert.equal(translated.assets[0].sha256,digest);assert.equal(translated.image_inventory[0].gallery_id,'g1');
 assert.deepEqual(translated.turns[0].sections.map(s=>s.section_id),pkg.turns[0].sections.map(s=>s.section_id));
 assert.equal(translated.turns[0].sections[1].heading,'English heading');assert.equal(translated.turns[0].sections[1].components[0].states[1].state_id,'t1s2c1v2');
 assert.ok(requests.every(s=>!s.includes('<button')));
 const rendered=await withCaptureDOM(page=>page.evaluate(pkg=>globalThis.CaptureSections.renderHtmlDocument(pkg,{supportingViews:true,turnId:'tutor'}),translated));
 assert.match(rendered,/SUPPORTING VIEW: t1s2 \/ t1s2c1/);assert.match(rendered,/Question 2 of 2/);
 const draft=structuredClone(pkg);draft.status='draft';draft.version_hash=packageHash(draft);await assert.rejects(verifyPackage(draft),/incomplete/);
 const broken=structuredClone(pkg);broken.turns[0].sections[1].components[0].states[0].html+='changed';broken.version_hash=packageHash(broken);await assert.rejects(verifyPackage(broken),/state hash/);
 const badFetcher=async(_url,options)=>{const texts=JSON.parse(JSON.parse(options.body).contents[0].parts[0].text);return {ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(texts.map(s=>s.replaceAll('2','99')))}]}}]})};};
 await assert.rejects(translateCaptureToEnglish(pkg,{apiKey:'test',fetcher:badFetcher}),/misaligned/);
});
