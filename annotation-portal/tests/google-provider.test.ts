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
