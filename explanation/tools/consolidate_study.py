"""Build an auditable local study bundle without changing any source files."""
import csv
import hashlib
import importlib.metadata
import json
import os
import platform
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
OUT = HERE / 'consolidated-study'
MAIN = HERE / 'outputs/all-languages-comparison-six-topics'
RUNS = ['my-experiment-01', 'my-experiment-02', 'five-accounts-01', 'relativity-en-ta-01']


def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def main():
    if OUT.exists():
        raise SystemExit(f'Refusing to overwrite existing bundle: {OUT}')
    pairs = []
    roots = []

    def add(source, destination):
        source = Path(source)
        destination = OUT / destination
        if source.is_dir():
            roots.append((source, destination))
            for f in sorted(source.rglob('*')):
                if f.is_file() and '__pycache__' not in f.parts:
                    pairs.append((f, destination / f.relative_to(source)))
        else:
            pairs.append((source, destination))

    for run in RUNS:
        add(HERE / 'outputs' / run, f'raw/conversations/{run}')
    add(HERE / 'google-browser-counts.json', 'raw/google-browser/google-browser-counts.json')
    roots.append((MAIN, OUT / 'analysis'))
    archive_dirs = {'google-coverage', 'google-coverage-serpapi', 'heading-idea-pilot', 'heading-pilot'}
    for f in MAIN.iterdir():
        add(f, ('archive/' if f.name in archive_dirs else 'analysis/') + f.name)
    for name in ['combined-experiments-01-02', 'all-languages-comparison']:
        add(HERE / 'outputs' / name, 'archive/' + name)
    # Historical source and configuration snapshots, without credentials/profiles.
    for f in HERE.iterdir():
        if f.is_file() and (f.suffix in {'.py', '.cjs'} or f.name.endswith('_requirements.txt')):
            add(f, 'code/' + f.name)
    for folder in ['analysis', 'tests', 'tools']:
        add(HERE / folder, 'code/' + folder)
    add(HERE / 'google-counts-extension', 'code/google-counts-extension')
    for name in ['prompt-structure.json', 'browser-config.json', 'browser-accounts.json',
                 'browser-accounts-relativity.json', 'README.md', 'BROWSER.md', 'BROWSER_QUEUES.md']:
        add(HERE / name, 'metadata/source-config/' + name)
    add(HERE / 'run_set', 'metadata/source-config/run_set')
    mapping = {str(s.resolve()).lower(): d for s, d in pairs}
    assert len(mapping) == len(pairs)
    assert len({str(d).lower() for _, d in pairs}) == len(pairs)
    records = []
    for source, dest in pairs:
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, dest)
        record = {'source': source.relative_to(HERE).as_posix(),
                  'destination': dest.relative_to(OUT).as_posix(),
                  'source_sha256': sha(source), 'source_bytes': source.stat().st_size}
        # Raw evidence, code and API caches remain byte-identical. Rebase paths in
        # derived tables/reports only; archive every pre-rebase version as well.
        editable = dest.relative_to(OUT).parts[0] in {'analysis', 'archive'}
        editable &= dest.suffix.lower() in {'.md', '.html', '.csv'}
        editable &= not any(x in source.parts for x in ['cache', 'captures', 'probe'])
        if editable:
            original = source.read_text(encoding='utf-8-sig')
            replacements = {}
            for oldroot, newroot in roots:
                oldrel = os.path.relpath(oldroot, source.parent).replace('\\', '/')
                newrel = os.path.relpath(newroot, dest.parent).replace('\\', '/')
                if oldrel != '.':
                    replacements[oldrel + '/'] = newrel + '/'
                replacements[oldroot.as_posix() + '/'] = newrel + '/'
                replacements[str(oldroot) + '\\'] = newrel + '/'
            # Single-pass replacement prevents a newly rebased path being changed again.
            pattern = re.compile('|'.join(re.escape(x) for x in sorted(replacements, key=len, reverse=True)))
            updated = pattern.sub(lambda m: replacements[m.group()], original)
            if updated != original:
                backup = OUT / 'archive/source-versions' / source.relative_to(HERE)
                backup.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(source, backup)
                record['original_copy'] = backup.relative_to(OUT).as_posix()
                dest.write_text(updated, encoding='utf-8-sig' if source.read_bytes().startswith(b'\xef\xbb\xbf') else 'utf-8', newline='')
        record['bundle_sha256'] = sha(dest)
        record['bundle_bytes'] = dest.stat().st_size
        records.append(record)

    meta = OUT / 'metadata'
    meta.mkdir(exist_ok=True)
    (meta / 'file-manifest.json').write_text(json.dumps({
        'created_utc': datetime.now(timezone.utc).isoformat(),
        'source_root': str(HERE), 'files': records,
        'path_convention': 'Manifest destinations relative to bundle root; rebased report/table paths relative to their containing file. Raw evidence and JSON caches retain historical provenance paths.'
    }, indent=2), encoding='utf-8')
    packages = ['numpy', 'matplotlib', 'openai', 'beautifulsoup4', 'python-dotenv', 'playwright', 'markdownify', 'requests']
    versions = {}
    for package in packages:
        try:
            versions[package] = importlib.metadata.version(package)
        except importlib.metadata.PackageNotFoundError:
            versions[package] = None
    (meta / 'environment.json').write_text(json.dumps({'python': platform.python_version(), 'platform': platform.platform(), 'packages': versions}, indent=2), encoding='utf-8')
    (OUT / 'code/requirements-snapshot.txt').write_text(''.join(f'{k}=={v}\n' for k, v in versions.items() if v), encoding='utf-8')
    # A portable answer inventory supplements immutable historical manifests.
    with (OUT / 'analysis/responses.csv').open(encoding='utf-8-sig', newline='') as f:
        answers = list(csv.DictReader(f))
    for r in answers:
        capture = (OUT / 'analysis' / r['html_path']).resolve()
        assert capture.is_file(), capture
        r['bundle_html'] = capture.relative_to(OUT).as_posix()
        r['in_six_topic_comparison'] = str(r['matched_topic'].lower() != 'vapour phase refining')
    with (meta / 'answer-inventory.csv').open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=list(answers[0]))
        writer.writeheader()
        writer.writerows(answers)
    print(json.dumps({'copied_files': len(records), 'answers': len(answers), 'bytes': sum(r['bundle_bytes'] for r in records), 'rebased_files': sum('original_copy' in r for r in records)}))


if __name__ == '__main__':
    main()
