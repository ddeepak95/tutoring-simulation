import {expect,it} from 'vitest';
import {PGlite} from '@electric-sql/pglite';
import fs from 'node:fs';
import {bundledRubric,C} from '../src/lib';
import {bundledRubric as legacy} from './fixtures/legacy-rubric';

it('archives old Label work atomically, preserves ratings, and starts blank item assignments exactly once',async()=>{
 const db=new PGlite();
 const admin='00000000-0000-4000-8000-000000000001',alice='00000000-0000-4000-8000-000000000002',bob='00000000-0000-4000-8000-000000000003',doc='00000000-0000-4000-8000-000000000010';
 try {
    await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;create table auth.users(id uuid primary key,email text);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;grant usage on schema public,auth,storage to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated;`);
    for (const file of fs.readdirSync('supabase/migrations').filter(file => file.endsWith('.sql') && file < '202610210001').sort()) {
      await db.exec(fs.readFileSync(`supabase/migrations/${file}`, 'utf8'));
    }
    await db.exec(fs.readFileSync('supabase/migrations/202610210004_memory_aid_rubric.sql', 'utf8'));
    await db.exec(fs.readFileSync('supabase/migrations/202610210011_highlight_item_counts.sql', 'utf8').split('-- Keep active Label work')[0] + 'commit;');
    await db.exec(fs.readFileSync('supabase/migrations/202610210020_live_label_rubric.sql', 'utf8'));
    await db.query('insert into auth.users(id,email) values($1,$2),($3,$4),($5,$6)', [admin, 'admin@users.annotation.invalid', alice, 'alice@users.annotation.invalid', bob, 'bob@users.annotation.invalid']);
    await db.query("update public.profiles set role='admin' where id=$1", [admin]);

 const conversation=C.normalizeConversation({conversation_id:doc,messages:[{turn_id:'t1',speaker:'tutor',text:'# Title\n\nAn example. x = 2.'}]});
 await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2::jsonb)',[legacy.rubric_sha256,JSON.stringify(legacy)]);
 await db.query('insert into public.conversations(id,label,transcript,created_by) values($1,$2,$3::jsonb,$4)',[doc,'Test',JSON.stringify(conversation),admin]);
 const old=C.createAnnotation('examples',C.makeEvidence(conversation,'t1',0,conversation.messages[0].text.length),legacy.rubric,'old');old.entry.detail_level='Brief';
 const baselineId='00000000-0000-4000-8000-000000000030';
 await db.query("insert into public.llm_generation_runs(id,conversation_id,created_by,status) values($1,$2,$3,'completed')",[baselineId,doc,admin]);
 await db.query("insert into public.llm_baselines(id,conversation_id,rubric_hash,annotations,model,prompt_version,prompt,prompt_sha256,transcript_sha256,generation_config,created_by) values($1,$2,$3,$4::jsonb,'test/model','legacy/1','Old prompt',$5,$5,'{}',$6)",[baselineId,doc,legacy.rubric_sha256,JSON.stringify([old]),'a'.repeat(64),admin]);
 const active=(await db.query<any>("insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,status,revision,annotations) values($1,$2,$3,'label','in_progress',4,$4::jsonb) returning *",[doc,alice,legacy.rubric_sha256,JSON.stringify([old])])).rows[0];
 const submitted=(await db.query<any>("insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,status,submitted_at,annotations) values($1,$2,$3,'label','submitted',now(),$4::jsonb) returning *",[doc,bob,legacy.rubric_sha256,JSON.stringify([old])])).rows[0];
 const inactive=(await db.query<any>("insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type,is_active,unassigned_at) values($1,$2,$3,'label',false,now()) returning *",[doc,admin,legacy.rubric_sha256])).rows[0];
 const rate=(await db.query<any>("insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type) values($1,$2,$3,'rate') returning *",[doc,alice,legacy.rubric_sha256])).rows[0];
 await db.query("insert into public.annotation_revisions(assignment_id,revision,annotations,turn_ratings,status,actor_id,operation) values($1,4,$2::jsonb,'{}','in_progress',$3,'save')",[active.id,JSON.stringify([old]),alice]);
 const migration=fs.readFileSync('supabase/migrations/202610260001_section_item_labels.sql','utf8').replaceAll('__CURRENT_RUBRIC_HASH__',bundledRubric.rubric_sha256).replaceAll('__CURRENT_RUBRIC_JSON__',JSON.stringify(bundledRubric).replaceAll("'","''"));
 const broken=migration.replace("and jsonb_array_length(snapshot->'rubric')=15","and jsonb_array_length(snapshot->'rubric')=99");
 await expect(db.exec(broken)).rejects.toThrow(/Register/);await db.exec('rollback');
 expect((await db.query<any>('select is_active from public.assignments where id=$1',[active.id])).rows[0].is_active).toBe(true);
 await db.exec(migration);
 const rows=(await db.query<any>('select * from public.assignments order by id')).rows;
 expect(rows).toHaveLength(6);
 for(const before of [active,submitted]){
  const archived=rows.find(r=>r.id===before.id);
  expect(archived).toMatchObject({is_active:false,annotations:before.annotations,status:before.status,rubric_hash:before.rubric_hash,revision:before.revision,submitted_at:before.submitted_at,baseline_id:before.baseline_id,annotation_source:before.annotation_source});
 }
 expect(rows.find(r=>r.id===rate.id)).toEqual(rate);expect(rows.find(r=>r.id===inactive.id)).toEqual(inactive);
 const replacements=rows.filter(r=>r.rubric_hash===bundledRubric.rubric_sha256);
 for(const row of replacements)expect(row).toMatchObject({is_active:true,status:'not_started',annotations:[],turn_ratings:{},revision:0,baseline_id:null,annotation_source:'blank'});
 expect((await db.query('select * from public.label_schema_replacements')).rows).toHaveLength(2);
 expect((await db.query('select * from public.annotation_revisions where assignment_id=$1',[active.id])).rows).toHaveLength(1);
 const replacement=replacements.find(r=>r.annotator_id===alice)!;
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${alice}',false);`);
 const fresh=C.createAnnotation('examples',C.makeEvidence(conversation,'t1',0,conversation.messages[0].text.length),bundledRubric.rubric,'new');fresh.entry.count=3;
 await db.query('select public.save_assignment($1,0,$2::jsonb,false,$3::jsonb)',[replacement.id,JSON.stringify([fresh]),'{}']);
 await expect(db.query('select public.save_assignment($1,4,$2::jsonb,false,$3::jsonb)',[active.id,JSON.stringify([old]),'{}'])).rejects.toThrow(/no longer active|archived/);
 await db.exec('reset role;');
 const validate=(annotations:unknown)=>db.query('select public.validate_annotations($1::jsonb,$2::jsonb,$3::jsonb,false)',[JSON.stringify(conversation),JSON.stringify(annotations),JSON.stringify(bundledRubric)]);
 await validate([fresh]);
 await expect(validate([fresh,{...fresh,id:'duplicate'}])).rejects.toThrow(/Duplicate section/);
 await expect(validate([{...fresh,entry:{...fresh.entry,category:'Multimedia'}}])).rejects.toThrow(/Category/);
 await expect(validate([{...fresh,entry:{...fresh.entry,count:0}}])).rejects.toThrow(/count/);
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${admin}',false);`);
 await expect(db.query('select public.save_assignment($1,4,$2::jsonb,false,$3::jsonb)',[active.id,JSON.stringify([old]),'{}'])).rejects.toThrow(/archived/);
 await expect(db.query('select public.reset_annotation_assignment($1,4)',[active.id])).rejects.toThrow(/archived/);
 await expect(db.query('select public.create_task_assignments($1::uuid[],$2::uuid[],$3::text[],$4,$5::jsonb)',[[doc],[alice],['label'],bundledRubric.rubric_sha256,JSON.stringify({[doc]:baselineId})])).rejects.toThrow(/current rubric/);
 await db.exec('reset role;');await db.exec(migration);
 expect((await db.query('select id from public.assignments')).rows).toHaveLength(6);
 expect((await db.query<any>('select annotations from public.assignments where id=$1',[replacement.id])).rows[0].annotations).toEqual([fresh]);
 }finally{await db.close();}
},30000);
