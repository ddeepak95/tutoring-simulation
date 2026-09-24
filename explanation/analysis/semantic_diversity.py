"""Average within-answer cosine distance using cached sentence embeddings; offline."""
import argparse
import csv
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from paths import EXPLANATION_ROOT

import numpy as np

CONDITIONS = ['English', 'Code-mixed Tamil', 'Tamil']


def distance(vectors):
    n = len(vectors)
    if n < 2:
        return None
    centroid = vectors.mean(axis=0)
    return float(n / (n - 1) * (1 - centroid @ centroid))


def write_csv(path, rows):
    with path.open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=rows[0])
        writer.writeheader()
        writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, default=EXPLANATION_ROOT / 'outputs/combined-experiments-01-02/semantic-coverage-sentences')
    args = parser.parse_args()
    root = args.input.resolve()
    out = root / 'diversity'
    manifest = json.loads((root / 'manifest.json').read_text(encoding='utf-8'))
    if hashlib.sha256((root / 'segments.csv').read_bytes()).hexdigest() != manifest['segments_sha256']:
        raise ValueError('Segments differ from embedding-run manifest')
    with (root / 'segments.csv').open(encoding='utf-8-sig') as stream:
        units = list(csv.DictReader(stream))
    cache = json.loads((root / 'embedding_cache.json').read_text(encoding='utf-8'))
    groups = {}
    for unit in units:
        groups.setdefault(unit['job_id'], []).append(unit)
    rows, matrices = [], {}
    for job_id, members in groups.items():
        vectors = np.array([cache[hashlib.sha256((manifest['model'] + '\n' + u['text']).encode()).hexdigest()] for u in members], dtype=np.float64)
        if not np.isfinite(vectors).all() or np.any(np.linalg.norm(vectors, axis=1) == 0):
            raise ValueError(f'Invalid vectors for {job_id}')
        vectors /= np.linalg.norm(vectors, axis=1, keepdims=True)
        matrices[job_id] = vectors
        n = len(vectors)
        d = distance(vectors)
        # Verify the efficient centroid identity against the direct calculation.
        if n >= 2:
            pairwise = (1 - vectors @ vectors.T)[np.triu_indices(n, 1)]
            if not np.isclose(d, pairwise.mean(), atol=1e-12):
                raise AssertionError('Centroid and direct pairwise means differ')
        first = members[0]
        rows.append(dict(job_id=job_id, experiment=first['experiment'], topic=first['topic'],
                         condition=first['condition'], clarification=first['clarification'],
                         segments=n, unordered_pairs=n*(n-1)//2,
                         mean_cosine_similarity=None if d is None else 1-d,
                         mean_pairwise_semantic_distance=d))
    if len(rows) != manifest['n_answers']:
        raise ValueError('Some source answers are missing segments')
    topics = list(dict.fromkeys(r['topic'] for r in rows))
    summary = []
    for scope in ['all_six_topics', 'excluding_vapour']:
        for condition in CONDITIONS:
            selected = [r for r in rows if r['condition']==condition and r['mean_pairwise_semantic_distance'] is not None
                        and (scope=='all_six_topics' or r['topic']!='vapour phase refining')]
            summary.append(dict(scope=scope, condition=condition, topics=len(selected),
                                mean_distance=float(np.mean([r['mean_pairwise_semantic_distance'] for r in selected]))))
    # Equal-size subsets within each topic; these describe sensitivity, not confidence intervals.
    rng = np.random.default_rng(20260919)
    sensitivity = []
    for topic in topics:
        selected = [r for r in rows if r['topic']==topic]
        m = min(r['segments'] for r in selected)
        if m < 2:
            continue
        for r in selected:
            v = matrices[r['job_id']]
            draws = [distance(v[rng.choice(len(v), m, replace=False)]) for _ in range(500)]
            sensitivity.append(dict(job_id=r['job_id'], topic=topic, condition=r['condition'],
                                    subset_size=m, draws=500, subset_mean=float(np.mean(draws)),
                                    subset_p025=float(np.quantile(draws,.025)), subset_p975=float(np.quantile(draws,.975))))
    out.mkdir(parents=True, exist_ok=True)
    write_csv(out/'responses.csv', rows)
    write_csv(out/'summary.csv', summary)
    write_csv(out/'equal_size_sensitivity.csv', sensitivity)
    (out/'manifest.json').write_text(json.dumps(dict(source=str(root), model=manifest['model'],
        source_segments_sha256=manifest['segments_sha256'], seed=20260919, subset_draws=500,
        created=datetime.now(timezone.utc).isoformat(), api_calls=0), indent=2), encoding='utf-8')
    render(out, rows, summary, topics)
    print(json.dumps(summary, indent=2))


def render(out, rows, summary, topics):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    colors = ['#2563eb','#d97706','#059669']
    fig, axes = plt.subplots(1,2,figsize=(13,5.5),layout='constrained',gridspec_kw={'width_ratios':[1.4,1]})
    for i, topic in enumerate(topics):
        values = [next(r['mean_pairwise_semantic_distance'] for r in rows if r['topic']==topic and r['condition']==c) for c in CONDITIONS]
        axes[0].plot(sorted(values), [i]*3, color='#cbd5e1', zorder=1)
        for value, color in zip(values, colors):
            axes[0].scatter(value,i,color=color,s=60,zorder=2)
    axes[0].set_yticks(range(len(topics)),[t+(' *' if t=='vapour phase refining' else '') for t in topics])
    axes[0].invert_yaxis()
    axes[0].set(xlabel='Mean pairwise cosine distance',title='Diversity within each answer')
    for c,color in zip(CONDITIONS,colors):
        group=[r for r in rows if r['condition']==c]
        axes[1].scatter([r['segments'] for r in group],[r['mean_pairwise_semantic_distance'] for r in group],color=color,label=c,s=60)
    axes[1].set(xlabel='Sentence/list segments',ylabel='Mean pairwise cosine distance',title='Segment count and semantic diversity')
    axes[1].legend(fontsize=9)
    for ax in axes:
        ax.grid(alpha=.2); ax.spines[['top','right']].set_visible(False)
    fig.suptitle('Sentence-level semantic diversity — 18 saved answers')
    fig.supxlabel('* Tamil vapour response is a clarification, not a chemistry explanation.',fontsize=9)
    for ext in ['png','svg']:
        fig.savefig(out/f'semantic_diversity.{ext}',dpi=170)
    plt.close(fig)
    lines=['# Average pairwise semantic distance','',
           'Computed offline from the cached sentence embeddings for all 18 answers. No new API calls. '
           'This measures semantic spread among segments within one answer, independently of the earlier clustering thresholds.','',
           'For n L2-normalized vectors, D = 2/[n(n−1)] × sum over i<j of (1 − e_i·e_j). '
           'Equivalently, D = n/(n−1) × (1 − ||mean(e)||²). The efficient formula was checked against '
           'the direct pairwise calculation for every answer. Self-pairs are excluded; n<2 is undefined. '
           'Higher values mean lower average sentence similarity, not more correct ideas.','',
           '**Topic-balanced averages**','',
           '| Scope | Condition | Topics | Mean semantic distance |','| --- | --- | ---: | ---: |']
    for r in summary:
        lines.append(f"| {r['scope']} | {r['condition']} | {r['topics']} | {r['mean_distance']:.4f} |")
    lines += ['','Each topic contributes one answer score per condition. We do not pool sentence pairs across '
              'topics, which would overweight longer answers and confound topical differences with within-answer diversity.','',
              '![Semantic diversity plots](semantic_diversity.png)','',
              '**Per-answer results**','',
              '| Topic | Condition | Segments | Pairs | Mean similarity | Mean distance |',
              '| --- | --- | ---: | ---: | ---: | ---: |']
    for r in rows:
        lines.append(f"| {r['topic']} | {r['condition']} | {r['segments']} | {r['unordered_pairs']} | {r['mean_cosine_similarity']:.4f} | {r['mean_pairwise_semantic_distance']:.4f} |")
    lines += ['','**Equal-size sensitivity.** For each topic, sample the same number of segments from each answer '
              '(the minimum available across its three conditions), without replacement, 500 times with a fixed seed. '
              '[Subset results](equal_size_sensitivity.csv) contain means and 2.5th/97.5th percentiles. These ranges '
              'describe subset variability, not confidence intervals for a language effect. The expected subset mean '
              'equals the full pairwise mean, so this checks sensitivity to which sentences are included rather '
              'than independently validating the score or correcting language-dependent segmentation.','',
              '**Limits.** Segments include list fragments and formula context, not only grammatical sentences. '
              'The earlier extractor deduplicated identical segments within each answer, so this is diversity of '
              'distinct retained segment texts, not a frequency-weighted repetition measure. No cosine thresholds '
              'or semantic clustering are used here. Embedding geometry across languages may differ. High distance '
              'can reflect topic drift, mixed formats, or unrelated statements; low distance can reflect coherent '
              'explanations of many related ideas. This is neither correctness nor completeness.','',
              'The Tamil vapour response is a clarification; excluding the full topic is reported separately. '
              'Fixed execution order, changing quotas, and one response per cell still limit causal conclusions. '
              'No claim of statistical significance is made here, and individual sentence pairs are not '
              'independent experimental observations.','',
              '[Per-answer CSV](responses.csv) · [Summary CSV](summary.csv) · [Vector plot](semantic_diversity.svg)','',
              'Reproduce from the repository root:', '', '```powershell',
              '.venv\\Scripts\\python.exe explanation/semantic_diversity.py', '```','']
    (out/'report.md').write_text('\n'.join(lines),encoding='utf-8')


if __name__=='__main__':
    main()
