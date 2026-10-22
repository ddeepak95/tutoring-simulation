import { createElement, Fragment, useEffect, useMemo, useRef, useState, type ComponentProps, type CSSProperties, type ReactNode } from 'react';
import type { Conversation } from './types';
import { supabase, fetchAllRows } from './lib';
import { MarkdownTranscript } from './MarkdownTranscript';
import { sanitizeCapturedHtml } from './capture-document';
import { translateCapturedLayout } from './translated-capture-layout';
import { normalizeCapturedSpeakerLabels } from './captured-speaker-labels';
import { styleCapturedUserBubbles } from './captured-user-bubbles';

export function useCaptureAssets(conversation: Conversation) {
  const [state, setState] = useState<{ id: string | null; assets: Record<string, string>; exactHtml?: string; originalHtml?: string; error: string }>({ id: null, assets: {}, error: '' });
  const id = conversation.archive_source || conversation.chatgpt_source?.extractor_version?.startsWith('agentic-conversation-capture/') || conversation.translation?.version === 'capture-english/1' ? conversation.conversation_id : null;
  useEffect(() => {
    let active = true;
    if (id) void (async () => {
      try {
        const rows: { turn_id: string; html: string; media_html?: string | null }[] = [];
        for (let offset = 0;; offset += 500) {
          const { data, error } = await supabase!.from('conversation_capture_assets').select('turn_id,html,media_html').eq('conversation_id', id).order('turn_id').range(offset, offset + 499);
          if (error) throw error; rows.push(...data);
          if (data.length < 500) break;
        }
        const { data: exact, error: exactError } = await supabase!.from('conversation_capture_documents').select('html').eq('conversation_id', id).maybeSingle();
        const assets = Object.fromEntries(rows.map(row => [row.turn_id, row.media_html || row.html]));
        const fallback = rows.length ? `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff;color:#0d0d0d}body{font-family:system-ui,sans-serif}.capture-conversation{max-width:800px;margin:0 auto;padding:32px 20px 64px}.capture-message{margin:0 0 32px}.capture-speaker{display:block;margin:0 0 10px;color:#555;font:600 14px/1.4 system-ui,sans-serif}</style><main class="capture-conversation">${rows.map(row => { const turn = conversation.messages.find(message => message.turn_id === row.turn_id); const speaker = turn?.speaker === 'tutor' ? 'assistant' : 'user'; const label = speaker === 'assistant' ? 'Bot' : 'You'; return `<article class="capture-message capture-${speaker}" data-turn-id="${row.turn_id}" data-speaker="${speaker}"><strong class="capture-speaker">${label}</strong>${assets[row.turn_id]}</article>`; }).join('')}</main>` : undefined;
        const canTranslateLayout = !conversation.translation || Boolean(conversation.translation.source_messages?.length && conversation.translation.alignment?.length);
        if (active) setState({ id, exactHtml: canTranslateLayout ? exact?.html || fallback : undefined, originalHtml: conversation.translation ? exact?.html : undefined, assets, error: exact?.html || fallback ? '' : exactError ? 'The exact captured layout could not be loaded.' : 'The exact captured layout is unavailable. Reload to retry.' });
      } catch { if (active) setState({ id, assets: {}, error: 'Could not load captured layouts. Reload to retry.' }); }
    })();
    return () => { active = false; };
  }, [id]);
  return id && state.id === id ? { ...state, loading: false } : { id, assets: {} as Record<string, string>, error: '', loading: Boolean(id) };
}
export function CaptureFrame({ html, conversation, visibleTurnIds, selectable = false, onChoose }: { html: string; conversation: Conversation; visibleTurnIds?: string[]; selectable?: boolean; onChoose?: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const choice = useRef({ selectable, onChoose });
  choice.current = { selectable, onChoose };
  return <iframe ref={frame} title={conversation.translation ? 'Translated conversation in original captured layout' : 'Exact original conversation'} sandbox="allow-same-origin" srcDoc={html}
    onLoad={() => {
      const document = frame.current?.contentDocument;
      if (!document) return;
      translateCapturedLayout(document, conversation);
      normalizeCapturedSpeakerLabels(document, conversation);
      styleCapturedUserBubbles(document, conversation);
      if (!visibleTurnIds) return;
      const visible = new Set(visibleTurnIds);
      const style = document.createElement('style');
      style.textContent = '[data-comparison-turn-hidden="true"]{display:none!important}';
      document.head.appendChild(style);
      [...document.querySelectorAll<HTMLElement>('article.capture-message,[data-turn-id]')]
        .filter(article => article.matches('article.capture-message') || article.closest('article.capture-message') === null)
        .forEach((article, index) => {
          const turn = conversation.messages.find(item => item.turn_id === article.dataset.turnId) || conversation.messages[index];
          if (turn) article.dataset.comparisonTurnHidden = String(!visible.has(turn.turn_id));
        });
      document.addEventListener('click', event => {
        const target = event.target as HTMLElement;
        if (!choice.current.selectable || event.detail > 1 || target.closest('a, input, button, summary') || document.getSelection()?.toString()) return;
        choice.current.onChoose?.();
      });
    }} />;
}
export async function captureAssetsForExport() {
  return fetchAllRows<{ conversation_id: string; turn_id: string; html: string; source_ids: string[] }>('conversation_capture_assets', '*', ['conversation_id', 'turn_id']);
}

export function CaptureMedia({ html }: { html: string }) {
  const images = useMemo(() => {
    const { root } = sanitizeCapturedHtml(html);
    return [...root.querySelectorAll('img')].map(image => ({ src: image.src, alt: image.alt }));
  }, [html]);
  if (!images.length) return null;
  return <div className="translated-capture-media" aria-label="Original captured visuals">{images.map((image, index) => <img key={`${image.src}-${index}`} src={image.src} alt={image.alt || `Captured visual ${index + 1}`} loading="lazy" />)}</div>;
}

export function OriginalCapture({ html, conversation }: { html: string; conversation: Conversation }) {
  return <details className="translated-original"><summary>View original captured layout</summary><div className="exact-capture"><iframe title="Original captured layout" sandbox="allow-same-origin" srcDoc={html} onLoad={event => { const document = event.currentTarget.contentDocument; if (document) { normalizeCapturedSpeakerLabels(document, conversation); styleCapturedUserBubbles(document, conversation); } }} /></div></details>;
}

type Props = ComponentProps<typeof MarkdownTranscript> & { html: string };
export function CapturedTranscript({ html, ...props }: Props) {
  const document = useMemo(() => sanitizeCapturedHtml(html, { preserveLayout: true }), [html]);
  const textMismatch = document.text !== props.text;
  const sourceOffsets = useMemo(() => {
    const mapping: (number | undefined)[] = [];
    let exactIndex = 0; let sourceIndex = 0;
    while (exactIndex < document.text.length && sourceIndex < props.text.length) {
      if (document.text[exactIndex] === props.text[sourceIndex]) { mapping[exactIndex++] = sourceIndex++; continue; }
      if (/\s/.test(document.text[exactIndex])) { mapping[exactIndex++] = sourceIndex; continue; }
      if (/\s/.test(props.text[sourceIndex])) { sourceIndex++; continue; }
      const exactNext = document.text.slice(exactIndex, exactIndex + 32).indexOf(props.text[sourceIndex]);
      const sourceNext = props.text.slice(sourceIndex, sourceIndex + 32).indexOf(document.text[exactIndex]);
      const exactMatch = exactNext < 0 ? -1 : exactIndex + exactNext;
      const sourceMatch = sourceNext < 0 ? -1 : sourceIndex + sourceNext;
      if (exactMatch >= 0 && (sourceMatch < 0 || exactMatch - exactIndex <= sourceMatch - sourceIndex)) {
        while (exactIndex < exactMatch) mapping[exactIndex++] = sourceIndex;
      } else if (sourceMatch >= 0) sourceIndex = sourceMatch;
      else { mapping[exactIndex++] = sourceIndex++; }
    }
    while (exactIndex < document.text.length) mapping[exactIndex++] = Math.min(sourceIndex, props.text.length);
    return mapping;
  }, [document.text, props.text]);
  const sourceOffset = (exactOffset: number) => sourceOffsets[exactOffset] ?? props.text.length;
  let cursor = 0;
  const labeled = new Set<string>();
  const applicable = props.annotations.filter(annotation => annotation.evidence.some(evidence => evidence.turn_id === props.turnId));
  function text(value: string): ReactNode {
    const start = cursor; cursor += value.length; const output: ReactNode[] = [];
    const matching = (index: number) => applicable.filter(annotation => annotation.evidence.some(evidence => evidence.turn_id === props.turnId && evidence.start <= sourceOffset(start + index) && evidence.end > sourceOffset(start + index)));
    for (let index = 0; index < value.length;) {
      const annotations = matching(index); const ids = annotations.map(annotation => annotation.id); const key = ids.join(','); let end = index + 1;
      while (end < value.length && matching(end).map(annotation => annotation.id).join(',') === key) end++;
      const map = JSON.stringify(Array.from({ length: end - index }, (_, offset) => [sourceOffset(start + index + offset), sourceOffset(start + index + offset) + 1]));
      const feature = props.rubric.find(feature => feature.key === annotations[0]?.feature);
      if (!feature) output.push(<span key={index} data-source-map={map}>{value.slice(index, end)}</span>);
      else {
        const labels = annotations.filter(annotation => !labeled.has(annotation.id)).map(annotation => props.rubric.find(feature => feature.key === annotation.feature)?.short_label);
        annotations.forEach(annotation => labeled.add(annotation.id));
        output.push(<mark key={index} tabIndex={0} role="button" data-source-map={map} data-annotation-ids={key} data-feature-label={props.readonly && labels.length ? labels.join(' / ') : undefined}
          style={{ backgroundColor: feature.highlight, borderBottomColor: feature.color, '--highlight-label-color': feature.color } as CSSProperties}
          aria-label={`${props.readonly ? 'View' : 'Edit'} ${feature.name}`}
          onClick={event => { if (!props.readonly) props.onHighlight(ids, event.currentTarget.getBoundingClientRect()); }}
          onMouseEnter={event => { if (props.readonly) props.onHighlight(ids, event.currentTarget.getBoundingClientRect()); }} onMouseLeave={props.onHighlightLeave}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); window.getSelection()?.removeAllRanges(); props.onHighlight(ids, event.currentTarget.getBoundingClientRect()); } }}>{value.slice(index, end)}</mark>);
      }
      index = end;
    }
    return output;
  }
  function render(node: Node, key: number): ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = node.textContent || '';
      if (!value.trim() && /^(table|thead|tbody|tfoot|tr|colgroup)$/.test(node.parentElement?.localName || '')) { cursor += value.length; return value; }
      return <Fragment key={key}>{text(value)}</Fragment>;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const element = node as HTMLElement; const attributes: Record<string, unknown> = { key };
    const mapping: Record<string, string> = { class: 'className', colspan: 'colSpan', rowspan: 'rowSpan', referrerpolicy: 'referrerPolicy', mathvariant: 'mathVariant', tabindex: 'tabIndex' };
    for (const attr of element.attributes) if (attr.name !== 'style') attributes[mapping[attr.name] || attr.name] = attr.name === 'open' ? true : attr.value;
    if (element.style.length) attributes.style = Object.fromEntries([...element.style].map(property => [property.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase()), element.style.getPropertyValue(property)]));
    if (element.localName === 'math') {
      const start = cursor; const value = element.textContent || ''; cursor += value.length;
      let mathCursor = start;
      const plain = (child: Node, index: number): ReactNode => {
        if (child.nodeType === Node.TEXT_NODE) { mathCursor += child.textContent?.length || 0; return child.textContent; }
        const token = child as Element; const tokenStart = mathCursor; const tokenText = token.textContent || '';
        const attrs: Record<string, unknown> = { key: index, ...Object.fromEntries([...token.attributes].filter(attr => attr.name !== 'style').map(attr => [mapping[attr.name] || attr.name, attr.value])) };
        if (!token.children.length) {
          attrs['data-source-map'] = JSON.stringify(Array.from({ length: tokenText.length }, (_, offset) => [tokenStart + offset, tokenStart + offset + 1]));
          const matches = applicable.filter(annotation => annotation.evidence.some(evidence => evidence.turn_id === props.turnId && evidence.start < tokenStart + tokenText.length && evidence.end > tokenStart));
          const feature = props.rubric.find(feature => feature.key === matches[0]?.feature);
          if (feature) {
            attrs.style = { backgroundColor: feature.highlight, borderBottom: '2px solid ' + feature.color };
            attrs['data-annotation-ids'] = matches.map(annotation => annotation.id).join(','); attrs.tabIndex = 0;
            attrs.onClick = (event: React.MouseEvent<HTMLElement>) => props.onHighlight(matches.map(annotation => annotation.id), event.currentTarget.getBoundingClientRect());
          }
        }
        return createElement(token.localName, attrs, ...[...token.childNodes].map(plain));
      };
      if (!element.children.length) attributes['data-source-map'] = JSON.stringify(Array.from({ length: value.length }, (_, index) => [start + index, start + index + 1]));
      return createElement('math', attributes, ...[...element.childNodes].map(plain));
    }
    if (['img', 'br', 'hr', 'col'].includes(element.localName)) return createElement(element.localName, attributes);
    return createElement(element.localName, attributes, ...[...element.childNodes].map(render));
  }
  return <>{textMismatch && <p className="notice">The captured layout has minor text-normalization differences; the captured layout is shown.</p>}<div className="captured-html">{[...document.root.childNodes].map(render)}</div></>;
}
