import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import fs from 'node:fs';
import {markerFreeRatingSchema,normalizeBareRatingArray,normalizeConversationIdRatingWrapper,normalizeNumericStringScores,normalizeSplitRatingObjects,parseEscapedJsonObject,validateMarkerFreeRatings} from './marker-free-rating-core.mjs';
const dimensions=JSON.parse(fs.readFileSync(new URL('../annotation-portal/src/generated/rating-questions.json',import.meta.url)));
const conversation={messages:[{speaker:'student',turn_id:'s1',text:'Hi'},{speaker:'tutor',turn_id:'t1',text:'Hello'},{speaker:'student',turn_id:'s2',text:'Why?'},{speaker:'tutor',turn_id:'t2',text:'Because'}]};
const rating=(turnId,index)=>({turn_id:turnId,values:Object.fromEntries(dimensions.filter(d=>index===0?!d.subsequent_only:!d.first_only).map(d=>[d.key,{score:2,reason:'Specific evidence.'}]))});

test('constrains provider output to all tutor turns and their applicable criterion sets',()=>{
 const schema=markerFreeRatingSchema(conversation,dimensions);
 assert.deepEqual(schema.required,['ratings']);
 assert.equal(schema.additionalProperties,false);
 const array=schema.properties.ratings;
 assert.equal(array.minItems,2);assert.equal(array.maxItems,2);
 array.items.anyOf.forEach((variant,index)=>{
  assert.deepEqual(variant.properties.turn_id.enum,[index===0?'t1':'t2']);
  assert.deepEqual(variant.properties.values.required,Object.keys(rating('',index).values));
  assert.equal(variant.properties.values.required.length,8);
  assert.equal(variant.properties.values.additionalProperties,false);
  assert.deepEqual(variant.properties.values.properties.amount_of_information.properties.score.anyOf,[{type:'integer',enum:[1,2,3,4,5]},{type:'string',enum:['N/A']}]);
 });
});
test('validates complete first and follow-up tutor ratings',()=>{
 const output={ratings:[rating('t1',0),rating('t2',1)]};
 assert.deepEqual(dimensions[0].options,['5','4','3','2','1','N/A']);
 assert.equal(validateMarkerFreeRatings(output,conversation,dimensions).length,2);
 output.ratings[0].values.amount_of_information.score=5;
 assert.equal(validateMarkerFreeRatings(output,conversation,dimensions)[0].values.amount_of_information.score,5);
 output.ratings[0].values.amount_of_information.score=6;
 assert.throws(()=>validateMarkerFreeRatings(output,conversation,dimensions),/Invalid amount_of_information/);
 output.ratings[0].values.amount_of_information.score='5';
 assert.throws(()=>validateMarkerFreeRatings(output,conversation,dimensions),/Invalid amount_of_information/);
 output.ratings[0].values.amount_of_information.score=2;
 assert.throws(()=>validateMarkerFreeRatings({ratings:[output.ratings[0]]},conversation,dimensions),/every tutor turn/);
 assert.throws(()=>validateMarkerFreeRatings({ratings:[rating('t1',1),rating('t2',1)]},conversation,dimensions),/Wrong rating questions/);
 assert.throws(()=>validateMarkerFreeRatings({ratings:[rating('t1',0),rating('t1',1)]},conversation,dimensions),/Invalid rating/);
});
test('normalizes only an unambiguous split rating shape without changing content',()=>{
 const expected={ratings:[rating('t1',0),rating('t2',1)]};
 const split={ratings:expected.ratings.map((row,index)=>{
  const [first,second,...remaining]=dimensions.filter(d=>index===0?!d.subsequent_only:!d.first_only).map(d=>d.key);
  return {turn_id:row.turn_id,values:{[first]:row.values[first],[second]:row.values[second].score,reason:row.values[second].reason},...Object.fromEntries(remaining.map(key=>[key,row.values[key]]))};
 })};
 const normalized=normalizeSplitRatingObjects(split,conversation,dimensions);
 assert.deepEqual(validateMarkerFreeRatings(normalized,conversation,dimensions),expected.ratings);
 split.ratings[0].extra={score:2,reason:'Unassigned'};
 assert.throws(()=>normalizeSplitRatingObjects(split,conversation,dimensions),/Unexpected split rating shape/);
});
test('wraps a bare ratings array and still validates every turn',()=>{
 const rows=[rating('t1',0),rating('t2',1)];
 assert.deepEqual(validateMarkerFreeRatings(normalizeBareRatingArray(rows),conversation,dimensions),rows);
 assert.throws(()=>normalizeBareRatingArray({ratings:rows}),/Unexpected rating response shape/);
 assert.throws(()=>validateMarkerFreeRatings(normalizeBareRatingArray(rows.slice(0,1)),conversation,dimensions),/every tutor turn/);
});
test('removes only a matching conversation ID wrapper',()=>{
 const rows=[rating('t1',0),rating('t2',1)];
 assert.deepEqual(validateMarkerFreeRatings(normalizeConversationIdRatingWrapper({conversation_id:'source-1',ratings:rows},'source-1'),conversation,dimensions),rows);
 assert.throws(()=>normalizeConversationIdRatingWrapper({conversation_id:'source-2',ratings:rows},'source-1'),/Unexpected conversation-ID rating wrapper/);
 assert.throws(()=>normalizeConversationIdRatingWrapper({conversation_id:'source-1',ratings:rows,extra:true},'source-1'),/Unexpected conversation-ID rating wrapper/);
});
test('decodes an escaped JSON object once without changing ratings',()=>{
 const output={ratings:[rating('t1',0),rating('t2',1)]};
 const escaped=JSON.stringify(JSON.stringify(output,null,2)).slice(1,-1);
 assert.deepEqual(validateMarkerFreeRatings(parseEscapedJsonObject(escaped),conversation,dimensions),output.ratings);
 assert.throws(()=>parseEscapedJsonObject(JSON.stringify(output)),/Unexpected escaped JSON shape/);
});
test('converts only exact numeric score strings without changing reasons',()=>{
 const rows=[rating('t1',0),rating('t2',1)];
 const strings={ratings:rows.map(row=>({turn_id:row.turn_id,values:Object.fromEntries(Object.entries(row.values).map(([key,value])=>[key,{score:String(value.score),reason:value.reason}]))}))};
 assert.deepEqual(validateMarkerFreeRatings(normalizeNumericStringScores(strings),conversation,dimensions),rows);
 strings.ratings[0].values.amount_of_information.score='5.0';
 assert.throws(()=>validateMarkerFreeRatings(normalizeNumericStringScores(strings),conversation,dimensions),/Invalid amount_of_information/);
});
