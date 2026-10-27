import {resolveCaptureContent} from '../src/capture-content.ts';
import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {createClient} from '@supabase/supabase-js';
import {chromium} from 'playwright';
import {uploadHtmlPackage} from '../../agentic_conversation_capture/upload-html.mjs';
import {verifyPackage,htmlStructure} from '../../agentic_conversation_capture/html-sections.mjs';
import {readSections,hydrateAnnotations} from '../src/section-registry.ts';
import C from '../src/generated/core.js';

if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
const args=process.argv.slice(2),value=name=>args[args.indexOf(name)+1];
let browser;
try{
 const project=value('--project'),stage=value('--stage'),origin=args.includes('--url')?value('--url'):'http://127.0.0.1:5173';
 if(!args.includes('--project')||new URL(process.env.VITE_SUPABASE_URL).hostname!==project+'.supabase.co'||!['import','generate','verify','reset'].includes(stage))throw Error('Use --project PROJECT --stage import|generate|verify|reset [--package FILE] [--url LOCAL_PORTAL].');
 const root=path.resolve('.runtime/html-pilot');fs.mkdirSync(root,{recursive:true});const record=path.join(root,'pilot.json');
 const client=createClient(process.env.VITE_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
 const {data:admin,error:adminError}=await client.from('profiles').select('id').eq('role','admin').limit(1).single();if(adminError)throw adminError;
 const {data:person,error:userError}=await client.auth.admin.getUserById(admin.id);if(userError)throw userError;
 // Generate and redeem a sign-in link locally. No email is sent.
 const {data:link,error:linkError}=await client.auth.admin.generateLink({type:'magiclink',email:person.user.email});if(linkError)throw linkError;
 const {data:auth,error:authError}=await client.auth.verifyOtp({type:'magiclink',token_hash:link.properties.hashed_token});if(authError)throw authError;
 const headers={apikey:process.env.VITE_SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${auth.session.access_token}`};
 async function request(url,options){const response=await fetch(url,options);if(!response.ok)throw Error(`Pilot request failed (HTTP ${response.status}): ${(await response.text()).slice(0,240)}`);return response.json();}
 const authenticated=createClient(process.env.VITE_SUPABASE_URL,process.env.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false},global:{headers:{Authorization:headers.Authorization}}});
 if(stage==='import'){
  if(!args.includes('--package'))throw Error('Import requires --package pointing to the new Tamil HTML package.');
  const file=path.resolve(value('--package'));const imported=await uploadHtmlPackage(file,{supabaseUrl:process.env.VITE_SUPABASE_URL,headers,userId:admin.id,englishFile:file.replace(/\.html-conversation\.json$/,'.english.json'),request});
  fs.writeFileSync(record,JSON.stringify({project,package:file,source_id:imported.conversation_id,english_id:imported.english.conversation_id},null,2)+'\n');console.log(JSON.stringify(imported));
 }else if(stage==='generate'){
  const pilot=JSON.parse(fs.readFileSync(record,'utf8'));if(pilot.project!==project)throw Error('Pilot project differs.');
  pilot.request_id??=randomUUID();fs.writeFileSync(record,JSON.stringify(pilot,null,2)+'\n');
  const generated=await request(origin+'/api/llm-annotations',{method:'POST',headers:{Authorization:headers.Authorization,'Content-Type':'application/json'},body:JSON.stringify({conversation_id:pilot.english_id,request_id:pilot.request_id})});
  console.log(JSON.stringify({baseline_id:generated.baseline?.id,status:generated.status||'completed'}));
 }else{
  const pilot=JSON.parse(fs.readFileSync(record,'utf8'));if(pilot.project!==project)throw Error('Pilot project differs.');
  const {data:docs,error:docError}=await client.from('conversations').select('*').in('id',[pilot.source_id,pilot.english_id]);if(docError||docs.length!==2)throw Error('Pilot conversations are missing.');
  const source=docs.find(d=>d.id===pilot.source_id),english=docs.find(d=>d.id===pilot.english_id);
  source.transcript=await resolveCaptureContent(authenticated,source.transcript);english.transcript=await resolveCaptureContent(authenticated,english.transcript);
  await verifyPackage(source.transcript.html_content);await verifyPackage(english.transcript.html_content,{source:source.transcript.html_content});
  if(JSON.stringify(htmlStructure(source.transcript.html_content))!==JSON.stringify(htmlStructure(english.transcript.html_content)))throw Error('Pilot IDs differ.');
  const {data:baseline,error:baselineError}=await client.from('llm_baselines').select('*').eq('conversation_id',pilot.english_id).order('created_at',{ascending:false}).limit(1).single();if(baselineError||baseline.generation_config.input_mode!=='turn-images/1')throw Error('Generate the English image-only baseline first.');
  const sections=await readSections(client,[pilot.english_id]);const {data:version}=await client.from('rubric_versions').select('snapshot').eq('hash',baseline.rubric_hash).single();
  C.validateAnnotations(english.transcript,hydrateAnnotations(baseline.annotations,sections),version.snapshot.rubric);
  const totals=Object.fromEntries(version.snapshot.rubric.map(f=>[f.key,baseline.annotations.filter(a=>a.feature===f.key).reduce((n,a)=>n+a.entry.count,0)]));
  if(stage==='verify'){
   browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
   await page.addInitScript(({key,session})=>localStorage.setItem(key,JSON.stringify(session)),{key:'sb-'+project+'-auth-token',session:auth.session});
   await page.goto(origin+'/conversations/'+pilot.english_id+'/baselines');await page.getByRole('heading',{name:'LLM annotations',exact:true}).waitFor();
   await page.getByRole('combobox').selectOption(baseline.id);
   if(baseline.annotations.length)await page.getByText('LLM count evidence',{exact:true}).waitFor();
   const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Export baseline',exact:true}).click();const download=await downloading;
   const exported=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
   if(exported.baseline.id!==baseline.id||exported.baseline.annotations.some(a=>a.evidence||!a.llm_evidence)||exported.sections.length!==sections.length)throw Error('Portal export lost section references or evidence.');
   fs.writeFileSync(path.join(root,'portal-export.json'),JSON.stringify(exported,null,2)+'\n');
   await page.reload();await page.getByRole('heading',{name:'LLM annotations',exact:true}).waitFor();
   await page.goto(origin+'/conversations/'+pilot.english_id+'/labeling');
   const frame=page.frameLocator('iframe[title="Captured HTML conversation"]');await frame.locator('.html-section').first().waitFor();
   if(await frame.locator('.html-section').count()!==sections.length)throw Error('Portal section coverage differs.');
   const panel=page.getByRole('complementary',{name:'Section labeling',exact:true});
   for(const section of sections){await frame.locator(`[data-section-id="${section.section_id}"] .html-section-caption`).click();for(const f of version.snapshot.rubric){const expected=baseline.annotations.find(a=>a.section_id===section.section_id&&a.feature===f.key)?.entry.count||0;if(await panel.getByRole('spinbutton',{name:f.name+' count',exact:true}).inputValue()!==String(expected))throw Error('Portal section quantity differs.');}}
   for(const f of version.snapshot.rubric){const text=await page.getByRole('button',{name:`Filter ${f.name} highlights`,exact:true}).innerText();if(!new RegExp(`\\b${totals[f.key]}\\b`).test(text))throw Error('Portal top total differs.');}
   await page.screenshot({path:path.join(root,'portal-labeling.png'),fullPage:true});
   const localChecks=JSON.parse(fs.readFileSync(path.join(root,'checks.json'),'utf8'));if(localChecks.passed!==true)throw Error('Record passing build and focused tests before accepting the pilot.');
   const proof={portal_verified:true,tests_passed:true,baseline_id:baseline.id,source_version_hash:source.transcript.html_content.version_hash,english_version_hash:english.transcript.html_content.version_hash};
   fs.writeFileSync(path.join(root,'acceptance.json'),JSON.stringify({proof,sections:sections.length,totals,usage:baseline.generation_config.usage,cost:baseline.generation_config.cost??null},null,2)+'\n');
   console.log(JSON.stringify({verified:true,baseline_id:baseline.id,sections:sections.length,totals,usage:baseline.generation_config.usage}));
  }else{
   const acceptance=JSON.parse(fs.readFileSync(path.join(root,'acceptance.json'),'utf8'));
   const {data:inventory,error}=await client.from('conversations').select('id');if(error)throw error;
   const victims=inventory.map(d=>d.id).filter(id=>![pilot.source_id,pilot.english_id].includes(id));
   const {data:result,error:resetError}=await authenticated.rpc('reset_to_html_pilot',{p_source_id:pilot.source_id,p_english_id:pilot.english_id,p_baseline_id:baseline.id,p_expected_ids:victims,p_proof:acceptance.proof});if(resetError)throw resetError;
   fs.writeFileSync(path.join(root,'reset.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
  }
 }
}catch(e){console.error(e.message);process.exitCode=1;}finally{await browser?.close();}
