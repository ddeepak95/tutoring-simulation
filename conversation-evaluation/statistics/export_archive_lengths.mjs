#!/usr/bin/env node
/** Count tutor-output length in archived original conversations for GLM sensitivity fits. */
import fs from 'node:fs';
import path from 'node:path';

const archive = path.resolve(process.argv[2] || 'research-archive/oct-29');
const output = path.resolve(process.argv[3] || '.runtime/glm-pilot/pedagogical-conversational/lengths.csv');
const index = fs.readFileSync(path.join(archive, 'index.jsonl'), 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const graphemes = new Intl.Segmenter('und', {granularity: 'grapheme'});
const words = new Intl.Segmenter('und', {granularity: 'word'});
const lines = ['conversation_id,graphemes,words,tutor_turns'];
const seen = new Set();
for (const item of index) {
  if (seen.has(item.id)) throw new Error(`Duplicate conversation: ${item.id}`);
  seen.add(item.id);
  const artifact = JSON.parse(fs.readFileSync(path.join(archive, item.generation_file), 'utf8'));
  if (artifact.conversation?.conversation_id !== item.id) throw new Error(`Generation mismatch: ${item.id}`);
  const turns = artifact.conversation.messages.filter(message => message.speaker === 'tutor');
  if (!turns.length || turns.some(turn => typeof turn.text !== 'string' || !turn.text.trim())) throw new Error(`Missing tutor text: ${item.id}`);
  const text = turns.map(turn => turn.text).join('\n');
  const graphemeCount = [...graphemes.segment(text)].length;
  const wordCount = [...words.segment(text)].filter(segment => segment.isWordLike).length;
  if (graphemeCount <= 0 || wordCount <= 0) throw new Error(`Empty exposure: ${item.id}`);
  lines.push(`${item.id},${graphemeCount},${wordCount},${turns.length}`);
}
fs.mkdirSync(path.dirname(output), {recursive: true});
fs.writeFileSync(output, lines.join('\n') + '\n', 'utf8');
console.log(JSON.stringify({output, conversations: index.length, metrics: ['graphemes', 'words', 'tutor_turns']}));
