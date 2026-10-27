import type { SupabaseClient } from '@supabase/supabase-js';
import { bundledRubric, supabase } from './lib';
import type { AssignmentType, Profile } from './types';

export async function openAdminAnnotations(conversationId: string, profile: Profile, client: SupabaseClient = supabase!, taskType: AssignmentType = 'label'): Promise<string> {
  if (profile.role !== 'admin') throw new Error('Admin access required.');
  async function existing() {
    const { data, error } = await client.from('assignments').select('id, baseline_id, status, revision, annotations, turn_ratings, task_type').eq('conversation_id', conversationId).eq('annotator_id', profile.id).eq('task_type',taskType).eq('is_active',true).order('updated_at', { ascending: false }).limit(1).maybeSingle();
    if (error) throw new Error('Could not load your annotations. Please try again.');
    return data;
  }
  // Continue existing work using its pinned rubric, even after the bundled rubric changes.
  const previous = await existing();
  const untouched=previous && !previous.baseline_id && previous.status==='not_started' && previous.revision===0 && previous.annotations?.length===0 && Object.keys(previous.turn_ratings || {}).length===0;
  if (previous && !untouched) return previous.id;
  if(untouched && typeof window!=='undefined') {
    try {
      const draft=JSON.parse(localStorage.getItem(`annotation-portal:draft:${profile.id}:${previous.id}`) || 'null');
      if(draft && (draft.annotations?.length || Object.keys(draft.turn_ratings || {}).length)) return previous.id;
    } catch { return previous.id; }
  }
  // The database chooses the latest saved baseline and atomically seeds only
  // untouched work. Its conversation lock also prevents concurrent duplicates.
  const { data: version, error: readError } = await client.from('rubric_versions').select('hash').eq('hash', bundledRubric.rubric_sha256).maybeSingle();
  if (readError) throw new Error('Could not load the coding rubric.');
  if (!version) {
    const { error } = await client.from('rubric_versions').insert({ hash: bundledRubric.rubric_sha256, snapshot: bundledRubric });
    if (error && error.code !== '23505') throw new Error('Could not register the coding rubric.');
  }
  const { error } = taskType === 'label'
    ? await client.rpc('open_admin_annotation_assignment',{p_conversation_id:conversationId,p_rubric_hash:bundledRubric.rubric_sha256})
    : await client.rpc('create_task_assignments',{p_conversation_ids:[conversationId],p_annotator_ids:[profile.id],p_task_types:[taskType],p_rubric_hash:bundledRubric.rubric_sha256,p_baseline_ids:{}});
  if (error) throw new Error('Could not open this conversation for annotation. Refresh the dashboard and try again.');
  const row = await existing(); const id=row?.id;
  if (!id) throw new Error('Could not confirm your annotation record. Please try again.');
  return id;
}
