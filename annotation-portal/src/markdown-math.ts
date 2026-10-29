import type { Nodes, Text } from 'mdast';

export interface MathSource {
  start: number;
  end: number;
  tex: string;
  display: boolean;
  contentStart: number;
  contentEnd: number;
}

declare module 'mdast' {
  interface Data { mathSource?: MathSource }
}

/** Recognize explicit TeX delimiters in the untouched source, outside code/HTML. */
export function mathSources(source: string, tree: Nodes): MathSource[] {
  const excluded: [number, number][] = [];
  function visit(node: Nodes) {
    if (['code', 'inlineCode', 'html', 'definition', 'image', 'link'].includes(node.type)) {
      if (node.position) excluded.push([node.position.start.offset!, node.position.end.offset!]);
    } else if ('children' in node) node.children.forEach(visit);
  }
  visit(tree);
  const escaped = (offset: number) => {
    let slashes = 0;
    while (offset > 0 && source[--offset] === '\\') slashes++;
    return slashes % 2 === 1;
  };
  const ranges: MathSource[] = [];
  for (let start = 0; start < source.length; start++) {
    const skip = excluded.find(([a, b]) => start >= a && start < b);
    if (skip) { start = skip[1] - 1; continue; }
    if (escaped(start)) continue;
    const opening = source.startsWith('\\[', start) ? '\\[' : source.startsWith('\\(', start) ? '\\(' : source.startsWith('$$', start) ? '$$' : source[start] === '$' ? '$' : '';
    if (!opening) continue;
    const display = opening === '\\[' || opening === '$$';
    const closing = opening === '\\[' ? '\\]' : opening === '\\(' ? '\\)' : opening;
    const bodyStart = start + opening.length;
    // Dollar math must hug its content; currency amounts remain ordinary text.
    if (opening === '$' && /\s/.test(source[bodyStart] || ' ')) continue;
    let closeAt = source.indexOf(closing, bodyStart);
    while (closeAt !== -1 && escaped(closeAt)) closeAt = source.indexOf(closing, closeAt + closing.length);
    if (closeAt === -1 || (!display && /[\r\n]/.test(source.slice(bodyStart, closeAt)))) continue;
    if (excluded.some(([a, b]) => a < closeAt + closing.length && b > start)) continue;
    if (opening === '$' && (/\s/.test(source[closeAt - 1]) || /\d/.test(source[closeAt + 1] || ''))) continue;
    const body = source.slice(bodyStart, closeAt);
    const tex = body.trim();
    if (!tex) continue;
    const contentStart = bodyStart + body.indexOf(tex);
    ranges.push({ start, end: closeAt + closing.length, tex, display, contentStart, contentEnd: contentStart + tex.length });
    start = closeAt + closing.length - 1;
  }
  return ranges;
}

export function mathText(source: string, math: MathSource, position: Text['position']): Text {
  return { type: 'text', value: source.slice(math.start, math.end), position, data: { mathSource: math } };
}
