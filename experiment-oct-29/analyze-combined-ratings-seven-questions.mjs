import fsp from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {runRoot} from './config.mjs';
import {compareCombinedRatings,selectRatingDimensions} from './combined-rating-comparisons.mjs';
import {renderCombinedRatingReport} from './combined-rating-report.mjs';

const folder=path.join(runRoot,'reports');
const stem='combined-rating-comparison-seven-questions';
const excludedKeys=['clarifying_misconceptions','guidance_for_next_steps'];
const sources=[
 ['originals','all-rating-tables.json'],
 ['translations','combined-translated-rating-scores.json'],
];

function analyze(source,sourceBytes,cohort){
 if(source.prompt_version!=='marker-free-turn-ratings/4')throw Error('Expected version 4 ratings');
 const data=selectRatingDimensions(source,excludedKeys);
 const results=compareCombinedRatings(data,{resamples:9999,onProgress:progress=>console.log(JSON.stringify({cohort,...progress}))});
 return {
  format_version:'combined-rating-comparison/3',cohort,generated_at:new Date().toISOString(),
  source_sha256:createHash('sha256').update(sourceBytes).digest('hex'),
  prompt_version:data.prompt_version,rubric_hash:data.rubric_hash,
  excluded_dimensions:source.dimensions.filter(dimension=>excludedKeys.includes(dimension.key)),
  included_dimensions:data.dimensions,
  models:data.models,languages:data.languages,language_names:data.language_names,topics:data.topics,topic_names:data.topic_names,
  conversations:data.conversations.length,translated_conversations:data.translated_conversations||0,
  english_reference_conversations:data.english_reference_conversations||0,
  resamples:9999,
  score_definition:'Mean of seven available question means within each conversation, excluding Clarifying Misconceptions and Guidance for Next Steps; equal question weights; N/A omitted.',
  available_question_counts:data.conversations.reduce((counts,row)=>{
   const count=Object.values(row.scores).filter(Number.isFinite).length;
   counts[count]=(counts[count]||0)+1;return counts;
  },{}),results,
 };
}

const reports=[];
for(const [cohort,file] of sources){
 const bytes=await fsp.readFile(path.join(folder,file),'utf8');
 reports.push(analyze(JSON.parse(bytes),bytes,cohort));
}
const [report,translated]=reports;
if(report.rubric_hash!==translated.rubric_hash)throw Error('Original and translation rubric hashes differ');
report.translated=translated;
await fsp.writeFile(path.join(folder,`${stem}.json`),JSON.stringify(report,null,2)+'\n');
await fsp.writeFile(path.join(folder,`${stem}.html`),renderCombinedRatingReport(report,{stem}));
const quote=value=>value==null?'':`"${String(value).replaceAll('"','""')}"`;
const overall=[['cohort','question','context','overall_p','overall_holm_p','significant','topics']];
const pairs=[['cohort','question','context','left','right','difference_right_minus_left','raw_p','holm_p','significant']];
for(const cohortReport of reports)for(const [question,rows] of Object.entries(cohortReport.results))for(const row of rows){
 overall.push([cohortReport.cohort,question,row.context,row.omnibus.p,row.overall_adjusted_p,row.significant,row.topics_in_test]);
 for(const pair of row.pairs)pairs.push([cohortReport.cohort,question,row.context,pair.left,pair.right,pair.difference,pair.p,pair.adjusted_p,pair.significant]);
}
await fsp.writeFile(path.join(folder,`${stem}-overall-tests.csv`),overall.map(row=>row.map(quote).join(',')).join('\n')+'\n');
await fsp.writeFile(path.join(folder,`${stem}-pairwise-tests.csv`),pairs.map(row=>row.map(quote).join(',')).join('\n')+'\n');
console.log(JSON.stringify({report:path.join(folder,`${stem}.html`),included_dimensions:report.included_dimensions.map(dimension=>dimension.key),
 cohorts:reports.map(row=>({cohort:row.cohort,conversations:row.conversations,
  languages_differ_in_models:row.results.languages_within_models.filter(test=>test.significant).length,
  models_differ_in_languages:row.results.models_within_languages.filter(test=>test.significant).length}))}));
