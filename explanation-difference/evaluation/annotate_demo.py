"""Run one line-segmented annotation pilot; no batch-wide changes."""
import argparse
import asyncio
import html
import json
from pathlib import Path

import pipeline

FUNCTIONS = set('DEF CONCEPT ILLUSTRATION WORKED REALWORLD ANALOGY PROCEDURE CAVEAT STUDY_TIP PRACTICE RECAP SOCIAL STRUCTURAL OTHER'.split())
FORMATS = set('prose equation list table diagram heading separator'.split())
KINDS = set('illustrative_example worked_example realworld_example analogy procedure study_tip practice_question'.split())
FLAGS = set('ambiguous_function unclear_boundary translation_issue possible_factual_issue uncertain_instance_merge unmapped_subtopic other_content'.split())
ATTRS = dict(depth={'descriptive','explanatory'}, step_role={'setup','reasoning','answer','combined'},
             solution_status={'complete','partial'}, context_detail={'named_only','described','mechanism_linked'},
             response_provided={'none','answer_only','worked_solution'},
             tip_kind={'mnemonic','memory_association','exam_strategy','study_strategy'},
             caveat_kind={'misconception','exception','limitation','qualification'})


def segment(text):
    passages, cursor = [], 0
    for line in text.splitlines(keepends=True):
        content = line.rstrip('\r\n')
        if content.strip():
            passages.append(dict(id=f'p{len(passages)+1}', start=cursor, end=cursor+len(content), text=content))
        cursor += len(line)
    assert all(text[p['start']:p['end']] == p['text'] for p in passages)
    return passages


def validate(data, passages):
    if set(data) != {'subtopics','instances','annotations'}:
        raise ValueError('Unexpected top-level keys')
    pids = [p['id'] for p in passages]
    if [a['passage_id'] for a in data['annotations']] != pids:
        raise ValueError('Missing, reordered or duplicated passage annotations')
    for key, prefix in [('subtopics','s'), ('instances','i')]:
        if [r['id'] for r in data[key]] != [f'{prefix}{i+1}' for i in range(len(data[key]))]:
            raise ValueError('Invalid inventory IDs')
        if any(not isinstance(r.get('label'), str) or not r['label'].strip() for r in data[key]):
            raise ValueError('Empty inventory label')
    sids = {s['id'] for s in data['subtopics']}
    instances = {i['id']:i for i in data['instances']}
    for inst in instances.values():
        if inst['kind'] not in KINDS or not inst['passage_ids'] or not set(inst['passage_ids']) <= set(pids):
            raise ValueError('Invalid instance')
    for a in data['annotations']:
        if a['primary_function'] not in FUNCTIONS or not set(a['secondary_functions']) <= FUNCTIONS:
            raise ValueError('Invalid teaching function')
        if a['primary_function'] in a['secondary_functions']:
            raise ValueError('Duplicate primary/secondary label')
        if not a['formats'] or not set(a['formats']) <= FORMATS:
            raise ValueError('Invalid format')
        if not set(a['subtopic_ids']) <= sids or not set(a['instance_ids']) <= set(instances):
            raise ValueError('Unknown inventory reference')
        if not set(a['review_flags']) <= FLAGS or not a['rationale'].strip():
            raise ValueError('Missing rationale or invalid flag')
        for key, value in a['attributes'].items():
            if key not in ATTRS or value not in ATTRS[key]:
                raise ValueError('Invalid attribute')
        for iid, inst in instances.items():
            if (iid in a['instance_ids']) != (a['passage_id'] in inst['passage_ids']):
                raise ValueError('Instance links disagree')
    return data


async def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=pipeline.EXPERIMENT / 'outputs/multiple/evaluation/translate/ch-4_redox_reactions/run-001-c7bea64c2c8a45b4.json')
    parser.add_argument('--output', type=Path, default=pipeline.EXPERIMENT / 'outputs/multiple/evaluation/annotation_demo')
    args = parser.parse_args()
    source = pipeline.api.read_json(args.source)
    if source['status'] != 'completed':
        raise ValueError('Source not completed')
    text = source['english_text'] if 'english_text' in source else source['text']
    passages = segment(text)
    prompt = (pipeline.HERE / 'annotation_prompt.md').read_text(encoding='utf-8')
    model = pipeline.model_config('gemini-3.8-flash')
    request = dict(model=model['litellm_model'], store=False, input=[
        {'role':'system', 'content':prompt},
        {'role':'user', 'content':json.dumps({'topic':source['job'].get('topic_name','redox reactions'),
             'passages':[{'id':p['id'], 'text':p['text']} for p in passages]}, ensure_ascii=False)}])
    args.output.mkdir(parents=True, exist_ok=True)
    signature = pipeline.digest({'request':request, 'source':pipeline.digest(source)})
    manifest = dict(fingerprint=signature, source=str(args.source.resolve()), source_sha256=pipeline.digest(source),
                    text_sha256=pipeline.digest(text), request=request, passages=passages,
                    segmentation='nonempty_source_lines', schema_version='pilot-0.1')
    path = args.output / 'manifest.json'
    if path.exists() and pipeline.api.read_json(path) != manifest:
        raise ValueError('Changed configuration: choose another output folder')
    pipeline.api.write_json(path, manifest)
    (args.output / 'source.md').write_text(text, encoding='utf-8')
    (args.output / 'prompt.md').write_text(prompt, encoding='utf-8')
    final = args.output / 'annotations.json'
    if final.exists():
        data = validate(pipeline.api.read_json(final)['inventory'], passages)
    else:
        from dotenv import load_dotenv
        load_dotenv(pipeline.ROOT / '.env')
        from litellm import aresponses
        for attempt in range(1,4):
            def log(event, **fields):
                with (args.output/'api_calls.jsonl').open('a',encoding='utf-8') as f:
                    f.write(json.dumps(dict(event=event, timestamp=pipeline.api.now(), attempt=attempt, **fields),ensure_ascii=False)+'\n')
            log('request',request=request)
            response = await aresponses(**request, timeout=180)
            raw = response.model_dump(mode='json')
            log('response',response=raw)
            raw_text = pipeline.api.output_text(raw)
            try:
                if raw.get('status','completed') != 'completed':
                    raise ValueError('Incomplete response')
                payload = raw_text.strip()
                if payload.startswith('```json\n') and payload.endswith('```'):
                    payload = payload[8:-3].strip()
                data = validate(json.loads(payload), passages)
                break
            except (ValueError, KeyError, TypeError) as exc:
                log('validation_error',error=str(exc))
                if attempt == 3:
                    raise
                request['input'].extend([{'role':'assistant','content':raw_text},
                    {'role':'user','content':f'Validation failed: {exc}. Return the complete corrected JSON.'}])
        pipeline.api.write_json(final, dict(fingerprint=signature, inventory=data, review_status='unreviewed'))
    by_id = {p['id']:p for p in passages}
    enriched = [{**a, **{k:v for k,v in by_id[a['passage_id']].items() if k != 'id'}} for a in data['annotations']]
    pipeline.api.write_json(args.output/'annotated_spans.json', enriched)
    def cell(value):
        return html.escape(str(value)).replace('|','&#124;').replace('\n','<br>')
    lines = ['# Annotation demonstration', '', 'Judge: Gemini-3.8-flash. Source: one Claude redox explanation.', '',
             '**Unreviewed pilot:** deterministic line segmentation; labels need human review. This is not a quality score.', '',
             '[Original explanation](source.md) | [Judge prompt](prompt.md) | [Annotated spans](annotated_spans.json) | [Inventory](annotations.json)', '',
             '| Passage | Source text | Primary | Secondary | Format | Instances | Rationale |',
             '|---|---|---|---|---|---|---|']
    for a in enriched:
        lines.append('| '+' | '.join(cell(v) for v in [a['passage_id'],a['text'],a['primary_function'],
             ', '.join(a['secondary_functions']),', '.join(a['formats']),', '.join(a['instance_ids']),a['rationale']])+' |')
    lines.extend(['', '## Content instances', ''])
    for inst in data['instances']:
        lines.append(f"- **{inst['id']} {inst['kind']}**: {inst['label']} ({', '.join(inst['passage_ids'])})")
    (args.output/'results.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(f"Validated {len(passages)} passages, {len(data['subtopics'])} subtopics, {len(data['instances'])} instances. Report: {args.output/'results.md'}")


if __name__ == '__main__':
    asyncio.run(main())
