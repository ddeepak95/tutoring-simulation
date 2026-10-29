import { readFile } from 'node:fs/promises';
import { createHash,randomUUID } from 'node:crypto';
import {withCaptureDOM,verifyPackage,packageHash,hash} from './html-sections.mjs';
import {validateHtmlConversation} from '../annotation-portal/src/html-conversation.ts';
import path from 'node:path';
import { modelConversationHtml } from '../annotation-portal/server/model-conversation-html.ts';
import { htmlStructuralRanges } from '../annotation-portal/server/html-structure.ts';
import {numberSequences,numbersEquivalent} from './numeric-text.mjs';

function validPassage(source,target){
  if(typeof target!=='string'||!target.trim())return false;
  const tokens=s=>s.match(/\{\{(?:OPEN|CLOSE|NODE):[a-z]+\}\}/g)||[];
  if(JSON.stringify(tokens(source).sort())!==JSON.stringify(tokens(target).sort())||!numbersEquivalent(source,target))return false;
  const stack=[];for(const token of tokens(target)){const [,kind,name]=token.match(/\{\{(OPEN|CLOSE|NODE):([a-z]+)\}\}/);if(kind==='OPEN')stack.push(name);else if(kind==='CLOSE'&&stack.pop()!==name)return false;}return stack.length===0;
}

export function translationSourceHash(capture) {
  if(capture.format_version==='html-conversation/2')return capture.version_hash;
  return createHash('sha256').update(JSON.stringify({ title: capture.title, topic: capture.topic, language: capture.language,
    turns: capture.turns.map(({ turn_id, speaker, text, html }) => ({ turn_id, speaker, text, html })) })).digest('hex');
}

async function geminiKey() {
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  for (const file of [path.join(import.meta.dirname,'.env.local'),path.join(import.meta.dirname,'..','annotation-portal','.env.local'),path.join(import.meta.dirname,'..','.env')]) {
    let contents;
    try { contents = await readFile(file, 'utf8'); } catch { continue; }
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*(GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*(.*?)\s*$/);
      if (match && match[2]) return match[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
  throw new Error('Set GEMINI_API_KEY or GOOGLE_API_KEY locally to translate to English');
}

export async function translateCaptureToEnglish(capture, { fetcher = fetch, apiKey, model = process.env.TRANSLATION_MODEL || 'gemini-4-argon', withAnchors = false,checkpoint,onCheckpoint=async()=>{} } = {}) {
  if (!/^gemini-[a-z0-9.-]+$/.test(model)) throw new Error('TRANSLATION_MODEL must name a Gemini model');
  const key = apiKey || await geminiKey();
  const usage={...(checkpoint?.usage||{})};
  const recordUsage=value=>{for(const [key,n] of Object.entries(value||{}))if(typeof n==='number')usage[key]=(usage[key]||0)+n;};
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
      recordUsage(result.usageMetadata);
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
      systemInstruction: { parts: [{ text: 'You are translating a JSON array of complete text passages into faithful, fluent, natural English. Return a JSON array of strings with exactly one translation per input element, in the same order. Translate only linguistic content. Preserve all information, equations, numbers, URLs, citations, answer labels, and question and answer order. Do not merge, omit, or add passages. Tokens {{OPEN:name}} and {{CLOSE:name}} delimit original inline formatting; {{NODE:name}} represents an original equation, image, or other protected element. Preserve every token exactly once, keep formatting balanced, and translate the entire passage grammatically around them. You may move an inline phrase/token pair within its passage when English word order requires it. Never translate token names or add markup.' + (capture.format_version==='api-section-translation/1' ? ' These are Markdown sections. Preserve all existing Markdown headings, lists, tables, code fences, links, and TeX delimiters and commands exactly. Translate natural-language labels inside TeX text macros and diagrams into English, retaining all mathematical notation, units, and numerical values in their original order. Do not add introductions, explanations, or additional headings.' : '') }] },
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
      recordUsage(result.usageMetadata);
      const candidate = result.candidates?.[0];
      const raw = candidate?.content?.parts?.filter(part => !part.thought).map(part => part.text || '').join('');
      let translated;
      try { translated = JSON.parse(raw); } catch { /* retry malformed JSON */ }
      if (candidate?.finishReason === 'STOP' && Array.isArray(translated) && translated.length === items.length &&
          translated.every(value => typeof value === 'string' && value.trim()) &&
          (!['html-conversation/2','api-section-translation/1'].includes(capture.format_version)||items.every((value,index)=>validPassage(value,translated[index]))) &&
          items.every((value, index) => (value.match(/https?:\/\/[^\s<>"']+/g) || []).every(url => translated[index].includes(url)))) return translated;
      if (attempt === 2) {
        const invalid=Array.isArray(translated)?items.findIndex((value,index)=>!validPassage(value,translated[index])||!(value.match(/https?:\/\/[^\s<>"']+/g)||[]).every(url=>translated[index]?.includes(url))):-1;
        const detail=items.length===1&&Array.isArray(translated)?` source_numbers=${JSON.stringify(numberSequences(items[0]))} target_numbers=${JSON.stringify(numberSequences(translated[0]||''))} target_excerpt=${JSON.stringify((translated[0]||'').slice(0,600))}`:'';
        throw new Error(`Gemini returned incomplete or misaligned translations for ${label} (input ${items.length}, output ${Array.isArray(translated)?translated.length:'invalid JSON'}, first invalid ${invalid}, reason ${candidate?.finishReason||'unknown'})${detail}`);
      }
    }
  }
  if(capture.format_version==='api-section-translation/1'){
    const originals=new Map(capture.passages.map(passage=>[passage.id,passage.text]));
    const translated=Object.fromEntries(Object.entries(checkpoint?.passages||{}).filter(([id,value])=>{
      const source=originals.get(id);
      return source&&validPassage(source,value)&&(source.match(/https?:\/\/[^\s<>"']+/g)||[]).every(url=>value.includes(url));
    }));
    const pending=capture.passages.filter(passage=>!translated[passage.id]);
    async function translateApiBatch(batch){
      let values;
      try { values=await translateBatch(batch.map(passage=>passage.text),'API sections'); }
      catch(error){
        if(!error.message.includes('incomplete or misaligned')||batch.length===1)throw error;
        const middle=Math.floor(batch.length/2);
        await translateApiBatch(batch.slice(0,middle));
        await translateApiBatch(batch.slice(middle));
        return;
      }
      values.forEach((value,index)=>{translated[batch[index].id]=value;});
      await onCheckpoint({passages:translated,usage});
    }
    for(let from=0;from<pending.length;){
      let to=from,chars=0;
      while(to<pending.length&&to-from<20&&(chars+pending[to].text.length<=6000||to===from))chars+=pending[to++].text.length;
      const batch=pending.slice(from,to);
      await translateApiBatch(batch);
      from=to;
    }
    return {passages:capture.passages.map(passage=>({...passage,text:translated[passage.id]})),model,usage};
  }
  if(capture.format_version==='html-conversation/2'){
    await verifyPackage(capture);
    return withCaptureDOM(async page=>{
      if(checkpoint&&(checkpoint.source_hash!==capture.version_hash||checkpoint.model!==model||checkpoint.version!=='html-dom-translation/2'))throw Error('Translation checkpoint differs from its source, prompt or model.');
      const progress=checkpoint||{version:'html-dom-translation/2',source_hash:capture.version_hash,model,translations:[]};
      const translated=structuredClone(capture),cache=new Map(progress.translations.filter(([source,target])=>validPassage(source,target)));
      async function texts(items,label){
        const missing=[...new Set(items.filter(s=>s.trim()&&!cache.has(s)))];
        for(let from=0;from<missing.length;){let to=from,chars=0;while(to<missing.length&&to-from<20&&(chars+missing[to].length<=6000||to===from))chars+=missing[to++].length;
          const originals=missing.slice(from,to),values=await translateBatch(originals,label);
          originals.forEach((original,i)=>{
            if(JSON.stringify(original.match(/\d+(?:[.,]\d+)*/g)||[])!==JSON.stringify(values[i].match(/\d+(?:[.,]\d+)*/g)||[]))throw Error(`Translation changed numeric content in ${label}.`);
            const leading=original.match(/^\s*/)[0],trailing=original.match(/\s*$/)[0];cache.set(original,leading+values[i].trim()+trailing);
          });progress.translations=[...cache.entries()];progress.usage={...usage};await onCheckpoint(structuredClone(progress));from=to;
        }return items.map(s=>s.trim()?cache.get(s):s);
      }
      async function html(value,label){
        if(!value)return value;
        const units=await page.evaluate(value=>globalThis.CaptureSections.translationUnits(value),value);
        const values=await texts(units.map(u=>u.text),label);
        return page.evaluate(({value,units,values})=>globalThis.CaptureSections.applyTranslations(value,units,values),{value,units,values});
      }
      const markup=capture.turns.flatMap(t=>[t.html,...t.sections.flatMap(s=>[s.html,...s.components.flatMap(c=>c.states.map(v=>v.html))])]);
      const passages=await page.evaluate(markup=>markup.flatMap(value=>globalThis.CaptureSections.translationUnits(value).map(u=>u.text)),markup);
      await texts([capture.metadata.title,capture.metadata.topic,...capture.turns.flatMap(t=>t.sections.flatMap(s=>s.heading?[s.heading]:[])),...(capture.image_inventory||[]).map(i=>i.alt),...passages],'conversation passages');
      const [title,topic]=await texts([capture.metadata.title,capture.metadata.topic],'metadata');
      translated.metadata={...capture.metadata,title,topic,language:'en'};
      for(const image of translated.image_inventory||[])if(image.alt.trim())image.alt=(await texts([image.alt],'image metadata'))[0];
      for(const turn of translated.turns){turn.html=await html(turn.html,turn.turn_id);for(const section of turn.sections){
        section.html=await html(section.html,section.section_id);
        if(section.heading)section.heading=(await texts([section.heading],section.section_id))[0];
        for(const component of section.components)for(const state of component.states){state.html=await html(state.html,state.state_id);state.sha256=hash(state.html);}
      }}
      translated.capture_id=randomUUID();translated.source_version={capture_id:capture.capture_id,version_hash:capture.version_hash,language:capture.metadata.language};
      translated.translation_info={model,prompt_version:'html-dom-translation/2',usage};
      translated.version_hash=packageHash(translated);validateHtmlConversation(translated,{source:capture});return translated;
    });
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
