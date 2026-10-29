import {expect,it} from 'vitest';
import {holmAdjustment,languageStatistics,permutationDifference,sampleSummary,type StatisticalSample,type TopicSamples} from '../src/language-statistics';
import {generationConditions} from '../src/language-statistics-data';

const samples=(values:number[],prefix:string):StatisticalSample[]=>values.map((value,i)=>({id:prefix+i,rootId:prefix+i,counts:{f:value}}));
const topic=(key:string,left:number[],right:number[]):TopicSamples=>({key,name:key,left:samples(left,key+'L'),right:samples(right,key+'R')});
const features=[{key:'f',name:'Feature'}];

it('matches the exact two-sided 5-versus-5 permutation result, including ties and constant within-group counts',()=>{
 const result=permutationDifference([{left:[0,0,0,0,0],right:[1,1,1,1,1]}]);
 expect(result).toMatchObject({difference:1,method:'Exact',permutations:252});
 expect(result.p).toBeCloseTo(2/252,12);
 expect(permutationDifference([{left:[1,1],right:[1,1]}]).p).toBe(1);
 expect(sampleSummary([2,4,6])).toEqual({n:3,mean:4,sd:2});
});

it('uses sign flips for paired observations rather than treating pairs as independent',()=>{
 const result=permutationDifference([{left:[0,0,0,0,0],right:[1,1,1,1,1]}],true);
 expect(result).toMatchObject({permutations:32,difference:1});expect(result.p).toBe(2/32);
});

it('blocks permutations within topics and gives topics equal effect weight despite unequal sample sizes',()=>{
 const report=languageStatistics({features,paired:false,topics:[topic('low',[0,0,0,0,0],[0,0]),topic('high',[100,100],[100,100,100,100,100])]});
 const row=report.views[0].rows[0];expect(row.left.mean).not.toBe(row.right.mean);
 expect(row.difference).toBe(0);expect(row.p).toBe(1);
 // Four plus four values: each block has six assignments, not unrestricted 8-choose-4.
 const blocked=permutationDifference([{left:[0,0],right:[1,1]},{left:[100,100],right:[101,101]}]);
 expect(blocked.permutations).toBe(36);expect(blocked.p).toBe(2/36);
});

it('computes the full exact three-topic distribution for five tries per group',()=>{
 const blocks=Array.from({length:3},()=>({left:[0,0,0,0,0],right:[1,1,1,1,1]}));
 const result=permutationDifference(blocks);
 expect(result.method).toBe('Exact (topic distributions)');
 expect(result.permutations).toBe(252**3);expect(result.p).toBeCloseTo(2/(252**3),14);
});

it('uses reproducible nonzero Monte Carlo p-values for large combined designs',()=>{
 const blocks=[{left:Array(20).fill(0),right:Array(20).fill(1)}];
 const a=permutationDifference(blocks,false,123),b=permutationDifference(blocks,false,123);
 expect(a).toEqual(b);expect(a.method).toBe('Monte Carlo');expect(a.permutations).toBe(19999);
 expect(a.p).toBeGreaterThan(0);expect(a.p).toBeLessThan(.001);
});

it('adjusts the full across-topic and per-topic feature family without duplicating a single-topic test',()=>{
 expect(holmAdjustment([.01,.04,.03,null])).toEqual([.03,.06,.06,null]);
 const report=languageStatistics({features,paired:false,topics:[topic('a',[0,0],[1,1]),topic('b',[0,0],[1,1])]});
 expect(report.familySize).toBe(3);
 const single=languageStatistics({features,paired:false,topics:[topic('a',[0,0],[1,1])]});
 expect(single.familySize).toBe(1);expect(single.views[0].rows[0].adjustedP).toBe(single.views[1].rows[0].adjustedP);
});

it('pairs by root identity and reports exclusions, rather than pairing independent try numbers',()=>{
 const left=samples([2,4,999],'left');left[0].rootId='a';left[1].rootId='b';
 const right=samples([5,3],'right');right[0].rootId='b';right[1].rootId='a';
 const report=languageStatistics({features,paired:true,topics:[{key:'paired',name:'paired',left,right},topic('missing',[0],[5,6])]});
 expect(report.coverage[0]).toMatchObject({left:2,right:2,included:true});
 expect(report.views[0].rows[0].difference).toBe(1);
 expect(report.coverage[1].included).toBe(false);
 const same=languageStatistics({features,paired:false,topics:[{key:'same',name:'same',left,right:left}]});
 expect(same.familySize).toBe(0);expect(same.coverage[0].reason).toContain('same conversation');
});

it('excludes invalid counts but keeps genuine zero evaluations',()=>{
 const t=topic('a',[0,0],[0,0]);t.left.push({...t.left[0],id:'bad',counts:{}});
 const report=languageStatistics({features,paired:false,topics:[t]});
 expect(report.coverage[0].left).toBe(2);expect(report.views[0].rows[0].left.mean).toBe(0);expect(report.views[0].rows[0].p).toBe(1);
});

it('separates tutor prompts and settings and selects the newest generation condition without mixing old data',()=>{
 const doc=(id:string,prompt:string|undefined,date:string,settings={max_output_tokens:100})=>({id,created_at:date,transcript:{provider:'GPT',access_type:'API'},generation:{model_id:'GPT',system_prompt:prompt,settings}} as any);
 const conditions=generationConditions([doc('old',undefined,'2026-01-01'),doc('new','Socratic','2026-02-01'),doc('other','Socratic','2026-03-01',{max_output_tokens:200})],'GPT');
 expect(conditions).toHaveLength(3);expect([...conditions[0].ids]).toEqual(['other']);
 expect(conditions.find(c=>c.prompt==='No custom system prompt')?.ids.has('old')).toBe(true);
});
