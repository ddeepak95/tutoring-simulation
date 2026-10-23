import { expect, test } from '@playwright/test';
import { backend, ids, login } from './mock';

test('comparison results separate modes, normalize pair order, and exclude unfinished work', async ({ page }) => {
  const state = await backend(page);
  const doc = (id: string, topicId: string, topicName: string, provider: string) => ({
    ...structuredClone(state.documents[0]), id, label: `${topicName} ${provider}`, language: 'en', topic_id: topicId,
    generic_topic_name: topicName, conversation_title: `${topicName} ${provider}`,
    transcript: { ...structuredClone(state.documents[0].transcript), topic_id: topicId, original_language: 'en', provider },
  });
  const english = doc(ids.doc, 'evaporation', 'Evaporation', 'ChatGPT');
  const api = doc('00000000-0000-4000-8000-000000000080', 'evaporation', 'Evaporation', 'gpt-6.1-sol');
  const newtonEnglish = doc('00000000-0000-4000-8000-000000000081', 'newton', 'Newton', 'ChatGPT');
  const newtonApi = doc('00000000-0000-4000-8000-000000000082', 'newton', 'Newton', 'gpt-6.1-sol');
  state.documents.splice(0, 1, english as any, api as any, newtonEnglish as any, newtonApi as any);
  const questions = [
    { key: 'clarity', label: 'Clarity', description: 'Which explains more clearly?', scope: 'turn' },
    { key: 'overall_learning_goal', label: 'Overall learning goal', description: 'Which is better overall?', scope: 'overall' },
  ];
  const turn1 = '00000000-0000-4000-8000-000000000083';
  const turn2 = '00000000-0000-4000-8000-000000000084';
  const whole = '00000000-0000-4000-8000-000000000085';
  state.comparisonPairs.push(
    { id: turn1, mode: 'turn_wise', conversation_a_id: english.id, conversation_b_id: api.id, questions },
    { id: turn2, mode: 'turn_wise', conversation_a_id: newtonApi.id, conversation_b_id: newtonEnglish.id, questions },
    { id: whole, mode: 'whole_conversation', conversation_a_id: english.id, conversation_b_id: api.id, questions },
  );
  const assignment = (id: string, pairId: string, mode: string, a: string, b: string, status: string, answers: any[], overall: any) => ({
    id, pair_id: pairId, mode, conversation_a_id: a, conversation_b_id: b, annotator_id: ids.alice,
    questions, answers, overall_answer: overall, status, revision: 1, updated_at: new Date().toISOString(), submitted_at: status === 'submitted' ? new Date().toISOString() : null, is_active: true,
  });
  state.comparisonAssignments.push(
    assignment('00000000-0000-4000-8000-000000000086', turn1, 'turn_wise', english.id, api.id, 'submitted', [{ values: { clarity: 'a' } }, { values: { clarity: 'tie' } }], { values: { overall_learning_goal: 'b' } }),
    assignment('00000000-0000-4000-8000-000000000087', turn1, 'turn_wise', english.id, api.id, 'in_progress', [{ values: { clarity: 'b' } }], null),
    assignment('00000000-0000-4000-8000-000000000088', turn2, 'turn_wise', newtonApi.id, newtonEnglish.id, 'submitted', [{ values: { clarity: 'b' } }, { values: { clarity: 'b' } }], { values: { overall_learning_goal: 'a' } }),
    assignment('00000000-0000-4000-8000-000000000089', whole, 'whole_conversation', english.id, api.id, 'submitted', [], { values: { clarity: 'b', overall_learning_goal: 'tie' } }),
  );
  await login(page, 'admin');
  await page.getByRole('link', { name: 'Compare English and Tamil labels' }).click();
  await page.getByRole('tab', { name: 'Comparisons' }).click();
  await expect(page).toHaveURL(/\/topics\/labels\?view=comparisons$/);
  await expect(page.getByRole('heading', { name: 'Comparison results', level: 1 })).toBeVisible();
  await expect(page.getByText('No English-versus-Tamil-origin Compare pairs exist yet.', { exact: false })).toBeVisible();
  const summaries = page.locator('.comparison-summary-card');
  await expect(summaries).toHaveCount(2);
  const turn = summaries.filter({ has: page.getByRole('heading', { name: 'Turn wise' }) });
  await expect(turn).toContainText('2/2 topics with results');
  await expect(turn.getByRole('img', { name: /Clarity: ChatGPT · original English 75%, gpt-6.1-sol · original English 0%, Tie 25%/ })).toBeVisible();
  const wholeSummary = summaries.filter({ has: page.getByRole('heading', { name: 'Whole conversation' }) });
  await expect(wholeSummary.getByRole('img', { name: /Clarity: ChatGPT · original English 0%, gpt-6.1-sol · original English 100%, Tie 0%/ })).toBeVisible();
  const evaporation = page.locator('.comparison-topic-results').first();
  await evaporation.locator('summary').click();
  await expect(evaporation).toContainText('1/2 submitted');
  await expect(evaporation).toContainText('1 / 0 / 1 · 2 answers');
  await page.getByRole('tab', { name: 'Labels' }).click();
  await expect(page.getByRole('heading', { name: 'No matching conversations' })).toBeVisible();
});
