import {expect,it} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {resolveSectionHighlights,annotationHighlightEvidence} from '../src/section-highlights';
import {C,bundledRubric} from '../src/lib';
import {annotationSchema,resolveLLMAnnotations} from '../server/llm-annotation-core';
import {hydrateAnnotations,storedAnnotations} from '../src/section-registry';
import {MarkdownTranscript} from '../src/MarkdownTranscript';
import {conceptDisplayFeature} from '../src/coverage-hierarchy';
import type {ConversationSection} from '../src/types';

const text='An earlier phrase.\n\n## Cells\n\nNeurons are specialized cells. The gap is called a synapse. The messengers are called neurotransmitters.';
const conversation=C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text}]});
const section={conversation_id:'test',section_id:'t1s1',turn_id:'t',turn_number:1,section_number:1,start:text.indexOf('##'),end:text.length,quote:text.slice(text.indexOf('##')),occurrence:1,source_hash:'fixed'} as ConversationSection;
const anchors=[{quote:'Neurons are specialized cells',occurrence:1},{quote:'called a synapse',occurrence:1},{quote:'are called neurotransmitters',occurrence:1}];
const output={annotations:[{feature:'definitions',section_id:'t1s1',entry:{category:'Explanatory & Pedagogical Devices',count:3},highlights:anchors}]};
const annotations=()=>resolveLLMAnnotations(output,conversation,bundledRubric,'anchors',{},[section]);

it.each([
 ['Okay.', 'I understand why this feels confusing. The terminology can be difficult at first.', 'You kept trying different approaches; that effort matters.'],
 ['சரி.', 'இது குழப்பமாக இருப்பது புரிகிறது. ஆரம்பத்தில் இந்தச் சொற்கள் கடினமாக இருக்கலாம்.', 'நீங்கள் தொடர்ந்து முயற்சி செய்தது பாராட்டுக்குரியது.'],
])('preserves full conversational expressions and cohesive multi-sentence moves: %s', (acknowledgment, empathy, encouragement)=>{
 const social=[acknowledgment,empathy,encouragement];
 const factual='A triangle has three sides. Next, consider its angles. Let\'s calculate the angle.';
 const source=[...social,factual].join(' ');
 const c=C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text:source}]});
 const s={...section,start:0,end:source.length,quote:source};
 const a=resolveLLMAnnotations({annotations:[{feature:'social_cues',section_id:s.section_id,entry:{category:'Conversational & Tutoring Moves',count:3},highlights:social.map(quote=>({quote,occurrence:1}))}]},c,bundledRubric,'social',{},[s]);
 expect(a[0].entry.count).toBe(3);
 expect(annotationHighlightEvidence(a[0]).map(e=>e.quote)).toEqual(social);
 const stored=storedAnnotations(a);
 expect(hydrateAnnotations(stored as typeof a,[s])[0].highlights).toEqual(a[0].highlights);
 const html=renderToStaticMarkup(<MarkdownTranscript text={source} turnId="t" annotations={a} rubric={bundledRubric.rubric} readonly onHighlight={()=>{}} sectionLabels sections={[s]}/>);
 expect((html.match(/<mark /g)||[])).toHaveLength(3);
 expect(html).toContain('A triangle has three sides. Next, consider its angles.');
 for(const mark of html.matchAll(/<mark\b[^>]*>([\s\S]*?)<\/mark>/g))expect(mark[1]).not.toContain('A triangle');
});

it('permits a whole-section social utterance while retaining section ownership and the 500-character limit',()=>{
 const source='Let\'s work through this together.';
 const c=C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text:source}]});
 const s={...section,start:0,end:source.length,quote:source};
 const a=resolveLLMAnnotations({annotations:[{feature:'social_cues',section_id:s.section_id,entry:{category:'Conversational & Tutoring Moves',count:1},highlights:[{quote:source,occurrence:1}]}]},c,bundledRubric,'whole-social',{},[s]);
 expect(annotationHighlightEvidence(a[0])[0].quote).toBe(source);
 const long='I understand. '+ 'x'.repeat(501);
 expect(()=>resolveSectionHighlights({...s,quote:long,end:long.length},[{quote:long,occurrence:1}])).toThrow();
 expect(resolveSectionHighlights({...s,quote:long,end:long.length},[{quote:'I understand.',occurrence:1}])[0].quote).toBe('I understand.');
});

it('displays headings in gray even for a historical pinned palette without mutating the snapshot',()=>{
 const saved={...bundledRubric.rubric.find(f=>f.key==='headings')!,color:'#921c5c',highlight:'#ebd6e2'};
 expect(conceptDisplayFeature(saved)).toMatchObject({color:'#6b7280',highlight:'#e5e7eb'});
 expect(saved.color).toBe('#921c5c');
 expect(bundledRubric.rubric.find(f=>f.key==='headings')).toMatchObject({color:'#6b7280',highlight:'#e5e7eb'});
});

it('resolves repeated phrases within their owning section with Unicode-safe source offsets',()=>{
 const evidence={turn_id:'t',start:20,end:60,quote:'😀 நரம்பு செல்கள்; நரம்பு செல்கள்',occurrence:1};
 const [span]=resolveSectionHighlights(evidence,[{quote:'நரம்பு செல்கள்',occurrence:2}]);
 expect(span.start).toBe(20+evidence.quote.lastIndexOf('நரம்பு செல்கள்'));
 for(const bad of [[{quote:'missing phrase',occurrence:1}],[{quote:'நரம்பு செல்கள்',occurrence:3}],[{quote:'நரம்பு செல்கள்',occurrence:1},{quote:'நரம்பு செல்கள்',occurrence:1}]])expect(()=>resolveSectionHighlights(evidence,bad)).toThrow();
});
it('requests one anchor per counted occurrence and rejects hallucinated or duplicate model highlights',()=>{
 const schema=annotationSchema(bundledRubric,true,[section]) as any;
 expect(schema.properties.annotations.items.anyOf.every(v=>v.required.includes('highlights'))).toBe(true);
 expect(annotations()[0].highlights).toEqual(anchors);
 for(const highlights of [[anchors[0]],Array(3).fill(anchors[0]),[{quote:'An earlier phrase',occurrence:1},...anchors.slice(1)]])expect(()=>resolveLLMAnnotations({annotations:[{...output.annotations[0],highlights}]},conversation,bundledRubric,'invalid',{},[section])).toThrow();
});
it('preserves quotes through storage, reload and export without replacing the full-section evidence',()=>{
 const a=annotations()[0],saved=storedAnnotations([a]);expect(saved[0]).not.toHaveProperty('evidence');expect(saved[0].highlights).toEqual(anchors);
 const hydrated=hydrateAnnotations(saved as typeof a[],[section]);expect(hydrated[0].evidence[0].quote).toBe(section.quote);expect(hydrated[0].highlights).toEqual(anchors);
 expect(C.buildExport(conversation,hydrated,bundledRubric.rubric,'alice').instructional_features.definitions[0].highlights).toEqual(anchors);
});
it('highlights the short phrases, leaving the rest of the section unmarked',()=>{
 const html=renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t" annotations={annotations()} rubric={bundledRubric.rubric} readonly onHighlight={()=>{}} sectionLabels sections={[section]}/>);
 expect((html.match(/<mark /g)||[])).toHaveLength(3);
 expect(html).toContain('data-feature-keys="definitions"');expect(html).not.toMatch(/<mark[^>]*>The gap is/);
 expect(html).toContain('aria-label="View Definitions"');
});
it('renders overlapping feature colors and labels independently without duplicating counts',()=>{
 const a=annotations()[0],b={...a,id:'example',feature:'examples'};
 const html=renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t" annotations={[a,b]} rubric={bundledRubric.rubric} readonly onHighlight={()=>{}} sectionLabels sections={[section]}/>);
 expect(html).toContain('linear-gradient');expect(html).toContain('aria-label="View Definitions / Examples"');expect((html.match(/<mark /g)||[])).toHaveLength(3);
 expect(new Set(bundledRubric.rubric.map(f=>f.color)).size).toBe(24);expect(new Set(bundledRubric.rubric.map(f=>f.highlight)).size).toBe(24);
});
it('keeps historical section-only labels valid and does not fabricate text highlights',()=>{
 const a=annotations()[0];delete a.highlights;
 expect(()=>C.validateAnnotations(conversation,[a],bundledRubric.rubric)).not.toThrow();
 const html=renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t" annotations={[a]} rubric={bundledRubric.rubric} readonly onHighlight={()=>{}} sectionLabels sections={[section]}/>);
 expect(html).not.toContain('<mark ');expect(html).toContain('Definitions: 3');
});

it('renders exact-source highlights inside bold text and mathematical notation',()=>{
 const source='A **defined term** uses the relation \\(x = y\\).';
 const c=C.normalizeConversation({messages:[{turn_id:'t',speaker:'tutor',text:source}]});
 const s={...section,start:0,end:source.length,quote:source};
 const items=[{feature:'definitions',quote:'defined term'},{feature:'equations',quote:'x = y'}].map(item=>({feature:item.feature,section_id:s.section_id,entry:{category:bundledRubric.rubric.find(f=>f.key===item.feature)!.category,count:1},highlights:[{quote:item.quote,occurrence:1}]}));
 const a=resolveLLMAnnotations({annotations:items},c,bundledRubric,'formatted',{},[s]);
 const html=renderToStaticMarkup(<MarkdownTranscript text={source} turnId="t" annotations={a} rubric={bundledRubric.rubric} readonly onHighlight={()=>{}} sectionLabels sections={[s]}/>);
 expect(html).toMatch(/<strong><mark[^>]+>defined term<\/mark><\/strong>/);
 expect(html).toContain('data-feature-keys="equations"');expect(html).toContain('annotated-math');
});
