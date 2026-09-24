const ALARM='next-google-research-query';
const queries=()=>fetch(chrome.runtime.getURL('queries.json')).then(r=>r.json());
const get=async()=>(await chrome.storage.local.get('study')).study||{records:[],status:'ready',index:0};
const put=study=>chrome.storage.local.set({study});
// Serialize events so navigation, inspection and pause cannot overwrite each other.
let events=Promise.resolve();
const enqueue=task=>{const next=events.then(task);events=next.catch(()=>{});return next;};
function expectedPage(url,query){
  try {const u=new URL(url);return u.origin==='https://www.google.com'&&(u.pathname.startsWith('/sorry/')||(u.pathname==='/search'&&u.searchParams.get('q')===query));}
  catch{return false;}
}

// Runs only on the explicitly created Google study tab.
async function inspectGoogle(){
  const visible=n=>n.getClientRects().length>0&&getComputedStyle(n).visibility!=='hidden'&&getComputedStyle(n).display!=='none';
  const body=document.body.innerText;
  if(location.pathname.startsWith('/sorry/')||document.querySelector('iframe[src*="recaptcha"],form[action*="sorry"]'))
    return {status:'verification_required'};
  if(body.includes('Before you continue to Google')) return {status:'consent_required'};
  let nodes=[...document.querySelectorAll('#result-stats')].filter(visible);
  if(!nodes.length){
    const tools=[...document.querySelectorAll('button,[role="button"]')].find(n=>visible(n)&&((n.getAttribute('aria-label')||'').trim()==='Tools'||n.innerText.trim()==='Tools'));
    if(tools){tools.click();await new Promise(resolve=>setTimeout(resolve,1000));}
    nodes=[...document.querySelectorAll('#result-stats')].filter(visible);
  }
  const estimates=nodes.map(n=>n.innerText.trim());
  if(!estimates.length) estimates.push(...document.body.innerText.split('\n').map(x=>x.trim()).filter(x=>/^(?:About\s+)?[\d,]+\s+results(?:\s*\([\d.]+\s+seconds?\))?\s*$/i.test(x)));
  const counts=[...new Set(estimates.map(x=>x.match(/(?:About\s+)?([\d,]+)\s+results/i)).filter(Boolean).map(x=>Number(x[1].replaceAll(',',''))))];
  const result={status:counts.length===1?'collected':counts.length>1?'conflicting_counts':'count_not_visible',
    count:counts.length===1?counts[0]:null,estimates,url:location.href,query_displayed:new URL(location.href).searchParams.get('q')};
  // Preserve result content only, not the signed-in Google account header.
  const html=document.querySelector('#search')?.outerHTML||'';
  result.results_html_excerpt=html.slice(0,10000);
  result.results_html_truncated=html.length>10000;
  return result;
}

async function pause(message){const s=await get();s.status='paused';s.message=message;s.nextActionAt=null;await put(s);await chrome.alarms.clear(ALARM);}
async function collect(tabId){
  const s=await get();if(s.status!=='loading'||s.tabId!==tabId)return;
  const all=await queries(), q=all[s.index];
  let tab;try{tab=await chrome.tabs.get(tabId);}catch{return pause('Study tab closed. Click Start / resume to open it again.');}
  // Ignore the initial about:blank completion and stale events from the last query.
  if(tab.status!=='complete'||!expectedPage(tab.url,q.query))return;
  // Claim this page once; duplicate onUpdated events do not create duplicate records.
  s.status='inspecting';await put(s);
  try{
    const [execution]=await chrome.scripting.executeScript({target:{tabId},func:inspectGoogle});
    const result=execution.result;
    const latest=await get();if(latest.status==='paused')return;
    if(result.status!=='collected')return pause(result.status+'. Complete verification/consent, or check whether Tools shows a count, then resume.');
    if(result.query_displayed!==q.query)return pause('The displayed query changed. Please restore the exact research query before resuming.');
    latest.records.push({...q,...result,provider:'google_everyday_chrome_extension',collected_at_utc:new Date().toISOString()});
    latest.index++;latest.status=latest.index>=all.length?'complete':'waiting';latest.message='';
    latest.nextActionAt=latest.status==='waiting'?Date.now()+30000:null;
    await put(latest);await chrome.alarms.clear(ALARM);
    if(latest.status==='waiting')await chrome.alarms.create(ALARM,{when:latest.nextActionAt});
  }catch(error){await pause('Study tab unavailable or page could not be read. Resume to retry.');}
}
async function navigate(){
  const s=await get();if(s.status==='paused'||s.status==='complete')return;
  const all=await queries();if(s.index>=all.length){s.status='complete';await put(s);return;}
  s.status='loading';s.message='Opening query '+(s.index+1)+'/'+all.length+': '+all[s.index].query;
  s.nextActionAt=Date.now()+30000;await put(s);
  let tab;
  try{if(s.tabId)tab=await chrome.tabs.get(s.tabId);}catch{}
  if(!tab){
    // Create an inert tab before navigating so the study tab ID is saved first.
    tab=await chrome.tabs.create({url:'about:blank',active:true});s.tabId=tab.id;await put(s);
  }
  await chrome.alarms.create(ALARM,{when:s.nextActionAt});
  await chrome.tabs.update(tab.id,{url:all[s.index].search_url,active:true});
}
chrome.tabs.onUpdated.addListener((tabId,change)=>{if(change.status==='complete')enqueue(()=>collect(tabId)).catch(()=>pause('Could not inspect this page. Click Start / resume to retry.'));});
chrome.tabs.onRemoved.addListener(tabId=>enqueue(async()=>{const s=await get();if(s.tabId===tabId&&s.status!=='complete')await pause('Study tab closed. Resume to open a new study tab.');}));
chrome.alarms.onAlarm.addListener(alarm=>{if(alarm.name===ALARM)enqueue(async()=>{
  const s=await get();
  if(s.status==='waiting')await navigate();
  else if(s.status==='loading'){
    await collect(s.tabId);
    if((await get()).status==='loading')await pause('Google did not finish loading the expected query. Check the study tab, then click Start / resume.');
  }else if(s.status==='inspecting')await pause('Inspection was interrupted. Click Start / resume to retry this query.');
}).catch(()=>pause('Navigation failed. Resume to retry.'));});
chrome.runtime.onMessage.addListener((message,sender,reply)=>{
  enqueue(async()=>{
    if(message.action==='stop')await pause('Paused by user.');
    if(message.action==='start'){
      const s=await get();if(s.status==='complete')return;
      if(s.status==='waiting'&&s.nextActionAt>Date.now()){
        await chrome.alarms.create(ALARM,{when:s.nextActionAt});return;
      }
      await chrome.alarms.clear(ALARM);
      s.status='loading';s.message='';await put(s);
      let tab;try{if(s.tabId)tab=await chrome.tabs.get(s.tabId);}catch{}
      const all=await queries();
      if(tab?.status==='complete'&&expectedPage(tab.url,all[s.index]?.query)){await collect(tab.id);}
      else await navigate();
    }
  }).then(()=>reply({ok:true})).catch(async error=>{await pause('Could not continue. Check the study tab and resume.');reply({error:error.message});});
  return true;
});
