import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const portal = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(portal, '..');
const ui = path.join(root, 'conversation-evaluation/human-annotation/ui');
const guide = fs.readFileSync(path.join(ui, '../coding-guidebook.md'));
const schemaBytes = fs.readFileSync(path.join(root, 'conversation-evaluation/schemas/evaluator-v3.schema.json'));
const schema = JSON.parse(schemaBytes);
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ui, 'data.js'), 'utf8'), sandbox);
const rows = new Map(guide.toString('utf8').split(/\r?\n/).filter(line => line.startsWith('| ')).map(line => line.trim().slice(1, -1).split('|').map(cell => cell.trim())).filter(cells => cells.length === 5).map(cells => [cells[0], cells]));
const labels = { topic: 'Concept or subtopic', example: 'Specific example', comparison: 'Comparison', representation: 'Representation', reference: 'Cultural reference', question: 'Exact question wording', concept_illustrated: 'Concept illustrated', concept_explained: 'Concept explained', concept_checked: 'Concept checked', detail_level: 'Detail level', question_type: 'Question classification', representation_type: 'Representation type' };
const rubric = sandbox.window.ANNOTATION_DATA.rubric.map(feature => {
  const row = rows.get(feature.name);
  if (!row) throw new Error('Missing rubric row: ' + feature.name);
  const attributes = schema.properties.instructional_features.properties[feature.key].items.properties;
  return { ...feature, description: row[1], entry_attributes: row[3], guidance: row[4], fields: Object.entries(attributes).filter(([key]) => key !== 'turn_locations').map(([key, definition]) => ({ key, label: labels[key], ...(definition.enum ? { options: definition.enum } : {}) })) };
});
const issueRow = rows.get('Error');
if (!issueRow) throw new Error('Missing issues guidebook row.');
const issueGuidance = issueRow[4].replaceAll('errors', 'issues').replaceAll('error', 'issue').replaceAll('Errors', 'Issues').replaceAll('Error', 'Issue').replace('`correction_status` (whether the tutor subsequently corrects it), and ', '').replace('; `correction_status`: whether a later correction appears', '').replace('Retain corrected issues in the list and note the correction.', 'Retain corrected issues in the list; supporting passages can include a later correction.');
rubric.push({ key: 'issues', name: 'Issues', short_label: 'Issues', color: '#ad514b', highlight: '#fbe7e4', description: issueRow[1].replaceAll('errors', 'issues'), entry_attributes: '`issue`; `explanation`; exact selected evidence; `turn_locations`', guidance: issueGuidance, fields: [{ key: 'issue', label: 'Issue description' }, { key: 'explanation', label: 'Why it is an issue and the correct claim or step' }] });
const rating_dimensions = [...rows.values()].filter(row => row[0] !== 'Instructional Sequence' && ['Ordinal', 'Nominal categorical'].includes(row[2])).map(row => {
  const key = row[0].toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const options = row[2] === 'Ordinal' ? ['1', '2', '3'] : ['Rule → Example', 'Example → Rule', 'Not determinable'];
  const scale_items = row[2] === 'Ordinal' ? Object.fromEntries([...row[3].matchAll(/(?:^|;)\s*([123])\s*=\s*([\s\S]*?)(?=;\s*[123]\s*=|$)/g)].map(match => [match[1], match[2].trim()])) : Object.fromEntries(options.map(option => [option, row[3].split(`${option}:`)[1]?.split(/;\s*(?:Rule → Example|Example → Rule|Not determinable):/)[0].trim() || option]));
  if (key === 'concept_summarization') { options.push('Not applicable'); scale_items['Not applicable'] = 'No new concept is explained in this turn.'; }
  if (key === 'appropriateness_for_the_learners_level') { options.push('Insufficient evidence'); scale_items['Insufficient evidence'] = 'There is insufficient evidence of the learner’s level. Record the limitation in the turn notes.'; }
  return { key, label: row[0], description: row[1], options, scale_items, guidance: row[4] };
});
const snapshot = { rubric_source: 'conversation-evaluation/human-annotation/coding-guidebook.md', rubric_sha256: crypto.createHash('sha256').update(guide).update(schemaBytes).update('portal-turn-ratings-and-issues-v3').digest('hex'), rubric, rating_dimensions, rating_scope: 'Rate each tutor turn in the context available up to that turn. Conversation-level guidebook criteria are applied to the selected turn; these are not conversation-wide scores.' };
const out = path.join(portal, 'src/generated'); fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'rubric.json'), JSON.stringify(snapshot, null, 2) + '\n');
let core = fs.readFileSync(path.join(ui, 'core.js'), 'utf8');
core = core.replace(/\(function \(root\) \{/, '').replace(/  root.AnnotationCore = api;[\s\S]*$/, 'export default api;\n');
core = core.replace('    questions: ["question_type"],', '    questions: ["question_type"],\n    issues: ["issue", "explanation"],');
// Retain historical values, but never require or display the retired issue field.
core = core.replace('      for (const key of Object.keys(annotation.entry)) {', '      if (annotation.feature === "issues") allowed.add("correction_status");\n      for (const key of Object.keys(annotation.entry)) {');
core = core.replace('      for (const field of feature.fields) {', '      for (const field of feature.fields) {\n        if (annotation.feature === "issues" && field.key === "correction_status") continue;');
core = core.replace('    return {\n      format_version: FORMAT_VERSION,', '    const issues = instructional_features.issues || [];\n    delete instructional_features.issues;\n    return {\n      issues,\n      format_version: FORMAT_VERSION,');
fs.writeFileSync(path.join(out, 'core.js'), '// Generated from the existing annotation core; run npm run sync:rubric.\n' + core);
console.log(`Synced ${rubric.length} annotation categories and ${rating_dimensions.length} turn-rating dimensions. No research transcripts are bundled.`);
