import {LabelItemIcon} from './LabelItemIcon';
import { C } from './lib';
import type { Annotation, RubricSnapshot } from './types';
import { groupCoverage, displayRubric } from './coverage-hierarchy';
import { countFeatureItems, featureItemCount } from './feature-counts';

export function AnnotationSummary({ annotations, rubric }: { annotations: Annotation[]; rubric: RubricSnapshot }) {
  return <section className="annotation-summary" aria-label="Annotation summary">
    <div className="annotation-summary-heading"><strong>Annotation summary</strong><small>{rubric.label_schema_version ? `${annotations.reduce((n, a) => n + featureItemCount(a), 0)} occurrences; ${new Set(annotations.flatMap(a => a.evidence.map(e => `${e.turn_id}:${e.start}:${e.end}`))).size} sections` : `${annotations.length} total`}</small></div>
    <div className="annotation-category-grid">{displayRubric(rubric.rubric).map(feature => {
      const entries = annotations.filter(annotation => annotation.feature === feature.key);
      const itemCount = countFeatureItems(entries, feature.key);
      const passages = entries.reduce((total, annotation) => total + annotation.evidence.length, 0);
      const turns = new Set(entries.flatMap(annotation => annotation.evidence.map(evidence => evidence.turn_id))).size;
      const incomplete = entries.filter(annotation => C.missingAttributes(annotation, rubric.rubric).length > 0).length;
      const explicitLevels = feature.key === 'concepts_and_subtopics_covered' ? entries.filter(annotation => Object.hasOwn(annotation.entry, 'concept_level')) : [];
      const hierarchy = groupCoverage(entries.filter(annotation => !Object.hasOwn(annotation.entry, 'concept_level')));
      const explicitCount = (level: string) => explicitLevels.filter(annotation => annotation.entry.concept_level === level).length;
      return <details className="annotation-category" key={feature.key}>
        <summary><LabelItemIcon item={feature.key} style={{color:feature.color}}/><span>{feature.short_label}</span><strong className="category-count">{itemCount}</strong></summary>
        <div className="category-breakdown">
          {hierarchy.length > 0 && <div className="attribute-breakdown"><h3>Content hierarchy</h3>{hierarchy.map(group => <details key={group.main}><summary>{group.main} ({group.units.length} units)</summary>{group.annotation && <p>Main concept detail: {String(group.annotation.entry.detail_level)}</p>}{group.units.map(unit=><details key={unit.name}><summary>{unit.name}{unit.annotation && ` (${String(unit.annotation.entry.detail_level)})`}</summary>{unit.subunits.length>0&&<dl>{unit.subunits.map(({name,annotation})=><div key={annotation.id}><dt>{name}</dt><dd>{String(annotation.entry.detail_level)}</dd></div>)}</dl>}</details>)}</details>)}</div>}
          {explicitLevels.length > 0 && <div className="attribute-breakdown"><h3>Concept levels</h3><dl>{['Main concept','Explanatory unit','Explanatory subunit'].map(level => <div key={level}><dt>{level}</dt><dd>{explicitCount(level)}</dd></div>)}<div><dt>Not specified</dt><dd>{explicitLevels.filter(annotation => !annotation.entry.concept_level).length}</dd></div></dl></div>}
          {!feature.category&&feature.key==='examples'&&<div className="attribute-breakdown"><h3>Example highlights</h3><dl>{(['Fresh','Duplicate','Not classified'] as const).map(status=><div key={status}><dt>{status}</dt><dd>{entries.reduce((n,a)=>n+a.evidence.filter(e=>(e.example_status||'Not classified')===status).length,0)}</dd></div>)}</dl></div>}
          {C.formFields(feature).filter(field => field.key !== 'concept_level').map(field => {
            if (field.numeric) {
              const counted = field.key === 'diagram_count' ? entries.filter(annotation => ['Diagram', 'Flowchart'].includes(String(annotation.entry.representation_type))) : entries;
              const total = counted.reduce((sum, annotation) => sum + (typeof annotation.entry[field.key] === 'number' ? Number(annotation.entry[field.key]) : 1), 0);
              return <div className="attribute-breakdown" key={field.key}><h3>{field.label}</h3><dl><div><dt>Total</dt><dd>{total}</dd></div><div><dt>{feature.category ? 'Sections' : 'Highlights'}</dt><dd>{counted.length}</dd></div></dl></div>;
            }
            const counts = new Map<string, number>((field.options || []).map(value => [value, 0]));
            let missing = 0;
            for (const annotation of entries) {
              const value = annotation.entry[field.key];
              if (typeof value !== 'string' || !value.trim()) missing++;
              else counts.set(value, (counts.get(value) || 0) + 1);
            }
            return <div className="attribute-breakdown" key={field.key}><h3>{field.label}</h3><dl>
              {[...counts].map(([value, count]) => <div key={value}><dt>{value}</dt><dd>{count}</dd></div>)}
              {missing > 0 && <div><dt>Not provided</dt><dd>{missing}</dd></div>}
              {!counts.size && !missing && <div><dt>Recorded values</dt><dd>0</dd></div>}
            </dl></div>;
          })}
          <dl className="category-extra">{(hierarchy.length > 0 || explicitLevels.length > 0) && <><div><dt>Main concepts</dt><dd>{hierarchy.length + explicitCount('Main concept')}</dd></div><div><dt>Explanatory units</dt><dd>{hierarchy.reduce((sum,group)=>sum+group.units.length,0) + explicitCount('Explanatory unit')}</dd></div><div><dt>Explanatory subunits</dt><dd>{hierarchy.reduce((sum,group)=>sum+group.units.reduce((total,unit)=>total+unit.subunits.length,0),0) + explicitCount('Explanatory subunit')}</dd></div></>}<div><dt>Supporting passages</dt><dd>{passages}</dd></div><div><dt>Tutor turns</dt><dd>{turns}</dd></div><div><dt>Incomplete annotations</dt><dd>{incomplete}</dd></div></dl>
        </div>
      </details>;
    })}</div>
  </section>;
}
