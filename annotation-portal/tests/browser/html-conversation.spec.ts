import {test,expect} from '@playwright/test';
import {htmlFixture,captureHash} from '../fixtures/html-conversation';
import {backend,ids,login} from './mock';
import fs from 'node:fs';
import {renderLLMTurns} from '../../scripts/render-llm-turns.mjs';
const rubric=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));

test('HTML labels survive replay, save and reload without source offsets',async({page})=>{
 const state=await backend(page,rubric),pkg=htmlFixture();
 state.documents[0].transcript={conversation_id:ids.doc,label:'HTML pilot',learning_topic:'HTML pilot',messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg} as any;
 await login(page,'alice');await page.getByRole('region',{name:'Label instructional features'}).locator('.assignment-row').click();
 const frame=page.frameLocator('iframe[title="Captured HTML conversation"]');
 const panel=page.getByRole('complementary',{name:'Section labeling',exact:true});
 await frame.locator('.html-section-caption').click();
 await expect(panel.getByRole('heading',{level:2})).toHaveText('Turn 1 - Section 1t1s1');
 await panel.getByRole('spinbutton',{name:'Examples count',exact:true}).fill('3');
 await panel.getByRole('spinbutton',{name:'Mathematical Notation count',exact:true}).fill('2');
 await expect.poll(()=>state.assignments[0].annotations.length).toBe(2);
 expect(state.assignments[0].annotations[0]).not.toHaveProperty('evidence');
 await frame.getByRole('button',{name:'Next',exact:true}).click();
 await expect(frame.locator('.html-section-content')).toContainText('Question 2 of 2');
 await expect(frame.locator('.html-section')).toHaveClass(/is-selected/);
 await expect(panel.getByRole('spinbutton',{name:'Examples count',exact:true})).toHaveValue('3');
 await expect(frame.getByRole('img',{name:'Examples: 3',exact:true})).toBeVisible();
 await page.reload({waitUntil:'domcontentloaded'});await frame.locator('.html-section-button').click();
 await expect(panel.getByRole('spinbutton',{name:'Mathematical Notation count',exact:true})).toHaveValue('2');
 await panel.getByRole('spinbutton',{name:'Examples count',exact:true}).fill('0');
 await expect.poll(()=>state.assignments[0].annotations.length).toBe(1);
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('image rendering uses persisted HTML sections and component supporting views',async({},info)=>{
 const pkg=htmlFixture();
 // Desktop-sized decorative table borders must not widen the rendered turn.
 pkg.turns[1].sections[0].html+='<div data-d-component="table" style="position:relative"><table><tbody><tr><td>Visible table content</td></tr></tbody></table><div aria-hidden="true" style="position:absolute;left:0;top:0;width:1559px;height:147px"></div></div>';
 pkg.version_hash=captureHash(pkg);
 const conversation={messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg};
 const sections=pkg.turns.flatMap(t=>t.sections.map(s=>({...s,turn_id:t.turn_id})));
 const result=await renderLLMTurns({conversation,sections,assets:{},folder:info.outputPath('images'),origin:'http://127.0.0.1:5174'});
 expect(result).toHaveLength(1);expect(result[0].sections).toEqual([{section_id:'t1s1',name:'Turn 1 - Section 1',heading:'Quiz'}]);expect(result[0].tiles[0].width).toBe(1200);
});

test('conversation preview hides section controls and preserves HTML interactions and text selection',async({page})=>{
 const state=await backend(page,rubric),pkg=htmlFixture();
 pkg.turns[1].sections.push({section_id:'t1s2',turn_number:1,section_number:2,heading:'Quiz',html:'<h2>Quiz</h2><p>Other section.</p>',components:[]});pkg.version_hash=captureHash(pkg);
 state.documents[0].transcript={conversation_id:ids.doc,label:'HTML pilot',learning_topic:'HTML pilot',messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg} as any;
 await login(page,'admin');await page.goto('/conversations/'+ids.doc);
 const frame=page.frameLocator('iframe[title="Captured HTML conversation"]');await expect(frame.locator('.html-section')).toHaveCount(2);
 await expect(frame.locator('.html-section').first()).toContainText('What is 2 + 2?');
 await expect(frame.locator('.html-speaker-label')).toHaveText(['You','Bot']);
 await expect(frame.locator('.html-section-caption,.html-section-button,.section-item-badges')).toHaveCount(0);
 expect(await frame.locator('.html-section').first().evaluate(el=>({border:getComputedStyle(el).borderTopWidth,padding:getComputedStyle(el).paddingTop,margin:getComputedStyle(el).marginTop}))).toEqual({border:'0px',padding:'0px',margin:'0px'});
 await frame.getByRole('button',{name:'Next',exact:true}).click();
 await expect(frame.locator('.html-section-content').first()).toContainText('Question 2 of 2');
 await frame.locator('.html-section-content').first().evaluate(el=>{const doc=el.ownerDocument,range=doc.createRange();range.selectNodeContents(el);range.setEndAfter(doc.querySelectorAll('.html-section-content')[1]);const selection=doc.getSelection()!;selection.removeAllRanges();selection.addRange(range);doc.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));});
 expect(await frame.locator('body').evaluate(el=>el.ownerDocument.getSelection()?.isCollapsed)).toBe(false);
 expect(state.assignments.every(a=>a.annotations.length===0)).toBe(true);
});

test('unassigned HTML rating preview needs no marker-free version and navigates tutor turns without section controls',async({page})=>{
 const state=await backend(page,rubric),pkg=htmlFixture();
 pkg.turns.push({...structuredClone(pkg.turns[0]),turn_id:'student_2'}, {...structuredClone(pkg.turns[1]),turn_id:'tutor_2',sections:[{section_id:'t2s1',turn_number:2,section_number:1,heading:null,html:'<p>Second tutor response.</p>',components:[]}]});
 pkg.version_hash=captureHash(pkg);
 state.documents[0].transcript={conversation_id:ids.doc,label:'HTML pilot',learning_topic:'HTML pilot',messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg} as any;
 state.assignments=[];
 await login(page,'admin');await page.goto('/conversations/'+ids.doc+'/rating');
 await expect(page.getByRole('heading',{name:'No ratings yet'})).toBeVisible();
 const panel=page.getByLabel('Tutor turn ratings');
 await expect(panel).toContainText('Topic Introduction and Learner Engagement');
 const frame=page.frameLocator('iframe[title="Captured HTML conversation"]');
 await expect(frame.locator('.html-turn:visible')).toHaveCount(2);
 await expect(frame.locator('.html-section-caption,.html-section-button,.section-item-badges')).toHaveCount(0);
 await frame.getByRole('button',{name:'Next',exact:true}).click();
 await expect(frame.locator('.html-section-content').first()).toContainText('Question 2 of 2');
 await panel.getByRole('button',{name:'Next',exact:true}).first().click();
 await expect(frame.locator('.html-turn:visible')).toHaveCount(2);
 await expect(frame.locator('article[data-turn-id="tutor_2"]')).toBeVisible();
 await expect(frame.locator('article[data-turn-id="tutor_2"]')).toContainText('Second tutor response.');
 await expect(panel).toContainText('Addressing Follow-Up Questions');
 expect(state.assignments).toHaveLength(0);
});

test('HTML model ratings retain run history and switch independently from human ratings',async({page})=>{
 const state=await backend(page,rubric),pkg=htmlFixture();
 state.documents[0].transcript={conversation_id:ids.doc,label:'HTML pilot',learning_topic:'HTML pilot',messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg} as any;
 state.assignments[0].task_type='rate';
 const before=JSON.stringify(state.assignments);
 const values=(score:number,reason:string)=>[{turn_id:pkg.turns[1].turn_id,values:Object.fromEntries(rubric.rating_dimensions.filter((d:any)=>!d.subsequent_only).map((d:any)=>[d.key,{score,reason}]))}];
 state.htmlRatingRuns.push(
  {id:'html-new',conversation_id:ids.doc,capture_version_hash:pkg.version_hash,model:'gemini-4-argon',prompt_version:'html-turn-screenshot-ratings/2',status:'completed',created_at:'2026-10-30T12:00:00Z',rubric_hash:rubric.rubric_sha256,rubric_snapshot:rubric,ratings:values(4,'Current model reason.')},
  {id:'html-old',conversation_id:ids.doc,capture_version_hash:pkg.version_hash,model:'gemini-4-argon',prompt_version:'html-turn-screenshot-ratings/1',status:'completed',created_at:'2026-10-30T11:00:00Z',rubric_hash:rubric.rubric_sha256,rubric_snapshot:rubric,ratings:values(2,'Older model reason.')},
  {id:'html-stale',conversation_id:ids.doc,capture_version_hash:'0'.repeat(64),model:'stale-capture-model',prompt_version:'html-turn-screenshot-ratings/1',status:'completed',created_at:'2026-10-30T10:00:00Z',rubric_hash:rubric.rubric_sha256,rubric_snapshot:rubric,ratings:values(5,'Wrong capture.')}
 );
 await login(page,'admin');await page.goto('/conversations/'+ids.doc+'/rating',{waitUntil:'domcontentloaded'});
 const source=page.getByLabel('Rating source');await expect(source).toHaveValue('model:html-new');
 const panel=page.getByLabel('Tutor turn ratings');
 await expect(panel).toContainText('Current model reason.');
 await expect(panel.locator('.rating-readonly-option.selected').first()).toContainText('4');
 await expect(source.locator('option')).toHaveCount(3);
 await source.selectOption('model:html-old');await expect(panel).toContainText('Older model reason.');
 await source.selectOption('assignment:'+ids.a);await expect(panel).not.toContainText('model reason.');
 expect(JSON.stringify(state.assignments)).toBe(before);
 expect(state.saves).toBe(0);
});

test('long HTML tutor turns scroll when the pointer is inside the captured conversation',async({page})=>{
 const state=await backend(page,rubric),pkg=htmlFixture();
 pkg.turns[1].sections[0].html+='<p>A longer explanation with additional context.</p>'.repeat(100);
 pkg.version_hash=captureHash(pkg);
 state.documents[0].transcript={conversation_id:ids.doc,label:'Long HTML rating',learning_topic:'Long HTML rating',messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg} as any;
 state.assignments=[];
 await login(page,'admin');await page.goto('/conversations/'+ids.doc+'/rating',{waitUntil:'domcontentloaded'});
 const iframe=page.locator('iframe[title="Captured HTML conversation"][aria-busy="false"]');
 await expect(iframe).toBeVisible();
 const exchange=page.getByTestId('rating-exchange');
 await expect.poll(()=>exchange.evaluate(el=>el.scrollHeight>el.clientHeight)).toBe(true);
 const panel=page.getByLabel('Tutor turn ratings');
 const panelScroll=await panel.evaluate(el=>el.scrollTop);
 const box=await iframe.boundingBox();
 await page.mouse.move(box!.x+100,box!.y+100);
 await page.mouse.wheel(0,600);
 await expect.poll(()=>exchange.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
 expect(await panel.evaluate(el=>el.scrollTop)).toBe(panelScroll);
});

test('HTML translations are grouped with their original-language capture in the listing',async({page})=>{
 const state=await backend(page,rubric),source=htmlFixture(),english=structuredClone(source);
 english.metadata.language='en';english.source_version={capture_id:source.capture_id,version_hash:source.version_hash,language:'ta'};
 const transcript=(id:string,pkg:any)=>({conversation_id:id,label:'Covalent Radius',learning_topic:'Covalent Radius',messages:pkg.turns.map((t:any)=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content:pkg});
 state.documents[0].transcript=transcript(ids.doc,source) as any;state.documents[0].language='ta';
 state.documents.push({id:'00000000-0000-4000-8000-000000000030',label:'Covalent Radius English',language:'en',source_conversation_id:ids.doc,transcript:transcript('00000000-0000-4000-8000-000000000030',english),created_at:new Date().toISOString()} as any);
 await login(page,'admin');
 const row=page.getByRole('row').filter({has:page.getByText('English translation',{exact:true})});
 await expect(row).toBeVisible();
 await expect(page.getByRole('heading',{level:1,name:/Tamil/})).toBeVisible();
 await expect(row.getByRole('link',{name:'Covalent Radius',exact:true})).toHaveAttribute('href',`/conversations/${ids.doc}/labeling`);
 await expect(row.locator('.conversation-translation').getByRole('link',{name:'View',exact:true})).toHaveAttribute('href','/conversations/00000000-0000-4000-8000-000000000030');
});

test('preserves original CSS variable borders, spacing, images and SVG icon geometry',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {sanitizeCapturedHtml}=await import('/src/capture-document.ts');
  const html='<div style="--color-border:rgb(80,90,100);--gap:12px;border:1px solid var(--color-border);padding:var(--gap);display:grid;grid-template-columns:2fr 1fr"><svg width="20" height="20" viewBox="0 0 20 20"><use href="/cdn/assets/icons-e9a2d32ff966b3f4.svg#codex-icon-bookmark-light-20"/></svg><svg viewBox="0 0 20 20"><path d="M1 1L10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" transform="translate(1 2)"/></svg><img src="https://example.com/image.png" class="original-image" style="width:40px;border-radius:8px" alt="Original image"><script>throw Error("unsafe")</script></div>';
  const safe=sanitizeCapturedHtml(html,{preserveLayout:true});document.body.replaceChildren(safe.root);
  const box=safe.root.firstElementChild as HTMLElement,path=box.querySelector('path')!,image=box.querySelector('img')!;
  return {border:getComputedStyle(box).borderTopWidth,padding:getComputedStyle(box).paddingTop,columns:box.style.gridTemplateColumns,href:box.querySelector('use')?.getAttribute('href'),stroke:path.getAttribute('stroke-width'),transform:path.getAttribute('transform'),imageClass:image.className,caption:box.querySelector('figcaption')!==null,scripts:box.querySelectorAll('script').length};
 });
 expect(result).toMatchObject({border:'1px',padding:'12px',columns:'2fr 1fr',href:'/cdn/assets/icons-e9a2d32ff966b3f4.svg#codex-icon-bookmark-light-20',stroke:'2',transform:'translate(1 2)',imageClass:'original-image',caption:false,scripts:0});
 const pkg=htmlFixture();pkg.styles='[data-theme="light"]{--color-border:rgba(0,0,0,.1)}';
 pkg.svg_sprites={'/cdn/assets/test.svg':'<svg xmlns="http://www.w3.org/2000/svg"><symbol id="bookmark" viewBox="0 0 20 20"><path d="M1 1H15V15H1Z"/></symbol></svg>'};
 pkg.turns[1].sections[0].html+='<div class="original-border" style="border:1px solid var(--color-border)"><svg width="20" height="20"><use href="/cdn/assets/test.svg#bookmark"/></svg></div>';
 const rendered=await page.evaluate(async pkg=>{const {renderHtmlDocument}=await import('/src/html-renderer.ts');return renderHtmlDocument(pkg);},pkg);
 await page.setContent(rendered);
 expect(await page.locator('.original-border').evaluate(el=>getComputedStyle(el).borderTopWidth)).toBe('1px');
 expect(await page.locator('.original-border use').getAttribute('href')).toBe('#capture-sprite-0-bookmark');
 expect(await page.locator('.original-border use').evaluate(el=>(el as SVGGraphicsElement).getBBox().width)).toBeGreaterThan(0);
});

test('matches ChatGPT typography and right-aligns the user message without stretching it',async({page})=>{
 const pkg=htmlFixture();
 pkg.styles=':root{--codex-chat-font-size:13px;--font-heading-lg-size:1.5rem}.MarkdownRoot-test{font-size:var(--codex-chat-font-size);line-height:1.625}.Title-test{font-size:var(--font-heading-lg-size);line-height:28px}';
 pkg.turns[1].sections[0].html=pkg.turns[1].sections[0].html.replace('<h2>','<h2 class="Title-test" data-d-size="lg">');
 await page.goto('/');const html=await page.evaluate(async pkg=>{const {renderHtmlDocument}=await import('/src/html-renderer.ts');return renderHtmlDocument(pkg);},pkg);await page.setContent(html);
 const result=await page.evaluate(()=>{const root=document.querySelector('.html-section-content')!,paragraph=root.querySelector('p')!,heading=root.querySelector('h2')!,bubble=document.querySelector('.html-student-content')!.firstElementChild!,parent=bubble.parentElement!;return {font:getComputedStyle(paragraph).fontSize,line:getComputedStyle(paragraph).lineHeight,heading:getComputedStyle(heading).fontSize,rightGap:parent.getBoundingClientRect().right-bubble.getBoundingClientRect().right,stretched:bubble.getBoundingClientRect().width>=parent.getBoundingClientRect().width,labelAlign:getComputedStyle(document.querySelector('[data-speaker="student"] .html-speaker-label')!).textAlign};});
 expect(result).toMatchObject({font:'16px',line:'26px',heading:'18px',rightGap:0,stretched:false,labelAlign:'right'});
});
