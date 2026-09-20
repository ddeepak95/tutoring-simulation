"""Local, auditable heading counts for all matched language conditions."""
import argparse
import csv
import json
import os
from pathlib import Path
from paths import EXPLANATION_ROOT

import numpy as np
from bs4 import BeautifulSoup

from heading_count_pilot import RULES as PILOT_RULES

TOPICS = ["coulomb's law", 'crystal field theory', 'electrostatic shielding',
          'lorentz force', 'optical isomerism', 'theory of relativity']
# Per answer: excluded title indices, recap indices, standalone example indices.
# One-based DOM order. Example sections remain in the primary count.
LABELS = {
    'Bengali': [([], [], []), ([], [], []), ([1], [], [2]), ([], [], []), ([], [], []), ([], [], [3])],
    'Code-mixed Bengali': [([], [], [5]), ([], [11], []), ([], [4], [3]), ([], [5], []), ([], [5], [4]), ([], [], [])],
    'Code-mixed German': [([], [], [3]), ([], [7], []), ([], [], [4]), ([], [], [4]), ([], [4], []), ([], [3], [])],
    'Code-mixed Hindi': [([], [], [3]), ([], [21], [10, 11]), ([], [4], [3]), ([], [], [2]), ([], [6, 7], []), ([], [5], [])],
    'Code-mixed Korean': [([], [5], [4]), ([], [14, 15], [9, 10, 11]), ([], [6], [5]), ([], [7], []), ([], [10, 11], []), ([], [8], [])],
    'Code-mixed Punjabi': [([], [], []), ([], [], []), ([], [3], [2]), ([], [], []), ([], [5], [4]), ([], [], [])],
    'Code-mixed Swahili': [([], [], [3]), ([], [7], []), ([], [], [2]), ([], [], [3]), ([], [], []), ([], [5], [4])],
    'Code-mixed Tamil': [([], [5], []), ([], [9], []), ([], [4], [3]), ([], [], []), ([], [5], []), ([], [8], [])],
    'German': [([], [], []), ([], [6], []), ([], [], [2]), ([], [], [2]), ([], [], []), ([], [3], [])],
    'Korean': [([], [], [3]), ([], [11], [5, 6, 7]), ([], [4], []), ([], [], []), ([], [6], []), ([], [8], [])],
    'Punjabi': [([], [], [3]), ([], [], []), ([], [], [2]), ([], [], []), ([], [], [2]), ([], [], [])],
    'Swahili': [([], [], [3]), ([], [], [4]), ([], [], [2]), ([], [], [4]), ([], [], []), ([], [], [3])],
    'Tamil': [([], [], []), ([], [], []), ([], [], [2]), ([], [], []), ([], [], []), ([], [4], [])],
}


def write_csv(path, rows):
    with path.open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=EXPLANATION_ROOT / 'outputs/all-languages-comparison-six-topics')
    parser.add_argument('--inspect', action='store_true')
    args = parser.parse_args()
    with (args.root / 'responses.csv').open(encoding='utf-8-sig') as stream:
        rows = list(csv.DictReader(stream))
    conditions = sorted({r['condition'] for r in rows})
    topics = set.intersection(*[{r['matched_topic'] for r in rows if r['condition'] == c} for c in conditions])
    assert topics == set(TOPICS), 'Frozen annotations cover only these six topics'
    rows = [r for r in rows if r['matched_topic'] in topics]
    assert len(rows) == 90 and len({(r['condition'], r['matched_topic']) for r in rows}) == 90
    out = args.root / 'heading-counts'
    out.mkdir(exist_ok=True)
    headings, counts = [], []
    for r in sorted(rows, key=lambda r: (r['condition'], r['matched_topic'])):
        source = (args.root / r['html_path']).resolve()
        answers = BeautifulSoup(source.read_text(encoding='utf-8'), 'html.parser').select('[data-message-author-role="assistant"]')
        assert len(answers) == 1
        hs = answers[0].select('h1,h2,h3,h4,h5,h6')
        if args.inspect:
            print(r['condition'], '|', r['matched_topic'])
            for i, h in enumerate(hs, 1):
                parts = []
                for sibling in h.next_siblings:
                    if getattr(sibling, 'name', None) in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
                        break
                    if hasattr(sibling, 'get_text'):
                        parts.append(sibling.get_text(' ', strip=True))
                print(str(i) + ': ' + h.get_text(' ', strip=True) + ' => ' + ' '.join(parts))
            continue
        key = r['matched_topic'], r['condition']
        if key in PILOT_RULES:
            rule = PILOT_RULES[key]
            assert len(hs) == rule['expected']
            title, recap, example = (rule[c] for c in ('title', 'recap', 'example'))
        else:
            title, recap, example = LABELS[r['condition']][TOPICS.index(r['matched_topic'])]
        annotated = title + recap + example
        assert len(set(annotated)) == len(annotated)
        assert all(1 <= i <= len(hs) for i in annotated)
        for i, h in enumerate(hs, 1):
            category = 'title' if i in title else 'recap' if i in recap else 'example' if i in example else 'content'
            headings.append(dict(condition=r['condition'], topic=r['matched_topic'], heading_index=i, html_level=h.name,
                heading=h.get_text(' ', strip=True), category=category,
                source_html=os.path.relpath(source, out).replace(os.sep, '/')))
        counts.append(dict(condition=r['condition'], topic=r['matched_topic'], raw_headings=len(hs), titles=len(title), recaps=len(recap),
            content_sections=len(hs)-len(title)-len(recap), standalone_example_headings=len(example),
            non_example_content_headings=len(hs)-len(title)-len(recap)-len(example)))
    if args.inspect:
        return
    write_csv(out / 'headings.csv', headings)
    write_csv(out / 'counts.csv', counts)
    baseline = {r['topic']: r['content_sections'] for r in counts if r['condition'] == 'English'}
    summaries = []
    for c in conditions:
        group = [r for r in counts if r['condition'] == c]
        values = [r['content_sections'] for r in group]
        q1, median, q3 = np.quantile(values, [.25, .5, .75], method='linear')
        summaries.append(dict(condition=c, answers=len(group), median_content_sections=float(median), q1=float(q1), q3=float(q3),
            iqr=float(q3-q1), total_content_sections=sum(values), median_non_example_headings=float(np.median([r['non_example_content_headings'] for r in group])),
            median_paired_difference=float(np.median([r['content_sections']-baseline[r['topic']] for r in group]))))
    write_csv(out / 'summary.csv', summaries)
    (out / 'coding_rules.json').write_text(json.dumps({'additional_labels': LABELS, 'topic_order': TOPICS,
        'pilot_rules': [dict(topic=k[0], condition=k[1], **v) for k, v in PILOT_RULES.items()]}, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = ['# Content heading counts across languages', '',
        '90 saved answers: six shared topics for each of 15 prompt conditions. All processing was local.', '',
        'Primary measure: actual h1-h6 headings inside the assistant answer, excluding introductory topic titles and recaps; standalone example headings are retained. A second measure excludes example headings too. A heading naming the topic is retained when it directly introduces substantive content (such as the formula), rather than merely titling the answer. Sections that teach octahedral splitting are content even if their heading says "example". Examples nested under a worked-example heading are marked as examples too.', '',
        'All heading levels count, including both parents and children. Bold paragraph labels are not counted. Thus these are structural heading counts, not distinct ideas or deduplicated subtopics. A zero means no retained HTML headings, not no explanatory content.', '',
        'Extraction is automatic; category labels are first-pass assistant annotations, carrying forward the English/Hindi pilot. They are not independently validated multilingual annotations. All original headings and categories are available for review in the audit CSV. Quartiles use linear interpolation; the bracketed range is Q1-Q3, not a confidence interval.', '']
    for mixed in [False, True]:
        lines += ['## ' + ('Code-mixed prompts' if mixed else 'Native prompts'), '',
            '| Condition | Median content headings [Q1, Q3] | Median excluding example headings | Median paired difference vs English |',
            '| --- | ---: | ---: | ---: |']
        for r in summaries:
            if r['condition'].startswith('Code-mixed') != mixed:
                continue
            lines.append(f"| {r['condition']} | {r['median_content_sections']:.1f} [{r['q1']:.2f}, {r['q3']:.2f}] | {r['median_non_example_headings']:.1f} | {r['median_paired_difference']:+.1f} |")
        lines.append('')
    lines += ['## Every answer', '', '| Condition | ' + ' | '.join(TOPICS) + ' |', '| --- | ' + ' | '.join(['---:'] * len(TOPICS)) + ' |']
    lookup = {(r['condition'], r['topic']): r['content_sections'] for r in counts}
    for c in conditions:
        lines.append('| ' + c + ' | ' + ' | '.join(str(lookup[c, t]) for t in TOPICS) + ' |')
    lines += ['', 'These descriptive comparisons do not establish significance. More headings can reflect finer formatting granularity, rather than more content.', '',
        'Content-review flag: the native Bengali response assigned to electrostatic shielding explains conservation of electric charge instead. Its headings are retained here because this is a structural count of the generated answer, not a measure of on-topic coverage. This mismatch also limits interpretation of earlier length and semantic comparisons for that topic.', '',
        '[Heading audit](headings.csv) | [Answer counts](counts.csv) | [Summary](summary.csv) | [Coding rules](coding_rules.json)', '']
    (out / 'report.md').write_text('\n'.join(lines), encoding='utf-8')
    print('\n'.join(lines))


if __name__ == '__main__':
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    main()
