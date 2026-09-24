"""Render only pooled cluster coverage from saved semantic summaries; no API calls."""
import argparse
import csv
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D

from paths import DEFAULT_ANALYSIS


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=DEFAULT_ANALYSIS / 'semantic')
    parser.add_argument('--name', default='cluster_coverage')
    args = parser.parse_args()
    with (args.root / 'summary.csv').open(encoding='utf-8-sig', newline='') as stream:
        rows = [r for r in csv.DictReader(stream) if float(r['threshold']) == .7]
    conditions = [r['condition'] for r in rows]
    if len(set(conditions)) != len(rows) or not rows:
        raise ValueError('Expected one summary per condition at threshold 0.70')
    values = [float(r['mean_coverage_percent']) for r in rows]
    english = float(next(r['mean_coverage_percent'] for r in rows if r['condition'] == 'English'))
    fig, ax = plt.subplots(figsize=(9, 8))
    ax.barh(conditions, values, color=['#d77b29' if c.startswith('Code-mixed ') else '#286caa' for c in conditions])
    for i, value in enumerate(values):
        ax.text(value + .12, i, f'{value:.1f}', va='center', fontsize=9)
    ax.invert_yaxis()
    ax.axvline(english, color='#555555', linestyle='--', linewidth=1.6)
    ax.set_xlim(0, max(values) * 1.14)
    ax.set_xlabel('Mean pooled cluster coverage (%)')
    ax.set_title('Pooled cluster coverage\nCosine similarity threshold: 0.70', fontsize=13, pad=14)
    ax.grid(axis='x', alpha=.18)
    ax.set_axisbelow(True)
    ax.spines[['top', 'right']].set_visible(False)
    fig.legend(handles=[Patch(facecolor='#286caa', label='Native prompt / English'),
                        Patch(facecolor='#d77b29', label='Code-mixed prompt'),
                        Line2D([], [], color='#555555', linestyle='--', linewidth=1.6,
                               label=f'English baseline: {english:.2f}%')],
               loc='lower center', bbox_to_anchor=(.5, .035), ncol=3, frameon=False, fontsize=9)
    fig.text(.5, .012, 'Percentages averaged equally across six topics; clusters pooled across all 15 conditions.',
             ha='center', fontsize=8)
    fig.tight_layout(rect=[0, .075, 1, 1])
    for extension in ['png', 'svg', 'pdf']:
        fig.savefig(args.root / f'{args.name}.{extension}', dpi=180, bbox_inches='tight')
    plt.close(fig)
    print(f'Saved coverage-only chart for {len(rows)} conditions to {args.root / args.name}')


if __name__ == '__main__':
    main()
