import fs from 'node:fs';
let validation = fs.readFileSync('supabase/migrations/202610090003_remove_instructional_sequence.sql', 'utf8');
validation = validation.replace('-- Retire Instructional Sequence without changing saved ratings or pinned rubrics.', '-- Apply first/subsequent tutor-turn requirements from rating-questions.md; preserve saved work.');
validation = validation.replace('   select d into dimension', "   if key='appropriateness_for_the_learners_level' and rating_value='\"Insufficient evidence\"'::jsonb then continue; end if;\n   select d into dimension");
validation = validation.replace("    if dimension->>'key'='instructional_sequence' then continue; end if;", "    if dimension->>'key'='instructional_sequence' then continue; end if;\n    if dimension->>'key' in ('coherence','responsiveness') and turn->>'turn_id'=(select value->>'turn_id' from jsonb_array_elements(transcript->'messages') with ordinality as messages(value,position) where value->>'speaker'='tutor' order by position limit 1) then continue; end if;");
validation = validation.replace("    if rating_value is null or", "    if dimension->>'key'='appropriateness_for_the_learners_level' and rating_value='\"Insufficient evidence\"'::jsonb then continue; end if;\n    if rating_value is null or");
fs.writeFileSync('supabase/migrations/202610100001_rating_questions.sql', validation);
const runner = fs.readFileSync('scripts/migrate-sequence.mjs', 'utf8').replaceAll('202610090003', '202610100001').replaceAll('remove_instructional_sequence', 'rating_questions').replace("position('instructional_sequence' in prosrc)", "position('with ordinality' in prosrc)");
fs.writeFileSync('scripts/migrate-rating-questions.mjs', runner);
