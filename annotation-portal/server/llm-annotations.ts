import {resolveCaptureContent} from '../src/capture-content.ts';
import {readSections} from '../src/section-registry.ts';
import { resolveSupabaseEnvironment } from '../scripts/supabase-environment.mjs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import snapshot from '../src/generated/rubric.json';
import config from './generated/evaluation-config.json';
import type { Conversation, RubricSnapshot } from '../src/types';
import { promptVersion } from './llm-annotation-core';
import { generateInstructionalBaseline, GenerationError } from './llm-provider';
import {generateHtmlImageBaseline} from './html-image-generation';
import {imagePromptVersion} from './image-labeling';

type Request = IncomingMessage & { body?: unknown };
class RequestError extends Error {
  constructor(public status: number, message: string, public code = 'provider_error') { super(message); }
}
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function readBody(request: Request): Promise<unknown> {
  if (request.body !== undefined) {
    const text = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
    if (Buffer.byteLength(text) > 4096) throw new RequestError(413, 'Request is too large.');
    return JSON.parse(text);
  }
  let size = 0; const chunks: Buffer[] = [];
  for await (const chunk of request) { const bytes = Buffer.from(chunk); size += bytes.length; if (size > 4096) throw new RequestError(413, 'Request is too large.'); chunks.push(bytes); }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export function createLLMAnnotationHandler({ getEnvironment = () => process.env, createSupabaseClient = createClient, fetcher = fetch }: {
  getEnvironment?: () => Record<string, string | undefined>; createSupabaseClient?: typeof createClient; fetcher?: typeof fetch;
} = {}) {
  return async (request: Request, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json'); response.setHeader('Cache-Control', 'no-store');
    const send = (status: number, body: unknown) => { response.statusCode = status; response.end(JSON.stringify(body)); };
    let claimedId: string | undefined; let caller: SupabaseClient | undefined;
    try {
      if (request.method !== 'POST') { response.setHeader('Allow', 'POST'); throw new RequestError(405, 'Use POST to generate LLM annotations.'); }
      const token = request.headers.authorization?.match(/^Bearer (\S+)$/i)?.[1];
      if (!token) throw new RequestError(401, 'Sign in as an administrator.');
      if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new RequestError(415, 'Send a JSON request.');
      const env = resolveSupabaseEnvironment(getEnvironment()); const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL; const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY;
      if (!url || !key) throw new RequestError(503, 'LLM annotation is not configured on the server.');
      caller = createSupabaseClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }, global: { headers: { Authorization: `Bearer ${token}` } } });
      const auth = await caller.auth.getUser(token);
      if (auth.error || !auth.data.user) throw new RequestError(401, 'Your session has expired. Sign in again.');
      const profile = await caller.from('profiles').select('role').eq('id', auth.data.user.id).single();
      if (profile.error) throw new RequestError(503, 'Could not verify administrator access.');
      if (profile.data?.role !== 'admin') throw new RequestError(403, 'Only administrators can generate LLM annotations.');
      const body = await readBody(request) as Record<string, unknown>;
      if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length !== 2 || Object.keys(body).some(key => !['conversation_id','request_id'].includes(key)) || typeof body.conversation_id !== 'string' || !uuid.test(body.conversation_id) || typeof body.request_id !== 'string' || !uuid.test(body.request_id)) throw new RequestError(400, 'Provide a conversation ID and generation request ID.');
      const document = await caller.from('conversations').select('transcript').eq('id', body.conversation_id).single();
      if (document.error || !document.data) throw new RequestError(404, 'Conversation not found.');
      if(document.data.transcript.access_type==='API'){
        const markerFree=await caller.from('conversation_versions').select('version_key').eq('conversation_id',body.conversation_id).eq('version_key','marker-free-v1').maybeSingle();
        if(markerFree.error&&!['PGRST205','42P01'].includes(markerFree.error.code))throw new RequestError(503,'Could not check the conversation version.');
        if(markerFree.data)throw new RequestError(409,'This conversation uses marker-free labeling. Open its Labeling page; the legacy 24-label evaluator is disabled.');
      }
      document.data.transcript=await resolveCaptureContent(caller,document.data.transcript);
      const htmlMode=!!document.data.transcript.html_content;
      if(!(env.GEMINI_API_KEY||env.GOOGLE_API_KEY))throw new RequestError(503,'Set the server-only GEMINI_API_KEY or GOOGLE_API_KEY to enable direct Google evaluation.');
      const rubric = snapshot as RubricSnapshot;
      const registered = await caller.from('rubric_versions').select('hash').eq('hash', rubric.rubric_sha256).maybeSingle();
      if (registered.error) throw new RequestError(503, 'Could not load the annotation rubric.');
      if (!registered.data) { const insert = await caller.from('rubric_versions').insert({ hash: rubric.rubric_sha256, snapshot: rubric }); if (insert.error && insert.error.code !== '23505') throw new RequestError(503, 'Could not register the annotation rubric.'); }
      const sections=await readSections(caller,[body.conversation_id]);
      if(!sections.length)throw new RequestError(409,'Open the conversation labeling view once to initialize its permanent section IDs.');
      let claim = await caller.rpc('claim_llm_generation', { p_conversation_id: body.conversation_id, p_request_id: body.request_id });
      if (claim.error || !claim.data) throw new RequestError(409, 'Could not start generation. Refresh versions; a generation may already be running.');
      if (!claim.data.claimed) {
        if (claim.data.status === 'completed') { const baseline = await caller.from('llm_baselines').select('*').eq('id', body.request_id).single(); if (baseline.error) throw new RequestError(503, 'Could not load the saved baseline.'); send(200, { baseline: baseline.data }); return; }
        if(claim.data.status==='failed'||claim.data.status==='generating'&&Date.parse(claim.data.created_at)<Date.now()-600000){
          claim=await caller.rpc('resume_llm_generation',{p_conversation_id:body.conversation_id,p_request_id:body.request_id});
          if(claim.error||!claim.data?.claimed)throw new RequestError(409,'Could not resume this checkpoint. A generation may already be running, or this run has no checkpoint.');
        }
        else {
        send(202, { request_id: body.request_id, status: 'generating' }); return;
        }
      }
      claimedId = body.request_id;
      const conversation = document.data.transcript as Conversation;
      const generated = htmlMode?await generateHtmlImageBaseline({conversation,rubric,sections,requestId:claimedId,apiKey:(env.GEMINI_API_KEY||env.GOOGLE_API_KEY)!,origin:`http://${request.headers.host||'127.0.0.1:5173'}`,checkpoint:claim.data.checkpoint?.fingerprint?claim.data.checkpoint:undefined,onCheckpoint:async state=>{const saved=await caller!.rpc('save_llm_generation_checkpoint',{p_request_id:claimedId,p_checkpoint:{...state,repairs_used:0}});if(saved.error)throw new RequestError(502,'Could not save image generation checkpoint.','save_failed');},fetcher}):await generateInstructionalBaseline({ conversation, rubric, sections, requestId: claimedId, config:{...config,provider:'google',repair_attempts:3}, checkpoint:claim.data.checkpoint?.fingerprint?claim.data.checkpoint:undefined,onCheckpoint:async checkpoint=>{const saved=await caller!.rpc('save_llm_generation_checkpoint',{p_request_id:claimedId,p_checkpoint:checkpoint});if(saved.error)throw new RequestError(502,'Could not save generation checkpoint. Resume this run to try again.','save_failed');}, apiKey: (env.GEMINI_API_KEY||env.GOOGLE_API_KEY)!, fetcher });
      const saved = await caller.rpc('complete_llm_generation', { p_request_id: claimedId, p_rubric_hash: rubric.rubric_sha256, p_annotations: generated.annotations, p_model: generated.model, p_prompt_version: htmlMode?imagePromptVersion:promptVersion, p_prompt: generated.prompt, p_generation_config: generated.generation_config });
      if (saved.error || !saved.data) throw new RequestError(502, 'Could not confirm baseline storage. Refresh versions before trying again.', 'save_failed');
      send(201, { baseline: saved.data });
    } catch (error) {
      const timeout = (error as Error)?.name === 'TimeoutError' || (error as Error)?.name === 'AbortError';
      if (claimedId && caller) { try { await caller.rpc('fail_llm_generation', { p_request_id: claimedId, p_code: timeout ? 'timeout' : error instanceof RequestError || error instanceof GenerationError ? error.code : 'provider_error' }); } catch { /* A subsequent refresh reveals persisted run state. */ } }
      if (timeout) send(504, { error: 'Generation timed out. Refresh versions before trying again.' });
      else if (error instanceof GenerationError) send(502, { error: error.message });
      else if (error instanceof RequestError) send(error.status, { error: error.message });
      else if (error instanceof SyntaxError && !claimedId) send(400, { error: 'Request must contain valid JSON.' });
      else send(502, { error: 'LLM annotation could not be completed. Refresh versions before trying again.' });
    }
  };
}
