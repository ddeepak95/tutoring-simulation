import { expect, test } from '@playwright/test';
import fs from 'node:fs/promises';
import { backend, login } from './mock';

test('admin lists HTML receipts without loading bodies and downloads the original archive as inert JSON', async ({ page }) => {
  await backend(page);
  const archive = { id: '00000000-0000-4000-8000-000000000055', imported_by: '00000000-0000-4000-8000-000000000001', title: 'Captured page', topic: 'தமிழ் topic', language: 'Tamil', captured_at: '2026-10-16T12:00:00Z', source_url: 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0', html: '<html><script>throw new Error("must stay inert")</script><p>தமிழ் answer</p></html>', page_text: 'தமிழ் answer', capture_report: { history_verified: false } };
  const selections: string[] = [];
  await page.route('https://portal-test.supabase.co/rest/v1/chatgpt_html_archives?*', route => {
    const url = new URL(route.request().url()); selections.push(url.searchParams.get('select') || '');
    const { html, page_text, ...receipt } = archive;
    return route.fulfill({ contentType: 'application/json', body: JSON.stringify(url.searchParams.has('id') ? archive : [receipt]) });
  });
  await login(page, 'admin');
  const section = page.getByRole('region', { name: 'HTML archives' });
  await expect(section).toContainText('Captured page'); await expect(section).toContainText('தமிழ் topic');
  expect(selections).toEqual(['id,title,topic,language,captured_at,source_url']);
  await expect(section.locator('script')).toHaveCount(0);
  const downloadEvent = page.waitForEvent('download');
  await section.getByRole('button', { name: 'Download archive' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe(`chatgpt-html-${archive.id}.json`);
  const payload = JSON.parse(await fs.readFile((await download.path())!, 'utf8'));
  expect(payload.archive.html).toBe(archive.html); expect(payload.archive.page_text).toBe(archive.page_text);
  expect(selections).toEqual(['id,title,topic,language,captured_at,source_url', '*']);
  await section.getByRole('button', { name: 'Open viewer', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Saved conversation viewer' }); await expect(dialog).toBeVisible();
  await expect(dialog.locator('iframe')).toHaveAttribute('sandbox', '');
  await expect(dialog.frameLocator('iframe').locator('p')).toContainText('தமிழ் answer');
  await dialog.getByRole('button', { name: 'Close viewer', exact: true }).click(); await expect(dialog).not.toBeVisible();
});


test('admin confirms archive deletion, can cancel, and can retry a failed deletion', async ({ page }) => {
  await backend(page);
  const archive = { id: '00000000-0000-4000-8000-000000000055', title: 'Delete this capture', topic: 'Water', language: 'English', captured_at: '2026-10-16T12:00:00Z', source_url: 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0' };
  let removed = false; let attempts = 0;
  await page.route('https://portal-test.supabase.co/rest/v1/chatgpt_html_archives?*', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify(removed ? [] : [archive]) }));
  await page.route('https://portal-test.supabase.co/rest/v1/rpc/delete_chatgpt_html_archive', route => {
    expect(route.request().postDataJSON()).toEqual({ p_archive_id: archive.id });
    attempts++;
    if (attempts === 1) return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ message: 'Deletion failed; try again.' }) });
    removed = true;
    return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ archive_id: archive.id, deleted: true }) });
  });
  await login(page, 'admin');
  const section = page.getByRole('region', { name: 'HTML archives' });
  await section.getByRole('button', { name: 'Delete archive', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Delete HTML archive?' });
  await expect(dialog).toContainText('Delete this capture');
  await expect(dialog).toContainText('annotations, and ratings will be kept');
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  expect(attempts).toBe(0);
  await expect(section.getByRole('row').filter({ hasText: 'Delete this capture' })).toBeVisible();
  await section.getByRole('button', { name: 'Delete archive', exact: true }).click();
  await dialog.getByRole('button', { name: 'Delete permanently', exact: true }).click();
  await expect(dialog.getByRole('alert')).toHaveText('Deletion failed; try again.');
  await dialog.getByRole('button', { name: 'Delete permanently', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(section).toContainText('HTML archive deleted.');
  await expect(section).toContainText('No HTML archives saved yet.');
  expect(attempts).toBe(2);
});
