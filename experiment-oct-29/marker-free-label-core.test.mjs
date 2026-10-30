import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {validateMarkerFreeOutput} from './marker-free-label-core.mjs';

const conversation={messages:[{turn_id:'s1',speaker:'student',text:'Why?'},{turn_id:'t1',speaker:'tutor',text:'Great question. A neuron is a nerve cell. Great question.'},{turn_id:'t2',speaker:'tutor',text:'This is a common mistake: the brain is not a muscle.'}]};
const keys=['definitions','social_cues','misconceptions_pitfalls','bot_errors_hallucinations'];
const item=(feature,turn_id,quote,occurrence,reason=null)=>({feature,turn_id,quote,occurrence,reason});

test('generated 14-label rubric, schema and active prompt agree without a quote-length cap',()=>{
 const root=path.resolve(import.meta.dirname,'..');
 const rubric=JSON.parse(fs.readFileSync(path.join(root,'annotation-portal/src/generated/marker-free-rubric.json'),'utf8'));
 const schema=JSON.parse(fs.readFileSync(path.join(root,'conversation-evaluation/schemas/evaluator-v3.schema.json'),'utf8'));
 const prompt=fs.readFileSync(path.join(root,'conversation-evaluation/prompts/marker-free-features.md'),'utf8');
 const schemaOccurrence=schema.$defs.marker_free_occurrence;
 assert.equal(rubric.rubric.length,14);
 assert.deepEqual(schemaOccurrence.properties.feature.enum,rubric.rubric.map(feature=>feature.key));
 assert.equal(schemaOccurrence.properties.quote.maxLength,undefined);
 assert.equal(rubric.prompt_version,'marker-free-occurrences/2');
 assert.ok(!/at most \d+ characters/i.test(prompt));
});

test('validates exact tutor-turn occurrences and derives counts',()=>{
 const result=validateMarkerFreeOutput({annotations:[item('social_cues','t1','Great question.',1),item('social_cues','t1','Great question.',2),item('definitions','t1','A neuron is a nerve cell.',1)]},conversation,keys);
 assert.equal(result.counts.social_cues,2);assert.equal(result.counts.definitions,1);assert.equal(result.counts.bot_errors_hallucinations,0);
 assert.equal(result.annotations[1].start,conversation.messages[1].text.lastIndexOf('Great question.'));
});
test('rejects removed labels, student quotes, unmatched quotes, duplicate anchors and unsupported error reasons',()=>{
 const bad=[item('headings','t1','Great question.',1),item('social_cues','s1','Why?',1),item('social_cues','t1','Not there',1),item('bot_errors_hallucinations','t1','Great question.',1),item('social_cues','t1','Great question.',3)];
 for(const occurrence of bad)assert.throws(()=>validateMarkerFreeOutput({annotations:[occurrence]},conversation,keys));
 const repeated=item('social_cues','t1','Great question.',1);
 assert.throws(()=>validateMarkerFreeOutput({annotations:[repeated,repeated]},conversation,keys),/Duplicate/);
 assert.doesNotThrow(()=>validateMarkerFreeOutput({annotations:[item('bot_errors_hallucinations','t2','brain is not a muscle',1,'The claim is inaccurate.')]},conversation,keys));
});
test('accepts complete exact-source evidence without an arbitrary quote-length cap',()=>{
 const long='A'.repeat(700),source={messages:[{turn_id:'t1',speaker:'tutor',text:long}]};
 const result=validateMarkerFreeOutput({annotations:[item('examples','t1',long,1)]},source,['examples']);
 assert.equal(result.annotations[0].end,700);
});
