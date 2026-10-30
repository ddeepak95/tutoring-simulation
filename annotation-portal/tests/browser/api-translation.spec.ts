import { expect, test } from '@playwright/test';
import { backend, login } from './mock';

test('saved marker-free version hides section boxes in the conversation and paired view',async({page})=>{
  const state=await backend(page),source=state.documents[0];
  Object.assign(source.transcript,{conversation_id:source.id,access_type:'API',original_language:'ta'});
  const english:any={...structuredClone(source),id:'00000000-0000-4000-8000-000000000097',language:'en',source_conversation_id:source.id};
  Object.assign(english.transcript,{conversation_id:english.id,source_conversation_id:source.id,translation:{version:'api-english/1',sha256:'mapped',alignment:[{segment_id:'t1s1'}]}});
  english.transcript.messages=english.transcript.messages.map((turn:any,index:number)=>({...turn,text:`Translated turn ${index+1}`}));
  state.documents.push(english);
  state.sections.push({conversation_id:source.id,section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end:source.transcript.messages[0].text.length,quote:source.transcript.messages[0].text});
  for(const document of [source,english]){
    const transcript=structuredClone(document.transcript);
    if(transcript.translation)delete transcript.translation.alignment;
    state.conversationVersions.push({conversation_id:document.id,version_key:'marker-free-v1',section_mode:'none',transcript});
  }
  await login(page,'admin');await page.goto(`/conversations/${source.id}`);
  await expect(page.locator('.transcript')).toBeVisible();
  await expect(page.locator('.section-annotation-boundary')).toHaveCount(0);
  await expect(page.getByText('Turn 1 - Section 1')).toHaveCount(0);
  await page.getByRole('button',{name:'Show English side by side',exact:true}).click();
  await expect(page.locator('.api-english-comparison .api-parallel-turn')).toHaveCount(source.transcript.messages.length);
  await expect(page.locator('.api-english-comparison [data-section-id]')).toHaveCount(0);
  await expect(page.getByText('Turn 1 - Section 1')).toHaveCount(0);
  await page.goto(`/conversations/${english.id}`);
  await expect(page.locator('.section-annotation-boundary')).toHaveCount(0);
});

test('whole-conversation English translation displays by turn without section alignment',async({page})=>{
  const state=await backend(page),source=state.documents[0];
  Object.assign(source.transcript,{conversation_id:source.id,access_type:'API',original_language:'ta'});
  const english:any={...structuredClone(source),id:'00000000-0000-4000-8000-000000000098',language:'en',source_conversation_id:source.id};
  Object.assign(english.transcript,{conversation_id:english.id,source_conversation_id:source.id,translation:{version:'api-english-whole/1',sha256:'whole'}});
  english.transcript.messages=english.transcript.messages.map((turn:any,index:number)=>({...turn,text:index?'English question':'English tutor response'}));
  state.documents.push(english);
  await login(page,'admin');await page.goto(`/conversations/${source.id}`);
  await page.getByRole('button',{name:'Show English side by side',exact:true}).click();
  const paired=page.locator('.api-english-comparison');
  await expect(paired.locator('.api-parallel-turn')).toHaveCount(source.transcript.messages.length);
  await expect(paired.getByText('English tutor response')).toBeVisible();
  await page.goto(`/conversations/${english.id}`);
  await page.getByRole('button',{name:'Show English side by side',exact:true}).click();
  await expect(page.locator('.api-english-comparison .api-parallel-turn')).toHaveCount(source.transcript.messages.length);
});

test('conversation toggle shows paired source and English sections without resegmenting or saving',async({page})=>{
  const state=await backend(page);
  const source=state.documents[0];
  const original='## தலைப்பு\n\nமுதல் பகுதி.\n\n## கணக்கு\n\n\\[74/2=37\\]';
  const boundary=original.indexOf('## கணக்கு');
  source.transcript.messages=source.transcript.messages.slice(0,2);
  Object.assign(source.transcript,{conversation_id:source.id,access_type:'API',original_language:'ta',provider:'gpt-6.1-sol'});
  source.transcript.messages[0].text=original;
  source.transcript.messages[1].text='கேள்வி';
  const first='Definition without an English heading.',second='## Calculation\n\n\\[74/2=37\\]';
  const englishText=first+'\n\n'+second;
  const ranges=[{start:0,end:boundary-2},{start:boundary,end:original.length}];
  state.sections.push(...ranges.map((r,i)=>({...r,conversation_id:source.id,section_id:`t1s${i+1}`,turn_id:'t1',turn_number:1,section_number:i+1,quote:original.slice(r.start,r.end),occurrence:1,source_hash:'test'})));
  const english:any={...structuredClone(source),id:'00000000-0000-4000-8000-000000000099',language:'en',source_conversation_id:source.id};
  Object.assign(english.transcript,{conversation_id:english.id,source_conversation_id:source.id,translation:{version:'api-english/1',sha256:'test',source_messages:source.transcript.messages,alignment:ranges.map((r,i)=>({segment_id:`t1s${i+1}`,turn_id:'t1',source_start:r.start,source_end:r.end,start:i?first.length+2:0,end:i?englishText.length:first.length,kind:'section'}))}});
  english.transcript.messages[0].text=englishText;
  english.transcript.messages[1].text='Question';
  state.documents.push(english);
  const before=structuredClone(state.assignments);
  await login(page,'admin');
  await page.goto(`/conversations/${source.id}`);
  const toggle=page.getByRole('button',{name:'Show English side by side',exact:true});
  await expect(toggle).toHaveAttribute('aria-pressed','false');
  await toggle.click();
  const paired=page.locator('.api-english-comparison');
  await expect(paired.locator('[data-section-id]')).toHaveCount(2);
  const firstPair=paired.locator('[data-section-id="t1s1"]');
  await expect(firstPair.locator('[lang=ta]')).toContainText('முதல் பகுதி.');
  await expect(firstPair.locator('[lang=en]')).toHaveText(first);
  await expect(paired.locator('[data-section-id="t1s2"] .katex-display')).toHaveCount(2);
  await expect(paired.locator('.api-parallel-turn.student [lang=en]')).toHaveText('Question');
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.getByRole('button',{name:'Hide English translation',exact:true}).click();
  await expect(paired).toHaveCount(0);
  await expect(page.locator('.section-annotation-boundary')).toHaveCount(2);
  expect(state.assignments).toEqual(before);
  expect(state.saves).toBe(0);
  expect(state.requests).not.toContain('/rest/v1/rpc/register_conversation_sections');
  // The linked English conversation offers the same paired view.
  await page.goto(`/conversations/${english.id}`);
  await page.getByRole('button',{name:'Show English side by side',exact:true}).click();
  await expect(page.locator('.api-english-comparison [data-section-id]')).toHaveCount(2);
});

test('a missing English translation shows a clear message and can be toggled off',async({page})=>{
  const state=await backend(page);
  Object.assign(state.documents[0].transcript,{access_type:'API',original_language:'ta'});
  await login(page,'admin');
  await page.goto(`/conversations/${state.documents[0].id}`);
  await page.getByRole('button',{name:'Show English side by side',exact:true}).click();
  await expect(page.getByText('An English translation is not available for this conversation yet.',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Hide English translation',exact:true}).click();
  await expect(page.locator('.transcript')).toBeVisible();
  expect(state.saves).toBe(0);
});

test('stale English translations are excluded from paired views and show a retranslation notice',async({page})=>{
  const state=await backend(page);const source=state.documents[0];
  Object.assign(source.transcript,{conversation_id:source.id,access_type:'API',original_language:'ta'});
  const english:any={...structuredClone(source),id:'00000000-0000-4000-8000-000000000099',language:'en',source_conversation_id:source.id};
  Object.assign(english.transcript,{conversation_id:english.id,source_conversation_id:source.id,translation:{version:'api-english/1',sha256:'old',alignment_status:'stale'}});state.documents.push(english);
  await login(page,'admin');await page.goto(`/conversations/${source.id}`);
  await page.getByRole('button',{name:'Show English side by side',exact:true}).click();
  await expect(page.getByText('Section grouping has changed. Retranslation is needed before comparing these conversations.',{exact:true})).toBeVisible();
  await expect(page.locator('.api-english-comparison')).toHaveCount(0);
  await page.goto(`/conversations/${english.id}`);
  await expect(page.getByRole('button',{name:'Show English side by side',exact:true})).toHaveCount(0);
  await expect(page.getByText('Retranslation needed: section grouping changed. This translation uses the previous section map.',{exact:true})).toBeVisible();
  expect(state.saves).toBe(0);
});
