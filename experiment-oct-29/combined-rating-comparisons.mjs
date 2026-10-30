import {compareLanguages,holm} from './rating-language-stats.mjs';
import {combinedRatingScore} from './rating-tables.mjs';

export function selectRatingDimensions(data,excludedKeys){
 const excluded=new Set(excludedKeys);
 if(excluded.size!==excludedKeys.length||excluded.size===0)throw Error('Expected distinct excluded rating dimensions');
 const known=new Set(data.dimensions.map(dimension=>dimension.key));
 if([...excluded].some(key=>!known.has(key)))throw Error('Unknown excluded rating dimension');
 const dimensions=data.dimensions.filter(dimension=>!excluded.has(dimension.key));
 if(!dimensions.length)throw Error('No rating dimensions remain');
 return {...data,dimensions,conversations:data.conversations.map(row=>{
  const scores=Object.fromEntries(dimensions.map(dimension=>[dimension.key,row.scores[dimension.key]]));
  if(Object.values(scores).some(value=>value!==null&&!Number.isFinite(value)))throw Error(`Missing rating score: ${row.id}`);
  return {...row,scores,combined_score:combinedRatingScore(scores)};
 })};
}

export function compareCombinedRatings(data,{resamples=9999,onProgress=()=>{}}={}){
 const rows=data.conversations;
 const expected=data.models.length*data.languages.length*data.topics.length*3;
 if(rows.length!==expected||new Set(rows.map(row=>row.id)).size!==expected||data.models.length!==7||![6,7].includes(data.languages.length)||data.topics.length!==6)throw Error('Expected the complete six-topic cohort');
 for(const row of rows){
  const computed=combinedRatingScore(row.scores);
  if(!data.models.includes(row.model)||!data.languages.includes(row.language)||!data.topics.includes(row.topic)||!Number.isFinite(computed)||!Number.isFinite(row.combined_score)||Math.abs(computed-row.combined_score)>1e-12)throw Error('Combined score differs from saved conversation scores');
 }
 for(const model of data.models)for(const language of data.languages)for(const topic of data.topics){
  if(rows.filter(row=>row.model===model&&row.language===language&&row.topic===topic).length!==3)throw Error('Expected three tries in every cell');
 }
 function family(contexts,contextField,groupField,groups){
  const results=contexts.map(context=>{
   const samples=rows.filter(row=>row[contextField]===context).map(row=>({language:row[groupField],topic:row.topic,score:row.combined_score}));
   const prefix=data.cohort==='translations'?'combined:translations':'combined';
   const result=compareLanguages(samples,data.topics,groups,{resamples,seed:`${prefix}:${contextField}:${context}`});
   onProgress({question:contextField==='model'?'languages_within_models':'models_within_languages',context,p:result.omnibus.p});
   return {context,...result};
  });
  return gateOverallTests(results);
 }
 return {
  languages_within_models:family(data.models,'model','language',data.languages),
  models_within_languages:family(data.languages,'language','model',data.models),
 };
}

/** Adjust across the contexts in each research question, then retain its posthoc families. */
export function gateOverallTests(results){
 if(results.some(result=>result.omnibus.p===null))throw Error('Overall test unavailable');
 const adjusted=holm(results.map(result=>result.omnibus.p));
 return results.map((result,index)=>{
  const significant=adjusted[index]<.05;
  return {...result,overall_adjusted_p:adjusted[index],significant,pairs:significant?result.pairs:[]};
 });
}
