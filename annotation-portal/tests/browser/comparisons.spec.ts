import { expect, test, type Page } from '@playwright/test';
import { backend, ids, login, profiles, sample } from './mock';
import fs from 'node:fs';
import type { ComparisonAssignment } from '../../src/comparison';
const questions = JSON.parse(fs.readFileSync('src/generated/comparison-questions.json', 'utf8'));

async function comparisonBackend(page: Page) {
  const state = await backend(page);
  const docB = '00000000-0000-4000-8000-000000000020';
  state.documents.push({ ...structuredClone(state.documents[0]), id: docB, label: 'Alternative tutor', transcript: { ...structuredClone(sample), messages: [
    { turn_id: 'b1', speaker: 'tutor', text: 'Alternative first response.\n\n' + Array.from({ length: 60 }, (_, i) => `Explanation paragraph ${i + 1}.`).join('\n\n') },
    { turn_id: 'bs1', speaker: 'student', text: 'Alternative student reply.' },
    { turn_id: 'b2', speaker: 'tutor', text: 'Alternative second response.' },
  ] } });
  const assignments: ComparisonAssignment[] = [];
  const comparisonState = { failSave: false };
  await page.route('**/rest/v1/**', async route => {
    const url = new URL(route.request().url());
    const send = (value: unknown, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(value) });
    if (url.pathname === '/rest/v1/comparison_assignments') {
      const id = url.searchParams.get('id')?.slice(3);
      return send(id ? assignments.find(row => row.id === id) : assignments.map(row => ({ ...row, profiles: profiles.find(p => p.id === row.annotator_id) })));
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
    if (url.pathname === '/rest/v1/rpc/reset_comparison_assignment') {
      if (comparisonState.failSave) return send({ message: 'Reset unavailable. Try again.' }, 503);
      const body = route.request().postDataJSON(); const row = assignments[0];
      row.questions = body.p_questions; row.answers = []; row.overall_answer = null; row.status = 'not_started'; row.submitted_at = null; row.revision++;
      return send(row);
    }
    return route.fallback();
  });
  function seed() { assignments.push({ id: '00000000-0000-4000-8000-000000000030', conversation_a_id: ids.doc, conversation_b_id: docB, annotator_id: ids.alice, questions, answers: [], status: 'not_started', revision: 0, submitted_at: null, updated_at: new Date().toISOString() }); }
  return { assignments, comparisonState, docB, seed };
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

test('admin selects conversations and assigns a comparison', async ({ page }) => {
  const state = await comparisonBackend(page); await login(page, 'admin');
  await page.getByRole('link', { name: 'Comparisons', exact: true }).click();
  await page.getByLabel('Conversation A', { exact: true }).selectOption(ids.doc);
  await page.getByLabel('Conversation B', { exact: true }).selectOption(ids.doc);
  await expect(page.getByRole('button', { name: 'Assign comparison', exact: true })).toBeDisabled();
  await page.getByLabel('Conversation B', { exact: true }).selectOption(state.docB);
  await page.getByLabel('Annotator', { exact: true }).selectOption(ids.alice);
  await page.getByRole('button', { name: 'Assign comparison', exact: true }).click();
  await expect(page.getByText('Comparison assigned.', { exact: false })).toBeVisible();
  expect(state.assignments[0].annotator_id).toBe(ids.alice);
  expect(state.assignments[0].questions).toHaveLength(8);
  expect(state.assignments[0].questions.filter(question => question.scope === 'overall')).toHaveLength(2);
  await page.locator('.comparisons-page').getByRole('link', { name: /Open$/ }).click();
  await expect(page.getByRole('button', { name: 'Choose conversation A', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Tie / equally good', exact: true })).toBeDisabled();
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
  const changeLoad = page.getByRole('button', { name: 'Change answer for Focus and Amount of Information', exact: true });
  await changeLoad.click(); await expect(cardB).toHaveAttribute('aria-pressed', 'true');
  for (let question = 4; question <= 5; question++) await page.getByRole('button', { name: 'Tie / equally good', exact: true }).click();
  state.comparisonState.failSave = true; await save.click(); await expect(page.getByRole('alert')).toContainText('Network unavailable');
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  state.comparisonState.failSave = false; await save.click();
  await expect(page.locator('.comparison-round')).toHaveCount(2);
  await expect(page.getByText('Student response', { exact: true })).toHaveCount(2);
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
  await overall.getByRole('group', { name: 'Which of the two conversations felt more natural and conversational?' }).getByRole('radio', { name: 'A is better', exact: true }).check();
  await expect(finish).toBeDisabled();
  await page.reload();
  await expect(overall.getByRole('group', { name: 'Which of the two conversations felt more natural and conversational?' }).getByRole('radio', { name: 'A is better', exact: true })).toBeChecked();
  await overall.getByRole('group', { name: 'Which of the two conversations overall addressed the learning goal better?' }).getByRole('radio', { name: 'Tie / equally good', exact: true }).check();
  state.comparisonState.failSave = true; await finish.click();
  await expect(page.getByRole('alert')).toContainText('Network unavailable');
  expect(state.assignments[0].status).toBe('in_progress');
  state.comparisonState.failSave = false; await finish.click();
  await expect(page.getByText('Comparison complete.', { exact: false })).toBeVisible();
  expect(state.assignments[0].overall_answer?.values).toEqual({ overall_conversational_naturalness: 'a', overall_learning_goal: 'tie' });
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
  await page.locator('.comparisons-page').getByRole('link', { name: /Open$/ }).click();
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
  expect(row.status).toBe('not_started'); expect(row.answers).toEqual([]); expect(row.questions).toHaveLength(8); expect(row.revision).toBe(3);
  await page.reload(); await expect(page.getByText('Question 1 of 5', { exact: false })).toBeVisible();
});
