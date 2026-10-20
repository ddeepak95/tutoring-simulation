# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: capture-preparation.spec.ts >> admin prepares, assigns, then annotator highlights preserved HTML and rates the original tutor turn
- Location: tests\browser\capture-preparation.spec.ts:35:1

# Error details

```
Test timeout of 12000ms exceeded.
```

```
Error: locator.click: Test timeout of 12000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Examples', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f2e2]:
  - banner [ref=f2e3]:
    - link "a. AI Explanation Evaluation" [ref=f2e4] [cursor=pointer]:
      - /url: /
      - generic [ref=f2e5]: a.
      - strong [ref=f2e7]: AI Explanation Evaluation
    - generic [ref=f2e8]:
      - link "Comparisons" [ref=f2e9] [cursor=pointer]:
        - /url: /comparisons
      - generic [ref=f2e10]:
        - text: alice
        - generic [ref=f2e11]: Annotator
      - button "Sign out" [ref=f2e12] [cursor=pointer]
  - main [ref=f2e13]:
    - generic [ref=f2e14]:
      - button "← Assignments" [ref=f2e15] [cursor=pointer]
      - status [ref=f2e16]: Saved to cloud
    - generic [ref=f2e17]:
      - generic [ref=f2e18]:
        - generic [ref=f2e19]:
          - heading "Captured evaporation" [level=2] [ref=f2e21]
          - alert [ref=f2e22]: Select transcript text to annotate.
          - group [ref=f2e23]:
            - generic "Exact original capture" [ref=f2e24] [cursor=pointer]
            - iframe [ref=f2e25]:
              - main [ref=f3e2]:
                - article [ref=f3e3]:
                  - heading "You" [level=2] [ref=f3e4]
                  - paragraph [ref=f3e5]: Explain evaporation.
                - article "Tutor turn turn_0002" [ref=f3e6]:
                  - heading "ChatGPT" [level=2] [ref=f3e7]
                  - heading "Evaporation" [level=2] [ref=f3e8]
                  - paragraph [ref=f3e9]:
                    - text: தமிழ் 😀 Water becomes
                    - strong [ref=f3e10]: vapour
                    - text: .
                  - paragraph [ref=f3e11]:
                    - mark [ref=f3e12] [cursor=pointer]: Wet
                    - strong [ref=f3e13]:
                      - mark [ref=f3e14] [cursor=pointer]: clothes
                    - mark [ref=f3e15] [cursor=pointer]: drying
                    - text: illustrates evaporation.
                  - table [ref=f3e16]:
                    - rowgroup [ref=f3e17]:
                      - row [ref=f3e18]:
                        - rowheader "State" [ref=f3e19]
                        - cell "Liquid" [ref=f3e20]
                  - code [ref=f3e22]: const heat = 1;
                  - math [ref=f3e23]:
                    - generic [ref=f3e24]:
                      - generic [ref=f3e25]: x
                      - generic [ref=f3e26]: "2"
                  - paragraph [ref=f3e27]:
                    - generic [ref=f3e28]:
                      - img "Water diagram" [ref=f3e29]
                      - text: Water diagram
                  - paragraph [ref=f3e30]: What is evaporation?
                  - generic [ref=f3e31]:
                    - heading "Additional captured view" [level=3] [ref=f3e32]
                    - 'heading "Interactive state 1: Quiz" [level=3] [ref=f3e33]'
                    - paragraph [ref=f3e34]: "Question 2: What adds energy?"
                    - paragraph [ref=f3e35]: "Capture-generated answer: not a learner response."
          - button "Complete Annotation" [ref=f2e27] [cursor=pointer]
        - button "Coding guide" [ref=f2e28] [cursor=pointer]
      - complementary "Tutor turn ratings" [ref=f2e30]:
        - generic [ref=f2e31]:
          - heading "Turn ratings" [level=2] [ref=f2e32]
          - generic [ref=f2e33]: 0 of 1 tutor turns rated
        - generic [ref=f2e34]: Tutor turn
        - combobox "Tutor turn" [ref=f2e35]:
          - option "turn_0002 — Rating pending" [selected]
        - paragraph [ref=f2e36]: Rate this tutor turn using the preceding conversation as context.
        - generic [ref=f2e37]:
          - generic [ref=f2e38]:
            - heading "Concept Summarization" [level=3] [ref=f2e39]
            - paragraph [ref=f2e40]: Does the tutor recap the key points of each newly explained concept?
            - group "Concept Summarization" [ref=f2e41]:
              - 'button "Concept Summarization: Summarizes every newly explained concept clearly." [ref=f2e42] [cursor=pointer]': Summarizes every newly explained concept clearly.
              - 'button "Concept Summarization: Summarizes all or some concepts vaguely." [ref=f2e43] [cursor=pointer]': Summarizes all or some concepts vaguely.
              - 'button "Concept Summarization: Does not summarize any concepts." [ref=f2e44] [cursor=pointer]': Does not summarize any concepts.
          - generic [ref=f2e45]:
            - heading "Information Load Appropriateness" [level=3] [ref=f2e46]
            - paragraph [ref=f2e47]: Is the amount of information provided appropriate?
            - group "Information Load Appropriateness" [ref=f2e48]:
              - 'button "Information Load Appropriateness: Provides the right amount of information." [ref=f2e49] [cursor=pointer]': Provides the right amount of information.
              - 'button "Information Load Appropriateness: Provides slightly more than necessary." [ref=f2e50] [cursor=pointer]': Provides slightly more than necessary.
              - 'button "Information Load Appropriateness: Provides far more than necessary." [ref=f2e51] [cursor=pointer]': Provides far more than necessary.
          - generic [ref=f2e52]:
            - heading "Relevance" [level=3] [ref=f2e53]
            - paragraph [ref=f2e54]: Is the information relevant to the core learning topic, with appropriate connections made when tangential?
            - group "Relevance" [ref=f2e55]:
              - 'button "Relevance: All information is relevant." [ref=f2e56] [cursor=pointer]': All information is relevant.
              - 'button "Relevance: Some information is irrelevant." [ref=f2e57] [cursor=pointer]': Some information is irrelevant.
              - 'button "Relevance: Most information is irrelevant." [ref=f2e58] [cursor=pointer]': Most information is irrelevant.
          - generic [ref=f2e59]:
            - heading "Real-World Connection and Usefulness" [level=3] [ref=f2e60]
            - paragraph [ref=f2e61]: Does the tutor explain how the learning topic relates to real-world situations or serves a practical purpose?
            - group "Real-World Connection and Usefulness" [ref=f2e62]:
              - 'button "Real-World Connection and Usefulness: Clearly explains a real-world connection or practical use." [ref=f2e63] [cursor=pointer]': Clearly explains a real-world connection or practical use.
              - 'button "Real-World Connection and Usefulness: Mentions a real-world connection or use without fully explaining it." [ref=f2e64] [cursor=pointer]': Mentions a real-world connection or use without fully explaining it.
              - 'button "Real-World Connection and Usefulness: Provides no meaningful connection or practical use." [ref=f2e65] [cursor=pointer]': Provides no meaningful connection or practical use.
          - generic [ref=f2e66]:
            - heading "Appropriateness for the Learner’s Level" [level=3] [ref=f2e67]
            - paragraph [ref=f2e68]: Is the information appropriate for a high-school student?
            - group "Appropriateness for the Learner’s Level" [ref=f2e69]:
              - 'button "Appropriateness for the Learner’s Level: All information is appropriate for the learner’s level." [ref=f2e70] [cursor=pointer]': All information is appropriate for the learner’s level.
              - 'button "Appropriateness for the Learner’s Level: Some information is too advanced." [ref=f2e71] [cursor=pointer]': Some information is too advanced.
              - 'button "Appropriateness for the Learner’s Level: All information is too advanced." [ref=f2e72] [cursor=pointer]': All information is too advanced.
          - generic [ref=f2e73]:
            - heading "Opportunities to Demonstrate Understanding" [level=3] [ref=f2e74]
            - paragraph [ref=f2e75]: Does the tutor provide opportunities for the learner to practise or demonstrate understanding of the core concept?
            - group "Opportunities to Demonstrate Understanding" [ref=f2e76]:
              - 'button "Opportunities to Demonstrate Understanding: Provides a concrete question or follow-up learning task." [ref=f2e77] [cursor=pointer]': Provides a concrete question or follow-up learning task.
              - 'button "Opportunities to Demonstrate Understanding: Only asks whether the learner has understood." [ref=f2e78] [cursor=pointer]': Only asks whether the learner has understood.
              - 'button "Opportunities to Demonstrate Understanding: Does not check understanding." [ref=f2e79] [cursor=pointer]': Does not check understanding.
          - generic [ref=f2e80]:
            - heading "Conversational Naturalness" [level=3] [ref=f2e81]
            - paragraph [ref=f2e82]: Does the tutor use familiar conversational phrases and address the learner personally, making the exchange feel like a dialogue?
            - group "Conversational Naturalness" [ref=f2e83]:
              - 'button "Conversational Naturalness: Feels natural, like talking to a human being." [ref=f2e84] [cursor=pointer]': Feels natural, like talking to a human being.
              - 'button "Conversational Naturalness: Uses some conversational phrases but mostly delivers explanations." [ref=f2e85] [cursor=pointer]': Uses some conversational phrases but mostly delivers explanations.
              - 'button "Conversational Naturalness: Sounds like a textbook explanation." [ref=f2e86] [cursor=pointer]': Sounds like a textbook explanation.
          - generic [ref=f2e87]:
            - heading "Positivity of Tone" [level=3] [ref=f2e88]
            - paragraph [ref=f2e89]: How much warmth, encouragement, or empathy does the tutor express toward the learner?
            - group "Positivity of Tone" [ref=f2e90]:
              - 'button "Positivity of Tone: Consistently conveys a positive and supportive tone." [ref=f2e91] [cursor=pointer]': Consistently conveys a positive and supportive tone.
              - 'button "Positivity of Tone: Shows some warmth or encouragement but is mostly matter-of-fact." [ref=f2e92] [cursor=pointer]': Shows some warmth or encouragement but is mostly matter-of-fact.
              - 'button "Positivity of Tone: Shows little or no warmth or encouragement." [ref=f2e93] [cursor=pointer]': Shows little or no warmth or encouragement.
        - generic [ref=f2e94]:
          - text: Turn notes
          - textbox "Turn notes" [ref=f2e95]:
            - /placeholder: Optional context or rationale.
        - button "Next unrated turn" [disabled] [ref=f2e96]
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | import { backend, ids, login, select } from './mock';
  3   | 
  4   | const png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6ZAAAAABJRU5ErkJggg==';
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
  88  |   }, 'x2');
> 89  |   await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
      |                                                                     ^ Error: locator.click: Test timeout of 12000ms exceeded.
  90  |   await expect.poll(() => row.annotations[1]?.evidence[0]?.quote).toBe('x2');
  91  |   await expect(turn.locator('mark.exact-annotation')).toHaveCount(2);
  92  |   const panel = page.getByRole('complementary', { name: 'Tutor turn ratings' });
  93  |   await expect(panel.getByLabel('Tutor turn', { exact: true }).locator('option')).toHaveCount(1);
  94  |   await panel.locator('.rating-options').first().getByRole('button').first().click();
  95  |   await expect.poll(() => Object.keys(row.turn_ratings.turn_0002?.values || {}).length).toBe(1);
  96  |   await page.reload(); await expect(page.frameLocator('.exact-capture iframe').locator('mark.exact-annotation').first()).toHaveText('clothes');
  97  |   const otherId = '00000000-0000-4000-8000-000000000057';
  98  |   const preparedDoc = state.documents.find(doc => doc.id === conversationId)!;
  99  |   state.documents.push({ ...structuredClone(preparedDoc), id: otherId, transcript: { ...structuredClone(preparedDoc.transcript), conversation_id: otherId } });
  100 |   const comparisonId = '00000000-0000-4000-8000-000000000058';
  101 |   await page.route('https://portal-test.supabase.co/rest/v1/comparison_assignments?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ id: comparisonId, conversation_a_id: conversationId, conversation_b_id: otherId, annotator_id: ids.alice, questions: [{ key: 'clarity', label: 'Clarity', description: 'Which response is clearer?', subsequent_only: false }], answers: [], status: 'not_started', revision: 0 }) }));
  102 |   await page.goto('/comparisons/' + comparisonId);
  103 |   const a = page.getByRole('button', { name: 'Choose conversation A', exact: true });
  104 |   const b = page.getByRole('button', { name: 'Choose conversation B', exact: true });
  105 |   await expect(a.locator('img')).toBeVisible(); await expect(b.locator('img')).toBeVisible();
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