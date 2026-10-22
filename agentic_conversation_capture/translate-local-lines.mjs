import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { modelConversationHtml } from '../annotation-portal/server/model-conversation-html.ts';
import { htmlStructuralRanges } from '../annotation-portal/server/html-structure.ts';

const [capturePath, linesPath] = process.argv.slice(2);
if (!capturePath || !linesPath) throw new Error('Usage: node translate-local-lines.mjs capture.json english-lines.json');
const capture = JSON.parse(await readFile(capturePath, 'utf8'));
const choices = JSON.parse(await readFile(linesPath, 'utf8'));
const sourceModel = modelConversationHtml(
  { messages: capture.turns.map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })) },
  Object.fromEntries(capture.turns.map(turn => [turn.turn_id, turn.html || ''])),
  capture.turns.flatMap(turn => [...(turn.html || '').matchAll(/<img\b/gi)].map((_, index) => ({ id: `${turn.turn_id}-image-${index + 1}`, turn_id: turn.turn_id }))),
);

const turns = [];
const alignment = [];
for (const turn of capture.turns) {
  const sourceLines = turn.text.split('\n');
  const mapped = choices.turns?.[turn.turn_id] || {};
  for (const key of Object.keys(mapped)) if (!Number.isInteger(Number(key)) || Number(key) < 0 || Number(key) >= sourceLines.length) throw new Error(`Invalid line ${turn.turn_id}:${key}`);
  const englishLines = sourceLines.map((line, index) => {
    const translated = mapped[index] ?? line;
    if (typeof translated !== 'string' || (line.trim() && !translated.trim()) || /[\u0B80-\u0BFF]/u.test(translated)) throw new Error(`Untranslated or invalid line ${turn.turn_id}:${index}: ${line.slice(0, 80)}`);
    return translated;
  });
  const sourceOffsets = [], englishOffsets = [];
  let sourceAt = 0, englishAt = 0;
  for (let index = 0; index < sourceLines.length; index++) {
    sourceOffsets.push({ start: sourceAt, end: sourceAt + sourceLines[index].length });
    englishOffsets.push({ start: englishAt, end: englishAt + englishLines[index].length });
    sourceAt += sourceLines[index].length + 1;
    englishAt += englishLines[index].length + 1;
  }
  const headers = htmlStructuralRanges(turn.html || '', turn.text).filter(range => range.kind === 'table_header');
  const segments = sourceModel.segments.filter(segment => segment.turn_id === turn.turn_id && segment.kind !== 'visual');
  const coveredLines = new Set();
  for (const segment of segments) {
    const first = sourceOffsets.findIndex(line => segment.start <= line.end && segment.end > line.start);
    const last = sourceOffsets.findLastIndex(line => segment.start < line.end && segment.end >= line.start);
    if (first < 0 || last < first) throw new Error(`Could not align ${segment.segment_id}`);
    for (let index = first; index <= last; index++) coveredLines.add(index);
    alignment.push({ segment_id: segment.segment_id, turn_id: turn.turn_id,
      start: englishOffsets[first].start, end: englishOffsets[last].end,
      source_start: sourceOffsets[first].start, source_end: sourceOffsets[last].end,
      kind: headers.some(range => segment.start >= range.start && segment.end <= range.end) ? 'table_header' : segment.kind });
  }
  let extraIndex = Math.max(0, ...segments.map(segment => Number(segment.segment_id.match(/:s(\d+)$/)?.[1] || 0)));
  for (let index = 0; index < sourceLines.length; index++) {
    if (!sourceLines[index].trim() || coveredLines.has(index)) continue;
    alignment.push({ segment_id: `${turn.turn_id}:s${String(++extraIndex).padStart(4, '0')}`,
      turn_id: turn.turn_id, start: englishOffsets[index].start, end: englishOffsets[index].end,
      source_start: sourceOffsets[index].start, source_end: sourceOffsets[index].end, kind: 'paragraph' });
  }
  for (const fragment of choices.fragments?.[turn.turn_id] || []) {
    const line = Number(fragment.line);
    const sourceAt = sourceLines[line]?.indexOf(fragment.source) ?? -1;
    const englishAt = englishLines[line]?.indexOf(fragment.english) ?? -1;
    if (sourceAt < 0 || englishAt < 0 || !fragment.source || !fragment.english) throw new Error(`Invalid fragment in ${turn.turn_id}:${line}`);
    alignment.push({ segment_id: `${turn.turn_id}:s${String(++extraIndex).padStart(4, '0')}`,
      turn_id: turn.turn_id, start: englishOffsets[line].start + englishAt, end: englishOffsets[line].start + englishAt + fragment.english.length,
      source_start: sourceOffsets[line].start + sourceAt, source_end: sourceOffsets[line].start + sourceAt + fragment.source.length,
      kind: 'paragraph' });
  }
  turns.push({ turn_id: turn.turn_id, speaker: turn.speaker, text: englishLines.join('\n') });
}
const result = { title: choices.title, topic: choices.topic, turns, alignment };
if (!result.title || !result.topic || result.alignment.some(item => item.start >= item.end || item.source_start >= item.source_end)) throw new Error('Incomplete English translation');
const target = path.join(path.dirname(capturePath), `${path.parse(capturePath).name.replace(/\.capture$/, '')}.english.json`);
await writeFile(target, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ file: target, turns: turns.length, evidence_ids: alignment.length }));
