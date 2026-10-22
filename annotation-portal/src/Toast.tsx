import { useCallback, useEffect, useRef, useState } from 'react';

export interface ToastNotice { id: number; message: string; }

export function useToast(): [ToastNotice | null, (message: string) => void] {
  const [notice, setNotice] = useState<ToastNotice | null>(null);
  const nextId = useRef(0);
  const show = useCallback((message: string) => {
    setNotice(message ? { id: ++nextId.current, message } : null);
  }, []);
  return [notice, show];
}

export function Toast({ notice, onDismiss, duration = 6000 }: { notice: ToastNotice | null; onDismiss: () => void; duration?: number }) {
  const dismiss = useRef(onDismiss);
  useEffect(() => { dismiss.current = onDismiss; }, [onDismiss]);
  useEffect(() => {
    if (!notice || duration <= 0) return;
    const timer = window.setTimeout(() => dismiss.current(), duration);
    return () => window.clearTimeout(timer);
  }, [notice?.id, duration]);
  if (!notice) return null;
  return <div className="portal-toast" role="status" aria-atomic="true"><p>{notice.message}</p><button type="button" aria-label="Dismiss notification" onClick={onDismiss}>×</button></div>;
}
