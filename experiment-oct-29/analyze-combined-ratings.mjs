import fsp from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {runRoot} from './config.mjs';
import {compareCombinedRatings} from './combined-rating-comparisons.mjs';
import {renderCombinedRatingReport} from './combined-rating-report.mjs';
import {loadTranslatedRatingScores} from './load-translated-rating-scores.mjs';

if(process.argv.length!==2)throw Error('Run without arguments to analyze combined rating scores');
const folder=path.join(runRoot,'reports'),sourceBytes=await fsp.readFile(path.join(folder,'all-rating-tables.json'),'utf8');
const source=JSON.parse(sourceBytes);
if(source.format_version!=='all-rating-tables/2'||source.prompt_version!=='marker-free-turn-ratings/4')throw Error('Rebuild the consolidated version 4 rating tables first');
const translatedSource=await loadTranslatedRatingScores(source);
const translatedBytes=JSON.stringify(translatedSource,null,2)+'\n';
await fsp.writeFile(path.join(folder,'combined-translated-rating-scores.json'),translatedBytes);
function analyze(data,bytes,cohort){
 const results=compareCombinedRatings(data,{resamples:9999,onProgress:progress=>console.log(JSON.stringify({cohort,...progress}))});
 return {format_version:'combined-rating-comparison/2',cohort,generated_at:new Date().toISOString(),
  source_sha256:createHash('sha256').update(bytes).digest('hex'),prompt_version:data.prompt_version,rubric_hash:data.rubric_hash,
  models:data.models,languages:data.languages,language_names:data.language_names,topics:data.topics,topic_names:data.topic_names,
  conversations:data.conversations.length,translated_conversations:data.translated_conversations||0,english_reference_conversations:data.english_reference_conversations||0,
  resamples:9999,score_definition:'Mean of available question means within each conversation; equal question weights; N/A omitted.',
  available_question_counts:data.conversations.reduce((counts,row)=>{const n=Object.values(row.scores).filter(Number.isFinite).length;counts[n]=(counts[n]||0)+1;return counts;},{}),results};
}
const report=analyze(source,sourceBytes,'originals');
report.translated=analyze(translatedSource,translatedBytes,'translations');
await fsp.writeFile(path.join(folder,'combined-rating-comparison.json'),JSON.stringify(report,null,2)+'\n');
await fsp.writeFile(path.join(folder,'combined-rating-comparison.html'),renderCombinedRatingReport(report));
const quote=value=>value==null?'':`"${String(value).replaceAll('"','""')}"`;
const overall=[['cohort','question','context','overall_p','overall_holm_p','significant','topics']];
const pairs=[['cohort','question','context','left','right','difference_right_minus_left','raw_p','holm_p','significant']];
for(const cohortReport of [report,report.translated])for(const [question,rows]of Object.entries(cohortReport.results))for(const row of rows){
 overall.push([cohortReport.cohort,question,row.context,row.omnibus.p,row.overall_adjusted_p,row.significant,row.topics_in_test]);
 for(const pair of row.pairs)pairs.push([cohortReport.cohort,question,row.context,pair.left,pair.right,pair.difference,pair.p,pair.adjusted_p,pair.significant]);
}
await fsp.writeFile(path.join(folder,'combined-rating-overall-tests.csv'),overall.map(row=>row.map(quote).join(',')).join('\n')+'\n');
await fsp.writeFile(path.join(folder,'combined-rating-pairwise-tests.csv'),pairs.map(row=>row.map(quote).join(',')).join('\n')+'\n');
console.log(JSON.stringify({report:path.join(folder,'combined-rating-comparison.html'),cohorts:[report,report.translated].map(row=>({cohort:row.cohort,conversations:row.conversations,languages_differ_in_models:row.results.languages_within_models.filter(test=>test.significant).length,models_differ_in_languages:row.results.models_within_languages.filter(test=>test.significant).length})),overall_tests:overall.length-1}));
