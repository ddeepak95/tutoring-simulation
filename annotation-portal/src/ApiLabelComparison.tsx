import { useEffect, useId, useState } from 'react';
import { C, supabase } from './lib';
import { hydrateRows } from './section-registry';
import { ApiEnglishComparison, useApiEnglish } from './ApiTranslation';
import { compareSectionLabels, type LabelVersion } from './api-label-comparison';
import type { Annotation, Conversation, RubricSnapshot } from './types';

export function ApiLabelComparison({ conversation, conversationId, initialSourceKey }: { conversation:Conversation;conversationId:string;initialSourceKey?:string }) {
  const comparison=useApiEnglish(conversation,conversationId,true);
  const controlId=useId();
  const [versions,setVersions]=useState<{original:LabelVersion[];english:LabelVersion[]}>({original:[],english:[]});
  const [selected,setSelected]=useState({original:'',english:''});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const pair=comparison.pair;
  useEffect(()=>{
    if(!pair)return;
    let alive=true;setLoading(true);setError('');
    void(async()=>{
      const ids=[pair.original.conversation_id!,pair.english.conversation_id!];
      const [baselines,assignments]=await Promise.all([
        supabase!.from('llm_baselines').select('*').in('conversation_id',ids).order('created_at',{ascending:false}),
        supabase!.from('assignments').select('*, profiles!assignments_annotator_id_fkey(id, username, role)').in('conversation_id',ids).eq('task_type','label').eq('is_active',true).order('updated_at',{ascending:false}),
      ]);
      if(baselines.error)throw baselines.error;if(assignments.error)throw assignments.error;
      const raw=[...baselines.data.map(b=>({...b,key:`baseline:${b.id}`,label:`LLM · Prompt ${b.prompt_version || 'not recorded'} · ${b.model} · ${new Date(b.created_at).toLocaleString()}`})),...assignments.data.map(a=>({...a,key:`assignment:${a.id}`,label:`${a.profiles?.username||'Annotator'} · ${a.status.replaceAll('_',' ')} · ${new Date(a.updated_at).toLocaleString()}`}))];
      const hashes=[...new Set(raw.map(row=>row.rubric_hash))];
      const [rows,rubrics]=await Promise.all([
        hydrateRows(supabase!,raw),
        hashes.length?supabase!.from('rubric_versions').select('hash,snapshot').in('hash',hashes):Promise.resolve({data:[],error:null}),
      ]);
      if(rubrics.error)throw rubrics.error;
      const snapshots=new Map(rubrics.data.map(row=>[row.hash,row.snapshot as RubricSnapshot]));
      const version=(row:typeof rows[number]):LabelVersion=>{
        const rubric=snapshots.get(row.rubric_hash);
        if(!rubric)throw Error('A label source has no saved rubric.');
        C.validateAnnotations(row.conversation_id===ids[0]?pair.original:pair.english,row.annotations,rubric.rubric,{allowIncomplete:true});
        return {key:row.key,label:row.label,rubric,annotations:row.annotations as Annotation[]};
      };
      const next={original:rows.filter(row=>row.conversation_id===ids[0]).map(version),english:rows.filter(row=>row.conversation_id===ids[1]).map(version)};
      const choose=(values:LabelVersion[],isCurrent:boolean)=>values.find(v=>isCurrent&&v.key===initialSourceKey)?.key||values[0]?.key||'';
      if(alive){setVersions(next);setSelected({original:choose(next.original,conversationId===ids[0]),english:choose(next.english,conversationId===ids[1])});}
    })().catch(err=>{if(alive)setError(err.message||'Could not load label sources.');}).finally(()=>{if(alive)setLoading(false);});
    return()=>{alive=false;};
  },[pair,conversationId,initialSourceKey]);
  if(comparison.error||error)return <p className="notice" role="status">{comparison.error||error}</p>;
  if(comparison.loading||loading)return <p role="status">Loading translated labels…</p>;
  if(!pair)return null;
  let language='Original';
  try{language=new Intl.DisplayNames(['en'],{type:'language'}).of(comparison.sourceLanguage)||language;}catch{/* Use the generic language name. */}
  const original=versions.original.find(v=>v.key===selected.original),english=versions.english.find(v=>v.key===selected.english);
  const supported=(version:LabelVersion|undefined)=>version?.rubric.label_schema_version==='section-items/1'&&version.annotations.every(a=>a.section_id);
  const ready=original&&english&&supported(original)&&supported(english);
  const definitionsDiffer=original&&english&&JSON.stringify(original.rubric.rubric)!==JSON.stringify(english.rubric.rubric);
  const counts=(sectionId:string)=>{
    if(!ready)return null;
    const rows=compareSectionLabels(sectionId,original,english);
    return rows.length?<div className="api-section-counts"><table aria-label={`Label counts for ${sectionId}`}><thead><tr><th scope="col">Item</th><th scope="col">{language}</th><th scope="col">English</th></tr></thead><tbody>{rows.map(row=><tr key={row.key} data-different={row.original!==row.english}><th scope="row">{row.label}</th><td>{row.original??'—'}</td><td>{row.english??'—'}</td></tr>)}</tbody></table></div>:<p className="api-empty-labels">No labels in either version for this section.</p>;
  };
  return <section className="api-label-comparison" aria-label="Labels across languages">
    <div className="api-label-sources">{(['original','english'] as const).map(side=><label key={side} htmlFor={`${controlId}-${side}`}>{side==='original'?language:'English'} label source<select id={`${controlId}-${side}`} value={selected[side]} onChange={event=>setSelected(previous=>({...previous,[side]:event.target.value}))}>{!versions[side].length&&<option value="">No saved labels</option>}{versions[side].map(v=><option key={v.key} value={v.key}>{v.label}</option>)}</select></label>)}</div>
    {!original||!english?<p className="notice" role="status">Saved labels are needed in both languages to compare counts.</p>:!ready?<p className="notice" role="status">Select section-based label sources in both languages.</p>:null}
    {definitionsDiffer&&<p className="notice" role="status">These sources use different rubric definitions. An em dash means the item is absent from that source’s rubric.</p>}
    {ready&&<p className="api-label-hint">Counts are paired by saved section ID. Highlighted rows have different counts; items absent in both versions are omitted.</p>}
    <ApiEnglishComparison comparison={comparison} sectionFooter={counts}/>
  </section>;
}
