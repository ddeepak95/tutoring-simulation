import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot,models,languages,selectedTopics} from './config.mjs';
import {validateMarkerFreeRatings} from './marker-free-rating-core.mjs';
import {holm,summary,omnibusPermutation,pairwisePermutation} from './rating-language-stats.mjs';
import {renderRatingV5,modelLanguageSignificanceCsv,languageModelSignificanceCsv,individualCriterionScoresCsv} from './rating-v5-report.mjs';

const translationsOnly=process.argv[2]==='--translations-only';
if(process.argv.length>(translationsOnly?3:2))throw Error('Use no arguments or --translations-only');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['localhost','127.0.0.1','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local database required');
const promptVersion='marker-free-turn-ratings/5';
const output=path.join(runRoot,'reports','rating-v5');await fs.mkdir(output,{recursive:true});
const manifest=JSON.parse(await fs.readFile(path.join(runRoot,'manifest.json'),'utf8'));
const expected=new Map(manifest.items.flatMap(item=>[[item.id,{...item,cohort:'originals',source_id:null}],...(item.language==='en'?[]:[[item.translation.id,{...item,cohort:'translations',source_id:item.id}]]) ]));
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
let runs;
try{
 runs=(await db.query(`select c.id,c.topic_id,c.language,c.source_conversation_id,c.transcript->>'provider' as source_model,
 r.id as run_id,r.model as evaluator_model,r.prompt_version,r.rubric_hash,r.rubric_snapshot,r.prompt,r.ratings,v.transcript
 from public.conversation_version_rating_runs r join public.conversations c on c.id=r.conversation_id
 join public.conversation_versions v on v.conversation_id=c.id and v.version_key=r.version_key
 where r.prompt_version=$1 and r.status='completed' order by c.id`,[promptVersion])).rows;
}finally{await db.end();}
if(runs.length!==1638||new Set(runs.map(r=>r.id)).size!==1638)throw Error('Expected exactly 1,638 completed version 5 conversations');
const dimensions=runs[0].rubric_snapshot.rating_dimensions;
const common=dimensions.filter(d=>!d.first_only&&!d.subsequent_only);
if(dimensions.length!==9||common.length!==7)throw Error('Unexpected current rubric');
const canonical=value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v);
const rubricHash=runs[0].rubric_hash,promptHash=createHash('sha256').update(runs[0].prompt).digest('hex');
const mean=values=>values.length?values.reduce((a,b)=>a+b,0)/values.length:null;
const rows=runs.map(run=>{
 const item=expected.get(run.id),provenance=run.rubric_snapshot.provenance;
 if(!item||run.topic_id!==item.topic||run.source_model!==item.model||run.language!==(item.cohort==='originals'?item.language:'en')||run.source_conversation_id!==item.source_id||run.rubric_hash!==rubricHash||canonical(run.rubric_snapshot.rating_dimensions)!==canonical(dimensions)||run.evaluator_model!=='gemini-3.8-flash'||provenance?.provider!=='google'||provenance?.prompt_sha256!==promptHash||createHash('sha256').update(run.prompt).digest('hex')!==promptHash)throw Error(`Run provenance or manifest mismatch: ${run.id}`);
 validateMarkerFreeRatings({ratings:run.ratings},run.transcript,dimensions);
 const scores={},missing={};
 for(const d of dimensions){const values=run.ratings.flatMap(t=>t.values[d.key]?[t.values[d.key].score]:[]),numeric=values.filter(Number.isFinite);scores[d.key]=mean(numeric);missing[d.key]=values.length-numeric.length;}
 const complete=common.every(d=>Number.isFinite(scores[d.key]));
 scores.composite=complete?mean(common.map(d=>scores[d.key])):null;
 return {id:run.id,run_id:run.run_id,cohort:item.cohort,source_id:item.source_id,model:item.model,language:item.language,text_language:run.language,topic:item.topic,attempt:item.attempt,scores,na_turns:missing};
});
for(const cohort of ['originals','translations'])for(const model of models)for(const language of languages.filter(l=>cohort==='originals'||l!=='en'))for(const topic of selectedTopics){
 if(rows.filter(r=>r.cohort===cohort&&r.model===model&&r.language===language&&r.topic===topic).length!==3)throw Error('Unbalanced experiment cell');
}
await fs.writeFile(path.join(output,'conversation-scores.json'),JSON.stringify({prompt_version:promptVersion,rubric_hash:rubricHash,dimensions,rows},null,2));
const metrics=[{key:'composite',label:'Seven shared criteria (combined)'},...dimensions.map(({key,label})=>({key,label}))];
const contexts=(cohort,langs)=>[
 {kind:'languages_pooled',context:'all',groups:langs,group:'language',blocks:selectedTopics.flatMap(t=>models.map(m=>`${t}|${m}`)),block:r=>`${r.topic}|${r.model}`},
 {kind:'models_pooled',context:'all',groups:models,group:'model',blocks:selectedTopics.flatMap(t=>langs.map(l=>`${t}|${l}`)),block:r=>`${r.topic}|${r.language}`},
 ...models.map(model=>({kind:'languages_within_model',context:model,groups:langs,group:'language',blocks:selectedTopics,block:r=>r.topic,filter:r=>r.model===model})),
 ...langs.map(language=>({kind:'models_within_language',context:language,groups:models,group:'model',blocks:selectedTopics,block:r=>r.topic,filter:r=>r.language===language})),
];
const report={format_version:'rating-v5-language-model/1',created_at:new Date().toISOString(),prompt_version:promptVersion,rubric_hash:rubricHash,prompt_sha256:promptHash,provider:'google',evaluator_model:'gemini-3.8-flash',models,languages,topics:selectedTopics,metrics,common_criteria:common.map(d=>d.key),source_sha256:createHash('sha256').update(canonical(rows)).digest('hex'),cohorts:{},methods:{omnibus_resamples:19999,pairwise_resamples:99999,primary:'Mean of seven shared criterion means; each criterion mean averages applicable tutor turns; complete seven-criterion coverage required.',unit:'Whole conversation. Independent generation attempts are not matched across languages/models.',blocks:'Topic × model for pooled language tests; topic × language for pooled model tests; topic for context-specific tests.',omnibus_adjustment:'Holm across all 16 original or 15 translated primary omnibus tests per cohort; separate Holm family of 18 pooled criterion tests per cohort.',pairwise_adjustment:'Holm across all possible primary pairwise contrasts in each cohort (including untested contrasts with p=1). Significance also requires the adjusted parent omnibus test.',interpretation:'Inference conditional on these six topics, three independent tries per cell, and a single automated judge. English translations retain source-language labels and exclude the original English reference. Cohorts are dependent and are not pooled. Missing criterion means exclude that conversation only from that outcome; composite requires all seven.',references:[['Permutation p-values','https://pubmed.ncbi.nlm.nih.gov/21044043/'],['Holm multiple testing','https://www.ime.usp.br/~abe/lista/pdf4R8xPVzCnX.pdf']]}};
const quote=v=>v==null?'':`"${String(v).replaceAll('"','""')}"`;
const csv=(file,records)=>fs.writeFile(path.join(output,file),[Object.keys(records[0]).join(','),...records.map(r=>Object.values(r).map(quote).join(','))].join('\n')+'\n');
report.analysis_design='translations-with-english-reference/1';
report.methods.omnibus_adjustment='Holm across all 16 primary omnibus tests per cohort; separate Holm family of 18 pooled criterion tests per cohort.';
report.methods.interpretation='Inference conditional on these six topics, three independent tries per cell, and a single automated judge. The English-text set contains 756 translations grouped by source language plus 126 unchanged original English reference conversations. English reference ratings are shared across views; cohorts are dependent and analyzed separately. Missing criterion means exclude that conversation only from that outcome; composite requires all seven.';
if(translationsOnly){
 const previous=JSON.parse(await fs.readFile(path.join(output,'comparison.json'),'utf8'));
 if(previous.source_sha256!==report.source_sha256||previous.rubric_hash!==report.rubric_hash||previous.prompt_sha256!==report.prompt_sha256||previous.cohorts.originals?.count!==882)throw Error('Saved original analysis does not match the current source snapshot');
 report.cohorts.originals=previous.cohorts.originals;
 console.log(JSON.stringify({event:'reuse_unchanged_originals',conversations:882}));
}
for(const cohort of ['originals','translations']){
 if(translationsOnly&&cohort==='originals')continue;
 const data=rows.filter(r=>r.cohort===cohort||(cohort==='translations'&&r.cohort==='originals'&&r.language==='en')),langs=languages,specs=contexts(cohort,langs),tests=[];
 if(data.length!==882||models.some(model=>langs.some(language=>selectedTopics.some(topic=>data.filter(r=>r.model===model&&r.language===language&&r.topic===topic).length!==3))))throw Error('Expected 882 balanced conversations including the English reference');
 for(const metric of metrics){
  const targets=metric.key==='composite'?specs:specs.slice(0,2);
  for(const spec of targets){
   const subset=data.filter(r=>(!spec.filter||spec.filter(r))&&Number.isFinite(r.scores[metric.key]));
   const blocks=spec.blocks.map(block=>Object.fromEntries(spec.groups.map(g=>[g,subset.filter(r=>spec.block(r)===block&&r[spec.group]===g).map(r=>r.scores[metric.key])]))).filter(b=>spec.groups.every(g=>b[g].length));
   const summaries=Object.fromEntries(spec.groups.map(g=>[g,summary(subset.filter(r=>r[spec.group]===g).map(r=>r.scores[metric.key]))]));
   const seed=`v5:${cohort}:${metric.key}:${spec.kind}:${spec.context}`;
   const omnibus=omnibusPermutation(blocks,spec.groups,{resamples:19999,seed});
   const test={metric:metric.key,kind:spec.kind,context:spec.context,groups:spec.groups,summaries,blocks:blocks.length,omnibus,pairs:[]};
   if(metric.key==='composite')for(let i=0;i<spec.groups.length;i++)for(let j=i+1;j<spec.groups.length;j++){
    const left=spec.groups[i],right=spec.groups[j];
    const result=omnibus.p<.05?pairwisePermutation(blocks,left,right,{resamples:99999,seed:`${seed}:${left}:${right}`}):{difference:mean(blocks.map(b=>mean(b[right])-mean(b[left]))),p:1,permutations:0};
    test.pairs.push({left,right,...result,tested:omnibus.p<.05});
   }
   tests.push(test);console.log(JSON.stringify({cohort,metric:metric.key,kind:spec.kind,context:spec.context,p:omnibus.p}));
  }
 }
 for(const primary of [true,false]){
  const family=tests.filter(t=>(t.metric==='composite')===primary),adjusted=holm(family.map(t=>t.omnibus.p));
  family.forEach((t,i)=>{t.holm_p=adjusted[i];t.significant=adjusted[i]<.05;t.adjustment_family_size=family.length;});
 }
 const primary=tests.filter(t=>t.metric==='composite'),pairs=primary.flatMap(t=>t.pairs),adjusted=holm(pairs.map(p=>p.p));
 pairs.forEach((p,i)=>{p.holm_p=adjusted[i];p.adjustment_family_size=pairs.length;});
 primary.forEach(t=>t.pairs.forEach(p=>p.significant=t.significant&&p.tested&&p.holm_p<.05));
 const grid=metrics.flatMap(metric=>models.flatMap(model=>langs.map(language=>{
  const group=data.filter(r=>r.model===model&&r.language===language),values=group.map(r=>r.scores[metric.key]).filter(Number.isFinite);
  return {metric:metric.key,model,language,...summary(values),na_turns:group.reduce((s,r)=>s+(r.na_turns[metric.key]||0),0)};
 })));
 report.cohorts[cohort]={count:data.length,languages:langs,translated_conversations:cohort==='translations'?756:0,english_reference_conversations:cohort==='translations'?126:0,composite_missing:data.filter(r=>!Number.isFinite(r.scores.composite)).length,tests,grid};
}
await fs.writeFile(path.join(output,'comparison.json'),JSON.stringify(report,null,2));
const tests=Object.entries(report.cohorts).flatMap(([cohort,c])=>c.tests.map(t=>({cohort,metric:t.metric,kind:t.kind,context:t.context,blocks:t.blocks,raw_p:t.omnibus.p,holm_p:t.holm_p,significant:t.significant,family_size:t.adjustment_family_size})));
const pairs=Object.entries(report.cohorts).flatMap(([cohort,c])=>c.tests.flatMap(t=>t.pairs.map(p=>({cohort,kind:t.kind,context:t.context,left:p.left,right:p.right,difference_right_minus_left:p.difference,raw_p:p.p,holm_p:p.holm_p,tested:p.tested,significant:p.significant,family_size:p.adjustment_family_size}))));
await csv('omnibus-tests.csv',tests);await csv('pairwise-tests.csv',pairs);
await csv('model-language-summary.csv',Object.entries(report.cohorts).flatMap(([cohort,c])=>c.grid.map(r=>({cohort,...r}))));
await csv('conversation-scores.csv',rows.map(r=>({id:r.id,run_id:r.run_id,cohort:r.cohort,model:r.model,source_language:r.language,text_language:r.text_language,topic:r.topic,attempt:r.attempt,...r.scores})));
await fs.writeFile(path.join(output,'comparison.html'),renderRatingV5(report));
await fs.writeFile(path.join(output,'model-differences-by-language.csv'),modelLanguageSignificanceCsv(report));
await fs.writeFile(path.join(output,'language-differences-by-model.csv'),languageModelSignificanceCsv(report));
await fs.writeFile(path.join(output,'individual-criterion-scores.csv'),individualCriterionScoresCsv(report));
console.log(JSON.stringify({report:path.join(output,'comparison.html'),cohorts:Object.fromEntries(Object.entries(report.cohorts).map(([name,c])=>[name,{count:c.count,missing:c.composite_missing,primary:c.tests.filter(t=>t.metric==='composite').map(t=>({kind:t.kind,context:t.context,p:t.omnibus.p,holm_p:t.holm_p,significant:t.significant,pairs:t.pairs.filter(p=>p.significant).length}))}]))}));
