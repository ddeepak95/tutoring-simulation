import { loadSupabaseEnvironment } from './load-supabase-env.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const input = args.shift();
if (!input) throw Error('Usage: node scripts/preview-api-sections.mjs ARTIFACT.json [--register --project PROJECT_REF]');
const register = args[0] === '--register';
if (args.length && (!register || args.length !== 3 || args[1] !== '--project')) throw Error('Expected --register --project PROJECT_REF');
const file = path.resolve(input);
const artifact = JSON.parse(await readFile(file, 'utf8'));
if (artifact.status !== 'completed' || artifact.conversation?.access_type !== 'API') throw Error('Use a completed direct API artifact');
const conversation = artifact.conversation;
const server = await createServer({ root, configFile: false, plugins: [react()], optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true, watch: null }, appType: 'custom' });
try {
  const { sectionCandidates } = await server.ssrLoadModule('/src/section-registry.ts');
  const { MarkdownTranscript } = await server.ssrLoadModule('/src/MarkdownTranscript.tsx');
  const candidates = sectionCandidates(conversation);
  let sections = candidates.map(s => ({ ...s, section_id: `t${s.turn_number}s${s.section_number}`, quote: conversation.messages.find(t => t.turn_id === s.turn_id).text.slice(s.start, s.end) }));
  if (register) {
    loadSupabaseEnvironment();
    const base = new URL(process.env.VITE_SUPABASE_URL).origin;
    if (process.env.SUPABASE_TARGET === 'local' ? args[2] !== 'local' : new URL(base).hostname !== `${args[2]}.supabase.co`) throw Error('--project must match the configured portal (use --project local for local Supabase)');
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!key) throw Error('Set SUPABASE_SERVICE_ROLE_KEY in annotation-portal/.env.local');
    const request = async (route, body) => {
      const response = await fetch(base + '/rest/v1/' + route, { method: body ? 'POST' : 'GET', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
      if (!response.ok) throw Error(`Portal returned HTTP ${response.status}`);
      return response.json();
    };
    const [saved] = await request(`conversation_details?id=eq.${conversation.conversation_id}&select=transcript`);
    if (!saved || saved.transcript.messages.length !== conversation.messages.length || conversation.messages.some((turn, i) => ['turn_id', 'speaker', 'text'].some(key => turn[key] !== saved.transcript.messages[i][key]))) throw Error('Portal transcript differs from the local artifact');
    // The existing RPC returns the pinned inventory if one already exists.
    sections = await request('rpc/register_conversation_sections', { p_conversation_id: conversation.conversation_id, p_sections: candidates });
    const verified = await request(`conversation_sections?conversation_id=eq.${conversation.conversation_id}&select=*&order=turn_number,section_number`);
    if (verified.length !== sections.length || verified.some((s, i) => s.section_id !== sections[i].section_id || s.start !== sections[i].start || s.end !== sections[i].end || s.quote !== conversation.messages.find(t => t.turn_id === s.turn_id)?.text.slice(s.start, s.end))) throw Error('Saved section verification failed');
    sections = verified;
  }
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const output = path.join(path.dirname(file), 'sections-preview.html');
  const css = path.relative(path.dirname(output), path.join(root, 'node_modules/katex/dist/katex.min.css')).replaceAll('\\', '/');
  let turnNumber = 0;
  const body = conversation.messages.map(turn => {
    if (turn.speaker === 'tutor') turnNumber++;
    return `<article class="turn ${turn.speaker}"><h2>${turn.speaker === 'tutor' ? `Tutor turn ${turnNumber}` : 'Student'}</h2>${renderToStaticMarkup(createElement(MarkdownTranscript, { text: turn.text, turnId: turn.turn_id, annotations: [], rubric: [], readonly: true, onHighlight() {}, sectionLabels: turn.speaker === 'tutor', apiSections: true, turnNumber, sections }))}</article>`;
  }).join('\n');
  await writeFile(output, `<!doctype html><html lang="${escape(conversation.language)}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>API section preview</title><link rel="stylesheet" href="${escape(css)}"><style>${await readFile(path.join(root, 'src/styles.css'), 'utf8')}body{margin:auto;padding:24px;max-width:960px}.turn{margin:24px 0}.student{background:#f1f5f9;padding:12px}h1{font-size:24px}</style><h1>${escape(conversation.label)} — section preview</h1><p>${sections.length} sections across ${turnNumber} tutor turns. Original responses preserved.</p>${body}</html>`, 'utf8');
  await writeFile(path.join(path.dirname(file), 'sections-preview.json'), JSON.stringify({ conversation_id: conversation.conversation_id, registered: register, sections }, null, 2) + '\n');
  console.log(JSON.stringify({ preview: output, registered: register, conversation_id: conversation.conversation_id, turns: [...new Set(sections.map(s => s.turn_number))].map(turn => ({ turn, sections: sections.filter(s => s.turn_number === turn).length })), total_sections: sections.length }));
} finally { await server.close(); }
