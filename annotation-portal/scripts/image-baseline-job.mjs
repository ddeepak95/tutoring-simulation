import fs from 'node:fs';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {renderLLMTurns} from './render-llm-turns.mjs';
import {generateImageBaseline,imagePrompt,imagePromptVersion} from '../server/image-labeling.ts';
import C from '../src/generated/core.js';

export async function runImageBaselineJob({client,document,sections,rubric,config,apiKey,project,portal,push,resumedState,origin}) {
 const [{data:capture,error:captureError},{data:assets,error:assetsError}]=await Promise.all([
  client.from('conversation_capture_documents').select('html').eq('conversation_id',document.id).maybeSingle(),
  client.from('conversation_capture_assets').select('turn_id,html,media_html').eq('conversation_id',document.id)
 ]);
 if(captureError||assetsError)throw Error('Could not read captured HTML.');
 const html=(document.transcript.html_content?'<!doctype html><html><head></head><body></body></html>':capture?.html)||assets?.map(a=>`<article class="capture-message" data-turn-id="${a.turn_id}">${a.html}</article>`).join('');
 const byTurn=Object.fromEntries((assets||[]).map(a=>[a.turn_id,a.media_html||a.html]));
 const fingerprint=createHash('sha256').update(JSON.stringify({document,sections,html,assets:byTurn,rubric:rubric.rubric_sha256,config,prompt:imagePrompt(rubric),version:imagePromptVersion})).digest('hex');
 if(resumedState&&resumedState.fingerprint!==fingerprint)throw Error('Image job no longer matches its conversation, capture, sections, rubric, prompt or configuration.');
 const job=resumedState||{id:randomUUID(),input_mode:'turn-images/1',project,conversation_id:document.id,fingerprint,status:'pending',stages:[{pass:'extraction',baseline_id:randomUUID(),published:false}]};
 const root=path.join(portal,'.runtime/llm-baselines'),jobFolder=path.join(root,'jobs');fs.mkdirSync(jobFolder,{recursive:true});
 const jobFile=path.join(jobFolder,job.id+'.json'),folder=path.join(root,'image-jobs',job.id);fs.mkdirSync(folder,{recursive:true});
 const persist=()=>{fs.writeFileSync(jobFile+'.tmp',JSON.stringify(job,null,2)+'\n');fs.renameSync(jobFile+'.tmp',jobFile);};
 const lockFile=jobFile+'.lock';
 if(fs.existsSync(lockFile)){const pid=Number(fs.readFileSync(lockFile,'utf8'));let alive=false;try{process.kill(pid,0);alive=true;}catch(e){if(e.code!=='ESRCH')alive=true;}if(alive)throw Error('This image job is already running.');fs.unlinkSync(lockFile);}
 const lock=fs.openSync(lockFile,'wx');fs.writeFileSync(lock,String(process.pid));
 try {
  persist();console.log(JSON.stringify({result:'image_job',job_id:job.id,conversation_id:document.id,resume_command:`npm run llm:baselines -- --project ${project} --resume ${job.id}`,folder}));
  if(job.stages[0].published){console.log(JSON.stringify({result:'already_imported',baseline_id:job.stages[0].baseline_id}));return;}
  const file=path.join(root,job.stages[0].baseline_id+'.json');
  let artifact;
  if(fs.existsSync(file)){artifact=JSON.parse(fs.readFileSync(file,'utf8'));if(artifact.generation_config.pipeline_job_id!==job.id)throw Error('Artifact does not match the image job.');C.validateAnnotations(document.transcript,artifact.annotations,rubric.rubric);}
  else {
   const manifest=path.join(folder,'images','manifest.json');
   const turns=fs.existsSync(manifest)?JSON.parse(fs.readFileSync(manifest,'utf8')).turns:await renderLLMTurns({conversation:document.transcript,sections,html,assets:byTurn,folder:path.join(folder,'images'),origin});
   for(const t of turns)for(const tile of t.tiles)tile.data=fs.readFileSync(tile.file).toString('base64');
   console.log(JSON.stringify({result:'turn_images_ready',turns:turns.length,sections:sections.length,tiles:turns.reduce((n,t)=>n+t.tiles.length,0)}));
   const generated=await generateImageBaseline({conversation:document.transcript,rubric,sections,turns,requestId:job.stages[0].baseline_id,config,apiKey,checkpoint:job.image_checkpoint,onCheckpoint:checkpoint=>{job.image_checkpoint=checkpoint;persist();const complete=Object.values(checkpoint.turns).filter(t=>t.annotations).length;console.log(JSON.stringify({result:'image_checkpoint',completed_turns:complete,total_turns:turns.length}));},onExchange:(turn,attempt,kind,value)=>{const dir=path.join(folder,turn);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,`${attempt}-${kind}.json`),JSON.stringify(value,null,2)+'\n');}});
   artifact={format_version:'llm-baseline-local/1.0',id:job.stages[0].baseline_id,conversation_id:document.id,rubric_hash:rubric.rubric_sha256,rubric_snapshot:rubric,sections,conversation:document.transcript,annotations:generated.annotations,model:generated.model,prompt_version:imagePromptVersion,prompt:generated.prompt,generation_config:{...generated.generation_config,origin:'local_llm_generation',pipeline_job_id:job.id},generated_at:new Date().toISOString()};
   fs.writeFileSync(file,JSON.stringify(artifact,null,2)+'\n',{flag:'wx'});
  }
  await push(artifact);job.stages[0].published=true;job.status='completed';persist();
  console.log(JSON.stringify({result:'image_baseline_complete',baseline_id:artifact.id,sections:sections.length,labels:artifact.annotations.length,feature_totals:Object.fromEntries(rubric.rubric.map(f=>[f.key,artifact.annotations.filter(a=>a.feature===f.key).reduce((n,a)=>n+a.entry.count,0)])),usage:artifact.generation_config.usage,local_file:file}));
 }catch(error){job.status='failed';persist();throw error;}finally{fs.closeSync(lock);fs.unlinkSync(lockFile);}
}
