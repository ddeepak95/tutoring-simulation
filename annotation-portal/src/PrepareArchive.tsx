import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './lib';
import { extractCaptureBlocks, prepareCaptureTurns, splitCaptureBlock, type CaptureBlock } from './capture-document';
import { CapturedTranscript } from './CapturedTranscript';

export function PrepareArchive({ archiveId, onClose, onPrepared }: { archiveId: string; onClose: () => void; onPrepared: () => Promise<void> }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [blocks, setBlocks] = useState<CaptureBlock[]>([]); const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(true); const [error, setError] = useState(''); const [result, setResult] = useState('');
  useEffect(() => {
    dialog.current?.showModal(); let active = true;
    void (async () => {
      try {
        const { data, error } = await supabase!.from('chatgpt_html_archives').select('title,html,media_html').eq('id', archiveId).single();
        if (error) throw error;
        if (active) { setTitle(data.title); setBlocks(extractCaptureBlocks(data.media_html || data.html)); }
      } catch (failure) { if (active) setError((failure as { message?: string }).message || 'Could not prepare this capture.'); }
      finally { if (active) setBusy(false); }
    })();
    return () => { active = false; };
  }, [archiveId]);
  const tutors = blocks.filter(block => block.included && block.kind === 'turn' && block.speaker === 'tutor');
  const update = (id: string, value: Partial<CaptureBlock>) => setBlocks(blocks.map(block => block.id === id ? { ...block, ...value } : block));
  function move(index: number, direction: number) { const next = [...blocks]; [next[index], next[index + direction]] = [next[index + direction], next[index]]; setBlocks(next); }
  function split(index: number) { try { const parts = splitCaptureBlock(blocks[index]); setBlocks([...blocks.slice(0, index), ...parts, ...blocks.slice(index + 1)]); setError(''); } catch (failure) { setError((failure as Error).message); } }
  async function prepare() {
    if (busy) return; setError('');
    try {
      const turns = prepareCaptureTurns(blocks);
      if (new TextEncoder().encode(JSON.stringify(turns)).length > 8 * 1024 * 1024) throw new Error('This preparation exceeds the 8 MB limit. Exclude unneeded additional views.');
      setBusy(true);
      const { data, error } = await supabase!.rpc('prepare_chatgpt_html_archive', { p_archive_id: archiveId, p_turns: turns });
      if (error) throw error;
      setResult(data.conversation_id); await onPrepared();
    } catch (failure) { setError((failure as { message?: string }).message || 'Could not create this conversation.'); }
    finally { setBusy(false); }
  }
  return <dialog ref={dialog} className="prepare-archive-dialog" aria-label="Prepare archive for annotation" onCancel={event => { if (busy) event.preventDefault(); else onClose(); }}>
    <div className="actions"><h2>Prepare for annotation: {title}</h2><button className="secondary" disabled={busy} onClick={onClose}>Close preparation</button></div>
    <p>Review the order and speakers. Exclude interface content. Attach each additional interactive view to its tutor response; it will share that response’s annotations and rating.</p>
    <p>If a block combines multiple speakers, split it into sections first. You can classify continuation sections as additional content and attach them to the same tutor response.</p>
    {error && <p className="error" role="alert">{error}</p>}
    {result ? <div className="notice" role="status"><p>Conversation ready for assignment. Select it in the Conversations list and choose annotators. The original archive is retained.</p><Link className="primary link-button" to={`/conversations/${result}`} onClick={onClose}>Open prepared conversation</Link></div> : <>
      {busy && !blocks.length && <p role="status">Reading captured turns…</p>}
      {!busy && !blocks.length && <p>No readable content found. Capture the conversation again using the selectable view.</p>}
      <div className="prepare-blocks">{blocks.map((block, index) => <section className="card prepare-block" key={block.id}>
        <div className="actions"><label><input type="checkbox" checked={block.included} disabled={busy} onChange={event => update(block.id, { included: event.target.checked })} /> Include block {index + 1}</label><button className="secondary" disabled={busy || index === 0} onClick={() => move(index, -1)} aria-label={`Move block ${index + 1} up`}>↑</button><button className="secondary" disabled={busy || index === blocks.length - 1} onClick={() => move(index, 1)} aria-label={`Move block ${index + 1} down`}>↓</button><button className="secondary" disabled={busy || !block.included} onClick={() => split(index)} aria-label={`Split block ${index + 1} into sections`}>Split into sections</button></div>
        <label>Content type<select value={block.kind} disabled={busy || !block.included} onChange={event => update(block.id, { kind: event.target.value as CaptureBlock['kind'] })}><option value="turn">Conversation turn</option><option value="state">Additional interactive view</option></select></label>
        {block.kind === 'turn' ? <label>Speaker for block {index + 1}<select value={block.speaker} disabled={busy || !block.included} onChange={event => update(block.id, { speaker: event.target.value as CaptureBlock['speaker'] })}><option value="unknown">Choose speaker</option><option value="student">Student</option><option value="tutor">Tutor</option></select></label> : <label>Attach block {index + 1} to tutor response<select value={block.attach_to} disabled={busy || !block.included} onChange={event => update(block.id, { attach_to: event.target.value })}><option value="">Choose tutor response</option>{tutors.map((turn, number) => <option key={turn.id} value={turn.id}>Tutor response {number + 1}: {turn.text.trim().slice(0, 100)}</option>)}</select></label>}
        <div className="prepare-content"><CapturedTranscript html={block.html} text={block.text} turnId={block.id} annotations={[]} rubric={[]} readonly onHighlight={() => {}} /></div>
      </section>)}</div>
      <button className="primary" disabled={busy || !blocks.length} onClick={() => void prepare()}>{busy && blocks.length ? 'Preparing…' : 'Create assignable conversation'}</button>
    </>}
  </dialog>;
}
