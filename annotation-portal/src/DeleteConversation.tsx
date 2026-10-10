import { useEffect, useRef, useState } from 'react';
import { supabase } from './lib';
import type { DocumentRow } from './types';

interface Preview {
  conversation_id: string; label: string; assignment_count: number; annotation_count: number; revision_count: number; snapshot: string;
  baseline_count?: number; generation_count?: number;
}
function validPreview(value: unknown, id: string): value is Preview {
  const preview = value as Preview;
  return preview?.conversation_id === id && typeof preview.label === 'string' && /^[a-f0-9]{32}$/.test(preview.snapshot)
    && [preview.assignment_count, preview.annotation_count, preview.revision_count].every(count => Number.isInteger(count) && count >= 0);
}

export function DeleteConversation({ document, onClose, onDeleted }: { document: DocumentRow; onClose: () => void; onDeleted: (id: string) => Promise<void> }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pending = useRef(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function load() {
    setLoading(true); setPreview(null);
    try {
      const { data, error } = await supabase!.rpc('preview_conversation_deletion', { p_conversation_id: document.id });
      if (error) throw new Error(error.message);
      if (!validPreview(data, document.id)) throw new Error('Could not verify deletion details. Refresh and try again.');
      setPreview(data);
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not load deletion details.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { dialog.current?.showModal(); void load(); }, [document.id]);
  async function remove() {
    if (!preview || pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try {
      const { data, error } = await supabase!.rpc('delete_conversation', { p_conversation_id: document.id, p_expected_snapshot: preview.snapshot });
      if (error) {
        if (error.code === '40001') { setError(error.message); await load(); return; }
        // The request may have reached the server even if its response was lost.
        // Require a fresh preview before another confirmation.
        setPreview(null); throw new Error(error.message);
      }
      if (data?.deleted !== true || data.conversation_id !== document.id) { setPreview(null); throw new Error('Could not confirm deletion. Refresh the dashboard before trying again.'); }
      await onDeleted(document.id); onClose();
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not delete the conversation.'); }
    finally { pending.current = false; setBusy(false); }
  }
  return <dialog ref={dialog} className="delete-dialog" aria-labelledby="delete-title" onCancel={event => { if (pending.current) event.preventDefault(); else onClose(); }}>
    <span className="eyebrow">DELETE CONVERSATION</span><h2 id="delete-title">Delete conversation?</h2>
    <p className="delete-topic"><strong>{document.transcript.learning_topic || document.label}</strong><small>{document.transcript.conversation_id || document.id}</small></p>
    <p>This permanently removes the conversation from the portal, together with its assignments, annotations, and saved revision history.</p>
    {loading ? <p role="status">Checking current annotation work…</p> : preview && <dl className="deletion-counts"><div><dt>Assignments</dt><dd>{preview.assignment_count}</dd></div><div><dt>Current annotations</dt><dd>{preview.annotation_count}</dd></div><div><dt>Saved revisions</dt><dd>{preview.revision_count}</dd></div>{Boolean(preview.baseline_count) && <div><dt>LLM baselines</dt><dd>{preview.baseline_count}</dd></div>}{Boolean(preview.generation_count) && <div><dt>Generation records</dt><dd>{preview.generation_count}</dd></div>}</dl>}
    <small>Source files are retained separately. Other conversations, including translations, remain available.</small>
    {error && <p className="error" role="alert">{error}</p>}
    {!preview && !loading && <button className="secondary" disabled={busy} onClick={() => { setError(''); void load(); }}>Refresh deletion details</button>}
    <div className="actions"><button className="secondary" disabled={busy} onClick={onClose} autoFocus>Cancel</button><button className="delete-confirm" disabled={busy || loading || !preview} onClick={() => void remove()}>{busy ? 'Deleting…' : 'Delete conversation'}</button></div>
  </dialog>;
}
