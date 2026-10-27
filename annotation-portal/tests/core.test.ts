import { describe, expect, it } from 'vitest';
import { C, loginIdentifier, validateSubmission } from '../src/lib';
import {bundledRubric} from './fixtures/legacy-rubric';
import { completeRatings } from './ratings-fixture';
const conversation = C.normalizeConversation({ messages: [
  { turn_id: 't1', speaker: 'tutor', text: 'தமிழ் 😀 What is evaporation? What is evaporation?\nClothes dry as liquid water becomes vapour.' },
  { turn_id: 's1', speaker: 'student', text: 'How?' },
] });
describe('annotation evidence and submission', () => {
  it('uses normalized usernames without email invitations', () => {
    expect(loginIdentifier(' Deepak_01 ')).toBe('deepak_01@users.annotation.invalid');
    expect(() => loginIdentifier('admin@example.org')).toThrow();
  });
  it('preserves Tamil, emoji, repeated occurrences, and exact questions', () => {
    const text = conversation.messages[0].text; const quote = 'What is evaporation?'; const start = text.lastIndexOf(quote);
    const evidence = C.makeEvidence(conversation, 't1', start, start + quote.length);
    expect(evidence.occurrence).toBe(2);
    const annotation = C.createAnnotation('questions', evidence, bundledRubric.rubric, 'q1');
    annotation.entry.question_type = 'Instructional'; annotation.entry.concept_checked = null;
    expect(C.validateAnnotations(conversation, [annotation], bundledRubric.rubric)).toHaveLength(1);
    expect(() => C.addEvidence(annotation, evidence)).toThrow(/separate/);
    const changed = structuredClone(annotation); changed.evidence[0].quote = 'Invented';
    expect(() => C.validateAnnotations(conversation, [changed], bundledRubric.rubric)).toThrow();
  });
  it('allows incomplete autosaves but refuses incomplete submissions', () => {
    const a = C.createAnnotation('questions', C.makeEvidence(conversation, 't1', conversation.messages[0].text.indexOf('What is evaporation?'), conversation.messages[0].text.indexOf('What is evaporation?') + 'What is evaporation?'.length), bundledRubric.rubric, 'a');
    expect(C.validateAnnotations(conversation, [a], bundledRubric.rubric, { allowIncomplete: true })).toHaveLength(1);
    expect(() => validateSubmission(conversation, [a], bundledRubric, 'ann', {}, 'label')).toThrow(/Complete required fields.*Questions · Bot turn 1 · “What is evaporation\?”: Question classification/);
    a.entry.question_type = 'Invalid';
    expect(() => validateSubmission(conversation, [a], bundledRubric, 'ann', {}, 'label')).toThrow(/Questions · Bot turn 1 · “What is evaporation\?”.*Question classification has an invalid value/);
    a.entry.question_type = 'Knowledge-checking';
    expect(validateSubmission(conversation, [a], bundledRubric, 'ann', {}, 'label').feature_counts.questions).toBe(1);
    const ratings = completeRatings(conversation, bundledRubric);
    expect(validateSubmission(conversation, [], bundledRubric, 'ann', ratings, 'rate').turn_ratings).toEqual(ratings);
    expect(() => validateSubmission(conversation, [], bundledRubric, 'ann', {}, 'rate')).toThrow(/Rate every tutor turn/);
  });
  it('accepts omitted optional detail, language, and issue explanation fields', () => {
    const evidence = C.makeEvidence(conversation, 't1', 0, 5);
    for (const key of ['concepts_and_subtopics_covered', 'examples', 'analogies', 'cultural_references']) {
      const annotation = C.createAnnotation(key, evidence, bundledRubric.rubric, key);
      expect(C.missingAttributes(annotation, bundledRubric.rubric)).toEqual([]);
      expect(() => C.validateAnnotations(conversation, [annotation], bundledRubric.rubric)).not.toThrow();
    }
    const representation = C.createAnnotation('representations', evidence, bundledRubric.rubric, 'representation');
    representation.entry.representation_type = 'Flowchart';
    expect(C.missingAttributes(representation, bundledRubric.rubric)).toEqual([]);
    expect(() => C.validateAnnotations(conversation, [representation], bundledRubric.rubric)).not.toThrow();
    representation.entry.image_languages = ['not a tag'];
    expect(() => C.validateAnnotations(conversation, [representation], bundledRubric.rubric)).toThrow(/BCP 47/);
    const issue = C.createAnnotation('issues', evidence, bundledRubric.rubric, 'issue');
    expect(C.missingAttributes(issue, bundledRubric.rubric)).toEqual([]);
    expect(() => C.validateAnnotations(conversation, [issue], bundledRubric.rubric)).not.toThrow();
  });
  it('stores positive per-highlight counts for grouped questions and diagrams', () => {
    const text = conversation.messages[0].text;
    const firstQuestion = text.indexOf('What is evaporation?');
    const grouped = C.createAnnotation('questions', C.makeEvidence(conversation, 't1', firstQuestion, firstQuestion + 'What is evaporation? What is evaporation?'.length), bundledRubric.rubric, 'grouped');
    grouped.entry.question_type = 'Knowledge-checking';
    grouped.entry.question_count = 2;
    expect(C.validateAnnotations(conversation, [grouped], bundledRubric.rubric)).toHaveLength(1);
    expect(C.buildExport(conversation, [grouped], bundledRubric.rubric, 'ann').annotations[0].entry.question_count).toBe(2);
    grouped.entry.question_count = 0;
    expect(() => C.validateAnnotations(conversation, [grouped], bundledRubric.rubric)).toThrow(/whole number/);
    const diagram = C.createAnnotation('representations', C.makeEvidence(conversation, 't1', firstQuestion, firstQuestion + 4), bundledRubric.rubric, 'diagram');
    diagram.entry.representation_type = 'Diagram';
    diagram.entry.diagram_count = 3;
    expect(C.validateAnnotations(conversation, [diagram], bundledRubric.rubric)).toHaveLength(1);
    diagram.entry.representation_type = 'Graph';
    expect(() => C.validateAnnotations(conversation, [diagram], bundledRubric.rubric)).toThrow(/only to diagrams/);
  });
  it('keeps overlap and the simplified fields', () => {
    const ev = C.makeEvidence(conversation, 't1', 0, 5);
    const a = C.createAnnotation('examples', ev, bundledRubric.rubric, 'a');
    const b = C.createAnnotation('analogies', ev, bundledRubric.rubric, 'b');
    expect(C.highlightedSegments(conversation.messages[0].text, [a, b], 't1')[0].annotations).toHaveLength(2);
    expect(C.formFields(bundledRubric.rubric.find(f => f.key === 'questions')!).map(f => f.key)).toEqual(['question_type', 'question_count']);
  });
  it('records a memory aid with exact evidence and exports its category', () => {
    const mnemonic = C.normalizeConversation({ messages: [{ turn_id: 't1', speaker: 'tutor', text: 'Remember PEMDAS for the order of operations.' }] });
    const aid = C.createAnnotation('memory_aids', C.makeEvidence(mnemonic, 't1', 9, 15), bundledRubric.rubric, 'memory-1');
    aid.entry.memory_aid = 'PEMDAS for the order of operations';
    expect(C.formFields(bundledRubric.rubric.find(feature => feature.key === 'memory_aids')!).map(field => field.key)).toEqual(['memory_aid']);
    expect(C.validateAnnotations(mnemonic, [aid], bundledRubric.rubric)).toHaveLength(1);
    expect(validateSubmission(mnemonic, [aid], bundledRubric, 'ann', {}, 'label').feature_counts.memory_aids).toBe(1);
  });
});
