import type { Annotation, Conversation, Evidence, ExportData, Feature } from '../types';
declare const api: {
  FORMAT_VERSION: string;
  normalizeConversation(input: unknown, filename?: string): Conversation;
  parseTranscript(text: string, filename?: string): Conversation;
  formFields(feature: Feature): Feature['fields'];
  makeEvidence(conversation: Conversation, turnId: string, start: number, end: number): Evidence;
  occurrenceAt(text: string, quote: string, start: number): number;
  missingAttributes(annotation: Annotation, rubric: Feature[]): string[];
  createAnnotation(key: string, evidence: Evidence, rubric: Feature[], id: string): Annotation;
  validateAnnotations(conversation: Conversation, annotations: unknown, rubric: Feature[], options?: { allowIncomplete?: boolean }): Annotation[];
  addEvidence(annotation: Annotation, evidence: Evidence): Annotation;
  buildExport(conversation: Conversation, annotations: Annotation[], rubric: Feature[], annotator: string): ExportData;
  highlightedSegments(text: string, annotations: Annotation[], turnId: string): { start: number; end: number; text: string; annotations: Annotation[] }[];
};
export default api;
