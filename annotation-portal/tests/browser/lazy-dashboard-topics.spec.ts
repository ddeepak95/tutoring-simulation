import { test, expect } from '@playwright/test';
import { backend, login } from './mock';

test('home lists only topics, topic pages load on demand and retry independently', async ({ page }) => {
  const state = await backend(page);
  Object.assign(state.documents[0], { topic_id: 'brain', generic_topic_name: 'Brain' });
  state.documents[0].transcript.topic_id = 'brain';
  state.documents.push({ ...structuredClone(state.documents[0]), id: '00000000-0000-4000-8000-000000000090', label: 'Heart', topic_id: 'heart', generic_topic_name: 'Heart', transcript: { ...structuredClone(state.documents[0].transcript), topic_id: 'heart', learning_topic: 'Heart' } } as any);
  const loaded: string[] = []; let failHeart = true;
  await page.route('**/rest/v1/rpc/dashboard_topic_conversations**', async route => {
    const key = route.request().postDataJSON().p_topic_key; loaded.push(key);
    if (key === 'heart' && failHeart) { failHeart = false; await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ message: 'Temporary topic load failure' }) }); }
    else await route.fallback();
  });
  await login(page, 'admin', { expandTopic: false });
  await expect(page.getByRole('heading', { name: 'Topics', exact: true })).toBeVisible();
  await expect(page.locator('.topic-link h2')).toHaveText(['Brain', 'Heart']);
  expect(loaded).toEqual([]); expect(state.requests).not.toContain('/rest/v1/assignments');
  await expect(page.locator('.provider-language-link')).toHaveCount(0);
  await expect(page.locator('.progress')).toHaveCount(0);
  await page.locator('[data-topic-key="brain"]').click();
  await expect(page).toHaveURL('/topics/brain');
  await expect(page.getByRole('heading', { name: 'Brain', exact: true })).toBeVisible();
  await expect(page.locator('.provider-language-link')).toHaveCount(1); expect(loaded).toEqual(['brain']);
  await page.getByRole('link', { name: 'All topics', exact: true }).click();
  await page.locator('[data-topic-key="brain"]').click();
  await expect(page.locator('.provider-language-link')).toHaveCount(1); expect(loaded).toEqual(['brain']);
  await page.getByRole('link', { name: 'All topics', exact: true }).click();
  await page.locator('[data-topic-key="heart"]').click();
  await expect(page.getByRole('alert')).toContainText('Temporary topic load failure');
  await page.getByRole('button', { name: 'Retry loading conversations' }).click();
  await expect(page.locator('.provider-language-link')).toHaveCount(1);
  expect(loaded).toEqual(['brain', 'heart', 'heart']);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Heart', exact: true })).toBeVisible();
  await page.locator('.provider-accordion>summary').first().click();
  await page.locator('.provider-language-link').click();
  await expect(page.getByLabel('Select all conversations in this group')).toBeEnabled();
  await page.getByRole('navigation', { name: 'Conversation navigation' }).getByRole('link', { name: 'Heart', exact: true }).click();
  await expect(page).toHaveURL('/topics/heart');
});
