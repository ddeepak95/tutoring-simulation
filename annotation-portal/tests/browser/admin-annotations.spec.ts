import { expect, test } from '@playwright/test';
import { backend, ids, login, rateAllTutorTurns, select } from './mock';
import C from '../../src/generated/core.js';
import fs from 'node:fs';
const rubric = JSON.parse(fs.readFileSync('src/generated/rubric.json', 'utf8'));

test('admin switches annotators, edits active work, and keeps submissions locked until reopened', async ({ page }) => {
  const state = await backend(page);
  const conversation = C.normalizeConversation(state.documents[0].transcript);
  for (const [i, quote] of ['Wet clothes drying', 'Water changes from liquid into vapour.'].entries()) {
    const start = conversation.messages[0].text.indexOf(quote);
    const annotation = C.createAnnotation('examples', C.makeEvidence(conversation, 't1', start, start + quote.length), rubric.rubric, `example-${i}`);
    annotation.entry.detail_level = i ? 'Elaborated' : 'Brief';
    state.assignments[i].annotations = [annotation]; state.assignments[i].status = i ? 'in_progress' : 'submitted';
  }
  // An unrelated conversation's assignment must never appear in this switcher.
  state.assignments.push({ ...structuredClone(state.assignments[0]), id: 'other-assignment', conversation_id: 'other-conversation' });
  const original = structuredClone(state.assignments);
  await login(page, 'admin');
  await page.locator('.progress').getByRole('row').filter({ hasText: 'alice' }).first().getByRole('link', { name: 'View', exact: true }).click();
  const switcher = page.getByRole('combobox', { name: 'Annotations by' });
  await expect(switcher).toBeEnabled(); await expect(switcher).toHaveValue(ids.a);
  await expect(switcher.locator('option')).toHaveCount(3);
  await page.getByRole('button', { name: 'View Examples', exact: true }).hover();
  await expect(page.getByRole('dialog', { name: 'View Examples' })).toContainText('Brief');
  await expect(page.getByRole('button', { name: 'Delete highlight' })).toHaveCount(0);
  await switcher.selectOption(ids.b);
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.b}$`));
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('mark')).toHaveText('Water changes from liquid into vapour.');
  await expect(page.locator('.save-status')).toContainText("Editing bob's annotations");
  await page.getByRole('button', { name: 'Edit Examples', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Edit Examples' })).toContainText('Elaborated');
  await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await page.getByRole('button', { name: 'Relevance: All information is relevant.', exact: true }).click();
  await expect.poll(() => state.assignments[1].turn_ratings.t1?.values.relevance).toBe('3');
  expect(state.assignments[1].annotations[0].entry.detail_level).toBe('Brief');
  expect(state.assignments[1].annotator_id).toBe(ids.bob);
  expect(state.assignments[0]).toEqual(original[0]);
  original[1] = structuredClone(state.assignments[1]);
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  await switcher.selectOption('own');
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  const own = state.assignments.find(row => row.annotator_id === ids.admin)!;
  await select(page, 't1', 'Wet clothes drying'); await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Explained', exact: true }).click();
  await switcher.selectOption(ids.a);
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.a}$`));
  expect(own.annotations[0].entry.detail_level).toBe('Explained');
  await switcher.selectOption('own'); await expect(page).toHaveURL(new RegExp(`/assignments/${own.id}$`));
  await expect(page.locator('mark')).toHaveText('Wet clothes drying');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(switcher).toBeVisible(); await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(state.assignments.filter(row => row.annotator_id !== ids.admin)).toEqual(original);
});

test('admin enters editing from review, reopens submitted work, and saves under the original annotator', async ({ page }) => {
  const state = await backend(page);
  state.assignments[0].status = 'submitted'; state.assignments[0].submitted_at = new Date().toISOString();
  const bobWork = structuredClone(state.assignments[1]);
  await login(page, 'admin'); await page.goto(`/assignments/${ids.a}/view`);
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Reopen and edit', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.a}$`));
  await expect(page.locator('.save-status')).toContainText("Editing alice's annotations");
  await select(page, 't1', 'Wet clothes drying'); await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Explained', exact: true }).click();
  await rateAllTutorTurns(page);
  page.once('dialog', dialog => void dialog.accept()); await page.getByRole('button', { name: 'Complete Annotation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Reopen and edit', exact: true })).toBeVisible();
  expect(state.assignments[0].status).toBe('submitted'); expect(state.assignments[0].annotator_id).toBe(ids.alice);
  expect(state.assignments[0].annotations[0].entry.detail_level).toBe('Explained');
  expect(state.assignments[1]).toEqual(bobWork); expect(state.assignments).toHaveLength(2);
  await page.goto(`/assignments/${ids.b}/view`);
  await page.getByRole('link', { name: 'Edit annotations', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.b}$`));
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
});

test('failed admin saves prevent annotator switching until retry succeeds', async ({ page }) => {
  const state = await backend(page); await login(page, 'admin'); await page.locator('.conversation-topic-link').click();
  const switcher = page.getByRole('combobox', { name: 'Annotations by' }); await expect(switcher).toBeEnabled();
  const own = state.assignments.find(row => row.annotator_id === ids.admin)!;
  state.failSaves = true;
  await select(page, 't1', 'Wet clothes drying'); await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await switcher.selectOption(ids.a);
  await expect(page.locator('.save-status')).toContainText('Cloud save failed');
  await expect(page).toHaveURL(new RegExp(`/assignments/${own.id}$`)); await expect(switcher).toHaveValue('own');
  expect(own.annotations).toHaveLength(0);
  expect(await page.evaluate(key => Boolean(localStorage.getItem(key)), `annotation-portal:draft:${ids.admin}:${own.id}`)).toBe(true);
  state.failSaves = false; await switcher.selectOption(ids.a);
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.a}$`)); expect(own.annotations[0].entry.detail_level).toBe('Brief');
});

test('admin can retry loading annotators without leaving the current annotation', async ({ page }) => {
  await backend(page);
  let fail = true;
  await page.route('**/rest/v1/assignments?**', route => {
    const query = new URL(route.request().url()).searchParams;
    return fail && query.has('conversation_id') && query.get('select')?.startsWith('id,annotator_id')
      ? route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ message: 'Could not load annotators' }) })
      : route.fallback();
  });
  await login(page, 'admin'); await page.locator('.conversation-topic-link').click();
  await expect(page.getByText('Could not load annotators.', { exact: false })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Annotations by' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  fail = false; await page.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Annotations by' })).toBeEnabled();
});

test('admin annotates independently, resumes, submits and reopens own work', async ({ page }) => {
  const state = await backend(page);
  const originalWork = structuredClone(state.assignments), originalTranscript = structuredClone(state.documents[0].transcript);
  await login(page, 'admin');
  const topic = page.locator(`[data-conversation-id="${ids.doc}"] .conversation-topic-link`);
  await topic.click();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  const own = state.assignments.find(row => row.annotator_id === ids.admin)!;
  expect(own).toBeDefined();
  await select(page, 't1', 'Wet clothes drying illustrates evaporation.');
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Explained', exact: true }).click();
  await expect.poll(() => own.annotations[0]?.entry.detail_level).toBe('Explained');
  await page.reload(); await expect(page.locator('mark')).toHaveCount(1);
  await page.getByRole('link', { name: 'Conversations', exact: true }).click();
  await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click();
  await page.getByRole('link', { name: 'View and annotate', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/assignments/${own.id}$`));
  expect(state.assignments.filter(row => row.annotator_id === ids.admin)).toHaveLength(1);
  await expect(page.locator('mark')).toHaveCount(1);
  await rateAllTutorTurns(page);
  page.once('dialog', dialog => void dialog.accept());
  await page.getByRole('button', { name: 'Complete Annotation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0); expect(own.status).toBe('submitted');
  await page.getByRole('link', { name: 'Conversations', exact: true }).click();
  const ownRow = page.locator('.progress').getByRole('row').filter({ hasText: 'admin' });
  await ownRow.getByRole('button', { name: 'Reopen', exact: true }).click();
  await expect(ownRow).toContainText('In progress');
  await topic.click(); await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Conversations', exact: true }).click();
  await page.locator('.progress').getByRole('row').filter({ hasText: 'alice' }).getByRole('link', { name: 'View', exact: true }).click();
  await expect(page.locator('mark')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  await expect(page.locator('.save-status')).toContainText("Editing alice's annotations");
  expect(state.assignments.filter(row => row.annotator_id !== ids.admin)).toEqual(originalWork);
  expect(state.documents[0].transcript).toEqual(originalTranscript);
});

test('admin header navigation flushes pending saves and stays in the editor on failure', async ({ page }) => {
  const state = await backend(page); await login(page, 'admin');
  await page.locator('.conversation-topic-link').click();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  const own = state.assignments.find(row => row.annotator_id === ids.admin)!;
  await select(page, 't1', 'Wet clothes drying');
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await page.getByRole('link', { name: 'Settings', exact: true }).click();
  await expect(page).toHaveURL(/\/settings$/); expect(own.annotations[0].entry.detail_level).toBe('Brief');
  await page.getByRole('link', { name: 'Conversations', exact: true }).click(); await page.locator('.conversation-topic-link').click();
  await page.locator('mark').click();
  state.failSaves = true;
  await page.getByRole('button', { name: 'Elaborated', exact: true }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await page.getByRole('link', { name: 'Settings', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/assignments/${own.id}$`));
  await expect(page.locator('.save-status')).toContainText('Cloud save failed');
  expect(own.annotations[0].entry.detail_level).toBe('Brief');
  expect(await page.evaluate(key => Boolean(localStorage.getItem(key)), `annotation-portal:draft:${ids.admin}:${own.id}`)).toBe(true);
  state.failSaves = false;
  await page.getByRole('link', { name: 'Settings', exact: true }).click();
  await expect(page).toHaveURL(/\/settings$/); expect(own.annotations[0].entry.detail_level).toBe('Elaborated');
});

test('annotators cannot use the admin conversation route', async ({ page }) => {
  const state = await backend(page); await login(page, 'alice');
  await page.locator('.assignment-card').click();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Annotations by' })).toHaveCount(0);
  await page.goto(`/conversations/${ids.doc}`);
  await expect(page.getByRole('heading', { name: 'Your assignments' })).toBeVisible();
  expect(state.assignments).toHaveLength(2);
  expect(state.assignments.some(row => row.annotator_id === ids.admin)).toBe(false);
});
