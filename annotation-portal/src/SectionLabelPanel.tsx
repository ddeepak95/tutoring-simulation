import {itemGuidance} from './item-guidance';
import {RichText} from './RichText';
import {LabelItemIcon} from './LabelItemIcon';
import {useEffect,useRef,useState} from 'react';
import type {Annotation,Evidence,Feature} from './types';

function ItemCounter({feature,count,readonly,onCount}:{feature:Feature;count:number;readonly:boolean;onCount:(count:number)=>void}) {
  const [draft,setDraft]=useState(String(count));
  const [showInfo,setShowInfo]=useState(false);
  const infoId=`section-item-info-${feature.key}`;
  const guidance=itemGuidance(feature);
  useEffect(()=>setDraft(String(count)),[count]);
  const invalid=draft!==''&&(!Number.isInteger(Number(draft))||Number(draft)<0||Number(draft)>1000);
  return <div className={`section-item-row${count>0?' is-labeled':''}`}>
    <label htmlFor={`section-count-${feature.key}`}><LabelItemIcon item={feature.key} style={{color:feature.color}}/>{feature.name}</label>
    <button type="button" className="section-item-info-button" aria-label={`${feature.name} labeling info`} aria-expanded={showInfo} aria-controls={infoId} title="Show labeling guidance" onClick={()=>setShowInfo(value=>!value)}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/></svg>
    </button>
    <div className="section-item-counter">
      <button type="button" className="secondary" aria-label={`Decrease ${feature.name}`} disabled={readonly||count===0} onClick={()=>onCount(count-1)}>−</button>
      <input id={`section-count-${feature.key}`} aria-label={`${feature.name} count`} type="number" min="0" max="1000" step="1" inputMode="numeric" disabled={readonly} aria-invalid={invalid} value={draft}
        onChange={event=>{const value=event.target.value;setDraft(value);const number=Number(value);if(value!==''&&Number.isInteger(number)&&number>=0&&number<=1000)onCount(number);}}
        onBlur={()=>{if(draft==='')setDraft(String(count));}}/>
      <button type="button" className="secondary" aria-label={`Increase ${feature.name}`} disabled={readonly||count>=1000} onClick={()=>onCount(count+1)}>+</button>
    </div>
    {showInfo&&<div className="section-item-guidance" id={infoId} role="region" aria-label={`${feature.name} labeling guidance`}><RichText text={guidance}/></div>}
    {invalid&&<small className="error" role="alert">Use a whole number from 0 to 1,000.</small>}
  </div>;
}

export function SectionLabelPanel({rubric,selection,sectionId,title,annotations,readonly,onCount,onClose}:{rubric:Feature[];selection?:Evidence;sectionId?:string;title?:string;annotations:Annotation[];readonly:boolean;onCount:(key:string,count:number)=>void;onClose:()=>void}) {
  const heading=useRef<HTMLHeadingElement>(null);
  const key=selection?`${selection.turn_id}:${selection.start}:${selection.end}`:'';
  useEffect(()=>{if(key)heading.current?.focus({preventScroll:true});},[key]);
  const numbers=sectionId?.match(/^t(\d+)s(\d+)$/u);
  const selectedTitle=title||(numbers?`Turn ${numbers[1]} - Section ${numbers[2]}`:'Selected section');
  return <aside className={`section-label-sidebar${selection?' has-selection':''}`} aria-label="Section labeling">
    <header className="section-label-panel-heading">
      <div><h2 ref={heading} tabIndex={-1}><span>{selection?selectedTitle:'Section labels'}</span>{selection&&sectionId&&<span className="section-label-heading-id">{sectionId}</span>}</h2></div>
      {selection&&<button type="button" className="dismiss" aria-label="Close section labeling" onClick={onClose}>×</button>}
    </header>
    {!selection?<p className="section-label-empty">Click a section’s labeling button to add items and counts here.</p>:<>
      <div className="section-label-panel-content">
        {[...new Set(rubric.map(f=>f.category))].map(category=><section className="section-item-category" key={category} aria-label={category}>
          <h3>{category}</h3>
          {rubric.filter(f=>f.category===category).map(feature=><ItemCounter key={`${key}:${feature.key}`} feature={feature} count={Number(annotations.find(a=>a.feature===feature.key)?.entry.count||0)} readonly={readonly} onCount={count=>onCount(feature.key,count)}/>)}
        </section>)}
      </div>
    </>}
  </aside>;
}
