import fs from 'node:fs';
import pg from 'pg';
import {profile} from './supabase-sync-core.mjs';
import {assertLocalResetTarget,resetLocalLabeling} from './reset-local-labeling-core.mjs';

const args=process.argv.slice(2);
if (args.some(arg=>!['--apply'].includes(arg))) throw new Error('Use reset-local-labeling.mjs [--apply].');
const envFile=new URL('../.env.local',import.meta.url);
if(fs.existsSync(envFile))process.loadEnvFile(envFile);
const config=profile(process.env,'local');
assertLocalResetTarget(config);
const rubric=JSON.parse(fs.readFileSync(new URL('../src/generated/rubric.json',import.meta.url),'utf8'));
const db=new pg.Client({connectionString:config.dbUrl,connectionTimeoutMillis:15000});
try {
  await db.connect();
  console.log(JSON.stringify(await resetLocalLabeling(db,rubric,config,{apply:args.includes('--apply')}),null,2));
} catch {
  console.error('Local labeling reset failed and was rolled back. Check local database availability and schema compatibility.');
  process.exitCode=1;
} finally {await db.end();}
