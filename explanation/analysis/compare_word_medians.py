"""Robust word-count summaries on the intersection of available topics."""
import argparse
import csv
from pathlib import Path
from paths import EXPLANATION_ROOT

import numpy as np


def write_csv(path, rows):
    with path.open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=EXPLANATION_ROOT / 'outputs/all-languages-comparison-six-topics')
    args = parser.parse_args()
    with (args.root / 'responses.csv').open(encoding='utf-8-sig', newline='') as stream:
        rows = list(csv.DictReader(stream))
    conditions = sorted({r['condition'] for r in rows})
    topics = sorted(set.intersection(*[{r['matched_topic'] for r in rows if r['condition'] == c} for c in conditions]))
    if not topics or 'English' not in conditions:
        raise ValueError('Need shared topics and an English baseline')
    cells = {}
    for r in rows:
        if r['matched_topic'] not in topics:
            continue
        key = (r['condition'], r['matched_topic'])
        if key in cells:
            raise ValueError(f'Duplicate condition/topic: {key}')
        cells[key] = int(r['answer_words'])
    baseline = np.array([cells['English', t] for t in topics])
    summaries, paired = [], []
    order = ['English'] + [c for c in conditions if c != 'English' and not c.startswith('Code-mixed')] + [c for c in conditions if c.startswith('Code-mixed')]
    for condition in order:
        counts = np.array([cells[condition, t] for t in topics])
        differences = counts - baseline
        q1, med, q3 = np.quantile(counts, [.25, .5, .75], method='linear')
        summaries.append(dict(condition=condition, topics=len(topics), median_words=float(med), q1=float(q1), q3=float(q3), iqr=float(q3-q1), mean_words=float(counts.mean()), median_paired_difference=float(np.median(differences)), shorter_than_english=int((differences < 0).sum()), same_as_english=int((differences == 0).sum()), longer_than_english=int((differences > 0).sum())))
        paired.extend(dict(condition=condition, topic=t, words=int(w), english_words=int(e), difference=int(w-e)) for t, w, e in zip(topics, counts, baseline))
    out = args.root / 'word-count-medians'
    out.mkdir(exist_ok=True)
    write_csv(out / 'summary.csv', summaries)
    write_csv(out / 'paired_counts.csv', paired)
    lines = ['# Median word counts across languages', '', f'Each condition includes the same {len(topics)} topics ({len(cells)} answers). English is the baseline; native and code-mixed prompts are kept separate.', '', 'Topics: ' + '; '.join(topics) + '.', '', 'Counts reuse the assistant-only HTML extraction in `../responses.csv`: whitespace units containing letters, excluding equations, code and interface controls. These counts are not language-neutral measures of information or explanation quality.', '', 'Quartiles use linear interpolation (NumPy method="linear"). Brackets show Q1 to Q3, not a confidence interval. IQR = Q3 - Q1. Paired differences are calculated within each topic before taking their median; this is not the difference between the two language medians.', '']
    for title, mixed in [('Native language prompts', False), ('Code-mixed prompts', True)]:
        lines += ['## ' + title, '', '| Condition | Median words [Q1, Q3] | IQR | Mean words | Median paired difference vs English | Shorter than English |', '| --- | ---: | ---: | ---: | ---: | ---: |']
        for r in summaries:
            if r['condition'].startswith('Code-mixed') != mixed:
                continue
            delta = '-' if r['condition'] == 'English' else f"{r['median_paired_difference']:+.1f}"
            shorter = '-' if r['condition'] == 'English' else f"{r['shorter_than_english']}/{len(topics)}"
            lines.append(f"| {r['condition']} | {r['median_words']:.1f} [{r['q1']:.1f}, {r['q3']:.1f}] | {r['iqr']:.1f} | {r['mean_words']:.1f} | {delta} | {shorter} |")
        lines.append('')
    lines += ['![Individual topics, median and interquartile range](word_counts.png)', '', 'Points show every topic, thick lines show Q1 to Q3, and diamonds show medians. The six topic values are a small descriptive sample; these summaries do not establish statistical significance or remove account, execution-order, or quota effects.', '', '[Summary CSV](summary.csv) | [Every matched topic and difference](paired_counts.csv)', '']
    (out / 'report.md').write_text('\n'.join(lines), encoding='utf-8')
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(11, 9))
    for i, r in enumerate(summaries):
        color = '#bb6424' if r['condition'].startswith('Code-mixed') else '#22659c'
        values = [cells[r['condition'], t] for t in topics]
        ax.plot([r['q1'], r['q3']], [i, i], linewidth=7, color=color, alpha=.3)
        ax.scatter(values, i + np.linspace(-.15, .15, len(topics)), s=22, color=color)
        ax.scatter([r['median_words']], [i], marker='D', s=55, color=color)
    ax.set_yticks(range(len(order)), order)
    ax.invert_yaxis()
    ax.set_xlabel('Counted words per answer')
    ax.set_title(f'Word counts across {len(topics)} shared topics\nDots: individual topics; diamond: median; thick line: Q1 to Q3')
    ax.grid(axis='x', alpha=.2)
    fig.tight_layout()
    for extension in ['png', 'svg']:
        fig.savefig(out / f'word_counts.{extension}', dpi=160)
    plt.close(fig)
    print('\n'.join(lines))


if __name__ == '__main__':
    main()
