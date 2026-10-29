import {expect,it,vi} from 'vitest';
import {createAdaptiveFetch} from '../scripts/adaptive-fetch.mjs';

it('increases concurrency after successful windows and respects its ceiling',async()=>{
 const changes:any[]=[];let active=0,peak=0;
 const request=createAdaptiveFetch({initialConcurrency:2,maxConcurrency:4,minIntervalMs:0,onChange:(s:any)=>changes.push(s),fetcher:async()=>{active++;peak=Math.max(peak,active);await new Promise(r=>setTimeout(r,1));active--;return new Response('ok');}});
 await Promise.all(Array.from({length:40},()=>request('https://fixture.test')));
 expect(changes.map(s=>s.limit)).toEqual([3,4]);expect(peak).toBeGreaterThan(2);expect(peak).toBeLessThanOrEqual(4);expect(request.state().active).toBe(0);
});

it('halves concurrency on throttling, drains admitted requests and retries successfully',async()=>{
 const changes:any[]=[];let calls=0,time=0;
 const request=createAdaptiveFetch({initialConcurrency:4,maxConcurrency:8,minIntervalMs:0,onChange:(s:any)=>changes.push(s),now:()=>time,sleep:async(ms:number)=>{time+=ms;},random:()=>0,fetcher:async()=>++calls===1?new Response('',{status:429,headers:{'retry-after':'3'}}):new Response('ok')});
 expect((await request('https://fixture.test')).ok).toBe(true);expect(changes[0]).toMatchObject({limit:2,reason:'HTTP 429'});expect(calls).toBe(2);expect(time).toBeGreaterThanOrEqual(3000);
});

it('never retries permanent authentication errors or sends aborted queued work',async()=>{
 let calls=0;const request=createAdaptiveFetch({initialConcurrency:1,maxConcurrency:2,minIntervalMs:0,fetcher:async()=>{calls++;return new Response('',{status:401});}});
 expect((await request('https://fixture.test')).status).toBe(401);
 const controller=new AbortController();controller.abort();await expect(request('https://fixture.test',{signal:controller.signal})).rejects.toThrow();expect(calls).toBe(1);
});

it('backs off and retries transient network failures without exceeding the retry budget',async()=>{
 let calls=0,time=0;const retries:any[]=[];
 const request=createAdaptiveFetch({initialConcurrency:4,maxConcurrency:8,minIntervalMs:0,maxRetries:2,now:()=>time,sleep:async(ms:number)=>{time+=ms;},random:()=>0,onRetry:(r:any)=>retries.push(r),fetcher:async()=>{calls++;throw new TypeError('fetch failed');}});
 await expect(request('https://fixture.test')).rejects.toThrow('fetch failed');
 expect(calls).toBe(3);expect(request.state().limit).toBe(1);expect(retries.map(r=>r.status)).toEqual(['network','network']);expect(time).toBe(6000);
});

it('paces actual network starts even when many requests wait for adaptive slots',async()=>{
 vi.useFakeTimers();vi.setSystemTime(0);
 try{
  const starts:number[]=[];
  const request=createAdaptiveFetch({initialConcurrency:2,maxConcurrency:4,minIntervalMs:500,fetcher:async()=>{starts.push(Date.now());await new Promise(r=>setTimeout(r,2000));return new Response('ok');}});
  const pending=Promise.all(Array.from({length:12},()=>request('https://fixture.test')));
  await vi.runAllTimersAsync();await pending;
  expect(starts).toHaveLength(12);expect(starts.every((t,i)=>i===0||t-starts[i-1]>=500)).toBe(true);
 }finally{vi.useRealTimers();}
});

it('applies a throttled request cooldown to work waiting both inside and outside the gate',async()=>{
 vi.useFakeTimers();vi.setSystemTime(0);
 try{
  const starts:number[]=[];
  const request=createAdaptiveFetch({initialConcurrency:2,maxConcurrency:4,minIntervalMs:500,random:()=>0,fetcher:async()=>{starts.push(Date.now());return starts.length===1?new Response('',{status:429,headers:{'retry-after':'10'}}):new Response('ok');}});
  const pending=Promise.all(Array.from({length:8},()=>request('https://fixture.test')));
  await vi.runAllTimersAsync();expect((await pending).every(r=>r.ok)).toBe(true);
  expect(starts).toHaveLength(9);expect(starts.slice(1).every(t=>t>=10000)).toBe(true);
 }finally{vi.useRealTimers();}
});
