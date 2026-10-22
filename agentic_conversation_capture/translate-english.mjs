import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { modelConversationHtml } from '../annotation-portal/server/model-conversation-html.ts';
import { htmlStructuralRanges } from '../annotation-portal/server/html-structure.ts';

export function translationSourceHash(capture) {
  return createHash('sha256').update(JSON.stringify({ title: capture.title, topic: capture.topic, language: capture.language,
    turns: capture.turns.map(({ turn_id, speaker, text, html }) => ({ turn_id, speaker, text, html })) })).digest('hex');
}

async function geminiKey() {
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  for (const directory of [import.meta.dirname, path.join(import.meta.dirname, '..', 'annotation-portal')]) {
    let contents;
    try { contents = await readFile(path.join(directory, '.env.local'), 'utf8'); } catch { continue; }
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*(GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*(.*?)\s*$/);
      if (match && match[2]) return match[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
  throw new Error('Set GEMINI_API_KEY or GOOGLE_API_KEY locally to translate to English');
}

export async function translateCaptureToEnglish(capture, { fetcher = fetch, apiKey, model = process.env.TRANSLATION_MODEL || 'gemini-4-argon', withAnchors = false } = {}) {
  if (!/^gemini-[a-z0-9.-]+$/.test(model)) throw new Error('TRANSLATION_MODEL must name a Gemini model');
  const key = apiKey || await geminiKey();
  async function translate(text, label) {
    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: 'Translate the supplied text into faithful, natural English. Translate only linguistic content. Preserve all information, equations, numbers, URLs, citations, answer labels, and the order of questions and answer options. Do not add commentary or omit content. Return only the translated text.' }] },
      contents: [{ role: 'user', parts: [{ text }] }],
      generationConfig: { ...(model === 'gemini-4-argon' ? {} : { temperature: 0 }), maxOutputTokens: 65536,
        ...(model === 'gemini-4-argon' ? { thinkingConfig: { thinkingLevel: 'MEDIUM', includeThoughts: false } } : {}) },
    });
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
        body, signal: AbortSignal.timeout(600000),
      });
      if (!response.ok) {
        if ([429, 500, 502, 503, 504].includes(response.status) && attempt < 2) { await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt)); continue; }
        throw new Error(`Gemini translation failed for ${label} (HTTP ${response.status}): ${(await response.text()).slice(0, 200)}`);
      }
      const result = await response.json();
      const candidate = result.candidates?.[0];
      const translated = candidate?.content?.parts?.filter(part => !part.thought).map(part => part.text || '').join('').trim();
      if (candidate?.finishReason !== 'STOP' || !translated) throw new Error(`Gemini returned an incomplete translation for ${label}`);
      for (const url of text.match(/https?:\/\/[^\s<>"']+/g) || []) if (!translated.includes(url)) throw new Error(`Gemini changed a URL in ${label}`);
      return translated;
    }
  }
  async function translateBatch(items, label) {
    if (!items.length) return [];
    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: 'You are translating a JSON array of text passages into faithful, natural English. Return a JSON array of strings with exactly one translation per input element, in the same order. Translate only linguistic content. Preserve all information, equations, numbers, URLs, citations, answer labels, and question and answer order. Do not merge, omit, or add passages.' }] },
      contents: [{ role: 'user', parts: [{ text: JSON.stringify(items) }] }],
      generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 65536,
        ...(model === 'gemini-4-argon' ? { thinkingConfig: { thinkingLevel: 'MEDIUM', includeThoughts: false } } : { temperature: 0 }) },
    });
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' }, body, signal: AbortSignal.timeout(600000),
      });
      if (!response.ok) {
        if ([429, 500, 502, 503, 504].includes(response.status) && attempt < 2) { await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt)); continue; }
        throw new Error(`Gemini translation failed for ${label} (HTTP ${response.status}): ${(await response.text()).slice(0, 200)}`);
      }
      const result = await response.json();
      const candidate = result.candidates?.[0];
      const raw = candidate?.content?.parts?.filter(part => !part.thought).map(part => part.text || '').join('');
      let translated;
      try { translated = JSON.parse(raw); } catch { /* retry malformed JSON */ }
      if (candidate?.finishReason === 'STOP' && Array.isArray(translated) && translated.length === items.length &&
          translated.every(value => typeof value === 'string' && value.trim()) &&
          items.every((value, index) => (value.match(/https?:\/\/[^\s<>"']+/g) || []).every(url => translated[index].includes(url)))) return translated;
      if (attempt === 2) throw new Error(`Gemini returned incomplete or misaligned translations for ${label}`);
    }
  }
  const title = await translate(capture.title, 'title');
  const topic = capture.topic === capture.title ? title : await translate(capture.topic, 'topic');
  const turns = [];
  const alignment = [];
  const sourceModel = withAnchors ? modelConversationHtml(
    { messages: capture.turns.map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })) },
    Object.fromEntries(capture.turns.map(turn => [turn.turn_id, turn.html || ''])),
    capture.turns.flatMap(turn => [...(turn.html || '').matchAll(/<img\b/gi)].map((_, index) => ({ id: `${turn.turn_id}-image-${index + 1}`, turn_id: turn.turn_id }))),
  ) : null;
  for (const turn of capture.turns) {
    if (!sourceModel) { turns.push({ turn_id: turn.turn_id, speaker: turn.speaker, text: await translate(turn.text, turn.turn_id) }); continue; }
    const sourceSegments = sourceModel.segments.filter(segment => segment.turn_id === turn.turn_id);
    const tableHeaders = htmlStructuralRanges(turn.html || '', turn.text).filter(range => range.kind === 'table_header');
    const nonoverlapping = [...sourceSegments].filter(segment => segment.kind !== 'visual' && segment.end > segment.start)
      .sort((a, b) => a.start - b.start || b.end - a.end).filter((segment, index, sorted) => !sorted.slice(0, index).some(previous => previous.start <= segment.start && previous.end > segment.start));
    const units = [];
    const addUncovered = (start, end) => {
      const gap = turn.text.slice(start, end);
      for (const line of gap.matchAll(/[^\n]*(?:\n|$)/g)) {
        if (!line[0]) continue;
        units.push({ source_start: start + line.index, source_end: start + line.index + line[0].length,
          text: line[0], uncovered: true });
      }
    };
    let cursor = 0;
    for (const segment of nonoverlapping) {
      if (segment.start < cursor) continue;
      if (segment.start > cursor) addUncovered(cursor, segment.start);
      units.push({ source_start: segment.start, source_end: segment.end, text: turn.text.slice(segment.start, segment.end) });
      cursor = segment.end;
    }
    if (cursor < turn.text.length) addUncovered(cursor, turn.text.length);
    if (!units.length) units.push({ source_start: 0, source_end: turn.text.length, text: turn.text });
    const pieces = units.map(unit => {
      const match = unit.text.match(/^(\s*)([\s\S]*?)(\s*)$/u);
      return { leading: match[1], content: match[2], trailing: match[3] };
    });
    const translatedPieces = new Array(pieces.length).fill('');
    const active = pieces.map((piece, index) => ({ index, content: piece.content })).filter(piece => piece.content);
    for (let from = 0; from < active.length;) {
      let to = from, chars = 0;
      while (to < active.length && to - from < 20 && (chars + active[to].content.length <= 6000 || to === from)) chars += active[to++].content.length;
      const translated = await translateBatch(active.slice(from, to).map(piece => piece.content), `${turn.turn_id} passages ${from + 1}-${to}`);
      translated.forEach((value, index) => { translatedPieces[active[from + index].index] = value; });
      from = to;
    }
    let english = '';
    for (const [index, unit] of units.entries()) {
      const { leading, trailing } = pieces[index];
      unit.start = english.length;
      english += leading + translatedPieces[index] + trailing;
      unit.end = english.length;
    }
    for (const segment of sourceSegments.filter(segment => segment.kind !== 'visual')) {
      const covered = units.filter(unit => unit.source_start < segment.end && unit.source_end > segment.start);
      if (!covered.length) continue;
      alignment.push({ segment_id: segment.segment_id, turn_id: turn.turn_id, start: covered[0].start,
        end: covered.at(-1).end, source_start: segment.start, source_end: segment.end,
        kind: tableHeaders.some(range => segment.start >= range.start && segment.end <= range.end) ? 'table_header' : segment.kind });
    }
    let extraIndex = Math.max(0, ...sourceSegments.map(segment => Number(segment.segment_id.match(/:s(\d+)$/)?.[1] || 0)));
    for (const unit of units.filter(unit => unit.uncovered)) {
      const original = unit.text.match(/^([^=\n]+?=\s*)([^\n]+?)(\s*)$/u);
      const translated = english.slice(unit.start, unit.end).match(/^([^=\n]+?=\s*)([^\n]+?)(\s*)$/u);
      if (!original || !translated || !/[^\x00-\x7f]/u.test(original[2]) || !translated[2].trim()) continue;
      const sourceStart = unit.source_start + original[1].length;
      const start = unit.start + translated[1].length;
      alignment.push({ segment_id: `${turn.turn_id}:s${String(++extraIndex).padStart(4, '0')}`,
        turn_id: turn.turn_id, start, end: start + translated[2].length,
        source_start: sourceStart, source_end: sourceStart + original[2].length, kind: 'paragraph' });
    }
    turns.push({ turn_id: turn.turn_id, speaker: turn.speaker, text: english });
  }
  return { title, topic, turns, ...(sourceModel ? { alignment } : {}) };
}
