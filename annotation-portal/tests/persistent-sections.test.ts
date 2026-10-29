import {expect,it} from 'vitest';
import {C,bundledRubric} from '../src/lib';
import {sectionCandidates,hydrateAnnotations,storedAnnotations,markdownSectionGroups} from '../src/section-registry';
import {generateInstructionalBaseline} from '../server/llm-provider';
import type {ConversationSection} from '../src/types';

const conversation=C.normalizeConversation({conversation_id:'example',messages:[{turn_id:'student',speaker:'student',text:'Explain.'},{turn_id:'turn_0002',speaker:'tutor',text:'# Same\n\nAn example 😀.\n\n# Same\n\nAn example 😀.'},{turn_id:'turn_0003',speaker:'student',text:'More?'},{turn_id:'turn_0004',speaker:'tutor',text:'Another response.'}]});
const sections:ConversationSection[]=sectionCandidates(conversation).map(s=>({...s,conversation_id:'example',section_id:`t${s.turn_number}s${s.section_number}`,source_hash:'fixed',...C.makeEvidence(conversation,s.turn_id,s.start,s.end)}));

it('divides API responses at headings and horizontal rules without empty sections',()=>{
 const text='---\n\nIntroduction.\n\n## Definition\n\nExplanation.\n\n---\n\nMore details.\n\n**Example:**\n\nA calculation.\n\n---';
 const c={...C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text}]}),access_type:'API'};
 const ranges=sectionCandidates(c);
 expect(ranges.map(s=>text.slice(s.start,s.end))).toEqual(['Introduction.\n\n## Definition\n\nExplanation.\n\n---','More details.','**Example:**\n\nA calculation.\n\n---']);
 expect(ranges.map(s=>s.section_number)).toEqual([1,2,3]);
});

it('keeps untitled API explanations cohesive, including equations and introduced blocks',()=>{
 const text='Definition.\n\nThe equation is:\n\n\\[\nx > y\n\\]\n\nSteps:\n\n1. First\n2. Second\n\n| A | B |\n|---|---|\n|1|2|\n\nConclusion.';
 const c={...C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text}]}),access_type:'API'};
 const ranges=sectionCandidates(c);
 expect(ranges.map(s=>text.slice(s.start,s.end))).toEqual([text]);
 expect(sectionCandidates({...c,access_type:'chatbot'})).toHaveLength(1);
});

it('renders pinned section boundaries even when the current API rules propose different splits',()=>{
 const text='First paragraph.\n\nSecond paragraph.\n\n\\[x^2\\]';
 const ranges=[{start:0,end:text.length}];
 expect(markdownSectionGroups(text,{api:true})).toHaveLength(1);
 const groups=markdownSectionGroups(text,{api:true,ranges});
 expect(groups).toHaveLength(1);
 expect(groups[0][0].position?.start.offset).toBe(0);
 const equation=groups[0].at(-1)!;
 expect('children' in equation&&equation.children[0].data?.mathSource?.contentStart).toBe(text.indexOf('x^2'));
 const later=markdownSectionGroups(text,{ranges:[{start:text.indexOf('Second'),end:text.length}]});
 const last=later[0].at(-1)!;
 expect('children' in last&&last.children[0].data?.mathSource?.contentStart).toBe(text.indexOf('x^2'));
});

it('uses short tutor-turn IDs and preserves separate repeated occurrences',()=>{
 expect(sections.map(s=>s.section_id)).toEqual(['t1s1','t1s2','t2s1']);
 expect(sections[0].turn_id).toBe('turn_0002');expect(sections[1].occurrence).toBe(2);
});

it('keeps captured interaction states inside the original section inventory',()=>{
 const c=C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text:'# Quiz\n\nQuestion 1 of 3.\n\nAgent-explored interactive state state_1 (capture action, not a learner response):\nQuestion 2 of 3.\n\nAgent-explored interactive state state_2 (capture action, not a learner response):\nQuestion 3 of 3.'}]});
 const inventory=sectionCandidates(c);
 expect(inventory).toHaveLength(1);expect(c.messages[0].text.slice(inventory[0].start,inventory[0].end)).toBe('# Quiz\n\nQuestion 1 of 3.');
});

it('stores only references and resolves source evidence through the registry',()=>{
 const section=sections[1],a=C.createAnnotation('examples',C.makeEvidence(conversation,section.turn_id,section.start,section.end),bundledRubric.rubric,'example');a.section_id=section.section_id;a.entry.count=3;
 const stored=storedAnnotations([a]);
 expect(stored).toEqual([{id:'example',section_id:'t1s2',feature:'examples',entry:{category:'Explanatory & Pedagogical Devices',count:3}}]);
 expect(hydrateAnnotations(stored as typeof a[],sections)).toEqual([a]);
 const exported=C.buildExport(conversation,[a],bundledRubric.rubric,'alice');
 expect(exported.annotations).toEqual(stored);expect(exported.sections).toMatchObject([{section_id:'t1s2',quote:section.quote,occurrence:2}]);
 expect(()=>hydrateAnnotations([{...a,section_id:'t1s99'}],sections)).toThrow(/Unknown section/);
});

it('LLM generation uses the same registered short IDs and exact repeated source',async()=>{
 const result=await generateInstructionalBaseline({conversation,rubric:bundledRubric,sections,requestId:'persistent',apiKey:'test',config:{model:'test/model',timeout:10,repair_attempts:0,reasoning:null},fetcher:async(_url,options)=>{
  const request=JSON.parse(String(options?.body));
  expect(request.messages[1].content).toContain('data-evidence-ids="t1s2"');
  expect(JSON.stringify(request.response_format)).toContain('section_id');
  const annotations=[{feature:'examples',section_id:'t1s2',entry:{category:'Explanatory & Pedagogical Devices',count:3}}];
  return new Response(JSON.stringify({model:'test/model',choices:[{finish_reason:'stop',message:{content:JSON.stringify({annotations})}}]}),{headers:{'Content-Type':'application/json'}});
 }});
 expect(result.annotations[0].section_id).toBe('t1s2');expect(result.annotations[0].evidence[0].occurrence).toBe(2);
});
