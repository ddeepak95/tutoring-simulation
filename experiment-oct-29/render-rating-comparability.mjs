import fsp from 'node:fs/promises';
import path from 'node:path';
import {runRoot} from './config.mjs';
import {renderComparabilityReport} from './rating-comparability-report.mjs';
const folder=path.join(runRoot,'reports');
const report=JSON.parse(await fsp.readFile(path.join(folder,'rating-comparability.json'),'utf8'));
await fsp.writeFile(path.join(folder,'rating-comparability.html'),renderComparabilityReport(report));
