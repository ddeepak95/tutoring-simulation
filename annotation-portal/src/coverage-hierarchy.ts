import type { Annotation, Feature } from './types';

export function parseCoverageTopic(value: unknown) {
  if (typeof value !== 'string') return null;
  const parts = value.split(' :: ').map(part => part.trim());
  return parts.length >= 1 && parts.length <= 3 && parts.every(part=>Boolean(part)&&!part.includes('::')) ? { main: parts[0], unit: parts[1] || null, subunit: parts[2] || null, component: parts.slice(1).join(' :: ') || parts[0], depth: parts.length } : null;
}

export function groupCoverage(annotations: Annotation[]) {
  const groups = new Map<string, { main: string; annotation?:Annotation; units:{name:string;annotation?:Annotation;subunits:{name:string;annotation:Annotation}[]}[]; components: { name: string; annotation: Annotation }[] }>();
  for (const annotation of annotations) {
    if (annotation.feature !== 'concepts_and_subtopics_covered') continue;
    const topic = parseCoverageTopic(annotation.entry.topic);
    if (!topic) continue;
    const key = topic.main.toLocaleLowerCase('en');
    const group = groups.get(key) || { main: topic.main, units:[], components: [] };
    if(topic.depth===1){group.annotation=annotation;groups.set(key,group);continue;}
    let unit=group.units.find(unit=>unit.name.toLocaleLowerCase('en')===topic.unit?.toLocaleLowerCase('en'));
    if(!unit){unit={name:topic.unit!,subunits:[]};group.units.push(unit);}
    if(topic.subunit)unit.subunits.push({name:topic.subunit,annotation});else unit.annotation=annotation;
    group.components.push({ name: topic.component, annotation });
    groups.set(key, group);
  }
  // Attach explicit topic-level headings after groups have been established.
  for(const annotation of annotations){if(annotation.feature!=='concepts_and_subtopics_covered')continue;const topic=parseCoverageTopic(annotation.entry.topic);if(topic?.depth!==1)continue;const group=groups.get(topic.main.toLocaleLowerCase('en'));if(group)group.annotation=annotation;}
  return [...groups.values()];
}

// Derive the level from the stored parent path so legacy annotations stay valid.
export function conceptLevel(annotation: Annotation) {
  if (annotation.feature !== 'concepts_and_subtopics_covered') return null;
  const topic = parseCoverageTopic(annotation.entry.topic);
  return topic ? (['Main concept', 'Explanatory unit', 'Explanatory subunit'] as const)[topic.depth - 1] : null;
}
export function conceptDisplayFeature(feature: Feature): Feature {
  return feature.key === 'concepts_and_subtopics_covered'
    ? {...feature, name: 'Concepts', short_label: 'Concepts', fields: feature.fields.map(field => field.key === 'topic' ? {...field, label: 'Concept hierarchy path'} : field)}
    : feature;
}
