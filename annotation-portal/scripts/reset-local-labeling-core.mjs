const quote = value => '"' + value.replaceAll('"', '""') + '"';

/** This operation is deliberately separate from deployable migrations. */
export function assertLocalResetTarget(config) {
  const loopback = value => ['localhost', '127.0.0.1', '[::1]'].includes(new URL(value).hostname);
  if (config.target !== 'local' || !loopback(config.dbUrl) || !loopback(config.url)) {
    throw new Error('Label reset requires the explicit local loopback profile.');
  }
}

async function fingerprint(db, table, where = '') {
  const result = await db.query(`select count(*)::int as count,
    md5(coalesce(string_agg(row_to_json(t)::text, '' order by row_to_json(t)::text), '')) as hash
    from ${table} t ${where}`);
  return result.rows[0];
}

export async function resetLocalLabeling(db, rubric, config, {apply = false} = {}) {
  assertLocalResetTarget(config);
  if (rubric.rubric?.length !== 22 || !/^[a-f0-9]{64}$/.test(rubric.rubric_sha256)) {
    throw new Error('Expected the generated 22-label rubric.');
  }
  await db.query('begin isolation level serializable');
  try {
    await db.query("select pg_advisory_xact_lock(hashtext('annotation-portal-full-sync'))");
    const tables = (await db.query(`select schemaname, tablename from pg_tables
      where schemaname in ('public','auth','storage') order by schemaname,tablename`)).rows;
    const changed = new Set(['assignments','annotation_revisions','assignment_rubric_upgrades',
      'label_schema_replacements','llm_baselines','llm_generation_runs','rubric_versions']);
    // Stop portal writes while capturing and validating the reset inventory.
    for (const table of tables.filter(t => t.schemaname === 'public')) {
      await db.query(`lock table public.${quote(table.tablename)} in share row exclusive mode`);
    }
    const protectedTables = tables.filter(t => t.schemaname !== 'public' || !changed.has(t.tablename));
    const before = new Map();
    for (const t of protectedTables) {
      const table = `${quote(t.schemaname)}.${quote(t.tablename)}`;
      before.set(table, await fingerprint(db, table));
    }
    const ratings = await fingerprint(db, 'public.assignments', "where t.task_type='rate'");
    const ratingRevisions = await fingerprint(db, 'public.annotation_revisions',
      "where t.assignment_id in (select id from public.assignments where task_type='rate')");
    const oldRubrics = (await db.query('select hash, snapshot from public.rubric_versions order by hash')).rows;
    const active = (await db.query(`select distinct conversation_id, annotator_id from public.assignments
      where task_type='label' and is_active order by conversation_id,annotator_id`)).rows;
    const summary = (await db.query(`select
      (select count(*)::int from public.assignments where task_type='label') as labeling_assignments,
      (select count(*)::int from public.annotation_revisions where assignment_id in
        (select id from public.assignments where task_type='label')) as labeling_revisions,
      (select count(*)::int from public.llm_baselines) as evaluations,
      (select count(*)::int from public.llm_generation_runs) as generation_runs`)).rows[0];
    if (!apply) {
      await db.query('rollback');
      return {mode:'preview', ...summary, blank_assignments:active.length};
    }
    await db.query(`insert into public.rubric_versions(hash,snapshot) values($1,$2::jsonb)
      on conflict(hash) do nothing`, [rubric.rubric_sha256, JSON.stringify(rubric)]);
    await db.query(`delete from public.assignment_rubric_upgrades where assignment_id in
      (select id from public.assignments where task_type='label')`);
    await db.query(`delete from public.label_schema_replacements where old_assignment_id in
      (select id from public.assignments where task_type='label') or new_assignment_id in
      (select id from public.assignments where task_type='label')`);
    await db.query(`delete from public.annotation_revisions where assignment_id in
      (select id from public.assignments where task_type='label')`);
    await db.query("delete from public.assignments where task_type='label'");
    await db.query('delete from public.llm_baselines');
    await db.query('delete from public.llm_generation_runs');
    for (const a of active) {
      await db.query(`insert into public.assignments(conversation_id,annotator_id,rubric_hash,task_type)
        values($1,$2,$3,'label')`, [a.conversation_id,a.annotator_id,rubric.rubric_sha256]);
    }
    for (const [table, previous] of before) {
      if (JSON.stringify(await fingerprint(db, table)) !== JSON.stringify(previous)) {
        throw new Error('Protected records changed; resetting transaction rolled back.');
      }
    }
    if (JSON.stringify(ratings) !== JSON.stringify(await fingerprint(db,'public.assignments',"where t.task_type='rate'")) ||
        JSON.stringify(ratingRevisions) !== JSON.stringify(await fingerprint(db,'public.annotation_revisions',
          "where t.assignment_id in (select id from public.assignments where task_type='rate')"))) {
      throw new Error('Rating work changed; resetting transaction rolled back.');
    }
    for (const row of oldRubrics) {
      const saved = (await db.query('select snapshot from public.rubric_versions where hash=$1',[row.hash])).rows[0];
      if (JSON.stringify(saved?.snapshot) !== JSON.stringify(row.snapshot)) throw new Error('Historical rubric changed.');
    }
    const fresh = (await db.query(`select conversation_id,annotator_id from public.assignments where task_type='label'
      and rubric_hash=$1 and annotations='[]'::jsonb and turn_ratings='{}'::jsonb and status='not_started'
      and revision=0 and baseline_id is null and annotation_source='blank' and is_active and submitted_at is null
      order by conversation_id,annotator_id`, [rubric.rubric_sha256])).rows;
    if (JSON.stringify(fresh) !== JSON.stringify(active)) throw new Error('Blank assignment verification failed.');
    await db.query('commit');
    return {mode:'applied', ...summary, blank_assignments:fresh.length, protected_tables_verified:before.size,
      ratings_preserved:ratings.count, rating_revisions_preserved:ratingRevisions.count};
  } catch (error) {
    await db.query('rollback');
    throw error;
  }
}
