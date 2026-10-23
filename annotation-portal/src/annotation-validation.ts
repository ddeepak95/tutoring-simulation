import C from './generated/core.js';
import type { Annotation, Conversation, Feature } from './types';

const excerpt = (value: string) => {
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length > 90 ? `${text.slice(0, 87)}…` : text;
};

export function describeAnnotation(conversation: Conversation, annotation: Annotation, rubric: Feature[]): string {
  const feature = rubric.find(item => item.key === annotation.feature);
  const evidence = annotation.evidence?.[0];
  const turnIndex = conversation.messages.filter(turn => turn.speaker === 'tutor').findIndex(turn => turn.turn_id === evidence?.turn_id);
  return `${feature?.name || annotation.feature}${turnIndex >= 0 ? ` · Bot turn ${turnIndex + 1}` : ''}${evidence?.quote ? ` · “${excerpt(evidence.quote)}”` : ''}`;
}

export function missingFieldLabels(annotation: Annotation, fields: string[], rubric: Feature[]): string[] {
  const feature = rubric.find(item => item.key === annotation.feature);
  return fields.map(key => feature?.fields.find(field => field.key === key)?.label || key.replaceAll('_', ' '));
}

export function describeIncompleteAnnotations(conversation: Conversation, annotations: Annotation[], rubric: Feature[], incomplete: { id: string; missing_attributes: string[] }[]): string {
  const details = incomplete.slice(0, 5).map(item => {
    const annotation = annotations.find(candidate => candidate.id === item.id);
    return annotation ? `${describeAnnotation(conversation, annotation, rubric)}: ${missingFieldLabels(annotation, item.missing_attributes, rubric).join(', ')}` : 'An annotation needs required details';
  });
  const remaining = incomplete.length - details.length;
  return `Complete required fields in ${incomplete.length} highlight${incomplete.length === 1 ? '' : 's'} before submitting: ${details.join('; ')}${remaining ? `; and ${remaining} more` : ''}.`;
}

export function contextualizeAnnotationError(error: unknown, conversation: Conversation, annotations: Annotation[], rubric: Feature[]): Error {
  const detail = error instanceof Error ? error.message : String(error);
  for (const annotation of annotations) {
    try { C.validateAnnotations(conversation, [annotation], rubric, { allowIncomplete: true }); }
    catch { return new Error(`${describeAnnotation(conversation, annotation, rubric)}: ${detail}`); }
  }
  return new Error(detail);
}
