import {sanitizeCapturedHtml} from './capture-document';
import {validateHtmlConversation,type HtmlConversation,type HtmlComponent} from './html-conversation';
import capturedChatGPTPresentation from './chatgpt-presentation.json';

export function componentStateHtml(component:HtmlComponent,stateId:string,imageUrls?:ReadonlySet<string>,sprites?:Record<string,string>) {
  const state=component.states.find(s=>s.state_id===stateId);if(!state)throw Error('Unknown captured component state.');
  const clean=sanitizeCapturedHtml(state.html,{preserveLayout:true,imageUrls});
  for(const [index,path] of Object.keys(sprites||{}).entries())for(const use of clean.root.querySelectorAll('use'))for(const name of ['href','xlink:href']){const value=use.getAttribute(name);if(value?.startsWith(path+'#'))use.setAttribute(name,`#capture-sprite-${index}-${value.slice(path.length+1)}`);}
  for(const edge of component.transitions.filter(e=>e.from===stateId)){
    const control=[...clean.root.querySelectorAll<HTMLElement>('[data-capture-agent-control]')].find(node=>node.dataset.captureAgentControl===edge.control_id);
    if(control){control.removeAttribute('disabled');control.removeAttribute('aria-disabled');control.removeAttribute('data-disabled');control.removeAttribute('tabindex');}
  }
  return clean.root.innerHTML;
}
/** Same HTML and state inventory for the portal and image-baseline renderer. */
export function renderHtmlDocument(pkg:HtmlConversation,{supportingViews=false,turnId}:{supportingViews?:boolean;turnId?:string}={}) {
  validateHtmlConversation(pkg);
  const imageUrls=new Set(pkg.assets.flatMap(a=>[a.file,'./'+a.file]));
  const doc=document.implementation.createHTMLDocument(pkg.metadata.title);
  doc.documentElement.lang=pkg.metadata.language;
  // Section ranges can start inside ChatGPT's theme provider. Restore that
  // inherited context once rather than losing its border/color variables.
  const theme=pkg.turns.flatMap(t=>[t.html,...t.sections.map(s=>s.html)]).map(html=>html.match(/data-theme=["'](light|dark)["']/)?.[1]).find(Boolean)||'light';
  doc.documentElement.dataset.theme=theme;doc.documentElement.classList.add(theme);
  const charset=doc.createElement('meta');charset.setAttribute('charset','utf-8');doc.head.prepend(charset);
  const style=doc.createElement('style');style.textContent=pkg.styles.replace(/<\/?style\b[^>]*>/gi,'')+`
html,body{margin:0!important}*{animation:none!important;transition:none!important}
.html-conversation{box-sizing:border-box;max-width:850px;margin:auto;padding:24px;overflow-wrap:anywhere}
.html-speaker-label{font-weight:600;margin-bottom:12px}
.html-turn{margin-bottom:24px}.html-section{position:relative;display:flow-root;border:1px dashed #9ca3af;padding:24px 16px 30px;margin:24px 0 32px;border-radius:4px}
.html-section.is-selected{border:2px dashed #2563eb;background:#eff6ff33;padding:23px 15px 29px}
.html-section-caption,.html-section-button{font:13px/1.4 system-ui;background:white;color:#374151;border:1px solid #9ca3af;border-radius:3px;padding:4px 8px;cursor:pointer}
.html-section-caption{position:absolute;right:12px;top:-13px}.html-section-footer{position:absolute;left:12px;bottom:-13px;display:flex;gap:8px;align-items:center}
.is-selected .html-section-caption,.is-selected .html-section-button{border-color:#2563eb;color:#1d4ed8}
.llm-section-metadata{font:12px/1.5 monospace;color:#444;margin-bottom:12px}.html-supporting-state{margin-top:18px;border-top:1px dotted #aaa;padding-top:12px}
.html-turn[data-speaker="student"]{margin-inline:17px}
.html-turn[data-speaker="student"]>.html-speaker-label{text-align:right}
.html-student-content{display:flex;justify-content:flex-end}
img,svg{max-width:100%}table{max-width:100%}.html-component{display:flow-root}
/* Captured table edge overlays retain desktop pixel widths after reflow. */
[data-d-component="table"]>[aria-hidden="true"]{max-width:100%}
@media(max-width:600px){.html-conversation{padding:12px}.html-section{padding-left:10px;padding-right:10px}}
`;
  doc.head.append(style);const body=doc.createElement('main');body.className='html-conversation';doc.body.append(body);
  const presentation=pkg.presentation||(pkg.styles.includes('--codex-chat-font-size')?capturedChatGPTPresentation:null);
  if(presentation){body.style.fontFamily=presentation.font_family;body.style.fontSize=presentation.font_size;body.style.lineHeight=presentation.line_height;
    for(const [name,value] of Object.entries(presentation.variables))if(name.startsWith('--')&&!/url\s*\(|expression\s*\(/i.test(value))body.style.setProperty(name,value);
  }
  for(const turn of pkg.turns){if(turnId&&turn.turn_id!==turnId)continue;
    const article=doc.createElement('article');article.className='html-turn capture-message';article.dataset.turnId=turn.turn_id;article.dataset.speaker=turn.speaker;body.append(article);
    if(!supportingViews){const speaker=doc.createElement('div');speaker.className='html-speaker-label capture-speaker';speaker.textContent=turn.speaker_label||(turn.speaker==='student'?'You':'Bot');article.append(speaker);}
    if(turn.speaker==='student'){const content=doc.createElement('div');content.className='html-student-content';content.innerHTML=sanitizeCapturedHtml(turn.html,{preserveLayout:true,imageUrls}).html;article.append(content);continue;}
    if(turnId)article.dataset.llmTurn=turn.turn_id;
    for(const section of turn.sections){
      const wrapper=doc.createElement('section');wrapper.className='html-section';wrapper.dataset.sectionId=section.section_id;
      const content=doc.createElement('div');content.className='html-section-content';content.innerHTML=sanitizeCapturedHtml(section.html,{preserveLayout:true,imageUrls}).html;
      const attributes=turn.content_attributes||{'class':pkg.styles.match(/\.((?:MarkdownRoot|markdown-root)[A-Za-z0-9_-]*)/)?.[1]||'','dir':'auto','data-markdown-text-style':'assistant-message'};
      const shell=doc.createElement('div');for(const [name,value] of Object.entries(attributes))if(['class','dir','style','data-markdown-text-style','data-assistant-markdown-root'].includes(name))shell.setAttribute(name,value);
      const safe=sanitizeCapturedHtml(shell.outerHTML,{preserveLayout:true}).root.firstElementChild;
      for(const attribute of safe?.attributes||[]){if(attribute.name==='class')content.className+=' '+attribute.value;else content.setAttribute(attribute.name,attribute.value);}
      for(const [index,component] of section.components.entries()){
        const anchors=[...content.querySelectorAll<HTMLElement>('[data-capture-component-anchor]')];
        const anchor=anchors[index];if(!anchor)throw Error(`Missing component root in ${section.section_id}.`);
        const container=doc.createElement('div');container.className='html-component';container.dataset.componentId=component.component_id;container.dataset.stateId=component.initial_state;
        container.innerHTML=componentStateHtml(component,component.initial_state,imageUrls);anchor.replaceWith(container);
      }
      if(supportingViews){const caption=doc.createElement('div');caption.className='llm-section-metadata';caption.textContent=`SECTION METADATA: ${section.section_id} | Turn ${section.turn_number} - Section ${section.section_number}`;wrapper.append(caption);}
      if(supportingViews&&pkg.capture_scope){
        const remaining=(pkg.image_inventory||[]).filter(i=>i.section_id===section.section_id);
        for(const image of content.querySelectorAll('img')){
          const src=image.getAttribute('src')||'',asset=pkg.assets.find(a=>src===a.file||src==='./'+a.file);
          const index=remaining.findIndex(i=>i.sha256===asset?.sha256);if(index<0)continue;
          const occurrence=remaining.splice(index,1)[0],caption=doc.createElement('div');caption.className='llm-section-metadata';caption.textContent=`IMAGE METADATA: ${occurrence.occurrence_id}`;image.after(caption);
        }
      }
      wrapper.append(content);article.append(wrapper);
      if(supportingViews)for(const component of section.components)for(const state of component.states){
        if(state.state_id===component.initial_state)continue;
        const support=doc.createElement('div');support.className='html-supporting-state';support.dataset.componentId=component.component_id;
        const caption=doc.createElement('div');caption.className='llm-section-metadata';caption.textContent=`SUPPORTING VIEW: ${section.section_id} / ${component.component_id} / ${state.state_id}; same component, count each occurrence once.${state.image_ids?.length?' Image occurrence IDs: '+state.image_ids.join(', '):''}`;
        const view=doc.createElement('div');view.innerHTML=componentStateHtml(component,state.state_id,imageUrls);support.append(caption,view);wrapper.append(support);
      }
    }
  }
  for(const [index,[path,source]] of Object.entries(pkg.svg_sprites||{}).entries()){
    const parsed=sanitizeCapturedHtml(source,{preserveLayout:true}).root.querySelector('svg');if(!parsed)throw Error('Captured SVG sprite is invalid.');
    const prefix=`capture-sprite-${index}-`,ids=new Map([...parsed.querySelectorAll('[id]')].map(node=>[node.id,prefix+node.id]));
    for(const node of [parsed,...parsed.querySelectorAll('*')])for(const attr of [...node.attributes]){
      if(attr.name==='id'&&ids.has(attr.value))node.setAttribute(attr.name,ids.get(attr.value)!);
      else if(['href','xlink:href'].includes(attr.name)&&attr.value.startsWith('#')&&ids.has(attr.value.slice(1)))node.setAttribute(attr.name,'#'+ids.get(attr.value.slice(1)));
      else if(attr.value.includes('url(#'))node.setAttribute(attr.name,attr.value.replace(/url\(#([^)]+)\)/g,(value,id)=>ids.has(id)?`url(#${ids.get(id)})`:value));
    }
    parsed.setAttribute('aria-hidden','true');parsed.setAttribute('width','0');parsed.setAttribute('height','0');parsed.style.cssText='position:absolute;width:0;height:0;overflow:hidden';doc.body.prepend(parsed);
    doc.querySelectorAll('use').forEach(use=>{for(const name of ['href','xlink:href']){const value=use.getAttribute(name);if(value?.startsWith(path+'#')){const id=value.slice(path.length+1);if(!ids.has(id))throw Error('Captured icon symbol is missing.');use.setAttribute(name,'#'+ids.get(id));}}});
  }
  return '<!doctype html>'+doc.documentElement.outerHTML;
}
