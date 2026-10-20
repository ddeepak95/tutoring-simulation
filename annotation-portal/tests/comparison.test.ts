import { describe, expect, it } from 'vitest';
import { comparisonComplete, comparisonQuestions, comparisonRounds, overallComparisonQuestions } from '../src/comparison';
import questions from '../src/generated/comparison-questions.json';
import legacyQuestions from '../src/generated/rating-questions.json';
import type { Conversation } from '../src/types';

const conversation: Conversation = { conversation_id: null, learning_topic: null, label: 'Test', messages: [
  { turn_id: 's0', speaker: 'student', text: 'Initial prompt' },
  { turn_id: 't1', speaker: 'tutor', text: 'First tutor' },
  { turn_id: 's1', speaker: 'student', text: 'Student reply' },
  { turn_id: 's2', speaker: 'student', text: 'Another reply' },
  { turn_id: 't2', speaker: 'tutor', text: 'Second tutor' },
] };
describe('comparison rounds', () => {
  it('keeps paper-based question wording and guidance instead of legacy overrides', () => {
    const active = comparisonQuestions(questions, 1);
    expect(active.map(q => q.key)).toEqual(['follow_up_responsiveness', ...questions.filter(q => q.scope === 'turn' && !q.subsequent_only).map(q => q.key)]);
    expect(overallComparisonQuestions(questions)).toHaveLength(2);
    expect(active.every(q => q.scope !== 'overall')).toBe(true);
    expect(active[0].description).toBe("Which of the two responses better addresses the student's follow-up?");
    expect(active.some(q => q.key === 'positivity_of_tone')).toBe(false);
  });
  it('preserves historical question sets and their completion requirements', () => {
    const old = comparisonQuestions(legacyQuestions, 0);
    expect(old).toHaveLength(8);
    expect(comparisonQuestions(legacyQuestions, 1)).toHaveLength(10);
    expect(old[0].description).toBe('Which of the two responses better recaps the key points of each newly explained concept?');
    const pinned = [{ ...old[0], description: 'Which of the two responses better meets the original study criterion?', guidance: 'Original study guidance.' }];
    expect(comparisonQuestions(pinned, 0)).toEqual(pinned);
    const answer = { values: Object.fromEntries(old.map(q => [q.key, 'tie' as const])), notes: '' };
    expect(comparisonComplete(answer, legacyQuestions, 0)).toBe(true);
    expect(comparisonComplete(answer, questions, 0)).toBe(false);
  });
  it('shows only the initial tutor and then all preceding student responses', () => {
    const rounds = comparisonRounds(conversation);
    expect(rounds.map(round => round.tutor.turn_id)).toEqual(['t1', 't2']);
    expect(rounds[0].students).toEqual([]);
    expect(rounds[1].students.map(turn => turn.turn_id)).toEqual(['s1', 's2']);
  });
  it('requires every applicable question and accepts ties', () => {
    expect(comparisonQuestions(questions, 0).some(q => q.key === 'follow_up_responsiveness')).toBe(false);
    expect(comparisonQuestions(questions, 1).some(q => q.key === 'follow_up_responsiveness')).toBe(true);
    expect(comparisonQuestions(questions, 0)).toHaveLength(5);
    expect(comparisonQuestions(questions, 1)).toHaveLength(6);
    const answer = { values: Object.fromEntries(comparisonQuestions(questions, 0).map(q => [q.key, 'tie' as const])), notes: '' };
    expect(comparisonComplete(answer, questions, 0)).toBe(true);
    expect(comparisonComplete(answer, questions, 1)).toBe(false);
    expect(comparisonComplete({ values: {}, notes: '' }, questions, 0)).toBe(false);
  });
});
