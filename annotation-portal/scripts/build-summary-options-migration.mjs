import fs from 'node:fs';
let validation = fs.readFileSync('supabase/migrations/202610100001_rating_questions.sql', 'utf8');
validation = validation.replace('-- Apply first/subsequent tutor-turn requirements from rating-questions.md; preserve saved work.', '-- Retire the no-new-concept option; preserve historical ratings but require an answer for submission.');
validation = validation.replace('   select d into dimension', "   if key='concept_summarization' and rating_value='\"Not applicable\"'::jsonb then continue; end if;\n   select d into dimension");
validation = validation.replace("    if rating_value is null or", "    if dimension->>'key'='concept_summarization' and rating_value='\"Not applicable\"'::jsonb then raise exception 'Choose a Concept Summarization answer before submitting: %',turn->>'turn_id'; end if;\n    if rating_value is null or");
fs.writeFileSync('supabase/migrations/202610100002_summary_options.sql', validation);
const runner = fs.readFileSync('scripts/migrate-rating-questions.mjs', 'utf8').replaceAll('202610100001', '202610100002').replaceAll('rating_questions.sql', 'summary_options.sql').replace("position('with ordinality' in prosrc)", "position('Choose a Concept Summarization answer' in prosrc)");
fs.writeFileSync('scripts/migrate-summary-options.mjs', runner);
