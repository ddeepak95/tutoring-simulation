import { describe, expect, it } from 'vitest';
import { evaluationCohorts, matchedOccurrenceSamples, occurrenceRows, occurrenceSamples, rowOccurrenceCount, sectionOccurrenceCounts, summarizeOccurrences,
  type OccurrenceBaseline } from '../src/set-occurrences';
import { providerLanguageGroups } from '../src/admin-conversation-groups';
import type { Annotation, DocumentRow, RubricSnapshot } from '../src/types';
const rubric = { label_schema_version: 'section-items/1', rubric_sha256: 'rubric', rubric: [
  { key: 'headings', name: 'Headings', category: 'Textual Representations' },
  { key: 'equations', name: 'Mathematical Notation', category: 'Textual Representations' },
  { key: 'examples', name: 'Examples', category: 'Content' },
] } as RubricSnapshot;
const annotation = (feature: string, count: number, section_id = 't1s1') => ({ feature, section_id, entry: { count }, evidence: [] } as unknown as Annotation);
const baseline = (id: string, conversation_id: string, annotations: Annotation[], date = '2026-10-01') => ({ id, conversation_id, annotations, created_at: date, rubric_hash: 'rubric', model: 'google/model', prompt_version: 'v10', prompt_sha256: 'rendered', generation_config: { provider: 'google', instructional_prompt_sha256: 'source' } } as OccurrenceBaseline);
const doc = (id: string, language = 'ta', source?: string) => ({ id, language, source_conversation_id: source, created_at: id, transcript: { conversation_id: id, provider: 'GPT', messages: [] } } as unknown as DocumentRow);
const featureRow = occurrenceRows(rubric).find(r => r.key === 'headings')!;

describe('occurrences within a set', () => {
  it('sums section counts and category subtotals without counting annotation rows or totals twice', () => {
    const b = baseline('b', 'a', [annotation('headings', 3), annotation('headings', 2, 't2s1'), annotation('equations', 4)]);
    expect(sectionOccurrenceCounts(b, rubric)).toEqual({ headings: 5, equations: 4, examples: 0 });
    const group = providerLanguageGroups([doc('a')])[0], cohort = evaluationCohorts([b], new Map([['rubric', rubric]]))[0];
    const samples = occurrenceSamples(group, 'original', cohort);
    expect(rowOccurrenceCount(samples[0], occurrenceRows(rubric).find(r => r.kind === 'category')!)).toBe(9);
    expect(rowOccurrenceCount(samples[0], occurrenceRows(rubric).find(r => r.kind === 'total')!)).toBe(9);
  });
  it('keeps missing evaluations unavailable and treats evaluated empty annotations as true zeros', () => {
    const group = providerLanguageGroups([doc('a'), doc('b')])[0];
    const cohort = evaluationCohorts([baseline('a0', 'a', [])], new Map([['rubric', rubric]]))[0];
    const samples = occurrenceSamples(group, 'original', cohort);
    expect(samples.map(sample => rowOccurrenceCount(sample, featureRow))).toEqual([0, null]);
    expect(summarizeOccurrences(samples, featureRow)).toEqual({ n: 1, total: 0, mean: 0, sd: null });
    expect(summarizeOccurrences([], featureRow)).toEqual({ n: 0, total: null, mean: null, sd: null });
  });
  it('uses one latest run within a cohort and separates prompt bodies, models, rubrics and reasoning settings', () => {
    const a = baseline('old', 'a', [annotation('headings', 2)]), b = baseline('new', 'a', [annotation('headings', 7)], '2026-10-02');
    const otherPrompt = { ...a, id: 'changed', generation_config: { ...a.generation_config, instructional_prompt_sha256: 'changed' } };
    const otherModel = { ...a, id: 'model', model: 'other' };
    const otherSettings = { ...a, id: 'reasoning', generation_config: { ...a.generation_config, reasoning: { effort: 'high' } } };
    const cohorts = evaluationCohorts([a, b, otherPrompt, otherModel, otherSettings], new Map([['rubric', rubric]]));
    expect(cohorts).toHaveLength(4);
    const group = providerLanguageGroups([doc('a')])[0];
    expect(occurrenceSamples(group, 'original', cohorts[0])[0].counts!.headings).toBe(7);
  });
  it('rejects legacy spans, duplicated section/item pairs and invalid counts instead of fabricating totals', () => {
    expect(sectionOccurrenceCounts(baseline('b', 'a', [annotation('headings', 2), annotation('headings', 3)]), rubric)).toBeNull();
    expect(sectionOccurrenceCounts(baseline('b', 'a', [annotation('headings', 0)]), rubric)).toBeNull();
    expect(sectionOccurrenceCounts(baseline('b', 'a', [{ feature: 'headings', entry: { count: 4 }, evidence: [] } as unknown as Annotation]), rubric)).toBeNull();
  });
  it('uses sample standard deviation across tries, with zero for constant evaluated counts', () => {
    const group = providerLanguageGroups([doc('a'), doc('b'), doc('c')])[0];
    const cohort = evaluationCohorts([baseline('a0', 'a', [annotation('headings', 2)]), baseline('b0', 'b', [annotation('headings', 4)]), baseline('c0', 'c', [annotation('headings', 6)])], new Map([['rubric', rubric]]))[0];
    const samples = occurrenceSamples(group, 'original', cohort);
    expect(summarizeOccurrences(samples, featureRow)).toEqual({ n: 3, total: 12, mean: 4, sd: 2 });
    expect(summarizeOccurrences(samples, occurrenceRows(rubric).find(r => r.key === 'examples')!).sd).toBe(0);
  });
});
describe('language and translation comparisons', () => {
  it('skips stale translations even when they have saved evaluation counts',()=>{
    const stale=doc('en-new','en','a');stale.transcript.translation={version:'api-english/1',sha256:'old',alignment_status:'stale'};
    const valid=doc('en-old','en','a');const group=providerLanguageGroups([doc('a'),stale,valid])[0];
    const cohort=evaluationCohorts([baseline('stale','en-new',[annotation('headings',99)]),baseline('valid','en-old',[annotation('headings',2)])],new Map([['rubric',rubric]]))[0];
    expect(occurrenceSamples(group,'english',cohort)[0].document?.id).toBe('en-old');
    group.attempts[0].translations=[stale];expect(occurrenceSamples(group,'english',cohort)[0].counts).toBeNull();
  });
  it('pairs by source identity, excludes unmatched tries, and does not pair English originals with themselves', () => {
    const groups = providerLanguageGroups([doc('a'), doc('b'), doc('en-a', 'en', 'a'), doc('en-b', 'en', 'b'), doc('english', 'en')]);
    const cohort = evaluationCohorts([baseline('a0', 'a', [annotation('headings', 3)]), baseline('b0', 'b', [annotation('headings', 10)]), baseline('en0', 'en-a', [annotation('headings', 5)]), baseline('eng', 'english', [annotation('headings', 9)])], new Map([['rubric', rubric]]))[0];
    const ta = groups.find(g => g.language === 'ta')!, en = groups.find(g => g.language === 'en')!;
    const left = occurrenceSamples(ta, 'original', cohort), right = occurrenceSamples(ta, 'english', cohort);
    const paired = matchedOccurrenceSamples(left, right);
    expect(paired.left.map(s => s.rootId)).toEqual(['a']);
    expect(summarizeOccurrences(paired.left, featureRow).mean).toBe(3);
    expect(summarizeOccurrences(paired.right, featureRow).mean).toBe(5);
    expect(summarizeOccurrences(left, featureRow).mean).toBe(6.5);
    expect(summarizeOccurrences(occurrenceSamples(en, 'english', cohort), featureRow).mean).toBe(9);
    expect(matchedOccurrenceSamples(occurrenceSamples(en, 'original', cohort), occurrenceSamples(en, 'english', cohort)).left).toHaveLength(0);
  });
});
