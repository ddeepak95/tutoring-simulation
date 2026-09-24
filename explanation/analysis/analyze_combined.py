"""Combine the two saved experiments using assistant-only HTML measurements."""
import argparse
import csv
import itertools
import json
import os
from pathlib import Path

from bs4 import BeautifulSoup

from analyze_html import answer_metrics
from analysis_statistics import holm, omnibus, paired

CONDITIONS = ['English', 'Code-mixed Tamil', 'Tamil']
ALIASES = {
    'கூலும் விதி': "coulomb's law",
    'ஆவி நிலைமை முறைகள்': 'vapour phase refining',
    'படிக புலக் கொள்கை': 'crystal field theory',
    'ஒளிசுழற்சி மாற்றியம்': 'optical isomerism',
    'நிலைமின் தடுப்புறை': 'electrostatic shielding',
    'லாரன்சு விசை': 'lorentz force',
}
METRICS = ['answer_images', 'answer_words', 'seconds_per_100_words']


def tests(rows):
    topics = list(dict.fromkeys(r['matched_topic'] for r in rows))
    lookup = {(r['matched_topic'], r['condition']): r for r in rows}
    if len(lookup) != len(rows) or len(rows) != 3 * len(topics):
        raise ValueError('Expected unique complete three-condition topic blocks')
    overall, pairwise = [], []
    for metric in METRICS:
        blocks = [[lookup[topic, c][metric] for c in CONDITIONS] for topic in topics]
        overall.append(dict(metric=metric, n_topics=len(topics), p=omnibus(blocks)))
        for a, b in itertools.combinations(range(3), 2):
            pairwise.append(dict(metric=metric, comparison=f'{CONDITIONS[a]} vs {CONDITIONS[b]}', p=paired(blocks, a, b)))
    for group in [overall, pairwise]:
        for row, adjusted in zip(group, holm([r['p'] for r in group])):
            row['holm_p'] = adjusted
    return dict(overall=overall, pairwise=pairwise)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('run_folders', nargs='+', type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    out = args.output.resolve()
    rows, cleaned, manifests = [], {}, []
    conversations = set()
    for root in map(Path.resolve, args.run_folders):
        manifest = json.loads((root / 'manifest.json').read_text(encoding='utf-8'))
        manifests.append(dict(folder=str(root), manifest=manifest))
        for path in sorted(root.glob('web-*/result.json')):
            data = json.loads(path.read_text(encoding='utf-8'))
            if data['status'] != 'completed':
                raise ValueError(f'Incomplete result: {path}')
            url = data.get('conversation_url')
            if url and url in conversations:
                raise ValueError(f'Duplicate conversation: {url}')
            conversations.add(url)
            html_path = path.with_name('conversation.html')
            html = html_path.read_text(encoding='utf-8')
            soup = BeautifulSoup(html, 'html.parser')
            answer = soup.select('[data-message-author-role="assistant"]')[-1]
            images, words, text = answer_metrics(html)
            job = data['job']
            condition = 'English' if job['lang_id'] == 'en' else 'Code-mixed Tamil' if job['prompt_type'] == 'code-mixed' else 'Tamil'
            topic = ALIASES.get(job['topic'], job['topic'])
            seconds = data['timing']['generation_seconds']
            clarification = topic == 'vapour phase refining' and condition == 'Tamil'
            row = dict(experiment=root.name, job_id=job['job_id'], matched_topic=topic,
                       original_topic=job['topic'], condition=condition,
                       answer_images=images, answer_words=words, generation_seconds=seconds,
                       seconds_per_word=seconds / words, seconds_per_100_words=100 * seconds / words,
                       clarification_response=clarification,
                       interactive_math_widgets=len(answer.select('[data-testid="math-block-layout"]')),
                       citation_pills=len(answer.select('[data-testid="webpage-citation-pill"]')),
                       image_limit_notice='Files, images, and data analysis are unavailable until' in soup.get_text(' ', strip=True),
                       html_path=os.path.relpath(html_path, out).replace(os.sep, '/'))
            rows.append(row)
            cleaned[f'{root.name}/{job["job_id"]}'] = text
    if any(m['manifest']['prompt_structure'] != manifests[0]['manifest']['prompt_structure'] for m in manifests):
        raise ValueError('Prompt templates differ between experiments')
    full = tests(rows)
    sensitivity = tests([r for r in rows if r['matched_topic'] != 'vapour phase refining'])
    out.mkdir(parents=True, exist_ok=True)
    with (out / 'responses.csv').open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=rows[0])
        writer.writeheader()
        writer.writerows(rows)
    (out / 'extracted_text.json').write_text(json.dumps(cleaned, ensure_ascii=False, indent=2), encoding='utf-8')
    (out / 'statistics.json').write_text(json.dumps(dict(all_topics=full, excluding_vapour_topic=sensitivity), indent=2), encoding='utf-8')
    (out / 'input_manifests.json').write_text(json.dumps(manifests, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = ['# Combined analysis: my-experiment-01 and my-experiment-02', '',
             f'{len(rows)} completed responses across six matched topics and three conditions. '
             'The first experiment adds Coulomb’s law and vapour phase refining to the four topics '
             'in the second. Topic sets do not overlap, and conversation URLs are distinct. '
             'Saved prompt templates match. Records use free-direct website settings, automatic '
             'search selection, and default model/reasoning behavior.', '',
             '**Measurement method.** Use only the assistant-message element from each saved HTML file. '
             'Count source-bearing image elements, excluding citation favicons and explicitly hidden images. '
             'Ads outside the answer do not count. Interactive equation widgets, SVGs, and unsaved carousel '
             'slides are not image elements and are not counted as illustrations. Widget and citation counts '
             'are retained separately in the CSV.', '',
             'A word is a whitespace-delimited unit containing at least one Unicode letter. '
             'Headings, lists, and table prose count; equations, interactive equation widgets, citation pills, '
             'buttons, code/diagrams, image alt text, hidden content, and standalone numbers/symbols do not. '
             'Inline markup does not split words. This operational count does not equate information across '
             'languages. All 18 HTML files were measured with the same extractor; experiment-02 counts '
             'are unchanged by the added citation/widget exclusions.', '',
             'Seconds per 100 words = 100 × recorded generation seconds / answer words. Times include '
             'the three-second completion check and may include search/widget/image activity, but exclude '
             'capture and inter-job delays. They are not pure prose-generation speeds.', '',
             '**Combined descriptive results**', '',
             '| Condition | Responses | Images | Words | Total generation seconds | Pooled seconds / 100 words |',
             '| --- | ---: | ---: | ---: | ---: | ---: |']
    for condition in CONDITIONS:
        group = [r for r in rows if r['condition'] == condition]
        words = sum(r['answer_words'] for r in group)
        time = sum(r['generation_seconds'] for r in group)
        lines.append(f"| {condition} | {len(group)} | {sum(r['answer_images'] for r in group)} | {words} | {time:.3f} | {100*time/words:.3f} |")
    lines += ['', 'Pooled rates divide total time by total words, rather than averaging per-answer rates.', '',
              '**A non-equivalent response is retained and flagged.** The Tamil vapour-refining prompt '
              '`ஆவி நிலைமை முறைகள் பற்றி விளக்கவும்` produced a clarification question about spiritual, '
              'meditative, or literary meanings rather than a chemistry explanation. It belongs in the '
              'full dataset as an observed response, but is not comparable chemistry content. The '
              'sensitivity analysis excludes the whole three-condition vapour-refining topic to preserve '
              'matched blocks. The translation should be reviewed before repeating this topic.', '',
              '**Overall exact tests**', '',
              '| Dataset | Metric | Raw p | Holm-adjusted p | Significant at 0.05? |',
              '| --- | --- | ---: | ---: | --- |']
    for name, result in [('All six topics', full), ('Five topics; vapour excluded', sensitivity)]:
        for r in result['overall']:
            lines.append(f"| {name} | {r['metric']} | {r['p']:.6f} | {r['holm_p']:.6f} | {'Yes' if r['holm_p'] < .05 else 'No'} |")
    lines += ['', 'Exact Friedman-rank permutation tests match conditions within topics, using all '
              '6^6 = 46,656 label permutations for the full dataset and 6^5 = 7,776 for the sensitivity '
              'dataset. Tied-rank multiplicities are retained. Holm correction covers three metrics '
              'within each dataset. Sensitivity results are a robustness check, not another independent discovery.', '',
              '**Pairwise exact tests**', '',
              '| Dataset | Metric | Comparison | Raw p | Holm-adjusted p |',
              '| --- | --- | --- | ---: | ---: |']
    for name, result in [('All six topics', full), ('Five topics; vapour excluded', sensitivity)]:
        for r in result['pairwise']:
            lines.append(f"| {name} | {r['metric']} | {r['comparison']} | {r['p']:.6f} | {r['holm_p']:.6f} |")
    lines += ['', 'Pairwise tests enumerate sign flips of topic-paired differences, using the absolute '
              'mean difference. Holm correction covers all nine pairwise comparisons within each dataset. '
              'The minimum two-sided p-value is 0.03125 with six pairs and 0.0625 with five. '
              'No pairwise comparison survives that correction.', '',
              '**Limits.** These are exploratory conditional tests: fixed condition order, selected '
              'topics, only one answer per cell, changing quota state, and different collection batches '
              'prevent a causal interpretation. Blocking by topic also holds its experiment batch fixed, '
              'but cannot remove within-batch order effects. Time-per-word depends mathematically on '
              'word count. Non-significance does not establish equality. The first experiment also '
              'contains interactive Coulomb widgets in all three conditions and source citation pills '
              'in the code-mixed Coulomb answer; the earlier no-citations finding applied only to experiment-02.', '',
              '**Per-response results**', '',
              '| Experiment | Answer | Topic | Condition | Images | Words | Time (s) | Seconds / 100 words |',
              '| --- | --- | --- | --- | ---: | ---: | ---: | ---: |']
    for r in rows:
        label = '-'.join(r['job_id'].split('-')[:2])
        lines.append(f"| {r['experiment']} | [{label}]({r['html_path']}) | {r['matched_topic']} | {r['condition']} | {r['answer_images']} | {r['answer_words']} | {r['generation_seconds']:.3f} | {r['seconds_per_100_words']:.3f} |")
    lines += ['', 'Audit files: [CSV](responses.csv), [extracted prose](extracted_text.json), '
              '[exact statistics](statistics.json), [source manifests](input_manifests.json). '
              'Original captures and previous reports are preserved.', '', 'Reproduce from the repository root:', '',
              '```powershell', '.venv\\Scripts\\python.exe explanation/analysis/analyze_combined.py explanation/outputs/my-experiment-01 explanation/outputs/my-experiment-02 --output explanation/outputs/combined-experiments-01-02', '```', '']
    (out / 'report.md').write_text('\n'.join(lines), encoding='utf-8')
    print('\n'.join(lines[:50]))


if __name__ == '__main__':
    main()
