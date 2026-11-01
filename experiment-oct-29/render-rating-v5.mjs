import fs from 'node:fs/promises';
import path from 'node:path';
import {runRoot} from './config.mjs';
import {renderRatingV5,modelLanguageSignificanceCsv,languageModelSignificanceCsv,individualCriterionScoresCsv} from './rating-v5-report.mjs';

// Render the saved analysis without database connections or evaluator requests.
const folder=path.join(runRoot,'reports','rating-v5');
const report=JSON.parse(await fs.readFile(path.join(folder,'comparison.json'),'utf8'));
if(report.format_version!=='rating-v5-language-model/1'||report.prompt_version!=='marker-free-turn-ratings/5')throw Error('Expected the saved version 5 analysis');
await fs.writeFile(path.join(folder,'comparison.html'),renderRatingV5(report));
await fs.writeFile(path.join(folder,'model-differences-by-language.csv'),modelLanguageSignificanceCsv(report));
await fs.writeFile(path.join(folder,'language-differences-by-model.csv'),languageModelSignificanceCsv(report));
await fs.writeFile(path.join(folder,'individual-criterion-scores.csv'),individualCriterionScoresCsv(report));
console.log(JSON.stringify({report:path.join(folder,'comparison.html'),source:'saved comparison.json',database_requests:0}));
