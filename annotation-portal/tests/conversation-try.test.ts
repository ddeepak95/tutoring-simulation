import {expect,it} from 'vitest';
import {conversationTry} from '../src/conversation-try';
import type {DocumentRow} from '../src/types';
const doc=(id:string,date:string,language='en',topic='brain',provider='GPT',source?:string)=>({id,label:topic,language,topic_id:topic,created_at:date,source_conversation_id:source,transcript:{conversation_id:id,label:topic,learning_topic:topic,provider,original_language:language,messages:[]}} as DocumentRow);

it('uses the listing order and separates topics, providers and original languages',()=>{
 const documents=[doc('b','2026-02-01'),doc('a','2026-01-01'),doc('ta','2026-01-01','ta'),doc('heart','2025-01-01','en','heart'),doc('other','2025-01-01','en','brain','Other')];
 expect(conversationTry(documents,'b')).toEqual({number:2,total:2,originalId:'b',translated:false});
 expect(conversationTry(documents,'ta')).toMatchObject({number:1,total:1});
});
it('uses ID as the same-date tie breaker and gives translations their source try',()=>{
 const documents=[doc('b','2026-01-01','ta'),doc('a','2026-01-01','ta'),doc('translated','2026-12-01','en','brain','Translator','a')];
 expect(conversationTry(documents,'translated')).toEqual({number:1,total:2,originalId:'a',translated:true});
 expect(conversationTry(documents,'b')).toMatchObject({number:2,total:2});
});
it('does not invent a try number for missing conversations or translations with missing originals',()=>{
 expect(conversationTry([],'missing')).toBeNull();
 expect(conversationTry([doc('orphan','2026-01-01','en','brain','Translator','missing')],'orphan')).toBeNull();
});
