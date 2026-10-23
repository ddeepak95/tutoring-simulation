import type { Page } from '@playwright/test';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import C from '../../src/generated/core.js';
const rubric = JSON.parse(fs.readFileSync('src/generated/rubric.json', 'utf8'));
export const ids = { admin: '00000000-0000-4000-8000-000000000001', alice: '00000000-0000-4000-8000-000000000002', bob: '00000000-0000-4000-8000-000000000003', doc: '00000000-0000-4000-8000-000000000010', a: '00000000-0000-4000-8000-000000000011', b: '00000000-0000-4000-8000-000000000012' };
export const profiles = [{ id: ids.admin, username: 'admin', role: 'admin' }, { id: ids.alice, username: 'alice', role: 'annotator' }, { id: ids.bob, username: 'bob', role: 'annotator' }];
export const sample = { conversation_id: 'demo', label: 'Evaporation · Tamil', learning_topic: 'Evaporation', messages: [
  { turn_id: 't1', speaker: 'tutor', text: 'தமிழ் 😀 Water changes from liquid into vapour. Wet clothes drying illustrates evaporation. What is evaporation? Have you understood?' },
  { turn_id: 's1', speaker: 'student', text: 'How does this happen?' },
  { turn_id: 't2', speaker: 'tutor', text: 'Think of the process like people leaving a crowded room. A table can compare the drying times. Pongal cooking also involves evaporation.' }
] };
const jwt = (id: string) => `${Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')}.${Buffer.from(JSON.stringify({ sub: id, role: 'authenticated', aud: 'authenticated', exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')}.test`;
export async function backend(page: Page) {
  const people = profiles.map(profile => ({ ...profile }));
  const passwords = new Map(people.map(profile => [profile.username, 'test-password-123']));
  const documents = [{ id: ids.doc, label: sample.label, language: 'Tamil', transcript: structuredClone(sample), created_at: new Date().toISOString() }];
  const assignments: any[] = [ids.alice, ids.bob].map((annotator_id, i) => ({ id: i ? ids.b : ids.a, conversation_id: ids.doc, annotator_id, rubric_hash: rubric.rubric_sha256, task_type: 'label', status: 'not_started', revision: 0, annotations: [], turn_ratings: {}, updated_at: new Date().toISOString(), submitted_at: null }));
  const state = { documents, assignments, comparisonPairs: [] as any[], comparisonAssignments: [] as any[], people, passwords, baselines:[] as any[], captureAssets:[] as any[], captureDocuments:[] as any[], generationRuns:[] as any[], llmGenerations:0, failLLMGeneration:false, repository: null as any, repositoryFiles: {} as Record<string, string>, failRepositoryPath: '', failNextCreate: false, failNextSave: false, failSaves: false, failNextDelete: false, saves: 0, requests: [] as string[] };
  await page.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if((url.hostname==='127.0.0.1'||url.hostname==='localhost')&&url.pathname==='/api/llm-annotations') {
      const send=(data:unknown,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(data)});
      let caller='';try{caller=JSON.parse(Buffer.from((request.headers().authorization||'').split('.')[1],'base64url').toString()).sub;}catch{}
      if(people.find(person=>person.id===caller)?.role!=='admin')return send({error:'Only administrators can generate LLM annotations.'},403);
      if(state.failLLMGeneration)return send({error:'The model output failed exact-highlight validation. No baseline or assignments were created.'},502);
      const body=request.postDataJSON();const document=documents.find(document=>document.id===body.conversation_id);if(!document)return send({error:'Conversation not found.'},404);
      const conversation=C.normalizeConversation(document.transcript);const quote='Wet clothes drying';const start=conversation.messages[0].text.indexOf(quote);
      const annotation=C.createAnnotation('examples',C.makeEvidence(conversation,'t1',start,start+quote.length),rubric.rubric,`llm-${body.request_id}-1`);annotation.entry.detail_level='Brief';
      const baseline={id:body.request_id,conversation_id:document.id,rubric_hash:rubric.rubric_sha256,annotations:[annotation],model:'configured/model',prompt_version:'instructional-highlights/1',prompt:'mock prompt',prompt_sha256:'a'.repeat(64),transcript_sha256:'b'.repeat(64),generation_config:{},created_by:caller,created_at:new Date().toISOString()};
      state.baselines.unshift(baseline);state.generationRuns.unshift({id:baseline.id,conversation_id:baseline.conversation_id,status:'completed',error_code:null,created_at:baseline.created_at,finished_at:baseline.created_at});state.llmGenerations++;
      return send({baseline},201);
    }
    if ((url.hostname === '127.0.0.1' || url.hostname === 'localhost') && url.pathname === '/api/annotators') {
      const send = (data: unknown, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });
      let caller = ''; try { caller = JSON.parse(Buffer.from((request.headers().authorization || '').split('.')[1], 'base64url').toString()).sub; } catch {}
      if (people.find(profile => profile.id === caller)?.role !== 'admin') return send({ error: 'Only administrators can create annotators.' }, 403);
      if (state.failNextCreate) { state.failNextCreate = false; return send({ error: 'Account creation is not configured on the server.' }, 503); }
      const body = request.postDataJSON();
      if (body.password.length < 8) return send({ error: 'Use a password with at least 8 characters.' }, 400);
      if (people.some(profile => profile.username === body.username)) return send({ error: 'This username already exists. Choose another username.' }, 409);
      const annotator = { id: crypto.randomUUID(), username: body.username, role: 'annotator' };
      people.push(annotator); passwords.set(annotator.username, body.password);
      return send({ annotator }, 201);
    }
    if (url.hostname !== 'portal-test.supabase.co') { if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue(); return route.abort(); }
    state.requests.push(url.pathname);
    const send = (data: unknown, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });
    let userId = ''; try { userId = JSON.parse(Buffer.from((request.headers().authorization || '').split('.')[1], 'base64url').toString()).sub; } catch {}
    const profile = people.find(p => p.id === userId);
    const body = request.headers()['content-type']?.includes('application/json') ? request.postDataJSON() : null;
    if (url.pathname === '/auth/v1/token') {
      const user = people.find(p => body.email === `${p.username}@users.annotation.invalid`);
      if (!user || body.password !== passwords.get(user.username)) return send({ error: 'invalid_grant', msg: 'Invalid login credentials' }, 400);
      return send({ access_token: jwt(user.id), token_type: 'bearer', expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, refresh_token: `refresh-${user.id}`, user: { id: user.id, email: body.email, role: 'authenticated', aud: 'authenticated', created_at: new Date().toISOString(), app_metadata: {}, user_metadata: {} } });
    }
    if (url.pathname === '/auth/v1/logout') return send({});
    if (url.pathname === '/auth/v1/user') return send({ id: userId, role: 'authenticated' });
    if (!profile) return send({ message: 'Authentication required' }, 401);
    if (url.pathname.startsWith('/storage/v1/object/transcripts/repository/') || url.pathname.startsWith('/storage/v1/object/authenticated/transcripts/repository/')) {
      if (profile.role !== 'admin') return send({ error: 'Forbidden', statusCode: '403' }, 403);
      const sourcePath = url.pathname.split('/transcripts/')[1];
      if (sourcePath === 'repository/catalog.json') return state.repository ? send(state.repository) : send({ error: 'Not found', statusCode: '404' }, 404);
      if (sourcePath === state.failRepositoryPath) return send({ error: 'Unavailable', statusCode: '500' }, 500);
      const source = state.repositoryFiles[sourcePath]; return source ? route.fulfill({ status: 200, contentType: 'application/json', body: source }) : send({ error: 'Not found', statusCode: '404' }, 404);
    }
    if (url.pathname.startsWith('/storage/v1/object/transcripts/')) return send({ Key: url.pathname });
    if(url.pathname==='/rest/v1/rpc/open_admin_annotation_assignment') {
      if(profile.role!=='admin')return send({message:'Admin required'},403);
      let row=assignments.find(row=>row.conversation_id===body.p_conversation_id&&row.annotator_id===userId&&row.task_type==='label');
      const baseline=state.baselines.find(baseline=>baseline.conversation_id===body.p_conversation_id);
      if(!row){row={id:crypto.randomUUID(),conversation_id:body.p_conversation_id,annotator_id:userId,rubric_hash:body.p_rubric_hash,task_type:'label',status:'not_started',revision:0,annotations:[],turn_ratings:{},updated_at:new Date().toISOString(),submitted_at:null};assignments.push(row);}
      if(baseline&&!row.baseline_id&&row.revision===0&&row.status==='not_started'&&row.annotations.length===0&&Object.keys(row.turn_ratings||{}).length===0){row.baseline_id=baseline.id;row.annotation_source='llm';row.rubric_hash=baseline.rubric_hash;row.annotations=structuredClone(baseline.annotations);}
      return send(row.id);
    }
    if(url.pathname==='/rest/v1/rpc/unassign_annotation_assignments') {
      if(profile.role!=='admin')return send({message:'Admin required'},403);
      const requested=body.p_assignments.map((item:any)=>({item,row:assignments.find(row=>row.id===item.id)}));
      if(requested.some(({item,row}:any)=>!row||row.revision!==item.revision))return send({message:'Annotation work changed. Review the refreshed assignment before unassigning.',code:'40001'},409);
      for(const {row} of requested){row.is_active=false;row.unassigned_at=new Date().toISOString();row.revision++;}
      return send({unassigned:requested.length});
    }
    if(url.pathname==='/rest/v1/rpc/create_annotation_assignments') {
      if(profile.role!=='admin')return send({message:'Admin required'},403);
      let created=0,skipped=0,restored=0;const assignmentIds=[];
      for(const conversation_id of body.p_conversation_ids)for(const annotator_id of body.p_annotator_ids){
        const existing=assignments.find(row=>row.conversation_id===conversation_id&&row.annotator_id===annotator_id);
        if(existing){if(existing.is_active===false){existing.is_active=true;existing.unassigned_at=null;existing.revision++;restored++;}else skipped++;continue;}
        const baseline=state.baselines.find(baseline=>baseline.id===body.p_baseline_ids?.[conversation_id]);
        if(body.p_baseline_ids?.[conversation_id]&&(!baseline||baseline.conversation_id!==conversation_id))return send({message:'Invalid baseline'},400);
        const row={id:crypto.randomUUID(),conversation_id,annotator_id,rubric_hash:baseline?.rubric_hash||body.p_rubric_hash,status:'not_started',revision:0,annotations:structuredClone(baseline?.annotations||[]),turn_ratings:{},baseline_id:baseline?.id||null,annotation_source:baseline?'llm':'blank',updated_at:new Date().toISOString(),submitted_at:null};assignments.push(row);assignmentIds.push(row.id);created++;
      }
      return send({created,skipped,restored,assignment_ids:assignmentIds});
    }
    if(url.pathname==='/rest/v1/rpc/create_task_assignments') {
      if(profile.role!=='admin')return send({message:'Admin required'},403);
      let created=0,skipped=0,restored=0;const assignmentIds=[];
      for(const conversation_id of body.p_conversation_ids)for(const task_type of body.p_task_types)for(const annotator_id of body.p_annotator_ids){
        const existing=assignments.find(row=>row.conversation_id===conversation_id&&row.annotator_id===annotator_id&&row.task_type===task_type);
        if(existing){if(existing.is_active===false){existing.is_active=true;existing.unassigned_at=null;existing.revision++;restored++;}else skipped++;continue;}
        const baseline=task_type==='label'?state.baselines.find(item=>item.id===body.p_baseline_ids?.[conversation_id]):null;
        if(task_type==='label'&&body.p_baseline_ids?.[conversation_id]&&(!baseline||baseline.conversation_id!==conversation_id))return send({message:'Invalid baseline'},400);
        const row={id:crypto.randomUUID(),conversation_id,annotator_id,rubric_hash:baseline?.rubric_hash||body.p_rubric_hash,task_type,status:'not_started',revision:0,annotations:structuredClone(baseline?.annotations||[]),turn_ratings:{},baseline_id:baseline?.id||null,annotation_source:baseline?'llm':'blank',updated_at:new Date().toISOString(),submitted_at:null};assignments.push(row);assignmentIds.push(row.id);created++;
      }
      return send({created,skipped,restored,assignment_ids:assignmentIds});
    }
    if (['/rest/v1/rpc/preview_conversation_deletion', '/rest/v1/rpc/delete_conversation'].includes(url.pathname)) {
      if (profile.role !== 'admin') return send({ message: 'Admin access required', code: '42501' }, 403);
      const document = documents.find(document => document.id === body.p_conversation_id);
      if (!document) return send({ message: 'Conversation no longer exists. Refresh the dashboard.', code: 'P0002' }, 404);
      const work = assignments.filter(row => row.conversation_id === document.id);
      const preview = { conversation_id: document.id, label: document.label, assignment_count: work.length, annotation_count: work.reduce((count, row) => count + row.annotations.length, 0), revision_count: work.reduce((count, row) => count + row.revision, 0), snapshot: createHash('md5').update(JSON.stringify({ document, work })).digest('hex') };
      if (url.pathname.endsWith('preview_conversation_deletion')) return send(preview);
      if (state.failNextDelete) { state.failNextDelete = false; return send({ message: 'Network unavailable. Refresh deletion details.', code: 'offline' }, 503); }
      if (body.p_expected_snapshot !== preview.snapshot) return send({ message: 'Conversation or annotations changed. Review the updated deletion details before confirming again.', code: '40001' }, 409);
      documents.splice(documents.indexOf(document), 1);
      for (let i = assignments.length - 1; i >= 0; i--) if (assignments[i].conversation_id === document.id) assignments.splice(i, 1);
      return send({ ...preview, deleted: true });
    }
    if (url.pathname === '/rest/v1/rpc/save_assignment') {
      if (state.failNextSave || state.failSaves) { state.failNextSave = false; return send({ message: 'Network unavailable. Retry saving.', code: 'offline' }, 500); }
      const row = assignments.find(a => a.id === body.p_assignment_id);
      if(row?.is_active===false)return send({message:'This assignment has been unassigned.'},403);
      if (!row || (row.annotator_id !== userId && profile.role !== 'admin')) return send({ message: 'Access denied' }, 403);
      if (row.revision !== body.p_revision) return send({ message: 'Revision conflict. Export your draft and reload the latest saved version before editing.', code: '40001' }, 409);
      if (row.status === 'submitted') return send({ message: 'Read only' }, 409);
      row.annotations = body.p_annotations; row.turn_ratings = body.p_turn_ratings ?? row.turn_ratings ?? {}; row.revision++; row.status = body.p_submit ? 'submitted' : 'in_progress'; row.submitted_at = body.p_submit ? new Date().toISOString() : null; row.updated_at = new Date().toISOString(); state.saves++;
      return send(row);
    }
    if (url.pathname === '/rest/v1/rpc/reopen_assignment') { if (profile.role !== 'admin') return send({ message: 'Admin required' }, 403); const row = assignments.find(a => a.id === body.p_assignment_id); if (!row || row.revision !== body.p_revision || row.status !== 'submitted') return send({ message: 'Assignment has changed or is not submitted', code: '40001' }, 409); row.status = 'in_progress'; row.revision++; row.submitted_at = null; return send(null); }
    let rows: any[] = [];
    if (url.pathname === '/rest/v1/profiles') rows = people.filter(p => profile.role === 'admin' || p.id === userId);
    if (url.pathname === '/rest/v1/conversations') { if (request.method() === 'POST') { documents.push({ id: crypto.randomUUID(), ...body, created_at: new Date().toISOString() }); return send(null, 201); } rows = documents; }
    if (url.pathname === '/rest/v1/conversation_details') rows = documents;
    if (url.pathname === '/rest/v1/comparison_pairs') rows = state.comparisonPairs;
    if (url.pathname === '/rest/v1/comparison_assignments') rows = state.comparisonAssignments;
    if (url.pathname === '/rest/v1/conversation_capture_assets') rows=state.captureAssets;
    if (url.pathname === '/rest/v1/conversation_capture_documents') rows=state.captureDocuments;
    if (url.pathname === '/rest/v1/rubric_versions') rows = [{ hash: rubric.rubric_sha256, snapshot: rubric }];
    if(url.pathname==='/rest/v1/llm_baselines')rows=state.baselines.filter(baseline=>profile.role==='admin'||assignments.some(row=>row.baseline_id===baseline.id&&row.annotator_id===userId));
    if(url.pathname==='/rest/v1/llm_generation_runs')rows=profile.role==='admin'?state.generationRuns:[];
    if(url.pathname==='/rest/v1/annotation_revisions')rows=[];
    if (url.pathname === '/rest/v1/assignments') {
      if (request.method() === 'POST') { const newRows = Array.isArray(body) ? body : [body]; assignments.push(...newRows.map((a: any) => ({ id: crypto.randomUUID(), task_type: 'label', ...a, status: 'not_started', revision: 0, annotations: [], turn_ratings: {}, updated_at: new Date().toISOString(), submitted_at: null }))); return send(null, 201); }
      rows = assignments.filter(a => profile.role === 'admin' || (a.annotator_id === userId && a.is_active!==false)).map(a => ({ ...a, is_active:a.is_active!==false, conversations: documents.find(d => d.id === a.conversation_id), profiles: people.find(p => p.id === a.annotator_id) }));
    }
    for (const [key, value] of url.searchParams) { if (value.startsWith('eq.')) rows = rows.filter(row => String(row[key]) === value.slice(3));if(value.startsWith('in.(')){const values=value.slice(4,-1).split(',');rows=rows.filter(row=>values.includes(String(row[key])));} }
    if (request.headers().accept?.includes('application/vnd.pgrst.object+json')) return rows[0] ? send(rows[0]) : send({ message: 'Not found' }, 406);
    return send(rows);
  });
  return state;
}
export async function login(page: Page, username: string) {
  await page.goto('/'); await page.getByLabel('Username', { exact: true }).fill(username); await page.getByLabel('Password', { exact: true }).fill('test-password-123'); await page.getByRole('button', { name: 'Sign in', exact: true }).click();
}
export function repositoryFixture() {
  const files: Record<string, string> = {};
  const entries = ['English', 'Tamil', 'Reviewed English translation'].map((condition, i) => {
    const conversationId = `00000000-0000-4000-8000-00000000002${i}`;
    const source = JSON.stringify({ conversation_id: conversationId, ...(i === 2 ? { source_conversation_id: '00000000-0000-4000-8000-000000000021' } : {}), learning_topic: 'Evaporation', messages: sample.messages });
    const hash = createHash('sha256').update(source).digest('hex');
    const id = createHash('sha256').update(condition + hash).digest('hex'); const storage_path = `repository/files/${id}.json`; files[storage_path] = source;
    return { id, label: `Evaporation ${condition}`, run_id: '20260930T200335588721Z', topic: 'Evaporation', topic_id: 'evaporation', language: i === 1 ? 'Tamil' : 'English', original_language: i === 0 ? 'English' : 'Tamil', version: i === 2 ? condition : 'Original', turn_count: sample.messages.length, source_relative_path: `simulated-conversation-openrouter/outputs/run/${condition}/conversation.json`, source_conversation_id: conversationId, file_sha256: hash, storage_path };
  });
  return { catalog: { format_version: 'annotation-portal-repository/1.0', generated_at: new Date().toISOString(), entries }, files };
}
export async function select(page: Page, turnId: string, quote: string) {
  await page.locator(`[data-turn-id="${turnId}"]`).evaluate((node, value) => {
    const text = node.textContent!, start = text.indexOf(value); if (start < 0) throw new Error('Selection quote missing');
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT); let offset = 0, first: Node | null = null, last: Node | null = null, firstOffset = 0, lastOffset = 0;
    while (walker.nextNode()) { const child = walker.currentNode, end = offset + child.textContent!.length; if (!first && start >= offset && start < end) { first = child; firstOffset = start - offset; } if (start + value.length > offset && start + value.length <= end) { last = child; lastOffset = start + value.length - offset; break; } offset = end; }
    const range = document.createRange(); range.setStart(first!, firstOffset); range.setEnd(last!, lastOffset); const selection = window.getSelection()!; selection.removeAllRanges(); selection.addRange(range); node.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  }, quote);
}
export async function rateAllTutorTurns(page: Page) {
  const panel = page.getByRole('complementary', { name: 'Tutor turn ratings' });
  while (true) {
    await rateCurrentTutorTurn(page);
    const next = panel.getByRole('button', { name: 'Next', exact: true }).first();
    if (!(await next.count()) || await next.isDisabled()) break;
    await next.click();
  }
}
export async function rateCurrentTutorTurn(page: Page) {
  const panel = page.getByRole('complementary', { name: 'Tutor turn ratings' });
  for (const group of await panel.locator('.rating-options').all()) await group.getByRole('button').first().click();
}
