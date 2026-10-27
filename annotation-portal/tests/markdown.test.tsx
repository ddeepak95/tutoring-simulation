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

\`\[not math\]\``;
    const html = renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[]} rubric={[]} readonly={false} onHighlight={() => {}} />);
    expect(html.match(/class="katex-display"/g)).toHaveLength(2);
    expect(html).toContain('<annotation encoding="application/x-tex">\\mathrm{Mg \\rightarrow Mg^{2+} + 2e^-}</annotation>');
    expect(html).toContain(`data-math-source-start="${text.indexOf('\\mathrm')}"`);
    expect(html).toContain(`data-math-source-end="${text.indexOf('\\mathrm') + String.raw`\mathrm{Mg \rightarrow Mg^{2+} + 2e^-}`.length}"`);
    expect(html).toContain('[not math]');
  });
});
