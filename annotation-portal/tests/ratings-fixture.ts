import type { Conversation, RubricSnapshot, TurnRatings } from '../src/types';
export function completeRatings(conversation: Conversation, rubric: RubricSnapshot): TurnRatings {
  return Object.fromEntries(conversation.messages.filter(turn => turn.speaker === 'tutor').map(turn => [turn.turn_id, { values: Object.fromEntries((rubric.rating_dimensions || []).map(dimension => [dimension.key, dimension.options[0]])), notes: '' }]));
}
