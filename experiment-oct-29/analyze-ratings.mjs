import fsp from 'node:fs/promises';
import path from 'node:path';
import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment,runRoot,root,languages,models,selectedTopics} from './config.mjs';
import {validateMarkerFreeRatings} from './marker-free-rating-core.mjs';
import {compareLanguages} from './rating-language-stats.mjs';

if(process.argv.length!==2)throw Error('Run without arguments to generate the rating-language report');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local Supabase required');
const progress=JSON.parse(await fsp.readFile(path.join(runRoot,'marker-free-ratings','batch-v4-progress.json'),'utf8'));
if(progress.completed!==882||progress.failed||progress.pending||progress.prompt_version!=='marker-free-turn-ratings/4')throw Error('Version 4 original ratings are incomplete');
const dimensions=JSON.parse(await fsp.readFile(path.join(root,'annotation-portal/src/generated/rating-questions.json'),'utf8'));
const manifest=JSON.parse(await fsp.readFile(path.join(runRoot,'manifest.json'),'utf8'));
const attempts=new Map(manifest.items.map(item=>[item.id,item.attempt]));
const catalog=JSON.parse(await fsp.readFile(path.join(runRoot,'topics.json'),'utf8'));
const topicNames=Object.fromEntries(catalog.map(topic=>[topic['topic-id'],topic.en.title]));
const languageNames={en:'English',ta:'Tamil',th:'Thai',zh:'Chinese',hi:'Hindi',bn:'Bengali',kn:'Kannada'};
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
let rows;
try{
 rows=(await db.query(`select c.id,c.topic_id,c.language,c.transcript->>'provider' as model,r.ratings,r.rubric_hash
 from public.conversation_version_rating_runs r join public.conversations c on c.id=r.conversation_id
 where r.prompt_version='marker-free-turn-ratings/4' and r.status='completed' and c.source_conversation_id is null`)).rows;
}finally{await db.end();}
if(rows.length!==882||rows.some(row=>row.rubric_hash!==progress.rubric_hash||!models.includes(row.model)||!languages.includes(row.language)||!selectedTopics.includes(row.topic_id)))throw Error('Rating inventory or rubric hash mismatch');
const cells=new Map();const samples=[],conversationSummaries=[];
for(const row of rows){
 const cell=[row.model,row.topic_id,row.language].join('|');cells.set(cell,(cells.get(cell)||0)+1);
 const transcript={messages:row.ratings.map(rating=>({speaker:'tutor',turn_id:rating.turn_id}))};
 validateMarkerFreeRatings({ratings:row.ratings},transcript,dimensions);
 const conversationSummary={conversation_id:row.id,model:row.model,topic:row.topic_id,language:row.language,try:attempts.get(row.id)};
 if(!conversationSummary.try)throw Error(`Missing attempt for ${row.id}`);
 for(const dimension of dimensions){
  const values=row.ratings.flatMap(rating=>rating.values[dimension.key]?[rating.values[dimension.key].score]:[]);
  const numeric=values.filter(Number.isFinite);
  const score=numeric.length?numeric.reduce((sum,value)=>sum+value,0)/numeric.length:null;
  conversationSummary[dimension.key]=score;
  conversationSummary[`${dimension.key}_na_turns`]=values.length-numeric.length;
  samples.push({model:row.model,topic:row.topic_id,language:row.language,key:dimension.key,score,na_turns:values.length-numeric.length,applicable_turns:values.length});
 }
 conversationSummaries.push(conversationSummary);
}
if(models.some(model=>selectedTopics.some(topic=>languages.some(language=>cells.get([model,topic,language].join('|'))!==3))))throw Error('Expected exactly three original tries in every model/topic/language cell');
const resamples=9999,results={};
for(const model of models){
 results[model]={};
 for(const dimension of dimensions){
  const subset=samples.filter(sample=>sample.model===model&&sample.key===dimension.key);
  const comparison=compareLanguages(subset,selectedTopics,languages,{resamples,seed:`${model}:${dimension.key}`});
  comparison.na_turns=Object.fromEntries(languages.map(language=>[language,subset.filter(sample=>sample.language===language).reduce((sum,sample)=>sum+sample.na_turns,0)]));
  results[model][dimension.key]=comparison;
 }
 console.log(JSON.stringify({model,omnibus_significant:dimensions.filter(dimension=>results[model][dimension.key].omnibus.p<.05).length,pairwise_significant:dimensions.reduce((sum,dimension)=>sum+results[model][dimension.key].pairs.filter(pair=>pair.significant).length,0)}));
}
const report={format_version:'rating-language-comparison/1',source:'local marker-free-v1 original conversations',prompt_version:progress.prompt_version,rubric_hash:progress.rubric_hash,evaluator_model:'gemini-3.8-flash',generated_at:new Date().toISOString(),conversations:882,tries_per_cell:3,resamples,models,languages,language_names:languageNames,topics:selectedTopics,topic_names:topicNames,dimensions:dimensions.map(({key,label,first_only,subsequent_only})=>({key,label,first_only,subsequent_only})),results};
const out=path.join(runRoot,'reports');await fsp.mkdir(out,{recursive:true});
await fsp.writeFile(path.join(out,'rating-language-comparison.json'),JSON.stringify(report,null,2)+'\n');
const columns=['conversation_id','model','topic','language','try',...dimensions.flatMap(dimension=>[dimension.key,`${dimension.key}_na_turns`])];
const csvCell=value=>value==null?'':`"${String(value).replaceAll('"','""')}"`;
await fsp.writeFile(path.join(out,'rating-language-conversation-scores.csv'),columns.join(',')+'\n'+conversationSummaries.sort((a,b)=>a.model.localeCompare(b.model)||a.topic.localeCompare(b.topic)||a.language.localeCompare(b.language)||a.try-b.try).map(row=>columns.map(column=>csvCell(row[column])).join(',')).join('\n')+'\n');
const data=JSON.stringify(report).replaceAll('<','\\u003c');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ratings by language within model</title><style>
:root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#18332b;background:#f5f7f4}*{box-sizing:border-box}body{margin:0}main{max-width:1500px;margin:auto;padding:30px 24px 70px}h1{font-size:29px;margin:0 0 8px}h2{font-size:20px;margin:0 0 14px}p{line-height:1.55;color:#465a50}header{margin-bottom:24px}.eyebrow{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5c7368;font-weight:700}.meta{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0}.pill{background:#e5efe8;border:1px solid #c9dccc;border-radius:999px;padding:6px 11px;font-size:12px}.card{background:#fff;border:1px solid #d8e4da;border-radius:12px;padding:22px;margin:18px 0;box-shadow:0 2px 10px #17392a0a}.controls{display:flex;gap:18px;flex-wrap:wrap;align-items:end}.controls label{display:grid;gap:5px;font-size:12px;font-weight:700}.controls select{min-width:270px;padding:9px;border:1px solid #b9cbc0;border-radius:7px;background:#fff;color:#18332b}.table-wrap{overflow:auto;max-height:70vh;border:1px solid #e0e8e1;border-radius:8px}table{border-collapse:separate;border-spacing:0;width:100%;font-size:13px}th,td{padding:10px 12px;border-bottom:1px solid #e5ebe5;text-align:left;white-space:nowrap;background:#fff}thead th{position:sticky;top:0;background:#e9f1eb;z-index:3}tbody th{position:sticky;left:0;z-index:2;white-space:normal;min-width:255px}thead th:first-child{left:0;z-index:4}tbody tr:hover td,tbody tr:hover th{background:#f6faf7}.selected-row td,.selected-row th{background:#e7f4eb!important}.number{text-align:right;font-variant-numeric:tabular-nums}.sig{color:#11653f;font-weight:700}.muted{color:#687a70}.warning{color:#8d501b}.mini{display:block;font-size:11px;color:#687a70;font-weight:400}.summary-row{display:flex;gap:12px;flex-wrap:wrap}.metric{background:#f1f7f2;border-radius:8px;padding:10px 14px;min-width:150px}.metric strong{display:block;font-size:19px}.metric span{font-size:11px;color:#52685b}.note{font-size:12px}.empty{padding:12px;color:#637468}button.row-button{border:0;background:none;color:#194f39;text-align:left;cursor:pointer;font:inherit;font-weight:600;padding:0}button.row-button:hover{text-decoration:underline}@media(max-width:700px){main{padding:18px 12px}.card{padding:14px}.controls select{min-width:220px}}
</style></head><body><main><header><div class="eyebrow">October 29 experiment · Original conversations</div><h1>Ratings by language within each model</h1><p>Seven languages, seven tutor models, six topics, and three tries per model–topic–language cell. Scores are from the saved five-point Gemini 3.8 Flash rating run.</p><div class="meta"><span class="pill">882 conversations</span><span class="pill">2,646 tutor turns</span><span class="pill">9 rating questions</span><span class="pill">Version 4 rubric</span></div></header>
<section class="card"><div class="controls"><label>Model<select id="model"></select></label><label>Rating question<select id="dimension"></select></label></div><p class="note">Each cell is the mean of conversation-level scores ± sample SD; n is the number of conversations with an applicable score. Shared questions average three tutor turns per conversation; introduction uses turn 1 and follow-up uses turns 2–3. N/A scores are excluded. <a href="rating-language-conversation-scores.csv" download>Download conversation scores (CSV)</a> · <a href="rating-language-comparison.json" download>Download analysis (JSON)</a></p><div class="summary-row" id="metrics"></div></section>
<section class="card"><h2>All rating questions</h2><div class="table-wrap"><table id="overview"><thead></thead><tbody></tbody></table></div><p class="note">Overall p is a within-topic permutation test of a difference among seven languages (9,999 resamples). It is unadjusted across rating questions and models; treat these findings as exploratory.</p></section>
<section class="card"><h2 id="detail-title"></h2><div class="table-wrap"><table id="detail"><thead></thead><tbody></tbody></table></div><p class="note" id="detail-note"></p></section>
<section class="card"><h2>Pairwise language comparisons</h2><p class="note">Shown after an overall p &lt; .05. Each difference is right minus left, averaged equally across included topics. Pairwise p-values use within-topic permutation tests; Holm adjustment covers the 21 language pairs within this model and rating question.</p><div class="table-wrap"><table id="pairs"><thead></thead><tbody></tbody></table></div><div class="empty" id="pairs-empty"></div></section>
<section class="card"><h2>Topic-level means</h2><div class="table-wrap"><table id="topics"><thead></thead><tbody></tbody></table></div></section>
<section class="card"><h2>How to read this</h2><p>One conversation is the analysis unit. Three tutor turns from the same conversation are averaged before comparison; tries from different languages are independent, not matched pairs. Permutations exchange whole-conversation scores only within the same topic. Topics with no applicable score in any language are omitted from that question’s test; the table shows how many topics were included.</p><p>Scores are ordinal judgments, so means summarize the scale rather than prove equal distances between categories. N/A rates and sample sizes can differ. All ratings came from one Gemini evaluator, and English/Tamil originals were generated in an earlier batch than the other languages. These comparisons describe this dataset and should not be read as causal language effects.</p></section>
</main><script id="report-data" type="application/json">${data}</script><script>
const R=JSON.parse(document.getElementById('report-data').textContent),$=id=>document.getElementById(id),name=l=>R.language_names[l],fmt=x=>x==null?'—':x.toFixed(2),pFmt=x=>x==null?'—':x<.0001?'<0.0001':x.toFixed(4),cell=s=>s.n?fmt(s.mean)+' ± '+fmt(s.sd)+' (n='+s.n+')':'—';let model=R.models[0],dimension=R.dimensions[0].key;
function table(id,headers,rows){const element=$(id);element.tHead.innerHTML='<tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'</tr>';element.tBodies[0].innerHTML=rows.join('');}
function esc(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function render(){const r=R.results[model][dimension],d=R.dimensions.find(item=>item.key===dimension);$('model').value=model;$('dimension').value=dimension;
 $('metrics').innerHTML='<div class="metric"><strong>'+r.topics_in_test+' / 6</strong><span>Topics in overall test</span></div><div class="metric"><strong>'+pFmt(r.omnibus.p)+'</strong><span>Overall p (unadjusted)</span></div><div class="metric"><strong>'+r.pairs.filter(x=>x.significant).length+'</strong><span>Holm-significant pairs</span></div>';
 table('overview',['Rating question',...R.languages.map(name),'Overall p','Topics'],R.dimensions.map(item=>{const x=R.results[model][item.key];return '<tr class="'+(item.key===dimension?'selected-row':'')+'"><th><button class="row-button" data-key="'+item.key+'">'+esc(item.label)+'</button></th>'+R.languages.map(l=>'<td class="number">'+cell(x.summaries[l])+'</td>').join('')+'<td class="number '+(x.omnibus.p<.05?'sig':'')+'">'+pFmt(x.omnibus.p)+'</td><td class="number">'+x.topics_in_test+'</td></tr>'}));
 $('detail-title').textContent=d.label;table('detail',['Language','Mean','SD','Median','Applicable conversations','N/A turns'],R.languages.map(l=>{const x=r.summaries[l];return '<tr><th>'+name(l)+'</th><td class="number">'+fmt(x.mean)+'</td><td class="number">'+fmt(x.sd)+'</td><td class="number">'+fmt(x.median)+'</td><td class="number">'+x.n+' / 18</td><td class="number">'+r.na_turns[l]+'</td></tr>'}));
 $('detail-note').textContent='Overall language test: p = '+pFmt(r.omnibus.p)+'; '+r.topics_in_test+' topics included. '+(r.omnibus.p<.05?'An overall difference was detected.':'No overall difference was detected at .05.');
 table('pairs',['Left language','Right language','Difference','Raw p','Holm p','Result'],r.pairs.slice().sort((a,b)=>a.adjusted_p-b.adjusted_p).map(x=>'<tr><th>'+name(x.left)+'</th><td>'+name(x.right)+'</td><td class="number">'+(x.difference>0?'+':'')+fmt(x.difference)+'</td><td class="number">'+pFmt(x.p)+'</td><td class="number '+(x.significant?'sig':'')+'">'+pFmt(x.adjusted_p)+'</td><td class="'+(x.significant?'sig':'muted')+'">'+(x.significant?'Significant':'Not detected')+'</td></tr>'));
 $('pairs-empty').textContent=r.pairs.length?'':'No pairwise tests: the overall test did not detect a difference at .05.';
 table('topics',['Topic',...R.languages.map(name)],R.topics.map(topic=>'<tr><th>'+esc(R.topic_names[topic])+'</th>'+R.languages.map(l=>'<td class="number">'+cell(r.topic_means[topic][l])+'</td>').join('')+'</tr>'));
 document.querySelectorAll('[data-key]').forEach(button=>button.addEventListener('click',()=>{dimension=button.dataset.key;render();}));
}
R.models.forEach(value=>$('model').add(new Option(value,value)));R.dimensions.forEach(item=>$('dimension').add(new Option(item.label,item.key)));$('model').addEventListener('change',event=>{model=event.target.value;render();});$('dimension').addEventListener('change',event=>{dimension=event.target.value;render();});render();
</script></body></html>`;
await fsp.writeFile(path.join(out,'rating-language-comparison.html'),html);
console.log(JSON.stringify({report:path.join(out,'rating-language-comparison.html'),json:path.join(out,'rating-language-comparison.json'),models:models.length,dimensions:dimensions.length,conversations:rows.length}));
