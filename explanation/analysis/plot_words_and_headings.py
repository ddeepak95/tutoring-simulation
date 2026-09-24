"""Box plots of matched-topic word and content-heading counts."""
import argparse
import csv
from pathlib import Path
from paths import EXPLANATION_ROOT

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D
import numpy as np


def read(path):
    with path.open(encoding='utf-8-sig', newline='') as stream:
        return list(csv.DictReader(stream))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=EXPLANATION_ROOT / 'outputs/all-languages-comparison-six-topics')
    scope = parser.add_mutually_exclusive_group()
    scope.add_argument('--words-only', action='store_true', help='Update only the standalone word-count plot')
    scope.add_argument('--combined-only', action='store_true', help='Update only the combined plot')
    parser.add_argument('--hide-topic-dots', action='store_true')
    parser.add_argument('--english-median', action='store_true', help='Add an English median reference line')
    args = parser.parse_args()
    words = read(args.root / 'word-count-medians/paired_counts.csv')
    headings = read(args.root / 'heading-counts/counts.csv')
    lookup = {(r['condition'], r['topic']): int(r['content_sections']) for r in headings}
    assert len(lookup) == len(headings) == len(words) == 90
    assert set(lookup) == {(r['condition'], r['topic']) for r in words}
    combined = [dict(condition=r['condition'], topic=r['topic'], words=int(r['words']),
                     content_headings=lookup[r['condition'], r['topic']]) for r in words]
    languages = ['English', 'Bengali', 'German', 'Hindi', 'Korean', 'Punjabi', 'Swahili', 'Tamil']
    topics = sorted({r['topic'] for r in combined})
    assert len(topics) == 6
    out = args.root / 'boxplots'
    out.mkdir(exist_ok=True)
    if not (args.words_only or args.combined_only):
        with (out / 'plotted_data.csv').open('w', encoding='utf-8-sig', newline='') as stream:
            writer = csv.DictWriter(stream, fieldnames=list(combined[0]))
            writer.writeheader()
            writer.writerows(combined)
    colors = ['#286caa', '#c16a28']

    def panel(ax, key, title):
        for i, language in enumerate(languages):
            for mixed, offset, color in [(False, -.19, colors[0]), (True, .19, colors[1])]:
                if language == 'English' and mixed:
                    continue
                condition = ('Code-mixed ' if mixed else '') + language
                group = sorted([r for r in combined if r['condition'] == condition], key=lambda r: r['topic'])
                assert len(group) == 6
                values = [r[key] for r in group]
                position = i + (0 if language == 'English' else offset)
                ax.boxplot([values], positions=[position], widths=.30, patch_artist=True,
                    whis=1.5, showfliers=False, manage_ticks=False,
                    boxprops=dict(facecolor=color, edgecolor=color, alpha=.28),
                    medianprops=dict(color=color, linewidth=2),
                    whiskerprops=dict(color=color), capprops=dict(color=color))
                # Every observation is shown, including observations beyond whiskers.
                if not args.hide_topic_dots:
                    ax.scatter(position + np.linspace(-.095, .095, 6), values,
                               color=color, s=23, alpha=.85, zorder=3)
        if args.english_median:
            baseline = float(np.median([r[key] for r in combined if r['condition'] == 'English']))
            ax.axhline(baseline, color='#555555', linestyle='--', linewidth=1.6, zorder=2)
        ax.set_xticks(range(len(languages)), languages, rotation=25, ha='right')
        ax.set_xlim(-.6, len(languages)-.4)
        ax.set_ylim(bottom=0)
        ax.set_ylabel(title)
        ax.set_title(title, loc='left', fontweight='bold')
        ax.grid(axis='y', alpha=.2)
        ax.set_axisbelow(True)
        ax.spines[['top', 'right']].set_visible(False)

    legend = [Patch(facecolor=c, edgecolor=c, alpha=.4, label=label)
              for c, label in zip(colors, ['Native prompt / English', 'Code-mixed prompt'])]
    if not args.hide_topic_dots:
        legend.append(Line2D([], [], linestyle='', marker='o', color='#555555', label='Individual topic'))
    if args.english_median:
        baseline = float(np.median([r['words'] for r in combined if r['condition'] == 'English']))
        legend.append(Line2D([], [], linestyle='--', color='#555555', linewidth=1.6,
                             label=f'English median: {baseline:g} words' if args.words_only else 'English median'))

    def save(fig, name):
        for extension in ['png', 'svg', 'pdf']:
            fig.savefig(out / f'{name}.{extension}', dpi=180, bbox_inches='tight')
        plt.close(fig)

    if args.words_only:
        fig, ax = plt.subplots(figsize=(12, 5.5))
        panel(ax, 'words', 'Words per answer')
        fig.legend(handles=legend, loc='upper center', ncol=len(legend), frameon=False)
        if args.hide_topic_dots:
            fig.text(.5, .012, 'Six topics per condition. Boxes: Q1–Q3; line: median; whiskers: 1.5 × IQR. Individual observations and outlier markers omitted.',
                     ha='center', fontsize=8)
        fig.tight_layout(rect=[0, .045, 1, .91])
        save(fig, 'words')
        print(f'Saved word-count PNG/SVG/PDF plots to {out}')
        return

    fig, axes = plt.subplots(2, 1, figsize=(12, 10))
    panel(axes[0], 'words', 'Words per answer')
    panel(axes[1], 'content_headings', 'Content headings per answer')
    fig.suptitle('Explanation length and organization across languages\nSix matched topics per prompt condition', fontsize=15, y=.99)
    fig.legend(handles=legend, loc='upper center', bbox_to_anchor=(.5, .932), ncol=3, frameon=False)
    observations = 'Individual observations and outlier markers omitted.' if args.hide_topic_dots else 'Dots include all six answers.'
    baseline_note = ''
    if args.english_median:
        heading_median = float(np.median([r['content_headings'] for r in combined if r['condition'] == 'English']))
        baseline_note = f'\nEnglish medians: {baseline:g} words; {heading_median:g} content headings.'
    fig.text(.5, .012, 'Boxes: Q1–Q3; line: median; whiskers: observations within 1.5 × IQR. ' + observations + '\nHeadings exclude titles and recaps; include example sections and nested headings.' + baseline_note, ha='center', fontsize=9)
    fig.tight_layout(rect=[0, .055, 1, .90], h_pad=2)
    save(fig, 'words_and_headings')
    if args.combined_only:
        print(f'Saved combined PNG/SVG/PDF plots to {out}')
        return
    for key, title in [('words', 'Words per answer'), ('content_headings', 'Content headings per answer')]:
        fig, ax = plt.subplots(figsize=(12, 5.5))
        panel(ax, key, title)
        fig.legend(handles=legend, loc='upper center', ncol=3, frameon=False)
        fig.tight_layout(rect=[0, 0, 1, .91])
        save(fig, key)
    (out / 'README.md').write_text('\n'.join([
        '# Word counts and content-heading box plots', '',
        'The same six matched topics, 90 answers, and 15 prompt conditions are used for both plots. Each box summarizes six answers; native and code-mixed conditions are separate. English has only the native baseline.', '',
        '![Word counts and content-heading counts](words_and_headings.png)', '',
        'Boxes show linearly interpolated Q1 and Q3; the central line is the median. Whiskers extend to the most extreme observed values within 1.5 times the IQR of the box. All observations, including those beyond the whiskers, are drawn as dots. Horizontal dot offsets only prevent overlap and have no analytical meaning.', '',
        'Content headings exclude titles and recaps, but include example headings and all nested heading levels. Counts reflect formatting, not distinct ideas. Categories are first-pass assistant annotations. Word counts use the existing whitespace-based extraction and are not language-neutral measures of information.', '',
        'The native Bengali response assigned to electrostatic shielding discusses conservation of charge; it remains included as in the earlier descriptive tables. No significance is inferred from these plots.', '',
        '[Combined PDF](words_and_headings.pdf) | [Combined SVG](words_and_headings.svg) | [Word-count plot](words.png) | [Heading-count plot](content_headings.png) | [Plotted data](plotted_data.csv)', '',
    ]), encoding='utf-8')
    print(f'Saved combined and individual PNG/SVG/PDF plots to {out}')


if __name__ == '__main__':
    main()
