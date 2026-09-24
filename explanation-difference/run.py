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


def expand_jobs(config, keywords=None):
    if not isinstance(config, dict) or not isinstance(config.get("defaults", {}), dict):
        raise ValueError("Run set and defaults must be objects")
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


def request_for(job):
    request = api.request_for(job)
    if job["reasoning"] is None:
        request.pop("reasoning")
    return request


def render_markdown(jobs, output, title):
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
            path = output / f"{job['job_id']}.json"
            result = api.read_json(path) if path.exists() else {"status": "missing"}
            if path.exists() and result.get("job") != job:
                raise ValueError(f"Result does not match manifest job: {path}")
            lines.extend(["", "---", "", f'<a id="{job["job_id"]}"></a>', "",
                          f"### {job['model']}", "",
                          f"**Status:** {result['status']}", ""])
            if path.exists():
                lines.extend([f"**Source:** [{path.name}]({path.name})", ""])
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
    parser.add_argument("--keywords", type=Path, default=HERE / "content" / "keywords.csv")
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
        needs_keywords = any("topics" in {**config.get("defaults", {}), **row}
                             for row in config.get("runs", []) if isinstance(row, dict))
        jobs = expand_jobs(config, read_keywords(args.keywords) if needs_keywords else None)
        api.resolve_models(jobs, catalog)
        if args.limit:
            jobs = jobs[:args.limit]
        manifest = dict(run_set=config, jobs=jobs, requests=[request_for(job) for job in jobs],
                        model_catalog_sha256=hashlib.sha256(json.dumps(catalog, sort_keys=True).encode()).hexdigest())
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
