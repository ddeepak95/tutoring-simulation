import { describe, expect, it } from 'vitest';
import { C, bundledRubric, loginIdentifier, validateSubmission } from '../src/lib';
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
    const a = C.createAnnotation('examples', C.makeEvidence(conversation, 't1', 0, 5), bundledRubric.rubric, 'a');
    expect(C.validateAnnotations(conversation, [a], bundledRubric.rubric, { allowIncomplete: true })).toHaveLength(1);
    expect(() => validateSubmission(conversation, [a], bundledRubric, 'ann')).toThrow(/Complete/);
    a.entry.detail_level = 'Brief';
    expect(() => validateSubmission(conversation, [a], bundledRubric, 'ann')).toThrow(/Rate every tutor turn/);
    const ratings = completeRatings(conversation, bundledRubric);
    expect(validateSubmission(conversation, [a], bundledRubric, 'ann', ratings).feature_counts.examples).toBe(1);
    expect(validateSubmission(conversation, [], bundledRubric, 'ann', ratings).annotations).toEqual([]);
  });
  it('keeps overlap and the simplified fields', () => {
    const ev = C.makeEvidence(conversation, 't1', 0, 5);
    const a = C.createAnnotation('examples', ev, bundledRubric.rubric, 'a');
    const b = C.createAnnotation('analogies', ev, bundledRubric.rubric, 'b');
    expect(C.highlightedSegments(conversation.messages[0].text, [a, b], 't1')[0].annotations).toHaveLength(2);
    expect(C.formFields(bundledRubric.rubric.find(f => f.key === 'questions')!).map(f => f.key)).toEqual(['question_type']);
  });
});
