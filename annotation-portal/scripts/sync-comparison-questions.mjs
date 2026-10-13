import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const portal = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = 'comparative-evaluation/prompts/comparative-questions.md';
const text = fs.readFileSync(path.resolve(portal, '..', source), 'utf8');
const questions = text.split(/\r?\n/).filter(line => line.startsWith('| `')).map(line => {
  const cells = line.trim().slice(1, -1).split('|').map(cell => cell.trim());
  if (cells.length !== 6) throw new Error('Invalid comparative question row.');
  const [rawKey, label, description, guidance, timing, source_basis] = cells;
  const key = rawKey.replaceAll('`', '');
  if (!/^[a-z][a-z0-9_]*$/.test(key) || !label || !description.startsWith('Which of the two responses') || !guidance || !['All turns', 'Subsequent turns'].includes(timing)) {
    throw new Error(`Invalid comparative question: ${key}`);
  }
  return {
    key, label, description, guidance,
    options: ['a', 'b', 'tie'],
    scale_items: { a: 'A is better', b: 'B is better', tie: 'Tie / equally good' },
    subsequent_only: timing === 'Subsequent turns',
    question_set: 'kulgemeyer-comparative-combined-v2', source, source_basis,
  };
});
if (questions.length !== 11 || questions.filter(question => !question.subsequent_only).length !== 9 || new Set(questions.map(question => question.key)).size !== questions.length) {
  throw new Error('Expected 11 distinct comparative questions, including 9 initial-turn questions.');
}
const output = path.join(portal, 'src/generated/comparison-questions.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(questions, null, 2) + '\n');
console.log('Synced 11 comparative questions (9 initial-turn, 11 subsequent-turn).');
