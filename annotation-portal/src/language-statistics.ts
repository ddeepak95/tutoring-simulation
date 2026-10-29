export interface StatisticalSample {id:string;rootId:string;counts:Record<string,number>}
export interface TopicSamples {key:string;name:string;left:StatisticalSample[];right:StatisticalSample[]}
export interface StatisticFeature {key:string;name:string}
export interface StatisticSummary {n:number;mean:number|null;sd:number|null}
export interface FeatureTest {key:string;name:string;left:StatisticSummary;right:StatisticSummary;difference:number|null;p:number|null;adjustedP:number|null;method:string;permutations:number}
export interface StatisticalView {key:string;name:string;topics:number;rows:FeatureTest[]}
export interface StatisticalReport {views:StatisticalView[];coverage:{key:string;name:string;left:number;right:number;included:boolean;reason:string}[];familySize:number;paired:boolean}
export interface StatisticalInput {topics:TopicSamples[];features:StatisticFeature[];paired:boolean}

const mean=(values:number[])=>values.reduce((a,b)=>a+b,0)/values.length;
export function sampleSummary(values:number[]):StatisticSummary {
 const average=values.length?mean(values):null;
 return {n:values.length,mean:average,sd:values.length>1?Math.sqrt(values.reduce((s,x)=>s+(x-average!)**2,0)/(values.length-1)):null};
}
/** Holm controls family-wise error even when feature counts are correlated. */
export function holmAdjustment(values:(number|null)[]):(number|null)[]{
 const sorted=values.flatMap((p,i)=>p===null?[]:[{p,i}]).sort((a,b)=>a.p-b.p);
 const result:(number|null)[]=values.map(()=>null);let previous=0;
 sorted.forEach(({p,i},rank)=>{previous=Math.max(previous,Math.min(1,p*(sorted.length-rank)));result[i]=previous;});
 return result;
}
function combinations(n:number,k:number){let result=1;for(let i=1;i<=Math.min(k,n-k);i++){result=result*(n-i+1)/i;if(result>50000)return 50001;}return Math.round(result);}
function random(seed:number){let state=seed>>>0;return()=>{state+=0x6D2B79F5;let n=state;n=Math.imul(n^n>>>15,n|1);n^=n+Math.imul(n^n>>>7,n|61);return((n^n>>>14)>>>0)/4294967296;};}
function seedFor(text:string){let hash=2166136261;for(const c of text)hash=Math.imul(hash^c.charCodeAt(0),16777619);return hash>>>0;}
interface Block {left:number[];right:number[]}
/** Absolute two-sided difference; equal topic weights, with labels exchanged only within topic. */
export function permutationDifference(blocks:Block[],paired=false,seed=12345,resamples=19999){
 const observed=mean(blocks.map(b=>mean(b.right)-mean(b.left)));
 const extreme=(value:number)=>Math.abs(value)>=Math.abs(observed)-1e-10*Math.max(1,Math.abs(observed));
 if(observed===0)return {difference:0,p:1,method:'Exact',permutations:1};
 let total=1;
 for(const b of blocks){total*=paired?2**b.left.length:combinations(b.left.length+b.right.length,b.left.length);}
 if(total<=50000){
  const possibilities=blocks.map(b=>{
   const values:number[]=[];
   if(paired){
    const differences=b.right.map((x,i)=>x-b.left[i]);
    const visit=(i:number,sum:number)=>{if(i===differences.length){values.push(sum/differences.length);return;}visit(i+1,sum+differences[i]);visit(i+1,sum-differences[i]);};visit(0,0);
   }else{
    const pool=[...b.left,...b.right],sum=pool.reduce((a,x)=>a+x,0),n=b.left.length;
    const visit=(from:number,remaining:number,leftSum:number)=>{if(!remaining){values.push((sum-leftSum)/b.right.length-leftSum/n);return;}for(let i=from;i<=pool.length-remaining;i++)visit(i+1,remaining-1,leftSum+pool[i]);};visit(0,n,0);
   }
   return values;
  });
  let exceed=0,draws=0;
  const visit=(i:number,sum:number)=>{if(i===possibilities.length){draws++;if(extreme(sum/blocks.length))exceed++;return;}for(const x of possibilities[i])visit(i+1,sum+x);};visit(0,0);
  return {difference:observed,p:exceed/draws,method:'Exact',permutations:draws};
 }
 // Small integer-count strata often have far fewer distinct sums than assignments.
 // Convolution evaluates the complete blocked null without enumerating its Cartesian product.
 if(!paired&&blocks.every(b=>combinations(b.left.length+b.right.length,b.left.length)<=50000)){
  const gcd=(a:number,b:number):number=>b?gcd(b,a%b):a;
  const denominators=blocks.map(b=>b.left.length*b.right.length);
  const denominator=denominators.reduce((a,b)=>a/gcd(a,b)*b,1);
  if(Number.isSafeInteger(total)&&Number.isSafeInteger(denominator)&&denominator<=1000000){
   let distribution=new Map<number,number>([[0,1]]),feasible=true;
   for(const [index,b] of blocks.entries()){
    const pool=[...b.left,...b.right],sum=pool.reduce((a,x)=>a+x,0),ways=combinations(pool.length,b.left.length),scale=denominator/denominators[index],nextBlock=new Map<number,number>();
    const visit=(from:number,remaining:number,leftSum:number)=>{if(!remaining){const score=(b.left.length*sum-pool.length*leftSum)*scale;nextBlock.set(score,(nextBlock.get(score)||0)+1/ways);return;}for(let i=from;i<=pool.length-remaining;i++)visit(i+1,remaining-1,leftSum+pool[i]);};visit(0,b.left.length,0);
    if(distribution.size*nextBlock.size>2000000){feasible=false;break;}
    const next=new Map<number,number>();for(const [a,p] of distribution)for(const [b,q] of nextBlock)next.set(a+b,(next.get(a+b)||0)+p*q);
    if(next.size>50000){feasible=false;break;}distribution=next;
   }
   if(feasible){const threshold=Math.round(Math.abs(observed)*denominator*blocks.length);let p=0;for(const [value,probability] of distribution)if(Math.abs(value)>=threshold)p+=probability;return {difference:observed,p:Math.min(1,p),method:'Exact (topic distributions)',permutations:total};}
  }
 }
 const rng=random(seed);let exceed=0;
 for(let draw=0;draw<resamples;draw++){
  let statistic=0;
  for(const b of blocks){
   if(paired)statistic+=b.right.reduce((sum,x,i)=>sum+(x-b.left[i])*(rng()<.5?-1:1),0)/b.left.length;
   else{
    const pool=[...b.left,...b.right];
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    statistic+=mean(pool.slice(b.left.length))-mean(pool.slice(0,b.left.length));
   }
  }
  if(extreme(statistic/blocks.length))exceed++;
 }
 return {difference:observed,p:(exceed+1)/(resamples+1),method:'Monte Carlo',permutations:resamples};
}

export function languageStatistics(input:StatisticalInput):StatisticalReport {
 const prepared=input.topics.map(t=>{
  const complete=(s:StatisticalSample)=>input.features.every(f=>Number.isSafeInteger(s.counts[f.key])&&s.counts[f.key]>=0);
  let left=t.left.filter(complete),right=t.right.filter(complete);
  const overlap=left.some(a=>right.some(b=>a.id===b.id));
  if(input.paired){const byRoot=new Map(right.map(s=>[s.rootId,s]));const pairs=left.flatMap(s=>{const r=byRoot.get(s.rootId);return r&&r.id!==s.id?[{left:s,right:r}]:[];});left=pairs.map(p=>p.left);right=pairs.map(p=>p.right);}
  const included=!overlap&&left.length>=2&&right.length>=2;
  return {...t,left,right,included,reason:overlap?'The same conversation appears on both sides.':included?'Included':input.paired?'Need at least two complete original/translation pairs.':'Need at least two evaluated conversations on each side.'};
 });
 const included=prepared.filter(t=>t.included);
 const scopes=[{key:'all',name:'Across selected topics',topics:included},...included.map(t=>({key:t.key,name:t.name,topics:[t]}))];
 const views:StatisticalView[]=scopes.map(scope=>({key:scope.key,name:scope.name,topics:scope.topics.length,rows:input.features.map(f=>{
  const blocks=scope.topics.map(t=>({left:t.left.map(s=>s.counts[f.key]),right:t.right.map(s=>s.counts[f.key])}));
  const left=sampleSummary(blocks.flatMap(b=>b.left)),right=sampleSummary(blocks.flatMap(b=>b.right));
  const test=blocks.length?permutationDifference(blocks,input.paired,seedFor(scope.key+':'+f.key)):null;
  return {key:f.key,name:f.name,left,right,difference:test?.difference??null,p:test?.p??null,adjustedP:null,method:test?.method||'Unavailable',permutations:test?.permutations||0};
 })}));
 // A one-topic overall view is the same hypothesis as that topic, not an extra test.
 const uniqueViews=included.length===1?views.slice(1):views;
 const tests=uniqueViews.flatMap(v=>v.rows),adjusted=holmAdjustment(tests.map(t=>t.p));tests.forEach((t,i)=>{t.adjustedP=adjusted[i];});
 if(included.length===1)views[0].rows.forEach((t,i)=>{t.adjustedP=views[1].rows[i].adjustedP;});
 return {views,coverage:prepared.map(t=>({key:t.key,name:t.name,left:t.left.length,right:t.right.length,included:t.included,reason:t.reason})),familySize:tests.filter(t=>t.p!==null).length,paired:input.paired};
}
