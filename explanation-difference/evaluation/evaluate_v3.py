"""One-response v0.10 pilot with subject, English topic and original-language text."""
import argparse
import asyncio
from collections import Counter
import html
import json
import uuid
from pathlib import Path

import jsonschema
import annotate_demo
import pipeline


def obj(properties):
    return dict(type='object', properties=properties, required=list(properties), additionalProperties=False)


def enum(*values):
    return dict(enum=list(values))


STR = {'type':'string', 'minLength':1}
IDS = {'type':'array','items':STR,'uniqueItems':True}
KINDS = ['CONCEPT','EXAMPLE','ANALOGY','PROCEDURE','STUDY_SUPPORT','CAVEAT','ORGANIZATION','OTHER']
RULES = {
    'CONCEPT':{'depth':['statement','explanation']},
    'EXAMPLE':{'context':['abstract_or_hypothetical','real_world'],'treatment':['illustrative','worked']},
    'STUDY_SUPPORT':{'subtype':['mnemonic','recap','practice_question','study_strategy']},
    'CAVEAT':{'subtype':['misconception','exception','limitation','qualification']},
    'ORGANIZATION':{'subtype':['structural','social']}}
ATTR = {'type':'object','additionalProperties':False,'properties':{
    'depth':enum('statement','explanation',None),
    'context':enum('abstract_or_hypothetical','real_world',None),
    'treatment':enum('illustrative','worked',None),
    'subtype':enum('mnemonic','recap','practice_question','study_strategy','misconception','exception','limitation','qualification','structural','social',None)}}
PASSAGE = obj({'id':STR,'category':enum(*KINDS),'attributes':ATTR,
    'formats':{'type':'array','minItems':1,'uniqueItems':True,'items':enum(*sorted(annotate_demo.FORMATS))},'review_flags':IDS})
# The program attaches these optional output fields from the original, never from model offsets.
PASSAGE['properties'].update(text=STR,start={'type':'integer','minimum':0},end={'type':'integer','minimum':0})
SCHEMA = obj({
    'topic_relevance':obj({'requested_topic':STR,'observed_topic':STR,'topic_match':enum('on_topic','partially_on_topic','off_topic','unclear'),
        'content_unit_ids':IDS,'reason':STR,'major_task_failure':{'type':'boolean'}}),
    'subtopics':{'type':'array','items':obj({'id':STR,'label':STR})},
    'content_units':{'type':'array','items':obj({'id':STR,'kind':enum(*(k for k in KINDS if k!='ORGANIZATION')),'label':STR,'attributes':ATTR,
        'subtopic_ids':IDS,'rationale':STR,'review_flags':IDS,
        'contextualization':obj({'value':enum('none','everyday','localized'),
            'evidence':{'type':'array','items':obj({'passage_id':STR,'quote':STR})}}),
        'passages':{'type':'array','minItems':1,'items':PASSAGE},
        'accuracy':obj({'verdict':enum('accurate','contains_error','uncertain','not_applicable','not_assessed_due_to_topic_mismatch'),
            'reason':STR,'errors':{'type':'array','items':obj({'passage_ids':{'type':'array','minItems':1,'uniqueItems':True,'items':STR},
                'description':STR,'correction':STR,'severity':enum('minor','major')})}})})}
})


def validate(data, passages, topic):
    jsonschema.validate(data, SCHEMA)
    lookup={p['id']:p for p in passages}; order={p['id']:n for n,p in enumerate(passages)}
    def refs(ids, allowed):
        if not set(ids)<=set(allowed): raise ValueError('Unknown link: '+str(set(ids)-set(allowed)))
    def attributes(kind, attrs, flags, passage=False):
        rules={} if passage and kind=='EXAMPLE' else RULES.get(kind,{})
        if set(attrs)!=set(rules): raise ValueError('Wrong attributes for '+kind+': expected '+str(list(rules)))
        for k,v in attrs.items():
            if v is None:
                if not flags: raise ValueError('Null attribute needs review flag')
            elif v not in rules[k]: raise ValueError('Wrong attribute value for '+kind)
        if kind=='OTHER' and not flags: raise ValueError('OTHER needs review flag')
    if data['topic_relevance']['requested_topic']!=topic: raise ValueError('Requested topic must equal topic_name_en')
    for rows,prefix in [(data['subtopics'],'s'),(data['content_units'],'u')]:
        if [r['id'] for r in rows]!=[f'{prefix}{i+1}' for i in range(len(rows))]: raise ValueError('Invalid inventory IDs')
    refs(data['topic_relevance']['content_unit_ids'],[u['id'] for u in data['content_units']])
    off=data['topic_relevance']['topic_match']=='off_topic'
    if off!=data['topic_relevance']['major_task_failure']: raise ValueError('Task failure inconsistent')
    seen=[]; first=[]
    for u in data['content_units']:
        ids=[p['id'] for p in u['passages']]; refs(ids,lookup)
        seen.extend(ids); first.append(order[ids[0]])
        if [order[x] for x in ids]!=sorted(order[x] for x in ids): raise ValueError('Nested passages must follow source order')
        refs(u['subtopic_ids'],[s['id'] for s in data['subtopics']])
        attributes(u['kind'],u['attributes'],u['review_flags'])
        if not any(p['category']==u['kind'] for p in u['passages']) and not (u['kind']=='OTHER' and 'no_substantive_content' in u['review_flags'] and all(p['category']=='ORGANIZATION' for p in u['passages']) and (off or u['accuracy']['verdict']=='not_applicable')): raise ValueError('Unit needs a passage of its kind')
        for p in u['passages']:
            attributes(p['category'],p['attributes'],p['review_flags'],passage=True)
            for k in ['text','start','end']:
                if k in p and p[k]!=lookup[p['id']][k]: raise ValueError('Source text or offset mismatch')
        ctx=u['contextualization']
        if (ctx['value']=='none')!= (len(ctx['evidence'])==0): raise ValueError('Context evidence inconsistent')
        for e in ctx['evidence']:
            refs([e['passage_id']],ids)
            if e['quote'] not in lookup[e['passage_id']]['text']: raise ValueError('Context quote not found')
        acc=u['accuracy']
        if off!=(acc['verdict']=='not_assessed_due_to_topic_mismatch'): raise ValueError('Accuracy topic gate inconsistent')
        if (acc['verdict']=='contains_error')!=bool(acc['errors']): raise ValueError('Error list inconsistent with verdict')
        for e in acc['errors']: refs(e['passage_ids'],ids)
    if Counter(seen)!=Counter(lookup.keys()): raise ValueError('Each input passage must occur exactly once across units')
    if first!=sorted(first): raise ValueError('Units must follow first source occurrence')
    return data


def enrich(data, passages):
    lookup={p['id']:p for p in passages}
    for p in [p for u in data['content_units'] for p in u['passages']]:
        p.update({k:lookup[p['id']][k] for k in ['text','start','end']})
    return data


def metrics(data):
    units=data['content_units']; substantive=[u for u in units if 'no_substantive_content' not in u['review_flags']]
    errors=[e for u in units for e in u['accuracy']['errors']]
    return dict(total_content_units=len(units),substantive_content_units=len(substantive),
        total_passages=sum(len(u['passages']) for u in units),
        content_unit_kinds=dict(Counter(u['kind'] for u in units)),
        nested_passages=sum(len(u['passages']) for u in units),unique_subtopics=len(data['subtopics']),
        contextualization=dict(Counter(u['contextualization']['value'] for u in substantive)),
        proposed_substantive_verdicts=dict(Counter(u['accuracy']['verdict'] for u in substantive)),
        proposed_error_records=len(errors),proposed_error_severity=dict(Counter(e['severity'] for e in errors)),
        note='LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated.')


async def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',type=Path,default=pipeline.EXPERIMENT/'outputs/multiple/ch-4_redox_reactions/tamil-native/claude-sonnet-5__3884e8d4c759.json')
    parser.add_argument('--output',type=Path,default=pipeline.EXPERIMENT/'outputs/multiple/ch-4_redox_reactions/tamil-native/evaluation/claude-sonnet-5__3884e8d4c759')
    parser.add_argument('--subject', required=True, help='Discipline, e.g. Chemistry, Physics or History')
    parser.add_argument('--response-language', default='Tamil', help='Language of the source explanation')
    args=parser.parse_args()
    if not args.subject.strip() or not args.response_language.strip(): parser.error('Subject and response language must be nonempty')
    source=pipeline.api.read_json(args.source)
    if source['status']!='completed': raise ValueError('Incomplete source')
    topic=source['job'].get('topic_name')
    if not topic:
        import csv
        topic_id=next(p.name.split('_',1)[0] for p in args.source.parents if p.name.startswith('ch-'))
        with (pipeline.EXPERIMENT/'content/keywords.csv').open(encoding='utf-8-sig',newline='') as f:
            topic=next(r['en'] for r in csv.DictReader(f) if r['id']==topic_id)
    passages=annotate_demo.segment(source['text'])
    prompt=(pipeline.HERE/'evaluation_v3_prompt.md').read_text(encoding='utf-8')
    payload=dict(subject=args.subject,topic_name_en=topic,original_prompt=source['job']['prompt'],response_language=args.response_language,
                 passages=[{'id':p['id'],'text':p['text']} for p in passages],output_schema=SCHEMA)
    request=dict(model=pipeline.model_config('gemini-3.8-flash')['litellm_model'],store=False,input=[{'role':'system','content':prompt},{'role':'user','content':json.dumps(payload,ensure_ascii=False)}])
    signature=pipeline.digest({'source':source,'request':request})
    output=args.output; output.mkdir(parents=True,exist_ok=True)
    manifest=dict(fingerprint=signature,source_path=str(args.source.resolve()),source_sha256=pipeline.digest(source),subject=args.subject,response_language=args.response_language,topic_name_en=topic,request=request,passages=passages,schema_version='0.10-pilot')
    if (output/'manifest.json').exists() and pipeline.api.read_json(output/'manifest.json')!=manifest: raise ValueError('Choose a new output directory for changed inputs')
    pipeline.api.write_json(output/'manifest.json',manifest)
    pipeline.api.write_json(output/'schema.json',SCHEMA)
    (output/'prompt.md').write_text(prompt,encoding='utf-8'); (output/'source.md').write_text(source['text'],encoding='utf-8')
    final=output/'evaluation.json'
    if final.exists(): data=validate(pipeline.api.read_json(final)['evaluation'],passages,topic)
    else:
        from dotenv import load_dotenv
        load_dotenv(pipeline.ROOT/'.env')
        from litellm import aresponses
        for attempt in range(3):
            aid=uuid.uuid4().hex
            def log(event,**fields):
                with (output/'api_calls.jsonl').open('a',encoding='utf-8') as f: f.write(json.dumps(dict(event=event,attempt_id=aid,timestamp=pipeline.api.now(),**fields),ensure_ascii=False)+'\n')
            log('request',request=request)
            try:
                response=await aresponses(**request,timeout=240)
                raw=response.model_dump(mode='json')
            except Exception as exc:
                log('error',error_type=type(exc).__name__); raise
            log('response',response=raw)
            text=pipeline.api.output_text(raw).strip()
            try:
                if raw.get('status','completed')!='completed': raise ValueError('Incomplete response')
                candidate=text[8:-3].strip() if text.startswith('```json\n') and text.endswith('```') else text
                data=validate(json.loads(candidate),passages,topic); break
            except (ValueError,KeyError,TypeError,jsonschema.ValidationError) as exc:
                msg=exc.message if isinstance(exc,jsonschema.ValidationError) else str(exc)
                log('validation_error',message=msg)
                if attempt==2: raise
                request['input'].extend([{'role':'assistant','content':text},{'role':'user','content':'Validation failed: '+msg+'. Return the full corrected JSON; retain all passages and content units.'}])
        data=enrich(data,passages)
        validate(data,passages,topic)
        pipeline.api.write_json(final,dict(schema_version='0.10-pilot',fingerprint=signature,evaluation=data,review_status='proposed',
            provenance={'original_path':str(args.source.resolve()),'original_sha256':pipeline.digest(source),'evaluation_language':args.response_language,'subject':args.subject,'translation_used':False},
            metrics=metrics(data)))
    cell=lambda v:html.escape(str(v)).replace('|','&#124;').replace('\n','<br>')
    lines=['# Nested content-unit annotation','',f'Subject: **{args.subject}**. English topic: **{topic}**. Language: **{args.response_language}**. Judge: Gemini-3.8-flash.','',
        'Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.','',
        '[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)','',
        '## Topic relevance','',data['topic_relevance']['topic_match']+': '+data['topic_relevance']['reason'],'',
        '## Counts','','```json',json.dumps(metrics(data),indent=2),'```','']
    for u in data['content_units']:
        lines.extend([f"## {u['id']}: {u['label']} ({u['kind']})",'',
            'Attributes: '+json.dumps(u['attributes'],ensure_ascii=False),'',
            'Contextualization: '+json.dumps(u['contextualization'],ensure_ascii=False),'',
            'Annotation rationale: '+u['rationale'],'',
            'Accuracy: **'+u['accuracy']['verdict']+'**. '+u['accuracy']['reason'],'',
            'Review flags: '+str(u['review_flags']),'',
            '| Passage | Source text | Category | Attributes | Formats |','|---|---|---|---|---|'])
        for p in u['passages']: lines.append('| '+' | '.join(cell(p[k]) for k in ['id','text','category','attributes','formats'])+' |')
        for e in u['accuracy']['errors']:
            lines.extend(['','Error ('+e['severity']+'; '+', '.join(e['passage_ids'])+'): '+e['description'],'','Correction: '+e['correction']])
        lines.append('')
    (output/'results.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps(metrics(data),indent=2)); print(output/'results.md')


if __name__=='__main__': asyncio.run(main())
