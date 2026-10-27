import {test,expect} from '@playwright/test';
import {renderLLMTurns} from '../../scripts/render-llm-turns.mjs';
import {backend,ids,login} from './mock';
import fs from 'node:fs';

test('assigns supporting interaction states to the original section using their originating controls',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {deriveSectionStates}=await import('/src/section-states.ts');
  const {sanitizeCapturedHtml}=await import('/src/capture-document.ts');
  const {mapCapturedArticle}=await import('/src/captured-sections.ts');
  const base='<h2>First</h2><p>Quiz one</p><button data-capture-agent-control="0">Next</button><h2>Second</h2><p>Quiz two</p><button data-capture-agent-control="1">Next</button>';
  const primary=sanitizeCapturedHtml(base).text;
  const text=primary+'\n\nAgent-explored interactive state state_1 (capture action, not a learner response):\nAnother question.\n\nAgent-explored interactive state state_2 (capture action, not a learner response):\nFeedback.';
  const article=document.createElement('article');article.innerHTML=base;document.body.append(article);
  const roots=mapCapturedArticle(article,text).map((m,i)=>({conversation_id:'test',section_id:`t1s${i+1}`,turn_id:'t',turn_number:1,section_number:i+1,...m.offsets,quote:text.slice(m.offsets!.start,m.offsets!.end),occurrence:1,source_hash:'fixed'}));
  const html=base+'<section data-capture-derived-state="state_1" data-capture-owner-control="0"><p>Another question.</p></section><section data-capture-derived-state="state_2" data-capture-owner-control="1"><p>Feedback.</p></section>';
  const conversation={conversation_id:'test',messages:[{turn_id:'t',speaker:'tutor',text}]};
  const states=deriveSectionStates(conversation,roots,{t:html});
  let ambiguous=false;try{deriveSectionStates(conversation,roots,{t:html.replaceAll(/ data-capture-owner-control="[01]"/gu,'')});}catch{ambiguous=true;}
  return {states,ambiguous};
 });
 expect(result.states.map((s:any)=>s.section_id)).toEqual(['t1s1','t1s2']);expect(result.ambiguous).toBe(true);
});

test('renders repeated sections, introductory content, lists, SVG and equations into non-overlapping turn tiles',async({},testInfo)=>{
 const text='Intro.\n\nTitle\nRepeated. x = 2.\nCaptured diagram\n\nTitle\nRepeated. x = 2.';
 const starts=[0,text.indexOf('Title'),text.lastIndexOf('Title')],ends=[6,text.lastIndexOf('Title')-2,text.length];
 const conversation={conversation_id:'test',messages:[{turn_id:'t',speaker:'tutor',text}]};
 const sections=starts.map((start,i)=>({conversation_id:'test',turn_id:'t',turn_number:1,section_number:i+1,section_id:`t1s${i+1}`,start,end:ends[i],quote:text.slice(start,ends[i]),occurrence:i===2?2:1,source_hash:'test'}));
 const html='<article class="capture-message" data-turn-id="t"><p>Intro.</p><h2>Title</h2><ul><li>Repeated. x = 2.</li></ul><svg width="20" height="20"><circle cx="10" cy="10" r="8"/></svg><div style="height:2100px"></div><h3>Title</h3><p>Repeated. x = 2.</p></article>';
 const args={conversation,sections,html,assets:{t:html},folder:testInfo.outputPath('images'),origin:'http://127.0.0.1:5174'};
 const turns=await renderLLMTurns(args);
 expect(turns[0].sections.map((s:any)=>s.section_id)).toEqual(['t1s1','t1s2','t1s3']);
 expect(turns[0].tiles.length).toBeGreaterThan(1);
 expect(turns[0].tiles[0]).toMatchObject({width:1200,height:2000});
 await expect(renderLLMTurns({...args,sections:[{...sections[0],start:1},...sections.slice(1)]})).rejects.toThrow(/permanent registry/);
 const broken=html.replace(/<svg[\s\S]*?<\/svg>/u,'<img alt="Captured diagram" src="data:image/png;base64,invalid">');
 await expect(renderLLMTurns({...args,html:broken,assets:{t:broken}})).rejects.toThrow(/image/);
});

test('reviews, reloads and exports model evidence with section quantities',async({page})=>{
 const snapshot=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));
 const state=await backend(page,snapshot);
 state.documents[0].transcript.messages[0].text='One example.';
 state.sections.push({conversation_id:ids.doc,section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end:12,quote:'One example.',occurrence:1,source_hash:'test'});
 const annotations=[{id:'ex',feature:'examples',section_id:'t1s1',entry:{category:'Content',count:3},llm_evidence:'Three worked examples.'},{id:'eq',feature:'equations',section_id:'t1s1',entry:{category:'Textual Representations',count:2},llm_evidence:'Two displayed formulas.'}];
 state.baselines.push({id:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',conversation_id:ids.doc,rubric_hash:snapshot.rubric_sha256,annotations,model:'gemini-4-argon',prompt_version:'turn-image-counts/1',prompt:'image prompt',prompt_sha256:'a'.repeat(64),transcript_sha256:'b'.repeat(64),generation_config:{input_mode:'turn-images/1'},created_by:ids.admin,created_at:new Date().toISOString()});
 await login(page,'admin');await page.goto(`/conversations/${ids.doc}/baselines`);
 await page.getByText('LLM count evidence',{exact:true}).click();await expect(page.getByText('Three worked examples.',{exact:false})).toBeVisible();
 await page.reload();await page.getByText('LLM count evidence',{exact:true}).click();await expect(page.getByText('Two displayed formulas.',{exact:false})).toBeVisible();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export baseline',exact:true}).click();
 const file=await (await download).path();const exported=JSON.parse(fs.readFileSync(file!,'utf8'));
 expect(exported.baseline.annotations).toEqual(annotations);expect(exported.sections[0].section_id).toBe('t1s1');
});
