import { expect, test } from '@playwright/test';
import { backend, login } from './mock';

test('labeling guide opens by default and returns from feature details', async ({ page }) => {
  await backend(page);
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const guide = page.getByRole('complementary', { name: 'Labeling guide' });
  const cards = guide.locator('.coding-guide-item');
  await expect(guide).toBeVisible();
  await expect(page.getByRole('button', { name: 'Labeling guide', exact: true })).toHaveAttribute('aria-expanded', 'true');
  expect(await cards.count()).toBeGreaterThan(1);
  await expect(guide.getByRole('button', { name: /^Memory Aid/ })).toContainText('mnemonics and memory tips');
  await expect(cards.first().locator('.coding-guide-item-summary')).toHaveCSS('overflow', 'visible');
  for (const description of await guide.locator('.coding-guide-item-summary').allTextContents()) expect(description).not.toContain('?');
  await expect(guide.locator('select')).toHaveCount(0);

  await guide.getByRole('button', { name: /^Examples/ }).click();
  await expect(guide.getByRole('heading', { name: 'Examples' })).toBeVisible();
  await expect(guide.locator('.coding-guide-detail > p').first()).toContainText('This feature captures distinct cases');
  await expect(guide.locator('.coding-guide-detail li')).toHaveCount(4);
  await expect(guide.locator('.coding-guide-example')).toContainText('Wet clothes drying');
  await expect(guide.getByRole('button', { name: '← All features' })).toBeFocused();
  await expect(cards).toHaveCount(0);

  await guide.getByRole('button', { name: '← All features' }).click();
  await expect(cards.first()).toBeFocused();
  await guide.getByRole('button', { name: 'Close labeling guide' }).click();
  await page.getByRole('button', { name: 'Labeling guide', exact: true }).click();
  await expect(cards.first()).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(guide).toBeVisible();
});

test('each feature has concise guidance and an example', async ({ page }) => {
  await backend(page);
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const guide = page.getByRole('complementary', { name: 'Labeling guide' });
  const names = ['Memory Aid', 'Concepts', 'Examples', 'Analogies', 'Representations', 'Cultural References', 'Questions', 'Issues'];
  for (const name of names) {
    await guide.getByRole('button', { name: new RegExp(`^${name}`) }).click();
    await expect(guide.locator('.coding-guide-detail li')).toHaveCount(name === 'Memory Aid' ? 3 : name === 'Concepts' || name === 'Representations' ? 5 : 4);
    await expect(guide.locator('.coding-guide-example')).toBeVisible();
    await expect(guide.locator('.coding-guide-detail')).not.toContainText('Entry attributes:');
    if (name === 'Concepts') {
      await expect(guide.locator('.coding-guide-detail')).not.toContainText('hierarchy path');
      await expect(guide.locator('.coding-guide-detail')).not.toContainText('::');
    }
    await guide.getByRole('button', { name: '← All features' }).click();
  }
});

test('a highlight can record question and diagram quantities', async ({ page }) => {
  const state = await backend(page);
  state.documents[0].transcript.conversation_id = state.documents[0].id;
  state.documents[0].transcript.messages[0].text = 'Why A? Why B? Two diagrams show A and B.';
  state.documents[0].transcript.archive_source = 'capture';
  state.captureDocuments.push({ conversation_id: state.documents[0].id, html: '<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">Assistant</strong><p>Why A? Why B?</p><p>Two diagrams show A and B.</p></article></main>' });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const counts = page.getByRole('list', { name: 'Feature counts' });
  await expect(counts.getByRole('listitem')).toHaveCount(8);
  await expect(counts.locator('[data-feature-key="questions"] strong')).toHaveText('0');
  await expect(counts.locator('[data-feature-key="representations"] strong')).toHaveText('0');
  await counts.locator('[data-feature-key="questions"]').hover();
  await expect(page.getByRole('tooltip')).toContainText('Knowledge-checking');
  await expect(page.getByRole('tooltip')).toContainText('Instructional');
  const paragraphs = page.frameLocator('.exact-capture iframe').locator('article p');
  async function highlight(index: number) {
    await paragraphs.nth(index).evaluate(node => {
      const range = node.ownerDocument.createRange();
      range.selectNodeContents(node);
      const selection = node.ownerDocument.defaultView!.getSelection()!;
      selection.removeAllRanges(); selection.addRange(range);
      node.dispatchEvent(new node.ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
    });
  }
  await highlight(0);
  await page.getByRole('button', { name: 'Questions', exact: true }).click();
  const questions = page.getByRole('dialog', { name: 'Edit Questions' });
  await questions.getByRole('group', { name: 'Question classification' }).getByRole('button', { name: 'Instructional' }).click();
  await questions.getByRole('spinbutton', { name: 'Number of questions (optional)' }).fill('2');
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.question_count).toBe(2);
  await expect(counts.locator('[data-feature-key="questions"] strong')).toHaveText('2');
  await counts.locator('[data-feature-key="questions"] .feature-count-trigger').focus();
  await expect(page.getByRole('tooltip').locator('dl > div').filter({ hasText: 'Instructional' }).locator('dd')).toHaveText('2');
  await questions.getByRole('button', { name: 'Close annotation popup' }).click();
  await highlight(1);
  await page.getByRole('button', { name: 'Representations', exact: true }).click();
  const representations = page.getByRole('dialog', { name: 'Edit Representations' });
  await representations.getByRole('group', { name: 'Representation type' }).getByRole('button', { name: 'Diagram' }).click();
  await representations.getByRole('spinbutton', { name: 'Number of diagrams (optional)' }).fill('2');
  await expect.poll(() => state.assignments[0].annotations[1]?.entry.diagram_count).toBe(2);
  await expect(counts.locator('[data-feature-key="representations"] strong')).toHaveText('2');
  await counts.locator('[data-feature-key="representations"]').hover();
  await expect(page.getByRole('tooltip').locator('dl > div').filter({ hasText: 'Diagram' }).locator('dd')).toHaveText('2');
  const marks = page.frameLocator('.exact-capture iframe').locator('mark.exact-annotation');
  await expect(marks).toHaveCount(2);
  const questionsFilter = counts.locator('[data-feature-key="questions"]').getByRole('button', { name: 'Filter Questions highlights' });
  const representationsFilter = counts.locator('[data-feature-key="representations"]').getByRole('button', { name: 'Filter Representations highlights' });
  await questionsFilter.click();
  await expect(questionsFilter).toHaveAttribute('aria-pressed', 'true');
  await expect(marks).toHaveCount(1);
  await expect(marks).toContainText('Why A? Why B?');
  await representationsFilter.click();
  await expect(marks).toHaveCount(2);
  await questionsFilter.click();
  await expect(marks).toHaveCount(1);
  await expect(marks).toContainText('Two diagrams show A and B.');
  await page.getByRole('button', { name: 'Show all highlights' }).click();
  await expect(marks).toHaveCount(2);
  await expect(questionsFilter).toHaveAttribute('aria-pressed', 'false');
});

test('guide lists the available classification choices', async ({ page }) => {
  await backend(page);
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const guide = page.getByRole('complementary', { name: 'Labeling guide' });
  await guide.getByRole('button', { name: /^Representations/ }).click();
  await expect(guide.getByRole('region', { name: 'Available choices' })).toContainText('Diagram · Flowchart · Graph · Table · Equation · Other visual or symbolic form');
  await guide.getByRole('button', { name: /All features/ }).click();
  await guide.getByRole('button', { name: /^Questions/ }).click();
  await expect(guide.getByRole('region', { name: 'Available choices' })).toContainText('Question type: Knowledge-checking · Instructional');
  await guide.getByRole('button', { name: /All features/ }).click();
  await guide.getByRole('button', { name: /^Examples/ }).click();
  await expect(guide.getByRole('region', { name: 'Available choices' })).toContainText('Example occurrence: Fresh · Duplicate');
});

test('a tutor mnemonic can be highlighted as a Memory Aid', async ({ page }) => {
  const state = await backend(page);
  const text = 'Remember PEMDAS for the order of operations.';
  state.documents[0].transcript.conversation_id = state.documents[0].id;
  state.documents[0].transcript.messages[0].text = text;
  state.documents[0].transcript.archive_source = 'capture';
  state.captureDocuments.push({ conversation_id: state.documents[0].id, html: '<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">Assistant</strong><p>Remember PEMDAS for the order of operations.</p></article></main>' });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  await page.frameLocator('.exact-capture iframe').locator('article p').evaluate(node => {
    const textNode = node.firstChild!;
    const range = node.ownerDocument.createRange();
    range.setStart(textNode, 9); range.setEnd(textNode, 15);
    const selection = node.ownerDocument.defaultView!.getSelection()!;
    selection.removeAllRanges(); selection.addRange(range);
    node.dispatchEvent(new node.ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Memory Aid', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.feature).toBe('memory_aids');
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.memory_aid).toBe('PEMDAS');
});

test('concept annotations use the highlight and optional level choices', async ({ page }) => {
  const state = await backend(page);
  state.documents[0].transcript.conversation_id = state.documents[0].id;
  state.documents[0].transcript.messages[0].text = 'Forces';
  state.documents[0].transcript.archive_source = 'capture';
  state.captureDocuments.push({ conversation_id: state.documents[0].id, html: '<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">Assistant</strong><h2>Forces</h2></article></main>' });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  await page.frameLocator('.exact-capture iframe').locator('h2').evaluate(node => {
    const range = node.ownerDocument.createRange();
    range.selectNodeContents(node);
    const selection = node.ownerDocument.defaultView!.getSelection()!;
    selection.removeAllRanges(); selection.addRange(range);
    node.dispatchEvent(new node.ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Concepts', exact: true }).click();
  const popup = page.getByRole('dialog', { name: 'Edit Concepts' });
  await expect(popup.getByRole('heading', { name: 'Concepts' })).toBeVisible();
  await expect(popup).not.toContainText('Highlighted concept');
  await expect(popup).not.toContainText('Concept hierarchy path');
  await expect(popup.getByRole('textbox')).toHaveCount(0);
  const level = popup.getByRole('group', { name: 'Concept level (optional)' });
  await expect(level.getByRole('button', { name: 'No concept level' })).toHaveAttribute('aria-pressed', 'true');
  await level.getByRole('button', { name: 'Explanatory unit' }).click();
  await popup.getByRole('group', { name: 'Detail level' }).getByRole('button', { name: 'Brief' }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.topic).toBe('Forces');
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.concept_level).toBe('Explanatory unit');
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.detail_level).toBe('Brief');
  await popup.getByRole('group', { name: 'Detail level (optional)' }).getByRole('button', { name: 'No detail level' }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.detail_level).toBe('');
});
