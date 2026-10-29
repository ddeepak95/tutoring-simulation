import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import pg from 'pg';
import {createServer} from 'vite';
import {profile} from './supabase-sync-core.mjs';
import {regroupLocal} from './regroup-local-core.mjs';

const portal=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
process.loadEnvFile(path.join(portal,'.env.local'));
if(process.env.SUPABASE_TARGET!=='local')throw Error('Regrouping requires the active local target.');
if(process.argv.slice(2).some(a=>a!=='--apply'))throw Error('Use regroup-local.mjs [--apply].');
const config=profile(process.env,'local'),db=new pg.Client({connectionString:config.dbUrl,connectionTimeoutMillis:10000,query_timeout:30000});
const server=await createServer({root:portal,configFile:false,optimizeDeps:{noDiscovery:true,include:[]},server:{middlewareMode:true,watch:null},appType:'custom'});
const folder=path.join(portal,'../.runtime/section-regroup-'+new Date().toISOString().replace(/[:.]/g,'-'));
try{
 await db.connect();const {sectionCandidates}=await server.ssrLoadModule('/src/section-registry.ts');
 const result=await regroupLocal(db,config,{apply:process.argv.includes('--apply'),rubric:JSON.parse(fs.readFileSync(path.join(portal,'src/generated/rubric.json'),'utf8')),buildCandidates:sectionCandidates,migration:fs.readFileSync(path.join(portal,'supabase/migrations/202610280001_section_grouping_version.sql'),'utf8'),backup:async data=>{
  fs.mkdirSync(folder,{recursive:true});const bytes=JSON.stringify(data,null,2),file=path.join(folder,'backup.json');fs.writeFileSync(file,bytes,{flag:'wx',mode:0o600});if(createHash('sha256').update(fs.readFileSync(file)).digest('hex')!==createHash('sha256').update(bytes).digest('hex'))throw Error('Backup verification failed.');
 }});
 if(result.mode==='applied')fs.writeFileSync(path.join(folder,'result.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({...result,...(result.mode==='applied'?{backup:folder}:{})},null,2));
}finally{await server.close();await db.end();}
