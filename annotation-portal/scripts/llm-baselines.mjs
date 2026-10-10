import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { createClient } from '@supabase/supabase-js';
import { generateInstructionalBaseline } from '../server/llm-provider.ts';
import { promptVersion } from '../server/llm-annotation-core.ts';
import C from '../src/generated/core.js';
import { resolveRepositoryAdmin } from './repository-conversations.mjs';
const portal=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
if(fs.existsSync(path.join(portal,'.env.local')))process.loadEnvFile(path.join(portal,'.env.local'));
if(!process.env.OPENROUTER_API_KEY && fs.existsSync(path.join(portal,'../.env')))process.loadEnvFile(path.join(portal,'../.env'));
const args=process.argv.slice(2);let project,admin,pilot=false,all=false,dry=false,regenerate=false,importFile;const requested=[];
try{
 for(let i=0;i<args.length;i++){
  if(args[i]==='--project')project=args[++i];else if(args[i]==='--admin')admin=args[++i];else if(args[i]==='--conversation')requested.push(args[++i]);
  else if(args[i]==='--pilot')pilot=true;else if(args[i]==='--all-missing')all=true;else if(args[i]==='--dry-run')dry=true;else if(args[i]==='--regenerate')regenerate=true;else if(args[i]==='--import')importFile=args[++i];
  else throw new Error('Usage: npm run llm:baselines -- --project PROJECT (--pilot | --conversation ID | --all-missing | --import FILE) [--dry-run] [--regenerate] [--admin USERNAME]');
 }
 if(Number(pilot)+Number(all)+Number(Boolean(requested.length))+Number(Boolean(importFile))!==1)throw new Error('Choose exactly one conversation selection or a local baseline file to import.');
 const url=process.env.VITE_SUPABASE_URL;const ref=url&&new URL(url).hostname.match(/^([a-z0-9]+)\.supabase\.co$/)?.[1];
 if(!ref||new URL(url).protocol!=='https:'||project!==ref)throw new Error('--project must match VITE_SUPABASE_URL. No requests sent.');
 if(!process.env.SUPABASE_SERVICE_ROLE_KEY)throw new Error('Set the server-only SUPABASE_SERVICE_ROLE_KEY in .env.local.');
 const client=createClient(url,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
 const adminId=await resolveRepositoryAdmin(client,admin);
 async function readAll(table,columns='*'){
  const rows=[];for(let offset=0;;offset+=500){const {data,error}=await client.from(table).select(columns).order('id').range(offset,offset+499);if(error)throw new Error(`Could not read ${table}. Check the project and baseline migration.`);rows.push(...data);if(data.length<500)return rows;}
 }
 const documents=await readAll('conversations');const baselines=await readAll('llm_baselines','id,conversation_id');
 const rubric=JSON.parse(fs.readFileSync(path.join(portal,'src/generated/rubric.json'),'utf8'));
 const config=JSON.parse(fs.readFileSync(path.join(portal,'server/generated/evaluation-config.json'),'utf8'));
 const existing=new Set(baselines.map(baseline=>baseline.conversation_id));
 let selection=documents.filter(doc=>regenerate||!existing.has(doc.id));
 if(requested.length){const unknown=requested.filter(id=>!documents.some(doc=>doc.id===id));if(unknown.length)throw new Error('A requested conversation does not exist in this portal.');selection=selection.filter(doc=>requested.includes(doc.id));}
 if(pilot){selection.sort((a,b)=>Number(b.language==='English'&&!b.transcript.source_conversation_id)-Number(a.language==='English'&&!a.transcript.source_conversation_id)||Number(b.transcript.messages.filter(turn=>turn.speaker==='tutor').length>=2)-Number(a.transcript.messages.filter(turn=>turn.speaker==='tutor').length>=2)||a.transcript.messages.reduce((sum,turn)=>sum+turn.text.length,0)-b.transcript.messages.reduce((sum,turn)=>sum+turn.text.length,0));selection=selection.slice(0,1);}
 async function push(artifact){
  const document=documents.find(doc=>doc.id===artifact.conversation_id);if(!document)throw new Error('The baseline conversation is not in the configured portal.');
  if(!isDeepStrictEqual(artifact.conversation,document.transcript))throw new Error('The local baseline does not contain this exact saved transcript.');
  if(artifact.format_version!=='llm-baseline-local/1.0'||artifact.rubric_snapshot?.rubric_sha256!==artifact.rubric_hash||!Array.isArray(artifact.annotations)||artifact.annotations.some(annotation=>!['concepts_and_subtopics_covered','examples','analogies','representations','cultural_references','questions'].includes(annotation.feature)))throw new Error('Invalid local baseline format.');
  C.validateAnnotations(document.transcript,artifact.annotations,artifact.rubric_snapshot.rubric);
  const {data:version,error:readError}=await client.from('rubric_versions').select('snapshot').eq('hash',artifact.rubric_hash).maybeSingle();if(readError)throw new Error('Could not read the baseline rubric.');
  if(version && !isDeepStrictEqual(version.snapshot.rubric,artifact.rubric_snapshot.rubric))throw new Error('The saved rubric definition differs from the local baseline.');
  if(!version){const {error}=await client.from('rubric_versions').insert({hash:artifact.rubric_hash,snapshot:artifact.rubric_snapshot});if(error&&error.code!=='23505')throw new Error('Could not register the baseline rubric.');}
  const {data,error}=await client.rpc('import_llm_baseline',{p_conversation_id:artifact.conversation_id,p_baseline_id:artifact.id,p_rubric_hash:artifact.rubric_hash,p_annotations:artifact.annotations,p_model:artifact.model,p_prompt_version:artifact.prompt_version,p_prompt:artifact.prompt,p_generation_config:artifact.generation_config,p_admin_id:adminId});
  if(error)throw new Error('Could not import the baseline. The local JSON is retained; use --import to retry without another model call.');
  console.log(JSON.stringify({result:'imported',conversation_id:data.conversation_id,baseline_id:data.id,annotation_count:data.annotations.length,model:data.model,ratings:'blank when assigned'}));
 }
 if(importFile){const artifact=JSON.parse(fs.readFileSync(path.resolve(importFile),'utf8'));if(dry){console.log(JSON.stringify({result:'dry_run',conversation_id:artifact.conversation_id,baseline_id:artifact.id}));}else await push(artifact);}
 else{
  console.log(JSON.stringify({model:config.model,dry_run:dry,conversations:selection.map(doc=>({id:doc.id,label:doc.label,language:doc.language,tutor_turns:doc.transcript.messages.filter(turn=>turn.speaker==='tutor').length}))},null,2));
  if(!selection.length)throw new Error('No conversations need a baseline. Use --conversation ID --regenerate to create another version deliberately.');
  if(!dry){
   if(!process.env.OPENROUTER_API_KEY)throw new Error('Set the server-only OPENROUTER_API_KEY locally.');
   for(const document of selection){
    const id=crypto.randomUUID();const generated=await generateInstructionalBaseline({conversation:document.transcript,rubric,requestId:id,config,apiKey:process.env.OPENROUTER_API_KEY});
    const artifact={format_version:'llm-baseline-local/1.0',id,conversation_id:document.id,rubric_hash:rubric.rubric_sha256,rubric_snapshot:rubric,conversation:document.transcript,annotations:generated.annotations,model:generated.model,prompt_version:promptVersion,prompt:generated.prompt,generation_config:{...generated.generation_config,origin:'local_llm_generation'},generated_at:new Date().toISOString()};
    const folder=path.join(portal,'.runtime/llm-baselines');fs.mkdirSync(folder,{recursive:true});const file=path.join(folder,`${id}.json`);fs.writeFileSync(file,JSON.stringify(artifact,null,2)+'\n',{flag:'wx'});
    console.log(JSON.stringify({result:'generated_and_validated',conversation_id:document.id,baseline_id:id,annotation_count:artifact.annotations.length,local_file:file}));
    await push(artifact);
   }
  }
 }
}catch(error){console.error(error instanceof Error&&error.name==='TimeoutError'?'Generation timed out; no baseline was imported.':error instanceof Error&&error.name==='TypeError'?'Could not reach the configured provider or database.':error.message);process.exitCode=1;}
