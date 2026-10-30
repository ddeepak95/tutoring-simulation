import fsp from 'node:fs/promises';
import path from 'node:path';
import {runRoot} from './config.mjs';
import {buildRatingTables,renderRatingTables} from './rating-tables.mjs';
import {renderModelRatingReport} from './rating-model-report.mjs';

if(process.argv.length!==2)throw Error('Run without arguments to consolidate existing rating reports');
const folder=path.join(runRoot,'reports');
const source=JSON.parse(await fsp.readFile(path.join(folder,'rating-model-comparison.json'),'utf8'));
const csv=await fsp.readFile(path.join(folder,'rating-language-conversation-scores.csv'),'utf8');
const tables=buildRatingTables(source,csv);
await fsp.writeFile(path.join(folder,'all-rating-tables.html'),renderRatingTables(tables));
await fsp.writeFile(path.join(folder,'all-rating-tables.json'),JSON.stringify(tables,null,2)+'\n');
const columns=['model','language','combined_mean','combined_sd','combined_n',...tables.dimensions.flatMap(d=>[d.key+'_mean',d.key+'_sd',d.key+'_n',d.key+'_na_turns'])];
const quote=value=>value==null?'':`"${String(value).replaceAll('"','""')}"`;
const rows=tables.summaries.map(row=>[row.model,row.language,row.combined.mean,row.combined.sd,row.combined.n,...tables.dimensions.flatMap(d=>{
 const score=row.scores[d.key];return [score.mean,score.sd,score.n,score.na_turns];
})]);
await fsp.writeFile(path.join(folder,'all-rating-summary.csv'),[columns,...rows].map(row=>row.map(quote).join(',')).join('\n')+'\n');
await fsp.writeFile(path.join(folder,'rating-model-comparison.html'),renderModelRatingReport(source));
console.log(JSON.stringify({report:path.join(folder,'all-rating-tables.html'),model_language_rows:tables.summaries.filter(row=>row.language!=='all').length,pooled_model_rows:tables.summaries.filter(row=>row.language==='all').length,conversations:tables.conversations.length,dimensions:tables.dimensions.length}));
