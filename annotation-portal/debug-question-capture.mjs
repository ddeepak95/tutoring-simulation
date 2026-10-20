import fs from 'node:fs';
import {modelConversationHtml} from './server/model-conversation-html.ts';
const c=JSON.parse(fs.readFileSync('../agentic_conversation_capture/outputs/brain/en/20261020T135036Z/brain-en.capture.json','utf8'));
const t=c.turns.find(x=>x.turn_id==='turn_0002');
const conversation={conversation_id:'x',learning_topic:c.topic,label:c.title,messages:c.turns};
const x=modelConversationHtml(conversation,Object.fromEntries(c.turns.map(t=>[t.turn_id,t.html])));
const q='Which lobe is especially important for visual processing?';let p=-1;
while((p=t.text.indexOf(q,p+1))>=0){const matching=x.segments.filter(s=>s.turn_id===t.turn_id&&s.kind!=='heading'&&p>=s.block_start&&p+q.length<=s.block_end);console.log(JSON.stringify({pos:p,blocks:[...new Set(matching.map(s=>s.block_start))],max:Math.max(-1,...matching.map(s=>s.block_start)),items:matching.slice(0,4).map(s=>({id:s.segment_id,start:s.start,end:s.end,bs:s.block_start,be:s.block_end,quote:s.quote}))}));}
