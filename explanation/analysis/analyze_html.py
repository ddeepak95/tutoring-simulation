"""Measure saved assistant answers without reopening the browser."""
import argparse
import csv
import json
import re
from pathlib import Path

from bs4 import BeautifulSoup


def answer_metrics(html):
    soup = BeautifulSoup(html, 'html.parser')
    answers = soup.select('[data-message-author-role="assistant"]')
    if len(answers) != 1:
        raise ValueError(f'Expected one assistant answer, found {len(answers)}')
    answer = answers[0]
    # Source favicons and equation-widget controls are not answer illustrations/prose.
    for node in answer.select('[data-testid="webpage-citation-pill"], [data-testid="math-block-layout"]'):
        if node.parent is not None:
            node.decompose()
    images = [img for img in answer.select('img')
              if (img.get('src') or img.get('data-src'))
              and not img.find_parent(attrs={'aria-hidden': 'true'})
              and img.get('aria-hidden') != 'true']
    image_count = len(images)
    # Remove outer math nodes first, avoiding double counting their layout spans.
    for selector in ('[data-math-source]', '[role="math"]', '.katex',
                     'button, [role="button"], img, svg, script, style, pre, '
                     '[hidden], [aria-hidden="true"]'):
        for node in list(answer.select(selector)):
            if node.parent is not None:
                node.decompose()
    # Block boundaries separate words; inline markup must not split a word.
    for node in answer.select('p, li, h1, h2, h3, h4, h5, h6, '
                              'td, th, div, blockquote, br'):
        node.insert_before(' ')
        node.insert_after(' ')
    text = re.sub(r'\s+', ' ', answer.get_text()).strip()
    text = text.replace('\u200b', '').replace('\ufeff', '')
    words = [unit for unit in text.split() if any(c.isalpha() for c in unit)]
    return image_count, len(words), text


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('run_folder', type=Path)
    args = parser.parse_args()
    root = args.run_folder.resolve()
    rows = []
    cleaned = {}
    for path in sorted(root.glob('web-*/result.json')):
        data = json.loads(path.read_text(encoding='utf-8'))
        if data.get('status') != 'completed':
            continue
        job = data['job']
        images, words, text = answer_metrics(path.with_name('conversation.html').read_text(encoding='utf-8'))
        seconds = data.get('timing', {}).get('generation_seconds')
        condition = ('English' if job['lang_id'] == 'en' else
                     'Code-mixed Tamil' if job['prompt_type'] == 'code-mixed' else 'Tamil')
        rows.append(dict(job_id=job['job_id'], topic=job['topic'], condition=condition,
                         answer_images=images, answer_words=words,
                         generation_seconds=seconds,
                         seconds_per_word=round(seconds / words, 6) if seconds is not None and words else None,
                         seconds_per_100_words=round(100 * seconds / words, 3) if seconds is not None and words else None))
        cleaned[job['job_id']] = text
    if not rows:
        raise ValueError('No completed results found')
    out = root / 'analysis' / 'html_metrics'
    out.mkdir(parents=True, exist_ok=True)
    with (out / 'responses.csv').open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=rows[0])
        writer.writeheader()
        writer.writerows(rows)
    (out / 'extracted_text.json').write_text(json.dumps(cleaned, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = ['# HTML answer measurements', '',
             'Counts use only the single assistant-message element in each saved HTML file. '
             'Prompts, ads, the composer, and other content outside that element are excluded.', '',
             '**Word definition:** a whitespace-delimited unit containing at least one Unicode letter. '
             'Headings, prose, lists, and table text count. Inline formatting does not split words; '
             'hyphenated or slash-joined forms count as one unit when there is no whitespace. '
             'Math elements and interactive equation widgets, citation pills, code/diagram blocks, image alt text, buttons, hidden content, '
             'and standalone numbers or symbols do not count. These are operational word counts, '
             'not language-specific segmentation or model tokens. Tamil and English word counts '
             'are not equivalent measures of information.', '',
             '**Image definition:** image elements with a source inside the assistant message, '
             'excluding explicitly aria-hidden images. Counts reflect the saved DOM, not unrecorded '
             'carousel slides, CSS backgrounds, SVGs, or unique downloaded files.', '',
             '**Normalized time:** generation seconds / answer words; the table scales this to '
             '100 words. Lower values mean less observed elapsed time per counted word. '
             'Generation time comes from result.json, includes the three-second completion check, '
             'and excludes capture and inter-job delays. It can include image/search activity '
             'and is not pure text-generation speed.', '',
             '| Job | Topic | Condition | Images | Words | Time (s) | Seconds / 100 words |',
             '| --- | --- | --- | ---: | ---: | ---: | ---: |']
    for row in rows:
        link = f"[{'-'.join(row['job_id'].split('-')[:2])}](../../{row['job_id']}/conversation.html)"
        lines.append(f"| {link} | {row['topic']} | {row['condition']} | {row['answer_images']} | {row['answer_words']} | {row['generation_seconds']} | {row['seconds_per_100_words']} |")
    lines += ['', '**Pooled results by condition**', '',
              '| Condition | Answers | Images | Words | Total time (s) | Seconds / 100 words |',
              '| --- | ---: | ---: | ---: | ---: | ---: |']
    for condition in dict.fromkeys(row['condition'] for row in rows):
        group = [row for row in rows if row['condition'] == condition]
        timed = [row for row in group if row['generation_seconds'] is not None]
        seconds = sum(row['generation_seconds'] for row in timed)
        words = sum(row['answer_words'] for row in timed)
        rate = round(100 * seconds / words, 3) if words else None
        lines.append(f"| {condition} | {len(group)} | {sum(row['answer_images'] for row in group)} | {sum(row['answer_words'] for row in group)} | {seconds:.3f} | {rate} |")
    lines += ['', 'The pooled rate is total recorded time divided by the word count of timed answers, '
              'not the unweighted mean of per-answer rates. Missing times are left blank in the CSV '
              'and excluded from pooled rates. The earlier analysis used a different text-unit method '
              '(including equation placeholders); use this table consistently for the requested word metric.', '',
              'Interpretation remains descriptive: one response per topic/condition, fixed condition '
              'order, and image-usage notices in jobs 8 and 9 limit causal comparisons. '
              'See [the wider analysis](../analysis.md).', '',
              'Files: [CSV](responses.csv), [extracted text for auditing](extracted_text.json).', '']
    (out / 'report.md').write_text('\n'.join(lines), encoding='utf-8')
    print('\n'.join(lines))


if __name__ == '__main__':
    main()
