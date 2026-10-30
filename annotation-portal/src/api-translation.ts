import type { Conversation, ConversationSection } from './types';

export const translationAlignmentStale=(conversation:Conversation)=>conversation.translation?.alignment_status==='stale';
export const canCompareApiTranslation=(conversation:Conversation)=>!translationAlignmentStale(conversation)&&conversation.access_type==='API'&&(conversation.translation?.version==='api-english/1'||(!conversation.translation&&!/^(en|english)$/i.test(conversation.original_language||'')));
export const canViewApiTranslation=(conversation:Conversation)=>!translationAlignmentStale(conversation)&&conversation.access_type==='API'&&(['api-english/1','api-english-whole/1'].includes(conversation.translation?.version||'')||(!conversation.translation&&!/^(en|english)$/i.test(conversation.original_language||'')));

export interface AlignedTurn {
  turnId: string;
  speaker: 'student' | 'tutor';
  turnNumber: number;
  passages: { id: string; label: string; original: string; english: string }[];
}

/** Pair whole turns for the marker-free version; no section inventory is read. */
export function pairedApiTurns(source: Conversation, english: Conversation): AlignedTurn[] {
  if(english.source_conversation_id!==source.conversation_id||source.messages.length!==english.messages.length)throw Error('The English translation has no matching turns.');
  let turnNumber=0;
  return source.messages.map((turn,index)=>{
    const target=english.messages[index];
    if(target.turn_id!==turn.turn_id||target.speaker!==turn.speaker)throw Error('Translation turn identities do not match.');
    if(turn.speaker==='tutor')turnNumber++;
    const label=turn.speaker==='student'?'You':`Turn ${turnNumber}`;
    return {turnId:turn.turn_id,speaker:turn.speaker,turnNumber,passages:[{id:turn.turn_id,label,original:turn.text,english:target.text}]};
  });
}

/** Pair registered source sections by identity, never by English headings. */
export function alignedApiTurns(source: Conversation, english: Conversation, sections: ConversationSection[]): AlignedTurn[] {
  const translation = english.translation;
  if(translationAlignmentStale(english))throw Error('Section grouping has changed. Retranslation is needed before comparing these conversations.');
  if (translation?.version === 'api-english-whole/1') {
    return pairedApiTurns(source,english);
  }
  if (translation?.version !== 'api-english/1' || english.source_conversation_id !== source.conversation_id || !translation.alignment?.length) throw Error('The English translation has no matching section map.');
  if (source.messages.length !== english.messages.length || !sections.length) throw Error('The original and English inventories do not match.');
  const alignment = translation.alignment;
  if (alignment.length !== sections.length || new Set(alignment.map(a => a.segment_id)).size !== alignment.length) throw Error('The English section map is incomplete.');
  let turnNumber = 0;
  return source.messages.map((turn, index) => {
    const target = english.messages[index];
    if (target.turn_id !== turn.turn_id || target.speaker !== turn.speaker) throw Error('Translation turn identities do not match.');
    if (turn.speaker === 'student') return { turnId: turn.turn_id, speaker: turn.speaker, turnNumber, passages: [{ id: turn.turn_id, label: 'You', original: turn.text, english: target.text }] };
    turnNumber++;
    const ranges = sections.filter(s => s.turn_id === turn.turn_id).sort((a, b) => a.section_number - b.section_number);
    if (!ranges.length) throw Error('A tutor turn has no saved sections.');
    let previous = 0;
    const passages = ranges.map(section => {
      const mapped = alignment.find(a => a.segment_id === section.section_id && a.turn_id === turn.turn_id);
      if (!mapped || mapped.source_start !== section.start || mapped.source_end !== section.end || mapped.start < previous || mapped.end <= mapped.start || mapped.end > target.text.length || target.text.slice(previous,mapped.start).trim() || !target.text.slice(mapped.start,mapped.end).trim() || turn.text.slice(section.start, section.end) !== section.quote) throw Error('The English section map differs from the saved original.');
      previous = mapped.end;
      return { id: section.section_id, label: `Turn ${turnNumber} - Section ${section.section_number}`, original: section.quote, english: target.text.slice(mapped.start, mapped.end) };
    });
    if(target.text.slice(previous).trim())throw Error('The English section map leaves unpaired text.');
    return { turnId: turn.turn_id, speaker: turn.speaker, turnNumber, passages };
  });
}
