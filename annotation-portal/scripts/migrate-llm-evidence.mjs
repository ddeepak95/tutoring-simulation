import fs from 'node:fs';
import {createHash} from 'node:crypto';
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
try {
 const project=process.argv[process.argv.indexOf('--project')+1];
 if(!process.argv.includes('--project')||new URL(process.env.VITE_SUPABASE_URL).hostname!==`${project}.supabase.co`||!process.env.SUPABASE_ACCESS_TOKEN)throw Error('Provide --project matching VITE_SUPABASE_URL and the local management token.');
 async function request(endpoint,body){const r=await fetch(`https://api.supabase.com/v1/projects/${project}/${endpoint}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${process.env.SUPABASE_ACCESS_TOKEN}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`Migration request returned HTTP ${r.status}.`);return r.json();}
 const history=await request('database/migrations');
 const results=[];
 for(const file of ['202610260003_llm_evidence.sql','202610260004_llm_capture_read.sql','202610260005_rubric_baseline_features.sql']){
 const sql=fs.readFileSync('supabase/migrations/'+file,'utf8'),prefix='annotation_portal_'+file.split('_')[0]+'_',name=prefix+createHash('sha256').update(sql).digest('hex').slice(0,16);
 if(history.some(h=>h.name?.startsWith(prefix)&&h.name!==name))throw Error('A different migration fingerprint is already registered.');
 const exists=history.some(h=>h.name===name);if(!exists)await request('database/migrations',{name,query:sql});
 results.push({file,result:exists?'already_applied':'applied'});
 }
 const rows=await request('database/query',{query:"select position('llm_evidence' in prosrc)>0 as verified from pg_proc where oid=to_regprocedure('public.validate_annotations(jsonb,jsonb,jsonb,boolean)')",read_only:true});
 if(!rows[0]?.verified)throw Error('Evidence validation migration verification failed.');
 console.log(JSON.stringify({project,results,verified:true}));
}catch(e){console.error(e.message);process.exitCode=1;}
