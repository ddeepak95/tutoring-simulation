import { expect, test } from '@playwright/test';
import { backend, ids, login, select } from './mock';

const png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6ZAAAAABJRU5ErkJggg==';
const captured = `<main><article class="turn user" data-message-id="u"><h2 class="speaker">You</h2><div class="content"><p>Explain evaporation.</p></div></article><article class="turn assistant" data-message-id="a"><h2 class="speaker">ChatGPT</h2><div class="content"><h2>Evaporation</h2><p>தமிழ் 😀 Water becomes <strong>vapour</strong>.</p><p>Wet <strong>clothes</strong> drying illustrates evaporation.</p><table><tr><th>State</th><td>Liquid</td></tr></table><pre><code>const heat = 1;</code></pre><math><mfrac><mi>x</mi><mn>2</mn></mfrac></math><p><img alt="Water diagram" src="${png}"></p><p>What is evaporation?</p></div></article><article class="turn assistant" data-message-id="state"><div class="content"><h3>Interactive state 1: Quiz</h3><p>Question 2: What adds energy?</p><p>Capture-generated answer: not a learner response.</p></div></article></main>`;

test('capture extraction is stable, sanitizes executable markup and requires explicit state attachment', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(async ({ html }) => {
    const module = await import('/src/capture-document.ts');
    const blocks = module.extractCaptureBlocks(html);
    let missing = ''; try { module.prepareCaptureTurns(blocks); } catch (error) { missing = (error as Error).message; }
    blocks[2].attach_to = blocks[1].id;
    const turns = module.prepareCaptureTurns(blocks);
    const unlabeledStates = module.prepareCaptureTurns(blocks, { labelStates: false });
    const twice = module.sanitizeCapturedHtml(turns[1].html);
    const unknown = module.extractCaptureBlocks('<main><p>Student question</p><p>Tutor answer</p></main>')[0];
    const split = module.splitCaptureBlock(unknown); split[0].speaker = 'student'; split[1].speaker = 'tutor';
    const grid = module.sanitizeCapturedHtml('<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr))"><p>One</p><p>Two</p><p>Three</p></div>');
    const unsafe = module.sanitizeCapturedHtml('<p onclick="steal()">Safe <a href="javascript:steal()">link</a></p><script>steal()</script><iframe srcdoc="bad"></iframe><img onerror="steal()" src="data:text/html,bad"><div style="background-image:url(https://bad.test/)">Content</div><svg onload="steal()" width="20" height="20"><script>steal()</script><circle cx="10" cy="10" r="5"/></svg>');
    return { blocks, turns, unlabeledStates, grid: grid.html, split: module.prepareCaptureTurns(split), twice: { html: twice.html, text: twice.text }, missing, unsafe: { html: unsafe.html, text: unsafe.text } };
  }, { html: captured });
  expect(result.blocks.map((block: any) => block.kind)).toEqual(['turn', 'turn', 'state']);
  expect(result.missing).toContain('Attach every'); expect(result.turns.map((turn: any) => turn.speaker)).toEqual(['student', 'tutor']);
  expect(result.twice.text).toBe(result.turns[1].text); expect(result.twice.html).toBe(result.turns[1].html);
  expect(result.split.map((turn: any) => turn.speaker)).toEqual(['student', 'tutor']);
  expect(result.grid).toContain('repeat(3, minmax(0px, 1fr))');
  expect(result.turns[1].text).toContain('தமிழ் 😀'); expect(result.turns[1].text).toContain('Wet clothes drying'); expect(result.turns[1].text).toContain('Question 2');
  expect(result.turns[1].html).toContain(png); expect(result.turns[1].text.match(/Water diagram/g)).toHaveLength(1);
  expect(result.unlabeledStates[1].html).not.toContain('Additional captured view');
  expect(result.unsafe.html).not.toMatch(/onclick|onerror|script|iframe|javascript:|background-image|data:text/);
  expect(result.unsafe.html).toContain('data:image/svg+xml,');
});

test('saved capture labels show Bot without rewriting quoted or learner text', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(async () => {
    const { normalizeCapturedSpeakerLabels } = await import('/src/captured-speaker-labels.ts');
    const html = '<main><article class="capture-message capture-user" data-turn-id="s1"><strong class="capture-speaker">You</strong><p>ChatGPT said:</p></article><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">ChatGPT</strong><p>ChatGPT can explain this.</p><blockquote>ChatGPT said:</blockquote></article><article class="capture-message capture-assistant" data-turn-id="t2"><h2>ChatGPT said:</h2><p>Another answer.</p></article></main>';
    const document = new DOMParser().parseFromString(html, 'text/html');
    normalizeCapturedSpeakerLabels(document, { messages: [{ turn_id: 's1', speaker: 'student', text: 'ChatGPT said:' }, { turn_id: 't1', speaker: 'tutor', text: 'ChatGPT can explain this.' }, { turn_id: 't2', speaker: 'tutor', text: 'Another answer.' }] } as any);
    return {
      labels: [...document.querySelectorAll('article')].map(article => article.querySelector('strong,h2')?.textContent),
      learner: document.querySelector('[data-turn-id="s1"] p')?.textContent,
      explanation: document.querySelector('[data-turn-id="t1"] p')?.textContent,
      quote: document.querySelector('blockquote')?.textContent,
    };
  });
  expect(result).toEqual({ labels: ['You', 'Bot', 'Bot'], learner: 'ChatGPT said:', explanation: 'ChatGPT can explain this.', quote: 'ChatGPT said:' });
});

test('admin prepares, assigns, then annotator highlights preserved HTML and rates the original tutor turn', async ({ page }) => {
  const state = await backend(page);
  const archiveId = '00000000-0000-4000-8000-000000000055'; const conversationId = '00000000-0000-4000-8000-000000000056';
  const archive = { id: archiveId, title: 'Captured explanation', topic: 'Captured evaporation', language: 'English', captured_at: '2026-10-16T12:00:00Z', source_url: 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0', html: captured.replace('class="turn assistant"', 'class="turn unknown"') };
  let prepared: any[] = [];
  await page.route('https://portal-test.supabase.co/rest/v1/chatgpt_html_archives?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify(new URL(route.request().url()).searchParams.has('id') ? archive : [archive]) }));
  await page.route('https://portal-test.supabase.co/rest/v1/rpc/prepare_chatgpt_html_archive', route => {
    prepared = route.request().postDataJSON().p_turns;
    state.documents.push({ id: conversationId, label: archive.title, language: 'English', created_at: new Date().toISOString(), transcript: { conversation_id: conversationId, label: archive.title, learning_topic: archive.topic, archive_source: { archive_id: archiveId }, messages: prepared.map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })) } } as any);
    return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ conversation_id: conversationId, created: true }) });
  });
  await page.route('https://portal-test.supabase.co/rest/v1/conversation_capture_assets?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify(prepared.map(turn => ({ conversation_id: conversationId, turn_id: turn.turn_id, html: turn.html, source_ids: turn.source_ids }))) }));
  await page.route('https://portal-test.supabase.co/rest/v1/conversation_capture_documents?*', route => {
    const exact = `<main>${prepared.map(turn => `<article class="capture-message capture-${turn.speaker === 'tutor' ? 'assistant' : 'user'}"><h2>${turn.speaker === 'tutor' ? 'ChatGPT' : 'You'}</h2>${turn.html}</article>`).join('')}</main>`;
    return route.fulfill({ contentType: 'application/json', body: JSON.stringify([{ html: exact }]) });
  });
  await login(page, 'admin');
  await page.getByRole('button', { name: 'Prepare for annotation', exact: true }).click();
  const preparation = page.getByRole('dialog', { name: 'Prepare archive for annotation' });
  await expect(preparation.locator('img')).toBeVisible();
  await expect(preparation.getByRole('combobox', { name: /^Speaker for block 1/ })).toHaveValue('student');
  await expect(preparation.getByRole('combobox', { name: /^Speaker for block 2/ })).toHaveValue('tutor');
  await preparation.getByRole('button', { name: 'Create assignable conversation' }).click();
  await expect(preparation.getByRole('alert')).toContainText('Attach every');
  await preparation.getByLabel('Attach block 3 to tutor response').selectOption('block-1');
  await preparation.getByRole('button', { name: 'Create assignable conversation' }).click();
  await expect(preparation).toContainText('Conversation ready for assignment'); expect(prepared).toHaveLength(2);
  await preparation.getByRole('button', { name: 'Close preparation' }).click();
  await page.getByRole('button', { name: 'Assign annotators for Captured explanation', exact: true }).click();
  const assignment = page.getByRole('dialog', { name: 'Assign annotators', exact: true });
  await assignment.getByLabel('alice', { exact: true }).check(); await assignment.getByRole('button', { name: 'Assign to selected annotators', exact: true }).click();
  await expect.poll(() => state.assignments.some(row => row.conversation_id === conversationId && row.annotator_id === ids.alice)).toBe(true);
  await page.getByRole('button', { name: 'Sign out', exact: true }).click(); await login(page, 'alice');
  const row = state.assignments.find(row => row.conversation_id === conversationId && row.annotator_id === ids.alice);
  await page.goto('/assignments/' + row.id);
  const exact = page.frameLocator('.exact-capture iframe');
  const turn = exact.locator('[data-turn-id="turn_0002"]');
  await expect(turn.locator('img')).toBeVisible(); await expect(turn.locator('.exact-image-annotation-label,.exact-notation-annotation-label')).toHaveCount(0); await expect(turn.locator('table')).toContainText('Liquid'); await expect(turn.locator('math mfrac')).toHaveCount(1);
  await expect(turn).toContainText('Question 2: What adds energy?');
  await turn.evaluate((node, value) => {
    const text = node.textContent!, start = text.indexOf(value as string); if (start < 0) throw new Error('Selection quote missing');
    const ownerDocument = node.ownerDocument, walker = ownerDocument.createTreeWalker(node, NodeFilter.SHOW_TEXT); let offset = 0; let first: Node | null = null; let last: Node | null = null; let firstOffset = 0; let lastOffset = 0; let current: Node | null;
    while ((current = walker.nextNode())) { const end = offset + (current.textContent || '').length; if (!first && start >= offset && start < end) { first = current; firstOffset = start - offset; } if (start + (value as string).length > offset && start + (value as string).length <= end) { last = current; lastOffset = start + (value as string).length - offset; break; } offset = end; }
    const range = ownerDocument.createRange(); range.setStart(first!, firstOffset); range.setEnd(last!, lastOffset); const selection = ownerDocument.defaultView!.getSelection()!; selection.removeAllRanges(); selection.addRange(range); node.dispatchEvent(new ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
  }, 'Wet clothes drying');
  await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await expect.poll(() => row.annotations[0]?.evidence[0]?.quote).toBe('Wet clothes drying');
  const evidence = row.annotations[0].evidence[0]; expect(prepared[1].text.slice(evidence.start, evidence.end)).toBe(evidence.quote);
  await turn.evaluate((node, value) => {
    const text = node.textContent!, start = text.indexOf(value as string); if (start < 0) throw new Error('Selection quote missing');
    const ownerDocument = node.ownerDocument, walker = ownerDocument.createTreeWalker(node, NodeFilter.SHOW_TEXT); let offset = 0; let first: Node | null = null; let last: Node | null = null; let firstOffset = 0; let lastOffset = 0; let current: Node | null;
    while ((current = walker.nextNode())) { const end = offset + (current.textContent || '').length; if (!first && start >= offset && start < end) { first = current; firstOffset = start - offset; } if (start + (value as string).length > offset && start + (value as string).length <= end) { last = current; lastOffset = start + (value as string).length - offset; break; } offset = end; }
    const range = ownerDocument.createRange(); range.setStart(first!, firstOffset); range.setEnd(last!, lastOffset); const selection = ownerDocument.defaultView!.getSelection()!; selection.removeAllRanges(); selection.addRange(range); node.dispatchEvent(new ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
  }, 'Liquid');
  await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await expect.poll(() => row.annotations[1]?.evidence[0]?.quote).toBe('Liquid');
  await expect.poll(async () => turn.locator('mark.exact-annotation').count()).toBeGreaterThanOrEqual(2);
  const panel = page.getByRole('complementary', { name: 'Tutor turn ratings' });
  await expect(panel.getByLabel('Tutor turn', { exact: true }).locator('option')).toHaveCount(1);
  await panel.locator('.rating-options').first().getByRole('button').first().click();
  await expect.poll(() => Object.keys(row.turn_ratings.turn_0002?.values || {}).length).toBe(1);
  await page.reload(); await expect(page.frameLocator('.exact-capture iframe').locator('mark.exact-annotation').filter({ hasText: 'clothes' })).toHaveCount(1);
  const otherId = '00000000-0000-4000-8000-000000000057';
  const preparedDoc = state.documents.find(doc => doc.id === conversationId)!;
  state.documents.push({ ...structuredClone(preparedDoc), id: otherId, transcript: { ...structuredClone(preparedDoc.transcript), conversation_id: otherId } });
  const comparisonId = '00000000-0000-4000-8000-000000000058';
  await page.route('https://portal-test.supabase.co/rest/v1/comparison_assignments?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ id: comparisonId, conversation_a_id: conversationId, conversation_b_id: otherId, annotator_id: ids.alice, questions: [{ key: 'clarity', label: 'Clarity', description: 'Which response is clearer?', subsequent_only: false }], answers: [], status: 'not_started', revision: 0 }) }));
  await page.goto('/comparisons/' + comparisonId);
  const a = page.getByRole('button', { name: 'Choose conversation A', exact: true });
  const b = page.getByRole('button', { name: 'Choose conversation B', exact: true });
  await expect(a.locator('img')).toBeVisible(); await expect(b.locator('img')).toBeVisible();
  await expect(a).toContainText('Question 2: What adds energy?');
});


test('speaker detection handles saved labels and nested source markers without guessing ambiguous text', async ({ page }) => {
  await page.goto('/');
  const results = await page.evaluate(async () => {
    const { extractCaptureBlocks } = await import('/src/capture-document.ts');
    const examples = [
      '<main><article class="turn user" data-message-id="u"><h2 class="speaker">You</h2><div class="content">Question</div></article><article class="turn unknown" data-message-id="a"><h2 class="speaker">ChatGPT</h2><div class="content">Explanation</div></article></main>',
      '<main><article data-testid="conversation-turn-1"><h6>You said:</h6><p>Question</p></article><article data-testid="conversation-turn-2"><h6>ChatGPT said:</h6><p>Explanation</p></article></main>',
      '<main><div data-chatgpt-agent-turn-start><button data-user-message-bubble>Question</button><p>Explanation</p></div></main>',
      '<main><div data-chatgpt-selection-message-id="u" data-conversation-role=" Human ">Question</div><div data-chatgpt-selection-message-id="a" data-conversation-role=" ASSISTANT ">Explanation</div></main>',
      '<main><p>Question</p><p>Explanation</p></main>',
      '<main><div data-dil-message-id="outer"><article data-conversation-role="user">Question</article><article data-conversation-role="assistant">Explanation</article></div></main>'
    ];
    return examples.map(html => extractCaptureBlocks(html).map(block => ({ speaker: block.speaker, text: block.text.trim() })));
  });
  for (const index of [0, 1, 2, 3, 5]) {
    expect(results[index]).toEqual([{ speaker: 'student', text: 'Question' }, { speaker: 'tutor', text: 'Explanation' }]);
  }
  expect(results[4]).toEqual([{ speaker: 'unknown', text: 'Question\nExplanation' }]);
});
