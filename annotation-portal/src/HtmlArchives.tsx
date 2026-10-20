import { useEffect, useRef, useState } from 'react';
import { download, fetchAllRows, supabase } from './lib';
import { PrepareArchive } from './PrepareArchive';

type Archive = { id: string; title: string; topic: string; language: string; captured_at: string; source_url: string };

export function HtmlArchives({ onPrepared = async () => {} }: { onPrepared?: () => Promise<void> }) {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ title: string; html: string } | null>(null);
  const [deleting, setDeleting] = useState<Archive | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const [notice, setNotice] = useState('');
  const deletionPending = useRef(false);
  const deleteDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (deleting) deleteDialog.current?.showModal(); else deleteDialog.current?.close(); }, [deleting]);
  const [preparing, setPreparing] = useState<string | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (preview) previewDialog.current?.showModal(); else previewDialog.current?.close(); }, [preview]);
  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        // Fetch receipt fields only; HTML can be several MB per record.
        const rows = await fetchAllRows<Archive>('chatgpt_html_archives', 'id,title,topic,language,captured_at,source_url');
        if (active) { setArchives(rows.sort((a, b) => b.captured_at.localeCompare(a.captured_at))); setError(''); }
      } catch (failure) { if (active) setError((failure as { message?: string }).message || 'Could not load HTML archives.'); }
    }
    void refresh(); const timer = setInterval(() => void refresh(), 30000);
    return () => { active = false; clearInterval(timer); };
  }, []);
  async function exportArchive(id: string) {
    setBusy(id); setError('');
    try {
      const { data, error } = await supabase!.from('chatgpt_html_archives').select('*').eq('id', id).single();
      if (error) throw error;
      // JSON preserves source HTML without executing it in the portal or browser.
      download(`chatgpt-html-${id}.json`, { format_version: 'chatgpt-html-archive-export/1', archive: data });
    } catch (failure) { setError((failure as { message?: string }).message || 'Could not download this archive.'); }
    finally { setBusy(null); }
  }
  async function openArchive(id: string) {
    setBusy(id); setError('');
    try {
      const { data, error } = await supabase!.from('chatgpt_html_archives').select('title,html,media_html').eq('id', id).single();
      if (error) throw error; setPreview({title:data.title,html:data.media_html||data.html});
    } catch (failure) { setError((failure as { message?: string }).message || 'Could not open this archive.'); }
    finally { setBusy(null); }
  }
  async function deleteArchive() {
    if (!deleting || deletionPending.current) return;
    deletionPending.current = true; setBusy(deleting.id); setDeleteError(''); setNotice('');
    try {
      const { data, error } = await supabase!.rpc('delete_chatgpt_html_archive', { p_archive_id: deleting.id });
      if (error) throw error;
      if (data?.archive_id !== deleting.id || typeof data.deleted !== 'boolean') throw new Error('Could not confirm deletion. Try again to check the archive.');
      setArchives(rows => rows.filter(row => row.id !== deleting.id));
      setNotice(data.deleted ? 'HTML archive deleted. Prepared conversations and annotation work were retained.' : 'This HTML archive has already been deleted.');
      setDeleting(null);
    } catch (failure) { setDeleteError((failure as { message?: string }).message || 'Could not delete this HTML archive.'); }
    finally { deletionPending.current = false; setBusy(null); }
  }
  return <section id="html-archives" className="card" aria-label="HTML archives">
    <h2>HTML archives</h2>
    <p>Review saved captures and prepare conversation turns for annotation, rating, or comparison. Captured layouts and images remain linked to the prepared conversation.</p>
    {notice && <p role="status">{notice}</p>}
    {error && <p className="error" role="alert">{error}</p>}
    {archives.length ? <div className="table-wrap"><table className="conversation-table"><thead><tr><th>Title / topic</th><th>Language</th><th>Captured</th><th>Actions</th></tr></thead><tbody>{archives.map(archive => <tr key={archive.id}>
      <td><strong>{archive.title}</strong><p>{archive.topic}</p></td><td>{archive.language}</td><td>{new Date(archive.captured_at).toLocaleString()}</td>
      <td><a href={archive.source_url} target="_blank" rel="noopener noreferrer">Source</a>{' '}<button className="primary" disabled={Boolean(busy)} onClick={() => setPreparing(archive.id)}>Prepare for annotation</button>{' '}<button className="secondary" disabled={Boolean(busy)} onClick={() => void openArchive(archive.id)}>Open viewer</button>{' '}<button className="secondary" disabled={Boolean(busy)} onClick={() => void exportArchive(archive.id)}>{busy === archive.id ? 'Loading…' : 'Download archive'}</button>{' '}<button className="delete-confirm" disabled={Boolean(busy)} onClick={() => { setDeleteError(''); setDeleting(archive); }}>Delete archive</button></td>
    </tr>)}</tbody></table></div> : <p>No HTML archives saved yet.</p>}
    <dialog ref={deleteDialog} className="delete-dialog" aria-labelledby="delete-archive-title" onCancel={event => { if (deletionPending.current) event.preventDefault(); else setDeleting(null); }}>
      <h2 id="delete-archive-title">Delete HTML archive?</h2>
      <p><strong>{deleting?.title}</strong></p>
      <p>This permanently deletes the saved HTML archive from the database. Prepared conversations, their images, assignments, annotations, and ratings will be kept.</p>
      {deleteError && <p className="error" role="alert">{deleteError}</p>}
      <div className="actions"><button className="secondary" disabled={Boolean(busy)} onClick={() => setDeleting(null)} autoFocus>Cancel</button><button className="delete-confirm" disabled={Boolean(busy)} onClick={() => void deleteArchive()}>{busy ? 'Deleting...' : 'Delete permanently'}</button></div>
    </dialog>
    {preparing && <PrepareArchive key={preparing} archiveId={preparing} onClose={() => setPreparing(null)} onPrepared={onPrepared} />}
    <dialog ref={previewDialog} aria-label="Saved conversation viewer" onCancel={() => setPreview(null)} style={{ width: 'min(1200px,95vw)', maxWidth: '95vw' }}><div className="actions"><h2>{preview?.title}</h2><button className="secondary" onClick={() => setPreview(null)}>Close viewer</button></div>{preview && <iframe title="Saved conversation" sandbox="" referrerPolicy="no-referrer" srcDoc={preview.html} style={{ width: '100%', height: '75vh', border: '1px solid #d6dfd7' }} />}</dialog>
  </section>;
}
