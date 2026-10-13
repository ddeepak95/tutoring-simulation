// Direct Gemini REST transport; validation and repair remain in llm-provider.
export function googleRequest(messages: {role:string;content:string}[], schema:unknown, config:{model:string;stream?:boolean;max_tokens?:number|null;reasoning:unknown}, apiKey:string) {
 const model=config.model.replace(/^google\//,'');
 if(!/^gemini-[a-z0-9.-]+$/.test(model))throw new Error('Direct Google requires a Gemini model.');
 const effort=(config.reasoning as {effort?:string}|null)?.effort;
 return {url:`https://generativelanguage.googleapis.com/v1beta/models/${model}:${config.stream?'streamGenerateContent?alt=sse':'generateContent'}`,headers:{'x-goog-api-key':apiKey,'Content-Type':'application/json'},body:JSON.stringify({
  systemInstruction:{parts:messages.filter(m=>m.role==='system').map(m=>({text:m.content}))},
  contents:messages.filter(m=>m.role!=='system').map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]})),
  generationConfig:{temperature:0,responseMimeType:'application/json',responseJsonSchema:schema,...(config.max_tokens==null?{}:{maxOutputTokens:config.max_tokens}),...(effort?{thinkingConfig:{thinkingLevel:effort.toUpperCase(),includeThoughts:false}}:{})}
 })};
}
export function googleResponse(text:string,stream:boolean,configuredModel:string) {
 const chunks=stream?text.split(/\r?\n/).filter(line=>line.startsWith('data:')).map(line=>JSON.parse(line.slice(5).trim())):[JSON.parse(text)];
 let content='',finishReason:string|undefined,id:string|undefined,model:string|undefined,usage:any;
 for(const chunk of chunks){
  if(chunk.error)throw new Error('Google returned an error response.');
  id=chunk.responseId||id;model=chunk.modelVersion||model;usage=chunk.usageMetadata||usage;
  const candidate=chunk.candidates?.find((c:any)=>c.index===0)||chunk.candidates?.[0];
  for(const part of candidate?.content?.parts||[])if(typeof part.text==='string'&&!part.thought)content+=part.text;
  finishReason=candidate?.finishReason||finishReason;
 }
 return {id,model:configuredModel,provider:'google',native_model:model,raw_response:chunks,usage:usage?{prompt_tokens:usage.promptTokenCount||0,completion_tokens:usage.candidatesTokenCount||0,thinking_tokens:usage.thoughtsTokenCount||0,total_tokens:usage.totalTokenCount||0}:undefined,choices:[{finish_reason:finishReason==='STOP'?'stop':finishReason||'incomplete',message:{content}}]};
}
