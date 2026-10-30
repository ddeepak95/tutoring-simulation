import test from 'node:test';
import assert from 'node:assert/strict';
import {markerFreeTranscript} from './marker-free-core.mjs';

test('marker-free version preserves original turns while removing translation section map',()=>{
 const source={conversation_id:'source',messages:[{turn_id:'t1',speaker:'tutor',text:'## Actual heading\n\nThe source text remains exact.'}],translation:{version:'api-english/1',model:'gemini',sha256:'abc',alignment:[{segment_id:'t1s1',turn_id:'t1',start:0,end:18,source_start:0,source_end:20}],alignment_status:'current',source_grouping_version:'conversation-sections/2'}};
 const version=markerFreeTranscript(source);
 assert.deepEqual(version.messages,source.messages);
 assert.deepEqual(version.translation,{version:'api-english/1',model:'gemini',sha256:'abc'});
 assert.ok(source.translation.alignment);
 assert.throws(()=>markerFreeTranscript({...source,section_id:'t1s1'}),/Marker metadata/);
});
