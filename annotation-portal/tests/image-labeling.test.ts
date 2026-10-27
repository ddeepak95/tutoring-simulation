import {expect,it} from 'vitest';
import {bundledRubric as rubric,C} from '../src/lib';
import {sectionCandidates,storedAnnotations,hydrateAnnotations} from '../src/section-registry';
import {generateImageBaseline,resolveImageCounts,imagePrompt,type ImageCheckpoint} from '../server/image-labeling';
import {createHash} from 'node:crypto';

const conversation=C.normalizeConversation({messages:[{turn_id:'a',speaker:'tutor',text:'# Same\n\nExamples and equations.\n\n# Same\n\nExamples and equations.'},{turn_id:'b',speaker:'tutor',text:'Next.'}]});
const sections=sectionCandidates(conversation).map(s=>({...s,conversation_id:'test',source_hash:'fixed',section_id:`t${s.turn_number}s${s.section_number}`,...C.makeEvidence(conversation,s.turn_id,s.start,s.end)}));
const output=(ids:string[])=>({sections:ids.map(section_id=>({section_id,features:Object.fromEntries(rubric.rubric.map(f=>[f.key,{count:f.key==='examples'?3:f.key==='equations'?2:0,evidence:['examples','equations'].includes(f.key)?'Visible occurrences in this section.':null}]))}))});
const data=Buffer.from('fixture-image').toString('base64');
const turns=['a','b'].map(turn_id=>({turn_id,sections:sections.filter(s=>s.turn_id===turn_id).map(s=>({section_id:s.section_id,name:`Turn ${s.turn_number} - Section ${s.section_number}`,heading:null})),tiles:[{id:'tile',data,mime_type:'image/png',sha256:createHash('sha256').update(Buffer.from(data,'base64')).digest('hex')}]}));

it('instructs the model to count evidenced hidden totals and only knowledge-checking questions',()=>{
 const prompt=imagePrompt(rubric);
 expect(prompt).toContain('Question 1 of 5');expect(prompt).toContain('Image 2 of 4');
 expect(prompt).toContain('Next arrow alone does not establish a quantity');
 expect(prompt).toContain('Have you understood?');expect(prompt).toContain('rhetorical or tutor-answered');
 expect(prompt).toContain('Evidence must cite the quantity cue');
 expect(prompt).toContain('supporting views of the original containing section');
 expect(prompt).toContain('Count each question/image in that component once');
 expect(rubric.rubric.find(f=>f.key==='questions')!.description).toContain('demonstrate subject-matter knowledge');
 expect(rubric.rubric.find(f=>f.key==='photographs')!.guidance).toContain('hidden instructional images');
});

it('excludes question navigation as interaction and groups a derivation solving for one result',()=>{
 const prompt=imagePrompt(rubric);
 expect(prompt).toContain('Question pagination and Previous/Next buttons alone do not qualify');
 expect(prompt).toContain('r = d/2 followed by r = 74/2 = 37 pm is one equation occurrence');
 expect(prompt).toContain('Count separate calculations or unrelated formulas separately');
 expect(rubric.rubric.find(f=>f.key==='interactive_media')!.guidance).toContain('navigation between questions');
 expect(rubric.rubric.find(f=>f.key==='equations')!.description).toContain('even across multiple lines or displays');
});

it('stores positive counts and model evidence separately from canonical repeated-section evidence',()=>{
 const annotations=resolveImageCounts(output(['t1s1','t1s2']),conversation,rubric,sections.filter(s=>s.turn_id==='a'),'run');
 expect(annotations).toHaveLength(4);expect(annotations[2].evidence[0].occurrence).toBe(2);
 expect(annotations[0]).toMatchObject({section_id:'t1s1',entry:{category:'Textual Representations',count:2},llm_evidence:'Visible occurrences in this section.'});
 expect(hydrateAnnotations(storedAnnotations(annotations) as typeof annotations,sections)).toEqual(annotations);
 const exported=C.buildExport(conversation,annotations,rubric.rubric,'test');
 expect(exported.feature_counts).toMatchObject({examples:6,equations:4});
 expect(exported.instructional_features.examples[0].llm_evidence).toBe('Visible occurrences in this section.');
 expect(()=>C.validateAnnotations(conversation,[{...annotations[0],llm_evidence:'two\nlines'}],rubric.rubric)).toThrow(/single/);
});

it('rejects missing, duplicate and unknown sections, features, quantities and evidence',()=>{
 const check=(value:unknown)=>resolveImageCounts(value,conversation,rubric,[sections[0]],'run');
 for(const change of [
  (o:any)=>o.sections.push(o.sections[0]),(o:any)=>o.sections[0].section_id='t99s1',
  (o:any)=>delete o.sections[0].features.maps,(o:any)=>o.sections[0].features.extra={count:0,evidence:null},
  ...[-1,1.5,1001,'3'].map(count=>(o:any)=>o.sections[0].features.examples.count=count),
  ...[null,'','line\nbreak'].map(evidence=>(o:any)=>o.sections[0].features.examples.evidence=evidence),
  (o:any)=>o.sections[0].features.maps.evidence='present',
 ]){const o=output(['t1s1']);change(o);expect(()=>check(o)).toThrow();}
 const duplicate=output(['t1s1','t1s1']);expect(()=>resolveImageCounts(duplicate,conversation,rubric,sections.slice(0,2),'run')).toThrow(/duplicate/);
});

it('sends only images and metadata, retries bad output and resumes completed turns without recalling them',async()=>{
 let checkpoint:ImageCheckpoint|undefined;let calls=0;const requests:any[]=[];
 const args={conversation,rubric,sections,turns,requestId:'test',config:{model:'gemini-4-argon',timeout:10,reasoning:null},apiKey:'secret',onCheckpoint:(s:ImageCheckpoint)=>{checkpoint=s;},onExchange:()=>{}};
 const fetcher:typeof fetch=async(_url,options)=>{
  calls++;const request=JSON.parse(String(options?.body));requests.push(request);
  const manifest=JSON.parse(request.contents[0].parts[0].text.split('\nPrevious')[0]);
  if(calls===3)throw Error('network interrupted');
  const content=calls===1?{}:output(manifest.sections.map((s:any)=>s.section_id));
  return new Response(JSON.stringify({responseId:'response',candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(content)}]}}],usageMetadata:{promptTokenCount:10,candidatesTokenCount:5,totalTokenCount:15}}));
 };
 await expect(generateImageBaseline({...args,fetcher})).rejects.toThrow(/interrupted/);
 expect(checkpoint!.turns.a.annotations).toHaveLength(4);
 const result=await generateImageBaseline({...args,checkpoint,fetcher});
 expect(calls).toBe(4);expect(result.annotations).toHaveLength(6);expect(result.generation_config.usage.total_tokens).toBe(45);
 const request=JSON.stringify(requests[0]);expect(request).not.toContain('Examples and equations.');expect(request).not.toContain('<article');expect(request).not.toContain('"quote":');expect(request).not.toContain('secret');
 expect(requests[0].contents[0].parts.filter((p:any)=>p.inlineData)).toHaveLength(1);
 await expect(generateImageBaseline({...args,checkpoint,config:{...args.config,model:'gemini-other'},fetcher})).rejects.toThrow(/checkpoint differs/);
 await expect(generateImageBaseline({...args,turns:turns.slice(0,1),fetcher})).rejects.toThrow(/every tutor turn/);
});
