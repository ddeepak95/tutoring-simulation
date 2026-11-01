import fs from 'node:fs/promises';
import path from 'node:path';
import {renderTamilArchiveReport} from './tamil-archive-report.mjs';

const root=path.resolve(import.meta.dirname,'..'),folder=path.join(root,'experiment-oct-29/run-01/reports/rating-v5/tamil-english-30-topics');
const analysis=JSON.parse(await fs.readFile(path.join(folder,'analysis.json'),'utf8'));
const conversations=JSON.parse(await fs.readFile(path.join(folder,'conversations.json'),'utf8'));
await fs.writeFile(path.join(folder,'index.html'),renderTamilArchiveReport(analysis,conversations));
const archive=path.join(root,'research-archive/oct-29/reports'),prefix='tamil-english-30-topic-';
await fs.writeFile(path.join(archive,'english-tamil-30-topics.html'),renderTamilArchiveReport(analysis,conversations,{apiHref:'../../../experiment-oct-29/run-01/reports/rating-v5/comparison.html',htmlHref:'../../../experiment-oct-29/run-01/reports/rating-v5/chatgpt-html/index.html',downloadPrefix:prefix}));
for(const file of ['analysis.json','conversation-counts.csv','model-language-feature-counts.csv','pooled-language-tests.csv','language-differences-within-models.csv','model-differences-within-languages.csv'])await fs.copyFile(path.join(folder,file),path.join(archive,prefix+file));
console.log(JSON.stringify({report:path.join(folder,'index.html'),archive_report:path.join(archive,'english-tamil-30-topics.html'),conversations:conversations.length,tamil:conversations.filter(r=>r.language==='ta').length,database_requests:0,evaluator_requests:0}));
