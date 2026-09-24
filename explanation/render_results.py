"""Render saved experiment results into a self-contained Markdown report."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def fenced(value, language="json"):
    text = json.dumps(value, ensure_ascii=False, indent=2) if language == "json" else value
    fence = "`" * max(3, 1 + max((len(m) for m in re.findall(r"`+", text)), default=0))
    return f"{fence}{language}\n{text}\n{fence}"


def cell(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


def searches(record):
    return [item for item in record.get("response", {}).get("output", [])
            if item.get("type") == "web_search_call"]


def citations(record):
    return [annotation for item in record.get("response", {}).get("output", [])
            for part in item.get("content", []) for annotation in part.get("annotations", [])
            if annotation.get("type") == "url_citation"]


def render(directory):
    manifest = read_json(directory / "manifest.json")
    records = [read_json(directory / f"{job['job_id']}.json") for job in manifest["jobs"]]
    for expected, record in zip(manifest["jobs"], records):
        if record["job"] != expected:
            raise ValueError(f"Result does not match manifest: {expected['job_id']}")
    lines = ["# Explanation experiment: complete results", "",
             f"{len(records)} saved responses; {sum(r['status'] == 'completed' for r in records)} completed. "
             f"{sum(bool(searches(r)) for r in records)} responses used web search, "
             f"with {sum(len(searches(r)) for r in records)} recorded web-search tool calls.", "",
             "This report contains the saved explanations, prompts, settings, search actions, cited sources, "
             "token usage, and complete request/response records in manifest order. "
             "All text, including Tamil and code-mixed output, comes from the saved results. "
             "Response headings are nested for readability; the original text is preserved in the JSON records.", "",
             "The saved search actions have no source-result payloads (`sources` is null or absent). "
             "Full search-result snippets and fetched page contents are therefore unavailable. "
             "The queries, opened-page URLs, and citation annotations that were saved are included below. "
             "Cited sources are not a complete list of search results. No new model calls or web searches "
             "were made to create this report.", "",
             "## Results index", "",
             "| # | Language | Prompt type | Topic | Reasoning | Status | Search calls |",
             "| --- | --- | --- | --- | --- | --- | --- |"]
    for number, record in enumerate(records, 1):
        job = record["job"]
        values = [f"[{number}](#result-{number:02d})", job["language"], job["prompt_type"],
                  job["topic"], job["reasoning"], record["status"], len(searches(record))]
        lines.append("| " + " | ".join(cell(v) for v in values) + " |")
    for number, record in enumerate(records, 1):
        job = record["job"]
        lines.extend(["", "---", "", f'<a id="result-{number:02d}"></a>', "",
                      f"## {number}. {job['language']} / {job['prompt_type']} / {job['topic']} / {job['reasoning']}", "",
                      "### Settings", "", "| Field | Value |", "| --- | --- |"])
        metadata = {**{key: value for key, value in job.items() if key != "prompt"},
                    "status": record["status"], "started_at": record.get("started_at"),
                    "finished_at": record.get("finished_at"),
                    "response_id": record.get("response", {}).get("id"),
                    "returned_model": record.get("response", {}).get("model")}
        lines.extend(f"| {cell(key)} | {cell(value)} |" for key, value in metadata.items())
        lines.extend(["", "### Prompt", "", fenced(job["prompt"], "text"), "",
                      "### Explanation", ""])
        explanation = record.get("text", "")
        # Nest model-written headings without changing the exact original in the appendix.
        inside_fence = False
        for line in explanation.splitlines():
            if line.lstrip().startswith(("```", "~~~")):
                inside_fence = not inside_fence
            match = re.match(r"^(#{1,6}) (.*)$", line) if not inside_fence else None
            lines.append("#" * min(6, len(match[1]) + 3) + " " + match[2] if match else line)
        if not explanation:
            lines.append("No explanation text was saved.")
        lines.extend(["", "### Web-search activity", ""])
        calls = searches(record)
        if not calls:
            lines.append("No web-search tool calls were recorded for this response.")
        for index, call in enumerate(calls, 1):
            lines.extend([f"#### Search tool call {index}", "", fenced(call), ""])
        lines.extend(["", "### Cited sources", ""])
        annotations = citations(record)
        unique = {}
        for annotation in annotations:
            unique.setdefault(annotation["url"], annotation)
        for index, (url, annotation) in enumerate(unique.items(), 1):
            title = annotation.get("title") or url
            title = title.replace("[", "\\[").replace("]", "\\]").replace("\n", " ")
            lines.append(f"{index}. [{title}](<{url}>)")
        if not annotations:
            lines.append("No URL citation annotations were recorded for this response.")
        else:
            lines.extend(["", "<details>", "<summary>All citation annotations, including text offsets</summary>",
                          "", fenced(annotations), "", "</details>"])
        lines.extend(["", "### Token usage", "", fenced(record.get("usage")), "",
                      "### Complete saved record", "", "<details>",
                      "<summary>Expand the complete request, response, and metadata JSON</summary>",
                      "", fenced(record), "", "</details>"])
    lines.extend(["", "## Experiment manifest", "", "<details>",
                  "<summary>Expand the complete configuration, prompt templates, jobs, and requests</summary>",
                  "", fenced(manifest), "", "</details>", ""])
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=Path(__file__).resolve().parent / "outputs/preview")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    report = render(args.input)
    destination = args.output or args.input / "results.md"
    destination.write_text(report, encoding="utf-8")
    print(f"Saved {destination} ({destination.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
