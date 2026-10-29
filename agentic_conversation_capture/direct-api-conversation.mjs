import { createHash, randomUUID } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSupabaseEnvironment } from '../annotation-portal/scripts/load-supabase-env.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));
const repository = path.resolve(directory, '..');
const responsesUrl = 'https://api.openai.com/v1/responses';
const openrouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
const maxOutputTokens = 16384;
const requestTimeoutMs = 180000;
export const tutorSystemPrompt = 'You are an expert teacher teaching a high-school student. Your goal is help the student learn. Use the best practices of conversational learning in your interaction with the student.';
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const sha256 = value => createHash('sha256').update(value).digest('hex');

async function readJson(file) { return JSON.parse(await readFile(file, 'utf8')); }

export async function selectTopic({ topicId, language = 'en', modelId = 'gpt-6.1-sol', topicsFile = path.join(directory, 'topics.json') }) {
  const sourceFile=path.resolve(topicsFile),sourceBytes=await readFile(sourceFile,'utf8');
  const [topics, models] = await Promise.all([
    Promise.resolve(JSON.parse(sourceBytes)),
    readJson(path.join(repository, 'data/models.json')),
  ]);
  const topic = topics.find(entry => entry['topic-id'] === topicId);
  if (!topic) throw new Error(`Unknown topic ID: ${topicId}`);
  const localized = topic[language];
  if (!localized?.title?.trim() || !Array.isArray(localized.prompts) || !localized.prompts.length || localized.prompts.some(prompt => typeof prompt !== 'string' || !prompt.trim())) {
    throw new Error(`Topic ${topicId} has no complete ${language} prompt list`);
  }
  const model = models.models?.find(entry => entry.id === modelId);
  const apiProvider=['openrouter','google'].includes(model?.api_provider)?model.api_provider:'openai';
  const apiModel=model?.api_model||modelId;
  if (model?.litellm_model !== `${apiProvider}/${apiModel}`) throw new Error(`Model ${modelId} is not configured for API conversation generation`);
  return { topicId, language, modelId, apiModel, apiProvider, canonicalModel:model.canonical_model||modelId,title: localized.title, genericTopic: topic['topic-name'], prompts: localized.prompts,promptsSource:path.relative(repository,sourceFile).split(path.sep).join('/'),topicsSha256:sha256(sourceBytes) };
}

function settingsFor(apiProvider){return apiProvider==='google'?{maxOutputTokens:maxOutputTokens}:apiProvider==='openrouter'?{stream:false,max_tokens:maxOutputTokens,provider:{require_parameters:true,allow_fallbacks:false}}:{store:false,max_output_tokens:maxOutputTokens};}

export function requestFor(messages, modelId,apiProvider='openai') {
  if(apiProvider==='google')return {systemInstruction:{parts:[{text:tutorSystemPrompt}]},contents:messages.map(message=>({role:message.speaker==='student'?'user':'model',parts:[{text:message.text}]})),generationConfig:settingsFor(apiProvider)};
  if(apiProvider==='openrouter')return {model:modelId,messages:[{role:'system',content:tutorSystemPrompt},...messages.map(message=>({role:message.speaker==='student'?'user':'assistant',content:message.text}))],...settingsFor(apiProvider)};
  return {
    model: modelId,
    input: [
      { role: 'system', content: tutorSystemPrompt },
      ...messages.map(message => ({ role: message.speaker === 'student' ? 'user' : 'assistant', content: message.text })),
    ],
    store: false,
    max_output_tokens: maxOutputTokens,
  };
}

export function textFromChatResponse(response,expectedModel,canonicalModel=expectedModel){
  const choice=response?.choices?.[0];
  if(response?.error||choice?.finish_reason!=='stop')throw Error(`OpenRouter response is ${choice?.finish_reason||'invalid'}`);
  if(!response.id||![expectedModel,canonicalModel].includes(response.model))throw Error('OpenRouter returned an unexpected model or missing response ID');
  if(choice.message?.role!=='assistant'||typeof choice.message.content!=='string'||!choice.message.content.trim())throw Error('OpenRouter returned no assistant text');
  return choice.message.content;
}

export function textFromGoogleResponse(response){
  const candidate=response?.candidates?.[0];
  if(response?.error||response?.promptFeedback?.blockReason||candidate?.finishReason!=='STOP')throw Error(`Google response is ${candidate?.finishReason||response?.promptFeedback?.blockReason||'invalid'}`);
  if(!response.responseId||!response.modelVersion)throw Error('Google response provenance is missing');
  if(candidate.content?.role!=='model')throw Error('Google response has no model content');
  const text=(candidate.content.parts||[]).filter(p=>typeof p.text==='string'&&!p.thought).map(p=>p.text).join('');
  if(!text.trim())throw Error('Google returned no assistant text');
  return text;
}

export function textFromResponse(response) {
  if (response?.status !== 'completed') throw new Error(`OpenAI response is ${response?.status || 'missing'}`);
  const text = (response.output || []).filter(item => item.type === 'message' && item.role === 'assistant')
    .flatMap(item => item.content || []).filter(item => item.type === 'output_text').map(item => item.text || '').join('');
  if (!text.trim()) throw new Error('OpenAI returned no assistant text');
  if (!response.id || typeof response.id !== 'string') throw new Error('OpenAI response ID is missing');
  return text;
}

export async function generateConversation(selection, { fetcher = fetch, apiKey, outputRoot = path.join(directory, 'outputs/api'), now = () => new Date(), resumeFile, requestTimeoutMs:timeoutMs=requestTimeoutMs,onArtifact=async()=>{} } = {}) {
  if(!Number.isInteger(timeoutMs)||timeoutMs<1||timeoutMs>1200000)throw Error('Request timeout must be 1 to 1200000 milliseconds');
  const apiProvider=selection.apiProvider||'openai';
  if (!apiKey) throw new Error(`Set ${apiProvider==='google'?'GEMINI_API_KEY or GOOGLE_API_KEY':apiProvider==='openrouter'?'OPENROUTER_API_KEY':'OPENAI_API_KEY'} in the repository root .env`);
  const apiModel=selection.apiModel||selection.modelId.replace(/^google\//,'');
  if(apiProvider==='google'&&!/^gemini-[a-z0-9.-]+$/.test(apiModel))throw Error('Invalid direct Google model');
  const endpoint=apiProvider==='google'?`https://generativelanguage.googleapis.com/v1beta/models/${apiModel}:generateContent`:apiProvider==='openrouter'?openrouterUrl:responsesUrl;
  const id = randomUUID();
  const started = now().toISOString();
  const stamp = started.replace(/[-:.]/g, '');
  const folder = path.join(outputRoot, selection.topicId, selection.language, `${stamp}-${id.slice(0, 8)}`);
  if(!resumeFile)await mkdir(folder, { recursive: true });
  const file = resumeFile ? path.resolve(resumeFile) : path.join(folder, 'conversation.json');
  const promptBytes = JSON.stringify(selection.prompts);
  let conversation = {
    conversation_id: id,
    label: selection.title,
    learning_topic: selection.title,
    topic_id: selection.topicId,
    topic_name: selection.genericTopic,
    topic_english_name: selection.genericTopic,
    language: selection.language,
    original_language: selection.language,
    provider: selection.modelId,
    access_type: 'API',
    api_source: {
      model_id: selection.modelId,
      endpoint: apiProvider==='google'?'generateContent':apiProvider==='openrouter'?'chat/completions':'responses',
      api_provider:apiProvider,
      endpoint_url:endpoint,
      system_prompt: tutorSystemPrompt,
      system_prompt_sha256: sha256(tutorSystemPrompt),
      prompts_source: selection.promptsSource||'agentic_conversation_capture/topics.json',
      ...(selection.topicsSha256?{topics_sha256:selection.topicsSha256}:{}),
      prompts_sha256: sha256(promptBytes),
      generated_at: started,
      settings: settingsFor(apiProvider),
      response_ids: [],
    },
    messages: [],
  };
  let artifact = { format_version: 'direct-api-conversation/1', status: 'running', conversation, calls: [] };
  if(resumeFile){
    artifact=await readJson(file);conversation=artifact.conversation;
    const source=conversation?.api_source;
    if((selection.promptsSource&&source?.prompts_source!==selection.promptsSource)||(selection.topicsSha256&&source?.topics_sha256&&source.topics_sha256!==selection.topicsSha256))throw Error('Resume artifact topic source differs from this selection');
    if(artifact.format_version!=='direct-api-conversation/1'||!['failed','running','completed'].includes(artifact.status)||!uuidPattern.test(conversation?.conversation_id||'')||conversation.provider!==selection.modelId||conversation.topic_id!==selection.topicId||conversation.language!==selection.language||source?.api_provider!==apiProvider||source.system_prompt!==tutorSystemPrompt||source.prompts_sha256!==sha256(promptBytes)||source.endpoint_url!==endpoint||JSON.stringify(source.settings)!==JSON.stringify(settingsFor(apiProvider))||!Array.isArray(artifact.calls))throw Error('Resume artifact does not match this generation request');
    if(artifact.status==='completed'){validateCompletedArtifact(artifact);return {file,artifact};}
    const n=artifact.calls.length;
    if(n>selection.prompts.length||![n*2,n*2+1].includes(conversation.messages.length)||source.response_ids.length!==n)throw Error('Resume artifact has incomplete history');
    for(let i=0;i<n;i++){
      if(conversation.messages[i*2]?.speaker!=='student'||conversation.messages[i*2].text!==selection.prompts[i]||conversation.messages[i*2+1]?.speaker!=='tutor'||!conversation.messages[i*2+1].text?.trim()||JSON.stringify(artifact.calls[i].request)!==JSON.stringify(requestFor(conversation.messages.slice(0,i*2+1),selection.modelId,apiProvider)))throw Error('Resume history does not match saved requests');
    }
    if(conversation.messages.length%2&&conversation.messages.at(-1)?.text!==selection.prompts[n])throw Error('Resume student prompt mismatch');
    artifact.status='running';delete artifact.failure;
  }
  let pendingResponse;
  const save = () => writeFile(file, JSON.stringify(artifact, null, 2) + '\n', 'utf8');
  await save();
  await onArtifact(file,artifact);
  try {
    for (let index=artifact.calls.length;index<selection.prompts.length;index++) {
      const prompt=selection.prompts[index];
      if(conversation.messages.length===index*2)conversation.messages.push({ turn_id: `turn_${String(conversation.messages.length + 1).padStart(4, '0')}`, speaker: 'student', text: prompt });
      await save();
      const request = requestFor(conversation.messages, selection.modelId,apiProvider);
      const response = await fetcher(endpoint, {
        method: 'POST',
        headers: { ...(apiProvider==='google'?{'x-goog-api-key':apiKey}:{Authorization:`Bearer ${apiKey}`}), 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error(`${apiProvider==='google'?'Google':apiProvider==='openrouter'?'OpenRouter':'OpenAI'} returned HTTP ${response.status}`);
      const result = await response.json();
      pendingResponse=apiProvider!=='openai'?result:undefined;
      const answer = apiProvider==='google'?textFromGoogleResponse(result):apiProvider==='openrouter'?textFromChatResponse(result,selection.modelId,selection.canonicalModel):textFromResponse(result);
      const responseId=apiProvider==='google'?result.responseId:result.id;
      conversation.messages.push({ turn_id: `turn_${String(conversation.messages.length + 1).padStart(4, '0')}`, speaker: 'tutor', text: answer });
      conversation.api_source.response_ids.push(responseId);
      artifact.calls.push({ request, response_id: responseId, transport_timeout_ms:timeoutMs, usage: result.usageMetadata || result.usage || null,...(apiProvider!=='openai'?{response:result,native_model:result.modelVersion||result.model,upstream_provider:apiProvider==='google'?'google':result.provider||null}:{}) });
      await save();
      pendingResponse=undefined;
    }
    artifact.status = 'completed';
    await save();
  } catch (error) {
    artifact.status = 'failed';
    artifact.failure = { after_turns: conversation.messages.length, message: error.message,...(pendingResponse?{provider_response:pendingResponse}:{}) };
    await save();
    throw new Error(`${error.message}. Partial run saved at ${file}`);
  }
  return { file, artifact };
}

function validateCompletedArtifact(artifact) {
  const conversation = artifact?.conversation;
  if (artifact?.format_version !== 'direct-api-conversation/1' || artifact.status !== 'completed' || !conversation || !uuidPattern.test(conversation.conversation_id || '')) throw new Error('The source artifact is not a completed direct API conversation');
  if (!conversation.topic_id || !conversation.label || !conversation.language || conversation.access_type !== 'API' || conversation.provider !== conversation.api_source?.model_id) throw new Error('The source artifact has incomplete topic or model metadata');
  if (!Array.isArray(conversation.messages) || !conversation.messages.length || conversation.messages.length % 2 || artifact.calls?.length !== conversation.messages.length / 2) throw new Error('The source artifact has incomplete turns');
  for (let i = 0; i < conversation.messages.length; i++) {
    const message = conversation.messages[i];
    if (message.turn_id !== `turn_${String(i + 1).padStart(4, '0')}` || message.speaker !== (i % 2 ? 'tutor' : 'student') || !message.text?.trim()) throw new Error('The source artifact has an invalid turn');
  }
  return conversation;
}

async function portalRequest(fetcher, url, key, method = 'GET', body, extraHeaders = {}) {
  const response = await fetcher(url, { method, headers: { apikey: key, Authorization: `Bearer ${key}`, ...extraHeaders }, ...(body === undefined ? {} : { body }) });
  if (!response.ok) throw new Error(`Supabase returned HTTP ${response.status} for ${method} ${new URL(url).pathname}`);
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function uploadConversation(artifact, { fetcher = fetch, supabaseUrl, serviceRoleKey, project, adminUsername } = {}) {
  const conversation = validateCompletedArtifact(artifact);
  const { base, adminId } = await preflightPortal({ fetcher, supabaseUrl, serviceRoleKey, project, adminUsername });
  const id = conversation.conversation_id;
  const storagePath = `api-generated/${id}.json`;
  const sourceBytes = JSON.stringify(artifact, null, 2) + '\n';
  const storageUrl = `${base}/storage/v1/object/transcripts/${storagePath}`;
  const objectResponse = await fetcher(storageUrl, { method: 'POST', headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json', 'x-upsert': 'false' }, body: sourceBytes });
  if (!objectResponse.ok) {
    if (objectResponse.status !== 400 && objectResponse.status !== 409) throw new Error(`Supabase Storage returned HTTP ${objectResponse.status}`);
    const existingResponse = await fetcher(storageUrl, { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` } });
    if (!existingResponse.ok || await existingResponse.text() !== sourceBytes) throw new Error('An existing source object differs from this conversation');
  }
  const row = { id, label: conversation.label, language: conversation.language, topic_id: conversation.topic_id, transcript: conversation, source_path: storagePath, created_by: adminId };
  const insertResponse = await fetcher(`${base}/rest/v1/conversations`, { method: 'POST', headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(row) });
  if (!insertResponse.ok && insertResponse.status !== 409) throw new Error(`Supabase conversation insert returned HTTP ${insertResponse.status}`);
  const rows = await portalRequest(fetcher, `${base}/rest/v1/conversation_details?id=eq.${id}&select=id,label,language,topic_id,source_path,transcript`, serviceRoleKey);
  const saved = rows?.[0];
  if (rows?.length !== 1 || saved.label !== row.label || saved.language !== row.language || saved.topic_id !== row.topic_id || saved.source_path !== row.source_path || !sameJson(saved.transcript, row.transcript)) throw new Error('Could not verify the uploaded conversation; inspect the portal before retrying');
  return { id, topic_id: saved.topic_id, language: saved.language, turn_count: saved.transcript.messages.length, created: insertResponse.ok };
}

function sameJson(left, right) {
  if (Array.isArray(left) || Array.isArray(right)) return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every((value, index) => sameJson(value, right[index]));
  if (left && right && typeof left === 'object' && typeof right === 'object') {
    const keys = Object.keys(left);
    return keys.length === Object.keys(right).length && keys.every(key => Object.hasOwn(right, key) && sameJson(left[key], right[key]));
  }
  return left === right;
}

export async function preflightPortal({ fetcher = fetch, supabaseUrl, serviceRoleKey, project, adminUsername } = {}) {
  if (!supabaseUrl) throw new Error('Set VITE_SUPABASE_URL in annotation-portal/.env.local');
  if (!serviceRoleKey) throw new Error('Set SUPABASE_SERVICE_ROLE_KEY in annotation-portal/.env.local');
  const parsedUrl = new URL(supabaseUrl);
  const ref = parsedUrl.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
  const local = project === 'local' && ['127.0.0.1', 'localhost', '[::1]'].includes(parsedUrl.hostname) && ['http:', 'https:'].includes(parsedUrl.protocol);
  if (!local && (parsedUrl.protocol !== 'https:' || !ref || ref !== project)) throw new Error('--project must match the configured Supabase URL (use local for loopback)');
  const base = parsedUrl.origin;
  const profiles = await portalRequest(fetcher, `${base}/rest/v1/profiles?role=eq.admin&select=id,username`, serviceRoleKey);
  const admins = adminUsername ? profiles.filter(row => row.username === adminUsername) : profiles;
  if (admins.length !== 1) throw new Error(adminUsername ? 'The selected admin username is not unique' : 'Specify --admin USERNAME when the portal has multiple admins');
  return { base, adminId: admins[0].id };
}

async function loadEnvironment() {
  for (const file of [path.join(repository, '.env'), path.join(repository, 'annotation-portal/.env.local')]) {
    try { process.loadEnvFile(file); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  loadSupabaseEnvironment();
}

async function main(args) {
  const command = args.shift();
  const options = {};
  if (command === 'upload') {
    if (!args[0] || args[0].startsWith('--')) throw new Error('Pass the artifact path immediately after upload');
    options.artifact = args.shift();
  }
  while (args.length) {
    const flag = args.shift();
    if (!['--topic', '--language', '--model', '--project', '--admin','--topics-file'].includes(flag) || !args.length) throw new Error('Usage: node direct-api-conversation.mjs dry-run|generate|upload [artifact.json] --topic TOPIC --language en --model gpt-6.1-sol --project PROJECT_REF [--admin USERNAME] [--topics-file FILE]');
    options[flag.slice(2)] = args.shift();
  }
  await loadEnvironment();
  if (command === 'upload') {
    const artifact = await readJson(path.resolve(options.artifact));
    const uploaded = await uploadConversation(artifact, { supabaseUrl: process.env.VITE_SUPABASE_URL, serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, project: options.project, adminUsername: options.admin });
    console.log(JSON.stringify({ uploaded, source: path.resolve(options.artifact) }));
    return;
  }
  if (command === 'dry-run' || command === 'generate') {
    const selection = await selectTopic({ topicId: options.topic, language: options.language || 'en', modelId: options.model || 'gpt-6.1-sol',...(options['topics-file']?{topicsFile:options['topics-file']}:{}) });
    if (command === 'dry-run') {
      console.log(JSON.stringify({ topic_id: selection.topicId, language: selection.language, model: selection.modelId, api_provider:selection.apiProvider,title: selection.title, prompts: selection.prompts, first_request: requestFor([{ speaker: 'student', text: selection.prompts[0] }], selection.modelId,selection.apiProvider), expected_turns: selection.prompts.length * 2 }, null, 2));
      return;
    }
    await preflightPortal({ supabaseUrl: process.env.VITE_SUPABASE_URL, serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, project: options.project, adminUsername: options.admin });
    const { file, artifact } = await generateConversation(selection, { apiKey: selection.apiProvider==='google'?process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY:selection.apiProvider==='openrouter'?process.env.OPENROUTER_API_KEY:process.env.OPENAI_API_KEY });
    console.log(JSON.stringify({ generated: file, turns: artifact.conversation.messages.length }));
    const uploaded = await uploadConversation(artifact, { supabaseUrl: process.env.VITE_SUPABASE_URL, serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, project: options.project, adminUsername: options.admin });
    console.log(JSON.stringify({ uploaded, source: file }));
    return;
  }
  throw new Error('Choose dry-run, generate, or upload');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
}
