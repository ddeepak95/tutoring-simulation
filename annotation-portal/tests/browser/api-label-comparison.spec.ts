import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { backend, ids, login } from './mock';
const rubric=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));

test('labeling and baseline views compare mapped counts with independently selectable sources',async({page})=>{
 const state=await backend(page,rubric);
 const source=state.documents[0];
 const englishId='00000000-0000-4000-8000-000000000099';
 const original=['## விளக்கம்\n\nவிளக்கம்.','## கணக்கு\n\n\\[74/2=37\\]'];
 const translated=['## Explanation\n\nExplanation.','## Calculation\n\n\\[74/2=37\\]'];
 Object.assign(source.transcript,{conversation_id:source.id,access_type:'API',original_language:'ta',provider:'test'});
 source.transcript.messages=source.transcript.messages.slice(0,2);
 source.transcript.messages[0].text=original.join('\n\n');
 source.transcript.messages[1].text='கேள்வி';
 const english:any={...structuredClone(source),id:englishId,language:'en',source_conversation_id:source.id};
 Object.assign(english.transcript,{conversation_id:englishId,source_conversation_id:source.id,translation:{version:'api-english/1',sha256:'test',source_messages:source.transcript.messages,alignment:original.map((text,i)=>({segment_id:`t1s${i+1}`,turn_id:'t1',source_start:i?original[0].length+2:0,source_end:i?source.transcript.messages[0].text.length:original[0].length,start:i?translated[0].length+2:0,end:i?translated.join('\n\n').length:translated[0].length,kind:'section'}))}});
 english.transcript.messages[0].text=translated.join('\n\n');english.transcript.messages[1].text='Question';
 state.documents.push(english);
 for(const [document,texts] of [[source,original],[english,translated]] as const){
   state.sections.push(...texts.map((text,i)=>({conversation_id:document.id,section_id:`t1s${i+1}`,turn_id:'t1',turn_number:1,section_number:i+1,start:i?texts[0].length+2:0,end:i?texts.join('\n\n').length:texts[0].length,quote:text,occurrence:1,source_hash:'test'})));
 }
 const baseline=(id:string,conversation_id:string,count:number)=>({id,conversation_id,rubric_hash:rubric.rubric_sha256,model:'test/model',prompt_version:'instructional-section-items/8',prompt:'Saved evaluator prompt: inspect text-drawn diagrams.',created_at:'2026-10-27T18:00:00Z',generation_config:{},annotations:[{id:`annotation-${id}`,section_id:'t1s2',feature:'equations',entry:{category:'Formatting & Notation',count}}]});
 state.baselines.push(baseline('source-baseline',source.id,2),baseline('english-baseline',englishId,1));
 const before=structuredClone(state.assignments);
 await login(page,'admin');
 await page.goto(`/conversations/${source.id}/labeling`);
 await expect(page.locator('#review-source option:checked')).toContainText('Prompt instructional-section-items/8');
 await page.getByRole('button',{name:'Compare labels side by side',exact:true}).click();
 const comparison=page.getByRole('region',{name:'Labels across languages',exact:true});
 const table=comparison.getByRole('table',{name:'Label counts for t1s2',exact:true});
 await expect(table.getByRole('row',{name:'Mathematical Notation 2 1',exact:true})).toBeVisible();
 await expect(table.locator('tr[data-different=true]')).toHaveCount(1);
 await expect(comparison.locator('[data-section-id]')).toHaveCount(2);
 const tamilSource=page.getByRole('combobox',{name:'Tamil label source',exact:true});
 const englishSource=page.getByRole('combobox',{name:'English label source',exact:true});
 await expect(tamilSource).toHaveValue('baseline:source-baseline');
 await expect(tamilSource.locator('option:checked')).toContainText('Prompt instructional-section-items/8');
 await expect(englishSource).toHaveValue('baseline:english-baseline');
 await expect(englishSource.locator('option:checked')).toContainText('Prompt instructional-section-items/8');
 await tamilSource.selectOption(`assignment:${ids.a}`);
 await expect(table.getByRole('row',{name:'Mathematical Notation 0 1',exact:true})).toBeVisible();
 await expect(englishSource).toHaveValue('baseline:english-baseline');
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Show single-language labels',exact:true}).click();
 await expect(comparison).toHaveCount(0);
 await expect(page.locator('.section-annotation-boundary')).toHaveCount(2);
 // The English baseline page exposes the same paired comparison.
 await page.goto(`/conversations/${englishId}/baselines`);
 await expect(page.locator('.baseline-controls select option:checked')).toContainText('Prompt instructional-section-items/8');
 await page.locator('.baseline-prompt summary').click();
 await expect(page.locator('.baseline-prompt pre')).toHaveText('Saved evaluator prompt: inspect text-drawn diagrams.');
 await page.getByRole('button',{name:'Compare labels side by side',exact:true}).click();
 await expect(page.getByRole('table',{name:'Label counts for t1s2',exact:true}).getByRole('row',{name:'Mathematical Notation 2 1',exact:true})).toBeVisible();
 await expect(page.getByRole('region',{name:'Annotation summary',exact:true})).toHaveCount(0);
 expect(state.assignments).toEqual(before);expect(state.saves).toBe(0);
 expect(state.requests).not.toContain('/rest/v1/rpc/register_conversation_sections');
 // Missing saved English work is unavailable, rather than a row of zero counts.
 state.baselines.splice(state.baselines.findIndex(b=>b.id==='english-baseline'),1);
 await page.goto(`/conversations/${englishId}/baselines`);
 await page.getByRole('button',{name:'Compare labels side by side',exact:true}).click();
 await expect(page.getByText('Saved labels are needed in both languages to compare counts.',{exact:true})).toBeVisible();
 await expect(page.locator('.api-section-counts table')).toHaveCount(0);
});
