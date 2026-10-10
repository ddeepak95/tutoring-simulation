import { expect, test } from '@playwright/test';
import { backend, ids, login, rateAllTutorTurns, select } from './mock';

test('every tutor turn must be fully rated; ratings autosave, survive reload, and appear read only in review', async ({ page }) => {
  const state = await backend(page); await login(page, 'alice'); await page.locator('.assignment-card').click();
  const panel = page.getByRole('complementary', { name: 'Tutor turn ratings' });
  await expect(panel.getByRole('heading', { name: 'Instructional Sequence', exact: true })).toHaveCount(0);
  await expect(panel.locator('.rating-dimension')).toHaveCount(10);
  await expect(page.getByRole('button', { name: 'Rate tutor turn t1', exact: true })).toHaveText('Rating pending');
  await expect(page.getByRole('button', { name: /tutor turn s1/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Complete Annotation', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Rate every tutor turn'); expect(state.assignments[0].status).toBe('not_started');
  await panel.getByRole('button', { name: 'Relevance: 3', exact: true }).click();
  await expect.poll(() => state.assignments[0].turn_ratings.t1?.values.relevance).toBe('3');
  await page.reload(); await expect(panel.getByRole('button', { name: 'Relevance: 3', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await rateAllTutorTurns(page);
  await expect(page.getByRole('button', { name: 'Rate tutor turn t1', exact: true })).toHaveText('Rated');
  await expect(page.getByRole('button', { name: 'Rate tutor turn t2', exact: true })).toHaveText('Rated');
  await expect(panel).toContainText('2 of 2 tutor turns rated');
  page.once('dialog', dialog => void dialog.accept()); await page.getByRole('button', { name: 'Complete Annotation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0);
  expect(state.assignments[0].annotations).toHaveLength(0); expect(state.assignments[0].status).toBe('submitted');
  await expect(panel.getByRole('button', { name: 'Relevance: 1', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Sign out', exact: true }).click(); await login(page, 'admin');
  await page.goto(`/assignments/${ids.a}/view`); await expect(panel).toContainText('2 of 2 tutor turns rated');
  await expect(panel.getByRole('button', { name: 'Relevance: 1', exact: true })).toBeDisabled();
  expect(state.assignments[1].turn_ratings).toEqual({});
});

test('issues require explanation without correction status, and support linked correction passages', async ({ page }) => {
  const state = await backend(page);
  const wrong = 'Evaporation only occurs at boiling temperature.'; const correction = 'Evaporation can occur below boiling temperature.';
  state.documents[0].transcript.messages[0].text = wrong; state.documents[0].transcript.messages[2].text = correction;
  await login(page, 'alice'); await page.locator('.assignment-card').click();
  await select(page, 't1', wrong); await page.getByRole('button', { name: 'Issues', exact: true }).click();
  await page.getByLabel('Issue description', { exact: true }).fill('Evaporation incorrectly restricted to boiling temperature');
  await expect(page.getByLabel('Correction status (whether and where it was corrected)', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await page.getByRole('button', { name: 'Complete Annotation', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Complete the details');
  await page.getByRole('button', { name: 'Edit Issues', exact: true }).click();
  await page.getByLabel('Why it is an issue and the correct claim or step', { exact: true }).fill('Evaporation occurs below boiling temperature at the liquid surface.');
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await select(page, 't2', correction); await page.getByRole('button', { name: 'Add passage to an existing entry', exact: true }).click();
  await page.locator('.selection-menu').getByRole('button', { name: /Issues/ }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence.length).toBe(2);
  expect(state.assignments[0].annotations[0].entry.turn_locations).toEqual(['t1', 't2']);
  expect(state.assignments[0].annotations[0].evidence.map((evidence: { quote: string }) => evidence.quote)).toEqual([wrong, correction]);
  await page.reload(); await expect(page.locator('mark')).toHaveCount(2);
  await rateAllTutorTurns(page); page.once('dialog', dialog => void dialog.accept()); await page.getByRole('button', { name: 'Complete Annotation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'View Issues', exact: true }).first().hover();
  await expect(page.getByRole('dialog', { name: 'View Issues' })).toContainText('Evaporation occurs below boiling temperature at the liquid surface.');
});

test('failed rating saves recover locally and mobile turn buttons reach the rating panel', async ({ page }) => {
  const state = await backend(page); await login(page, 'alice'); await page.locator('.assignment-card').click();
  state.failSaves = true;
  await page.getByRole('button', { name: 'Relevance: 3', exact: true }).click();
  await expect(page.locator('.save-status')).toContainText('Cloud save failed');
  expect(state.assignments[0].turn_ratings).toEqual({});
  await page.reload(); await expect(page.getByText('A local recovery draft is available.', { exact: true })).toBeVisible();
  state.failSaves = false; await page.getByRole('button', { name: 'Restore draft', exact: true }).click();
  await expect.poll(() => state.assignments[0].turn_ratings.t1?.values.relevance).toBe('3');
  await page.setViewportSize({ width: 390, height: 844 }); await page.getByRole('button', { name: 'Rate tutor turn t2', exact: true }).click();
  await expect(page.getByLabel('Tutor turn', { exact: true })).toHaveValue('t2');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
