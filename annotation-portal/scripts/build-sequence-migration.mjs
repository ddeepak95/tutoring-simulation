import fs from 'node:fs';
const original = fs.readFileSync('supabase/migrations/202610090001_turn_ratings_issues.sql', 'utf8');
let validation = original.slice(original.indexOf('create function public.validate_turn_ratings('), original.indexOf('create function public.save_assignment('));
validation = validation.replace('create function', 'create or replace function');
validation = validation.replace('   select d into dimension', `   if key='instructional_sequence' and jsonb_typeof(rating_value)='string' and rating_value in ('""'::jsonb,'"Rule → Example"'::jsonb,'"Example → Rule"'::jsonb,'"Not determinable"'::jsonb) then continue; end if;\n   select d into dimension`);
validation = validation.replace("    rating_value := rating->'values'->(dimension->>'key');", "    -- Retired dimension is preserved in saved work but never required.\n    if dimension->>'key'='instructional_sequence' then continue; end if;\n    rating_value := rating->'values'->(dimension->>'key');");
fs.writeFileSync('supabase/migrations/202610090003_remove_instructional_sequence.sql', '-- Retire Instructional Sequence without changing saved ratings or pinned rubrics.\nbegin;\n' + validation + '\nrevoke all on function public.validate_turn_ratings(jsonb,jsonb,jsonb,boolean) from public,anon,authenticated;\ncommit;\n');
const runner = fs.readFileSync('scripts/migrate-issue-field.mjs', 'utf8').replaceAll('202610090002', '202610090003').replaceAll('remove_issue_correction_status', 'remove_instructional_sequence').replaceAll('correction_status', 'instructional_sequence').replaceAll('validate_annotations', 'validate_turn_ratings');
fs.writeFileSync('scripts/migrate-sequence.mjs', runner);
