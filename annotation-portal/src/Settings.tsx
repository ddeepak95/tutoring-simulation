import { useEffect, useState } from 'react';
import { CreateAnnotator } from './CreateAnnotator';
import { supabase } from './lib';
import type { Profile } from './types';

export function Settings() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    void supabase!.from('profiles').select('*').eq('role', 'annotator').order('username').then(({ data, error }) => {
      if (!alive) return;
      if (error) setError('Could not load annotators. Refresh this page to try again.');
      else setUsers(data as Profile[]);
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);
  return <main className="dashboard settings-page">
    <div className="page-heading"><div><span className="eyebrow">ADMINISTRATION</span><h1>Settings</h1><p>Manage annotator accounts.</p></div></div>
    <CreateAnnotator onCreated={profile => setUsers(previous => [...previous.filter(user => user.id !== profile.id), profile].sort((a, b) => a.username.localeCompare(b.username)))} />
    <section className="card"><h2>Annotators</h2>
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? <p role="status">Loading annotators…</p> : users.length ? <ul className="annotator-list">{users.map(user => <li key={user.id}><span className="avatar" aria-hidden="true">{user.username.slice(0, 1).toUpperCase()}</span><strong>{user.username}</strong><span className="pill">Annotator</span></li>)}</ul> : <p>No annotators yet. Create an account above.</p>}
    </section>
  </main>;
}
