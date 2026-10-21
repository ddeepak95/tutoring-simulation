import {expect,it} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {parseCoverageTopic,groupCoverage,conceptLevel,conceptDisplayFeature} from '../src/coverage-hierarchy';
import {MarkdownTranscript} from '../src/MarkdownTranscript';
import {AnnotationSummary} from '../src/AnnotationSummary';
import {C,bundledRubric} from '../src/lib';

it('groups multiple mains without conflating legacy topics or losing each component detail',()=>{
 const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'Water evaporates.'}]});
 const annotations=['Evaporation :: Definition','Evaporation :: Importance','Measuring evaporation :: Method','Legacy topic'].map((topic,index)=>{
  const a=C.createAnnotation('concepts_and_subtopics_covered',C.makeEvidence(conversation,'t1',0,17),bundledRubric.rubric,`a${index}`);a.entry.topic=topic;a.entry.detail_level=index?'Explained':'Brief';delete a.entry.concept_level;return a;
 });
 const original=structuredClone(annotations);const groups=groupCoverage(annotations);
 expect(groups.map(g=>[g.main,g.components.length])).toEqual([['Evaporation',2],['Measuring evaporation',1],['Legacy topic',0]]);expect(annotations).toEqual(original);
 for(const invalid of [' :: Definition','Evaporation :: ','A :: B :: C :: D',null])expect(parseCoverageTopic(invalid)).toBeNull();
 const html=renderToStaticMarkup(<AnnotationSummary annotations={annotations} rubric={bundledRubric}/>);expect(html).toContain('Evaporation (2 units)');expect(html).toContain('Measuring evaporation (1 units)');expect(html).toContain('Legacy topic');expect(html).toContain('Brief');
});

it('places three-level paths under their parent unit without double-counting parents',()=>{
 const annotations=['Physics','Physics :: Measurement','Physics :: Measurement :: X-ray diffraction','Physics :: Measurement :: Spectroscopy'].map((topic,index)=>({id:String(index),feature:'concepts_and_subtopics_covered',entry:{topic,detail_level:'Explained'},evidence:[]}));
 const groups=groupCoverage(annotations);expect(groups).toHaveLength(1);expect(groups[0].annotation?.id).toBe('0');expect(groups[0].units).toHaveLength(1);expect(groups[0].units[0].annotation?.id).toBe('1');expect(groups[0].units[0].subunits.map(s=>s.name)).toEqual(['X-ray diffraction','Spectroscopy']);
});

it('accepts a plain concept name without asking annotators for a hierarchy path',()=>{
 const feature=conceptDisplayFeature(bundledRubric.rubric.find(item=>item.key==='concepts_and_subtopics_covered')!);
 expect(feature.fields.find(field=>field.key==='topic')?.label).toBe('Concept');
 expect(C.formFields(feature).map(field=>field.key)).toEqual(['concept_level','detail_level']);
 expect(parseCoverageTopic('Forces')).toMatchObject({main:'Forces',depth:1});
});

it('uses an explicit optional concept level while preserving legacy path levels',()=>{
 const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text:'Forces'}]});
 const annotation=C.createAnnotation('concepts_and_subtopics_covered',C.makeEvidence(conversation,'t1',0,6),bundledRubric.rubric,'concept');
 expect(annotation.entry.topic).toBe('Forces');
 expect(annotation.entry.concept_level).toBeNull();
 expect(conceptLevel(annotation)).toBeNull();
 expect(C.missingAttributes(annotation,bundledRubric.rubric)).toEqual(['detail_level']);
 annotation.entry.concept_level='Explanatory unit';
 annotation.entry.detail_level='Brief';
 expect(conceptLevel(annotation)).toBe('Explanatory unit');
 expect(()=>C.validateAnnotations(conversation,[annotation],bundledRubric.rubric)).not.toThrow();
 const html=renderToStaticMarkup(<AnnotationSummary annotations={[annotation]} rubric={bundledRubric}/>);
 expect(html).toContain('Concept levels');
 expect(html).toContain('<dt>Main concepts</dt><dd>0</dd>');
 expect(html).toContain('<dt>Explanatory units</dt><dd>1</dd>');
 delete annotation.entry.concept_level;
 expect(()=>C.validateAnnotations(conversation,[annotation],bundledRubric.rubric)).not.toThrow();
});

it('shows concept levels on legacy highlights without changing saved annotations',()=>{
 const text='**Measurement**';
 const conversation=C.normalizeConversation({messages:[{turn_id:'t1',speaker:'tutor',text}]});
 const legacyRubric=bundledRubric.rubric.map(f=>f.key==='concepts_and_subtopics_covered'?{...f,name:'Concepts and Subtopics Covered',short_label:'Concepts & subtopics'}:f);
 for(const [topic,level] of [['Radius','Main concept'],['Radius :: Measurement','Explanatory unit'],['Radius :: Measurement :: Diffraction','Explanatory subunit']]){
  const annotation=C.createAnnotation('concepts_and_subtopics_covered',C.makeEvidence(conversation,'t1',0,text.length),legacyRubric,'concept');
  annotation.entry.topic=topic;delete annotation.entry.concept_level;const original=structuredClone(annotation);
  expect(conceptLevel(annotation)).toBe(level);
  const html=renderToStaticMarkup(<MarkdownTranscript text={text} turnId="t1" annotations={[annotation]} rubric={legacyRubric} readonly onHighlight={()=>{}}/>);
  expect(html).toContain(`data-feature-label="Concepts ? ${level}"`);expect(annotation).toEqual(original);
 }
});
