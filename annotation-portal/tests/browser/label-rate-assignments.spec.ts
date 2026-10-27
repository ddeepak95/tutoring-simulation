import { expect, test } from '@playwright/test';
import { backend, ids, login } from './mock';

test('admin assigns Label and Rate independently and annotators see one dashboard', async ({ page }) => {
  const state = await backend(page);
  await login(page, 'admin');
  await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button', { name: /Assign users/ }).click();
  const menu = page.getByRole('dialog', { name: 'Conversation actions' });
  await expect(menu.getByRole('link', { name: 'View Labeling' })).toBeVisible();
  await expect(menu.getByRole('link', { name: 'View Rating' })).toBeVisible();
  await menu.getByRole('link', { name: 'View Labeling' }).click();
  await expect(page.getByRole('heading', { name: 'View Labeling' })).toBeVisible();
  await page.getByRole('link', { name: 'Back to conversations' }).click(); await page.locator('.topic-group').first().locator('summary').click();
  await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button', { name: /Assign users/ }).click();
  const assignmentMenu = page.getByRole('dialog', { name: 'Conversation actions' });
  await assignmentMenu.getByRole('button', { name: 'Assign', exact: true }).click();
  const assign = page.getByRole('dialog', { name: 'Assign tasks' });
  await assign.getByRole('tab', { name: 'Turn rating' }).click();
  await assign.getByLabel('alice').check();
  await assign.getByRole('button', { name: 'Assign rating' }).click();
  await expect.poll(() => state.assignments.some(row => row.annotator_id === ids.alice && row.task_type === 'rate')).toBe(true);
  expect(state.assignments.filter(row => row.annotator_id === ids.alice).map(row => row.task_type).sort()).toEqual(['label', 'rate']);

  await page.getByRole('button', { name: 'Close menu' }).click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await login(page, 'alice');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: 'Annotator dashboard' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Label instructional features' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Label instructional features' }).getByRole('link', { name: /Evaporation/ })).toHaveCount(1);
  await expect(page.getByRole('region', { name: 'Rate tutor turns' }).getByRole('link', { name: /Evaporation/ })).toHaveCount(1);
  await expect(page.getByRole('region', { name: 'Compare' })).toBeVisible();
  await page.getByRole('region', { name: 'Rate tutor turns' }).getByRole('link', { name: /Evaporation/ }).click();
  await expect(page.getByRole('complementary', { name: 'Tutor turn ratings' })).toBeVisible();
  await page.getByRole('button', { name: /Assignments/ }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/label'); await expect(page).toHaveURL(/\/$/);
  await page.goto('/rate'); await expect(page).toHaveURL(/\/$/);
});
