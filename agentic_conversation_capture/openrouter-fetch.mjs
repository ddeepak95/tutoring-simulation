/** OpenRouter may send headers/keepalives before generation finishes. Hold the
 * adaptive slot through the full body and expose embedded upstream errors. */
export function createBufferedOpenRouterFetch({fetcher=fetch}={}){
 return async(input,init)=>{
  const response=await fetcher(input,init),body=await response.text();
  let status=response.status;
  if(response.ok){
   try{
    const payload=JSON.parse(body),choice=payload.choices?.[0],error=payload.error||choice?.error;
    if(error||choice?.finish_reason==='error'){
     const code=Number(error?.code);
     status=[400,401,402,403,429,500,502,503,504].includes(code)?code:502;
    }
   }catch{status=502;}
  }
  const headers=new Headers(response.headers);headers.delete('content-encoding');headers.delete('content-length');
  return new Response(body,{status,headers});
 };
}
