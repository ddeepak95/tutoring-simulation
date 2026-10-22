import { expect, test } from '@playwright/test';
import { backend, ids, login, repositoryFixture } from './mock';

test('conversation rows are ordered by generic topic and then conversation title', async ({ page }) => {
  const state = await backend(page);
  const makeDocument = (id: string, generic_topic_name: string, conversation_title: string) => ({
    ...structuredClone(state.documents[0]), id, label: conversation_title, generic_topic_name, conversation_title,
  });
  state.documents.push(makeDocument('00000000-0000-4000-8000-000000000061', 'Brain', 'Working of the brain'));
  state.documents.push(makeDocument('00000000-0000-4000-8000-000000000062', 'Alkaline earth metals', 'Zinc explanation'));
  state.documents.push(makeDocument('00000000-0000-4000-8000-000000000063', 'Alkaline earth metals', 'Aluminum explanation'));
  await login(page, 'admin');
  await expect(page.locator('.conversation-table tbody tr')).toHaveCount(4);
  await expect(page.locator('.conversation-table tbody tr').nth(0)).toHaveAttribute('data-conversation-id', '00000000-0000-4000-8000-000000000063');
  await expect(page.locator('.conversation-table tbody tr').nth(1)).toHaveAttribute('data-conversation-id', '00000000-0000-4000-8000-000000000062');
  await expect(page.locator('.conversation-table tbody tr').nth(2)).toHaveAttribute('data-conversation-id', '00000000-0000-4000-8000-000000000061');
  await expect(page.locator('.conversation-table tbody tr').nth(3)).toHaveAttribute('data-conversation-id', ids.doc);
});

test('conversation menus preserve existing assignments and bulk assignment fills only missing work', async ({ page }) => {
  const state = await backend(page); const fixture = repositoryFixture();
  state.documents.push({ id: fixture.catalog.entries[2].source_conversation_id, label: 'Translated evaporation', language: 'English', transcript: { ...state.documents[0].transcript, conversation_id: fixture.catalog.entries[2].source_conversation_id, source_conversation_id: 'unimported-original', original_language: 'Tamil' } as any, created_at: new Date().toISOString() });
  const originalAssignments = structuredClone(state.assignments);
  await login(page, 'admin');
  const table = page.locator('.conversation-table');
  await expect(table.getByRole('columnheader', { name: 'Original language', exact: true })).toBeVisible();
  const translated = table.locator(`[data-conversation-id="${state.documents[1].id}"]`);
  await expect(translated.getByRole('cell', { name: 'Tamil', exact: true })).toBeVisible();
  await expect(translated.getByRole('cell', { name: 'English', exact: true })).toBeVisible();
  const originalButton = table.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button');
  await originalButton.click();
  const menu = page.getByRole('dialog', { name: 'Assign annotators' });
  await expect(menu.getByRole('checkbox', { name: /alice/ })).toBeChecked();
  await expect(menu.getByRole('checkbox', { name: /alice/ })).toBeDisabled();
  await expect(menu.getByRole('button', { name: 'Assign to selected annotators' })).toBeDisabled();
  await page.keyboard.press('Escape'); await expect(menu).toHaveCount(0); await expect(originalButton).toBeFocused();
  await translated.getByRole('button').click(); await page.getByRole('heading', { name: 'Conversations', exact: true }).click(); await expect(menu).toHaveCount(0);
  await table.getByLabel('Select all conversations').check(); await page.getByRole('button', { name: 'Assign selected', exact: true }).click();
  await expect(menu).toContainText('2 selected conversations'); await expect(menu).toContainText('Assigned to 1 of 2');
  await menu.getByRole('checkbox', { name: /alice/ }).check(); await menu.getByRole('checkbox', { name: /bob/ }).check();
  await menu.getByRole('button', { name: 'Assign to selected annotators' }).click();
  await expect(page.getByText('Created 2 independent assignments.', { exact: true })).toBeVisible();
  expect(state.assignments.slice(0, 2)).toEqual(originalAssignments);
  expect(state.assignments.filter(row => row.conversation_id === state.documents[1].id)).toHaveLength(2);
  await expect(translated).toContainText('alice'); await expect(translated).toContainText('bob');
  await translated.getByRole('button').click(); await expect(menu.getByRole('checkbox', { name: /bob/ })).toBeDisabled();
  await page.setViewportSize({ width: 390, height: 844 }); await expect(menu).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await translated.getByRole('button').click(); await expect(menu).toBeInViewport();
});

test('Settings is protected from annotators and supports direct admin navigation', async ({ page }) => {
  await backend(page); await login(page, 'alice');
  await expect(page.getByRole('link', { name: 'Settings', exact: true })).toHaveCount(0);
  await page.goto('/settings'); await expect(page.getByRole('heading', { name: 'Your assignments' })).toBeVisible(); await expect(page).toHaveURL(/\/$/);
  await page.getByRole('button', { name: 'Sign out' }).click(); await login(page, 'admin');
  await page.goto('/settings'); await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Create annotator', exact: true })).toBeVisible();
  await expect(page.locator('.annotator-list')).toContainText('alice'); await expect(page.locator('.annotator-list')).toContainText('bob');
  await page.getByRole('link', { name: 'Conversations', exact: true }).click(); await expect(page.locator('.conversation-table')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Create annotator', exact: true })).toHaveCount(0);
});
