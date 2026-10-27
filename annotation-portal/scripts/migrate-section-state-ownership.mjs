import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {createClient} from '@supabase/supabase-js';
import {chromium} from 'playwright';
import {readSections,ensureSectionStates} from '../src/section-registry.ts';
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
const args=process.argv.slice(2);let browser;
try{
 const project=args[args.indexOf('--project')+1],id=args.includes('--conversation')?args[args.indexOf('--conversation')+1]:null;
 if(!args.includes('--project')||new URL(process.env.VITE_SUPABASE_URL).hostname!==project+'.supabase.co'||!process.env.SUPABASE_ACCESS_TOKEN||!process.env.SUPABASE_SERVICE_ROLE_KEY)throw Error('Provide the matching --project and local management/service credentials.');
 const origin=args.includes('--url')?args[args.indexOf('--url')+1]:'http://127.0.0.1:5173';
 if(!['127.0.0.1','localhost'].includes(new URL(origin).hostname))throw Error('Use the local portal for ownership mapping.');
 const sql=fs.readFileSync('supabase/migrations/202610260006_section_state_ownership.sql','utf8'),prefix='annotation_portal_202610260006_',name=prefix+createHash('sha256').update(sql).digest('hex').slice(0,16);
 async function request(endpoint,body){const r=await fetch(`https://api.supabase.com/v1/projects/${project}/${endpoint}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${process.env.SUPABASE_ACCESS_TOKEN}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`Ownership migration returned HTTP ${r.status}.`);return r.json();}
 const history=await request('database/migrations');
 if(history.some(h=>h.name?.startsWith(prefix)&&h.name!==name))throw Error('Another ownership migration fingerprint is already applied.');
 if(!history.some(h=>h.name===name))await request('database/migrations',{name,query:sql});
 const client=createClient(process.env.VITE_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
 let query=client.from('conversations').select('id,transcript');if(id)query=query.eq('id',id);
 const {data:documents,error}=await query;if(error)throw error;
 browser=await chromium.launch({headless:true});const page=await browser.newPage();await page.goto(origin,{waitUntil:'domcontentloaded'});
 for(const d of documents){
  if(!d.transcript.messages.some(t=>/^Agent-explored interactive state /m.test(t.text)))continue;
  const {data:assets,error}=await client.from('conversation_capture_assets').select('turn_id,html,media_html').eq('conversation_id',d.id);if(error)throw error;
  const sections=await readSections(client,[d.id],true);
  const states=await page.evaluate(async ({conversation,sections,assets})=>{const {deriveSectionStates}=await import('/src/section-states.ts');return deriveSectionStates(conversation,sections,assets);},{conversation:d.transcript,sections,assets:Object.fromEntries(assets.map(a=>[a.turn_id,a.media_html||a.html]))});
  await ensureSectionStates(client,d.id,states);
  const roots=await readSections(client,[d.id]);
  console.log(JSON.stringify({conversation_id:d.id,sections:roots.length,states:states.length,owners:[...new Set(states.map(s=>s.section_id))],historical_aliases:states.flatMap(s=>s.legacy_section_ids)}));
 }
}catch(e){console.error(e.message);process.exitCode=1;}finally{await browser?.close();}
