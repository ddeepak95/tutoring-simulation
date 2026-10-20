import { afterEach,expect,it,vi } from 'vitest';
import { createServer,type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import type { createClient } from '@supabase/supabase-js';
import { createLLMAnnotationHandler } from '../server/llm-annotations';
const servers:Server[]=[];afterEach(async()=>{await Promise.all(servers.splice(0).map(server=>new Promise<void>(resolve=>{server.close(()=>resolve());server.closeAllConnections();})));});
const doc='00000000-0000-4000-8000-000000000010',requestId='00000000-0000-4000-8000-000000000020';
async function setup({role='admin',authError=false,key='provider-key',claimed=true,status='generating',providerError=false,saveError=false,checkpoint=undefined}: {checkpoint?:any;role?:string;authError?:boolean;key?:string;claimed?:boolean;status?:string;providerError?:boolean;saveError?:boolean}={}) {
 const rpc=vi.fn(async(name:string)=>name==='resume_llm_generation'?{data:{claimed:Boolean(checkpoint),status:'generating',checkpoint},error:null}:name==='claim_llm_generation'?{data:{claimed,status,checkpoint},error:null}:name==='complete_llm_generation'?{data:{id:requestId,annotations:[]},error:saveError?{message:'token=private'}:null}:{data:null,error:null});
 const caller={auth:{getUser:vi.fn().mockResolvedValue({data:{user:authError?null:{id:'admin',user_metadata:{role:'admin'}}},error:authError?{}:null})},rpc,from:vi.fn((table:string)=>{const query:any={select:()=>query,eq:()=>query,insert:async()=>({error:null}),maybeSingle:async()=>({data:{hash:'saved'},error:null}),single:async()=>({data:table==='profiles'?{role}:table==='conversations'?{transcript:{messages:[{turn_id:'t1',speaker:'tutor',text:'A statement.'}]}}:{id:requestId,annotations:[]},error:null})};return query;})};
 const fetcher=vi.fn().mockResolvedValue(providerError?new Response('secret=private',{status:403}):new Response(JSON.stringify({model:'configured/model',choices:[{finish_reason:'stop',message:{content:'{"annotations":[]}'}}]})));
 const handler=createLLMAnnotationHandler({getEnvironment:()=>({VITE_SUPABASE_URL:'https://test.supabase.co',VITE_SUPABASE_PUBLISHABLE_KEY:'public-key',OPENROUTER_API_KEY:key}),createSupabaseClient:vi.fn(()=>caller) as unknown as typeof createClient,fetcher});
 const server=createServer((request,response)=>void handler(request,response));servers.push(server);await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url=`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/llm-annotations`;
 const send=async(body:unknown={conversation_id:doc,request_id:requestId},headers:Record<string,string>={Authorization:'Bearer admin-token','Content-Type':'application/json'})=>{const response=await fetch(url,{method:'POST',headers,body:typeof body==='string'?body:JSON.stringify(body)});return{status:response.status,body:await response.json()};};return{send,rpc,fetcher,caller};
}
it('verifies admin access before any paid call and ignores role claims in user metadata',async()=>{
 for(const option of [{role:'annotator'},{authError:true},{key:''}]){const mock=await setup(option);expect((await mock.send()).status).toBe(option.role?403:option.authError?401:503);expect(mock.fetcher).not.toHaveBeenCalled();}
 const mock=await setup();expect((await mock.send(undefined,{'Content-Type':'application/json'})).status).toBe(401);expect(mock.fetcher).not.toHaveBeenCalled();
});
it('rejects model/rating injection, malformed JSON and oversized requests',async()=>{
 const mock=await setup();for(const body of [{conversation_id:doc,request_id:requestId,model:'another/model'},[],null,'{invalid'])expect((await mock.send(body)).status).toBe(400);expect((await mock.send('x'.repeat(5000))).status).toBe(413);expect(mock.fetcher).not.toHaveBeenCalled();
});
it('persists only validated highlights with model/prompt/config provenance and no human ratings',async()=>{
 const mock=await setup();expect((await mock.send()).status).toBe(201);
 const args=mock.rpc.mock.calls.find(([name])=>name==='complete_llm_generation')?.[1] as any;
 expect(args.p_annotations).toEqual([]);expect(args.p_model).toBe('configured/model');expect(args.p_prompt_version).toBe('instructional-highlights/21');expect(args.p_prompt).toContain('Issues');expect(args.p_turn_ratings).toBeUndefined();expect(args.p_generation_config.attempts).toBe(1);
});
it('does not repeat paid calls for an already claimed or completed generation',async()=>{
 const running=await setup({claimed:false});expect((await running.send()).status).toBe(202);expect(running.fetcher).not.toHaveBeenCalled();const complete=await setup({claimed:false,status:'completed'});expect((await complete.send()).status).toBe(200);expect(complete.fetcher).not.toHaveBeenCalled();
});
it('returns safe failure messages, records failed generation and never leaks provider details',async()=>{
 for(const option of [{providerError:true},{saveError:true}]){const mock=await setup(option);const result=await mock.send();expect(result.status).toBe(502);expect(JSON.stringify(result.body)).not.toMatch(/secret=|token=|provider-key/);expect(mock.rpc.mock.calls.some(([name])=>name==='fail_llm_generation')).toBe(true);}
});

it('resumes a validated failed-storage checkpoint without another provider call',async()=>{
 const first=await setup({saveError:true});expect((await first.send()).status).toBe(502);
 const checkpoint=first.rpc.mock.calls.filter(([name])=>name==='save_llm_generation_checkpoint').at(-1)?.[1].p_checkpoint;
 expect(checkpoint?.draft).toEqual({annotations:[]});
 const resumed=await setup({claimed:false,status:'failed',checkpoint});expect((await resumed.send()).status).toBe(201);
 expect(resumed.fetcher).not.toHaveBeenCalled();expect(resumed.rpc.mock.calls.some(([name])=>name==='resume_llm_generation')).toBe(true);
});
