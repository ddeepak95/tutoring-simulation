import {LabelItemIcon,createLabelItemIcon} from './LabelItemIcon';
import {countFeatureItems} from './feature-counts';
import {conceptDisplayFeature} from './coverage-hierarchy';
import {useId} from 'react';
import type {Annotation,Feature} from './types';
import './section-item-badges.css';

function itemCounts(annotations:Annotation[],rubric:Feature[]) {
  return rubric.map(conceptDisplayFeature).map(feature=>({feature,count:countFeatureItems(annotations,feature.key)})).filter(item=>item.count>0);
}

function details(feature:Feature,count:number) {
  return `${feature.name}: ${count}`;
}

function positionTooltip(wrapper:HTMLElement) {
  const tooltip=wrapper.querySelector<HTMLElement>('[role="tooltip"]');
  if(!tooltip)return;
  const rect=wrapper.getBoundingClientRect(),view=wrapper.ownerDocument.defaultView;
  const width=view?.innerWidth||320,height=view?.innerHeight||600;
  tooltip.style.width=`${Math.min(320,width-24)}px`;
  const tip=tooltip.getBoundingClientRect();
  tooltip.style.left=`${Math.max(12,Math.min(rect.left,width-tip.width-12))}px`;
  tooltip.style.top=`${Math.max(8,rect.top>tip.height+12?rect.top-tip.height-4:Math.min(rect.bottom+4,height-tip.height-8))}px`;
}

function ItemBadge({feature,count,onSelect,onHover}:{feature:Feature;count:number;onSelect?:(rect:DOMRect)=>void;onHover?:(key:string|null)=>void}) {
  const id=useId();
  const badge=<span className="section-item-badge" role="img" tabIndex={onSelect?undefined:0} aria-describedby={id} aria-label={`${feature.name}: ${count}`} style={{color:feature.color}}><LabelItemIcon item={feature.key}/><span aria-hidden="true">{count}</span></span>;
  return <span className="section-item-badge-wrapper" onMouseEnter={event=>{positionTooltip(event.currentTarget);onHover?.(feature.key);}} onMouseLeave={()=>onHover?.(null)} onFocus={event=>{positionTooltip(event.currentTarget);onHover?.(feature.key);}} onBlur={()=>onHover?.(null)}>
    {onSelect?<button type="button" className="section-item-badge-button" aria-label={`View ${feature.name} annotation`} aria-describedby={id} onClick={e=>onSelect(e.currentTarget.getBoundingClientRect())}>{badge}</button>:badge}
    <span className="section-item-tooltip" role="tooltip" id={id}>{details(feature,count)}</span>
  </span>;
}

export function SectionItemBadges({annotations,rubric,onSelect,onHover}:{annotations:Annotation[];rubric:Feature[];onSelect?:(ids:string[],rect:DOMRect)=>void;onHover?:(key:string|null)=>void}) {
  const items=itemCounts(annotations,rubric);
  if(!items.length)return null;
  return <span className="section-item-badges" role="group" aria-label="Labeled items">{items.map(({feature,count})=><ItemBadge key={feature.key} feature={feature} count={count} onHover={onHover} onSelect={onSelect?rect=>onSelect(annotations.filter(a=>a.feature===feature.key).map(a=>a.id),rect):undefined}/>)}</span>;
}

let tooltipSequence=0;

export function createSectionItemBadges(document:Document,annotations:Annotation[],rubric:Feature[],onSelect?:(ids:string[],rect:DOMRect)=>void) {
  const items=itemCounts(annotations,rubric);
  if(!items.length)return null;
  const container=document.createElement('span');container.className='section-item-badges';container.setAttribute('role','group');container.setAttribute('aria-label','Labeled items');
  for(const {feature,count} of items){
    const wrapper=document.createElement('span');wrapper.className='section-item-badge-wrapper';
    const tooltip=document.createElement('span');tooltip.className='section-item-tooltip';tooltip.id=`section-badge-tooltip-${++tooltipSequence}`;tooltip.setAttribute('role','tooltip');tooltip.textContent=details(feature,count);
    const badge=document.createElement('span');badge.className='section-item-badge';badge.setAttribute('role','img');badge.setAttribute('aria-label',`${feature.name}: ${count}`);badge.setAttribute('aria-describedby',tooltip.id);badge.tabIndex=0;badge.style.color=feature.color;
    const number=document.createElement('span');number.setAttribute('aria-hidden','true');number.textContent=String(count);
    badge.append(createLabelItemIcon(document,feature.key),number);
    if(onSelect){const button=document.createElement('button');button.type='button';button.className='section-item-badge-button';button.setAttribute('aria-label',`View ${feature.name} annotation`);button.setAttribute('aria-describedby',tooltip.id);badge.removeAttribute('tabindex');button.append(badge);button.onclick=()=>onSelect(annotations.filter(a=>a.feature===feature.key).map(a=>a.id),button.getBoundingClientRect());wrapper.append(button,tooltip);}else wrapper.append(badge,tooltip);
    container.append(wrapper);
    wrapper.addEventListener('mouseenter',()=>positionTooltip(wrapper));wrapper.addEventListener('focusin',()=>positionTooltip(wrapper));
  }
  return container;
}
