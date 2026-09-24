"""Reproduce the saved local analyses in temporary storage without network calls."""
import csv
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
BASELINE = ROOT / 'outputs/all-languages-comparison-six-topics'


def rows(path, excluded=()):
    with path.open(encoding='utf-8-sig', newline='') as stream:
        records = [{k: v for k, v in row.items() if k not in excluded} for row in csv.DictReader(stream)]
    return sorted(json.dumps(r, sort_keys=True, ensure_ascii=False) for r in records)


def main():
    comparisons = []
    with tempfile.TemporaryDirectory(prefix='analysis-check-', dir=ROOT / 'outputs') as temp:
        output = Path(temp)

        def run(command, *arguments):
            result = subprocess.run([sys.executable, str(ROOT / 'analyze.py'), command, *map(str, arguments)],
                # Deliberately run outside the project to check path handling.
                cwd=output, capture_output=True, text=True, encoding='utf-8', errors='replace')
            if result.returncode:
                raise RuntimeError(f'{command} failed:\n{result.stderr}\n{result.stdout}')

        run('measure', *(ROOT / 'outputs' / name for name in
            ['my-experiment-01', 'my-experiment-02', 'five-accounts-01', 'relativity-en-ta-01']), '--output', output)
        run('words', '--root', output)
        run('headings', '--root', output)
        run('plots', '--root', output)
        (output / 'relevance-gemini').mkdir()
        shutil.copy2(BASELINE / 'relevance-gemini/judgments.csv', output / 'relevance-gemini/judgments.csv')
        google = output / 'google-coverage-everyday-browser'
        google.mkdir()
        shutil.copy2(BASELINE / 'google-coverage-everyday-browser/google_counts.csv', google / 'google_counts.csv')
        run('google', '--root', output, '--output', google)
        for name, excluded in [
            ('responses.csv', ('html_path',)),
            ('word-count-medians/summary.csv', ()),
            ('word-count-medians/paired_counts.csv', ()),
            ('heading-counts/counts.csv', ()),
            ('heading-counts/headings.csv', ('source_html',)),
            ('heading-counts/summary.csv', ()),
            ('boxplots/plotted_data.csv', ()),
            ('google-coverage-everyday-browser/correlations.csv', ()),
            ('google-coverage-everyday-browser/adjusted_models.csv', ()),
            ('google-coverage-everyday-browser/google_leave_one_topic_out.csv', ()),
        ]:
            actual, expected = rows(output / name, excluded), rows(BASELINE / name, excluded)
            if actual != expected:
                raise AssertionError(f'Measurements differ: {name}')
            comparisons.append({'file': name, 'rows': len(actual), 'matches': True})
    print(json.dumps({'comparisons': comparisons, 'network_requests': 0}, indent=2))


if __name__ == '__main__':
    main()
