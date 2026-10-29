import {providerLanguageGroups} from './admin-conversation-groups';
import {conversationOrigin} from './conversation-origin';
import {topicKey} from './topic-groups';
import type {DocumentRow} from './types';

export interface ConversationTry {number:number;total:number;originalId:string;translated:boolean}

/** Use the listing's source linkage and created-at/ID ordering, never translation dates. */
export function conversationTry(documents:DocumentRow[],id:string):ConversationTry|null{
 for(const group of providerLanguageGroups(documents)){
  const attempt=group.attempts.find(a=>a.document.id===id||a.translations.some(d=>d.id===id));
  if(!attempt||conversationOrigin(attempt.document).translated)continue;
  const attempts=group.attempts.filter(a=>topicKey(a.document)===topicKey(attempt.document));
  return {number:attempts.findIndex(a=>a.document.id===attempt.document.id)+1,total:attempts.length,originalId:attempt.document.id,translated:id!==attempt.document.id};
 }
 return null;
}
