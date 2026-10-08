import { expect, test } from '@playwright/test';
import { backend, ids, login } from './mock';

test('admin deletion requires explicit confirmation, shows work counts, and removes only the selected conversation', async ({ page }) => {
  const state = await backend(page);
  state.assignments[0].annotations = [{ id: 'saved-example', feature: 'examples' }]; state.assignments[0].revision = 3;
  const other = { ...state.documents[0], id: '00000000-0000-4000-8000-000000000020', label: 'Other topic', transcript: { ...state.documents[0].transcript, conversation_id: 'other-topic', learning_topic: 'Other topic' } };
  state.documents.push(other);
  await login(page, 'admin');
  async function open() { await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click(); await page.getByRole('dialog', { name: 'Assign annotators' }).getByRole('button', { name: 'Delete conversation', exact: true }).click(); }
  const dialog = page.getByRole('dialog', { name: 'Delete conversation?', exact: true });
  await open(); await expect(dialog).toContainText('permanently'); await expect(dialog).toContainText('Source files are retained');
  await expect(dialog.locator('.deletion-counts dd')).toHaveText(['2', '1', '3']);
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click(); await expect(dialog).toHaveCount(0);
  expect(state.documents).toHaveLength(2); expect(state.requests.filter(path => path.endsWith('/delete_conversation'))).toHaveLength(0);
  await open(); await page.keyboard.press('Escape'); await expect(dialog).toHaveCount(0); expect(state.documents).toHaveLength(2);
  await open(); await dialog.getByRole('button', { name: 'Delete conversation', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Conversation and associated annotation work deleted.');
  await expect(page.locator(`[data-conversation-id="${ids.doc}"]`)).toHaveCount(0); expect(state.documents).toEqual([other]); expect(state.assignments).toHaveLength(0);
  await page.reload(); await expect(page.locator('.conversation-table tbody tr')).toHaveCount(1); await expect(page.locator('.conversation-table')).toContainText('Other topic');
});

test('stale deletion confirmations and request failures preserve work and require renewed review', async ({ page }) => {
  const state = await backend(page); await login(page, 'admin');
  await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click(); await page.getByRole('dialog', { name: 'Assign annotators' }).getByRole('button', { name: 'Delete conversation', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Delete conversation?', exact: true });
  await expect(dialog.locator('.deletion-counts dd')).toHaveText(['2', '0', '0']);
  state.assignments[0].revision++;
  await dialog.getByRole('button', { name: 'Delete conversation', exact: true }).click(); await expect(dialog.getByRole('alert')).toContainText('changed');
  await expect(dialog.locator('.deletion-counts dd')).toHaveText(['2', '0', '1']); expect(state.documents).toHaveLength(1); expect(state.assignments).toHaveLength(2);
  state.failNextDelete = true; await dialog.getByRole('button', { name: 'Delete conversation', exact: true }).click(); await expect(dialog.getByRole('alert')).toContainText('Network unavailable');
  await expect(dialog.getByRole('button', { name: 'Delete conversation', exact: true })).toBeDisabled();
  await dialog.getByRole('button', { name: 'Refresh deletion details', exact: true }).click(); await expect(dialog.locator('.deletion-counts dd')).toHaveText(['2', '0', '1']);
  await page.setViewportSize({ width: 390, height: 844 }); await expect(dialog).toBeInViewport(); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click(); expect(state.assignments).toHaveLength(2);
});
