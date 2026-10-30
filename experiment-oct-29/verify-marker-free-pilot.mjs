import assert from 'node:assert/strict';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment} from './config.mjs';
import {validateMarkerFreeOutput} from './marker-free-label-core.mjs';

loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local'),id='17d387af-a04b-4a4b-a44d-36ea2dd35670';
if(process.env.SUPABASE_TARGET!=='local')throw Error('Local database required');
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
try{
 const runs=(await db.query('select * from public.conversation_version_label_runs')).rows;
 assert.equal(runs.length,1,'Pilot must be the only marker-free label run');
 const run=runs[0];assert.equal(run.conversation_id,id);assert.equal(run.version_key,'marker-free-v1');assert.equal(run.model,'gemini-3.8-flash');assert.equal(run.status,'completed');assert.equal(run.validation_policy,'exact-source-no-length/1');assert.equal(run.rubric_snapshot.rubric.length,14);
 const source=(await db.query('select transcript from public.conversation_versions where conversation_id=$1 and version_key=$2',[id,'marker-free-v1'])).rows[0].transcript;
 const raw=run.response.candidates[0].content.parts.filter(part=>typeof part.text==='string'&&!part.thought).map(part=>part.text).join('');
 const validated=validateMarkerFreeOutput(JSON.parse(raw),source,run.rubric_snapshot.rubric.map(feature=>feature.key));
 assert.deepEqual(run.annotations,validated.annotations);assert.deepEqual(run.counts,validated.counts);
 const request=JSON.stringify(run.request);for(const forbidden of ['section_id','segment_id','diagrams_and_illustrations','flow_diagrams','graphs','static_images','interactive_animated_media','headings','lists','tables','callouts','equations'])assert.ok(!request.includes(forbidden),`Unexpected marker or removed label: ${forbidden}`);
 const response=await fetch(`${config.url}/rest/v1/conversation_version_label_runs?select=id,status,model&conversation_id=eq.${id}`,{headers:{apikey:config.key,Authorization:`Bearer ${config.key}`}});
 if(!response.ok)throw Error(`Portal API cannot read pilot result: HTTP ${response.status}`);
 const rows=await response.json();assert.equal(rows.length,1);assert.equal(rows[0].id,run.id);
 console.log(JSON.stringify({verified:true,conversation_id:id,run_id:run.id,occurrences:run.annotations.length,feature_count:run.rubric_snapshot.rubric.length,other_conversation_results:0,provider_calls:1}));
}finally{await db.end();}
