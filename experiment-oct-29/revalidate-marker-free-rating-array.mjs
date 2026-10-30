import fsp from 'node:fs/promises';
import path from 'node:path';
import {isDeepStrictEqual} from 'node:util';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot} from './config.mjs';
import {normalizeBareRatingArray,validateMarkerFreeRatings} from './marker-free-rating-core.mjs';

const ids=process.argv.slice(2);
const versionKey='marker-free-v1',promptVersion='marker-free-turn-ratings/4';
if(ids.length===0||ids.some(id=>!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/.test(id)))throw Error('Pass one or more conversation UUIDs');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local database required');
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
try{
 for(const id of ids){
  const checkpointFile=path.join(runRoot,'marker-free-ratings',`${id}.${promptVersion.replaceAll('/','-')}.json`);
  const checkpoint=JSON.parse(await fsp.readFile(checkpointFile,'utf8'));
  if(checkpoint.conversation_id!==id||checkpoint.version_key!==versionKey||checkpoint.prompt_version!==promptVersion||checkpoint.status!=='failed'||!checkpoint.response)throw Error(`Saved failed response missing for ${id}`);
  await db.query('begin');
  try{
   const [version]=(await db.query('select transcript from public.conversation_versions where conversation_id=$1 and version_key=$2',[id,versionKey])).rows;
   const [run]=(await db.query('select * from public.conversation_version_rating_runs where id=$1 for update',[checkpoint.id])).rows;
   if(!version||!run||run.conversation_id!==id||run.version_key!==versionKey||run.prompt_version!==promptVersion||run.status!=='failed'||!isDeepStrictEqual(run.response,checkpoint.response))throw Error(`Saved response differs from database for ${id}`);
   const candidate=checkpoint.response.candidates?.[0];
   if(candidate?.finishReason!=='STOP')throw Error(`Provider did not finish for ${id}`);
   const raw=(candidate.content?.parts||[]).filter(part=>typeof part.text==='string'&&!part.thought).map(part=>part.text).join('');
   const ratings=validateMarkerFreeRatings(normalizeBareRatingArray(JSON.parse(raw)),version.transcript,run.rubric_snapshot.rating_dimensions);
   await db.query("update public.conversation_version_rating_runs set ratings=$2::jsonb,status='completed',error=null,normalization_policy='bare-ratings-array/1' where id=$1",[run.id,JSON.stringify(ratings)]);
   await db.query('commit');
   checkpoint.status='completed';checkpoint.error=null;checkpoint.ratings=ratings;checkpoint.normalization_policy='bare-ratings-array/1';
   await fsp.writeFile(checkpointFile,JSON.stringify(checkpoint,null,2)+'\n');
   console.log(JSON.stringify({result:'completed_from_saved_response',conversation_id:id,run_id:run.id,prompt_version:promptVersion,turns:ratings.length,provider_calls:1}));
  }catch(error){await db.query('rollback');throw error;}
 }
}finally{await db.end();}
