"""Run literal prompts against the configured models, preserving prompt text."""
from __future__ import annotations

import argparse
import asyncio
import csv
import re
import hashlib
import importlib.util
import itertools
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SPEC = importlib.util.spec_from_file_location("explanation_api_runner", ROOT / "explanation" / "run.py")
api = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(api)


def read_keywords(path):
    with path.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    keywords = {}
    for row in rows:
        key = (row.get("id") or "").strip()
        if not key or key in keywords:
            raise ValueError(f"Missing or duplicate keyword id: {key!r}")
        keywords[key] = {k: v.strip() for k, v in row.items() if k and isinstance(v, str)}
    return keywords


def topic_folder(job):
    slug = re.sub(r"[^a-z0-9]+", "_", job["topic_name"].lower()).strip("_") or "topic"
    identifier = re.sub(r"[^a-zA-Z0-9_-]+", "_", job["topic_id"])
    return f"{identifier}_{slug}"


def expand_jobs(config, keywords=None, prompt_structures=None):
    if not isinstance(config, dict) or not isinstance(config.get("defaults", {}), dict):
        raise ValueError("Run set and defaults must be objects")
    if config.get("version") == 2:
        return expand_multilingual(config, keywords, prompt_structures)
    if config.get("version", 1) != 1:
        raise ValueError("Unsupported runset version")
    if not isinstance(config.get("runs"), list) or not config["runs"]:
        raise ValueError("Run set needs a nonempty runs list")
    has_topics = any("topics" in {**config.get("defaults", {}), **row}
                     for row in config["runs"] if isinstance(row, dict))
    if has_topics:
        if keywords is None:
            raise ValueError("Topic IDs require a keyword CSV")
        jobs = []
        for index, row in enumerate(config["runs"], 1):
            if not isinstance(row, dict):
                raise ValueError(f"Run {index} must be an object")
            settings = {**config.get("defaults", {}), **row}
            topic_ids = api.string_list(settings.pop("topics", None), "topics")
            if len(topic_ids) != len(set(topic_ids)):
                raise ValueError(f"Run {index}: duplicate topic IDs")
            template = settings.get("prompt")
            if not isinstance(template, str) or "{topic}" not in template:
                raise ValueError(f"Run {index}: topic prompt must contain {{topic}}")
            for topic_id in topic_ids:
                keyword = keywords.get(topic_id)
                if keyword is None:
                    raise ValueError(f"Unknown topic ID: {topic_id}")
                term = keyword.get(settings.get("lang_id"))
                if not term or not keyword.get("en"):
                    raise ValueError(f"Missing topic translation: {topic_id}, {settings.get('lang_id')}")
                rendered = {**settings, "prompt": template.replace("{topic}", term)}
                expanded = expand_jobs({"runs": [rendered]})
                for job in expanded:
                    job.update(run_index=index, topic=term, topic_id=topic_id,
                               topic_name=keyword["en"], prompt_type="template")
                    job.pop("job_id")
                    digest = hashlib.sha256(json.dumps(job, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:16]
                    job["job_id"] = f"run-{index:03d}-{digest}"
                    jobs.append(job)
        return jobs
    jobs = []
    allowed = {"lang_id", "prompt", "models", "reasoning", "web_search"}
    for index, row in enumerate(config["runs"], 1):
        if not isinstance(row, dict):
            raise ValueError(f"Run {index} must be an object")
        settings = {**config.get("defaults", {}), **row}
        if settings.keys() - allowed:
            raise ValueError(f"Run {index}: unknown settings {sorted(settings.keys() - allowed)}")
        for key in ("lang_id", "prompt"):
            if not isinstance(settings.get(key), str) or not settings[key].strip():
                raise ValueError(f"Run {index}: {key} must be a nonempty string")
        models = api.string_list(settings.get("models"), "models")
        reasoning = api.string_list(settings["reasoning"], "reasoning") if "reasoning" in settings else [None]
        if set(reasoning) - {None, "none", "minimal", "low", "medium", "high", "xhigh"}:
            raise ValueError(f"Run {index}: invalid reasoning level")
        search = settings.get("web_search", False)
        if not isinstance(search, bool):
            raise ValueError("web_search must be true or false")
        for combination, (model, effort) in enumerate(itertools.product(models, reasoning), 1):
            job = dict(run_index=index, lang_id=settings["lang_id"],
                       language=settings["lang_id"], prompt_type="literal", topic="",
                       prompt=settings["prompt"], model=model, reasoning=effort, web_search=search)
            digest = hashlib.sha256(json.dumps(job, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:12]
            job["job_id"] = f"run-{index:03d}-{combination:03d}-{digest}"
            jobs.append(job)
    return jobs


def expand_multilingual(config, keywords, templates):
    import string
    allowed={'version','keywords_file','prompt_structures_file','defaults','target_languages','baseline','conditions','output_dir'}
    if config.keys()-allowed: raise ValueError('Unknown v2 settings: '+str(sorted(config.keys()-allowed)))
    if not keywords or not isinstance(templates,list): raise ValueError('Version 2 needs keywords and prompt structures')
    catalog={}
    for row in templates:
        if not isinstance(row,dict) or not all(isinstance(row.get(k),str) and row[k].strip() for k in ['lang_id','lang_name_eng','prompt']): raise ValueError('Invalid prompt structure')
        if row['lang_id'] in catalog: raise ValueError('Duplicate prompt language: '+row['lang_id'])
        fields=[]
        for _,field,spec,conversion in string.Formatter().parse(row['prompt']):
            if field is not None:
                if spec or conversion: raise ValueError('Template formatting options are not supported')
                fields.append(field)
        if 'topic' not in fields or set(fields)-{'topic','response_language_name_en'}: raise ValueError('Invalid template placeholders: '+row['lang_id'])
        catalog[row['lang_id']]=row
    defaults=config.get('defaults',{})
    if defaults.keys()-{'topics','models','reasoning','web_search'}: raise ValueError('Unknown defaults')
    topics=api.string_list(defaults.get('topics'),'topics')
    targets=api.string_list(config.get('target_languages'),'target_languages')
    if len(set(topics))!=len(topics) or len(set(targets))!=len(targets): raise ValueError('Duplicate topics or target languages')
    if 'en' in targets: raise ValueError('English belongs in baseline, not target_languages')
    conditions=config.get('conditions')
    if not isinstance(conditions,list) or not conditions: raise ValueError('conditions must be nonempty')
    baseline=config.get('baseline')
    definitions=([baseline] if baseline is not None else [])+conditions
    identifiers=set()
    for c in definitions:
        if not isinstance(c,dict) or set(c)!={'id','prompt_language','response_language'}: raise ValueError('Condition needs id, prompt_language and response_language')
        if not all(isinstance(c[k],str) and c[k] for k in c): raise ValueError('Condition fields must be nonempty strings')
        if not re.fullmatch(r'[a-zA-Z0-9_-]+',c['id']) or c['id'] in identifiers: raise ValueError('Invalid or duplicate condition ID')
        identifiers.add(c['id'])
    if baseline and (baseline['prompt_language']!='en' or baseline['response_language']!='en'): raise ValueError('Baseline must be English to English')
    expanded=([(baseline,None)] if baseline else [])+[(c,target) for target in targets for c in conditions]
    jobs=[];combinations=set()
    for index,(condition,target) in enumerate(expanded,1):
        pl=target if condition['prompt_language']=='$target' else condition['prompt_language']
        rl=target if condition['response_language']=='$target' else condition['response_language']
        if (pl,rl) in combinations: raise ValueError('Duplicate prompt/response language combination')
        combinations.add((pl,rl))
        if pl not in catalog or rl not in catalog: raise ValueError('Missing language template/name: '+str((pl,rl)))
        template=catalog[pl]['prompt']
        if pl!=rl and 'response_language_name_en' not in template: raise ValueError('Cross-language template must specify response_language_name_en')
        for tid in topics:
            keyword=keywords.get(tid,{})
            if not keyword.get(pl) or not keyword.get('en'): raise ValueError(f'Missing topic translation: {tid}, {pl}')
            prompt=template.format(topic=keyword[pl],response_language_name_en=catalog[rl]['lang_name_eng'])
            settings={k:v for k,v in defaults.items() if k!='topics'}
            settings.update(lang_id=pl,prompt=prompt)
            for job in expand_jobs({'runs':[settings]}):
                job.update(run_index=index,condition_id=condition['id'],prompt_language=pl,topic_language=pl,response_language=rl,
                    response_language_name=catalog[rl]['lang_name_eng'],language=rl,topic=keyword[pl],topic_id=tid,
                    topic_name=keyword['en'],subject=keyword.get('subject',''),prompt_type='language_template',
                    prompt_template=template,prompt_template_sha256=hashlib.sha256(template.encode('utf-8')).hexdigest())
                job.pop('job_id')
                identity={k:v for k,v in job.items() if k!='run_index'}
                digest=hashlib.sha256(json.dumps(identity,sort_keys=True,ensure_ascii=False).encode()).hexdigest()[:16]
                job['job_id']=f"run-{condition['id']}-{pl}-{rl}-{digest}"
                jobs.append(job)
    return jobs


LANGUAGE_NAMES={'en':'english','ta':'tamil','hi':'hindi','bn':'bengali','ar':'arabic','fr':'french'}

def language_folder(job):
    if 'response_language' in job:
        pl,rl=job['prompt_language'],job['response_language']
    else:
        pl,rl={1:('en','en'),2:('ta','ta'),3:('en','ta')}[job['run_index']]
    name=LANGUAGE_NAMES.get(rl,rl)
    if pl==rl: return 'english' if rl=='en' else name+'-native'
    return name+'-'+LANGUAGE_NAMES.get(pl,pl)

def response_filename(job):
    model=re.sub(r'[^a-zA-Z0-9._-]+','_',job['model'])
    suffix=hashlib.sha256(job['job_id'].encode()).hexdigest()[:12]
    return f'{model}__{suffix}.json'

def organized_path(root,job):
    return root/topic_folder(job)/language_folder(job)/response_filename(job)

def run_organized(args,config,jobs,catalog,manifest):
    output=(args.output or args.run_set.parent/config.get('output_dir','../outputs/'+args.run_set.stem)).resolve()
    record_dir=output/'_runsets'/args.run_set.stem
    manifest={**manifest,'layout':'topic-language-condition-v1','response_files':{j['job_id']:organized_path(output,j).relative_to(output).as_posix() for j in jobs}}
    mp=record_dir/'manifest.json'
    if mp.exists() and (not args.resume or api.read_json(mp)!=manifest): raise ValueError('Runset manifest exists; use --resume with unchanged configuration or another output/runset name')
    destinations=[organized_path(output,j) for j in jobs]
    if len(set(destinations))!=len(jobs): raise ValueError('Response destination collision')
    for j,path in zip(jobs,destinations):
        if path.exists() and (not args.resume or api.read_json(path).get('job')!=j): raise ValueError('Existing response would be overwritten: '+str(path))
    for path in destinations: path.parent.mkdir(parents=True,exist_ok=True)
    record_dir.mkdir(parents=True,exist_ok=True);api.write_json(mp,manifest)
    preview=['# Rendered prompts','',f'{len(jobs)} jobs.',''];seen=set()
    for j in jobs:
        key=(j['topic_id'],j['run_index'])
        if key not in seen:
            seen.add(key);preview.extend([f"## {j['topic_name']} / {language_folder(j)}",'',j['prompt'],''])
    (record_dir/'prompt_preview.md').write_text('\n'.join(preview),encoding='utf-8')
    print(f'Prepared {len(jobs)} jobs. Manifest: {mp}',flush=True)
    if args.dry_run:return 0
    from dotenv import load_dotenv
    load_dotenv(ROOT/'.env')
    batches={}
    for j in jobs:batches.setdefault((topic_folder(j),language_folder(j)),[]).append(j)
    async def execute():
        failures=0
        for (topic,language),batch in batches.items():
            folder=output/topic/language/'_runs'/args.run_set.stem;folder.mkdir(parents=True,exist_ok=True)
            api.write_json(folder/'manifest.json',{**manifest,'jobs':batch})
            resolver=lambda job:organized_path(output,job)
            failures+=await api.execute(batch,folder,catalog,args.concurrency,args.timeout,args.resume,request_builder=request_for,log_calls=True,result_path_builder=resolver)
            render_markdown(batch,folder,batch[0]['topic_name']+' / '+language,result_path_builder=resolver)
        return failures
    failures=asyncio.run(execute())
    lines=['# '+args.run_set.stem,'']
    for topic,language in batches:lines.append(f'- [{topic} / {language}](../../{topic}/{language}/_runs/{args.run_set.stem}/results.md)')
    (record_dir/'results.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(f'Finished {len(jobs)-failures}/{len(jobs)}; reports: {record_dir}')
    return int(bool(failures))


def request_for(job):
    request = api.request_for(job)
    if job["reasoning"] is None:
        request.pop("reasoning")
    return request


def render_markdown(jobs, output, title, result_path_builder=None):
    """Consolidate saved responses in manifest order, including failed jobs."""
    lines = [f"# {title}: model responses", "",
             f"{len(jobs)} requests. Response text is preserved from the saved JSON results.", "",
             "Source: [manifest.json](manifest.json)", "", "## Contents", ""]
    groups = []
    for index, group in itertools.groupby(jobs, key=lambda job: job["run_index"]):
        group = list(group)
        groups.append((index, group))
        lines.append(f"- [Prompt {index} ({group[0]['lang_id']})](#prompt-{index})")
        for job in group:
            lines.append(f"  - [{job['model']}](#{job['job_id']})")
    for index, group in groups:
        lines.extend(["", "---", "", f'<a id="prompt-{index}"></a>', "",
                      f"## Prompt {index} ({group[0]['lang_id']})", "", "**Prompt**", ""])
        lines.extend("> " + line for line in group[0]["prompt"].splitlines())
        for job in group:
            path = result_path_builder(job) if result_path_builder else output / f"{job['job_id']}.json"
            result = api.read_json(path) if path.exists() else {"status": "missing"}
            if path.exists() and result.get("job") != job:
                raise ValueError(f"Result does not match manifest job: {path}")
            lines.extend(["", "---", "", f'<a id="{job["job_id"]}"></a>', "",
                          f"### {job['model']}", "",
                          f"**Status:** {result['status']}", ""])
            if path.exists():
                lines.extend([f"**Source:** [{path.name}]({__import__('os').path.relpath(path,output).replace(chr(92),chr(47))})", ""])
            if result.get("text"):
                lines.extend([result["text"], ""])
            else:
                lines.extend(["_No response text available._", ""])
            if result.get("error"):
                error = result["error"]
                lines.extend([f"Error: {error.get('type', 'unknown')} (HTTP {error.get('status_code')}).", ""])
    path = output / "results.md"
    temporary = path.with_suffix(".md.tmp")
    temporary.write_text("\n".join(lines) + "\n", encoding="utf-8")
    temporary.replace(path)
    return path


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run-set", type=Path, default=HERE / "run_set" / "run1.json")
    parser.add_argument("--keywords", type=Path, help="Override keyword CSV; v2 paths default to runset-relative configuration")
    parser.add_argument("--output", type=Path, help="Default: outputs/<run-set filename without extension>")
    parser.add_argument("--dry-run", action="store_true", help="Save a manifest without making API calls")
    parser.add_argument("--resume", action="store_true", help="Skip completed jobs in an identical manifest")
    parser.add_argument("--concurrency", type=int, default=2)
    parser.add_argument("--timeout", type=float, default=180)
    parser.add_argument("--limit", type=int)
    args = parser.parse_args(argv)
    if args.concurrency < 1 or args.timeout <= 0 or (args.limit is not None and args.limit < 1):
        parser.error("concurrency, timeout, and limit must be positive")
    try:
        config = api.read_json(args.run_set)
        catalog = api.read_json(ROOT / "data" / "models.json")
        needs_keywords = config.get("version")==2 or any("topics" in {**config.get("defaults", {}), **row}
                             for row in config.get("runs", []) if isinstance(row, dict))
        keyword_path=args.keywords or ((args.run_set.parent/config.get('keywords_file','../content/keywords.csv')) if config.get('version')==2 else HERE/'content/keywords.csv')
        templates=api.read_json(args.run_set.parent/config['prompt_structures_file']) if config.get('version')==2 else None
        jobs = expand_jobs(config, read_keywords(keyword_path) if needs_keywords else None,templates)
        api.resolve_models(jobs, catalog)
        if args.limit:
            jobs = jobs[:args.limit]
        manifest = dict(run_set=config, jobs=jobs, requests=[request_for(job) for job in jobs],
                        model_catalog_sha256=hashlib.sha256(json.dumps(catalog, sort_keys=True).encode()).hexdigest())
        if config.get("version")==2:
            return run_organized(args,config,jobs,catalog,manifest)
        output = args.output or HERE / "outputs" / args.run_set.stem
        manifest_path = output / "manifest.json"
        if output.exists() and any(output.iterdir()):
            if not args.resume:
                raise ValueError("Output directory is not empty; use --resume or a new directory")
            if not manifest_path.exists() or api.read_json(manifest_path) != manifest:
                raise ValueError("Cannot resume: manifest differs from current configuration")
        batches = {}
        for job in jobs:
            name = topic_folder(job) if "topic_id" in job else ""
            batches.setdefault(name, []).append(job)
        if len({job.get("topic_id") for job in jobs}) != len(batches):
            raise ValueError("Topic folder names collide")
        output.mkdir(parents=True, exist_ok=True)
        api.write_json(manifest_path, manifest)
        for name, batch in batches.items():
            if name:
                folder = output / name
                folder.mkdir(parents=True, exist_ok=True)
                api.write_json(folder / "manifest.json", {**manifest, "jobs": batch,
                               "requests": [request_for(job) for job in batch]})
    except (ValueError, OSError, KeyError) as exc:
        parser.error(str(exc))
    print(f"Prepared {len(jobs)} jobs. Manifest: {manifest_path}", flush=True)
    if args.dry_run:
        from collections import Counter
        print(json.dumps(dict(Counter((j.get('condition_id','legacy')+': '+j.get('prompt_language',j['lang_id'])+' -> '+j.get('response_language',j['language'])) for j in jobs)),indent=2))
        preview=['# Rendered prompt preview','',f'{len(jobs)} jobs; no API calls made.','']
        seen=set()
        for job in jobs:
            key=(job.get('topic_id'),job['run_index'])
            if key in seen: continue
            seen.add(key)
            preview.extend([f"## {job.get('topic_name','Prompt')} / {job.get('condition_id',job['run_index'])} / {job.get('prompt_language',job['lang_id'])} -> {job.get('response_language',job['language'])}",'',job['prompt'],''])
        (output/'prompt_preview.md').write_text('\n'.join(preview),encoding='utf-8')
        return 0
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
    async def run_batches():
        failures = 0
        for name, batch in batches.items():
            folder = output / name
            print(f"Running {name or args.run_set.stem}: {len(batch)} jobs", flush=True)
            failures += await api.execute(batch, folder, catalog, args.concurrency, args.timeout, args.resume,
                                          request_builder=request_for, log_calls=True)
            markdown = render_markdown(batch, folder, batch[0].get("topic_name", args.run_set.stem))
            print(f"Markdown: {markdown}", flush=True)
        return failures
    failures = asyncio.run(run_batches())
    if any(batches):
        links = [f"# {args.run_set.stem}: topic results", ""]
        links.extend(f"- [{batch[0]['topic_name']}]({name}/results.md)" for name, batch in batches.items())
        (output / "results.md").write_text("\n".join(links) + "\n", encoding="utf-8")
    print(f"Finished: {len(jobs) - failures} completed, {failures} failed/incomplete. Results: {output}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
