# Repository agent notes

## Instructional labeling features

When adding or changing an instructional feature, update the coding guidebook, `conversation-evaluation/human-annotation/ui/data.js`, and `conversation-evaluation/schemas/evaluator-v3.schema.json` together. Portal builds and development startup run `sync:rubric` automatically; the Vite development server also reruns it when those sources change. Inspect and keep the resulting `annotation-portal/src/generated` changes with the source edits. Run the focused labeling tests and `npm run build` from `annotation-portal` before finishing.

The database's one-time live-label-rubric migration lets compatible new categories appear in active Label assignments when opened, preserving their annotations. New fields on existing categories must be optional for automatic upgrades. Submitted assignments retain their pinned rubric until reopened. The admin dashboard registers each deployed rubric version; do not create a feature-specific migration for compatible additions.
