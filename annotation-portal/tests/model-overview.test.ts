import {expect,it} from 'vitest';
import {modelLanguageOverview,modelOverview,modelOverviewOptions} from '../src/model-overview';
import {languageStatistics} from '../src/language-statistics';
import {evaluationCohorts} from '../src/set-occurrences';
import type {StatisticsData,StatisticalDocument} from '../src/language-statistics-data';
import type {RubricSnapshot} from '../src/types';

it('keeps shared topics, prompt/settings and evaluator cohorts separate, with latest counts and evaluated zeros',()=>{
 const rubric={label_schema_version:'section-items/1',rubric:[{key:'headings',name:'Headings'}]} as RubricSnapshot;
 const data:StatisticsData={documents:[],cohorts:[]};const baselines:any[]=[];
 const add=(model:string,topic:string,i:number,count:number|null,prompt='Shared prompt',settings={},date='2026-10-28')=>{
  const id=`${model}-${topic}-${i}-${prompt}-${date}`;
  data.documents.push({id,label:topic,language:'en',topic_id:topic,created_at:date,transcript:{conversation_id:id,provider:model,access_type:'API',messages:[]},generation:{model_id:model,system_prompt:prompt,settings}} as StatisticalDocument);
  if(count!==null)baselines.push({id:'b-'+id,conversation_id:id,rubric_hash:'r',annotations:count?[{section_id:'s1',feature:'headings',entry:{count}}]:[],model:'evaluator',prompt_version:'v19',generation_config:{provider:'google',instructional_prompt_sha256:'hash'},created_at:date});
  return id;
 };
 for(const model of ['A','B','C'])for(let i=0;i<2;i++){add(model,'shared',i,model==='A'?0:4);add(model,'partial',i,model==='C'?null:9);}
 for(let i=0;i<2;i++)add('B','shared',i,99,'Other prompt',{},'2026-10-29');
 for(let i=0;i<2;i++)add('A','shared',i,77,'Shared prompt',{temperature:1},'2026-01-01');
 // A newer valid baseline replaces a saved version, without adding a new trial.
 const original=baselines.find(b=>b.conversation_id.startsWith('B-shared'));
 baselines.push({...original,id:'new-baseline',created_at:'2026-10-30',annotations:[{section_id:'s1',feature:'headings',entry:{count:8}}]});
 // An evaluated translation must not enter the original-language samples.
 const source=data.documents[0];data.documents.push({...source,id:'translated',source_conversation_id:source.id,transcript:{...source.transcript,conversation_id:'translated',source_conversation_id:source.id}});
 baselines.push({...original,id:'translated-baseline',conversation_id:'translated',annotations:[{section_id:'s1',feature:'headings',entry:{count:100}}]});
 data.cohorts=evaluationCohorts(baselines,new Map([['r',rubric]]));
 const options=modelOverviewOptions(data,'Shared prompt');expect(options).toHaveLength(3);
 const result=modelOverview(data,options,'en',data.cohorts[0],null);
 expect(result.topics.map(t=>t.key)).toEqual(['shared']);
 expect(result.rows[0].cells.map(c=>c.n)).toEqual([2,2,2]);
 expect(result.rows[0].cells.map(c=>c.mean)).toEqual([0,6,4]);
 expect(result.rows[0].cells[1].sd).toBeCloseTo(Math.sqrt(8));
 expect(result.coverage.find(t=>t.key==='partial')?.included).toBe(false);
 expect(modelOverview(data,options,'en',data.cohorts[0],['partial']).topics).toHaveLength(0);
 const onlyAB=modelOverview(data,options.slice(0,2),'en',data.cohorts[0],null);
 expect(onlyAB.topics).toHaveLength(2);
 const oldCondition=options[0].conditions.find(c=>c.key.includes('temperature'))!;
 const changed=modelOverviewOptions(data,'Shared prompt',{A:oldCondition.key});
 expect(modelOverview(data,changed,'en',data.cohorts[0],['shared']).rows[0].cells[0].mean).toBe(77);
});

it('compares original languages independently within each model using topics shared across both languages and every model',()=>{
 const rubric={label_schema_version:'section-items/1',rubric:[{key:'headings',name:'Headings'}]} as RubricSnapshot;
 const data:StatisticsData={documents:[],cohorts:[]},baselines:any[]=[];
 for(const model of ['A','B'])for(const topic of ['complete','missing-tamil'])for(const language of ['en','ta'])for(let i=0;i<5;i++){
  const id=`${model}-${topic}-${language}-${i}`,count=model==='A'?(language==='en'?1:5):3;
  data.documents.push({id,label:topic,language,topic_id:topic,created_at:'2026-10-28',transcript:{conversation_id:id,provider:model,access_type:'API',messages:[]},generation:{model_id:model,system_prompt:'Shared prompt',settings:{}}} as StatisticalDocument);
  if(model==='B'&&topic==='missing-tamil'&&language==='ta')continue;
  baselines.push({id:'b-'+id,conversation_id:id,rubric_hash:'r',annotations:[{section_id:'s1',feature:'headings',entry:{count}}],model:'evaluator',prompt_version:'v19',generation_config:{provider:'google',instructional_prompt_sha256:'hash'},created_at:'2026-10-28'});
 }
 data.cohorts=evaluationCohorts(baselines,new Map([['r',rubric]]));
 const options=modelOverviewOptions(data,'Shared prompt'),cohort=data.cohorts[0];
 const overview=modelLanguageOverview(data,options,'en','ta',cohort,null);
 expect(overview.topics.map(t=>t.key)).toEqual(['complete']);
 expect(overview.coverage.find(t=>t.key==='missing-tamil')?.counts.find(c=>c.model==='B'&&c.language==='ta')?.n).toBe(0);
 const reports=overview.inputs.map(i=>languageStatistics(i.input));
 expect(overview.inputs.every(i=>i.input.paired===false&&i.input.topics[0].left.length===5&&i.input.topics[0].right.length===5)).toBe(true);
 expect(reports[0].views[0].rows[0]).toMatchObject({left:{mean:1},right:{mean:5},difference:4});
 expect(reports[0].views[0].rows[0].p).toBeCloseTo(2/252);
 expect(reports[1].views[0].rows[0]).toMatchObject({difference:0,p:1});
 const reversed=modelLanguageOverview(data,options,'ta','en',cohort,null);
 const test=languageStatistics(reversed.inputs[0].input).views[0].rows[0];
 expect(test.difference).toBe(-4);expect(test.p).toBeCloseTo(reports[0].views[0].rows[0].p!);
 // Reducing the selected models may restore a topic; it never treats missing results as zeros.
 expect(modelLanguageOverview(data,options.slice(0,1),'en','ta',cohort,null).topics).toHaveLength(2);
 expect(modelLanguageOverview(data,options,'en','en',cohort,null).topics).toHaveLength(0);
 expect(modelLanguageOverview(data,options,'en','ta',cohort,[]).topics).toHaveLength(0);
});
