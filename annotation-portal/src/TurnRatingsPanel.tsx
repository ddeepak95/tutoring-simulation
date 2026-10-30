import { useLayoutEffect, useRef } from 'react';
import type { Conversation, RubricSnapshot, TurnRating, TurnRatings } from './types';
import { ratingDimensionsForDisplay, ratingComplete } from './turn-ratings';
import './turn-ratings.css';

export function TurnRatingsPanel({ conversation, rubric, ratings, ratingReasons, turnId, turnIndex, readonly, onTurn, onChange, onFinish }: { conversation: Conversation; rubric: RubricSnapshot; ratings: TurnRatings; ratingReasons?: Record<string,Record<string,string>>; turnId: string; turnIndex: number; readonly: boolean; onTurn: (id: string) => void; onChange: (ratings: TurnRatings) => void; onFinish?: () => void }) {
  const panel = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (panel.current) panel.current.scrollTop = 0;
  }, [turnId]);
  const turns = conversation.messages.filter(turn => turn.speaker === 'tutor');
  const dimensions = ratingDimensionsForDisplay(rubric, conversation, turnId);
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
      <div className="rating-question-heading"><h3>{dimension.label}</h3>{dimension.guidance && <details className="rating-question-info">
        <summary aria-label={`About ${dimension.label}`} title={`About ${dimension.label}`}>i</summary>
        <div className="rating-question-popup"><p>{dimension.guidance}</p></div>
      </details>}</div>
      <p>{dimension.description}</p>
      <div className="rating-options" role="group" aria-label={dimension.label}>{dimension.options.map(value => readonly && ratingReasons
        ? <span className={`choice rating-readonly-option${rating.values[dimension.key] === value ? ' selected' : ''}`} key={value} aria-label={`${dimension.label}: ${dimension.scale_items[value] || value}${rating.values[dimension.key] === value ? ' (selected)' : ''}`}>{dimension.scale_items[value] || value}</span>
        : <button type="button" className="choice" key={value} disabled={readonly} aria-pressed={rating.values[dimension.key] === value} aria-label={`${dimension.label}: ${dimension.scale_items[value] || value}`} onClick={() => update({ ...rating, values: { ...rating.values, [dimension.key]: value } })}>{dimension.scale_items[value] || value}</button>)}</div>
      {ratingReasons?.[turnId]?.[dimension.key] && <p className="model-rating-reason"><strong>Reason:</strong> {ratingReasons[turnId][dimension.key]}</p>}
      {rating.values[dimension.key] === 'Insufficient evidence' && <small className="rating-description">Previously saved: insufficient evidence of the learner’s level.</small>}
      {dimension.key === 'concept_summarization' && rating.values[dimension.key] === 'Not applicable' && <small className="rating-description">Previously saved: no new concept explained.{!readonly && ' Choose an answer above before submitting.'}</small>}
    </section>)}</div>
    <label>Turn notes<textarea rows={3} value={rating.notes} disabled={readonly} onChange={event => update({ ...rating, notes: event.target.value })} placeholder="Optional context or rationale." /></label>
    {navigation(' bottom')}
  </aside>;
}
