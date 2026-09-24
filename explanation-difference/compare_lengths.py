"""Offline length comparison for the three conditions in the multiple-topic batch."""
import argparse
import csv
import json
import statistics
import unicodedata
from collections import defaultdict
from pathlib import Path

import regex

CONDITIONS = {1: 'A: English to English', 2: 'B: Tamil to Tamil', 3: 'C: English to Tamil'}
METRICS = ['word_units', 'characters', 'graphemes', 'output_tokens']


def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def save_csv(path, rows):
    with path.open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--batch', type=Path, default=Path(__file__).parent / 'outputs/multiple')
    args = parser.parse_args()
    rows = []
    for folder in sorted(args.batch.iterdir()):
        if not folder.is_dir() or not (folder / 'manifest.json').exists():
            continue
        for job in read(folder / 'manifest.json')['jobs']:
            result = read(folder / (job['job_id'] + '.json'))
            if result['status'] != 'completed' or result['job'] != job:
                raise ValueError(f"Incomplete or mismatched result: {job['job_id']}")
            text = unicodedata.normalize('NFC', result['text'])
            rows.append(dict(topic_id=job['topic_id'], topic=job['topic_name'], model=job['model'],
                             condition=CONDITIONS[job['run_index']], run_index=job['run_index'],
                             job_id=job['job_id'],
                             word_units=sum(any(c.isalnum() for c in unit) for unit in text.split()),
                             characters=len(text),
                             graphemes=sum(not g.isspace() for g in regex.findall(r'\X', text)),
                             output_tokens=(result.get('usage') or {}).get('output_tokens')))
    if not rows:
        raise ValueError('No completed topic results found')
    groups = defaultdict(list)
    pairs = defaultdict(dict)
    for row in rows:
        groups[row['model'], row['condition']].append(row)
        key = (row['model'], row['topic_id'])
        if row['run_index'] in pairs[key]:
            raise ValueError(f'Duplicate condition for {key}')
        pairs[key][row['run_index']] = row
    if any(set(pair) != {1, 2, 3} for pair in pairs.values()):
        raise ValueError('Every model/topic must have exactly three conditions')
    summaries = []
    for (model, condition), group in groups.items():
        record = dict(model=model, condition=condition, n=len(group))
        for metric in METRICS:
            values = [r[metric] for r in group if r[metric] is not None]
            for name, func in [('mean', statistics.mean), ('median', statistics.median), ('min', min), ('max', max)]:
                record[f'{metric}_{name}'] = round(func(values), 2) if values else None
        summaries.append(record)
    differences = []
    for (model, topic), pair in pairs.items():
        for label, target, baseline in [('B-A', 2, 1), ('C-A', 3, 1), ('B-C', 2, 3)]:
            record = dict(model=model, topic_id=topic, comparison=label)
            for metric in METRICS:
                a, b = pair[target][metric], pair[baseline][metric]
                record[f'{metric}_delta'] = a - b if a is not None and b is not None else None
                record[f'{metric}_percent'] = round(100 * (a / b - 1), 2) if a is not None and b else None
            differences.append(record)
    output = args.batch / 'length_comparison'
    output.mkdir(exist_ok=True)
    save_csv(output / 'response_lengths.csv', rows)
    save_csv(output / 'model_summary.csv', summaries)
    save_csv(output / 'paired_differences.csv', differences)

    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    models = list(dict.fromkeys(row['model'] for row in rows))
    fig, axes = plt.subplots(1, 3, figsize=(15, 5), sharey=True)
    colors = ['#2563eb', '#0d9488', '#d97706']
    for ax, (index, condition), color in zip(axes, CONDITIONS.items(), colors):
        for y, model in enumerate(models):
            values = [r['word_units'] for r in groups[model, condition]]
            ax.barh(y, statistics.mean(values), color=color, alpha=.55)
            ax.scatter(values, [y] * len(values), s=24, color='#172554', zorder=3)
        ax.set_title(condition)
        ax.set_yticks(range(len(models)), models)
        ax.set_xlabel('Whitespace word units')
        ax.grid(axis='x', alpha=.2)
    maximum = max(row['word_units'] for row in rows) * 1.08
    for ax in axes:
        ax.set_xlim(0, maximum)
    axes[0].invert_yaxis()
    fig.suptitle('Response length by model and prompt condition\nBars: topic means; dots: individual topics')
    fig.tight_layout()
    fig.savefig(output / 'word_lengths.png', dpi=180)
    fig.savefig(output / 'word_lengths.svg')
    plt.close(fig)

    lines = ['# Length comparison', '', f'{len(rows)} responses; {len(pairs)} matched model/topic groups.', '',
             'A = English prompt / English output; B = Tamil prompt / Tamil output; C = English prompt / Tamil output.', '',
             '## Mean word units per response', '', '| Model | A | B | C | B vs C |', '|---|---:|---:|---:|---:|']
    for model in models:
        means = [statistics.mean(r['word_units'] for r in groups[model, c]) for c in CONDITIONS.values()]
        paired = [r['word_units_percent'] for r in differences if r['model'] == model and r['comparison'] == 'B-C']
        lines.append(f'| {model} | {means[0]:.1f} | {means[1]:.1f} | {means[2]:.1f} | {statistics.mean(paired):+.1f}% |')
    lines += ['', 'B vs C is the mean of topic-matched percentage changes, using C as the denominator.', '',
              '![Word lengths](word_lengths.png)', '', '## Measurement definitions and limits', '',
              '- Word units: whitespace-separated units containing at least one Unicode letter or number. Standalone Markdown separators and symbols are excluded. This is a reproducible length proxy, not linguistic word segmentation.',
              '- Characters: Unicode code points after NFC normalization, including spaces and Markdown.',
              '- Graphemes: non-whitespace Unicode extended grapheme clusters after NFC normalization; a better approximation of displayed characters than code points for Tamil.',
              '- Response Markdown, equations, headings, and tables are retained. LaTeX commands and formatting can affect counts; these are source-text length measures, not rendered prose counts.',
              '- Output tokens are provider-reported usage and may include reasoning tokens; they are not a comparable visible-length metric across providers or languages.',
              '- B versus C keeps the requested output language Tamil and is the most direct prompt-language comparison. A versus B/C also changes output language and its morphology.',
              '- Four topics and one generation per condition provide descriptive results only. Length does not establish accuracy, coverage, or teaching quality.', '',
              '## Data', '', '[Per-response measurements](response_lengths.csv) · [Model summaries](model_summary.csv) · [Topic-matched differences](paired_differences.csv)', '']
    (output / 'report.md').write_text('\n'.join(lines), encoding='utf-8')
    print('\n'.join(lines[:13]))
    print(f'Output: {output}')


if __name__ == '__main__':
    main()
