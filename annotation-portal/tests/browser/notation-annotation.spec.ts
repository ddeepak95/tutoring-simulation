import { expect, test } from '@playwright/test';
import { backend, ids, login } from './mock';

for (const captured of [true, false]) test(`sentence selection does not annotate and saved sentence labels open through sections (captured: ${captured})`, async ({ page }) => {
  const state = await backend(page);
  const text = 'First sentence. Second sentence.';
  state.documents[0].transcript.messages[0].text = text;
  state.assignments[0].annotations = [{
    id: 'saved-sentence', feature: 'examples',
    entry: { example: 'First sentence.', detail_level: 'Brief', turn_locations: ['t1'] },
    evidence: [{ turn_id: 't1', start: 0, end: 15, quote: 'First sentence.', occurrence: 1, example_status: 'Fresh' }],
  }];
  if (captured) {
    state.documents[0].transcript.conversation_id = ids.doc;
    state.documents[0].transcript.archive_source = 'capture';
    state.captureDocuments.push({ conversation_id: ids.doc, html: `<!doctype html><article class="capture-message capture-assistant" data-turn-id="t1"><p>${text}</p></article>` });
  }
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const turn = captured ? page.frameLocator('.exact-capture iframe').locator('[data-turn-id="t1"]') : page.locator('[data-turn-id="t1"]');
  const boundary = captured ? page.frameLocator('.exact-capture iframe').locator('.exact-section-boundary') : turn.locator('.section-annotation-boundary');
  await expect(boundary).toHaveCount(1);
  await expect(boundary).toHaveCSS('border-top-style', 'dashed');
  if (captured) await expect(boundary).toHaveCSS('pointer-events', 'none');
  const box = await boundary.boundingBox(), paragraph = await turn.locator('p').first().boundingBox();
  expect(box!.y).toBeLessThanOrEqual(paragraph!.y);
  expect(box!.y + box!.height).toBeGreaterThanOrEqual(paragraph!.y + paragraph!.height);
  const sectionButton = turn.getByRole('button', { name: 'Turn 1 - Section 1', exact: true });
  await expect.poll(async () => {
    const border = (await boundary.boundingBox())!, button = (await sectionButton.boundingBox())!;
    return Math.abs(border.y + border.height - button.y - button.height / 2);
  }).toBeLessThan(2);
  await expect(sectionButton).toHaveCSS('border-radius', '0px');
  const topLabel = captured ? page.frameLocator('.exact-capture iframe').locator('.exact-section-top-label') : turn.locator('.section-annotation-top-label');
  await expect(topLabel).toHaveText('Turn 1 - Section 1');
  await expect(topLabel).toHaveCSS('pointer-events', 'auto');
  await expect.poll(async () => {
    const border = (await boundary.boundingBox())!, label = (await topLabel.boundingBox())!;
    return Math.abs(border.y - label.y - label.height / 2);
  }).toBeLessThan(2);
  const topBox = (await topLabel.boundingBox())!, sectionBox = (await boundary.boundingBox())!;
  expect(Math.abs(sectionBox.x + sectionBox.width - topBox.x - topBox.width - 24)).toBeLessThan(2);
  await expect(turn.locator('mark')).toHaveCount(0);
  await turn.locator('p').first().evaluate(node => {
    const range = node.ownerDocument.createRange();
    range.selectNodeContents(node);
    const selection = node.ownerDocument.defaultView!.getSelection()!;
    selection.removeAllRanges(); selection.addRange(range);
    node.dispatchEvent(new node.ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
    node.dispatchEvent(new node.ownerDocument.defaultView!.KeyboardEvent('keyup', { key: 'Shift', bubbles: true }));
  });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(state.assignments[0].annotations).toHaveLength(1);
  await turn.getByRole('button', { name: 'Turn 1 - Section 1', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Edit Examples' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Brief', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(turn.locator('mark')).toHaveCount(0);
  await expect(boundary).toHaveCount(1);
  await expect(boundary).toHaveCSS('border-top-style', 'dashed');
  expect(state.assignments[0].annotations[0].evidence[0].quote).toBe('First sentence.');
});

test('section labels select repeated sections and retain annotations after reload', async ({ page }) => {
  const state = await backend(page);
  const paragraph = 'Heat makes water evaporate.';
  const section = `Evaporation\n${paragraph}\nMore explanation.`;
  const source = `${section}\n\n${section}`;
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = source;
  state.captureDocuments.push({ conversation_id: ids.doc, html: `<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">Assistant</strong><h2>Evaporation</h2><p><strong>Heat</strong> makes water evaporate.</p><p>More explanation.</p><h3>Evaporation</h3><p>${paragraph}</p><p>More explanation.</p><p> </p></article><article class="capture-message capture-user"><p>A student paragraph.</p></article></main>` });

  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const frame = page.frameLocator('.exact-capture iframe');
  const labels = frame.locator('.exact-section-annotation-label');
  await expect(labels).toHaveText(['Turn 1 - Section 1', 'Turn 1 - Section 2']);
  await expect(labels.first()).toHaveCSS('font-size', '13px');
  await expect(labels.first()).toHaveCSS('display', 'block');
  await labels.nth(1).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.start).toBe(source.lastIndexOf(section));
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.quote).toBe(section);
  await expect(labels).toHaveText(['Turn 1 - Section 1', 'Turn 1 - Section 2']);
  await expect(labels.first()).toHaveAttribute('data-annotation-ids', '');
  await expect(labels.nth(1)).toHaveAttribute('data-annotation-ids', /.+/);

  await page.reload();
  await expect(labels).toHaveText(['Turn 1 - Section 1', 'Turn 1 - Section 2']);
  await labels.nth(1).click();
  await expect(page.getByRole('dialog', { name: 'Edit Examples' })).toBeVisible();
  await page.getByRole('button', { name: 'Delete highlight' }).click();
  const toast = page.locator('.editor-toast').filter({ hasText: 'Highlight deleted.' });
  await expect(toast).toBeVisible();
  await expect(page.locator('.editor-toast-stack')).toHaveCSS('position', 'fixed');
  await toast.getByRole('button', { name: 'Undo' }).click();
  await expect(toast).toHaveCount(0);
  await expect(labels.nth(1)).toHaveAttribute('data-annotation-ids', /.+/);
});

for (const metadataInSource of [false, true]) test(`section boundaries exclude metadata (canonical metadata: ${metadataInSource})`, async ({ page }) => {
  const state = await backend(page);
  const metadata = 'Agent-explored interactive state state_1 (capture action, not a learner response)';
  const sections = ['An introduction.\nMore introduction.', 'Main\nFirst paragraph.\nSecond paragraph.', 'Subheading\nA list item.', 'Bold title:\nFinal paragraph.'];
  const source = metadataInSource ? [...sections.slice(0, 3), metadata, sections[3]].join('\n') : sections.join('\n');
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = source;
  state.captureDocuments.push({ conversation_id: ids.doc, html: `<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><p><strong class="capture-speaker">Assistant</strong></p><p>An introduction.</p><p>More introduction.</p><section><h2>Main</h2><p>First paragraph.</p><p>Second paragraph.</p><section><h3>Subheading</h3><ul><li>A list item.</li></ul></section></section><h3>${metadata}</h3><div><p><strong>Bold title</strong>:</p></div><p>Final paragraph.</p></article><article class="capture-message capture-user"><h2>Student heading</h2><p>Student text.</p></article></main>` });

  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const frame = page.frameLocator('.exact-capture iframe');
  const labels = frame.locator('.exact-section-annotation-label');
  await expect(labels).toHaveText(['Turn 1 - Section 1', 'Turn 1 - Section 2', 'Turn 1 - Section 3', 'Turn 1 - Section 4']);
  await expect(frame.locator('.exact-section-boundary')).toHaveCount(4);
  for (const [index, section] of sections.entries()) {
    await expect(labels.nth(index)).toHaveAttribute('data-section-start', String(source.indexOf(section)));
    await expect(labels.nth(index)).toHaveAttribute('data-section-end', String(source.indexOf(section) + section.length));
  }
  await expect(frame.locator('h2').first().locator('xpath=preceding-sibling::*[1]')).toHaveText('Turn 1 - Section 1');
  await expect(frame.locator('[data-turn-id="t1"] .exact-section-annotation-label').last()).toHaveText('Turn 1 - Section 4');
});

test('a response without headings uses only section labels and preserves images and equations', async ({ page }) => {
  const state = await backend(page);
  const source = 'A calculation.\nF=ma\nCaptured diagram\nA list item.\nThe result.';
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = source;
  state.captureDocuments.push({ conversation_id: ids.doc, html: '<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">Assistant</strong><p>A calculation.</p><div data-d-component="math"><math><mi>F</mi><mo>=</mo><mi>ma</mi></math></div><div data-d-component="image"><img alt="Captured diagram" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" /></div><ul><li>A list item.</li></ul><p>The result.</p></article></main>' });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const frame = page.frameLocator('.exact-capture iframe');
  const label = frame.getByRole('button', { name: 'Turn 1 - Section 1', exact: true });
  await expect(frame.locator('.exact-section-annotation-label')).toHaveCount(1);
  await expect(frame.locator('.exact-image-annotation-label,.exact-notation-annotation-label')).toHaveCount(0);
  await expect(frame.locator('img')).toBeVisible();
  await expect(frame.locator('math')).toBeVisible();
  const boundary = frame.locator('.exact-section-boundary');
  await expect(boundary).toHaveCount(1);
  const initialHeight = (await boundary.boundingBox())!.height;
  await frame.locator('img').evaluate(image => { image.style.height = '160px'; });
  await expect.poll(async () => (await boundary.boundingBox())!.height).toBeGreaterThan(initialHeight + 100);
  await expect(label).toHaveAttribute('data-section-start', '0');
  await expect(label).toHaveAttribute('data-section-end', String(source.length));
  await label.click();
  await page.getByRole('button', { name: 'Examples', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.quote).toBe(source);
  await expect(label).toHaveAttribute('data-annotation-ids', /.+/);
  await page.reload();
  await expect(frame.locator('.exact-image-annotation-label,.exact-notation-annotation-label')).toHaveCount(0);
  await expect(frame.locator('img')).toBeVisible();
  await expect(frame.locator('math')).toBeVisible();
  await label.click();
  await expect(page.getByRole('dialog', { name: 'Edit Examples' })).toBeVisible();
});

test('original sections map exactly when canonical turns append unseen interactive capture states', async ({ page }) => {
  const state = await backend(page);
  const original = 'Quiz\nA question.\nQuiz\nA question.';
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = original + '\nAgent-explored interactive state state_1 (capture action, not a learner response):\nAn answer after interaction.';
  state.captureDocuments.push({ conversation_id: ids.doc, html: '<!doctype html><article class="capture-message capture-assistant" data-turn-id="t1"><h2>Quiz</h2><p>A question.</p><h2>Quiz</h2><p>A question.</p></article>' });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const labels = page.frameLocator('.exact-capture iframe').locator('.exact-section-annotation-label');
  await expect(labels).toHaveCount(2);
  await expect(labels.nth(1)).toHaveAttribute('data-section-start', '17');
  await expect(labels.nth(1)).toHaveAttribute('data-section-end', String(original.length));
  await labels.nth(1).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Examples', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.occurrence).toBe(2);
  expect(state.assignments[0].annotations[0].evidence[0].quote).toBe('Quiz\nA question.');
});

test('unmapped section text reports an error instead of selecting an approximate passage', async ({ page }) => {
  const state = await backend(page);
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = 'The canonical text.';
  state.captureDocuments.push({ conversation_id: ids.doc, html: '<!doctype html><article class="capture-message capture-assistant" data-turn-id="t1"><p>Different captured text.</p></article>' });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  await page.frameLocator('.exact-capture iframe').getByRole('button', { name: 'Turn 1 - Section 1', exact: true }).click();
  await expect(page.getByText('This passage could not be mapped to the conversation transcript.', { exact: true })).toBeVisible();
  expect(state.assignments[0].annotations).toHaveLength(0);
});
