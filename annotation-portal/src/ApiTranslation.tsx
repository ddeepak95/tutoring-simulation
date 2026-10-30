import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from './lib';
import { readSections } from './section-registry';
import { alignedApiTurns, pairedApiTurns, canViewApiTranslation, translationAlignmentStale, type AlignedTurn } from './api-translation';
import { MarkdownTranscript } from './MarkdownTranscript';
import type { Conversation } from './types';

export function useApiEnglish(conversation: Conversation, conversationId: string, initiallyEnabled = false, turnOnly = false) {
  const available = canViewApiTranslation(conversation);
  const [enabled, setEnabled] = useState(initiallyEnabled);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [turns, setTurns] = useState<AlignedTurn[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [pair, setPair] = useState<{original:Conversation;english:Conversation}|null>(null);
  useEffect(() => {
    if (!enabled || !available) return;
    let alive = true;
    setLoading(true); setError(''); setTurns([]); setPair(null);
    void (async () => {
      const isEnglish = ['api-english/1','api-english-whole/1'].includes(conversation.translation?.version||'');
      const sourceId = isEnglish ? conversation.source_conversation_id! : conversationId;
      const [result, sections] = await Promise.all([
        isEnglish
          ? supabase!.from('conversations').select('id,transcript').eq('id', sourceId)
          : supabase!.from('conversations').select('id,transcript').eq('source_conversation_id', sourceId).eq('language', 'en').order('created_at', { ascending: false }),
        turnOnly ? Promise.resolve([]) : readSections(supabase!, [sourceId], true),
      ]);
      if (result.error) throw result.error;
      const candidate = result.data?.find(row => isEnglish || (['api-english/1','api-english-whole/1'].includes(row.transcript.translation?.version||'')&&!translationAlignmentStale(row.transcript)));
      if (!candidate) throw Error(result.data?.some(row=>translationAlignmentStale(row.transcript))?'Section grouping has changed. Retranslation is needed before comparing these conversations.':'An English translation is not available for this conversation yet.');
      const source: Conversation = isEnglish ? { ...candidate.transcript, conversation_id: sourceId } : { ...conversation, conversation_id: sourceId };
      const english: Conversation = isEnglish ? conversation : candidate.transcript;
      const aligned = turnOnly ? pairedApiTurns(source,english) : alignedApiTurns(source, english, sections);
      if (alive) { setTurns(aligned); setSourceLanguage(source.original_language || ''); setPair({original:source,english}); }
    })().catch(error => { if (alive) setError(error.message || 'Could not load the English translation.'); }).finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [enabled, available, conversation, conversationId, turnOnly]);
  return { available, enabled, toggle: () => setEnabled(value => !value), loading, error, turns, sourceLanguage, pair };
}

export function ApiEnglishComparison({ comparison, sectionFooter }: { comparison: ReturnType<typeof useApiEnglish>; sectionFooter?:(sectionId:string)=>ReactNode }) {
  if (comparison.loading) return <p role="status">Loading English translation…</p>;
  if (comparison.error) return <p className="notice" role="status">{comparison.error}</p>;
  const language = comparison.sourceLanguage;
  let languageName = 'Original';
  try { if (language) languageName = new Intl.DisplayNames(['en'], { type: 'language' }).of(language) || 'Original'; } catch { /* Use the generic label for older language names. */ }
  const render = (text: string, turnId: string) => <MarkdownTranscript text={text} turnId={turnId} annotations={[]} rubric={[]} readonly onHighlight={() => {}} />;
  return <div className="api-english-comparison" aria-label="Original and English conversation">
    <div className="api-parallel-headings"><strong>{languageName} original</strong><strong>English translation</strong></div>
    {comparison.turns.map(turn => <article key={turn.turnId} className={`api-parallel-turn ${turn.speaker}`}>
      <h3>{turn.speaker === 'student' ? 'You' : `Bot · Turn ${turn.turnNumber}`}</h3>
      {turn.passages.map(passage => <section key={passage.id} className="api-parallel-section" data-section-id={turn.speaker === 'tutor' && /^t[1-9]\d*s[1-9]\d*$/.test(passage.id) ? passage.id : undefined} aria-label={passage.label}>
        {turn.speaker === 'tutor' && <h4>{passage.label}</h4>}
        <div className="api-parallel-pair">
          <div className="api-parallel-cell" lang={language || undefined} aria-label={`${languageName} original: ${passage.label}`}>{render(passage.original, turn.turnId)}</div>
          <div className="api-parallel-cell" lang="en" aria-label={`English translation: ${passage.label}`}>{render(passage.english, turn.turnId)}</div>
        </div>
        {turn.speaker==='tutor'&&sectionFooter?.(passage.id)}
      </section>)}
    </article>)}
  </div>;
}
