import {strict as assert} from 'node:assert';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {isDeepStrictEqual} from 'node:util';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot} from './config.mjs';
import {normalizeSplitRatingObjects,validateMarkerFreeRatings} from './marker-free-rating-core.mjs';

const id='17d387af-a04b-4a4b-a44d-36ea2dd35670';
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local database required');
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
try{
 const runs=(await db.query('select * from public.conversation_version_rating_runs where conversation_id=$1 order by created_at',[id])).rows;
 assert.deepEqual(runs.map(run=>run.prompt_version),['marker-free-turn-ratings/1','marker-free-turn-ratings/2']);
 const [oldRun,newRun]=runs;
 assert.equal(oldRun.status,'completed');assert.equal(newRun.status,'completed');
 assert.deepEqual(oldRun.rubric_snapshot.rating_dimensions[0].options,['3','2','1','N/A']);
 assert.deepEqual(newRun.rubric_snapshot.rating_dimensions[0].options,['5','4','3','2','1','N/A']);
 assert.equal(newRun.normalization_policy,'split-rating-objects/1');
 assert.equal(newRun.rubric_snapshot.rating_dimensions.find(item=>item.key==='examples_analogies_and_real_world_connections').description,'How effectively does the chatbot use explanatory devices (such as examples, analogies, or real-world connections) to explain the concept?');
 const [version]=(await db.query('select transcript from public.conversation_versions where conversation_id=$1 and version_key=$2',[id,'marker-free-v1'])).rows;
 const checkpoint=JSON.parse(await fsp.readFile(path.join(runRoot,'marker-free-ratings',`${id}.marker-free-turn-ratings-2.json`),'utf8'));
 assert.ok(isDeepStrictEqual(newRun.response,checkpoint.response));
 const raw=newRun.response.candidates[0].content.parts.filter(part=>part.text&&!part.thought).map(part=>part.text).join('');
 const validated=validateMarkerFreeRatings(normalizeSplitRatingObjects(JSON.parse(raw),version.transcript,newRun.rubric_snapshot.rating_dimensions),version.transcript,newRun.rubric_snapshot.rating_dimensions);
 assert.ok(isDeepStrictEqual(newRun.ratings,validated));
 assert.equal(validated.length,3);
 console.log(JSON.stringify({result:'verified',conversation_id:id,runs:runs.map(run=>({id:run.id,prompt_version:run.prompt_version,status:run.status,scale:run.rubric_snapshot.rating_dimensions[0].options,turns:run.ratings.length,normalization_policy:run.normalization_policy})),provider_calls_for_new_run:1}));
}finally{await db.end();}
