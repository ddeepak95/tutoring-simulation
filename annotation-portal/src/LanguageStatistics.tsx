import {useEffect,useMemo,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {providerLanguageGroups} from './admin-conversation-groups';
import {languageName} from './languages';
import {occurrenceSamples,type ConversationVersion} from './set-occurrences';
import {fetchStatisticsData,generationConditions,type StatisticsData} from './language-statistics-data';
import type {StatisticalInput,StatisticalReport,StatisticalSample,TopicSamples} from './language-statistics';
import {ModelOverview} from './ModelOverview';

const format=(n:number|null)=>n===null?'—':new Intl.NumberFormat('en',{maximumFractionDigits:2}).format(n);
const probability=(p:number|null)=>p===null?'—':p<.0001?'< 0.0001':p.toFixed(6).replace(/0+$/,'').replace(/\.$/,'');

export function LanguageStatistics(){
 const [params]=useSearchParams();
 const mode=params.get('compare')||'languages';
 const destination=(compare:string)=>{const next=new URLSearchParams(params);next.set('compare',compare);return `/statistics?${next}`;};
 return <><div className="dashboard statistics-navigation"><nav aria-label="Statistics views" className="actions">
  <Link className="button secondary" aria-current={mode==='languages'?'page':undefined} to={destination('languages')}>Languages</Link>
  <Link className="button secondary" aria-current={mode==='overview'?'page':undefined} to={destination('overview')}>All models</Link>
  <Link className="button secondary" aria-current={mode==='languages-models'?'page':undefined} to={destination('languages-models')}>Languages across models</Link>
  <Link className="button secondary" aria-current={mode==='models'?'page':undefined} to={destination('models')}>Pairwise models</Link>
 </nav></div>{mode==='overview'||mode==='languages-models'?<ModelOverview key={mode} compareLanguages={mode==='languages-models'}/>:<PairwiseStatistics key={mode}/>}</>;
}

function PairwiseStatistics(){
 const [searchParams]=useSearchParams();
 const [comparisonMode,setComparisonMode]=useState<'languages'|'models'>(()=>searchParams.get('compare')==='models'?'models':'languages');
 const [rightProviderKey,setRightProvider]=useState(''),[rightConditionKey,setRightCondition]=useState('');
 const [data,setData]=useState<StatisticsData|null>(null),[error,setError]=useState(''),[refresh,setRefresh]=useState(0);
 const [providerKey,setProvider]=useState('gpt-6.1-sol'),[conditionKey,setCondition]=useState(''),[cohortKey,setCohort]=useState('');
 const [leftLanguage,setLeftLanguage]=useState('en'),[rightLanguage,setRightLanguage]=useState(searchParams.get('compare')==='models'?'en':'ta');
 const [leftVersion,setLeftVersion]=useState<ConversationVersion>('original'),[rightVersion,setRightVersion]=useState<ConversationVersion>(searchParams.get('compare')==='models'?'original':'english');
 const [topicSelection,setTopicSelection]=useState<string[]|null>(()=>searchParams.get('topic')?[searchParams.get('topic')!]:null),[viewKey,setView]=useState('all'),[translationModelKey,setTranslationModel]=useState('');
 const [report,setReport]=useState<StatisticalReport|null>(null),[statisticsError,setStatisticsError]=useState('');
 useEffect(()=>{let alive=true;setData(null);setError('');void fetchStatisticsData().then(value=>{if(alive)setData(value);}).catch(e=>{if(alive)setError(e.message||'Could not load evaluations.');});return()=>{alive=false;};},[refresh]);
 const selection=useMemo(()=>{
  if(!data)return null;
  const roots=data.documents.filter(d=>!d.source_conversation_id&&!d.transcript.source_conversation_id);
  const providers=[...new Set(roots.map(d=>d.transcript.provider||'Unknown provider'))].sort();
  const provider=providers.includes(providerKey)?providerKey:providers[0];
  const conditions=generationConditions(data.documents,provider),condition=conditions.find(c=>c.key===conditionKey)||conditions[0];
  const rightProvider=comparisonMode==='models'?(providers.includes(rightProviderKey)?rightProviderKey:providers.find(p=>p!==provider)||provider):provider;
  const rightConditions=generationConditions(data.documents,rightProvider);
  const rightCondition=comparisonMode==='models'?(rightConditions.find(c=>c.key===rightConditionKey)||rightConditions.find(c=>c.prompt===condition?.prompt)||rightConditions[0]):condition;
  if(!condition||!rightCondition)return {providers,provider,conditions,rightProvider,rightConditions,rightCondition};
  const topicKey=(id:string)=>{const doc=data.documents.find(d=>d.id===id)!;return doc.topic_id||doc.transcript.topic_id||'unrecorded-topic';};
  const allGroups=providerLanguageGroups(data.documents);
  const leftGroups=allGroups.filter(g=>g.provider===provider).map(g=>({...g,attempts:g.attempts.filter(a=>condition.ids.has(a.document.id))})).filter(g=>g.attempts.length);
  const rightGroups=allGroups.filter(g=>g.provider===rightProvider).map(g=>({...g,attempts:g.attempts.filter(a=>rightCondition.ids.has(a.document.id))})).filter(g=>g.attempts.length);
  const groups=[...leftGroups,...rightGroups];
  const languages=leftGroups.map(g=>g.language).sort(),rightLanguages=rightGroups.map(g=>g.language).sort();
  const left=languages.includes(leftLanguage)?leftLanguage:languages[0],right=rightLanguages.includes(rightLanguage)?rightLanguage:comparisonMode==='models'&&rightLanguages.includes(left)?left:rightLanguages.find(l=>l!==left)||rightLanguages[0];
  const topics=[...new Set([...new Set([...condition.ids,...rightCondition.ids])].map(topicKey))].map(key=>{const doc=roots.find(d=>(condition.ids.has(d.id)||rightCondition.ids.has(d.id))&&topicKey(d.id)===key)!;return {key,name:doc.generic_topic_name||doc.transcript.topic_name||key};}).sort((a,b)=>a.name.localeCompare(b.name));
  const chosen=topicSelection===null?topics.map(t=>t.key):topicSelection;
  const groupIds=(values:typeof groups)=>new Set(values.flatMap(g=>g.attempts.flatMap(a=>[a.document.id,...a.translations.map(t=>t.id)])));
  const leftIds=groupIds(leftGroups),rightIds=groupIds(rightGroups),ids=new Set([...leftIds,...rightIds]);
  const cohorts=data.cohorts.filter(c=>c.baselines.some(b=>ids.has(b.conversation_id))),cohort=cohorts.find(c=>c.key===cohortKey)||cohorts.find(c=>c.baselines.some(b=>leftIds.has(b.conversation_id))&&c.baselines.some(b=>rightIds.has(b.conversation_id)))||cohorts[0];
  const translatedIds=new Set(groups.flatMap(g=>g.attempts.flatMap(a=>a.translations.map(t=>t.id))));
  const translationModels=[...new Set(data.documents.filter(d=>translatedIds.has(d.id)).map(d=>d.translationModel||'Unrecorded translation model'))].sort();
  const translationModel=translationModels.includes(translationModelKey)?translationModelKey:translationModels[0];
  const samples=(sideGroups:typeof groups,language:string,version:ConversationVersion,topic:string):StatisticalSample[]=>{
   const group=sideGroups.find(g=>g.language===language);if(!group||!cohort)return [];
   return occurrenceSamples({...group,attempts:group.attempts.filter(a=>topicKey(a.document.id)===topic).map(a=>({...a,translations:a.translations.filter(t=>(data.documents.find(d=>d.id===t.id)?.translationModel||'Unrecorded translation model')===translationModel)}))},version,cohort).flatMap(s=>{
    if(!s.counts||!s.document)return [];
    const doc=data.documents.find(d=>d.id===s.document!.id)!;
    if(doc.source_conversation_id&&(doc.translationModel||'Unrecorded translation model')!==translationModel)return [];
    return [{id:s.document.id,rootId:s.rootId,counts:s.counts}];
   });
  };
  const input:StatisticalInput|undefined=cohort?{features:cohort.rubric.rubric.map(f=>({key:f.key,name:f.name})),paired:provider===rightProvider&&left===right&&left!=='en'&&leftVersion!==rightVersion,
   topics:topics.filter(t=>chosen.includes(t.key)).map(t=>({...t,left:samples(leftGroups,left,leftVersion,t.key),right:samples(rightGroups,right,rightVersion,t.key)} as TopicSamples))}:undefined;
  return {providers,provider,conditions,condition,rightProvider,rightConditions,rightCondition,languages,rightLanguages,left,right,topics,chosen,cohorts,cohort,translationModels,translationModel,input};
 },[data,comparisonMode,rightProviderKey,rightConditionKey,providerKey,conditionKey,cohortKey,leftLanguage,rightLanguage,leftVersion,rightVersion,topicSelection,translationModelKey]);
 const input=selection?.input;
 useEffect(()=>{
  setReport(null);setStatisticsError('');if(!input)return;
  let worker:Worker;
  try{worker=new Worker(new URL('./language-statistics.worker.ts',import.meta.url),{type:'module'});}
  catch{setStatisticsError('Could not start the statistics worker. Reload and try again.');return;}
  worker.onmessage=event=>{if(event.data.error)setStatisticsError(event.data.error);else setReport(event.data.report);};
  worker.onerror=()=>setStatisticsError('Statistical analysis failed. Reload and try again.');worker.postMessage(input);
  return()=>worker.terminate();
 },[input]);
 const view=report?.views.find(v=>v.key===viewKey)||report?.views[0];
 const versionLabel=(language:string|undefined,version:ConversationVersion)=>`${languageName(language||'en')} ${version==='english'&&language!=='en'?'→ English translation':'original'}`;
 const leftLabel=`${selection?.provider||''} / ${versionLabel(selection?.left,leftVersion)}`,rightLabel=`${selection?.rightProvider||''} / ${versionLabel(selection?.right,rightVersion)}`;
 function download(){
  if(!report||!selection?.condition||!selection.cohort)return;
  const payload={analysis_version:'topic-stratified-permutation/3',comparison_mode:comparisonMode,provider:selection.provider,tutor_condition:selection.condition.key,system_prompt:selection.condition.prompt,evaluation_cohort:selection.cohort.key,left:{model:selection.provider,language:selection.left,version:leftVersion,tutor_condition:selection.condition.key,system_prompt:selection.condition.prompt},right:{model:selection.rightProvider,language:selection.right,version:rightVersion,tutor_condition:selection.rightCondition?.key,system_prompt:selection.rightCondition?.prompt},translation_model:selection.translationModel,alpha:.05,correction:'none',resamples:19999,report:{...report,views:report.views.map(v=>({...v,rows:v.rows.map(({adjustedP,...row})=>row)}))},input};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='language-feature-statistics.json';a.click();URL.revokeObjectURL(url);
 }
 return <main className="dashboard language-statistics"><nav className="conversation-breadcrumbs" aria-label="Conversation navigation"><Link to="/">All topics</Link><span aria-hidden="true">/</span><span>Language statistics</span></nav>
  <div className="page-heading"><div><span className="eyebrow">LABEL ANALYSIS</span><h1>{comparisonMode==='models'?'Compare models across topics':'Compare languages across topics'}</h1><p>Compare saved feature counts per conversation, with topic-adjusted significance tests.</p></div><div className="actions"><button className="secondary" onClick={()=>setRefresh(n=>n+1)}>Refresh data</button><button disabled={!report?.familySize} onClick={download}>Export analysis</button></div></div>
  {error?<div role="alert" className="card error">{error}</div>:!data?<p role="status">Loading language comparison data…</p>:!selection?.condition?<p role="status">No conversations are available for comparison.</p>:<>
   <section className="card statistics-controls" aria-label="Statistical comparison settings">
    <label>Comparison<select aria-label="Comparison" value={comparisonMode} onChange={e=>{const mode=e.target.value as 'languages'|'models';setComparisonMode(mode);setCohort('');setRightCondition('');if(mode==='models'){setRightLanguage(selection.left||'en');setLeftVersion('original');setRightVersion('original');}}}><option value="languages">Languages</option><option value="models">Models</option></select></label>
    <label>{comparisonMode==='models'?'Left tutor model':'Tutor provider'}<select aria-label={comparisonMode==='models'?'Left tutor model':'Tutor provider'} value={selection.provider} onChange={e=>{setProvider(e.target.value);setCondition('');setCohort('');setRightCondition('');}}>{selection.providers.map(p=><option key={p}>{p}</option>)}</select></label>
    {comparisonMode==='models'&&<label>Right tutor model<select aria-label="Right tutor model" value={selection.rightProvider} onChange={e=>{setRightProvider(e.target.value);setRightCondition('');setCohort('');}}>{selection.providers.map(p=><option key={p}>{p}</option>)}</select></label>}
    <label>{comparisonMode==='models'?'Left tutor generation condition':'Tutor generation condition'}<select aria-label={comparisonMode==='models'?'Left tutor generation condition':'Tutor generation condition'} value={selection.condition.key} onChange={e=>{setCondition(e.target.value);setTopicSelection(null);}}>{selection.conditions.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select></label>
    <p className="statistics-prompt">{selection.condition.prompt}</p><details><summary>Tutor generation settings</summary><pre className="statistics-prompt">{selection.condition.key}</pre></details>
    {comparisonMode==='models'&&<><label>Right tutor generation condition<select aria-label="Right tutor generation condition" value={selection.rightCondition?.key} onChange={e=>{setRightCondition(e.target.value);setCohort('');}}>{selection.rightConditions?.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select></label><p className="statistics-prompt">{selection.rightCondition?.prompt}</p><details><summary>Right tutor generation settings</summary><pre className="statistics-prompt">{selection.rightCondition?.key}</pre></details>{selection.condition.prompt!==selection.rightCondition?.prompt&&<p role="status" className="notice">The selected models use different tutor prompts. Differences may reflect both the model and the prompt.</p>}</>}
    <label>Saved LLM evaluation<select aria-label="Saved LLM evaluation" value={selection.cohort?.key||''} onChange={e=>setCohort(e.target.value)}>{selection.cohorts?.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select></label>
    {selection.translationModels&&selection.translationModels.length>0&&<label>Translation model<select aria-label="Translation model" value={selection.translationModel} onChange={e=>setTranslationModel(e.target.value)}>{selection.translationModels.map(m=><option key={m}>{m}</option>)}</select></label>}
    <div className="occurrence-set-selectors">{(['Left','Right'] as const).map(side=>{
     const left=side==='Left',language=left?selection.left:selection.right,version=left?leftVersion:rightVersion;
     return <fieldset key={side}><legend>{side} set</legend><label>{side} original language<select aria-label={`${side} original language`} value={language} onChange={e=>(left?setLeftLanguage:setRightLanguage)(e.target.value)}>{(left?selection.languages:selection.rightLanguages)?.map(l=><option key={l} value={l}>{languageName(l)}</option>)}</select></label><label>{side} conversation version<select aria-label={`${side} conversation version`} value={version} onChange={e=>(left?setLeftVersion:setRightVersion)(e.target.value as ConversationVersion)}><option value="original">Original conversations</option><option value="english">English versions</option></select></label></fieldset>;
    })}</div>
    <fieldset className="statistics-topics"><legend>Topics</legend>{selection.topics?.map(t=><label key={t.key}><input type="checkbox" checked={selection.chosen?.includes(t.key)||false} onChange={e=>setTopicSelection(e.target.checked?[...(selection.chosen||[]),t.key]:(selection.chosen||[]).filter(k=>k!==t.key))}/>{t.name}</label>)}</fieldset>
   </section>
   {!selection.cohort?<p role="status">No compatible section-based evaluations are saved for this condition.</p>:statisticsError?<p role="alert" className="error">{statisticsError}</p>:!report?<p role="status">Calculating statistical comparisons…</p>:<>
    <section className="card statistics-results" aria-label="Language significance results">
     <p>{leftLabel} versus {rightLabel}. {report.paired?'Matched original/translation pairs are compared by their source IDs.':'Conversation groups are independent; try numbers are not paired.'}</p>
     <p>Counts are summed across sections for each conversation. A completed evaluation with no label is zero; missing or invalid evaluations are excluded.</p>
     <details><summary>Topic coverage</summary><ul>{report.coverage.map(t=><li key={t.key}>{t.name}: left n = {t.left}, right n = {t.right}. {t.reason}</li>)}</ul></details>
     {report.familySize>0?<>
      <label>Results for<select aria-label="Results for" value={view?.key||'all'} onChange={e=>setView(e.target.value)}>{report.views.map(v=><option key={v.key} value={v.key}>{v.name}</option>)}</select></label>
      <p>Two-sided permutation tests exchange labels within topics{report.paired?' and within matched pairs':''}. The across-topic effect gives each included topic equal weight. The descriptive means and sample SD use all included conversations.</p>
      <p>Results use unadjusted p &lt; 0.05, without correction for multiple comparisons.</p>
      <div className="table-wrap"><table aria-label="Feature count statistical significance"><thead><tr><th scope="col">Feature</th><th scope="col">{leftLabel}<small>Mean ± SD</small></th><th scope="col">{rightLabel}<small>Mean ± SD</small></th><th scope="col">Topic-adjusted difference<small>Right − left</small></th><th scope="col">p (unadjusted)</th><th scope="col">Result</th><th scope="col">Test</th></tr></thead><tbody>{view?.rows.map(r=><tr key={r.key}><th scope="row">{r.name}</th><td>{format(r.left.mean)} ± {format(r.left.sd)}</td><td>{format(r.right.mean)} ± {format(r.right.sd)}</td><td>{format(r.difference)}</td><td>{probability(r.p)}</td><td>{r.p===null?'Unavailable':r.p<.05?'Significant':'Not detected'}</td><td>{r.method}<small>{r.permutations===1&&r.difference===0?'Zero observed effect':`${r.permutations.toLocaleString()} permutations`}</small></td></tr>)}</tbody></table></div>
     </>:<p role="status">No topics have enough comparable evaluated conversations. Choose another condition, version, or topic. At least two conversations per side—or two matched pairs—are required.</p>}
     <p className="occurrence-help">These are exploratory tests of raw counts, conditional on the selected topics and prompts. Longer answers can contain more features. Tests assume independent conversation trials and exchangeability within topics under the null. Small samples have limited power; “Not detected” does not establish equality. Selecting translations compares the language of generation through its English rendering.</p>
     <p><a href="https://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/permtest.htm" target="_blank" rel="noreferrer">Permutation-test reference</a></p>
    </section>
   </>}
  </>}
 </main>;
}
