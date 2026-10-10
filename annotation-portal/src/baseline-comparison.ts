import type { Annotation } from './types';
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.entries(value).sort(([a],[b]) => a.localeCompare(b)).map(([key,item]) => `${JSON.stringify(key)}:${canonical(item)}`).join(',')}}`;
  return JSON.stringify(value) ?? 'undefined';
}
export function compareWithBaseline(baseline: Annotation[], current: Annotation[]) {
  const original = new Map(baseline.map(annotation => [annotation.id, annotation]));
  const revisions = new Map(current.map(annotation => [annotation.id, annotation]));
  const unchanged: string[] = [];
  const edited: { id: string; before: Annotation; after: Annotation; attribute_changes: { key: string; before: unknown; after: unknown }[]; evidence_changed: boolean; feature_changed: boolean }[] = [];
  const added = current.filter(annotation => !original.has(annotation.id));
  const deleted = baseline.filter(annotation => !revisions.has(annotation.id));
  for (const before of baseline) {
    const after = revisions.get(before.id); if (!after) continue;
    if (canonical(before) === canonical(after)) { unchanged.push(before.id); continue; }
    const keys = [...new Set([...Object.keys(before.entry),...Object.keys(after.entry)])];
    edited.push({ id: before.id, before, after, attribute_changes: keys.filter(key => canonical(before.entry[key]) !== canonical(after.entry[key])).map(key => ({ key, before: before.entry[key] ?? null, after: after.entry[key] ?? null })), evidence_changed: canonical(before.evidence) !== canonical(after.evidence), feature_changed: before.feature !== after.feature });
  }
  return { counts: { unchanged: unchanged.length, edited: edited.length, added: added.length, deleted: deleted.length }, unchanged, edited, added, deleted };
}
