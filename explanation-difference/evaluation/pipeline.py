"""Translate English/Tamil experiment responses and extract content inventories."""
import argparse
import asyncio
import csv
import hashlib
import importlib.util
import json
import os
import sys
import uuid
from pathlib import Path

import translation
import extraction

HERE = Path(__file__).resolve().parent
EXPERIMENT = HERE.parent
ROOT = EXPERIMENT.parent
SPEC = importlib.util.spec_from_file_location('api_runner', ROOT / 'explanation/run.py')
api = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(api)


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def sources(batch):
    root_manifest = api.read_json(batch / 'manifest.json')
    folders = [batch] if all((batch / (j['job_id'] + '.json')).exists() for j in root_manifest['jobs']) else [
        p for p in sorted(batch.iterdir()) if p.is_dir() and (p / 'manifest.json').exists()]
    found = {}
    for folder in folders:
        for job in api.read_json(folder / 'manifest.json')['jobs']:
            path = folder / (job['job_id'] + '.json')
            result = api.read_json(path)
            if result.get('status') != 'completed' or result.get('job') != job or not result.get('text', '').strip():
                raise ValueError(f'Incomplete or mismatched source: {path}')
            if job['job_id'] in found:
                raise ValueError('Duplicate source job')
            found[job['job_id']] = dict(path=str(path.resolve()), topic_folder=folder.name,
                                       job=job, text=result['text'], source_sha256=digest(result))
    if set(found) != {j['job_id'] for j in root_manifest['jobs']}:
        raise ValueError('Batch and topic manifests disagree')
    return [found[j['job_id']] for j in root_manifest['jobs']]


def model_config(name):
    catalog = api.read_json(ROOT / 'data/models.json')
    row = next((r for r in catalog['models'] if name in (r['id'], r['litellm_model'])), None)
    if row is None:
        raise ValueError(f'Model missing from catalog: {name}')
    return row


def record_path(output, stage, source):
    return output / stage / source['topic_folder'] / (source['job']['job_id'] + '.json')


def fingerprint(stage, source, model, english=None):
    return digest(dict(stage=stage, source=source['source_sha256'], model=model,
                       prompt=translation.PROMPT if stage == 'translate' else extraction.PROMPT,
                       english=english, schema_version=1))


async def process(stage, source, model, output, timeout, call=None):
    english = None
    if stage == 'extract':
        translated = api.read_json(record_path(output, 'translate', source))
        if translated.get('status') != 'completed' or translated['source_sha256'] != source['source_sha256']:
            raise ValueError('Missing or stale translation')
        english = translated['english_text']
    signature = fingerprint(stage, source, model, english)
    path = record_path(output, stage, source)
    previous = None
    if path.exists():
        previous = api.read_json(path)
        if previous['fingerprint'] != signature:
            raise ValueError(f'Cached configuration changed; choose another --output: {path}')
        if previous['status'] == 'completed':
            return previous
    path.parent.mkdir(parents=True, exist_ok=True)
    record = dict(stage=stage, fingerprint=signature, source_path=source['path'],
                  source_sha256=source['source_sha256'], job=source['job'], model=model['id'],
                  started_at=api.now(), status='failed')
    if stage == 'translate' and not translation.needs_translation(source['text']):
        record.update(status='completed', mode='english_passthrough', english_text=source['text'],
                      finished_at=api.now())
        api.write_json(path, record)
        return record
    instructions = translation.PROMPT if stage == 'translate' else extraction.PROMPT
    request = dict(model=model['litellm_model'], store=False,
                   input=[{'role': 'system', 'content': instructions},
                          {'role': 'user', 'content': json.dumps({'explanation': source['text'] if stage == 'translate' else english}, ensure_ascii=False)}])
    if previous and previous.get('status') == 'failed' and previous.get('response'):
        last_text = api.output_text(previous['response'])
        feedback = 'The previous attempt failed validation. Return a complete replacement.'
        if stage == 'extract':
            try:
                extraction.parse(last_text, english)
            except (ValueError, TypeError, KeyError) as exc:
                feedback += ' Validation: ' + str(exc)
            feedback += (' Evidence must be exact contiguous substrings of the original English explanation, '
                         'including Markdown bold markers, LaTeX escapes and whitespace. Use shorter '
                         'quotes if needed. Do not paraphrase evidence. Retain the full inventory.')
        else:
            feedback += ' Translate every Tamil word, including parenthetical terms, into English.'
        request['input'].extend([{'role': 'assistant', 'content': last_text},
                                 {'role': 'user', 'content': feedback}])
    attempt = uuid.uuid4().hex
    log_path = output / stage / 'api_calls.jsonl'

    def log(event, **fields):
        with log_path.open('a', encoding='utf-8') as f:
            f.write(json.dumps(dict(event=event, attempt_id=attempt, job_id=source['job']['job_id'],
                                   timestamp=api.now(), **fields), ensure_ascii=False) + '\n')

    record['request'] = request
    log('request', request=request)
    try:
        params = {k: os.path.expandvars(v) if isinstance(v, str) else v
                  for k, v in model.get('litellm_params', {}).items()}
        kwargs = {**params, **request, 'timeout': timeout, 'drop_params': False}
        if kwargs.get('api_key') == '@adc-token':
            sys.path.insert(0, str(ROOT / 'src'))
            from tutoring_check.vertex_auth import with_adc_token
            kwargs = with_adc_token(kwargs)
        if call is None:
            from litellm import aresponses
            call = aresponses
        response = await call(**kwargs)
        raw = response.model_dump(mode='json') if hasattr(response, 'model_dump') else response
        record['response'] = raw
        record['usage'] = raw.get('usage', {})
        log('response', response=raw)
        if raw.get('status', 'completed') != 'completed':
            raise ValueError('Incomplete API response')
        text = api.output_text(raw)
        if stage == 'translate':
            record.update(mode='translated', english_text=translation.validate(text))
        else:
            record.update(inventory=extraction.parse(text, english), english_sha256=digest(english),
                          translation_path=str(record_path(output, 'translate', source).resolve()))
        record['status'] = 'completed'
    except Exception as exc:
        record['error'] = dict(type=type(exc).__name__, status_code=getattr(exc, 'status_code', None))
        log('error', error=record['error'])
    record['finished_at'] = api.now()
    api.write_json(path, record)
    print(f"{stage} {source['job']['job_id']}: {record['status']}", flush=True)
    return record


def reports(output, stage, items):
    rows = []
    topics = {}
    for source in items:
        path = record_path(output, stage, source)
        if not path.exists():
            continue
        result = api.read_json(path)
        row = dict(job_id=source['job']['job_id'], topic=source['job'].get('topic_name', ''),
                   model=source['job']['model'], run_index=source['job']['run_index'], status=result['status'])
        lines = topics.setdefault(source['topic_folder'], [f"# {stage}: {source['topic_folder']}", ''])
        lines.extend([f"## {row['model']} / run {row['run_index']}", '', f"Source job: `{row['job_id']}`; status: {row['status']}", ''])
        if result['status'] == 'completed':
            if stage == 'translate':
                row['mode'] = result['mode']
                lines.extend([result['english_text'], ''])
            else:
                inventory = result['inventory']
                row.update(subtopics=len(inventory['subtopics']), examples=len(inventory['examples']))
                for key in ('subtopics', 'examples'):
                    lines.extend([f'### {key.title()}', ''])
                    for entry in inventory[key]:
                        lines.extend([f"- **{entry['id']}: {entry['label']}** ({entry.get('coverage', entry.get('kind'))})", '',
                                      '> ' + entry['evidence'].replace('\n', '\n> '), ''])
        rows.append(row)
    for topic, lines in topics.items():
        (output / stage / topic / 'results.md').write_text('\n'.join(lines), encoding='utf-8')
    if rows:
        fields = list(dict.fromkeys(k for row in rows for k in row))
        with (output / stage / 'summary.csv').open('w', encoding='utf-8-sig', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fields)
            writer.writeheader()
            writer.writerows(rows)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('stage', choices=['translate', 'extract', 'all'])
    parser.add_argument('--batch', type=Path, default=EXPERIMENT / 'outputs/multiple')
    parser.add_argument('--output', type=Path)
    parser.add_argument('--translator', default='gemini-3.8-flash')
    parser.add_argument('--judge', default='gemini-3.8-flash')
    parser.add_argument('--limit', type=int)
    parser.add_argument('--concurrency', type=int, default=3)
    parser.add_argument('--timeout', type=float, default=180)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args(argv)
    if args.concurrency < 1 or args.timeout <= 0 or (args.limit is not None and args.limit < 1):
        parser.error('Concurrency, timeout and limit must be positive')
    output = args.output or args.batch / 'evaluation'
    items = sources(args.batch)
    if args.limit:
        items = items[:args.limit]
    models = {'translate': model_config(args.translator), 'extract': model_config(args.judge)}
    stages = ['translate', 'extract'] if args.stage == 'all' else [args.stage]
    print(f"Sources: {len(items)}; Tamil/mixed: {sum(translation.needs_translation(s['text']) for s in items)}; output: {output}")
    if args.dry_run:
        print('Validated sources and model configuration. No API calls or writes.')
        return 0
    from dotenv import load_dotenv
    load_dotenv(ROOT / '.env')

    async def run():
        failures = 0
        semaphore = asyncio.Semaphore(args.concurrency)
        for stage in stages:
            async def one(source):
                async with semaphore:
                    return await process(stage, source, models[stage], output, args.timeout)
            results = await asyncio.gather(*(one(s) for s in items), return_exceptions=True)
            failed = sum(isinstance(r, BaseException) or r['status'] != 'completed' for r in results)
            for source, result in zip(items, results):
                if isinstance(result, BaseException):
                    print(f"{stage} {source['job']['job_id']}: blocked ({type(result).__name__}); check dependencies/configuration", flush=True)
            reports(output, stage, items)
            print(f'{stage}: {len(items)-failed} completed, {failed} failed/blocked', flush=True)
            failures += failed
            if failed:
                break  # Do not judge a partial translation batch.
        lines = ['# Evaluation pipeline results', '',
                 'Stage 1: faithful English versions. Stage 2: evidence-backed content inventories.', '',
                 'These inventories describe coverage, not correctness or overall quality.', '']
        for stage_name in ('translate', 'extract'):
            stage_dir = output / stage_name
            if stage_dir.exists():
                lines.extend([f'## {stage_name.title()}', '',
                              f'[Summary CSV]({stage_name}/summary.csv)', ''])
                for report in sorted(stage_dir.glob('*/results.md')):
                    lines.append(f'- [{report.parent.name}]({report.relative_to(output).as_posix()})')
                lines.append('')
        output.mkdir(parents=True, exist_ok=True)
        (output / 'results.md').write_text('\n'.join(lines), encoding='utf-8')
        return 1 if failures else 0
    return asyncio.run(run())


if __name__ == '__main__':
    raise SystemExit(main())
