import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import type { Assignment, DocumentRow, Profile } from './types';

interface Props {
  documents: DocumentRow[]; users: Profile[]; assignments: Assignment[]; anchor: HTMLButtonElement;
  onAssign: (documentIds: string[], userIds: string[]) => Promise<void>; onClose: () => void;
  onDelete: (document: DocumentRow) => void;
}

export function AssignmentMenu({ documents, users, assignments, anchor, onAssign, onClose, onDelete }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const menu = useRef<HTMLFormElement>(null);
  const close = useRef(onClose); close.current = onClose;
  const working = useRef(false);
  const rect = anchor.getBoundingClientRect();
  const width = Math.min(340, window.innerWidth - 24);
  const left = Math.max(12, Math.min(rect.right - width, window.innerWidth - width - 12));
  const spaceBelow = window.innerHeight - rect.bottom - 20;
  const above = spaceBelow < Math.min(350, window.innerHeight / 2) && rect.top > spaceBelow;
  const position = above ? { bottom: Math.max(12, window.innerHeight - rect.top + 8) } : { top: Math.min(rect.bottom + 8, window.innerHeight - 100) };
  const maxHeight = Math.max(100, above ? rect.top - 20 : spaceBelow);
  const ids = new Set(documents.map(doc => doc.id));
  const current = assignments.filter(row => ids.has(row.conversation_id));
  function assignedCount(userId: string) { return new Set(current.filter(row => row.annotator_id === userId).map(row => row.conversation_id)).size; }

  useEffect(() => {
    const element = menu.current!;
    const initialRect = anchor.getBoundingClientRect();
    element.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
    function dismiss(event: PointerEvent) {
      if (!working.current && !element.contains(event.target as Node) && !anchor.contains(event.target as Node)) close.current();
    }
    function key(event: KeyboardEvent) {
      if (event.key === 'Escape' && !working.current) { event.preventDefault(); close.current(); }
      if (event.key === 'Tab') {
        const fields = Array.from(element.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]'));
        const first = fields[0], last = fields.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    function moved(event: Event) {
      if (working.current || (event.target instanceof Node && element.contains(event.target))) return;
      const nextRect = anchor.getBoundingClientRect();
      // Ignore queued scroll events from bringing the row into view before opening.
      if (event.type === 'resize' || Math.abs(nextRect.top - initialRect.top) > 1 || Math.abs(nextRect.left - initialRect.left) > 1) close.current();
    }
    document.addEventListener('pointerdown', dismiss); element.addEventListener('keydown', key);
    window.addEventListener('resize', moved); window.addEventListener('scroll', moved, true);
    return () => {
      document.removeEventListener('pointerdown', dismiss); element.removeEventListener('keydown', key);
      window.removeEventListener('resize', moved); window.removeEventListener('scroll', moved, true);
      if (anchor.isConnected) anchor.focus({ preventScroll: true });
    };
  }, [anchor]);

  async function submit(event: FormEvent) {
    event.preventDefault(); if (working.current || !selected.length) return;
    working.current = true; setBusy(true); setError('');
    try { await onAssign(documents.map(doc => doc.id), selected); close.current(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not assign conversations. Try again.'); }
    finally { working.current = false; setBusy(false); }
  }
  return createPortal(<form ref={menu} className="assignment-menu" role="dialog" aria-label="Assign annotators" style={{ left, width, maxHeight, ...position }} onSubmit={submit}>
    <button className="dismiss" type="button" disabled={busy} onClick={onClose} aria-label="Close assignment menu">×</button>
    <h3>Assign annotators</h3><p>{documents.length === 1 ? documents[0].transcript.learning_topic || documents[0].label : `${documents.length} selected conversations`}</p>
    {documents.length === 1 && <><Link className="view-annotate-link" to={`/conversations/${documents[0].id}/view`}>View annotations</Link><Link className="view-annotate-link" to={`/conversations/${documents[0].id}`}>View and annotate</Link></>}
    {users.length ? <fieldset><legend>Select annotators</legend>{users.map(user => {
      const count = assignedCount(user.id); const allAssigned = count === documents.length;
      return <label className="checkbox" key={user.id}><input type="checkbox" disabled={busy || allAssigned} checked={allAssigned || selected.includes(user.id)} onChange={event => setSelected(previous => event.target.checked ? [...previous, user.id] : previous.filter(id => id !== user.id))} /><span>{user.username}{count > 0 && <small>{allAssigned ? 'Already assigned' : `Assigned to ${count} of ${documents.length}`}</small>}</span></label>;
    })}</fieldset> : <p>No annotators yet. <Link to="/settings">Create one in Settings</Link>.</p>}
    {error && <p className="error" role="alert">{error}</p>}
    <button type="submit" className="primary" disabled={busy || !selected.length}>{busy ? 'Assigning…' : 'Assign to selected annotators'}</button>
    <small>Existing assignments and annotations are preserved.</small>
    {documents.length === 1 && <div className="conversation-menu-delete"><button className="delete-action" type="button" disabled={busy} onClick={() => onDelete(documents[0])}>Delete conversation</button></div>}
  </form>, document.body);
}
