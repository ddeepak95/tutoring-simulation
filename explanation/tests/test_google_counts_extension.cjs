const fs=require('fs'),vm=require('vm'),assert=require('assert');
let state,listener,alarm=false,result={status:'collected',count:123,query_displayed:'test'};
let tabUrl='about:blank', inspections=0, alarmHandler;
const chrome={
  storage:{local:{get:async()=>({study:structuredClone(state)}),set:async x=>{state=structuredClone(x.study)}}},
  runtime:{getURL:x=>x,onMessage:{addListener:f=>listener=f}},
  alarms:{clear:async()=>{},create:async()=>{alarm=true},onAlarm:{addListener:f=>alarmHandler=f}},
  tabs:{get:async()=>({id:7,status:'complete',url:tabUrl}),
    create:async()=>({id:7}),update:async(id,options)=>{tabUrl=options.url;},onUpdated:{addListener:()=>{}},onRemoved:{addListener:()=>{}}},
  scripting:{executeScript:async()=>{inspections++;return [{result}];}}
};
const context={chrome,fetch:async()=>({json:async()=>[
  {query:'test',query_id:'a',search_url:'https://www.google.com/search?q=test'},
  {query:'next',query_id:'b',search_url:'https://www.google.com/search?q=next'}]}),URL,Date,setTimeout};
vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname+'/../google-counts-extension/worker.js','utf8'),context);
const send=action=>new Promise(resolve=>listener({action},{},resolve));
(async()=>{
  await send('start');assert.equal(state.status,'loading');
  tabUrl='about:blank';await context.collect(7);assert.equal(inspections,0);assert.equal(state.status,'loading');
  tabUrl='https://www.google.com/search?q=test';
  await context.collect(7);assert.equal(state.records.length,1);assert.equal(state.status,'waiting');assert(alarm);
  await context.collect(7);assert.equal(state.records.length,1);
  await send('stop');assert.equal(state.status,'paused');
  await send('start');assert.equal(state.status,'loading');
  result={status:'verification_required'};
  await context.collect(7);assert.equal(state.status,'paused');assert.equal(state.records.length,1);
  assert(state.message.includes('verification_required'));
  state.status='inspecting';result={status:'collected',count:456,query_displayed:'next'};
  await send('start');assert.equal(state.status,'complete');assert.equal(state.records.length,2);
  console.log('Verified blank-page race guard, collection, duplicate handling, pause/resume, verification pause and interrupted-inspection recovery.');
})().catch(e=>{console.error(e);process.exit(1)});
