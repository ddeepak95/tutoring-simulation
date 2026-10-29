import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './lib';
import { dashboardColumns, dashboardDocument } from './dashboard-data';
import { conversationOrigin } from './conversation-origin';
import { providerLanguagePath } from './admin-conversation-groups';
import { genericTopic, topicKey } from './topic-groups';
import { languageId, languageName } from './languages';
import type { DocumentRow } from './types';

export function conversationListPath(document: DocumentRow, source?: DocumentRow | null) {
  const context = source || document;
  const key = topicKey(context);
  if (!key) return '/';
  const topicPath = `/topics/${encodeURIComponent(key)}`;
  const origin = conversationOrigin(document, source ? [source] : []);
  const language = origin.originalLanguage;
  if (!language) return topicPath;
  const provider = context.transcript.provider?.trim() || (context.transcript.chatgpt_source ? 'ChatGPT' : 'Unknown provider');
  try { return providerLanguagePath(key, provider, languageId(language)); } catch { return topicPath; }
}

export function ConversationBreadcrumbs({ document, currentPage = 'Conversation' }: { document: DocumentRow | null; currentPage?: string }) {
  const [parent, setParent] = useState<{ id: string; source: DocumentRow } | null>(null);
  const sourceId = document ? conversationOrigin(document).sourceId : null;
  useEffect(() => {
    let alive = true;
    if (!document || !sourceId) return;
    const id = document.id;
    void (async () => {
      try {
        const { data, error } = await supabase!.from('conversation_details').select(dashboardColumns).eq('id', sourceId).maybeSingle();
        if (alive && !error && data) setParent({ id, source: dashboardDocument(data as unknown as Parameters<typeof dashboardDocument>[0]) });
      } catch { /* Keep the topic fallback if the original is unavailable. */ }
    })();
    return () => { alive = false; };
  }, [document?.id, sourceId]);
  const source = parent?.id === document?.id ? parent?.source : null;
  const listPath = document ? sourceId && !source ? `/topics/${encodeURIComponent(topicKey(document))}` : conversationListPath(document, source) : '/';
  const context = source || document;
  const key = context ? topicKey(context) : '';
  const topicPath = key ? `/topics/${encodeURIComponent(key)}` : '/';
  const provider = context?.transcript.provider?.trim() || (context?.transcript.chatgpt_source ? 'ChatGPT' : 'Unknown provider');
  const language = document ? conversationOrigin(document, source ? [source] : []).originalLanguage : null;
  return <nav className="conversation-breadcrumbs" aria-label="Conversation navigation">
    <Link to="/">All topics</Link>
    {context && key && <><span aria-hidden="true">/</span><Link to={topicPath}>{genericTopic(context)}</Link></>}
    {language && listPath !== topicPath && listPath !== '/' && <><span aria-hidden="true">/</span><Link to={listPath}>{provider} / {languageName(language)}</Link></>}
    <span aria-hidden="true">/</span><span aria-current="page">{currentPage}</span>
  </nav>;
}
