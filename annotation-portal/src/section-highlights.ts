import type {Annotation,Evidence} from './types';
export interface SectionHighlight {quote:string;occurrence:number}

/** Quotes are anchored within the owning section, never searched across turns. */
export function resolveSectionHighlights(section:Evidence,highlights:SectionHighlight[]):Evidence[]{
 if(!Array.isArray(highlights)||!highlights.length||highlights.length>1000)throw Error('Provide one or more section highlights.');
 const seen=new Set<string>();
 return highlights.map(h=>{
  if(!h||Object.keys(h).some(k=>!['quote','occurrence'].includes(k))||typeof h.quote!=='string'||!h.quote.trim()||h.quote.length>500||!Number.isInteger(h.occurrence)||h.occurrence<1)throw Error('Invalid section highlight quote or occurrence.');
  let found=-1,from=0;
  for(let n=0;n<h.occurrence;n++){found=section.quote.indexOf(h.quote,from);if(found<0)throw Error('Highlight quote or occurrence does not exist in its owning section.');from=found+1;}
  const key=`${found}:${found+h.quote.length}`;if(seen.has(key))throw Error('Duplicate occurrence highlight.');seen.add(key);
  return {turn_id:section.turn_id,start:section.start+found,end:section.start+found+h.quote.length,quote:h.quote,occurrence:h.occurrence};
 });
}
export function annotationHighlightEvidence(annotation:Annotation):Evidence[]{
 if(!annotation.highlights?.length||!annotation.section_id||!annotation.evidence[0])return [];
 return resolveSectionHighlights(annotation.evidence[0],annotation.highlights);
}
