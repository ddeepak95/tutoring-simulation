export function validateMarkerFreeOutput(output,conversation,keys){
 if(!output||typeof output!=='object'||Array.isArray(output)||Object.keys(output).length!==1||!Array.isArray(output.annotations))throw Error('Expected only an annotations array');
 const allowed=new Set(keys),turns=new Map(conversation.messages.filter(turn=>turn.speaker==='tutor').map(turn=>[turn.turn_id,turn]));
 const seen=new Set(),counts=Object.fromEntries(keys.map(key=>[key,0]));
 const annotations=output.annotations.map((item,index)=>{
  if(!item||typeof item!=='object'||Array.isArray(item)||Object.keys(item).sort().join(',')!=='feature,occurrence,quote,reason,turn_id'||!allowed.has(item.feature)||!turns.has(item.turn_id)||typeof item.quote!=='string'||!item.quote.trim()||!Number.isInteger(item.occurrence)||item.occurrence<1)throw Error(`Invalid occurrence at ${index}`);
  if(item.feature==='bot_errors_hallucinations'?typeof item.reason!=='string'||!item.reason.trim():item.reason!==null)throw Error(`Invalid reason at ${index}`);
  const source=turns.get(item.turn_id).text;
  let start=-1;
  for(let n=0;n<item.occurrence;n++){start=source.indexOf(item.quote,start+1);if(start<0)throw Error(`Quote does not match tutor turn at ${index}`);}
  const identity=`${item.feature}:${item.turn_id}:${start}:${start+item.quote.length}`;
  if(seen.has(identity))throw Error(`Duplicate occurrence at ${index}`);
  seen.add(identity);counts[item.feature]++;
  return {...item,start,end:start+item.quote.length};
 });
 return {annotations,counts};
}
