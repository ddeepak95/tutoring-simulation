import { expect, test } from '@playwright/test';
import { backend, login } from './mock';

test('conversation view displays saved API sections as read-only labels', async ({ page }) => {
  const state=await backend(page);
  const document=state.documents[0];
  const text='## Definition\n\nFirst.\n\n## Calculation\n\n\\[74/2=37\\]';
  Object.assign(document.transcript,{access_type:'API',provider:'gpt-6.1-sol'});
  document.transcript.messages[0].text=text;
  // One pinned section intentionally differs from the heading-based proposal.
  state.sections.push({conversation_id:document.id,section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end:text.length,quote:text,occurrence:1,source_hash:'test-source'});
  await login(page,'admin');
  await page.goto(`/conversations/${document.id}`);
  const panel=page.getByRole('tabpanel',{name:'Conversation',exact:true});
  await expect(panel.locator('[data-section-id="t1s1"]')).toHaveText('Turn 1 - Section 1');
  await expect(panel.locator('.section-annotation-boundary').first()).toContainText('Definition');
  await expect(panel.locator('.section-annotation-boundary').first()).toContainText('Calculation');
  await expect(panel.locator('.section-annotation-boundary').first().locator('.katex-display')).toHaveCount(1);
  await expect(panel.getByRole('button',{name:/Section/})).toHaveCount(0);
  await expect(panel.locator('.section-annotation-controls')).toHaveCount(0);
  await page.reload();
  await expect(panel.locator('[data-section-id="t1s1"]')).toHaveText('Turn 1 - Section 1');
  expect(state.sections).toHaveLength(1);
  expect(state.requests).not.toContain('/rest/v1/rpc/register_conversation_sections');
  expect(state.saves).toBe(0);
});

test('API section divisions persist after labeling and use the registered inventory on reload', async ({ page }) => {
  const state = await backend(page);
  const text = 'Definition.\n\nCalculation:\n\n\\[74/2=37\\]\n\nSteps:\n\n1. Measure\n2. Divide\n\n---\n\nConclusion.';
  Object.assign(state.documents[0].transcript, { access_type: 'API', provider: 'gpt-6.1-sol' });
  state.documents[0].transcript.messages[0].text = text;
  await login(page, 'alice');
  await page.locator('a[href^="/assignments/"]').first().click();
  const turn = page.locator('[data-turn-id="t1"]');
  await expect(turn.locator('.section-annotation-label')).toHaveCount(4);
  await expect(turn.locator('.section-annotation-boundary').nth(1).locator('.katex-display')).toHaveCount(1);
  await expect(turn.locator('.section-annotation-boundary').nth(2).locator('ol li')).toHaveCount(2);
  await turn.getByRole('button', { name: 'Turn 1 - Section 2', exact: true }).click();
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Brief', exact: true }).click();
  const quote = 'Calculation:\n\n\\[74/2=37\\]';
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.quote).toBe(quote);
  const inventory = structuredClone(state.sections);
  await page.reload();
  await expect(turn.locator('.section-annotation-label')).toHaveCount(4);
  expect(state.sections).toEqual(inventory);
  await expect(turn.locator('.section-annotation-label').nth(1)).toHaveAttribute('data-annotation-ids', /.+/);
});

test('inline Tamil equations and multiline comparisons render in the labeling view', async ({ page }) => {
  const state = await backend(page);
  const text = String.raw`**விடை:** \(74÷2=\boxed{37\ \text{pm}}\).

> **pm** என்பது பிக்கோமீட்டர்; \(1\ \text{pm}=10^{-12}\ \text{m}\).

\[
\text{ஒற்றைப் பிணைப்பு நீளம்}
>
\text{இரட்டைப் பிணைப்பு நீளம்}
>
\text{முப்பிணைப்பு நீளம்}
\]`;
  state.documents[0].transcript.messages[0].text = text;
  await login(page, 'alice');
  await page.locator('a[href^="/assignments/"]').first().click();
  const turn = page.locator('[data-turn-id="t1"]');
  await expect(turn.locator('.markdown-inline-math .katex')).toHaveCount(2);
  await expect(turn.locator('.katex-display')).toHaveCount(1);
  await expect(turn.locator('.katex-error')).toHaveCount(0);
  await expect(turn.locator('blockquote')).toHaveCount(1);
  await expect(turn.locator('.markdown-inline-math').first()).toBeVisible();
  await turn.getByRole('button', { name: 'Turn 1 - Section 1', exact: true }).click();
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.quote).toBe(text);
  expect(state.documents[0].transcript.messages[0].text).toBe(text);
});

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
