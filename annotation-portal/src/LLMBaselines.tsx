import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { C, download, supabase } from './lib';
import type { DocumentRow, LLMBaseline, LLMGenerationRun, RubricSnapshot } from './types';
import modelConfig from './generated/llm-config.json';
import { Editor } from './Editor';
import { AnnotationSummary } from './AnnotationSummary';
import { Toast, useToast } from './Toast';

export function LLMBaselines() {
  const { id } = useParams();
  const [document, setDocument] = useState<DocumentRow | null>(null); const [baselines, setBaselines] = useState<LLMBaseline[]>([]);
  const [runs, setRuns] = useState<LLMGenerationRun[]>([]); const [selected, setSelected] = useState(''); const [rubric, setRubric] = useState<RubricSnapshot | null>(null);
  const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useToast(); const [loading, setLoading] = useState(true);
  const alive = useRef(false); const generating = useRef(false);
  async function refresh() {
    try {
      const [doc, versions, jobs] = await Promise.all([supabase!.from('conversations').select('*').eq('id',id).single(), supabase!.from('llm_baselines').select('*').eq('conversation_id',id).order('created_at',{ascending:false}), supabase!.from('llm_generation_runs').select('id,conversation_id,status,error_code,created_at,finished_at,checkpoint_fingerprint:checkpoint->>fingerprint').eq('conversation_id',id).order('created_at',{ascending:false})]);
      if (doc.error) throw doc.error; if (versions.error) throw versions.error; if (jobs.error) throw jobs.error;
      if (!alive.current) return;
      setDocument(doc.data as DocumentRow); setBaselines(versions.data as LLMBaseline[]); setRuns(jobs.data as LLMGenerationRun[]);
      setSelected(previous => previous && versions.data.some(version => version.id===previous) ? previous : versions.data[0]?.id || '');
    } catch { if (alive.current) setError('Could not load LLM baseline versions. Refresh to try again.'); }
    finally { if (alive.current) setLoading(false); }
  }
  useEffect(() => { alive.current=true; void refresh(); const timer=setInterval(() => void refresh(),5000); return () => { alive.current=false; clearInterval(timer); }; },[id]);
  const baseline = baselines.find(baseline => baseline.id===selected);
  useEffect(() => {
    let active=true; setRubric(null);
    if (baseline && document) void (async () => {
      try {
        const {data,error}=await supabase!.from('rubric_versions').select('snapshot').eq('hash',baseline.rubric_hash).single();
        if(error) throw error;
        const snapshot=data.snapshot as RubricSnapshot;
        C.validateAnnotations(document.transcript,baseline.annotations,snapshot.rubric);
        if(active) setRubric(snapshot);
      } catch { if(active) setError('Could not load or validate the baseline rubric and highlights.'); }
    })();
    return () => { active=false; };
  },[baseline?.id,document?.id]);
  const activeRun = runs.find(run => run.status==='generating' && Date.now()-Date.parse(run.created_at)<600000);
  async function generate(requestId:string=crypto.randomUUID()) {
    if (!id || generating.current || activeRun) return;
    generating.current=true; setBusy(true); setError(''); setNotice('Generating instructional highlights…');
    try {
      const {data,error}=await supabase!.auth.getSession(); if(error || !data.session) throw new Error('Sign in again to generate annotations.');
      const response=await fetch('/api/llm-annotations',{method:'POST',headers:{Authorization:`Bearer ${data.session.access_token}`,'Content-Type':'application/json'},body:JSON.stringify({conversation_id:id,request_id:requestId})});
      const result=await response.json(); if(!response.ok) throw new Error(result.error || 'Generation could not be completed.');
      if (alive.current) { if(result.baseline) setSelected(result.baseline.id); setNotice(result.baseline ? 'Saved a new immutable baseline. Existing assignments are unchanged.' : 'Generation is still running. Versions will refresh automatically.'); }
    } catch(err) { if(alive.current) { setError(err instanceof Error ? err.message : 'Could not confirm generation. Refresh versions before trying again.'); setNotice(''); } }
    finally { generating.current=false; if(alive.current) { setBusy(false); await refresh(); } }
  }
  return <main className="editor-page">
    <div className="page-heading"><div><h1>LLM annotations</h1><p>{document?.transcript.learning_topic || document?.label}</p></div><Link to="/" className="secondary">Dashboard</Link></div>
    <section className="card baseline-controls"><p>Generate instructional highlights and issues with {modelConfig.model}. Each generation is saved as a separate version. Ratings are completed independently by human annotators.</p>
      <div className="actions"><button className="primary" disabled={busy || loading || Boolean(activeRun)} onClick={() => void generate()}>{busy || activeRun ? 'Generating…' : baselines.length ? 'Generate new baseline' : 'Generate LLM annotations'}</button><button className="secondary" onClick={() => {setError('');void refresh();}}>Refresh versions</button></div>
      {baselines.length>0 && <label>Baseline version<select value={selected} onChange={event=>setSelected(event.target.value)}>{baselines.map((version,index)=><option key={version.id} value={version.id}>{new Date(version.created_at).toLocaleString()} · {version.model}{index===0?' · Latest':''}</option>)}</select></label>}
      {baseline && rubric && <button className="secondary" onClick={()=>download(`llm-baseline-${baseline.id}.json`,{baseline,conversation:document!.transcript,rubric})}>Export baseline</button>}
      {runs[0]?.status==='failed' && <p role="status">The latest generation failed ({runs[0].error_code}). Previous baselines and assignments are preserved.</p>}
      {runs[0]?.status==='failed'&&runs[0].checkpoint_fingerprint&&<button className="secondary" disabled={busy||Boolean(activeRun)} onClick={()=>void generate(runs[0].id)}>Resume saved generation</button>}
    </section>
    {error && <p className="error" role="alert">{error}</p>}<Toast notice={notice} onDismiss={() => setNotice('')} duration={busy ? 0 : 6000} />
    {baseline?.generation_config.origin==='admin_baseline_revision'&&<p className="notice">This version includes manual revisions to an LLM baseline. The original baseline is preserved.</p>}
    {!loading && !baseline && !busy && <p>No saved baseline yet. Generate one, then select it when assigning annotators from the conversation menu.</p>}
    {baseline && rubric && document && <><AnnotationSummary annotations={baseline.annotations} rubric={rubric}/><Editor key={baseline.id} conversation={document.transcript} rubric={{...rubric,rating_dimensions:[]}} annotations={baseline.annotations} onChange={()=>{}} readonly/></>}
  </main>;
}
