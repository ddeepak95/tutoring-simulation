"""Sentence embedding diversity and complete-link coverage on shared topics."""
import argparse
import csv
import hashlib
import json
from pathlib import Path

import numpy as np
from semantic_coverage import MODEL, THRESHOLDS, embed, segments, write_csv
from semantic_diversity import distance


def load_rows(path):
    rows = list(csv.DictReader(path.open(encoding='utf-8-sig')))
    conditions = sorted({r['condition'] for r in rows}, key=lambda c: (c.replace('Code-mixed ', ''), c.startswith('Code-mixed ')))
    topics = sorted(set.intersection(*[{r['matched_topic'] for r in rows if r['condition'] == c} for c in conditions]))
    rows = [r for r in rows if r['matched_topic'] in topics]
    assert len({(r['matched_topic'], r['condition']) for r in rows}) == len(rows) == len(topics)*len(conditions)
    return rows, conditions, topics


def clustering(similarity, thresholds):
    """One complete-link hierarchy, with deterministic index tie-breaking."""
    scores = np.array(similarity, copy=True)
    scores[np.tril_indices(len(scores))] = -np.inf
    groups = {i: [i] for i in range(len(scores))}
    result = {}
    for threshold in sorted(thresholds, reverse=True):
        while True:
            a, b = np.unravel_index(np.argmax(scores), scores.shape)
            if scores[a, b] < threshold:
                break
            for k in groups:
                if k in (a, b):
                    continue
                i, j = sorted((a, k))
                x, y = sorted((b, k))
                scores[i, j] = min(scores[i, j], scores[x, y])
            groups[a] += groups.pop(b)
            scores[b, :] = -np.inf
            scores[:, b] = -np.inf
            scores[a, b] = -np.inf
        result[threshold] = [list(g) for g in groups.values()]
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--seed-cache', type=Path)
    parser.add_argument('--embed', action='store_true')
    parser.add_argument('--prepare-only', action='store_true')
    args = parser.parse_args()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    rows, conditions, topics = load_rows(args.input)
    units = []
    for row in rows:
        source = (args.input.parent / row['html_path']).resolve()
        response_id = row['experiment'] + '/' + row['job_id']
        for index, segment in enumerate(segments(source.read_text(encoding='utf-8'), 'sentence_multilingual')):
            units.append(dict(id=f'{response_id}/s{index:03}', response_id=response_id,
                condition=row['condition'], topic=row['matched_topic'], **segment))
    write_csv(out/'segments.csv', units)
    assert {u['response_id'] for u in units} == {r['experiment']+'/'+r['job_id'] for r in rows}
    if args.seed_cache and not (out/'embedding_cache.json').exists():
        (out/'embedding_cache.json').write_bytes(args.seed_cache.read_bytes())
    print(f'Prepared {len(units)} segments, {len(rows)} answers, {len(topics)} topics.', flush=True)
    if args.prepare_only:
        return
    vectors = embed(units, out, args.embed)
    assert np.isfinite(vectors).all()
    diversity, coverage, cluster_records, summaries, sensitivity = [], [], [], [], []
    rng = np.random.default_rng(20260920)
    for topic in topics:
        indices = [i for i, u in enumerate(units) if u['topic'] == topic]
        members = [units[i] for i in indices]
        v = vectors[indices]
        sim = v @ v.T
        groups_by_threshold = clustering(sim, THRESHOLDS)
        smallest = min(sum(u['condition'] == c for u in members) for c in conditions)
        for condition in conditions:
            selected = [i for i, u in enumerate(members) if u['condition'] == condition]
            n = len(selected)
            score = distance(v[selected])
            if n > 1:
                assert np.isclose(score, (1-sim[np.ix_(selected, selected)])[np.triu_indices(n, 1)].mean(), atol=1e-12)
            diversity.append(dict(topic=topic, condition=condition, segments=n,
                mean_pairwise_semantic_distance=score, unordered_pairs=n*(n-1)//2))
            if smallest >= 2:
                draws = [distance(v[rng.choice(selected, smallest, replace=False)]) for _ in range(500)]
                sensitivity.append(dict(topic=topic, condition=condition, subset_size=smallest,
                    subset_mean=float(np.mean(draws)), subset_p025=float(np.quantile(draws,.025)),
                    subset_p975=float(np.quantile(draws,.975))))
        for threshold, groups in groups_by_threshold.items():
            for number, group in enumerate(groups):
                cluster_records.append(dict(topic=topic, threshold=threshold, cluster=number,
                    conditions=sorted({members[i]['condition'] for i in group}),
                    members=[members[i] for i in group]))
            for condition in conditions:
                present = sum(any(members[i]['condition'] == condition for i in g) for g in groups)
                coverage.append(dict(topic=topic, threshold=threshold, condition=condition,
                    clusters_present=present, total_clusters=len(groups), coverage_percent=100*present/len(groups)))
        print(f'Calculated {topic}: {len(members)} segments', flush=True)
    for condition in conditions:
        group = [r for r in diversity if r['condition'] == condition]
        for threshold in THRESHOLDS:
            scores = [r for r in coverage if r['condition'] == condition and r['threshold'] == threshold]
            summaries.append(dict(condition=condition, topics=len(group), threshold=threshold,
                mean_segments=float(np.mean([r['segments'] for r in group])),
                mean_pairwise_semantic_distance=float(np.mean([r['mean_pairwise_semantic_distance'] for r in group])),
                mean_clusters=float(np.mean([r['clusters_present'] for r in scores])),
                mean_coverage_percent=float(np.mean([r['coverage_percent'] for r in scores]))))
    write_csv(out/'diversity.csv', diversity)
    write_csv(out/'coverage.csv', coverage)
    write_csv(out/'summary.csv', summaries)
    write_csv(out/'equal_size_sensitivity.csv', sensitivity)
    (out/'clusters.json').write_text(json.dumps(cluster_records, ensure_ascii=False), encoding='utf-8')
    (out/'manifest.json').write_text(json.dumps(dict(model=MODEL, dimensions=vectors.shape[1],
        answers=len(rows), segments=len(units), conditions=conditions, topics=topics, thresholds=THRESHOLDS,
        segmentation='sentence_multilingual; sentence punctuation including Indic danda; list/table units; exact within-answer deduplication; no language-specific follow-up removal',
        segments_sha256=hashlib.sha256((out/'segments.csv').read_bytes()).hexdigest(),
        input_sha256=hashlib.sha256(args.input.read_bytes()).hexdigest()), indent=2), encoding='utf-8')
    render(out, conditions, summaries, cluster_records)


def render(out, conditions, summaries, clusters):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    central = [r for r in summaries if r['threshold'] == .7]
    central_clusters = [r for r in clusters if r['threshold'] == .7]
    singletons = sum(len(r['members']) == 1 for r in central_clusters)
    correlation = float(np.corrcoef([r['mean_segments'] for r in central], [r['mean_clusters'] for r in central])[0,1])
    diagnostics = dict(clusters=len(central_clusters), singleton_clusters=singletons,
        singleton_percent=100*singletons/len(central_clusters),
        mean_segments_vs_mean_clusters_pearson_r=correlation)
    (out/'coverage_diagnostics.json').write_text(json.dumps(diagnostics,indent=2),encoding='utf-8')
    fig, axes = plt.subplots(1, 2, figsize=(13, 8), sharey=True)
    for ax, key, title in zip(axes, ['mean_pairwise_semantic_distance', 'mean_coverage_percent'],
                             ['Within-answer semantic diversity', 'Pooled cluster coverage (%) at similarity 0.70']):
        values = [r[key] for r in central]
        ax.barh(conditions, values, color=['#d77b29' if c.startswith('Code-mixed ') else '#286caa' for c in conditions])
        for i, value in enumerate(values):
            ax.text(value, i, f' {value:.3f}' if key.startswith('mean_pairwise') else f' {value:.1f}', va='center', fontsize=8)
        ax.set_xlim(0, max(values)*1.2)
        ax.set_title(title, fontsize=11)
    axes[0].invert_yaxis()
    fig.tight_layout()
    for ext in ['png','svg']:
        fig.savefig(out/f'semantics.{ext}', dpi=150, bbox_inches='tight')
    plt.close(fig)
    lines = ['# Semantic comparison across six shared topics', '',
        'Each condition contributes six answer-level scores. Embeddings: text-embedding-3-large (3072 dimensions).', '',
        '| Condition | Mean segments | Diversity | Mean clusters represented | Coverage (%) |',
        '| --- | ---: | ---: | ---: | ---: |']
    for r in central:
        lines.append(f"| {r['condition']} | {r['mean_segments']:.1f} | {r['mean_pairwise_semantic_distance']:.4f} | {r['mean_clusters']:.1f} | {r['mean_coverage_percent']:.1f} |")
    lines += ['', '![Semantic measures](semantics.png)', '',
        'Diversity = mean(1 − cosine similarity) over every distinct sentence pair inside an answer. '
        'Higher means its sentence embeddings are more spread out; it is not a count of ideas, accuracy, or quality.', '',
        'Approximate coverage: pool all 15 conditions within each topic, form complete-link clusters at cosine similarity ≥0.70, '
        'and count clusters represented by each answer. Divide by the pooled number of clusters in that topic, then average percentages equally across six topics. '
        'The denominator is only the observed corpus, not all possible ideas. Coverage need not sum to 100% across conditions. '
        'It is affected by answer length, segmentation, language alignment and the threshold; multi-idea sentences and opposite claims can confound clustering. '
        'These percentages cannot be compared directly with the old three-condition pool.', '',
        f'**Coverage diagnostic:** {singletons}/{len(central_clusters)} clusters ({100*singletons/len(central_clusters):.1f}%) '
        f'are singletons at 0.70. Across conditions, mean represented-cluster count correlates with mean segment count at r={correlation:.3f}. '
        'This indicates that this approximation largely tracks the number of sentence units; it is not yet a validated count of distinct ideas.', '',
        'Segmentation retains semicolons, recognizes .!? and Indic danda boundaries, and treats list items/table rows as units. '
        'Exact duplicate units within an answer are removed. Language-specific follow-up filters are disabled for equal treatment across languages. '
        'These are heuristic sentence-like units, not a multilingual linguistic parser.', '',
        'Sensitivity thresholds: 0.50, 0.60, 0.70, 0.80 and 0.90. Equal-size sentence subsampling uses the minimum count within each topic, '
        '500 draws, seed 20260920; its ranges describe subset variability, not confidence intervals. '
        'Cross-language geometry and batch/account differences prevent causal interpretation. No significance claim is made.', '',
        '[Per-answer diversity](diversity.csv) · [Coverage by threshold](coverage.csv) · [All summaries](summary.csv) · '
        '[Equal-size subsets](equal_size_sensitivity.csv) · [Segments](segments.csv) · [Cluster explorer](explorer.html)', '',
        '## Threshold sensitivity', '', '| Condition | 0.50 | 0.60 | 0.70 | 0.80 | 0.90 |', '| --- | ---: | ---: | ---: | ---: | ---: |']
    for c in conditions:
        vals=[next(r['mean_coverage_percent'] for r in summaries if r['condition']==c and r['threshold']==t) for t in THRESHOLDS]
        lines.append('| '+c+' | '+' | '.join(f'{v:.1f}%' for v in vals)+' |')
    lines += ['', 'API reference: [OpenAI embedding model](https://developers.openai.com/api/docs/models/text-embedding-3-large).', '']
    (out/'report.md').write_text('\n'.join(lines),encoding='utf-8')
    payload=json.dumps(clusters,ensure_ascii=False).replace('</','<\\/')
    (out/'explorer.html').write_text('''<!doctype html><meta charset="utf-8"><title>Semantic cluster audit</title>
<style>body{font:16px system-ui;max-width:1100px;margin:30px auto}select{padding:8px;margin:8px}details{padding:8px;border-bottom:1px solid #ddd}li{margin:8px}</style>
<h1>Semantic cluster audit</h1><p>Clusters approximate related sentence content; they are not verified atomic ideas.</p><select id="topic"></select><select id="threshold"></select><div id="results"></div>
<script>const D='''+payload+''';const topic=document.querySelector('#topic'),threshold=document.querySelector('#threshold');
for(const t of [...new Set(D.map(x=>x.topic))])topic.add(new Option(t,t));for(const t of [.5,.6,.7,.8,.9])threshold.add(new Option(t,t));threshold.value='0.7';
function show(){const root=document.querySelector('#results');root.replaceChildren();for(const c of D.filter(x=>x.topic===topic.value&&x.threshold===+threshold.value)){const d=document.createElement('details'),s=document.createElement('summary');s.textContent='Cluster '+c.cluster+' — '+c.conditions.join(', ');d.append(s);for(const m of c.members){const p=document.createElement('p');p.textContent=m.condition+': '+m.text;d.append(p)}root.append(d)}}topic.onchange=threshold.onchange=show;show();</script>''',encoding='utf-8')


if __name__ == '__main__':
    main()
