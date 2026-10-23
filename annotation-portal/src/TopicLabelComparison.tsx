import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { ComparisonAssignment, ComparisonPair } from './comparison';
import { countFeatureItems, featureSubitemCounts } from './feature-counts';
import { languageId } from './languages';
import { bundledRubric, fetchAllRows } from './lib';
import { conversationTitle, groupByTopic, type TopicGroup } from './topic-groups';
import { TopicComparisonResults } from './TopicComparisonResults';
import type { Annotation, DocumentRow, Feature, Status } from './types';

type LabelRow = { conversation_id: string; task_type: string; status: Status; is_active: boolean; annotations: Annotation[] };
type Pair = { english: DocumentRow; tamilTranslation: DocumentRow };
type CompletedTopic = { name: string; english: LabelRow[]; tamil: LabelRow[] };
type PairedPoint = { name: string; english: number; tamil: number };
const countText = (value: number) => Number.isInteger(value) ? String(value) : value.toFixed(1);
const sourceId = (doc: DocumentRow) => doc.source_conversation_id || doc.transcript.source_conversation_id;
const submittedFor = (labels: LabelRow[], id: string) => labels.filter(row => row.conversation_id === id);
const averageFeatureCount = (rows: LabelRow[], key: string) => rows.length ? rows.reduce((sum, row) => sum + countFeatureItems(row.annotations || [], key), 0) / rows.length : null;
const averageAllFeatureCount = (rows: LabelRow[]) => rows.reduce((sum, row) => sum + bundledRubric.rubric.reduce((featureSum, feature) => featureSum + countFeatureItems(row.annotations || [], feature.key), 0), 0) / rows.length;

function originalLanguage(doc: DocumentRow, documents: DocumentRow[]) {
  const source = documents.find(candidate => candidate.id === sourceId(doc));
  return languageId(doc.transcript.original_language || source?.language || (!sourceId(doc) ? doc.language : null));
}

function comparisonPair(group: TopicGroup): Pair | null {
  const english = group.documents.filter(doc => !sourceId(doc) && languageId(doc.language) === 'en' && originalLanguage(doc, group.documents) === 'en' && (doc.transcript.provider || 'ChatGPT') === 'ChatGPT');
  const tamilTranslation = group.documents.filter(doc => sourceId(doc) && languageId(doc.language) === 'en' && originalLanguage(doc, group.documents) === 'ta' && group.documents.some(source => source.id === sourceId(doc) && languageId(source.language) === 'ta'));
  return english.length === 1 && tamilTranslation.length === 1 ? { english: english[0], tamilTranslation: tamilTranslation[0] } : null;
}

function PairedDots({ name, english, tamil, maximum, mean = false }: { name: string; english: number; tamil: number; maximum: number; mean?: boolean }) {
  const englishPosition = english / maximum * 100;
  const tamilPosition = tamil / maximum * 100;
  const close = Math.abs(englishPosition - tamilPosition) < 8;
  const left = english <= tamil ? english : tamil;
  const right = english <= tamil ? tamil : english;
  const order = english <= tamil ? 'E / T' : 'T / E';
  return <div className={`paired-row${mean ? ' paired-mean' : ''}`} aria-label={`${name}: English original ${countText(english)}, Tamil-origin translation ${countText(tamil)}`}>
    <span className="paired-topic" title={name}>{name}</span>
    <span className={`paired-track${english === tamil ? ' same-value' : ''}`} aria-hidden="true"><span className="paired-middle" style={{ left: `${Math.min(englishPosition, tamilPosition)}%`, width: `${Math.abs(englishPosition - tamilPosition)}%` }} /><span className={`paired-marker english${close ? ' close' : ''}`} style={{ left: `${englishPosition}%` }}><span className="paired-letter">E</span><i className="paired-dot" /></span><span className={`paired-marker tamil${close ? ' close' : ''}`} style={{ left: `${tamilPosition}%` }}><span className="paired-letter">T</span><i className="paired-dot" /></span></span>
    <span className="paired-values" title={`Left to right: ${order}`}><span>{countText(left)}</span><span aria-hidden="true"> / </span><span>{countText(right)}</span></span>
  </div>;
}

function PairedFeatureChart({ title, points }: { title: string; points: PairedPoint[] }) {
  const englishMean = points.reduce((sum, point) => sum + point.english, 0) / points.length;
  const tamilMean = points.reduce((sum, point) => sum + point.tamil, 0) / points.length;
  const maximum = Math.max(1, ...points.flatMap(point => [point.english, point.tamil]));
  return <section className="aggregate-feature" aria-label={`${title} paired results`}><h3>{title}</h3><div className="paired-rows">{points.map(point => <PairedDots key={point.name} {...point} maximum={maximum} />)}<PairedDots name="Topic mean" english={englishMean} tamil={tamilMean} maximum={maximum} mean /></div><div className="paired-axis"><span>0</span><span>{countText(maximum)}</span></div></section>;
}

function representationTypeCount(row: LabelRow, feature: Feature, type: string) {
  const representationTypes = featureSubitemCounts(row.annotations || [], feature).find(group => group.label === 'Representation type');
  return representationTypes?.counts.find(item => item.label === type)?.count || 0;
}

function RepresentationCounts({ completed }: { completed: CompletedTopic[] }) {
  const feature = bundledRubric.rubric.find(item => item.key === 'representations');
  if (!feature) return null;
  const types = [...(feature.fields.find(field => field.key === 'representation_type')?.options || [])];
  const hasUnspecified = completed.some(topic => [...topic.english, ...topic.tamil].some(row => representationTypeCount(row, feature, 'Not specified') > 0));
  if (hasUnspecified) types.push('Not specified');
  return <section className="card aggregate-label-card representation-label-card" aria-label="Representation subcategory comparison"><div className="aggregate-heading"><div><h2>Representation types</h2><p>Compare each kind of representation across the same {completed.length} paired topic{completed.length === 1 ? '' : 's'}. Diagram and flowchart counts include multiple items recorded in one highlight.</p></div></div><div className="aggregate-legend"><span><i className="aggregate-swatch english" />English original</span><span><i className="aggregate-swatch tamil" />Tamil-origin translation</span><small>Values follow dots from left to right</small></div><div className="aggregate-chart">{types.map(type => <PairedFeatureChart key={type} title={type} points={completed.map(topic => ({ name: topic.name, english: topic.english.reduce((sum, row) => sum + representationTypeCount(row, feature, type), 0) / topic.english.length, tamil: topic.tamil.reduce((sum, row) => sum + representationTypeCount(row, feature, type), 0) / topic.tamil.length }))} />)}</div><p className="aggregate-note">Each type has its own scale, starting at zero. The topic mean gives each topic equal weight.</p></section>;
}

function AggregateCounts({ groups, labels }: { groups: TopicGroup[]; labels: LabelRow[] }) {
  const completed = groups.flatMap(group => {
    const pair = comparisonPair(group);
    if (!pair) return [];
    const english = submittedFor(labels, pair.english.id);
    const tamil = submittedFor(labels, pair.tamilTranslation.id);
    return english.length && tamil.length ? [{ name: group.name, english, tamil }] : [];
  });
  const combined = completed.map(topic => ({ name: topic.name, english: averageAllFeatureCount(topic.english), tamil: averageAllFeatureCount(topic.tamil) }));
  return <>{completed.length > 0 && <section className="card aggregate-label-card" aria-label="All feature counts combined"><div className="aggregate-heading"><div><h2>All features combined</h2><p>Total items across every current instructional feature, averaged across submitted annotators within each conversation.</p></div><span className="pill">{completed.length} paired topics</span></div><div className="aggregate-legend"><span><i className="aggregate-swatch english" />English original</span><span><i className="aggregate-swatch tamil" />Tamil-origin translation</span><small>Values follow dots from left to right</small></div><div className="aggregate-chart aggregate-chart-single"><PairedFeatureChart title="Total feature items" points={combined} /></div><p className="aggregate-note">The topic mean gives every topic equal weight. Question and diagram quantities use their recorded item counts.</p></section>}<section className="card aggregate-label-card" aria-label="Aggregate feature label comparison"><div className="aggregate-heading"><div><h2>Across topics</h2><p>Each line joins the English and Tamil-origin results for one topic. The mean gives every topic equal weight.</p></div><span className="pill">{completed.length} of {groups.length} topics</span></div>
    {completed.length ? <><div className="aggregate-legend"><span><i className="aggregate-swatch english" />English original</span><span><i className="aggregate-swatch tamil" />Tamil-origin translation</span><small>Values follow dots from left to right</small></div><div className="aggregate-chart">{bundledRubric.rubric.map(feature => {
      const points = completed.map(topic => ({ name: topic.name, english: averageFeatureCount(topic.english, feature.key)!, tamil: averageFeatureCount(topic.tamil, feature.key)! }));
      return <PairedFeatureChart key={feature.key} title={feature.short_label} points={points} />;
    })}</div><p className="aggregate-note">Each feature has its own scale, starting at zero. Counts are average feature items per submitted Label task.</p></> : <p className="aggregate-empty">No topic has submitted Label work for both conversations yet.</p>}
  </section>{completed.length > 0 && <RepresentationCounts completed={completed} />}</>;
}

function TopicCounts({ group, labels }: { group: TopicGroup; labels: LabelRow[] }) {
  const pair = comparisonPair(group);
  if (!pair) return <section className="card topic-label-card"><div className="topic-feature-heading"><h2>{group.name}</h2><p>An English original and its matching Tamil-origin English translation are needed for this topic.</p></div></section>;
  const englishLabels = submittedFor(labels, pair.english.id);
  const tamilLabels = submittedFor(labels, pair.tamilTranslation.id);
  return <section className="card topic-label-card"><div className="topic-feature-heading"><h2>{group.name}</h2><p>Average feature items per submitted Label task. Difference is Tamil-origin minus English-original. Counts in column headings show submitted annotators.</p></div><div className="table-wrap"><table className="feature-count-table"><thead><tr><th scope="col">Feature</th><th scope="col"><Link to={`/conversations/${pair.english.id}/labeling`}>{conversationTitle(pair.english)}</Link><small>English original · {englishLabels.length} submitted</small></th><th scope="col"><Link to={`/conversations/${pair.tamilTranslation.id}/labeling`}>{conversationTitle(pair.tamilTranslation)}</Link><small>Tamil original, English translation · {tamilLabels.length} submitted</small><Link className="feature-source-link" to={`/conversations/${sourceId(pair.tamilTranslation)}/labeling`}>View Tamil source</Link></th><th scope="col">Difference<small>Tamil-origin − English-original</small></th></tr></thead><tbody>{bundledRubric.rubric.map(feature => {
    const english = averageFeatureCount(englishLabels, feature.key);
    const tamil = averageFeatureCount(tamilLabels, feature.key);
    const difference = english === null || tamil === null ? null : tamil - english;
    return <tr key={feature.key}><th scope="row">{feature.short_label}</th><td>{english === null ? <span className="unassigned" aria-label="No submitted labels">—</span> : <strong>{countText(english)}</strong>}</td><td>{tamil === null ? <span className="unassigned" aria-label="No submitted labels">—</span> : <strong>{countText(tamil)}</strong>}</td><td>{difference === null ? <span className="unassigned" aria-label="Comparison unavailable">—</span> : <strong>{difference > 0 ? '+' : ''}{countText(difference)}</strong>}</td></tr>;
  })}</tbody></table></div></section>;
}

export function TopicLabelComparison() {
  const { topicKey } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('view') === 'comparisons' ? 'comparisons' : 'labels';
  const [groups, setGroups] = useState<TopicGroup[]>([]);
  const [labels, setLabels] = useState<LabelRow[]>([]);
  const [pairs, setPairs] = useState<ComparisonPair[]>([]);
  const [comparisonAssignments, setComparisonAssignments] = useState<ComparisonAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const [documents, assignments, comparisonPairs, comparisons] = await Promise.all([
          fetchAllRows<DocumentRow>('conversation_details'),
          fetchAllRows<LabelRow>('assignments', 'id,conversation_id,task_type,status,is_active,annotations'),
          fetchAllRows<ComparisonPair>('comparison_pairs'),
          fetchAllRows<ComparisonAssignment>('comparison_assignments'),
        ]);
        if (!active) return;
        setGroups(groupByTopic(documents));
        setLabels(assignments.filter(row => row.is_active && row.task_type === 'label' && row.status === 'submitted'));
        setPairs(comparisonPairs);
        setComparisonAssignments(comparisons);
      } catch (failure) { if (active) setError(failure instanceof Error ? failure.message : String(failure)); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, []);
  const selected = topicKey ? groups.filter(group => group.key === topicKey) : tab === 'labels' ? groups.filter(group => comparisonPair(group)) : groups.filter(group => pairs.some(pair => group.documents.some(doc => doc.id === pair.conversation_a_id) && group.documents.some(doc => doc.id === pair.conversation_b_id)));

  return <main className="dashboard topic-label-page"><div className="page-heading"><div><span className="eyebrow">TOPIC RESULTS</span><h1>{topicKey ? selected[0]?.name || 'Topic results' : tab === 'labels' ? 'English and Tamil-origin conversations' : 'Comparison results'}</h1><p>{tab === 'labels' ? 'Compare labels on English originals with labels on English translations of Tamil originals.' : 'Review submitted Compare answers. Each pair identifies its actual conversations and comparison mode.'}</p></div><div className="actions">{topicKey && <Link className="secondary link-button" to={tab === 'comparisons' ? '/topics/labels?view=comparisons' : '/topics/labels'}>All topics</Link>}<Link className="secondary link-button" to="/">← Conversations</Link></div></div>
    <div className="topic-result-tabs" role="tablist" aria-label="Topic result type"><button id="topic-labels-tab" role="tab" aria-selected={tab === 'labels'} aria-controls="topic-results-panel" onClick={() => setSearchParams({})}>Labels</button><button id="topic-comparisons-tab" role="tab" aria-selected={tab === 'comparisons'} aria-controls="topic-results-panel" onClick={() => setSearchParams({ view: 'comparisons' })}>Comparisons</button></div>
    {error && <p className="error" role="alert">{error}</p>}
    <div id="topic-results-panel" role="tabpanel" aria-labelledby={tab === 'labels' ? 'topic-labels-tab' : 'topic-comparisons-tab'}>{loading ? <p role="status">Loading topic results…</p> : topicKey && !selected.length ? <section className="card empty"><h2>Topic not found</h2><p>This topic may have been removed or renamed.</p></section> : tab === 'comparisons' ? <TopicComparisonResults groups={selected} pairs={pairs} assignments={comparisonAssignments} /> : !selected.length ? <section className="card empty"><h2>No matching conversations</h2><p>Each topic needs an English original and an English translation linked to its Tamil original.</p></section> : <div className="topic-label-list">{!topicKey && <AggregateCounts groups={selected} labels={labels} />}{selected.map(group => <TopicCounts key={group.key} group={group} labels={labels} />)}</div>}</div>
  </main>;
}
