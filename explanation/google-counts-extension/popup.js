async function render(){
  const {study}=await chrome.storage.local.get('study');
  const records=study?.records||[];
  const countdown=study?.status==='waiting'&&study.nextActionAt?`\nNext query in ${Math.max(0,Math.ceil((study.nextActionAt-Date.now())/1000))} seconds (Chrome may delay background alarms).`:'';
  document.querySelector('#status').textContent=`${records.length}/48 counts saved\n${study?.status||'Ready'}${countdown}${study?.message?'\n'+study.message:''}`;
}
for(const action of ['start','stop']) document.querySelector('#'+action).onclick=async()=>{
  try {const result=await chrome.runtime.sendMessage({action}); if(result?.error) throw Error(result.error); await render();}
  catch(error){document.querySelector('#status').textContent=error.message;}
};
document.querySelector('#export').onclick=async()=>{
  const {study}=await chrome.storage.local.get('study');
  const payload={schema_version:1,provider:'google_everyday_chrome_extension',exported_at_utc:new Date().toISOString(),
    settings:{hl:'en',gl:'us',pws:'0',results_language:'unrestricted',browser_profile:'user-selected everyday Chrome; sign-in not independently verified'},
    study:study||{records:[],status:'not_started'}};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='google-browser-counts.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
};
chrome.storage.onChanged.addListener(render);setInterval(render,1000);render();
