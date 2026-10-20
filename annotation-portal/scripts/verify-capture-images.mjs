import fs from 'node:fs';import {createClient} from '@supabase/supabase-js';
for(const file of ['.env.local','../.env'])if(fs.existsSync(file))process.loadEnvFile(file);
const client=createClient(process.env.VITE_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
for(const [table,columns] of [['chatgpt_html_archives','id,html,media_html,snapshot_sha256'],['conversation_capture_assets','conversation_id,turn_id,html,media_html']]){
 const {data,error}=await client.from(table).select(columns);if(error)throw new Error(`Could not verify ${table}.`);
 const rows=data||[];let sourceImages=0,mediaImages=0,embedded=0,links=0,rawChanged=0;
 for(const row of rows){sourceImages+=(row.html.match(/<img\b/gi)||[]).length;const media=row.media_html||'';mediaImages+=(media.match(/<img\b/gi)||[]).length;embedded+=(media.match(/data:image\//gi)||[]).length;links+=(media.match(/<img\b[^>]*\bsrc\s*=\s*["']https:\/\//gi)||[]).length;if(media&&media!==row.html)rawChanged++;}
 console.log(JSON.stringify({table:table,rows:rows.length,normalizedRows:rows.filter(row=>row.media_html).length,sourceImages,normalizedImages:mediaImages,remainingEmbeddedImages:embedded,httpsImageLinks:links,rawHtmlDiffersInNormalizedRows:rawChanged,sourceSnapshotHashesPresent:table==='chatgpt_html_archives'?rows.every(row=>row.snapshot_sha256):undefined}));
}
const {data:archives,error}=await client.from('chatgpt_html_archives').select('media_html').not('media_html','is',null).limit(1);if(error)throw new Error('Could not inspect public image URLs.');
const urls=[...new Set((archives?.[0]?.media_html||'').match(/https:\/\/[^"'\s>]+/g)||[])].filter(value=>value.includes('/storage/v1/object/public/capture-images/')).slice(0,3);
const checks=await Promise.all(urls.map(async uri=>{try{const response=await fetch(uri,{method:'HEAD',signal:AbortSignal.timeout(15000)});return {status:response.status,content_type:response.headers.get('content-type')};}catch{return {status:'unreachable'};}}));
console.log(JSON.stringify({publicImageReadChecks:checks}));if(checks.some(check=>check.status!==200))process.exitCode=1;
