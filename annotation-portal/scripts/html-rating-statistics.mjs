export {holm,summary} from '../../experiment-oct-29/rating-language-stats.mjs';
const mean=values=>values.reduce((a,b)=>a+b,0)/values.length;

export function rankWithTies(values){
 const order=values.map((value,index)=>({value,index})).sort((a,b)=>a.value-b.value),ranks=Array(values.length);let ties=0;
 for(let start=0;start<order.length;){let end=start+1;while(end<order.length&&Math.abs(order[end].value-order[start].value)<1e-12)end++;
  const rank=(start+1+end)/2,size=end-start;ties+=size**3-size;
  for(let i=start;i<end;i++)ranks[order[i].index]=rank;start=end;
 }
 return {ranks,ties};
}
function validateMatrix(matrix){
 if(matrix.length<2||matrix[0].length<2||matrix.some(row=>row.length!==matrix[0].length||row.some(v=>!Number.isFinite(v))))throw Error('Expected a complete finite topic-by-language matrix.');
}
export function friedmanStatistic(matrix){
 validateMatrix(matrix);const n=matrix.length,k=matrix[0].length,ranked=matrix.map(rankWithTies),sums=Array(k).fill(0);
 for(const row of ranked)row.ranks.forEach((r,i)=>sums[i]+=r);
 const correction=1-ranked.reduce((total,row)=>total+row.ties,0)/(n*k*(k*k-1));
 const statistic=correction<1e-12?0:Math.max(0,(12/(n*k*(k+1))*sums.reduce((s,r)=>s+r*r,0)-3*n*(k+1))/correction);
 return {statistic,kendall_w:statistic/(n*(k-1)),blocks:n,languages:k,tie_correction:correction,mean_ranks:sums.map(s=>s/n),ranked:ranked.map(row=>row.ranks)};
}
function randomFor(seed){
 let state=2166136261;for(const c of String(seed))state=Math.imul(state^c.charCodeAt(0),16777619);
 return ()=>{state+=0x6D2B79F5;let x=state;x=Math.imul(x^x>>>15,x|1);x^=x+Math.imul(x^x>>>7,x|61);return ((x^x>>>14)>>>0)/4294967296;};
}
export function friedmanPermutation(matrix,{resamples=99999,seed='html-language'}={}){
 if(!Number.isInteger(resamples)||resamples<1)throw Error('Permutation count must be positive.');
 const result=friedmanStatistic(matrix),{ranked,...observed}=result;
 if(result.tie_correction<1e-12)return {...observed,p:1,resamples,exceedances:resamples,mc_se:0,seed};
 const rng=randomFor(seed),n=matrix.length,k=matrix[0].length,target=result.mean_ranks.reduce((s,r)=>s+(n*r)**2,0);
 let exceedances=0;
 for(let draw=0;draw<resamples;draw++){
  const sums=Array(k).fill(0);
  for(const row of ranked){const permuted=[...row];for(let i=k-1;i>0;i--){const j=Math.floor(rng()*(i+1));[permuted[i],permuted[j]]=[permuted[j],permuted[i]];}for(let j=0;j<k;j++)sums[j]+=permuted[j];}
  if(sums.reduce((s,r)=>s+r*r,0)>=target-1e-9)exceedances++;
 }
 const p=(exceedances+1)/(resamples+1);
 return {...observed,p,resamples,exceedances,mc_se:Math.sqrt(p*(1-p)/(resamples+1)),seed};
}
/** Swap the two language labels within each topic; enumerate every assignment. */
export function exactPairedDifference(left,right){
 if(!left.length||left.length!==right.length||left.length>20||[...left,...right].some(v=>!Number.isFinite(v)))throw Error('Expected 1–20 complete matched topic pairs.');
 const differences=right.map((v,i)=>v-left[i]),difference=mean(differences),permutations=2**left.length;let extreme=0;
 for(let mask=0;mask<permutations;mask++){let sum=0;differences.forEach((d,i)=>sum+=(mask&(1<<i))?d:-d);if(Math.abs(sum/left.length)>=Math.abs(difference)-1e-12)extreme++;}
 return {difference,p:extreme/permutations,permutations,topic_differences:differences,blocks:left.length};
}
