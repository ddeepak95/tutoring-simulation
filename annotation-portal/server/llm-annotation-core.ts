import {resolveSectionHighlights,type SectionHighlight} from '../src/section-highlights.ts';
import C from '../src/generated/core.js';
import {instructionalPromptText} from './generated/instructional-prompt.ts';
import type { Annotation, Conversation, Feature, ConversationSection, RubricSnapshot } from '../src/types';
import {headingRanges} from './heading-evidence.ts';
import {itemSectionRanges} from './item-sections.ts';
import {sourcePassages} from './source-passages.ts';

export {instructionalPromptVersion as promptVersion} from './generated/instructional-prompt.ts';
export function annotationSchema(rubric: RubricSnapshot, useSegmentIds=false, sections?:ConversationSection[]) {
  if(sections){
    const textSections=sections.every(s=>s.content_version!=='html-conversation/2');
    const highlights={type:'array',minItems:1,items:{type:'object',additionalProperties:false,required:['quote','occurrence'],properties:{quote:{type:'string',minLength:1},occurrence:{type:'integer',minimum:1}}}};
    // Share the text evidence shape instead of repeating its nested array for every feature.
    // The resolver still enforces the exact feature/category pairing.
    const groups=textSections?[rubric.rubric]:rubric.rubric.map(f=>[f]);
    const variants=groups.map(features=>({
      type:'object',additionalProperties:false,required:['feature','entry','section_id',...(textSections?['highlights']:[])],
      properties:{
        feature:{type:'string',enum:features.map(f=>f.key)},section_id:{type:'string',enum:sections.map(s=>s.section_id)},
        ...(textSections?{highlights}:{}),
        entry:{type:'object',additionalProperties:false,required:['category','count'],properties:{category:{type:'string',enum:[...new Set(features.map(f=>f.category))]},count:{type:'integer',minimum:1,maximum:1000}}}
      }
    }));
    return {type:'object',additionalProperties:false,required:['annotations'],properties:{annotations:{type:'array',items:{anyOf:variants}}}};
  }
  const variants = rubric.rubric.map(feature => ({
    type: 'object', additionalProperties: false, required: ['feature', 'entry', 'evidence'],
    properties: {
      feature: { type: 'string', enum: [feature.key] },
      entry: { type: 'object', additionalProperties: false, required: [...feature.fields.map(field => field.key), ...(feature.category ? ['category'] : [])], properties: { ...(feature.category ? {category: {type: 'string', enum: [feature.category]}} : {}), ...Object.fromEntries(feature.fields.map(field => [field.key, field.numeric ? { type: field.optional ? ['integer', 'null'] : 'integer', minimum: 1, maximum: 1000 } : field.multiple ? { type: field.optional ? ['array', 'null'] : 'array', minItems: 1, uniqueItems: true, items: { type: 'string', pattern: '^(?:[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*|und|zxx)$' } } : field.options ? { type: field.optional ? ['string', 'null'] : 'string', enum: field.optional ? [...field.options, null] : field.options } : { type: field.optional ? ['string', 'null'] : 'string' }])) } },
      evidence: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['turn_id', 'quote', 'occurrence', ...(!feature.category&&feature.key==='examples'?['example_status']:[])], properties: { turn_id: { type: 'string' }, quote: { type: 'string', minLength: 1 }, occurrence: { type: 'integer', minimum: 1 }, ...(!feature.category&&feature.key==='examples'?{example_status:{type:'string',enum:['Fresh','Duplicate']}}:{}) } } }
    }
  }));
  if(useSegmentIds)for(const variant of variants){
    const example=!rubric.label_schema_version&&variant.properties.feature.enum[0]==='examples';
    (variant.properties.evidence as unknown as {items:unknown}).items={type:'object',additionalProperties:false,required:['segment_id','quote',...(example?['example_status']:[])],properties:{segment_id:{type:'string',minLength:1},quote:{type:'string',minLength:1},...(example?{example_status:{type:'string',enum:['Fresh','Duplicate']}}:{})}};
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
export function resolveLLMAnnotations(output: unknown, conversation: Conversation, rubric: RubricSnapshot, requestId: string, htmlByTurn:Record<string,string>={}, sections?:ConversationSection[]): Annotation[] {
  if(sections){
    if(!exactKeys(output,["annotations"])||!Array.isArray(output.annotations)||output.annotations.length>10000)throw new Error("Expected only an annotations array.");
    const annotations=output.annotations.map((item,index)=>{
      if(!exactKeys(item,["feature","entry","section_id",...(item&&typeof item==="object"&&Object.hasOwn(item,"highlights")?["highlights"]:[])])||typeof item.section_id!=="string"||typeof item.feature!=="string")throw new Error("Use a registered section_id, item and entry.");
      const section=sections.find(s=>s.section_id===item.section_id);
      if(!section)throw new Error("Unknown section ID for this conversation.");
      if(conversation.html_content)return {id:`llm-${requestId}-${index+1}`,feature:item.feature,section_id:section.section_id,entry:item.entry as Annotation['entry'],evidence:[]};
      const evidence=C.makeEvidence(conversation,section.turn_id,section.start,section.end);
      if(evidence.quote!==section.quote||evidence.occurrence!==section.occurrence)throw new Error("Registered section source changed.");
      const annotation=C.createAnnotation(item.feature,evidence,rubric.rubric,`llm-${requestId}-${index+1}`);
      annotation.section_id=section.section_id;annotation.entry={...(item.entry as Annotation["entry"]),turn_locations:[section.turn_id]};
      if(item.highlights!==undefined){
        resolveSectionHighlights(evidence,item.highlights as SectionHighlight[]);
        if((item.highlights as unknown[]).length!==Number(annotation.entry.count))throw Error('Return one distinct highlight per counted occurrence.');
        annotation.highlights=item.highlights as Annotation['highlights'];
      }
      return annotation;
    });
    C.validateAnnotations(conversation,annotations,rubric.rubric);return annotations;
  }
  if (!exactKeys(output, ['annotations']) || !Array.isArray(output.annotations) || output.annotations.length > 10000) throw new Error('Expected only an annotations array.');
  const features = new Map<string, Feature>(rubric.rubric.map(feature => [feature.key, feature]));
  const headings=new Map<string,ReturnType<typeof headingRanges>>();
  let sources:ReturnType<typeof sourcePassages>|undefined;
  const annotations: Annotation[] = output.annotations.map((item, index) => {
    if (!exactKeys(item, ['feature', 'entry', 'evidence']) || typeof item.feature !== 'string' || !features.has(item.feature)) throw new Error('Unknown instructional category or attributes.');
    const feature = features.get(item.feature)!;
    const entryKeys = [...feature.fields.map(field => field.key), ...(feature.category ? ['category'] : [])];
    const requiredEntryKeys = [...feature.fields.filter(field => !field.optional).map(field => field.key), ...(feature.category ? ['category'] : [])];
    const entry = item.entry;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry) || !Object.keys(entry).every(key => entryKeys.includes(key)) || !requiredEntryKeys.every(key => Object.hasOwn(entry, key)) || !Array.isArray(item.evidence) || !item.evidence.length) throw new Error('Missing entry attributes or evidence.');
    if (item.feature === 'concepts_and_subtopics_covered' && (typeof (entry as Record<string, unknown>).topic !== 'string' || !(entry as Record<string, string>).topic.trim())) throw new Error('Concept topic must name the highlighted heading.');
    const evidence = item.evidence.map(raw => {
      if(raw&&typeof raw==='object'&&Object.hasOwn(raw,'source_id')){
        const keys=['source_id',...(!feature.category&&item.feature==='examples'&&Object.hasOwn(raw,'example_status')?['example_status']:[])];
        if(!exactKeys(raw,keys)||typeof raw.source_id!=='string')throw new Error('Invalid source evidence attributes.');
        sources ||= sourcePassages(conversation,htmlByTurn);
        const source=sources.find(s=>s.source_id===raw.source_id);if(!source)throw new Error(`Unknown source_id: ${raw.source_id}`);
        raw={turn_id:source.turn_id,quote:source.quote,occurrence:source.occurrence,...(raw.example_status?{example_status:raw.example_status}:{})};
      }
      const keys=['turn_id','quote','occurrence',...(!feature.category&&item.feature==='examples'&&raw&&typeof raw==='object'&&Object.hasOwn(raw,'example_status')?['example_status']:[])];
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
        const ranges=headings.get(turn.turn_id)||(
          conversation.translation?.alignment?.length
            ? conversation.translation.alignment.filter(item=>item.turn_id===turn.turn_id&&item.kind==='heading').map(item=>({start:item.start,end:item.end}))
            : headingRanges(turn.text,conversation.translation?'':htmlByTurn[turn.turn_id]||'')
        );headings.set(turn.turn_id,ranges);
        if(!/[\p{L}\p{N}]/u.test(quote)||!ranges.some(range=>start>=range.start&&start+quote.length<=range.end))throw new Error('Content hierarchy evidence must highlight only an actual heading or standalone bold section title, never its body text.');
      }
      if(item.feature==='representations'&&(item.entry as Record<string,unknown>).representation_type==='Table'){
        sources ||= sourcePassages(conversation,htmlByTurn);
        if(!sources.some(s=>s.kind==='table_header'&&s.turn_id===turn.turn_id&&start>=s.start&&start+quote.length<=s.end))throw new Error('Table representation evidence must contain only its actual header row, excluding separators and data rows.');
      }
      if (feature.category) {
        const section = itemSectionRanges(turn.text, htmlByTurn[turn.turn_id] || '').find(r => start >= r.start && start + quote.length <= r.end);
        if (!section) throw new Error('Item evidence must belong to one complete section.');
        return C.makeEvidence(conversation, turn.turn_id, section.start, section.end);
      }
      return {...C.makeEvidence(conversation, turn.turn_id, start, start + raw.quote.length),...(raw.example_status?{example_status:raw.example_status as 'Fresh'|'Duplicate'}:{})};
    });
    const annotation = C.createAnnotation(feature.key, evidence[0], rubric.rubric, `llm-${requestId}-${index + 1}`);
    annotation.entry = { ...(entry as Record<string, string | string[] | number | null>), turn_locations: [...new Set(evidence.map(e => e.turn_id))] } as Annotation['entry'];
    annotation.evidence = evidence;
    if (new Set(evidence.map(e => `${e.turn_id}:${e.start}:${e.end}`)).size !== evidence.length) throw new Error('Duplicate supporting passage.');
    return annotation;
  });
  C.validateAnnotations(conversation, annotations, rubric.rubric);
  return annotations;
}
