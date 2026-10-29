import { describe, expect, it } from 'vitest';
import { alignedApiTurns,canCompareApiTranslation,canViewApiTranslation } from '../src/api-translation';
import type { Conversation, ConversationSection } from '../src/types';

const source: Conversation = { conversation_id: 'source',label:'Topic',learning_topic:'Topic',messages:[{turn_id:'s1',speaker:'student',text:'கேள்வி'},{turn_id:'t1',speaker:'tutor',text:'முதல்\n\nஇரண்டு'}] };
const split=source.messages[1].text.indexOf('\n\n');
const sections=[{section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end:split,quote:'முதல்'},{section_id:'t1s2',turn_id:'t1',turn_number:1,section_number:2,start:split+2,end:source.messages[1].text.length,quote:'இரண்டு'}] as ConversationSection[];
const english: Conversation={...source,conversation_id:'english',source_conversation_id:'source',messages:[{turn_id:'s1',speaker:'student',text:'Question'},{turn_id:'t1',speaker:'tutor',text:'Same answer.\n\nSame answer.'}],translation:{version:'api-english/1',sha256:'test',alignment:sections.map((s,i)=>({segment_id:s.section_id,turn_id:'t1',start:i*14,end:i*14+12,source_start:s.start,source_end:s.end,kind:'section'}))}};

describe('API English section mapping',()=>{
  it('shows whole-conversation translations by turn without section alignment',()=>{
    const whole:Conversation={...english,access_type:'API',translation:{version:'api-english-whole/1',sha256:'whole'}};
    expect(canViewApiTranslation(whole)).toBe(true);
    expect(canCompareApiTranslation(whole)).toBe(false);
    const turns=alignedApiTurns(source,whole,[]);
    expect(turns.map(turn=>turn.passages[0].id)).toEqual(['s1','t1']);
    expect(turns[1].passages[0].original).toBe(source.messages[1].text);
    expect(turns[1].passages[0].english).toBe(whole.messages[1].text);
    const bad=structuredClone(whole);bad.messages[1].turn_id='wrong';
    expect(()=>alignedApiTurns(source,bad,[])).toThrow(/turn identities/);
  });
  it('does not compare translations explicitly marked stale after regrouping',()=>{
    const stale={...english,access_type:'API',translation:{...english.translation!,alignment_status:'stale' as const}};
    expect(canCompareApiTranslation(stale)).toBe(false);
    expect(()=>alignedApiTurns(source,stale,sections)).toThrow(/Retranslation/);
  });
  it('pairs repeated English text by saved identity and exact offsets',()=>{
    const turns=alignedApiTurns(source,english,sections);
    expect(turns[0].passages).toEqual([{id:'s1',label:'You',original:'கேள்வி',english:'Question'}]);
    expect(turns[1].passages.map(p=>[p.id,p.original,p.english])).toEqual([['t1s1','முதல்','Same answer.'],['t1s2','இரண்டு','Same answer.']]);
  });
  it('rejects missing, duplicate, stale and out-of-bounds alignments',()=>{
    for(const change of [
      (c:Conversation)=>{c.translation!.alignment!.pop();},
      (c:Conversation)=>{c.translation!.alignment![1].segment_id='t1s1';},
      (c:Conversation)=>{c.translation!.alignment![0].source_end++;},
      (c:Conversation)=>{c.translation!.alignment![0].end=999;},
      (c:Conversation)=>{c.messages[1].turn_id='different';},
    ]){
      const copy=structuredClone(english);change(copy);
      expect(()=>alignedApiTurns(source,copy,sections)).toThrow();
    }
  });
});
