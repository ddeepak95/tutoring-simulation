import fs from 'node:fs';
import {createHash} from 'node:crypto';
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
try{
 const args=process.argv.slice(2),project=args[args.indexOf('--project')+1];
 if(!args.includes('--project')||new URL(process.env.VITE_SUPABASE_URL).hostname!==project+'.supabase.co'||!process.env.SUPABASE_ACCESS_TOKEN)throw Error('Provide --project matching the locally configured Supabase project and management credentials.');
 async function request(endpoint,body){const r=await fetch(`https://api.supabase.com/v1/projects/${project}/${endpoint}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${process.env.SUPABASE_ACCESS_TOKEN}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`HTML migration returned HTTP ${r.status}: ${(await r.text()).slice(0,180)}`);return r.json();}
 const history=await request('database/migrations');
 for(const file of ['202610260007_html_conversations.sql','202610260008_html_pilot_reset.sql','202610260009_html_reset_rubric_audit.sql']){
  const sql=fs.readFileSync('supabase/migrations/'+file,'utf8'),prefix='annotation_portal_'+file.split('_')[0]+'_',name=prefix+createHash('sha256').update(sql).digest('hex').slice(0,16);
  if(history.some(h=>h.name?.startsWith(prefix)&&h.name!==name))throw Error('A different HTML migration fingerprint was already applied.');
  if(!history.some(h=>h.name===name))await request('database/migrations',{name,query:sql});
  console.log(JSON.stringify({file,applied:true}));
 }
 console.log('HTML storage is ready. This command does not reset conversations.');
}catch(e){console.error(e.message);process.exitCode=1;}
