import type { Conversation, RubricSnapshot, TurnRating, TurnRatings } from './types';
import { activeRatingDimensions, ratingComplete } from './turn-ratings';

export function TurnRatingsPanel({ conversation, rubric, ratings, turnId, readonly, onTurn, onChange }: { conversation: Conversation; rubric: RubricSnapshot; ratings: TurnRatings; turnId: string; readonly: boolean; onTurn: (id: string) => void; onChange: (ratings: TurnRatings) => void }) {
  const turns = conversation.messages.filter(turn => turn.speaker === 'tutor');
  const dimensions = activeRatingDimensions(rubric);
  const rating: TurnRating = ratings[turnId] || { values: {}, notes: '' };
  const completed = turns.filter(turn => ratingComplete(ratings[turn.turn_id], rubric)).length;
  function update(next: TurnRating) { if (!readonly) onChange({ ...ratings, [turnId]: next }); }
  return <aside className="turn-ratings-panel" aria-label="Tutor turn ratings" id="turn-ratings-panel">
    <div className="turn-ratings-heading"><h2>Turn ratings</h2><small>{completed} of {turns.length} tutor turns rated</small></div>
    <label htmlFor="rated-turn">Tutor turn</label><select id="rated-turn" value={turnId} onChange={event => onTurn(event.target.value)}>{turns.map(turn => <option key={turn.turn_id} value={turn.turn_id}>{turn.turn_id} — {ratingComplete(ratings[turn.turn_id], rubric) ? 'Rated' : 'Rating pending'}</option>)}</select>
    <p className="rating-context">Rate this tutor turn using the preceding conversation as context.</p>
    {readonly && <p className="rating-context">Read only</p>}
    <div className="rating-dimensions">{dimensions.map(dimension => <section className="rating-dimension" key={dimension.key}>
      <h3>{dimension.label}</h3><p>{dimension.description}</p>
      <div className="rating-options" role="group" aria-label={dimension.label}>{dimension.options.map(value => <button type="button" className="choice" key={value} disabled={readonly} aria-pressed={rating.values[dimension.key] === value} aria-label={`${dimension.label}: ${value}`} title={dimension.scale_items[value]} onClick={() => update({ ...rating, values: { ...rating.values, [dimension.key]: value } })}>{value}</button>)}</div>
      {rating.values[dimension.key] && <small className="rating-description">{dimension.scale_items[rating.values[dimension.key]]}</small>}
      <details><summary>Rating guidance</summary><p>{dimension.guidance.replaceAll('<br><br>', '\n\n').replaceAll('**', '').replaceAll('`', '')}</p></details>
    </section>)}</div>
    <label>Turn notes<textarea rows={3} value={rating.notes} disabled={readonly} onChange={event => update({ ...rating, notes: event.target.value })} placeholder="Optional context or rationale; required when learner-level evidence is insufficient." /></label>
    <button type="button" className="secondary" disabled={turns.every(turn => ratingComplete(ratings[turn.turn_id], rubric))} onClick={() => { const next = turns.find(turn => !ratingComplete(ratings[turn.turn_id], rubric) && turn.turn_id !== turnId); if (next) onTurn(next.turn_id); }}>Next unrated turn</button>
  </aside>;
}
