import { useEffect, useState } from 'react';
import { supabase } from './lib';
import type { Assignment, Profile } from './types';

type AnnotationView = Pick<Assignment, 'id' | 'annotator_id' | 'status' | 'rubric_hash' | 'profiles'>;
const statusText = { not_started: 'Not started', in_progress: 'In progress', submitted: 'Submitted' };

export function AnnotatorSwitcher({ assignment, profile, busy, onSwitch, viewOnly = false }: { assignment: Assignment; profile: Profile; busy: boolean; onSwitch: (id: string) => void; viewOnly?: boolean }) {
  const [views, setViews] = useState<AnnotationView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let alive = true;
    setLoading(true); setError(''); setViews([]);
    void (async () => {
      try {
        const { data, error } = await supabase!.from('assignments').select('id, annotator_id, status, rubric_hash, profiles!assignments_annotator_id_fkey(id, username, role)').eq('conversation_id', assignment.conversation_id).returns<AnnotationView[]>();
        if (error) throw error;
        if (alive) setViews((data as AnnotationView[]).sort((a, b) => (a.profiles?.username || a.annotator_id).localeCompare(b.profiles?.username || b.annotator_id)));
      } catch { if (alive) setError('Could not load annotators.'); }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, [assignment.conversation_id, assignment.id, attempt]);
  const others = views.filter(view => viewOnly || view.annotator_id !== profile.id);
  return <div className="annotator-switcher">
    <label htmlFor="annotation-view">Annotations by</label>
    <select id="annotation-view" value={!viewOnly && assignment.annotator_id === profile.id ? 'own' : assignment.id} disabled={busy || loading || Boolean(error)} onChange={event => onSwitch(event.target.value)}>
      {!viewOnly && <option value="own">{profile.username} (you)</option>}
      {!others.some(view => view.id === assignment.id) && (viewOnly || assignment.annotator_id !== profile.id) && <option value={assignment.id}>{assignment.profiles?.username || assignment.annotator_id}</option>}
      {others.map(view => <option key={view.id} value={view.id}>{view.profiles?.username || view.annotator_id}{view.annotator_id === profile.id ? ' (you)' : ''} — {statusText[view.status]}{others.filter(other => other.annotator_id === view.annotator_id).length > 1 ? ` (${view.rubric_hash.slice(0, 8)})` : ''}</option>)}
    </select>
    {error && <span role="alert">{error} <button className="text-button" onClick={() => setAttempt(value => value + 1)}>Retry</button></span>}
  </div>;
}
