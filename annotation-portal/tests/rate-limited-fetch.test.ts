import {expect,it,vi} from 'vitest';
import {createRateLimitedFetch,runConcurrent} from '../scripts/rate-limited-fetch.mjs';

it('limits in-flight jobs and finishes other jobs when one fails',async()=>{
 let active=0,peak=0;const completed:number[]=[];
 await expect(runConcurrent([1,2,3,4],2,async(n:number)=>{
  active++;peak=Math.max(peak,active);
  await new Promise(resolve=>setTimeout(resolve,5));active--;
  if(n===2)throw Error('fixture failure');completed.push(n);
 })).rejects.toThrow(/1 job\(s\) failed/);
 expect(peak).toBe(2);expect(completed).toEqual([1,3,4]);
});

it('spaces concurrent request starts and shares a Retry-After cooldown across workers',async()=>{
 vi.useFakeTimers();vi.setSystemTime(0);
 try {
  const starts:number[]=[];const retries:any[]=[];
  const limited=createRateLimitedFetch({minIntervalMs:2000,random:()=>0,
   onRetry:(r:any)=>retries.push(r),fetcher:async()=>{
    starts.push(Date.now());
    return starts.length===1?new Response('limited',{status:429,headers:{'Retry-After':'10'}}):new Response('ok');
   }});
  const pending=Promise.all([limited('https://example.test/a'),limited('https://example.test/b')]);
  await vi.runAllTimersAsync();
  const responses=await pending;
  expect(responses.every(r=>r.ok)).toBe(true);
  expect(starts).toHaveLength(3);
  expect(starts[1]-starts[0]).toBeGreaterThanOrEqual(10000);
  expect(starts[2]-starts[1]).toBeGreaterThanOrEqual(2000);
  expect(retries).toEqual([{status:429,retry:1,delay_ms:10000}]);
 } finally {vi.useRealTimers();}
});

it('honors HTTP-date Retry-After and bounds retries without retrying permanent failures',async()=>{
 let time=Date.parse('2026-01-01T00:00:00Z'),calls=0;
 const limited=createRateLimitedFetch({minIntervalMs:0,maxRetries:1,now:()=>time,sleep:async(ms:number)=>{time+=ms;},random:()=>0,
  fetcher:async()=>{calls++;return new Response('',{status:503,headers:{'Retry-After':'Thu, 01 Jan 2026 00:00:12 GMT'}});}});
 expect((await limited('https://example.test')).status).toBe(503);
 expect(calls).toBe(2);expect(time).toBe(Date.parse('2026-01-01T00:00:12Z'));
 calls=0;
 const permanent=createRateLimitedFetch({fetcher:async()=>{calls++;return new Response('',{status:401});}});
 expect((await permanent('https://example.test')).status).toBe(401);expect(calls).toBe(1);
});

it('does not send a request whose signal has been aborted while queued',async()=>{
 let time=0,calls=0;const controller=new AbortController();
 const limited=createRateLimitedFetch({now:()=>time,sleep:async(ms:number)=>{time+=ms;controller.abort();},fetcher:async()=>{calls++;return new Response('ok');}});
 await limited('https://example.test/first');
 await expect(limited('https://example.test/second',{signal:controller.signal})).rejects.toThrow();
 expect(calls).toBe(1);
});
