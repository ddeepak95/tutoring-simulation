"""Resume expanded Stage 1 for all saved response files, preserving legacy evaluations."""
import concurrent.futures,json,subprocess,sys,hashlib,argparse,time
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent/'outputs/multiple'
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--concurrency',type=int,default=8);parser.add_argument('--dry-run',action='store_true');args=parser.parse_args()
    sources=sorted(p for p in ROOT.glob('ch-*/*/*__*.json') if json.loads(p.read_text(encoding='utf-8')).get('status')=='completed')
    out=ROOT/'evaluation/full_stage1_batch';out.mkdir(parents=True,exist_ok=True)
    prompt=HERE/'stage1_prompt.md';frozen=out/'prompt.md'
    manifest=dict(model='gemini-3.8-flash',stage=1,prompt_sha256=digest(prompt),sources=[dict(path=p.relative_to(ROOT).as_posix(),sha256=digest(p)) for p in sources])
    mp=out/'manifest.json'
    if mp.exists() and json.loads(mp.read_text(encoding='utf-8'))!=manifest:raise ValueError('Batch inputs changed; use a new batch output directory')
    mp.write_text(json.dumps(manifest,indent=2),encoding='utf-8');frozen.write_bytes(prompt.read_bytes())
    print(f'Prepared {len(sources)} Stage 1 evaluations; output: {out}',flush=True)
    if args.dry_run:return
    rows=[]
    def work(source):
        job=json.loads(source.read_text(encoding='utf-8'))['job'];relative=source.relative_to(ROOT);folder=out/relative.parent/source.stem;folder.mkdir(parents=True,exist_ok=True)
        cmd=[sys.executable,str(HERE/'run_stage1.py'),'--source',str(source),'--output',str(folder),'--prompt',str(frozen)]
        started=time.time_ns()
        for attempt in range(1,3):
            result=subprocess.run(cmd,capture_output=True,text=True,encoding='utf-8',errors='replace')
            (folder/f'runner-{started}-{attempt}.log').write_text(result.stdout+'\n'+result.stderr,encoding='utf-8')
            if result.returncode==0:break
        row=dict(source=str(source),output=str(folder),success=result.returncode==0,topic=relative.parts[0],condition=relative.parts[1],model=job['model'])
        if row['success']:
            d=json.loads((folder/'stage1.json').read_text(encoding='utf-8'));row.update(units=len(d['content_units']),relevance=d['topic_relevance']['topic_match'],errors=sum(len(u['accuracy']['errors']) for u in d['content_units']),ambiguities=len(d['ambiguities']))
        return row
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.concurrency) as pool:
        for future in concurrent.futures.as_completed([pool.submit(work,p) for p in sources]):
            row=future.result();rows.append(row)
            tmp=out/'status.tmp';tmp.write_text(json.dumps(rows,indent=2),encoding='utf-8');tmp.replace(out/'status.json')
            print(f'{len(rows)}/{len(sources)} '+('OK ' if row['success'] else 'FAILED ')+row['topic']+'/'+row['condition']+'/'+row['model'],flush=True)
    rows.sort(key=lambda r:r['source']);(out/'status.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
    lines=['# Expanded Stage 1 evaluations','',f'{sum(r["success"] for r in rows)}/{len(rows)} completed. Gemini-3.8-flash; model proposals. Stage 2 was not run. Source gaps and ambiguous boundaries require review.','','| Topic | Condition | Model | Units | Relevance | Proposed errors | Report |','|---|---|---|---|---|---|---|']
    for r in rows:
        link='[Report]('+Path(r['output']).relative_to(out).as_posix()+'/results.md)' if r['success'] else 'FAILED: see runner logs'
        lines.append(f'| {r["topic"]} | {r["condition"]} | {r["model"]} | {r.get("units", "")} | {r.get("relevance", "")} | {r.get("errors", "")} | {link} |')
    (out/'results.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(f'Finished {sum(r["success"] for r in rows)}/{len(rows)}',flush=True)
    if not all(r['success'] for r in rows):sys.exit(1)
if __name__=='__main__':main()
