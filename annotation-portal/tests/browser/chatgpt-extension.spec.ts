import { expect, test } from '@playwright/test';
import { captureConversation, capturePageHtml } from '../../../chatgpt-conversation-extension/src/capture.js';

test('HTML capture works without message selectors and retains the sidebar, Tamil, tables and formulas', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><head><meta charset="utf-8"><title>HTML test - ChatGPT</title></head><body><nav>Sidebar history</nav><main data-app-shell-main-surface><section data-conversation-role="human">தமிழ் question</section><p>Answer <math><mi>x</mi></math></p><table><tr><td>Cell</td></tr></table><pre><code>const n = 1;</code></pre></main><input type="password" value="private-password"><textarea>private-draft</textarea><iframe srcdoc="private-frame"></iframe><script>window.secretToken="private-token"</script><a href="javascript:alert(1)" onclick="alert(1)">Link</a></body></html>' }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.format_version).toBe('chatgpt-html-archive/1');
  expect(capture.title).toBe('HTML test'); expect(capture.text).toContain('Sidebar history');
  expect(capture.html).toContain('தமிழ் question'); expect(capture.html).toMatch(/<math[ >]/);
  expect(capture.html).toMatch(/<table[ >]/); expect(capture.html).toContain('const n = 1;');
  expect(capture.html).not.toMatch(/private-password|private-draft|private-frame|private-token|onclick=|javascript:/);
  expect(capture.html).toContain("default-src 'none'"); expect(capture.report.history_verified).toBe(false);
  expect(await page.locator('input').inputValue()).toBe('private-password'); // Original page untouched.
});

test('HTML capture rejects empty pages and oversized archives clearly', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><body></body>' }));
  await page.goto(url);
  expect((await page.evaluate(capturePageHtml, true)).capture_error).toMatch(/empty/);
  await page.evaluate(() => { document.body.textContent = 'a'.repeat(4 * 1024 * 1024); });
  expect((await page.evaluate(capturePageHtml, true)).capture_error).toMatch(/6 MB/);
});

test('HTML capture loads earlier history, expands clipped containers and restores source scrolling', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><style>main{height:250px;overflow:auto}article{height:150px}</style><div style="height:250px;overflow:hidden"><main><article data-turn="user" data-turn-id="u">Middle question</article><article data-turn="assistant" data-turn-id="a">Last answer</article></main></div>' }));
  await page.goto(url);
  const original = await page.evaluate(() => {
    const main = document.querySelector('main')!; main.scrollTop = 45;
    main.addEventListener('scroll', () => {
      if (main.scrollTop <= 1 && !document.querySelector('[data-turn-id="first"]')) {
        setTimeout(() => {
          const first = document.createElement('article'); first.dataset.turn = 'user'; first.dataset.turnId = 'first'; first.textContent = 'First lazily loaded question'; main.prepend(first);
        }, 70);
      }
    });
    return main.scrollTop;
  });
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.text).toContain('First lazily loaded question'); expect(capture.text).toContain('Last answer');
  expect(capture.report.scrolling.top_reached).toBe(true); expect(capture.report.scrolling.bottom_reached).toBe(true);
  expect(await page.locator('main').evaluate(node => node.scrollTop)).toBe(original);
  // Render the archive independently and verify both ends are present and the
  // saved layout no longer clips them into a 250px source viewport.
  await page.setContent(capture.html);
  expect(await page.locator('main').evaluate(node => node.clientHeight)).toBeGreaterThan(400);
  await expect(page.getByText('First lazily loaded question', { exact: true })).toBeVisible();
  await expect(page.getByText('Last answer', { exact: true })).toBeVisible();
});

test('HTML capture retains virtualized earlier turns and their image pixels', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><style>main{height:250px;overflow:auto}article{height:180px}</style><main><div id="window"></div><div style="height:2000px"></div></main>' }));
  await page.goto(url);
  await page.evaluate(() => {
    const main = document.querySelector('main')!;
    const canvas = document.createElement('canvas'); canvas.width = 8; canvas.height = 8; canvas.getContext('2d')!.fillRect(0, 0, 8, 8);
    const data = canvas.toDataURL();
    const render = () => {
      const index = Math.min(8, Math.floor(main.scrollTop / 200));
      document.querySelector('#window')!.innerHTML = `<article data-turn="assistant" data-turn-id="turn-${index}">Virtual turn ${index}${index === 0 ? `<img src="${data}" alt="Earlier diagram">` : ''}</article>`;
    };
    main.addEventListener('scroll', render); render();
  });
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.scrolling.restored_earlier_turns).toBeGreaterThan(0);
  expect(capture.text).toContain('Virtual turn 0'); expect(capture.text).toContain('Virtual turn 8');
  expect(capture.html).toContain('data:image/png;base64,'); expect(capture.html).toContain('data-portal-earlier-turns');
  expect(capture.report.images.embedded).toBeGreaterThan(0);
});

test('HTML capture embeds same-origin images and retains inaccessible remote images with an explicit warning', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><p>Images</p>' }));
  await page.route('https://images.example/**', route => route.fulfill({ status: 403, contentType: 'text/plain', body: 'Image access requires authentication' }));
  await page.goto(url);
  await page.evaluate(async () => {
    const canvas = document.createElement('canvas'); canvas.width = 8; canvas.height = 8;
    canvas.getContext('2d')!.fillRect(0, 0, 8, 8);
    const local = document.createElement('img'); local.src = URL.createObjectURL(await new Promise<Blob>(resolve => canvas.toBlob(blob => resolve(blob!))));
    const remote = document.createElement('img'); remote.src = 'https://images.example/restricted.svg';
    document.body.append(local, remote); await Promise.all([local.decode(), remote.decode().catch(() => {})]);
  });
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.images.embedded).toBeGreaterThan(0);
  expect(capture.report.images.linked).toBe(1);
  expect(capture.html).toContain('img-src data: https:'); expect(capture.html).toContain('https://images.example/restricted.svg');
  expect(capture.html).toContain('data:image/png;base64,');
});

test('HTML capture preserves unrecognized virtualized windows without dropping earlier content', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><style>main{height:200px;overflow:auto}</style><main><p id="content">Unmarked portion 0</p><div style="height:900px"></div></main>' }));
  await page.goto(url);
  await page.evaluate(() => {
    const main = document.querySelector('main')!;
    main.addEventListener('scroll', () => { document.querySelector('#content')!.textContent = 'Unmarked portion ' + Math.min(3, Math.floor(main.scrollTop / 200)); });
  });
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.scrolling.restored_page_windows).toBeGreaterThan(0);
  for (let i = 0; i <= 3; i++) expect(capture.text).toContain('Unmarked portion ' + i);
  expect(capture.report.limitations.join(' ')).toContain('overlapping sections');
});

test('HTML capture fetches an image when rendered pixels are unavailable', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><p>Image fallback</p><img src="/diagram.svg" alt="Diagram">' }));
  await page.route('https://chatgpt.com/diagram.svg', route => route.request().resourceType() === 'image'
    ? route.fulfill({ status: 403, body: '' })
    : route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="red"/></svg>' }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.images.embedded).toBe(1); expect(capture.report.images.linked).toBe(0);
  expect(capture.html).toContain('data:image/svg+xml;base64,');
});

test('HTML capture embeds original image bytes and keeps self-contained SVG instead of screenshots', async ({ page }) => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="100"><rect width="2400" height="100" fill="red"/></svg>';
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><main><p>Original assets</p><img src="/original.svg" alt="Original diagram">' + svg + '</main>' }));
  await page.route('https://chatgpt.com/original.svg', route => route.fulfill({ contentType: 'image/svg+xml', body: svg }));
  await page.goto(url);
  await page.locator('img').evaluate((image: HTMLImageElement) => image.decode());
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.html).toContain('data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64'));
  expect(capture.html).not.toContain('data:image/png;base64,');
  expect(capture.report.images.screenshots).toBe(0);
  await page.setContent(capture.html);
  expect(await page.locator('img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(2400);
  await expect(page.locator('main svg')).toHaveCount(1);
});

const url = 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0';
const html = (body: string, style = '') => `<!doctype html><html><head><meta charset="utf-8"><title>Evaporation - ChatGPT</title><style>body{margin:0}main{height:500px;overflow:auto}article{padding:20px}${style}</style></head><body><main>${body}</main></body></html>`;
const user = (id: string, content: string) => `<article><div data-message-id="${id}" data-message-author-role="user"><div class="whitespace-pre-wrap">${content}</div></div></article>`;
const assistant = (id: string, content: string) => `<article><div data-message-id="${id}" data-message-author-role="assistant"><div class="markdown">${content}</div></div></article>`;

test('captures message markers outside main and non-semantic thread containers', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><meta charset="utf-8"><main></main><div id="thread" role="region">${user('u1', 'Explain evaporation')}${assistant('a1', '<p>Water turns into vapour.</p>')}</div>` }));
  await page.goto(url);
  const capture = await page.evaluate(captureConversation);
  expect(capture.messages.map(message => message.id)).toEqual(['u1', 'a1']);
  expect(capture.messages[1].content).toBe('Water turns into vapour.');
});

test('captures explicit turn markers and turn-label layouts without guessing speakers', async ({ page }) => {
  let body = `<!doctype html><meta charset="utf-8"><div id="thread"><article data-testid="conversation-turn-0" data-turn="user" data-turn-id="source-u1"><div class="whitespace-pre-wrap">Question</div></article><article data-testid="conversation-turn-1" data-turn="assistant" data-turn-id="source-a1"><div class="markdown"><p>Answer</p></div></article></div>`;
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body }));
  await page.goto(url);
  const explicit = await page.evaluate(captureConversation);
  expect(explicit.messages.map(message => [message.id, message.role])).toEqual([['source-u1', 'user'], ['source-a1', 'assistant']]);
  body = '<!doctype html><meta charset="utf-8"><div role="main"><article data-testid="conversation-turn-0"><h5 class="sr-only">You said:</h5><div data-testid="user-message">Question</div></article><article data-testid="conversation-turn-1"><h6 class="sr-only">ChatGPT said:</h6><div class="markdown"><p>Answer</p></div></article></div>';
  await page.reload();
  const labels = await page.evaluate(captureConversation);
  expect(labels.messages.map(message => message.role)).toEqual(['user', 'assistant']);
  expect(labels.messages[1].content).toBe('Answer');
  expect(labels.report.limitations.join(' ')).toContain('page turn identifiers');
  body = '<!doctype html><div role="main"><article data-testid="conversation-turn-0">Unidentified turn</article></div>';
  await page.reload(); await expect(page.evaluate(captureConversation)).rejects.toThrow(/unknown or ambiguous speaker/);
});

test('waits for delayed message mounting and returns text-free diagnostics on failure', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><div id="thread"></div>' }));
  await page.goto(url);
  await page.evaluate(() => setTimeout(() => {
    document.querySelector('#thread')!.innerHTML = '<div data-message-author-role="assistant" data-message-id="a1"><div class="markdown">Delayed answer</div></div>';
  }, 350));
  expect((await page.evaluate(captureConversation)).messages[0].content).toBe('Delayed answer');
  await page.evaluate(() => { document.querySelector('[data-message-id]')!.removeAttribute('data-message-id'); });
  const failed = await page.evaluate(captureConversation, true);
  expect(failed.capture_error).toContain('stable message IDs');
  expect(failed.capture_diagnostics).toMatchObject({ thread_containers: 1, role_markers: 1 });
  expect(JSON.stringify(failed)).not.toContain('Delayed answer');
});

test('captures English/Tamil, formatting, formulas and placeholders without controls or hidden branches', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: html(user('u1', 'Explain ஆவியாதல்.') + assistant('a1', `
    <h2>ஆவியாதல்</h2><p>Water becomes <strong>vapour</strong>.</p><ul><li>First case</li><li>Second case</li></ul>
    <p><a href="https://example.com/science">Reference</a></p><table><tr><th>Case</th><th>Result</th></tr><tr><td>Warm</td><td>Fast</td></tr></table>
    <div><button>Copy</button><pre><code class="language-python">print('hello')\n</code></pre></div>
    <p><span class="katex"><span class="katex-mathml"><math><semantics><mi>E</mi><annotation encoding="application/x-tex">E = mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true">DUPLICATED MATH</span></span></p>
    <span class="katex-display"><span class="katex"><math><annotation encoding="application/x-tex">x = 2</annotation></math></span></span>
    <img alt="Water cycle" src="data:image/png;base64,invalid"><a download href="https://example.com/file.pdf">notes.pdf</a>
    <div data-testid="reasoning-panel">PRIVATE REASONING</div><div hidden>HIDDEN TEXT</div>
  `) + '<article hidden><div data-message-id="old" data-message-author-role="assistant">OLD BRANCH</div></article>') }));
  await page.goto(url);
  const capture = await page.evaluate(captureConversation);
  expect(capture.messages).toHaveLength(2);
  expect(capture.title).toBe('Evaporation');
  const text = capture.messages[1].content;
  expect(text).toContain('## ஆவியாதல்'); expect(text).toContain('**vapour**'); expect(text).toContain('- First case');
  expect(text).toContain('| Case | Result |'); expect(text).toContain('```python\nprint');
  expect(text).toContain('$E = mc^2$'); expect(text).toContain('$$\nx = 2\n$$');
  expect(text).toContain('[Reference](<https://example.com/science>)');
  expect(text).toContain('Water cycle; content not captured'); expect(text).toContain('notes.pdf; content not captured');
  expect(text).not.toMatch(/Copy|DUPLICATED|PRIVATE REASONING|HIDDEN TEXT|OLD BRANCH/);
  expect(capture.report.limitations).toHaveLength(1);
});

test('collects earlier turns in long conversations, verifies both passes and restores scrolling', async ({ page }) => {
  const turns = Array.from({ length: 32 }, (_, i) => i % 2 ? assistant('a' + i, `<p>Response ${i}</p>`) : user('u' + i, `Question ${i}`)).join('');
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: html(turns, 'article{min-height:150px}') }));
  await page.goto(url);
  await page.locator('main').evaluate(node => { node.scrollTop = 1600; });
  const original = await page.locator('main').evaluate(node => node.scrollTop);
  const result = await page.evaluate(captureConversation);
  expect(result.messages).toHaveLength(32);
  expect(result.messages[0].content).toBe('Question 0'); expect(result.messages[31].content).toContain('Response 31');
  expect(result.report).toMatchObject({ complete: true, top_reached: true, bottom_reached: true, consistent_passes: true, message_count: 32 });
  expect(await page.locator('main').evaluate(node => node.scrollTop)).toBe(original);
});

test('blocks unfinished generation, missing IDs and unsupported pages', async ({ page }) => {
  let body = html(user('u1', 'Question') + assistant('a1', '<p>Partial</p>') + '<button data-testid="stop-button">Stop</button>');
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body }));
  await page.goto(url);
  await expect(page.evaluate(captureConversation)).rejects.toThrow(/finishes responding/);
  body = html('<article><div data-message-author-role="assistant">Missing ID</div></article>');
  await page.reload(); await expect(page.evaluate(captureConversation)).rejects.toThrow(/stable message IDs/);
  body = html('<p>Unsupported layout</p>');
  await page.reload(); await expect(page.evaluate(captureConversation)).rejects.toThrow(/No conversation messages/);
});

test('refuses navigation and waits for changing content to stabilize', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: html(user('u1', 'Question') + assistant('a1', '<p>Answer</p>')) }));
  await page.goto(url);
  await page.evaluate(() => { setTimeout(() => history.replaceState({}, '', '/c/00000000-0000-4000-8000-000000000001'), 150); });
  await expect(page.evaluate(captureConversation)).rejects.toThrow(/changed during capture/);
  await page.goto(url);
  await page.evaluate(() => {
    let count = 0;
    const timer = setInterval(() => { const answer = document.querySelector('[data-message-id="a1"] .markdown'); if (answer) answer.textContent = 'Changed ' + count++; }, 100);
    setTimeout(() => clearInterval(timer), 2000);
  });
  // The extractor waits for stabilization rather than saving the intermediate response.
  const capture = await page.evaluate(captureConversation);
  expect(capture.messages[1].content).toMatch(/Changed \d+/);
});

test('includes lazily loaded earlier messages and rejects disconnected capture windows', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: html(user('u1', 'Question') + assistant('a1', '<p>Answer</p>'), 'article{min-height:400px}') }));
  await page.goto(url);
  await page.evaluate(() => {
    setTimeout(() => {
      const article = document.createElement('article');
      article.innerHTML = '<div data-message-id="earlier" data-message-author-role="user"><div class="whitespace-pre-wrap">Earlier question</div></div>';
      document.querySelector('main')!.prepend(article);
    }, 180);
  });
  const capture = await page.evaluate(captureConversation);
  expect(capture.messages.map(message => message.id)).toEqual(['earlier', 'u1', 'a1']);
  await page.goto(url);
  await page.evaluate(() => {
    const main = document.querySelector('main')!;
    main.addEventListener('scroll', () => {
      if (main.scrollTop > 0) {
        for (const message of main.querySelectorAll('[data-message-id]')) message.setAttribute('data-message-id', 'unrelated-' + message.getAttribute('data-message-id'));
      }
    }, { once: true });
  });
  await expect(page.evaluate(captureConversation)).rejects.toThrow(/Missing messages/);
});


test('HTML snapshot excludes redundant speaker labels without changing source or learner content', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><main>
    <div data-dil-message-id="wrapper"><h2>ChatGPT</h2><p><span>ChatGPT </span><span>said:</span></p>
      <article data-turn="assistant"><h6>ChatGPT said:</h6><p>Actual explanation</p></article>
    </div><article data-turn="user">ChatGPT said:</article>
    <article data-turn="assistant"><blockquote>ChatGPT said:</blockquote><p>Quoted content</p></article>
  </main>` }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(await page.locator('h2').textContent()).toBe('ChatGPT');
  expect(capture.text.match(/ChatGPT said:/g)).toHaveLength(2);
  expect(capture.text).toContain('Actual explanation');
  await page.setContent(capture.html);
  await expect(page.locator('h2,h6')).toHaveCount(0);
  await expect(page.locator('[data-turn="user"]')).toHaveText('ChatGPT said:');
  await expect(page.locator('blockquote')).toHaveText('ChatGPT said:');
  await expect(page.locator('[data-turn="assistant"]').first()).toHaveText('Actual explanation');
});


test('HTML capture cleans labels in unrecognized layouts and with invisible characters', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html; charset=utf-8', body: '<!doctype html><main><h2>## ChatGPT</h2><p>ChatGPT\u200b said\u200e:</p><p>Actual explanation</p></main>' }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.text).toContain('Actual explanation');
  expect(capture.text).not.toContain('ChatGPT');
  await page.setContent(capture.html);
  await expect(page.locator('main')).toHaveText('Actual explanation');
});
