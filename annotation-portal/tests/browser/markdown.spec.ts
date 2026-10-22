import { expect, test } from '@playwright/test';
import { backend, login, select } from './mock';

const markdown = '### Evaporation\n\nதமிழ் 😀 Wet **clothes** drying is *evaporation*.\n\n1. **Heat**\n2. Add energy\n\n> Water &amp; vapour\n\n| Value | Meaning |\n| --- | --- |\n| 74 pm | Bond length |\n\n```text\nr = 74 / 2\n```\n\n`A &amp; B` and \\*literal\\*.\n\nHave you **understood**? Have you **understood**?';

test('formatted transcript selections save exact Markdown evidence and remain editable after reload', async ({ page }) => {
  const state = await backend(page);
  state.documents[0].transcript.messages[0].text = markdown;
  state.documents[0].transcript.messages[1].text = '**Student text**';
  await login(page, 'alice'); await page.locator('a[href^="/assignments/"]').first().click();
  const turn = page.locator('[data-turn-id="t1"]');
  await expect(turn.getByRole('heading', { level: 3, name: 'Evaporation' })).toBeVisible();
  await expect(turn.locator('ol li')).toHaveCount(2); await expect(turn.locator('blockquote')).toContainText('Water & vapour');
  await expect(turn.getByRole('table')).toContainText('74 pm'); await expect(turn.locator('pre code')).toHaveText('r = 74 / 2');
  await expect(page.locator('[data-turn-id="s1"] .turn-heading strong')).toHaveText('You');
  await expect(page.locator('[data-turn-id="s1"] .turn-body strong')).toHaveText('Student text');
  await expect(page.locator('[data-turn-id="s1"] .turn-heading')).not.toContainText('s1');
  await select(page, 't1', 'Wet clothes drying');
  await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.detail_level).toBe('Brief');
  const evidence = state.assignments[0].annotations[0].evidence[0];
  expect(evidence.quote).toBe('Wet **clothes** drying');
  expect(evidence.start).toBe(markdown.indexOf('Wet')); expect(markdown.slice(evidence.start, evidence.end)).toBe(evidence.quote);
  await page.reload(); await expect(turn.locator('strong mark')).toHaveText('clothes');
  await turn.locator('strong mark').click(); await page.getByRole('button', { name: 'Elaborated', exact: true }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await expect.poll(() => state.assignments[0].annotations[0].entry.detail_level).toBe('Elaborated');
  for (const [visible, source] of [['Water & vapour', 'Water &amp; vapour'], ['r = 74 / 2', 'r = 74 / 2'], ['A &amp; B', 'A &amp; B'], ['*literal*', '\\*literal\\*'], ['74 pm', '74 pm']]) {
    await select(page, 't1', visible); await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
    await expect.poll(() => state.assignments[0].annotations.at(-1)?.evidence[0].quote).toBe(source);
  }
  await select(page, 't1', 'understood'); await page.getByRole('button', { name: 'Questions', exact: true }).click(); await page.getByRole('button', { name: 'Instructional', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations.at(-1)?.evidence[0].quote).toBe('understood');
  expect(state.assignments[0].annotations.at(-1).evidence[0].occurrence).toBe(1);
  await turn.locator('strong').filter({ hasText: 'understood' }).last().evaluate(node => {
    const range = document.createRange(); range.selectNodeContents(node);
    const selection = window.getSelection()!; selection.removeAllRanges(); selection.addRange(range);
    node.closest('[data-turn-id]')!.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Questions', exact: true }).click(); await page.getByRole('button', { name: 'Instructional', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations.at(-1)?.evidence[0].occurrence).toBe(2);
  expect(state.documents[0].transcript.messages[0].text).toBe(markdown);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('existing source highlights render across formatting and multi-block selections retain source boundaries', async ({ page }) => {
  const state = await backend(page); state.documents[0].transcript.messages[0].text = markdown;
  await login(page, 'alice'); await page.locator('a[href^="/assignments/"]').first().click();
  await select(page, 't1', 'HeatAdd energy');
  await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Explained', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.detail_level).toBe('Explained');
  const evidence = state.assignments[0].annotations[0].evidence[0];
  expect(evidence.quote).toBe('Heat**\n2. Add energy');
  await page.reload(); await expect(page.locator('ol li mark')).toHaveCount(2);
  expect(markdown.slice(evidence.start, evidence.end)).toBe(evidence.quote);
});

test('feature pills filter Markdown highlights without changing saved annotations', async ({ page }) => {
  const state = await backend(page);
  await login(page, 'alice');
  await page.locator('a[href^="/assignments/"]').first().click();
  await select(page, 't1', 'Wet clothes drying');
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await select(page, 't2', 'Think of the process like people leaving a crowded room');
  await page.getByRole('button', { name: 'Analogies', exact: true }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await expect(page.locator('.transcript mark')).toHaveCount(2);
  const filters = page.getByRole('list', { name: 'Feature counts' });
  await filters.getByRole('button', { name: 'Filter Examples highlights' }).click();
  await expect(page.locator('.transcript mark')).toHaveCount(1);
  await expect(page.locator('.transcript mark')).toContainText('Wet clothes drying');
  await page.getByRole('button', { name: 'Show all highlights' }).click();
  await expect(page.locator('.transcript mark')).toHaveCount(2);
  await expect.poll(() => state.assignments[0].annotations.length).toBe(2);
});
