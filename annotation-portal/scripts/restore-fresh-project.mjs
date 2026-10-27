import fs from 'node:fs';
import path from 'node:path';
import {createClient} from '@supabase/supabase-js';
import {verifyPackage} from '../../agentic_conversation_capture/html-sections.mjs';
import {uploadHtmlPackage} from '../../agentic_conversation_capture/upload-html.mjs';
const args=process.argv.slice(2),project=args[args.indexOf('--project')+1],runtime=path.resolve('.runtime/new-project');
if(!args.includes('--project')||project!=='ersdkjgyixcgqwjwmosc')throw Error('Provide the authorized new project reference.');
const schema=JSON.parse(fs.readFileSync(path.join(runtime,'schema-complete.json'),'utf8'));if(schema.project!==project)throw Error('New project schema has not passed setup.');
const keys=JSON.parse(fs.readFileSync(path.join(runtime,'api-keys.json'),'utf8'));
const publicKey=keys.find(k=>k.type==='publishable')?.api_key||keys.find(k=>k.name==='anon')?.api_key;
const secretKey=keys.find(k=>k.type==='secret')?.api_key||keys.find(k=>k.name==='service_role')?.api_key;
const url=`https://${project}.supabase.co`;
process.loadEnvFile('../agentic_conversation_capture/.env.local');
if(!process.env.PORTAL_USERNAME||!process.env.PORTAL_PASSWORD)throw Error('Existing local portal login is missing.');
const adminClient=createClient(url,secretKey,{auth:{persistSession:false}});
const current=await adminClient.auth.admin.listUsers({page:1,perPage:1000});if(current.error)throw current.error;
const email=`${process.env.PORTAL_USERNAME}@users.annotation.invalid`;
let user=current.data.users.find(u=>u.email===email);
if(!user){const result=await adminClient.auth.admin.createUser({email,password:process.env.PORTAL_PASSWORD,email_confirm:true});if(result.error)throw result.error;user=result.data.user;}
const profile=await adminClient.from('profiles').update({role:'admin'}).eq('id',user.id);if(profile.error)throw profile.error;
const client=createClient(url,publicKey,{auth:{persistSession:false}});
const auth=await client.auth.signInWithPassword({email,password:process.env.PORTAL_PASSWORD});if(auth.error)throw auth.error;
const headers={apikey:publicKey,Authorization:`Bearer ${auth.data.session.access_token}`};
fs.writeFileSync(path.join(runtime,'credentials.json'),JSON.stringify({project,url,publicKey,secretKey,admin_id:user.id,username:process.env.PORTAL_USERNAME}));
async function request(endpoint,options){const r=await fetch(endpoint,{...options,signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`Restore failed (HTTP ${r.status}): ${(await r.text()).slice(0,200)}`);return r.json();}
function walk(folder){return fs.readdirSync(folder,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(folder,e.name)):[path.join(folder,e.name)]);}
const originals=new Map(),translations=[];const pilot=JSON.parse(fs.readFileSync('.runtime/html-pilot/pilot.json','utf8'));
for(const file of walk('../agentic_conversation_capture/outputs').filter(f=>/(?:\.html-conversation|\.english)\.json$/.test(f))){
 const pkg=JSON.parse(fs.readFileSync(file,'utf8'));if(pkg.format_version!=='html-conversation/2'||pkg.status!=='complete')continue;
 try{await verifyPackage(pkg,{assetReader:a=>fs.promises.readFile(path.resolve(path.dirname(file),a.file))});}catch{continue;}
 const item={file:path.resolve(file),pkg};
 if(pkg.source_version){translations.push(item);continue;}
 const key=pkg.metadata.topic_id+'/'+pkg.metadata.language,old=originals.get(key);
 if(key==='covalent-radius/ta'){if(path.resolve(file)!==path.resolve(pilot.package))continue;originals.set(key,item);}
 else if(!old||pkg.captured_at>old.pkg.captured_at)originals.set(key,item);
}
const jobs=[...originals.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([key,item])=>({key,...item,english:translations.find(t=>t.pkg.source_version.capture_id===item.pkg.capture_id)}));
const reportFile=path.join(runtime,'restore.json');let report={project,started_at:new Date().toISOString(),expected:jobs.reduce((n,j)=>n+1+Number(!!j.english),0),jobs:[]};
if(fs.existsSync(reportFile)){report=JSON.parse(fs.readFileSync(reportFile,'utf8'));if(report.project!==project)throw Error('Restore checkpoint belongs to another project.');}
console.log(`Restoring ${report.expected} verified conversations to ${project}.`);
for(const job of jobs){
 if(report.jobs.some(j=>j.key===job.key&&j.status==='complete'))continue;
 console.log('Importing '+job.key+(job.english?' with English translation':''));
 const entry={key:job.key,status:'running',source:job.file};report.jobs=report.jobs.filter(j=>j.key!==job.key);report.jobs.push(entry);fs.writeFileSync(reportFile,JSON.stringify(report,null,2)+'\n');
 try{
  const receipt=await uploadHtmlPackage(job.file,{supabaseUrl:url,headers,userId:user.id,englishFile:job.english?.file,request,receiptFile:path.join(runtime,job.key.replace('/','-')+'.upload.json')});
  Object.assign(entry,{status:'complete',receipt,sections:job.pkg.turns.reduce((n,t)=>n+t.sections.length,0),images:job.pkg.assets.length});
  console.log('Imported '+job.key+': '+receipt.conversation_id);
 }catch(error){Object.assign(entry,{status:'failed',error:error.message});console.log('Failed '+job.key+': '+error.message);}
 fs.writeFileSync(reportFile,JSON.stringify(report,null,2)+'\n');
}
report.finished_at=new Date().toISOString();fs.writeFileSync(reportFile,JSON.stringify(report,null,2)+'\n');
const done=report.jobs.filter(j=>j.status==='complete');console.log(JSON.stringify({project,imported:done.reduce((n,j)=>n+1+Number(!!j.receipt.english),0),expected:report.expected,failed:report.jobs.filter(j=>j.status==='failed').length}));
if(report.jobs.some(j=>j.status==='failed'))process.exitCode=1;
