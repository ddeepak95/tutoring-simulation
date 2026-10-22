import { expect, test } from '@playwright/test';
import { backend, ids, login } from './mock';

test('conversation view shows Bot for saved ChatGPT HTML', async ({ page }) => {
  const state = await backend(page);
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.captureDocuments.push({ conversation_id: ids.doc, html: '<!doctype html><main><article class="capture-message capture-user" data-turn-id="s1"><strong class="capture-speaker">You</strong><p>ChatGPT said:</p></article><article class="capture-message capture-assistant" data-turn-id="t1"><strong class="capture-speaker">ChatGPT</strong><p>ChatGPT can explain this.</p></article><article class="capture-message capture-assistant" data-turn-id="t2"><strong class="capture-speaker">ChatGPT</strong><p>Another answer.</p></article></main>' });
  await login(page, 'admin');
  await page.goto(`/conversations/${ids.doc}`);
  const frame = page.frameLocator('.exact-capture iframe');
  await expect(frame.locator('.capture-assistant .capture-speaker')).toHaveText(['Bot', 'Bot']);
  await expect(frame.locator('.capture-user .capture-speaker')).toHaveText('You');
  await expect(frame.locator('.capture-user p')).toHaveText('ChatGPT said:');
  await expect(frame.locator('.capture-assistant p').first()).toHaveText('ChatGPT can explain this.');
  const bubble = frame.locator('.capture-user [data-portal-user-bubble]');
  await expect(bubble).toHaveCount(1);
  await expect(bubble).toHaveCSS('background-color', 'rgb(36, 89, 184)');
  await expect(bubble).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(frame.locator('.capture-user .capture-speaker')).not.toHaveCSS('background-color', 'rgb(36, 89, 184)');
});

test('captured ChatGPT bubble retains its content and adopts the transcript color', async ({ page }) => {
  const state = await backend(page);
  state.documents[0].transcript.conversation_id = ids.doc;
  state.documents[0].transcript.archive_source = 'capture';
  state.captureDocuments.push({ conversation_id: ids.doc, html: '<!doctype html><main><article class="capture-message capture-user" data-turn-id="s1"><h2 class="capture-speaker">You</h2><div data-user-message-bubble style="background:gray!important;color:black!important"><p style="color:black">A question?</p></div></article><article class="capture-message capture-assistant" data-turn-id="t1"><h2 class="capture-speaker">ChatGPT</h2><p>Answer.</p></article></main>' });
  await login(page, 'admin');
  await page.goto(`/conversations/${ids.doc}`);
  const frame = page.frameLocator('.exact-capture iframe');
  const bubble = frame.locator('[data-portal-user-bubble]');
  await expect(bubble).toHaveCount(1);
  await expect(bubble).toHaveCSS('background-color', 'rgb(36, 89, 184)');
  await expect(bubble).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(bubble.locator('p')).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(bubble).toHaveText('A question?');
  await expect(frame.locator('.capture-user .capture-speaker')).toHaveText('You');
  const labelBox = await frame.locator('.capture-user .capture-speaker').boundingBox();
  const bubbleBox = await bubble.boundingBox();
  expect(bubbleBox!.x).toBeGreaterThan(labelBox!.x);
});
