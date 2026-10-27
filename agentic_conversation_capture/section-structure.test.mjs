import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';import path from 'node:path';import os from 'node:os';
import {withCaptureDOM,packageHash} from './html-sections.mjs';
import {checkSectionStructure,requireSectionStructure,graphStructureInputs} from './section-structure.mjs';
import {uploadHtmlPackage} from './upload-html.mjs';
import {htmlFixture} from '../annotation-portal/tests/fixtures/html-conversation.ts';
import {repairSectionDraft,canRepairSectionDraft} from './repair-section-draft.mjs';

const symbols=['Be','Mg','Ca','Sr','Ba','Ra'];
const grid='<h2>Elements</h2><div data-d-component="grid">'+symbols.map(symbol=>`<div data-d-component="grid-item"><p>Element</p><h1>${symbol}</h1><p>Two outer electrons</p></div>`).join('')+'</div><p>Shared explanation.</p><h2>Reactions</h2><p>React with water.</p>';
const trends='<h2>Periodic trends</h2><div data-d-component="box" data-d-has-border><p>Down Group 2</p><div data-d-component="row"><div data-d-component="box">'+symbols.slice(0,5).map(s=>`<h3>${s}</h3>`).join('')+'</div><div><p>Radius increases</p><p>Ionization energy decreases</p></div></div></div><h2>Reactions</h2><p>React with water.</p>';

test('automatic repair handles only recognized unpublished split-block failures',()=>{
 const error={code:'section_structure_invalid',report:{issues:[{code:'boundary_inside_block'},{code:'block_not_preserved'}]}};
 assert.equal(canRepairSectionDraft(error,{media:{}}),true);
 for(const job of [{package:{}},{receipt:{}},{media:{turns:[{}]}}])assert.equal(canRepairSectionDraft(error,job),false);
 assert.equal(canRepairSectionDraft(error,{},false),false);
 assert.equal(canRepairSectionDraft({...error,report:{issues:[{code:'content_changed'},{code:'boundary_inside_block'}]}},{}),false);
 assert.equal(canRepairSectionDraft({...error,report:{issues:[{code:'isolated_unit_label'}]}},{}),false);
});

async function freeze(html,legacy=false){return withCaptureDOM(page=>page.evaluate(({html,legacy})=>{const root=document.createElement('div');root.innerHTML=html;document.body.append(root);CaptureSections.freezeTurn(root,1,legacy);return {turn_number:1,source_html:root.outerHTML,sections:CaptureSections.snapshotTurn(root,1).sections};},{html,legacy}));}
async function temporary(action){const directory=await mkdtemp(path.join(os.tmpdir(),'section-structure-'));try{return await action(directory);}finally{const resolved=path.resolve(directory);if(!resolved.startsWith(path.resolve(os.tmpdir())+path.sep+'section-structure-'))throw Error('Unexpected test cleanup path.');await rm(resolved,{recursive:true,force:true});}}

test('rejects the original element-grid and stacked trend-label failures; accepts intact sections',async()=>{
 for(const html of [grid,trends]){
  const broken=await freeze(html,true),fixed=await freeze(html);
  const rejected=await checkSectionStructure([broken]);assert.equal(rejected.passed,false);assert.ok(rejected.issues.some(i=>i.code==='boundary_inside_block'));
  assert.equal(fixed.sections.length,2);assert.equal((await requireSectionStructure([fixed])).passed,true);
  assert.match(fixed.sections[0].html,/Be/);assert.match(fixed.sections[0].html,/Ba/);
 }
});
test('bordered document wrappers allow real headings; tables, lists, media and repeated blocks stay intact',async()=>{
 const html='<div data-d-component="box" data-d-has-border><h2>First</h2><table><tr><td>Value</td></tr></table><ul><li><strong>List label</strong> Example</li></ul><figure><img alt="same diagram" src="/a.png"></figure><figure><img alt="same diagram" src="/a.png"></figure><h3>Second</h3><p>Real subsection.</p></div>';
 const input=await freeze(html);assert.equal(input.sections.length,2);assert.equal((await requireSectionStructure([input])).passed,true);
 const missing=structuredClone(input);missing.sections[0].html=missing.sections[0].html.replace('<img alt="same diagram" src="/a.png">','');assert.equal((await checkSectionStructure([missing])).passed,false);
 const duplicated=structuredClone(input);duplicated.sections[1].html+=duplicated.sections[0].html;assert.equal((await checkSectionStructure([duplicated])).passed,false);
});
test('detects partial blocks even with stripped boundary markers, and caches reports against input hashes',async()=>{
 const input=await freeze(grid,true);input.source_html=input.source_html.replace(/ data-capture-section-start="\d+"/g,'');for(const s of input.sections)s.html=s.html.replace(/ data-capture-section-start="\d+"/g,'');
 const broken=await checkSectionStructure([input]);assert.equal(broken.passed,false);assert.ok(broken.issues.some(i=>i.code==='block_not_preserved'));
 const fixed=await freeze(grid);await temporary(async dir=>{const reportFile=path.join(dir,'report.json');assert.equal((await requireSectionStructure([fixed],{reportFile})).cache_hit,false);assert.equal((await requireSectionStructure([fixed],{reportFile})).cache_hit,true);fixed.sections[0].html+='<p>Unexpected duplicate</p>';await assert.rejects(requireSectionStructure([fixed],{reportFile}),/needs review/);assert.equal(JSON.parse(await readFile(reportFile)).passed,false);});
});
test('blocks direct uploads before any Storage or database requests',async()=>{
 await temporary(async dir=>{const pkg=htmlFixture(),s=pkg.turns[1].sections[0];s.html='<h2 data-capture-section-start="1">Be</h2>';s.heading='Be';s.components=[];pkg.version_hash=packageHash(pkg);const file=path.join(dir,'bad.json');await writeFile(file,JSON.stringify(pkg));let calls=0;
  await assert.rejects(uploadHtmlPackage(file,{supabaseUrl:'https://example.test',headers:{},userId:'admin',request:async()=>{calls++;throw Error('Must not be called');}}),/unit label/);assert.equal(calls,0);
 });
});
test('export validation retains source inventory and rejects changed tutor-turn coverage',()=>{
 const initial={id:'initial',html:'<h2>Title</h2>',section_layout:{sections:[{section_id:'t1s1',html:'<h2>Title</h2>'}]}};
 const graph={messages:[{initial:'initial',states:[initial]}]};assert.equal(graphStructureInputs(graph)[0].source_html,initial.html);assert.throws(()=>graphStructureInputs(graph,{turns:[]}),/inventory/);
});
test('explicit repair preserves the original draft and content, maps old IDs, and passes the same gate',async()=>{
 for(const html of [grid,trends]){
  const broken=await freeze(html,true),original={formatVersion:'agent-interactions/1',messages:[{initial:'initial',states:[{id:'initial',html:broken.source_html,section_layout:{sections:broken.sections,boundary_count:broken.sections.length}}],transitions:[]}],actions:[]},before=JSON.stringify(original);
  const result=await repairSectionDraft(original);assert.equal(JSON.stringify(original),before);assert.equal(result.report.passed,true);assert.equal(result.graph.messages[0].states[0].section_layout.sections.length,2);assert.ok(result.repair.removed_boundaries>0);
  for(const section of broken.sections)assert.ok(result.repair.section_id_map[section.section_id]);
  const again=await repairSectionDraft(result.graph);assert.equal(again.repair.removed_boundaries,0);assert.deepEqual(again.graph.messages[0].states[0].section_layout.sections,result.graph.messages[0].states[0].section_layout.sections);
 }
 const explored={messages:[{states:[{},{}],transitions:[]}],actions:[]};await assert.rejects(repairSectionDraft(explored),/unexplored draft/);
});
