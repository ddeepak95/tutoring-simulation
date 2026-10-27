import {test,expect} from '@playwright/test';
import {backend,login} from './mock';
test('loads topic names first, caches expanded topics, and retries a failed topic independently',async({page})=>{
 const state=await backend(page);state.documents[0].topic_id='brain';state.documents[0].generic_topic_name='Brain';state.documents[0].transcript.topic_id='brain';
 state.documents.push({...structuredClone(state.documents[0]),id:'00000000-0000-4000-8000-000000000090',label:'Heart',topic_id:'heart',generic_topic_name:'Heart',transcript:{...structuredClone(state.documents[0].transcript),topic_id:'heart',learning_topic:'Heart'}});
 const loaded:string[]=[];let failHeart=true;
 await page.route('**/rest/v1/rpc/dashboard_topic_conversations**',async route=>{
  const key=route.request().postDataJSON().p_topic_key;loaded.push(key);
  if(key==='heart'&&failHeart){failHeart=false;await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({message:'Temporary topic load failure'})});}else await route.fallback();
 });
 await login(page,'admin',{expandTopic:false});
 await expect(page.locator('.topic-group-heading h2')).toHaveText(['Brain','Heart']);
 expect(loaded).toEqual([]);expect(state.requests).not.toContain('/rest/v1/assignments');
 await expect(page.locator('.conversation-table tbody tr')).toHaveCount(0);
 const brain=page.locator('.topic-group').filter({has:page.getByRole('heading',{name:'Brain',exact:true})});
 await brain.locator('summary').click();await expect(brain.locator('tbody tr')).toHaveCount(1);expect(loaded).toEqual(['brain']);
 await brain.locator('summary').click();await brain.locator('summary').click();expect(loaded).toEqual(['brain']);
 const heart=page.locator('.topic-group').filter({has:page.getByRole('heading',{name:'Heart',exact:true})});
 await heart.locator('summary').click();await expect(heart.getByRole('alert')).toContainText('Temporary topic load failure');
 await heart.getByRole('button',{name:'Retry loading conversations'}).click();await expect(heart.locator('tbody tr')).toHaveCount(1);
 expect(loaded).toEqual(['brain','heart','heart']);
 await expect(page.getByLabel('Select all loaded conversations')).toBeEnabled();
});
