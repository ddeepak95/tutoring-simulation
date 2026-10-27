import {it,expect,vi} from 'vitest';
import {createHash} from 'node:crypto';
import {resolveCaptureContent} from '../src/capture-content';
import {htmlFixture} from './fixtures/html-conversation';
it('loads verified private packages once per user and leaves inline captures readable',async()=>{
 const pkg=htmlFixture(),bytes=JSON.stringify(pkg);let user='admin';
 const download=vi.fn(async()=>({data:new Blob([bytes]),error:null}));
 const client:any={auth:{getSession:async()=>({data:{session:{user:{id:user}}}})},storage:{from:()=>({download})}};
 const ref:any={bucket:'conversation-packages',path:`packages/00000000-0000-4000-8000-000000000001/${pkg.version_hash}.json`,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:Buffer.byteLength(bytes),version_hash:pkg.version_hash,capture_id:pkg.capture_id};
 const conversation:any={conversation_id:'test',messages:[],html_content_ref:ref,html_content:{format_version:'html-conversation/2'}};
 const results=await Promise.all([resolveCaptureContent(client,conversation),resolveCaptureContent(client,conversation)]);
 expect(results[0].html_content).toEqual(pkg);expect(download).toHaveBeenCalledTimes(1);
 user='another-user';await resolveCaptureContent(client,conversation);expect(download).toHaveBeenCalledTimes(2);
 expect(await resolveCaptureContent(client,{...conversation,html_content_ref:undefined,html_content:pkg})).toMatchObject({html_content:pkg});
 await expect(resolveCaptureContent(client,{...conversation,html_content_ref:{...ref,sha256:'0'.repeat(64)}})).rejects.toThrow(/hash/);
 expect(download).toHaveBeenCalledTimes(3);
 await expect(resolveCaptureContent(client,{...conversation,html_content_ref:{...ref,sha256:'0'.repeat(64)}})).rejects.toThrow(/hash/);
 expect(download).toHaveBeenCalledTimes(4); // Failed downloads cannot poison the cache.
});
