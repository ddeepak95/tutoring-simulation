import {expect,it} from 'vitest';
import {PGlite} from '@electric-sql/pglite';
import {regroupLocal,validateSectionInventory} from '../scripts/regroup-local-core.mjs';
import {sectionCandidates} from '../src/section-registry';
import {bundledRubric} from '../src/lib';
const config={target:'local',url:'http://127.0.0.1:55321',dbUrl:'postgresql://localhost:55322/postgres'};
async function fixture(){
 const db=new PGlite();
 await db.exec(`create table profiles(id text primary key);insert into profiles values('alice');
 create table rubric_versions(hash text primary key,snapshot jsonb);insert into rubric_versions values('old','{"rubric":[]}');
 create table conversations(id text primary key,source_conversation_id text,transcript jsonb);
 create table html_conversations(conversation_id text primary key);insert into html_conversations values('html');
 create table conversation_capture_documents(id text,html text);insert into conversation_capture_documents values('html','preserved capture');
 create table conversation_section_sets(conversation_id text primary key references conversations(id),parser_version text);
 create table conversation_sections(conversation_id text references conversation_section_sets(conversation_id) on delete cascade,section_id text,turn_id text,turn_number int,section_number int,start int,"end" int,quote text);
 create table llm_generation_runs(id text primary key,conversation_id text);insert into llm_generation_runs values('b','ta'),('e','en');
 create table llm_baselines(id text primary key references llm_generation_runs(id),conversation_id text);insert into llm_baselines values('b','ta'),('e','en');
 create table assignments(id uuid primary key default gen_random_uuid(),conversation_id text,annotator_id text,rubric_hash text,task_type text,annotations jsonb default '[]',turn_ratings jsonb default '{}',status text default 'not_started',is_active boolean default true,baseline_id text references llm_baselines(id));
 create table annotation_revisions(assignment_id uuid references assignments(id),annotations jsonb);
 create table assignment_rubric_upgrades(assignment_id uuid references assignments(id));
 create table label_schema_replacements(old_assignment_id uuid references assignments(id),new_assignment_id uuid references assignments(id));`);
 const source={access_type:'API',messages:[{turn_id:'t1',speaker:'tutor',text:'A paragraph.\n\nA related paragraph.\n\nWhat happens next?'}]};
 const english={...source,translation:{version:'api-english/1',alignment:[{segment_id:'t1s1'}]}};
 for(const [id,parent,transcript] of [['ta',null,source],['en','ta',english],['html',null,source]] as const){await db.query('insert into conversations values($1,$2,$3)',[id,parent,JSON.stringify(transcript)]);await db.query("insert into conversation_section_sets values($1,'conversation-sections/1')",[id]);await db.query('insert into conversation_sections values($1,$2,$3,1,1,0,$4,$5)',[id,'t1s1','t1',transcript.messages[0].text.length,transcript.messages[0].text]);}
 await db.exec(`insert into assignments(conversation_id,annotator_id,rubric_hash,task_type,annotations,baseline_id) values('ta','alice','old','label','[{"section_id":"t1s1"}]','b');
 insert into assignments(conversation_id,annotator_id,rubric_hash,task_type,turn_ratings) values('ta','alice','old','rate','{"t1":{"score":3}}');
 insert into annotation_revisions select id,annotations from assignments;
 insert into assignment_rubric_upgrades select id from assignments where task_type='label';
 insert into label_schema_replacements select id,id from assignments where task_type='label';`);
 const register=async(id:string,sections:any[])=>{
  await db.query('insert into conversation_section_sets values($1,$2)',[id,sections[0].grouping_version||'conversation-sections/1']);
  const text=(await db.query<{transcript:typeof source}>('select transcript from conversations where id=$1',[id])).rows[0].transcript.messages[0].text;
  for(const s of sections)await db.query('insert into conversation_sections values($1,$2,$3,$4,$5,$6,$7,$8)',[id,`t${s.turn_number}s${s.section_number}`,s.turn_id,s.turn_number,s.section_number,s.start,s.end,text.slice(s.start,s.end)]);
 };
 return {db,register};
}
it('previews and then rebuilds with a backup, clearing labels and evaluations but preserving rating work, captures and translation text',async()=>{
 const {db,register}=await fixture();try{
  const options={rubric:bundledRubric,buildCandidates:sectionCandidates,register};
  expect(await regroupLocal(db,config,options)).toMatchObject({mode:'preview',originals:1,stale_translations:1,new_sections:2,evaluations_removed:2});
  expect((await db.query('select count(*)::int n from llm_baselines')).rows[0].n).toBe(2);
  let backup:any;expect(await regroupLocal(db,config,{...options,apply:true,backup:async data=>{backup=data;}})).toMatchObject({mode:'applied',blank_assignments:1});
  expect(backup.snapshot.llm_baselines).toHaveLength(2);
  expect((await db.query('select * from llm_baselines')).rows).toHaveLength(0);
  expect((await db.query("select annotations,status,baseline_id from assignments where task_type='label'")).rows).toEqual([{annotations:[],status:'not_started',baseline_id:null}]);
  expect((await db.query("select turn_ratings from assignments where task_type='rate'")).rows[0].turn_ratings).toEqual({t1:{score:3}});
  const translated=(await db.query('select transcript from conversations where id=$1',['en'])).rows[0].transcript;
  expect(translated.translation.alignment_status).toBe('stale');expect(translated.messages).toEqual(backup.snapshot.conversations.find(c=>c.id==='en').transcript.messages);
  expect((await db.query("select parser_version from conversation_section_sets where conversation_id='ta'")).rows[0].parser_version).toBe('api-cohesive/2');
  expect((await db.query("select * from conversation_sections where conversation_id='html'")).rows).toHaveLength(1);
 }finally{await db.close();}
});
it('rolls back if backup or preservation verification fails',async()=>{
 const {db,register}=await fixture();try{
  await expect(regroupLocal(db,config,{rubric:bundledRubric,buildCandidates:sectionCandidates,register,apply:true,backup:async()=>{throw Error('disk full');}})).rejects.toThrow('disk full');
  await db.exec("create function sabotage() returns trigger language plpgsql as $$begin delete from profiles;return old;end;$$;create trigger sabotage before delete on llm_baselines for each row execute function sabotage();");
  await expect(regroupLocal(db,config,{rubric:bundledRubric,buildCandidates:sectionCandidates,register,apply:true,backup:async()=>{}})).rejects.toThrow('Protected table changed');
  expect((await db.query('select * from profiles')).rows).toHaveLength(1);expect((await db.query('select * from llm_baselines')).rows).toHaveLength(2);
 }finally{await db.close();}
});
it('rejects cloud targets and incomplete or overlapping inventories',async()=>{
 await expect(regroupLocal(null,{...config,target:'cloud'})).rejects.toThrow('local loopback');
 const c={messages:[{turn_id:'t',speaker:'tutor',text:'First.\n\nSecond.'}]};
 expect(()=>validateSectionInventory(c,[{turn_id:'t',turn_number:1,section_number:1,start:0,end:6}])).toThrow('trailing');
 expect(()=>validateSectionInventory(c,[{turn_id:'t',turn_number:1,section_number:1,start:0,end:9},{turn_id:'t',turn_number:1,section_number:2,start:8,end:15}])).toThrow('overlapping');
});
