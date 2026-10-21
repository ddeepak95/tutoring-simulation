import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  confirmLabel: string;
  pendingLabel?: string;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
}

function errorMessage(cause: unknown) {
  if (cause instanceof Error) return cause.message;
  if (cause && typeof cause === 'object' && 'message' in cause && typeof cause.message === 'string') return cause.message;
  return 'Could not complete this action. Try again.';
}

export function ConfirmDialog({ title, children, confirmLabel, pendingLabel = 'Please wait…', onCancel, onConfirm }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pending = useRef(false);
  const titleId = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { dialog.current?.showModal(); }, []);

  async function confirm() {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError('');
    try { await onConfirm(); onCancel(); }
    catch (cause) { setError(errorMessage(cause)); }
    finally { pending.current = false; setBusy(false); }
  }

  return <dialog ref={dialog} className="confirmation-dialog" aria-labelledby={titleId} onCancel={event => { if (pending.current) event.preventDefault(); else onCancel(); }}>
    <h2 id={titleId}>{title}</h2>
    <div className="confirmation-dialog-content">{children}</div>
    {error && <p className="error" role="alert">{error}</p>}
    <div className="actions"><button type="button" className="secondary" disabled={busy} onClick={onCancel} autoFocus>Cancel</button><button type="button" className="primary" disabled={busy} onClick={() => void confirm()}>{busy ? pendingLabel : confirmLabel}</button></div>
  </dialog>;
}
