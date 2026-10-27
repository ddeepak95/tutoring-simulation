import type {DocumentRow} from './types';

/** HTML captures store provenance in their package and relational source link. */
export function conversationOrigin(doc:DocumentRow,documents:DocumentRow[]=[]){
  const content=doc.transcript.html_content;
  const sourceId=doc.source_conversation_id||doc.transcript.source_conversation_id||null;
  const translated=!!(sourceId||content?.source_version||doc.transcript.repository_source?.version.includes('translation'));
  const source=documents.find(d=>d.id===sourceId||d.transcript.conversation_id===sourceId);
  const originalLanguage=content?.source_version?.language||doc.transcript.original_language||source?.language||(translated?null:doc.language);
  return {sourceId,translated,originalLanguage};
}
