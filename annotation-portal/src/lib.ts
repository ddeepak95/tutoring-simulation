import { createClient } from '@supabase/supabase-js';
import C from './generated/core.js';
import snapshot from './generated/rubric.json';
import type { Annotation, Assignment, Conversation, ExportData, RubricSnapshot, TurnRatings } from './types';
import { activeRatingDimensions, validateTurnRatings } from './turn-ratings';
import { contextualizeAnnotationError, describeIncompleteAnnotations } from './annotation-validation';
export const bundledRubric = snapshot as RubricSnapshot;
export { C };
export const usernamePattern = /^[a-z0-9][a-z0-9._-]{2,31}$/;
export function loginIdentifier(username: string) {
  const normalized = username.trim().toLowerCase();
  if (!usernamePattern.test(normalized)) throw new Error('Use a username of 3–32 letters, numbers, dots, underscores, or hyphens.');
  return `${normalized}@users.annotation.invalid`;
}
export const configured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
export const supabase = configured ? createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) : null;
export function download(name: string, value: unknown) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function validateSubmission(conversation: Conversation, annotations: Annotation[], rubric: RubricSnapshot, username: string, turnRatings: TurnRatings = {}, taskType: 'label' | 'rate' | 'both' = 'both'): ExportData {
  if (taskType === 'rate') {
    validateTurnRatings(conversation, turnRatings, rubric, true);
    return { format_version: 'annotation-portal/2.0', annotations: [], incomplete_annotations: [], feature_counts: {}, turn_ratings: turnRatings, rating_dimensions: activeRatingDimensions(rubric), rating_questions_source: snapshot.rating_questions_source, rating_scope: snapshot.rating_scope };
  }
  let result: ExportData;
  try { result = C.buildExport(conversation, annotations, rubric.rubric, username); }
  catch (error) { throw contextualizeAnnotationError(error, conversation, annotations, rubric.rubric); }
  if (result.incomplete_annotations.length) throw new Error(describeIncompleteAnnotations(conversation, annotations, rubric.rubric, result.incomplete_annotations));
  if (taskType === 'both') {
    validateTurnRatings(conversation, turnRatings, rubric, true);
    return { ...result, turn_ratings: turnRatings, rating_dimensions: activeRatingDimensions(rubric), rating_questions_source: snapshot.rating_questions_source, rating_scope: snapshot.rating_scope };
  }
  return { ...result, turn_ratings: {}, rating_dimensions: [], rating_questions_source: snapshot.rating_questions_source, rating_scope: snapshot.rating_scope };
}
export async function fetchAssignments(): Promise<Assignment[]> {
  const { data, error } = await supabase!.from('assignments').select('*, conversations(*), profiles!assignments_annotator_id_fkey(id, username, role)').eq('is_active',true).order('updated_at', { ascending: false });
  if (error) throw error; return data as Assignment[];
}
export async function fetchAllRows<T>(table: string, columns = '*', orderColumns = ['id']): Promise<T[]> {
  const rows: T[] = [];
  for (let offset = 0;; offset += 500) {
    let query=supabase!.from(table).select(columns);
    for(const column of orderColumns) query=query.order(column);
    const {data,error}=await query.range(offset,offset+499);
    if(error) throw error;
    rows.push(...data as T[]);
    if(data.length<500) return rows;
  }
}
