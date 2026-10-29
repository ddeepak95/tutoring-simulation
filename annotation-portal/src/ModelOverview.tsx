import {useEffect,useMemo,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {fetchStatisticsData,generationConditions,type StatisticsData} from './language-statistics-data';
import {modelLanguageOverview,modelOverview,modelOverviewOptions} from './model-overview';
import {languageName} from './languages';
import type {StatisticalReport} from './language-statistics';

const number=(n:number|null)=>n===null?'—':new Intl.NumberFormat('en',{maximumFractionDigits:2}).format(n);
const probability=(p:number|null)=>p===null?'—':p<.0001?'< 0.0001':p.toFixed(4);
export function ModelOverview({compareLanguages=false}:{compareLanguages?:boolean}){
 const [params]=useSearchParams();
 const [data,setData]=useState<StatisticsData|null>(null),[error,setError]=useState(''),[refresh,setRefresh]=useState(0);
 const [promptKey,setPrompt]=useState(''),[language,setLanguage]=useState('en'),[cohortKey,setCohort]=useState('');
 const [rightLanguage,setRightLanguage]=useState('ta');
 const [models,setModels]=useState<string[]|null>(null),[conditions,setConditions]=useState<Record<string,string>>({});
 const [topics,setTopics]=useState<string[]|null>(()=>params.get('topic')?[params.get('topic')!]:null);
 useEffect(()=>{let alive=true;setData(null);setError('');void fetchStatisticsData().then(d=>{if(alive)setData(d);}).catch(e=>{if(alive)setError(e.message||'Could not load evaluations.');});return()=>{alive=false;};},[refresh]);
 const selection=useMemo(()=>{
  if(!data)return null;
  const providers=[...new Set(data.documents.map(d=>d.transcript.provider||'Unknown provider'))];
  const prompts=[...new Map(providers.flatMap(p=>generationConditions(data.documents,p)).sort((a,b)=>b.latest.localeCompare(a.latest)).map(c=>[c.prompt,c.prompt])).values()];
  const prompt=prompts.includes(promptKey)?promptKey:prompts[0];
  const available=modelOverviewOptions(data,prompt,conditions),selected=available.filter(o=>models===null||models.includes(o.model));
  const ids=new Set(selected.flatMap(o=>[...o.condition.ids]));
  const cohorts=data.cohorts.filter(c=>c.baselines.some(b=>ids.has(b.conversation_id)));
  const cohort=cohorts.find(c=>c.key===cohortKey)||cohorts[0];
  const languages=[...new Set(data.documents.filter(d=>ids.has(d.id)).map(d=>d.language))].sort();
  const chosenLanguage=languages.includes(language)?language:languages[0]||language;
  const right=languages.includes(rightLanguage)&&rightLanguage!==chosenLanguage?rightLanguage:languages.find(l=>l!==chosenLanguage)||'';
  return {prompts,prompt,available,selected,cohorts,cohort,languages,language:chosenLanguage,rightLanguage:right,report:cohort?modelOverview(data,selected,chosenLanguage,cohort,topics):null,languageReport:compareLanguages&&cohort?modelLanguageOverview(data,selected,chosenLanguage,right,cohort,topics):null};
 },[data,promptKey,models,conditions,cohortKey,language,rightLanguage,topics,compareLanguages]);
 const inputs=selection?.languageReport?.inputs;
 const [analysis,setAnalysis]=useState<{inputs:typeof inputs;reports:{model:string;report:StatisticalReport}[]}|null>(null),[analysisError,setAnalysisError]=useState('');
 useEffect(()=>{
  setAnalysis(null);setAnalysisError('');if(!inputs?.length||!inputs[0].input.topics.length)return;
  let worker:Worker;
  try{worker=new Worker(new URL('./model-language-statistics.worker.ts',import.meta.url),{type:'module'});}
  catch{setAnalysisError('Could not start the statistics worker. Reload and try again.');return;}
  worker.onmessage=event=>{if(event.data.error)setAnalysisError(event.data.error);else setAnalysis({inputs,reports:event.data.reports});};
  worker.onerror=()=>setAnalysisError('Statistical analysis failed. Reload and try again.');worker.postMessage(inputs);
  return()=>worker.terminate();
 },[inputs]);
 const analyses=analysis?.inputs===inputs?analysis?.reports:null;
 function download(){
  if(!selection?.report||!selection.cohort)return;
  const payload=compareLanguages?{analysis_version:'languages-across-models/1',system_prompt:selection.prompt,left_language:selection.language,right_language:selection.rightLanguage,conversation_version:'original',evaluation_cohort:selection.cohort.key,alpha:.05,correction:'none',resamples:19999,coverage:selection.languageReport?.coverage,conditions:selection.selected.map(o=>({model:o.model,condition:o.condition.key})),inputs,reports:analyses?.map(({model,report})=>({model,report:{...report,views:report.views.map(v=>({...v,rows:v.rows.map(({adjustedP,...row})=>row)}))}}))}:{analysis_version:'model-overview/1',system_prompt:selection.prompt,language:selection.language,conversation_version:'original',evaluation_cohort:selection.cohort.key,report:selection.report};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download=compareLanguages?'languages-across-models.json':'model-feature-overview.json';a.click();URL.revokeObjectURL(url);
 }
 const report=selection?.report;
 const coverage=compareLanguages?selection?.languageReport?.coverage:report?.coverage;
 const leftName=languageName(selection?.language||'en'),rightName=languageName(selection?.rightLanguage||'ta');
 return <main className="dashboard language-statistics">
  <nav className="conversation-breadcrumbs" aria-label="Conversation navigation"><Link to="/">All topics</Link><span aria-hidden="true">/</span><span>Model statistics</span></nav>
  <div className="page-heading"><div><span className="eyebrow">LABEL ANALYSIS</span><h1>{compareLanguages?'Compare languages across all models':'Compare all models'}</h1><p>{compareLanguages?'Compare two original languages within each model, using the same topics.':'Compare feature counts per conversation for one language across the same topics.'}</p></div><div className="actions"><button className="secondary" onClick={()=>setRefresh(n=>n+1)}>Refresh data</button><button disabled={compareLanguages?!analyses:!report?.topics.length} onClick={download}>Export overview</button></div></div>
  {error?<p role="alert" className="card error">{error}</p>:!selection?<p role="status">Loading model comparison data…</p>:!selection.available.length?<p role="status">No conversations are available for comparison.</p>:<>
   <section className="card statistics-controls" aria-label="Model overview settings">
    <label>Tutor system prompt<select aria-label="Tutor system prompt" value={selection.prompt} onChange={e=>{setPrompt(e.target.value);setModels(null);setConditions({});setCohort('');}}>{selection.prompts.map(p=><option key={p} value={p}>{p}</option>)}</select></label>
    <label>{compareLanguages?'Left original language':'Original language'}<select aria-label={compareLanguages?'Left original language':'Original language'} value={selection.language} onChange={e=>setLanguage(e.target.value)}>{selection.languages.map(l=><option key={l} value={l}>{languageName(l)}</option>)}</select></label>
    {compareLanguages&&<label>Right original language<select aria-label="Right original language" value={selection.rightLanguage} onChange={e=>setRightLanguage(e.target.value)}>{selection.languages.filter(l=>l!==selection.language).map(l=><option key={l} value={l}>{languageName(l)}</option>)}</select></label>}
    <fieldset className="statistics-topics"><legend>Models</legend>{selection.available.map(o=><label key={o.model}><input type="checkbox" checked={selection.selected.some(s=>s.model===o.model)} onChange={e=>setModels(e.target.checked?[...selection.selected.map(s=>s.model),o.model]:selection.selected.filter(s=>s.model!==o.model).map(s=>s.model))}/>{o.model}</label>)}</fieldset>
    <details><summary>Generation settings by model</summary><p>The same tutor prompt is used for every column. Each model uses its selected recorded generation condition.</p>{selection.selected.map(o=><label className="model-condition" key={o.model}>{o.model}<select aria-label={`${o.model} generation condition`} value={o.condition.key} onChange={e=>setConditions(c=>({...c,[o.model]:e.target.value}))}>{o.conditions.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select><pre className="statistics-prompt">{o.condition.key}</pre></label>)}</details>
    <label>Saved LLM evaluation<select aria-label="Saved LLM evaluation" value={selection.cohort?.key||''} onChange={e=>setCohort(e.target.value)}>{selection.cohorts.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select></label>
    {coverage&&<fieldset className="statistics-topics"><legend>Topics</legend>{coverage.map(t=><label key={t.key}><input type="checkbox" checked={t.selected} onChange={e=>setTopics(e.target.checked?[...coverage.filter(t=>t.selected).map(t=>t.key),t.key]:coverage.filter(t=>t.selected&&t.key!==e.target.value).map(t=>t.key))} value={t.key}/>{t.name}</label>)}</fieldset>}
   </section>
   {selection.selected.length<(compareLanguages?1:2)?<p role="status">{compareLanguages?'Select at least one model.':'Select at least two models.'}</p>:compareLanguages&&!selection.rightLanguage?<p role="status">Two original languages are required.</p>:!report?<p role="status">No compatible section-based evaluations are saved for these models.</p>:compareLanguages&&selection.languageReport?<section className="card statistics-results" aria-label="Language comparisons across models">
    <p>{leftName} versus {rightName}, within each model. Each cell shows mean ± sample SD and the topic-adjusted difference ({rightName} − {leftName}). Counts are summed across sections per conversation.</p>
    <p>Only selected topics with at least two valid evaluations in both languages for every selected model are included. Completed evaluations without a feature count as zero; missing or invalid evaluations are excluded.</p>
    <details><summary>Topic coverage ({selection.languageReport.topics.length} included)</summary><ul>{selection.languageReport.coverage.filter(t=>t.selected).map(t=><li key={t.key}>{t.name}: {t.counts.map(c=>`${c.model} / ${languageName(c.language)} n = ${c.n}`).join('; ')}. {t.included?'Included':'Excluded: fewer than two evaluations for at least one model/language.'}</li>)}</ul></details>
    {!selection.languageReport.topics.length?<p role="status">No shared topics have enough evaluated conversations in both languages. Select fewer models, other languages, or another evaluation.</p>:analysisError?<p role="alert" className="error">{analysisError}</p>:!analyses?<p role="status">Calculating language comparisons for all models…</p>:<div className="table-wrap"><table aria-label="Language feature comparisons across models"><thead><tr><th scope="col">Feature</th>{analyses.map(a=>{const r=a.report.views[0].rows[0];return <th scope="col" key={a.model}>{a.model}<small>{leftName} n = {r?.left.n||0} · {rightName} n = {r?.right.n||0}</small></th>;})}</tr></thead><tbody>{selection.cohort!.rubric.rubric.map(f=><tr key={f.key}><th scope="row">{f.name}</th>{analyses.map(a=>{const r=a.report.views[0].rows.find(r=>r.key===f.key)!;return <td className="model-language-cell" key={a.model}><div>{leftName}: {number(r.left.mean)} ± {number(r.left.sd)}</div><div>{rightName}: {number(r.right.mean)} ± {number(r.right.sd)}</div><small>Difference: {number(r.difference)} · p: {probability(r.p)}</small><span className={r.p!==null&&r.p<.05?'model-language-significant':undefined}>{r.p===null?'Unavailable':r.p<.05?`${r.difference!>0?rightName:leftName} higher`:'Not detected'}</span></td>;})}</tr>)}</tbody></table></div>}
    <p className="occurrence-help">Two-sided permutation tests exchange language labels within topics, separately for each model. Topic-adjusted differences give each included topic equal weight; descriptive means and SD pool conversations. Independent conversation tries are not paired.</p>
    <p className="occurrence-help">Results use unadjusted p &lt; 0.05, without correction for multiple comparisons. These are exploratory comparisons of raw counts; longer conversations can contain more features. “Not detected” does not establish equality.</p>
   </section>:<section className="card statistics-results" aria-label="All model feature counts">
    <p>Original {languageName(selection.language)} conversations. Each cell shows mean ± sample SD. Counts are summed across sections per conversation.</p>
    <p>Only selected topics with at least two valid evaluations for every selected model are included. A completed evaluation without a feature counts as zero; missing or invalid evaluations are excluded.</p>
    <details><summary>Topic coverage ({report.topics.length} included)</summary><ul>{report.coverage.filter(t=>t.selected).map(t=><li key={t.key}>{t.name}: {t.counts.map(c=>`${c.model} n = ${c.n}`).join('; ')}. {t.included?'Included':'Excluded: fewer than two evaluations for at least one model.'}</li>)}</ul></details>
    {report.topics.length?<div className="table-wrap"><table aria-label="Feature counts across models"><thead><tr><th scope="col">Feature</th>{report.columns.map(c=><th scope="col" key={c.model}>{c.model}<small>n = {c.samples.length} · Mean ± SD</small></th>)}</tr></thead><tbody>{report.rows.map(r=><tr key={r.key}><th scope="row">{r.name}</th>{r.cells.map((c,i)=><td key={report.columns[i].model}>{number(c.mean)} ± {number(c.sd)}</td>)}</tr>)}</tbody></table></div>:<p role="status">No shared topics have enough evaluated conversations. Select fewer models, another language, or another evaluation.</p>}
    <p className="occurrence-help">Means and SD pool conversations across included topics. These are descriptive comparisons; use Pairwise models for topic-adjusted significance tests.</p>
   </section>}
  </>}
 </main>;
}
