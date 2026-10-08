import type { Conversation } from './types';

// Preserve supplied source IDs exactly. Allocate an ID only for an ID-less upload.
export function identifyUploadedConversation(conversation: Conversation, id = crypto.randomUUID()) {
  const uid = conversation.conversation_id || id;
  const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(uid);
  return { id: uuid ? uid : id, transcript: { ...conversation, conversation_id: uid } satisfies Conversation };
}
