"""Compare the saved clause and sentence pilots without API calls."""
import csv
from pathlib import Path
from paths import EXPLANATION_ROOT

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT = EXPLANATION_ROOT / 'outputs/combined-experiments-01-02'
OLD = ROOT / 'semantic-coverage'
OUT = ROOT / 'semantic-coverage-sentences'


def read(path):
    with path.open(encoding='utf-8-sig') as stream:
        return list(csv.DictReader(stream))


def main():
    old = {(r['scope'], r['threshold'], r['condition']): r for r in read(OLD/'summary.csv')}
    rows = []
    for r in read(OUT/'summary.csv'):
        before = float(old[r['scope'], r['threshold'], r['condition']]['mean_coverage'])
        after = float(r['mean_coverage'])
        rows.append(dict(scope=r['scope'], threshold=r['threshold'], condition=r['condition'],
                         previous_coverage=before, sentence_coverage=after, difference_pp=after-before))
    with (OUT/'segmentation_comparison.csv').open('w',encoding='utf-8-sig',newline='') as stream:
        writer=csv.DictWriter(stream,fieldnames=rows[0]); writer.writeheader(); writer.writerows(rows)
    fig, ax=plt.subplots(figsize=(9,5),layout='constrained')
    conditions=['English','Code-mixed Tamil','Tamil']
    for j,(label,key,color) in enumerate([('Earlier segmentation','previous_coverage','#94a3b8'),('Sentence segmentation','sentence_coverage','#2563eb')]):
        vals=[next(r[key] for r in rows if r['scope']=='all_six_topics' and r['threshold']=='0.7' and r['condition']==c) for c in conditions]
        bars=ax.bar([i+(j-.5)*.35 for i in range(3)],vals,width=.35,label=label,color=color)
        ax.bar_label(bars,fmt='%.1f%%',padding=3)
    ax.set_xticks(range(3),conditions)
    ax.set(ylim=(0,65),ylabel='Mean observed coverage (%)',title='Segmentation comparison at cosine similarity 0.70')
    ax.legend(); ax.spines[['top','right']].set_visible(False)
    for ext in ['png','svg']:
        fig.savefig(OUT/f'segmentation_comparison.{ext}',dpi=170)
    plt.close(fig)
    lines=['# Sentence-segmentation comparison','',
           'The same 18 responses, embedding model, complete-link clustering, and five thresholds were used. '
           'Sentence mode retains semicolons inside sentences, protects common abbreviations, and keeps table rows intact. '
           'Paragraph and list text still provides the units; not every retained fragment is a grammatical sentence. '
           'Headings remain metadata and are not embedded. No translation or new idea extraction was introduced.','',
           'Earlier mode produced 342 segments; sentence mode produces 336: English 144, code-mixed 114, Tamil 78. '
           'Six unique new combined sentences were embedded; other text reused cached vectors. The earlier mode '
           'was already mostly sentence-based, so this is primarily a semicolon-boundary sensitivity check, '
           'not a comparison against a full linguistic clause parser.','',
           '| Condition | Earlier coverage | Sentence coverage | Change (percentage points) |',
           '| --- | ---: | ---: | ---: |']
    for r in rows:
        if r['scope']=='all_six_topics' and r['threshold']=='0.7':
            lines.append(f"| {r['condition']} | {r['previous_coverage']:.1f}% | {r['sentence_coverage']:.1f}% | {r['difference_pp']:+.2f} |")
    lines+=['','![Segmentation comparison](segmentation_comparison.png)','',
            'English > code-mixed > Tamil holds for mean coverage at all five thresholds, with or without '
            'the ambiguous vapour-refining topic. Sentence mode does not resolve the embedding-matching limitations '
            'identified earlier: related or contrasting statements may merge, and equivalent translations may not. '
            'These scores remain exploratory semantic coverage, not counts of correct ideas.','',
            '[Sentence explorer](explorer.html) · [Sentence report](report.md) · '
            '[Full comparison CSV](segmentation_comparison.csv)','']
    (OUT/'comparison.md').write_text('\n'.join(lines),encoding='utf-8')


if __name__=='__main__':
    main()
