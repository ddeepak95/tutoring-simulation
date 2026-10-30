import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {compareLanguages,holm,summary} from './rating-language-stats.mjs';

test('summaries and Holm adjustment preserve order',()=>{
 assert.deepEqual(summary([1,3,5]),{n:3,mean:3,sd:2,median:3});
 assert.deepEqual(holm([.04,.001,.02]).map(value=>Number(value.toFixed(3))),[.04,.003,.04]);
});
test('topic-blocked tests detect a strong language difference',()=>{
 const languages=['en','ta','th'],topics=['physics','chemistry','biology'];
 const samples=topics.flatMap(topic=>languages.flatMap(language=>[0,1,2].map(tryIndex=>({topic,language,score:language==='en'?5:language==='ta'?1:3,tryIndex}))));
 const result=compareLanguages(samples,topics,languages,{resamples:1999,seed:'strong'});
 assert.equal(result.topics_in_test,3);
 assert.ok(result.omnibus.p<.05);
 assert.equal(result.pairs.length,3);
 assert.ok(result.pairs.find(pair=>pair.left==='en'&&pair.right==='ta').adjusted_p<.05);
 assert.equal(result.summaries.en.n,9);
});
test('equal scores yield no posthoc tests and missing topic blocks are excluded',()=>{
 const languages=['en','ta'],topics=['one','two'];
 const samples=topics.flatMap(topic=>languages.flatMap(language=>[0,1,2].map(()=>({topic,language,score:3}))));
 let result=compareLanguages(samples,topics,languages,{resamples:99,seed:'equal'});
 assert.equal(result.omnibus.p,1);assert.equal(result.pairs.length,0);
 samples.splice(samples.findIndex(sample=>sample.topic==='two'&&sample.language==='ta'),3);
 result=compareLanguages(samples,topics,languages,{resamples:99,seed:'missing'});
 assert.equal(result.topics_in_test,1);
 assert.equal(result.summaries.ta.n,3);
});
test('a topic effect alone is not a language effect',()=>{
 const topics=['one','two','three'],languages=['en','ta','hi'];
 const samples=topics.flatMap((topic,index)=>languages.flatMap(language=>[0,1,2].map(()=>({topic,language,score:index+2}))));
 const result=compareLanguages(samples,topics,languages,{resamples:199,seed:'topic-only'});
 assert.equal(result.omnibus.p,1);
 assert.equal(result.pairs.length,0);
});
