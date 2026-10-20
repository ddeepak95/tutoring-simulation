import { buildSelectableDocument, translationTemplate, validateTranslation, renderSelectableDocument } from './selectable.js';
import { createArchiveZip } from './original.js';
import { readOriginalArchive, writeOriginalArchive } from './archive-store.js';
const $ = id => document.getElementById(id);
let model; let capture; let translation; let editorCount = 0; let timer; let recordKey;
function remember() {
  if (!recordKey || !model) return;
  void writeOriginalArchive(recordKey, { document_id: model.document_id, translation, mode: $('viewer-mode').value, selectable: $('save-selectable').checked }).catch(() => status('Could not retain the translation draft. Export its JSON before closing this tab.'));
}
function download(name, content, type = 'application/json') {
  const blob = content instanceof Blob ? content : new Blob([typeof content === 'string' ? content : JSON.stringify(content, null, 2)], { type });
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 60000);
}
function status(text) { $('selectable-status').textContent = text; }
function refresh() {
  if (!model) return;
  const translated = $('viewer-mode').value === 'translated';
  $('selectable-frame').srcdoc = renderSelectableDocument(model, translated && translation?.language ? translation : null);
  const count = translation?.units.filter(unit => unit.text.trim()).length || 0;
  status(`${model.messages.filter(message => message.role === 'user').length} user messages · ${model.messages.filter(message => message.role === 'assistant').length} assistant messages · ${model.messages.length} conversation sections · ${model.units.length} selectable text segments · ${model.media.images} images/diagrams · ${model.media.screenshots} screenshots · ${count} translated segments`);
  remember();
}
export async function setSelectableCapture(value, jobId) {
  capture = value; model = null; translation = null; editorCount = 0;
  recordKey = 'selectable:' + jobId;
  $('selectable-card').hidden = !value?.html;
  $('translation-fields').replaceChildren(); $('translation-language').value = ''; $('translation-editor').open = false;
  $('viewer-mode').value = 'source'; $('save-selectable').checked = true;
  if (!value?.html) return;
  try {
    model = buildSelectableDocument(value);
    const stored = await readOriginalArchive(recordKey);
    if (stored?.document_id === model.document_id) {
      if (stored.translation) {
        const language = stored.translation.language;
        translation = { ...validateTranslation(model, { ...stored.translation, language: language || 'Translation' }), language };
        $('translation-language').value = language;
      }
      $('viewer-mode').value = stored.mode || 'source'; $('save-selectable').checked = stored.selectable !== false;
    }
    $('selectable-warnings').replaceChildren(...model.warnings.map(text => { const li = document.createElement('li'); li.textContent = text; return li; })); refresh();
  } catch (error) { $('save-selectable').checked = false; status(error.message); $('selectable-frame').srcdoc = ''; }
}
export function selectableCaptureForSave() {
  if (!model || !$('save-selectable').checked) return null;
  const translated = $('viewer-mode').value === 'translated';
  if (translated && (!translation?.language || !translation.units.some(unit => unit.text.trim()))) throw new Error('Provide a translation and its language, or choose Original language before saving.');
  const html = renderSelectableDocument(model, translated ? translation : null);
  const text = new DOMParser().parseFromString(html, 'text/html').querySelector('main').textContent;
  return { ...capture, html, text, ...(translated ? { language: translation.language } : {}), report: { ...capture.report, selectable: { format_version: model.format_version, document_id: model.document_id, text_segments: model.units.length, translated_segments: translated ? translation.units.filter(unit => unit.text.trim()).length : 0, language: translated ? translation.language : null, media: model.media } } };
}
export function initializeSelectableUI() {
  $('save-selectable').addEventListener('change', remember);
  $('viewer-mode').addEventListener('change', refresh);
  $('translation-language').addEventListener('input', () => {
    if (!model) return;
    translation ||= translationTemplate(model); translation.language = $('translation-language').value.trim();
    clearTimeout(timer); timer = setTimeout(refresh, 200);
  });
  function moreFields() {
    if (!model) return;
    for (const unit of model.units.slice(editorCount, editorCount + 100)) {
      const label = document.createElement('label'); const original = document.createElement('span'); original.className = 'translation-source'; original.textContent = unit.source;
      const input = document.createElement('textarea'); input.rows = 2; input.setAttribute('aria-label', 'Translation for ' + unit.id); input.dataset.unit = unit.id;
      input.value = translation?.units.find(item => item.id === unit.id)?.text || '';
      input.addEventListener('input', () => {
        translation ||= translationTemplate(model); translation.language = $('translation-language').value.trim();
        let item = translation.units.find(item => item.id === unit.id);
        if (!item) { item = { ...unit, text: '' }; translation.units.push(item); }
        item.text = input.value;
        $('viewer-mode').value = 'translated'; clearTimeout(timer); timer = setTimeout(refresh, 250);
      });
      label.append(original, input); $('translation-fields').append(label);
    }
    editorCount = Math.min(editorCount + 100, model.units.length); $('more-translation-fields').hidden = editorCount >= model.units.length;
  }
  $('translation-editor').addEventListener('toggle', () => { if ($('translation-editor').open && !editorCount) moreFields(); });
  $('more-translation-fields').addEventListener('click', moreFields);
  $('translation-import').addEventListener('change', async event => {
    const file = event.target.files?.[0]; if (!file || !model) return;
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('Translation JSON exceeds 2 MB.');
      translation = validateTranslation(model, JSON.parse(await file.text()));
      $('translation-language').value = translation.language; $('viewer-mode').value = 'translated';
      editorCount = 0; $('translation-fields').replaceChildren(); if ($('translation-editor').open) moreFields(); refresh();
    } catch (error) { status(error.message); }
    finally { event.target.value = ''; }
  });
  $('download-translation').addEventListener('click', () => { if (model) download('translation-' + model.document_id + '.json', translation || translationTemplate(model)); });
  $('download-viewer').addEventListener('click', () => {
    if (!model) return;
    const translated = $('viewer-mode').value === 'translated' && translation?.language;
    download('conversation-' + model.document_id + '.html', renderSelectableDocument(model, translated ? translation : null), 'text/html');
  });
  $('download-viewer-project').addEventListener('click', () => {
    if (!model) return;
    const entries = [
      { path: 'conversation.html', content: renderSelectableDocument(model) },
      { path: 'conversation.json', content: JSON.stringify(model, null, 2) },
      { path: 'translation.json', content: JSON.stringify(translation || translationTemplate(model), null, 2) },
      { path: 'README.txt', content: 'SELECTABLE CONVERSATION\n\nOpen conversation.html locally. Transcript text remains selectable; visuals use embedded images/SVG or screenshot fallbacks. Linked images may expire. Code and formulas are not translation segments.\n\nTranslate the text fields in translation.json while preserving each id, source value and document_id; set language. Context fields group nearby inline segments. Import this JSON into the extension review tab to apply it to the same HTML layout. You can also edit segments directly in the review tab. No automatic AI translation is performed. Translations expand naturally; text inside image pixels is not translated.\n\nSource content is extracted from the captured DOM, not generated from screenshots or a model. Check order, boundaries and missing visuals against ChatGPT before saving.\n' },
    ];
    if (translation?.language) entries.push({ path: 'translated.html', content: renderSelectableDocument(model, translation) });
    download('selectable-' + model.document_id + '.zip', createArchiveZip(entries));
  });
}
