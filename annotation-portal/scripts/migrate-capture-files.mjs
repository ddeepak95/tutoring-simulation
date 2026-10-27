import fs from 'node:fs';
import {createHash} from 'node:crypto';
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
try{
 const args=process.argv.slice(2),project=args[args.indexOf('--project')+1];
 if(!args.includes('--project')||new URL(process.env.VITE_SUPABASE_URL).hostname!==project+'.supabase.co'||!process.env.SUPABASE_ACCESS_TOKEN)throw Error('Provide --project matching the local Supabase configuration.');
 const sql=fs.readFileSync('supabase/migrations/202610270001_capture_file_storage.sql','utf8'),prefix='annotation_portal_202610270001_',name=prefix+createHash('sha256').update(sql).digest('hex').slice(0,16);
 const request=async(endpoint,body)=>{const r=await fetch(`https://api.supabase.com/v1/projects/${project}/${endpoint}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${process.env.SUPABASE_ACCESS_TOKEN}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`Capture storage migration failed (HTTP ${r.status}): ${(await r.text()).slice(0,200)}`);return r.json();};
 const history=await request('database/migrations');
 if(history.some(h=>h.name?.startsWith(prefix)&&h.name!==name))throw Error('Different capture storage migration fingerprint already applied.');
 if(!history.some(h=>h.name===name))await request('database/migrations',{name,query:sql});
 await request('database/query',{query:"notify pgrst, 'reload schema'"});console.log('Private capture file storage is ready. Existing inline captures are unchanged.');
}catch(error){console.error(error.message);process.exitCode=1;}
