import { useState, type ReactNode } from 'react';

/** Remember the expanded provider independently for each topic in this tab. */
export function ProviderAccordion({ topicKey, provider, summary, children }: { topicKey: string; provider: string; summary: ReactNode; children: ReactNode }) {
  const storageKey = `annotation-portal:topic-provider:${topicKey}`;
  const [open, setOpen] = useState(() => {
    try { return sessionStorage.getItem(storageKey) === provider; } catch { return false; }
  });
  return <details className="provider-accordion" name={`providers-${topicKey}`} open={open} onToggle={event => {
    const expanded = event.currentTarget.open;
    setOpen(expanded);
    try {
      if (expanded) sessionStorage.setItem(storageKey, provider);
      // Closing the previous provider must not erase the newly opened one.
      else if (sessionStorage.getItem(storageKey) === provider) sessionStorage.removeItem(storageKey);
    } catch { /* The accordion still works when browser storage is unavailable. */ }
  }}>
    <summary>{summary}</summary>
    {children}
  </details>;
}
