import { useEffect, useId, useMemo, useState } from 'react';
import { supabase } from './lib';
import type { DocumentRow, RubricSnapshot } from './types';
import { providerLanguageGroups, type ProviderLanguageGroup } from './admin-conversation-groups';
import { languageName } from './languages';
import { generationConditions, type StatisticalDocument } from './language-statistics-data';
import { languageStatistics, type FeatureTest, type StatisticalSample } from './language-statistics';
import { evaluationCohorts, matchedOccurrenceSamples, occurrenceRows, occurrenceSamples, setKey, summarizeOccurrences,
  type ConversationVersion, type EvaluationCohort, type OccurrenceBaseline, type OccurrenceRow, type OccurrenceSample } from './set-occurrences';

const number = (value: number | null) => value === null ? '—' : new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(value);
const groupLabel = (group: ProviderLanguageGroup) => `${group.provider} / ${languageName(group.language)}`;
const versionLabel = (version: ConversationVersion, group: ProviderLanguageGroup) => version === 'original' ? 'Original' : group.language === 'en' ? 'English original' : 'English translation';

export function ProviderOccurrenceComparison({ documents, provider }: { documents: DocumentRow[]; provider: string }) {
  const groups = providerLanguageGroups(documents).filter(group => group.provider === provider);
  const currentGroup = groups.find(group => group.language === 'en') || groups[0];
  if (!currentGroup) return null;
  const ids = new Set(groups.flatMap(group => group.attempts.flatMap(attempt => [attempt.document.id, ...attempt.translations.map(doc => doc.id)])));
  return <SetOccurrenceComparison documents={documents.filter(doc => ids.has(doc.id))} currentGroup={currentGroup} providerComparison />;
}

export function SetOccurrenceComparison({ documents, currentGroup, providerComparison = false }: { documents: DocumentRow[]; currentGroup: ProviderLanguageGroup; providerComparison?: boolean }) {
  const [open, setOpen] = useState(false);
  return <details className="card set-occurrence-comparison" onToggle={event => setOpen(event.currentTarget.open)}>
    <summary>{providerComparison ? 'Compare languages' : 'Occurrence counts and comparisons'}</summary>
    {open && <OccurrenceComparisonBody documents={documents} currentGroup={currentGroup} providerComparison={providerComparison} />}
  </details>;
}

const probability = (p: number | null | undefined) => p == null ? '\u2014' : p < .0001 ? '< 0.0001' : p.toFixed(4);

function OccurrenceSummaryTable({ left, right, rows, leftLabel, rightLabel, tests }: { left: OccurrenceSample[]; right: OccurrenceSample[]; rows: OccurrenceRow[]; leftLabel: string; rightLabel: string; tests: FeatureTest[] }) {
  const statistics = (samples: OccurrenceSample[], row: OccurrenceRow) => {
    const summary = summarizeOccurrences(samples, row);
    return summary.mean === null ? number(null) : `${number(summary.mean)} \u00b1 ${number(summary.sd)}`;
  };
  return <div className="table-wrap"><table className="occurrence-summary-table" aria-label="Occurrence counts and translation comparison"><thead><tr><th scope="col">Label</th><th scope="col">{leftLabel}<small>Mean &plusmn; SD</small></th><th scope="col">{rightLabel}<small>Mean &plusmn; SD</small></th><th scope="col">Difference<small>Right &minus; left</small></th><th scope="col">p (unadjusted)</th><th scope="col">Result</th></tr></thead><tbody>{rows.map(row => { const test = tests.find(t => t.key === row.key); return <tr key={row.key} data-row-kind={row.kind}><th scope="row">{row.label}</th><td>{statistics(left, row)}</td><td>{statistics(right, row)}</td><td>{number(test?.difference ?? null)}</td><td>{probability(test?.p)}</td><td>{test?.p == null ? 'Unavailable' : test.p < .05 ? 'Significant' : 'Not detected'}</td></tr>; })}</tbody></table></div>;
}

function OccurrenceComparisonBody({ documents, currentGroup, providerComparison }: { documents: DocumentRow[]; currentGroup: ProviderLanguageGroup; providerComparison: boolean }) {
  const id = useId();
  const [generationDocuments, setGenerationDocuments] = useState<StatisticalDocument[]>([]);
  const [conditionKey, setConditionKey] = useState('');
  const conditions = useMemo(() => generationConditions(generationDocuments, currentGroup.provider), [generationDocuments, currentGroup.provider]);
  const condition = conditions.find(c => c.key === conditionKey) || conditions[0];
  const groups = useMemo(() => providerLanguageGroups(documents).map(g => ({...g, attempts: g.attempts.filter(a => g.provider !== currentGroup.provider || !condition || condition.ids.has(a.document.id))})), [documents, condition, currentGroup.provider]);
  const [cohorts, setCohorts] = useState<EvaluationCohort[]>([]);
  const [cohortKey, setCohortKey] = useState('');
  const [loading, setLoading] = useState(true), [error, setError] = useState(''), [refresh, setRefresh] = useState(0);
  const [leftKey, setLeftKey] = useState(setKey(currentGroup));
  const otherLanguage = providerComparison ? groups.find(group => group.language !== currentGroup.language) : undefined;
  const [rightKey, setRightKey] = useState(setKey(otherLanguage || currentGroup));
  const [leftVersion, setLeftVersion] = useState<ConversationVersion>('original');
  const [rightVersion, setRightVersion] = useState<ConversationVersion>(otherLanguage ? 'original' : 'english');
  const documentIds = documents.map(doc => doc.id).sort().join(',');
  useEffect(() => {
    let alive = true; setLoading(true); setError('');
    void (async () => {
      const ids = documentIds.split(',').filter(Boolean), baselines: OccurrenceBaseline[] = [], generation = new Map<string, StatisticalDocument['generation']>();
      for (let start = 0; start < ids.length; start += 100) {
        const metadata = await supabase!.from('conversation_details').select('id,api_source:transcript->api_source').in('id', ids.slice(start, start + 100));
        if (metadata.error) throw metadata.error;
        for (const row of metadata.data as unknown as {id:string;api_source?:StatisticalDocument['generation'];transcript?:{api_source?:StatisticalDocument['generation']}}[]) generation.set(row.id, row.api_source || row.transcript?.api_source);
        for (let offset = 0; ; offset += 500) {
          const { data, error } = await supabase!.from('llm_baselines')
            .select('id,conversation_id,rubric_hash,annotations,model,prompt_version,prompt_sha256,generation_config,created_at')
            .in('conversation_id', ids.slice(start, start + 100)).order('created_at', { ascending: false }).order('id').range(offset, offset + 499);
          if (error) throw error; baselines.push(...data as OccurrenceBaseline[]); if (data.length < 500) break;
        }
      }
      const hashes = [...new Set(baselines.map(b => b.rubric_hash))], rubrics = new Map<string, RubricSnapshot>();
      for (let start = 0; start < hashes.length; start += 100) {
        const { data, error } = await supabase!.from('rubric_versions').select('hash,snapshot').in('hash', hashes.slice(start, start + 100));
        if (error) throw error; for (const row of data) rubrics.set(row.hash, row.snapshot as RubricSnapshot);
      }
      if (baselines.some(b => !rubrics.has(b.rubric_hash))) throw new Error('A saved evaluation is missing its rubric.');
      if (alive) { setCohorts(evaluationCohorts(baselines, rubrics)); setGenerationDocuments(documents.map(d => ({...d, generation:generation.get(d.id)}))); }
    })().catch(err => { if (alive) setError(err.message || 'Could not load saved evaluations.'); }).finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [documentIds, refresh]);
  const currentIds = new Set(currentGroup.attempts.flatMap(a => [a.document.id, ...a.translations.map(t => t.id)]));
  const cohort = cohorts.find(c => c.key === cohortKey) || cohorts.find(c => c.baselines.some(b => currentIds.has(b.conversation_id))) || cohorts[0];
  const rows = cohort ? occurrenceRows(cohort.rubric).filter(row => row.kind === 'feature') : [];
  const leftGroup = groups.find(g => setKey(g) === leftKey) || currentGroup;
  const rightGroup = groups.find(g => setKey(g) === rightKey) || currentGroup;
  const lv = leftVersion, rv = rightVersion;
  let left = cohort ? occurrenceSamples(leftGroup, lv, cohort) : [], right = cohort ? occurrenceSamples(rightGroup, rv, cohort) : [];
  const paired = setKey(leftGroup) === setKey(rightGroup) && leftGroup.language !== 'en' && lv !== rv;
  const pairCount = paired ? matchedOccurrenceSamples(left, right).left.length : 0;
  if (paired) ({ left, right } = matchedOccurrenceSamples(left, right));
  const statisticalSamples = (samples: OccurrenceSample[]): StatisticalSample[] => samples.flatMap(s => s.counts && s.document ? [{id:s.document.id, rootId:s.rootId, counts:s.counts}] : []);
  const report = useMemo(() => languageStatistics({paired, features:rows.map(r => ({key:r.key, name:r.label})), topics:[{key:'selected', name:'Selected topic', left:statisticalSamples(left), right:statisticalSamples(right)}]}), [cohort, leftGroup, rightGroup, lv, rv]);
  const tests = report.views[0].rows;
  const groupSelect = (side: 'Left' | 'Right', key: string, change: (key: string) => void, view: ConversationVersion, changeView: (view: ConversationVersion) => void) => <fieldset><legend>{side} set</legend><label htmlFor={`${id}-${side}-set`}>{providerComparison ? 'Original language' : 'Provider and original language'}<select id={`${id}-${side}-set`} aria-label={`${side} ${providerComparison ? 'language' : 'provider and language'}`} value={key} onChange={event => change(event.target.value)}>{groups.map(group => <option key={setKey(group)} value={setKey(group)}>{providerComparison ? languageName(group.language) : groupLabel(group)}</option>)}</select></label><label htmlFor={`${id}-${side}-version`}>Conversation version<select id={`${id}-${side}-version`} aria-label={`${side} conversation version`} value={view} onChange={event => changeView(event.target.value as ConversationVersion)}><option value="original">Original conversations</option><option value="english">English versions</option></select></label></fieldset>;
  const selectors = <div className="occurrence-set-selectors">{groupSelect('Left', setKey(leftGroup), setLeftKey, leftVersion, setLeftVersion)}{groupSelect('Right', setKey(rightGroup), setRightKey, rightVersion, setRightVersion)}</div>;
  return <div className="set-occurrence-body">
    <p>Counts sum saved section-level occurrences for each label.</p>
    {loading ? <p role="status">Loading occurrence counts...</p> : error ? <div role="alert"><p>{error}</p><button onClick={() => setRefresh(n => n + 1)}>Retry loading counts</button></div> : !cohort ? <p role="status">No section-based evaluations are saved for this topic yet.</p> : <>
      <div className="occurrence-source-controls"><label htmlFor={`${id}-evaluation`}>Saved LLM evaluation<select id={`${id}-evaluation`} value={cohort.key} onChange={event => setCohortKey(event.target.value)}>{cohorts.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}</select></label><button className="secondary" onClick={() => setRefresh(n => n + 1)}>Refresh counts</button></div>
      {conditions.length > 0 && <label htmlFor={`${id}-condition`}>Tutor generation prompt<select id={`${id}-condition`} value={condition?.key} onChange={event => setConditionKey(event.target.value)}>{conditions.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}</select></label>}
      {condition && <p className="occurrence-help">{condition.prompt}</p>}
      <p className="occurrence-help">Uses the latest compatible run per try. Missing evaluations are unavailable; evaluated absences count as zero.</p>
      {providerComparison ? selectors : <details className="occurrence-language-options"><summary>Compare other languages or English sets</summary>{selectors}</details>}
      <p role="status">{paired ? `${pairCount} of ${leftGroup.attempts.length} matched original/translation pairs; only tries evaluated on both sides are included.` : `Left: ${left.filter(s => s.counts).length} of ${left.length} evaluated tries. Right: ${right.filter(s => s.counts).length} of ${right.length} evaluated tries. Language sets are independent; try numbers are not treated as pairs.`}</p>
      <p className="occurrence-help">Mean and sample SD (n &minus; 1) are calculated across evaluated tries. SD is unavailable for fewer than two tries.</p>
      <p className="occurrence-help">Two-sided permutation tests use conversations as observations{paired ? ' with matched original/translation pairs' : '; independently generated languages are unpaired'}. Results use unadjusted p &lt; 0.05, without correction for multiple comparisons. Small samples have limited power; &ldquo;Not detected&rdquo; does not establish equality. Counts are not adjusted for response length.</p>
      {!report.coverage[0]?.included && <p role="status">Statistical significance unavailable: {report.coverage[0]?.reason}</p>}
      <OccurrenceSummaryTable tests={tests} left={left} right={right} rows={rows} leftLabel={`${groupLabel(leftGroup)} \u00b7 ${versionLabel(lv, leftGroup)}`} rightLabel={`${groupLabel(rightGroup)} \u00b7 ${versionLabel(rv, rightGroup)}`} />
    </>}
  </div>;
}
