import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import { generateConversation, requestFor, selectTopic, textFromResponse, textFromChatResponse,textFromGoogleResponse,tutorSystemPrompt,uploadConversation } from './direct-api-conversation.mjs';

const jsonResponse = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });
const answerResponse = (number, text = `Answer ${number}`) => jsonResponse({ id: `resp_${number}`, status: 'completed', output: [{ type: 'message', role: 'assistant', content: [{ type: 'output_text', text }] }], usage: { input_tokens: number, output_tokens: number } });

test('selects the v2 topic file and preserves its exact source hash in generated provenance',async()=>{
 const topicsFile=path.join(import.meta.dirname,'topics_v2.json');
 const selection=await selectTopic({topicId:'free-body-diagrams-and-net-force',language:'ta',topicsFile});
 assert.equal(selection.prompts.length,3);assert.match(selection.prompts[0],/[\u0b80-\u0bff]/u);
 const outputRoot=await mkdtemp(path.join(os.tmpdir(),'v2-topic-test-'));
 try{
  const {artifact,file}=await generateConversation(selection,{outputRoot,apiKey:'test',fetcher:async()=>answerResponse(1)});
  assert.equal(artifact.conversation.api_source.prompts_source,'agentic_conversation_capture/topics_v2.json');
  assert.equal(artifact.conversation.api_source.topics_sha256,createHash('sha256').update(await readFile(topicsFile,'utf8')).digest('hex'));
  await assert.rejects(generateConversation({...selection,topicsSha256:'different'},{apiKey:'test',resumeFile:file}),/topic source differs/);
 }finally{await rm(outputRoot,{recursive:true,force:true});}
});

test('calls Gemini directly with systemInstruction, full visible history and native provenance',async()=>{
 const selection=await selectTopic({topicId:'heart',language:'ta',modelId:'google/gemini-3.8-flash'});
 assert.equal(selection.apiProvider,'google');assert.equal(selection.apiModel,'gemini-3.8-flash');
 const outputRoot=await mkdtemp(path.join(os.tmpdir(),'direct-google-test-'));let calls=0;
 try{
  const {artifact}=await generateConversation(selection,{outputRoot,apiKey:'test-google-key',fetcher:async(url,init)=>{
   assert.equal(url,'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent');
   assert.equal(init.headers['x-goog-api-key'],'test-google-key');assert.equal(init.headers.Authorization,undefined);
   const request=JSON.parse(init.body);assert.equal(request.systemInstruction.parts[0].text,tutorSystemPrompt);
   assert.equal(request.contents.length,++calls*2-1);assert.equal(request.generationConfig.maxOutputTokens,16384);
   return jsonResponse({responseId:`google-${calls}`,modelVersion:'gemini-3.8-flash',candidates:[{content:{role:'model',parts:[{text:'hidden reasoning',thought:true},{text:`Answer ${calls}`}]},finishReason:'STOP'}],usageMetadata:{totalTokenCount:calls}});
  }});
  assert.equal(calls,3);assert.equal(artifact.conversation.api_source.api_provider,'google');
  assert.deepEqual(artifact.conversation.api_source.response_ids,['google-1','google-2','google-3']);
  assert.ok(artifact.conversation.messages.filter(m=>m.speaker==='tutor').every(m=>!m.text.includes('hidden reasoning')));
  for(const [i,call] of artifact.calls.entries()){assert.deepEqual(call.request,requestFor(artifact.conversation.messages.slice(0,i*2+1),selection.modelId,'google'));assert.equal(call.native_model,'gemini-3.8-flash');assert.equal(call.usage.totalTokenCount,i+1);}
 }finally{await rm(outputRoot,{recursive:true,force:true});}
});

test('rejects blocked, truncated and provenance-free Google responses',()=>{
 const good={responseId:'id',modelVersion:'gemini-3.8-flash',candidates:[{content:{role:'model',parts:[{text:'Answer'}]},finishReason:'STOP'}]};
 assert.equal(textFromGoogleResponse(good),'Answer');
 for(const bad of [{...good,promptFeedback:{blockReason:'SAFETY'}},{...good,responseId:null},{...good,modelVersion:null},{...good,candidates:[{...good.candidates[0],finishReason:'MAX_TOKENS'}]},{...good,candidates:[{...good.candidates[0],content:{role:'model',parts:[{text:'thought only',thought:true}]}}]}])assert.throws(()=>textFromGoogleResponse(bad));
});

test('resumes a failed conversation without repeating completed tutor requests or student turns',async()=>{
 const outputRoot=await mkdtemp(path.join(os.tmpdir(),'resume-api-test-'));
 try{
  const selection=await selectTopic({topicId:'heart'});let calls=0,file;
  try{await generateConversation(selection,{outputRoot,apiKey:'key',fetcher:async()=>{if(++calls===2)throw Error('temporary network failure');return answerResponse(1);}});}catch(error){file=error.message.match(/Partial run saved at (.+)$/)[1];}
  const partial=JSON.parse(await readFile(file,'utf8'));assert.equal(partial.calls.length,1);assert.equal(partial.conversation.messages.length,3);
  const result=await generateConversation(selection,{outputRoot,apiKey:'key',resumeFile:file,fetcher:async(url,init)=>{const body=JSON.parse(init.body);assert.equal(body.input.length,calls*2);return answerResponse(calls++);}});
  assert.equal(calls,4);assert.equal(result.file,file);assert.equal(result.artifact.conversation.conversation_id,partial.conversation.conversation_id);assert.equal(result.artifact.conversation.messages.length,6);assert.equal(result.artifact.calls.length,3);
  await assert.rejects(generateConversation({...selection,modelId:'gpt-6-luna'},{apiKey:'key',resumeFile:file}),/does not match/);
 }finally{await rm(outputRoot,{recursive:true,force:true});}
});

test('routes the exact DeepSeek model through OpenRouter with the current system prompt and retains provenance',async()=>{
 const model='deepseek/deepseek-v4.1-flash-1017';
 const selection=await selectTopic({topicId:'alkaline-earth-metals',language:'ta',modelId:model});
 assert.equal(selection.apiProvider,'openrouter');
 const outputRoot=await mkdtemp(path.join(os.tmpdir(),'deepseek-api-test-')),requests=[];
 try{
  const {artifact}=await generateConversation(selection,{outputRoot,apiKey:'test-key',fetcher:async(url,options)=>{
   assert.equal(url,'https://openrouter.ai/api/v1/chat/completions');const request=JSON.parse(options.body);requests.push(request);
   assert.equal(request.model,model);assert.deepEqual(request.messages[0],{role:'system',content:tutorSystemPrompt});
   assert.equal(request.messages.length,requests.length*2);assert.equal(request.provider.allow_fallbacks,false);assert.equal(request.stream,false);
   return jsonResponse({id:'chat-'+requests.length,model:selection.canonicalModel,provider:'fixture-upstream',choices:[{finish_reason:'stop',message:{role:'assistant',content:'Answer '+requests.length}}],usage:{completion_tokens:10}});
  }});
  assert.equal(artifact.status,'completed');assert.equal(artifact.conversation.messages.length,6);
  assert.equal(artifact.conversation.api_source.api_provider,'openrouter');assert.equal(artifact.conversation.api_source.system_prompt,tutorSystemPrompt);
  assert.equal(artifact.calls[0].upstream_provider,'fixture-upstream');assert.equal(artifact.calls[0].response.model,selection.canonicalModel);
  for(const response of [{id:'x',model,choices:[{finish_reason:'length',message:{role:'assistant',content:'partial'}}]},{id:'x',model:'other/model',choices:[{finish_reason:'stop',message:{role:'assistant',content:'Wrong model'}}]},{id:'x',model,choices:[{finish_reason:'stop',message:{role:'assistant',content:''}}]}])assert.throws(()=>textFromChatResponse(response,model));
 }finally{await rm(outputRoot,{recursive:true,force:true});}
});

test('sends the exact tutor system prompt on every request with complete visible history and saved provenance', async () => {
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
    const systemPrompt = 'You are an expert teacher teaching a high-school student. Your goal is help the student learn. Use the best practices of conversational learning in your interaction with the student.';
    assert.deepEqual(requests.map(request => request.input.map(message => message.role)), [['system', 'user'], ['system', 'user', 'assistant', 'user'], ['system', 'user', 'assistant', 'user', 'assistant', 'user']]);
    for (const [index, request] of requests.entries()) {
      assert.deepEqual(request.input[0], { role: 'system', content: systemPrompt });
      assert.deepEqual(request, requestFor(artifact.conversation.messages.slice(0, index * 2 + 1), 'gpt-6.1-sol'));
      assert.deepEqual(Object.keys(request).sort(), ['input', 'max_output_tokens', 'model', 'store']);
      assert.equal(request.store, false);
    }
    assert.deepEqual(artifact.conversation.api_source.response_ids, ['resp_1', 'resp_2', 'resp_3']);
    assert.equal(artifact.conversation.api_source.system_prompt, systemPrompt);
    assert.equal(artifact.conversation.api_source.system_prompt_sha256, createHash('sha256').update(systemPrompt).digest('hex'));
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
