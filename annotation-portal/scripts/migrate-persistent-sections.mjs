import fs from 'node:fs';
import crypto from 'node:crypto';
import {chromium} from 'playwright';

if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
let browser;
try {
  const args=process.argv.slice(2),expected=args[args.indexOf('--project')+1];
  const project=new URL(process.env.VITE_SUPABASE_URL).hostname.split('.')[0];
  if(!args.includes('--project')||expected!==project||!process.env.SUPABASE_ACCESS_TOKEN)throw Error('Provide --project matching VITE_SUPABASE_URL and the management token. No changes sent.');
  const origin=args.includes('--url')?args[args.indexOf('--url')+1]:'http://127.0.0.1:5173';
  if(!['127.0.0.1','localhost'].includes(new URL(origin).hostname))throw Error('Use the local portal URL for source mapping.');
  async function request(endpoint,body){
    const response=await fetch(`https://api.supabase.com/v1/projects/${project}/${endpoint}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${process.env.SUPABASE_ACCESS_TOKEN}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(60000)});
    if(!response.ok){const detail=await response.json().catch(()=>({}));throw Error(`Database request failed (HTTP ${response.status}): ${String(detail.message||detail.error||'Request rejected').split('\n')[0].slice(0,240)}`);}
    return response.json();
  }
  const query=(query,read_only=true)=>request('database/query',{query,read_only});
  const prefix='annotation_portal_202610260002_';
  const history=await request('database/migrations');
  const existing=history.find(row=>row.name?.startsWith(prefix));
  if(existing){console.log(JSON.stringify({result:'already_applied',project}));process.exitCode=0;}
  else {
    const documents=await query('select id from public.conversations order by id');
    browser=await chromium.launch({headless:true});
    const page=await browser.newPage();await page.goto(origin+'/src/generated/rubric.json');
    const seeds=[];let count=0;
    const mappingVersion=crypto.createHash('sha256').update(fs.readFileSync('src/captured-sections.ts')).update(fs.readFileSync('src/section-registry.ts')).digest('hex').slice(0,12);
    const cachePath=`.runtime/debug/section-registry-prepared-${project}-${mappingVersion}.json`;
    const cache=fs.existsSync(cachePath)?JSON.parse(fs.readFileSync(cachePath,'utf8')):{};
    for(const document of documents){
      if(cache[document.id]){seeds.push(cache[document.id].sql);count+=cache[document.id].count;continue;}
      const [data]=await query(`select c.transcript,d.html,coalesce((select jsonb_agg(jsonb_build_object('turn_id',a.turn_id,'html',coalesce(a.media_html,a.html)) order by a.turn_id) from public.conversation_capture_assets a where a.conversation_id=c.id),'[]') as assets from public.conversations c left join public.conversation_capture_documents d on d.conversation_id=c.id where c.id='${document.id}'`);
      const candidates=await page.evaluate(async data=>{
        const {sectionCandidates}=await import('/src/section-registry.ts');
        const {mapCapturedArticle}=await import('/src/captured-sections.ts');
        const {translateCapturedLayout}=await import('/src/translated-capture-layout.ts');
        const {normalizeCapturedSpeakerLabels}=await import('/src/captured-speaker-labels.ts');
        const canTranslate=!data.transcript.translation||Boolean(data.transcript.translation.source_messages?.length&&data.transcript.translation.alignment?.length);
        let html=data.html;
        if(!html&&data.assets.length)html=data.assets.map(a=>`<article class="capture-message" data-turn-id="${a.turn_id}">${a.html}</article>`).join('');
        if(!html||!canTranslate)return sectionCandidates(data.transcript);
        const frame=document.createElement('iframe');frame.sandbox='allow-same-origin';
        const loaded=new Promise(resolve=>frame.onload=resolve);frame.srcdoc=html;document.body.append(frame);await loaded;
        try{
          const doc=frame.contentDocument;translateCapturedLayout(doc,data.transcript);normalizeCapturedSpeakerLabels(doc,data.transcript);
          const ranges=[];
          const articles=[...doc.querySelectorAll('article')].filter(a=>a.classList.contains('capture-message')||a.dataset.turnId);
          for(const [index,article] of articles.entries()){
            const turn=data.transcript.messages.find(t=>t.turn_id===article.dataset.turnId)||data.transcript.messages[index];
            if(turn?.speaker!=='tutor')continue;
            const sections=mapCapturedArticle(article,turn.text,data.assets.find(a=>a.turn_id===turn.turn_id)?.html,data.transcript.translation?(data.transcript.translation.alignment||[]).filter(a=>a.turn_id===turn.turn_id&&a.kind==='heading').map(a=>({start:a.start,end:a.end})):undefined);
            if(!sections.length||sections.some(s=>!s.offsets))throw Error(`Unmapped source sections in ${turn.turn_id}`);
            ranges.push(...sections.map(s=>({turn_id:turn.turn_id,...s.offsets})));
          }
          return sectionCandidates(data.transcript,ranges);
        }finally{frame.remove();}
      },data).catch(error=>{fs.mkdirSync('.runtime/debug',{recursive:true});fs.writeFileSync('.runtime/debug/section-registry-failure.json',JSON.stringify({id:document.id,...data}));throw Error(`${document.id}: ${error.message}`);});
      if(!candidates.length)throw Error(`No sections in conversation ${document.id}`);
      seeds.push(`select public.register_conversation_sections('${document.id}','${JSON.stringify(candidates).replaceAll("'","''")}'::jsonb);`);
      count+=candidates.length;
      cache[document.id]={sql:seeds.at(-1),count:candidates.length};
      fs.mkdirSync('.runtime/debug',{recursive:true});fs.writeFileSync(cachePath,JSON.stringify(cache));
      console.log(JSON.stringify({conversation:document.id,sections:candidates.length,prepared:true}));
    }
    if(args.includes('--dry-run'))console.log(JSON.stringify({result:'dry_run',conversations:documents.length,sections:count}));
    else {
      const normalize=`
update public.assignments set annotations=public.store_section_annotations(conversation_id,annotations),revision=revision+1,updated_at=now()
 where is_active and task_type='label' and exists(select 1 from jsonb_array_elements(annotations) a where a->'entry' ? 'category');
alter table public.llm_baselines disable trigger preserve_llm_baseline;
update public.llm_baselines set annotations=public.store_section_annotations(conversation_id,annotations)
 where exists(select 1 from jsonb_array_elements(annotations) a where a->'entry' ? 'category');
alter table public.llm_baselines enable trigger preserve_llm_baseline;`;
      const snapshot=JSON.parse(fs.readFileSync('src/generated/rubric.json','utf8'));
      const registration=`insert into public.rubric_versions(hash,snapshot) values('${snapshot.rubric_sha256}','${JSON.stringify(snapshot).replaceAll("'","''")}'::jsonb) on conflict(hash) do nothing;`;
      const sql=fs.readFileSync('supabase/migrations/202610260002_persistent_sections.sql','utf8').replace('-- __SECTION_REGISTRY_BACKFILL__',registration+seeds.join('\n')+normalize);
      await request('database/migrations',{query:sql,name:prefix+crypto.createHash('sha256').update(sql).digest('hex').slice(0,16)});
      console.log(JSON.stringify({result:'applied',project,conversations:documents.length,sections:count}));
    }
  }
}catch(error){console.error(error.message);process.exitCode=1;}finally{await browser?.close();}
