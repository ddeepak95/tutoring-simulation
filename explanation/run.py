"""Generate one explanation per run-set combination; preview with --dry-run."""
from __future__ import annotations

import argparse
import asyncio
import csv
import hashlib
import itertools
import json
import os
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from string import Formatter

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path: Path, value):
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def now():
    return datetime.now(timezone.utc).isoformat()


def string_list(value, label):
    if not isinstance(value, list) or not value or any(not isinstance(x, str) or not x.strip() for x in value):
        raise ValueError(f"{label} must be a nonempty list of strings")
    return value


def expand_jobs(config, templates):
    if not isinstance(config, dict) or not isinstance(config.get("defaults", {}), dict):
        raise ValueError("Run set and defaults must be objects")
    runs = config.get("runs")
    if not isinstance(runs, list) or not runs:
        raise ValueError("Run set needs a nonempty runs list")
    if not isinstance(templates, list):
        raise ValueError("Prompt structure must be a list")
    languages = {}
    for row in templates:
        if not isinstance(row, dict) or not isinstance(row.get("lang-id"), str):
            raise ValueError("Each prompt entry needs a lang-id")
        if row["lang-id"] in languages:
            raise ValueError(f"Duplicate language: {row['lang-id']}")
        languages[row["lang-id"]] = row
    jobs = []
    allowed = {"lang_id", "prompt_type", "topics", "models", "reasoning", "web_search"}
    for index, row in enumerate(runs, 1):
        if not isinstance(row, dict):
            raise ValueError(f"Run {index} must be an object")
        settings = {**config.get("defaults", {}), **row}
        unknown = settings.keys() - allowed
        if unknown:
            raise ValueError(f"Run {index}: unknown settings {sorted(unknown)}")
        language = languages.get(settings.get("lang_id"))
        if language is None:
            raise ValueError(f"Run {index}: unknown lang_id {settings.get('lang_id')!r}")
        prompt_type = settings.get("prompt_type", "native")
        if prompt_type not in {"native", "code-mixed"}:
            raise ValueError(f"Run {index}: prompt_type must be native or code-mixed")
        template = language.get("code-mixed-prompt" if prompt_type == "code-mixed" else "prompt")
        if not isinstance(template, str) or not template.strip():
            raise ValueError(f"Run {index}: missing {prompt_type} prompt")
        fields = [name for _, name, _, _ in Formatter().parse(template) if name is not None]
        if not fields or any(name != "topic" for name in fields):
            raise ValueError(f"Run {index}: prompt must use only the {{topic}} placeholder")
        topics = string_list(settings.get("topics"), "topics")
        models = string_list(settings.get("models"), "models")
        reasoning = string_list(settings.get("reasoning", ["none"]), "reasoning")
        if set(reasoning) - {"none", "minimal", "low", "medium", "high", "xhigh"}:
            raise ValueError(f"Run {index}: invalid reasoning level")
        web_search = settings.get("web_search", False)
        if not isinstance(web_search, bool):
            raise ValueError("web_search must be true or false")
        for combination, (topic, model, effort) in enumerate(itertools.product(topics, models, reasoning), 1):
            job = dict(run_index=index, topic=topic, model=model, reasoning=effort,
                       lang_id=settings["lang_id"], language=language.get("language", settings["lang_id"]),
                       prompt_type=prompt_type, prompt=template.format(topic=topic), web_search=web_search)
            digest = hashlib.sha256(json.dumps(job, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:12]
            job["job_id"] = f"run-{index:03d}-{combination:03d}-{digest}"
            jobs.append(job)
    return jobs


def resolve_models(jobs, catalog):
    rows = catalog["models"]
    for job in jobs:
        match = next((row for row in rows if job["model"] in (row["id"], row["litellm_model"])), None)
        if match is None and "/" not in job["model"]:
            raise ValueError(f"Unknown model {job['model']!r}; add it to data/models.json or use provider/model")
        job["resolved_model"] = match["litellm_model"] if match else job["model"]


def request_for(job):
    request = dict(model=job["resolved_model"], input=job["prompt"],
                   reasoning={"effort": job["reasoning"]}, store=False)
    if job["web_search"]:
        request["tools"] = [{"type": "web_search"}]
    return request


def output_text(response):
    return "\n".join(part["text"] for item in response.get("output", [])
                     if item.get("type") == "message" for part in item.get("content", [])
                     if part.get("type") == "output_text")


async def execute(jobs, output, catalog, concurrency, timeout, resume, call=None, request_builder=None, log_calls=False):
    if call is None:
        from litellm import aresponses
        call = aresponses
    semaphore = asyncio.Semaphore(concurrency)

    def log_event(event):
        if log_calls:
            with (output / "api_calls.jsonl").open("a", encoding="utf-8") as handle:
                handle.write(json.dumps(event, ensure_ascii=False) + "\n")

    async def one(job):
        result_path = output / f"{job['job_id']}.json"
        if resume and result_path.exists():
            previous = read_json(result_path)
            if previous.get("status") == "completed" and previous.get("job") == job:
                return previous
        async with semaphore:
            request = (request_builder or request_for)(job)
            result = dict(job=job, request=request, started_at=now())
            attempt_id = uuid.uuid4().hex
            log_event(dict(event="request", attempt_id=attempt_id, job_id=job["job_id"],
                           timestamp=result["started_at"], request=request, timeout=timeout))
            try:
                row = next((row for row in catalog["models"] if row["litellm_model"] == job["resolved_model"]), {})
                params = {key: os.path.expandvars(value) if isinstance(value, str) else value
                          for key, value in row.get("litellm_params", {}).items()}
                kwargs = {**params, **request, "timeout": timeout, "drop_params": False}
                if kwargs.get("api_key") == "@adc-token":
                    sys.path.insert(0, str(ROOT / "src"))
                    from tutoring_check.vertex_auth import with_adc_token
                    kwargs = with_adc_token(kwargs)
                response = await call(**kwargs)
                raw = response.model_dump(mode="json") if hasattr(response, "model_dump") else response
                result.update(response=raw, text=output_text(raw), usage=raw.get("usage", {}))
                status = raw.get("status", "completed")
                result["status"] = "completed" if status == "completed" and result["text"].strip() else "incomplete"
            except Exception as exc:
                # Avoid persisting exception messages that may contain credentials or request URLs.
                result.update(status="failed", error={"type": type(exc).__name__,
                              "status_code": getattr(exc, "status_code", None)})
            result["finished_at"] = now()
            log_event(dict(event="response" if "response" in result else "error",
                           attempt_id=attempt_id, job_id=job["job_id"], timestamp=result["finished_at"],
                           status=result["status"], response=result.get("response"), error=result.get("error")))
            write_json(result_path, result)
            print(f"{job['job_id']}: {result['status']}", flush=True)
            return result

    results = await asyncio.gather(*(one(job) for job in jobs))
    fields = ["job_id", "lang_id", "prompt_type", "topic", "model", "reasoning", "web_search", "status", "text", "input_tokens", "output_tokens", "total_tokens"]
    with (output / "results.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for result in results:
            record = {key: result["job"][key] for key in fields[:7]}
            usage = result.get("usage") or {}
            record.update(status=result["status"], text=result.get("text", ""),
                          **{key: usage.get(key) for key in fields[-3:]})
            writer.writerow(record)
    return sum(result["status"] != "completed" for result in results)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run-set", type=Path, default=HERE / "run_set" / "test.json")
    parser.add_argument("--prompts", type=Path, default=HERE / "prompt-structure.json")
    parser.add_argument("--output", type=Path, help="Output directory; a timestamped folder is used by default")
    parser.add_argument("--dry-run", action="store_true", help="Validate and save the request manifest without API calls")
    parser.add_argument("--resume", action="store_true", help="Reuse an identical manifest and skip completed jobs")
    parser.add_argument("--concurrency", type=int, default=2)
    parser.add_argument("--timeout", type=float, default=180)
    parser.add_argument("--limit", type=int, help="Run only the first N combinations")
    args = parser.parse_args(argv)
    if args.concurrency < 1 or args.timeout <= 0 or (args.limit is not None and args.limit < 1):
        parser.error("concurrency, timeout, and limit must be positive")
    if args.resume and args.output is None:
        parser.error("--resume requires --output")
    try:
        config, templates = read_json(args.run_set), read_json(args.prompts)
        catalog = read_json(ROOT / "data" / "models.json")
        jobs = expand_jobs(config, templates)
        resolve_models(jobs, catalog)
        if args.limit:
            jobs = jobs[:args.limit]
        manifest = dict(run_set=config, prompt_structure=templates, jobs=jobs,
                        requests=[request_for(job) for job in jobs],
                        model_catalog_sha256=hashlib.sha256(json.dumps(catalog, sort_keys=True).encode()).hexdigest())
        output = args.output or HERE / "outputs" / datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        manifest_path = output / "manifest.json"
        if output.exists() and any(output.iterdir()):
            if not args.resume:
                raise ValueError("Output directory is not empty; use --resume or choose a new directory")
            if not manifest_path.exists() or read_json(manifest_path) != manifest:
                raise ValueError("Cannot resume: manifest differs from the current configuration")
        output.mkdir(parents=True, exist_ok=True)
        write_json(manifest_path, manifest)
    except (ValueError, OSError, KeyError) as exc:
        parser.error(str(exc))
    print(f"Prepared {len(jobs)} jobs. Manifest: {manifest_path}")
    if args.dry_run:
        return 0
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
    failures = asyncio.run(execute(jobs, output, catalog, args.concurrency, args.timeout, args.resume))
    print(f"Finished: {len(jobs) - failures} completed, {failures} failed/incomplete. Results: {output}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
