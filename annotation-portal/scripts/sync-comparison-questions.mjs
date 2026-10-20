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
  if (!/^[a-z][a-z0-9_]*$/.test(key) || !label || !/^Which of the two (responses|conversations)/.test(description) || !guidance || !['All turns', 'Follow-up turns', 'Overall conversation'].includes(timing)) {
    throw new Error(`Invalid comparative question: ${key}`);
  }
  return {
    key, label, description, guidance,
    options: ['a', 'b', 'tie'],
    scale_items: { a: 'A is better', b: 'B is better', tie: 'Tie / equally good' },
    subsequent_only: timing === 'Follow-up turns',
    scope: timing === 'Overall conversation' ? 'overall' : 'turn',
    question_set: 'instructional-comparison-v3', source, source_basis,
  };
});
if (questions.length !== 8 || questions.filter(question => question.scope === 'turn' && !question.subsequent_only).length !== 5 || questions.filter(question => question.scope === 'overall').length !== 2 || new Set(questions.map(question => question.key)).size !== questions.length) {
  throw new Error('Expected five first-turn, one follow-up, and two overall questions.');
}
const output = path.join(portal, 'src/generated/comparison-questions.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(questions, null, 2) + '\n');
console.log('Synced comparison questions: 5 first-turn, 6 follow-up, 2 overall.');
