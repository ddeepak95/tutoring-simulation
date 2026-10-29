import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import C from '../../src/generated/core.js';
import { backend, ids, login, select } from './mock';
const rubric = JSON.parse(fs.readFileSync('tests/fixtures/legacy-rubric.json', 'utf8'));

test('labeling review omits the summary while switching annotations and keeping admin work read only', async ({ page }) => {
  const state = await backend(page);
  const conversation = C.normalizeConversation(state.documents[0].transcript);
  const quote = 'Wet clothes drying'; const start = conversation.messages[0].text.indexOf(quote);
  const annotation = C.createAnnotation('examples', C.makeEvidence(conversation, 't1', start, start + quote.length), rubric.rubric, 'review-example');
  annotation.entry.detail_level = 'Explained';
  state.assignments[0].annotations = [structuredClone(annotation)];
  const own = { ...structuredClone(state.assignments[0]), id: 'admin-work', annotator_id: ids.admin, status: 'in_progress' };
  state.assignments.push(own);
  const original = structuredClone(state.assignments);
  await login(page, 'admin');
  const draftKey = `annotation-portal:draft:${ids.admin}:${own.id}`;
  const draftValue = JSON.stringify({ annotations: [], revision: 0, rubric_hash: rubric.rubric_sha256 });
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key: draftKey, value: draftValue });
  await expect(page.locator('.conversation-table').getByRole('link', { name: 'View annotations', exact: true })).toHaveCount(0);
  await page.goto(`/assignments/${ids.a}/view`);
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.a}/view$`));
  const switcher = page.getByRole('combobox', { name: 'Label work by' });
  await expect(switcher).toBeEnabled();
  const summary = page.getByRole('region', { name: 'Annotation summary', exact: true });
  await expect(summary).toHaveCount(0);
  await expect(page.getByRole('img', { name: 'Examples: 1', exact: true })).toBeVisible();
  await switcher.selectOption(own.id);
  await expect(page).toHaveURL(/\/assignments\/admin-work\/view$/);
  await expect(page.locator('.save-status')).toContainText('admin · Read only');
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0);
  await expect(page.getByText('A local recovery draft is available.', { exact: true })).toHaveCount(0);
  await select(page, 't1', 'What is evaporation?');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.evaluate(() => window.getSelection()?.removeAllRanges());
  await expect(page.getByRole('img', { name: 'Examples: 1', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete highlight' })).toHaveCount(0);
  await switcher.selectOption(ids.b);
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.b}/view$`));
  await expect(page.locator('mark')).toHaveCount(0);
  await expect(summary).toHaveCount(0);
  await page.getByRole('button', { name: 'Dashboard', exact: false }).click();
  await page.goto(`/assignments/${ids.a}/view`);
  await expect(page).toHaveURL(new RegExp(`/assignments/${ids.a}/view$`));
  await expect(switcher).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0);
  expect(state.assignments).toEqual(original); expect(state.saves).toBe(0);
  expect(await page.evaluate(key => localStorage.getItem(key), draftKey)).toBe(draftValue);
});

test('review without admin work offers only existing annotators and unassigned review creates no work', async ({ page }) => {
  const state = await backend(page); await login(page, 'admin');
  await page.goto(`/assignments/${ids.a}/view`);
  const switcher = page.getByRole('combobox', { name: 'Label work by' });
  await expect(switcher).toBeEnabled(); await expect(switcher.locator('option')).toHaveCount(2);
  expect(state.assignments.some(row => row.annotator_id === ids.admin)).toBe(false);
  state.assignments.splice(0);
  await page.goto(`/conversations/${ids.doc}/labeling`);
  await expect(page.getByText('No label annotations yet', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0);
  expect(state.assignments).toHaveLength(0);
  await page.getByRole('navigation', { name: 'Conversation navigation' }).getByRole('link', { name: /Unknown provider \/ Tamil/ }).click();
  await expect(page).toHaveURL(/\/topics\/evaporation\/conversations\//);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tamil');
});

test('read-only admin review routes are protected from annotators', async ({ page }) => {
  await backend(page); await login(page, 'alice');
  for (const path of [`/conversations/${ids.doc}/view`, `/assignments/${ids.a}/view`]) {
    await page.goto(path); await expect(page.getByRole('region', { name: 'Label instructional features', exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  }
});
