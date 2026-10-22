import { expect, test, type Page } from '@playwright/test';
import { backend, ids, login, profiles, sample } from './mock';
import fs from 'node:fs';
import type { ComparisonAssignment, ComparisonPair } from '../../src/comparison';
const questions = JSON.parse(fs.readFileSync('src/generated/comparison-questions.json', 'utf8'));

async function comparisonBackend(page: Page) {
  const state = await backend(page);
  const docB = '00000000-0000-4000-8000-000000000020';
  state.documents[0].topic_id = 'evaporation';
  state.documents.push({ ...structuredClone(state.documents[0]), id: docB, label: 'Alternative tutor', language: 'en', source_conversation_id: ids.doc, transcript: { ...structuredClone(sample), source_conversation_id: ids.doc, messages: [
    { turn_id: 'b1', speaker: 'tutor', text: 'Alternative first response.\n\n' + Array.from({ length: 60 }, (_, i) => `Explanation paragraph ${i + 1}.`).join('\n\n') },
    { turn_id: 'bs1', speaker: 'student', text: 'Alternative student reply.' },
    { turn_id: 'b2', speaker: 'tutor', text: 'Alternative second response.' },
  ] } });
  state.documents[0].transcript.provider = 'ChatGPT';
  state.documents[1].transcript.provider = 'gpt-6.1-sol';
  const assignments: ComparisonAssignment[] = [];
  const pairs: ComparisonPair[] = [];
  const comparisonState = { failSave: false };
  await page.route('**/rest/v1/**', async route => {
    const url = new URL(route.request().url());
    const send = (value: unknown, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(value) });
    if (url.pathname === '/rest/v1/comparison_assignments') {
      const id = url.searchParams.get('id')?.slice(3);
      return send(id ? assignments.find(row => row.id === id) : assignments.map(row => ({ ...row, profiles: profiles.find(p => p.id === row.annotator_id) })));
    }
    if (url.pathname === '/rest/v1/comparison_pairs') return send(pairs);
    if (url.pathname === '/rest/v1/rpc/create_comparison_pair') {
      const body = route.request().postDataJSON();
      const existing = pairs.find(pair => (pair.mode || 'turn_wise') === body.p_mode && [pair.conversation_a_id, pair.conversation_b_id].sort().join() === [body.p_conversation_a_id, body.p_conversation_b_id].sort().join());
      if (existing) return send(existing.id);
      const pair: ComparisonPair = { id: `00000000-0000-4000-8000-${String(pairs.length + 40).padStart(12, '0')}`, mode: body.p_mode, conversation_a_id: body.p_conversation_a_id, conversation_b_id: body.p_conversation_b_id, questions: body.p_questions, created_at: new Date().toISOString() };
      pairs.push(pair); return send(pair.id);
    }
    if (url.pathname === '/rest/v1/rpc/assign_comparison_pair') {
      const body = route.request().postDataJSON(); const pair = pairs.find(item => item.id === body.p_pair_id)!;
      let count = 0;
      for (const id of new Set<string>(body.p_annotator_ids)) {
        if (assignments.some(item => item.pair_id === pair.id && item.annotator_id === id)) continue;
        assignments.push({ id: `00000000-0000-4000-8000-${String(assignments.length + 30).padStart(12, '0')}`, pair_id: pair.id, mode: pair.mode, conversation_a_id: pair.conversation_a_id, conversation_b_id: pair.conversation_b_id, annotator_id: id, questions: pair.questions, answers: [], status: 'not_started', revision: 0, submitted_at: null, updated_at: new Date().toISOString() }); count++;
      }
      return send(count);
    }
    if (url.pathname === '/rest/v1/rpc/create_comparison_assignment') {
      const body = route.request().postDataJSON();
      const row: ComparisonAssignment = { id: '00000000-0000-4000-8000-000000000030', conversation_a_id: body.p_conversation_a_id, conversation_b_id: body.p_conversation_b_id, annotator_id: body.p_annotator_id, questions: body.p_questions, answers: [], status: 'not_started', revision: 0, submitted_at: null, updated_at: new Date().toISOString() };
      if (!assignments.length) assignments.push(row);
      return send(row.id);
    }
    if (url.pathname === '/rest/v1/rpc/save_comparison_round') {
      if (comparisonState.failSave) return send({ message: 'Network unavailable. Try saving again.' }, 503);
      const body = route.request().postDataJSON(); const row = assignments[0];
      row.answers.push(body.p_answer); row.revision++; row.status = 'in_progress';
      return send(row);
    }
    if (url.pathname === '/rest/v1/rpc/save_comparison_overall') {
      if (comparisonState.failSave) return send({ message: 'Network unavailable. Try saving again.' }, 503);
      const body = route.request().postDataJSON(); const row = assignments[0];
      row.overall_answer = body.p_answer; row.revision++; row.status = 'submitted';
      return send(row);
    }
    if (url.pathname === '/rest/v1/rpc/save_whole_comparison') {
      if (comparisonState.failSave) return send({ message: 'Network unavailable. Try saving again.' }, 503);
      const body = route.request().postDataJSON(); const row = assignments.find(item => item.id === body.p_assignment_id)!;
      if (row.revision !== body.p_revision || row.mode !== 'whole_conversation') return send({ message: 'Revision conflict.' }, 409);
      row.overall_answer = body.p_answer; row.revision++; row.status = 'submitted'; row.submitted_at = new Date().toISOString();
      return send(row);
    }
    if (url.pathname === '/rest/v1/rpc/reset_comparison_assignment') {
      if (comparisonState.failSave) return send({ message: 'Reset unavailable. Try again.' }, 503);
      const body = route.request().postDataJSON(); const row = assignments.find(item => item.id === body.p_assignment_id)!;
      row.questions = body.p_questions; row.answers = []; row.overall_answer = null; row.status = 'not_started'; row.submitted_at = null; row.revision++;
      return send(row);
    }
    if (url.pathname === '/rest/v1/rpc/delete_comparison_assignment') {
      const body = route.request().postDataJSON(); const index = assignments.findIndex(item => item.id === body.p_assignment_id);
      if (index < 0 || assignments[index].revision !== body.p_revision) return send({ message: 'Revision conflict. Reload the comparison before deleting.' }, 409);
      const [row] = assignments.splice(index, 1);
      return send({ assignment_id: row.id, pair_id: row.pair_id, deleted: true });
    }
    if (url.pathname === '/rest/v1/rpc/delete_comparison_pair') {
      const body = route.request().postDataJSON(); const index = pairs.findIndex(item => item.id === body.p_pair_id);
      if (index < 0) return send({ message: 'Comparison pair not found' }, 404);
      const current = assignments.filter(row => row.pair_id === body.p_pair_id);
      const expected = current.map(row => ({ id: row.id, revision: row.revision })).sort((a, b) => a.id.localeCompare(b.id));
      if (JSON.stringify(expected) !== JSON.stringify(body.p_expected_assignments)) return send({ message: 'Comparison assignments changed. Refresh before deleting the pair.' }, 409);
      pairs.splice(index, 1);
      assignments.splice(0, assignments.length, ...assignments.filter(row => row.pair_id !== body.p_pair_id));
      return send({ pair_id: body.p_pair_id, deleted_assignments: current.length, deleted: true });
    }
    return route.fallback();
  });
  function seed() {
    const pair: ComparisonPair = { id: '00000000-0000-4000-8000-000000000040', conversation_a_id: ids.doc, conversation_b_id: docB, questions, created_at: new Date().toISOString() };
    pairs.push(pair);
    assignments.push({ id: '00000000-0000-4000-8000-000000000030', pair_id: pair.id, conversation_a_id: ids.doc, conversation_b_id: docB, annotator_id: ids.alice, questions, answers: [], status: 'not_started', revision: 0, submitted_at: null, updated_at: new Date().toISOString() });
  }
  return { documents: state.documents, captureDocuments: state.captureDocuments, assignments, pairs, comparisonState, docB, seed };
}

test('dashboard lists label, rate, and comparison assignments in separate sections', async ({ page }) => {
  const state = await comparisonBackend(page); state.seed();
  await login(page, 'alice');
  const label = page.getByRole('region', { name: 'Label instructional features' });
  const rate = page.getByRole('region', { name: 'Rate tutor turns' });
  const compare = page.getByRole('region', { name: 'Compare', exact: true });
  await expect(label.locator('a[href^="/assignments/"]').first()).toBeVisible();
  await expect(rate.getByText('No rate assignments yet')).toBeVisible();
  await expect(compare.getByRole('heading', { name: 'Compare', exact: true })).toBeVisible();
  const comparison = compare.getByRole('link', { name: /Open$/ });
  await expect(comparison).toBeVisible();
  await expect(comparison.locator('.comparison-mode-pill')).toHaveText('Turn wise');
  await expect(label.locator('a[href^="/comparisons/"]')).toHaveCount(0);
  await expect(compare.locator('a[href^="/assignments/"]')).toHaveCount(0);
  await expect(page.getByText('YOUR WORKSPACE', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Your assignments', exact: true })).toHaveCount(0);
  await expect(page.getByText('Pick a conversation to continue annotating.', { exact: true })).toHaveCount(0);
  await comparison.click();
  await expect(page.getByRole('button', { name: 'Reset responses', exact: true })).toHaveCount(0);
  await expect(page.getByText('Question 1 of 5', { exact: false })).toBeVisible();
  await page.getByRole('link', { name: '← Dashboard' }).click();
  await expect(page).toHaveURL(/\/#compare$/);
  await expect(compare.getByRole('heading', { name: 'Compare', exact: true })).toBeFocused();
  await expect(compare.getByRole('link', { name: /Open$/ })).toBeVisible();
});

test('admin creates a pair before assigning it to multiple annotators', async ({ page }) => {
  const state = await comparisonBackend(page); await login(page, 'admin');
  await page.getByRole('link', { name: 'Comparisons', exact: true }).click();
  await page.getByLabel('Conversation A', { exact: true }).selectOption(ids.doc);
  await page.getByLabel('Conversation B', { exact: true }).selectOption(ids.doc);
  await expect(page.getByRole('button', { name: 'Create pair', exact: true })).toBeDisabled();
  await page.getByLabel('Conversation B', { exact: true }).selectOption(state.docB);
  await page.getByRole('button', { name: 'Create pair', exact: true }).click();
  await expect(page.getByText('Comparison pair created.', { exact: false })).toBeVisible();
  const toast = page.locator('.portal-toast');
  await expect(toast).toHaveCSS('position', 'fixed');
  await toast.getByRole('button', { name: 'Dismiss notification' }).click();
  await expect(toast).toHaveCount(0);
  expect(state.assignments).toHaveLength(0);
  const pair = page.locator('.comparison-pair-item').first();
  await expect(pair.locator('.comparison-mode-pill')).toHaveText('Turn wise');
  await expect(pair.getByText('0/0 completed')).toBeVisible();
  await pair.getByRole('checkbox', { name: 'alice' }).check();
  await pair.getByRole('checkbox', { name: 'bob' }).check();
  await pair.getByRole('button', { name: 'Assign 2 annotators' }).click();
  await expect(page.getByText('2 annotators assigned', { exact: false })).toBeVisible();
  await expect(pair.getByText('0/2 completed')).toBeVisible();
  await expect(pair.getByRole('checkbox')).toHaveCount(0);
  await expect(pair.getByRole('link', { name: 'View' })).toHaveCount(2);
  expect(state.assignments).toHaveLength(2);
  await expect(page.locator('.comparisons-page .assignment-list')).toHaveCount(0);
  await expect(pair.getByRole('heading', { name: 'Evaporation' })).toBeVisible();
  await expect(pair.getByText('Topic ID: evaporation')).toBeVisible();
  await expect(pair.getByText('Tamil · Original · ChatGPT')).toBeVisible();
  await expect(pair.getByText('English · Translated from Tamil · gpt-6.1-sol')).toBeVisible();
  await expect(pair.getByText('alice')).toBeVisible();
  await expect(pair.getByText('0/2 turns').first()).toBeVisible();
  expect(state.assignments[0].annotator_id).toBe(ids.alice);
  expect(state.assignments[0].questions).toHaveLength(7);
  expect(state.assignments[0].questions.filter(question => question.scope === 'overall')).toHaveLength(1);
  state.assignments[0].status = 'submitted';
  await page.getByRole('button', { name: 'Refresh' }).click();
  await expect(pair.getByText('1/2 completed')).toBeVisible();
  await expect(pair.getByText('Submitted')).toBeVisible();
  await pair.getByRole('link', { name: 'View' }).first().click();
  await page.getByLabel('Comparison details').click();
  await expect(page.locator('.comparison-info-panel')).toContainText('Provider A');
  await expect(page.locator('.comparison-info-panel')).toContainText('ChatGPT');
  await expect(page.locator('.comparison-info-panel')).toContainText('Provider B');
  await expect(page.locator('.comparison-info-panel')).toContainText('gpt-6.1-sol');
  await expect(page.getByRole('button', { name: 'Choose conversation A', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Tie / equally good', exact: true })).toBeDisabled();
});

test('admin resets one annotator, deletes that assignment, and deletes the pair with confirmation', async ({ page }) => {
  const state = await comparisonBackend(page); state.seed();
  state.assignments.push({ ...structuredClone(state.assignments[0]), id: '00000000-0000-4000-8000-000000000031', annotator_id: ids.bob });
  const alice = state.assignments[0];
  alice.answers = [{ values: { concept_summarization: 'a' }, notes: 'Saved work' }];
  alice.status = 'in_progress'; alice.revision = 1;
  await login(page, 'admin');
  await page.getByRole('link', { name: 'Comparisons', exact: true }).click();
  const pair = page.locator('.comparison-pair-item');
  const aliceRow = pair.locator('.comparison-assigned-list li').filter({ hasText: 'alice' });
  await expect(pair.getByText('0/2 completed')).toBeVisible();
  await aliceRow.getByRole('button', { name: 'Reset' }).click();
  const reset = page.getByRole('dialog', { name: "Reset alice's comparison?" });
  await expect(reset).toContainText('Previous responses remain in revision history.');
  await reset.getByRole('button', { name: 'Cancel' }).click();
  expect(alice.answers).toHaveLength(1);
  await aliceRow.getByRole('button', { name: 'Reset' }).click();
  await reset.getByRole('button', { name: 'Reset responses' }).click();
  await expect(aliceRow.getByText('Not started')).toBeVisible();
  expect(alice.answers).toHaveLength(0);
  expect(state.assignments).toHaveLength(2);
  await aliceRow.getByRole('button', { name: 'Delete' }).click();
  const deleteAssignment = page.getByRole('dialog', { name: "Delete alice's comparison?" });
  await deleteAssignment.getByRole('button', { name: 'Cancel' }).click();
  expect(state.assignments).toHaveLength(2);
  await aliceRow.getByRole('button', { name: 'Delete' }).click();
  await deleteAssignment.getByRole('button', { name: 'Delete comparison' }).click();
  await expect(pair.getByText('0/1 completed')).toBeVisible();
  expect(state.assignments.map(row => row.annotator_id)).toEqual([ids.bob]);
  await expect(pair.getByRole('checkbox', { name: 'alice' })).toBeVisible();
  await pair.getByRole('button', { name: 'Delete pair' }).click();
  const deletePair = page.getByRole('dialog', { name: 'Delete comparison pair?' });
  await deletePair.getByRole('button', { name: 'Cancel' }).click();
  expect(state.pairs).toHaveLength(1);
  await pair.getByRole('button', { name: 'Delete pair' }).click();
  await deletePair.getByRole('button', { name: 'Delete pair' }).click();
  await expect(page.getByText('No comparison pairs yet.')).toBeVisible();
  expect(state.pairs).toHaveLength(0);
  expect(state.assignments).toHaveLength(0);
});

test('comparison picker shows language and source type and limits choices to the selected topic', async ({ page }) => {
  const state = await comparisonBackend(page);
  const otherId = '00000000-0000-4000-8000-000000000021';
  state.documents.push({ ...structuredClone(state.documents[0]), id: otherId, topic_id: 'brain', label: 'Brain conversation', transcript: { ...structuredClone(sample), topic_id: 'brain', topic_name: 'Alkaline earth metals' } });
  await login(page, 'admin');
  await page.getByRole('link', { name: 'Comparisons', exact: true }).click();
  const first = page.getByLabel('Conversation A', { exact: true });
  const second = page.getByLabel('Conversation B', { exact: true });
  await expect(first.locator('option').nth(1)).toHaveAttribute('value', otherId);
  await expect(first.locator(`option[value="${ids.doc}"]`)).toHaveText('Evaporation — Tamil — Original — ChatGPT');
  await expect(first.locator(`option[value="${state.docB}"]`)).toHaveText('Evaporation — English — Translated from Tamil — gpt-6.1-sol');
  await first.selectOption(ids.doc);
  await expect(second.locator(`option[value="${otherId}"]`)).toHaveCount(0);
  await expect(second.locator(`option[value="${state.docB}"]`)).toHaveCount(1);
  await second.selectOption(state.docB);
  await expect(page.getByRole('button', { name: 'Create pair', exact: true })).toBeEnabled();
});

test('admin can create a whole-conversation pair with different turn counts', async ({ page }) => {
  const state = await comparisonBackend(page);
  state.documents[1].transcript.messages.push({ turn_id: 'b3', speaker: 'tutor', text: 'A third explanation.' });
  await login(page, 'admin');
  await page.getByRole('link', { name: 'Comparisons', exact: true }).click();
  await page.getByLabel('Conversation A', { exact: true }).selectOption(ids.doc);
  await page.getByLabel('Conversation B', { exact: true }).selectOption(state.docB);
  await expect(page.getByRole('button', { name: 'Create pair', exact: true })).toBeDisabled();
  await page.getByRole('radio', { name: 'Whole conversation' }).check();
  await page.getByRole('button', { name: 'Create pair', exact: true }).click();
  await expect(page.locator('.comparison-pair-item')).toContainText('Whole conversation');
  await expect(page.locator('.comparison-pair-item .comparison-mode-pill')).toHaveText('Whole conversation');
  expect(state.pairs[0].mode).toBe('whole_conversation');
});

test('whole-conversation mode shows both full transcripts for each question and saves one answer', async ({ page }) => {
  const state = await comparisonBackend(page);
  const pair: ComparisonPair = { id: '00000000-0000-4000-8000-000000000040', mode: 'whole_conversation', conversation_a_id: ids.doc, conversation_b_id: state.docB, questions, created_at: new Date().toISOString() };
  state.pairs.push(pair);
  state.assignments.push({ id: '00000000-0000-4000-8000-000000000030', pair_id: pair.id, mode: pair.mode, conversation_a_id: ids.doc, conversation_b_id: state.docB, annotator_id: ids.alice, questions, answers: [], status: 'not_started', revision: 0, submitted_at: null, updated_at: new Date().toISOString() });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Compare' }).getByRole('link', { name: /Open$/ }).click();
  await expect(page.locator('.comparison-whole')).toHaveCount(1);
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  await expect(page.getByText('Question 1 of 7', { exact: false })).toBeVisible();
  const sideB = page.getByRole('region', { name: 'Conversation B transcript', exact: true });
  await expect(sideB).toContainText('Alternative first response.');
  await expect(sideB).toContainText('Alternative second response.');
  await page.getByRole('button', { name: 'Choose conversation A', exact: true }).click();
  await expect(page.getByText('Question 2 of 7', { exact: false })).toBeVisible();
  await expect(sideB).toContainText('Alternative second response.');
  await page.reload();
  await expect(page.getByText('Question 2 of 7', { exact: false })).toBeVisible();
  for (let question = 2; question <= 7; question++) {
    if (question === 3) await expect(page.getByRole('heading', { name: 'Which conversation explains the topic clearly without leaving important gaps or adding unnecessary detail?' })).toBeVisible();
    if (question === 4) await expect(page.getByRole('heading', { name: 'Which of the two conversations gives the learner more opportunities to demonstrate understanding?' })).toBeVisible();
    await page.getByRole('button', { name: 'Tie / equally good', exact: true }).click();
  }
  const save = page.getByRole('button', { name: 'Save whole-conversation comparison', exact: true });
  await expect(save).toBeEnabled();
  state.comparisonState.failSave = true;
  await save.click();
  await expect(page.getByRole('alert')).toContainText('Network unavailable');
  state.comparisonState.failSave = false;
  await save.click();
  await expect(page.getByText('Comparison complete.', { exact: false })).toBeVisible();
  expect(state.assignments[0].answers).toHaveLength(0);
  expect(Object.keys(state.assignments[0].overall_answer!.values)).toHaveLength(7);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Saved comparison' })).toBeVisible();
  await expect(page.locator('.comparison-round')).toHaveCount(1);
});

test('translated comparison shows English inside the original captured layout for the current round', async ({ page }) => {
  const state = await comparisonBackend(page); state.seed();
  const source = '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd';
  const english = 'Hello in English';
  const original = state.documents[0] as any;
  const translated = state.documents.find(document => document.id === state.docB)! as any;
  original.transcript = { ...original.transcript, conversation_id: ids.doc, archive_source: { version: 'test' }, messages: [
    { turn_id: 's0', speaker: 'student', text: 'Initial You prompt' },
    { turn_id: 't1', speaker: 'tutor', text: source },
    { turn_id: 's1', speaker: 'student', text: 'Student question' },
    { turn_id: 't2', speaker: 'tutor', text: 'Second captured turn' },
  ] };
  translated.transcript = { ...translated.transcript, conversation_id: state.docB, source_conversation_id: ids.doc, messages: [
    { turn_id: 's0', speaker: 'student', text: 'Initial You prompt' },
    { turn_id: 't1', speaker: 'tutor', text: english },
    { turn_id: 's1', speaker: 'student', text: 'Student question' },
    { turn_id: 't2', speaker: 'tutor', text: 'Second captured turn' },
  ], translation: { version: 'capture-english/1', sha256: 'test', source_messages: original.transcript.messages, alignment: [
    { segment_id: 't1:s0001', turn_id: 't1', kind: 'heading', source_start: 0, source_end: source.length, start: 0, end: english.length },
  ] } };
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>.capture-message{border:2px solid purple;padding:8px}</style></head><body><article class="capture-message" data-turn-id="s0"><strong>You</strong><p>Initial You prompt</p></article><article class="capture-message" data-turn-id="t1"><strong>Bot</strong><h2>${source}</h2><img alt="Captured diagram" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="></article><article class="capture-message" data-turn-id="s1"><p>Student question</p></article><article class="capture-message" data-turn-id="t2"><p>Second captured turn</p></article></body></html>`;
  state.captureDocuments.push({ conversation_id: ids.doc, html }, { conversation_id: state.docB, html });
  await login(page, 'alice');
  await page.getByRole('region', { name: 'Compare' }).getByRole('link', { name: /Open$/ }).click();
  const originalFrame = page.frameLocator('.comparison-transcript iframe').nth(0);
  const translatedFrame = page.frameLocator('.comparison-transcript iframe').nth(1);
  await expect(originalFrame.locator('h2')).toHaveText(source);
  await expect(originalFrame.getByText('Initial You prompt')).toBeVisible();
  await expect(translatedFrame.locator('h2')).toHaveText(english);
  await expect(translatedFrame.getByText('Initial You prompt')).toBeVisible();
  await expect(translatedFrame.locator('[data-turn-id="s0"] [data-portal-user-bubble]')).toHaveCSS('background-color', 'rgb(36, 89, 184)');
  await expect(translatedFrame.locator('[data-turn-id="t1"]')).toHaveCSS('border-top-color', 'rgb(128, 0, 128)');
  await expect(translatedFrame.getByAltText('Captured diagram')).toBeVisible();
  await expect(translatedFrame.locator('[data-turn-id="t2"]')).toBeHidden();
  await translatedFrame.locator('h2').click();
  await expect(page.locator('.comparison-transcript').nth(1).locator('.comparison-selection-feedback')).toBeVisible();
  await expect(page.getByText('Question 2 of 5', { exact: false })).toBeVisible();
});

test('questions advance through card choices, recover drafts, and unlock turns only after saving', async ({ page }) => {
  const state = await comparisonBackend(page); state.seed(); await login(page, 'alice');
  await page.getByRole('region', { name: 'Compare' }).getByRole('link', { name: /Open$/ }).click();
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  await expect(page.getByText('Student response', { exact: true })).toHaveCount(0);
  await expect(page.locator('.comparison-question')).toHaveCount(1);
  await expect(page.getByText('Question 1 of 5', { exact: false })).toBeVisible();
  await expect(page.getByText('Which of the two responses better explains the underlying concept or principle, rather than only presenting facts or steps?', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Does the tutor recap the key points of each newly explained concept?', { exact: true })).toHaveCount(0);
  const save = page.getByRole('button', { name: 'Save comparison', exact: false }); await expect(save).toHaveCount(0);
  const cardA = page.getByRole('button', { name: 'Choose conversation A', exact: true });
  const cardB = page.getByRole('button', { name: 'Choose conversation B', exact: true });
  const boxA = await cardA.boundingBox(), boxB = await cardB.boundingBox(), prompt = await page.locator('.comparison-question').boundingBox();
  expect(boxA!.height).toBe(boxB!.height); expect(boxA!.width).toBe(boxB!.width); expect(prompt!.y + prompt!.height).toBeLessThan(boxA!.y);
  const transcriptB = page.getByRole('region', { name: 'Conversation B transcript', exact: true });
  expect(await transcriptB.evaluate(node => node.scrollHeight > node.clientHeight)).toBe(true);
  await transcriptB.evaluate(node => { node.scrollTop = 160; });
  expect(await page.getByRole('region', { name: 'Conversation A transcript', exact: true }).evaluate(node => node.scrollTop)).toBe(0);
  expect(await transcriptB.evaluate(node => node.scrollTop)).toBeGreaterThan(0);
  await cardA.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('.comparison-transcript').first().locator('.comparison-selection-feedback')).toBeVisible();
  await expect(page.getByText('Question 2 of 5', { exact: false })).toBeVisible();
  await expect(page.locator('.comparison-selection-feedback')).toHaveCount(0);
  await expect(page.locator('.comparison-question')).toHaveCSS('animation-name', 'comparison-question-update');
  await page.reload(); await expect(page.getByText('Question 2 of 5', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Previous question', exact: true }).click();
  await expect(cardA).toHaveAttribute('aria-pressed', 'true');
  await cardA.click();
  await cardB.click(); await expect(page.getByText('Question 3 of 5', { exact: false })).toBeVisible();
  for (let question = 3; question <= 5; question++) {
    await expect(page.getByText(`Question ${question} of 5`, { exact: false })).toBeVisible();
    await page.getByRole('button', { name: question === 4 ? 'Choose conversation B' : 'Tie / equally good', exact: true }).click();
  }
  await expect(page.getByRole('heading', { name: 'All questions answered', exact: true })).toBeVisible();
  const review = page.getByRole('heading', { name: 'Review your choices', exact: true });
  await expect(review).toBeFocused();
  await expect(review).toBeInViewport();
  await expect(save).toBeEnabled();
  const changeLoad = page.getByRole('button', { name: 'Change answer for Opportunity to Demonstrate Understanding', exact: true });
  await changeLoad.click(); await expect(cardB).toHaveAttribute('aria-pressed', 'true');
  for (let question = 4; question <= 5; question++) await page.getByRole('button', { name: 'Tie / equally good', exact: true }).click();
  state.comparisonState.failSave = true; await save.click(); await expect(page.getByRole('alert')).toContainText('Network unavailable');
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  state.comparisonState.failSave = false; await save.click();
  await expect(page.locator('.comparison-round')).toHaveCount(2);
  await expect(page.getByText('You', { exact: true })).toHaveCount(2);
  await expect(page.getByText('Alternative student reply.', { exact: true })).toBeVisible();
  const turn2 = page.locator('.comparison-round').nth(1); await expect(turn2.locator('.comparison-question')).toHaveCount(1);
  await expect(turn2.getByText('Question 1 of 6', { exact: false })).toBeVisible();
  await page.reload(); await expect(page.locator('.comparison-round')).toHaveCount(2);
  for (let question = 1; question <= 6; question++) {
    await expect(turn2.getByText(`Question ${question} of 6`, { exact: false })).toBeVisible();
    if (question === 1) await expect(turn2.getByRole('heading', { name: "Which of the two responses better addresses the student's follow-up?", exact: true })).toBeVisible();
    await turn2.getByRole('button', { name: 'Choose conversation B', exact: true }).click();
  }
  await expect(page.getByRole('heading', { name: 'Overall conversation', exact: true })).toHaveCount(0);
  await save.click();
  const overall = page.getByRole('form', { name: 'Overall conversation', exact: true });
  await expect(overall.getByRole('heading', { name: 'Overall conversation', exact: true })).toBeFocused();
  expect(state.assignments[0].status).toBe('in_progress');
  const finish = overall.getByRole('button', { name: 'Save overall comparison and finish', exact: true });
  await expect(finish).toBeDisabled();
  await expect(overall.getByText('Which of the two conversations felt more natural and conversational?')).toHaveCount(0);
  await page.reload();
  await overall.getByRole('group', { name: 'Which of the two conversations overall addressed the learning goal better?' }).getByRole('radio', { name: 'Tie / equally good', exact: true }).check();
  state.comparisonState.failSave = true; await finish.click();
  await expect(page.getByRole('alert')).toContainText('Network unavailable');
  expect(state.assignments[0].status).toBe('in_progress');
  state.comparisonState.failSave = false; await finish.click();
  await expect(page.getByText('Comparison complete.', { exact: false })).toBeVisible();
  expect(state.assignments[0].overall_answer?.values).toEqual({ overall_learning_goal: 'tie' });
  await expect(overall.getByRole('radio').first()).toBeDisabled();
  expect(state.assignments[0].answers).toHaveLength(2); await expect(save).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const mobileCards = page.locator('.comparison-round').last().locator('.comparison-transcript');
  expect((await mobileCards.nth(0).boundingBox())!.height).toBe((await mobileCards.nth(1).boundingBox())!.height);
});


test('admin confirms a reset, preserves work on cancel or failure, and restarts with current questions', async ({ page }) => {
  const state = await comparisonBackend(page); state.seed();
  const row = state.assignments[0];
  row.questions = JSON.parse(fs.readFileSync('src/generated/rating-questions.json', 'utf8'));
  row.answers = [{ values: { concept_summarization: 'a' }, notes: 'Original first response' }, { values: { concept_summarization: 'b' }, notes: 'Original second response' }];
  row.status = 'submitted'; row.revision = 2;
  await login(page, 'admin');
  await page.getByRole('link', { name: 'Comparisons', exact: true }).click();
  await page.locator('.comparison-pair-item').getByRole('link', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Reset responses', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Reset comparison responses?' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Cancel', exact: true })).toBeFocused();
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(dialog).toHaveCount(0); expect(row.answers).toHaveLength(2);
  await page.getByRole('button', { name: 'Reset responses', exact: true }).click();
  state.comparisonState.failSave = true;
  await dialog.getByRole('button', { name: 'Reset responses', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText('Reset unavailable');
  expect(row.answers).toHaveLength(2); expect(row.revision).toBe(2);
  state.comparisonState.failSave = false;
  await dialog.getByRole('button', { name: 'Reset responses', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  await expect(page.getByText('Question 1 of 5', { exact: false })).toBeVisible();
  expect(row.status).toBe('not_started'); expect(row.answers).toEqual([]); expect(row.questions).toHaveLength(7); expect(row.revision).toBe(3);
  await page.reload(); await expect(page.getByText('Question 1 of 5', { exact: false })).toBeVisible();
});
