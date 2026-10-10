import type { Annotation, LLMBaseline, RubricSnapshot } from './types';
import { compareWithBaseline } from './baseline-comparison';
export function BaselineComparison({ baseline, annotations, rubric }: { baseline: LLMBaseline; annotations: Annotation[]; rubric: RubricSnapshot }) {
  const comparison = compareWithBaseline(baseline.annotations, annotations);
  const label = (annotation: Annotation) => rubric.rubric.find(feature => feature.key === annotation.feature)?.short_label || annotation.feature;
  return <details className="card baseline-comparison">
    <summary>Changes from LLM baseline: {comparison.counts.edited} edited · {comparison.counts.added} added · {comparison.counts.deleted} deleted · {comparison.counts.unchanged} unchanged</summary>
    <p>{baseline.model} · {new Date(baseline.created_at).toLocaleString()} · Baseline {baseline.id}</p>
    <p>Counts compare current work with the original baseline. Revision exports identify who made each change.</p>
    {comparison.edited.map(change => <div key={change.id}><strong>Edited {label(change.after)}</strong>{change.attribute_changes.map(field => <p key={field.key}>{field.key}: {String(field.before ?? 'Not provided')} → {String(field.after ?? 'Not provided')}</p>)}{change.evidence_changed && <p>Supporting passages changed.</p>}{change.feature_changed && <p>Category changed.</p>}</div>)}
    {comparison.added.map(annotation => <p key={annotation.id}>Added {label(annotation)}: {annotation.evidence.map(evidence => evidence.quote).join(' / ')}</p>)}
    {comparison.deleted.map(annotation => <p key={annotation.id}>Deleted {label(annotation)}: {annotation.evidence.map(evidence => evidence.quote).join(' / ')}</p>)}
  </details>;
}
