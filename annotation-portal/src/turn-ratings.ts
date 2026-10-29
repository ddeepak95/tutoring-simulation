import type { Conversation, RatingDimension, RubricSnapshot, TurnRating, TurnRatings } from './types';

export function ratingQuestionMetadata(rubric: RubricSnapshot) {
  return { rating_dimensions: activeRatingDimensions(rubric), rating_questions_source: 'conversation-evaluation/human-annotation/rating-questions.md', rating_scope: rubric.rating_scope || 'Rate each tutor turn using its pinned rubric and the preceding conversation.' };
}

export function activeRatingDimensions(rubric: RubricSnapshot, conversation?: Conversation, turnId?: string): RatingDimension[] {
  const firstTurn = conversation?.messages.find(turn => turn.speaker === 'tutor')?.turn_id;
  const dimensions = (rubric.rating_dimensions || []).filter(dimension => dimension.key !== 'instructional_sequence');
  const replacesIntroduction = dimensions.some(dimension => dimension.first_only);
  return dimensions.filter(dimension => !conversation || !turnId || (turnId === firstTurn ? !dimension.subsequent_only : !dimension.first_only))
    .sort((a, b) => replacesIntroduction && conversation && turnId && turnId !== firstTurn ? Number(Boolean(b.subsequent_only)) - Number(Boolean(a.subsequent_only)) : 0);
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
  const tutorTurns = conversation.messages.filter(turn => turn.speaker === 'tutor');
  const turnName = (turnId: string) => `Bot turn ${tutorTurns.findIndex(turn => turn.turn_id === turnId) + 1} (${turnId})`;
  for (const [turnId, rating] of Object.entries(ratings)) {
    if (!tutorTurns.some(turn => turn.turn_id === turnId)) throw new Error(`Ratings must belong to Bot turns. Check turn ${turnId}.`);
    if (!rating || typeof rating !== 'object' || Array.isArray(rating) || Object.keys(rating).some(key => !['values', 'notes'].includes(key)) || typeof rating.notes !== 'string' || !rating.values || typeof rating.values !== 'object' || Array.isArray(rating.values)) throw new Error(`${turnName(turnId)} has invalid rating details.`);
    for (const [key, value] of Object.entries(rating.values)) {
      if (key === 'concept_summarization' && value === 'Not applicable') continue;
      if (key === 'appropriateness_for_the_learners_level' && value === 'Insufficient evidence') continue;
      if (key === 'instructional_sequence' && typeof value === 'string' && ['', 'Rule → Example', 'Example → Rule', 'Not determinable'].includes(value)) continue;
      const dimension = dimensions.find(dimension => dimension.key === key);
      if (!dimension || typeof value !== 'string' || (value !== '' && !dimension.options.includes(value))) throw new Error(`${turnName(turnId)}: ${dimension?.label || key} has an invalid rating value.`);
    }
  }
  if (complete) {
    const missing = missingTurnRatings(conversation, ratings as TurnRatings, rubric);
    if (missing.length) {
      const details = missing.map(turnId => {
        const rating = (ratings as TurnRatings)[turnId];
        const needed = activeRatingDimensions(rubric, conversation, turnId).filter(dimension => !dimension.options.includes(rating?.values[dimension.key] || '') && !(dimension.key === 'appropriateness_for_the_learners_level' && rating?.values[dimension.key] === 'Insufficient evidence')).map(dimension => dimension.label);
        if (rating?.values.appropriateness_for_the_learners_level === 'Insufficient evidence' && !rating.notes.trim()) needed.push('Notes explaining insufficient evidence');
        return `${turnName(turnId)}: ${needed.join(', ')}`;
      });
      throw new Error(`Rate every tutor turn before submitting. Required ratings: ${details.join('; ')}.`);
    }
  }
}
