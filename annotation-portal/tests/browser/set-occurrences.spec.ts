import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { backend, ids, login } from './mock';
const rubric = JSON.parse(fs.readFileSync('src/generated/rubric.json', 'utf8'));

test('topic language significance separates tutor prompts and uses unadjusted p-values', async ({ page }) => {
  const state = await backend(page, rubric);
  const template = structuredClone(state.documents[0]) as any;
  state.documents.length = 0;
  for (const prompt of ['old tutor prompt', 'latest tutor prompt']) for (const language of ['en', 'ta']) for (let i = 0; i < 5; i++) {
    const id = `${prompt}-${language}-${i}`;
    state.documents.push({...structuredClone(template), id, language, topic_id:'evaporation', generic_topic_name:'Evaporation', created_at:prompt.startsWith('latest')?'2026-10-28':'2026-10-27', transcript:{...structuredClone(template.transcript), conversation_id:id, topic_id:'evaporation', provider:'GPT', api_source:{system_prompt:prompt}}});
    state.baselines.push({id:`b-${id}`,conversation_id:id,rubric_hash:rubric.rubric_sha256,annotations:language==='ta'?[{id:`a-${id}`,section_id:'t1s1',feature:'headings',entry:{category:'Formatting & Notation',count:1},evidence:[]}]:[],model:'google/model',prompt_version:'instructional-section-items/17',prompt_sha256:'rendered',generation_config:{provider:'google',instructional_prompt_sha256:'source'},created_at:'2026-10-28'});
  }
  await login(page,'admin',{expandTopic:false});
  await page.goto('/topics/evaporation');
  await page.locator('.provider-accordion>summary').first().click();
  const panel=page.locator('.set-occurrence-comparison');
  await panel.locator('summary').first().click();
  await expect(panel).toContainText('Left: 5 of 5 evaluated tries. Right: 5 of 5 evaluated tries.');
  await expect(panel.getByLabel('Tutor generation prompt')).toHaveValue(/latest tutor prompt/);
  const row=panel.getByRole('row',{name:/^Headings /});
  await expect(row.locator('td').nth(3)).toHaveText('0.0079');
  await expect(row.locator('td').nth(4)).toHaveText('Significant');
  await expect(panel.getByRole('columnheader',{name:'Holm-adjusted p',exact:true})).toHaveCount(0);
  await expect(panel).toContainText('without correction for multiple comparisons');
  await panel.getByLabel('Tutor generation prompt').selectOption({label:'old tutor prompt · condition 2'});
  await expect(panel).toContainText('Left: 5 of 5 evaluated tries. Right: 5 of 5 evaluated tries.');
  await panel.getByRole('combobox',{name:'Right language',exact:true}).selectOption(JSON.stringify(['GPT','en']));
  await expect(panel).toContainText('The same conversation appears on both sides.');
  await expect(row.locator('td').last()).toHaveText('Unavailable');
  expect(state.saves).toBe(0); expect(state.llmGenerations).toBe(0);
});

test('topic-level comparison stays within a provider and switches originals to English translations', async ({ page }) => {
  const state = await backend(page, rubric);
  const original = state.documents[0] as any;
  Object.assign(original, { language: 'ta', topic_id: 'evaporation', generic_topic_name: 'Evaporation' });
  Object.assign(original.transcript, { conversation_id: ids.doc, topic_id: 'evaporation', provider: 'GPT' });
  state.documents.push({ ...structuredClone(original), id: 'english', language: 'en', transcript: { ...structuredClone(original.transcript), conversation_id: 'english' } });
  state.documents.push({ ...structuredClone(original), id: 'translated', language: 'en', source_conversation_id: ids.doc, transcript: { ...structuredClone(original.transcript), conversation_id: 'translated', source_conversation_id: ids.doc, provider: 'Translator' } });
  state.documents.push({ ...structuredClone(original), id: 'other-provider', language: 'en', transcript: { ...structuredClone(original.transcript), conversation_id: 'other-provider', provider: 'ChatGPT' } });
  for (const [conversation_id, count] of [[ids.doc, 3], ['english', 9], ['translated', 5], ['other-provider', 77]] as const) state.baselines.push({ id: `b-${conversation_id}`, conversation_id, rubric_hash: rubric.rubric_sha256, annotations: [{ id: 'a', section_id: 't1s1', feature: 'headings', entry: { category: 'Textual Representations', count }, evidence: [] }], model: 'google/model', prompt_version: 'instructional-section-items/10', prompt_sha256: 'rendered', generation_config: { provider: 'google', instructional_prompt_sha256: 'source' }, created_at: '2026-10-27' });
  await login(page, 'admin', { expandTopic: false });
  await page.locator('.topic-link').click();
  const provider = page.locator('.provider-accordion').filter({ has: page.locator('summary strong').filter({ hasText: /^GPT$/ }) });
  await provider.locator('summary').first().click();
  await provider.locator('.set-occurrence-comparison>summary').click();
  const comparison = provider.locator('.set-occurrence-comparison');
  const table = comparison.getByRole('table', { name: 'Occurrence counts and translation comparison', exact: true });
  const headings = table.getByRole('row', { name: /^Headings / });
  await expect(headings.locator('td:nth-child(-n+3)')).toHaveText(['9 ± —', '3 ± —']);
  await expect(comparison.getByRole('combobox', { name: 'Left language', exact: true }).locator('option')).toHaveText(['English', 'Tamil']);
  await comparison.getByRole('combobox', { name: 'Right conversation version', exact: true }).selectOption('english');
  await expect(headings.locator('td:nth-child(-n+3)')).toHaveText(['9 ± —', '5 ± —']);
  await expect(page).toHaveURL('/topics/evaporation');
  await expect(comparison.locator('table')).toHaveCount(1);
  expect(state.saves).toBe(0); expect(state.llmGenerations).toBe(0);
});

test('counts occurrences by try and compares matched translations, languages and English versions without writes', async ({ page }) => {
  const state = await backend(page, rubric);
  const original = state.documents[0] as any;
  Object.assign(original, { language: 'ta', topic_id: 'evaporation', generic_topic_name: 'Evaporation', created_at: '2026-10-01' });
  Object.assign(original.transcript, { conversation_id: ids.doc, topic_id: 'evaporation', provider: 'GPT' });
  const add = (id: string, language: string, source?: string, date = '2026-10-02') => state.documents.push({ ...structuredClone(original), id, language, source_conversation_id: source, created_at: date, transcript: { ...structuredClone(original.transcript), conversation_id: id, source_conversation_id: source } });
  add('ta2', 'ta'); add('en1', 'en', ids.doc); add('en2', 'en', 'ta2'); add('english', 'en'); add('hindi', 'hi'); add('hindi-english', 'en', 'hindi');
  const addBaseline = (id: string, conversation_id: string, count: number, date = '2026-10-02') => state.baselines.push({ id, conversation_id, rubric_hash: rubric.rubric_sha256, annotations: [{ id: id + '-a', section_id: 't1s1', feature: 'headings', entry: { category: 'Textual Representations', count }, evidence: [] }], model: 'google/model', prompt_version: 'instructional-section-items/10', prompt_sha256: 'rendered', generation_config: { provider: 'google', instructional_prompt_sha256: 'source' }, created_at: date });
  addBaseline('old', ids.doc, 100, '2026-10-01'); addBaseline('a', ids.doc, 3); addBaseline('b', 'ta2', 7); addBaseline('translated', 'en1', 5); addBaseline('eng', 'english', 9); addBaseline('hi', 'hindi', 4); addBaseline('hi-en', 'hindi-english', 6);
  await login(page, 'admin', { expandTopic: false });
  await page.goto('/topics/evaporation/conversations/GPT/ta');
  const panel = page.locator('.set-occurrence-comparison');
  await panel.locator('summary').first().click();
  const table = page.getByRole('table', { name: 'Occurrence counts and translation comparison', exact: true });
  await expect(panel.locator('table')).toHaveCount(1);
  const headings = table.getByRole('row', { name: /^Headings / });
  await expect(headings.locator('td:nth-child(-n+3)')).toHaveText(['3 \u00b1 \u2014', '5 \u00b1 \u2014']);
  await expect(panel).toContainText('1 of 2 matched original/translation pairs');
  await expect(table.getByRole('row', { name: /^Examples / }).locator('td:nth-child(-n+3)')).toHaveText(['0 \u00b1 \u2014', '0 \u00b1 \u2014']);
  await panel.locator('.occurrence-language-options>summary').click();
  await panel.getByRole('combobox', { name: 'Right provider and language', exact: true }).selectOption(JSON.stringify(['GPT', 'en']));
  await panel.getByRole('combobox', { name: 'Right conversation version', exact: true }).selectOption('original');
  await expect(headings.locator('td:nth-child(-n+3)')).toHaveText(['5 \u00b1 2.83', '9 \u00b1 \u2014']);
  await panel.getByRole('combobox', { name: 'Right provider and language', exact: true }).selectOption(JSON.stringify(['GPT', 'hi']));
  await panel.getByRole('combobox', { name: 'Right conversation version', exact: true }).selectOption('english');
  await expect(headings.locator('td:nth-child(-n+3)')).toHaveText(['5 \u00b1 2.83', '6 \u00b1 \u2014']);
  await panel.getByRole('combobox', { name: 'Left conversation version', exact: true }).selectOption('english');
  await expect(headings.locator('td:nth-child(-n+3)')).toHaveText(['5 \u00b1 \u2014', '6 \u00b1 \u2014']);
  await expect(panel.locator('table')).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(state.saves).toBe(0); expect(state.llmGenerations).toBe(0);
});

test('shows an explicit empty state when there are no section-based evaluations', async ({ page }) => {
  await backend(page, rubric); await login(page, 'admin');
  await page.locator('.set-occurrence-comparison>summary').click();
  await expect(page.getByText('No section-based evaluations are saved for this topic yet.')).toBeVisible();
  await expect(page.getByRole('table', { name: 'Occurrence counts and translation comparison' })).toHaveCount(0);
});
