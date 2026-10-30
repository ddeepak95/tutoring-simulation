import fsp from 'node:fs/promises';
import path from 'node:path';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot} from './config.mjs';
import {validateMarkerFreeRatings} from './marker-free-rating-core.mjs';
import {combinedRatingScore} from './rating-tables.mjs';

export async function loadTranslatedRatingScores(original){
 loadEnvironment();loadSupabaseEnvironment();
 const config=profile(process.env,'local');
 if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local Supabase required');
 const manifest=JSON.parse(await fsp.readFile(path.join(runRoot,'manifest.json'),'utf8'));
 const expected=new Map(manifest.items.filter(item=>item.language!=='en').map(item=>[item.translation?.id,item]));
 if(expected.size!==756||expected.has(undefined))throw Error('Translation manifest incomplete');
 const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
 let rows;
 try{
  rows=(await db.query(`select c.id,c.source_conversation_id,c.language as transcript_language,c.topic_id,
   s.language as source_language,s.source_conversation_id as source_parent,s.transcript->>'provider' as model,
   r.id as run_id,r.ratings,r.rubric_hash,r.rubric_snapshot,r.prompt_version
   from public.conversations c join public.conversations s on s.id=c.source_conversation_id
   join public.conversation_version_rating_runs r on r.conversation_id=c.id
   where r.prompt_version=$1 and r.version_key='marker-free-v1' and r.status='completed'`,[original.prompt_version])).rows;
 }finally{await db.end();}
 if(rows.length!==756||new Set(rows.map(row=>row.id)).size!==756)throw Error('Expected 756 completed distinct English translation ratings');
 const conversations=rows.map(row=>{
  const item=expected.get(row.id);
  if(!item||row.rubric_hash!==original.rubric_hash||row.transcript_language!=='en'||row.source_parent!==null||row.source_conversation_id!==item.id||row.source_language!==item.language||row.topic_id!==item.topic||row.model!==item.model)throw Error(`Translation rating metadata differs: ${row.id}`);
  validateMarkerFreeRatings({ratings:row.ratings},{messages:row.ratings.map(rating=>({speaker:'tutor',turn_id:rating.turn_id}))},row.rubric_snapshot.rating_dimensions);
  const scores={},naTurns={};
  for(const dimension of original.dimensions){
   const values=row.ratings.flatMap(rating=>rating.values[dimension.key]?[rating.values[dimension.key].score]:[]),numeric=values.filter(Number.isFinite);
   const turns=dimension.first_only?1:dimension.subsequent_only?2:3;
   if(values.length!==turns)throw Error(`Translation rubric question differs: ${row.id}`);
   scores[dimension.key]=numeric.length?numeric.reduce((sum,value)=>sum+value,0)/numeric.length:null;
   naTurns[dimension.key]=values.length-numeric.length;
  }
  return {id:row.id,source_id:item.id,run_id:row.run_id,cohort_role:'english_translation',model:row.model,language:row.source_language,transcript_language:'en',topic:item.topic,try:item.attempt,scores,na_turns:naTurns,combined_score:combinedRatingScore(scores)};
 });
 const englishReference=original.conversations.filter(row=>row.language==='en');
 if(englishReference.length!==126)throw Error('Expected 126 unchanged original English scores');
 conversations.push(...englishReference.map(row=>({...row,cohort_role:'english_original_reference',transcript_language:'en'})));
 return {cohort:'translations',prompt_version:original.prompt_version,rubric_hash:original.rubric_hash,models:original.models,
  translated_conversations:756,english_reference_conversations:126,
  languages:original.languages,language_names:original.language_names,topics:original.topics,
  topic_names:original.topic_names,dimensions:original.dimensions,conversations};
}
