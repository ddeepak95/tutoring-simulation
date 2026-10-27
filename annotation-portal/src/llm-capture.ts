import {mapCapturedArticle} from './captured-sections';
import {renderHtmlDocument} from './html-renderer';
import {htmlSections} from './html-conversation';
import {translateCapturedLayout} from './translated-capture-layout';
import {normalizeCapturedSpeakerLabels} from './captured-speaker-labels';
import type {Conversation, ConversationSection} from './types';

/** Run inside the capture frame, before any labeling controls are installed. */
export function prepareLLMTurn(doc:Document, conversation:Conversation, sections:ConversationSection[], assets:Record<string,string>, turnId:string) {
  if(conversation.html_content){
    const pkg=conversation.html_content;
    const expected=htmlSections(pkg).filter(s=>s.turn_id===turnId);
    if(JSON.stringify(expected.map(s=>s.section_id))!==JSON.stringify(sections.filter(s=>s.turn_id===turnId).map(s=>s.section_id)))throw Error('HTML sections differ from the registered inventory.');
    const rendered=new DOMParser().parseFromString(renderHtmlDocument(pkg,{supportingViews:true,turnId}),'text/html');
    doc.head.append(...doc.importNode(rendered.head,true).childNodes);doc.body.replaceChildren(...doc.importNode(rendered.body,true).childNodes);
    return expected.map(s=>({section_id:s.section_id,name:`Turn ${s.turn_number} - Section ${s.section_number}`,heading:s.heading}));
  }
  translateCapturedLayout(doc,conversation);
  normalizeCapturedSpeakerLabels(doc,conversation);
  const turn=conversation.messages.find(t=>t.turn_id===turnId&&t.speaker==='tutor');
  if(!turn)throw new Error('Unknown tutor turn.');
  const articles=[...doc.querySelectorAll<HTMLElement>('article')].filter(a=>a.classList.contains('capture-message')||a.dataset.turnId);
  const article=articles.find(a=>a.dataset.turnId===turnId)||articles[conversation.messages.findIndex(t=>t.turn_id===turnId)];
  if(!article)throw new Error(`No captured article for ${turnId}.`);
  articles.filter(a=>a!==article).forEach(a=>a.remove());
  const expected=sections.filter(s=>s.turn_id===turnId);
  if(/(?:^|\n)Agent-explored interactive state /u.test(turn.text)&&!expected.some(s=>s.states?.length))throw Error('Register interactive state ownership before generating turn images.');
  const headings=conversation.translation?conversation.translation.alignment?.filter(a=>a.turn_id===turnId&&a.kind==='heading'):undefined;
  let mapped=mapCapturedArticle(article,turn.text,assets[turnId],headings);
  // The primary section inventory must match the visible conversation. State
  // views are attached below to their persisted owner, never given section IDs.
  if(mapped.length!==expected.length&&assets[turnId]){
    article.innerHTML=assets[turnId];mapped=mapCapturedArticle(article,turn.text,assets[turnId],headings);
  }
  if(mapped.length!==expected.length||mapped.some((m,i)=>!m.offsets||m.offsets.start!==expected[i].start||m.offsets.end!==expected[i].end))throw new Error(`Captured sections do not match the permanent registry for ${turnId}: rendered ${JSON.stringify(mapped.map(m=>m.offsets))}; registered ${JSON.stringify(expected.map(s=>({start:s.start,end:s.end})))}.`);
  const inventory=mapped.map((m,i)=>{
    const fragment=m.range.cloneContents();
    const box=doc.createElement('section');box.className='llm-source-section';
    const caption=doc.createElement('div');caption.className='llm-section-metadata';
    const s=expected[i],name=`Turn ${s.turn_number} - Section ${s.section_number}`;
    const heading=fragment.querySelector('h1,h2,h3,h4,h5,h6,p strong,p b')?.textContent?.trim()||null;
    caption.textContent=`SECTION METADATA: ${s.section_id} | ${name}`;
    box.append(caption,fragment);
    if(s.states?.length){
      const source=new DOMParser().parseFromString(assets[turnId]||'','text/html');
      for(const state of [...s.states].sort((a,b)=>a.start-b.start)){
        const node=source.querySelector<HTMLElement>(`[data-capture-derived-state="${state.state_key}"]`);
        if(!node)throw Error(`Missing supporting view ${state.state_key} for ${s.section_id}.`);
        const support=doc.createElement('div');support.className='llm-supporting-state';
        const label=doc.createElement('div');label.className='llm-section-metadata';
        label.textContent=`SUPPORTING VIEW OF ${s.section_id}: same interactive content, not an additional section or quiz`;
        const copy=node.cloneNode(true) as HTMLElement;
        copy.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>{if(/^Agent-explored interactive state /u.test(h.textContent||''))h.remove();});
        support.append(label,copy);box.append(support);
      }
    }
    return {box,section_id:s.section_id,name,heading};
  });
  article.replaceChildren(...inventory.map(s=>s.box));article.dataset.llmTurn=turnId;
  const style=doc.createElement('style');style.textContent=`html,body{margin:0!important;background:white!important;color-scheme:light}*{animation:none!important;transition:none!important}article[data-llm-turn]{box-sizing:border-box!important;width:100%!important;max-width:1200px!important;margin:0 auto!important;padding:20px!important}.llm-source-section{border:1px dashed #777;padding:12px;margin:0 0 16px;display:flow-root}.llm-section-metadata{font:12px/1.5 monospace;color:#444;margin-bottom:12px}.capture-speaker{display:none!important}`;
  doc.head.append(style);
  return inventory.map(({box:_box,...s})=>s);
}
