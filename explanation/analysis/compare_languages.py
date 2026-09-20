"""Compare saved website answers locally, with matched-topic summaries."""
import argparse
import csv
import hashlib
import json
import os
from collections import Counter
from pathlib import Path
from statistics import mean, median

from analyze_html import answer_metrics


def write_csv(path, rows):
    if not rows:
        return
    with path.open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def topic_map(manifest):
    """Preserve intended translations from the frozen experiment design."""
    design = manifest['run_set']
    canonical = design['defaults']['topics']
    mapping = {}
    for run in design['runs']:
        topics = run.get('topics', canonical)
        if len(topics) != len(canonical):
            raise ValueError('Topic arrays must be aligned; supply an explicit mapping otherwise')
        for original, matched in zip(topics, canonical):
            key = (run['lang_id'], original)
            if key in mapping and mapping[key] != matched:
                raise ValueError(f'Ambiguous topic mapping: {key}')
            mapping[key] = matched
    return mapping


def summarize(rows, conditions, scope):
    output = []
    for condition in conditions:
        group = [r for r in rows if r['condition'] == condition]
        timed = [r for r in group if r['generation_seconds'] is not None]
        output.append(dict(scope=scope, condition=condition, answers=len(group),
            mean_words=mean(r['answer_words'] for r in group),
            median_words=median(r['answer_words'] for r in group),
            total_images=sum(r['answer_images'] for r in group),
            mean_images=mean(r['answer_images'] for r in group),
            answers_with_images=sum(r['answer_images'] > 0 for r in group),
            timed_answers=len(timed),
            mean_generation_seconds=mean(r['generation_seconds'] for r in timed) if timed else None,
            pooled_seconds_per_100_words=(100 * sum(r['generation_seconds'] for r in timed)
                / sum(r['answer_words'] for r in timed)) if timed and sum(r['answer_words'] for r in timed) else None))
    return output


def table(rows):
    lines = ['| Prompt condition | Answers | Mean words | Images (total) | Timed answers | Mean time (s) | Seconds / 100 words |',
             '| --- | ---: | ---: | ---: | ---: | ---: | ---: |']
    for r in rows:
        seconds = 'NA' if r['mean_generation_seconds'] is None else f"{r['mean_generation_seconds']:.2f}"
        rate = 'NA' if r['pooled_seconds_per_100_words'] is None else f"{r['pooled_seconds_per_100_words']:.2f}"
        lines.append(f"| {r['condition']} | {r['answers']} | {r['mean_words']:.1f} | {r['total_images']} | {r['timed_answers']} | {seconds} | {rate} |")
    return lines


def plot(out, rows, summary, conditions, topics):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import numpy as np
    fig, axes = plt.subplots(1, 2, figsize=(13, 8), sharey=True)
    colors = ['#d77b29' if 'Code-mixed' in c else '#286caa' for c in conditions]
    for ax, key, title in zip(axes, ['mean_words', 'mean_images'],
                             ['Mean counted words per answer', 'Mean image elements per answer']):
        values = [r[key] for r in summary]
        ax.barh(conditions, values, color=colors)
        for i, value in enumerate(values):
            ax.text(value, i, f' {value:.1f}', va='center', fontsize=9)
        ax.set_xlim(0, max(values) * 1.2 if max(values) else 1)
        ax.set_title(title)
    axes[0].invert_yaxis()
    fig.suptitle(f'All languages: {len(topics)} matched topics per condition\nBlue: native/English prompt; orange: code-mixed prompt')
    fig.tight_layout()
    for extension in ['png', 'svg']:
        fig.savefig(out / f'language_comparison.{extension}', dpi=160, bbox_inches='tight')
    plt.close(fig)
    values = np.array([[next(r['answer_words'] for r in rows if r['condition'] == c and r['matched_topic'] == t)
                        for t in topics] for c in conditions])
    fig, ax = plt.subplots(figsize=(11, 9))
    im = ax.imshow(values, cmap='YlGnBu', aspect='auto')
    ax.set_yticks(range(len(conditions)), conditions)
    ax.set_xticks(range(len(topics)), topics, rotation=25, ha='right')
    for i in range(len(conditions)):
        for j in range(len(topics)):
            ax.text(j, i, str(values[i, j]), ha='center', va='center',
                    color='white' if values[i, j] > values.max() * .6 else 'black')
    ax.set_title('Counted words by topic and prompt condition')
    fig.colorbar(im, ax=ax, label='Whitespace units containing letters')
    fig.tight_layout()
    for extension in ['png', 'svg']:
        fig.savefig(out / f'topic_words.{extension}', dpi=160, bbox_inches='tight')
    plt.close(fig)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('run_folders', nargs='+', type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    rows, sources, mappings, texts = [], [], [], {}
    seen = set()
    for root in map(Path.resolve, args.run_folders):
        for path in sorted(root.rglob('result.json')):
            data = json.loads(path.read_text(encoding='utf-8'))
            if data.get('status') != 'completed':
                raise ValueError(f'Incomplete result: {path}')
            manifest_path = path.parent.parent / 'manifest.json'
            mapping = topic_map(json.loads(manifest_path.read_text(encoding='utf-8')))
            job = data['job']
            url = data.get('conversation_url')
            if url and url in seen:
                raise ValueError(f'Duplicate conversation: {path}')
            if url:
                seen.add(url)
            html_path = path.with_name('conversation.html')
            images, words, text = answer_metrics(html_path.read_text(encoding='utf-8'))
            condition = ('Code-mixed ' if job.get('prompt_type') == 'code-mixed' else '') + job['language']
            seconds = data.get('timing', {}).get('generation_seconds')
            topic = mapping[job['lang_id'], job['topic']]
            row = dict(experiment=root.name, account=job.get('browser_assignment', {}).get('id', 'original-run'),
                job_id=job['job_id'], language=job['language'], lang_id=job['lang_id'],
                prompt_type=job.get('prompt_type', 'native'), condition=condition,
                matched_topic=topic, original_topic=job['topic'], answer_images=images,
                answer_words=words, generation_seconds=seconds,
                seconds_per_100_words=100 * seconds / words if seconds is not None and words else None,
                recovered=bool(data.get('recovered_at')),
                clarification_response=topic == 'vapour phase refining' and condition == 'Tamil',
                html_path=os.path.relpath(html_path, out).replace(os.sep, '/'))
            rows.append(row)
            texts[f'{root.name}/{row["account"]}/{job["job_id"]}'] = text
            sources.append(dict(result=str(path), result_sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
                                html_sha256=hashlib.sha256(html_path.read_bytes()).hexdigest()))
            mappings.append({k: row[k] for k in ['experiment', 'lang_id', 'original_topic', 'matched_topic']})
    conditions = sorted({r['condition'] for r in rows}, key=lambda c: (c.replace('Code-mixed ', ''), c.startswith('Code-mixed ')))
    topics_by_condition = [{r['matched_topic'] for r in rows if r['condition'] == c} for c in conditions]
    common = sorted(set.intersection(*topics_by_condition))
    if not common:
        raise ValueError('No topics shared across all conditions')
    matched = [r for r in rows if r['matched_topic'] in common]
    if any(n != 1 for n in Counter((r['condition'], r['matched_topic']) for r in rows).values()):
        raise ValueError('Repeated topic/condition cells require an explicit aggregation design')
    timing_topics = [t for t in common if all(r['generation_seconds'] is not None for r in matched if r['matched_topic'] == t)]
    timing_rows = [r for r in matched if r['matched_topic'] in timing_topics]
    main_summary = summarize(matched, conditions, 'shared_topics')
    all_summary = summarize(rows, conditions, 'all_available_topics')
    timing_summary = summarize(timing_rows, conditions, 'shared_topics_complete_timing') if timing_rows else []
    deltas = []
    for language in sorted({r['language'] for r in rows}):
        native = {r['matched_topic']: r for r in rows if r['condition'] == language}
        mixed = {r['matched_topic']: r for r in rows if r['condition'] == 'Code-mixed ' + language}
        paired = sorted(native.keys() & mixed.keys())
        if not paired:
            continue
        for scope, topics in [('shared_topics', [t for t in paired if t in common]), ('all_available_topics', paired)]:
            deltas.append(dict(scope=scope, language=language, paired_topics=len(topics),
                mean_native_words=mean(native[t]['answer_words'] for t in topics),
                mean_code_mixed_words=mean(mixed[t]['answer_words'] for t in topics),
                mean_word_difference_mixed_minus_native=mean(mixed[t]['answer_words'] - native[t]['answer_words'] for t in topics),
                mean_image_difference_mixed_minus_native=mean(mixed[t]['answer_images'] - native[t]['answer_images'] for t in topics)))
    write_csv(out / 'responses.csv', rows)
    write_csv(out / 'summary.csv', main_summary + timing_summary + all_summary)
    write_csv(out / 'native_vs_code_mixed.csv', deltas)
    write_csv(out / 'topic_mapping.csv', list({tuple(r.values()): r for r in mappings}.values()))
    (out / 'extracted_text.json').write_text(json.dumps(texts, ensure_ascii=False, indent=2), encoding='utf-8')
    (out / 'manifest.json').write_text(json.dumps(dict(sources=sources, shared_topics=common,
        complete_timing_topics=timing_topics, api_calls=0, conditions=conditions), indent=2), encoding='utf-8')
    plot(out, matched, main_summary, conditions, common)
    lines = ['# Comparison across all languages', '',
        f'{len(rows)} completed answers; {len(conditions)} prompt conditions; {len(set(r["language"] for r in rows))} languages. '
        'All measurements use the stored HTML and result metadata. No network or embedding API calls were made.', '',
        '## Matched-topic comparison', '',
        f'The main comparison uses {len(matched)} answers on {len(common)} shared topics: ' + ', '.join(common) + '.', '',
        'English and Tamil include the earlier experiments and any supplied follow-up runs; the other six languages were collected '
        'in the five-account experiment. Native and code-mixed prompt conditions remain separate. '
        'Condition labels describe the requested prompt language, not an independently verified language of every answer.', '',
        *table(main_summary), '', '![Language comparison](language_comparison.png)', '',
        'Timing columns omit answers without recorded generation time, so their topic samples can differ. '
        'Use the complete-timing comparison below for matched timing samples.', '',
        '## Timing on a common sample', '',
        'These topics have usable timing for every condition: ' + ', '.join(timing_topics) + '.', '',
        *table(timing_summary), '',
        'Three recovered answers lack generation time: Hindi native Coulomb, code-mixed Hindi Lorentz, '
        'and code-mixed German Coulomb. Their elapsed time until later recovery is not generation time. '
        'They remain included in content comparisons.', '',
        '## Native versus code-mixed prompts', '',
        f'Differences below use the same {len(common)} shared topics within each language. Positive values mean code-mixed answers were longer or had more image elements.', '',
        '| Language | Mean native words | Mean code-mixed words | Word difference | Image difference per answer |',
        '| --- | ---: | ---: | ---: | ---: |']
    for d in deltas:
        if d['scope'] == 'shared_topics':
            lines.append(f"| {d['language']} | {d['mean_native_words']:.1f} | {d['mean_code_mixed_words']:.1f} | {d['mean_word_difference_mixed_minus_native']:+.1f} | {d['mean_image_difference_mixed_minus_native']:+.2f} |")
    lines += ['', '## Topic-level word counts', '', '![Topic counts](topic_words.png)', '',
        '## All available answers', '',
        f'These summaries retain all {len(rows)} answers but may mix different topic sets: the earlier runs include vapour phase refining; '
        'the five-account run includes relativity instead. Follow-up runs can fill missing topics. Use the matched-topic table for comparisons across all languages. '
        'The previously identified Tamil vapour response is a clarification about a different interpretation, and is flagged in the CSV.', '',
        *table(all_summary), '', '## Measurement and interpretation', '',
        '- Words are whitespace-delimited units containing a Unicode letter. Equations, code blocks, widgets, citations, controls, image alt text, and hidden content are excluded. This count is not a language-neutral information measure; morphology and spacing differ across languages, including Korean.',
        '- Images are source-bearing img elements inside the assistant answer, excluding citation icons and explicitly aria-hidden elements. These are DOM counts, not unique ideas, downloaded files, SVGs, or all possible carousel slides. Ads outside the answer are excluded.',
        '- Pooled seconds per 100 words = 100 × total usable generation seconds / total words in those same timed answers. Timing includes the completion stability check and possible search/image work; it excludes capture and job spacing.',
        '- Topic translations are aligned by position in the frozen run-set manifests, and exported for audit. This records intended equivalence; it does not validate translations or factual correctness.',
        '- These are descriptive differences, not established language effects or significance claims. Account, collection batch, execution order, quota state, and website behavior were not controlled. Only one answer exists per topic/condition.',
        '- Semantic diversity and idea coverage are not compared across all languages here. The cached embeddings cover only the older English/Tamil corpus. Length alone cannot establish broader idea coverage.', '',
        '## Files', '',
        '[Per-answer measurements](responses.csv) · [Summaries](summary.csv) · [Native/code-mixed differences](native_vs_code_mixed.csv) · '
        '[Topic mapping](topic_mapping.csv) · [Extracted text](extracted_text.json) · [Input hashes](manifest.json)', '',
        '## Per-answer audit', '',
        '| Experiment | Account | Condition | Topic | Words | Images | Time (s) |',
        '| --- | --- | --- | --- | ---: | ---: | ---: |']
    for r in rows:
        seconds = 'NA (recovered)' if r['generation_seconds'] is None else f"{r['generation_seconds']:.2f}"
        lines.append(f"| {r['experiment']} | {r['account']} | {r['condition']} | [{r['matched_topic']}]({r['html_path']}) | {r['answer_words']} | {r['answer_images']} | {seconds} |")
    (out / 'report.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(json.dumps(dict(answers=len(rows), shared_topics=common, complete_timing_topics=timing_topics, summary=main_summary), indent=2))


if __name__ == '__main__':
    main()
