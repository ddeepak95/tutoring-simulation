import {expect,it} from 'vitest';
import {apiGroupingVersion,sectionCandidates,markdownSectionGroups} from '../src/section-registry';
import {C} from '../src/lib';

const split=(text:string)=>sectionCandidates({...C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text}]}),access_type:'API'}).map(s=>text.slice(s.start,s.end));
it('keeps the blood-flow introduction and bold route together, rather than treating the route as a title',()=>{
 const a='Happy to help!\n\n## Heart\n\n### Follow a drop of blood\nHere is its complete trip:\n\n**Body → right atrium → lungs → left atrium → body**\n\nThe valves keep flow in one direction.';
 expect(split(a+'\n\n### Next idea\n\nA different explanation.')).toEqual([a,'### Next idea\n\nA different explanation.']);
});
it('uses the same structural grouping for Tamil and keeps a separate closing question',()=>{
 const body='நல்ல கேள்வி!\n\n## இரத்த ஓட்டம்\n\nஇரத்தம் செல்லும் வழி:\n\n**உடல் → இதயம் → நுரையீரல் → உடல்**\n\nவால்வுகள் இரத்தத்தை ஒரு திசையில் செலுத்துகின்றன.';
 const question='**இரத்தம் எந்த திசையில் செல்கிறது?**';
 expect(split(body+'\n\n'+question)).toEqual([body,question]);
});
it('does not treat emphasized sentences, notation, or numbered procedural steps as headings',()=>{
 const body='First we reason about the problem.\n\n**This is a complete sentence.**\n\n**1. Establish the starting values**\n\n**2. Apply the rule**\n\n**F = ma**\n\nThen explain the answer.';
 expect(split(body)).toEqual([body]);
 expect(split(body+'\n\n**A new topic:**\n\nOther content.')).toEqual([body,'**A new topic:**\n\nOther content.']);
});
it('preserves lists, tables, diagrams, equations and embedded questions as complete blocks',()=>{
 const text='Consider these items:\n\n- What happens first?\n- A second point.\n\n| A | B |\n|---|---|\n|1|2|\n\n```text\nA --> B\n```\n\nThe relationship is:\n\n\\[x = y + z\\]\n\nA concluding explanation.';
 expect(split(text)).toEqual([text]);
});
it('keeps titled question sections together and never creates divider-only sections',()=>{
 expect(split('---\n\n# Lesson\n\n## Start\n\nAn explanation.\n\n---\n\n## Practice\n\nWhat would happen?\n\n---')).toEqual(['# Lesson\n\n## Start\n\nAn explanation.\n\n---','## Practice\n\nWhat would happen?\n\n---']);
});
it('records the grouping version only for API text and respects explicitly pinned ranges',()=>{
 const text='First paragraph.\n\nSecond paragraph.\n\nWhich rule applies?';
 const c=C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text}]});
 expect(sectionCandidates({...c,access_type:'API'}).every(s=>s.grouping_version===apiGroupingVersion)).toBe(true);
 expect(sectionCandidates(c).some(s=>s.grouping_version)).toBe(false);
 expect(markdownSectionGroups(text,{api:true,ranges:[{start:0,end:text.length}]})).toHaveLength(1);
 const ranges=sectionCandidates({...c,access_type:'API'});let end=0;
 for(const s of ranges){expect(s.start).toBeGreaterThanOrEqual(end);expect(text.slice(end,s.start).trim()).toBe('');end=s.end;}
 expect(text.slice(end).trim()).toBe('');
});
