"""Simulate five student/tutor rounds using the project's existing API runner."""
from __future__ import annotations

import argparse
import asyncio
import importlib.util
import math
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SPEC = importlib.util.spec_from_file_location("conversation_api", ROOT / "explanation/run.py")
api = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(api)


def render(template, values):
    if not isinstance(template, str) or not template.strip():
        raise ValueError("Prompt text must be a nonempty string")
    try:
        return template.format(**values)
    except (KeyError, ValueError, IndexError) as exc:
        raise ValueError(f"Invalid prompt placeholder: {exc}") from exc


def prepare(config_dir, catalog, run_set=HERE / "run_set" / "run.json"):
    settings = api.read_json(run_set)
    allowed = {"topics", "languages", "student_model", "tutor_model", "timeout", "student_reasoning", "tutor_reasoning"}
    if not isinstance(settings, dict) or settings.keys() - allowed:
        raise ValueError("run.json must be an object containing only documented settings")
    topics = api.read_json(config_dir / "topic.json")
    if not isinstance(topics, list) or not topics:
        raise ValueError("topic.json must contain a nonempty list")
    topic_map = {}
    for topic in topics:
        if not isinstance(topic, dict) or not isinstance(topic.get("topic_id"), str):
            raise ValueError("Each topic needs a topic_id")
        key = topic["topic_id"]
        if not re.fullmatch(r"[A-Za-z0-9_-]+", key) or key in topic_map:
            raise ValueError(f"Invalid or duplicate topic_id: {key}")
        topic_map[key] = topic
    selected = api.string_list(settings.get("topics"), "topics")
    if len(selected) != len(set(selected)):
        raise ValueError("Duplicate selected topics")
    languages = settings.get("languages")
    if not isinstance(languages, dict) or not languages:
        raise ValueError("languages must map language codes to names")
    for code, name in languages.items():
        if not re.fullmatch(r"[A-Za-z0-9_-]+", code) or not isinstance(name, str) or not name.strip():
            raise ValueError("Invalid language code or name")
    student_config = api.read_json(config_dir / "student-prompt.json")
    turns = student_config.get("student_turn_instructions")
    if turns is not None:
        turns = api.string_list(turns, "student_turn_instructions")
        if len(turns) != 5:
            raise ValueError("Exactly five student turn instructions are required when provided")
    timeout = settings.get("timeout", 120)
    if isinstance(timeout, bool) or not isinstance(timeout, (int, float)) or not math.isfinite(timeout) or timeout <= 0:
        raise ValueError("timeout must be a positive finite number")
    models = {}
    for speaker in ("student", "tutor"):
        model = settings.get(speaker + "_model")
        if not isinstance(model, str) or not model.strip():
            raise ValueError(f"Missing {speaker}_model")
        job = {"model": model}
        api.resolve_models([job], catalog)
        effort = settings.get(speaker + "_reasoning")
        if effort is not None and effort not in ("none", "minimal", "low", "medium", "high", "xhigh"):
            raise ValueError(f"Invalid {speaker}_reasoning: {effort!r}")
        job["reasoning"] = effort
        models[speaker] = job
    defaults = student_config["defaults"]
    if not isinstance(defaults, dict) or not defaults:
        raise ValueError("Student defaults must contain prompt sections")
    tutor = (config_dir / "tutor-prompt.md").read_text(encoding="utf-8-sig")
    conversations = []
    for topic_id in selected:
        if topic_id not in topic_map:
            raise ValueError(f"Unknown topic: {topic_id}")
        topic = topic_map[topic_id]
        for code, language in languages.items():
            term = topic.get("terminology", {}).get(code)
            if not isinstance(term, str) or not term.strip():
                raise ValueError(f"Missing terminology for {topic_id}/{code}")
            values = dict(language=language, topic_name=term, num_of_turns=5)
            student = "\n\n".join(render(value, values) for value in defaults.values())
            student += "\n\n" + render(topic.get("student_knowledge_state"), values)
            conversations.append(dict(
                id=f"{topic_id}__{code}", topic_id=topic_id, language_code=code,
                language=language, topic_name=term, models=models,
                system_prompts={"student": student, "tutor": render(tutor, values)},
                turn_instructions=[render(turn, values) for turn in turns] if turns is not None else None,
            ))
    return settings, conversations


def request_for(conversation, messages, speaker, round_index):
    # Each actor sees its own previous messages as assistant messages.
    history = [{"role": "assistant" if item["speaker"] == speaker else "user",
                "content": item["text"]} for item in messages]
    instructions = conversation["system_prompts"][speaker]
    if speaker == "student":
        if conversation["turn_instructions"] is not None:
            instructions += "\n\nCurrent turn instructions: " + conversation["turn_instructions"][round_index]
        if not history:
            history.append({"role": "user", "content": "Begin the conversation with your tutor."})
    model = conversation["models"][speaker]
    request = dict(model=model["resolved_model"], instructions=instructions, input=history, store=False)
    effort = model.get("reasoning")
    if effort == "none" and "claude" in model["resolved_model"].lower():
        # LiteLLM maps reasoning="none" to omission for Claude; omission can
        # enable default thinking. Send an explicit native disable instead.
        request["thinking"] = {"type": "disabled"}
        if "claude-sonnet-5" in model["resolved_model"].lower():
            request["output_config"] = {"effort": "low"}
    elif effort is not None:
        request["reasoning"] = {"effort": effort}
    return request


def save_transcript(folder, record):
    api.write_json(folder / "conversation.json", record)
    c = record["configuration"]
    lines = [f"# {c['topic_name']} ({c['language']})", "", f"Status: {record['status']}", ""]
    for message in record["messages"]:
        lines.extend([f"## Round {message['round']} ? {message['speaker'].title()}", "", message["text"], ""])
    (folder / "conversation.md").write_text("\n".join(lines), encoding="utf-8")


async def simulate(conversation, folder, catalog, timeout, call=None):
    folder.mkdir(parents=True, exist_ok=False)
    record = dict(configuration=conversation, status="running", messages=[])
    save_transcript(folder, record)
    for round_index in range(5):
        for speaker in ("student", "tutor"):
            request = request_for(conversation, record["messages"], speaker, round_index)
            job = dict(conversation["models"][speaker],
                       job_id=f"{round_index + 1:02d}-{speaker}",
                       lang_id=conversation["language_code"], prompt_type=speaker,
                       topic=conversation["topic_name"], web_search=False)
            print(f"{conversation['id']}: round {round_index + 1}/5, {speaker}", flush=True)
            turn_folder = folder / "turns" / job["job_id"]
            turn_folder.mkdir(parents=True)
            await api.execute([job], turn_folder, catalog, 1, timeout, False, call=call,
                              request_builder=lambda _: request)
            result = api.read_json(turn_folder / (job["job_id"] + ".json"))
            if result["status"] != "completed":
                record.update(status=result["status"], failed_turn=job["job_id"])
                save_transcript(folder, record)
                return False
            record["messages"].append(dict(round=round_index + 1, speaker=speaker,
                                           text=result["text"], usage=result.get("usage", {})))
            save_transcript(folder, record)
    record["status"] = "completed"
    save_transcript(folder, record)
    return True


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run-set", type=Path, default=HERE / "run_set" / "run.json")
    parser.add_argument("--config-dir", type=Path, default=HERE / "config")
    parser.add_argument("--output", type=Path, help="New output directory; existing directories are never overwritten")
    parser.add_argument("--dry-run", action="store_true", help="Validate and save rendered prompts without API calls")
    args = parser.parse_args(argv)
    try:
        catalog = api.read_json(ROOT / "data/models.json")
        settings, conversations = prepare(args.config_dir, catalog, args.run_set)
        if not args.dry_run:
            try:
                from dotenv import load_dotenv
                import litellm  # Check dependencies before creating output or starting a run.
            except ImportError as exc:
                raise ValueError("Missing API dependencies. Run: python -m pip install litellm python-dotenv") from exc
            load_dotenv(ROOT / ".env")
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        output = args.output or HERE / "outputs" / stamp
        output.mkdir(parents=True, exist_ok=False)
        api.write_json(output / "manifest.json", dict(settings=settings, conversations=conversations))
        preview = []
        for c in conversations:
            preview.extend([f"# {c['id']}", ""])
            for speaker, prompt in c["system_prompts"].items():
                effort = c["models"][speaker].get("reasoning")
                preview.extend([f"## {speaker.title()} system prompt", "", f"Reasoning setting: {effort or 'provider default'}", "", prompt, ""])
            if c["turn_instructions"] is not None:
                preview.extend(["## Student turn instructions", ""])
                preview.extend(f"{i}. {text}" for i, text in enumerate(c["turn_instructions"], 1))
            preview.append("")
        (output / "prompt_preview.md").write_text("\n".join(preview), encoding="utf-8")
        print(f"Prepared {len(conversations)} conversations ({len(conversations) * 10} API calls). Output: {output}")
        if args.dry_run:
            return 0

        async def execute():
            completed = 0
            for c in conversations:
                completed += await simulate(c, output / c["id"], catalog, settings.get("timeout", 120))
            return completed

        completed = asyncio.run(execute())
        print(f"Completed {completed}/{len(conversations)} conversations. Output: {output}")
        return int(completed != len(conversations))
    except (ValueError, OSError, KeyError, TypeError) as exc:
        parser.exit(1, f"Error: {exc}\n")


if __name__ == "__main__":
    sys.exit(main())
