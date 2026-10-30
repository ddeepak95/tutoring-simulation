export const mean=values=>values.reduce((sum,value)=>sum+value,0)/values.length;
export function summary(values){
 if(!values.length)return {n:0,mean:null,sd:null,median:null};
 const average=mean(values),sorted=[...values].sort((a,b)=>a-b),middle=Math.floor(sorted.length/2);
 return {n:values.length,mean:average,sd:values.length>1?Math.sqrt(values.reduce((sum,value)=>sum+(value-average)**2,0)/(values.length-1)):null,median:sorted.length%2?sorted[middle]:(sorted[middle-1]+sorted[middle])/2};
}
export function holm(pValues){
 const ordered=pValues.map((p,index)=>({p,index})).sort((a,b)=>a.p-b.p);
 const adjusted=Array(pValues.length);let previous=0;
 ordered.forEach(({p,index},rank)=>{previous=Math.max(previous,Math.min(1,p*(ordered.length-rank)));adjusted[index]=previous;});
 return adjusted;
}
function rngFor(key){
 let state=2166136261;for(const char of key)state=Math.imul(state^char.charCodeAt(0),16777619);
 return ()=>{state+=0x6D2B79F5;let x=state;x=Math.imul(x^x>>>15,x|1);x^=x+Math.imul(x^x>>>7,x|61);return ((x^x>>>14)>>>0)/4294967296;};
}
function shuffled(values,rng){
 const copy=[...values];for(let i=copy.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;
}
function topicLanguageMeans(blocks,languages){
 const totals=Object.fromEntries(languages.map(language=>[language,0]));
 for(const block of blocks)for(const language of languages)totals[language]+=mean(block[language]);
 return Object.fromEntries(languages.map(language=>[language,totals[language]/blocks.length]));
}
function omnibusStatistic(blocks,languages){
 const averages=Object.values(topicLanguageMeans(blocks,languages)),grand=mean(averages);
 return averages.reduce((sum,value)=>sum+(value-grand)**2,0);
}
/** Exchange whole-conversation scores among languages within each topic. */
export function omnibusPermutation(blocks,languages,{resamples=9999,seed='omnibus'}={}){
 if(!blocks.length||languages.some(language=>blocks.some(block=>!block[language]?.length)))return {p:null,statistic:null,permutations:0};
 const observed=omnibusStatistic(blocks,languages),rng=rngFor(seed);let exceed=0;
 for(let draw=0;draw<resamples;draw++){
  const permuted=blocks.map(block=>{
   const pool=shuffled(languages.flatMap(language=>block[language]),rng),next={};let offset=0;
   for(const language of languages){const n=block[language].length;next[language]=pool.slice(offset,offset+n);offset+=n;}
   return next;
  });
  if(omnibusStatistic(permuted,languages)>=observed-1e-12)exceed++;
 }
 return {p:(exceed+1)/(resamples+1),statistic:observed,permutations:resamples};
}
/** Topic-weighted difference, with an independent within-topic permutation null. */
export function pairwisePermutation(blocks,left,right,{resamples=9999,seed='pairwise'}={}){
 if(!blocks.length||blocks.some(block=>!block[left]?.length||!block[right]?.length))return {difference:null,p:null,permutations:0};
 const difference=mean(blocks.map(block=>mean(block[right])-mean(block[left]))),rng=rngFor(seed);let exceed=0;
 for(let draw=0;draw<resamples;draw++){
  let statistic=0;
  for(const block of blocks){
   const pool=shuffled([...block[left],...block[right]],rng),n=block[left].length;
   statistic+=mean(pool.slice(n))-mean(pool.slice(0,n));
  }
  if(Math.abs(statistic/blocks.length)>=Math.abs(difference)-1e-12)exceed++;
 }
 return {difference,p:(exceed+1)/(resamples+1),permutations:resamples};
}
export function compareLanguages(samples,topics,languages,{resamples=9999,seed='rating'}={}){
 const all=Object.fromEntries(languages.map(language=>[language,samples.filter(sample=>sample.language===language).map(sample=>sample.score).filter(Number.isFinite)]));
 const summaries=Object.fromEntries(languages.map(language=>[language,summary(all[language])]));
 const blocks=topics.map(topic=>Object.fromEntries(languages.map(language=>[language,samples.filter(sample=>sample.topic===topic&&sample.language===language).map(sample=>sample.score).filter(Number.isFinite)]))).filter(block=>languages.every(language=>block[language].length));
 const test=omnibusPermutation(blocks,languages,{resamples,seed:seed+':omnibus'});
 let pairs=[];
 if(test.p!==null&&test.p<.05){
  for(let i=0;i<languages.length;i++)for(let j=i+1;j<languages.length;j++){
   const left=languages[i],right=languages[j],result=pairwisePermutation(blocks,left,right,{resamples,seed:`${seed}:${left}:${right}`});
   pairs.push({left,right,...result});
  }
  const adjusted=holm(pairs.map(pair=>pair.p));pairs=pairs.map((pair,index)=>({...pair,adjusted_p:adjusted[index],significant:adjusted[index]<.05}));
 }
 const topicMeans=Object.fromEntries(topics.map(topic=>[
  topic,
  Object.fromEntries(languages.map(language=>[
   language,
   summary(samples.filter(sample=>sample.topic===topic&&sample.language===language).map(sample=>sample.score).filter(Number.isFinite)),
  ])),
 ]));
 return {summaries,topics_in_test:blocks.length,omnibus:test,pairs,topic_means:topicMeans};
}
