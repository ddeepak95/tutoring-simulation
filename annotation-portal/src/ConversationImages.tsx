import {useMemo} from 'react';
import type {Conversation} from './types';
import {safeCapturedUrl} from './capture-document';
import './conversation-images.css';

export interface ConversationImage {id:string;url:string;alt:string;mime?:string;bytes?:number;locations:string[];gallery:boolean}
export function conversationImages(conversation:Conversation,legacyAssets:Record<string,string>={},exactHtml?:string):ConversationImage[]{
 const pkg=conversation.html_content,images=new Map<string,ConversationImage>();
 if(pkg){
  for(const asset of pkg.assets){const url=safeCapturedUrl(asset.file,true);if(url)images.set(asset.sha256,{id:asset.sha256,url,alt:'',mime:asset.mime,bytes:asset.bytes,locations:[],gallery:false});}
  for(const reference of pkg.image_inventory||[]){const image=images.get(reference.sha256);if(!image)continue;
   image.alt||=reference.alt;image.gallery||=reference.source==='gallery';
   const location=reference.section_id||reference.turn_id;if(!image.locations.includes(location))image.locations.push(location);
  }
  for(const turn of pkg.turns)for(const item of [{html:turn.html,location:turn.turn_id},...turn.sections.flatMap(s=>[{html:s.html,location:s.section_id},...s.components.flatMap(c=>c.states.map(state=>({html:state.html,location:s.section_id})))])]){
   const doc=new DOMParser().parseFromString(item.html,'text/html');
   for(const node of doc.querySelectorAll('img')){const image=[...images.values()].find(image=>image.url===node.getAttribute('src'));if(!image)continue;image.alt||=node.getAttribute('alt')||'';if(!image.locations.includes(item.location))image.locations.push(item.location);}
  }
 }else{
  for(const [turn,html] of [...Object.entries(legacyAssets),...(exactHtml?[['Captured HTML',exactHtml]]:[])]){
   const doc=new DOMParser().parseFromString(html,'text/html');for(const node of doc.querySelectorAll('img')){
    const url=safeCapturedUrl(node.getAttribute('src')||'',true);if(!url)continue;
    const image=images.get(url)||{id:url,url,alt:node.getAttribute('alt')||'',locations:[],gallery:false};if(!image.locations.includes(turn))image.locations.push(turn);images.set(url,image);
   }
  }
 }
 return [...images.values()];
}

export function ConversationImages({images,loading}:{images:ConversationImage[];loading:boolean}){
 if(loading)return <p role="status">Loading captured images...</p>;
 if(!images.length)return <p className="conversation-images-empty">No captured images are available for this conversation.</p>;
 return <div className="conversation-image-grid">{images.map((image,index)=><figure className="conversation-image-card" key={image.id}>
  <a href={image.url} target="_blank" rel="noopener noreferrer" aria-label={`Open image ${index+1} in full size`}><img src={image.url} alt={image.alt||`Captured image ${index+1}`} loading="lazy"/></a>
  <figcaption><strong>Image {index+1}</strong>{image.alt&&<p>{image.alt}</p>}{image.gallery&&<span className="conversation-image-gallery">Gallery image</span>}{image.locations.length>0&&<small>{image.locations.join(' · ')}</small>}<a href={image.url} target="_blank" rel="noopener noreferrer">Open full size</a></figcaption>
 </figure>)}</div>;
}
