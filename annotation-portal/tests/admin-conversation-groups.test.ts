import { expect, it } from 'vitest';
import { providerGroups, providerLanguageGroups, providerLanguagePath } from '../src/admin-conversation-groups';
import type { DocumentRow } from '../src/types';
const doc = (id: string, provider = 'GPT', language = 'ta', source?: string, date = '2026-10-01'): DocumentRow => ({ id, label: 'Same title', language, created_at: date, source_conversation_id: source, transcript: { conversation_id: id, label: 'Same title', learning_topic: null, provider, messages: [] } });
it('keeps distinct tries and attaches translations by source identity to the original provider and language', () => {
  const groups = providerLanguageGroups([doc('second', 'GPT', 'ta', undefined, '2026-10-02'), doc('translation', 'Gemini', 'en', 'first'), doc('first'), doc('english', 'GPT', 'en'), doc('other-provider', 'ChatGPT')]);
  const group = groups.find(group => group.provider === 'GPT' && group.language === 'ta')!;
  expect(group.attempts.map(attempt => attempt.document.id)).toEqual(['first', 'second']);
  expect(group.attempts[0].translations.map(doc => doc.id)).toEqual(['translation']);
  expect(group.translationCount).toBe(1);
  expect(groups.some(group => group.provider === 'Gemini')).toBe(false);
  expect(groups).toHaveLength(3);
});
it('retains orphan translations and supports legacy transcript IDs and translation chains', () => {
  const original = doc('database-id'); original.transcript.conversation_id = 'source-id';
  const groups = providerLanguageGroups([doc('orphan', 'GPT', 'en', 'missing'), doc('french', 'GPT', 'fr', 'english'), doc('english', 'GPT', 'en', 'source-id'), original]);
  expect(groups.flatMap(group => group.attempts).map(a => a.document.id)).toContain('orphan');
  expect(groups.flatMap(group => group.attempts).find(a => a.document.id === 'database-id')!.translations.map(d => d.id).sort()).toEqual(['english', 'french']);
});
it('uses safe links for provider and topic names containing route characters', () => {
  expect(providerLanguagePath('bond / radius', 'google/gemini', 'ta')).toBe('/topics/bond%20%2F%20radius/conversations/google%2Fgemini/ta');
});
it('clubs the same provider across languages and retains translations under the source provider', () => {
  const groups = providerGroups([doc('ta'), doc('en', 'GPT', 'en'), doc('translation', 'Gemini', 'en', 'ta'), doc('chatgpt', 'ChatGPT')]);
  expect(groups.map(group => group.provider)).toEqual(['ChatGPT', 'GPT']);
  const gpt = groups.find(group => group.provider === 'GPT')!;
  expect(gpt.languages.map(group => group.language)).toEqual(['en', 'ta']);
  expect(gpt.languages.find(group => group.language === 'ta')!.translationCount).toBe(1);
});
