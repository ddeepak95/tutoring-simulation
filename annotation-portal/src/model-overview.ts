import {providerLanguageGroups} from './admin-conversation-groups';
import {generationConditions,type StatisticsData} from './language-statistics-data';
import {sampleSummary} from './language-statistics';
import type {StatisticalInput} from './language-statistics';
import {occurrenceSamples,type EvaluationCohort} from './set-occurrences';

export function modelOverviewOptions(data:StatisticsData,prompt:string,conditionKeys:Record<string,string>={}){
 const models=[...new Set(data.documents.filter(d=>!d.source_conversation_id&&!d.transcript.source_conversation_id).map(d=>d.transcript.provider||'Unknown provider'))].sort();
 return models.flatMap(model=>{
  const conditions=generationConditions(data.documents,model).filter(c=>c.prompt===prompt);
  const condition=conditions.find(c=>c.key===conditionKeys[model])||conditions[0];
  return condition?[{model,conditions,condition}]:[];
 });
}

/** Compare originals from one prompt and evaluator cohort, using the same topics for every model. */
export function modelOverview(data:StatisticsData,options:ReturnType<typeof modelOverviewOptions>,language:string,cohort:EvaluationCohort,topicKeys:string[]|null,minimumModels=2){
 const groups=providerLanguageGroups(data.documents),byId=new Map(data.documents.map(d=>[d.id,d]));
 const topicOf=(id:string)=>{const d=byId.get(id)!;return d.topic_id||d.transcript.topic_id||'unrecorded-topic';};
 const columns=options.map(option=>{
  const group=groups.find(g=>g.provider===option.model&&g.language===language);
  const samples=group?occurrenceSamples({...group,attempts:group.attempts.filter(a=>option.condition.ids.has(a.document.id))},'original',cohort):[];
  return {model:option.model,condition:option.condition.key,samples:samples.flatMap(s=>s.counts&&s.document?[{id:s.document.id,topic:topicOf(s.document.id),counts:s.counts}]:[])};
 });
 const keys=[...new Set(options.flatMap(o=>[...o.condition.ids].filter(id=>byId.get(id)?.language===language).map(topicOf)))];
 const coverage=keys.map(key=>{
  const doc=data.documents.find(d=>topicOf(d.id)===key)!;
  const counts=columns.map(c=>({model:c.model,n:c.samples.filter(s=>s.topic===key).length}));
  return {key,name:doc.generic_topic_name||doc.transcript.topic_name||key,counts,selected:topicKeys===null||topicKeys.includes(key),included:columns.length>=minimumModels&&counts.every(c=>c.n>=2)};
 }).sort((a,b)=>a.name.localeCompare(b.name));
 const included=coverage.filter(t=>t.selected&&t.included),includedKeys=new Set(included.map(t=>t.key));
 const filtered=columns.map(c=>({...c,samples:c.samples.filter(s=>includedKeys.has(s.topic))}));
 return {coverage,topics:included,columns:filtered,rows:cohort.rubric.rubric.map(f=>({key:f.key,name:f.name,cells:filtered.map(c=>sampleSummary(c.samples.map(s=>s.counts[f.key])))}))};
}

/** Independent language trials within each model; try numbers never create pairs. */
export function modelLanguageOverview(data:StatisticsData,options:ReturnType<typeof modelOverviewOptions>,leftLanguage:string,rightLanguage:string,cohort:EvaluationCohort,topicKeys:string[]|null){
 const leftAll=modelOverview(data,options,leftLanguage,cohort,null,1),rightAll=modelOverview(data,options,rightLanguage,cohort,null,1);
 const keys=[...new Set([...leftAll.coverage,...rightAll.coverage].map(t=>t.key))];
 const coverage=keys.map(key=>{
  const left=leftAll.coverage.find(t=>t.key===key),right=rightAll.coverage.find(t=>t.key===key);
  const counts=options.flatMap(o=>[{model:o.model,language:leftLanguage,n:left?.counts.find(c=>c.model===o.model)?.n||0},{model:o.model,language:rightLanguage,n:right?.counts.find(c=>c.model===o.model)?.n||0}]);
  return {key,name:(left||right)!.name,counts,selected:topicKeys===null||topicKeys.includes(key),included:options.length>0&&leftLanguage!==rightLanguage&&counts.every(c=>c.n>=2)};
 }).sort((a,b)=>a.name.localeCompare(b.name));
 const topics=coverage.filter(t=>t.selected&&t.included),chosen=topics.map(t=>t.key);
 const left=modelOverview(data,options,leftLanguage,cohort,chosen,1),right=modelOverview(data,options,rightLanguage,cohort,chosen,1);
 const features=cohort.rubric.rubric.map(f=>({key:f.key,name:f.name}));
 const inputs=options.map((o,i)=>({model:o.model,input:{features,paired:false,topics:topics.map(t=>({key:t.key,name:t.name,left:left.columns[i].samples.filter(s=>s.topic===t.key).map(s=>({...s,rootId:s.id})),right:right.columns[i].samples.filter(s=>s.topic===t.key).map(s=>({...s,rootId:s.id}))}))} satisfies StatisticalInput}));
 return {coverage,topics,left,right,inputs};
}
