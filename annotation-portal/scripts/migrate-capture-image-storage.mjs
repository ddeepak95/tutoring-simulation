import fs from 'node:fs';
import crypto from 'node:crypto';
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
try{
 const expected=process.argv.includes('--project')?process.argv[process.argv.indexOf('--project')+1]:null;
 const url=new URL(process.env.VITE_SUPABASE_URL);const ref=url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];const token=process.env.SUPABASE_ACCESS_TOKEN;
 if(!expected||url.protocol!=='https:'||ref!==expected||!token)throw new Error('Provide --project matching VITE_SUPABASE_URL and local SUPABASE_ACCESS_TOKEN. No changes sent.');
 const sql=fs.readFileSync('supabase/migrations/202610190002_capture_image_storage.sql','utf8');const prefix='annotation_portal_202610190002_';const name=prefix+crypto.createHash('sha256').update(sql).digest('hex').slice(0,16);
 async function request(path,body){const response=await fetch(`https://api.supabase.com/v1/projects/${ref}/${path}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});if(!response.ok)throw new Error(`Supabase Management API returned HTTP ${response.status}.`);return response.json();}
 const history=await request('database/migrations');if(!Array.isArray(history))throw new Error('Unexpected migration history response.');
 if(history.some(row=>row.name?.startsWith(prefix)&&row.name!==name))throw new Error('A different capture-image migration fingerprint is recorded. Review before applying.');
 const exists=history.some(row=>row.name===name);if(!exists)await request('database/migrations',{query:sql,name});
 const rows=await request('database/query',{query:`select
  exists(select 1 from storage.buckets where id='capture-images' and public and file_size_limit=10485760)
  and exists(select 1 from information_schema.columns where table_schema='public' and table_name='chatgpt_html_archives' and column_name='media_html')
  and exists(select 1 from information_schema.columns where table_schema='public' and table_name='conversation_capture_assets' and column_name='media_html')
  and exists(select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='capture_images_owner_insert') as verified`,read_only:true});
 if(rows.length!==1||rows[0].verified!==true)throw new Error('Capture image storage migration verification failed.');
 console.log(JSON.stringify({project:ref,result:exists?'already_applied':'applied',verified:true}));
}catch(error){console.error(error.message);process.exitCode=1;}
