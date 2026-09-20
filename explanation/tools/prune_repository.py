"""Plan or apply the reviewed explanation-only cleanup, with a verified local ZIP backup."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[2]
DELETE = [
    'docs', 'evaluations', 'experiment-3-language-feedback', 'experiment-geo-disparity',
    'experiment2', 'hint-language-experiment', 'multi-turn-experiment', 'runs',
    'supabase-experiment', 'viz', 'annotations.sqlite3', 'pol.html', 'vd.html',
]
KEEP_DATA = {'models.json'}
KEEP_SOURCE = {'__init__.py', 'vertex_auth.py'}
EDIT_BACKUPS = ['README.md', 'pyproject.toml', 'uv.lock', '.gitignore', '.env.example',
                'src/tutoring_check/__init__.py']


def checked(path):
    if path.is_symlink() or path.is_junction():
        raise ValueError(f'Refusing linked path: {path}')
    resolved = path.resolve()
    if resolved == ROOT or not resolved.is_relative_to(ROOT):
        raise ValueError(f'Path outside cleanup scope: {path}')
    return resolved


def files_under(path):
    checked(path)
    if path.is_file():
        return [path]
    files = []
    for child in sorted(path.iterdir()):
        checked(child)
        files.extend(files_under(child) if child.is_dir() else [child])
    return files


def digest(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--backup-dir', type=Path)
    args = parser.parse_args()
    targets = [ROOT / name for name in DELETE if (ROOT / name).exists()]
    targets += [p for p in (ROOT / 'data').iterdir() if p.name not in KEEP_DATA]
    targets += [p for p in (ROOT / 'src/tutoring_check').iterdir() if p.name not in KEEP_SOURCE]
    groups = []
    delete_files = []
    for target in targets:
        files = files_under(target)
        delete_files.extend(files)
        groups.append({'path': target.relative_to(ROOT).as_posix(), 'files': len(files),
                       'bytes': sum(f.stat().st_size for f in files)})
    plan = {'repository': str(ROOT), 'groups': groups, 'files': len(delete_files),
            'bytes': sum(g['bytes'] for g in groups),
            'keep': ['explanation/', 'data/models.json', 'src/tutoring_check/vertex_auth.py',
                     'src/tutoring_check/__init__.py', '.git/', '.venv/', '.env', '.env.example',
                     '.claude/', '.gitignore', 'README.md', 'pyproject.toml', 'uv.lock'],
            'state': 'planned'}
    report = ROOT / 'explanation/repository-cleanup.json'
    report.write_text(json.dumps(plan, indent=2), encoding='utf-8')
    print(json.dumps(plan, indent=2), flush=True)
    if not args.apply:
        return
    if args.backup_dir is None:
        parser.error('--apply requires --backup-dir outside the repository')
    backup_dir = args.backup_dir.resolve()
    if backup_dir.is_relative_to(ROOT):
        parser.error('Backup must be outside the repository')
    backup_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    archive = backup_dir / f'tutoring-check-before-explanation-cleanup-{stamp}.zip'
    source_files = delete_files + [ROOT / name for name in EDIT_BACKUPS if (ROOT / name).is_file()]
    needed = sum(p.stat().st_size for p in source_files)
    if shutil.disk_usage(backup_dir).free < needed + 256 * 1024 * 1024:
        raise RuntimeError('Insufficient space for a conservative backup estimate')
    hashes = {}
    with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_DEFLATED, compresslevel=1, allowZip64=True) as z:
        for number, path in enumerate(source_files, 1):
            checked(path)
            relative = path.relative_to(ROOT).as_posix()
            hashes[relative] = digest(path)
            z.write(path, relative)
            if number % 500 == 0:
                print(f'Backed up {number}/{len(source_files)} files', flush=True)
        z.writestr('CLEANUP_MANIFEST.json', json.dumps({'plan': plan, 'sha256': hashes}, indent=2))
    with zipfile.ZipFile(archive) as z:
        for relative, expected in hashes.items():
            with z.open(relative) as stream:
                if hashlib.file_digest(stream, 'sha256').hexdigest() != expected:
                    raise RuntimeError(f'Backup verification failed: {relative}')
            if digest(ROOT / relative) != expected:
                raise RuntimeError(f'Source changed during backup: {relative}')
    print('All backup hashes verified; deleting reviewed files.', flush=True)
    # All recursive targets are checked above and again immediately before removal.
    # No glob or shell-built deletion commands are used.
    for target in targets:
        checked(target)
        current_files = files_under(target)
        for path in current_files:
            relative = path.relative_to(ROOT).as_posix()
            if relative not in hashes or digest(path) != hashes[relative]:
                raise RuntimeError(f'Unbacked or changed file; stopping: {relative}')
        for path in current_files:
            checked(path).unlink()
        if target.is_dir():
            for directory in sorted((p for p in target.rglob('*') if p.is_dir()), key=lambda p: len(p.parts), reverse=True):
                checked(directory).rmdir()
            target.rmdir()
    plan.update(state='deleted_after_verified_backup', backup=str(archive),
                backup_sha256=digest(archive), finished_utc=datetime.now(timezone.utc).isoformat())
    report.write_text(json.dumps(plan, indent=2), encoding='utf-8')
    print(f'Cleanup finished. Verified backup: {archive}', flush=True)


if __name__ == '__main__':
    main()
