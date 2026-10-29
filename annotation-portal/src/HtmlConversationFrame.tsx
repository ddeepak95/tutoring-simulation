import {useEffect,useMemo,useRef,useState} from 'react';
import type {Annotation,Feature} from './types';
import {htmlSections,type HtmlConversation} from './html-conversation';
import {renderHtmlDocument,componentStateHtml} from './html-renderer';
import {createSectionItemBadges} from './SectionItemBadges';
import badgeStyles from './section-item-badges.css?inline';

export function HtmlConversationFrame({pkg,annotations,rubric,selectedId,onSelect,visibleTurnIds,readonly=false}:{pkg:HtmlConversation;annotations:Annotation[];rubric:Feature[];selectedId?:string;onSelect?:(id:string)=>void;visibleTurnIds?:string[];readonly?:boolean}) {
  const frame=useRef<HTMLIFrameElement>(null),[ready,setReady]=useState(false),[error,setError]=useState('');
  const html=useMemo(()=>renderHtmlDocument(pkg),[pkg]);
  const current=useRef({annotations,rubric,selectedId,onSelect,visibleTurnIds,readonly});current.current={annotations,rubric,selectedId,onSelect,visibleTurnIds,readonly};
  useEffect(()=>{
    const iframe=frame.current;if(!iframe)return;setReady(false);setError('');let cleanup=()=>{},alive=true,installed:Document|null=null;
    const load=()=>{
      const doc=iframe.contentDocument;if(!doc?.querySelector('.html-conversation'))return;
      if(installed===doc)return;cleanup();installed=doc;
      const style=doc.createElement('style');style.textContent=badgeStyles;doc.head.append(style);
      const select=(id:string)=>{if(!current.current.readonly)current.current.onSelect?.(id);};
      for(const s of htmlSections(pkg)){
        const box=doc.querySelector<HTMLElement>(`[data-section-id="${s.section_id}"]`);if(!box)continue;
        const name=`Turn ${s.turn_number} - Section ${s.section_number}`;
        const top=doc.createElement('button');top.className='html-section-caption';top.textContent=name;top.onclick=()=>select(s.section_id);
        const footer=doc.createElement('div');footer.className='html-section-footer';
        const bottom=doc.createElement('button');bottom.className='html-section-button';bottom.textContent=name;bottom.onclick=()=>select(s.section_id);footer.append(bottom);box.append(top,footer);
      }
      const click=(event:MouseEvent)=>{
        const target=event.target as Element,control=target.closest<HTMLElement>('[data-capture-agent-control]'),container=control?.closest<HTMLElement>('[data-component-id]');
        if(!control||!container)return;
        const component=htmlSections(pkg).flatMap(s=>s.components).find(c=>c.component_id===container.dataset.componentId);
        const edge=component?.transitions.find(e=>e.from===container.dataset.stateId&&e.control_id===control.dataset.captureAgentControl);
        event.preventDefault();if(!component||!edge)return;container.innerHTML=componentStateHtml(component,edge.to,new Set(pkg.assets.flatMap(a=>[a.file,'./'+a.file])),pkg.svg_sprites);container.dataset.stateId=edge.to;
      };
      const selection=()=>{
        if(current.current.readonly)return;
        const value=doc.getSelection();if(!value||value.isCollapsed||!value.anchorNode||!value.focusNode)return;
        const element=(n:Node)=>n.nodeType===Node.ELEMENT_NODE?n as Element:n.parentElement;
        const start=element(value.anchorNode)?.closest<HTMLElement>('[data-section-id]'),end=element(value.focusNode)?.closest<HTMLElement>('[data-section-id]');
        if(!start||start!==end){value.removeAllRanges();return;}select(start.dataset.sectionId!);value.removeAllRanges();
      };
      doc.addEventListener('click',click);doc.addEventListener('mouseup',selection);
      const resize=new ResizeObserver(()=>{iframe.style.height=`${doc.documentElement.scrollHeight}px`;});resize.observe(doc.body);
      cleanup=()=>{doc.removeEventListener('click',click);doc.removeEventListener('mouseup',selection);resize.disconnect();};
      void Promise.all([doc.fonts.ready,...[...doc.images].map(image=>image.decode())]).then(()=>{if(alive&&iframe.contentDocument===doc){refresh();setReady(true);}}).catch(()=>{if(alive)setError('A captured image or font could not load. Check the saved assets and reload.');});
    };
    const refresh=()=>{const doc=iframe.contentDocument;if(!doc)return;const state=current.current;
      doc.querySelectorAll<HTMLElement>('[data-section-id]').forEach(box=>{const id=box.dataset.sectionId!;box.classList.toggle('is-selected',id===state.selectedId);const footer=box.querySelector('.html-section-footer');footer?.querySelector('.section-item-badges')?.remove();const badges=createSectionItemBadges(doc,state.annotations.filter(a=>a.section_id===id),state.rubric,()=>current.current.onSelect?.(id));if(badges)footer?.append(badges);});
      doc.querySelectorAll<HTMLButtonElement>('.html-section-caption,.html-section-button').forEach(button=>button.disabled=state.readonly);
      doc.querySelectorAll<HTMLElement>('article[data-turn-id]').forEach(article=>article.hidden=!!state.visibleTurnIds&&!state.visibleTurnIds.includes(article.dataset.turnId!));
    };
    iframe.addEventListener('load',load);if(iframe.contentDocument?.querySelector('.html-conversation'))load();
    const update=()=>refresh();iframe.addEventListener('html-labels-changed',update);
    return()=>{alive=false;iframe.removeEventListener('load',load);iframe.removeEventListener('html-labels-changed',update);cleanup();};
  },[html,pkg]);
  useEffect(()=>{frame.current?.dispatchEvent(new Event('html-labels-changed'));},[annotations,rubric,selectedId,readonly,visibleTurnIds?.join('|')]);
  return <div className="exact-capture"><iframe ref={frame} title="Captured HTML conversation" sandbox="allow-same-origin" srcDoc={html} style={{visibility:ready?'visible':'hidden',width:'100%',border:0}} aria-busy={!ready}/>{error?<p role="alert">{error}</p>:!ready&&<div className="capture-layout-loading" role="status">Loading captured conversation...</div>}</div>;
}
