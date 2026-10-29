import { useLayoutEffect, useRef } from 'react';
import type { Conversation, RubricSnapshot, TurnRating, TurnRatings } from './types';
import { activeRatingDimensions, ratingComplete } from './turn-ratings';
import './turn-ratings.css';

export function TurnRatingsPanel({ conversation, rubric, ratings, turnId, turnIndex, readonly, onTurn, onChange, onFinish }: { conversation: Conversation; rubric: RubricSnapshot; ratings: TurnRatings; turnId: string; turnIndex: number; readonly: boolean; onTurn: (id: string) => void; onChange: (ratings: TurnRatings) => void; onFinish?: () => void }) {
  const panel = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (panel.current) panel.current.scrollTop = 0;
  }, [turnId]);
  const turns = conversation.messages.filter(turn => turn.speaker === 'tutor');
  const dimensions = activeRatingDimensions(rubric, conversation, turnId);
  const rating: TurnRating = ratings[turnId] || { values: {}, notes: '' };
  const isComplete = (id: string) => ratingComplete(ratings[id], rubric, conversation, id);
  const completed = turns.filter(turn => isComplete(turn.turn_id)).length;
  const currentComplete = ratingComplete(rating, rubric, conversation, turnId);
  const previous = turns[turnIndex - 1]; const next = turns[turnIndex + 1];
  function update(next: TurnRating) { if (!readonly) onChange({ ...ratings, [turnId]: next }); }
  function navigation(position: '' | ' bottom' = '') { return <div className={`rating-turn-navigation${position}`}><button type="button" className="secondary" disabled={!previous} onClick={() => previous && onTurn(previous.turn_id)}>Previous</button><strong>Tutor turn {turnIndex + 1} of {turns.length}</strong><button type="button" className="primary" disabled={next ? (!readonly && !currentComplete) : (readonly || !currentComplete)} onClick={() => next ? onTurn(next.turn_id) : onFinish?.()}>{next ? 'Next' : 'Finish'}</button></div>; }
  return <aside ref={panel} className="turn-ratings-panel" aria-label="Tutor turn ratings" id="turn-ratings-panel">
    <div className="turn-ratings-heading">{navigation()}<small>{completed} of {turns.length} tutor turns rated</small></div>
    <p className="rating-context">Rate the tutor response shown in the conversation using the preceding context.</p>
    {readonly && <p className="rating-context">Read only</p>}
    <div className="rating-dimensions">{dimensions.map(dimension => <section className="rating-dimension" key={dimension.key}>
      <h3>{dimension.label}</h3><p>{dimension.description}</p>
      {dimension.options.includes('N/A') && <small className="rating-description">{dimension.guidance}</small>}
      <div className="rating-options" role="group" aria-label={dimension.label}>{dimension.options.map(value => <button type="button" className="choice" key={value} disabled={readonly} aria-pressed={rating.values[dimension.key] === value} aria-label={`${dimension.label}: ${dimension.scale_items[value] || value}`} onClick={() => update({ ...rating, values: { ...rating.values, [dimension.key]: value } })}>{dimension.scale_items[value] || value}</button>)}</div>
      {rating.values[dimension.key] === 'Insufficient evidence' && <small className="rating-description">Previously saved: insufficient evidence of the learner’s level.</small>}
      {dimension.key === 'concept_summarization' && rating.values[dimension.key] === 'Not applicable' && <small className="rating-description">Previously saved: no new concept explained.{!readonly && ' Choose an answer above before submitting.'}</small>}
    </section>)}</div>
    <label>Turn notes<textarea rows={3} value={rating.notes} disabled={readonly} onChange={event => update({ ...rating, notes: event.target.value })} placeholder="Optional context or rationale." /></label>
    {navigation(' bottom')}
  </aside>;
}
