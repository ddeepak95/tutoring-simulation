import {expect,test} from '@playwright/test';
import {backend,ids,login} from './mock';

test('marker-free labeling shows only the 14 selected labels and no section markers',async({page})=>{
 const state=await backend(page),document=state.documents[0];
 Object.assign(document.transcript,{conversation_id:ids.doc,access_type:'API',original_language:'en'});
 state.conversationVersions.push({conversation_id:ids.doc,version_key:'marker-free-v1',section_mode:'none',transcript:structuredClone(document.transcript)});
 const quote='Wet clothes drying',start=document.transcript.messages[0].text.indexOf(quote);
 state.versionLabelRuns.push({id:'00000000-0000-4000-8000-000000000090',conversation_id:ids.doc,version_key:'marker-free-v1',status:'completed',model:'gemini-3.8-flash',prompt_version:'marker-free-occurrences/1',annotations:[{feature:'examples',turn_id:'t1',quote,occurrence:1,reason:null,start,end:start+quote.length}],counts:{examples:1},error:null,created_at:new Date().toISOString()});
 await login(page,'admin');await page.goto(`/conversations/${ids.doc}/labeling`);
 await expect(page.getByText('Marker-free labeling')).toBeVisible();
 await expect(page.getByText('14 features')).toBeVisible();
 await expect(page.getByText('Examples: 1')).toBeVisible();
 await expect(page.locator('mark[data-feature-keys="examples"]')).toContainText(quote);
 await expect(page.locator('.section-annotation-boundary')).toHaveCount(0);
 await expect(page.getByText('Diagrams & Illustrations')).toHaveCount(0);
 await expect(page.getByText('Mathematical Notation')).toHaveCount(0);
});
