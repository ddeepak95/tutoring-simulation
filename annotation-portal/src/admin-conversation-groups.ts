import type { DocumentRow } from './types';
import { conversationOrigin } from './conversation-origin';
import { languageId, languageName } from './languages';

export interface ConversationAttempt { document: DocumentRow; translations: DocumentRow[] }
export interface ProviderLanguageGroup { provider: string; language: string; attempts: ConversationAttempt[]; translationCount: number }
export const providerLanguagePath = (topic: string, provider: string, language: string) => `/topics/${encodeURIComponent(topic)}/conversations/${encodeURIComponent(provider)}/${encodeURIComponent(language)}`;

export function providerGroups(documents: DocumentRow[]) {
  const groups = new Map<string, { provider: string; languages: ProviderLanguageGroup[] }>();
  for (const language of providerLanguageGroups(documents)) {
    const group = groups.get(language.provider) || { provider: language.provider, languages: [] };
    group.languages.push(language); groups.set(language.provider, group);
  }
  return [...groups.values()];
}

/** Source identity pairs translations; titles and language never infer a match. */
export function providerLanguageGroups(documents: DocumentRow[]): ProviderLanguageGroup[] {
  const byId = new Map(documents.flatMap(doc => [[doc.id, doc], ...(doc.transcript.conversation_id ? [[doc.transcript.conversation_id, doc]] : [])] as [string, DocumentRow][]));
  const rootOf = (doc: DocumentRow): DocumentRow => {
    const visited = new Set([doc.id]);
    let root = doc;
    while (true) {
      const id = conversationOrigin(root).sourceId;
      const parent = id && byId.get(id);
      if (!parent) return root;
      if (visited.has(parent.id)) return doc;
      visited.add(parent.id); root = parent;
    }
  };
  const attempts = new Map<string, ConversationAttempt>();
  for (const doc of documents) {
    const root = rootOf(doc);
    const attempt = attempts.get(root.id) || { document: root, translations: [] };
    if (doc.id !== root.id) attempt.translations.push(doc);
    attempts.set(root.id, attempt);
  }
  const groups = new Map<string, ProviderLanguageGroup>();
  for (const attempt of attempts.values()) {
    const doc = attempt.document;
    const provider = doc.transcript.provider?.trim() || (doc.transcript.chatgpt_source ? 'ChatGPT' : 'Unknown provider');
    const language = languageId(conversationOrigin(doc, documents).originalLanguage || doc.language);
    const key = JSON.stringify([provider, language]);
    const group = groups.get(key) || { provider, language, attempts: [], translationCount: 0 };
    attempt.translations.sort((a, b) => languageName(a.language).localeCompare(languageName(b.language)) || a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id));
    group.attempts.push(attempt); group.translationCount += attempt.translations.length; groups.set(key, group);
  }
  for (const group of groups.values()) group.attempts.sort((a, b) => a.document.created_at.localeCompare(b.document.created_at) || a.document.id.localeCompare(b.document.id));
  return [...groups.values()].sort((a, b) => a.provider.localeCompare(b.provider) || languageName(a.language).localeCompare(languageName(b.language)));
}
