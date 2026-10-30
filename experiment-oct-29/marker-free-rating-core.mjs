export function validateMarkerFreeRatings(output,conversation,dimensions){
 if(!output||typeof output!=='object'||Array.isArray(output)||Object.keys(output).join(',')!=='ratings'||!Array.isArray(output.ratings))throw Error('Expected only a ratings array');
 const tutorTurns=conversation.messages.filter(turn=>turn.speaker==='tutor');
 if(output.ratings.length!==tutorTurns.length)throw Error('Expected one rating for every tutor turn');
 return output.ratings.map((rating,index)=>{
  const turn=tutorTurns[index];
  if(!rating||typeof rating!=='object'||Array.isArray(rating)||Object.keys(rating).sort().join(',')!=='turn_id,values'||rating.turn_id!==turn.turn_id||!rating.values||typeof rating.values!=='object'||Array.isArray(rating.values))throw Error(`Invalid rating for tutor turn ${index+1}`);
  const expected=dimensions.filter(d=>index===0?!d.subsequent_only:!d.first_only).map(d=>d.key);
  if(expected.length!==8||Object.keys(rating.values).sort().join(',')!==expected.sort().join(','))throw Error(`Wrong rating questions for tutor turn ${index+1}`);
  for(const key of expected){
   const value=rating.values[key];
   const dimension=dimensions.find(item=>item.key===key);
   if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).sort().join(',')!=='reason,score'||!(value.score==='N/A'||Number.isInteger(value.score))||!dimension?.options.includes(String(value.score))||typeof value.reason!=='string'||!value.reason.trim())throw Error(`Invalid ${key} rating for tutor turn ${index+1}`);
  }
  return rating;
 });
}

// Some JSON-mode responses contain the requested ratings array directly.
// Accept the wrapper change only; validation still checks every turn and value.
export function normalizeBareRatingArray(output){
 if(!Array.isArray(output))throw Error('Unexpected rating response shape');
 return {ratings:output};
}

export function normalizeConversationIdRatingWrapper(output,conversationId){
 if(!output||typeof output!=='object'||Array.isArray(output)||Object.keys(output).sort().join(',')!=='conversation_id,ratings'||output.conversation_id!==conversationId||!Array.isArray(output.ratings))throw Error('Unexpected conversation-ID rating wrapper');
 return {ratings:output.ratings};
}

export function parseEscapedJsonObject(raw){
 if(typeof raw!=='string'||!raw.startsWith('{\\n')||!raw.includes('\\"ratings\\"'))throw Error('Unexpected escaped JSON shape');
 const decoded=JSON.parse('"'+raw+'"');
 if(typeof decoded!=='string'||!decoded.startsWith('{')||!decoded.endsWith('}'))throw Error('Unexpected escaped JSON envelope');
 return JSON.parse(decoded);
}

// JSON mode may encode every numeric choice as a string. Convert only exact
// 1–5 score strings; preserve all reasons and leave N/A untouched.
export function normalizeNumericStringScores(output){
 if(!output||typeof output!=='object'||Array.isArray(output)||Object.keys(output).join(',')!=='ratings'||!Array.isArray(output.ratings))throw Error('Unexpected rating response shape');
 return {ratings:output.ratings.map(row=>{
  if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).sort().join(',')!=='turn_id,values'||!row.values||typeof row.values!=='object'||Array.isArray(row.values))throw Error('Unexpected numeric-string rating shape');
  return {turn_id:row.turn_id,values:Object.fromEntries(Object.entries(row.values).map(([key,value])=>{
   if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).sort().join(',')!=='reason,score')throw Error('Unexpected numeric-string rating value');
   const score=typeof value.score==='string'&&/^[1-5]$/.test(value.score)?Number(value.score):value.score;
   return [key,{score,reason:value.reason}];
  }))};
 })};
}

// Gemini sometimes puts the second score and its reason inside `values` while
// placing the remaining six rating objects beside `values`. Accept only that
// exact, unambiguous shape; never infer a missing score or reason.
export function normalizeSplitRatingObjects(output,conversation,dimensions){
 if(!output||typeof output!=='object'||Array.isArray(output)||Object.keys(output).join(',')!=='ratings'||!Array.isArray(output.ratings))throw Error('Unexpected rating response shape');
 const tutorTurns=conversation.messages.filter(turn=>turn.speaker==='tutor');
 if(output.ratings.length!==tutorTurns.length)throw Error('Unexpected tutor-turn count');
 return {ratings:output.ratings.map((rating,index)=>{
  const keys=dimensions.filter(item=>index===0?!item.subsequent_only:!item.first_only).map(item=>item.key);
  const nestedKeys=rating?.values&&typeof rating.values==='object'&&!Array.isArray(rating.values)?Object.keys(rating.values).filter(key=>key!=='reason'):[];
  const [first,second]=nestedKeys;
  const remaining=keys.filter(key=>!nestedKeys.includes(key));
  if(rating?.turn_id!==tutorTurns[index].turn_id||nestedKeys.length!==2||!keys.includes(first)||!keys.includes(second)||typeof rating.values.reason!=='string'||!rating.values.reason.trim()||!rating.values[first]||typeof rating.values[first]!=='object'||!Number.isInteger(rating.values[second])||Object.keys(rating.values).sort().join(',')!==[first,second,'reason'].sort().join(',')||Object.keys(rating).sort().join(',')!==['turn_id','values',...remaining].sort().join(','))throw Error(`Unexpected split rating shape at tutor turn ${index+1}`);
  const values={...Object.fromEntries(remaining.map(key=>[key,rating[key]])),[first]:rating.values[first],[second]:{score:rating.values[second],reason:rating.values.reason}};
  return {turn_id:rating.turn_id,values};
 })};
}
