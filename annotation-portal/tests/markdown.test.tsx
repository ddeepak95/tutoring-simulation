import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Nodes } from 'mdast';
import { mappedText, parseMarkdown } from '../src/markdown-source';
import { MarkdownTranscript } from '../src/MarkdownTranscript';
import { C } from '../src/lib';
import {bundledRubric} from './fixtures/legacy-rubric';

function leaves(source: string) {
  const result: ReturnType<typeof mappedText>[] = [];
  function walk(node: Nodes) {
    if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code' || node.type === 'html') result.push(mappedText(source, node));
    if ('children' in node) node.children.forEach(walk);
  }
  walk(parseMarkdown(source)); return result;
}
describe('Markdown evidence mapping', () => {
  it('renders inline units, powers and boxed answers without changing surrounding evidence', () => {
    const text = String.raw`**விடை:** \(74÷2=\boxed{37\ \text{pm}}\).

> **pm** என்பது பிக்கோமீட்டர்; \(1\ \text{pm}=10^{-12}\ \text{m}\).

Inline $r_A+r_B$ and **\(x_i+y_j\)**. After &amp; more.`;
    const tree = parseMarkdown(text);
    const maths: Nodes[] = [];
    function visit(node: Nodes) {
      if (node.data?.mathSource) maths.push(node);
      if ('children' in node) node.children.forEach(visit);
    }
    visit(tree);
    expect(maths).toHaveLength(4);
    for (const node of maths) {
      const math = node.data!.mathSource!;
      expect(text.slice(math.contentStart, math.contentEnd)).toBe(math.tex);
      expect(node.position?.start.offset).toBe(math.start);
    }
    for (const sectionLabels of [false, true]) {
      const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[]} rubric={[]} readonly={false} sectionLabels={sectionLabels} onHighlight={() => {}} />);
      expect(html.match(/class="katex"/g)).toHaveLength(4);
      expect(html).not.toContain('katex-error');
      expect(html).not.toContain('katex-display');
      expect(html).toContain('<msup>');
      expect(html).toContain('class="boxpad"');
      expect(html).toContain('<blockquote>');
      expect(html).toContain('<strong>');
    }
    const tail = leaves(text).find(item => item.value.includes('After & more.'))!;
    expect(text.slice(...tail.map[tail.value.indexOf('&')])).toBe('&amp;');
    expect(text.slice(...tail.map.at(-1)!)).toBe('.');
  });
  it('keeps currency, escaped delimiters, code, links and unfinished TeX literal', () => {
    const text = String.raw`Costs $5 and $10. Escaped \$x\$. Unfinished \(x.

\(unclosed

` + '`\\(x\\)` and `$$x$$`\n\n```tex\n\\(x\\)\n```\n\n[reference](https://example.com/$x$)';
    const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[]} rubric={[]} readonly onHighlight={() => {}} />);
    expect(html).not.toContain('class="katex"');
    expect(html).toContain('Costs $5 and $10.');
    expect(html).toContain('href="https://example.com/$x$"');
    expect(html).toContain('<code>');
  });
  it('preserves equation highlight metadata and renders invalid TeX without crashing', () => {
    const text = String.raw`Answer \(\boxed{37}\) then \(\frac{\).`;
    const start = text.indexOf('\\boxed'), end = start + String.raw`\boxed{37}`.length;
    const conversation = C.normalizeConversation({ messages: [{ turn_id: 't1', speaker: 'tutor', text }] });
    const annotation = C.createAnnotation('examples', C.makeEvidence(conversation, 't1', start, end), bundledRubric.rubric, 'math-example');
    const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[annotation]} rubric={bundledRubric.rubric} readonly={false} onHighlight={() => {}} />);
    expect(html).toContain('markdown-inline-math annotated-math');
    expect(html).toContain('data-annotation-ids="math-example"');
    expect(html).toContain(`data-math-source-start="${start}"`);
    expect(html).toContain(`data-math-source-end="${end}"`);
    expect(html).toContain('katex-error');
  });
  it.each([['\\[', '\\]', false], ['\\[', '\\]', true], ['$$', '$$', false], ['$$', '$$', true]] as const)('renders multiline Tamil comparisons inside %s (blank lines: %s, %s) as one equation', (open, close, blankLines) => {
    const spaced = String.raw`\text{ஒற்றைப் பிணைப்பு நீளம்}

>

\text{இரட்டைப் பிணைப்பு நீளம்}

>

\text{முப்பிணைப்பு நீளம்}`;
    const tex = blankLines ? spaced : spaced.replace(/\n\n/g, '\n');
    const text = `Before.\n\n${open}\n${tex}\n${close}\n\nAfter **text**.\n\n> Ordinary quote`;
    const tree = parseMarkdown(text);
    expect(tree.children.map(node => node.type)).toEqual(['paragraph', 'paragraph', 'paragraph', 'blockquote']);
    const start = text.indexOf(tex);
    for (const sectionLabels of [false, true]) {
      const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[]} rubric={[]} readonly={false} sectionLabels={sectionLabels} onHighlight={() => {}} />);
      expect(html.match(/class="katex-display"/g)).toHaveLength(1);
      expect(html).not.toContain('katex-error');
      expect(html.match(/<blockquote>/g)).toHaveLength(1);
      expect(html).toContain('ஒற்றைப் பிணைப்பு நீளம்');
      expect(html).toContain('<strong>');
      if (!sectionLabels) {
        expect(html).toContain(`data-math-source-start="${start}"`);
        expect(html).toContain(`data-math-source-end="${start + tex.length}"`);
      }
    }
    const after = leaves(text).find(item => item.value === 'text')!;
    expect(text.slice(after.map[0][0], after.map.at(-1)![1])).toBe('text');
  });
  it('keeps fenced TeX examples and unmatched delimiters as ordinary Markdown', () => {
    const text = '```tex\n\\[\nx > y\n\\]\n```\n\n\\[unclosed\n\n> Quote';
    const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[]} rubric={[]} readonly onHighlight={() => {}} />);
    expect(html).not.toContain('katex-display');
    expect(html).toContain('<pre><code');
    expect(html).toContain('<blockquote>');
  });
  it('uses section buttons instead of inline highlights in the labeling view', () => {
    const text = 'Introduction.\n\n## Topic\n\nFirst sentence. Second sentence.\n\n**Details:**\n\nMore explanation.\n\n$$F=ma$$';
    const conversation = C.normalizeConversation({ messages: [{ turn_id: 't1', speaker: 'tutor', text }] });
    const start = text.indexOf('First sentence.');
    const annotation = C.createAnnotation('examples', C.makeEvidence(conversation, 't1', start, start + 15), bundledRubric.rubric, 'existing');
    const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[annotation]} rubric={bundledRubric.rubric} readonly={false} sectionLabels onHighlight={() => {}} onSectionSelect={() => {}} />);
    expect(html).not.toContain('<mark');
    expect(html).not.toContain('Select equation');
    expect(html.match(/class="section-annotation-label"/g)).toHaveLength(3);
    expect(html).toContain('data-annotation-ids="existing"');
    expect(html).toContain('Section 3');
  });
  it('labels fresh and duplicate passages independently while retaining one example entry',()=>{
    const text='Hydrogen example.\n\nHydrogen example.';
    const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text}]});
    const first={...C.makeEvidence(conversation,'t1',0,17),example_status:'Fresh' as const};
    const second={...C.makeEvidence(conversation,'t1',19,36),example_status:'Duplicate' as const};
    const annotation=C.createAnnotation('examples',first,bundledRubric.rubric,'example');C.addEvidence(annotation,second);
    const html=renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[annotation]} rubric={bundledRubric.rubric} readonly onHighlight={()=>{}}/>);
    expect(html).toContain('data-feature-label="Examples · Fresh"');expect(html).toContain('data-feature-label="Examples · Duplicate"');
    expect(annotation.evidence).toHaveLength(2);
  });
  it('maps decoded entities, escapes, Unicode and repeated wording to their exact source spans', () => {
    const source = 'தமிழ் 😀 **Heat** &amp; \\*heat\\* &#x1F600; **Heat**';
    const rendered = leaves(source);
    expect(rendered.map(item => item.value).join('')).toBe('தமிழ் 😀 Heat & *heat* 😀 Heat');
    const all = rendered.flatMap(item => item.map.map((range, i) => ({ character: item.value[i], raw: source.slice(...range) })));
    expect(all.filter(item => item.character === '&').map(item => item.raw)).toEqual(['&amp;']);
    expect(all.filter(item => item.character === '*').map(item => item.raw)).toEqual(['\\*', '\\*']);
    expect(all.filter(item => item.raw === '&#x1F600;')).toHaveLength(2);
    expect(rendered.filter(item => item.value === 'Heat').map(item => item.map[0][0])).toEqual([source.indexOf('Heat'), source.lastIndexOf('Heat')]);
  });
  it('maps inline and fenced code without decoding its literal notation', () => {
    const source = '` A &amp;\nB `\n\n```text\nx = 74 / 2\nதமிழ் 😀\n```';
    const result = leaves(source);
    expect(result[0].value).toBe('A &amp; B');
    expect(source.slice(...result[0].map[0])).toBe('A');
    expect(source.slice(...result[0].map[7])).toBe('\n');
    expect(result[1].value).toBe('x = 74 / 2\nதமிழ் 😀');
    expect(source.slice(result[1].map[0][0], result[1].map.at(-1)![1])).toBe(result[1].value);
    const padded = leaves('`  A  `')[0];
    expect(padded.value).toBe(' A '); expect(padded.map[0]).toEqual([2, 3]);
  });
  it('keeps list, blockquote, table and reference-link text aligned', () => {
    const source = '> First\r\n> second\r\n\r\n- **Heat**\r\n  continued\r\n\r\n| Value | Meaning |\r\n| --- | --- |\r\n| 74 | [Bond][bond] |\r\n\r\n[bond]: https://example.com';
    const result = leaves(source);
    expect(result.map(item => item.value).join('')).toBe('First\nsecondHeat\ncontinuedValueMeaning74Bond');
    for (const word of ['second', 'continued', '74', 'Bond']) {
      const leaf = result.find(item => item.value.includes(word))!;
      const index = leaf.value.indexOf(word);
      expect(source.slice(leaf.map[index][0], leaf.map[index + word.length - 1][1])).toBe(word);
    }
    const quoted = '> First\n> \\> second';
    const literal = leaves(quoted)[0], offset = literal.value.indexOf('>');
    expect(quoted.slice(...literal.map[offset])).toBe('\\>');
  });
  it('renders semantic Markdown and keeps unsafe HTML and destinations inert', () => {
    const text = '# Heading\n\n**Bold** *italic* ~~old~~\n\n1. Item\n\n> Quote\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n<script>alert(1)</script>\n\n[bad](javascript:alert%281%29) [good](https://example.com)';
    const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[]} rubric={[]} readonly onHighlight={() => {}} />);
    for (const tag of ['h1', 'strong', 'em', 'del', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody']) expect(html).toContain(`<${tag}`);
    expect(html).not.toContain('<script'); expect(html).not.toContain('href="javascript:');
    expect(html).toContain('href="https://example.com"'); expect(html).toContain('&lt;script&gt;');
  });
  it('renders display equations while retaining their exact source span', () => {
    const text = String.raw`\[
\mathrm{Mg \rightarrow Mg^{2+} + 2e^-}
\]

The reaction is shown above.

$$
E = mc^2
$$

` + '`\\[not math\\]`';
    const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[]} rubric={[]} readonly={false} onHighlight={() => {}} />);
    expect(html.match(/class="katex-display"/g)).toHaveLength(2);
    expect(html).toContain('<annotation encoding="application/x-tex">\\mathrm{Mg \\rightarrow Mg^{2+} + 2e^-}</annotation>');
    expect(html).toContain(`data-math-source-start="${text.indexOf('\\mathrm')}"`);
    expect(html).toContain(`data-math-source-end="${text.indexOf('\\mathrm') + String.raw`\mathrm{Mg \rightarrow Mg^{2+} + 2e^-}`.length}"`);
    expect(html).toContain('\\[not math\\]');
  });
});
