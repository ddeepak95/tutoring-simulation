import type {Feature} from './types';

export function itemGuidance(feature:Feature) {
  return (feature.guidance||feature.description).replace('Select its section, choose this item, and enter the number of occurrences in that section. Include repeats. Save one label per section/item pair. Do not merge evidence from different sections.','').trim()||feature.description;
}
