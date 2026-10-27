/** Render historical migrations for a verified empty portal database. */
export function freshProjectMigration(file,sql,rubric){
 if(!rubric.rubric_sha256||rubric.label_schema_version!=='section-items/1')throw Error('Build the current rubric before provisioning.');
 let rendered=sql.replaceAll('__CURRENT_RUBRIC_HASH__',rubric.rubric_sha256).replaceAll('__CURRENT_RUBRIC_JSON__',JSON.stringify(rubric).replaceAll("'","''")).replace('-- __SECTION_REGISTRY_BACKFILL__','-- Empty project: no historical sections to backfill.');
 // These historical guards protect existing annotations during live upgrades.
 // Empty projects have no assignments or historical rubric to upgrade.
 if(/^2026102100(?:01|02|03|05|07|09|10|11)_/.test(file)){
  rendered=rendered.replace(/if not exists \(\s*select 1 from public\.rubric_versions/,"if exists(select 1 from public.assignments) and not exists (select 1 from public.rubric_versions");
 }
 if(/__[A-Z_]+__/.test(rendered))throw Error(`Unresolved migration template: ${file}`);
 return rendered;
}
