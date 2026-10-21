import { expect, test } from '@playwright/test';
import { backend, ids, login } from './mock';

test('notation labels annotate repeated KaTeX and preserve the equation on reload', async ({ page }) => {
  const state = await backend(page);
  const formula = '<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>F</mi><mo>=</mo><mi>m</mi><mi>a</mi></mrow><annotation encoding="application/x-tex">F=ma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span>F</span><span>=</span><span>m</span><span>a</span></span></span>';
  const quote = 'F=maF=ma';
  const source = `First: ${quote}. Second: ${quote}.`;
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = source;
  state.captureDocuments.push({ conversation_id: ids.doc, html: `<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">Assistant</strong><p>First: ${formula}.</p><p>Second: ${formula}.</p></article></main>` });

  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const frame = page.frameLocator('.exact-capture iframe');
  const labels = frame.locator('.exact-notation-annotation-label');
  await expect(labels).toHaveText(['Notation 1', 'Notation 2']);
  await labels.nth(1).click();
  await page.getByRole('button', { name: 'Representations', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.start).toBe(source.lastIndexOf(quote));
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.quote).toBe(quote);

  await page.reload();
  await expect(labels).toHaveText(['Notation 1', 'Notation 2']);
  await expect(frame.locator('.katex math')).toHaveCount(2);
  await expect(labels.nth(1)).toHaveAttribute('data-annotation-ids', /.+/);
  await labels.nth(1).click();
  await expect(page.getByRole('dialog', { name: 'Edit Representations' })).toBeVisible();
  await page.getByRole('button', { name: 'Delete highlight' }).click();
  const toast = page.locator('.editor-toast').filter({ hasText: 'Highlight deleted.' });
  await expect(toast).toBeVisible();
  await expect(page.locator('.editor-toast-stack')).toHaveCSS('position', 'fixed');
  await toast.getByRole('button', { name: 'Undo' }).click();
  await expect(toast).toHaveCount(0);
  await expect(labels.nth(1)).toHaveAttribute('data-annotation-ids', /.+/);
});

test('consecutive display equations share one notation annotation', async ({ page }) => {
  const state = await backend(page);
  const formula = (value: string) => `<div data-d-component="math"><span class="katex-display"><span class="katex"><span class="katex-html">${value}</span></span></span></div>`;
  const source = 'A calculation:\nF=ma\na=F/m=10/100\na=0.1 m/s²\nThe result is 0.1 m/s².\nE=mc²';
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = source;
  state.captureDocuments.push({ conversation_id: ids.doc, html: `<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">Assistant</strong><p>A calculation:</p>${formula('F=ma')}${formula('a=F/m=10/100')}${formula('a=0.1 m/s²')}<p>The result is 0.1 m/s².</p>${formula('E=mc²')}</article></main>` });

  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const frame = page.frameLocator('.exact-capture iframe');
  const labels = frame.locator('.exact-notation-annotation-label');
  await expect(labels).toHaveText(['Notation 1', 'Notation 2']);
  await labels.first().click();
  await page.getByRole('button', { name: 'Representations', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.quote).toBe('F=ma\na=F/m=10/100\na=0.1 m/s²');
  await expect(frame.locator('.katex[data-annotation-ids]:not([data-annotation-ids=""])')).toHaveCount(3);
  await expect(labels.nth(1)).toHaveAttribute('data-annotation-ids', '');
});

test('image labels use the notation button style and still annotate images', async ({ page }) => {
  const state = await backend(page);
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.documents[0].transcript.messages[0].text = 'Captured diagram';
  state.captureDocuments.push({ conversation_id: ids.doc, html: '<!doctype html><main><article class="capture-message capture-assistant" data-turn-id="t1"><div data-d-component="box"><div data-d-component="box"><div data-d-component="image"><img alt="Diagram" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" /></div></div><p>Image caption</p></div></article></main>' });

  await login(page, 'alice');
  await page.getByRole('region', { name: 'Label instructional features' }).locator('.assignment-row').click();
  const frame = page.frameLocator('.exact-capture iframe');
  const label = frame.getByRole('button', { name: 't1-image-1' });
  await expect(label).toHaveCSS('display', 'block');
  await expect(label).toHaveCSS('border-top-style', 'solid');
  await expect(frame.locator('[data-d-component="box"]').first()).not.toContainText('t1-image-1');
  await expect(frame.locator('[data-d-component="box"]').first().locator('xpath=following-sibling::*[1]')).toHaveText('t1-image-1');
  await label.click();
  await page.getByRole('button', { name: 'Representations', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.evidence[0]?.quote).toBe('Captured diagram');
  await expect(label).toHaveAttribute('data-annotation-ids', /.+/);
});
