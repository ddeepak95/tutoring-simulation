import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {combinedRatingScore,parseCsv} from './rating-tables.mjs';

test('reads quoted commas, escaped quotes, blanks, CRLF and embedded newlines',()=>{
 assert.deepEqual(parseCsv('name,score,note\r\n"A, B","4.5","say ""hello"""\r\n"C",,"first\nsecond"\r\n'),[
  {name:'A, B',score:'4.5',note:'say "hello"'},
  {name:'C',score:'',note:'first\nsecond'},
 ]);
});
test('rejects incomplete quotes and mismatched columns',()=>{
 assert.throws(()=>parseCsv('name,score\n"unfinished,3'),/Unclosed/);
 assert.throws(()=>parseCsv('name,score\nA,3,extra\n'),/column count/);
});
test('combined score equally weights available question means and omits N/A',()=>{
 assert.equal(combinedRatingScore({introduction:5,follow_up:3,information:1}),3);
 assert.equal(combinedRatingScore({introduction:5,follow_up:3,information:null}),4);
 assert.equal(combinedRatingScore({introduction:null,follow_up:null}),null);
});
