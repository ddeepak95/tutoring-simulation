#!/usr/bin/env node
/** Export saved Examples and Real-World Connections highlights from Tamil conversations. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const FEATURE_NAMES = {
  examples: 'Examples',
  real_world_connections: 'Real-World Connections / Applications',
};

function readJsonl(file) {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map((line, index) => {
    try { return JSON.parse(line); }
    catch (error) { throw new Error(`${file}:${index + 1}: ${error.message}`); }
  });
}

function options(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (!['--archive', '--output', '--glm'].includes(key) || !args[i + 1]) throw new Error(`Expected --archive, --output, or --glm PATH, got ${key}`);
    result[key.slice(2)] = args[++i];
  }
  const archiveRoot = path.resolve(result.archive || 'research-archive/oct-29');
  return {archiveRoot, output: path.resolve(result.output || path.join(archiveRoot, 'reports', 'tamil-examples.html')),
    glmFile: path.resolve(result.glm || '.runtime/glm-pilot/pedagogical-conversational/results.json')};
}

function sectionHighlight(section, highlight) {
  if (!section || typeof section.quote !== 'string' || typeof highlight?.quote !== 'string' ||
      !highlight.quote || !Number.isInteger(highlight.occurrence) || highlight.occurrence < 1) {
    throw new Error('Invalid section or highlight');
  }
  let start = -1;
  let from = 0;
  for (let i = 0; i < highlight.occurrence; i++) {
    start = section.quote.indexOf(highlight.quote, from);
    if (start < 0) throw new Error(`Highlight not found in section ${section.conversation_id}/${section.section_id}`);
    from = start + 1;
  }
  return {start, end: start + highlight.quote.length};
}

export function extractFeatures({index, baselines, sections, topicNames = new Map()}) {
  const tamil = index.filter(item => item.language === 'ta');
  const tamilById = new Map(tamil.map(item => [item.id, item]));
  const sectionById = new Map(sections.map(section => [`${section.conversation_id}|${section.section_id}`, section]));
  const current = new Map();
  for (const baseline of baselines) {
    if (!tamilById.has(baseline.conversation_id) || baseline.prompt_version !== 'instructional-section-items/19') continue;
    const previous = current.get(baseline.conversation_id);
    if (!previous || Date.parse(baseline.created_at) > Date.parse(previous.created_at)) current.set(baseline.conversation_id, baseline);
  }
  const records = [];
  for (const conversation of tamil) {
    const baseline = current.get(conversation.id);
    if (!baseline) throw new Error(`Missing v19 evaluation for ${conversation.id}`);
    for (const annotation of baseline.annotations || []) {
      if (!Object.hasOwn(FEATURE_NAMES, annotation.feature)) continue;
      const section = sectionById.get(`${conversation.id}|${annotation.section_id}`);
      if (!section) throw new Error(`Missing section ${conversation.id}/${annotation.section_id}`);
      if (annotation.entry?.count !== annotation.highlights?.length) throw new Error(`Count and highlights differ for ${annotation.id}`);
      for (const highlight of annotation.highlights) {
        const span = sectionHighlight(section, highlight);
        records.push({
          feature: annotation.feature,
          featureName: FEATURE_NAMES[annotation.feature],
          conversationId: conversation.id,
          topicId: conversation.topic_id,
          topic: topicNames.get(conversation.topic_id) || conversation.topic_id,
          model: conversation.model,
          turn: section.turn_number,
          section: section.section_number,
          sectionId: section.section_id,
          source: section.quote,
          quote: highlight.quote,
          start: span.start,
          end: span.end,
        });
      }
    }
  }
  records.sort((a, b) => a.topic.localeCompare(b.topic) || a.model.localeCompare(b.model) ||
    a.conversationId.localeCompare(b.conversationId) || a.turn - b.turn || a.section - b.section || a.start - b.start || a.feature.localeCompare(b.feature));
  return {records, tamilConversations: tamil.length, evaluatedConversations: current.size,
    conversationsWithFeatures: new Set(records.map(item => item.conversationId)).size};
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
}

function fixed(value, digits = 2) {
  return value == null ? '—' : Number(value).toFixed(digits);
}

function pValue(value) {
  return value == null ? '—' : value < 0.0001 ? Number(value).toExponential(2) : Number(value).toFixed(4);
}

function ratioCell(effect) {
  return effect ? `${fixed(effect.ratio, 3)} <span class="ci">(${fixed(effect.ci_low, 3)}–${fixed(effect.ci_high, 3)})</span>` : '—';
}

function reportHtml(glm, adjustments) {
  const results = glm.results;
  const byFeature = new Map(glm.contrasts.map(item => [item.feature, []]));
  for (const contrast of glm.contrasts) byFeature.get(contrast.feature).push(contrast);
  const byAdjustedFeature = Object.fromEntries(Object.entries(adjustments).map(([unit, report]) => [unit, new Map(report.results.map(item => [item.feature, item]))]));
  const byAdjustedContrast = Object.fromEntries(Object.entries(adjustments).map(([unit, report]) => [unit, new Map(report.contrasts.map(item => [`${item.feature}|${item.model}`, item]))]));
  const effectWithP = effect => effect ? `${ratioCell(effect)} <span class="p-inline">p=${pValue(effect.p_unadjusted)}</span>` : '—';
  const summaryRows = results.map(result => {
    const pooled = result.pooled_equal_model_log_ratio;
    const interaction = result.language_by_model_interaction;
    return `<tr><th scope="row"><a href="#feature-${escapeHtml(result.feature)}">${escapeHtml(result.name)}</a></th><td>${fixed(result.english_mean)}</td><td>${fixed(result.tamil_mean)}</td><td>${ratioCell(pooled)}</td><td class="${pooled?.p_unadjusted < .05 ? 'sig' : ''}">${pValue(pooled?.p_unadjusted)}</td><td>${pValue(interaction?.p_unadjusted)}</td><td>${escapeHtml(result.status)}</td></tr>`;
  }).join('');
  const detailBlocks = results.map(result => {
    const contrasts = byFeature.get(result.feature) || [];
    const rows = contrasts.map(item => `<tr><th scope="row">${escapeHtml(item.model)}</th><td>${fixed(item.english_mean)}</td><td>${fixed(item.tamil_mean)}</td><td class="${item.p_unadjusted < .05 ? 'sig' : ''}">${effectWithP(item)}</td><td>${effectWithP(byAdjustedContrast.graphemes.get(`${item.feature}|${item.model}`))}</td><td>${effectWithP(byAdjustedContrast.words.get(`${item.feature}|${item.model}`))}</td></tr>`).join('');
    const excluded = result.excluded_models?.length ? `<p><strong>Excluded model cells:</strong> ${escapeHtml(result.excluded_models.join(', '))}</p>` : '';
    const unavailable = result.unavailable_model_contrasts?.length ? `<p><strong>Unavailable contrasts:</strong> ${escapeHtml(result.unavailable_model_contrasts.join(', '))}</p>` : '';
    const sparse = result.excluded_topics?.length ? `<p><strong>Topics with zero counts, excluded for this feature:</strong> ${escapeHtml(result.excluded_topics.join(', '))}</p>` : '';
    const diagnostics = result.status === 'fitted' || result.status === 'partly fitted'
      ? `<p>${result.observations_fitted} conversations across ${result.topics_fitted} topics fitted. Pearson dispersion: ${fixed(result.pearson_dispersion)}; observed zero fraction: ${fixed(result.observed_zero_fraction, 3)}.</p>`
      : `<p>${escapeHtml(result.reason || 'No occurrences in either language.')}</p>`;
    return `<details class="report-feature" id="feature-${escapeHtml(result.feature)}"><summary>${escapeHtml(result.name)} <span class="detail-summary">EN ${fixed(result.english_mean)} · TA ${fixed(result.tamil_mean)} · ${escapeHtml(result.status)}</span></summary>${diagnostics}${excluded}${unavailable}${sparse}${rows ? `<div class="table-scroll"><table><thead><tr><th>Model</th><th>EN mean</th><th>TA mean</th><th>Raw count ratio</th><th>Per grapheme ratio</th><th>Per word ratio</th></tr></thead><tbody>${rows}</tbody></table></div>` : ''}</details>`;
  }).join('');
  const significantPooled = results.filter(item => item.pooled_equal_model_log_ratio?.p_unadjusted < .05).length;
  const sensitivityRows = results.map(result => {
    const raw = result.pooled_equal_model_log_ratio;
    const graphemes = byAdjustedFeature.graphemes.get(result.feature)?.pooled_equal_model_log_ratio;
    const words = byAdjustedFeature.words.get(result.feature)?.pooled_equal_model_log_ratio;
    return `<tr><th scope="row"><a href="#feature-${escapeHtml(result.feature)}">${escapeHtml(result.name)}</a></th><td class="${raw?.p_unadjusted < .05 ? 'sig' : ''}">${effectWithP(raw)}</td><td class="${graphemes?.p_unadjusted < .05 ? 'sig' : ''}">${effectWithP(graphemes)}</td><td class="${words?.p_unadjusted < .05 ? 'sig' : ''}">${effectWithP(words)}</td></tr>`;
  }).join('');
  return `<div class="report-intro"><h2>English–Tamil pedagogical and conversational feature GLM</h2><p>${glm.provenance.conversations.toLocaleString()} original conversations · ${glm.provenance.topics.length} topics · ${glm.provenance.models.length} models · five tries per topic/model/language cell. This report covers the ${results.length} features in <strong>Explanatory &amp; Pedagogical Devices</strong> and <strong>Conversational &amp; Tutoring Moves</strong>. Evaluations used ${escapeHtml(glm.provenance.evaluator)} with section prompt v19.</p><div class="summary"><div class="stat"><strong>${significantPooled}</strong><span>features with raw-count pooled p &lt; 0.05</span></div><div class="stat"><strong>${results.length}</strong><span>features examined</span></div></div><p><strong>Model:</strong> Poisson GLM with log link, language × model interaction, and topic fixed effects. Standard errors are clustered by topic. Raw results compare absolute occurrences per conversation. The two sensitivity fits use log tutor-output graphemes or words as offsets. A ratio above 1 means a higher count in English.</p><p><strong>Interpretation:</strong> The pooled ratio averages model-specific log ratios equally across models with counts in both languages. P-values and 95% confidence intervals are exploratory, asymptotic, and unadjusted for multiple comparisons. Graphemes and words are imperfect cross-language measures of output length; adjusted ratios describe feature density under those choices. Language drift could also affect counts.</p></div><h3>Pedagogical and conversational features: raw counts</h3><div class="table-scroll"><table><thead><tr><th>Feature</th><th>EN mean</th><th>TA mean</th><th>English/Tamil ratio (95% CI)</th><th>p</th><th>Interaction p</th><th>Status</th></tr></thead><tbody>${summaryRows}</tbody></table></div><p class="table-note">“Interaction p” tests whether the language ratio differs across models.</p><h3>Response-length sensitivity</h3><p class="table-note">Raw count ratios and ratios per tutor-output grapheme or word. Both length-adjusted analyses use the same 3,150 conversations and 13 features. A change in direction or statistical evidence means the result depends on the chosen outcome scale.</p><div class="table-scroll"><table><thead><tr><th>Feature</th><th>Raw count ratio (95% CI), p</th><th>Per grapheme ratio (95% CI), p</th><th>Per word ratio (95% CI), p</th></tr></thead><tbody>${sensitivityRows}</tbody></table></div><h3>Within-model comparisons and diagnostics</h3><p class="table-note">Expand a feature to compare each model under all three outcome scales.</p>${detailBlocks}`;
}

export function renderHtml(dataset, glm, adjustments) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tamil conversations · Annotations and GLM report</title>
<style>
:root { color-scheme: light; font-family: Inter, "Nirmala UI", "Latha", system-ui, sans-serif; background: #f6f8fa; color: #17212b; }
* { box-sizing: border-box; }
body { margin: 0; }
header { background: #172c40; color: white; padding: 28px max(24px, calc((100vw - 1200px)/2)); }
header h1 { margin: 0 0 9px; font-size: clamp(1.6rem, 3vw, 2.35rem); }
header p { margin: 0; max-width: 850px; line-height: 1.5; color: #d5e0e8; }
main { max-width: 1248px; padding: 24px; margin: auto; }
.view-tabs { display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid #b9c9d4; }
.view-tabs button { padding: 10px 18px; border: 1px solid transparent; border-radius: 8px 8px 0 0; background: transparent; color: #35526b; font-weight: 700; cursor: pointer; }
.view-tabs button[aria-selected="true"] { background: white; border-color: #b9c9d4; border-bottom-color: white; color: #163f61; }
[hidden] { display: none !important; }
.summary { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
.stat { background: white; border: 1px solid #dce4e9; border-radius: 10px; padding: 10px 16px; }
.stat strong { display: block; font-size: 1.2rem; }
.stat span { color: #526474; font-size: .82rem; }
.controls { display: grid; grid-template-columns: repeat(3, minmax(150px, 1fr)) minmax(220px, 1.7fr); gap: 12px; margin: 20px 0; }
label { display: grid; gap: 5px; font-size: .86rem; font-weight: 650; }
select, input, button { font: inherit; }
select, input { min-width: 0; width: 100%; padding: 10px 12px; border: 1px solid #b9c9d4; border-radius: 7px; background: white; }
input:focus, select:focus, button:focus-visible, a:focus-visible { outline: 3px solid #6ca4d3; outline-offset: 2px; }
.result-head, .pagination { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin: 18px 0; color: #46596b; }
.pagination button { padding: 7px 12px; border: 1px solid #b9c9d4; border-radius: 7px; background: white; cursor: pointer; }
.pagination button:disabled { opacity: .45; cursor: default; }
.cards { display: grid; gap: 14px; }
article { background: white; border: 1px solid #dce4e9; border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px #192c3a0c; }
.card-top { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; align-items: start; }
.card-top h2 { margin: 0; font-size: 1rem; }
.meta { color: #586b7c; font-size: .84rem; margin: 5px 0 0; }
a { color: #165a91; }
.feature { display: inline-block; margin-top: 8px; padding: 3px 8px; border-radius: 5px; background: #d6e1eb; color: #173b60; font-size: .8rem; font-weight: 650; }
.feature.real_world_connections { background: #ddede0; color: #255238; }
.quoted { border-left: 4px solid #1c5792; padding: 8px 11px; margin: 15px 0; background: #eff5fa; white-space: pre-wrap; line-height: 1.65; overflow-wrap: anywhere; }
article.real_world_connections .quoted { border-left-color: #47865c; background: #f0f7f1; }
details { border-top: 1px solid #e4eaee; padding-top: 10px; }
summary { cursor: pointer; font-size: .84rem; font-weight: 650; color: #466175; }
.context { white-space: pre-wrap; overflow-wrap: anywhere; font-size: .91rem; line-height: 1.65; margin: 10px 0 0; }
mark { color: #102d46; background: #bcd6ec; border-radius: 2px; padding: 1px; }
article.real_world_connections mark { color: #1e462b; background: #c3e6c9; }
.empty { text-align: center; padding: 40px; background: white; border-radius: 10px; }
.report-intro { background: white; border: 1px solid #dce4e9; border-radius: 10px; padding: 20px; line-height: 1.55; }
.report-intro h2 { margin: 0 0 10px; }
.report-intro .summary { margin: 16px 0; }
.report-intro .stat { background: #f4f8fb; }
#glm-report h3 { margin: 26px 0 12px; }
.table-scroll { overflow-x: auto; background: white; border: 1px solid #dce4e9; border-radius: 9px; max-height: 640px; }
table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: .88rem; }
th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e3e9ee; vertical-align: top; white-space: nowrap; }
thead th { position: sticky; top: 0; z-index: 2; background: #e9f0f5; }
tbody th { position: sticky; left: 0; z-index: 1; background: white; min-width: 210px; white-space: normal; }
thead th:first-child { left: 0; z-index: 3; }
tr:hover td, tr:hover th { background: #f3f8fb; }
.ci { color: #607487; }
.p-inline { display: block; color: #526474; font-size: .8rem; margin-top: 2px; }
.sig { font-weight: 700; color: #195c3b; }
.table-note { color: #526474; font-size: .88rem; }
.report-feature { background: white; border: 1px solid #dce4e9; border-radius: 8px; padding: 0; margin: 10px 0; scroll-margin-top: 20px; }
.report-feature summary { font-size: .98rem; padding: 13px 16px; color: #183e5d; }
.report-feature > p { margin: 10px 16px; font-size: .88rem; }
.report-feature .table-scroll { margin: 12px 16px 16px; max-height: 400px; }
.detail-summary { font-weight: 400; color: #66798a; margin-left: 10px; }
@media (max-width: 760px) { .controls { grid-template-columns: 1fr; } header { padding: 24px; } main { padding: 18px; } }
</style>
</head>
<body>
<header><h1>Tamil annotations and language comparison</h1><p>Browse saved Examples and Real-World Connections / Applications highlights from Tamil conversations, and review the English–Tamil count GLM for pedagogical and conversational features across all models.</p></header>
<main>
  <nav class="view-tabs" aria-label="Page views"><button type="button" id="tab-annotations" aria-controls="annotations" aria-selected="true">Annotated excerpts</button><button type="button" id="tab-report" aria-controls="glm-report" aria-selected="false">GLM report</button></nav>
  <section id="annotations" aria-label="Annotated excerpts">
  <div class="summary" id="summary"></div>
  <div class="controls">
    <label>Feature<select id="feature"><option value="">Both features</option><option value="examples">Examples</option><option value="real_world_connections">Real-World Connections / Applications</option></select></label>
    <label>Topic<select id="topic"><option value="">All topics</option></select></label>
    <label>Model<select id="model"><option value="">All models</option></select></label>
    <label>Search Tamil text or conversation ID<input id="search" type="search" placeholder="Search annotations and sections"></label>
  </div>
  <div class="result-head"><span id="result-count"></span><span>Section evaluator v19</span></div>
  <div class="pagination" id="pager-top"></div>
  <div class="cards" id="cards"></div>
  <div class="pagination" id="pager-bottom"></div>
  </section>
  <section id="glm-report" aria-label="GLM report" hidden>${reportHtml(glm, adjustments)}</section>
</main>
<script type="application/json" id="dataset">${safeJson(dataset)}</script>
<script>
const data = JSON.parse(document.getElementById('dataset').textContent);
const byId = id => document.getElementById(id);
const make = (tag, className, value) => { const el = document.createElement(tag); if (className) el.className = className; if (value !== undefined) el.textContent = String(value); return el; };
const selectOptions = (id, values) => { const select = byId(id); for (const value of values) { const option = make('option', '', value); option.value = value; select.append(option); } };
selectOptions('topic', [...new Set(data.records.map(x => x.topic))].sort());
selectOptions('model', [...new Set(data.records.map(x => x.model))].sort());
const stats = [
  [data.records.filter(x => x.feature === 'examples').length.toLocaleString(), 'Examples occurrences'],
  [data.records.filter(x => x.feature === 'real_world_connections').length.toLocaleString(), 'Real-world applications occurrences'],
  [data.conversationsWithFeatures.toLocaleString(), 'Conversations with either feature'],
  [data.evaluatedConversations.toLocaleString(), 'Tamil conversations evaluated'],
];
for (const [number, label] of stats) { const box = make('div', 'stat'); box.append(make('strong', '', number), make('span', '', label)); byId('summary').append(box); }
let page = 0;
const pageSize = 80;
function card(record) {
  const article = make('article', record.feature);
  const top = make('div', 'card-top');
  const title = make('div');
  title.append(make('h2', '', record.topic));
  title.append(make('p', 'meta', record.model + ' · Turn ' + record.turn + ', section ' + record.section + ' (' + record.sectionId + ')'));
  title.append(make('span', 'feature ' + record.feature, record.featureName));
  const link = make('a', '', 'View in portal ↗');
  link.href = 'http://127.0.0.1:5173/conversations/' + encodeURIComponent(record.conversationId) + '/labeling';
  link.target = '_blank'; link.rel = 'noopener noreferrer';
  top.append(title, link);
  const quote = make('div', 'quoted', record.quote);
  const details = make('details');
  details.append(make('summary', '', 'Owning section · ' + record.conversationId));
  const context = make('div', 'context');
  context.append(document.createTextNode(record.source.slice(0, record.start)));
  context.append(make('mark', '', record.source.slice(record.start, record.end)));
  context.append(document.createTextNode(record.source.slice(record.end)));
  details.append(context);
  article.append(top, quote, details);
  return article;
}
function pager(container, totalPages) {
  container.replaceChildren();
  const previous = make('button', '', '← Previous'); previous.disabled = page === 0;
  previous.onclick = () => { page--; render(); scrollTo({top: 0, behavior: 'smooth'}); };
  const next = make('button', '', 'Next →'); next.disabled = page + 1 >= totalPages;
  next.onclick = () => { page++; render(); scrollTo({top: 0, behavior: 'smooth'}); };
  container.append(previous, make('span', '', 'Page ' + (page + 1) + ' of ' + totalPages), next);
}
function render() {
  const feature = byId('feature').value, topic = byId('topic').value, model = byId('model').value, query = byId('search').value.trim().toLocaleLowerCase();
  const filtered = data.records.filter(x => (!feature || x.feature === feature) && (!topic || x.topic === topic) && (!model || x.model === model) &&
    (!query || [x.quote, x.source, x.conversationId, x.topic, x.model].some(value => value.toLocaleLowerCase().includes(query))));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  page = Math.min(page, totalPages - 1);
  byId('result-count').textContent = filtered.length.toLocaleString() + ' of ' + data.records.length.toLocaleString() + ' occurrences shown';
  const cards = byId('cards'); cards.replaceChildren();
  if (!filtered.length) cards.append(make('div', 'empty', 'No matching annotations.'));
  else cards.append(...filtered.slice(page * pageSize, (page + 1) * pageSize).map(card));
  pager(byId('pager-top'), totalPages); pager(byId('pager-bottom'), totalPages);
}
for (const id of ['feature', 'topic', 'model', 'search']) byId(id).addEventListener(id === 'search' ? 'input' : 'change', () => { page = 0; render(); });
function showView(view) {
  const report = view === 'report';
  byId('annotations').hidden = report;
  byId('glm-report').hidden = !report;
  byId('tab-annotations').setAttribute('aria-selected', String(!report));
  byId('tab-report').setAttribute('aria-selected', String(report));
}
byId('tab-annotations').addEventListener('click', () => { location.hash = 'annotations'; showView('annotations'); });
byId('tab-report').addEventListener('click', () => { location.hash = 'glm-report'; showView('report'); });
function syncViewFromHash() {
  const report = location.hash === '#glm-report' || location.hash.startsWith('#feature-');
  showView(report ? 'report' : 'annotations');
  if (location.hash.startsWith('#feature-')) {
    const detail = document.getElementById(location.hash.slice(1));
    if (detail) detail.open = true;
  }
}
window.addEventListener('hashchange', syncViewFromHash);
syncViewFromHash();
render();
</script>
</body>
</html>\n`;
}

function topicNames() {
  const names = new Map();
  for (const file of ['agentic_conversation_capture/topics.json', 'agentic_conversation_capture/topics_v2.json']) {
    if (!fs.existsSync(file)) continue;
    for (const item of JSON.parse(fs.readFileSync(file, 'utf8'))) names.set(item['topic-id'], item['topic-name']);
  }
  return names;
}

function main() {
  const {archiveRoot, output, glmFile} = options(process.argv.slice(2));
  const index = readJsonl(path.join(archiveRoot, 'index.jsonl'));
  const baselines = readJsonl(path.join(archiveRoot, 'database', 'llm_baselines.jsonl'));
  const data = extractFeatures({
    index,
    baselines,
    sections: readJsonl(path.join(archiveRoot, 'database', 'conversation_sections.jsonl')),
    topicNames: topicNames(),
  });
  const glm = JSON.parse(fs.readFileSync(glmFile, 'utf8'));
  const adjustments = Object.fromEntries(['graphemes', 'words'].map(unit => [unit,
    JSON.parse(fs.readFileSync(path.join(path.dirname(glmFile), unit === 'graphemes' ? 'grapheme-adjusted' : 'word-adjusted', 'results.json'), 'utf8'))]));
  const currentBaselines = baselines.filter(item => item.prompt_version === 'instructional-section-items/19');
  const focusedCategories = ['Conversational & Tutoring Moves', 'Explanatory & Pedagogical Devices'];
  if (glm.analysis_version !== 'archive-language-count-glm/1' || glm.provenance.conversations !== index.length ||
      glm.provenance.prompt_version !== 'instructional-section-items/19' || glm.results?.length !== 13 ||
      JSON.stringify(glm.provenance.selected_categories) !== JSON.stringify(focusedCategories) ||
      glm.provenance.features?.some(feature => !focusedCategories.includes(feature.category)) ||
      Object.entries(adjustments).some(([unit, result]) => result.analysis_version !== glm.analysis_version ||
        result.provenance.exposure !== unit || result.provenance.conversations !== glm.provenance.conversations ||
        result.provenance.rubric_hash !== glm.provenance.rubric_hash || result.provenance.prompt_sha256 !== glm.provenance.prompt_sha256 ||
        result.results?.length !== glm.results.length || result.results.some((feature, i) => feature.feature !== glm.results[i].feature)) ||
      currentBaselines.some(item => item.rubric_hash !== glm.provenance.rubric_hash || item.prompt_sha256 !== glm.provenance.prompt_sha256)) {
    throw new Error('GLM results do not match this archive and its current evaluations');
  }
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, renderHtml(data, glm, adjustments), 'utf8');
  console.log(JSON.stringify({output, ...Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'records')), occurrences: Object.fromEntries(Object.keys(FEATURE_NAMES).map(key => [key, data.records.filter(record => record.feature === key).length]))}, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
