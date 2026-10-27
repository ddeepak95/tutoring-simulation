import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {freshProjectMigration} from './fresh-project-schema.mjs';
const args=process.argv.slice(2),project=args[args.indexOf('--project')+1];
if(!args.includes('--project')||!/^[a-z]{20}$/.test(project||''))throw Error('Provide the explicitly authorized new --project reference.');
const runtime=path.resolve('.runtime/new-project');
const token=fs.readFileSync(path.join(runtime,'token.env'),'utf8').trim().split('=').slice(1).join('=');
const rubric=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));
async function request(endpoint,body){
 const r=await fetch(`https://api.supabase.com/v1/projects/${project}/${endpoint}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});
 if(!r.ok)throw Error(`Provisioning failed at ${endpoint} (HTTP ${r.status}): ${(await r.text()).slice(0,250)}`);return r.json();
}
try{
 const history=await request('database/migrations');
 const before=await request('database/query',{query:"select count(*)::int as tables from pg_tables where schemaname='public';",read_only:true});
 if(before[0].tables&&!history.some(h=>h.name?.startsWith('annotation_portal_')))throw Error('The new project has existing tables without portal migration history. Nothing overwritten.');
 const applied=[];
 for(const file of fs.readdirSync('supabase/migrations').filter(f=>f.endsWith('.sql')).sort()){
  const sql=freshProjectMigration(file,fs.readFileSync('supabase/migrations/'+file,'utf8'),rubric);
  const prefix='annotation_portal_'+file.split('_')[0]+'_',name=prefix+createHash('sha256').update(sql).digest('hex').slice(0,16);
  if(history.some(h=>h.name?.startsWith(prefix)&&h.name!==name))throw Error('Different migration fingerprint: '+file);
  if(!history.some(h=>h.name===name)){
   await request('database/migrations',{name,query:sql});
   // The Management API assigns migration versions with second precision.
   await new Promise(resolve=>setTimeout(resolve,1100));
  }
  applied.push({file,name});console.log('Ready: '+file);
  fs.writeFileSync(path.join(runtime,'schema-progress.json'),JSON.stringify({project,applied},null,2)+'\n');
 }
 const languages=JSON.parse(fs.readFileSync('../agentic_conversation_capture/languages.json','utf8')),topics=JSON.parse(fs.readFileSync('../agentic_conversation_capture/topics.json','utf8'));
 const quote=v=>"'"+String(v).replaceAll("'","''")+"'";const statements=['begin'];
 for(const [id,entry] of Object.entries(languages))statements.push(`insert into public.languages(id,name) values(${quote(id)},${quote(entry.name)}) on conflict(id) do update set name=excluded.name`);
 for(const topic of topics){const id=topic['topic-id'];statements.push(`insert into public.topics(id,name) values(${quote(id)},${quote(topic['topic-name'])}) on conflict(id) do update set name=excluded.name`);for(const language of Object.keys(languages)){if(topic[language])statements.push(`insert into public.topic_titles(topic_id,language_id,title) values(${quote(id)},${quote(language)},${quote(topic[language].title)}) on conflict(topic_id,language_id) do update set title=excluded.title`);}}
 statements.push("notify pgrst, 'reload schema'",'commit');await request('database/query',{query:statements.join(';')+';'});
 const check=await request('database/query',{query:"select (select count(*) from public.topics)::int as topics,(select count(*) from public.languages)::int as languages,(select public from storage.buckets where id='conversation-packages') as package_bucket_public",read_only:true});
 fs.writeFileSync(path.join(runtime,'schema-complete.json'),JSON.stringify({project,migrations:applied.length,verified:check[0]},null,2)+'\n');console.log(JSON.stringify({project,migrations:applied.length,verified:check[0]}));
}catch(error){console.error(error.message);process.exitCode=1;}
