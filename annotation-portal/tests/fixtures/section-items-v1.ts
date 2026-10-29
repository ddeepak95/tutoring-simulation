// The historical migration requires the original 15-item rubric. New category
// additions use the live-rubric upgrade path instead of rerunning that migration.
import snapshot from '../../supabase/bootstrap/section-items-v1.json';
import type { RubricSnapshot } from '../../src/types';
export const bundledRubric = snapshot as RubricSnapshot;
