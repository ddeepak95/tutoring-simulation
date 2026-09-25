"""Resume topic evaluations and build one offline runset viewer."""
import concurrent.futures
import json
import subprocess
import sys
from pathlib import Path
import visualize

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent/'outputs/multiple'

def work(source):
    row=json.loads(source.read_text(encoding='utf-8')); job=row['job']
    output=source.parent/'evaluation'/source.stem
    output.mkdir(parents=True,exist_ok=True)
    language=job.get('response_language_name') or ('English' if job['run_index']==1 else 'Tamil')
    cmd=[sys.executable,str(HERE/'evaluate_v3.py'),'--source',str(source),'--output',str(output),'--subject','Chemistry','--response-language',language]
    for attempt in range(2):
        result=subprocess.run(cmd,capture_output=True,text=True,encoding='utf-8',errors='replace')
        (output/f'runner-{attempt+1}.log').write_text(result.stdout+'\n'+result.stderr,encoding='utf-8')
        if result.returncode==0:break
    return dict(source=str(source),output=str(output),success=result.returncode==0,model=job['model'],topic=job.get('topic_name') or next(p.name.split('_',1)[1].replace('_',' ') for p in source.parents if p.name.startswith('ch-')),condition=job['run_index'],condition_label=(job.get('condition_id','')+': '+job.get('prompt_language','')+' -> '+job.get('response_language','')) if 'condition_id' in job else {1:'English prompt / English response',2:'Tamil prompt / Tamil response',3:'English prompt / Tamil response'}[job['run_index']],language=language)

def viewer(rows):
    records=[]
    for row in rows:
        if not row['success']:continue
        folder=Path(row['output']); record=json.loads((folder/'evaluation.json').read_text(encoding='utf-8'))
        text=(folder/'source.md').read_text(encoding='utf-8')
        record['viewer_source_text']=text
        record['viewer_rendered_html']=visualize.render_document(record,text)
        records.append(dict(meta=row,record=record))
    template=(HERE/'annotation_viewer.html').read_text(encoding='utf-8-sig')
    payload=json.dumps(dict(records=records,template=template),ensure_ascii=False).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
    shell=(HERE/'runset_viewer.html').read_text(encoding='utf-8')
    (ROOT/'annotation.html').write_text(shell.replace('__BATCH_DATA__',payload),encoding='utf-8')

def main():
    sources=[p for p in sorted(list(ROOT.glob('ch-*/run-*.json'))+list(ROOT.glob('ch-*/*/*__*.json'))) if json.loads(p.read_text(encoding='utf-8')).get('status')=='completed']
    rows=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
        for future in concurrent.futures.as_completed([pool.submit(work,p) for p in sources]):
            row=future.result();rows.append(row)
            (ROOT/'evaluation_batch_status.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
            print(f"{len(rows)}/{len(sources)} {'OK' if row['success'] else 'FAILED'} {Path(row['source']).parent.name}/{Path(row['source']).stem}",flush=True)
    rows.sort(key=lambda r:r['source'])
    viewer(rows)
    lines=['# Runset evaluations','','[Open shared highlighted viewer](annotation.html)','','| Topic | Model | Condition | Result |','|---|---|---|---|']
    for r in rows:
        relative=Path(r['output']).relative_to(ROOT).as_posix()
        link=f"[Report]({relative}/results.md)" if r['success'] else 'FAILED: see runner log'
        lines.append(f"| {r['topic']} | {r['model']} | {r['condition']} ({r['language']}) | {link} |")
    (ROOT/'evaluation_results.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(f"Completed {sum(r['success'] for r in rows)}/{len(rows)}; viewer: {ROOT/'annotation.html'}",flush=True)

if __name__=='__main__':main()
