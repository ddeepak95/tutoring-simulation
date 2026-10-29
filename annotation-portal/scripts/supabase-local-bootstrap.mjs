import fs from 'node:fs';
import path from 'node:path';

// Cloud runners render historical templates and register rubrics manually.
// Prepare files for CLI replay without rewriting cloud migration history.
export function renderLocalMigration(sql, historicalRubric) {
  return sql.replaceAll('__CURRENT_RUBRIC_JSON__', JSON.stringify(historicalRubric).replaceAll("'", "''"))
    .replaceAll('__CURRENT_RUBRIC_HASH__', historicalRubric.rubric_sha256)
    // Fresh databases have no assignments to upgrade. Existing work still
    // requires the exact historical rubric to avoid changing its interpretation.
    .replace(/if not exists(\s*\(\s*select 1 from public\.rubric_versions\s+where hash\s*=\s*')/gi,
      'if exists(select 1 from public.assignments) and not exists$1');
}
export function prepareLocalProject(root) {
  const workdir = path.join(root, '.runtime/supabase-local');
  const source = path.join(root, 'supabase');
  const destination = path.join(workdir, 'supabase');
  fs.mkdirSync(path.join(destination, 'migrations'), { recursive: true });
  fs.copyFileSync(path.join(source, 'config.toml'), path.join(destination, 'config.toml'));
  const rubric = JSON.parse(fs.readFileSync(path.join(source, 'bootstrap/section-items-v1.json'), 'utf8'));
  for (const file of fs.readdirSync(path.join(source, 'migrations')).filter(file => file.endsWith('.sql'))) {
    fs.writeFileSync(path.join(destination, 'migrations', file), renderLocalMigration(fs.readFileSync(path.join(source, 'migrations', file), 'utf8'), rubric));
  }
  return workdir;
}
