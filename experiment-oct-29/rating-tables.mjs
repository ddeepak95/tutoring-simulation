import {summary} from './rating-language-stats.mjs';

export function combinedRatingScore(scores){
 const values=Object.values(scores).filter(Number.isFinite);
 return values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;
}

export function parseCsv(text){
 const rows=[];let row=[],field='',quoted=false;
 for(let index=0;index<text.length;index++){
  const char=text[index];
  if(char==='"'){
   if(quoted&&text[index+1]==='"'){field+='"';index++;}else quoted=!quoted;
  }else if(!quoted&&(char===','||char==='\n')){
   row.push(field);field='';if(char==='\n'){if(row.some(value=>value!==''))rows.push(row);row=[];}
  }else if(char!=='\r'||quoted)field+=char;
 }
 if(quoted)throw Error('Unclosed CSV quote');
 if(field!==''||row.length){row.push(field);rows.push(row);}
 const [columns,...records]=rows;
 if(!columns?.length||new Set(columns).size!==columns.length)throw Error('Invalid CSV columns');
 return records.map(values=>{
  if(values.length!==columns.length)throw Error('CSV column count mismatch');
  return Object.fromEntries(columns.map((column,index)=>[column,values[index]]));
 });
}

export function buildRatingTables(source,csv){
 if(source.conversations!==882||source.prompt_version!=='marker-free-turn-ratings/4')throw Error('Expected original version 4 ratings');
 const conversations=parseCsv(csv).map(row=>{
  if(!source.models.includes(row.model)||!source.languages.includes(row.language)||!source.topics.includes(row.topic)||![1,2,3].includes(Number(row.try)))throw Error('Unexpected conversation metadata');
  const scores={},naTurns={};
  for(const dimension of source.dimensions){
   const raw=row[dimension.key];
   if(raw===undefined)throw Error('Missing rating column');
   const score=raw===''?null:Number(raw),na=Number(row[`${dimension.key}_na_turns`]);
   const turns=dimension.first_only?1:dimension.subsequent_only?2:3;
   if(score!==null&&(!Number.isFinite(score)||score<1||score>5)||!Number.isInteger(na)||na<0||na>turns||(score===null)!==(na===turns))throw Error('Invalid conversation rating');
   scores[dimension.key]=score;naTurns[dimension.key]=na;
  }
  return {id:row.conversation_id,model:row.model,language:row.language,topic:row.topic,try:Number(row.try),scores,na_turns:naTurns,combined_score:combinedRatingScore(scores)};
 });
 if(conversations.length!==882||new Set(conversations.map(row=>row.id)).size!==882)throw Error('Expected 882 unique conversation rows');
 const cells=new Map();for(const row of conversations){const key=[row.model,row.language,row.topic].join('|');cells.set(key,(cells.get(key)||0)+1);}
 if(source.models.some(model=>source.languages.some(language=>source.topics.some(topic=>cells.get([model,language,topic].join('|'))!==3))))throw Error('Incomplete model/language/topic cells');
 const summaries=['all',...source.languages].flatMap(language=>source.models.map(model=>({
  model,language,combined:summary(conversations.filter(row=>row.model===model&&(language==='all'||row.language===language)).map(row=>row.combined_score).filter(Number.isFinite)),scores:Object.fromEntries(source.dimensions.map(dimension=>{
   const result=source.results[language][dimension.key];
   return [dimension.key,{...result.summaries[model],na_turns:result.na_turns[model]}];
  })),
 })));
 // Reconcile every summary with the underlying conversation snapshot.
 for(const row of summaries)for(const dimension of source.dimensions){
  const matching=conversations.filter(item=>item.model===row.model&&(row.language==='all'||item.language===row.language));
  const values=matching.map(item=>item.scores[dimension.key]).filter(Number.isFinite),summary=row.scores[dimension.key];
  const average=values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;
  if(values.length!==summary.n||(average===null)!==(summary.mean===null)||average!==null&&Math.abs(average-summary.mean)>1e-10||matching.reduce((sum,item)=>sum+item.na_turns[dimension.key],0)!==summary.na_turns)throw Error('Summary and conversation scores differ');
 }
 return {format_version:'all-rating-tables/2',prompt_version:source.prompt_version,rubric_hash:source.rubric_hash,
  models:source.models,languages:source.languages,language_names:source.language_names,topics:source.topics,topic_names:source.topic_names,
  dimensions:source.dimensions,summaries,conversations};
}

export function renderRatingTables(data){
 const embedded=JSON.stringify(data).replaceAll('<','\\u003c');
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>All rating scores</title><style>
*{box-sizing:border-box}body{margin:0;background:#f4f7f3;color:#19372b;font:14px/1.5 system-ui,sans-serif}main{max-width:1700px;margin:auto;padding:26px 22px 55px}h1{font-size:29px;margin:0 0 8px}p{color:#52675a}.card{background:#fff;border:1px solid #d9e4da;border-radius:12px;padding:20px;margin:20px 0}.tabs,.controls,.pagination{display:flex;gap:12px;align-items:center;flex-wrap:wrap}button,select{font:inherit;border:1px solid #afc8b7;border-radius:7px;padding:8px 12px;background:#fff;color:#245239}button{cursor:pointer}button[aria-pressed=true]{background:#235b3f;color:#fff}button:disabled{opacity:.5;cursor:default}label{display:grid;gap:4px;font-size:12px;font-weight:600}select{max-width:260px}.controls{align-items:end;margin:18px 0}.hidden{display:none!important}.note{font-size:12px}.table-wrap{max-height:70vh;overflow:auto;border:1px solid #dce6dd;border-radius:8px}table{width:100%;border-spacing:0;font-size:12px}th,td{padding:11px;border-bottom:1px solid #e4ece5;white-space:nowrap;text-align:left;background:#fff}thead th{position:sticky;top:0;background:#e9f2eb;z-index:3;min-width:145px;max-width:210px;white-space:normal}thead th:first-child{left:0;z-index:4}tbody th{position:sticky;left:0;z-index:2;min-width:165px;white-space:normal}tbody tr:hover>*{background:#f2f8f2}.num{text-align:right;font-variant-numeric:tabular-nums}.mini{display:block;font-size:10px;color:#68806d}.sort{padding:0;border:0;background:none;border-radius:0;text-align:left;font-size:12px;font-weight:700}.pagination{justify-content:flex-end;margin-top:14px}a{color:#236346}.empty{text-align:center;padding:30px}@media(max-width:700px){main{padding:16px 10px}.card{padding:13px}}
</style></head><body><main><h1>All rating scores</h1><p>882 original conversations · Version 4 rating rubric · Nine rating questions. <a href="rating-model-comparison.html">Model comparisons and significance</a> · <a href="rating-language-comparison.html">Language comparisons and significance</a></p>
<p class="note"><a href="combined-rating-comparison.html">Test combined-score differences between languages and models</a></p>
<section class="card"><div class="tabs" aria-label="Table view"><button id="summary-tab" type="button" aria-pressed="true">Model × language</button><button id="conversation-tab" type="button" aria-pressed="false">Conversations</button></div>
<div class="controls"><label>Model<select id="model"></select></label><label>Language<select id="language"></select></label><label id="topic-filter" class="hidden">Topic<select id="topic"></select></label><label id="try-filter" class="hidden">Try<select id="try"></select></label><button id="export" type="button">Download filtered CSV</button></div>
<p id="explanation" class="note"></p><p id="count" role="status"></p><div class="table-wrap"><table id="ratings"><thead></thead><tbody></tbody></table></div><div class="pagination"><button id="previous" type="button">Previous</button><span id="page"></span><button id="next" type="button">Next</button></div>
<p class="note">Each conversation score averages the applicable tutor turns: introduction uses turn 1, follow-up uses turns 2–3, and the other questions use all three turns. N/A values are omitted. Hover a score for its sample size or N/A count; click a score column heading to sort. The comparison reports linked above contain the statistical tests.</p></section>
</main><script id="ratings-data" type="application/json">${embedded}</script><script>
const D=JSON.parse(document.getElementById('ratings-data').textContent),el=id=>document.getElementById(id);
const names={'deepseek/deepseek-v4.1-flash-1017':'DeepSeek','gpt-6.1-terra':'GPT 6.1 Terra','meta/muse-spark-open':'Muse Spark','anthropic/claude-haiku-5.5':'Claude Haiku','x-ai/grok-4.7':'Grok','moonshotai/kimi-k3.1-pro':'Kimi','google/gemini-3.8-flash':'Gemini Flash'};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),fmt=x=>x==null?'N/A':x.toFixed(2),languageName=l=>l==='all'?'All languages pooled':D.language_names[l];
let view='summary',page=0,sortKey=null,descending=true,filtered=[];const pageSize=50;
function options(){const previous=el('language').value;el('language').innerHTML='';el('language').add(new Option('All seven languages',''));if(view==='summary')el('language').add(new Option('All languages pooled','all'));D.languages.forEach(l=>el('language').add(new Option(D.language_names[l],l)));el('language').value=view==='conversation'&&previous==='all'?'':previous;}
function render(){
 const model=el('model').value,language=el('language').value,topic=el('topic').value,attempt=el('try').value;
 filtered=(view==='summary'?D.summaries:D.conversations).filter(row=>(!model||row.model===model)&&(language?row.language===language:row.language!=='all')&&(view==='summary'||(!topic||row.topic===topic)&&(!attempt||row.try===Number(attempt))));
 if(sortKey)filtered=filtered.slice().sort((a,b)=>{const left=sortKey==='combined'?a.combined.mean:view==='summary'?a.scores[sortKey].mean:a.scores[sortKey],right=sortKey==='combined'?b.combined.mean:view==='summary'?b.scores[sortKey].mean:b.scores[sortKey];if(left==null)return right==null?0:1;if(right==null)return -1;return descending?right-left:left-right;});
 const pages=Math.max(1,Math.ceil(filtered.length/pageSize));page=Math.min(page,pages-1);const visible=filtered.slice(page*pageSize,(page+1)*pageSize);
 el('summary-tab').setAttribute('aria-pressed',String(view==='summary'));el('conversation-tab').setAttribute('aria-pressed',String(view==='conversation'));el('topic-filter').classList.toggle('hidden',view==='summary');el('try-filter').classList.toggle('hidden',view==='summary');
 el('explanation').textContent=view==='summary'?'One row per model and language. Cells show mean ± sample SD across conversations. Combined score equally averages the available question scores within each conversation, then summarizes those conversation scores. N/A questions are omitted. Select “All languages pooled” for the seven pooled model rows.':'One row per original conversation. Cells show its average score for each rating question. Open the conversation link to inspect the individual tutor-turn ratings and reasons.';
 el('count').textContent=filtered.length+' '+(view==='summary'?'model–language rows':'conversations');
 const headers=['Model','Language',...(view==='conversation'?['Topic','Try','Conversation']:[])];
 el('ratings').tHead.innerHTML='<tr>'+headers.map(header=>'<th>'+header+'</th>').join('')+(view==='summary'?'<th><button class="sort" data-sort="combined">Combined score'+(sortKey==='combined'?(descending?' ↓':' ↑'):'')+'</button></th>':'')+D.dimensions.map(d=>'<th><button class="sort" data-sort="'+d.key+'">'+esc(d.label)+(sortKey===d.key?(descending?' ↓':' ↑'):'')+'</button></th>').join('')+'</tr>';
 el('ratings').tBodies[0].innerHTML=visible.map(row=>'<tr><th title="'+esc(row.model)+'">'+esc(names[row.model]||row.model)+'</th><td>'+esc(languageName(row.language))+'</td>'+(view==='conversation'?'<td>'+esc(D.topic_names[row.topic])+'</td><td>'+row.try+'</td><td><a href="http://127.0.0.1:5173/conversations/'+row.id+'/rating" target="_blank" rel="noopener">'+esc(row.id.slice(0,8))+'</a></td>':'<td class="num" title="Equal weight per available rating question within each conversation">'+fmt(row.combined.mean)+' ± '+(row.combined.sd==null?'—':fmt(row.combined.sd))+'<span class="mini">n='+row.combined.n+'</span></td>')+D.dimensions.map(d=>{if(view==='summary'){const x=row.scores[d.key];return '<td class="num" title="'+x.n+' applicable conversations; '+x.na_turns+' N/A turn ratings">'+fmt(x.mean)+' ± '+(x.sd==null?'—':fmt(x.sd))+'<span class="mini">n='+x.n+'</span></td>'}return '<td class="num" title="'+row.na_turns[d.key]+' N/A turn ratings">'+fmt(row.scores[d.key])+'</td>'}).join('')+'</tr>').join('')||'<tr><td class="empty" colspan="14">No matching rows</td></tr>';
 el('page').textContent='Page '+(page+1)+' of '+pages;el('previous').disabled=page===0;el('next').disabled=page+1>=pages;
 document.querySelectorAll('[data-sort]').forEach(button=>button.addEventListener('click',()=>{descending=sortKey===button.dataset.sort?!descending:true;sortKey=button.dataset.sort;page=0;render();}));
}
el('model').add(new Option('All models',''));D.models.forEach(m=>el('model').add(new Option(names[m]||m,m)));el('topic').add(new Option('All topics',''));D.topics.forEach(t=>el('topic').add(new Option(D.topic_names[t],t)));el('try').add(new Option('All tries',''));[1,2,3].forEach(n=>el('try').add(new Option(String(n),String(n))));options();
['model','language','topic','try'].forEach(id=>el(id).addEventListener('change',()=>{page=0;render();}));
function switchView(next){view=next;if(view==='conversation'&&sortKey==='combined')sortKey=null;page=0;options();render();}el('summary-tab').addEventListener('click',()=>switchView('summary'));el('conversation-tab').addEventListener('click',()=>switchView('conversation'));el('previous').addEventListener('click',()=>{page--;render();});el('next').addEventListener('click',()=>{page++;render();});
el('export').addEventListener('click',()=>{const columns=['model','language',...(view==='conversation'?['topic','try','conversation_id']:['combined_mean','combined_sd','combined_n']),...D.dimensions.flatMap(d=>view==='summary'?[d.key+'_mean',d.key+'_sd',d.key+'_n',d.key+'_na_turns']:[d.key,d.key+'_na_turns'])];const quote=x=>x==null?'':'"'+String(x).replaceAll('"','""')+'"';const rows=filtered.map(row=>[row.model,row.language,...(view==='conversation'?[row.topic,row.try,row.id]:[row.combined.mean,row.combined.sd,row.combined.n]),...D.dimensions.flatMap(d=>view==='summary'?[row.scores[d.key].mean,row.scores[d.key].sd,row.scores[d.key].n,row.scores[d.key].na_turns]:[row.scores[d.key],row.na_turns[d.key]])]);const csv=[columns,...rows].map(row=>row.map(quote).join(',')).join('\\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download='ratings-'+view+'.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});render();
</script></body></html>`;
}
