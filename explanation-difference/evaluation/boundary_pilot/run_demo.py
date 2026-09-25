"""Run the two boundary stages on one original-language response; preserve all attempts."""
import argparse,asyncio,json,re,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent.parent))
import pipeline
KINDS={'CONCEPT','EXAMPLE','ANALOGY','PROCEDURE','STUDY_SUPPORT','CAVEAT','OTHER'}
HERE=Path(__file__).resolve().parent

def resolve(data,text,previous=None):
    units=data['content_units']; assert isinstance(units,list)
    assert isinstance(data['ambiguities'],list)
    ids=set(); occupied=[]; enriched=[]
    for u in units:
        assert u['id'] not in ids and u['kind'] in KINDS
        ids.add(u['id']);assert u['label'].strip() and u['excerpts']
        spans=[]
        for e in u['excerpts']:
            quote=e['text'];occ=e['occurrence']
            assert quote and isinstance(occ,int) and not isinstance(occ,bool) and occ>=0
            starts=[m.start() for m in re.finditer('(?='+re.escape(quote)+')',text)]
            assert occ<len(starts),'Exact excerpt not found: '+quote[:100]
            start=starts[occ];end=start+len(quote)
            assert all(end<=a or start>=b for a,b in occupied),'Overlapping excerpts'
            occupied.append((start,end));spans.append(dict(start=start,end=end,text=quote))
        assert spans==sorted(spans,key=lambda s:s['start']),'Excerpts not in source order'
        enriched.append(dict(**u,spans=spans))
    assert [u['spans'][0]['start'] for u in enriched]==sorted(u['spans'][0]['start'] for u in enriched),'Units not in source order'
    for a in data['ambiguities']:assert set(a['unit_ids'])<=ids and a['issue'] and a['proposed_resolution']
    if previous is not None:
        old={u['id']:u for u in previous['content_units']};new={u['id']:u for u in units}
        for uid in old.keys()&new.keys():assert old[uid]==new[uid],'Changed unit reused old ID: '+uid
        before=set();after=set()
        for c in data['changes']:
            assert c['action'] in {'add','split','merge','relabel','reanchor','remove'} and c['reason']
            assert set(c['before_ids'])<=old.keys() and set(c['after_ids'])<=new.keys()
            before.update(c['before_ids']);after.update(c['after_ids'])
        assert old.keys()-new.keys()<=before and new.keys()-old.keys()<=after,'Unmapped boundary changes'
    gaps=[];cursor=0
    for a,b in sorted(occupied):
        if text[cursor:a].strip():gaps.append(dict(start=cursor,end=a,text=text[cursor:a]))
        cursor=b
    if text[cursor:].strip():gaps.append(dict(start=cursor,end=len(text),text=text[cursor:]))
    return dict(content_units=enriched,unassigned_spans=gaps,note='Gaps require semantic review; exact alignment does not prove correct boundaries.')

async def main():
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--output',type=Path,required=True);args=p.parse_args()
    source=json.loads(args.source.read_text(encoding='utf-8'));text=source['text'];out=args.output;out.mkdir(parents=True,exist_ok=True)
    prompts=[(HERE/f'stage{i}_prompt.md').read_text(encoding='utf-8') for i in [1,2]]
    model=pipeline.model_config('gemini-3.8-flash')['litellm_model']
    manifest=dict(source=str(args.source.resolve()),source_hash=pipeline.digest(source),prompts=prompts,model=model,subject='Chemistry',topic_name_en='redox reactions',response_language='Tamil')
    mp=out/'manifest.json'
    if mp.exists():assert json.loads(mp.read_text(encoding='utf-8'))==manifest,'Changed inputs: choose a new output directory'
    pipeline.api.write_json(mp,manifest);pipeline.api.write_json(out/'source.json',source);(out/'source.md').write_text(text,encoding='utf-8')
    from dotenv import load_dotenv
    load_dotenv(pipeline.ROOT/'.env')
    from litellm import aresponses
    previous=None
    for stage,prompt in enumerate(prompts,1):
        path=out/f'stage{stage}.json'
        if path.exists():data=json.loads(path.read_text(encoding='utf-8'));resolved=resolve(data,text,previous)
        else:
            payload=dict(subject='Chemistry',topic_name_en='redox reactions',response_language='Tamil',original_prompt=source['job']['prompt'],source=text)
            if previous is not None:payload['candidate_annotation']=previous
            request=dict(model=model,store=False,input=[dict(role='system',content=prompt),dict(role='user',content=json.dumps(payload,ensure_ascii=False))])
            for attempt in range(1,4):
                def log(event,**values):
                    with (out/'api_calls.jsonl').open('a',encoding='utf-8') as f:f.write(json.dumps(dict(stage=stage,attempt=attempt,event=event,timestamp=pipeline.api.now(),**values),ensure_ascii=False)+'\n')
                log('request',request=request)
                try:response=await aresponses(**request,timeout=240)
                except Exception as exc:log('error',error_type=type(exc).__name__);raise
                raw=response.model_dump(mode='json');log('response',response=raw)
                answer=pipeline.api.output_text(raw).strip()
                try:
                    assert raw.get('status','completed')=='completed'
                    candidate=re.sub(r'^```(?:json)?\s*|\s*```$','',answer)
                    data=json.loads(candidate);resolved=resolve(data,text,previous)
                    break
                except (AssertionError,ValueError,KeyError,TypeError) as exc:
                    log('validation_error',message=str(exc))
                    if attempt==3:raise
                    request['input'] += [dict(role='assistant',content=answer),dict(role='user',content='Validation failed: '+str(exc)+'. Return the full corrected JSON. Keep unchanged units identical; give changed units fresh IDs and explicit change mappings.')]
            pipeline.api.write_json(path,data)
        pipeline.api.write_json(out/f'stage{stage}_resolved.json',resolved)
        print(f'Stage {stage}: {len(data["content_units"])} units; {len(data["ambiguities"])} ambiguities; {len(resolved["unassigned_spans"])} unassigned spans for review',flush=True)
        previous=data
    lines=['# Tamil redox boundary pilot','','Two stages with Gemini-3.8-flash; proposed boundaries only. No accuracy enrichment yet.','']
    for stage in [1,2]:
        data=json.loads((out/f'stage{stage}.json').read_text(encoding='utf-8'))
        lines += [f'## Stage {stage}: {len(data["content_units"])} units','','| ID | Kind | Label |','|---|---|---|']
        for u in data['content_units']:lines.append('| '+u['id']+' | '+u['kind']+' | '+u['label'].replace('|','/')+' |')
        lines += ['', '### Changes and ambiguities','', '```json',json.dumps(dict(changes=data.get('changes',[]),ambiguities=data['ambiguities']),ensure_ascii=False,indent=2),'```','']
        for u in data['content_units']:
            lines += ['### '+u['id']+': '+u['label'],'']
            for e in u['excerpts']:lines += ['```text',e['text'],'```','']
    (out/'results.md').write_text('\n'.join(lines),encoding='utf-8')

if __name__=='__main__':asyncio.run(main())
