import { createElement, Fragment, useMemo, type ReactNode } from 'react';
import type { Nodes, Definition } from 'mdast';
import { mappedText, parseMarkdown } from './markdown-source';
import type { Annotation, Feature } from './types';

interface Props {
  text: string; turnId: string; annotations: Annotation[]; rubric: Feature[]; readonly: boolean;
  onHighlight: (ids: string[], rect: DOMRect) => void;
}
function safeUrl(value: string, image = false): string | undefined {
  try {
    const url = new URL(value, 'https://annotation.invalid');
    if (['https:', 'http:', ...(image ? [] : ['mailto:'])].includes(url.protocol)) return value;
  } catch { /* Render unsafe destinations as ordinary text. */ }
}
export function MarkdownTranscript({ text, turnId, annotations, rubric, readonly, onHighlight }: Props) {
  const tree = useMemo(() => parseMarkdown(text), [text]);
  const definitions = new Map<string, Definition>();
  for (const node of tree.children) {
    if (node.type === 'definition') definitions.set(node.identifier.toUpperCase(), node);
  }
  function content(node: Parameters<typeof mappedText>[1]) {
    const { value, map } = mappedText(text, node);
    const segments: ReactNode[] = [];
    const applicable = annotations.filter(annotation => annotation.evidence.some(e => e.turn_id === turnId));
    let i = 0;
    while (i < value.length) {
      const matching = (offset: number) => applicable.filter(annotation => annotation.evidence.some(e => e.turn_id === turnId && e.start < map[offset][1] && e.end > map[offset][0]));
      const active = matching(i), ids = active.map(a => a.id), key = ids.join(',');
      let end = i + 1;
      while (end < value.length && matching(end).map(a => a.id).join(',') === key) end++;
      const data = { 'data-source-map': JSON.stringify(map.slice(i, end)) };
      if (!active.length) segments.push(<span key={i} {...data}>{value.slice(i, end)}</span>);
      else {
        const feature = rubric.find(f => f.key === active[0].feature)!;
        segments.push(<mark key={i} {...data} style={{ backgroundColor: feature.highlight, borderBottomColor: feature.color }}
          tabIndex={readonly ? undefined : 0} role={readonly ? undefined : 'button'}
          aria-label={`Edit ${active.map(a => rubric.find(f => f.key === a.feature)!.name).join(' / ')}`}
          data-annotation-ids={key} onClick={event => { event.preventDefault(); onHighlight(ids, event.currentTarget.getBoundingClientRect()); }}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); window.getSelection()?.removeAllRanges(); onHighlight(ids, event.currentTarget.getBoundingClientRect()); } }}>
          {value.slice(i, end)}
        </mark>);
      }
      i = end;
    }
    return segments;
  }
  function children(node: Nodes): ReactNode { return 'children' in node ? node.children.map((child, i) => <Fragment key={i}>{render(child)}</Fragment>) : null; }
  function link(url: string, title: string | null | undefined, value: ReactNode) {
    const href = safeUrl(url);
    return href ? <a href={href} title={title || undefined} target="_blank" rel="noreferrer">{value}</a> : value;
  }
  function render(node: Nodes): ReactNode {
    switch (node.type) {
      case 'root': return children(node);
      case 'text': return content(node);
      case 'paragraph': return <p>{children(node)}</p>;
      case 'heading': return createElement(`h${node.depth}`, null, children(node));
      case 'strong': return <strong>{children(node)}</strong>;
      case 'emphasis': return <em>{children(node)}</em>;
      case 'delete': return <del>{children(node)}</del>;
      case 'inlineCode': return <code>{content(node)}</code>;
      case 'code': return <pre><code className={node.lang ? `language-${node.lang}` : undefined}>{content(node)}</code></pre>;
      case 'break': return <br />;
      case 'thematicBreak': return <hr />;
      case 'blockquote': return <blockquote>{children(node)}</blockquote>;
      case 'list': return node.ordered ? <ol start={node.start ?? undefined}>{children(node)}</ol> : <ul>{children(node)}</ul>;
      case 'listItem': return <li>{node.checked != null && <input type="checkbox" checked={node.checked} disabled aria-label={node.checked ? 'Completed' : 'Incomplete'} />}{children(node)}</li>;
      case 'link': return link(node.url, node.title, children(node));
      case 'linkReference': {
        const definition = definitions.get(node.identifier.toUpperCase());
        return definition ? link(definition.url, definition.title, children(node)) : children(node);
      }
      case 'image': case 'imageReference': {
        const definition = node.type === 'image' ? node : definitions.get(node.identifier.toUpperCase());
        const src = definition && safeUrl(definition.url, true);
        return src ? <img src={src} alt={node.alt || ''} title={definition.title || undefined} loading="lazy" /> : <span>{node.alt}</span>;
      }
      case 'table': return <div className="markdown-table"><table><thead><tr>{node.children[0]?.children.map((cell, i) => <th key={i} style={{ textAlign: node.align?.[i] || undefined }}>{children(cell)}</th>)}</tr></thead><tbody>{node.children.slice(1).map((row, i) => <tr key={i}>{row.children.map((cell, j) => <td key={j} style={{ textAlign: node.align?.[j] || undefined }}>{children(cell)}</td>)}</tr>)}</tbody></table></div>;
      case 'html': return /^<br\s*\/?\s*>$/i.test(node.value) ? <br /> : content(node);
      case 'definition': return null;
      case 'footnoteReference': return <sup>{node.label || node.identifier}</sup>;
      case 'footnoteDefinition': return <div className="markdown-footnote"><sup>{node.label || node.identifier}</sup>{children(node)}</div>;
      default: return children(node);
    }
  }
  return <>{render(tree)}</>;
}
