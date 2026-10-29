import {expect,it} from 'vitest';
import fs from 'node:fs';
import vm from 'node:vm';
import {bundledRubric,C} from '../src/lib';
import {instructionalPrompt} from '../server/llm-annotation-core';
import {imagePrompt,imagePromptVersion} from '../server/image-labeling';
import {resolveLLMAnnotations} from '../server/llm-annotation-core';
import {LabelItemIcon} from '../src/LabelItemIcon';
import {renderToStaticMarkup} from 'react-dom/server';

it('keeps the guide, schema, standalone UI and deployed snapshot aligned on all 24 labels',()=>{
 const schema=JSON.parse(fs.readFileSync('../conversation-evaluation/schemas/evaluator-v3.schema.json','utf8'));
 const guide=fs.readFileSync('../conversation-evaluation/human-annotation/coding-guidebook.md','utf8');
 const sandbox={window:{} as any};vm.runInNewContext(fs.readFileSync('../conversation-evaluation/human-annotation/ui/data.js','utf8'),sandbox);
 expect(sandbox.window.ANNOTATION_DATA.rubric).toEqual(bundledRubric.rubric);
 expect(Object.keys(schema.properties.instructional_features.properties)).toEqual(bundledRubric.rubric.map(f=>f.key));
 expect(bundledRubric.rubric).toHaveLength(24);
 expect(Object.fromEntries([...new Set(bundledRubric.rubric.map(f=>f.category))].map(category=>[category,bundledRubric.rubric.filter(f=>f.category===category).length]))).toEqual({
  'Visuals & Rich Media':5,'Formatting & Notation':5,'Explanatory & Pedagogical Devices':8,'Conversational & Tutoring Moves':5,'Quality & Error Tracking':1,
 });
 expect(bundledRubric.rubric.find(f=>f.key==='misconceptions_pitfalls')?.name).toBe('Misconceptions');
 for(const f of bundledRubric.rubric){
  expect(schema.properties.instructional_features.properties[f.key].items.properties.category.const).toBe(f.category);
  expect(schema.properties.instructional_features.properties[f.key].description).toBe(f.description);
  expect(schema.properties.instructional_features.properties[f.key].items.properties.count.description).toBe(`Occurrences within this section. ${f.description}`);
  expect(guide).toContain(`| ${f.name} | ${f.description} | ${f.category} |`);
 }
});

it('keeps social-function exclusions and full-expression highlight exceptions in the guide and every evaluator',()=>{
 const guide=fs.readFileSync('../conversation-evaluation/human-annotation/coding-guidebook.md','utf8');
 const standalone=fs.readFileSync('../conversation-evaluation/prompts/evaluator-v3.md','utf8');
 for(const text of [guide,instructionalPrompt(),imagePrompt(bundledRubric),standalone]){
  for(const rule of ['Short expressions such as "Okay", "Got it", and "Great question!" qualify when context establishes this social function', 'expressing empathy', 'encouraging them', 'establishing collaboration and rapport', '"Let\'s work through this together" establishes collaboration and qualifies', '"Next, consider atomic size" and purely procedural "Let\'s calculate the radius" do not qualify alone', 'Add Social Cues alongside these labels only for a separately identifiable social expression', 'This overrides the general two-to-eight-word highlight preference for Social Cues', 'excluding adjacent factual explanation', 'existing 500-character limit'])expect(text).toContain(rule);
  expect(text).not.toContain('Require at least two words in the social expression itself');
 }
 for(const text of [guide,instructionalPrompt(),standalone])expect(text).toContain('For Social Cues, highlight the complete conversational expression instead of applying this phrase-length preference');
});

it('distinguishes social moves, accurate misconception corrections and confirmed bot errors in every prompt',()=>{
 const standalone=fs.readFileSync('../conversation-evaluation/prompts/evaluator-v3.md','utf8');
 for(const prompt of [instructionalPrompt(),imagePrompt(bundledRubric),standalone]){
  for(const rule of ['validating feelings or confusion','praising effort','friendly greetings or pleasantries','these do not become Social Cues merely through friendly wording','A quoted learner error followed by an accurate correction is Misconceptions, not a bot error','do not label it as an accurate misconception correction','Can be double-tagged over any structural or pedagogical element that contains the error','Do not infer a rendering failure from valid Markdown or LaTeX source alone','explicitly asked for just a hint'])expect(prompt).toContain(rule);
 }
});

it('requires multi-line flow diagrams and includes short contextual social cues consistently across evaluators',()=>{
 const guide=fs.readFileSync('../conversation-evaluation/human-annotation/coding-guidebook.md','utf8');
 const standalone=fs.readFileSync('../conversation-evaluation/prompts/evaluator-v3.md','utf8');
 const flow=bundledRubric.rubric.find(f=>f.key==='flow_diagrams')!;
 const social=bundledRubric.rubric.find(f=>f.key==='social_cues')!;
 for(const text of [guide,instructionalPrompt(),imagePrompt(bundledRubric),standalone]){
  expect(text).toContain(flow.description);expect(text).toContain(social.description);
  for(const rule of ['more than one meaningful visual row or level','A single-line sequence such as "Input → Process → Output" is not a Flow Diagram','automatically wrapped onto several screen lines','judge the rendered visual layout','A top-to-bottom multi-level process or a branching decision diagram qualifies','no minimum word count or substantive-engagement threshold applies', 'a bare domain answer or quoted example does not automatically qualify', 'Count one cohesive conversational move once within its section', 'even when expressed across multiple sentences', 'Count separately expressed social moves separately', 'Highlight the complete conversational expression', 'shortest complete utterance establishing the social move', 'Apply the same contextual criteria in English, Tamil, and other languages'])expect(text).toContain(rule);
 }
});

it('excludes chemical species alone while allowing reactions and actual mathematical calculations in every rubric source',()=>{
 const schema=JSON.parse(fs.readFileSync('../conversation-evaluation/schemas/evaluator-v3.schema.json','utf8'));
 const notation=schema.properties.instructional_features.properties.equations;
 const standalone=fs.readFileSync('../conversation-evaluation/prompts/evaluator-v3.md','utf8');
 const guide=fs.readFileSync('../conversation-evaluation/human-annotation/coding-guidebook.md','utf8');
 for(const text of [guide,notation.description,notation.items.properties.count.description,bundledRubric.rubric.find(f=>f.key==='equations')!.guidance,instructionalPrompt(),imagePrompt(bundledRubric),standalone]){
  for(const rule of ['Chemical formulas and species names alone do not qualify','subscripts, superscripts, ionic charges, or LaTeX formatting','H2O, CO2, NaCl, or Ca2+','reactants and products','a list or comparison of chemical formulas is not a reaction','An actual mathematical calculation involving chemical quantities can still qualify as math'])expect(text).toContain(rule);
 }
});

it('stores social cues and error overlaps with section IDs while leaving historical snapshots readable',()=>{
 const text='I see why you connected those two ideas. Here is a worked example containing an incorrect calculation.';
 const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text}]});
 const section={conversation_id:'test',section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end:text.length,quote:text,occurrence:1,source_hash:'fixed'};
 const keys=['social_cues','examples','bot_errors_hallucinations'];
 const annotations=keys.map(feature=>({feature,section_id:'t1s1',entry:{category:bundledRubric.rubric.find(f=>f.key===feature)!.category,count:1}}));
 const result=resolveLLMAnnotations({annotations},conversation,bundledRubric,'new-labels',{},[section]);
 expect(result.map(a=>a.feature)).toEqual(keys);expect(result.every(a=>a.section_id==='t1s1')).toBe(true);
 const historical=structuredClone(bundledRubric);historical.rubric=historical.rubric.filter(f=>!['social_cues','bot_errors_hallucinations'].includes(f.key));historical.rubric.find(f=>f.key==='misconceptions_pitfalls')!.name='Misconceptions / Pitfalls';
 const old=resolveLLMAnnotations({annotations:[{feature:'misconceptions_pitfalls',section_id:'t1s1',entry:{category:'Explanatory & Pedagogical Devices',count:2}}]},conversation,historical,'old',{},[section]);
 expect(old[0].entry.count).toBe(2);expect(historical.rubric.find(f=>f.key==='misconceptions_pitfalls')!.name).toBe('Misconceptions / Pitfalls');
 expect(()=>resolveLLMAnnotations({annotations:[annotations[0]]},conversation,historical,'old',{},[section])).toThrow();
});

it('supplies the same counting boundaries and exclusions in every evaluator',()=>{
 const standalone=fs.readFileSync('../conversation-evaluation/prompts/evaluator-v3.md','utf8');
 const rules=[
  'Count one cohesive notation sequence or connected derivation once within its section',
  'Count unrelated notation sequences separately', 'do not count each variable or line',
  'count the entire list block as `1` instance',
  'A specific worked example can receive both Examples and Step-by-Step Walkthroughs',
  'at least two distinct, linked procedural steps',
  'A single-step explanation, one substitution, one arithmetic operation',
  'same walkthrough continues across consecutive sections',
  'assign its count only to the section where the walkthrough starts',
  'those steps may span consecutive sections',
  'a walkthrough independently presented again later can count as a new occurrence',
  'Do not deduplicate walkthroughs across the whole conversation.',
  'Other labels retain their own counting rules.',
  'Do not additionally count the procedural steps as Lists / Bullet Points',
  'double-tag', 'authentic everyday, historical, or industry context',
  'Exclude figurative metaphors', 'Exclude regular summaries or takeaways',
  'Bold or italic formatting alone never qualifies',
  'Exclude rhetorical questions immediately answered by the bot',
  'clarify their learning goal', 'self-report check', 'immediate practice question is Questions instead',
  'decorative/other imagery', 'embedded video/audio players',
  'Question pagination and gallery Previous/Next controls alone do not qualify',
 ];
 for(const prompt of [instructionalPrompt(),imagePrompt(bundledRubric),standalone]){
  for(const rule of rules)expect(prompt).toContain(rule);
  for(const f of bundledRubric.rubric)expect(prompt).toContain(f.description);
 }
 expect(imagePromptVersion).toBe('turn-image-counts/14');
});

it('saves overlapping example, walkthrough and real-world counts independently in one persistent section',()=>{
 const text='A worked case with a real-world application.';
 const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text}]});
 const section={conversation_id:'test',section_id:'t1s1',turn_id:'t1',turn_number:1,section_number:1,start:0,end:text.length,quote:text,occurrence:1,source_hash:'fixed'};
 const features=['examples','step_by_step_walkthroughs','real_world_connections'];
 const result=resolveLLMAnnotations({annotations:features.map(feature=>({feature,section_id:'t1s1',entry:{category:'Explanatory & Pedagogical Devices',count:1}}))},conversation,bundledRubric,'overlap',{},[section]);
 expect(result.map(a=>a.feature)).toEqual(features);
 expect(result.every(a=>a.section_id==='t1s1'&&a.entry.count===1)).toBe(true);
 expect(result.some(a=>a.feature==='lists')).toBe(false);
});

it('renders a dedicated icon for every active label while retaining historical icons',()=>{
 for(const item of [...bundledRubric.rubric.map(f=>f.key),'photographs','maps','animations','interactive_media','other_images']){
  const icon=renderToStaticMarkup(LabelItemIcon({item}));
  expect(icon).toMatch(/<(path|rect|ellipse)\b/);
  expect(icon).toContain(`data-label-icon="${item}"`);
 }
});
