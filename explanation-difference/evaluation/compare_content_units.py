"""Compare content-unit counts for strictly on-topic responses."""
import csv
import json
from statistics import mean, median
from markdown_it import MarkdownIt
from collections import Counter,defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent/'outputs/multiple'
KINDS=['CONCEPT','EXAMPLE','ANALOGY','PROCEDURE','STUDY_SUPPORT','CAVEAT','OTHER']
CONDITIONS={1:'English prompt / English response',2:'Tamil prompt / Tamil response',3:'English prompt / Tamil response'}

WORD_COUNT_METHOD = ('Whitespace-separated chunks containing at least one Unicode letter or number, '
    'after removing Markdown formatting and link destinations. Headings, tables, code and equations '
    'are included; equation notation is counted as written. Counts are descriptive length measures, '
    'not equivalent information units across languages.')

def count_words(text):
    parser = MarkdownIt('commonmark').enable('table')
    parts = []
    def visit(tokens):
        for token in tokens:
            if token.children:
                visit(token.children)
            elif token.type in {'text', 'code_inline', 'code_block', 'fence'}:
                parts.append(token.content)
            elif token.type in {'softbreak', 'hardbreak'}:
                parts.append(' ')
            elif token.nesting == -1 and token.block:
                parts.append(' ')
    visit(parser.parse(text))
    return sum(any(c.isalnum() for c in chunk) for chunk in ''.join(parts).split())

def main():
    rows=[];excluded=[];quality=[]
    conditions={}
    all_pairs=defaultdict(set)
    for item in json.loads((ROOT/'evaluation_batch_status.json').read_text(encoding='utf-8')):
        if not item['success']:continue
        item=dict(item)
        item['condition']=item.get('condition_label') or CONDITIONS[item['condition']]
        if item['condition'].startswith('native_prompt:'):
            item['condition']=f"{item['language']} prompt / {item['language']} response"
        elif item['condition'].startswith('english_prompt:'):
            item['condition']=f"English prompt / {item['language']} response"
        conditions[item['condition']]=item['condition']
        all_pairs[item['topic']].add(item['model'])
        d=json.loads((Path(item['output'])/'evaluation.json').read_text(encoding='utf-8'))['evaluation']
        word_count=count_words(json.loads(Path(item['source']).read_text(encoding='utf-8'))['text'])
        errors=[e for u in d['content_units'] for e in u['accuracy']['errors']]
        verdicts=Counter(u['accuracy']['verdict'] for u in d['content_units'])
        quality.append(dict(topic=item['topic'],model=item['model'],condition=item['condition'],condition_label=item['condition'],word_count=word_count,
            relevance=d['topic_relevance']['topic_match'],reason=d['topic_relevance']['reason'],
            error_records=len(errors),minor=sum(e['severity']=='minor' for e in errors),major=sum(e['severity']=='major' for e in errors),
            erroneous_units=verdicts['contains_error'],assessed_units=verdicts['accurate']+verdicts['contains_error'],
            uncertain_units=verdicts['uncertain'],skipped_units=verdicts['not_assessed_due_to_topic_mismatch'],
            error_details=[dict(content_unit_id=u['id'],content_unit_label=u['label'],**e) for u in d['content_units'] for e in u['accuracy']['errors']],
            report=Path(item['output']).relative_to(ROOT).as_posix()+'/results.md'))
        if d['topic_relevance']['topic_match']!='on_topic':
            excluded.append(dict(topic=item['topic'],model=item['model'],condition=item['condition'],relevance=d['topic_relevance']['topic_match']))
            continue
        counts=Counter(u['kind'] for u in d['content_units'])
        rows.append(dict(topic=item['topic'],model=item['model'],condition=item['condition'],condition_label=item['condition'],word_count=word_count,
            total=sum(counts.values()),**{k:counts[k] for k in KINDS},source=Path(item['source']).relative_to(ROOT).as_posix()))
    out=ROOT/'content_unit_comparison';out.mkdir(exist_ok=True)
    with (out/'responses.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    with (out/'quality.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(quality[0]));w.writeheader();w.writerows(quality)
    coverage=Counter(r['topic'] for r in rows)
    expected=set(conditions)
    matched=sorted(t for t,n in coverage.items() if n==len(all_pairs[t])*len(expected))
    pair_conditions=defaultdict(set)
    for r in rows: pair_conditions[(r['topic'],r['model'])].add(r['condition'])
    pairs=[list(k) for k,v in pair_conditions.items() if v==expected]
    paired=[r for r in rows if [r['topic'],r['model']] in pairs]
    payload=dict(word_count_method=WORD_COUNT_METHOD,conditions=conditions,quality=quality,matched_pairs=pairs,rows=rows,excluded=excluded,matched_topics=matched,categories=KINDS)
    (out/'comparison.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=['# On-topic content-unit comparison','',f'{len(rows)} on-topic responses included; {len(excluded)} excluded. Counts are model annotations, not quality scores. Organizational passages do not count as units.','',
           '[Interactive comparison](comparison.html) | [Per-response CSV](responses.csv)','',
           'All tables show mean units per response. N is the number of included responses; unequal topic coverage can affect comparisons. Category means sum to total means before rounding.','']
    def table(title,subset,keys):
        groups=defaultdict(list)
        for r in subset:groups[tuple(r[k] for k in keys)].append(r)
        lines.extend(['## '+title,'','| '+' | '.join(keys+['N','Total']+KINDS)+' |','|'+'|'.join(['---']*(len(keys)+2+len(KINDS)))+'|'])
        for key,group in sorted(groups.items()):
            values=list(map(str,key))+[str(len(group))]+[f"{sum(r[k] for r in group)/len(group):.2f}" for k in ['total']+KINDS]
            lines.append('| '+' | '.join(values)+' |')
        lines.append('')
    lines+=['Conditions use explicit prompt and response languages; native_prompt means both use the target language.','']
    lines+=['## Topic relevance and proposed errors by language','',
        'Off-topic rates use all responses. Error counts use on-topic responses only; skipped assessments are not error-free judgments. Errors are model proposals, counted per unit without global deduplication.','',
        '| Condition | All N | Off-topic | On-topic N | Responses with errors | Error records | Minor | Major |','|---|---|---|---|---|---|---|---|']
    for c in sorted(conditions):
        allq=[r for r in quality if r['condition']==c];oq=[r for r in allq if r['relevance']=='on_topic']
        off=sum(r['relevance']=='off_topic' for r in allq);err=sum(r['error_records']>0 for r in oq)
        lines.append(f"| {conditions[c]} | {len(allq)} | {off}/{len(allq)} ({off/max(1,len(allq)):.1%}) | {len(oq)} | {err}/{len(oq)} ({err/max(1,len(oq)):.1%}) | {sum(r['error_records'] for r in oq)} | {sum(r['minor'] for r in oq)} | {sum(r['major'] for r in oq)} |")
    lines+=['','[Per-response relevance and accuracy CSV](quality.csv)','']
    table('Language comparison: matched topic-model combinations',paired,['condition_label'])
    lines.extend([f'Matched comparisons use the same topic and model in all {len(expected)} conditions. Comparing English-prompt conditions keeps prompt language fixed while output language varies. Comparing native-prompt conditions with English/English changes both prompt and output language. These are descriptive single-response comparisons, not significance tests.',''])
    table('Language comparison: all on-topic responses',rows,['condition_label'])
    table('Language comparison by topic (matched combinations)',paired,['topic','condition_label'])
    table('Language comparison by model (matched combinations)',paired,['model','condition_label'])
    table('All on-topic responses: model and condition',rows,['model','condition'])
    table('All on-topic responses: topic',rows,['topic'])
    lines+=['## Word-count comparison', '', WORD_COUNT_METHOD, '',
             'Uses the same on-topic coverage as the content comparison. N counts responses.', '']
    for title, subset in [('Matched topic-model combinations', paired), ('All on-topic responses', rows)]:
        lines += ['### '+title, '', '| Condition | N | Mean words | Median words | Min | Max |', '|---|---|---|---|---|---|']
        for condition in sorted(conditions):
            values=[r['word_count'] for r in subset if r['condition']==condition]
            if values:
                lines.append(f"| {condition} | {len(values)} | {mean(values):.1f} | {median(values):.1f} | {min(values)} | {max(values)} |")
        lines.append('')
    lines+=['## Matched coverage','', 'Topics with every model/condition combination on-topic: '+(', '.join(matched) or 'None')+'.','']
    if matched:table('Matched topics only: model and condition',[r for r in rows if r['topic'] in matched],['model','condition'])
    lines+=['## Excluded responses','','| Topic | Model | Condition | Relevance |','|---|---|---|---|']
    for r in excluded:lines.append('| '+' | '.join(str(r[k]) for k in ['topic','model','condition','relevance'])+' |')
    (out/'results.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    template=Path(__file__).with_name('content_comparison.html').read_text(encoding='utf-8')
    embedded=json.dumps(payload,ensure_ascii=False).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
    (out/'comparison.html').write_text(template.replace('__DATA__',embedded),encoding='utf-8')
    print(json.dumps(dict(included=len(rows),excluded=len(excluded),coverage=coverage,matched_topics=matched),indent=2))
    for m in sorted({r['model'] for r in rows}):
        group=[r for r in rows if r['model']==m]; print(m,len(group),round(sum(r['total'] for r in group)/len(group),2))

if __name__=='__main__':main()
