import {Link} from 'react-router-dom';
import type {DocumentRow} from './types';

export function ConversationRowLinks({document,busy,onAssign,onDelete}:{document:DocumentRow;busy:boolean;onAssign:(anchor:HTMLButtonElement)=>void;onDelete:()=>void}){
 return <span className="conversation-row-links" role="group" aria-label={`Actions for ${document.label}`}>
  <Link to={`/conversations/${document.id}`}>View</Link>
  <Link to={`/conversations/${document.id}/labeling`}>Label</Link>
  <Link to={`/conversations/${document.id}/rating`}>Rate</Link>
  <Link to={`/conversations/${document.id}/baselines`}>Baselines</Link>
  <button type="button" className="text-button" disabled={busy} aria-label={`Assign users for ${document.label}`} onClick={event=>onAssign(event.currentTarget)}>Assign</button>
  <button type="button" className="text-button conversation-row-delete" disabled={busy} onClick={onDelete}>Delete</button>
 </span>;
}
