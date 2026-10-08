export type Role = 'admin' | 'annotator';
export type Status = 'not_started' | 'in_progress' | 'submitted';
export interface Profile { id: string; username: string; role: Role; }
export interface Turn { turn_id: string; speaker: 'tutor' | 'student'; text: string; }
export interface RepositorySource { run_id: string; relative_path: string; original_conversation_id: string | null; file_sha256: string; version: string; language: string; topic_id: string; }
export interface Conversation { conversation_id: string | null; learning_topic: string | null; label: string; messages: Turn[]; repository_source?: RepositorySource; source_conversation_id?: string | null; original_language?: string | null; topic_english_name?: string | null; }
export interface Evidence { turn_id: string; quote: string; start: number; end: number; occurrence: number; }
export interface Annotation { id: string; feature: string; entry: Record<string, string | string[] | null>; evidence: Evidence[]; }
export interface Field { key: string; label: string; options?: string[]; }
export interface Feature { key: string; name: string; short_label: string; color: string; highlight: string; description: string; guidance: string; entry_attributes: string; fields: Field[]; }
export interface RubricSnapshot { rubric_source: string; rubric_sha256: string; rubric: Feature[]; }
export interface DocumentRow { id: string; label: string; language: string; transcript: Conversation; created_at: string; source_path?: string | null; }
export interface Assignment { id: string; conversation_id: string; annotator_id: string; rubric_hash: string; status: Status; revision: number; annotations: Annotation[]; updated_at: string; submitted_at: string | null; conversations?: DocumentRow; profiles?: Profile; }
export interface ExportData { format_version: string; annotations: Annotation[]; incomplete_annotations: { id: string; feature: string; missing_attributes: string[] }[]; feature_counts: Record<string, number>; [key: string]: unknown; }
