import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('English text uses the original capture elements and keeps quiz controls and images', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(async () => {
    const { translateCapturedLayout } = await import('/src/translated-capture-layout.ts');
    const source = 'தலைப்பு\nஒரு வாக்கியம்.\nமுந்தையது\nகேள்வி 2';
    const english = 'Heading\nOne sentence.\nPrevious\nQuestion 2';
    const pairs = [
      ['தலைப்பு', 'Heading', 'heading'],
      ['ஒரு வாக்கியம்.', 'One sentence.', 'paragraph'],
      ['முந்தையது', 'Previous', 'paragraph'],
      ['கேள்வி 2', 'Question 2', 'paragraph'],
    ] as const;
    const alignment = pairs.map(([original, translated, kind], index) => ({
      segment_id: `t1:s${String(index + 1).padStart(4, '0')}`, turn_id: 't1', kind,
      source_start: source.indexOf(original), source_end: source.indexOf(original) + original.length,
      start: english.indexOf(translated), end: english.indexOf(translated) + translated.length,
    }));
    const html = '<article class="capture-message capture-assistant" data-turn-id="t1" style="display:grid"><h2><span>தலைப்பு</span></h2><p><span>ஒரு</span> <strong>வாக்கியம்.</strong></p><img src="https://example.com/diagram.png" alt="Diagram"><section class="quiz"><p>கேள்வி 2</p><button>முந்தையது</button></section><button>முந்தையது</button></article>';
    const document = new DOMParser().parseFromString(html, 'text/html');
    const conversation = { conversation_id: 'english', messages: [{ turn_id: 't1', speaker: 'tutor', text: english }], translation: { version: 'capture-english/1', sha256: 'test', source_messages: [{ turn_id: 't1', speaker: 'tutor', text: source }], alignment } } as Parameters<typeof translateCapturedLayout>[1];
    const first = translateCapturedLayout(document, conversation);
    const second = translateCapturedLayout(document, conversation);
    const article = document.querySelector('article')!;
    return { first, second, text: article.textContent, classes: article.className, display: (article as HTMLElement).style.display,
      heading: article.querySelector('h2')?.textContent, strong: article.querySelector('strong')?.outerHTML,
      quiz: article.querySelector('.quiz')?.textContent, buttons: [...article.querySelectorAll('button')].map(button => button.textContent),
      image: article.querySelector('img')?.getAttribute('src') };
  });
  expect(result.first).toBe(4);
  expect(result.second).toBe(0);
  expect(result.text).not.toMatch(/[\u0b80-\u0bff]/u);
  expect(result.classes).toContain('capture-assistant');
  expect(result.display).toBe('grid');
  expect(result.heading).toBe('Heading');
  expect(result.strong).toContain('<strong');
  expect(result.quiz).toContain('Question 2');
  expect(result.buttons).toEqual(['Previous', 'Previous']);
  expect(result.image).toBe('https://example.com/diagram.png');
});

test('translates definitions beside math in the covalent radius capture', async ({ page }) => {
  const folder = new URL('../../../agentic_conversation_capture/outputs/covalent-redius/ta/20261020T143758Z/', import.meta.url);
  const source = JSON.parse(await readFile(new URL('covalent-redius-ta.capture.json', folder), 'utf8'));
  const translated = JSON.parse(await readFile(new URL('covalent-redius-ta.english.json', folder), 'utf8'));
  const originalTurn = source.turns[1];
  const englishTurn = translated.turns[1];
  await page.goto('/');
  const result = await page.evaluate(async ({ html, sourceTurn, targetTurn, alignment }) => {
    const { translateCapturedLayout } = await import('/src/translated-capture-layout.ts');
    const document = new DOMParser().parseFromString(`<article class="capture-message" data-turn-id="${sourceTurn.turn_id}">${html}</article>`, 'text/html');
    const conversation = { conversation_id: 'english', messages: [targetTurn], translation: {
      version: 'capture-english/1', sha256: 'test', source_messages: [sourceTurn], alignment,
    } } as Parameters<typeof translateCapturedLayout>[1];
    translateCapturedLayout(document, conversation);
    const list = [...document.querySelectorAll('ul[data-d-component="list"]')].find(item => item.textContent?.includes('covalent radius'));
    return { items: [...(list?.querySelectorAll('li') || [])].map(item => item.textContent), math: list?.querySelectorAll('[data-d-component="math"]').length };
  }, { html: originalTurn.html, sourceTurn: { turn_id: originalTurn.turn_id, speaker: originalTurn.speaker, text: originalTurn.text },
    targetTurn: englishTurn, alignment: translated.alignment.filter((item: { turn_id: string }) => item.turn_id === originalTurn.turn_id) });
  expect(result.items).toHaveLength(2);
  expect(result.items[0]).toContain('covalent radius');
  expect(result.items[1]).toContain('distance between the two nuclei');
  expect(result.items.join(' ')).not.toMatch(/[\u0b80-\u0bff]/u);
  expect(result.math).toBe(2);
});

for (const [topic, run] of [['heart', '20261020T042424Z'], ['brain', '20261020T135751Z'], ['alkaline-earth-metals', '20261022T021315264Z']] as const) {
  test(`keeps the ${topic} capture layout while translating its turns`, async ({ page }) => {
    const folder = new URL(`../../../agentic_conversation_capture/outputs/${topic}/ta/${run}/`, import.meta.url);
    const source = JSON.parse(await readFile(new URL(`${topic}-ta.capture.json`, folder), 'utf8'));
    const translated = JSON.parse(await readFile(new URL(`${topic}-ta.english.json`, folder), 'utf8'));
    await page.goto('/');
    const results = await page.evaluate(async ({ sourceTurns, englishTurns, alignment }) => {
      const { translateCapturedLayout } = await import('/src/translated-capture-layout.ts');
      return sourceTurns.map((sourceTurn: { turn_id: string; speaker: string; text: string; html: string }, index: number) => {
        const document = new DOMParser().parseFromString(`<article class="capture-message" data-turn-id="${sourceTurn.turn_id}">${sourceTurn.html}</article>`, 'text/html');
        const conversation = { conversation_id: `english-${index}`, messages: [englishTurns[index]], translation: {
          version: 'capture-english/1', sha256: 'test', source_messages: [sourceTurn], alignment: alignment.filter((item: { turn_id: string }) => item.turn_id === sourceTurn.turn_id),
        } } as Parameters<typeof translateCapturedLayout>[1];
        translateCapturedLayout(document, conversation);
        const article = document.querySelector('article')!;
        const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
        const visible: string[] = [];
        let node: Node | null;
        while ((node = walker.nextNode())) if (!node.parentElement?.closest('script,style,noscript,template,svg,[hidden],.sr-only')) visible.push(node.textContent || '');
        const tamil = visible.join(' ').match(/[\u0B80-\u0BFF\u3040-\u30FF\u4E00-\u9FFF][^\s]{0,80}/gu) || [];
        return { turn: sourceTurn.turn_id, tamil: tamil.slice(0, 8), images: article.querySelectorAll('img').length,
          tables: article.querySelectorAll('table').length, buttons: article.querySelectorAll('button').length };
      });
    }, { sourceTurns: source.turns, englishTurns: translated.turns, alignment: translated.alignment });
    expect(results.flatMap(result => result.tamil), JSON.stringify(results)).toEqual([]);
    expect(results.filter(result => result.images > 0).length).toBeGreaterThan(0);
  });
}
