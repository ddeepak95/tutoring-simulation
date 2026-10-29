import { expect, it } from 'vitest';
import { compareSectionLabels, type LabelVersion } from '../src/api-label-comparison';
import { bundledRubric } from '../src/lib';
import type { Annotation } from '../src/types';

const annotation=(feature:string,section_id:string,count:number)=>({id:`${feature}-${section_id}`,feature,section_id,entry:{category:'Formatting & Notation',count},evidence:[]}) as Annotation;
const version=(annotations:Annotation[],rubric=bundledRubric):LabelVersion=>({key:'test',label:'Test',rubric,annotations});
it('compares counts only within matching sections, including explicit zeros for missing labels',()=>{
 const rows=compareSectionLabels('t1s1',version([annotation('equations','t1s1',2),annotation('callouts','t1s2',9)]),version([annotation('equations','t1s1',1),annotation('callouts','t1s1',1)]));
 expect(rows).toEqual([{key:'callouts',label:'Callouts',original:0,english:1},{key:'equations',label:'Mathematical Notation',original:2,english:1}]);
 expect(compareSectionLabels('t2s1',version([]),version([]))).toEqual([]);
});
it('distinguishes an unavailable rubric item from a zero occurrence count',()=>{
 const older={...bundledRubric,rubric:bundledRubric.rubric.filter(f=>f.key!=='callouts')};
 const rows=compareSectionLabels('t1s1',version([],older),version([annotation('callouts','t1s1',2)]));
 expect(rows).toEqual([{key:'callouts',label:'Callouts',original:null,english:2}]);
});
