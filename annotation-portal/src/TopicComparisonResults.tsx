import { Link } from 'react-router-dom';
import { comparisonModeLabel, type ComparisonAssignment, type ComparisonChoice, type ComparisonMode, type ComparisonPair, type ComparisonQuestion } from './comparison';
import { languageId, languageName } from './languages';
import { conversationTitle, type TopicGroup } from './topic-groups';
import type { DocumentRow } from './types';

type Votes = Record<ComparisonChoice, number>;
type PairResult = { topic: TopicGroup; pair: ComparisonPair; a: DocumentRow; b: DocumentRow; assigned: number; submitted: ComparisonAssignment[]; first: string; second: string; reversed: boolean };
const emptyVotes = (): Votes => ({ a: 0, b: 0, tie: 0 });
const voteTotal = (votes: Votes) => votes.a + votes.b + votes.tie;
const origin = (doc: DocumentRow) => languageName(doc.transcript.original_language || doc.language);
const condition = (doc: DocumentRow) => `${doc.transcript.provider || 'Unknown provider'} · ${doc.source_conversation_id || doc.transcript.source_conversation_id ? `translated from ${origin(doc)}` : `original ${origin(doc)}`}`;

function questionVotes(row: ComparisonAssignment, question: ComparisonQuestion, mode: ComparisonMode): Votes {
  const votes = emptyVotes();
  const answers = mode === 'whole_conversation' || question.scope === 'overall' ? [row.overall_answer] : row.answers || [];
  for (const answer of answers) {
    const choice = answer?.values?.[question.key];
    if (choice === 'a' || choice === 'b' || choice === 'tie') votes[choice]++;
  }
  return votes;
}

function relevantQuestions(pair: ComparisonPair) {
  return (pair.questions || []).filter(question => question.key !== 'instructional_sequence' && question.key !== 'overall_conversational_naturalness');
}

function VoteBar({ votes, first, second }: { votes: Votes; first: string; second: string }) {
  const total = voteTotal(votes);
  if (!total) return <span className="unassigned">No submitted answers</span>;
  return <div className="comparison-vote-result"><div className="comparison-vote-bar" role="img" aria-label={`${first}: ${votes.a}, ${second}: ${votes.b}, Tie: ${votes.tie}`}><span className="first" style={{ width: `${votes.a / total * 100}%` }} /><span className="second" style={{ width: `${votes.b / total * 100}%` }} /><span className="tie" style={{ width: `${votes.tie / total * 100}%` }} /></div><small>{votes.a} / {votes.b} / {votes.tie} · {total} answer{total === 1 ? '' : 's'}</small></div>;
}

function pairResults(groups: TopicGroup[], pairs: ComparisonPair[], assignments: ComparisonAssignment[]) {
  return groups.flatMap(topic => pairs.flatMap(pair => {
    const a = topic.documents.find(doc => doc.id === pair.conversation_a_id);
    const b = topic.documents.find(doc => doc.id === pair.conversation_b_id);
    if (!a || !b) return [];
    const rows = assignments.filter(row => row.is_active !== false && (row.pair_id === pair.id || (!row.pair_id && row.conversation_a_id === a.id && row.conversation_b_id === b.id && (row.mode || 'turn_wise') === (pair.mode || 'turn_wise'))));
    const aName = condition(a), bName = condition(b);
    const reversed = aName.localeCompare(bName) > 0;
    return [{ topic, pair, a, b, assigned: rows.length, submitted: rows.filter(row => row.status === 'submitted'), first: reversed ? bName : aName, second: reversed ? aName : bName, reversed }];
  }));
}

function AggregateComparison({ results }: { results: PairResult[] }) {
  const groups = new Map<string, PairResult[]>();
  for (const result of results) {
    const key = JSON.stringify([result.pair.mode || 'turn_wise', result.first, result.second]);
    groups.set(key, [...(groups.get(key) || []), result]);
  }
  return <section className="card comparison-results-summary"><h2>Across topics</h2><p>Submitted annotators are averaged within each topic, then topics are weighted equally. Turn-wise and whole-conversation answers are shown separately.</p><div className="comparison-summary-grid">{[...groups].map(([key, items]) => {
    const [mode, first, second] = JSON.parse(key) as [ComparisonMode, string, string];
    const submitted = items.filter(item => item.submitted.length);
    const submittedTopics = new Set(submitted.map(item => item.topic.key)).size;
    const totalTopics = new Set(items.map(item => item.topic.key)).size;
    const questions = [...new Map(items.flatMap(item => relevantQuestions(item.pair)).map(question => [question.key, question])).values()];
    return <section className="comparison-summary-card" key={key}><div className="comparison-summary-heading"><h3>{comparisonModeLabel(mode)}</h3><span className="pill">{submittedTopics}/{totalTopics} topics with results</span></div><p><strong>A:</strong> {first}<br /><strong>B:</strong> {second}</p><div className="comparison-question-results">{questions.map(question => {
      const byTopic = new Map<string, PairResult[]>();
      for (const item of submitted) byTopic.set(item.topic.key, [...(byTopic.get(item.topic.key) || []), item]);
      const topicShares = [...byTopic.values()].flatMap(topicPairs => {
        const annotatorShares = topicPairs.flatMap(item => item.submitted.flatMap(row => {
          const raw = questionVotes(row, question, mode);
          const total = voteTotal(raw);
          if (!total) return [];
          const a = item.reversed ? raw.b : raw.a;
          const b = item.reversed ? raw.a : raw.b;
          return [{ a: a / total, b: b / total, tie: raw.tie / total }];
        }));
        return annotatorShares.length ? [{ a: annotatorShares.reduce((sum, vote) => sum + vote.a, 0) / annotatorShares.length, b: annotatorShares.reduce((sum, vote) => sum + vote.b, 0) / annotatorShares.length, tie: annotatorShares.reduce((sum, vote) => sum + vote.tie, 0) / annotatorShares.length }] : [];
      });
      if (!topicShares.length) return null;
      const mean = { a: topicShares.reduce((sum, vote) => sum + vote.a, 0) / topicShares.length, b: topicShares.reduce((sum, vote) => sum + vote.b, 0) / topicShares.length, tie: topicShares.reduce((sum, vote) => sum + vote.tie, 0) / topicShares.length };
      return <div className="comparison-question-result" key={question.key}><strong>{question.label}</strong><div className="comparison-vote-bar" role="img" aria-label={`${question.label}: ${first} ${Math.round(mean.a * 100)}%, ${second} ${Math.round(mean.b * 100)}%, Tie ${Math.round(mean.tie * 100)}%`}><span className="first" style={{ width: `${mean.a * 100}%` }} /><span className="second" style={{ width: `${mean.b * 100}%` }} /><span className="tie" style={{ width: `${mean.tie * 100}%` }} /></div><small>{Math.round(mean.a * 100)}% / {Math.round(mean.b * 100)}% / {Math.round(mean.tie * 100)}% · {topicShares.length} topic{topicShares.length === 1 ? '' : 's'}</small></div>;
    })}{!submitted.length && <p className="unassigned">No submitted comparisons yet.</p>}</div></section>;
  })}</div><small className="comparison-results-key"><i className="first" /> A wins <i className="second" /> B wins <i className="tie" /> Ties · Values appear in A / B / Tie order.</small></section>;
}

export function TopicComparisonResults({ groups, pairs, assignments }: { groups: TopicGroup[]; pairs: ComparisonPair[]; assignments: ComparisonAssignment[] }) {
  const results = pairResults(groups, pairs, assignments);
  if (!results.length) return <section className="card empty"><h2>No comparison pairs yet</h2><p>Create and assign pairs from the Comparisons page to see their results here.</p><Link to="/comparisons">Manage comparisons</Link></section>;
  const hasEnglishTamilPair = results.some(result => [languageId(result.a.transcript.original_language || result.a.language), languageId(result.b.transcript.original_language || result.b.language)].sort().join(':') === 'en:ta');
  return <div className="topic-label-list">{!hasEnglishTamilPair && <p className="card comparison-data-note">No English-versus-Tamil-origin Compare pairs exist yet. The charts show the saved pair types named below.</p>}<AggregateComparison results={results} />{groups.filter(group => results.some(result => result.topic.key === group.key)).map(group => <details className="card comparison-topic-results" key={group.key}><summary><h2>{group.name}</h2><small>{results.filter(result => result.topic.key === group.key).length} pair{results.filter(result => result.topic.key === group.key).length === 1 ? '' : 's'}</small></summary><div className="comparison-topic-pairs">{results.filter(result => result.topic.key === group.key).map(result => <section className="comparison-topic-pair" key={result.pair.id}><div className="comparison-summary-heading"><h3>{comparisonModeLabel(result.pair.mode || 'turn_wise')}</h3><span className="pill">{result.submitted.length}/{result.assigned} submitted</span></div><p><strong>A:</strong> <Link to={`/conversations/${result.a.id}/labeling`}>{conversationTitle(result.a)}</Link> · {condition(result.a)}<br /><strong>B:</strong> <Link to={`/conversations/${result.b.id}/labeling`}>{conversationTitle(result.b)}</Link> · {condition(result.b)}</p><div className="comparison-question-results">{relevantQuestions(result.pair).map(question => {
    const votes = result.submitted.reduce((total, row) => { const next = questionVotes(row, question, result.pair.mode || 'turn_wise'); return { a: total.a + next.a, b: total.b + next.b, tie: total.tie + next.tie }; }, emptyVotes());
    return <div className="comparison-question-result" key={question.key}><strong>{question.label}</strong><VoteBar votes={votes} first="A" second="B" /></div>;
  })}</div></section>)}</div></details>)}</div>;
}
