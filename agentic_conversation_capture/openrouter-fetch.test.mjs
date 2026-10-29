import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createBufferedOpenRouterFetch} from './openrouter-fetch.mjs';

test('waits for the complete response body, not just OpenRouter keepalive headers',async()=>{
 let send;const body=new ReadableStream({start(controller){send=()=>{controller.enqueue(new TextEncoder().encode('{"choices":[]}'));controller.close();};}});
 const request=createBufferedOpenRouterFetch({fetcher:async()=>new Response(body)});
 let resolved=false;const pending=request('https://example.test').then(r=>{resolved=true;return r;});
 await new Promise(r=>setTimeout(r,5));assert.equal(resolved,false);send();assert.equal((await pending).status,200);
});
test('exposes retryable embedded errors and preserves provider retry delays',async()=>{
 const request=createBufferedOpenRouterFetch({fetcher:async()=>new Response(JSON.stringify({choices:[{finish_reason:'error',error:{code:429}}]}),{headers:{'retry-after':'4'}})});
 const response=await request('https://example.test');assert.equal(response.status,429);assert.equal(response.headers.get('retry-after'),'4');
 const broken=createBufferedOpenRouterFetch({fetcher:async()=>new Response('not JSON')});assert.equal((await broken('https://example.test')).status,502);
});
