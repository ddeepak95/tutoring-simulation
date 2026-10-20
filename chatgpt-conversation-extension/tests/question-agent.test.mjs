import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuestionSet, questionFingerprint, answerSelectionIsNeeded, answerSelectionScopes, mergeInteractiveStates, isAnswerAllowed } from '../scripts/question-agent-core.mjs';

const question = { id: 'algebra-01', prompt: 'Explain linear equations.', title: 'Linear equations', topic: 'Algebra', language: 'English' };

test('validates question definitions and rejects duplicate IDs', () => {
  assert.deepEqual(parseQuestionSet({ questions: [question] }), [question]);
  assert.equal(questionFingerprint(question).length, 64);
  assert.throws(() => parseQuestionSet({ questions: [question, question] }), /duplicate id/);
  assert.throws(() => parseQuestionSet({ questions: [] }), /between 1 and 100/);
});

test('only enables answer selection when its own panel has blocked navigation', () => {
  const option = { kind: 'answer', selected: false, disabled: false, scope_id: 'panel-1' };
  const blocked = { kind: 'click', label: 'Next', disabled: true, scope_id: 'panel-1' };
  assert.equal(answerSelectionIsNeeded([option, blocked]), true);
  assert.equal(answerSelectionIsNeeded([option, { ...blocked, label: 'Previous' }]), false);
  assert.equal(answerSelectionIsNeeded([option, { ...blocked, scope_id: 'panel-2' }]), false);
  assert.equal(answerSelectionIsNeeded([{ ...option, selected: true }, blocked]), false);
  const allowedScopes = answerSelectionScopes([option, blocked]);
  assert.equal(isAnswerAllowed({ type: 'click', target_id: 'a' }, [{ ...option, id: 'a' }], new Set()), false);
  assert.equal(isAnswerAllowed({ type: 'click', target_id: 'a' }, [{ ...option, id: 'a' }], allowedScopes), true);
  assert.equal(isAnswerAllowed({ type: 'click', target_id: 'b' }, [{ ...option, id: 'b', scope_id: 'panel-2' }], allowedScopes), false);
});

test('merges captured states without injecting visible explanatory notes', () => {
  const base = { html: '<!doctype html><html><body><main>Answer</main></body></html>', text: 'Answer', report: { limitations: [] } };
  const state = { capture: { html: '<html><body><section>Revealed content</section></body></html>', text: 'Revealed content' } };
  const merged = mergeInteractiveStates(base, [state], { status: 'completed', steps: [], limitations: [] });
  assert.match(merged.html, /data-portal-assisted-state/);
  assert.match(merged.text, /Revealed content/);
  assert.doesNotMatch(merged.html, /Additional captured view|capture-generated answer/i);
  assert.equal(merged.report.assisted.states_saved, 1);
});
