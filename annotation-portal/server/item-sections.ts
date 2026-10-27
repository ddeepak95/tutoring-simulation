import {headingRanges, isCaptureMetadataHeading} from './heading-evidence.ts';
import type {Conversation, ConversationSection} from '../src/types';
import type {EvidenceSegment} from './model-conversation-html.ts';

export function itemSectionRanges(text: string, html = '') {
  const headings = headingRanges(text, html);
  const boundaries = [...new Set([0, ...headings.map(h => h.start), text.length])].sort((a,b) => a-b);
  return boundaries.slice(0,-1).flatMap((start,i) => {
    const end = boundaries[i+1];
    const passage = text.slice(start,end);
    const metadata = [...passage.matchAll(/^.*Agent-explored interactive state state_\d+.*$/gm)]
      .filter(match => isCaptureMetadataHeading(match[0]));
    const pieces: {start:number;end:number}[] = []; let cursor = start;
    for (const match of metadata) { pieces.push({start:cursor,end:start+match.index!}); cursor=start+match.index!+match[0].length; }
    pieces.push({start:cursor,end});
    return pieces.flatMap(piece => {
      const raw=text.slice(piece.start,piece.end);
      const first=piece.start+raw.length-raw.trimStart().length;
      const last=piece.end-(raw.length-raw.trimEnd().length);
      return last>first ? [{start:first,end:last}] : [];
    });
  });
}

export function withItemSections(input: {html:string;segments:EvidenceSegment[]}, conversation:Conversation, html:Record<string,string> = {}, registered?:ConversationSection[]) {
  const escape = (text:string) => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const inventory = conversation.messages.filter(t=>t.speaker==='tutor').flatMap(turn => (registered ? registered.filter(s=>s.turn_id===turn.turn_id) : itemSectionRanges(turn.text,html[turn.turn_id])).map((range,i) => {
    const id=("section_id" in range ? String(range.section_id) : `${turn.turn_id}:section_${i+1}`), quote=turn.text.slice(range.start,range.end);
    input.segments.push({segment_id:id,turn_id:turn.turn_id,...range,block_start:range.start,block_end:range.end,quote,source_text:quote,kind:'section',source_path:null});
    return `<section turn="${escape(turn.turn_id)}" data-evidence-ids="${escape(id)}">${escape(quote)}</section>`;
  }));
  input.html += `<section-inventory>${inventory.join('')}</section-inventory>`;
}
