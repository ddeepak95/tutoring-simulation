export type Role = 'admin' | 'annotator';
export type Status = 'not_started' | 'in_progress' | 'submitted';
export type AssignmentType = 'label' | 'rate';
export interface Profile { id: string; username: string; role: Role; }
export interface Turn { turn_id: string; speaker: 'tutor' | 'student'; text: string; }
export interface RepositorySource { run_id: string; relative_path: string; original_conversation_id: string | null; file_sha256: string; version: string; language: string; topic_id: string; }
export interface ChatGPTSource { source_conversation_id: string; source_url: string; captured_at: string; imported_at: string; imported_by: string; extractor_version: string; snapshot_sha256: string; capture_report: { complete?: boolean; top_reached?: boolean; bottom_reached?: boolean; consistent_passes?: boolean; message_count: number; limitations: string[]; exact_html?: string }; }
export interface ArchiveSource { archive_id: string; source_conversation_id: string; source_url: string; captured_at: string; imported_by: string; extractor_version: string; snapshot_sha256: string; prepared_by: string; prepared_at: string; preparation_sha256: string; capture_report: Record<string, unknown>; }
export interface Conversation { conversation_id: string | null; learning_topic: string | null; label: string; messages: Turn[]; archive_source?: ArchiveSource; repository_source?: RepositorySource; chatgpt_source?: ChatGPTSource; source_conversation_id?: string | null; original_language?: string | null; topic_english_name?: string | null; topic_id?: string | null; topic_name?: string | null; provider?: string | null; access_type?: string | null; }
export interface Evidence { turn_id: string; quote: string; start: number; end: number; occurrence: number; example_status?: 'Fresh' | 'Duplicate'; }
export interface Annotation { id: string; feature: string; entry: Record<string, string | string[] | number | null>; evidence: Evidence[]; }
export interface Field { key: string; label: string; options?: string[]; multiple?: boolean; numeric?: boolean; optional?: boolean; }
export interface Feature { key: string; name: string; short_label: string; color: string; highlight: string; description: string; guidance: string; entry_attributes: string; fields: Field[]; }
export interface RatingDimension { key: string; label: string; description: string; options: string[]; scale_items: Partial<Record<string, string>>; guidance: string; subsequent_only?: boolean; }
export interface TurnRating { values: Record<string, string>; notes: string; }
export type TurnRatings = Record<string, TurnRating>;
export interface AnnotationWork { annotations: Annotation[]; turn_ratings: TurnRatings; }
export interface RubricSnapshot { rubric_source: string; rubric_sha256: string; rubric: Feature[]; rating_dimensions?: RatingDimension[]; rating_scope?: string; }
export interface DocumentRow { id: string; label: string; language: string; transcript: Conversation; created_at: string; source_path?: string | null; }
export interface Assignment { is_active?: boolean; unassigned_at?: string | null; id: string; conversation_id: string; annotator_id: string; rubric_hash: string; task_type: AssignmentType; status: Status; revision: number; annotations: Annotation[]; turn_ratings?: TurnRatings; baseline_id?: string | null; annotation_source?: 'blank' | 'llm'; updated_at: string; submitted_at: string | null; conversations?: DocumentRow; profiles?: Profile; }
export interface LLMBaseline { id: string; conversation_id: string; rubric_hash: string; annotations: Annotation[]; model: string; prompt_version: string; prompt: string; prompt_sha256: string; transcript_sha256: string; generation_config: Record<string, unknown>; created_by: string; created_at: string; }
export interface LLMGenerationRun { id: string; conversation_id: string; status: 'generating' | 'completed' | 'failed'; error_code: string | null; created_at: string; finished_at: string | null; checkpoint_fingerprint?:string|null; }
export interface ExportData { format_version: string; annotations: Annotation[]; incomplete_annotations: { id: string; feature: string; missing_attributes: string[] }[]; feature_counts: Record<string, number>; [key: string]: unknown; }
