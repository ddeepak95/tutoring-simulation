import {createRateLimitedFetch} from './rate-limited-fetch.mjs';

/** Shared request gate: additive growth, multiplicative backoff, bounded retries. */
export function createAdaptiveFetch({initialConcurrency=4,maxConcurrency=12,minIntervalMs=500,
 fetcher=fetch,onChange=()=>{},...retryOptions}={}){
 if(!Number.isInteger(initialConcurrency)||!Number.isInteger(maxConcurrency)||initialConcurrency<1||maxConcurrency<initialConcurrency||maxConcurrency>32)throw Error('Concurrency must satisfy 1 <= initial <= maximum <= 32.');
 let limit=initialConcurrency,active=0,successes=0,peak=0;
 const queue=[];
 const state=()=>({limit,active,queued:queue.length,peak});
 const pump=()=>{while(active<limit&&queue.length){active++;peak=Math.max(peak,active);queue.shift()();}};
 const change=(next,reason)=>{successes=0;if(next!==limit){limit=next;onChange({...state(),reason});}};
 const limited=createRateLimitedFetch({...retryOptions,minIntervalMs,fetcher:async(input,init)=>{
  try{
   const response=await fetcher(input,init);
   if([429,500,502,503,504].includes(response.status))change(Math.max(1,Math.floor(limit/2)),`HTTP ${response.status}`);
   else if(response.ok){if(++successes>=limit*2)change(Math.min(maxConcurrency,limit+1),'successful request window');}
   else successes=0;
   return response;
  }catch(error){if(!init?.signal?.aborted)change(Math.max(1,Math.floor(limit/2)),'network error');throw error;}
 }});
 const gated=(input,init)=>new Promise((resolve,reject)=>{
  queue.push(async()=>{
   try{
    init?.signal?.throwIfAborted();
    resolve(await limited(input,init));
   }catch(error){reject(error);}
   finally{active--;pump();}
  });pump();
 });
 return Object.assign(gated,{state});
}
