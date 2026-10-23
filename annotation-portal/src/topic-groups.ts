import type { DocumentRow } from './types';

export const conversationTitle = (doc: DocumentRow) => doc.conversation_title || doc.transcript.learning_topic || doc.label;
export const genericTopic = (doc: DocumentRow) => doc.generic_topic_name || doc.transcript.topic_name || doc.transcript.topic_english_name || conversationTitle(doc);
const order = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
export const topicKey = (doc: DocumentRow) => doc.topic_id || doc.transcript.topic_id || doc.transcript.repository_source?.topic_id || genericTopic(doc).trim().toLocaleLowerCase();

export type TopicGroup = { key: string; name: string; documents: DocumentRow[] };
export function groupByTopic(documents: DocumentRow[]): TopicGroup[] {
  const groups = new Map<string, TopicGroup>();
  for (const doc of documents) {
    const key = topicKey(doc);
    const group = groups.get(key) || { key, name: genericTopic(doc), documents: [] };
    group.documents.push(doc);
    groups.set(key, group);
  }
  for (const group of groups.values()) group.documents.sort((a, b) => order.compare(conversationTitle(a), conversationTitle(b)) || order.compare(a.language, b.language) || a.id.localeCompare(b.id));
  return [...groups.values()].sort((a, b) => order.compare(a.name, b.name) || a.key.localeCompare(b.key));
}
