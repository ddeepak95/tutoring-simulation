import { expect, test } from '@playwright/test';
import { backend, login } from './mock';

const markdown = '### Evaporation\n\nதமிழ் 😀 Wet **clothes** drying is *evaporation*.\n\n1. **Heat**\n2. Add energy\n\n> Water &amp; vapour\n\n| Value | Meaning |\n| --- | --- |\n| 74 pm | Bond length |\n\n```text\nr = 74 / 2\n```\n\n`A &amp; B` and \\*literal\\*.\n\nHave you **understood**? Have you **understood**?';

test('section labeling saves exact Markdown evidence and remains editable after reload', async ({ page }) => {
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
  const section = turn.getByRole('button', { name: 'Turn 1 - Section 1', exact: true });
  await section.click();
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.detail_level).toBe('Brief');
  const evidence = state.assignments[0].annotations[0].evidence[0];
  expect(evidence.quote).toBe(markdown);
  expect(evidence.start).toBe(0);
  expect(markdown.slice(evidence.start, evidence.end)).toBe(evidence.quote);
  await page.reload();
  await expect(turn.locator('mark')).toHaveCount(0);
  await section.click();
  await page.getByRole('button', { name: 'Elaborated', exact: true }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await expect.poll(() => state.assignments[0].annotations[0].entry.detail_level).toBe('Elaborated');
  expect(state.documents[0].transcript.messages[0].text).toBe(markdown);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('repeated Markdown sections retain their exact source boundaries', async ({ page }) => {
  const state = await backend(page);
  const section = '## Example\n\nWet **clothes** drying.\n\n1. Add heat\n2. Add energy';
  const text = `${section}\n\n${section}`;
  state.documents[0].transcript.messages[0].text = text;
  await login(page, 'alice');
  await page.locator('a[href^="/assignments/"]').first().click();
  const turn = page.locator('[data-turn-id="t1"]');
  await turn.getByRole('button', { name: 'Turn 1 - Section 2', exact: true }).click();
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Explained', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.detail_level).toBe('Explained');
  const evidence = state.assignments[0].annotations[0].evidence[0];
  expect(evidence.quote).toBe(section);
  expect(evidence.start).toBe(text.lastIndexOf(section));
  await page.reload();
  await expect(turn.locator('mark')).toHaveCount(0);
  await expect(turn.locator('.section-annotation-label').nth(0)).toHaveAttribute('data-annotation-ids', '');
  await expect(turn.locator('.section-annotation-label').nth(1)).toHaveAttribute('data-annotation-ids', /.+/);
});

test('feature pills filter Markdown section labels without changing saved annotations', async ({ page }) => {
  const state = await backend(page);
  await login(page, 'alice');
  await page.locator('a[href^="/assignments/"]').first().click();
  await page.locator('[data-turn-id="t1"]').getByRole('button', { name: 'Turn 1 - Section 1', exact: true }).click();
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await page.locator('[data-turn-id="t2"]').getByRole('button', { name: 'Turn 2 - Section 1', exact: true }).click();
  await page.getByRole('button', { name: 'Analogies', exact: true }).click();
  await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await expect(page.locator('.section-annotation-label[data-annotation-ids]:not([data-annotation-ids=""])')).toHaveCount(2);
  const filters = page.getByRole('list', { name: 'Feature counts' });
  await filters.getByRole('button', { name: 'Filter Examples highlights' }).click();
  await expect(page.locator('.section-annotation-label[data-annotation-ids]:not([data-annotation-ids=""])')).toHaveCount(1);
  await expect(page.locator('.section-annotation-label[data-annotation-ids]:not([data-annotation-ids=""])')).toHaveAttribute('title', 'Examples');
  await page.getByRole('button', { name: 'Show all highlights' }).click();
  await expect(page.locator('.section-annotation-label[data-annotation-ids]:not([data-annotation-ids=""])')).toHaveCount(2);
  await expect.poll(() => state.assignments[0].annotations.length).toBe(2);
});
