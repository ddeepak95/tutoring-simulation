import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {profile,connectProfile} from './supabase-sync-core.mjs';
import {friedmanPermutation,exactPairedDifference,holm,summary} from './html-rating-statistics.mjs';
import {omnibusPermutation} from '../../experiment-oct-29/rating-language-stats.mjs';
import {validateMarkerFreeRatings} from '../../experiment-oct-29/marker-free-rating-core.mjs';
import {htmlLanguageReport,htmlComparisonTableCsvs} from './html-language-report.mjs';

const portal=path.resolve(import.meta.dirname,'..'),root=path.join(portal,'.runtime/bulk-html-local'),out=path.join(root,'analysis');
process.loadEnvFile(path.join(portal,'.env.local'));
const selected=JSON.parse(await fs.readFile(path.join(root,'state.json'),'utf8')).items;
const languages=JSON.parse(await fs.readFile(path.join(portal,'../agentic_conversation_capture/languages.json'),'utf8'));
const sha=value=>createHash('sha256').update(value).digest('hex');
const mean=values=>values.reduce((a,b)=>a+b,0)/values.length;
const csv=value=>'"'+String(value??'').replaceAll('"','""')+'"';
const writeCSV=(file,headers,rows)=>fs.writeFile(path.join(out,file),[headers,...rows].map(row=>row.map(csv).join(',')).join('\r\n')+'\r\n');
const c=await connectProfile(profile(process.env,'local'));
let records;
try{
 records=(await c.db.query(`select distinct on(c.id) c.id conversation_id,c.topic_id topic,c.language,c.transcript->>'provider' source_provider,c.transcript,r.id run_id,r.model,r.provider,r.prompt_version,r.prompt_sha256,r.rubric_hash,r.rubric_snapshot,r.ratings,r.capture_version_hash,r.created_at,r.generation_config->>'rating_questions_source_sha256' rating_questions_source_sha256
 from public.conversations c join public.html_conversations h on h.conversation_id=c.id
 join public.conversation_html_rating_runs r on r.conversation_id=c.id and r.capture_version_hash=h.version_hash
 where c.id=any($1::uuid[]) and r.provider='google' and r.model='gemini-3.8-flash' and r.prompt_version='html-turn-screenshot-ratings/2' and r.status='completed'
 order by c.id,r.created_at desc`,[selected.map(i=>i.conversation_id)])).rows;
}finally{await c.db.end();}
if(records.length!==50)throw Error('Expected exactly 50 completed HTML evaluations.');
for(const field of ['model','provider','prompt_version','prompt_sha256','rubric_hash','rating_questions_source_sha256'])if(new Set(records.map(r=>r[field])).size!==1)throw Error('Mixed evaluation provenance: '+field);
if(new Set(records.map(r=>r.source_provider.toLowerCase())).size!==1||records[0].source_provider.toLowerCase()!=='chatgpt')throw Error('This analysis is restricted to the ChatGPT HTML cohort.');
const dimensions=records[0].rubric_snapshot.rating_dimensions,shared=dimensions.filter(d=>!d.first_only&&!d.subsequent_only);
if(shared.length!==7||dimensions.length!==9)throw Error('Expected seven shared and two turn-specific rating questions.');
let numericScores=0,naScores=0;
const conversations=records.map(record=>{
 const ratings=validateMarkerFreeRatings({ratings:record.ratings},record.transcript,dimensions),scores={},coverage={};
 for(const dimension of dimensions){const values=ratings.flatMap(turn=>turn.values[dimension.key]?[turn.values[dimension.key].score]:[]);coverage[dimension.key]={applicable_turns:values.length,na:values.filter(v=>v==='N/A').length};
  const numeric=values.filter(v=>v!=='N/A');numericScores+=numeric.length;naScores+=values.length-numeric.length;scores[dimension.key]=numeric.length?mean(numeric):null;
 }
 const common=shared.map(d=>scores[d.key]);
 return {conversation_id:record.conversation_id,run_id:record.run_id,topic:record.topic,language:record.language,tutor_turns:ratings.length,scores,coverage,common_seven:common.every(Number.isFinite)?mean(common):null,all_scores_mean:mean(ratings.flatMap(t=>Object.values(t.values).map(v=>v.score).filter(v=>v!=='N/A')))};
}).sort((a,b)=>a.topic.localeCompare(b.topic)||a.language.localeCompare(b.language));
const topicIds=[...new Set(conversations.map(c=>c.topic))].sort(),languageIds=[...new Set(conversations.map(c=>c.language))].sort();
if(topicIds.length!==5||languageIds.length!==10)throw Error('Expected five topics and ten languages.');
const cells=new Map();for(const row of conversations){const key=row.topic+'|'+row.language;if(cells.has(key))throw Error('Duplicate topic-language cell.');cells.set(key,row);}
if(topicIds.some(t=>languageIds.some(l=>!cells.has(t+'|'+l))))throw Error('Missing matched topic-language cells.');
const endpoints=[{key:'common_seven',label:'Combined score: seven shared criteria'},...dimensions.map(d=>({key:d.key,label:d.label}))];
const resamples=99999,seed='html-language-analysis/1';
const results=endpoints.map(endpoint=>{
 const value=c=>endpoint.key==='common_seven'?c.common_seven:c.scores[endpoint.key];
 const matrix=topicIds.map(t=>languageIds.map(l=>value(cells.get(t+'|'+l))));
 if(matrix.some(row=>row.some(v=>!Number.isFinite(v))))throw Error('Endpoint has missing conversation scores: '+endpoint.key);
 const omnibus=friedmanPermutation(matrix,{resamples,seed:seed+':'+endpoint.key});
 const summaries=Object.fromEntries(languageIds.map((l,index)=>[l,{...summary(matrix.map(row=>row[index])),min:Math.min(...matrix.map(row=>row[index])),max:Math.max(...matrix.map(row=>row[index])),mean_rank:omnibus.mean_ranks[index]}]));
 const pairs=[];
 for(let a=0;a<languageIds.length;a++)for(let b=a+1;b<languageIds.length;b++)pairs.push({left:languageIds[a],right:languageIds[b],...exactPairedDifference(matrix.map(row=>row[a]),matrix.map(row=>row[b]))});
 const within=holm(pairs.map(p=>p.p));pairs.forEach((pair,i)=>{pair.p_holm_endpoint=within[i];});
 return {...endpoint,matrix,omnibus,summaries,pairs};
});
const adjusted=holm(results.map(r=>r.omnibus.p));results.forEach((r,i)=>{r.omnibus.p_holm=adjusted[i];r.omnibus.significant=adjusted[i]<.05;});
const allPairs=results.flatMap(r=>r.pairs),pairAdjusted=holm(allPairs.map(p=>p.p));allPairs.forEach((p,i)=>{p.p_holm_global=pairAdjusted[i];p.significant=pairAdjusted[i]<.05;});
const primary=results[0];
const sensitivityBlocks=topicIds.map((topic,i)=>Object.fromEntries(languageIds.map((l,j)=>[l,[primary.matrix[i][j]]])));
const meanSensitivity=omnibusPermutation(sensitivityBlocks,languageIds,{resamples,seed:seed+':mean-sensitivity'});
const leaveOneTopicOut=topicIds.map((topic,index)=>{const matrix=primary.matrix.filter((_,i)=>i!==index),test=friedmanPermutation(matrix,{resamples:9999,seed:seed+':leave-out:'+topic});return {omitted_topic:topic,p:test.p,kendall_w:test.kendall_w,language_means:Object.fromEntries(languageIds.map((l,j)=>[l,mean(matrix.map(row=>row[j]))]))};});
const dataSnapshot=records.map(({transcript:_transcript,...r})=>r);
const analysis={version:'html-language-analysis/1',created_at:new Date().toISOString(),scope:'ChatGPT HTML captures only',data:{conversations:50,topics:topicIds,languages:languageIds,language_names:Object.fromEntries(languageIds.map(l=>[l,languages[l]?.name||l])),source_provider:'ChatGPT',source_model_version:'not recorded',evaluator:records[0].model,provider:records[0].provider,prompt_version:records[0].prompt_version,prompt_sha256:records[0].prompt_sha256,rubric_hash:records[0].rubric_hash,rating_questions_source_sha256:records[0].rating_questions_source_sha256,numeric_scores:numericScores,na_scores:naScores,tutor_turns:conversations.reduce((n,c)=>n+c.tutor_turns,0),snapshot_sha256:sha(JSON.stringify(dataSnapshot)),run_ids:records.map(r=>r.run_id)},method:{unit:'One whole conversation; average applicable tutor-turn scores separately for each criterion.',primary_composite:'Equal-weight mean of the seven shared criterion means. Introduction and follow-up are excluded from this combined score and analyzed separately.',common_criteria:shared.map(d=>d.key),omnibus:'Tie-corrected Friedman statistic with independent language-label permutations within each topic.',permutations:resamples,p_correction:'(extreme permutations + 1) / (resamples + 1)',omnibus_multiplicity:'Holm adjustment across all 10 endpoints (combined score and nine criteria).',pairwise:'Exact two-sided paired topic-label swaps for mean score differences; all 32 assignments enumerated.',pairwise_multiplicity:'Holm across all 450 endpoint-language pairs; within-endpoint Holm across 45 pairs also exported.',effect_size:'Kendall W describes consistency of the language ranking across the five topics.',alpha:.05,seed,pairwise_smallest_possible_p:2/(2**topicIds.length),limitations:['Five conversations per language, one per topic; the 150 turns and 1,200 scores are not independent replicates.','Scores are ordinal; means are descriptive, and the primary omnibus test uses within-topic ranks.','There is one generated conversation per topic-language cell and one evaluator run per conversation, so generation variability, evaluator variability and topic-by-language interaction are not separately estimable.','Inference assumes language-label exchangeability under the null within each matched topic. These observational comparisons do not establish a causal effect of language.','Differences may reflect content, images, pedagogy, translation of prompts, or evaluator language bias; a language difference is not evidence of language bias alone.','The source model is labeled ChatGPT, but its underlying model version is not recorded. Only one evaluator model is used across all 50 captures; cross-model differences and model-by-language interactions cannot be estimated.','Evaluations use screenshots of the initial captured states; unseen states and live interactive behavior were not evaluated.','The earlier Argon evaluation of one English pilot is excluded. Non-significance does not establish equivalence.'],references:[{title:'SciPy Friedman documentation: small-sample chi-square approximation warning',url:'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.friedmanchisquare.html'},{title:'SciPy permutation tests: paired label swaps and exact enumeration',url:'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.permutation_test.html'}]},conversations,results,sensitivity:{blocked_mean_permutation:meanSensitivity,leave_one_topic_out:leaveOneTopicOut}};
await fs.mkdir(out,{recursive:true});
await fs.writeFile(path.join(out,'input-ratings.json'),JSON.stringify(dataSnapshot,null,2));
await fs.writeFile(path.join(out,'language-analysis.json'),JSON.stringify(analysis,null,2));
await fs.writeFile(path.join(out,'language-analysis.html'),htmlLanguageReport(analysis));
for(const [file,data] of Object.entries(htmlComparisonTableCsvs(analysis)))await fs.writeFile(path.join(out,file),data);
await writeCSV('conversation-scores.csv',['conversation_id','run_id','topic','language','shared_seven_mean','all_24_scores_mean',...dimensions.map(d=>d.key)],conversations.map(c=>[c.conversation_id,c.run_id,c.topic,c.language,c.common_seven,c.all_scores_mean,...dimensions.map(d=>c.scores[d.key])]));
await writeCSV('language-summary.csv',['criterion','language','language_name','n_conversations','mean','sd','median','min','max','mean_rank'],results.flatMap(r=>languageIds.map(l=>{const s=r.summaries[l];return [r.key,l,analysis.data.language_names[l],s.n,s.mean,s.sd,s.median,s.min,s.max,s.mean_rank];})));
await writeCSV('omnibus-tests.csv',['criterion','label','friedman_statistic','kendall_w','p_raw','p_holm_10_endpoints','significant','topic_blocks','permutations','monte_carlo_se'],results.map(r=>[r.key,r.label,r.omnibus.statistic,r.omnibus.kendall_w,r.omnibus.p,r.omnibus.p_holm,r.omnibus.significant,r.omnibus.blocks,resamples,r.omnibus.mc_se]));
await writeCSV('pairwise-tests.csv',['criterion','left_language','right_language','difference_right_minus_left','p_exact','p_holm_45_within_criterion','p_holm_450_global','significant','matched_topics','exact_permutations'],results.flatMap(r=>r.pairs.map(p=>[r.key,p.left,p.right,p.difference,p.p,p.p_holm_endpoint,p.p_holm_global,p.significant,p.blocks,p.permutations])));
console.log(JSON.stringify({report:path.join(out,'language-analysis.html'),snapshot_sha256:analysis.data.snapshot_sha256,primary:{p:primary.omnibus.p,p_holm:primary.omnibus.p_holm,kendall_w:primary.omnibus.kendall_w,ranking:languageIds.map(l=>({language:analysis.data.language_names[l],...primary.summaries[l]})).sort((a,b)=>b.mean-a.mean)},significant_endpoints:results.filter(r=>r.omnibus.significant).map(r=>({label:r.label,p:r.omnibus.p,p_holm:r.omnibus.p_holm,kendall_w:r.omnibus.kendall_w})),significant_pairs:allPairs.filter(p=>p.significant).length,mean_sensitivity_p:meanSensitivity.p},null,2));
