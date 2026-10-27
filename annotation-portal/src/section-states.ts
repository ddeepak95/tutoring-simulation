import {mapCapturedArticle} from './captured-sections';
import type {Conversation,ConversationSection,ConversationSectionState} from './types';

export const stateMarker=/^Agent-explored interactive state (state_\d+) \(capture action, not a learner response\):?[\t ]*\r?$/gm;
export function stateRanges(text:string) {
 const markers=[...text.matchAll(stateMarker)];
 return markers.map((m,i)=>{const from=m.index!+m[0].length,to=markers[i+1]?.index??text.length,value=text.slice(from,to);return {state_key:m[1],start:from+value.length-value.trimStart().length,end:to-(value.length-value.trimEnd().length)};});
}
export function primarySource(text:string){const first=[...text.matchAll(stateMarker)][0];return first?text.slice(0,first.index).trimEnd():text;}

/** Ownership follows capture controls, never similarity of question wording. */
export function deriveSectionStates(conversation:Conversation,sections:ConversationSection[],assets:Record<string,string>):ConversationSectionState[] {
 return conversation.messages.flatMap(turn=>{
  const ranges=stateRanges(turn.text);if(!ranges.length)return [];
  if(!assets[turn.turn_id])throw Error(`Captured state ownership needs the original turn asset for ${turn.turn_id}.`);
  const doc=new DOMParser().parseFromString(assets[turn.turn_id],'text/html');
  const article=doc.createElement('article');article.append(...doc.body.childNodes);doc.body.append(article);
  const states=[...article.querySelectorAll<HTMLElement>('[data-capture-derived-state]')];
  states.forEach(s=>s.remove());
  const mapped=mapCapturedArticle(article,primarySource(turn.text));
  if(mapped.some(s=>!s.offsets))throw Error(`Cannot map the original interactive sections in ${turn.turn_id}.`);
  const roots=mapped.map(m=>{const registered=sections.find(s=>s.turn_id===turn.turn_id&&s.start===m.offsets!.start&&s.end===m.offsets!.end);if(!registered)throw Error('Original section is absent from the permanent registry.');return {registered,range:m.range};});
  const controls=[...article.querySelectorAll<HTMLElement>('[data-capture-agent-control]')];
  return ranges.map(r=>{
   const state=states.find(s=>s.dataset.captureDerivedState===r.state_key);
   if(!state)throw Error(`Captured HTML is missing ${r.state_key} in ${turn.turn_id}.`);
   const control=state.dataset.captureOwnerControl;
   const candidates=controls.filter(el=>control===undefined||el.dataset.captureAgentControl===control);
   const owners=roots.filter(root=>candidates.some(el=>root.range.intersectsNode(el)));
   if(owners.length!==1)throw Error(`Ambiguous owner for ${turn.turn_id}/${r.state_key}; capture its originating control instead of assigning a new section.`);
   const owner=owners[0].registered;
   return {conversation_id:owner.conversation_id,turn_id:turn.turn_id,section_id:owner.section_id,...r,legacy_section_ids:sections.filter(s=>s.turn_id===turn.turn_id&&s.start>=r.start&&s.end<=r.end).map(s=>s.section_id)};
  });
 });
}
