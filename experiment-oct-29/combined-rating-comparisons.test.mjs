import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {gateOverallTests,selectRatingDimensions} from './combined-rating-comparisons.mjs';

test('selected combined score excludes only the requested dimensions and omits N/A',()=>{
 const data={dimensions:[{key:'a'},{key:'b'},{key:'c'},{key:'d'}],conversations:[
  {id:'one',scores:{a:5,b:1,c:3,d:4},combined_score:3.25},
  {id:'two',scores:{a:2,b:null,c:4,d:5},combined_score:11/3},
 ]};
 const selected=selectRatingDimensions(data,['b','d']);
 assert.deepEqual(selected.dimensions.map(dimension=>dimension.key),['a','c']);
 assert.deepEqual(selected.conversations.map(row=>row.combined_score),[4,3]);
 assert.deepEqual(data.conversations[0].scores,{a:5,b:1,c:3,d:4});
 assert.throws(()=>selectRatingDimensions(data,['missing']),/Unknown/);
});

test('overall Holm adjustment gates the posthoc families',()=>{
 const rows=[.001,.01,.03,.2,.4,.6,.9].map((p,index)=>({context:String(index),omnibus:{p},pairs:[{significant:true}]}));
 const result=gateOverallTests(rows);
 assert.equal(result[0].overall_adjusted_p,.007);
 assert.equal(result[0].pairs.length,1);
 assert.ok(result[1].overall_adjusted_p>.05);
 assert.equal(result[1].pairs.length,0);
 assert.equal(result.filter(row=>row.significant).length,1);
 assert.throws(()=>gateOverallTests([{omnibus:{p:null}}]),/unavailable/);
});
