import assert from 'node:assert/strict';
import test from 'node:test';
import { translationPassages, assembleTranslation } from './translate-api-english.mjs';
import { translateCaptureToEnglish } from './translate-english.mjs';

const source = { conversation_id:'source',label:'தலைப்பு',topic_name:'Topic',language:'ta',access_type:'API',messages:[{turn_id:'s',speaker:'student',text:'கேள்வி'},{turn_id:'t',speaker:'tutor',text:'முதல் 37\n\nஇரண்டு 74'}] };
const sections = [{section_id:'t1s1',turn_id:'t',turn_number:1,section_number:1,start:0,end:8,quote:source.messages[1].text.slice(0,8)},{section_id:'t1s2',turn_id:'t',turn_number:1,section_number:2,start:10,end:source.messages[1].text.length,quote:source.messages[1].text.slice(10)}];

test('English assembly retains turn and section identities with independent exact offsets',()=>{
  // Calculate offsets from the real Unicode strings, never from displayed glyph counts.
  const text=source.messages[1].text, split=text.indexOf('\n\n');
  const ranges=[{...sections[0],end:split,quote:text.slice(0,split)},{...sections[1],start:split+2,quote:text.slice(split+2)}];
  const passages=translationPassages(source,ranges).map((p,i)=>({...p,text:['Topic','Question','First answer 37','Second answer 74'][i]}));
  const result=assembleTranslation(source,ranges,passages,{id:'english',model:'test',generatedAt:'today'});
  assert.deepEqual(result.conversation.messages.map(t=>t.turn_id),['s','t']);
  assert.equal(result.conversation.messages[1].text,'First answer 37\n\nSecond answer 74');
  assert.deepEqual(result.conversation.translation.alignment.map(a=>a.segment_id),['t1s1','t1s2']);
  for(const item of result.conversation.translation.alignment){
    const expected=passages.find(p=>p.id===item.segment_id).text;
    assert.equal(result.conversation.messages[1].text.slice(item.start,item.end),expected);
    assert.equal(text.slice(item.source_start,item.source_end),ranges.find(s=>s.section_id===item.segment_id).quote);
  }
  assert.throws(()=>assembleTranslation(source,ranges,passages.map((p,i)=>i===2?{...p,text:'First answer 99'}:p),{id:'x'}),/Numbers changed/);
});

test('batch translation resumes validated passages without retranslating them',async()=>{
  const capture={format_version:'api-section-translation/1',passages:[{id:'t1s1',text:'முதல்'},{id:'t1s2',text:'இரண்டு'}]};
  let requests=0,checkpoint;
  const result=await translateCaptureToEnglish(capture,{apiKey:'test',checkpoint:{passages:{t1s1:'First'}},onCheckpoint:async value=>{checkpoint=structuredClone(value);},fetcher:async (_url,options)=>{
    requests++;
    assert.deepEqual(JSON.parse(JSON.parse(options.body).contents[0].parts[0].text),['இரண்டு']);
    return {ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:'["Second"]'}]}}]})};
  }});
  assert.equal(requests,1);
  assert.deepEqual(result.passages.map(p=>p.text),['First','Second']);
  assert.deepEqual(checkpoint.passages,{t1s1:'First',t1s2:'Second'});
});

test('changed numerical values are rejected before checkpointing a translated batch',async()=>{
  let attempts=0,saves=0;
  const result=await translateCaptureToEnglish({format_version:'api-section-translation/1',passages:[{id:'t1s1',text:'மதிப்பு 37'}]},{apiKey:'test',onCheckpoint:async()=>{saves++;},fetcher:async()=>({ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify([++attempts===1?'Value 99':'Value 37'])}]}}]})})});
  assert.equal(attempts,2);assert.equal(saves,1);
  assert.equal(result.passages[0].text,'Value 37');
});
