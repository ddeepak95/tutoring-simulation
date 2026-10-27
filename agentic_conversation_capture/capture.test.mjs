import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {parseArguments,pendingCaptures,findSavedDraft} from './capture.mjs';

test('single command defaults to one conversation and accepts explicit batch limits',()=>{
 assert.equal(parseArguments([]).limit,1);assert.equal(parseArguments(['--remaining']).limit,Infinity);
 assert.deepEqual(parseArguments(['--remaining','--limit','2','--resume','--lang','ta']),{limit:2,list:false,decisions:false,repairDraft:true,lang:'ta'});
 assert.equal(parseArguments([]).repairDraft,true);assert.equal(parseArguments(['--no-repair-draft']).repairDraft,false);
 for(const args of [['--limit','0'],['--limit','x'],['--topic'],['--generate']])assert.throws(()=>parseArguments(args));
});
test('queue follows topic/language order and excludes every existing imported pair',()=>{
 const topics=[{'topic-id':'metals',en:{title:'Metals',prompts:['one']},ta:{title:'Tamil',prompts:['one']}},{'topic-id':'brain',en:{title:'Brain',prompts:['one']}}],languages={en:{},ta:{}};
 assert.deepEqual(pendingCaptures(topics,languages,[{topic_id:'metals',language:'en'}]).map(j=>j.topic+'/'+j.language),['metals/ta','brain/en']);
 assert.equal(pendingCaptures(topics,languages,[],{topic:'metals',lang:'ta'}).length,1);assert.throws(()=>pendingCaptures(topics,languages,[],{topic:'unknown'}));
});
test('recovery chooses the latest complete saved graph, ignoring partial responses and generated output folders',async()=>{
 const outputs=await mkdtemp(path.join(os.tmpdir(),'capture-queue-'));
 try{
  const job={topic:'metals',language:'ta',prompts:3},graph=count=>({formatVersion:'agent-interactions/1',messages:Array.from({length:count},()=>({initial:'s0',states:[{id:'s0',section_layout:{sections:[{section_id:'t1s1'}]}}]}))});
  for(const [folder,count] of [['20261025T010000Z',3],['20261026T010000Z',3],['20261027T010000Z',2],['image-focused-recovery',3]]){const directory=path.join(outputs,'metals','ta',folder);await mkdir(directory,{recursive:true});await writeFile(path.join(directory,'metals-ta.agent-states.json'),JSON.stringify(graph(count)));}
  assert.match(await findSavedDraft(outputs,job),/20261026T010000Z/);assert.equal(await findSavedDraft(outputs,{...job,language:'en'}),null);
 }finally{await rm(outputs,{recursive:true,force:true});}
});
