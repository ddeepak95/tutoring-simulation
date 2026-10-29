import type { Annotation, RubricSnapshot } from './types';
import { featureItemCount } from './feature-counts';

export interface LabelVersion {
  key:string;
  label:string;
  rubric:RubricSnapshot;
  annotations:Annotation[];
}

/** Missing items are zero; an item absent from a pinned rubric is unavailable. */
export function compareSectionLabels(sectionId:string, original:LabelVersion, english:LabelVersion) {
  const features=new Map([...english.rubric.rubric,...original.rubric.rubric].map(f=>[f.key,f]));
  const count=(version:LabelVersion,key:string)=>version.rubric.rubric.some(f=>f.key===key)
    ?version.annotations.filter(a=>a.section_id===sectionId&&a.feature===key).reduce((n,a)=>n+featureItemCount(a),0):null;
  return [...features.values()].map(feature=>({key:feature.key,label:feature.name,original:count(original,feature.key),english:count(english,feature.key)})).filter(row=>(row.original||0)>0||(row.english||0)>0);
}
