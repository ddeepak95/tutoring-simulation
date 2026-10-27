import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {verifyPackage,packageHash} from './html-sections.mjs';
import {translateCaptureToEnglish} from './translate-english.mjs';
import {storeCapturePackage} from './capture-file-storage.mjs';
import {requireSectionStructure,packageStructureInputs} from './section-structure.mjs';

export async function uploadHtmlPackage(packageFile,{supabaseUrl,headers,userId,englishFile,request,receiptFile}) {
  const directory=path.dirname(packageFile),source=JSON.parse(await readFile(packageFile,'utf8'));
  const assetPath=a=>{const result=path.resolve(directory,a.file);if(path.relative(directory,result).startsWith('..')||path.isAbsolute(path.relative(directory,result)))throw Error('Asset path escapes the capture folder.');return result;};
  await verifyPackage(source,{assetReader:a=>readFile(assetPath(a))});
  await requireSectionStructure(packageStructureInputs(source),{reportFile:packageFile.replace(/\.json$/,'.structure.json')});
  try{await request(`${supabaseUrl}/rest/v1/rpc/capture_file_storage_version`,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:'{}'});}catch{throw Error('Hosted capture file storage is unavailable. Apply migrate-capture-files.mjs before uploading; no capture assets were uploaded.');}
  let translated=null;
  const englishTarget=englishFile===true?packageFile.replace(/\.html-conversation\.json$/,'.english.json'):englishFile;
  if(englishFile){
    if(/^(en|english)$/i.test(source.metadata.language))throw Error('Source capture is already English.');
    try{translated=JSON.parse(await readFile(englishTarget,'utf8'));}catch(e){if(e.code!=='ENOENT'||englishFile!==true)throw e;translated=await translateCaptureToEnglish(source);await writeFile(englishTarget,JSON.stringify(translated,null,2)+'\n',{flag:'wx'});}
    await verifyPackage(translated,{source});
    await requireSectionStructure(packageStructureInputs(translated),{reportFile:englishTarget.replace(/\.json$/,'.structure.json')});
  }
  const uploaded=structuredClone(source),english=translated&&structuredClone(translated);
  for(const asset of source.assets){
    const bytes=await readFile(assetPath(asset)),storagePath=`captures/${userId}/${asset.sha256}.${path.extname(asset.file).slice(1)}`;
    const publicUrl=`${supabaseUrl}/storage/v1/object/public/capture-images/${storagePath}`;
    const response=await fetch(`${supabaseUrl}/storage/v1/object/capture-images/${storagePath}`,{method:'POST',headers:{...headers,'Content-Type':asset.mime,'Cache-Control':'max-age=31536000'},body:bytes,signal:AbortSignal.timeout(30000)});
    if(!response.ok){const body=await response.text();if(!/Duplicate|already exists|ResourceAlreadyExists/i.test(body))throw Error(`Image upload failed (HTTP ${response.status}).`);}
    const check=await fetch(publicUrl,{signal:AbortSignal.timeout(30000)});
    const {hash}=await import('./html-sections.mjs');if(!check.ok||hash(Buffer.from(await check.arrayBuffer()))!==asset.sha256)throw Error('Uploaded image failed hash verification.');
    const replace=value=>value.replaceAll(`./${asset.file}`,publicUrl).replaceAll(asset.file,publicUrl);
    for(const pkg of [uploaded,english].filter(Boolean)){
      for(const turn of pkg.turns){turn.html=replace(turn.html);for(const section of turn.sections){section.html=replace(section.html);for(const component of section.components)for(const state of component.states){state.html=replace(state.html);state.sha256=hash(state.html);}}}
      pkg.assets.find(a=>a.sha256===asset.sha256).file=publicUrl;
    }
  }
  uploaded.version_hash=packageHash(uploaded);await verifyPackage(uploaded);
  const reference=await storeCapturePackage(uploaded,{supabaseUrl,headers,userId});
  const receipt=await request(`${supabaseUrl}/rest/v1/rpc/import_html_conversation_file`,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({p_package:uploaded,p_reference:reference})});
  let englishReceipt=null;
  if(english){english.source_version={capture_id:uploaded.capture_id,version_hash:uploaded.version_hash,language:uploaded.metadata.language};english.version_hash=packageHash(english);await verifyPackage(english,{source:uploaded});
    const englishReference=await storeCapturePackage(english,{supabaseUrl,headers,userId});
    englishReceipt=await request(`${supabaseUrl}/rest/v1/rpc/import_html_conversation_file`,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({p_package:english,p_reference:englishReference,p_source_id:receipt.conversation_id})});}
  const result={...receipt,...(englishReceipt?{english:englishReceipt}:{})};
  await writeFile(receiptFile||packageFile.replace(/\.json$/,'.upload.json'),JSON.stringify(result,null,2)+'\n','utf8');return result;
}
