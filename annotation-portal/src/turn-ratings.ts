import type { Conversation, RatingDimension, RubricSnapshot, TurnRating, TurnRatings } from './types';
import questions from './generated/rating-questions.json';

export function ratingQuestionMetadata(rubric: RubricSnapshot) {
  return { rating_dimensions: activeRatingDimensions(rubric), rating_questions_source: 'conversation-evaluation/human-annotation/rating-questions.md', rating_scope: 'Rate each tutor turn using rating-questions.md and the preceding conversation. The first tutor turn has five criteria; subsequent tutor turns also require Follow-up Responsiveness.' };
}

export function activeRatingDimensions(rubric: RubricSnapshot, conversation?: Conversation, turnId?: string): RatingDimension[] {
  const firstTurn = conversation?.messages.find(turn => turn.speaker === 'tutor')?.turn_id;
  return (rubric.rating_dimensions || []).filter(dimension => dimension.key !== 'instructional_sequence').map(dimension => (questions as RatingDimension[]).find(question => question.key === dimension.key) || dimension).filter(dimension => !(conversation && turnId === firstTurn && dimension.subsequent_only));
}

export function missingTurnRatings(conversation: Conversation, ratings: TurnRatings, rubric: RubricSnapshot): string[] {
  if (!activeRatingDimensions(rubric).length) return [];
  return conversation.messages.filter(turn => turn.speaker === 'tutor' && !ratingComplete(ratings[turn.turn_id], rubric, conversation, turn.turn_id)).map(turn => turn.turn_id);
}
export function ratingComplete(rating: TurnRating | undefined, rubric: RubricSnapshot, conversation?: Conversation, turnId?: string): boolean {
  const dimensions = activeRatingDimensions(rubric, conversation, turnId);
  return Boolean(dimensions.length && dimensions.every(dimension => dimension.options.includes(rating?.values[dimension.key] || '') || (dimension.key === 'appropriateness_for_the_learners_level' && rating?.values[dimension.key] === 'Insufficient evidence')) && (rating?.values.appropriateness_for_the_learners_level !== 'Insufficient evidence' || rating.notes.trim()));
}
export function validateTurnRatings(conversation: Conversation, ratings: unknown, rubric: RubricSnapshot, complete = false): asserts ratings is TurnRatings {
  if (!ratings || typeof ratings !== 'object' || Array.isArray(ratings)) throw new Error('Invalid turn ratings.');
  const dimensions = rubric.rating_dimensions || [];
  for (const [turnId, rating] of Object.entries(ratings)) {
    if (!conversation.messages.some(turn => turn.turn_id === turnId && turn.speaker === 'tutor')) throw new Error('Ratings must belong to tutor turns.');
    if (!rating || typeof rating !== 'object' || Array.isArray(rating) || Object.keys(rating).some(key => !['values', 'notes'].includes(key)) || typeof rating.notes !== 'string' || !rating.values || typeof rating.values !== 'object' || Array.isArray(rating.values)) throw new Error('Invalid turn rating attributes.');
    for (const [key, value] of Object.entries(rating.values)) {
      if (key === 'concept_summarization' && value === 'Not applicable') continue;
      if (key === 'appropriateness_for_the_learners_level' && value === 'Insufficient evidence') continue;
      if (key === 'instructional_sequence' && typeof value === 'string' && ['', 'Rule → Example', 'Example → Rule', 'Not determinable'].includes(value)) continue;
      const dimension = dimensions.find(dimension => dimension.key === key);
      if (!dimension || typeof value !== 'string' || (value !== '' && !dimension.options.includes(value))) throw new Error('Invalid turn rating value.');
    }
  }
  if (complete) {
    const missing = missingTurnRatings(conversation, ratings as TurnRatings, rubric);
    if (missing.length) throw new Error(`Rate every tutor turn before submitting. Ratings needed: ${missing.join(', ')}.`);
  }
}
