import test from 'node:test';
import assert from 'node:assert/strict';
import {storeCapturePackage} from './capture-file-storage.mjs';
test('private package upload is immutable and verified before returning a database reference',async()=>{
 const pkg={capture_id:'capture',version_hash:'a'.repeat(64)};let saved,requests=[];
 const fetcher=async(url,options)=>{requests.push({url,method:options.method});if(options.method==='POST'){saved=options.body;return new Response('{}',{status:200});}return new Response(saved);};
 const ref=await storeCapturePackage(pkg,{supabaseUrl:'http://example.test',headers:{},userId:'admin',fetcher});
 assert.equal(ref.bytes,saved.length);assert.equal(ref.sha256.length,64);assert.equal(requests.length,2);assert.ok(!requests[0].url.includes('/public/'));
 const corrupt=async(_url,options)=>options.method==='POST'?new Response('{}'):new Response('different bytes');
 await assert.rejects(storeCapturePackage(pkg,{supabaseUrl:'http://example.test',headers:{},userId:'admin',fetcher:corrupt}),/verification/);
});
