import assert from 'node:assert/strict';
import {assertLocalResetTarget} from './reset-local-labeling-core.mjs';
const quote=value=>'"'+value.replaceAll('"','""')+'"';
const sorted=rows=>rows.map(r=>JSON.stringify(r)).sort();

export function validateSectionInventory(conversation,candidates){
 let turnNumber=0;
 const meaningful=value=>value.replace(/^[\t ]{0,3}(?:[-*_][\t ]*){3,}$/gm,'').trim();
 for(const turn of conversation.messages.filter(t=>t.speaker==='tutor')){
  turnNumber++;let previous=0;
  const text=turn.text.split(/^Agent-explored interactive state state_\d+ \(capture action, not a learner response\):?[\t ]*\r?$/m)[0];
  const ranges=candidates.filter(s=>s.turn_id===turn.turn_id);
  assert(ranges.length,`Missing tutor turn ${turn.turn_id}`);
  for(const [i,s] of ranges.entries()){
   assert(s.turn_number===turnNumber&&s.section_number===i+1,'Incorrect section order');
   assert(Number.isInteger(s.start)&&Number.isInteger(s.end)&&s.start>=previous&&s.end>s.start&&s.end<=text.length,'Invalid or overlapping ranges');
   assert(!meaningful(text.slice(previous,s.start)),'Sections leave instructional text uncovered');
   assert(meaningful(text.slice(s.start,s.end)),'Empty or divider-only section');previous=s.end;
  }
  assert(!meaningful(text.slice(previous)),'Sections omit trailing instructional text');
 }
 assert(candidates.every(s=>conversation.messages.some(t=>t.turn_id===s.turn_id&&t.speaker==='tutor')),'Unknown tutor turn');
}

/** Explicit local maintenance only; never invoked by migrations or portal startup. */
export async function regroupLocal(db,config,{rubric,buildCandidates,backup,apply=false,migration='',register}={}){
 assertLocalResetTarget(config);
 await db.query('begin isolation level serializable');
 try{
  await db.query("select pg_advisory_xact_lock(hashtext('annotation-portal-full-sync'))");
  const tables=(await db.query("select tablename from pg_tables where schemaname='public' order by tablename")).rows.map(r=>r.tablename);
  for(const t of tables)await db.query(`lock table public.${quote(t)} in share row exclusive mode`);
  const snapshot={};for(const t of tables)snapshot[t]=(await db.query(`select row_to_json(t) row from public.${quote(t)} t`)).rows.map(r=>r.row);
  const originals=snapshot.conversations.filter(c=>c.transcript.access_type==='API'&&!c.source_conversation_id&&!c.transcript.source_conversation_id&&!c.transcript.translation&&!snapshot.html_conversations?.some(h=>h.conversation_id===c.id));
  assert(originals.length,'No original API conversations found.');
  const sourceIds=originals.map(c=>c.id),originalIds=new Set(sourceIds);
  const translations=snapshot.conversations.filter(c=>originalIds.has(c.source_conversation_id||c.transcript.source_conversation_id));
  const affected=[...sourceIds,...translations.map(c=>c.id)],affectedSet=new Set(affected);
  const candidates=new Map();
  for(const c of originals){const proposed=await buildCandidates(c.transcript);assert(proposed.length,`No sections for ${c.id}`);validateSectionInventory(c.transcript,proposed);candidates.set(c.id,proposed);}
  const active=snapshot.assignments.filter(a=>affectedSet.has(a.conversation_id)&&a.is_active&&a.task_type!=='rate').map(a=>({conversation_id:a.conversation_id,annotator_id:a.annotator_id}));
  const labelIds=snapshot.assignments.filter(a=>affectedSet.has(a.conversation_id)&&a.task_type==='label').map(a=>a.id);
  const both=snapshot.assignments.filter(a=>affectedSet.has(a.conversation_id)&&a.task_type==='both');
  const doomedBaselines=new Set(snapshot.llm_baselines.filter(b=>affectedSet.has(b.conversation_id)).map(b=>b.id));
  // Never destroy a rating's provenance to make a cleanup succeed.
  assert(!snapshot.assignments.some(a=>a.task_type!=='label'&&doomedBaselines.has(a.baseline_id)),'Rating assignment references an affected evaluation; preserve or detach its provenance before regrouping.');
  const summary={originals:originals.length,stale_translations:translations.length,previous_sections:snapshot.conversation_sections.filter(s=>originalIds.has(s.conversation_id)).length,new_sections:[...candidates.values()].reduce((n,s)=>n+s.length,0),evaluations_removed:doomedBaselines.size,blank_assignments:active.length};
  if(!apply){await db.query('rollback');return {mode:'preview',...summary};}
  assert(typeof backup==='function','A verified backup is required before applying regrouping.');
  await backup({snapshot,summary,candidates:Object.fromEntries(candidates)});
  if(migration)await db.query(migration.replace(/^begin;\s*$/gm,'').replace(/^commit;\s*$/gm,''));
  const remove=async(table,where,values)=>{if(tables.includes(table))await db.query(`delete from public.${quote(table)} where ${where}`,values);};
  await remove('assignment_rubric_upgrades','assignment_id=any($1)',[labelIds]);
  await remove('label_schema_replacements','old_assignment_id=any($1) or new_assignment_id=any($1)',[labelIds]);
  await remove('annotation_revisions','assignment_id=any($1)',[labelIds]);
  await remove('assignments','id=any($1)',[labelIds]);
  for(const a of both)await db.query("update public.assignments set task_type='rate',annotations='[]'::jsonb where id=$1",[a.id]);
  await remove('llm_baselines','conversation_id=any($1)',[affected]);
  await remove('llm_generation_runs','conversation_id=any($1)',[affected]);
  // Recreate sets rather than updating immutable registered section boundaries.
  await remove('conversation_section_sets','conversation_id=any($1)',[sourceIds]);
  const registerSections=register||((id,sections)=>db.query('select public.register_conversation_sections($1,$2::jsonb)',[id,JSON.stringify(sections)]));
  for(const c of originals)await registerSections(c.id,candidates.get(c.id));
  for(const c of translations){
   const transcript={...c.transcript,translation:{...c.transcript.translation,alignment_status:'stale',stale_reason:'Source sections regrouped; retranslation required.',source_grouping_version:'api-cohesive/2'}};
   const old=snapshot.conversation_sections.filter(s=>s.conversation_id===c.id).sort((a,b)=>a.turn_number-b.turn_number||a.section_number-b.section_number);
   const version=snapshot.conversation_section_sets.find(s=>s.conversation_id===c.id)?.parser_version||'conversation-sections/1';
   await remove('conversation_section_sets','conversation_id=$1',[c.id]);
   await db.query('update public.conversations set transcript=$2::jsonb where id=$1',[c.id,JSON.stringify(transcript)]);
   if(old.length)await registerSections(c.id,old.map(s=>({turn_id:s.turn_id,turn_number:s.turn_number,section_number:s.section_number,start:s.start,end:s.end,grouping_version:version})));
  }
  await db.query('insert into public.rubric_versions(hash,snapshot) values($1,$2::jsonb) on conflict(hash) do nothing',[rubric.rubric_sha256,JSON.stringify(rubric)]);
  for(const a of active)await db.query("insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type) values($1,$2,$3,'label')",[a.conversation_id,a.annotator_id,rubric.rubric_sha256]);
  // Verify IDs, original source records, all message text and preserved rating work.
  const saved=(await db.query('select row_to_json(c) row from public.conversations c')).rows.map(r=>r.row);
  assert.deepEqual(saved.map(c=>c.id).sort(),snapshot.conversations.map(c=>c.id).sort());
  for(const before of snapshot.conversations){const after=saved.find(c=>c.id===before.id);assert.deepEqual(after.transcript.messages,before.transcript.messages);if(!translations.some(t=>t.id===before.id))assert.deepEqual(after,before);}
  const ratingIds=new Set(snapshot.assignments.filter(a=>a.task_type==='rate').map(a=>a.id));
  const ratings=(await db.query("select row_to_json(a) row from public.assignments a where task_type='rate'")).rows.map(r=>r.row).filter(a=>ratingIds.has(a.id));
  assert.deepEqual(sorted(ratings),sorted(snapshot.assignments.filter(a=>ratingIds.has(a.id))));
  const sections=(await db.query('select * from public.conversation_sections')).rows;
  for(const c of originals){const inventory=sections.filter(s=>s.conversation_id===c.id).sort((a,b)=>a.turn_number-b.turn_number||a.section_number-b.section_number);const proposed=candidates.get(c.id);assert.equal(inventory.length,proposed.length);for(const [i,s] of inventory.entries()){const p=proposed[i];assert.equal(s.section_id,`t${p.turn_number}s${p.section_number}`);assert.equal(s.start,p.start);assert.equal(s.end,p.end);assert.equal(s.quote,c.transcript.messages.find(t=>t.turn_id===s.turn_id).text.slice(s.start,s.end));}}
  const changed=new Set(['conversations','conversation_section_sets','conversation_sections','conversation_section_states','assignments','annotation_revisions','assignment_rubric_upgrades','label_schema_replacements','llm_baselines','llm_generation_runs','rubric_versions']);
  for(const t of tables.filter(t=>!changed.has(t))){const now=(await db.query(`select row_to_json(t) row from public.${quote(t)} t`)).rows.map(r=>r.row);assert.deepEqual(sorted(now),sorted(snapshot[t]),`Protected table changed: ${t}`);}
  for(const old of snapshot.rubric_versions){const row=(await db.query('select snapshot from public.rubric_versions where hash=$1',[old.hash])).rows[0];assert.deepEqual(row.snapshot,old.snapshot);}
  const revisions=(await db.query('select row_to_json(r) row from public.annotation_revisions r')).rows.map(r=>r.row);assert.deepEqual(sorted(revisions.filter(r=>ratingIds.has(r.assignment_id))),sorted(snapshot.annotation_revisions.filter(r=>ratingIds.has(r.assignment_id))));
  await db.query('commit');return {mode:'applied',...summary};
 }catch(error){await db.query('rollback');throw error;}
}
