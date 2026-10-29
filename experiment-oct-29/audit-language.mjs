import fs from 'node:fs';
import path from 'node:path';
import {runRoot} from './config.mjs';

const scripts={th:'Thai',ta:'Tamil',zh:'Han',hi:'Devanagari',bn:'Bengali',kn:'Kannada'};

export function switchedTutorTurns(conversation){
 const script=scripts[conversation.language];
 if(!script)return [];
 return conversation.messages.filter(turn=>turn.speaker==='tutor').flatMap(turn=>{
  const letters=[...turn.text.matchAll(/\p{L}/gu)].length;
  const expected=[...turn.text.matchAll(new RegExp(`\\p{Script=${script}}`,'gu'))].length;
  if(letters<50||expected/letters>=0.2)return [];
  return [{turn_id:turn.turn_id,letters,expected_script_letters:expected,expected_script_fraction:Number((expected/letters).toFixed(3))}];
 });
}

if(process.argv[1]&&path.resolve(process.argv[1])===import.meta.filename){
 const manifest=JSON.parse(fs.readFileSync(path.join(runRoot,'manifest.json'),'utf8'));
 const flags=manifest.items.filter(item=>item.id&&item.language!=='en').flatMap(item=>{
  const artifact=JSON.parse(fs.readFileSync(path.join(runRoot,item.file),'utf8'));
  const turns=switchedTutorTurns(artifact.conversation);
  return turns.length?[{conversation_id:item.id,topic:item.topic,model:item.model,language:item.language,attempt:item.attempt,turns}]:[];
 });
 const report={audited_at:new Date().toISOString(),source_conversations:manifest.items.filter(item=>item.id&&item.language!=='en').length,flagged_conversations:flags.length,flags};
 fs.writeFileSync(path.join(runRoot,'language-switches.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({source_conversations:report.source_conversations,flagged_conversations:flags.length}));
}
