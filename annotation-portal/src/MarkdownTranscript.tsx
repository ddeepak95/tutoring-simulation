import {SectionItemBadges} from './SectionItemBadges';
import {markdownSectionGroups} from './section-registry';
import {annotationHighlightEvidence} from './section-highlights';
import {FeatureHoverPopup} from './FeatureHoverPopup';
import { conceptLevel, conceptDisplayFeature } from './coverage-hierarchy';
import { createElement, Fragment, useEffect, useId, useMemo, useState, type ReactNode } from 'react';
import katex from 'katex';
import type { Nodes, Definition } from 'mdast';
import { mappedText, parseMarkdown } from './markdown-source';
import type { Annotation, Evidence, Feature, ConversationSection } from './types';

interface Props {
  text: string; turnId: string; annotations: Annotation[]; rubric: Feature[]; readonly: boolean;
  onHighlight: (ids: string[], rect: DOMRect) => void;
  onHighlightLeave?: () => void;
  onMathSelect?: (start: number, end: number, rect: DOMRect) => void;
  selectedSection?: Evidence;
  sectionLabels?: boolean;
  apiSections?: boolean;
  sectionPreview?: boolean;
  sections?: ConversationSection[];
  turnNumber?: number;
  onSectionSelect?: (start: number, end: number, rect: DOMRect) => void;
}
function safeUrl(value: string, image = false): string | undefined {
  try {
    const url = new URL(value, 'https://annotation.invalid');
    if (['https:', 'http:', ...(image ? [] : ['mailto:'])].includes(url.protocol)) return value;
  } catch { /* Render unsafe destinations as ordinary text. */ }
}
export function MarkdownTranscript({ text, turnId, annotations, rubric, readonly, onHighlight, onHighlightLeave, onMathSelect, sectionLabels = false, apiSections = false, sectionPreview = false, sections, selectedSection, turnNumber = 1, onSectionSelect }: Props) {
  rubric = rubric.map(conceptDisplayFeature);
  const tree = useMemo(() => parseMarkdown(text), [text]);
  const definitions = new Map<string, Definition>();
  const labeledPassages = new Set<string>();
  const tooltipId=useId();
  const [hover,setHover]=useState<{keys:string[];anchor:DOMRect}|null>(null);
  const [featurePreview,setFeaturePreview]=useState<{key:string;start:number;end:number}|null>(null);
  const hoverFeatures=hover?rubric.filter(f=>hover.keys.includes(f.key)):[];
  const showHover=(active:Annotation[],element:HTMLElement)=>setHover({keys:[...new Set(active.map(a=>a.feature))],anchor:element.getBoundingClientRect()});
  useEffect(()=>{
    if(!hover)return;
    const close=()=>setHover(null),key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();};
    window.addEventListener('scroll',close,true);window.addEventListener('resize',close);window.addEventListener('keydown',key);
    return()=>{window.removeEventListener('scroll',close,true);window.removeEventListener('resize',close);window.removeEventListener('keydown',key);};
  },[hover]);
  const hoverPopup=hover&&hoverFeatures.length?<FeatureHoverPopup id={tooltipId} features={hoverFeatures} anchor={hover.anchor}/>:null;
  const previewAnnotations=featurePreview?annotations.filter(a=>a.feature===featurePreview.key||!a.evidence.some(e=>e.turn_id===turnId&&e.start<featurePreview.end&&e.end>featurePreview.start)):annotations;
  const textAnnotations=sectionLabels?previewAnnotations.filter(a=>a.highlights?.length).map(a=>({...a,evidence:annotationHighlightEvidence(a)})):previewAnnotations;
  const highlightStyle=(active:Annotation[])=>{
    const features=[...new Set(active.map(a=>a.feature))].map(key=>rubric.find(f=>f.key===key)!);
    return {backgroundColor:features[0]?.highlight,borderBottomColor:features[0]?.color,'--highlight-label-color':features[0]?.color,
      ...(features.length>1?{backgroundImage:`linear-gradient(180deg, ${features.map((f,i)=>`${f.highlight} ${100*i/features.length}%, ${f.highlight} ${100*(i+1)/features.length}%`).join(', ')})`}:{})} as React.CSSProperties;
  };
  for (const node of tree.children) {
    if (node.type === 'definition') definitions.set(node.identifier.toUpperCase(), node);
  }
  function content(node: Parameters<typeof mappedText>[1]) {
    const { value, map } = mappedText(text, node);
    const segments: ReactNode[] = [];
    const applicable = textAnnotations.filter(annotation => annotation.evidence.some(e => e.turn_id === turnId));
    let i = 0;
    while (i < value.length) {
      const matching = (offset: number) => applicable.filter(annotation => annotation.evidence.some(e => e.turn_id === turnId && e.start < map[offset][1] && e.end > map[offset][0]));
      const active = matching(i), ids = active.map(a => a.id), key = ids.join(',');
      let end = i + 1;
      while (end < value.length && matching(end).map(a => a.id).join(',') === key) end++;
      const data = { 'data-source-map': JSON.stringify(map.slice(i, end)) };
      if (!active.length) segments.push(<span key={i} {...data}>{value.slice(i, end)}</span>);
      else {
        const labels = new Set<string>();
        if (readonly) for (const annotation of active) {
          annotation.evidence.forEach((evidence, index) => {
            const passage = `${annotation.id}:${index}`;
            if (evidence.turn_id === turnId && evidence.start < map[end - 1][1] && evidence.end > map[i][0] && !labeledPassages.has(passage)) {
              labels.add(`${rubric.find(f => f.key === annotation.feature)!.short_label}${conceptLevel(annotation)?` ? ${conceptLevel(annotation)}`:''}${annotation.feature==='examples'&&evidence.example_status?` · ${evidence.example_status}`:''}`);
              labeledPassages.add(passage);
            }
          });
        }
        segments.push(<mark key={i} {...data} data-feature-keys={active.map(a=>a.feature).join(',')} data-feature-label={!sectionLabels&&labels.size ? [...labels].join(' / ') : undefined} style={highlightStyle(active)}
          tabIndex={0} role="button"
          aria-describedby={hover&&active.some(a=>hover.keys.includes(a.feature))?tooltipId:undefined}
          aria-label={`${readonly ? 'View' : 'Edit'} ${active.map(a => rubric.find(f => f.key === a.feature)!.name).join(' / ')}`}
          data-annotation-ids={key} onClick={event => { event.preventDefault();setHover(null);onHighlight(ids, event.currentTarget.getBoundingClientRect()); }}
          onMouseEnter={event=>showHover(active,event.currentTarget)} onMouseLeave={()=>setHover(null)}
          onFocus={event=>showHover(active,event.currentTarget)} onBlur={()=>setHover(null)}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault();setHover(null);window.getSelection()?.removeAllRanges(); onHighlight(ids, event.currentTarget.getBoundingClientRect()); } }}>
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
  function displayMath(node: Nodes): ReactNode | null {
    if (node.type !== 'paragraph' || node.children.length !== 1) return null;
    const math = node.children[0].data?.mathSource;
    return math?.display ? renderMath(math.tex, math.contentStart, math.contentEnd, true) : null;
  }
  function renderMath(tex: string, start: number, end: number, displayMode: boolean): ReactNode {
    const Tag = displayMode ? 'div' : 'span';
    const className = displayMode ? 'markdown-math' : 'markdown-inline-math';
    const active = textAnnotations.filter(annotation => annotation.evidence.some(evidence => evidence.turn_id === turnId && evidence.start < end && evidence.end > start));
    const ids = active.map(annotation => annotation.id);
    const html = katex.renderToString(tex, { displayMode, throwOnError: false, trust: false, maxExpand: 1000, maxSize: 20 });
    if (sectionLabels&&!active.length) return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
    const interact = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      if (ids.length) onHighlight(ids, rect);
      else if (!readonly) onMathSelect?.(start, end, rect);
    };
    return <Tag className={`${className}${active.length ? ' annotated-math' : ''}`} data-math-source-start={start} data-math-source-end={end}
      data-annotation-ids={ids.join(',')} data-feature-keys={active.map(a=>a.feature).join(',')} style={active.length?highlightStyle(active):undefined} role={active.length||!readonly ? 'button' : undefined} tabIndex={active.length||!readonly ? 0 : undefined}
      aria-label={active.length?`${readonly?'View':'Edit'} ${active.map(a=>rubric.find(f=>f.key===a.feature)!.name).join(' / ')}`:!readonly ? `Select equation: ${tex}` : undefined}
      aria-describedby={hover&&active.some(a=>hover.keys.includes(a.feature))?tooltipId:undefined}
      onClick={event => {setHover(null);interact(event.currentTarget);}}
      onMouseEnter={event => {if(active.length)showHover(active,event.currentTarget);}} onMouseLeave={()=>setHover(null)}
      onFocus={event=>{if(active.length)showHover(active,event.currentTarget);}} onBlur={()=>setHover(null)}
      onKeyDown={event => { if ((active.length||!readonly) && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault();setHover(null);interact(event.currentTarget); } }}
      dangerouslySetInnerHTML={{ __html: html }} />;
  }
  function render(node: Nodes): ReactNode {
    switch (node.type) {
      case 'root': return children(node);
      case 'text': {
        const math = node.data?.mathSource;
        return math ? renderMath(math.tex, math.contentStart, math.contentEnd, false) : content(node);
      }
      case 'paragraph': return displayMath(node) || <p>{children(node)}</p>;
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
  if (!sectionLabels) return <>{render(tree)}{hoverPopup}</>;
  const ranges=sections?.filter(section=>section.turn_id===turnId&&section.content_version!=='html-conversation/2');
  const groups = markdownSectionGroups(text,{api:apiSections,ranges:ranges?.length?ranges:undefined});
  const Label=sectionPreview||readonly?'span':'button';
  return <>{groups.map((nodes, index) => {
    const start = nodes[0].position!.start.offset!;
    const end = nodes.at(-1)!.position!.end.offset!;
    const matches = annotations.filter(annotation => annotation.evidence.some(evidence => evidence.turn_id === turnId && evidence.start < end && evidence.end > start));
    const selected=selectedSection?.turn_id===turnId&&selectedSection.start===start&&selectedSection.end===end;
    const sectionId=sections?.find(s=>s.turn_id===turnId&&s.start===start&&s.end===end)?.section_id;
    const select=(element:HTMLElement)=>{if(readonly)return;const rect=element.getBoundingClientRect();if(matches.length)onHighlight(matches.map(a=>a.id),rect);else onSectionSelect?.(start,end,rect);};
    const labelStyle={ '--annotation-color': selected?'#2563eb':'#263430', '--annotation-background': selected?'#eff6ff':'#fff' } as React.CSSProperties;
    return <Fragment key={start}>
      <section className="section-annotation-boundary" data-selected={selected} style={{borderColor:selected?'#2563eb':'#263430',borderWidth:selected?3:2}} aria-label={`Turn ${turnNumber} - Section ${index + 1} content`}>
        <Label className="section-annotation-top-label" aria-label={sectionPreview||readonly?undefined:`Select Turn ${turnNumber} - Section ${index+1}`} aria-pressed={sectionPreview||readonly?undefined:selected} data-section-id={sectionId} style={labelStyle} onClick={sectionPreview||readonly?undefined:event=>select(event.currentTarget)}>
          Turn {turnNumber} - Section {index + 1}
        </Label>
        {nodes.map((node,nodeIndex)=><Fragment key={nodeIndex}>{render(node)}</Fragment>)}
      </section>
      {!sectionPreview&&<div className="section-annotation-controls">
        <Label className="section-annotation-label" aria-pressed={readonly?undefined:selected} data-section-id={sectionId} data-annotation-ids={matches.map(a=>a.id).join(',')} style={labelStyle} onClick={readonly?undefined:event=>select(event.currentTarget)}>Turn {turnNumber} - Section {index+1}</Label>
        <SectionItemBadges annotations={matches} rubric={rubric} onSelect={onHighlight} onHover={key=>{setHover(null);setFeaturePreview(key?{key,start,end}:null);}}/>
      </div>}
    </Fragment>;

  })}{hoverPopup}</>;
}
