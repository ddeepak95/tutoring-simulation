import type { Annotation, Feature } from './types';
import { conceptLevel } from './coverage-hierarchy';

export function featureItemCount(annotation: Annotation): number {
  if (annotation.feature === 'questions') return typeof annotation.entry.question_count === 'number' ? annotation.entry.question_count : 1;
  if (annotation.feature === 'representations' && ['Diagram', 'Flowchart'].includes(String(annotation.entry.representation_type))) {
    return typeof annotation.entry.diagram_count === 'number' ? annotation.entry.diagram_count : 1;
  }
  return 1;
}

export function countFeatureItems(annotations: Annotation[], featureKey: string): number {
  return annotations.reduce((total, annotation) => total + (annotation.feature === featureKey ? featureItemCount(annotation) : 0), 0);
}

export function featureSubitemCounts(annotations: Annotation[], feature: Feature) {
  const entries = annotations.filter(annotation => annotation.feature === feature.key);
  const groups = feature.fields.filter(field => field.options?.length).map(field => {
    const counts = field.options!.map(option => ({ label: option, count: 0 }));
    let unspecified = 0;
    for (const annotation of entries) {
      const value = field.key === 'concept_level' ? conceptLevel(annotation) : annotation.entry[field.key];
      const count = field.key === 'question_type' || field.key === 'representation_type' ? featureItemCount(annotation) : 1;
      const match = counts.find(item => item.label === value);
      if (match) match.count += count;
      else unspecified += count;
    }
    if (unspecified) counts.push({ label: 'Not specified', count: unspecified });
    return { label: field.label, counts };
  });
  if (feature.key === 'examples') {
    groups.unshift({ label: 'Example occurrences', counts: ['Fresh', 'Duplicate', 'Not classified'].map(label => ({
      label, count: entries.reduce((total, annotation) => total + annotation.evidence.filter(evidence => (evidence.example_status || 'Not classified') === label).length, 0)
    })) });
  }
  if (!groups.length) groups.push({ label: 'Recorded', counts: [
    { label: 'Annotations', count: entries.length },
    { label: 'Supporting passages', count: entries.reduce((total, annotation) => total + annotation.evidence.length, 0) }
  ] });
  return groups;
}
