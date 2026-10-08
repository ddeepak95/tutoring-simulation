import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { decodeString } from 'micromark-util-decode-string';
import type { Code, Html, InlineCode, Root, Text } from 'mdast';

const parser = unified().use(remarkParse).use(remarkGfm);
export const parseMarkdown = (source: string) => parser.parse(source) as Root;
export type SourceMap = [number, number][];

/** Each rendered UTF-16 character points to its exact span in the untouched Markdown. */
export function mappedText(source: string, node: Text | InlineCode | Code | Html): { value: string; map: SourceMap } {
  let start = node.position!.start.offset!, end = node.position!.end.offset!;
  if (node.type === 'inlineCode') {
    const fence = source.slice(start, end).match(/^`+/)![0].length;
    start += fence; end -= fence;
  } else if (node.type === 'code') {
    const opening = source.slice(start, end).match(/^(?: {0,3})(?:`{3,}|~{3,})[^\r\n]*(?:\r\n|\r|\n)/);
    if (opening) start += opening[0].length;
  }
  const raw = source.slice(start, end), decodedMap: SourceMap = [];
  const value = node.value.replace(/\r\n?|\n/g, node.type === 'inlineCode' ? ' ' : '\n');
  let input = 0, decoded = '';
  while (input < raw.length) {
    let token = raw[input], width = 1;
    if (token === '\r') { width = raw[input + 1] === '\n' ? 2 : 1; token = '\n'; }
    if (node.type === 'text') {
      const escaped = raw.slice(input).match(/^\\[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/);
      const entity = raw.slice(input).match(/^&(?:#[xX][\da-fA-F]+|#\d+|[A-Za-z][A-Za-z\d]*);/);
      const encoded = escaped?.[0] || entity?.[0];
      if (encoded && decodeString(encoded) !== encoded) { width = encoded.length; token = decodeString(encoded); }
    }
    if (node.type === 'inlineCode' && token === '\n') token = ' ';
    for (let i = 0; i < token.length; i++) decodedMap.push([start + input, start + input + width]);
    decoded += token;
    input += width;
  }
  if (node.type === 'inlineCode') {
    if (decoded === value) return { value, map: decodedMap };
    if (decoded.startsWith(' ') && decoded.endsWith(' ') && decoded.slice(1, -1) === value) return { value, map: decodedMap.slice(1, -1) };
  } else {
    // Blockquotes and indented/list code omit structural prefixes on continuation lines.
    // Match complete decoded lines, so a repeated word or punctuation in a prefix
    // cannot accidentally become the source of a displayed character.
    const sourceLines = decoded.split('\n'), targetLines = value.split('\n'), map: SourceMap = [];
    let cursor = 0, aligned = true;
    for (let i = 0; i < targetLines.length; i++) {
      const line = sourceLines[i], target = targetLines[i];
      if (line === undefined || !line.endsWith(target)) { aligned = false; break; }
      const offset = cursor + line.length - target.length;
      map.push(...decodedMap.slice(offset, offset + target.length));
      if (i < targetLines.length - 1) map.push(decodedMap[cursor + line.length]);
      cursor += line.length + 1;
    }
    if (aligned) return { value, map };
  }
  // Unsupported normalization must never produce an incorrect evidence offset.
  return { value: raw, map: Array.from({ length: raw.length }, (_, i) => [start + i, start + i + 1]) };
}

/** DOM offsets belong to rendered text; evidence offsets belong to the original source. */
export function selectedSourceRange(root: HTMLElement, selection: Range): { start: number; end: number } {
  let start: number | undefined, end: number | undefined;
  for (const leaf of root.querySelectorAll<HTMLElement>('[data-source-map]')) {
    if (!selection.intersectsNode(leaf)) continue;
    const bounds = document.createRange(); bounds.selectNodeContents(leaf);
    const overlap = bounds.cloneRange();
    if (bounds.compareBoundaryPoints(Range.START_TO_START, selection) < 0) overlap.setStart(selection.startContainer, selection.startOffset);
    if (bounds.compareBoundaryPoints(Range.END_TO_END, selection) > 0) overlap.setEnd(selection.endContainer, selection.endOffset);
    const length = overlap.toString().length; if (!length) continue;
    const prefix = bounds.cloneRange(); prefix.setEnd(overlap.startContainer, overlap.startOffset);
    const offset = prefix.toString().length;
    const map = JSON.parse(leaf.dataset.sourceMap!) as SourceMap;
    start ??= map[offset]?.[0]; end = map[offset + length - 1]?.[1];
  }
  if (start === undefined || end === undefined || end <= start) throw new Error('Select transcript text to annotate.');
  return { start, end };
}
