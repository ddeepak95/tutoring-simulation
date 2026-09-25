"""One-time, hash-checked migration to topic/language-condition folders."""
import hashlib
import importlib.util
import json
from pathlib import Path

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('runner',HERE/'run.py');runner=importlib.util.module_from_spec(spec);spec.loader.exec_module(runner)
ROOT=(HERE/'outputs/multiple').resolve()

def main():
    plan=[]
    for source in sorted(ROOT.glob('ch-*/run-*.json')):
        row=json.loads(source.read_text(encoding='utf-8'));job=row['job']
        destination=source.parent/runner.language_folder(job)/runner.response_filename(job)
        old_eval=source.parent/'evaluation'/source.stem
        new_eval=destination.parent/'evaluation'/destination.stem
        for path in [source,destination,old_eval,new_eval]:path.resolve().relative_to(ROOT)
        assert not destination.exists() and not new_eval.exists(), 'Destination already exists'
        plan.append(dict(old=str(source),new=str(destination),old_eval=str(old_eval),new_eval=str(new_eval),sha256=hashlib.sha256(source.read_bytes()).hexdigest()))
    assert len({p['new'] for p in plan})==len(plan)
    if not plan:print('No legacy responses to migrate.');return
    mapping=ROOT/'layout_migration.json'
    assert not mapping.exists(), 'Migration map already exists'
    mapping.write_text(json.dumps(plan,indent=2),encoding='utf-8')
    status_path=ROOT/'evaluation_batch_status.json'
    status=json.loads(status_path.read_text(encoding='utf-8'))
    backup=ROOT/'_layout_backup';backup.mkdir(exist_ok=True)
    (backup/status_path.name).write_bytes(status_path.read_bytes())
    for row in plan:
        old,new=Path(row['old']),Path(row['new']);new.parent.mkdir(parents=True,exist_ok=True);old.rename(new)
        assert hashlib.sha256(new.read_bytes()).hexdigest()==row['sha256']
        oe,ne=Path(row['old_eval']),Path(row['new_eval'])
        if oe.exists():
            ne.parent.mkdir(parents=True,exist_ok=True);oe.rename(ne)
            for filename in ['manifest.json','evaluation.json']:
                file=ne/filename
                if not file.exists():continue
                d=json.loads(file.read_text(encoding='utf-8'))
                saved=backup/new.parent.parent.name/new.stem/filename;saved.parent.mkdir(parents=True,exist_ok=True);saved.write_bytes(file.read_bytes())
                if filename=='manifest.json':d['source_path']=str(new)
                else:d['provenance']['original_path']=str(new)
                file.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        for r in status:
            if Path(r['source']).resolve()==old:
                r['source']=str(new);r['output']=str(ne)
        # Keep the topic's existing consolidated report useful without rewriting source bodies.
        report=old.parent/'results.md'
        if report.exists():
            text=report.read_text(encoding='utf-8');target=new.relative_to(old.parent).as_posix()
            text=text.replace(']('+old.name+')',']('+target+')')
            report.write_text(text,encoding='utf-8')
    status_path.write_text(json.dumps(status,indent=2),encoding='utf-8')
    for topic in sorted(ROOT.glob('ch-*')):
        lines=['# '+topic.name,'','Response files grouped by output language and prompt condition. `-english` means an English prompt requesting that language.','']
        for folder in sorted(topic.iterdir()):
            if not folder.is_dir():continue
            responses=[p for p in folder.glob('*.json') if '__' in p.stem]
            if not responses:continue
            lines+=['## '+folder.name,'']
            for file in sorted(responses):
                result=json.loads(file.read_text(encoding='utf-8'));rel=file.relative_to(topic).as_posix();evaluation=folder/'evaluation'/file.stem/'results.md'
                suffix=' | [Evaluation]('+evaluation.relative_to(topic).as_posix()+')' if evaluation.exists() else ''
                lines.append('- ['+result['job']['model']+']('+rel+')'+suffix)
        (topic/'index.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    lines=['# Multiple-topic evaluations','','[Shared annotation viewer](annotation.html)','']
    for r in status:lines.append('- ['+r['topic']+' / '+r['model']+' / '+str(r['condition'])+']('+Path(r['output']).relative_to(ROOT).as_posix()+'/results.md)')
    (ROOT/'evaluation_results.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('Moved and hash-verified',len(plan),'responses and their evaluation folders.')

if __name__=='__main__':main()
