"""Run and validate the expanded Stage 1 annotation for a single explanation."""
import argparse,asyncio,json,re
from pathlib import Path
from run_demo import resolve,pipeline,HERE

ATTRS={'CONCEPT':{'depth':{'statement','explanation'}},'EXAMPLE':{'context':{'abstract_or_hypothetical','real_world'},'treatment':{'illustrative','worked'}},'STUDY_SUPPORT':{'subtype':{'mnemonic','recap','practice_question','study_strategy'}},'CAVEAT':{'subtype':{'misconception','exception','limitation','qualification'}},'ANALOGY':{},'PROCEDURE':{},'OTHER':{}}
def validate(d,text,topic):
    assert set(d)=={'topic_relevance','content_units','ambiguities'},'Unexpected top-level fields'
    resolved=resolve(d,text);ids={u['id'] for u in d['content_units']};t=d['topic_relevance']
    assert t['requested_topic']==topic and t['observed_topic'] and t['reason']
    assert t['topic_match'] in {'on_topic','partially_on_topic','off_topic','unclear'}
    off=t['topic_match']=='off_topic'
    assert t['major_task_failure'] is off and set(t['content_unit_ids'])<=ids
    def evidence(items,u):
        assert isinstance(items,list) and items,'Missing evidence'
        for e in items:
            i=e['excerpt_index'];assert type(i) is int and 0<=i<len(u['excerpts'])
            assert e['quote'] and e['quote'] in u['excerpts'][i]['text'],'Evidence quote mismatch'
    for n,u in enumerate(d['content_units'],1):
        assert u['id']==f'u{n}'
        assert set(u)=={'id','kind','label','excerpts','attributes','contextualization','accuracy'}
        expected=ATTRS[u['kind']];assert set(u['attributes'])==set(expected)
        for key,value in u['attributes'].items():
            if value is None:assert any(u['id'] in a['unit_ids'] and key in a['issue'] for a in d['ambiguities'])
            else:assert value in expected[key]
        c=u['contextualization'];assert c['value'] in {'none','everyday','localized'}
        if c['value']=='none':assert c['evidence']==[]
        else:evidence(c['evidence'],u)
        a=u['accuracy'];assert a['verdict'] in {'accurate','contains_error','uncertain','not_applicable','not_assessed_due_to_topic_mismatch'} and a['reason']
        assert off==(a['verdict']=='not_assessed_due_to_topic_mismatch')
        assert isinstance(a['errors'],list) and (a['verdict']=='contains_error')==bool(a['errors'])
        for e in a['errors']:
            assert e['severity'] in {'minor','major'} and e['description'] and e['correction'];evidence(e['evidence'],u)
    return resolved

async def main():
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--prompt',type=Path,default=HERE/'stage1_prompt.md');args=p.parse_args()
    source=pipeline.api.read_json(args.source);assert source['status']=='completed';j=source['job'];text=source['text']
    topic=j.get('topic_name')
    if not topic:
        import csv
        topic_id=next(p.name.split('_',1)[0] for p in args.source.parents if p.name.startswith('ch-'))
        with (pipeline.EXPERIMENT/'content/keywords.csv').open(encoding='utf-8-sig',newline='') as f:
            topic=next(row['en'] for row in csv.DictReader(f) if row['id']==topic_id)
    language=j.get('response_language_name') or ('English' if j['run_index']==1 else 'Tamil')
    payload=dict(subject=j.get('subject','Chemistry'),topic_name_en=topic,response_language=language,original_prompt=j['prompt'],source=text)
    prompt=args.prompt.read_text(encoding='utf-8');model=pipeline.model_config('gemini-3.8-flash')['litellm_model']
    out=args.output;out.mkdir(parents=True,exist_ok=True)
    manifest=dict(source=str(args.source.resolve()),source_hash=pipeline.digest(source),system_prompt=prompt,model=model,payload=payload)
    if (out/'manifest.json').exists():assert pipeline.api.read_json(out/'manifest.json')==manifest,'Changed inputs: choose a new output'
    pipeline.api.write_json(out/'manifest.json',manifest);(out/'source.md').write_text(text,encoding='utf-8');(out/'prompt.md').write_text(prompt,encoding='utf-8')
    if (out/'stage1.json').exists():d=pipeline.api.read_json(out/'stage1.json');resolved=validate(d,text,payload['topic_name_en'])
    else:
        from dotenv import load_dotenv
        load_dotenv(pipeline.ROOT/'.env')
        from litellm import aresponses
        request=dict(model=model,store=False,input=[dict(role='system',content=prompt),dict(role='user',content=json.dumps(payload,ensure_ascii=False))])
        for attempt in range(1,4):
            def log(event,**kw):
                with (out/'api_calls.jsonl').open('a',encoding='utf-8') as f:f.write(json.dumps(dict(event=event,attempt=attempt,timestamp=pipeline.api.now(),**kw),ensure_ascii=False)+'\n')
            log('request',request=request)
            try:raw=(await aresponses(**request,timeout=240)).model_dump(mode='json')
            except Exception as exc:log('error',error_type=type(exc).__name__);raise
            log('response',response=raw);answer=pipeline.api.output_text(raw).strip()
            try:
                assert raw.get('status','completed')=='completed'
                d=json.loads(re.sub(r'^```(?:json)?\s*|\s*```$','',answer));resolved=validate(d,text,payload['topic_name_en']);break
            except (AssertionError,ValueError,KeyError,TypeError) as exc:
                log('validation_error',message=str(exc))
                if attempt==3:raise
                request['input'] += [dict(role='assistant',content=answer),dict(role='user',content='Validation failed: '+str(exc)+'. Return the complete corrected annotation as JSON, following the system prompt.')]
        pipeline.api.write_json(out/'stage1.json',d)
    pipeline.api.write_json(out/'stage1_resolved.json',resolved)
    lines=['# Stage 1: '+payload['response_language']+' / '+payload['topic_name_en'],'','Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.','','## Topic relevance','',json.dumps(d['topic_relevance'],ensure_ascii=False,indent=2),'','| Unit | Kind | Label | Attributes | Accuracy |','|---|---|---|---|---|']
    cell=lambda v:str(v).replace('|','&#124;').replace('\n',' ')
    for u in d['content_units']:lines.append('| '+' | '.join(map(cell,[u['id'],u['kind'],u['label'],json.dumps(u['attributes']),u['accuracy']['verdict']]))+' |')
    for u in d['content_units']:
        lines+=['','## '+u['id']+': '+u['label'],'','```json',json.dumps({k:u[k] for k in ['attributes','contextualization','accuracy']},ensure_ascii=False,indent=2),'```','']
        for e in u['excerpts']:lines+=['```text',e['text'],'```','']
    lines+=['## Ambiguities','','```json',json.dumps(d['ambiguities'],ensure_ascii=False,indent=2),'```','','## Unassigned text for coverage review','']
    for g in resolved['unassigned_spans']:lines+=['```text',g['text'],'```','']
    (out/'results.md').write_text('\n'.join(lines),encoding='utf-8')
    print(f'Validated {len(d["content_units"])} units; relevance: {d["topic_relevance"]["topic_match"]}; report: {out / "results.md"}',flush=True)

if __name__=='__main__':asyncio.run(main())
