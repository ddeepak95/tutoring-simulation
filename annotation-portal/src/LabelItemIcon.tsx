import {Children,Fragment,isValidElement,type CSSProperties,type ReactNode} from 'react';

const icons:Record<string,ReactNode>={
  static_images:<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><path d="M3 18l6-6 4 4 4-6 4 8"/></>,
  interactive_animated_media:<><rect x="2" y="3" width="20" height="15" rx="2"/><path d="M10 7l6 4-6 4zM6 22v-4M18 22v-4M8 22h8"/></>,
  lists:<><path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/></>,
  definitions:<><path d="M3 4h8v16H3zM11 4h10v16H11M6 8h2M14 8h4M14 12h4M14 16h4"/></>,
  step_by_step_walkthroughs:<><path d="M3 6h6v6h6v6h6M5 3v3M12 9v3M19 15v3M18 21h3v-3"/></>,
  real_world_connections:<><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/></>,
  misconceptions_pitfalls:<><path d="M12 3L2 21h20zM12 9v5"/><circle cx="12" cy="18" r=".7" fill="currentColor"/></>,
  social_cues:<><path d="M3 4h18v13H9l-6 4zM7 11c2 4 8 4 10 0"/><circle cx="8" cy="8" r=".6"/><circle cx="16" cy="8" r=".6"/></>,
  bot_errors_hallucinations:<><path d="M8 3h8l6 6v7l-6 6H8l-6-6V9zM9 9l6 6M15 9l-6 6"/></>,
  summaries_key_takeaways:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h5M8 18h5"/></>,
  comprehension_checks:<><path d="M3 4h18v13H9l-6 4zM7 10l3 3 7-6"/></>,
  hints_scaffolding:<><path d="M8 15a7 7 0 1 1 8 0v3H8zM9 21h6M10 18v3M14 18v3M12 7v5M9 10h6"/></>,
  next_step_suggestions:<><path d="M3 12h17M14 6l6 6-6 6M3 5v14"/></>,
  photographs:<><path d="M8 5l2-2h4l2 2h4a1 1 0 0 1 1 1v13H3V6a1 1 0 0 1 1-1z"/><circle cx="12" cy="12" r="4"/><path d="M17 8h1"/></>,
  diagrams_and_illustrations:<><rect x="3" y="3" width="7" height="7" rx="1"/><circle cx="17" cy="17" r="4"/><path d="M7 14v5h4M14 7h5v4M14 3l7 7"/></>,
  flow_diagrams:<><rect x="8" y="2" width="8" height="5" rx="1"/><rect x="2" y="17" width="7" height="5" rx="1"/><rect x="15" y="17" width="7" height="5" rx="1"/><path d="M12 7v5M5.5 17v-5h13v5"/></>,
  graphs:<><path d="M4 3v17h17M7 15l4-5 4 2 5-7"/><path d="M17 5h3v3"/></>,
  maps:<><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/></>,
  animations:<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 4v16M18 4v16M2 9h4M2 15h4M18 9h4M18 15h4M10 9l5 3-5 3z"/></>,
  interactive_media:<><path d="M7 3l12 10-6 1-3 6zM15 15l4 6M3 7H1M6 1v1M15 3l-2 2M3 12l-2 1"/></>,
  other_images:<><rect x="5" y="3" width="17" height="15" rx="1"/><path d="M2 7v14h16M6 16l5-5 3 3 3-5 4 7"/><circle cx="10" cy="7" r="1"/></>,
  tables:<><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 14h18M9 9v11M15 9v11"/></>,
  headings:<><path d="M4 5v14M14 5v14M4 12h10M18 9l3-2v12M18 19h5"/></>,
  equations:<><path d="M3 7l6 10M9 7L3 17M13 9h8M13 15h8"/></>,
  callouts:<><rect x="3" y="3" width="18" height="15" rx="2"/><path d="M7 18v4l5-4M12 7v4"/><circle cx="12" cy="14" r=".7" fill="currentColor" stroke="none"/></>,
  examples:<><path d="M8 3h11a1 1 0 0 1 1 1v17H4V4a1 1 0 0 1 1-1h3M8 2h8v4H8zM8 10h8M8 14h3M13 17l2 2 4-4"/></>,
  analogies:<><path d="M9 15l6-6M8 17l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0M16 7l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" transform="translate(1 -1) scale(.92)"/></>,
  memory_aids:<><path d="M12 4a3 3 0 0 0-5-1 4 4 0 0 0-3 6 4 4 0 0 0 0 7 4 4 0 0 0 5 5 3 3 0 0 0 3-3V4a3 3 0 0 1 5-1 4 4 0 0 1 3 6 4 4 0 0 1 0 7 4 4 0 0 1-5 5 3 3 0 0 1-3-3M7 7l2 2M5 13h3M7 18l2-2M17 7l-2 2M19 13h-3M17 18l-2-2"/></>,
  questions:<><path d="M20 15a4 4 0 0 1-4 4H9l-6 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4zM9 8a3 3 0 0 1 6 0c0 2-3 2-3 4"/><circle cx="12" cy="15" r=".6" fill="currentColor" stroke="none"/></>
};

export function LabelItemIcon({item,className='',style}:{item:string;className?:string;style?:CSSProperties}) {
  return <svg className={`label-item-icon ${className}`} style={style} data-label-icon={item} aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[item]||<circle cx="12" cy="12" r="4"/>}</svg>;
}

/** Use the same icon artwork in sandboxed captured documents. */
export function createLabelItemIcon(document:Document,item:string) {
  const namespace='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(namespace,'svg');
  for(const [key,value] of Object.entries({viewBox:'0 0 24 24',width:'16',height:'16',fill:'none',stroke:'currentColor','stroke-width':'1.6','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false','data-label-icon':item}))svg.setAttribute(key,value);
  svg.classList.add('label-item-icon');
  const append=(parent:Element,nodes:ReactNode)=>Children.forEach(nodes,node=>{
    if(!isValidElement<Record<string,unknown>>(node))return;
    if(node.type===Fragment){append(parent,node.props.children as ReactNode);return;}
    if(typeof node.type!=='string')return;
    const element=document.createElementNS(namespace,node.type);
    for(const [key,value] of Object.entries(node.props))if(key!=='children'&&(typeof value==='string'||typeof value==='number'))element.setAttribute(key.replace(/[A-Z]/g,letter=>'-'+letter.toLowerCase()),String(value));
    append(element,node.props.children as ReactNode);parent.append(element);
  });
  append(svg,icons[item]||<circle cx="12" cy="12" r="4"/>);
  return svg;
}
