import type { Conversation, RubricSnapshot, TurnRating, TurnRatings } from './types';
import { activeRatingDimensions, ratingComplete } from './turn-ratings';
import './turn-ratings.css';

export function TurnRatingsPanel({ conversation, rubric, ratings, turnId, readonly, onTurn, onChange }: { conversation: Conversation; rubric: RubricSnapshot; ratings: TurnRatings; turnId: string; readonly: boolean; onTurn: (id: string) => void; onChange: (ratings: TurnRatings) => void }) {
  const turns = conversation.messages.filter(turn => turn.speaker === 'tutor');
  const dimensions = activeRatingDimensions(rubric, conversation, turnId);
  const rating: TurnRating = ratings[turnId] || { values: {}, notes: '' };
  const isComplete = (id: string) => ratingComplete(ratings[id], rubric, conversation, id);
  const completed = turns.filter(turn => isComplete(turn.turn_id)).length;
  function update(next: TurnRating) { if (!readonly) onChange({ ...ratings, [turnId]: next }); }
  return <aside className="turn-ratings-panel" aria-label="Tutor turn ratings" id="turn-ratings-panel">
    <div className="turn-ratings-heading"><h2>Turn ratings</h2><small>{completed} of {turns.length} tutor turns rated</small></div>
    <label htmlFor="rated-turn">Tutor turn</label><select id="rated-turn" value={turnId} onChange={event => onTurn(event.target.value)}>{turns.map(turn => <option key={turn.turn_id} value={turn.turn_id}>{turn.turn_id} — {isComplete(turn.turn_id) ? 'Rated' : 'Rating pending'}</option>)}</select>
    <p className="rating-context">Rate this tutor turn using the preceding conversation as context.</p>
    {readonly && <p className="rating-context">Read only</p>}
    <div className="rating-dimensions">{dimensions.map(dimension => <section className="rating-dimension" key={dimension.key}>
      <h3>{dimension.label}</h3><p>{dimension.description}</p>
      <div className="rating-options" role="group" aria-label={dimension.label}>{dimension.options.map(value => <button type="button" className="choice" key={value} disabled={readonly} aria-pressed={rating.values[dimension.key] === value} aria-label={`${dimension.label}: ${dimension.scale_items[value] || value}`} onClick={() => update({ ...rating, values: { ...rating.values, [dimension.key]: value } })}>{dimension.scale_items[value] || value}</button>)}</div>
      {rating.values[dimension.key] === 'Insufficient evidence' && <small className="rating-description">Previously saved: insufficient evidence of the learner’s level.</small>}
      {dimension.key === 'concept_summarization' && rating.values[dimension.key] === 'Not applicable' && <small className="rating-description">Previously saved: no new concept explained.{!readonly && ' Choose an answer above before submitting.'}</small>}
    </section>)}</div>
    <label>Turn notes<textarea rows={3} value={rating.notes} disabled={readonly} onChange={event => update({ ...rating, notes: event.target.value })} placeholder="Optional context or rationale." /></label>
    <button type="button" className="secondary" disabled={!turns.some(turn => !isComplete(turn.turn_id) && turn.turn_id !== turnId)} onClick={() => { const next = turns.find(turn => !isComplete(turn.turn_id) && turn.turn_id !== turnId); if (next) onTurn(next.turn_id); }}>Next unrated turn</button>
  </aside>;
}
