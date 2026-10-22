import type { Conversation, Turn } from './types';

type Alignment = NonNullable<NonNullable<Conversation['translation']>['alignment']>[number];
type Passage = { sourceStart: number; sourceEnd: number; englishStart: number; englishEnd: number };
type Character = { node: Text; offset: number };

function compact(value: string) { return value.replace(/[\s\u200b\ufeff]+/gu, ''); }

function passages(alignment: Alignment[], source: string, english: string): Passage[] {
  const ordered = alignment.filter(item => item.source_start >= 0 && item.source_end <= source.length && item.start >= 0 && item.end <= english.length)
    .sort((a, b) => a.source_start - b.source_start || b.source_end - a.source_end);
  const result: Passage[] = [];
  let sourceCursor = 0, englishCursor = 0;
  for (const item of ordered) {
    if (item.source_start < sourceCursor || item.start < englishCursor || item.source_end <= item.source_start || item.end <= item.start) continue;
    if (item.source_start > sourceCursor && item.start >= englishCursor) result.push({ sourceStart: sourceCursor, sourceEnd: item.source_start, englishStart: englishCursor, englishEnd: item.start });
    result.push({ sourceStart: item.source_start, sourceEnd: item.source_end, englishStart: item.start, englishEnd: item.end });
    sourceCursor = item.source_end;
    englishCursor = item.end;
  }
  if (sourceCursor < source.length && englishCursor <= english.length) result.push({ sourceStart: sourceCursor, sourceEnd: source.length, englishStart: englishCursor, englishEnd: english.length });
  return result;
}

function repeatedTextGlossary(alignment: Alignment[], source: string, english: string) {
  const pairs = alignment.map(item => [source.slice(item.source_start, item.source_end).trim(), english.slice(item.start, item.end).trim()] as const)
    .filter(([original, translated]) => original && translated && original.length < 100 && translated.length < 140);
  const glossary = new Map<string, string>(pairs);
  for (const [original, translated] of pairs) for (const [knownSource, knownEnglish] of [...glossary]) {
    if (original.startsWith(knownSource) && translated.startsWith(knownEnglish) && original.length > knownSource.length)
      glossary.set(original.slice(knownSource.length).trim(), translated.slice(knownEnglish.length).trim());
    if (original.endsWith(knownSource) && translated.endsWith(knownEnglish) && original.length > knownSource.length)
      glossary.set(original.slice(0, -knownSource.length).trim(), translated.slice(0, -knownEnglish.length).trim());
  }
  return glossary;
}

function replaceArticleText(article: HTMLElement, source: Turn, english: Turn, alignment: Alignment[]) {
  const document = article.ownerDocument;
  const walker = document.createTreeWalker(article, 4);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) if (!node.parentElement?.closest('script,style,noscript,template,svg,[hidden],.sr-only')) nodes.push(node as Text);
  let key = '';
  const characters: Character[] = [];
  for (const text of nodes) for (let offset = 0; offset < text.data.length; offset++) {
    const char = text.data[offset];
    if (/[\s\u200b\ufeff]/u.test(char)) continue;
    key += char;
    characters.push({ node: text, offset });
  }
  const indexByNode = new Map(nodes.map((text, index) => [text, index]));
  const replacements: { start: number; end: number; first: Character; last: Character; text: string }[] = [];
  let cursor = 0;
  const match = (sourceValue: string, englishValue: string) => {
    const needle = compact(sourceValue);
    if (!needle || !englishValue.trim()) return false;
    const available = (start: number) => {
      let found = key.indexOf(needle, start);
      while (found >= 0 && replacements.some(item => found < item.end && found + needle.length > item.start)) found = key.indexOf(needle, found + 1);
      return found;
    };
    let found = available(cursor);
    if (found < 0) found = available(0);
    if (found < 0) return false;
    replacements.push({ start: found, end: found + needle.length, first: characters[found], last: characters[found + needle.length - 1], text: englishValue });
    cursor = found + needle.length;
    return true;
  };
  for (const passage of passages(alignment, source.text, english.text)) {
    const sourceValue = source.text.slice(passage.sourceStart, passage.sourceEnd);
    const englishValue = english.text.slice(passage.englishStart, passage.englishEnd);
    if (match(sourceValue, englishValue)) continue;
    const sourceLines = sourceValue.split('\n'), englishLines = englishValue.split('\n');
    if (sourceLines.length === englishLines.length) sourceLines.forEach((line, index) => { match(line, englishLines[index]); });
  }
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    const firstIndex = indexByNode.get(replacement.first.node)!;
    const lastIndex = indexByNode.get(replacement.last.node)!;
    if (firstIndex === lastIndex) {
      const text = replacement.first.node;
      text.data = text.data.slice(0, replacement.first.offset) + replacement.text + text.data.slice(replacement.last.offset + 1);
    } else {
      const suffix = replacement.last.node.data.slice(replacement.last.offset + 1);
      replacement.first.node.data = replacement.first.node.data.slice(0, replacement.first.offset) + replacement.text;
      for (let index = firstIndex + 1; index < lastIndex; index++) nodes[index].data = '';
      replacement.last.node.data = suffix;
    }
  }
  const glossary = repeatedTextGlossary(alignment, source.text, english.text);
  for (const text of nodes) {
    const original = text.data.trim();
    const translated = glossary.get(original);
    if (translated && translated !== original) text.data = text.data.replace(original, translated);
  }
  return replacements.length;
}

export function translateCapturedLayout(document: Document, conversation: Conversation) {
  const sourceMessages = conversation.translation?.source_messages;
  if (!sourceMessages?.length || !conversation.translation?.alignment?.length || document.body.dataset.captureTranslated === conversation.conversation_id) return 0;
  const articles = [...document.querySelectorAll<HTMLElement>('article.capture-message,[data-turn-id]')]
    .filter(article => article.matches('article.capture-message') || article.closest('article.capture-message') === null);
  let replacements = 0;
  articles.forEach((article, index) => {
    const english = conversation.messages.find(turn => turn.turn_id === article.dataset.turnId) || conversation.messages[index];
    const source = sourceMessages.find(turn => turn.turn_id === english?.turn_id);
    if (!english || !source) return;
    replacements += replaceArticleText(article, source, english, conversation.translation!.alignment!.filter(item => item.turn_id === english.turn_id));
  });
  document.body.dataset.captureTranslated = conversation.conversation_id || 'translated';
  return replacements;
}
