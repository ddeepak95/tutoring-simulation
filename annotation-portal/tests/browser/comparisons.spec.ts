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
      row.answers.push(body.p_answer); row.revision++; row.status = row.answers.length === 2 ? 'submitted' : 'in_progress';
      return send(row);
    }
    return route.fallback();
  });
  function seed() { assignments.push({ id: '00000000-0000-4000-8000-000000000030', conversation_a_id: ids.doc, conversation_b_id: docB, annotator_id: ids.alice, questions, answers: [], status: 'not_started', revision: 0, submitted_at: null, updated_at: new Date().toISOString() }); }
  return { assignments, comparisonState, docB, seed };
}

test('dashboard lists annotation and comparison assignments in separate sections', async ({ page }) => {
  const state = await comparisonBackend(page); state.seed();
  await login(page, 'alice');
  const annotate = page.getByRole('region', { name: 'Annotate', exact: true });
  const compare = page.getByRole('region', { name: 'Compare', exact: true });
  await expect(annotate.getByRole('heading', { name: 'Annotate', exact: true })).toBeVisible();
  await expect(annotate.locator('a[href^="/assignments/"]').first()).toBeVisible();
  await expect(compare.getByRole('heading', { name: 'Compare', exact: true })).toBeVisible();
  const comparison = compare.getByRole('link', { name: /Open$/ });
  await expect(comparison).toBeVisible();
  await expect(annotate.locator('a[href^="/comparisons/"]')).toHaveCount(0);
  await expect(compare.locator('a[href^="/assignments/"]')).toHaveCount(0);
  await expect(page.getByText('YOUR WORKSPACE', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Your assignments', exact: true })).toHaveCount(0);
  await expect(page.getByText('Pick a conversation to continue annotating.', { exact: true })).toHaveCount(0);
  await comparison.click();
  await expect(page.getByText('Question 1 of 9', { exact: false })).toBeVisible();
  await page.getByRole('link', { name: /Dashboard$/ }).click();
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
  expect(state.assignments[0].questions).toHaveLength(11);
  expect(state.assignments[0].questions.find(q => q.key === 'conversational_naturalness')?.description).toBe('Which of the two responses better involves the learner by speaking directly to them and inviting them to think about the explanation?');
  expect(state.assignments[0].questions.every(question => question.description.startsWith('Which of the two responses'))).toBe(true);
  await page.locator('.comparisons-page').getByRole('link', { name: /Open$/ }).click();
  await expect(page.getByRole('button', { name: 'Choose conversation A', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Tie / equally good', exact: true })).toBeDisabled();
});

test('questions advance through card choices, recover drafts, and unlock turns only after saving', async ({ page }) => {
  const state = await comparisonBackend(page); state.seed(); await login(page, 'alice');
  await page.getByRole('link', { name: 'Comparisons', exact: true }).click(); await page.locator('.comparisons-page').getByRole('link', { name: /Open$/ }).click();
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  await expect(page.getByText('Student response', { exact: true })).toHaveCount(0);
  await expect(page.locator('.comparison-question')).toHaveCount(1);
  await expect(page.getByText('Question 1 of 9', { exact: false })).toBeVisible();
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
  await expect(page.getByText('Question 2 of 9', { exact: false })).toBeVisible();
  await expect(page.locator('.comparison-selection-feedback')).toHaveCount(0);
  await expect(page.locator('.comparison-question')).toHaveCSS('animation-name', 'comparison-question-update');
  await page.reload(); await expect(page.getByText('Question 2 of 9', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Previous question', exact: true }).click();
  await expect(cardA).toHaveAttribute('aria-pressed', 'true');
  await cardA.click();
  await cardB.click(); await expect(page.getByText('Question 3 of 9', { exact: false })).toBeVisible();
  for (let question = 3; question <= 9; question++) {
    await expect(page.getByText(`Question ${question} of 9`, { exact: false })).toBeVisible();
    await page.getByRole('button', { name: question === 6 ? 'Choose conversation B' : 'Tie / equally good', exact: true }).click();
  }
  await expect(page.getByRole('heading', { name: 'All questions answered', exact: true })).toBeVisible();
  const review = page.getByRole('heading', { name: 'Review your choices', exact: true });
  await expect(review).toBeFocused();
  await expect(review).toBeInViewport();
  await expect(save).toBeEnabled();
  const changeLoad = page.getByRole('button', { name: 'Change answer for Focus and Amount of Information', exact: true });
  await changeLoad.click(); await expect(cardB).toHaveAttribute('aria-pressed', 'true');
  for (let question = 6; question <= 9; question++) await page.getByRole('button', { name: 'Tie / equally good', exact: true }).click();
  state.comparisonState.failSave = true; await save.click(); await expect(page.getByRole('alert')).toContainText('Network unavailable');
  await expect(page.locator('.comparison-round')).toHaveCount(1);
  state.comparisonState.failSave = false; await save.click();
  await expect(page.locator('.comparison-round')).toHaveCount(2);
  await expect(page.getByText('Student response', { exact: true })).toHaveCount(2);
  await expect(page.getByText('Alternative student reply.', { exact: true })).toBeVisible();
  const turn2 = page.locator('.comparison-round').nth(1); await expect(turn2.locator('.comparison-question')).toHaveCount(1);
  await expect(turn2.getByText('Question 1 of 11', { exact: false })).toBeVisible();
  await page.reload(); await expect(page.locator('.comparison-round')).toHaveCount(2);
  for (let question = 1; question <= 11; question++) {
    await expect(turn2.getByText(`Question ${question} of 11`, { exact: false })).toBeVisible();
    if (question === 10) await expect(turn2.getByRole('heading', { name: 'Which of the two responses connects its explanation more clearly to the ideas and examples established in earlier turns?', exact: true })).toBeVisible();
    await turn2.getByRole('button', { name: 'Choose conversation B', exact: true }).click();
  }
  await save.click(); await expect(page.getByText('Comparison complete.', { exact: false })).toBeVisible();
  expect(state.assignments[0].answers).toHaveLength(2); await expect(save).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const mobileCards = page.locator('.comparison-round').last().locator('.comparison-transcript');
  expect((await mobileCards.nth(0).boundingBox())!.height).toBe((await mobileCards.nth(1).boundingBox())!.height);
});
