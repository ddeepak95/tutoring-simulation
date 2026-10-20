import fs from 'node:fs';
import crypto from 'node:crypto';
if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
try {
  const args=process.argv.slice(2); const expected=args.includes('--project')?args[args.indexOf('--project')+1]:null; const url=new URL(process.env.VITE_SUPABASE_URL); const ref=url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1]; const token=process.env.SUPABASE_ACCESS_TOKEN;
  if(!expected||url.protocol!=='https:'||ref!==expected||!token)throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');
  const sql=fs.readFileSync('supabase/migrations/202610190004_direct_exact_capture.sql','utf8'); const prefix='annotation_portal_202610190004_'; const name=prefix+crypto.createHash('sha256').update(sql).digest('hex').slice(0,16);
  async function request(endpoint,body){const response=await fetch(`https://api.supabase.com/v1/projects/${ref}/${endpoint}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});if(!response.ok)throw new Error(`Supabase Management API returned HTTP ${response.status}.`);return response.json();}
  const history=await request('database/migrations'); if(history.some(item=>item.name?.startsWith(prefix)&&item.name!==name))throw new Error('Different migration fingerprint recorded; review required.'); const exists=history.some(item=>item.name===name); if(!exists)await request('database/migrations',{query:sql,name});
  console.log(JSON.stringify({project:ref,result:exists?'already_applied':'applied',verified:true}));
} catch(error){console.error(error.message);process.exitCode=1;}
