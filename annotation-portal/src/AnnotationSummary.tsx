import { C } from './lib';
import type { Annotation, RubricSnapshot } from './types';

export function AnnotationSummary({ annotations, rubric }: { annotations: Annotation[]; rubric: RubricSnapshot }) {
  return <section className="annotation-summary" aria-label="Annotation summary">
    <div className="annotation-summary-heading"><strong>Annotation summary</strong><small>{annotations.length} total</small></div>
    <div className="annotation-category-grid">{rubric.rubric.map(feature => {
      const entries = annotations.filter(annotation => annotation.feature === feature.key);
      const passages = entries.reduce((total, annotation) => total + annotation.evidence.length, 0);
      const turns = new Set(entries.flatMap(annotation => annotation.evidence.map(evidence => evidence.turn_id))).size;
      const incomplete = entries.filter(annotation => C.missingAttributes(annotation, rubric.rubric).length > 0).length;
      return <details className="annotation-category" key={feature.key}>
        <summary><span className="category-dot" style={{ background: feature.color }} /><span>{feature.short_label}</span><strong className="category-count">{entries.length}</strong></summary>
        <div className="category-breakdown">
          {C.formFields(feature).map(field => {
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
          <dl className="category-extra"><div><dt>Supporting passages</dt><dd>{passages}</dd></div><div><dt>Tutor turns</dt><dd>{turns}</dd></div><div><dt>Incomplete annotations</dt><dd>{incomplete}</dd></div></dl>
        </div>
      </details>;
    })}</div>
  </section>;
}
