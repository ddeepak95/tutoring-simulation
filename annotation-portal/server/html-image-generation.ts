import fs from 'node:fs';
import path from 'node:path';
// The local capture command and Admin endpoint use the same screenshot pipeline.
// @ts-ignore Node script is shared with the local CLI.
import {renderLLMTurns} from '../scripts/render-llm-turns.mjs';
import {generateImageBaseline,type ImageCheckpoint} from './image-labeling';
import type {Conversation,ConversationSection,RubricSnapshot} from '../src/types';

export async function generateHtmlImageBaseline({conversation,sections,rubric,requestId,apiKey,origin,checkpoint,onCheckpoint,fetcher}:{conversation:Conversation;sections:ConversationSection[];rubric:RubricSnapshot;requestId:string;apiKey:string;origin:string;checkpoint?:ImageCheckpoint;onCheckpoint:(state:ImageCheckpoint)=>Promise<void>;fetcher:typeof fetch}) {
 const folder=path.resolve('.runtime/llm-baselines/admin-images',requestId);fs.mkdirSync(folder,{recursive:true});
 const manifest=path.join(folder,'images/manifest.json');
 const turns=fs.existsSync(manifest)?JSON.parse(fs.readFileSync(manifest,'utf8')).turns:await renderLLMTurns({conversation,sections,assets:{},folder:path.join(folder,'images'),origin});
 for(const turn of turns)for(const tile of turn.tiles)tile.data=fs.readFileSync(tile.file).toString('base64');
 return generateImageBaseline({conversation,sections,rubric,turns,requestId,apiKey,checkpoint,onCheckpoint,config:{model:'gemini-4-argon',timeout:600,reasoning:{effort:'medium',exclude:true},max_tokens:32768},fetcher,
 onExchange:(turn,attempt,kind,data)=>{const dir=path.join(folder,turn);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,`${attempt}-${kind}.json`),JSON.stringify(data,null,2)+'\n');}});
}
