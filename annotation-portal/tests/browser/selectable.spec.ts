import { expect, test, type Page } from '@playwright/test';
import fs from 'node:fs';

async function setup(page: Page) {
  await page.route('https://selectable.test/**', route => route.fulfill({ contentType: route.request().url().endsWith('.js') ? 'text/javascript' : 'text/html; charset=utf-8', body: route.request().url().endsWith('.js') ? fs.readFileSync('../chatgpt-conversation-extension/src/selectable.js', 'utf8') : '<!doctype html><meta charset="utf-8"><body></body>' }));
  await page.goto('https://selectable.test/');
}
test('selectable layout retains source text, structure, math and assets and reflows long translations', async ({ page }) => {
  await setup(page);
  const result = await page.evaluate(async () => {
    const module = await import('https://selectable.test/selectable.js');
    const capture = { title: 'Evaporation', source: { conversation_id: 'source-1', url: 'https://chatgpt.com/c/source-1' }, captured_at: new Date().toISOString(), html: '<main><nav>Sidebar</nav><article data-turn="user" data-turn-id="u1"><p>Explain <strong>evaporation</strong>.</p><button>Copy</button></article><article data-turn="assistant" data-turn-id="a1" style="height:50px;overflow:hidden;position:absolute;top:0"><h2>Water changes state</h2><p>Water becomes vapour.</p><ul><li>Heat adds energy.</li></ul><table><tr><th>State</th><td>Liquid</td></tr></table><pre><code>const x = 1;</code></pre><math><mfrac><mi>x</mi><mn>2</mn></mfrac></math><img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22%3E%3Crect width=%2210%22 height=%2210%22 fill=%22red%22/%3E%3C/svg%3E" alt="Diagram" data-portal-visual-kind="screenshot"><p>End of explanation.</p><script>bad()</script></article></main>' };
    const model = module.buildSelectableDocument(capture); const translated = module.translationTemplate(model);
    translated.language = 'Tamil';
    const unit = translated.units.find((item: any) => item.source === 'Water becomes vapour.');
    unit.text = 'நீர் ஆவியாக மாறுகிறது. '.repeat(50);
    const html = module.renderSelectableDocument(model, translated);
    return { html, model, translation: translated, unit: unit.id };
  });
  expect(result.model.messages.map((item: any) => item.role)).toEqual(['user', 'assistant']);
  expect(result.model.units.some((item: any) => item.source.includes('const x'))).toBe(false);
  expect(result.model.units.some((item: any) => item.source === 'x')).toBe(false);
  expect(result.model.media.screenshots).toBe(1);
  await page.setContent(result.html);
  await expect(page.locator('strong')).toHaveText('evaporation'); await expect(page.locator('table td')).toHaveText('Liquid');
  await expect(page.locator('pre code')).toHaveText('const x = 1;'); await expect(page.locator('math mfrac')).toHaveCount(1);
  await expect(page.locator('img')).toBeVisible();
  await expect(page.locator('main')).not.toContainText('Sidebar'); await expect(page.locator('main')).not.toContainText('Copy');
  await expect(page.locator(`[data-unit="${result.unit}"]`)).toContainText('நீர் ஆவியாக');
  const geometry = await page.evaluate(id => {
    const paragraph = document.querySelector(`[data-unit="${id}"]`)!.parentElement!.getBoundingClientRect();
    const list = document.querySelector('ul')!.getBoundingClientRect();
    const range = document.createRange(); range.selectNodeContents(document.querySelector(`[data-unit="${id}"]`)!);
    const selection = window.getSelection()!; selection.removeAllRanges(); selection.addRange(range);
    return { paragraphBottom: paragraph.bottom, listTop: list.top, selected: selection.toString() };
  }, result.unit);
  expect(geometry.listTop).toBeGreaterThanOrEqual(geometry.paragraphBottom);
  expect(geometry.selected).toContain('நீர் ஆவியாக');
  const metadata = await page.locator('#conversation-metadata').textContent();
  expect(JSON.parse(metadata!).document_id).toBe(result.model.document_id);
});

test('translations reject mismatched captures and cannot inject markup or change assets', async ({ page }) => {
  await setup(page);
  const result = await page.evaluate(async () => {
    const module = await import('https://selectable.test/selectable.js');
    const model = module.buildSelectableDocument({ title: 'Test', source: { conversation_id: 'one' }, html: '<article data-turn="assistant" data-turn-id="a"><p>Original &lt;source&gt;</p></article>' });
    const translation = module.translationTemplate(model); translation.language = 'English'; translation.units[0].text = '<img src=x onerror=bad()></script><script>bad()</script>';
    const errors = [];
    for (const invalid of [{ ...translation, document_id: 'other' }, { ...translation, units: [{ ...translation.units[0], id: 'unknown' }] }, { ...translation, units: [{ ...translation.units[0], source: 'changed' }] }, { ...translation, units: [translation.units[0], translation.units[0]] }]) {
      try { module.validateTranslation(model, invalid); } catch { errors.push(true); }
    }
    return { html: module.renderSelectableDocument(model, translation), errors };
  });
  expect(result.errors).toHaveLength(4); await page.setContent(result.html);
  await expect(page.locator('main script,main img')).toHaveCount(0);
  await expect(page.locator('[data-unit]')).toContainText('<img src=x');
  const metadata = JSON.parse((await page.locator('#conversation-metadata').textContent())!);
  expect(metadata.units[0].source).toBe('Original <source>');
});

test('button-based user bubbles survive nested assistant wrappers and shared source IDs', async ({ page }) => {
  await setup(page);
  const result = await page.evaluate(async () => {
    const module = await import('https://selectable.test/selectable.js');
    const capture = { title: 'Nested turns', source: { conversation_id: 'nested' }, html: '<main><div data-chatgpt-agent-turn-start data-dil-message-id="shared"><div data-conversation-role="user"><button data-user-message-bubble data-dil-message-id="shared"><span>First user question</span></button></div><p>First assistant explanation</p></div><div data-chatgpt-agent-turn-start data-dil-message-id="round2"><button data-user-message-bubble data-dil-message-id="round2">Second user question</button><p>Second assistant explanation</p></div></main>' };
    const model = module.buildSelectableDocument(capture);
    return { messages: model.messages, html: module.renderSelectableDocument(model) };
  });
  expect(result.messages.map((message: any) => message.role)).toEqual(['user', 'assistant', 'user', 'assistant']);
  await page.setContent(result.html);
  await expect(page.locator('.turn.user')).toHaveCount(2);
  await expect(page.locator('.turn.user').first()).toContainText('First user question');
  await expect(page.locator('.turn.user').nth(1)).toContainText('Second user question');
  await expect(page.locator('.turn.assistant').first()).not.toContainText('First user question');
  await expect(page.locator('.turn.assistant').first()).toContainText('First assistant explanation');
});

test('an unmarked response alongside a user bubble is preserved instead of discarding the wrapper', async ({ page }) => {
  await setup(page);
  const messages = await page.evaluate(async () => {
    const module = await import('https://selectable.test/selectable.js');
    return module.buildSelectableDocument({ title: 'Unknown wrapper', html: '<div data-dil-message-id="round"><button data-user-message-bubble>Keep this user message</button><div><p>Keep the response too</p></div></div>' }).messages;
  });
  expect(messages.map((message: any) => message.role)).toEqual(['user', 'unknown']);
  expect(messages[0].html).toContain('Keep this user message'); expect(messages[1].html).toContain('Keep the response too');
});

test('responses have one ChatGPT label and preserve quoted labels and learner text', async ({ page }) => {
  await setup(page);
  const html = await page.evaluate(async () => {
    const module = await import('https://selectable.test/selectable.js');
    const model = module.buildSelectableDocument({ title: 'Labels', html: '<main><article data-turn="user">ChatGPT said:</article><article data-turn="assistant"><h6>ChatGPT said:</h6><p>Actual explanation</p><blockquote>ChatGPT said:</blockquote><pre><code>ChatGPT said:</code></pre></article><div data-dil-message-id="unmarked"><h6>ChatGPT said:</h6><p>Another explanation</p></div></main>' });
    return module.renderSelectableDocument(model);
  });
  await page.setContent(html);
  await expect(page.locator('.speaker')).toHaveText(['You', 'ChatGPT', 'ChatGPT']);
  await expect(page.locator('.turn.assistant h6,.turn.unknown h6')).toHaveCount(0);
  await expect(page.locator('.turn.user .content')).toHaveText('ChatGPT said:');
  await expect(page.locator('blockquote')).toHaveText('ChatGPT said:');
  await expect(page.locator('pre code')).toHaveText('ChatGPT said:');
  await expect(page.locator('main')).not.toContainText('Conversation section');
});


test('speaker-only wrappers and split labels never become saved turns', async ({ page }) => {
  await setup(page);
  const result = await page.evaluate(async () => {
    const module = await import('https://selectable.test/selectable.js');
    const model = module.buildSelectableDocument({ title: 'Labels', html: `<main>
      <div data-dil-message-id="wrapper"><h2>ChatGPT</h2><p><span>ChatGPT </span><span>said:</span></p>
        <article data-turn="assistant" data-turn-id="answer"><h6><span>ChatGPT </span><span>said:</span></h6><p>Actual explanation</p></article>
      </div>
      <article data-turn="assistant" data-turn-id="empty"><h2>ChatGPT</h2><p>ChatGPT said:</p></article>
      <article data-turn="user">ChatGPT</article>
      <article data-turn="assistant"><p>ChatGPT can explain this.</p><blockquote>ChatGPT said:</blockquote></article>
    </main>` });
    return { model, html: module.renderSelectableDocument(model) };
  });
  expect(result.model.messages.map((message: any) => message.role)).toEqual(['assistant', 'user', 'assistant']);
  expect(result.model.messages[0].html).toContain('Actual explanation');
  expect(result.model.messages[0].html).not.toContain('ChatGPT');
  expect(result.model.units.every((unit: any) => result.model.messages.some((message: any) => message.id === unit.message_id))).toBe(true);
  await page.setContent(result.html);
  await expect(page.locator('.turn')).toHaveCount(3);
  await expect(page.locator('.turn.user .content')).toHaveText('ChatGPT');
  await expect(page.locator('blockquote')).toHaveText('ChatGPT said:');
});


test('label cleanup covers fallback layouts, invisible characters and sanitized interface wrappers', async ({ page }) => {
  await setup(page);
  const result = await page.evaluate(async () => {
    const module = await import('https://selectable.test/selectable.js');
    const samples = [
      '<main><h2>ChatGPT</h2><p>ChatGPT said:</p><p>Actual fallback explanation</p></main>',
      '<main><div data-dil-message-id="label"><form>Controls</form><h2>ChatGPT</h2><p>ChatGPT said:</p></div><article data-turn="assistant">Actual explanation</article></main>',
      '<main><div data-dil-message-id="label"><p>## ChatGPT</p><p>ChatGPT\u200b said\u200e:</p></div><article data-turn="assistant">Actual explanation</article></main>'
    ];
    return samples.map(html => {
      const model = module.buildSelectableDocument({ title: 'Labels', html });
      return { messages: model.messages, units: model.units };
    });
  });
  for (const model of result) {
    expect(model.messages).toHaveLength(1);
    expect(model.messages[0].html).toContain('Actual');
    expect(model.messages[0].html).not.toContain('ChatGPT');
    expect(model.units.map((unit: any) => unit.source).join(' ')).not.toContain('ChatGPT');
  }
});
