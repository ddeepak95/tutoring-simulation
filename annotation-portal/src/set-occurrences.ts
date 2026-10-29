import type { Annotation, DocumentRow, RubricSnapshot } from './types';
import type { ProviderLanguageGroup } from './admin-conversation-groups';
import { conversationOrigin } from './conversation-origin';
import { languageId } from './languages';
import {translationAlignmentStale} from './api-translation';

export interface OccurrenceBaseline {
  id: string; conversation_id: string; rubric_hash: string; annotations: Annotation[];
  model: string; prompt_version: string; prompt_sha256: string; created_at: string;
  generation_config: Record<string, unknown>;
}
export interface EvaluationCohort { key: string; label: string; rubric: RubricSnapshot; baselines: OccurrenceBaseline[]; latest: string }
export interface OccurrenceRow { key: string; label: string; kind: 'category' | 'feature' | 'total'; features: string[] }
export interface OccurrenceSample { rootId: string; tryNumber: number; document: DocumentRow | null; baseline: OccurrenceBaseline | null; counts: Record<string, number> | null }
export type ConversationVersion = 'original' | 'english';
export const setKey = (group: ProviderLanguageGroup) => JSON.stringify([group.provider, group.language]);

/** A repeated run is a version, never another observation of the conversation. */
export function evaluationCohorts(baselines: OccurrenceBaseline[], rubrics: Map<string, RubricSnapshot>): EvaluationCohort[] {
  const groups = new Map<string, EvaluationCohort>();
  for (const baseline of baselines) {
    const rubric = rubrics.get(baseline.rubric_hash);
    if (rubric?.label_schema_version !== 'section-items/1') continue;
    const config = baseline.generation_config || {};
    const hash = String(config.instructional_prompt_sha256 || baseline.prompt_sha256 || baseline.id);
    const key = JSON.stringify([baseline.prompt_version, baseline.model, baseline.rubric_hash, hash,
      config.provider || 'unrecorded', config.pass || 'extraction', config.input_mode || 'text', config.reasoning || null]);
    const label = `${baseline.prompt_version || 'Unrecorded prompt'} · ${baseline.model} · prompt ${hash.slice(0, 8)} · rubric ${baseline.rubric_hash.slice(0, 8)}${config.pass === 'review' ? ' · reviewed' : ''}${config.input_mode ? ` · ${config.input_mode}` : ''}`;
    const cohort = groups.get(key) || { key, label, rubric, baselines: [], latest: baseline.created_at };
    cohort.baselines.push(baseline);
    if (baseline.created_at > cohort.latest) cohort.latest = baseline.created_at;
    groups.set(key, cohort);
  }
  return [...groups.values()].sort((a, b) => b.latest.localeCompare(a.latest) || a.key.localeCompare(b.key));
}

export function occurrenceRows(rubric: RubricSnapshot): OccurrenceRow[] {
  const groups = new Map<string, typeof rubric.rubric>();
  for (const feature of rubric.rubric) {
    const category = feature.category || 'Other labels';
    groups.set(category, [...(groups.get(category) || []), feature]);
  }
  const rows: OccurrenceRow[] = [...groups].flatMap(([category, features]) => [
    { key: `category:${category}`, label: category, kind: 'category' as const, features: features.map(f => f.key) },
    ...features.map(feature => ({ key: feature.key, label: feature.name, kind: 'feature' as const, features: [feature.key] })),
  ]);
  return [...rows, { key: 'total', label: 'All categories', kind: 'total', features: rubric.rubric.map(f => f.key) }];
}

/** Counts already describe occurrences within sections; don't count annotation rows. */
export function sectionOccurrenceCounts(baseline: OccurrenceBaseline, rubric: RubricSnapshot): Record<string, number> | null {
  const counts = Object.fromEntries(rubric.rubric.map(feature => [feature.key, 0]));
  const seen = new Set<string>();
  for (const annotation of baseline.annotations) {
    const count = annotation.entry.count;
    const key = JSON.stringify([annotation.section_id, annotation.feature]);
    if (!annotation.section_id || !(annotation.feature in counts) || typeof count !== 'number' || !Number.isInteger(count) || count < 1 || count > 1000 || seen.has(key)) return null;
    seen.add(key); counts[annotation.feature] += count;
  }
  return counts;
}

export function occurrenceSamples(group: ProviderLanguageGroup, version: ConversationVersion, cohort: EvaluationCohort): OccurrenceSample[] {
  const latest = new Map<string, OccurrenceBaseline>();
  for (const baseline of [...cohort.baselines].sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id))) {
    if (!latest.has(baseline.conversation_id)) latest.set(baseline.conversation_id, baseline);
  }
  return group.attempts.map((attempt, index) => {
    const original = !conversationOrigin(attempt.document).translated ? attempt.document : null;
    const english = languageId(attempt.document.language) === 'en' ? attempt.document : [...attempt.translations]
      .filter(doc => languageId(doc.language) === 'en'&&!translationAlignmentStale(doc.transcript)).sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id))[0] || null;
    const chosen = version === 'original' ? original : english;
    const document=chosen&&!translationAlignmentStale(chosen.transcript)?chosen:null;
    const baseline = document ? latest.get(document.id) || null : null;
    return { rootId: attempt.document.id, tryNumber: index + 1, document, baseline, counts: baseline ? sectionOccurrenceCounts(baseline, cohort.rubric) : null };
  });
}
export function rowOccurrenceCount(sample: OccurrenceSample, row: OccurrenceRow): number | null {
  return sample.counts ? row.features.reduce((total, key) => total + sample.counts![key], 0) : null;
}
export function summarizeOccurrences(samples: OccurrenceSample[], row: OccurrenceRow) {
  const values = samples.map(sample => rowOccurrenceCount(sample, row)).filter((n): n is number => n !== null);
  const mean = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
  const sd = values.length > 1 ? Math.sqrt(values.reduce((sum, value) => sum + (value - mean!) ** 2, 0) / (values.length - 1)) : null;
  return { n: values.length, total: values.length ? values.reduce((a, b) => a + b, 0) : null,
    mean, sd };
}
/** Pair by original conversation ID, never by try index or title. */
export function matchedOccurrenceSamples(left: OccurrenceSample[], right: OccurrenceSample[]) {
  const rightByRoot = new Map(right.map(sample => [sample.rootId, sample]));
  const pairs = left.flatMap(sample => {
    const other = rightByRoot.get(sample.rootId);
    return sample.counts && other?.counts && sample.document?.id !== other.document?.id ? [{ left: sample, right: other }] : [];
  });
  return { left: pairs.map(pair => pair.left), right: pairs.map(pair => pair.right) };
}
