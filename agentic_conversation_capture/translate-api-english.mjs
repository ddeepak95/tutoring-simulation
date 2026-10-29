import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translateCaptureToEnglish } from './translate-english.mjs';
import { preflightPortal } from './direct-api-conversation.mjs';
import { loadSupabaseEnvironment } from '../annotation-portal/scripts/load-supabase-env.mjs';
import {numbersEquivalent} from './numeric-text.mjs';

const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const directory = path.dirname(fileURLToPath(import.meta.url));

export function translationPassages(source, sections) {
  const passages = [{ id: 'title', text: source.topic_english_name || source.topic_name || source.label }];
  for (const turn of source.messages) {
    if (turn.speaker === 'student') passages.push({ id: turn.turn_id, turn_id: turn.turn_id, text: turn.text });
    else {
      const ranges = sections.filter(s => s.turn_id === turn.turn_id).sort((a, b) => a.start - b.start);
      if (!ranges.length) throw Error(`Register source sections before translating ${turn.turn_id}`);
      let previous = 0;
      for (const section of ranges) {
        if (section.start < previous || section.end <= section.start || section.end > turn.text.length || turn.text.slice(section.start, section.end) !== section.quote) throw Error('Source section offsets or quote do not match');
        if (turn.text.slice(previous, section.start).replace(/[-*_\s]/g, '')) throw Error('Source sections leave untranslated text');
        passages.push({ id: section.section_id, turn_id: turn.turn_id, text: section.quote });
        previous = section.end;
      }
      if (turn.text.slice(previous).replace(/[-*_\s]/g, '')) throw Error('Source sections leave untranslated text');
    }
  }
  if (new Set(passages.map(p => p.id)).size !== passages.length) throw Error('Translation passage IDs must be unique');
  return passages;
}

export function assembleTranslation(source, sections, passages, { id, model, generatedAt }) {
  const expected = translationPassages(source, sections);
  if (passages.length !== expected.length || passages.some((p, i) => p.id !== expected[i].id || !p.text?.trim())) throw Error('English passages do not match the source inventory');
  for (const [index, passage] of passages.entries()) {
    const original = expected[index].text;
    if (!numbersEquivalent(original,passage.text)) throw Error(`Numbers changed in ${passage.id}`);
    for (const url of original.match(/https?:\/\/[^\s<>"']+/g) || []) if (!passage.text.includes(url)) throw Error(`URL changed in ${passage.id}`);
  }
  const byId = new Map(passages.map(p => [p.id, p.text]));
  const alignment = [], englishSections = [];
  const messages = source.messages.map(turn => {
    if (turn.speaker === 'student') return { ...turn, text: byId.get(turn.turn_id) };
    let text = '';
    for (const section of sections.filter(s => s.turn_id === turn.turn_id).sort((a, b) => a.section_number - b.section_number)) {
      if (text) text += '\n\n';
      const start = text.length;
      text += byId.get(section.section_id);
      alignment.push({ segment_id: section.section_id, turn_id: turn.turn_id, start, end: text.length, source_start: section.start, source_end: section.end, kind: 'section' });
      englishSections.push({ turn_id: turn.turn_id, turn_number: section.turn_number, section_number: section.section_number, start, end: text.length });
    }
    return { ...turn, text };
  });
  const title = byId.get('title');
  return { conversation: {
    conversation_id: id, label: title, learning_topic: title, language: 'en', original_language: source.original_language || source.language,
    topic_id: source.topic_id, topic_name: source.topic_name, topic_english_name: source.topic_english_name,
    source_conversation_id: source.conversation_id, provider: source.provider, access_type: 'API', messages,
    translation: { version: 'api-english/1', sha256: hash({ source: source.messages, sections, passages, model }), model, generated_at: generatedAt, source_messages: source.messages, alignment },
  }, sections: englishSections };
}

export async function translateApiEnglish(sourceId, {project,fetcher=fetch,outputRoot=path.join(directory, 'outputs/api'),model=process.env.TRANSLATION_MODEL || 'gemini-4-argon'} = {}) {
  if (!/^[a-f0-9-]{36}$/i.test(sourceId || '') || !project) throw Error('A source conversation ID and project are required.');
  for (const file of [path.join(directory, '..', '.env'), path.join(directory, '.env.local'), path.join(directory, '..', 'annotation-portal/.env.local')]) {
    try { process.loadEnvFile(file); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  loadSupabaseEnvironment();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const { base, adminId } = await preflightPortal({ supabaseUrl: process.env.VITE_SUPABASE_URL, serviceRoleKey: key, project });
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  async function request(route, body) {
    const response = await fetch(base + '/rest/v1/' + route, { method: body ? 'POST' : 'GET', headers: { ...headers, Prefer: 'return=representation' }, ...(body ? { body: JSON.stringify(body) } : {}) });
    if (!response.ok) throw Error(`Portal returned HTTP ${response.status} for ${route.split('?')[0]}`);
    return response.json();
  }
  const [row] = await request(`conversation_details?id=eq.${sourceId}&select=transcript`);
  const source = row?.transcript;
  if (!source || source.access_type !== 'API' || source.translation || /^(en|english)$/i.test(source.language || '')) throw Error('Choose an original non-English API conversation');
  const sections = await request(`conversation_sections?conversation_id=eq.${sourceId}&select=section_id,turn_id,turn_number,section_number,start,end,quote&order=turn_number,section_number`);
  const passages = translationPassages(source, sections);
  const sourceHash = hash({ source, sections, model, version: 'api-english/1' });
  const output = path.join(outputRoot, source.topic_id, source.language, `${sourceId}.english.json`);
  await mkdir(path.dirname(output), { recursive: true });
  let checkpoint;
  try { checkpoint = JSON.parse(await readFile(output, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (checkpoint && checkpoint.source_hash !== sourceHash) throw Error('Existing translation checkpoint belongs to different source text, sections, or model');
  checkpoint ||= { source_hash: sourceHash, id: randomUUID(), generated_at: new Date().toISOString() };
  const save = () => writeFile(output, JSON.stringify(checkpoint, null, 2) + '\n');
  await save();
  if (!checkpoint.result) {
    const translated = await translateCaptureToEnglish({ format_version: 'api-section-translation/1', passages }, {
      model, fetcher, checkpoint: checkpoint.progress,
      onCheckpoint: async progress => { checkpoint.progress = structuredClone(progress); await save(); console.log(`Translated ${Object.keys(progress.passages).length}/${passages.length} passages`); },
    });
    checkpoint.result = assembleTranslation(source, sections, translated.passages, { id: checkpoint.id, model, generatedAt: checkpoint.generated_at });
    checkpoint.usage = translated.usage;
    await save();
  }
  const { conversation, sections: candidates } = checkpoint.result;
  const storagePath = `api-generated/${conversation.conversation_id}.english.json`;
  const bytes = JSON.stringify(checkpoint.result, null, 2) + '\n';
  const storageUrl = `${base}/storage/v1/object/transcripts/${storagePath}`;
  const upload = await fetch(storageUrl, { method: 'POST', headers: { ...headers, 'x-upsert': 'false' }, body: bytes });
  if (!upload.ok) {
    if (![400, 409].includes(upload.status)) throw Error(`Translation storage returned HTTP ${upload.status}`);
    const existing = await fetch(storageUrl, { headers });
    if (!existing.ok || await existing.text() !== bytes) throw Error('Stored translation differs from this artifact');
  }
  const id = conversation.conversation_id;
  const existing = await request(`conversation_details?id=eq.${id}&select=transcript,source_conversation_id`);
  if (!existing.length) await request('conversations', { id, label: conversation.label, language: 'en', topic_id: source.topic_id, transcript: conversation, source_conversation_id: sourceId, source_path: storagePath, created_by: adminId });
  const [saved] = await request(`conversation_details?id=eq.${id}&select=transcript,source_conversation_id`);
  if (saved?.source_conversation_id !== sourceId || saved?.transcript.translation?.sha256 !== conversation.translation.sha256 || JSON.stringify(saved.transcript.messages.map(t => [t.turn_id,t.speaker,t.text])) !== JSON.stringify(conversation.messages.map(t => [t.turn_id,t.speaker,t.text]))) throw Error('Could not verify the saved English translation');
  const registered = await request('rpc/register_conversation_sections', { p_conversation_id: id, p_sections: candidates });
  if (registered.length !== sections.length || registered.some((s, i) => s.section_id !== sections[i].section_id || s.start !== candidates[i].start || s.end !== candidates[i].end || s.quote !== conversation.messages.find(t => t.turn_id === s.turn_id)?.text.slice(s.start, s.end))) throw Error('English section mapping verification failed');
  checkpoint.uploaded = { conversation_id: id, source_conversation_id: sourceId, sections: registered.length };
  await save();
  console.log(JSON.stringify({ ...checkpoint.uploaded, artifact: output }));
  return {...checkpoint.uploaded,artifact:output};
}

async function main(args) {
  const [sourceId,flag,project]=args;
  if(flag!=='--project'||args.length!==3)throw Error('Usage: node translate-api-english.mjs SOURCE_CONVERSATION_ID --project PROJECT_REF');
  return translateApiEnglish(sourceId,{project});
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
