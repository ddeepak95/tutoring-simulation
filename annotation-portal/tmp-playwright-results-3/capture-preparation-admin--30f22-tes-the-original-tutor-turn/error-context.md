# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: capture-preparation.spec.ts >> admin prepares, assigns, then annotator highlights preserved HTML and rates the original tutor turn
- Location: tests\browser\capture-preparation.spec.ts:35:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Choose conversation A', exact: true }).locator('img')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Choose conversation A', exact: true }).locator('img') with timeout 5000ms
  - waiting for getByRole('button', { name: 'Choose conversation A', exact: true }).locator('img')

```

```yaml
- banner:
  - link "a. AI Explanation Evaluation":
    - /url: /
    - text: a.
    - strong: AI Explanation Evaluation
  - link "Comparisons":
    - /url: /comparisons
  - text: alice Annotator
  - button "Sign out"
- main:
  - link "← Dashboard":
    - /url: /#compare
  - heading "Captured evaporation" [level=1]
  - paragraph: 0 of 1 turns compared · Not started
  - region "Comparison round 1":
    - text: Question 1 of 1 · Clarity
    - heading "Which response is clearer?" [level=3]
    - group: Judging guidance
    - button "Choose conversation A":
      - region "Conversation A transcript":
        - article:
          - strong: Tutor response
          - paragraph: Evaporation தமிழ் 😀 Water becomes vapour. Wet clothes drying illustrates evaporation. StateLiquid
          - paragraph: "const heat = 1; x2Water diagram What is evaporation? Additional captured view Interactive state 1: Quiz Question 2: What adds energy? Capture-generated answer: not a learner response."
    - button "Tie / equally good"
    - button "Choose conversation B":
      - region "Conversation B transcript":
        - article:
          - strong: Tutor response
          - paragraph: Evaporation தமிழ் 😀 Water becomes vapour. Wet clothes drying illustrates evaporation. StateLiquid
          - paragraph: "const heat = 1; x2Water diagram What is evaporation? Additional captured view Interactive state 1: Quiz Question 2: What adds energy? Capture-generated answer: not a learner response."
  - paragraph: The next turn appears after every question for the current turn is answered and saved.
```

# Test source

```ts
  5   | const captured = `<main><article class="turn user" data-message-id="u"><h2 class="speaker">You</h2><div class="content"><p>Explain evaporation.</p></div></article><article class="turn assistant" data-message-id="a"><h2 class="speaker">ChatGPT</h2><div class="content"><h2>Evaporation</h2><p>தமிழ் 😀 Water becomes <strong>vapour</strong>.</p><p>Wet <strong>clothes</strong> drying illustrates evaporation.</p><table><tr><th>State</th><td>Liquid</td></tr></table><pre><code>const heat = 1;</code></pre><math><mfrac><mi>x</mi><mn>2</mn></mfrac></math><p><img alt="Water diagram" src="${png}"></p><p>What is evaporation?</p></div></article><article class="turn assistant" data-message-id="state"><div class="content"><h3>Interactive state 1: Quiz</h3><p>Question 2: What adds energy?</p><p>Capture-generated answer: not a learner response.</p></div></article></main>`;
  6   | 
  7   | test('capture extraction is stable, sanitizes executable markup and requires explicit state attachment', async ({ page }) => {
  8   |   await page.goto('/');
  9   |   const result = await page.evaluate(async ({ html }) => {
  10  |     const module = await import('/src/capture-document.ts');
  11  |     const blocks = module.extractCaptureBlocks(html);
  12  |     let missing = ''; try { module.prepareCaptureTurns(blocks); } catch (error) { missing = (error as Error).message; }
  13  |     blocks[2].attach_to = blocks[1].id;
  14  |     const turns = module.prepareCaptureTurns(blocks);
  15  |     const unlabeledStates = module.prepareCaptureTurns(blocks, { labelStates: false });
  16  |     const twice = module.sanitizeCapturedHtml(turns[1].html);
  17  |     const unknown = module.extractCaptureBlocks('<main><p>Student question</p><p>Tutor answer</p></main>')[0];
  18  |     const split = module.splitCaptureBlock(unknown); split[0].speaker = 'student'; split[1].speaker = 'tutor';
  19  |     const grid = module.sanitizeCapturedHtml('<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr))"><p>One</p><p>Two</p><p>Three</p></div>');
  20  |     const unsafe = module.sanitizeCapturedHtml('<p onclick="steal()">Safe <a href="javascript:steal()">link</a></p><script>steal()</script><iframe srcdoc="bad"></iframe><img onerror="steal()" src="data:text/html,bad"><div style="background-image:url(https://bad.test/)">Content</div><svg onload="steal()" width="20" height="20"><script>steal()</script><circle cx="10" cy="10" r="5"/></svg>');
  21  |     return { blocks, turns, unlabeledStates, grid: grid.html, split: module.prepareCaptureTurns(split), twice: { html: twice.html, text: twice.text }, missing, unsafe: { html: unsafe.html, text: unsafe.text } };
  22  |   }, { html: captured });
  23  |   expect(result.blocks.map((block: any) => block.kind)).toEqual(['turn', 'turn', 'state']);
  24  |   expect(result.missing).toContain('Attach every'); expect(result.turns.map((turn: any) => turn.speaker)).toEqual(['student', 'tutor']);
  25  |   expect(result.twice.text).toBe(result.turns[1].text); expect(result.twice.html).toBe(result.turns[1].html);
  26  |   expect(result.split.map((turn: any) => turn.speaker)).toEqual(['student', 'tutor']);
  27  |   expect(result.grid).toContain('repeat(3, minmax(0px, 1fr))');
  28  |   expect(result.turns[1].text).toContain('தமிழ் 😀'); expect(result.turns[1].text).toContain('Wet clothes drying'); expect(result.turns[1].text).toContain('Question 2');
  29  |   expect(result.turns[1].html).toContain(png); expect(result.turns[1].text.match(/Water diagram/g)).toHaveLength(1);
  30  |   expect(result.unlabeledStates[1].html).not.toContain('Additional captured view');
  31  |   expect(result.unsafe.html).not.toMatch(/onclick|onerror|script|iframe|javascript:|background-image|data:text/);
  32  |   expect(result.unsafe.html).toContain('data:image/svg+xml,');
  33  | });
  34  | 
  35  | test('admin prepares, assigns, then annotator highlights preserved HTML and rates the original tutor turn', async ({ page }) => {
  36  |   const state = await backend(page);
  37  |   const archiveId = '00000000-0000-4000-8000-000000000055'; const conversationId = '00000000-0000-4000-8000-000000000056';
  38  |   const archive = { id: archiveId, title: 'Captured explanation', topic: 'Captured evaporation', language: 'English', captured_at: '2026-10-16T12:00:00Z', source_url: 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0', html: captured.replace('class="turn assistant"', 'class="turn unknown"') };
  39  |   let prepared: any[] = [];
  40  |   await page.route('https://portal-test.supabase.co/rest/v1/chatgpt_html_archives?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify(new URL(route.request().url()).searchParams.has('id') ? archive : [archive]) }));
  41  |   await page.route('https://portal-test.supabase.co/rest/v1/rpc/prepare_chatgpt_html_archive', route => {
  42  |     prepared = route.request().postDataJSON().p_turns;
  43  |     state.documents.push({ id: conversationId, label: archive.title, language: 'English', created_at: new Date().toISOString(), transcript: { conversation_id: conversationId, label: archive.title, learning_topic: archive.topic, archive_source: { archive_id: archiveId }, messages: prepared.map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })) } } as any);
  44  |     return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ conversation_id: conversationId, created: true }) });
  45  |   });
  46  |   await page.route('https://portal-test.supabase.co/rest/v1/conversation_capture_assets?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify(prepared.map(turn => ({ conversation_id: conversationId, turn_id: turn.turn_id, html: turn.html, source_ids: turn.source_ids }))) }));
  47  |   await page.route('https://portal-test.supabase.co/rest/v1/conversation_capture_documents?*', route => {
  48  |     const exact = `<main>${prepared.map(turn => `<article class="capture-message capture-${turn.speaker === 'tutor' ? 'assistant' : 'user'}"><h2>${turn.speaker === 'tutor' ? 'ChatGPT' : 'You'}</h2>${turn.html}</article>`).join('')}</main>`;
  49  |     return route.fulfill({ contentType: 'application/json', body: JSON.stringify([{ html: exact }]) });
  50  |   });
  51  |   await login(page, 'admin');
  52  |   await page.getByRole('button', { name: 'Prepare for annotation', exact: true }).click();
  53  |   const preparation = page.getByRole('dialog', { name: 'Prepare archive for annotation' });
  54  |   await expect(preparation.locator('img')).toBeVisible();
  55  |   await expect(preparation.getByRole('combobox', { name: /^Speaker for block 1/ })).toHaveValue('student');
  56  |   await expect(preparation.getByRole('combobox', { name: /^Speaker for block 2/ })).toHaveValue('tutor');
  57  |   await preparation.getByRole('button', { name: 'Create assignable conversation' }).click();
  58  |   await expect(preparation.getByRole('alert')).toContainText('Attach every');
  59  |   await preparation.getByLabel('Attach block 3 to tutor response').selectOption('block-1');
  60  |   await preparation.getByRole('button', { name: 'Create assignable conversation' }).click();
  61  |   await expect(preparation).toContainText('Conversation ready for assignment'); expect(prepared).toHaveLength(2);
  62  |   await preparation.getByRole('button', { name: 'Close preparation' }).click();
  63  |   await page.getByRole('button', { name: 'Assign annotators for Captured explanation', exact: true }).click();
  64  |   const assignment = page.getByRole('dialog', { name: 'Assign annotators', exact: true });
  65  |   await assignment.getByLabel('alice', { exact: true }).check(); await assignment.getByRole('button', { name: 'Assign to selected annotators', exact: true }).click();
  66  |   await expect.poll(() => state.assignments.some(row => row.conversation_id === conversationId && row.annotator_id === ids.alice)).toBe(true);
  67  |   await page.getByRole('button', { name: 'Sign out', exact: true }).click(); await login(page, 'alice');
  68  |   const row = state.assignments.find(row => row.conversation_id === conversationId && row.annotator_id === ids.alice);
  69  |   await page.goto('/assignments/' + row.id);
  70  |   const exact = page.frameLocator('.exact-capture iframe');
  71  |   const turn = exact.locator('[data-turn-id="turn_0002"]');
  72  |   await expect(turn.locator('img')).toBeVisible(); await expect(turn.locator('table')).toContainText('Liquid'); await expect(turn.locator('math mfrac')).toHaveCount(1);
  73  |   await expect(turn).toContainText('Question 2: What adds energy?');
  74  |   await turn.evaluate((node, value) => {
  75  |     const text = node.textContent!, start = text.indexOf(value as string); if (start < 0) throw new Error('Selection quote missing');
  76  |     const ownerDocument = node.ownerDocument, walker = ownerDocument.createTreeWalker(node, NodeFilter.SHOW_TEXT); let offset = 0; let first: Node | null = null; let last: Node | null = null; let firstOffset = 0; let lastOffset = 0; let current: Node | null;
  77  |     while ((current = walker.nextNode())) { const end = offset + (current.textContent || '').length; if (!first && start >= offset && start < end) { first = current; firstOffset = start - offset; } if (start + (value as string).length > offset && start + (value as string).length <= end) { last = current; lastOffset = start + (value as string).length - offset; break; } offset = end; }
  78  |     const range = ownerDocument.createRange(); range.setStart(first!, firstOffset); range.setEnd(last!, lastOffset); const selection = ownerDocument.defaultView!.getSelection()!; selection.removeAllRanges(); selection.addRange(range); node.dispatchEvent(new ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
  79  |   }, 'Wet clothes drying');
  80  |   await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  81  |   await expect.poll(() => row.annotations[0]?.evidence[0]?.quote).toBe('Wet clothes drying');
  82  |   const evidence = row.annotations[0].evidence[0]; expect(prepared[1].text.slice(evidence.start, evidence.end)).toBe(evidence.quote);
  83  |   await turn.evaluate((node, value) => {
  84  |     const text = node.textContent!, start = text.indexOf(value as string); if (start < 0) throw new Error('Selection quote missing');
  85  |     const ownerDocument = node.ownerDocument, walker = ownerDocument.createTreeWalker(node, NodeFilter.SHOW_TEXT); let offset = 0; let first: Node | null = null; let last: Node | null = null; let firstOffset = 0; let lastOffset = 0; let current: Node | null;
  86  |     while ((current = walker.nextNode())) { const end = offset + (current.textContent || '').length; if (!first && start >= offset && start < end) { first = current; firstOffset = start - offset; } if (start + (value as string).length > offset && start + (value as string).length <= end) { last = current; lastOffset = start + (value as string).length - offset; break; } offset = end; }
  87  |     const range = ownerDocument.createRange(); range.setStart(first!, firstOffset); range.setEnd(last!, lastOffset); const selection = ownerDocument.defaultView!.getSelection()!; selection.removeAllRanges(); selection.addRange(range); node.dispatchEvent(new ownerDocument.defaultView!.MouseEvent('mouseup', { bubbles: true }));
  88  |   }, 'Liquid');
  89  |   await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  90  |   await expect.poll(() => row.annotations[1]?.evidence[0]?.quote).toBe('Liquid');
  91  |   await expect.poll(async () => turn.locator('mark.exact-annotation').count()).toBeGreaterThanOrEqual(2);
  92  |   const panel = page.getByRole('complementary', { name: 'Tutor turn ratings' });
  93  |   await expect(panel.getByLabel('Tutor turn', { exact: true }).locator('option')).toHaveCount(1);
  94  |   await panel.locator('.rating-options').first().getByRole('button').first().click();
  95  |   await expect.poll(() => Object.keys(row.turn_ratings.turn_0002?.values || {}).length).toBe(1);
  96  |   await page.reload(); await expect(page.frameLocator('.exact-capture iframe').locator('mark.exact-annotation').filter({ hasText: 'clothes' })).toHaveCount(1);
  97  |   const otherId = '00000000-0000-4000-8000-000000000057';
  98  |   const preparedDoc = state.documents.find(doc => doc.id === conversationId)!;
  99  |   state.documents.push({ ...structuredClone(preparedDoc), id: otherId, transcript: { ...structuredClone(preparedDoc.transcript), conversation_id: otherId } });
  100 |   const comparisonId = '00000000-0000-4000-8000-000000000058';
  101 |   await page.route('https://portal-test.supabase.co/rest/v1/comparison_assignments?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ id: comparisonId, conversation_a_id: conversationId, conversation_b_id: otherId, annotator_id: ids.alice, questions: [{ key: 'clarity', label: 'Clarity', description: 'Which response is clearer?', subsequent_only: false }], answers: [], status: 'not_started', revision: 0 }) }));
  102 |   await page.goto('/comparisons/' + comparisonId);
  103 |   const a = page.getByRole('button', { name: 'Choose conversation A', exact: true });
  104 |   const b = page.getByRole('button', { name: 'Choose conversation B', exact: true });
> 105 |   await expect(a.locator('img')).toBeVisible(); await expect(b.locator('img')).toBeVisible();
      |                                  ^ Error: expect(locator).toBeVisible() failed
  106 |   await expect(a).toContainText('Question 2: What adds energy?');
  107 | });
  108 | 
  109 | 
  110 | test('speaker detection handles saved labels and nested source markers without guessing ambiguous text', async ({ page }) => {
  111 |   await page.goto('/');
  112 |   const results = await page.evaluate(async () => {
  113 |     const { extractCaptureBlocks } = await import('/src/capture-document.ts');
  114 |     const examples = [
  115 |       '<main><article class="turn user" data-message-id="u"><h2 class="speaker">You</h2><div class="content">Question</div></article><article class="turn unknown" data-message-id="a"><h2 class="speaker">ChatGPT</h2><div class="content">Explanation</div></article></main>',
  116 |       '<main><article data-testid="conversation-turn-1"><h6>You said:</h6><p>Question</p></article><article data-testid="conversation-turn-2"><h6>ChatGPT said:</h6><p>Explanation</p></article></main>',
  117 |       '<main><div data-chatgpt-agent-turn-start><button data-user-message-bubble>Question</button><p>Explanation</p></div></main>',
  118 |       '<main><div data-chatgpt-selection-message-id="u" data-conversation-role=" Human ">Question</div><div data-chatgpt-selection-message-id="a" data-conversation-role=" ASSISTANT ">Explanation</div></main>',
  119 |       '<main><p>Question</p><p>Explanation</p></main>',
  120 |       '<main><div data-dil-message-id="outer"><article data-conversation-role="user">Question</article><article data-conversation-role="assistant">Explanation</article></div></main>'
  121 |     ];
  122 |     return examples.map(html => extractCaptureBlocks(html).map(block => ({ speaker: block.speaker, text: block.text.trim() })));
  123 |   });
  124 |   for (const index of [0, 1, 2, 3, 5]) {
  125 |     expect(results[index]).toEqual([{ speaker: 'student', text: 'Question' }, { speaker: 'tutor', text: 'Explanation' }]);
  126 |   }
  127 |   expect(results[4]).toEqual([{ speaker: 'unknown', text: 'Question\nExplanation' }]);
  128 | });
  129 | 
```