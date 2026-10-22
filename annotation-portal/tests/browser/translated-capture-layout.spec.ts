import { expect, test } from '@playwright/test';

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
