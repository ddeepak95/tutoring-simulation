export const ADAPTER_VERSION='chatgpt-gallery/1';
export const ROOTS='[data-message-role="assistant"] [data-assistant-markdown-root],[data-content-search-unit-key$=":assistant"] [data-markdown-text-style="assistant-message"]';
/** Runs once per turn. No actions, requests, or transcript serialization. */
export function inventoryTurn({index,selector}) {
 const root=document.querySelectorAll(selector)[index];if(!root)throw Error('Tutor turn disappeared.');
 const controls='button,[role="button"],summary,[role="tab"],select,input[type="range"]';
 let next=0;const stamp=node=>{node.dataset.imageCaptureControl||=`t${index+1}a${++next}`;return node.dataset.imageCaptureControl;};
 const owner=node=>{const component=node.closest('[data-capture-component-anchor]');if(component)return {section_id:component.dataset.captureOwnerSection,anchor:component.dataset.captureComponentAnchor};
  const headings=[...root.querySelectorAll('[data-capture-section-start]')];let heading=null;for(const h of headings)if(h===node||h.contains(node)||(h.compareDocumentPosition(node)&Node.DOCUMENT_POSITION_FOLLOWING))heading=h;
  const sections=globalThis.CaptureSections.snapshotTurn(root,index+1).sections;
  return {section_id:heading?sections.find(s=>s.heading===heading.textContent.trim()&&s.html.includes(`data-capture-section-start="${heading.dataset.captureSectionStart}"`))?.section_id:sections[0]?.section_id,anchor:null};};
 const sources=img=>{const result=[];for(const name of ['src','data-src','data-original','data-full-src']){const v=img.getAttribute(name);if(v)result.push({url:new URL(v,location.href).href,rank:name==='data-original'||name==='data-full-src'?100000:0});}
  if(img.currentSrc)result.push({url:img.currentSrc,rank:1});for(const value of [img.getAttribute('srcset'),...Array.from(img.parentElement?.querySelectorAll('source[srcset]')||[],s=>s.getAttribute('srcset'))])if(value&&!value.startsWith('data:'))for(const part of value.split(',')){const [url,size]=part.trim().split(/\s+/);if(url)result.push({url:new URL(url,location.href).href,rank:parseInt(size)||0});}return [...new Map(result.map(v=>[v.url,v])).values()].sort((a,b)=>b.rank-a.rank);};
 const images=[...root.querySelectorAll('img')].map((img,i)=>({occurrence_id:`t${index+1}i${i+1}`,turn_id:`t${index+1}`, ...owner(img),alt:img.alt||'',sources:sources(img),source:'inline'}));
 const candidates=[],seen=new Set();
 for(const control of root.querySelectorAll(controls)){
  const region=control.closest('[data-d-component="image"],figure,[data-gallery],[data-d-component="box"],details,[data-interactive]')||control.parentElement;
  if(control.closest('[role="radiogroup"],[data-d-component="radio-group"]'))continue;
  // Native chart menus switch to a text table or export the existing chart.
  // Keep the initial SVG; these toolbar actions do not reveal other images.
  if(control.closest('[data-block-actions][data-chart-widget-download-exclude]')&&control.closest('[data-testid="chatgpt-chart-content-reference"]'))continue;
  const label=(control.getAttribute('aria-label')||control.textContent||'').trim().slice(0,160),hasImage=!!region?.querySelector('img');
  if(/^(?:(?:Add to|Remove from|Checking) Favorites|Source)\b/i.test(label))continue;
  const isOpener=hasImage&&(control.getAttribute('aria-haspopup')==='dialog'||control.hasAttribute('aria-controls')||/^Open\b/i.test(label)||control.contains(region.querySelector('img')));
  const isReveal=control.matches('summary,[role="tab"],select,input[type="range"],[aria-expanded]');
  const mediaHint=region?.matches('[data-gallery],[data-d-component=\"image\"]')||control.getAttribute('aria-haspopup')==='dialog'||/\b(image|gallery|photo)\b/i.test(label);
  if(!isOpener&&!isReveal&&!mediaHint)continue;
  if(isOpener&&seen.has(region))continue;seen.add(region);
  const id=stamp(control);region.dataset.imageCaptureRegion=id;
  const linked=images.filter(image=>[...region.querySelectorAll('img')].some(img=>sources(img).some(s=>image.sources.some(t=>t.url===s.url))));
  candidates.push({candidate_id:id,...owner(control),anchor:owner(control).anchor,role:control.getAttribute('role')||control.tagName.toLowerCase(),label,image_count:region.querySelectorAll('img').length,indicators:{has_popup:control.getAttribute('aria-haspopup'),expanded:control.getAttribute('aria-expanded'),gallery:region.hasAttribute('data-gallery')},choice:isOpener?'probe_media_opener':null,image_ids:linked.map(v=>v.occurrence_id)});
 }
 const svgs=[...root.querySelectorAll('svg')].filter(svg=>!svg.closest('button,a,.katex,math')&&(svg.getBoundingClientRect().width>=80||svg.getBoundingClientRect().height>=80)).map((svg,i)=>{const copy=svg.cloneNode(true);copy.setAttribute('xmlns','http://www.w3.org/2000/svg');for(const [j,node] of [svg,...svg.querySelectorAll('*')].entries()){const dest=[copy,...copy.querySelectorAll('*')][j],style=getComputedStyle(node);for(const key of ['fill','stroke','color','font-family','font-size','stroke-width'])dest.style.setProperty(key,style.getPropertyValue(key));}return {occurrence_id:`t${index+1}svg${i+1}`,turn_id:`t${index+1}`,...owner(svg),alt:svg.getAttribute('aria-label')||'',source:'inline',sources:[{url:'data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(copy.outerHTML))),rank:1}]};});
 return {turn_id:`t${index+1}`,images:[...images,...svgs],candidates};
}

/** Viewer-only scan. Never traverses the surrounding conversation again. */
export function readViewer(){
 const visible=n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none';};
 const root=[...document.querySelectorAll('[role="dialog"],[aria-modal="true"],dialog[open]')].filter(visible).at(-1);if(!root)return null;
 const images=[...root.querySelectorAll('img')].map(img=>({url:img.currentSrc||img.src||img.getAttribute('data-src'),alt:img.alt||'',visible:visible(img),width:img.naturalWidth,loaded:img.complete&&img.naturalWidth>0})).filter(i=>i.url&&!/favicon/i.test(i.url)&&!(i.width>0&&i.width<=48));
 const text=[...root.querySelectorAll('*')].filter(n=>!n.childElementCount).map(n=>n.textContent||'').join(' ')+' '+[...root.querySelectorAll('[aria-label]')].map(n=>n.getAttribute('aria-label')).join(' '),counter=text.match(/(\d+)\s*(?:of|\/)\s*(\d+)/i);
 const controls=[...root.querySelectorAll('button,[role="button"]')].map((node,i)=>{const label=(node.getAttribute('aria-label')||node.textContent||'').trim();const icon=[...node.querySelectorAll('use')].map(n=>n.getAttribute('href')).join(' ');const semantic=label+' '+icon+' '+(node.getAttribute('data-action')||'')+' '+(node.getAttribute('data-direction')||'');let action=/\b(next|right)\b/i.test(semantic)?'next':/\b(previous|prev|left)\b/i.test(semantic)?'previous':/\b(close|dismiss)\b/i.test(semantic)?'close':null;const position=Number(node.getAttribute('data-position'))||((label.match(/(?:image|slide|photo|thumbnail)\s+(\d+)/i)||[])[1]?Number(label.match(/(?:image|slide|photo|thumbnail)\s+(\d+)/i)[1]):null);if(!action&&position)action='position';node.dataset.imageCaptureControl=`viewer${i}`;return {id:`viewer${i}`,action,position,label,disabled:!visible(node)||node.disabled||node.getAttribute('aria-disabled')==='true'};});
 const clone=root.cloneNode(true);clone.removeAttribute('role');clone.removeAttribute('aria-modal');clone.removeAttribute('open');clone.style.position='relative';clone.style.inset='auto';clone.querySelectorAll('script').forEach(n=>n.remove());clone.querySelectorAll('[data-image-capture-control]').forEach(n=>n.dataset.captureAgentControl=n.dataset.imageCaptureControl);
 return {images,position:counter?Number(counter[1]):null,total:counter?Number(counter[2]):null,controls,html:clone.outerHTML,key:JSON.stringify([counter?.[1],images.filter(i=>i.visible).map(i=>i.url)])};
}
