import { expect, test } from '@playwright/test';
import { backend, ids, login } from './mock';
import fs from 'node:fs';

test('admin reviews a baseline, assigns independent copies, and tracks edits while ratings stay blank',async({page})=>{
 const state=await backend(page);state.assignments.splice(0);
 await login(page,'admin');
 await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click();
 await page.getByRole('link',{name:'LLM annotations',exact:true}).click();
 await page.getByRole('button',{name:'Generate LLM annotations',exact:true}).click();
 await expect(page.locator('mark')).toHaveText('Wet clothes drying');
 expect(state.baselines).toHaveLength(1);expect(state.assignments).toHaveLength(0);
 const original=structuredClone(state.baselines[0]);
 await expect(page.getByRole('complementary',{name:'Tutor turn ratings'})).toHaveCount(0);
 await page.getByRole('link',{name:'Dashboard',exact:true}).click();
 await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click();
 await expect(page.getByRole('combobox',{name:`Starting annotations for ${state.documents[0].label}`})).toHaveValue(original.id);
 await page.getByRole('checkbox',{name:'alice',exact:true}).check();await page.getByRole('checkbox',{name:'bob',exact:true}).check();
 await page.getByRole('button',{name:'Assign to selected annotators',exact:true}).click();
 await expect.poll(()=>state.assignments.length).toBe(2);
 for(const assignment of state.assignments){expect(assignment.baseline_id).toBe(original.id);expect(assignment.annotations).toEqual(original.annotations);expect(assignment.turn_ratings).toEqual({});}
 const alice=state.assignments.find(row=>row.annotator_id===ids.alice),bob=structuredClone(state.assignments.find(row=>row.annotator_id===ids.bob));
 await page.goto(`/assignments/${alice.id}`);
 await page.getByRole('button',{name:'Edit Examples',exact:true}).click();await page.getByRole('button',{name:'Explained',exact:true}).click();
 await expect.poll(()=>alice.annotations[0].entry.detail_level).toBe('Explained');
 await page.getByRole('button',{name:'Close annotation popup'}).click();
 await page.goto(`/assignments/${alice.id}/view`);
 await expect(page.locator('.baseline-comparison')).toContainText('1 edited');
 await page.locator('.baseline-comparison summary').click();await expect(page.locator('.baseline-comparison')).toContainText('Brief → Explained');
 expect(state.baselines[0]).toEqual(original);expect(state.assignments.find(row=>row.annotator_id===ids.bob)).toEqual(bob);
 await page.goto(`/conversations/${ids.doc}/baselines`);await page.getByRole('button',{name:'Generate new baseline',exact:true}).click();
 await expect.poll(()=>state.baselines.length).toBe(2);expect(alice.baseline_id).toBe(original.id);expect(alice.annotations[0].entry.detail_level).toBe('Explained');
 await page.getByRole('link',{name:'Dashboard',exact:true}).click();
 const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Export all annotations',exact:true}).click();
 const file=await (await downloaded).path();const study=JSON.parse(fs.readFileSync(file!,'utf8'));
 expect(study.format_version).toBe('annotation-portal-study/2.0');expect(study.llm_baselines).toHaveLength(2);
 expect(study.llm_baselines.find((baseline:any)=>baseline.id===original.id)).toEqual(original);
 expect(study.assignments.find((assignment:any)=>assignment.annotator_id===ids.alice).baseline_comparison.counts.edited).toBe(1);
 expect(study.assignments.every((assignment:any)=>Object.keys(assignment.turn_ratings).length===0)).toBe(true);
 expect(Array.isArray(study.revision_history)).toBe(true);
});

test('failed generation preserves work and annotators cannot open baseline administration',async({page})=>{
 const state=await backend(page);state.failLLMGeneration=true;const original=structuredClone(state.assignments);
 await login(page,'admin');await page.goto(`/conversations/${ids.doc}/baselines`);
 await page.getByRole('button',{name:'Generate LLM annotations',exact:true}).click();await expect(page.getByRole('alert')).toContainText('failed exact-highlight validation');
 expect(state.baselines).toHaveLength(0);expect(state.assignments).toEqual(original);
 await page.getByRole('button',{name:'Sign out',exact:true}).click();await login(page,'alice');await page.goto(`/conversations/${ids.doc}/baselines`);
 await expect(page.getByRole('heading',{name:'Your assignments'})).toBeVisible();await expect(page.getByRole('button',{name:'Generate LLM annotations'})).toHaveCount(0);
});

test('admin starts from a saved baseline and repairs an untouched blank admin assignment',async({page})=>{
 const state=await backend(page);await login(page,'admin');
 await page.goto(`/conversations/${ids.doc}/baselines`);await page.getByRole('button',{name:'Generate LLM annotations',exact:true}).click();await expect(page.locator('mark')).toHaveCount(1);
 const baseline=structuredClone(state.baselines[0]);
 await page.getByRole('link',{name:'Dashboard',exact:true}).click();await page.locator('.conversation-topic-link').click();await expect(page.locator('mark')).toHaveText('Wet clothes drying');
 const own=state.assignments.find(row=>row.annotator_id===ids.admin)!;expect(own.baseline_id).toBe(baseline.id);expect(own.turn_ratings).toEqual({});
 await page.getByRole('link',{name:'Conversations',exact:true}).click();
 own.baseline_id=null;own.annotation_source='blank';own.annotations=[];
 await page.locator('.conversation-topic-link').click();await expect(page.locator('mark')).toHaveText('Wet clothes drying');expect(state.assignments.filter(row=>row.annotator_id===ids.admin)).toHaveLength(1);
 await page.getByRole('button',{name:'Edit Examples',exact:true}).click();await page.getByRole('button',{name:'Elaborated',exact:true}).click();await expect.poll(()=>own.annotations[0].entry.detail_level).toBe('Elaborated');
 await page.getByRole('button',{name:'Close annotation popup'}).click();await page.getByRole('link',{name:'Conversations',exact:true}).click();await page.locator('.conversation-topic-link').click();
 expect(own.annotations[0].entry.detail_level).toBe('Elaborated');expect(state.baselines[0]).toEqual(baseline);
});
