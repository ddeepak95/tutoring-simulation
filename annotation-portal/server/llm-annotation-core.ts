import C from '../src/generated/core.js';
import {instructionalPromptText} from './generated/instructional-prompt.ts';
import type { Annotation, Conversation, Feature, RubricSnapshot } from '../src/types';
import { parseCoverageTopic } from '../src/coverage-hierarchy.ts';
import {headingRanges} from './heading-evidence.ts';
import {sourcePassages} from './source-passages.ts';

export {instructionalPromptVersion as promptVersion} from './generated/instructional-prompt.ts';
const optional = new Set(['concept_illustrated', 'concept_explained', 'concept_checked']);
export function annotationSchema(rubric: RubricSnapshot, useSourceIds=false) {
  const variants = rubric.rubric.map(feature => ({
    type: 'object', additionalProperties: false, required: ['feature', 'entry', 'evidence'],
    properties: {
      feature: { type: 'string', enum: [feature.key] },
      entry: { type: 'object', additionalProperties: false, required: feature.fields.map(field => field.key), properties: Object.fromEntries(feature.fields.map(field => [field.key, field.options ? { type: 'string', enum: field.options } : { type: optional.has(field.key) ? ['string', 'null'] : 'string' }])) },
      evidence: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['turn_id', 'quote', 'occurrence', ...(feature.key==='examples'?['example_status']:[])], properties: { turn_id: { type: 'string' }, quote: { type: 'string', minLength: 1 }, occurrence: { type: 'integer', minimum: 1 }, ...(feature.key==='examples'?{example_status:{type:'string',enum:['Fresh','Duplicate']}}:{}) } } }
    }
  }));
  if(useSourceIds)for(const variant of variants){
    const original=variant.properties.evidence.items;
    const example=variant.properties.feature.enum[0]==='examples';
    (variant.properties.evidence as unknown as {items:unknown}).items={anyOf:[original,{type:'object',additionalProperties:false,required:['source_id',...(example?['example_status']:[])],properties:{source_id:{type:'string',minLength:1},...(example?{example_status:{type:'string',enum:['Fresh','Duplicate']}}:{})}}]};
  }
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
  const features = new Map<string, Feature>(rubric.rubric.map(feature => [feature.key, feature]));
  const headings=new Map<string,ReturnType<typeof headingRanges>>();
  let sources:ReturnType<typeof sourcePassages>|undefined;
  const annotations: Annotation[] = output.annotations.map((item, index) => {
    if (!exactKeys(item, ['feature', 'entry', 'evidence']) || typeof item.feature !== 'string' || !features.has(item.feature)) throw new Error('Unknown instructional category or attributes.');
    const feature = features.get(item.feature)!;
    if (!exactKeys(item.entry, feature.fields.map(field => field.key)) || !Array.isArray(item.evidence) || !item.evidence.length) throw new Error('Missing entry attributes or evidence.');
    if (item.feature === 'concepts_and_subtopics_covered' && !parseCoverageTopic(item.entry.topic)) throw new Error('Coverage path must have one to three non-empty levels: Main topic :: Explanatory unit :: Explanatory subunit.');
    const evidence = item.evidence.map(raw => {
      if(raw&&typeof raw==='object'&&Object.hasOwn(raw,'source_id')){
        const keys=['source_id',...(item.feature==='examples'&&Object.hasOwn(raw,'example_status')?['example_status']:[])];
        if(!exactKeys(raw,keys)||typeof raw.source_id!=='string')throw new Error('Invalid source evidence attributes.');
        sources ||= sourcePassages(conversation);
        const source=sources.find(s=>s.source_id===raw.source_id);if(!source)throw new Error(`Unknown source_id: ${raw.source_id}`);
        raw={turn_id:source.turn_id,quote:source.quote,occurrence:source.occurrence,...(raw.example_status?{example_status:raw.example_status}:{})};
      }
      const keys=['turn_id','quote','occurrence',...(item.feature==='examples'&&raw&&typeof raw==='object'&&Object.hasOwn(raw,'example_status')?['example_status']:[])];
      if (!exactKeys(raw, keys) || typeof raw.turn_id !== 'string' || typeof raw.quote !== 'string' || !raw.quote.trim() || !Number.isInteger(raw.occurrence) || Number(raw.occurrence) < 1) throw new Error('Invalid evidence.');
      if(Object.hasOwn(raw,'example_status')&&!['Fresh','Duplicate'].includes(String(raw.example_status)))throw new Error('Example status must be Fresh or Duplicate.');
      const quote=raw.quote;
      const turn = conversation.messages.find(turn => turn.turn_id === raw.turn_id && turn.speaker === 'tutor');
      if (!turn) throw new Error('Evidence must cite a tutor turn.');
      let start = -1;
      for (let occurrence = 0; occurrence < Number(raw.occurrence); occurrence++) {
        start = turn.text.indexOf(raw.quote, start + 1);
        if (start < 0) throw new Error('Evidence quotation or occurrence does not exactly match the tutor turn.');
      }
      if(item.feature==='concepts_and_subtopics_covered'){
        const ranges=headings.get(turn.turn_id)||headingRanges(turn.text);headings.set(turn.turn_id,ranges);
        if(!/[\p{L}\p{N}]/u.test(quote)||!ranges.some(range=>start>=range.start&&start+quote.length<=range.end))throw new Error('Content hierarchy evidence must highlight only an actual heading or standalone bold section title, never its body text.');
      }
      if(item.feature==='representations'&&(item.entry as Record<string,unknown>).representation_type==='Table'){
        sources ||= sourcePassages(conversation);
        if(!sources.some(s=>s.kind==='table_header'&&s.turn_id===turn.turn_id&&start>=s.start&&start+quote.length<=s.end))throw new Error('Table representation evidence must contain only its actual header row, excluding separators and data rows.');
      }
      return {...C.makeEvidence(conversation, turn.turn_id, start, start + raw.quote.length),...(raw.example_status?{example_status:raw.example_status as 'Fresh'|'Duplicate'}:{})};
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
