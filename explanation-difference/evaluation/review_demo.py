"""Second-pass label review of a saved annotation pilot, preserving pass one."""
import argparse
import asyncio
import copy
import html
import json
import uuid
from pathlib import Path

import annotate_demo
import pipeline

ALLOWED = {'primary_function', 'secondary_functions', 'attributes', 'review_flags', 'rationale'}


def apply_review(original, passages, review):
    if set(review) != {'reviewed_passage_ids', 'changes', 'unresolved'}:
        raise ValueError('Invalid review keys')
    ids = [p['id'] for p in passages]
    if review['reviewed_passage_ids'] != ids:
        raise ValueError('Review must cover all passages exactly once in order')
    updated = copy.deepcopy(original)
    by_id = {a['passage_id']: a for a in updated['annotations']}
    changes, seen = [], set()
    for change in review['changes']:
        if set(change) != {'passage_id', 'updates', 'rule_ids', 'reason'}:
            raise ValueError('Invalid change fields')
        pid, patch = change['passage_id'], change['updates']
        if pid not in by_id or pid in seen or not isinstance(patch, dict) or not patch or not set(patch) <= ALLOWED:
            raise ValueError('Invalid or forbidden patch')
        if not change['rule_ids'] or not set(change['rule_ids']) <= {f'R{i}' for i in range(1, 8)} or not change['reason'].strip():
            raise ValueError('Every change needs rules and a reason')
        seen.add(pid)
        before = copy.deepcopy(by_id[pid])
        if all(before[k] == v for k, v in patch.items()):
            raise ValueError('No-op patch')
        by_id[pid].update(patch)
        changes.append({**change, 'before': before, 'after': copy.deepcopy(by_id[pid])})
    for issue in review['unresolved']:
        if set(issue) != {'passage_id', 'reason'} or issue['passage_id'] not in by_id or not issue['reason'].strip():
            raise ValueError('Invalid unresolved issue')
    annotate_demo.validate(updated, passages)
    return updated, changes


async def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, default=pipeline.EXPERIMENT / 'outputs/multiple/evaluation/annotation_demo')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    output = args.output or args.input / 'review_pass2'
    source = pipeline.api.read_json(args.input / 'manifest.json')
    first = pipeline.api.read_json(args.input / 'annotations.json')
    passages = source['passages']
    original = annotate_demo.validate(first['inventory'], passages)
    prompt = (pipeline.HERE / 'annotation_review_prompt.md').read_text(encoding='utf-8')
    codebook = (pipeline.HERE / 'ANNOTATION_SCHEME.md').read_text(encoding='utf-8')
    model = pipeline.model_config('gemini-3.8-flash')
    request = dict(model=model['litellm_model'], store=False, input=[
        {'role': 'system', 'content': prompt + '\n\nCODEBOOK:\n' + codebook},
        {'role': 'user', 'content': json.dumps(dict(passages=[{'id': p['id'], 'text': p['text']} for p in passages],
                                                  first_pass=original), ensure_ascii=False)}])
    fingerprint = pipeline.digest(dict(source=source, first=first, request=request))
    output.mkdir(parents=True, exist_ok=True)
    manifest = dict(fingerprint=fingerprint, first_pass_path=str((args.input/'annotations.json').resolve()),
                    first_pass_sha256=pipeline.digest(first), request=request)
    path = output/'manifest.json'
    if path.exists() and pipeline.api.read_json(path) != manifest:
        raise ValueError('Review configuration changed; choose another --output')
    pipeline.api.write_json(path, manifest)
    (output/'prompt.md').write_text(prompt, encoding='utf-8')
    review_path = output/'review.json'
    if review_path.exists():
        review = pipeline.api.read_json(review_path)
        updated, changes = apply_review(original, passages, review)
    else:
        from dotenv import load_dotenv
        load_dotenv(pipeline.ROOT/'.env')
        from litellm import aresponses
        for attempt in range(3):
            attempt_id = uuid.uuid4().hex
            def log(event, **fields):
                with (output/'api_calls.jsonl').open('a', encoding='utf-8') as f:
                    f.write(json.dumps(dict(event=event, attempt_id=attempt_id, timestamp=pipeline.api.now(), **fields), ensure_ascii=False)+'\n')
            log('request', request=request)
            try:
                response = await aresponses(**request, timeout=180)
                raw = response.model_dump(mode='json')
            except Exception as exc:
                log('error', error={'type': type(exc).__name__, 'status_code': getattr(exc, 'status_code', None)})
                raise
            log('response', response=raw)
            text = pipeline.api.output_text(raw).strip()
            try:
                if raw.get('status', 'completed') != 'completed':
                    raise ValueError('Incomplete response')
                payload = text[8:-3].strip() if text.startswith('```json\n') and text.endswith('```') else text
                review = json.loads(payload)
                updated, changes = apply_review(original, passages, review)
                break
            except (ValueError, KeyError, TypeError) as exc:
                log('validation_error', error=str(exc))
                if attempt == 2:
                    raise
                request['input'].extend([{'role':'assistant','content':text}, {'role':'user','content':f'Validation failed: {exc}. Return a complete corrected review.'}])
        pipeline.api.write_json(review_path, review)
    pipeline.api.write_json(output/'annotations_proposed.json', dict(fingerprint=fingerprint, inventory=updated,
                              review_status='llm_proposed_not_human_adjudicated'))
    pipeline.api.write_json(output/'changes.json', changes)
    def cell(value):
        return html.escape(str(value)).replace('|', '&#124;').replace('\n','<br>')
    texts = {p['id']:p['text'] for p in passages}
    lines = ['# Second-pass annotation review', '',
             f'Gemini-3.8-flash reviewed {len(passages)} passages; proposed {len(changes)} passage revisions.', '',
             '**Proposals, not adjudicated corrections.** Source text, segmentation, subtopics and instance links are unchanged.', '',
             '[First-pass report](../results.md) | [Review prompt](prompt.md) | [Proposed annotations](annotations_proposed.json) | [Full change log](changes.json)', '',
             '| Passage | Source text | Before: primary / secondary | Proposed: primary / secondary | Reason |',
             '|---|---|---|---|---|']
    for c in changes:
        labels = lambda a: a['primary_function'] + ' / ' + ', '.join(a['secondary_functions'])
        lines.append('| '+' | '.join(cell(v) for v in [c['passage_id'], texts[c['passage_id']], labels(c['before']), labels(c['after']), c['reason']])+' |')
    lines.extend(['', '## Unresolved issues', ''])
    lines.extend(f"- {i['passage_id']}: {i['reason']}" for i in review['unresolved'])
    if not review['unresolved']:
        lines.append('None flagged by the reviewer. This does not establish that every label is correct.')
    (output/'results.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')
    assert pipeline.api.read_json(args.input/'annotations.json') == first
    print(f'{len(passages)} reviewed; {len(changes)} proposed revisions; {len(review["unresolved"])} unresolved. Original unchanged.')
    print(output/'results.md')


if __name__ == '__main__':
    asyncio.run(main())
