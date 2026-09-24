"""Exploratory multilingual clause clustering over the combined saved HTML corpus."""
import argparse
import csv
import hashlib
import html
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from paths import EXPLANATION_ROOT

import numpy as np
from bs4 import BeautifulSoup

CONDITIONS = ['English', 'Code-mixed Tamil', 'Tamil']
MODEL = 'text-embedding-3-large'
THRESHOLDS = [.50, .60, .70, .80, .90]


def segments(source, mode='clause'):
    soup = BeautifulSoup(source, 'html.parser')
    answers = soup.select('[data-message-author-role="assistant"]')
    if len(answers) != 1:
        raise ValueError('Expected exactly one assistant answer')
    answer = answers[0]
    for selector in ('[data-testid="math-block-layout"], [data-testid="webpage-citation-pill"]',
                     'button, [role="button"], img, svg, script, style, pre, [hidden], [aria-hidden="true"]'):
        # Do not discard aria-hidden KaTeX visual spans before recovering math source:
        for node in list(answer.select(selector)):
            if node.parent is not None and not node.find_parent(attrs={'data-math-source': True}):
                node.decompose()
    for node in list(answer.select('[data-math-source]')):
        node.replace_with(' $' + node['data-math-source'] + '$ ')
    for node in list(answer.select('.katex')):
        if node.parent is not None:
            annotation = node.select_one('annotation')
            node.replace_with(' $' + (annotation.get_text() if annotation else node.get_text()) + '$ ')
    output = []
    for node in answer.select('p, li, tr, blockquote'):
        if node.name == 'p' and node.find_parent('tr'):
            continue
        if node.name in ('li', 'blockquote') and node.select('p, li, tr'):
            continue
        section = node.find_previous(re.compile('^h[1-6]$'))
        section = section.get_text(' ', strip=True) if section else ''
        if node.name == 'tr':
            text = ' — '.join(cell.get_text(' ', strip=True) for cell in node.select('th,td'))
            if node.select('th'):
                continue
        else:
            text = node.get_text()
        text = re.sub(r'\s+', ' ', text.replace('\u200b', '')).strip()
        if not text:
            continue
        if mode != 'sentence_multilingual' and re.search(r"if you(?:'d|’d)? like|வேணும்னா|நீ விரும்பினா|நீங்கள் விரும்பினால்", text, re.I):
            continue
        # Protect LaTeX and decimal dots while splitting at sentence/semicolon boundaries.
        protected = []
        def protect(match):
            protected.append(match.group())
            return f' MATHPLACEHOLDER{len(protected)-1} '
        masked = re.sub(r'\$[^$]*\$', protect, text)
        if mode in ('sentence', 'sentence_multilingual'):
            # Retain semicolons/conjunctions within sentences. Protect common dotted
            # abbreviations; decimals have no following whitespace and are unsplit.
            masked = re.sub(r'\b(?:e\.g\.|i\.e\.|Dr\.|Mr\.|Mrs\.|vs\.)',
                            lambda m: m.group().replace('.', '\ue000'), masked)
            boundary = r'(?<=[.!?।॥])\s+' if mode == 'sentence_multilingual' else r'(?<=[.!?])\s+'
            parts = [masked] if node.name == 'tr' else re.split(boundary, masked)
            parts = [part.replace('\ue000', '.') for part in parts]
        else:
            parts = re.split(r'(?<=[.!?;])\s+(?!\d)|\s*;\s*', masked)
        for part in parts:
            prose = re.sub(r'MATHPLACEHOLDER\d+', '', part)
            part = re.sub(r'MATHPLACEHOLDER(\d+)', lambda m: protected[int(m[1])], part).strip()
            words = [w for w in prose.split() if any(c.isalpha() for c in w)]
            if len(words) < 2:
                if protected and output:
                    output[-1]['text'] += ' ' + part
                continue
            output.append(dict(text=part, section=section))
    # Exact repeats within an answer are one candidate unit.
    unique = {}
    for segment in output:
        unique.setdefault(segment['text'], segment)
    return list(unique.values())


def complete_link(similarity, threshold):
    groups = {i: [i] for i in range(len(similarity))}
    similarities = {(i, j): float(similarity[i, j])
                    for i in groups for j in groups if i < j}
    while similarities:
        pair = max(similarities, key=lambda p: (similarities[p], -p[0], -p[1]))
        if similarities[pair] < threshold:
            break
        a, b = pair
        others = [k for k in groups if k not in pair]
        updated = {k: min(similarities[tuple(sorted((a, k)))],
                          similarities[tuple(sorted((b, k)))]) for k in others}
        groups[a] += groups.pop(b)
        similarities = {p: s for p, s in similarities.items() if a not in p and b not in p}
        for k, value in updated.items():
            similarities[tuple(sorted((a, k)))] = value
    return list(groups.values())


def embed(units, out, allow_api):
    from dotenv import load_dotenv
    from openai import OpenAI
    cache_path = out / 'embedding_cache.json'
    cache = json.loads(cache_path.read_text(encoding='utf-8')) if cache_path.exists() else {}
    def key(text):
        return hashlib.sha256((MODEL + '\n' + text).encode()).hexdigest()
    missing = list(dict.fromkeys(u['text'] for u in units if key(u['text']) not in cache))
    if missing and not allow_api:
        raise ValueError(f'{len(missing)} uncached texts. Run with --embed to call the embedding API.')
    if missing:
        load_dotenv(EXPLANATION_ROOT.parent / '.env')
        client = OpenAI(timeout=90, max_retries=1)
        for start in range(0, len(missing), 64):
            batch = missing[start:start+64]
            response = client.embeddings.create(model=MODEL, input=batch, encoding_format='float')
            for item in response.data:
                cache[key(batch[item.index])] = item.embedding
            temporary = cache_path.with_suffix('.tmp')
            temporary.write_text(json.dumps(cache), encoding='utf-8')
            temporary.replace(cache_path)
            with (out / 'api_usage.jsonl').open('a', encoding='utf-8') as stream:
                stream.write(json.dumps(dict(time=datetime.now(timezone.utc).isoformat(),
                                             model=response.model, texts=len(batch), usage=response.usage.model_dump())) + '\n')
            print(f'Embedded {min(start+64,len(missing))}/{len(missing)} new texts', flush=True)
    vectors = np.array([cache[key(u['text'])] for u in units])
    return vectors / np.linalg.norm(vectors, axis=1, keepdims=True)


def write_csv(path, rows):
    with path.open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=rows[0])
        writer.writeheader()
        writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, default=EXPLANATION_ROOT / 'outputs/combined-experiments-01-02/responses.csv')
    parser.add_argument('--output', type=Path, default=EXPLANATION_ROOT / 'outputs/combined-experiments-01-02/semantic-coverage')
    parser.add_argument('--embed', action='store_true')
    parser.add_argument('--prepare-only', action='store_true')
    parser.add_argument('--segmentation', choices=['clause', 'sentence'], default='clause')
    parser.add_argument('--seed-cache', type=Path, help='Reuse previously approved embeddings for identical texts')
    args = parser.parse_args()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    if args.seed_cache and not (out / 'embedding_cache.json').exists():
        (out / 'embedding_cache.json').write_bytes(args.seed_cache.read_bytes())
    rows = list(csv.DictReader(args.input.open(encoding='utf-8-sig')))
    units = []
    for row in rows:
        path = (args.input.parent / row['html_path']).resolve()
        for n, segment in enumerate(segments(path.read_text(encoding='utf-8'), args.segmentation), 1):
            units.append(dict(id=f"{row['job_id']}-s{n:03}", topic=row['matched_topic'],
                              condition=row['condition'], experiment=row['experiment'], job_id=row['job_id'],
                              clarification=row['clarification_response'] == 'True', **segment))
    write_csv(out / 'segments.csv', units)
    print(f'Prepared {len(units)} candidate segments from {len(rows)} responses.', flush=True)
    if args.prepare_only:
        return
    vectors = embed(units, out, args.embed)
    topics = list(dict.fromkeys(u['topic'] for u in units))
    coverage, clusters, nearest = [], [], []
    for topic in topics:
        indices = [i for i,u in enumerate(units) if u['topic'] == topic]
        members = [units[i] for i in indices]
        similarity = vectors[indices] @ vectors[indices].T
        for i, unit in enumerate(members):
            for condition in CONDITIONS:
                if condition == unit['condition']:
                    continue
                candidates = [j for j,u in enumerate(members) if u['condition'] == condition]
                j = max(candidates, key=lambda j: similarity[i,j])
                nearest.append(dict(topic=topic, source_id=unit['id'], source_condition=unit['condition'],
                                    target_condition=condition, similarity=float(similarity[i,j]),
                                    source_text=unit['text'], nearest_text=members[j]['text']))
        for threshold in THRESHOLDS:
            groups = complete_link(similarity, threshold)
            for n, group in enumerate(groups, 1):
                present = sorted(set(members[i]['condition'] for i in group))
                clusters.append(dict(topic=topic, threshold=threshold, cluster=n,
                                     conditions=present, members=[members[i] for i in group],
                                     min_similarity=min((float(similarity[i,j]) for i in group for j in group), default=1)))
            for condition in CONDITIONS:
                count = sum(any(members[i]['condition'] == condition for i in group) for group in groups)
                exclusive = sum({members[i]['condition'] for i in group} == {condition} for group in groups)
                coverage.append(dict(topic=topic, condition=condition, threshold=threshold,
                                     segments=sum(u['condition']==condition for u in members),
                                     clusters_present=count, total_clusters=len(groups),
                                     coverage_percent=100*count/len(groups), exclusive_clusters=exclusive))
    write_csv(out / 'coverage.csv', coverage)
    write_csv(out / 'nearest_cross_language.csv', nearest)
    (out / 'clusters.json').write_text(json.dumps(clusters, ensure_ascii=False, indent=2), encoding='utf-8')
    summary = []
    for scope in ['all_six_topics', 'excluding_vapour']:
        for threshold in THRESHOLDS:
            for condition in CONDITIONS:
                group = [r for r in coverage if r['condition']==condition and r['threshold']==threshold
                         and (scope=='all_six_topics' or r['topic']!='vapour phase refining')]
                summary.append(dict(scope=scope, threshold=threshold, condition=condition,
                                    mean_coverage=float(np.mean([r['coverage_percent'] for r in group])),
                                    mean_clusters=float(np.mean([r['clusters_present'] for r in group]))))
    write_csv(out / 'summary.csv', summary)
    manifest = dict(model=MODEL, dimensions=vectors.shape[1], thresholds=THRESHOLDS, segmentation=args.segmentation,
                    method='complete-link agglomeration on cosine similarity',
                    n_segments=len(units), n_answers=len(rows), input_sha256=hashlib.sha256(args.input.read_bytes()).hexdigest(),
                    segments_sha256=hashlib.sha256((out/'segments.csv').read_bytes()).hexdigest(),
                    created=datetime.now(timezone.utc).isoformat())
    (out/'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    render(out, topics, coverage, summary, clusters, units, args.segmentation)
    print(json.dumps(summary, indent=2))


def render(out, topics, coverage, summary, clusters, units, mode='clause'):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    colors = ['#2563eb', '#d97706', '#059669']
    fig, axes = plt.subplots(1, 2, figsize=(12, 4.7), layout='constrained')
    for ax, scope, title in zip(axes, ['all_six_topics','excluding_vapour'], ['All six topics', 'Excluding ambiguous vapour topic']):
        for condition, color in zip(CONDITIONS, colors):
            values = [r['mean_coverage'] for r in summary if r['scope']==scope and r['condition']==condition]
            ax.plot(THRESHOLDS, values, marker='o', label=condition, color=color)
        ax.set(xlabel='Minimum within-cluster cosine similarity', ylabel='Mean observed coverage (%)', title=title, ylim=(0,100))
        ax.grid(alpha=.2)
    axes[1].legend(fontsize=9)
    fig.suptitle('Exploratory semantic coverage: sensitivity to clustering threshold')
    for ext in ['png','svg']:
        fig.savefig(out/f'threshold_sensitivity.{ext}', dpi=170)
    plt.close(fig)
    central=.7
    data = [[next(r['coverage_percent'] for r in coverage if r['topic']==t and r['condition']==c and r['threshold']==central) for c in CONDITIONS] for t in topics]
    fig, ax = plt.subplots(figsize=(9,5), layout='constrained')
    im=ax.imshow(data, vmin=0, vmax=100, cmap='Blues', aspect='auto')
    ax.set_xticks(range(3), CONDITIONS)
    ax.set_yticks(range(len(topics)), topics)
    for i in range(len(topics)):
        for j in range(3):
            ax.text(j,i,f'{data[i][j]:.1f}%',ha='center',va='center',color='white' if data[i][j]>60 else 'black')
    ax.set_title('Observed semantic coverage at cosine threshold 0.70\nIllustrative setting; inspect sensitivity and clusters')
    fig.colorbar(im,ax=ax,label='Coverage (%)')
    for ext in ['png','svg']:
        fig.savefig(out/f'coverage_heatmap.{ext}', dpi=170)
    plt.close(fig)
    payload=json.dumps(dict(topics=topics,conditions=CONDITIONS,thresholds=THRESHOLDS,coverage=coverage,clusters=clusters),ensure_ascii=False).replace('</','<\\/')
    page='''<!doctype html><meta charset="utf-8"><title>Semantic coverage explorer</title>
<style>body{font:16px system-ui;margin:35px auto;max-width:1250px;padding:0 20px;color:#172033}select{padding:8px;margin:8px}table{border-collapse:collapse;width:100%;margin:20px 0}td,th{padding:10px;border:1px solid #ddd;text-align:left}th{background:#eff4fa}.pill{padding:4px 8px;background:#e5efff;border-radius:6px}details{margin:10px 0;padding:12px;border:1px solid #ddd}li{margin:12px 0;line-height:1.6}</style>
<h1>Semantic coverage explorer</h1><p>Approximate content breadth from multilingual sentence/list segments. This is not correctness or completeness. No reference idea list was used.</p>
<p>Select a topic and similarity threshold. Higher thresholds split more segments into separate clusters. Inspect the source text before interpreting a cluster as one idea.</p>
<label>Topic <select id="topic"></select></label><label>Similarity threshold <select id="threshold"></select></label><div id="scores"></div><div id="clusters"></div>
<script>const D=PAYLOAD;const topic=document.querySelector('#topic'),threshold=document.querySelector('#threshold');
function option(s,v){let o=document.createElement('option');o.value=v;o.textContent=v;s.append(o)}
D.topics.forEach(v=>option(topic,v));D.thresholds.forEach(v=>option(threshold,v));threshold.value='0.7';
function text(tag,value,parent){let e=document.createElement(tag);e.textContent=value;parent.append(e);return e}
function draw(){const t=topic.value,h=Number(threshold.value),scores=document.querySelector('#scores'),root=document.querySelector('#clusters');scores.replaceChildren();root.replaceChildren();
if(t==='vapour phase refining')text('p','Caution: the Tamil response asks for clarification about a different meaning. Its clusters are not chemistry coverage.',scores);
let table=document.createElement('table');scores.append(table);let head=document.createElement('tr');table.append(head);['Condition','Segments','Clusters present','Total clusters','Coverage','Exclusive clusters'].forEach(v=>text('th',v,head));
D.coverage.filter(r=>r.topic===t&&r.threshold===h).forEach(r=>{let row=document.createElement('tr');table.append(row);[r.condition,r.segments,r.clusters_present,r.total_clusters,r.coverage_percent.toFixed(1)+'%',r.exclusive_clusters].forEach(v=>text('td',v,row))});
D.clusters.filter(r=>r.topic===t&&r.threshold===h).forEach(c=>{let d=document.createElement('details');root.append(d);text('summary','Cluster '+c.cluster+' — '+c.conditions.join(' / ')+' — '+c.members.length+' segments',d);let ul=document.createElement('ul');d.append(ul);c.members.forEach(m=>{let li=document.createElement('li');ul.append(li);text('strong',m.condition+' ['+m.id+'] ',li);text('span',m.text,li)})})}
topic.onchange=threshold.onchange=draw;draw();</script>'''.replace('PAYLOAD',payload)
    (out/'explorer.html').write_text(page,encoding='utf-8')
    lines=['# Exploratory embedding-based semantic coverage','',
           f'Processed {len(units)} candidate segments from 18 responses in the two experiments. '
           'The same original-language segmentation and embedding pipeline is used for all answers.','',
           '[Interactive cluster explorer](explorer.html) · [Coverage CSV](coverage.csv) · [Segments](segments.csv) · [Nearest cross-language matches](nearest_cross_language.csv)','',
           '**Method.** Extract paragraphs, list items, and table rows from assistant HTML; omit headings as units, '
           'ads, citation controls, interactive widgets, diagrams/code, and follow-up offers. Recover LaTeX from '
           'data-math-source where present. ' + ('Split only at sentence boundaries, preserving semicolons and keeping table rows intact; ' if mode=='sentence' else 'Split at sentence/semicolon boundaries; ') + 'short formula fragments '
           'attach to the previous unit. Multi-idea sentences can remain intact. These are candidate semantic '
           'units, not validated atomic propositions. No translation or LLM idea extraction was used.','',
           'Embed with [text-embedding-3-large](https://developers.openai.com/api/docs/models/text-embedding-3-large), '
           'using default 3072 dimensions. Normalize vectors and cluster within each topic using complete linkage. '
           'Every pair within a merged cluster must meet the cosine threshold. Examine thresholds 0.50, 0.60, '
           '0.70, 0.80, and 0.90; none is calibrated as a semantic-equivalence cutoff. Cached vectors let you rerun '
           'without another API call. See manifest and api_usage.jsonl for provenance.','',
           'For each condition, count the clusters containing at least one of its segments. Coverage is '
           '100 × that count / all clusters in the topic. Repeated material in one cluster counts once. '
           'Mean coverage averages topics equally. The denominator is the observed inventory, not a gold standard.','',
           '**Illustrative results at threshold 0.70**','',
           '| Scope | Condition | Mean clusters per topic | Mean coverage |','| --- | --- | ---: | ---: |']
    for r in summary:
        if r['threshold']==.7:
            lines.append(f"| {r['scope']} | {r['condition']} | {r['mean_clusters']:.2f} | {r['mean_coverage']:.1f}% |")
    lines += ['','![Coverage by topic](coverage_heatmap.png)','','![Threshold sensitivity](threshold_sensitivity.png)','',
              f'**Diagnostics.** At threshold 0.70, the topics contain {sum(c["threshold"]==.7 for c in clusters)} clusters, '
              f'{sum(c["threshold"]==.7 and len(c["members"])==1 for c in clusters)} of them singletons; '
              f'{sum(c["threshold"]==.7 and len(c["conditions"])>1 for c in clusters)} clusters contain segments from multiple language conditions. '
              'This means the score remains strongly influenced by how many segments each answer supplies '
              f'({", ".join(c+": "+str(sum(u["condition"]==c for u in units)) for c in CONDITIONS)}), rather than cleanly measuring shared atomic ideas.','',
              'Inspection of the earlier clause pilot found both useful and problematic matches. Force-variable definitions '
              'and the Mond-process label align across some answers. However, a CFT cluster combines '
              'high-spin and low-spin statements (minimum pair similarity about 0.767), and an optical '
              'cluster combines clockwise and anticlockwise rotation statements. A refining cluster '
              'groups references to Kroll-type and Van Arkel processes. These are related content, '
              'not interchangeable propositions. Cross-language matching also misses some equivalents: '
              'the short English non-superimposable-mirror-image statement has no Tamil nearest match '
              'above 0.46 in this segmentation. Sentence granularity and wording affect this diagnostic.','',
              'Inspect summary.csv and the sensitivity plots for the average ranking across thresholds. '
              'Even a stable ranking does not validate the metric: the same '
              'segmentation and cross-language biases persist across thresholds. Treat the result '
              'as a pilot. Calibrate with bilingual same-idea/different-idea pairs and revise extraction '
              'before interpreting the numerical gap as a difference in idea count.','',
              '**Interpretation limits.** Longer answers offer more candidate segments, so this method does not '
              'fully separate length from breadth. Language-dependent sentence structure and embedding quality '
              'can affect both segmentation and matching. Related claims and contradictions may cluster together; '
              'equivalent translations may remain separate. Correctness is not evaluated. Original images and '
              'interactive explanations are not evaluated, so this is text coverage only.','',
              'The Tamil vapour response is a clarification, not a chemistry explanation. The sensitivity plot '
              'therefore also reports the five remaining topics. Changes in order, quotas, and prompt wording '
              'remain confounds. Do not interpret the scores as a validated count of ideas, or run confirmatory '
              'significance tests on them before inspecting clustering and calibrating the measurement.','',
              '**Reproduce from the repository root**','', '```powershell',
              '.venv\\Scripts\\python.exe explanation/semantic_coverage.py --segmentation ' + mode + ' --output "' + str(out) + '"', '```','',
              'The cached run needs no API access. Add `--embed` only to embed missing texts. Original artifacts are unchanged.','']
    (out/'report.md').write_text('\n'.join(lines),encoding='utf-8')


if __name__=='__main__':
    main()
