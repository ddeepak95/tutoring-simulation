import assert from 'node:assert/strict';

const markerKeys=new Set(['section_id','segment_id','section_number','turn_number','grouping_version','source_start','source_end','alignment_status','source_grouping_version','stale_reason']);

/** Copy the stored transcript while dropping translation section-map metadata. */
export function markerFreeTranscript(transcript){
 const result=structuredClone(transcript);
 if(result.translation){
  for(const key of ['alignment','alignment_status','source_grouping_version','stale_reason'])delete result.translation[key];
 }
 function inspect(value){
  if(!value||typeof value!=='object')return;
  if(Array.isArray(value)){value.forEach(inspect);return;}
  for(const [key,child] of Object.entries(value)){
   if(markerKeys.has(key))throw Error(`Marker metadata remains in transcript: ${key}`);
   inspect(child);
  }
 }
 inspect(result);
 assert.deepEqual(result.messages,transcript.messages,'Version must preserve every source turn exactly');
 return result;
}
