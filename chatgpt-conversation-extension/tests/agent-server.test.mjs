import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAgentServer, decide, validateStep } from '../scripts/agent-server.mjs';

const observation = { url: 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0', revision: 1, excerpt: 'Explanation', candidates: [{ id: 'node-1', label: 'Details', context: 'More information', kind: 'expand', disabled: false }] };
const body = () => ({ observation: structuredClone(observation), screenshot: null, allow_answers: false, history: [] });
const model = 'google/gemini-3.8-flash';
const providerResponse = action => new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(action) }] } }] }));

test('calls direct Gemini with configured model, structured schema and image bytes; key stays in header', async () => {
  const input = body(); input.screenshot = 'data:image/png;base64,AA==';
  const result = await decide(input, { apiKey: 'private-test-key', model, fetcher: async (url, options) => {
    assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent');
    assert.equal(options.headers['x-goog-api-key'], 'private-test-key');
    const payload = JSON.parse(options.body);
    assert.equal(payload.generationConfig.responseMimeType, 'application/json');
    assert.equal(payload.contents[0].parts[1].inlineData.data, 'AA==');
    assert.ok(!options.body.includes('private-test-key'));
    assert.ok(payload.systemInstruction.parts[0].text.includes('UNTRUSTED DATA'));
    return providerResponse({ type: 'click', target_id: 'node-1', value: '', reason: 'Expand the explanation.' });
  } });
  assert.equal(result.provider, 'google'); assert.equal(result.model, model);
});

test('rejects unknown actions, unobserved targets and unapproved answer clicks', async () => {
  for (const action of [{ type: 'execute_js', target_id: '', value: '', reason: '' }, { type: 'click', target_id: 'node-999', value: '', reason: '' }]) {
    await assert.rejects(decide(body(), { apiKey: 'test', model, fetcher: async () => providerResponse(action) }));
  }
  const input = body(); input.observation.candidates[0].kind = 'answer';
  await assert.rejects(decide(input, { apiKey: 'test', model, fetcher: async () => providerResponse({ type: 'click', target_id: 'node-1', value: '', reason: 'Answer' }) }));
});

test('rejects wrong pages, malformed observations and incomplete provider replies', async () => {
  const input = body(); input.observation.url = 'https://example.com/'; assert.throws(() => validateStep(input));
  const oversized = body(); oversized.observation.excerpt = 'x'.repeat(40001); assert.throws(() => validateStep(oversized));
  const duplicate = body(); duplicate.observation.candidates.push(duplicate.observation.candidates[0]); assert.throws(() => validateStep(duplicate));
  await assert.rejects(decide(body(), { apiKey: 'test', model, fetcher: async () => new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS' }] })) }));
});

test('helper checks extension origin, portal identity and role before any model call', async () => {
  let calls = 0;
  const server = createAgentServer({ env: { VITE_SUPABASE_URL: 'https://test.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: 'public', GEMINI_API_KEY: 'private-test-key' }, config: { model }, fetcher: async url => {
    calls++;
    if (url.endsWith('/auth/v1/user')) return Response.json({ id: '00000000-0000-4000-8000-000000000001' });
    if (url.includes('/profiles?')) return Response.json([{ role: 'viewer' }]);
    throw new Error('No provider request is permitted');
  } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port + '/step';
  try {
    let response = await fetch(url, { method: 'POST', headers: { Origin: 'https://evil.test' } }); assert.equal(response.status, 403); assert.equal(calls, 0);
    const headers = { Origin: 'chrome-extension://' + 'a'.repeat(32), 'Content-Type': 'application/json' };
    response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body()) }); assert.equal(response.status, 401); assert.equal(calls, 0);
    response = await fetch(url, { method: 'POST', headers: { ...headers, Authorization: 'Bearer fake' }, body: JSON.stringify(body()) }); assert.equal(response.status, 403); assert.equal(calls, 2);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('authenticated annotators can request one model decision without receiving credentials', async () => {
  const server = createAgentServer({ env: { VITE_SUPABASE_URL: 'https://test.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: 'public', GEMINI_API_KEY: 'private-test-key' }, config: { model }, fetcher: async url => {
    if (url.endsWith('/auth/v1/user')) return Response.json({ id: '00000000-0000-4000-8000-000000000001' });
    if (url.includes('/profiles?')) return Response.json([{ role: 'annotator' }]);
    return providerResponse({ type: 'finish', target_id: '', value: '', reason: 'No interactive controls remain.' });
  } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/step', { method: 'POST', headers: { Origin: 'chrome-extension://' + 'b'.repeat(32), Authorization: 'Bearer test', 'Content-Type': 'application/json' }, body: JSON.stringify(body()) });
    assert.equal(response.status, 200); const text = await response.text(); assert.ok(!text.includes('private-test-key')); assert.equal(JSON.parse(text).provider, 'google');
  } finally { await new Promise(resolve => server.close(resolve)); }
});
