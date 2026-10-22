import { useState, type FormEvent } from 'react';
import { loginIdentifier, supabase } from './lib';
import type { Profile } from './types';
import { Toast, useToast } from './Toast';

export function CreateAnnotator({ onCreated }: { onCreated: (profile: Profile) => void }) {
  const [username, setUsername] = useState(''); const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false); const [visible, setVisible] = useState(false);
  const [error, setError] = useState(''); const [notice, setNotice] = useToast();
  async function create(event: FormEvent) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const normalized = loginIdentifier(username).split('@')[0];
      if (password.length < 8) throw new Error('Use a password with at least 8 characters.');
      const { data, error: sessionError } = await supabase!.auth.getSession();
      if (sessionError || !data.session) throw new Error('Your session has expired. Sign in again.');
      const response = await fetch('/api/annotators', {
        method: 'POST', headers: { Authorization: `Bearer ${data.session.access_token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: normalized, password })
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || 'Could not create the annotator. Please try again.');
      if (!result?.annotator?.id || result.annotator.username !== normalized || result.annotator.role !== 'annotator') throw new Error('Could not confirm the account. Refresh the dashboard before trying again.');
      setPassword(''); setUsername(''); setVisible(false);
      setNotice(`Annotator ${normalized} created. Share their username and password privately, then assign conversations from the Conversations page.`);
      onCreated(result.annotator as Profile);
    } catch (error) { setError(error instanceof Error ? error.message : 'Could not create the annotator.'); }
    finally { setBusy(false); }
  }
  return <form className="card create-annotator" onSubmit={create}>
    <h2>Create annotator</h2><p>Create a username and password for each annotator.</p>
    <div className="account-fields">
      <label>Annotator username<input name="annotator_username" autoComplete="off" value={username} onChange={event => setUsername(event.target.value)} required minLength={3} maxLength={32} disabled={busy} aria-describedby="username-help" /></label>
      <div><label htmlFor="initial-password">Initial password</label><div className="password-field"><input id="initial-password" name="initial_password" type={visible ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} required minLength={8} disabled={busy} aria-describedby="password-help" /><button className="secondary" type="button" aria-label={visible ? 'Hide initial password' : 'Show initial password'} onClick={() => setVisible(value => !value)}>{visible ? 'Hide' : 'Show'}</button></div></div>
    </div>
    <div className="account-help"><small id="username-help">3–32 letters, numbers, dots, underscores, or hyphens. Start with a letter or number.</small><small id="password-help">At least 8 characters.</small></div>
    {error && <p className="error" role="alert">{error}</p>}<Toast notice={notice} onDismiss={() => setNotice('')} />
    <button className="primary" disabled={busy}>{busy ? 'Creating annotator…' : 'Create annotator'}</button>
  </form>;
}
