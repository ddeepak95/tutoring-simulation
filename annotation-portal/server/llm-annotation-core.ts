import C from '../src/generated/core.js';
import {instructionalPromptText} from './generated/instructional-prompt.ts';
import type { Annotation, Conversation, Feature, RubricSnapshot } from '../src/types';

export {instructionalPromptVersion as promptVersion} from './generated/instructional-prompt.ts';
const optional = new Set(['concept_illustrated', 'concept_explained', 'concept_checked']);
export function annotationSchema(rubric: RubricSnapshot) {
  const variants = rubric.rubric.filter(feature => feature.key !== 'issues').map(feature => ({
    type: 'object', additionalProperties: false, required: ['feature', 'entry', 'evidence'],
    properties: {
      feature: { type: 'string', enum: [feature.key] },
      entry: { type: 'object', additionalProperties: false, required: feature.fields.map(field => field.key), properties: Object.fromEntries(feature.fields.map(field => [field.key, field.options ? { type: 'string', enum: field.options } : { type: optional.has(field.key) ? ['string', 'null'] : 'string' }])) },
      evidence: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['turn_id', 'quote', 'occurrence'], properties: { turn_id: { type: 'string' }, quote: { type: 'string', minLength: 1 }, occurrence: { type: 'integer', minimum: 1 } } } }
    }
  }));
  // Large maxItems constraints are rejected by the configured Gemini endpoint.
  // Enforce the 10,000-entry limit locally and in PostgreSQL instead.
  return { type: 'object', additionalProperties: false, required: ['annotations'], properties: { annotations: { type: 'array', items: { anyOf: variants } } } };
}
export function instructionalPrompt(): string {
  return instructionalPromptText;
}
function exactKeys(value: unknown, keys: string[]): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).every(key => keys.includes(key)) && keys.every(key => Object.hasOwn(value, key)));
}
export function resolveLLMAnnotations(output: unknown, conversation: Conversation, rubric: RubricSnapshot, requestId: string): Annotation[] {
  if (!exactKeys(output, ['annotations']) || !Array.isArray(output.annotations) || output.annotations.length > 10000) throw new Error('Expected only an annotations array.');
  const features = new Map<string, Feature>(rubric.rubric.filter(feature => feature.key !== 'issues').map(feature => [feature.key, feature]));
  const annotations: Annotation[] = output.annotations.map((item, index) => {
    if (!exactKeys(item, ['feature', 'entry', 'evidence']) || typeof item.feature !== 'string' || !features.has(item.feature)) throw new Error('Unknown instructional category or attributes.');
    const feature = features.get(item.feature)!;
    if (!exactKeys(item.entry, feature.fields.map(field => field.key)) || !Array.isArray(item.evidence) || !item.evidence.length) throw new Error('Missing entry attributes or evidence.');
    const evidence = item.evidence.map(raw => {
      if (!exactKeys(raw, ['turn_id', 'quote', 'occurrence']) || typeof raw.turn_id !== 'string' || typeof raw.quote !== 'string' || !raw.quote.trim() || !Number.isInteger(raw.occurrence) || Number(raw.occurrence) < 1) throw new Error('Invalid evidence.');
      const turn = conversation.messages.find(turn => turn.turn_id === raw.turn_id && turn.speaker === 'tutor');
      if (!turn) throw new Error('Evidence must cite a tutor turn.');
      let start = -1;
      for (let occurrence = 0; occurrence < Number(raw.occurrence); occurrence++) {
        start = turn.text.indexOf(raw.quote, start + 1);
        if (start < 0) throw new Error('Evidence quotation or occurrence does not exactly match the tutor turn.');
      }
      return C.makeEvidence(conversation, turn.turn_id, start, start + raw.quote.length);
    });
    const annotation = C.createAnnotation(feature.key, evidence[0], rubric.rubric, `llm-${requestId}-${index + 1}`);
    annotation.entry = { ...item.entry, turn_locations: [...new Set(evidence.map(e => e.turn_id))] } as Annotation['entry'];
    annotation.evidence = evidence;
    if (new Set(evidence.map(e => `${e.turn_id}:${e.start}:${e.end}`)).size !== evidence.length) throw new Error('Duplicate supporting passage.');
    return annotation;
  });
  C.validateAnnotations(conversation, annotations, rubric.rubric);
  return annotations;
}
