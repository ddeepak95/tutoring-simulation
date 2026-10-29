import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {languages,models,newLanguages,runRoot,selectedTopics,translationModel,tries} from './config.mjs';
import {translateCaptureToEnglish} from '../agentic_conversation_capture/translate-english.mjs';
import {numberSequences,numbersEquivalent} from '../agentic_conversation_capture/numeric-text.mjs';
import {switchedTutorTurns} from './audit-language.mjs';
import {wholeTranslationRequest,assembleWholeTranslation,parseGeminiJson} from './translate-whole.mjs';
import {sectionCandidates} from '../annotation-portal/src/section-registry.ts';

const read=file=>JSON.parse(fs.readFileSync(path.join(runRoot,file),'utf8'));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');

test('whole translation sends one conversation request and preserves turn identity without section mapping',()=>{
 const source={conversation_id:'source',language:'ta',original_language:'ta',topic_id:'brain',topic_english_name:'Brain',provider:'model',messages:[
  {turn_id:'s1',speaker:'student',text:'student source'},
  {turn_id:'t1',speaker:'tutor',text:'tutor source'},
 ]};
 const request=wholeTranslationRequest(source);
 const input=JSON.parse(request.body.contents[0].parts[0].text);
 assert.equal(input.messages.length,2);
 assert.equal(request.model,translationModel);
 const translated=assembleWholeTranslation(source,{title:'Brain',turns:[{turn_id:'s1',text:'Student question'},{turn_id:'t1',text:'Tutor answer'}]},{id:'translation',model:translationModel,generatedAt:'now'});
 assert.equal(translated.messages[1].text,'Tutor answer');
 assert.equal(translated.translation.version,'api-english-whole/1');
 assert.equal(translated.translation.alignment,undefined);
 const alternate=assembleWholeTranslation(source,{title:'Brain',messages:[{turn_id:'s1',speaker:'student',text:'Student question'},{turn_id:'t1',speaker:'tutor',text:'Tutor answer'}]},{id:'translation',model:translationModel,generatedAt:'now'});
 assert.equal(alternate.messages[1].text,'Tutor answer');
 assert.throws(()=>assembleWholeTranslation(source,{title:'Brain',turns:[{turn_id:'s1',text:'Question'},{turn_id:'wrong',text:'Answer'}]},{id:'translation',model:translationModel,generatedAt:'now'}));
});

test('whole translation reads Gemini math backslashes without another API call',()=>{
 assert.deepEqual(parseGeminiJson('{"text":"Value is \\(x\\) and \\[y\\]"}'),{text:'Value is \\(x\\) and \\[y\\]'});
});

test('run catalog has three complete prompts for every topic and language',()=>{
 const topics=read('topics.json');
 assert.deepEqual(topics.map(topic=>topic['topic-id']),selectedTopics);
 for(const topic of topics)for(const language of languages){
  const item=topic[language];
  assert.ok(item?.title?.trim(),`${topic['topic-id']}/${language} title`);
  assert.equal(item.prompts?.length,3,`${topic['topic-id']}/${language} prompts`);
  assert.ok(item.prompts.every(prompt=>typeof prompt==='string'&&prompt.trim()));
  assert.equal(new Set(item.prompts).size,3);
 }
});

test('manifest freezes the model/language matrix and archive copies',()=>{
 const manifest=read('manifest.json');
 assert.deepEqual(manifest.topics,selectedTopics);
 assert.deepEqual(manifest.models,models);
 assert.deepEqual(manifest.languages,languages);
 assert.equal(manifest.translation_model,translationModel);
 assert.equal(manifest.tries,tries);
 assert.equal(manifest.items.length,882);
 assert.equal(manifest.items.filter(item=>item.origin==='reused').length,252);
 assert.equal(manifest.items.filter(item=>item.origin==='new').length,630);
 assert.equal(new Set(manifest.items.map(item=>JSON.stringify([item.topic,item.model,item.language,item.attempt]))).size,882);
 for(const item of manifest.items.filter(item=>item.origin==='reused')){
  const bytes=fs.readFileSync(path.join(runRoot,item.file));
  assert.equal(hash(bytes),item.sha256,`reused copy ${item.id}`);
  const source=JSON.parse(bytes).conversation;
  assert.equal(source.conversation_id,item.id);
  assert.equal(source.provider,item.model);
  assert.equal(source.language,item.language);
  assert.equal(source.api_source.system_prompt,manifest.tutor_system_prompt);
 }
});

test('all new language prompts came from direct Gemini',()=>{
 for(const topic of selectedTopics)for(const language of newLanguages){
  const record=read(`prompt-translations/${topic}.${language}.json`);
  assert.equal(record.model,translationModel);
  assert.ok(record.request.systemInstruction);
  assert.ok(record.response.candidates?.length);
  assert.equal(record.localized.prompts.length,3);
 }
});

test('API translation splits a misaligned batch and checkpoints complete passages',async()=>{
 const passages=[1,2,3,4].map(n=>({id:`p${n}`,text:`passage ${n}`}));
 const checkpoints=[];let calls=0;
 const fetcher=async(_url,init)=>{
  calls++;
  const inputs=JSON.parse(JSON.parse(init.body).contents[0].parts[0].text);
  const output=inputs.length>2?['too few']:inputs.map(text=>text.replace('passage','translated passage'));
  return {ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(output)}]}}]})};
 };
 const result=await translateCaptureToEnglish({format_version:'api-section-translation/1',passages},{apiKey:'test',model:translationModel,fetcher,onCheckpoint:async progress=>checkpoints.push(structuredClone(progress))});
 assert.deepEqual(result.passages.map(p=>p.text),['translated passage 1','translated passage 2','translated passage 3','translated passage 4']);
 assert.equal(calls,5);
 assert.equal(Object.keys(checkpoints.at(-1).passages).length,4);
});

test('API translation rechecks old passage checkpoints after validation changes',async()=>{
 const passage={id:'p1',text:'## 情形二：并联电路'};
 let calls=0;
 const fetcher=async()=>{calls++;return {ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(['## Case 2: Parallel Circuit'])}]}}]})};};
 const result=await translateCaptureToEnglish({format_version:'api-section-translation/1',passages:[passage]},{apiKey:'test',model:translationModel,fetcher,checkpoint:{passages:{p1:'## Case 3: Parallel Circuit'}}});
 assert.equal(calls,1);
 assert.equal(result.passages[0].text,'## Case 2: Parallel Circuit');
});

test('numeric alignment accepts equivalent decimal digits across scripts',()=>{
 assert.deepEqual(numberSequences('১. २. ๓. ೪. ௫. 6.'),['1','2','3','4','5','6']);
 assert.deepEqual(numberSequences('V_১ + R_2 = ১২.৫'),numberSequences('V_1 + R_2 = 12.5'));
 assert.ok(numbersEquivalent('เหตุผล 2 ชั้น: 1, 2, 12','Two-fold reason: 12, 2, 1'));
 assert.ok(numbersEquivalent('9 V ÷ 3 A = 3 Ω','3 A under 9 V gives 3 Ω'));
 assert.ok(!numbersEquivalent('9 V ÷ 3 A = 3 Ω','3 A under 8 V gives 3 Ω'));
 assert.ok(numbersEquivalent('8600 கோடி நியூரான்கள்','86 billion neurons'));
 assert.ok(numbersEquivalent('8600 কোটি নিউরন','86 billion neurons'));
 assert.ok(!numbersEquivalent('8600 கோடி நியூரான்கள்','68 billion neurons'));
 assert.ok(numbersEquivalent('## 情形一：串联电路\n12V 电源','## Case 1: Series Circuit\n12V power source'));
 assert.ok(!numbersEquivalent('## 情形二：并联电路\n12V 电源','## Case 3: Parallel Circuit\n12V power source'));
 assert.ok(numbersEquivalent('## 一、先想象一下：水管','## 1. First, Imagine This: Water Pipes'));
 assert.ok(numbersEquivalent('**陷阱一：** 同一对象\n**陷阱二：** 电阻','**Pitfall 1:** Same object\n**Pitfall 2:** Resistance'));
 assert.ok(numbersEquivalent('ลองคิดเล่นๆ 1 ข้อ\nมีหลอดไฟ 2 หลอด','Here is a fun question. There are 2 bulbs'));
 assert.ok(numbersEquivalent('ทำโจทย์ฝึก 3–4 ข้อ','Try 3–4 practice questions'));
 assert.ok(!numbersEquivalent('ทำโจทย์ฝึก 3–4 ข้อ','Try 3–5 practice questions'));
 assert.ok(numbersEquivalent('เริ่มจาก 0','Start from scratch'));
 assert.ok(numbersEquivalent('f เพิ่ม 2 เท่า และ λ หด 2 เท่า','f doubles and λ shrinks by half'));
 assert.ok(numbersEquivalent('### 第一部分：机械波\n**1. 介质**','### Part 1: Mechanical Waves\n**1. Medium**'));
 assert.ok(numbersEquivalent('อุปสรรคเพิ่มขึ้น 2 เท่า','resistance doubles'));
 assert.ok(numbersEquivalent('电流变成了2倍','current doubles'));
 assert.ok(numbersEquivalent('## 二、两个必须避开的坑\n**坑一：** 同体性\n**坑二：** 电阻','## II. Two Pitfalls\n**Pitfall 1:** Same object\n**Pitfall 2:** Resistance'));
});

test('completed new artifacts use the requested direct and OpenRouter routes',()=>{
 const manifest=read('manifest.json');
 for(const item of manifest.items.filter(item=>item.origin==='new'&&item.registered)){
  const artifact=read(item.file),source=artifact.conversation.api_source;
  const expected=item.model==='gpt-6.1-terra'?'openai':item.model==='google/gemini-3.8-flash'?'google':'openrouter';
  assert.equal(artifact.status,'completed');
  assert.equal(source.api_provider,expected);
  assert.equal(source.system_prompt,manifest.tutor_system_prompt);
  assert.equal(source.model_id,item.model);
  assert.equal(artifact.conversation.messages.length,6);
  assert.equal(artifact.conversation.conversation_id,item.id);
  assert.equal(hash(fs.readFileSync(path.join(runRoot,item.file))),item.sha256);
 }
});

test('language audit flags a switched tutor turn without rewriting its text',()=>{
 const original={language:'ta',messages:[
  {turn_id:'t1',speaker:'tutor',text:'தமிழில் இந்த விளக்கத்தைப் படித்து கருத்தை விளங்கிக் கொள்ளலாம். அடுத்த படியைப் பார்ப்போம்.'},
  {turn_id:'t2',speaker:'tutor',text:'This complete answer has switched to English. It explains the whole concept in English and should be flagged as model behavior.'},
 ]};
 assert.deepEqual(switchedTutorTurns(original).map(turn=>turn.turn_id),['t2']);
});

test('pilot scripts retain complete Unicode source sections and aligned translations',()=>{
 const manifest=read('manifest.json');
 for(const language of newLanguages){
  const item=manifest.items.find(entry=>entry.origin==='new'&&entry.topic===selectedTopics[0]&&entry.model===models[0]&&entry.language===language&&entry.attempt===1);
  assert.ok(item?.registered&&item.translation,`${language} pilot is complete`);
  const source=read(item.file).conversation,translated=read(item.translation.file).result;
  const candidates=sectionCandidates(source),alignment=translated.conversation.translation.alignment;
  assert.equal(alignment.length,candidates.length);
  for(const turn of source.messages.filter(message=>message.speaker==='tutor')){
   let previous=0;
   for(const section of candidates.filter(candidate=>candidate.turn_id===turn.turn_id)){
    assert.equal(turn.text.slice(previous,section.start).replace(/[-*_\s]/g,''),'');
    assert.ok(section.end>section.start);
    previous=section.end;
   }
   assert.equal(turn.text.slice(previous).replace(/[-*_\s]/g,''),'');
  }
  for(const [index,section] of candidates.entries()){
   const target=alignment[index],turn=translated.conversation.messages.find(message=>message.turn_id===section.turn_id);
   assert.equal(target.segment_id,`t${section.turn_number}s${section.section_number}`);
   assert.equal(target.source_start,section.start);
   assert.equal(target.source_end,section.end);
   assert.ok(turn.text.slice(target.start,target.end).trim());
  }
 }
});
