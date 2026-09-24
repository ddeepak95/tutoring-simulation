"""Compare content-unit counts for strictly on-topic responses."""
import csv
import json
from collections import Counter,defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent/'outputs/multiple'
KINDS=['CONCEPT','EXAMPLE','ANALOGY','PROCEDURE','STUDY_SUPPORT','CAVEAT','OTHER']
CONDITIONS={1:'English prompt / English response',2:'Tamil prompt / Tamil response',3:'English prompt / Tamil response'}

def main():
    rows=[];excluded=[];quality=[]
    for item in json.loads((ROOT/'evaluation_batch_status.json').read_text(encoding='utf-8')):
        if not item['success']:continue
        d=json.loads((Path(item['output'])/'evaluation.json').read_text(encoding='utf-8'))['evaluation']
        errors=[e for u in d['content_units'] for e in u['accuracy']['errors']]
        verdicts=Counter(u['accuracy']['verdict'] for u in d['content_units'])
        quality.append(dict(topic=item['topic'],model=item['model'],condition=item['condition'],condition_label=CONDITIONS[item['condition']],
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
        rows.append(dict(topic=item['topic'],model=item['model'],condition=item['condition'],condition_label=CONDITIONS[item['condition']],
            total=sum(counts.values()),**{k:counts[k] for k in KINDS},source=Path(item['source']).relative_to(ROOT).as_posix()))
    out=ROOT/'content_unit_comparison';out.mkdir(exist_ok=True)
    with (out/'responses.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    with (out/'quality.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(quality[0]));w.writeheader();w.writerows(quality)
    coverage=Counter(r['topic'] for r in rows);matched=sorted(t for t,n in coverage.items() if n==15)
    pair_conditions=defaultdict(set)
    for r in rows: pair_conditions[(r['topic'],r['model'])].add(r['condition'])
    pairs=[list(k) for k,v in pair_conditions.items() if v=={1,2,3}]
    paired=[r for r in rows if [r['topic'],r['model']] in pairs]
    payload=dict(quality=quality,matched_pairs=pairs,rows=rows,excluded=excluded,matched_topics=matched,categories=KINDS)
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
    lines+=['Conditions: 1 = English prompt / English response; 2 = Tamil prompt / Tamil response; 3 = English prompt / Tamil response.','']
    lines+=['## Topic relevance and proposed errors by language','',
        'Off-topic rates use all responses. Error counts use on-topic responses only; skipped assessments are not error-free judgments. Errors are model proposals, counted per unit without global deduplication.','',
        '| Condition | All N | Off-topic | On-topic N | Responses with errors | Error records | Minor | Major |','|---|---|---|---|---|---|---|---|']
    for c in [1,2,3]:
        allq=[r for r in quality if r['condition']==c];oq=[r for r in allq if r['relevance']=='on_topic']
        off=sum(r['relevance']=='off_topic' for r in allq);err=sum(r['error_records']>0 for r in oq)
        lines.append(f"| {CONDITIONS[c]} | {len(allq)} | {off}/{len(allq)} ({off/len(allq):.1%}) | {len(oq)} | {err}/{len(oq)} ({err/len(oq):.1%}) | {sum(r['error_records'] for r in oq)} | {sum(r['minor'] for r in oq)} | {sum(r['major'] for r in oq)} |")
    lines+=['','[Per-response relevance and accuracy CSV](quality.csv)','']
    table('Language comparison: matched topic-model combinations',paired,['condition_label'])
    lines.extend(['Matched comparisons use the same topic and model in all three conditions. English-prompt/Tamil-output versus English-prompt/English-output keeps prompt language fixed. Tamil-prompt/Tamil-output changes both prompt and output language relative to English/English. These are descriptive single-response comparisons, not significance tests.',''])
    table('Language comparison: all on-topic responses',rows,['condition_label'])
    table('Language comparison by topic (matched combinations)',paired,['topic','condition_label'])
    table('Language comparison by model (matched combinations)',paired,['model','condition_label'])
    table('All on-topic responses: model and condition',rows,['model','condition'])
    table('All on-topic responses: topic',rows,['topic'])
    lines+=['## Matched coverage','', 'Topics with all 15 model/condition combinations on-topic: '+(', '.join(matched) or 'None')+'.','']
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
