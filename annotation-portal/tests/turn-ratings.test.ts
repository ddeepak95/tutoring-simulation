import { expect, it } from 'vitest';
import { bundledRubric, C, validateSubmission } from '../src/lib';
import { missingTurnRatings, ratingComplete, validateTurnRatings } from '../src/turn-ratings';
import { completeRatings } from './ratings-fixture';
import { activeRatingDimensions } from '../src/turn-ratings';
const conversation = C.normalizeConversation({ messages: [{ turn_id: 't1', speaker: 'tutor', text: 'One.' }, { turn_id: 's1', speaker: 'student', text: 'Why?' }, { turn_id: 't2', speaker: 'tutor', text: 'Two.' }] });

it('omits instructional sequence for new and historical rubrics without discarding saved ratings', () => {
  const legacy = { ...bundledRubric, rating_dimensions: [...bundledRubric.rating_dimensions!, { key: 'instructional_sequence', label: 'Instructional Sequence', description: '', options: ['Not determinable'], scale_items: {}, guidance: '' }] };
  expect(activeRatingDimensions(legacy)).toHaveLength(10);
  expect(bundledRubric.rating_dimensions).toHaveLength(10);
  const ratings = completeRatings(conversation, bundledRubric);
  expect(() => validateTurnRatings(conversation, ratings, legacy, true)).not.toThrow();
  ratings.t1.values.instructional_sequence = 'Not determinable';
  expect(() => validateTurnRatings(conversation, ratings, bundledRubric, true)).not.toThrow();
  expect(ratings.t1.values.instructional_sequence).toBe('Not determinable');
  ratings.t1.values.instructional_sequence = 'invalid';
  expect(() => validateTurnRatings(conversation, ratings, bundledRubric, true)).toThrow();
});

it('requires every dimension of every tutor turn, including conversations without highlights', () => {
  const ratings = completeRatings(conversation, bundledRubric);
  expect(missingTurnRatings(conversation, ratings, bundledRubric)).toEqual([]);
  delete ratings.t2.values.relevance;
  expect(missingTurnRatings(conversation, ratings, bundledRubric)).toEqual(['t2']);
  expect(() => validateSubmission(conversation, [], bundledRubric, 'alice', ratings)).toThrow(/t2/);
  expect(() => validateTurnRatings(conversation, ratings, bundledRubric)).not.toThrow();
});
it('rejects student, unknown, invalid and malformed ratings and requires limitation notes', () => {
  const ratings = completeRatings(conversation, bundledRubric);
  for (const bad of [{ s1: ratings.t1 }, { unknown: ratings.t1 }, { t1: { values: { relevance: '4' }, notes: '' } }, { t1: { values: [], notes: '' } }, { t1: { values: {}, notes: 1 } }]) expect(() => validateTurnRatings(conversation, bad, bundledRubric)).toThrow();
  ratings.t1.values.appropriateness_for_the_learners_level = 'Insufficient evidence';
  expect(ratingComplete(ratings.t1, bundledRubric)).toBe(false);
  ratings.t1.notes = 'The learner level is not supplied or demonstrated.';
  expect(ratingComplete(ratings.t1, bundledRubric)).toBe(true);
  expect(() => validateTurnRatings(conversation, ratings, bundledRubric, true)).not.toThrow();
});
it('requires only issue descriptions and explanations, preserving exact evidence in exports', () => {
  const issue = C.createAnnotation('issues', C.makeEvidence(conversation, 't1', 0, 4), bundledRubric.rubric, 'issue');
  expect(C.formFields(bundledRubric.rubric.find(feature => feature.key === 'issues')!).map(field => field.key)).toEqual(['issue', 'explanation']);
  expect(() => validateSubmission(conversation, [issue], bundledRubric, 'alice', completeRatings(conversation, bundledRubric))).toThrow(/Complete/);
  issue.entry.issue = 'Incorrect claim'; issue.entry.explanation = 'Why it is incorrect and the correct claim.';
  C.addEvidence(issue, C.makeEvidence(conversation, 't2', 0, 4));
  const result = validateSubmission(conversation, [issue], bundledRubric, 'alice', completeRatings(conversation, bundledRubric));
  expect(result.annotations[0].evidence.map(evidence => evidence.quote)).toEqual(['One.', 'Two.']);
  expect(result.issues).toEqual([issue.entry]);
  expect((result.instructional_features as Record<string, unknown>).issues).toBeUndefined();
});
