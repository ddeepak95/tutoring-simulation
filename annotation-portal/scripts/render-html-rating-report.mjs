import fs from 'node:fs/promises';
import path from 'node:path';
import {htmlLanguageReport,htmlComparisonTableCsvs} from './html-language-report.mjs';

const portal=path.resolve(import.meta.dirname,'..');
const source=path.join(portal,'.runtime/bulk-html-local/analysis');
const destination=path.join(portal,'../experiment-oct-29/run-01/reports/rating-v5/chatgpt-html');
const analysis=JSON.parse(await fs.readFile(path.join(source,'language-analysis.json'),'utf8'));
if(analysis.version!=='html-language-analysis/1'||analysis.data.conversations!==50||analysis.data.source_provider!=='ChatGPT'||analysis.data.evaluator!=='gemini-3.8-flash')throw Error('Expected the saved 50-conversation HTML analysis');
const exports=htmlComparisonTableCsvs(analysis);
await fs.mkdir(destination,{recursive:true});
await fs.writeFile(path.join(source,'language-analysis.html'),htmlLanguageReport(analysis));
await fs.writeFile(path.join(destination,'index.html'),htmlLanguageReport(analysis,{apiReportHref:'../comparison.html'}));
for(const [file,data] of Object.entries(exports)){
 await fs.writeFile(path.join(source,file),data);
 await fs.writeFile(path.join(destination,file),data);
}
for(const file of ['language-analysis.json','language-summary.csv','omnibus-tests.csv','pairwise-tests.csv','conversation-scores.csv'])await fs.copyFile(path.join(source,file),path.join(destination,file));
console.log(JSON.stringify({report:path.join(destination,'index.html'),source:'saved language-analysis.json',conversations:analysis.data.conversations,database_requests:0,evaluator_requests:0}));
