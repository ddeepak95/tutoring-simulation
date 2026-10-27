import {test,expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import {backend,ids,login} from './mock';
import {htmlFixture} from '../fixtures/html-conversation';
const rubric=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));
test('file-backed captures load on demand and preserve section labeling after reload',async({page})=>{
 const state=await backend(page,rubric),pkg=htmlFixture(),bytes=JSON.stringify(pkg);let downloads=0;
 const reference={bucket:'conversation-packages',path:`packages/${ids.admin}/${pkg.version_hash}.json`,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:Buffer.byteLength(bytes),capture_id:pkg.capture_id,version_hash:pkg.version_hash};
 state.documents[0].transcript={conversation_id:ids.doc,label:'Stored HTML',learning_topic:'Stored HTML',messages:pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,text:''})),html_content_ref:reference,html_content:{...pkg,styles:undefined,turns:pkg.turns.map(t=>({...t,html:'',sections:t.sections.map(s=>({...s,html:'',components:[]}))}))}} as any;
 await page.route(/\/storage\/v1\/object\/(?:authenticated\/)?conversation-packages\//,async route=>{downloads++;await route.fulfill({status:200,contentType:'application/json',body:bytes});});
 await login(page,'admin');await expect(page.locator('.conversation-table tbody tr')).toHaveCount(1);expect(downloads).toBe(0);
 await page.locator('.conversation-topic-link').click();
 const frame=page.frameLocator('iframe[title="Captured HTML conversation"]');await expect(frame.locator('.html-section')).toHaveCount(1);
 expect(downloads).toBe(1);
 await page.getByRole('link',{name:'Back to conversations'}).click();await page.locator('.topic-group').first().locator('summary').click();await page.locator('.conversation-topic-link').click();await expect(frame.locator('.html-section')).toHaveCount(1);expect(downloads).toBe(1);
 await page.reload();await expect(frame.locator('.html-section')).toHaveCount(1);expect(downloads).toBe(2);
});
