import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {portalPublicConfig} from './upload-supabase.mjs';
import {hash,packageHash,verifyPackage} from './html-sections.mjs';
import {storeCapturePackage} from './capture-file-storage.mjs';
const require=createRequire(new URL('../annotation-portal/package.json',import.meta.url));
async function packages(folder){
 const files=[];for(const entry of await readdir(folder,{withFileTypes:true})){const file=path.join(folder,entry.name);if(entry.isDirectory())files.push(...await packages(file));else if(/(?:\.html-conversation|\.english)\.json$/.test(entry.name))files.push(file);}return files;
}
async function main(){
 const {supabaseUrl,publicKey}=await portalPublicConfig();
 const {createClient}=require('@supabase/supabase-js'),client=createClient(supabaseUrl,publicKey,{auth:{persistSession:false}});
 if(!process.env.PORTAL_USERNAME||!process.env.PORTAL_PASSWORD)throw Error('Configure the existing portal admin login locally.');
 const auth=await client.auth.signInWithPassword({email:`${process.env.PORTAL_USERNAME}@users.annotation.invalid`,password:process.env.PORTAL_PASSWORD});if(auth.error)throw Error('Hosted administrator sign-in failed. No rows changed.');
 const user=auth.data.user,headers={apikey:publicKey,Authorization:`Bearer ${auth.data.session.access_token}`};
 const {data,error}=await client.from('conversations').select('id,created_by,source_conversation_id,capture_id:transcript->html_content->>capture_id,version_hash:transcript->html_content->>version_hash,language,reference:transcript->html_content_ref');
 if(error)throw Error(`Could not read the compact capture inventory: ${error.message}`);
 const rows=data.filter(row=>row.capture_id),local=[];
 for(const file of await packages(path.join(import.meta.dirname,'outputs'))){const pkg=JSON.parse(await readFile(file,'utf8'));if(pkg.format_version==='html-conversation/2'&&pkg.status==='complete')local.push({file,pkg});}
 const report={started_at:new Date().toISOString(),results:[]};const reportFile=path.join(import.meta.dirname,'outputs','batches','capture-storage-offload.json');await mkdir(path.dirname(reportFile),{recursive:true});
 for(const row of rows){
  if(row.reference){report.results.push({id:row.id,status:'already_stored'});continue;}
  try{
   let chosen;
   for(const candidate of local.filter(c=>c.pkg.capture_id===row.capture_id)){
    const pkg=structuredClone(candidate.pkg);
    for(const asset of pkg.assets){
     const original=asset.file,extension=path.extname(original).slice(1);
     const url=`${supabaseUrl}/storage/v1/object/public/capture-images/captures/${row.created_by}/${asset.sha256}.${extension}`;
     const replace=value=>value.replaceAll(`./${original}`,url).replaceAll(original,url);
     for(const turn of pkg.turns){turn.html=replace(turn.html);for(const section of turn.sections){section.html=replace(section.html);for(const component of section.components)for(const state of component.states){state.html=replace(state.html);state.sha256=hash(state.html);}}}
     asset.file=url;
    }
    if(pkg.source_version){const source=rows.find(r=>r.id===row.source_conversation_id);if(!source)throw Error('Missing source capture index.');pkg.source_version={capture_id:source.capture_id,version_hash:source.version_hash,language:source.language};}
    pkg.version_hash=packageHash(pkg);if(pkg.version_hash===row.version_hash){chosen=pkg;break;}
   }
   if(!chosen)throw Error('No exact local package matches the hosted version. Left unchanged.');
   await verifyPackage(chosen);
   const reference=await storeCapturePackage(chosen,{supabaseUrl,headers,userId:user.id});
   const result=await client.rpc('externalize_html_conversation',{p_conversation_id:row.id,p_reference:reference});if(result.error)throw result.error;
   report.results.push({id:row.id,status:'moved',bytes:reference.bytes,reference});console.log(`Moved ${row.id}: ${reference.bytes} bytes to private Storage.`);
  }catch(error){report.results.push({id:row.id,status:'unchanged',error:error.message});console.log(`Left ${row.id} unchanged: ${error.message}`);}
  await writeFile(reportFile,JSON.stringify(report,null,2)+'\n');
 }
 report.finished_at=new Date().toISOString();await writeFile(reportFile,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({moved:report.results.filter(r=>r.status==='moved').length,already_stored:report.results.filter(r=>r.status==='already_stored').length,unchanged:report.results.filter(r=>r.status==='unchanged').length,report:reportFile}));
 if(report.results.some(r=>r.status==='unchanged'))process.exitCode=1;
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
