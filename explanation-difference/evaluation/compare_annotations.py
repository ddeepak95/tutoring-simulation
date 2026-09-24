"""Compare two annotation runs using an explicitly checked passage alignment."""
import argparse
import collections
import csv
import hashlib
import html
import json
from pathlib import Path

import pipeline


def compare(base):
    alignment = pipeline.api.read_json(base/'alignment.json')
    manifests = {lang:pipeline.api.read_json(base/lang/'manifest.json') for lang in ('tamil','english')}
    texts = {lang:{p['id']:p['text'] for p in m['passages']} for lang,m in manifests.items()}
    for lang in texts:
        source = (base/lang/'source.md').read_text(encoding='utf-8')
        if hashlib.sha256(source.encode()).hexdigest() != alignment['source_sha256'][lang]:
            raise ValueError('Alignment is stale')
        ids = [pair[lang] for pair in alignment['pairs']]
        if len(set(ids)) != len(ids) or set(ids) != set(texts[lang]):
            raise ValueError('Alignment must cover every passage exactly once')
    rows, metrics, instances = [], {}, {}
    for stage, filename in [('first_pass','annotations.json'), ('reviewed','review_pass2/annotations_proposed.json')]:
        inventories = {lang:pipeline.api.read_json(base/lang/filename)['inventory'] for lang in texts}
        annotations = {lang:{a['passage_id']:a for a in inv['annotations']} for lang,inv in inventories.items()}
        stage_rows = []
        for pair in alignment['pairs']:
            ta,en = (annotations[lang][pair[lang]] for lang in ('tamil','english'))
            ta_labels = {ta['primary_function'], *ta['secondary_functions']}
            en_labels = {en['primary_function'], *en['secondary_functions']}
            row = dict(stage=stage, tamil_id=pair['tamil'], english_id=pair['english'],
                       tamil_text=texts['tamil'][pair['tamil']], english_text=texts['english'][pair['english']],
                       tamil_primary=ta['primary_function'], english_primary=en['primary_function'],
                       tamil_secondary=','.join(ta['secondary_functions']), english_secondary=','.join(en['secondary_functions']),
                       primary_match=ta['primary_function']==en['primary_function'],
                       function_set_match=ta_labels==en_labels,
                       function_jaccard=len(ta_labels & en_labels)/len(ta_labels | en_labels),
                       format_match=set(ta['formats'])==set(en['formats']),
                       content_pair=any(a['primary_function'] not in {'STRUCTURAL','SOCIAL'} for a in (ta,en)))
            stage_rows.append(row)
        rows.extend(stage_rows)
        content = [r for r in stage_rows if r['content_pair']]
        metrics[stage] = dict(passages=len(stage_rows), primary_matches=sum(r['primary_match'] for r in stage_rows),
                             content_pairs=len(content), content_primary_matches=sum(r['primary_match'] for r in content),
                             exact_function_sets=sum(r['function_set_match'] for r in stage_rows),
                             mean_function_jaccard=sum(r['function_jaccard'] for r in stage_rows)/len(stage_rows),
                             format_matches=sum(r['format_match'] for r in stage_rows))
        instances[stage] = {lang:dict(collections.Counter(i['kind'] for i in inv['instances'])) for lang,inv in inventories.items()}
    with (base/'passage_comparison.csv').open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0])); writer.writeheader(); writer.writerows(rows)
    pipeline.api.write_json(base/'comparison.json', dict(metrics=metrics, instance_counts=instances, alignment=alignment))
    def cell(value):
        return html.escape(str(value)).replace('|','&#124;').replace('\n','<br>')
    lines = ['# Tamil versus English-translation annotation', '',
             'One Claude Tamil-prompt redox response, compared with its saved English translation. Both annotated independently by Gemini-3.8-flash using the same prompt, then reviewed separately using the same reviewer prompt.', '',
             'Alignment: 45 source lines checked for one-to-one semantic correspondence. English/Tamil whitespace and Markdown can differ. No labels were used to establish alignment.', '',
             '| Stage | Primary labels: all passages | Primary labels: content pairs | Full function sets | Formats |',
             '|---|---|---|---|---|']
    for stage,m in metrics.items():
        ratio=lambda a,b:f'{a}/{b} ({100*a/b:.1f}%)'
        lines.append(f"| {stage} | {ratio(m['primary_matches'],m['passages'])} | {ratio(m['content_primary_matches'],m['content_pairs'])} | {ratio(m['exact_function_sets'],m['passages'])} | {ratio(m['format_matches'],m['passages'])} |")
    lines.extend(['', 'Content pairs exclude a pair only when BOTH primary labels are STRUCTURAL or SOCIAL. This denominator can change between stages. Full function sets include primary and secondary labels without regard to ordering.', '',
                  '## Reviewed primary-label disagreements', '', '| Passage | Tamil | English translation | Tamil label | English label |', '|---|---|---|---|---|'])
    for r in rows:
        if r['stage']=='reviewed' and not r['primary_match']:
            lines.append('| '+' | '.join(cell(r[k]) for k in ['tamil_id','tamil_text','english_text','tamil_primary','english_primary'])+' |')
    lines.extend(['', '## Content-instance counts after review', '', '| Kind | Tamil | English |', '|---|---:|---:|'])
    for kind in sorted(set(instances['reviewed']['tamil']) | set(instances['reviewed']['english'])):
        lines.append(f"| {kind} | {instances['reviewed']['tamil'].get(kind,0)} | {instances['reviewed']['english'].get(kind,0)} |")
    lines.extend(['', 'Counts alone do not establish that instances match semantically. This review pass freezes instance identities and links, so it cannot resolve different instance grouping between languages.', '',
                  '## Interpretation limits', '',
                  '- This measures consistency on one paired explanation, not annotation accuracy. Both languages can receive the same wrong label.',
                  '- Differences can arise from translation changes, language-dependent judgment, or stochastic model variation. This experiment cannot isolate those causes.',
                  '- The review codebook was developed for English evaluation text. Applying it to Tamil is an exploratory transfer of the same criteria, not a validated Tamil annotation protocol.',
                  '- Repeated annotations and human bilingual adjudication are needed before generalizing. Proposed reviews are not a gold standard.', '',
                  '[Tamil annotations](tamil/results.md) | [English annotations](english/results.md) | [Tamil review](tamil/review_pass2/results.md) | [English review](english/review_pass2/results.md) | [Passage CSV](passage_comparison.csv)', ''])
    (base/'results.md').write_text('\n'.join(lines),encoding='utf-8')
    print(json.dumps(metrics,indent=2))
    print(base/'results.md')


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base',type=Path,default=pipeline.EXPERIMENT/'outputs/multiple/evaluation/tamil_annotation_comparison')
    compare(parser.parse_args().base)
