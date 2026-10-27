import test from 'node:test';
import assert from 'node:assert/strict';
import {pendingJobs} from './run-pending.mjs';
test('pending queue skips current HTML imports, including translations, and ignores stale legacy receipts',()=>{
 const topics=[{'topic-id':'brain',en:{},ta:{},sw:{}},{'topic-id':'heart',en:{}}];
 const existing=[{topic_id:'brain',language:'en',format_version:'html-conversation/2',source_conversation_id:'source'},{topic_id:'brain',language:'ta',format_version:'html-conversation/2'},{topic_id:'heart',language:'en',format_version:null}];
 assert.deepEqual(pendingJobs(topics,{en:{},ta:{},sw:{}},existing).map(j=>[j.topic,j.language]),[['brain','sw'],['heart','en']]);
});
