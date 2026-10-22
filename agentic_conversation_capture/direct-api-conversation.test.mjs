import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { generateConversation, requestFor, selectTopic, textFromResponse, uploadConversation } from './direct-api-conversation.mjs';

const jsonResponse = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });
const answerResponse = (number, text = `Answer ${number}`) => jsonResponse({ id: `resp_${number}`, status: 'completed', output: [{ type: 'message', role: 'assistant', content: [{ type: 'output_text', text }] }], usage: { input_tokens: number, output_tokens: number } });

test('uses exact topic prompts and complete visible history without higher-priority instructions', async () => {
  const selection = await selectTopic({ topicId: 'alkaline-earth-metals', language: 'en', modelId: 'gpt-6.1-sol' });
  assert.deepEqual(selection.prompts, [
    'teach me about alkaline earth metals',
    'do they have similar physical and chemical properties',
    'which ones change and why?',
  ]);
  const requests = [];
  const outputRoot = await mkdtemp(path.join(os.tmpdir(), 'direct-api-test-'));
  try {
    const { file, artifact } = await generateConversation(selection, {
      outputRoot,
      apiKey: 'test-key',
      fetcher: async (url, options) => {
        assert.equal(url, 'https://api.openai.com/v1/responses');
        requests.push(JSON.parse(options.body));
        return answerResponse(requests.length);
      },
    });
    assert.equal(artifact.status, 'completed');
    assert.deepEqual(artifact.conversation.messages.map(message => message.text), [selection.prompts[0], 'Answer 1', selection.prompts[1], 'Answer 2', selection.prompts[2], 'Answer 3']);
    assert.deepEqual(requests.map(request => request.input.map(message => message.role)), [['user'], ['user', 'assistant', 'user'], ['user', 'assistant', 'user', 'assistant', 'user']]);
    for (const [index, request] of requests.entries()) {
      assert.deepEqual(request, requestFor(artifact.conversation.messages.slice(0, index * 2 + 1), 'gpt-6.1-sol'));
      assert.deepEqual(Object.keys(request).sort(), ['input', 'max_output_tokens', 'model', 'store']);
      assert.equal(request.store, false);
    }
    assert.deepEqual(artifact.conversation.api_source.response_ids, ['resp_1', 'resp_2', 'resp_3']);
    assert.deepEqual((JSON.parse(await readFile(file, 'utf8'))).calls.map(call => call.usage.output_tokens), [1, 2, 3]);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test('rejects incomplete and empty assistant responses, saving a failed artifact', async () => {
  assert.throws(() => textFromResponse({ id: 'r', status: 'incomplete', output: [] }), /incomplete/);
  assert.throws(() => textFromResponse({ id: 'r', status: 'completed', output: [] }), /no assistant text/);
  const outputRoot = await mkdtemp(path.join(os.tmpdir(), 'direct-api-test-'));
  try {
    const selection = await selectTopic({ topicId: 'alkaline-earth-metals' });
    await assert.rejects(generateConversation(selection, { outputRoot, apiKey: 'test-key', fetcher: async () => answerResponse(1, '   ') }), /no assistant text/);
    const { readdir } = await import('node:fs/promises');
    const topicDir = path.join(outputRoot, selection.topicId, selection.language);
    const [run] = await readdir(topicDir);
    const artifact = JSON.parse(await readFile(path.join(topicDir, run, 'conversation.json'), 'utf8'));
    assert.equal(artifact.status, 'failed');
    assert.equal(artifact.conversation.messages.length, 1);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test('retries upload from saved conversation after insert failure without API calls', async () => {
  const selection = await selectTopic({ topicId: 'alkaline-earth-metals' });
  const outputRoot = await mkdtemp(path.join(os.tmpdir(), 'direct-api-test-'));
  try {
    let apiCalls = 0;
    const { file } = await generateConversation(selection, { outputRoot, apiKey: 'test-key', fetcher: async () => answerResponse(++apiCalls) });
    const artifact = JSON.parse(await readFile(file, 'utf8'));
    let storageBytes;
    let savedRow;
    let insertAttempts = 0;
    const fetcher = async (url, options = {}) => {
      const { pathname } = new URL(url);
      if (pathname === '/rest/v1/profiles') return jsonResponse([{ id: 'admin-id', username: 'admin' }]);
      if (pathname.startsWith('/storage/v1/object/transcripts/')) {
        if (options.method === 'POST') {
          if (storageBytes) return jsonResponse({ message: 'already exists' }, 409);
          storageBytes = options.body;
          return jsonResponse({ Key: pathname });
        }
        return new Response(storageBytes);
      }
      if (pathname === '/rest/v1/conversations' && options.method === 'POST') {
        insertAttempts++;
        if (insertAttempts === 1) return jsonResponse({ message: 'temporary error' }, 500);
        savedRow = JSON.parse(options.body);
        return new Response(null, { status: 201 });
      }
      if (pathname === '/rest/v1/conversation_details') return jsonResponse([{ ...savedRow, transcript: JSON.parse(JSON.stringify(savedRow.transcript)) }]);
      throw new Error(`Unexpected request: ${url}`);
    };
    const config = { fetcher, supabaseUrl: 'https://testproject.supabase.co', project: 'testproject', serviceRoleKey: 'test-key' };
    await assert.rejects(uploadConversation(artifact, config), /insert returned HTTP 500/);
    const result = await uploadConversation(JSON.parse(await readFile(file, 'utf8')), config);
    assert.equal(result.turn_count, 6);
    assert.equal(result.created, true);
    assert.equal(insertAttempts, 2);
    assert.equal(apiCalls, 3);
    assert.equal(JSON.parse(storageBytes).status, 'completed');
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});
