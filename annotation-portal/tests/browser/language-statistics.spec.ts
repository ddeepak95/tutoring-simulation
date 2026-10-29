import {expect,test} from '@playwright/test';
import fs from 'node:fs';
import {backend,login} from './mock';
const rubric=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));

test('compares English originals and Tamil translations across topics using one prompt condition without writes',async({page})=>{
 const state=await backend(page,rubric);state.documents.splice(0);
 const add=(id:string,topic:string,language:string,source?:string,prompt='High-school Socratic teacher',date='2026-10-28')=>{
  (state.documents as any[]).push({id,label:topic,language,topic_id:topic,generic_topic_name:topic,source_conversation_id:source,created_at:date,
   transcript:{conversation_id:id,label:topic,learning_topic:topic,messages:[],topic_id:topic,topic_name:topic,provider:'gpt-6.1-sol',access_type:'API',original_language:source?'ta':language,
    api_source:source?undefined:{model_id:'gpt-6.1-sol',system_prompt:prompt,settings:{store:false}},translation:source?{model:'gemini-test'}:undefined}});
 };
 const baseline=(id:string,count:number)=>state.baselines.push({id:'b-'+id,conversation_id:id,rubric_hash:rubric.rubric_sha256,annotations:[{section_id:'t1s1',feature:'headings',entry:{count}}],model:'google/model',prompt_version:'instructional-section-items/13',prompt_sha256:'source',generation_config:{provider:'google',instructional_prompt_sha256:'source'},created_at:'2026-10-28'});
 for(const topic of ['Brain','Heart','Motion'])for(let i=0;i<5;i++){
  const en=`${topic}-en-${i}`,ta=`${topic}-ta-${i}`,translated=`${topic}-translated-${i}`;
  add(en,topic,'en');add(ta,topic,'ta');add(translated,topic,'en',ta);baseline(en,2);baseline(translated,10);
 }
 for(let i=0;i<2;i++){
  add('old-en-'+i,'Brain','en',undefined,'Old prompt','2026-01-01');baseline('old-en-'+i,99);
  add('old-ta-'+i,'Brain','ta',undefined,'Old prompt','2026-01-01');add('old-translated-'+i,'Brain','en','old-ta-'+i,'Old prompt','2026-01-01');baseline('old-translated-'+i,100);
 }
 await login(page,'admin',{expandTopic:false});
 await page.getByRole('link',{name:'Compare languages across topics',exact:true}).click();
 await expect(page).toHaveURL('/statistics');
 const table=page.getByRole('table',{name:'Feature count statistical significance'});
 const headings=table.getByRole('row',{name:/^Headings /});
 await expect(headings.locator('td').nth(0)).toHaveText('2 ± 0');
 await expect(headings.locator('td').nth(1)).toHaveText('10 ± 0');
 await expect(headings.locator('td').nth(2)).toHaveText('8');
 await expect(headings.locator('td').nth(4)).toHaveText('Significant');
 await expect(table.locator('tbody tr')).toHaveCount(rubric.rubric.length);
 await expect(page.getByText('Results use unadjusted p < 0.05, without correction for multiple comparisons.',{exact:true})).toBeVisible();
 await expect(table.getByRole('columnheader',{name:'Holm-adjusted p',exact:true})).toHaveCount(0);
 await page.getByLabel('Results for',{exact:true}).selectOption('Brain');
 await expect(headings.locator('td').nth(4)).toHaveText('Significant');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export analysis',exact:true}).click();
 const artifact=await download; expect(artifact.suggestedFilename()).toBe('language-feature-statistics.json');
 const exported=JSON.parse(fs.readFileSync((await artifact.path())!,'utf8'));
 expect(exported.correction).toBe('none');
 expect(exported.analysis_version).toBe('topic-stratified-permutation/3');
 expect(exported.report.views.every((v:any)=>v.rows.every((r:any)=>!('adjustedP' in r)))).toBe(true);
 await page.getByLabel('Right conversation version',{exact:true}).selectOption('original');
 await expect(page.getByRole('status').filter({hasText:'No topics have enough'})).toBeVisible();
 await expect(table).toHaveCount(0);
 await page.getByLabel('Right conversation version',{exact:true}).selectOption('english');
 const conditions=page.getByLabel('Tutor generation condition',{exact:true});
 const old=await conditions.locator('option').evaluateAll(options=>options.find(o=>o.textContent?.startsWith('Old prompt'))?.getAttribute('value'));
 await conditions.selectOption(old!);
 await expect(headings.locator('td').nth(0)).toHaveText('99 ± 0');
 await expect(headings.locator('td').nth(1)).toHaveText('100 ± 0');
 await page.setViewportSize({width:390,height:844});
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(state.saves).toBe(0);expect(state.llmGenerations).toBe(0);
});

test('compares models using separate prompt conditions, languages and export identities',async({page})=>{
 const state=await backend(page,rubric);state.documents.splice(0);
 const models=['gpt-6.1-sol','deepseek/deepseek-v4.1-flash-1017'];
 const add=(model:string,topic:string,language:string,i:number,prompt='Shared tutor prompt',date='2026-10-28',override?:number)=>{
  const id=`${model}-${topic}-${language}-${i}-${prompt}`;
  (state.documents as any[]).push({id,label:topic,language,topic_id:topic,generic_topic_name:topic,created_at:date,
   transcript:{conversation_id:id,label:topic,learning_topic:topic,messages:[],topic_id:topic,topic_name:topic,provider:model,access_type:'API',api_source:{model_id:model,system_prompt:prompt,settings:{route:model}}}});
  const count=override??(language==='en'?(model===models[0]?3:7):(model===models[0]?20:30));
  state.baselines.push({id:`b-${id}`,conversation_id:id,rubric_hash:rubric.rubric_sha256,annotations:[{section_id:'t1s1',feature:'headings',entry:{count}}],model:'google/model',prompt_version:'instructional-section-items/19',prompt_sha256:'source',generation_config:{provider:'google',instructional_prompt_sha256:'source'},created_at:'2026-10-28'});
 };
 for(const model of models)for(const topic of ['Brain','Heart'])for(const language of ['en','ta'])for(let i=0;i<5;i++)add(model,topic,language,i);
 // A more recent different prompt must not override the matching prompt by default.
 for(let i=0;i<5;i++)add(models[1],'Brain','en',i,'Different prompt','2026-10-29',99);
 await login(page,'admin',{expandTopic:false});
 await page.getByRole('link',{name:'Compare models',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Compare models across topics'})).toBeVisible();
 const table=page.getByRole('table',{name:'Feature count statistical significance'}),headings=table.getByRole('row',{name:/^Headings /});
 await expect(page.getByLabel('Left tutor model',{exact:true})).toHaveValue(models[0]);
 await expect(page.getByLabel('Right tutor model',{exact:true})).toHaveValue(models[1]);
 await expect(page.getByLabel('Right tutor generation condition',{exact:true})).toHaveValue(/Shared tutor prompt/);
 await expect(headings.locator('td').nth(0)).toHaveText('3 ± 0');
 await expect(headings.locator('td').nth(1)).toHaveText('7 ± 0');
 await expect(headings.locator('td').nth(2)).toHaveText('4');
 await expect(page.getByText('Brain: left n = 5, right n = 5. Included')).toHaveCount(1);
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export analysis',exact:true}).click();
 const artifact=await download,exported=JSON.parse(fs.readFileSync((await artifact.path())!,'utf8'));
 expect(exported.comparison_mode).toBe('models');expect(exported.left.model).toBe(models[0]);expect(exported.right.model).toBe(models[1]);expect(exported.input.paired).toBe(false);
 expect(exported.input.topics.every((t:any)=>t.left.length===5&&t.right.length===5)).toBe(true);
 await page.getByLabel('Left original language',{exact:true}).selectOption('ta');
 await page.getByLabel('Right original language',{exact:true}).selectOption('ta');
 await expect(headings.locator('td').nth(0)).toHaveText('20 ± 0');await expect(headings.locator('td').nth(1)).toHaveText('30 ± 0');
 await page.getByLabel('Right original language',{exact:true}).selectOption('en');
 const different=await page.getByLabel('Right tutor generation condition',{exact:true}).locator('option').evaluateAll(options=>options.find(o=>o.textContent?.startsWith('Different prompt'))!.getAttribute('value'));
 await page.getByLabel('Right tutor generation condition',{exact:true}).selectOption(different!);
 await expect(page.getByRole('status').filter({hasText:'different tutor prompts'})).toBeVisible();
 await expect(headings.locator('td').nth(1)).toHaveText('99 ± 0');
 await page.getByLabel('Right tutor model',{exact:true}).selectOption(models[0]);
 await page.getByLabel('Right original language',{exact:true}).selectOption('ta');
 await expect(page.getByText(/Brain:.*The same conversation appears on both sides/)).toHaveCount(1);
 await expect(table).toHaveCount(0);
 // Topic entry links retain the requested topic instead of including everything.
 await page.goto('/topics/Brain');await page.getByRole('link',{name:'Compare models',exact:true}).click();
 await expect(page.getByRole('checkbox',{name:'Brain',exact:true})).toBeChecked();
 await expect(page.getByRole('checkbox',{name:'Heart',exact:true})).not.toBeChecked();
 expect(state.saves).toBe(0);expect(state.llmGenerations).toBe(0);
});

test('statistics route stays administrator-only',async({page})=>{
 await backend(page,rubric);await login(page,'alice');await page.goto('/statistics');
 await expect(page).toHaveURL('/');await expect(page.getByRole('heading',{name:'Compare languages across topics'})).toHaveCount(0);
});

test('shows all models in one table with shared topics, language filters and an export',async({page})=>{
 const state=await backend(page,rubric);state.documents.splice(0);
 const models=['gpt-6-luna','meta/muse-spark-open','google/gemini-3.8-flash'];
 for(const [m,model] of models.entries())for(const topic of ['Brain','Heart'])for(const language of ['en','ta'])for(let i=0;i<2;i++){
  const id=`${model}-${topic}-${language}-${i}`;
  (state.documents as any[]).push({id,label:topic,language,topic_id:topic,generic_topic_name:topic,created_at:'2026-10-28',transcript:{conversation_id:id,label:topic,messages:[],provider:model,access_type:'API',api_source:{model_id:model,system_prompt:'Shared prompt',settings:{}}}});
  // Leave Muse's Heart evaluations missing: the entire topic must be excluded by default.
  if(model===models[1]&&topic==='Heart')continue;
  state.baselines.push({id:'b-'+id,conversation_id:id,rubric_hash:rubric.rubric_sha256,annotations:[{section_id:'s1',feature:'headings',entry:{count:(m+1)*(language==='en'?2:5)}}],model:'google/model',prompt_version:'instructional-section-items/19',prompt_sha256:'source',generation_config:{provider:'google',instructional_prompt_sha256:'source'},created_at:'2026-10-28'});
 }
 await login(page,'admin',{expandTopic:false});await page.goto('/statistics');
 await page.getByRole('link',{name:'All models',exact:true}).click();
 await expect(page).toHaveURL('/statistics?compare=overview');
 const table=page.getByRole('table',{name:'Feature counts across models'}),row=table.getByRole('row',{name:/^Headings /});
 await expect(table.locator('thead th')).toHaveCount(4);await expect(table.locator('tbody tr')).toHaveCount(rubric.rubric.length);
 await expect(row.locator('td')).toHaveText(['6 ± 0','2 ± 0','4 ± 0']);
 await expect(table.getByRole('columnheader').nth(1)).toContainText('n = 2');
 await page.getByLabel('Original language',{exact:true}).selectOption('ta');
 await expect(row.locator('td')).toHaveText(['15 ± 0','5 ± 0','10 ± 0']);
 await page.getByRole('checkbox',{name:models[1],exact:true}).uncheck();
 await expect(table.locator('thead th')).toHaveCount(3);
 await expect(table.getByRole('columnheader').nth(1)).toContainText('n = 4');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export overview',exact:true}).click();
 const artifact=await download,payload=JSON.parse(fs.readFileSync((await artifact.path())!,'utf8'));
 expect(payload.language).toBe('ta');expect(payload.report.topics).toHaveLength(2);expect(payload.report.columns).toHaveLength(2);expect(payload.system_prompt).toBe('Shared prompt');
 await page.getByRole('checkbox',{name:'Heart',exact:true}).uncheck();await expect(table.getByRole('columnheader').nth(1)).toContainText('n = 2');
 await page.setViewportSize({width:390,height:844});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('link',{name:'Pairwise models',exact:true}).click();await expect(page.getByLabel('Left tutor model',{exact:true})).toBeVisible();
 expect(state.saves).toBe(0);expect(state.llmGenerations).toBe(0);
});

test('compares English and Tamil within every model with independent tests and exported provenance',async({page})=>{
 const state=await backend(page,rubric);state.documents.splice(0);
 const models=['gpt-6-luna','meta/muse-spark-open','google/gemini-3.8-flash'];
 for(const [m,model] of models.entries())for(const topic of ['Brain','Heart'])for(const language of ['en','ta'])for(let i=0;i<5;i++){
  const id=`${model}-${topic}-${language}-${i}`;
  (state.documents as any[]).push({id,label:topic,language,topic_id:topic,generic_topic_name:topic,created_at:'2026-10-28',transcript:{conversation_id:id,label:topic,messages:[],provider:model,access_type:'API',api_source:{model_id:model,system_prompt:'Shared prompt',settings:{}}}});
  if(model===models[1]&&topic==='Heart'&&language==='ta')continue;
  const count=m===0?(language==='en'?2:6):m===1?(language==='en'?7:3):4;
  state.baselines.push({id:'b-'+id,conversation_id:id,rubric_hash:rubric.rubric_sha256,annotations:[{section_id:'s1',feature:'headings',entry:{count}}],model:'google/model',prompt_version:'instructional-section-items/19',prompt_sha256:'source',generation_config:{provider:'google',instructional_prompt_sha256:'source'},created_at:'2026-10-28'});
 }
 await login(page,'admin',{expandTopic:false});await page.goto('/statistics');
 await page.getByRole('link',{name:'Languages across models',exact:true}).click();
 await expect(page).toHaveURL('/statistics?compare=languages-models');
 const table=page.getByRole('table',{name:'Language feature comparisons across models'}),row=table.getByRole('row',{name:/^Headings /});
 await expect(table.locator('thead th')).toHaveCount(4);await expect(table.locator('tbody tr')).toHaveCount(rubric.rubric.length);
 // Alphabetical columns: Gemini has no difference, Luna is higher in Tamil, Muse is higher in English.
 await expect(row.locator('td').nth(0)).toContainText('Not detected');
 await expect(row.locator('td').nth(1)).toContainText('English: 2 ± 0');
 await expect(row.locator('td').nth(1)).toContainText('Tamil: 6 ± 0');
 await expect(row.locator('td').nth(1)).toContainText('Tamil higher');
 await expect(row.locator('td').nth(1)).toContainText('Difference: 4');
 await expect(row.locator('td').nth(2)).toContainText('English higher');
 await expect(table.getByRole('columnheader').nth(1)).toContainText('English n = 5 · Tamil n = 5');
 // The model names stay at the top of the table's scroll area while feature rows move.
 const scroller=table.locator('..'),header=table.getByRole('columnheader').nth(1);
 await scroller.scrollIntoViewIfNeeded();
 const headerTop=(await header.boundingBox())!.y;
 await scroller.evaluate(el=>{el.scrollTop=500;});
 await expect.poll(()=>scroller.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
 await expect.poll(async()=>Math.abs((await header.boundingBox())!.y-headerTop)).toBeLessThan(2);
 await scroller.evaluate(el=>{el.scrollTop=0;});
 await page.setViewportSize({width:390,height:844});await scroller.scrollIntoViewIfNeeded();
 const feature=row.getByRole('rowheader'),corner=table.getByRole('columnheader',{name:'Feature',exact:true});
 const featureLeft=(await feature.boundingBox())!.x,cornerLeft=(await corner.boundingBox())!.x;
 await scroller.evaluate(el=>{el.scrollLeft=500;});
 await expect.poll(()=>scroller.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
 await expect.poll(async()=>Math.abs((await feature.boundingBox())!.x-featureLeft)).toBeLessThan(2);
 await expect.poll(async()=>Math.abs((await corner.boundingBox())!.x-cornerLeft)).toBeLessThan(2);
 await scroller.evaluate(el=>{el.scrollLeft=0;});
 await page.setViewportSize({width:1280,height:720});
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export overview',exact:true}).click();
 const artifact=await download,payload=JSON.parse(fs.readFileSync((await artifact.path())!,'utf8'));
 expect(payload.left_language).toBe('en');expect(payload.right_language).toBe('ta');expect(payload.correction).toBe('none');
 expect(payload.inputs).toHaveLength(3);expect(payload.inputs.every((i:any)=>!i.input.paired&&i.input.topics.length===1)).toBe(true);
 expect(payload.reports.every((a:any)=>a.report.views.every((v:any)=>v.rows.every((r:any)=>!('adjustedP' in r))))).toBe(true);
 await page.getByRole('checkbox',{name:models[1],exact:true}).uncheck();
 await expect(table.locator('thead th')).toHaveCount(3);await expect(table.getByRole('columnheader').nth(1)).toContainText('English n = 10 · Tamil n = 10');
 await page.getByLabel('Left original language',{exact:true}).selectOption('ta');
 await expect(page.getByLabel('Right original language',{exact:true})).toHaveValue('en');
 await expect(row.locator('td').nth(1)).toContainText('Difference: -4');
 await page.getByRole('checkbox',{name:'Brain',exact:true}).uncheck();await page.getByRole('checkbox',{name:'Heart',exact:true}).uncheck();
 await expect(page.getByRole('status').filter({hasText:'No shared topics'})).toBeVisible();await expect(table).toHaveCount(0);await expect(page.getByRole('button',{name:'Export overview',exact:true})).toBeDisabled();
 await page.getByRole('checkbox',{name:'Brain',exact:true}).check();await expect(table).toBeVisible();
 await page.setViewportSize({width:390,height:844});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(state.saves).toBe(0);expect(state.llmGenerations).toBe(0);
});
