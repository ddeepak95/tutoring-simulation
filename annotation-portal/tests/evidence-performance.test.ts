import {PGlite} from '@electric-sql/pglite';
import fs from 'node:fs';
import {expect,it} from 'vitest';
import {C,bundledRubric} from '../src/lib';

it('preserves every UTF-16 boundary and overlapping occurrence while validating many late passages in long tutor turns',async()=>{
 const db=new PGlite();
 try {
  await db.exec('create role anon;create role authenticated;');
  // The validator depends only on its two helpers and JSON arguments.
  await db.exec(fs.readFileSync('supabase/migrations/202610100005_evidence_performance.sql','utf8'));
  for(const source of ['','ASCII','தமிழ் 😀 words 🧑🏽‍🏫 end','aaaabaaa']){
   let units=0,position=0;
   expect((await db.query<any>('select public.utf16_offset($1,0) as v',[source])).rows[0].v).toBe(0);
   for(const char of source){
    if(char.length===2)await expect(db.query('select public.utf16_offset($1,$2)',[source,units+1])).rejects.toThrow(/Unicode/);
    units+=char.length;position++;
    expect((await db.query<any>('select public.utf16_offset($1,$2) as v',[source,units])).rows[0].v).toBe(position);
   }
   await expect(db.query('select public.utf16_offset($1,$2)',[source,source.length+1])).rejects.toThrow(/outside/);
  }
  for(const [source,quote] of [['aaaaa','aaa'],['😀a😀a😀','😀'],['Why? Why?','Why?']]){
   for(let index=source.indexOf(quote);index>=0;index=source.indexOf(quote,index+1)){
    const count=Array.from({length:index+1},(_,i)=>i).filter(i=>source.startsWith(quote,i)).length;
    expect((await db.query<any>('select public.evidence_occurrence($1,$2,$3) as v',[source,quote,[...source.slice(0,index)].length])).rows[0].v).toBe(count);
   }
  }
  const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'Long context 😀 '.repeat(600)+'Why? Why?'}]});
  const text=conversation.messages[0].text,start=text.lastIndexOf('Why?');
  const annotations=Array.from({length:30},(_,i)=>{const a=C.createAnnotation('questions',C.makeEvidence(conversation,'t1',start,start+4),bundledRubric.rubric,`q-${i}`);a.entry.question_type='Instructional';return a;});
  await db.exec("set statement_timeout='5s';");
  await db.query('select public.validate_annotations($1::jsonb,$2::jsonb,$3::jsonb,true)',[JSON.stringify(conversation),JSON.stringify(annotations),JSON.stringify(bundledRubric)]);
  const wrong=structuredClone(annotations);wrong[0].evidence[0].occurrence=1;
  await expect(db.query('select public.validate_annotations($1::jsonb,$2::jsonb,$3::jsonb,true)',[JSON.stringify(conversation),JSON.stringify(wrong),JSON.stringify(bundledRubric)])).rejects.toThrow(/occurrence/);
 }finally{await db.close();}
},15000);
