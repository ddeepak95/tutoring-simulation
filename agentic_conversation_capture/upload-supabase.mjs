import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { translateCaptureToEnglish, translationSourceHash } from './translate-english.mjs';
import {uploadHtmlPackage} from './upload-html.mjs';
import { parseEnv } from 'node:util';
import { resolveSupabaseEnvironment } from '../annotation-portal/scripts/supabase-environment.mjs';

const maxArchiveBytes = 8 * 1024 * 1024;
const maxImageBytes = 10 * 1024 * 1024;
const imageTypes = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif', 'image/bmp', 'image/svg+xml']);

async function loadLocalEnvironment() {
  const file = path.join(import.meta.dirname, '.env.local');
  let contents;
  try { contents = await readFile(file, 'utf8'); } catch { return; }
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || match[1].startsWith('#') || process.env[match[1]] !== undefined) continue;
    process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

function attachTurnIds(html, turns) {
  let index = 0;
  return html.replace(/<article\b[^>]*>/gi, (openingTag) => {
    if (!/class\s*=\s*["'][^"']*\bcapture-message\b/i.test(openingTag)) return openingTag;
    const turn = turns[index++];
    if (!turn || /\bdata-turn-id\s*=/i.test(openingTag)) return openingTag;
    const speaker = turn.speaker === 'tutor' ? 'tutor' : 'student';
    return openingTag.replace(/>$/, ` data-turn-id="${turn.turn_id}" data-speaker="${speaker}">`);
  });
}

function requireSetting(name, fallback) {
  const value = process.env[name] || (fallback && process.env[fallback]);
  if (!value) throw new Error(`Set ${name}${fallback ? ` or ${fallback}` : ''} before uploading`);
  return value;
}

export async function portalPublicConfig() {
  await loadLocalEnvironment();
  const file = path.join(import.meta.dirname, '..', 'annotation-portal', '.env.local');
  let values = {};
  try {
    const contents = await readFile(file, 'utf8');
    values = parseEnv(contents);
  } catch { }
  const selected = resolveSupabaseEnvironment({ ...values, ...process.env });
  const supabaseUrl = (selected.SUPABASE_URL || '').replace(/\/$/, '');
  const publicKey = selected.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !publicKey) throw new Error('Configure the portal Supabase URL and publishable key');
  return { supabaseUrl, publicKey };
}

async function request(url, options) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(30000) });
  const body = await response.text();
  if (!response.ok) {
    let message = body.slice(0, 300);
    try { const parsed = JSON.parse(body); message = parsed.message || parsed.error_description || parsed.msg || message; } catch { }
    throw new Error(`Supabase request failed (${response.status}): ${message}`);
  }
  try { return JSON.parse(body); } catch { return body; }
}

export async function prepareConversation(output, userId, supabaseUrl) {
  const directory = path.dirname(output);
  const basename = path.parse(output).name;
  const [originalHtml, metadata, manifest] = await Promise.all([
    readFile(output, 'utf8'),
    readFile(path.join(directory, `${basename}.capture.json`), 'utf8').then(JSON.parse),
    readFile(path.join(directory, `${basename}.images.json`), 'utf8').then(JSON.parse),
  ]);
  const topics = JSON.parse(await readFile(path.join(import.meta.dirname, 'topics.json'), 'utf8'));
  const languages = JSON.parse(await readFile(path.join(import.meta.dirname, 'languages.json'), 'utf8'));
  const language = Object.entries(languages).find(([key, value]) => key === String(metadata.language).toLowerCase() || value.name.toLowerCase() === String(metadata.language).toLowerCase())?.[0];
  if (!language) throw new Error(`Unsupported language key: ${metadata.language}`);
  const oldTopicId = metadata.topic_id === 'covalent-redius' ? 'covalent-radius' : metadata.topic_id;
  const topicEntry = topics.find((entry) => entry['topic-id'] === oldTopicId) || topics.find((entry) => Object.entries(entry).some(([key, value]) => languages[key] && value?.title && (value.title === metadata.topic || value.title === metadata.title)));
  const topicId = topicEntry?.['topic-id'] || oldTopicId || null;
  if (manifest.bucket !== 'capture-images' || !Array.isArray(manifest.images)) throw new Error('Invalid image manifest');
  if (!/^https:\/\/chatgpt\.com\/(?:g\/[a-zA-Z0-9_/-]+\/)?c\/[a-f0-9-]{36}$/.test(metadata.source?.url || '')) {
    throw new Error('Capture must have a saved ChatGPT /c/ conversation URL');
  }
  const sourceId = metadata.source.url.split('/').at(-1);
  if (sourceId !== metadata.source.conversation_id) throw new Error('Capture source ID does not match its URL');
  if (!Array.isArray(metadata.turns) || !metadata.turns.length) throw new Error('Capture has no prepared turns; save the conversation again before uploading');
  let html = originalHtml;
  const turns = metadata.turns.map((turn) => ({ ...turn }));
  const images = [];
  for (const entry of manifest.images) {
    const filename = `${entry.sha256}.${entry.mime === 'image/jpeg' ? 'jpg' : entry.mime === 'image/svg+xml' ? 'svg' : entry.mime.split('/')[1]}`;
    const modernManifestPath = `${basename}.images/${filename}`;
    const legacyManifestPath = `img/${filename}`;
    if (!/^[a-f0-9]{64}$/.test(entry.sha256) || !imageTypes.has(entry.mime) || ![modernManifestPath, legacyManifestPath].includes(entry.file)) {
      throw new Error(`Invalid image manifest entry: ${entry.file}`);
    }
    const assetDirectory = entry.file === legacyManifestPath ? 'img' : `${basename}.images`;
    const bytes = await readFile(path.join(directory, assetDirectory, filename));
    if (!bytes.length || bytes.length > maxImageBytes || bytes.length !== entry.bytes || createHash('sha256').update(bytes).digest('hex') !== entry.sha256) {
      throw new Error(`Image bytes do not match manifest: ${entry.file}`);
    }
    const reference = `./${encodeURIComponent(assetDirectory)}/${filename}`;
    if (!html.includes(reference)) throw new Error(`Image is missing from HTML: ${entry.file}`);
    const storagePath = `captures/${userId}/${filename}`;
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/capture-images/${storagePath}`;
    html = html.split(reference).join(publicUrl);
    for (const turn of turns) turn.html = turn.html.split(reference).join(publicUrl);
    images.push({ bytes, mime: entry.mime, storagePath });
  }
  html = attachTurnIds(html, turns);
  if (/(?:\.images|\/img)\/[a-f0-9]{64}\.|<img\b[^>]*\bsrc\s*=\s*["'](?:data:image\/|\.\.?\/)/i.test(html) || turns.some((turn) => /(?:\.images|\/img)\/[a-f0-9]{64}\.|<img\b[^>]*\bsrc\s*=\s*["'](?:data:image\/|\.\.?\/)/i.test(turn.html))) {
    throw new Error('Captured HTML still contains local or embedded images; upload cancelled');
  }
  const capture = {
    format_version: 'chatgpt-direct-capture/1',
    source: metadata.source,
    captured_at: metadata.captured_at,
    extractor_version: 'agentic-conversation-capture/1',
    report: { scope: 'loaded-page', history_verified: false, message_count: turns.length, limitations: metadata.limitations || [], image_storage: { uploaded_unique_images: images.length, embedded_fallback_images: 0 }, exact_html: html },
    turns,
    title: metadata.title,
    topic: metadata.topic,
    language,
    topic_id: topicId,
    topic_name: topicEntry?.['topic-name'] || metadata.topic,
    provider: metadata.provider || metadata.chatbot_name || 'ChatGPT',
    access_type: metadata.access_type || 'chatbot',
  };
  if (!capture.title || !capture.topic || !capture.language || !turns.some((turn) => turn.speaker === 'tutor') || turns.some((turn) => !turn.text?.trim() || !turn.html?.trim())) throw new Error('Capture metadata or turns are incomplete');
  if (Buffer.byteLength(JSON.stringify({ p_capture: capture })) > maxArchiveBytes) throw new Error('Conversation exceeds the 8 MB database limit');
  return { capture, images };
}

export async function uploadConversation(output, accessToken, englishFile) {
  await loadLocalEnvironment();
  const { supabaseUrl, publicKey } = await portalPublicConfig();
  if (!/^https:\/\/[^/]+$/.test(supabaseUrl) && !/^http:\/\/localhost(?::\d+)?$/.test(supabaseUrl) && !/^http:\/\/127\.0\.0\.1(?::\d+)?$/.test(supabaseUrl)) throw new Error('SUPABASE_URL must be an HTTPS origin');
  let token = accessToken;
  if (!token) {
    const username = requireSetting('PORTAL_USERNAME');
    const password = requireSetting('PORTAL_PASSWORD');
    if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(username)) throw new Error('PORTAL_USERNAME must be a portal username');
    const auth = await request(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST', headers: { apikey: publicKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `${username}@users.annotation.invalid`, password }),
    });
    token = auth.access_token;
  }
  if (!token) throw new Error('Portal sign-in did not return an access token');
  const headers = { apikey: publicKey, Authorization: `Bearer ${token}` };
  const user = await request(`${supabaseUrl}/auth/v1/user`, { headers });
  if (!/^[a-f0-9-]{36}$/i.test(user.id || '')) throw new Error('Portal sign-in returned an invalid user');
  const profiles = await request(`${supabaseUrl}/rest/v1/profiles?id=eq.${user.id}&select=id,role`, { headers });
  if (!Array.isArray(profiles) || profiles.length !== 1 || !['admin', 'annotator'].includes(profiles[0].role)) {
    throw new Error('A portal admin or annotator profile is required');
  }
  const packageFile=output.endsWith('.html-conversation.json')?output:path.join(path.dirname(output),`${path.parse(output).name}.html-conversation.json`);
  let htmlPackage=false;try{await readFile(packageFile);htmlPackage=true;}catch(e){if(e.code!=='ENOENT')throw e;}
  if(htmlPackage)return uploadHtmlPackage(packageFile,{supabaseUrl,headers,userId:user.id,englishFile,request});
  const { capture, images } = await prepareConversation(output, user.id, supabaseUrl);
  let translated = null;
  if (englishFile) {
    if (/^(en|english)$/i.test(capture.language)) throw new Error('The capture is already in English');
    if (englishFile === true) {
      const target = path.join(path.dirname(output), `${path.parse(output).name}.english.json`);
      const sourceSha256 = translationSourceHash(capture);
      try {
        translated = JSON.parse(await readFile(target, 'utf8'));
        if (translated.source_sha256 !== sourceSha256) throw new Error(`Existing English translation does not match this capture: ${target}`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        translated = { ...(await translateCaptureToEnglish(capture, { withAnchors: true })), source_sha256: sourceSha256 };
        await writeFile(target, `${JSON.stringify(translated, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
      }
    } else translated = JSON.parse(await readFile(englishFile, 'utf8'));
    const turns = translated.turns;
    if (!translated.title?.trim() || !translated.topic?.trim() || !Array.isArray(turns) || turns.length !== capture.turns.length ||
        turns.some((turn, index) => turn.turn_id !== capture.turns[index].turn_id || turn.speaker !== capture.turns[index].speaker || !turn.text?.trim())) {
      throw new Error('English translation must provide a title, topic, and nonempty text for every original turn in order');
    }
  }
  for (const image of images) {
    const objectUrl = `${supabaseUrl}/storage/v1/object/capture-images/${image.storagePath}`;
    const response = await fetch(objectUrl, { method: 'POST', headers: { ...headers, 'Content-Type': image.mime }, body: image.bytes, signal: AbortSignal.timeout(30000) });
    if (!response.ok) {
      const details = await response.text();
      let duplicate = false;
      try { const parsed = JSON.parse(details); duplicate = ['Duplicate', 'ResourceAlreadyExists'].includes(parsed.error || parsed.code) || /already exists/i.test(parsed.message || ''); } catch { }
      if (!duplicate) throw new Error(`Storage upload failed for ${path.basename(image.storagePath)} (${response.status}): ${details.slice(0, 300)}`);
      const stored = await fetch(`${supabaseUrl}/storage/v1/object/public/capture-images/${image.storagePath}`, { signal: AbortSignal.timeout(30000) });
      if (!stored.ok || createHash('sha256').update(Buffer.from(await stored.arrayBuffer())).digest('hex') !== path.basename(image.storagePath).split('.')[0]) {
        throw new Error(`Existing Storage image failed hash verification: ${path.basename(image.storagePath)}`);
      }
    }
  }
  const receipt = await request(`${supabaseUrl}/rest/v1/rpc/import_chatgpt_exact_capture`, {
    method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_capture: capture }),
  });
  if (!/^[a-f0-9-]{36}$/i.test(receipt.conversation_id || '')) throw new Error('Supabase did not confirm the conversation import');
  let english = null;
  if (translated) {
    english = await request(`${supabaseUrl}/rest/v1/rpc/import_capture_english_translation`, {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_source_id: receipt.conversation_id, p_title: translated.title, p_topic: translated.topic,
        p_turns: translated.turns.map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })), p_alignment: translated.alignment || [] }),
    });
    if (!/^[a-f0-9-]{36}$/i.test(english?.conversation_id || '') || english.source_conversation_id !== receipt.conversation_id) throw new Error('Supabase did not confirm the linked English translation');
  }
  const result = { ...receipt, uploadedImages: images.length, ...(english ? { english } : {}) };
  const uploadRecord = {
    conversation_id: receipt.conversation_id,
    uploaded_at: new Date().toISOString(),
    snapshot_sha256: receipt.snapshot_sha256,
    uploaded_images: images.length,
    ...(english ? { english_conversation_id: english.conversation_id } : {}),
  };
  await writeFile(path.join(path.dirname(output), `${path.parse(output).name}.upload.json`), `${JSON.stringify(uploadRecord, null, 2)}\n`, 'utf8');
  return result;
}
