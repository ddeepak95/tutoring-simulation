import fs from 'node:fs';
const original = fs.readFileSync('supabase/migrations/202610080001_portal.sql', 'utf8');
let validation = original.slice(original.indexOf('create function public.validate_annotations('), original.indexOf('create function public.save_assignment('));
validation = validation.replace('create function', 'create or replace function');
validation = validation.replace("if item_key <> 'turn_locations' and", "if item_key <> 'turn_locations' and not (a->>'feature'='issues' and item_key='correction_status') and");
validation = validation.replace("      field_value := a->'entry'->(field->>'key');", "      -- Retired issue metadata is preserved, but is no longer required.\n      if a->>'feature'='issues' and field->>'key'='correction_status' then continue; end if;\n      field_value := a->'entry'->(field->>'key');");
fs.writeFileSync('supabase/migrations/202610090002_remove_issue_correction_status.sql', '-- Remove the issue correction-status requirement without changing saved data or pinned rubrics.\nbegin;\n' + validation + '\nrevoke all on function public.validate_annotations(jsonb,jsonb,jsonb,boolean) from public,anon,authenticated;\ncommit;\n');
