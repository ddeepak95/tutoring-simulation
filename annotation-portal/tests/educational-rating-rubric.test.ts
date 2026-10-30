import {expect, it} from 'vitest';
import {PGlite} from '@electric-sql/pglite';
import fs from 'node:fs';
import {bundledRubric, C} from '../src/lib';
import {activeRatingDimensions, missingTurnRatings, validateTurnRatings} from '../src/turn-ratings';
import {bundledRubric as historical} from './fixtures/legacy-rubric';
import type {TurnRatings} from '../src/types';

const conversation = C.normalizeConversation({messages: [
  {turn_id:'s0',speaker:'student',text:'Teach me chemistry.'},
  {turn_id:'t1',speaker:'tutor',text:'What do you already know?'},
  {turn_id:'s1',speaker:'student',text:'Why?'},
  {turn_id:'t2',speaker:'tutor',text:'Here is why.'},
]});
const completeRatings = (): TurnRatings => Object.fromEntries(['t1','t2'].map(id => [id, {
  values: Object.fromEntries(activeRatingDimensions(bundledRubric, conversation, id).map(d => [d.key,'3'])), notes:''
}]));

it('uses eight questions per turn, replacing introduction with follow-up', () => {
  const first = activeRatingDimensions(bundledRubric, conversation, 't1');
  const later = activeRatingDimensions(bundledRubric, conversation, 't2');
  expect(first).toHaveLength(8);
  expect(later).toHaveLength(8);
  expect(later[0].label).toBe('Addressing Follow-Up Questions');
  expect(first[0].label).toBe('Topic Introduction and Learner Engagement');
  expect(later.map(d=>d.label)).toContain('Addressing Follow-Up Questions');
  expect(later.map(d=>d.label)).not.toContain(first[0].label);
  expect(first.map(d=>d.label).slice(1)).toEqual(later.filter(d=>!d.subsequent_only).map(d=>d.label));
  expect(first.find(d=>d.key==='checking_understanding')?.scale_items['5']).toContain('probe the learner');
  expect(first.every(d=>d.guidance?.includes('no meaningful weakness or realistic improvement'))).toBe(true);
  expect(later.every(d=>d.guidance?.includes('no meaningful weakness or realistic improvement'))).toBe(true);
  expect(activeRatingDimensions(historical, conversation,'t1')).toHaveLength(5);
});

it('requires the applicable questions, accepts five-point scores and N/A, and rejects arbitrary scores', () => {
  const ratings = completeRatings();
  expect(bundledRubric.rating_dimensions?.[0].options).toEqual(['5','4','3','2','1','N/A']);
  ratings.t1.values.amount_of_information = '5';
  ratings.t1.values.memory_aids_and_key_takeaways = 'N/A';
  expect(()=>validateTurnRatings(conversation,ratings,bundledRubric,true)).not.toThrow();
  delete ratings.t2.values.addressing_follow_up_questions;
  expect(missingTurnRatings(conversation,ratings,bundledRubric)).toEqual(['t2']);
  expect(()=>validateTurnRatings(conversation,ratings,bundledRubric,true)).toThrow(/Addressing Follow-Up Questions/);
  ratings.t2.values.addressing_follow_up_questions = '6';
  expect(()=>validateTurnRatings(conversation,ratings,bundledRubric)).toThrow(/invalid rating value/);
});

it('enforces the same turn timing and N/A choices in Postgres', async () => {
  const db = new PGlite();
  try {
    await db.exec('create role anon; create role authenticated;');
    await db.exec(fs.readFileSync('supabase/migrations/202610290001_rating_turn_timing.sql','utf8'));
    const validate = (ratings: TurnRatings) => db.query('select public.validate_turn_ratings($1::jsonb,$2::jsonb,$3::jsonb,true)', [JSON.stringify(conversation), JSON.stringify(ratings), JSON.stringify(bundledRubric)]);
    const ratings = completeRatings();
    ratings.t1.values.memory_aids_and_key_takeaways = 'N/A';
    await validate(ratings);
    delete ratings.t2.values.addressing_follow_up_questions;
    await expect(validate(ratings)).rejects.toThrow(/Addressing Follow-Up Questions/);
    ratings.t2.values.addressing_follow_up_questions = '3';
    delete ratings.t1.values.topic_introduction_and_learner_engagement;
    await expect(validate(ratings)).rejects.toThrow(/Topic Introduction/);
    ratings.t1.values.topic_introduction_and_learner_engagement = '6';
    await expect(validate(ratings)).rejects.toThrow(/Invalid turn rating value/);
  } finally { await db.close(); }
});
