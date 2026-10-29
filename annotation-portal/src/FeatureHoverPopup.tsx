import {useLayoutEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import type {Feature} from './types';

export function FeatureHoverPopup({id,features,anchor}:{id:string;features:Feature[];anchor:DOMRect}){
 const popup=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const node=popup.current;if(!node)return;
  node.style.maxWidth=`${Math.min(360,window.innerWidth-24)}px`;
  const width=node.getBoundingClientRect().width;
  const height=node.getBoundingClientRect().height;
  node.style.left=`${Math.max(12,Math.min(anchor.left,window.innerWidth-width-12))}px`;
  node.style.top=`${Math.max(12,anchor.bottom+height+18<=window.innerHeight?anchor.bottom+6:anchor.top-height-6)}px`;
 },[anchor,features]);
 if(typeof document==='undefined')return null;
 return createPortal(<div ref={popup} id={id} role="tooltip" className="feature-hover-popup">
  {features.map(feature=><div key={feature.key}><strong style={{color:feature.color}}>{feature.name}</strong></div>)}
 </div>,document.body);
}
