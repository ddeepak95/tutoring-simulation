import {expect,it,vi} from 'vitest';
import {googleRequest,googleResponse} from '../server/google-provider';
import {generateInstructionalBaseline} from '../server/llm-provider';
import {C,bundledRubric} from '../src/lib';
it('uses Google authentication, native schema and medium reasoning without a token cap',()=>{
 const request=googleRequest([{role:'system',content:'Instructions'},{role:'user',content:'Transcript'}],{type:'object'},{model:'google/gemini-3.8-flash',stream:true,max_tokens:null,reasoning:{effort:'medium'}},'secret');
 expect(request.url).toBe('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse');expect(request.url).not.toContain('secret');
 expect(request.headers).toHaveProperty('x-goog-api-key','secret');const body=JSON.parse(request.body);
 expect(body.generationConfig).toMatchObject({responseMimeType:'application/json',responseJsonSchema:{type:'object'},thinkingConfig:{thinkingLevel:'MEDIUM',includeThoughts:false}});expect(body.generationConfig).not.toHaveProperty('maxOutputTokens');expect(body.systemInstruction.parts[0].text).toBe('Instructions');
});
it('uses Argon model settings without deprecated sampling parameters',()=>{
 const request=googleRequest([{role:'user',content:'Transcript'}],{type:'object'},{model:'gemini-4-argon',stream:true,max_tokens:65536,reasoning:{effort:'medium'}},'secret');
 const body=JSON.parse(request.body);
 expect(request.url).toContain('/gemini-4-argon:streamGenerateContent');
 expect(body.generationConfig).toMatchObject({maxOutputTokens:65536,responseMimeType:'application/json',thinkingConfig:{thinkingLevel:'MEDIUM'}});
 expect(body.generationConfig).not.toHaveProperty('temperature');
});
it('sends public HTTPS images as fileData references and retains inline byte compatibility',()=>{
 const request=googleRequest([{role:'user',content:'Input'}],{type:'object'},{model:'gemini-3.8-flash',reasoning:null},'secret',[{id:'public',turn_id:'t1',mime_type:'image/png',caption:'Neuron diagram',uri:'https://project.supabase.co/storage/v1/object/public/capture-images/a.png'},{id:'inline',turn_id:'t1',mime_type:'image/gif',data:'R0lGODlh'}]);
 const parts=JSON.parse(request.body).contents[0].parts;
 expect(parts.some((part:any)=>part.fileData?.fileUri?.endsWith('/a.png'))).toBe(true);expect(parts.some((part:any)=>part.inlineData?.data==='R0lGODlh')).toBe(true);
 expect(parts.some((part:any)=>part.text?.includes('Image reference public')&&part.text.includes('Conversation caption: Neuron diagram'))).toBe(true);
});
it('sends conversation screenshots as supplementary inline context with evidence guidance',()=>{
 const request=googleRequest([{role:'user',content:'Semantic conversation HTML'}],{type:'object'},{model:'gemini-3.8-flash',reasoning:null},'secret',[],[{id:'screen-1',turn_id:'conversation',mime_type:'image/png',data:'c2NyZWVu'}]);
 const parts=JSON.parse(request.body).contents[0].parts;
 expect(parts.some((part:any)=>part.text?.includes('Supplementary screenshot 1'))).toBe(true);
 expect(parts.some((part:any)=>part.text?.includes('do not quote text from the screenshot'))).toBe(true);
 expect(parts.some((part:any)=>part.inlineData?.data==='c2NyZWVu')).toBe(true);
});
it('retries an inaccessible Gemini URL using its locally retrieved image bytes',async()=>{
 const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'A picture.'}]});const fetcher=vi.fn().mockResolvedValueOnce(new Response('{}',{status:400})).mockResolvedValueOnce(new Response(JSON.stringify({candidates:[{content:{parts:[{text:'{"annotations":[]}'}]},finishReason:'STOP'}]})));
 const requestLog=vi.fn();const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'url-fallback',apiKey:'secret',config:{model:'gemini-3.8-flash',provider:'google',stream:false,timeout:10,repair_attempts:0,reasoning:null},visuals:[{id:'v1',turn_id:'t1',mime_type:'image/png',uri:'https://public.example/image.png',data:'aGVsbG8='}],onProviderRequest:requestLog,fetcher});
 expect(fetcher).toHaveBeenCalledTimes(2);expect(requestLog.mock.calls[0][0].body.contents[0].parts.some((part:any)=>part.fileData)).toBe(true);expect(requestLog.mock.calls[1][0].body.contents[0].parts.some((part:any)=>part.inlineData)).toBe(true);expect(result.annotations).toEqual([]);
});
it('preserves raw stream chunks, excludes thoughts and rejects incomplete output through shared validation',async()=>{
 const chunks=[{responseId:'google-id',candidates:[{index:0,content:{parts:[{text:'hidden',thought:true},{text:'{"annotations":'}]}}]},{modelVersion:'gemini-3.8-flash',candidates:[{index:0,content:{parts:[{text:'[]}'}]},finishReason:'STOP'}],usageMetadata:{totalTokenCount:17,thoughtsTokenCount:5}}];
 const stream=chunks.map(c=>'data: '+JSON.stringify(c)+'\n\n').join('');
 const result=googleResponse(stream,true,'google/gemini-3.8-flash');expect(result.choices[0].message.content).toBe('{"annotations":[]}');expect(result.raw_response).toEqual(chunks);expect(result.usage?.thinking_tokens).toBe(5);
 const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'Hello.'}]});
 const fetcher=vi.fn().mockResolvedValue(new Response(stream));const config={model:'google/gemini-3.8-flash',provider:'google' as const,stream:true,max_tokens:null,timeout:10,repair_attempts:3,reasoning:{effort:'medium'}};
 const generated=await generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'direct',config,apiKey:'secret',fetcher});expect(generated.annotations).toEqual([]);expect(generated.generation_config.provider).toBe('google');
 const incomplete=JSON.stringify({candidates:[{content:{parts:[{text:'{"annotations":[]}'}]},finishReason:'MAX_TOKENS'}]});
 await expect(generateInstructionalBaseline({conversation,rubric:bundledRubric,requestId:'incomplete',config:{...config,stream:false},apiKey:'secret',fetcher:vi.fn().mockResolvedValue(new Response(incomplete))})).rejects.toThrow('did not finish');
});
