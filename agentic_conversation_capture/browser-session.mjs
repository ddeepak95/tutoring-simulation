export class BrowserConnectionError extends Error {constructor(message){super(message);this.name='BrowserConnectionError';this.code='browser_unavailable';}}
export class CaptureSession {
 constructor(socket,{commandTimeout=10000}={}){
  this.socket=socket;this.timeout=commandTimeout;this.next=1;this.pending=new Map();this.events=new Map();
  socket.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.id){const pending=this.pending.get(message.id);if(!pending)return;clearTimeout(pending.timer);this.pending.delete(message.id);message.error?pending.reject(Error(message.error.message)):pending.resolve(message.result);}else for(const listener of this.events.get(message.method)||[])listener(message.params);});
  const failed=()=>{for(const p of this.pending.values()){clearTimeout(p.timer);p.reject(new BrowserConnectionError('Capture target disconnected.'));}this.pending.clear();};
  socket.addEventListener('close',failed);socket.addEventListener('error',failed);
 }
 static async connect(url,{connectTimeout=5000,...options}={}){
  const socket=new WebSocket(url);
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{socket.close();reject(new BrowserConnectionError('Capture target connection timed out.'));},connectTimeout);socket.addEventListener('open',()=>{clearTimeout(timer);resolve();},{once:true});socket.addEventListener('error',()=>{clearTimeout(timer);reject(new BrowserConnectionError('Capture target connection failed.'));},{once:true});});
  return new CaptureSession(socket,options);
 }
 on(method,listener){const listeners=this.events.get(method)||new Set();listeners.add(listener);this.events.set(method,listeners);return()=>listeners.delete(listener);}
 send(method,params={},timeout=this.timeout){
  if(this.socket.readyState!==1)return Promise.reject(new BrowserConnectionError('Capture target is not connected.'));
  const id=this.next++;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{this.pending.delete(id);reject(new BrowserConnectionError(`${method} timed out.`));},timeout);this.pending.set(id,{resolve,reject,timer});this.socket.send(JSON.stringify({id,method,params}));});
 }
 async evaluate(expression,arg){
  const source=typeof expression==='function'?`(${expression})(${JSON.stringify(arg)??'undefined'})`:expression;
  const result=await this.send('Runtime.evaluate',{expression:source,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value;
 }
 async click(id){
  // Background targets can retain stale hit-testing until rendering is active.
  // Emulate focus for this target without opening or focusing a user window.
  await this.send('Emulation.setFocusEmulationEnabled',{enabled:true});
  await this.evaluate(id=>{const el=document.querySelector(`[data-image-capture-control="${id}"]`);if(!el)throw Error('Capture control disappeared.');el.scrollIntoView({block:'center',behavior:'instant'});},id);
  await new Promise(resolve=>setTimeout(resolve,50));
  const point=await this.evaluate(id=>{const el=document.querySelector(`[data-image-capture-control="${id}"]`);if(!el)throw Error('Capture control disappeared.');const rect=el.getBoundingClientRect();if(!rect.width||!rect.height)throw Error('Capture control is not visible.');const x=rect.x+rect.width/2,y=rect.y+rect.height/2;const hit=document.elementFromPoint(x,y);if(hit!==el&&!el.contains(hit))throw Error('Capture control is covered by another element.');return {x,y};},id);
  await this.send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});await this.send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});
 }
 async screenshot(id){
  const clip=await this.evaluate(id=>{const node=id?document.querySelector(`[data-image-capture-region="${id}"]`):document.body;if(!node)throw Error('Capture region disappeared.');node.scrollIntoView({block:'center'});const r=node.getBoundingClientRect();return {x:Math.max(0,r.x+scrollX),y:Math.max(0,r.y+scrollY),width:Math.min(1200,r.width),height:Math.min(1200,r.height),scale:1};},id);
  return (await this.send('Page.captureScreenshot',{format:'png',clip,captureBeyondViewport:true},5000)).data;
 }
 close(){this.socket.close();}
}
export async function browserTargets(host='http://127.0.0.1:9222'){
 try{const response=await fetch(host+'/json/list',{signal:AbortSignal.timeout(3000)});if(!response.ok)throw Error('Browser health check failed.');return await response.json();}catch{throw new BrowserConnectionError('Chrome debugging endpoint is unavailable.');}
}
export async function openCaptureTarget(url,{host='http://127.0.0.1:9222'}={}){
 if(!/^https:\/\/chatgpt\.com\/(?:g\/[\w/-]+\/)?c\/[a-f0-9-]{36}$/.test(url))throw Error('A saved ChatGPT conversation URL is required.');
 await browserTargets(host);let last;
 for(let attempt=0;attempt<2;attempt++){
  let target;
  try{const response=await fetch(host+'/json/new?'+encodeURIComponent(url),{method:'PUT',signal:AbortSignal.timeout(5000)});if(!response.ok)throw Error('Could not open capture target.');target=await response.json();const session=await CaptureSession.connect(target.webSocketDebuggerUrl);return {target,session,close:async()=>{session.close();await fetch(host+'/json/close/'+target.id,{signal:AbortSignal.timeout(3000)});}};}
  catch(error){last=error;if(target)await fetch(host+'/json/close/'+target.id,{signal:AbortSignal.timeout(3000)}).catch(()=>{});}
 }
 throw new BrowserConnectionError('Capture circuit breaker opened after one reconnect attempt: '+last.message);
}
