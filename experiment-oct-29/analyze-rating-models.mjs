import fsp from 'node:fs/promises';
import path from 'node:path';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot,languages,models,selectedTopics} from './config.mjs';
import {validateMarkerFreeRatings} from './marker-free-rating-core.mjs';
import {compareLanguages} from './rating-language-stats.mjs';
import {renderModelRatingReport} from './rating-model-report.mjs';

if(process.argv.length!==2)throw Error('Run without arguments to compare model ratings');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local Supabase required');
const out=path.join(runRoot,'reports');
const source=JSON.parse(await fsp.readFile(path.join(out,'rating-language-comparison.json'),'utf8'));
if(source.conversations!==882||source.prompt_version!=='marker-free-turn-ratings/4')throw Error('Expected the completed original-conversation version 4 dataset');
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
let rows;
try{
 rows=(await db.query(`select c.id,c.topic_id,c.language,c.transcript->>'provider' as model,
 r.ratings,r.rubric_hash,r.rubric_snapshot from public.conversation_version_rating_runs r
 join public.conversations c on c.id=r.conversation_id
 where r.prompt_version='marker-free-turn-ratings/4' and r.status='completed' and c.source_conversation_id is null`)).rows;
}finally{await db.end();}
const ids=new Set(),cells=new Map(),samples=[];
for(const row of rows){
 if(ids.has(row.id)||row.rubric_hash!==source.rubric_hash||!models.includes(row.model)||!languages.includes(row.language)||!selectedTopics.includes(row.topic_id))throw Error(`Unexpected rating record: ${row.id}`);
 ids.add(row.id);
 const cell=[row.model,row.topic_id,row.language].join('|');cells.set(cell,(cells.get(cell)||0)+1);
 validateMarkerFreeRatings({ratings:row.ratings},{messages:row.ratings.map(rating=>({speaker:'tutor',turn_id:rating.turn_id}))},row.rubric_snapshot.rating_dimensions);
 for(const dimension of source.dimensions){
  const values=row.ratings.flatMap(rating=>rating.values[dimension.key]?[rating.values[dimension.key].score]:[]),numeric=values.filter(Number.isFinite);
  samples.push({model:row.model,topic:row.topic_id,source_language:row.language,key:dimension.key,
   score:numeric.length?numeric.reduce((sum,value)=>sum+value,0)/numeric.length:null,na_turns:values.length-numeric.length});
 }
}
if(ids.size!==882||models.some(model=>selectedTopics.some(topic=>languages.some(language=>cells.get([model,topic,language].join('|'))!==3))))throw Error('Expected 882 originals with three tries per model/topic/language cell');
const resamples=9999,scopes=['all',...languages],results={};
for(const scope of scopes){
 results[scope]={};
 const blockKeys=scope==='all'?selectedTopics.flatMap(topic=>languages.map(language=>`${topic}|${language}`)):selectedTopics;
 for(const dimension of source.dimensions){
  const subset=samples.filter(sample=>sample.key===dimension.key&&(scope==='all'||sample.source_language===scope));
  // Reuse the established group-permutation implementation, using model IDs as
  // group labels and topic/language cells as blocks in the pooled view.
  const grouped=subset.map(sample=>({...sample,language:sample.model,topic:scope==='all'?`${sample.topic}|${sample.source_language}`:sample.topic}));
  const comparison=compareLanguages(grouped,blockKeys,models,{resamples,seed:`model-comparison:${scope}:${dimension.key}`});
  const {topics_in_test,topic_means,...rest}=comparison;
  results[scope][dimension.key]={...rest,blocks_in_test:topics_in_test,blocks_expected:blockKeys.length,block_means:topic_means,
   na_turns:Object.fromEntries(models.map(model=>[model,subset.filter(sample=>sample.model===model).reduce((sum,sample)=>sum+sample.na_turns,0)]))};
 }
 console.log(JSON.stringify({scope,omnibus_significant:source.dimensions.filter(dimension=>results[scope][dimension.key].omnibus.p<.05).length,
  pairwise_significant:source.dimensions.reduce((sum,dimension)=>sum+results[scope][dimension.key].pairs.filter(pair=>pair.significant).length,0)}));
}
const report={format_version:'rating-model-comparison/1',generated_at:new Date().toISOString(),source:source.source,
 prompt_version:source.prompt_version,rubric_hash:source.rubric_hash,evaluator_model:source.evaluator_model,
 conversations:882,resamples,models,languages,language_names:source.language_names,topics:selectedTopics,
 topic_names:source.topic_names,dimensions:source.dimensions,results};
await fsp.writeFile(path.join(out,'rating-model-comparison.json'),JSON.stringify(report,null,2)+'\n');
await fsp.writeFile(path.join(out,'rating-model-comparison.html'),renderModelRatingReport(report));
const columns=['scope','dimension','model','n','mean','sd','median','na_turns','omnibus_p','blocks_in_test'];
const quote=value=>value==null?'':`"${String(value).replaceAll('"','""')}"`;
const csvRows=scopes.flatMap(scope=>source.dimensions.flatMap(dimension=>models.map(model=>{
 const result=results[scope][dimension.key],summary=result.summaries[model];
 return [scope,dimension.label,model,summary.n,summary.mean,summary.sd,summary.median,result.na_turns[model],result.omnibus.p,result.blocks_in_test].map(quote).join(',');
})));
await fsp.writeFile(path.join(out,'rating-model-summary.csv'),columns.join(',')+'\n'+csvRows.join('\n')+'\n');
console.log(JSON.stringify({report:path.join(out,'rating-model-comparison.html'),conversations:882,scopes:scopes.length}));
