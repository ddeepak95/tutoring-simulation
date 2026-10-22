import { expect, test } from '@playwright/test';
import { backend, ids, login, sample } from './mock';

test('admin sees active comparison, label, and rate work grouped by annotator', async ({ page }) => {
  const state = await backend(page);
  state.assignments[1].is_active = false;
  state.assignments.push({ ...structuredClone(state.assignments[0]), id: '00000000-0000-4000-8000-000000000051', task_type: 'rate', status: 'submitted', submitted_at: new Date().toISOString() });
  state.documents.push({ ...structuredClone(state.documents[0]), id: '00000000-0000-4000-8000-000000000052', label: 'Alternative explanation', language: 'en', generic_topic_name: 'Evaporation', conversation_title: 'Alternative explanation', transcript: structuredClone(sample) });
  await page.route('**/rest/v1/comparison_assignments?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify([
    { id: '00000000-0000-4000-8000-000000000053', conversation_a_id: ids.doc, conversation_b_id: '00000000-0000-4000-8000-000000000052', annotator_id: ids.alice, mode: 'whole_conversation', status: 'in_progress', is_active: true },
    { id: '00000000-0000-4000-8000-000000000054', conversation_a_id: ids.doc, conversation_b_id: '00000000-0000-4000-8000-000000000052', annotator_id: ids.bob, mode: 'turn_wise', status: 'not_started', is_active: false },
  ]) }));
  await login(page, 'admin');
  await page.getByRole('navigation', { name: 'Administration' }).getByRole('link', { name: 'Assignments' }).click();
  await expect(page).toHaveURL(/\/assignments$/);
  await expect(page.getByRole('heading', { name: 'Annotator assignments' })).toBeVisible();
  await expect(page.getByText('3 active assignments')).toBeVisible();
  const alice = page.locator('.admin-annotator').filter({ has: page.locator('summary strong', { hasText: 'alice' }) });
  await expect(alice.locator('summary')).toContainText('1/3 completed');
  await alice.locator('summary').click();
  await expect(alice.getByRole('link', { name: /Whole conversation/ })).toHaveAttribute('href', '/comparisons/00000000-0000-4000-8000-000000000053');
  await expect(alice.getByRole('link', { name: sample.label, exact: true }).first()).toHaveAttribute('href', `/assignments/${ids.a}/view`);
  await expect(alice.getByRole('link', { name: sample.label, exact: true }).nth(1)).toHaveAttribute('href', '/assignments/00000000-0000-4000-8000-000000000051/view');
  const bob = page.locator('.admin-annotator').filter({ has: page.locator('summary strong', { hasText: 'bob' }) });
  await expect(bob.locator('summary')).toContainText('0 assigned');
});

test('annotators cannot open the admin assignments page', async ({ page }) => {
  await backend(page);
  await login(page, 'alice');
  await page.goto('/assignments');
  await expect(page.getByRole('heading', { name: 'Annotator dashboard' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Annotator assignments' })).toHaveCount(0);
});
