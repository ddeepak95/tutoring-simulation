import {readFile,writeFile,mkdir,readdir,rename} from 'node:fs/promises';
import {openSync,closeSync} from 'node:fs';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const directory=path.dirname(fileURLToPath(import.meta.url));
export function pendingJobs(topics,languages,existing){
 const complete=new Set(existing.filter(c=>c.format_version==='html-conversation/2').map(c=>`${c.topic_id}/${c.language}`));
 return topics.flatMap(t=>Object.keys(t).filter(k=>languages[k]&&!complete.has(`${t['topic-id']}/${k}`)).map(language=>({topic:t['topic-id'],language,status:'queued',attempts:0})));
}
async function imports(){
 const url=new URL(process.env.VITE_SUPABASE_URL),project=url.hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
 if(!project||!process.env.SUPABASE_ACCESS_TOKEN)throw Error('Configure local Supabase project and management access token.');
 const response=await fetch(`https://api.supabase.com/v1/projects/${project}/database/query`,{method:'POST',headers:{Authorization:`Bearer ${process.env.SUPABASE_ACCESS_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({query:"select id,coalesce(topic_id,transcript->>'topic_id') as topic_id,language,transcript->'html_content'->>'format_version' as format_version from public.conversations",read_only:true}),signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error(`Import inventory failed (HTTP ${response.status}).`);
 return response.json();
}
async function latestPackage(job){
 const base=path.join(directory,'outputs',job.topic,job.language);
 let folders;try{folders=(await readdir(base)).sort().reverse();}catch(e){if(e.code==='ENOENT')return null;throw e;}
 for(const folder of folders){
  const file=path.join(base,folder,`${job.topic}-${job.language}.html-conversation.json`);
  try{const pkg=JSON.parse(await readFile(file,'utf8'));if(pkg.status==='complete'&&pkg.metadata.topic_id===job.topic&&pkg.metadata.language===job.language)return file;}catch(e){if(e.code!=='ENOENT')throw e;}
 }
 return null;
}
async function command(args,logFile,promptDelayMs){
 const fd=openSync(logFile,'a');
 try{return await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[path.join(directory,'chatgpt-flow.mjs'),...args],{cwd:path.dirname(directory),env:{...process.env,CAPTURE_PROMPT_DELAY_MS:String(promptDelayMs)},stdio:['ignore',fd,fd]});child.once('error',reject);child.once('close',code=>resolve(code));});}
 finally{closeSync(fd);}
}
export async function runBatch({resumeFile}={}){
 process.loadEnvFile(path.join(directory,'../annotation-portal/.env.local'));
 const topics=JSON.parse(await readFile(path.join(directory,'topics.json'),'utf8')),languages=JSON.parse(await readFile(path.join(directory,'languages.json'),'utf8'));
 let batch;
 const batchFolder=path.join(directory,'outputs','batches');await mkdir(batchFolder,{recursive:true});
 const file=resumeFile?path.resolve(resumeFile):path.join(batchFolder,new Date().toISOString().replace(/[:.]/g,'-')+'.json');
 if(resumeFile)batch=JSON.parse(await readFile(file,'utf8'));
 else batch={created_at:new Date().toISOString(),prompt_delay_ms:20000,between_captures_ms:60000,retry_cooldown_ms:180000,jobs:pendingJobs(topics,languages,await imports())};
 const save=async()=>{batch.updated_at=new Date().toISOString();await writeFile(file+'.tmp',JSON.stringify(batch,null,2)+'\n');await rename(file+'.tmp',file);};
 const wait=async(ms,reason)=>{batch.waiting={reason,until:new Date(Date.now()+ms).toISOString()};await save();console.log(`${reason}: waiting ${ms/1000}s`);await new Promise(r=>setTimeout(r,ms));delete batch.waiting;};
 await save();console.log(`Batch checkpoint: ${file}\nPending pairs: ${batch.jobs.length}`);
 let previousAttempt=false;
 for(const job of batch.jobs){
  const existing=(await imports()).find(c=>c.topic_id===job.topic&&c.language===job.language&&c.format_version==='html-conversation/2');
  if(existing){Object.assign(job,{status:'complete',conversation_id:existing.id});await save();continue;}
  if(previousAttempt)await wait(batch.between_captures_ms,'Between captures');
  // A resumed batch may retry unfinished work, but it never duplicates a saved import.
  for(let attempt=0;attempt<2;attempt++){
   if(attempt)await wait(batch.retry_cooldown_ms,'Failure cooldown');
   previousAttempt=true;job.status='running';job.attempts++;job.started_at=new Date().toISOString();job.log_file=file.replace(/\.json$/,`-${job.topic}-${job.language}.log`);await save();
   console.log(`Starting ${job.topic}/${job.language}, attempt ${job.attempts}`);
   try{
    const pkg=await latestPackage(job);
    const args=pkg?['upload',pkg]:['run',job.topic,'--lang',job.language,'--upload'];
    const code=await command(args,job.log_file,batch.prompt_delay_ms);
    const imported=(await imports()).find(c=>c.topic_id===job.topic&&c.language===job.language&&c.format_version==='html-conversation/2');
    if(!imported)throw Error(`Capture/import did not finish (exit ${code}); see the job log.`);
    Object.assign(job,{status:'complete',conversation_id:imported.id,completed_at:new Date().toISOString()});delete job.error;await save();console.log(`Completed ${job.topic}/${job.language}: ${imported.id}`);break;
   }catch(error){
    const log=await readFile(job.log_file,'utf8').catch(()=>'');
    if(/browser_unavailable|Capture target disconnected|Capture target connection|Capture circuit breaker|Chrome debugging endpoint|connectOverCDP.*Timeout/i.test(log+' '+error.message)){job.status='failed';job.error=error.message;batch.circuit_breaker={stage:'connection',job:job.topic+'/'+job.language,reason:'Browser unavailable; remaining jobs were not started.'};await save();throw Error(batch.circuit_breaker.reason);}
    job.status='failed';job.error=error.message;await save();console.log(`Failed ${job.topic}/${job.language}: ${job.error}`);}
  }
 }
 batch.finished_at=new Date().toISOString();await save();
 console.log(`Batch finished: ${batch.jobs.filter(j=>j.status==='complete').length}/${batch.jobs.length} imported. Checkpoint: ${file}`);
 if(batch.jobs.some(j=>j.status!=='complete'))process.exitCode=1;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))runBatch({resumeFile:process.argv[2]}).catch(e=>{console.error(e.message);process.exitCode=1;});
