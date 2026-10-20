import { useEffect, useRef, useState } from 'react';
import type { ComparisonAssignment } from './comparison';

export function ResetComparison({ assignment, onClose, onReset }: { assignment: ComparisonAssignment; onClose: () => void; onReset: () => Promise<void> }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { dialog.current?.showModal(); }, []);
  async function reset() {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try { await onReset(); onClose(); }
    catch (error) { setError(error instanceof Error ? error.message : 'Could not reset comparison.'); }
    finally { pending.current = false; setBusy(false); }
  }
  return <dialog ref={dialog} className="delete-dialog" aria-labelledby="reset-comparison-title" onCancel={event => { if (pending.current) event.preventDefault(); else onClose(); }}>
    <h2 id="reset-comparison-title">Reset comparison responses?</h2>
    <p>This clears all turn ratings, overall ratings, and notes from this assignment and restarts it with the current questions.</p>
    <p>{assignment.answers.length} saved turns{assignment.overall_answer ? ' and overall conversation ratings' : ''} will be reset. Previous responses remain in revision history.</p>
    {error && <p className="error" role="alert">{error}</p>}
    <div className="actions"><button className="secondary" disabled={busy} onClick={onClose} autoFocus>Cancel</button><button className="delete-confirm" disabled={busy} onClick={() => void reset()}>{busy ? 'Resetting...' : 'Reset responses'}</button></div>
  </dialog>;
}
