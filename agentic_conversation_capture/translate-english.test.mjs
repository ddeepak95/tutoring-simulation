import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { translateCaptureToEnglish } from './translate-english.mjs';

test('translates only title, topic, and ordered turn text', async () => {
  const requests = [];
  const outputs = ['Motion', 'Hello', 'See https://example.com/diagram'];
  const capture = { title: 'இயக்கம்', topic: 'இயக்கம்', turns: [
    { turn_id: 'turn_0001', speaker: 'student', text: 'வணக்கம்', html: '<img src="private-image">' },
    { turn_id: 'turn_0002', speaker: 'tutor', text: 'https://example.com/diagram பாருங்கள்', html: '<button>கேள்வி</button>' },
  ] };
  const fetcher = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, json: async () => ({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: outputs.shift() }] } }] }) };
  };
  const translated = await translateCaptureToEnglish(capture, { fetcher, apiKey: 'test-key' });
  assert.deepEqual(translated, { title: 'Motion', topic: 'Motion', turns: [
    { turn_id: 'turn_0001', speaker: 'student', text: 'Hello' },
    { turn_id: 'turn_0002', speaker: 'tutor', text: 'See https://example.com/diagram' },
  ] });
  assert.equal(requests.length, 3);
  for (const { url, options } of requests) {
    assert.match(url, /^https:\/\/generativelanguage\.googleapis\.com\//);
    assert.equal(options.headers['x-goog-api-key'], 'test-key');
    assert.doesNotMatch(options.body, /private-image|<button>/);
  }
});

test('rejects incomplete model output', async () => {
  const fetcher = async () => ({ ok: true, json: async () => ({ candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: 'partial' }] } }] }) });
  await assert.rejects(translateCaptureToEnglish({ title: 'Title', topic: 'Title', turns: [] }, { fetcher, apiKey: 'test-key' }), /incomplete translation/);
});

test('records parent evidence IDs alongside translated passage offsets', async () => {
  const outputs = ['Motion', '["Title","A sentence."]'];
  const requests = [];
  const fetcher = async (_url, options) => {
    requests.push(JSON.parse(options.body).contents[0].parts[0].text);
    return { ok: true, json: async () => ({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: outputs.shift() }] } }] }) };
  };
  const capture = { title: 'Movimiento', topic: 'Movimiento', turns: [{ turn_id: 't1', speaker: 'tutor', text: 'Título\nUna frase.', html: '<h2>Título</h2><p>Una frase.</p>' }] };
  const result = await translateCaptureToEnglish(capture, { fetcher, apiKey: 'test-key', withAnchors: true });
  assert.equal(result.turns[0].text, 'Title\nA sentence.');
  assert.deepEqual(result.alignment.map(({ segment_id, start, end, source_start, source_end, kind }) => ({ segment_id, start, end, source_start, source_end, kind })), [
    { segment_id: 't1:s0001', start: 0, end: 5, source_start: 0, source_end: 6, kind: 'heading' },
    { segment_id: 't1:s0002', start: 6, end: 17, source_start: 7, source_end: 17, kind: 'paragraph' },
  ]);
  assert.deepEqual(requests, ['Movimiento', '["Título","Una frase."]']);
});

test('anchors translated definitions beside math without changing the math label', async () => {
  const original = JSON.parse(await readFile(new URL('./outputs/covalent-redius/ta/20261020T143758Z/covalent-redius-ta.capture.json', import.meta.url), 'utf8'));
  const capture = { title: original.title, topic: original.topic, turns: [original.turns[1]] };
  const source = capture.turns[0].text;
  const fetcher = async (_url, options) => {
    const input = JSON.parse(options.body).contents[0].parts[0].text;
    const text = input.startsWith('[')
      ? JSON.stringify(JSON.parse(input).map(piece => piece.replaceAll('இங்கு:', 'Where:').replaceAll('சகப்பிணைப்பு ஆரம்', 'covalent radius').replaceAll('இரண்டு அணுக்கருக்களுக்கு இடையிலான தூரம்', 'distance between the two nuclei')))
      : 'Covalent Radius';
    return { ok: true, json: async () => ({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text }] } }] }) };
  };
  const result = await translateCaptureToEnglish(capture, { fetcher, apiKey: 'test-key', withAnchors: true });
  const definitions = result.alignment.filter(item => ['covalent radius', 'distance between the two nuclei'].includes(result.turns[0].text.slice(item.start, item.end)));
  assert.equal(definitions.length, 2);
  assert.deepEqual(definitions.map(item => [source.slice(item.source_start, item.source_end), result.turns[0].text.slice(item.start, item.end)]), [
    ['சகப்பிணைப்பு ஆரம்', 'covalent radius'],
    ['இரண்டு அணுக்கருக்களுக்கு இடையிலான தூரம்', 'distance between the two nuclei'],
  ]);
});
