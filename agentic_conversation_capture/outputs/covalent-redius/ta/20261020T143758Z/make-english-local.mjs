import { readFile, writeFile } from 'node:fs/promises';
import { modelConversationHtml } from '../../../../../annotation-portal/server/model-conversation-html.ts';
import { htmlStructuralRanges } from '../../../../../annotation-portal/server/html-structure.ts';

const source = JSON.parse(await readFile(new URL('./covalent-redius-ta.capture.json', import.meta.url), 'utf8'));
const translations = {
  turn_0001: {
    1: 'Please teach me about covalent radius',
  },
  turn_0002: {
    1: 'Covalent Radius',
    2: "Let's learn about covalent radius in a very simple way, with examples!",
    3: 'This is an important concept in chemistry that helps us understand the size of an atom.',
    5: 'What is covalent radius?',
    6: 'When two atoms of the same element are joined by a covalent bond, half the distance between their nuclei is called the covalent radius.',
    7: 'In an H₂ molecule, the distance between the nuclei of the two hydrogen atoms is 74 pm.',
    9: 'Formula',
    10: 'Where:',
    12: 'Example',
    13: 'In a hydrogen molecule (H₂), if the distance between the two nuclei is 74 pm,',
    14: 'Therefore, the covalent radius of hydrogen is 37 pm.',
    16: 'Key points to remember',
    17: 'When two atoms of the same element are bonded, the covalent radius is half the bond length between them.',
    18: 'Also, in general:',
    19: 'Moving from left to right across the periodic table, atomic radius decreases.',
    20: 'Moving from top to bottom down a group, atomic radius increases.',
    22: 'Now, a short exercise!',
    23: 'In a chlorine molecule (Cl₂), the distance between the two nuclei is 198 pm.',
    24: 'What is the covalent radius of chlorine?',
    29: 'One question: Are you studying covalent radius for 11th or 12th grade chemistry?',
    30: "I'll explain it in more detail accordingly.",
  },
  turn_0003: {
    1: 'How is the nucleus identified?',
  },
  turn_0004: {
    1: 'How is the nucleus identified?',
    2: 'The part at the center of an atom that contains protons and neutrons is called the nucleus.',
    5: 'How do you identify the nucleus?',
    6: 'When looking at a diagram of an atom:',
    7: 'Proton (p⁺) — has a positive charge.',
    8: 'Neutron (n⁰) — has no charge.',
    9: 'Electron (e⁻) — has a negative charge.',
    10: 'Protons and neutrons are found at the center of the atom.',
    11: 'That central part is the nucleus.',
    13: 'Where is the nucleus in covalent radius?',
    14: 'Here, the orange dots represent the nuclei of the two atoms.',
    15: 'Distance between the two nuclei = 74 pm.',
    16: 'Covalent radius = 74 ÷ 2 = 37 pm.',
    18: 'A short question',
    19: 'Which particles are found in the nucleus?',
    20: 'Electrons only',
    21: 'Protons and neutrons',
    22: 'Protons and electrons',
    23: 'An important point: the nucleus cannot be seen directly with an ordinary microscope.',
    24: 'Scientists discovered its existence and structure through experiments.',
    25: "In particular, Rutherford's gold foil experiment helped discover the nucleus.",
  },
  turn_0005: {
    1: 'How do they measure it?',
  },
  turn_0006: {
    1: 'Great question!',
    2: 'How do they measure the distance between the nuclei of two atoms?',
    3: "Let's look at it simply.",
    5: 'Can the distance between nuclei be measured directly?',
    6: 'You cannot use an ordinary ruler to measure the distance between nuclei.',
    7: 'That is because atoms are extremely small.',
    8: 'So scientists use methods such as X-ray diffraction.',
    10: 'How do they measure it using X-rays?',
    12: 'Here is how it works:',
    13: 'They direct X-rays at a crystal.',
    14: 'The atoms in the crystal scatter the X-rays.',
    15: 'They record the diffraction pattern formed by the scattered rays.',
    16: 'They analyze that pattern mathematically to determine the arrangement of the atoms and the distances between them.',
    17: 'This lets them calculate the covalent bond length.',
    19: 'How do they calculate covalent radius?',
    20: 'For example, if an experiment finds that the distance between the nuclei in a chlorine (Cl₂) molecule is 198 pm,',
    21: 'This is the covalent radius of chlorine.',
    22: 'Important note: X-ray diffraction is generally used for crystals.',
    23: 'To determine bond lengths in gaseous molecules such as H₂ and Cl₂, methods such as rotational spectroscopy and gas electron diffraction are also used.',
    25: 'A question for you to think about',
    26: 'If scientists find that the distance between two nuclei is 200 pm, and assuming that the two atoms belong to the same element, what is the covalent radius of each atom?',
    30: 'If you would like, I can explain how X-rays reveal the distances between atoms',
    31: 'with an even simpler example.',
  },
};

const model = modelConversationHtml(
  { messages: source.turns.map(({ turn_id, speaker, text }) => ({ turn_id, speaker, text })) },
  Object.fromEntries(source.turns.map(turn => [turn.turn_id, turn.html || ''])),
  source.turns.flatMap(turn => [...(turn.html || '').matchAll(/<img\b/gi)].map((_, index) => ({ id: `${turn.turn_id}-image-${index + 1}`, turn_id: turn.turn_id }))),
);

const turns = [];
const alignment = [];
for (const turn of source.turns) {
  const segments = model.segments.filter(segment => segment.turn_id === turn.turn_id && segment.kind !== 'visual');
  const spans = [...new Map(segments.map(segment => [`${segment.start}:${segment.end}`, { start: segment.start, end: segment.end }])).values()]
    .sort((a, b) => a.start - b.start || a.end - b.end);
  const headers = htmlStructuralRanges(turn.html || '', turn.text).filter(range => range.kind === 'table_header');
  let english = '';
  let cursor = 0;
  const positions = new Map();
  for (const span of spans) {
    if (span.start < cursor) throw new Error(`Overlapping source spans in ${turn.turn_id}`);
    const gap = turn.text.slice(cursor, span.start)
      .replaceAll('சகப்பிணைப்பு ஆரம்', 'covalent radius')
      .replaceAll('இரண்டு அணுக்கருக்களுக்கு இடையிலான தூரம்', 'distance between the two nuclei');
    english += gap;
    const matching = segments.filter(segment => segment.start === span.start && segment.end === span.end);
    const index = Number(matching[0].segment_id.match(/:s(\d+)$/)[1]);
    const original = turn.text.slice(span.start, span.end);
    const replacement = translations[turn.turn_id]?.[index] ?? original;
    if (/[\u0B80-\u0BFF]/u.test(replacement)) throw new Error(`Untranslated passage ${matching[0].segment_id}`);
    const start = english.length;
    english += replacement;
    const end = english.length;
    for (const segment of matching) positions.set(segment.segment_id, { start, end });
    cursor = span.end;
  }
  english += turn.text.slice(cursor);
  if (/[\u0B80-\u0BFF]/u.test(english)) throw new Error(`Untranslated text in ${turn.turn_id}`);
  for (const segment of segments) {
    const translated = positions.get(segment.segment_id);
    alignment.push({ segment_id: segment.segment_id, turn_id: turn.turn_id, ...translated,
      source_start: segment.start, source_end: segment.end,
      kind: headers.some(range => segment.start >= range.start && segment.end <= range.end) ? 'table_header' : segment.kind });
  }
  let extraIndex = Math.max(0, ...segments.map(segment => Number(segment.segment_id.match(/:s(\d+)$/)?.[1] || 0)));
  const sourceLines = [...turn.text.matchAll(/[^\n]*(?:\n|$)/g)];
  const englishLines = [...english.matchAll(/[^\n]*(?:\n|$)/g)];
  if (sourceLines.length !== englishLines.length) throw new Error(`Line count changed in ${turn.turn_id}`);
  for (let index = 0; index < sourceLines.length; index++) {
    const original = sourceLines[index][0].match(/^([^=\n]+?=\s*)([^\n]+?)(\s*)$/u);
    const translated = englishLines[index][0].match(/^([^=\n]+?=\s*)([^\n]+?)(\s*)$/u);
    if (!original || !translated || !/[\u0B80-\u0BFF]/u.test(original[2])) continue;
    const sourceStart = sourceLines[index].index + original[1].length;
    const start = englishLines[index].index + translated[1].length;
    alignment.push({ segment_id: `${turn.turn_id}:s${String(++extraIndex).padStart(4, '0')}`,
      turn_id: turn.turn_id, start, end: start + translated[2].length,
      source_start: sourceStart, source_end: sourceStart + original[2].length, kind: 'paragraph' });
  }
  turns.push({ turn_id: turn.turn_id, speaker: turn.speaker, text: english });
}
const result = { title: 'Covalent Radius', topic: 'Covalent Radius', turns, alignment };
await writeFile(new URL('./covalent-redius-ta.english.json', import.meta.url), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ turns: turns.length, segments: alignment.length, lengths: turns.map(turn => turn.text.length) }));
