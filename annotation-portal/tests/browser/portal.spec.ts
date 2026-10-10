import { expect, test } from '@playwright/test';
import { backend, ids, login, rateAllTutorTurns, select, repositoryFixture, sample } from './mock';

test('synced repository conversations appear directly in the dashboard without an import step', async ({ page }) => {
  const state = await backend(page); const repository = repositoryFixture();
  for (const entry of repository.catalog.entries) {
    const input = JSON.parse(repository.files[entry.storage_path]);
    state.documents.push({ id: entry.source_conversation_id, label: entry.label, language: entry.language, created_at: new Date().toISOString(), source_path: entry.storage_path,
      transcript: { ...input, label: entry.label, original_language: entry.original_language, topic_english_name: 'Evaporation', repository_source: { version: entry.version, topic_id: entry.topic_id } } } as any);
  }
  await login(page, 'admin');
  await expect(page.locator('.conversation-table tbody tr')).toHaveCount(4);
  for (const entry of repository.catalog.entries) await expect(page.locator(`[data-conversation-id="${entry.source_conversation_id}"]`)).toContainText(entry.source_conversation_id);
  await page.getByRole('button', { name: 'Upload', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Upload conversations', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Import from repository' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Close upload' }).click();
  await page.locator(`[data-conversation-id="${state.documents[3].id}"]`).getByRole('button').click();
  await page.getByRole('dialog', { name: 'Assign annotators' }).getByLabel('alice', { exact: true }).check(); await page.getByRole('button', { name: 'Assign to selected annotators' }).click();
  await expect(page.getByText('Created 1 independent assignment.', { exact: true })).toBeVisible();
  expect(state.requests.some(path => path.includes('/repository/'))).toBe(false);
  await page.reload(); await expect(page.locator('.conversation-table tbody tr')).toHaveCount(4);
  await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Sign out' }).click(); await login(page, 'alice'); await expect(page.locator('.assignment-card')).toHaveCount(2);
});

test('admin creates and assigns an annotator with an 8-character password, who can log in independently', async ({ page }) => {
  const state = await backend(page); await login(page, 'admin');
  await expect(page.getByRole('heading', { name: 'Create annotator', exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: 'Settings', exact: true }).click();
  await expect(page).toHaveURL(/\/settings$/);
  const form = page.locator('form').filter({ has: page.getByRole('heading', { name: 'Create annotator', exact: true }) });
  await form.getByLabel('Annotator username', { exact: true }).fill('Carol');
  await form.getByLabel('Initial password', { exact: true }).fill('Seven12');
  await form.getByRole('button', { name: 'Create annotator', exact: true }).click(); expect(state.people).toHaveLength(3);
  expect(await form.getByLabel('Initial password', { exact: true }).evaluate(input => (input as HTMLInputElement).validity.tooShort)).toBe(true);
  await form.getByLabel('Initial password', { exact: true }).fill('Eight123');
  await form.getByRole('button', { name: 'Show initial password' }).click(); await expect(form.getByLabel('Initial password', { exact: true })).toHaveAttribute('type', 'text');
  state.failNextCreate = true; await form.getByRole('button', { name: 'Create annotator', exact: true }).click();
  await expect(form.getByRole('alert')).toContainText('not configured'); expect(state.people).toHaveLength(3);
  await form.getByRole('button', { name: 'Create annotator', exact: true }).click();
  await expect(form.getByRole('status')).toContainText('Annotator carol created');
  await expect(form.getByLabel('Initial password', { exact: true })).toHaveValue('');
  await expect(form.getByLabel('Initial password', { exact: true })).toHaveAttribute('type', 'password');
  await form.getByLabel('Annotator username', { exact: true }).fill('carol'); await form.getByLabel('Initial password', { exact: true }).fill('Other123');
  await form.getByRole('button', { name: 'Create annotator', exact: true }).click(); await expect(form.getByRole('alert')).toContainText('already exists'); expect(state.people).toHaveLength(4); expect(state.passwords.get('carol')).toBe('Eight123');
  await page.getByRole('link', { name: 'Conversations', exact: true }).click();
  await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click();
  await page.getByRole('dialog', { name: 'Assign annotators' }).getByLabel('carol', { exact: true }).check();
  await page.getByRole('button', { name: 'Assign to selected annotators' }).click();
  await expect(page.getByText('Created 1 independent assignment.', { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByLabel('Username', { exact: true }).fill('carol'); await page.getByLabel('Password', { exact: true }).fill('Eight123'); await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your assignments' })).toBeVisible(); await expect(page.getByRole('heading', { name: 'Create annotator' })).toHaveCount(0);
  await expect(page.locator('.assignment-card')).toHaveCount(1); await page.locator('.assignment-card').click(); await expect(page.locator('mark')).toHaveCount(0);
});
test('username login, persistent highlights, separate annotators and admin monitoring', async ({ page }) => {
  const state = await backend(page); await login(page, 'alice');
  await expect(page.getByRole('heading', { name: 'Your assignments' })).toBeVisible();
  await expect(page.locator('.assignment-card')).toHaveCount(1); await page.locator('.assignment-card').click();
  await expect(page.getByText('தமிழ் 😀 Water', { exact: false })).toBeVisible();
  await select(page, 't1', 'Wet clothes drying illustrates evaporation.');
  await page.getByRole('button', { name: 'Examples', exact: true }).click(); await expect(page.locator('mark')).toHaveCount(1);
  await expect(page.getByText('Detail level', { exact: true })).toBeVisible(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations[0]?.entry.detail_level).toBe('Brief'); await expect(page.getByText('Saved to cloud', { exact: true })).toBeVisible();
  await page.reload(); await expect(page.locator('mark')).toHaveCount(1); await page.locator('mark').click(); await page.getByRole('button', { name: 'Elaborated', exact: true }).click(); await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await expect.poll(() => state.assignments[0].annotations[0].entry.detail_level).toBe('Elaborated');
  await page.locator('mark').click(); await page.screenshot({ path: '.runtime/editor-preview.png', fullPage: true }); await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await select(page, 't1', 'Have you understood?'); await page.getByRole('button', { name: 'Questions', exact: true }).click(); await page.getByRole('button', { name: 'Instructional', exact: true }).click();
  await expect.poll(() => state.assignments[0].annotations.length).toBe(2);
  await rateAllTutorTurns(page);
  page.once('dialog', dialog => void dialog.accept()); await page.getByRole('button', { name: 'Complete Annotation', exact: true }).click(); await expect(page.getByRole('button', { name: 'Complete Annotation', exact: true })).toHaveCount(0); await expect.poll(() => state.assignments[0].status).toBe('submitted');
  await page.getByRole('button', { name: 'Sign out' }).click(); await login(page, 'bob'); await page.locator('.assignment-card').click(); await expect(page.locator('mark')).toHaveCount(0);
  await page.getByRole('button', { name: 'Sign out' }).click(); await login(page, 'admin'); await expect(page.getByRole('heading', { name: 'Conversations', exact: true })).toBeVisible();
  const aliceRow = page.locator('.progress').getByRole('row').filter({ hasText: 'alice' }); await expect(aliceRow).toContainText('Submitted'); await expect(aliceRow).toContainText('2');
  await page.screenshot({ path: '.runtime/admin-preview.png', fullPage: true });
  await aliceRow.getByRole('link', { name: 'View', exact: true }).click(); await expect(page.locator('mark')).toHaveCount(2); await expect(page.getByRole('button', { name: 'Complete Annotation' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Dashboard', exact: false }).click(); await aliceRow.getByRole('button', { name: 'Reopen', exact: true }).click(); await expect(aliceRow).toContainText('In progress');
});
test('all pop-up fields, overlapping highlights, deletion and responsive layout', async ({ page }) => {
  const state = await backend(page); await login(page, 'alice'); await page.locator('.assignment-card').click();
  const guide = page.getByRole('complementary', { name: 'Coding guide' });
  await expect(guide).toHaveCount(0);
  await page.getByRole('button', { name: 'Coding guide', exact: true }).click();
  await expect(guide).toBeVisible();
  await guide.getByLabel('Feature', { exact: true }).selectOption('examples');
  await expect(guide.getByRole('heading', { name: 'Examples', exact: true })).toBeVisible();
  const panel = await guide.boundingBox(), document = await page.locator('.document').boundingBox();
  expect(panel!.x).toBeGreaterThanOrEqual(document!.x + document!.width);
  await page.screenshot({ path: '.runtime/coding-guide-preview.png', fullPage: true });
  await guide.getByRole('button', { name: 'Close coding guide' }).click();
  await expect(guide).toHaveCount(0);
  await page.getByRole('button', { name: 'Coding guide', exact: true }).click();
  await expect(guide).toBeVisible();
  for (const [quote, feature, value] of [
    ['Water changes from liquid into vapour.', 'Concepts and Subtopics Covered', 'Explained'],
    ['people leaving a crowded room', 'Analogies', 'Brief'],
    ['A table can compare the drying times.', 'Representations', 'Table'],
    ['Pongal cooking', 'Cultural References', 'Explained'],
    ['What is evaporation?', 'Questions', 'Knowledge-checking']
  ]) {
    await select(page, quote.includes('people') || quote.startsWith('A table') || quote.includes('Pongal') ? 't2' : 't1', quote);
    await page.getByRole('button', { name: feature, exact: true }).click(); await page.getByRole('button', { name: value, exact: true }).click();
  }
  await expect(page.locator('mark')).toHaveCount(5); await expect.poll(() => state.assignments[0].annotations.length).toBe(5);
  await select(page, 't2', 'Pongal cooking'); await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Elaborated', exact: true }).click();
  await page.locator('mark').filter({ hasText: 'Pongal cooking' }).click(); await expect(page.getByText('Choose a highlight to edit')).toBeVisible(); await page.getByRole('button', { name: 'Examples', exact: false }).last().click(); await page.getByRole('button', { name: 'Delete highlight', exact: true }).click(); await expect(page.getByText('Highlight deleted.')).toBeVisible(); await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(guide).toHaveCount(0);
  await page.getByRole('button', { name: 'Coding guide', exact: true }).click(); await expect(guide).toBeVisible();
  await guide.getByRole('button', { name: 'Close coding guide' }).click();
  await expect(page.locator('.annotation-panel')).toHaveCount(0);
});
test('failed saves remain recoverable, retry succeeds, and stale drafts never overwrite cloud data', async ({ page }) => {
  const state = await backend(page); await login(page, 'alice'); await page.locator('.assignment-card').click();
  state.failNextSave = true; await select(page, 't1', 'Wet clothes drying'); await page.getByRole('button', { name: 'Examples', exact: true }).click(); await page.getByRole('button', { name: 'Brief', exact: true }).click();
  await expect(page.getByText('Cloud save failed', { exact: true })).toBeVisible(); await expect(page.locator('mark')).toHaveCount(1); await page.getByRole('button', { name: 'Retry saving', exact: true }).click(); await expect.poll(() => state.assignments[0].annotations.length).toBe(1);
  state.assignments[0].revision++; await page.locator('mark').click(); await page.getByRole('button', { name: 'Explained', exact: true }).click(); await page.getByRole('button', { name: 'Close annotation popup' }).click();
  await expect(page.getByRole('alert')).toContainText('Revision conflict'); await expect.poll(() => state.assignments[0].annotations[0].entry.detail_level).toBe('Brief');
  await page.reload(); await expect(page.getByText('A local recovery draft is available.')).toBeVisible(); await expect(page.getByRole('button', { name: 'Restore draft', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Keep cloud version', exact: true }).click(); await page.locator('mark').click(); await expect(page.getByRole('button', { name: 'Brief', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
test('admin uploads an unchanged transcript and creates independent assignments', async ({ page }) => {
  const state = await backend(page); await login(page, 'admin'); await page.getByRole('button', { name: 'Upload', exact: true }).click();
  const raw = 'Tutor: தமிழ் 😀 Water boils at 100°C.\n\nStudent: Why?\n';
  await page.getByLabel('Choose transcript files', { exact: true }).setInputFiles({ name: 'chemistry.txt', mimeType: 'text/plain', buffer: Buffer.from(raw) });
  await expect(page.getByText('1 conversation uploaded.', { exact: true })).toBeVisible();
  expect(state.documents[1].transcript.messages[0].text).toBe('தமிழ் 😀 Water boils at 100°C.');
  await page.getByRole('button', { name: 'Close upload' }).click(); await page.locator(`[data-conversation-id="${state.documents[1].id}"]`).getByRole('button').click();
  const menu = page.getByRole('dialog', { name: 'Assign annotators' }); await menu.getByLabel('alice', { exact: true }).check(); await menu.getByLabel('bob', { exact: true }).check(); await page.getByRole('button', { name: 'Assign to selected annotators' }).click();
  await expect(page.getByText('Created 2 independent assignments.', { exact: true })).toBeVisible();
  expect(state.assignments.filter(a => a.conversation_id === state.documents[1].id)).toHaveLength(2);
});
