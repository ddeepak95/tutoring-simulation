import {expect,it} from 'vitest';
import {modelConversationHtml,resolveSegmentEvidence} from '../server/model-conversation-html';
import {headingRanges} from '../server/heading-evidence';

it('serializes the conversation once as compact semantic HTML and strips noisy capture attributes',()=>{
 const conversation={conversation_id:'c1',learning_topic:'topic',label:'display label',messages:[
  {turn_id:'t1',speaker:'tutor' as const,text:'A heading\nBody text'},
  {turn_id:'s1',speaker:'student' as const,text:'Question?'}
 ]};
 const result=modelConversationHtml(conversation,{t1:'<div class="wrapper"><h2 class="title" style="color:red">A heading</h2><p data-testid="p"><span>Body</span> text</p></div><script>bad()</script>'});
 const html=result.html;
 expect(html).toContain('<h2 data-evidence-ids="t1:s0001">A heading</h2><p data-evidence-ids="t1:s0002">Body text</p>');
 expect(html).toContain('<turn id="s1" speaker="student"><p data-evidence-ids="s1:s0001">Question?</p></turn>');
 expect(html.match(/Body text/g)).toHaveLength(1);
 expect(html).not.toContain('display label');
 expect(html).not.toContain('style=');
 expect(html).not.toContain('data-testid');
 expect(html).not.toContain('<div');
 expect(html).not.toContain('<span');
 expect(html).not.toContain('bad()');
 expect(result.segments.map(segment=>segment.source_path)).toEqual([[0,0],[0,1],null]);
});

it('keeps attached visual references in the owning turn without embedding duplicate image metadata',()=>{
 const conversation={conversation_id:'c1',learning_topic:'topic',label:'label',messages:[{turn_id:'t1',speaker:'tutor' as const,text:'Captured diagram'}]};
 const result=modelConversationHtml(conversation,{t1:'<img src="image.png">'},[{id:'visual-1',turn_id:'t1'}]);
 expect(result.html).toContain('<figure data-visual-id="visual-1"><figcaption><span>visual-1</span>: <span data-evidence-ids="t1:s0001">Captured diagram</span></figcaption></figure>');
 expect(result.visualCaptions['visual-1']).toBe('Captured diagram');
 expect(result.html).not.toContain('mime_type');
 const output=resolveSegmentEvidence({annotations:[{feature:'representations',entry:{representation:'diagram',representation_type:'Image',concept_illustrated:null,image_languages:['und']},evidence:[{segment_id:'t1:s0001',quote:'Captured diagram'}]}]},result.segments,conversation);
 expect(output.annotations[0].evidence[0]).toEqual({turn_id:'t1',quote:'Captured diagram',occurrence:1});
});

it('allows a quote to span sentence IDs within the same source block',()=>{
 const conversation={conversation_id:'c1',learning_topic:'topic',label:'label',messages:[{turn_id:'t1',speaker:'tutor' as const,text:'First sentence. Second sentence.'}]};
 const result=modelConversationHtml(conversation,{t1:'<h2>First sentence. Second sentence.</h2>'});
 const output=resolveSegmentEvidence({annotations:[{feature:'concepts_and_subtopics_covered',entry:{topic:'Heading',detail_level:'Brief'},evidence:[{segment_id:result.segments[0].segment_id,quote:'First sentence. Second sentence.'}]}]},result.segments,conversation);
 expect(output.annotations[0].evidence[0]).toEqual({turn_id:'t1',quote:'First sentence. Second sentence.',occurrence:1});
});

it('resolves a returned segment ID and exact quote to canonical transcript offsets',()=>{
 const conversation={conversation_id:'c1',learning_topic:'topic',label:'label',messages:[{turn_id:'t1',speaker:'tutor' as const,text:'Sentence one. Sentence two.'}]};
 const result=modelConversationHtml(conversation,{t1:'<p>Sentence one. Sentence two.</p>'});
 expect(result.segments).toHaveLength(2);
 expect(result.html).toContain(`data-evidence-ids="${result.segments[0].segment_id} ${result.segments[1].segment_id}"`);
 const output=resolveSegmentEvidence({annotations:[{feature:'questions',entry:{question:'Sentence two?',question_type:'Instructional',concept_checked:null},evidence:[{segment_id:result.segments[1].segment_id,quote:'Sentence two.'}]}]},result.segments,conversation);
 expect(output.annotations[0].evidence[0]).toEqual({turn_id:'t1',quote:'Sentence two.',occurrence:1});
});

it('aligns an HTML heading ID with the structural heading occurrence when its wording repeats',()=>{
 const heading='Where would you like to go next?';
 const conversation={conversation_id:'c1',learning_topic:'topic',label:'label',messages:[{turn_id:'t1',speaker:'tutor' as const,text:`${heading}\nBody text\n${heading}`}]};
 const result=modelConversationHtml(conversation,{t1:`<p>${heading}</p><p>Body text</p><h2>${heading}</h2>`});
 const headingSegment=result.segments.find(segment=>segment.kind==='heading');
 expect(headingSegment?.start).toBe(0);
 const output=resolveSegmentEvidence({annotations:[{feature:'concepts_and_subtopics_covered',entry:{topic:'Next steps',detail_level:'Brief'},evidence:[{segment_id:headingSegment!.segment_id,quote:heading}]}]},result.segments,conversation);
 expect(output.annotations[0].evidence[0]).toEqual({turn_id:'t1',quote:heading,occurrence:1});
});

it('marks a standalone bold title as a heading evidence block even when nested in spans',()=>{
 const conversation={conversation_id:'c1',learning_topic:'topic',label:'label',messages:[{turn_id:'t1',speaker:'tutor' as const,text:'Neuron parts\nDendrites receive signals.'}]};
 const result=modelConversationHtml(conversation,{t1:'<p><span><strong>Neuron parts</strong></span></p><p>Dendrites receive signals.</p>'});
 expect(result.html).toContain('<p data-heading="standalone-bold-title" data-evidence-ids="t1:s0001"><strong>Neuron parts</strong></p>');
 expect(result.segments[0]).toMatchObject({kind:'heading',quote:'Neuron parts'});
});

it('keeps capture-state labels out of the tutor heading inventory and model hierarchy',()=>{
 const label='Agent-explored interactive state state_1 (capture action, not a learner response)';
 const conversation={conversation_id:'c1',learning_topic:'topic',label:'label',messages:[{turn_id:'t1',speaker:'tutor' as const,text:`${label}\nCorrect! The answer is 42.`}]};
 const result=modelConversationHtml(conversation,{t1:`<h2>${label}</h2><p>Correct! The answer is 42.</p>`});
 expect(headingRanges(conversation.messages[0].text,`<h2>${label}</h2>`)).toEqual([]);
 expect(result.html).toContain(`<p data-evidence-ids="t1:s0001">${label}</p>`);
 expect(result.segments[0].kind).toBe('paragraph');
});
