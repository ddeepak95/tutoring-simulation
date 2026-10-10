import { createClient } from '@supabase/supabase-js';
import C from './generated/core.js';
import snapshot from './generated/rubric.json';
import type { Annotation, Assignment, Conversation, ExportData, RubricSnapshot, TurnRatings } from './types';
import { validateTurnRatings } from './turn-ratings';
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
export function validateSubmission(conversation: Conversation, annotations: Annotation[], rubric: RubricSnapshot, username: string, turnRatings: TurnRatings = {}): ExportData {
  const result = C.buildExport(conversation, annotations, rubric.rubric, username);
  if (result.incomplete_annotations.length) throw new Error('Complete the details for every highlight before submitting.');
  validateTurnRatings(conversation, turnRatings, rubric, true);
  return { ...result, turn_ratings: turnRatings, rating_dimensions: rubric.rating_dimensions || [], rating_scope: rubric.rating_scope || null };
}
export async function fetchAssignments(): Promise<Assignment[]> {
  const { data, error } = await supabase!.from('assignments').select('*, conversations(*), profiles!assignments_annotator_id_fkey(id, username, role)').order('updated_at', { ascending: false });
  if (error) throw error; return data as Assignment[];
}
