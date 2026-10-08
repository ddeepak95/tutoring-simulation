import type { SupabaseClient } from '@supabase/supabase-js';
import { bundledRubric, supabase } from './lib';
import type { Profile } from './types';

export async function openAdminAnnotations(conversationId: string, profile: Profile, client: SupabaseClient = supabase!): Promise<string> {
  if (profile.role !== 'admin') throw new Error('Admin access required.');
  async function existing() {
    const { data, error } = await client.from('assignments').select('id').eq('conversation_id', conversationId).eq('annotator_id', profile.id).order('updated_at', { ascending: false }).limit(1).maybeSingle();
    if (error) throw new Error('Could not load your annotations. Please try again.');
    return data?.id as string | undefined;
  }
  // Continue existing work using its pinned rubric, even after the bundled rubric changes.
  const previous = await existing(); if (previous) return previous;
  const { data: version, error: readError } = await client.from('rubric_versions').select('hash').eq('hash', bundledRubric.rubric_sha256).maybeSingle();
  if (readError) throw new Error('Could not load the coding rubric.');
  if (!version) {
    const { error } = await client.from('rubric_versions').insert({ hash: bundledRubric.rubric_sha256, snapshot: bundledRubric });
    if (error && error.code !== '23505') throw new Error('Could not register the coding rubric.');
  }
  const { error } = await client.from('assignments').insert({ conversation_id: conversationId, annotator_id: profile.id, rubric_hash: bundledRubric.rubric_sha256 });
  if (error && error.code !== '23505') throw new Error('Could not open this conversation for annotation. Refresh the dashboard and try again.');
  const id = await existing();
  if (!id) throw new Error('Could not confirm your annotation record. Please try again.');
  return id;
}
