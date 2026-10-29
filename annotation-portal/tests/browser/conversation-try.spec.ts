import {expect,test} from '@playwright/test';
import {backend,ids,login} from './mock';

test('conversation view shows listing try numbers and translations inherit their source try after refresh',async({page})=>{
 const state=await backend(page),original=state.documents[0] as any;
 Object.assign(original,{language:'ta',topic_id:'brain',generic_topic_name:'Brain',created_at:'2026-01-01'});
 Object.assign(original.transcript,{conversation_id:ids.doc,topic_id:'brain',provider:'GPT',original_language:'ta'});
 const second={...structuredClone(original),id:'00000000-0000-4000-8000-000000000092',created_at:'2026-02-01'};second.transcript.conversation_id=second.id;
 const translation={...structuredClone(original),id:'00000000-0000-4000-8000-000000000099',language:'en',source_conversation_id:ids.doc,created_at:'2026-03-01'};translation.transcript.conversation_id=translation.id;translation.transcript.source_conversation_id=ids.doc;
 state.documents.push(second,translation);
 await login(page,'admin',{expandTopic:false});
 await page.goto(`/conversations/${second.id}`);
 await expect(page.locator('.conversation-try-info')).toHaveText('Try 2 of 2');
 await page.reload();await expect(page.locator('.conversation-try-info')).toHaveText('Try 2 of 2');
 await page.goto(`/conversations/${translation.id}`);
 await expect(page.locator('.conversation-try-info')).toHaveText('Try 1 of 2 · Translation');
 await page.getByRole('navigation',{name:'Conversation navigation'}).getByRole('link',{name:'GPT / Tamil',exact:true}).click();
 await expect(page.locator(`[data-conversation-id="${ids.doc}"] .attempt-number`)).toContainText('Try 1');
 await expect(page.locator(`[data-conversation-id="${second.id}"] .attempt-number`)).toContainText('Try 2');
 expect(state.saves).toBe(0);
});
