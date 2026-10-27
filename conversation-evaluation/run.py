"""Evaluate saved tutoring conversations against the versioned rubric."""
from __future__ import annotations

import argparse
import copy
from collections import Counter
import csv
import hashlib
import importlib.util
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
identity_spec = importlib.util.spec_from_file_location("conversation_identity", ROOT / "conversation_identity.py")
identity = importlib.util.module_from_spec(identity_spec)
identity_spec.loader.exec_module(identity)
LEGACY_RUBRIC = ROOT / "explanation-difference/content/evaluation_rubric.md"
LEGACY_SCHEMA = ROOT / "explanation-difference/content/evaluation_rubric.schema.json"
PROMPT = HERE / "prompts/evaluator-v3.md"
RUBRIC = HERE / "human-annotation/coding-guidebook.md"
SCHEMA = HERE / "schemas/evaluator-v3.schema.json"
API_URL = "https://openrouter.ai/api/v1/chat/completions"
PIPELINE_VERSION = "6"
TRANSLATION_PROMPT = HERE / "prompts/translator.md"
METADATA_KEYS = (
    "topic_native_name", "topic_english_name", "native_language",
    "learner_level", "learning_objective", "reference_concepts", "reference_source",
)


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8-sig"))


def save_json(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def digest(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode()).hexdigest()


def normalize(path):
    """Accept repository transcripts or explicit canonical messages; never infer from markdown."""
    path = Path(path)
    data = read_json(path)
    if data.get("status", "completed") != "completed":
        raise ValueError(f"{path}: source conversation is not completed")
    config = data.get("configuration", {})
    metadata = {k: None for k in METADATA_KEYS}
    metadata.update(reference_concepts=[], topic_native_name=config.get("topic_name"),
                    native_language=config.get("language"))
    supplied = data.get("metadata", {})
    for key in METADATA_KEYS:
        if key in supplied:
            metadata[key] = supplied[key]
    if metadata["native_language"] == "English" and metadata["topic_english_name"] is None:
        metadata["topic_english_name"] = metadata["topic_native_name"]
    messages = []
    for index, item in enumerate(data.get("messages", []), 1):
        speaker = item.get("speaker", item.get("role"))
        speaker = {"assistant": "tutor", "user": "student"}.get(speaker, speaker)
        text = item.get("text", item.get("content"))
        if speaker not in {"tutor", "student"} or not isinstance(text, str) or not text.strip():
            raise ValueError(f"{path}: message {index} needs tutor/student speaker and nonempty text")
        turn_id = item.get("turn_id", f"turn_{index:04d}")
        if not isinstance(turn_id, str) or not turn_id:
            raise ValueError(f"{path}: invalid turn ID")
        messages.append(dict(turn_id=turn_id, speaker=speaker, text=text))
    if not messages or not any(m["speaker"] == "tutor" for m in messages):
        raise ValueError(f"{path}: no tutor messages")
    if len({m["turn_id"] for m in messages}) != len(messages):
        raise ValueError(f"{path}: duplicate turn IDs")
    limitations = []
    if messages[0]["speaker"] == "tutor":
        limitations.append("The saved conversation begins with a tutor opening; no initiating student request is recorded.")
    if messages[-1]["speaker"] == "student":
        limitations.append("The record ends with a student contribution; the tutor had no recorded opportunity to respond to it.")
    tutor_context = data.get("tutor_context", dict(instruction=config.get("system_prompts", {}).get("tutor"),
                         opening_request=config.get("first_message")))
    learner_context = data.get("learner_context")
    if metadata["learner_level"] is None and learner_context is None and not tutor_context["instruction"]:
        limitations.append("Learner level is not explicitly supplied as evaluation context.")
    conversation_id = data.get("conversation_id", config.get("id", path.parent.name))
    if not isinstance(conversation_id, str) or not conversation_id:
        raise ValueError(f"{path}: invalid conversation ID")
    learning_topic = data.get("learning_topic", config.get("topic_name") or metadata["topic_native_name"]
                              or metadata["topic_english_name"])
    return dict(conversation_id=conversation_id, metadata=metadata, messages=messages,
                learning_topic=learning_topic, topic_id=data.get("topic_id", config.get("topic_id")),
                learner_context=learner_context, tutor_context=tutor_context, limitations=limitations,
                translation=data.get("translation"))


def discover(inputs):
    found = set()
    for value in inputs:
        path = Path(value).resolve()
        if path.is_dir():
            matches = list(path.rglob("conversation.json"))
            if not matches:
                raise ValueError(f"No conversation.json files in {path}")
        else:
            if path.name == "conversation.md":
                path = path.with_suffix(".json")
            if not path.is_file() or path.suffix != ".json":
                raise ValueError(f"Expected a JSON transcript or directory: {path}")
            matches = [path]
        found.update(p.resolve() for p in matches)
    return sorted(found)


def object_schema(properties):
    return dict(type="object", additionalProperties=False, properties=properties,
                required=list(properties))


def stage_schema(schema, stage):
    definitions = copy.deepcopy(schema["$defs"])
    p = schema["properties"]
    if stage == "local":
        properties = {
            "inventory": copy.deepcopy(p["tutor_turn_inventory"]["items"]),
            "evaluation": {"anyOf": [
                copy.deepcopy(p["explanation_evaluations"]["items"]), {"type": "null"}]},
            "limitations": copy.deepcopy(p["limitations"]),
        }
    else:
        properties = {k: copy.deepcopy(p[k]) for k in ("conversation_evaluation", "limitations")}
    selected = {}
    def collect(node):
        if isinstance(node, dict):
            reference = node.get("$ref")
            if reference and reference.startswith("#/$defs/"):
                name = reference.split("/")[-1]
                if name not in selected:
                    selected[name] = definitions[name]
                    collect(selected[name])
            for value in node.values():
                collect(value)
        elif isinstance(node, list):
            for value in node:
                collect(value)
    collect(properties)
    return {"$schema": schema["$schema"], **object_schema(properties), "$defs": selected}


def stage_instructions(prompt, stage):
    """Select only the relevant questions plus shared evidence instructions."""
    shared, sections = prompt.split("## Local evaluation\n", 1)
    local, sections = sections.split("## Conversation evaluation\n", 1)
    conversation, evidence = sections.split("## Evidence\n", 1)
    selected = "## Local evaluation\n" + local if stage == "local" else "## Conversation evaluation\n" + conversation
    return shared + selected + "## Evidence\n" + evidence


def needs_translation(conversation, schema):
    language = str(conversation["metadata"]["native_language"] or "").strip().casefold()
    return is_v3(schema) and language not in {"english", "en", "en-us", "en-gb"}


def evaluation_variants(conversation, schema, mode):
    if not needs_translation(conversation, schema):
        return ["original"]
    return ["original", "translated"] if mode == "both" else [mode]


def translation_task(conversation, prompt):
    segments, paths = [], []
    def add(path, value):
        if isinstance(value, str) and value.strip():
            segments.append(dict(id=f"segment_{len(segments) + 1:04d}", text=value))
            paths.append(path)
        elif isinstance(value, dict):
            for key, child in value.items():
                add(path + [key], child)
        elif isinstance(value, list):
            for index, child in enumerate(value):
                add(path + [index], child)
    for index, message in enumerate(conversation["messages"]):
        add(["messages", index, "text"], message["text"])
    add(["learning_topic"], conversation["learning_topic"])
    for key in ("topic_native_name", "topic_english_name", "learner_level", "learning_objective", "reference_concepts"):
        add(["metadata", key], conversation["metadata"][key])
    add(["tutor_context"], conversation["tutor_context"])
    add(["learner_context"], conversation["learner_context"])
    schema = object_schema({"segments": {"type": "array", "minItems": len(segments), "maxItems": len(segments),
        "items": object_schema({"id": {"type": "string"}, "text": {"type": "string", "minLength": 1}})}})
    data = dict(stage="translation", source_language=conversation["metadata"]["native_language"],
                target_language="English", segments=segments)
    return dict(name="translation", schema=schema, data=data, paths=paths, messages=[
        {"role": "system", "content": prompt},
        {"role": "user", "content": json.dumps(data, ensure_ascii=False)}])


def validate_translation(value, task):
    schema_validate(value, task["schema"])
    supplied = task["data"]["segments"]
    if [s["id"] for s in value["segments"]] != [s["id"] for s in supplied]:
        raise ValueError("Translation segment IDs or order differ from the source")
    for source, translated in zip(supplied, value["segments"]):
        source_numbers = Counter(re.findall(r"[0-9]+(?:[.,][0-9]+)*", source["text"]))
        translated_numbers = Counter(re.findall(r"[0-9]+(?:[.,][0-9]+)*", translated["text"]))
        if source_numbers != translated_numbers:
            raise ValueError(f"{source['id']}: translation changed the written numbers; preserve every original number without adding or removing any")
        for expression in re.findall(r"\\\(.*?\\\)|\\\[.*?\\\]", source["text"], re.DOTALL):
            if expression not in translated["text"]:
                raise ValueError(f"{source['id']}: translation changed a LaTeX expression; copy it exactly")


def translation_fingerprint(conversation, task, settings):
    return digest(dict(source=conversation, prompt=task["messages"][0]["content"],
                       schema=task["schema"], settings=settings))


def load_translation(path, fingerprint, task, original):
    if not path.exists():
        return None
    value = read_json(path)
    provenance = value.get("translation", {})
    if provenance.get("fingerprint") != fingerprint:
        return None
    translated_segments = provenance.get("segments", [])
    validate_translation({"segments": translated_segments}, task)
    expected = translated_conversation(original, task, {"segments": translated_segments}, variant=path.name)
    payload = {key: child for key, child in value.items() if key != "translation"}
    if payload != expected:
        raise ValueError(f"Translated file has been modified: {path}; preserve it and use a separate source or remove this generated cache explicitly")
    return value


def translated_conversation(conversation, task, value, variant="conversation.english.json"):
    result = copy.deepcopy(conversation)
    result.pop("translation", None)
    for path, segment in zip(task["paths"], value["segments"]):
        node = result
        for key in path[:-1]:
            node = node[key]
        node[path[-1]] = segment["text"]
    result["metadata"]["native_language"] = "English"
    if result["metadata"]["topic_english_name"] is None:
        result["metadata"]["topic_english_name"] = result["metadata"]["topic_native_name"] or result["learning_topic"]
    original_language = conversation["metadata"]["native_language"] or "an unspecified source language"
    result["limitations"] = list(dict.fromkeys(result["limitations"] + [
        f"Evaluation uses an English translation from {original_language}; wording and tone judgments depend on translation fidelity. Evidence quotations refer to the English translation and retain original turn IDs."]))
    result["source_conversation_id"] = conversation["conversation_id"]
    result["conversation_id"] = identity.translation_uid(conversation["conversation_id"], variant, result)
    return result


def save_translation(source, path, conversation, task, value, settings):
    if path.exists() and read_json(path).get("translation", {}).get("source_path") != str(source.resolve()):
        raise ValueError(f"Refusing to overwrite an unrelated translated file: {path}")
    result = translated_conversation(conversation, task, value, variant=path.name)
    result["translation"] = dict(source_path=str(source.resolve()),
        original_language=conversation["metadata"]["native_language"], target_language="English",
        model=settings["model"], fingerprint=translation_fingerprint(conversation, task, settings),
        segments=value["segments"])
    save_json(path, result)
    lines = [f"# English translation: {result['conversation_id']}", "",
             "Faithful translation; source claims and errors are preserved.", ""]
    for message in result["messages"]:
        lines += [f"## {message['turn_id']} ? {message['speaker'].title()}", "", message["text"], ""]
    path.with_suffix(".md").write_text("\n".join(lines), encoding="utf-8")
    return result


def is_v3(schema):
    return schema.get("properties", {}).get("rubric_version", {}).get("const") in {"3.0", "3.1"}


def response_format(schema):
    """Inline local definitions for provider routes that drop JSON Schema references."""
    def expand(node, references=()):
        if isinstance(node, list):
            return [expand(value, references) for value in node]
        if not isinstance(node, dict):
            return node
        if "$ref" in node:
            reference = node["$ref"]
            if not reference.startswith("#/$defs/") or reference in references:
                raise ValueError("API output schema requires nonrecursive local definitions")
            name = reference.split("/")[-1]
            resolved = expand(schema["$defs"][name], references + (reference,))
            resolved.update(expand({key: value for key, value in node.items() if key != "$ref"}, references))
            return resolved
        return {key: expand(value, references) for key, value in node.items()
                if key not in {"$defs", "$schema"}}
    return {"type": "json_schema", "json_schema": {
        "name": "tutoring_evaluation", "strict": True, "schema": expand(schema)}}


def tasks_for(conversation, rubric, schema, prompt=None):
    if is_v3(schema):
        base = prompt if prompt is not None else PROMPT.read_text(encoding="utf-8")
        data = dict(stage="conversation", conversation_id=conversation["conversation_id"],
                    learning_topic=conversation["learning_topic"], topic_id=conversation["topic_id"],
                    language=conversation["metadata"]["native_language"],
                    learner_context=conversation["learner_context"],
                    evaluation_language=conversation["metadata"]["native_language"],
                    evaluation_variant="translated" if conversation.get("translation") else "original",
                    original_language=(conversation.get("translation") or {}).get("original_language", conversation["metadata"]["native_language"]),
                    tutor_context=conversation["tutor_context"], metadata=conversation["metadata"],
                    messages=conversation["messages"], source_limitations=conversation["limitations"])
        return [dict(name="conversation", data=data, schema=copy.deepcopy(schema), messages=[
            {"role": "system", "content": base},
            {"role": "user", "content": json.dumps(data, ensure_ascii=False)}])]
    local_schema = stage_schema(schema, "local")
    global_schema = stage_schema(schema, "conversation")
    base = prompt if prompt is not None else (HERE / "prompts/evaluator.md").read_text(encoding="utf-8")
    tasks = []
    for i, turn in enumerate(conversation["messages"]):
        if turn["speaker"] != "tutor":
            continue
        task = dict(stage="local", target_turn_id=turn["turn_id"],
                    metadata=conversation["metadata"], messages=conversation["messages"][:i + 1])
        tasks.append((f"local_{i + 1:04d}", task, local_schema))
    # Do not leak previous local scores into the independent holistic assessment.
    tasks.append(("conversation", dict(stage="conversation", metadata=conversation["metadata"],
                                      messages=conversation["messages"],
                                      source_limitations=conversation["limitations"]), global_schema))
    result = []
    for name, data, output_schema in tasks:
        system = ("Evaluate only the " + data["stage"] + " stage in this request.\n\n"
                  + stage_instructions(base, data["stage"])
                  + "\n\nOUTPUT JSON SCHEMA\n" + json.dumps(output_schema, ensure_ascii=False))
        messages = [{"role": "system", "content": system},
                    {"role": "user", "content": json.dumps(data, ensure_ascii=False)}]
        result.append(dict(name=name, data=data, schema=output_schema, messages=messages))
    return result


def schema_validate(value, schema):
    from jsonschema import Draft202012Validator
    errors = sorted(Draft202012Validator(schema).iter_errors(value),
                    key=lambda e: "/".join(map(str, e.absolute_path)))
    if errors:
        error = errors[0]
        raise ValueError(f"Schema {list(error.absolute_path)}: {error.message}")


def evidence_nodes(value):
    if isinstance(value, dict):
        if {"turn_id", "quote", "occurrence"} <= value.keys():
            yield value
        else:
            for child in value.values():
                yield from evidence_nodes(child)
    elif isinstance(value, list):
        for child in value:
            yield from evidence_nodes(child)


def exact_quote_candidates(text, quote):
    """Suggest original source spans when only Markdown/spacing was changed."""
    def normalized(source):
        characters, locations = [], []
        index = 0
        while index < len(source):
            if source.startswith("**", index):
                index += 2
                continue
            if source[index] == "`":
                index += 1
                continue
            start = index
            if source[index].isspace():
                while index < len(source) and source[index].isspace():
                    index += 1
                characters.append(" ")
                locations.append((start, index))
            else:
                characters.append(source[index])
                locations.append((index, index + 1))
                index += 1
        return "".join(characters), locations
    source, positions = normalized(text)
    whole, _ = normalized(quote)
    parts = [whole.strip()] if whole.strip() in source else [part.strip() for part in whole.split("...")]
    if not parts or any(len(part) < 8 for part in parts):
        return []
    result, after = [], 0
    for part in parts:
        start = source.find(part, after)
        if start < 0:
            return []
        end = start + len(part)
        original_start, original_end = positions[start][0], positions[end - 1][1]
        original = text[original_start:original_end]
        occurrence, match = 0, -1
        while match < original_start:
            match = text.find(original, match + 1)
            if match < 0:
                return []
            occurrence += 1
        result.append(dict(quote=original, occurrence=occurrence))
        after = end
    return result


def validate_evidence(value, messages, concept_ids=(), own_turn=None):
    texts = {m["turn_id"]: m["text"] for m in messages}
    problems = []
    for evidence in evidence_nodes(value):
        turn_id, quote = evidence["turn_id"], evidence["quote"]
        if turn_id not in texts:
            problems.append(f"Unknown or future evidence turn: {turn_id}")
            continue
        if own_turn is not None and turn_id != own_turn:
            problems.append("Concept and feature spans must belong to the evaluated response")
        position = -1
        for _ in range(evidence["occurrence"]):
            position = texts[turn_id].find(quote, position + 1)
            if position < 0:
                problem = (f"Quote occurrence not found in {turn_id}: " +
                           json.dumps(quote, ensure_ascii=False) +
                           f" (occurrence {evidence['occurrence']})")
                candidates = exact_quote_candidates(texts[turn_id], quote)
                if candidates:
                    problem += (". Exact source candidate(s): " + json.dumps(candidates, ensure_ascii=False) +
                                ". Use separate evidence entries for separate spans, retaining this turn ID. "
                                "Use these only if they support the judgment.")
                problems.append(problem)
                break
        if not set(evidence.get("concept_ids", [])) <= set(concept_ids):
            problems.append("Evidence references unknown concept IDs")
    if problems:
        raise ValueError("Invalid evidence spans:\n" + "\n".join(dict.fromkeys(problems)) +
                         "\nCorrect ALL listed spans. Copy a shorter contiguous exact phrase from its actual source turn if needed. "
                         "Preserve Markdown, punctuation, whitespace, and Unicode characters. "
                         "Do not insert ellipses or replacement characters. "
                         "If there is no supporting passage, remove the unsupported span and explain the absence.")


def validate_local(value, task):
    schema_validate(value, task["schema"])
    target = task["data"]["target_turn_id"]
    inventory, evaluation = value["inventory"], value["evaluation"]
    if inventory["turn_id"] != target:
        raise ValueError("Inventory turn ID differs from target")
    if inventory["contains_explanation"] != (evaluation is not None):
        raise ValueError("Explanation classification disagrees with evaluation presence")
    if evaluation is None:
        return
    if evaluation["turn_id"] != target:
        raise ValueError("Evaluation turn ID differs from target")
    concepts = evaluation["concepts"]
    ids = [c["concept_id"] for c in concepts]
    if len(ids) != len(set(ids)):
        raise ValueError("Duplicate concept IDs")
    history = task["data"]["messages"]
    validate_evidence(evaluation, history, ids)
    validate_evidence(concepts, history, ids, target)
    validate_evidence(evaluation["features"], history, ids, target)
    for concept in concepts:
        if concept["label_source"] == "explicit_title" and concept["label"] != concept["title_span"]["quote"]:
            raise ValueError("Explicit concept label must match its title quotation")
    summary = evaluation["features"]["summary"]
    if summary["present"] != bool(summary["evidence"]):
        raise ValueError("Summary presence disagrees with evidence")
    consolidated = evaluation["instructional_characteristics"]["consolidates_main_ideas"]["status"]
    if summary["present"] != (consolidated == "present"):
        raise ValueError("Summary annotation disagrees with consolidation checklist")
    for key, judgment in evaluation["instructional_characteristics"].items():
        if judgment["status"] == "present" and not any(e["turn_id"] == target for e in judgment["evidence"]):
            raise ValueError(f"{key}: presence needs evidence in the current tutor turn")
    for name in ("technical_accuracy", "language_mechanics"):
        accuracy = evaluation.get(name)
        if accuracy and accuracy["status"] in {"minor_error", "major_error"} and not any(
                e["turn_id"] == target for e in accuracy["evidence"]):
            raise ValueError(f"Confirmed {name} error needs evidence in the current response")


def question_mark_positions(text):
    """Locate prose question marks without treating code, URLs, or notation as questions."""
    excluded = set()
    patterns = (
        r"```.*?```|~~~.*?~~~", r"`+[^`]*`+", r"\bhttps?://[^\s<>]+",
        r"\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$|\$[^$\n]*\$",
        r"(['\"])[?\u061f\uff1f]\1", r"\\[?\u061f\uff1f]",
    )
    for pattern in patterns:
        for match in re.finditer(pattern, text, re.DOTALL):
            excluded.update(range(match.start(), match.end()))
    return {i for i, char in enumerate(text) if char in "?\u061f\uff1f" and i not in excluded}


def validate_question_inventory(questions, messages):
    turns = {m["turn_id"]: m["text"] for m in messages if m["speaker"] == "tutor"}
    required = {turn_id: question_mark_positions(text) for turn_id, text in turns.items()}
    covered = {turn_id: set() for turn_id in turns}
    problems = []
    for entry in questions:
        turn_id = entry["turn_locations"][0]
        text, quote = turns[turn_id], entry["question"]
        position = -1
        found = False
        while True:
            position = text.find(quote, position + 1)
            if position < 0:
                break
            marks = required[turn_id] & set(range(position, position + len(quote)))
            if len(marks) > 1 and "|" in quote:
                problems.append(f"Combined table questions in {turn_id}: " + json.dumps(quote, ensure_ascii=False) +
                                ". Record each question-bearing table cell as a separate question entry, copying its question wording exactly.")
                found = True
                break
            if not marks:
                found = True
                break
            if marks.isdisjoint(covered[turn_id]):
                covered[turn_id].update(marks)
                found = True
                break
        if not found:
            problems.append(f"Duplicate question occurrence in {turn_id}: " + json.dumps(quote, ensure_ascii=False) +
                            ". Record each actual occurrence once; repetitions need separate source occurrences.")
    missing = []
    for turn_id, text in turns.items():
        for position in sorted(required[turn_id] - covered[turn_id]):
            start = max(text.rfind("\n", 0, position) + 1, position - 400)
            missing.append(f"Missing question occurrence in {turn_id}; exact source passage: " +
                           json.dumps(text[start:position + 1], ensure_ascii=False))
    if problems or missing:
        raise ValueError("Incomplete or invalid question inventory:\n" + "\n".join(problems + missing) +
                         "\nList ALL these questions, retaining the other valid entries. Include question-form headings, "
                         "table headings, inline rhetorical questions, understanding checks, and suggested learner questions. "
                         "Rhetorical questions are Instructional, including when the tutor immediately answers them. "
                         "Copy each question exactly from its tutor turn and use the rubric's question_type and concept_checked rules.")


def validate_v3(value, task):
    missing = []
    if isinstance(value, dict):
        for group in ("pedagogical_characteristics", "conversation_quality"):
            judgments = value.get(group, {})
            if not isinstance(judgments, dict):
                continue
            for name, judgment in judgments.items():
                if name == "instructional_sequence":
                    continue
                if isinstance(judgment, dict) and not {"status", "score", "reason", "evidence"} <= judgment.keys():
                    missing.append(group + "." + name)
    if missing:
        raise ValueError("Incomplete ordinal ratings: " + ", ".join(missing) +
                         ". Each must contain status, score, reason, and evidence. "
                         "Evaluate each item using the rubric; use scored with 1, 2, or 3, "
                         "or an explained null score for Not applicable / Insufficient evidence. "
                         "Do not return empty rating objects.")
    schema_validate(value, task["schema"])
    data = task["data"]
    if value["conversation_id"] != data["conversation_id"]:
        raise ValueError("Conversation ID differs from the supplied conversation")
    if value["learning_topic"] != data["learning_topic"]:
        raise ValueError("Learning topic differs from the supplied learning_topic; copy it exactly, or use null when none was supplied")
    for question in (value["instructional_features"]["questions"] if value["rubric_version"] == "3.0" else []):
        if question["question_type"] == "Knowledge-checking" and question["concept_checked"] is None:
            raise ValueError("Knowledge-checking questions need concept_checked identifying the subject-matter knowledge being checked")
        if question["question_type"] == "Instructional" and question["concept_checked"] is not None:
            raise ValueError("Instructional questions must use concept_checked null because they do not request a demonstration of subject-matter knowledge")
    validate_evidence(value, data["messages"])
    for group in ("pedagogical_characteristics", "conversation_quality"):
        for name, judgment in value[group].items():
            if "score" not in judgment:
                continue
            if judgment["status"] == "scored":
                if type(judgment["score"]) is not int or judgment["score"] not in {1, 2, 3}:
                    raise ValueError(f"{name}: scored judgments need an integer score of 1, 2, or 3")
            elif judgment["score"] is not None:
                raise ValueError(f"{name}: unscored judgments need score null")
    turns = {m["turn_id"]: m for m in data["messages"]}
    problems = []
    for group in ("instructional_features", "errors"):
        for name, entries in value[group].items():
            for index, entry in enumerate(entries):
                for location in entry["turn_locations"]:
                    if location not in turns or turns[location]["speaker"] != "tutor":
                        raise ValueError(f"{group}: turn_locations must reference tutor turns")
                source = entry.get("question") if group == "instructional_features" else entry["evidence"]
                if source is not None and not any(source in turns[t]["text"] for t in entry["turn_locations"]):
                    problem = (f"{group}.{name}[{index}]: exact question or error evidence not found in "
                               f"turn_locations {entry['turn_locations']}: " + json.dumps(source, ensure_ascii=False))
                    candidates = [dict(turn_id=t, **candidate)
                                  for t in entry["turn_locations"]
                                  for candidate in exact_quote_candidates(turns[t]["text"], source)]
                    if candidates:
                        problem += ". Exact source candidate(s): " + json.dumps(candidates, ensure_ascii=False)
                    if group == "errors":
                        problem += (". The error evidence field is one string: select a single exact representative "
                                    "occurrence from one cited turn. Do not join candidates or insert ellipses. "
                                    "Retain all relevant occurrences and correction turns in turn_locations.")
                    problems.append(problem)
    if problems:
        raise ValueError("\n".join(problems) +
                         "\nCorrect ALL listed entries. Copy the original question or incorrect wording exactly, "
                         "including Markdown and punctuation, from its cited tutor turn. "
                         "Do not paraphrase or invent source text.")
    if value["rubric_version"] == "3.0":
        validate_question_inventory(value["instructional_features"]["questions"], data["messages"])
    for entry in value["verification_needed"]:
        if any(t not in turns for t in entry["turn_locations"]):
            raise ValueError("Verification case references an unknown turn")


def validate_stage(value, task):
    if task["data"]["stage"] == "translation":
        validate_translation(value, task)
    elif is_v3(task["schema"]):
        validate_v3(value, task)
    elif task["data"]["stage"] == "local":
        validate_local(value, task)
    else:
        schema_validate(value, task["schema"])
        validate_evidence(value, task["data"]["messages"])


def assemble(conversation, values, schema):
    if is_v3(schema):
        if len(values) != 1:
            raise ValueError("v3 requires one whole-conversation evaluation")
        result = copy.deepcopy(values[0])
        result["limitations"] = list(dict.fromkeys(conversation["limitations"] + result["limitations"]))
        schema_validate(result, schema)
        return result
    result = dict(rubric_version=schema["properties"]["rubric_version"]["const"],
                  conversation_id=conversation["conversation_id"], metadata=conversation["metadata"],
                  tutor_turn_inventory=[], explanation_evaluations=[],
                  conversation_evaluation=values[-1]["conversation_evaluation"],
                  limitations=list(conversation["limitations"]))
    for local in values[:-1]:
        result["tutor_turn_inventory"].append(local["inventory"])
        if local["evaluation"] is not None:
            result["explanation_evaluations"].append(local["evaluation"])
    for value in values:
        result["limitations"].extend(value["limitations"])
    result["limitations"] = list(dict.fromkeys(result["limitations"]))
    schema_validate(result, schema)
    expected = [m["turn_id"] for m in conversation["messages"] if m["speaker"] == "tutor"]
    if [x["turn_id"] for x in result["tutor_turn_inventory"]] != expected:
        raise ValueError("Tutor inventory is incomplete or out of order")
    return result


def request_api(messages, settings):
    import requests
    key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not key:
        raise ValueError("Set OPENROUTER_API_KEY in the environment or repository .env")
    request = dict(model=settings["model"], messages=messages,
                   max_tokens=settings["max_tokens"], response_format=settings.get("response_format", {"type": "json_object"}))
    if request["response_format"]["type"] == "json_schema":
        request["provider"] = {"require_parameters": True}
    if settings.get("reasoning") == "none":
        request["reasoning"] = {"enabled": False}
    elif settings.get("reasoning") is not None:
        request["reasoning"] = settings["reasoning"] if isinstance(settings["reasoning"], dict) else {"effort": settings["reasoning"]}
    for attempt in range(settings["http_retries"] + 1):
        try:
            response = requests.post(API_URL, headers={"Authorization": f"Bearer {key}"},
                                     json=request, timeout=settings["timeout"])
        except (requests.Timeout, requests.ConnectionError):
            if attempt < settings["http_retries"]:
                time.sleep(min(2 ** attempt, 10))
                continue
            raise RuntimeError("OpenRouter connection failed or timed out") from None
        if response.status_code in {429, 500, 502, 503, 504} and attempt < settings["http_retries"]:
            time.sleep(min(2 ** attempt, 10))
            continue
        if response.status_code >= 400:
            # Never persist provider error bodies, which can include credential metadata.
            raise RuntimeError(f"OpenRouter HTTP {response.status_code}")
        raw = response.json()
        if raw.get("error"):
            raise RuntimeError("OpenRouter returned an API error")
        choice = (raw.get("choices") or [{}])[0]
        text = (choice.get("message") or {}).get("content")
        if choice.get("finish_reason") != "stop" or not isinstance(text, str):
            raise RuntimeError("Evaluator output is incomplete or missing; increase max_tokens if truncated")
        return dict(text=text, usage=raw.get("usage", {}), model=raw.get("model"),
                    response_id=raw.get("id"), provider=raw.get("provider"), finish_reason=choice["finish_reason"])
    raise RuntimeError("Request retry limit reached")


def run_stage(task, folder, settings, call=request_api, resume=False):
    destination = folder / task["name"]
    destination.mkdir(parents=True, exist_ok=True)
    result_path = destination / "validated.json"
    if resume and result_path.exists():
        try:
            value = read_json(result_path)
            validate_stage(value, task)
        except (ValueError, KeyError, TypeError):
            # Preserve the rejected cache for inspection and regenerate the stage.
            result_path.replace(destination / "rejected_cache.json")
        else:
            return value
    print(f"Evaluating {folder.name}/{task['name']}...", flush=True)
    messages = copy.deepcopy(task["messages"])
    request_settings = dict(settings)
    if is_v3(task["schema"]) or task["data"]["stage"] == "translation":
        request_settings["response_format"] = response_format(task["schema"])
    save_json(destination / "request.json", {"messages": messages, "settings": request_settings})
    # Number attempt files monotonically so failed retries are retained on resume.
    existing = list(destination.glob("attempt_*.json"))
    offset = max((int(p.stem.split("_")[1]) for p in existing), default=0)
    if resume and existing:
        previous = read_json(max(existing, key=lambda p: int(p.stem.split("_")[1])))
        previous_text = previous["response"]["text"]
        try:
            validate_stage(json.loads(previous_text), task)
        except (ValueError, KeyError, TypeError) as exc:
            messages = copy.deepcopy(task["messages"]) + [
                {"role": "assistant", "content": previous_text},
                {"role": "user", "content": "Correct the saved JSON to satisfy all schema and evidence rules. "
                 "Return the complete replacement JSON only. Validation error: " + str(exc)}]
    save_json(destination / "request.json", {"messages": messages, "settings": request_settings})
    for attempt in range(settings["repair_attempts"] + 1):
        response = call(messages, request_settings)
        response["text"] = response["text"].replace(os.environ.get("OPENROUTER_API_KEY") or "\0", "[REDACTED]")
        save_json(destination / f"attempt_{offset + attempt + 1:02d}.json",
                  {"response": response, "messages": messages})
        try:
            value = json.loads(response["text"])
            validate_stage(value, task)
        except (ValueError, KeyError, TypeError) as exc:
            error = str(exc)
            save_json(destination / "validation_error.json", {"error": error})
            if attempt == settings["repair_attempts"]:
                raise ValueError(f"{task['name']}: invalid evaluator output: {error}") from exc
            messages += [{"role": "assistant", "content": response["text"]},
                         {"role": "user", "content": "Correct the JSON to satisfy the schema and evidence rules. "
                          "Return the complete replacement JSON only. Validation error: " + error}]
        else:
            save_json(result_path, value)
            error_path = destination / "validation_error.json"
            if error_path.exists():
                error_path.unlink()
            return value
    raise AssertionError("Unreachable")


def report_evidence(evidence):
    """Render source quotations with their turn and concept references."""
    lines = []
    for span in evidence:
        concepts = ", ".join(span.get("concept_ids", [])) or "none"
        lines += [f"Source: {span['turn_id']}; occurrence {span['occurrence']}; concepts: {concepts}.", ""]
        lines += ["> " + line for line in span["quote"].split("\n")]
        lines.append("")
    return lines


def write_v3_report(folder, result):
    lines = [f"# Evaluation: {result['conversation_id']}", "",
             f"Rubric: {result['rubric_version']}", "",
             f"Learning topic: {result['learning_topic'] or 'Not supplied'}", ""]
    for group in ("instructional_features", "pedagogical_characteristics", "conversation_quality", "errors"):
        lines += ["## " + group.replace("_", " ").title(), ""]
        for name, value in result[group].items():
            lines += ["### " + name.replace("_", " ").title(), ""]
            if isinstance(value, list):
                if not value:
                    lines += ["None identified.", ""]
                for index, entry in enumerate(value, 1):
                    lines += [f"#### Entry {index}", ""]
                    for key, content in entry.items():
                        text = ", ".join(content) if isinstance(content, list) else "null" if content is None else content
                        lines += [f"**{key}**: {text}", ""]
            else:
                label = value.get("value", value.get("score") if value.get("status") == "scored" else value.get("status"))
                lines += [f"**{label}**. {value['reason']}", ""]
                lines += report_evidence(value["evidence"])
    lines += ["## Verification needed", ""]
    if not result["verification_needed"]:
        lines += ["None identified.", ""]
    for entry in result["verification_needed"]:
        lines += [f"**{entry['issue']}**: {entry['reason']}", "",
                  "Turns: " + ", ".join(entry["turn_locations"]), ""]
        lines += report_evidence(entry["evidence"])
    lines += ["## Limitations", ""] + ["- " + item for item in result["limitations"]] + [""]
    (folder / "report.md").write_text("\n".join(lines), encoding="utf-8")


def write_report(folder, result):
    if result["rubric_version"] in {"3.0", "3.1"}:
        return write_v3_report(folder, result)
    lines = [f"# Evaluation: {result['conversation_id']}", "",
             f"Rubric: {result['rubric_version']}", "", "## Response-level assessments", ""]
    for item in result["explanation_evaluations"]:
        lines += [f"### {item['turn_id']}", ""]
        for key, judgment in item["instructional_characteristics"].items():
            lines += [f"- **{key}**: {judgment['status']}. {judgment['rationale']}"]
        for key, judgment in item.get("response_quality", {}).items():
            lines += [f"- **{key}**: {judgment['status']}. {judgment['rationale']}"]
        mechanics = item.get("language_mechanics")
        if mechanics:
            lines += [f"- **Language mechanics**: {mechanics['status']}. {mechanics['rationale']}"]
            if mechanics["corrections"]:
                lines += ["Correction: " + mechanics["corrections"]]
        accuracy = item["technical_accuracy"]
        lines += [f"- **Technical accuracy**: {accuracy['status']}. {accuracy['rationale']}", ""]
        if accuracy["corrections"]:
            lines += ["Correction: " + accuracy["corrections"], ""]
        lines += [f"#### Concepts / subtopics ({len(item['concepts'])})", ""]
        if not item["concepts"]:
            lines += ["None identified.", ""]
        for concept in item["concepts"]:
            lines += [f"##### {concept['concept_id']}: {concept['label']}", "",
                      f"Label source: {concept['label_source']}.", ""]
            if concept["title_span"] is not None:
                lines += ["**Title quotation**", ""]
                lines += report_evidence([concept["title_span"]])
            lines += ["**Supporting content**", ""]
            lines += report_evidence(concept["content_spans"])
        features = item["features"]
        for key, title in (
            ("examples", "Examples"),
            ("analogies_or_models", "Analogies and models"),
            ("cultural_references", "Cultural references"),
            ("real_world_connections", "Real-world connections"),
            ("questions_or_hints", "Questions and hints"),
            ("resources", "Resources"),
        ):
            if key not in features:
                continue
            entries = features[key]
            lines += [f"#### {title} ({len(entries)})", ""]
            if not entries:
                lines += ["None identified.", ""]
            for index, feature in enumerate(entries, 1):
                lines += [f"**{index}. {feature['description']}**", ""]
                if "kind" in feature:
                    lines += [f"Kind: {feature['kind']}.", ""]
                if "kinds" in feature:
                    lines += [f"Kinds: {', '.join(feature['kinds'])}.", ""]
                if "regions" in feature:
                    lines += [f"Regions: {', '.join(feature['regions'])}.", ""]
                lines += report_evidence(feature["evidence"])
        structure = features.get("instructional_structure")
        if structure:
            lines += ["#### Instructional structure", "",
                      f"{structure['status']}: {structure['rationale']}", ""]
            lines += report_evidence(structure["evidence"])
        summary = features["summary"]
        lines += ["#### Summary annotation", "",
                  "Present." if summary["present"] else "Not identified.", ""]
        lines += report_evidence(summary["evidence"])
    lines += ["## Conversation quality", ""]
    for key, rating in result["conversation_evaluation"].items():
        label = rating["score"] if rating["status"] == "scored" else rating["status"]
        lines += [f"- **{key}**: {label}. {rating['rationale']}"]
    lines += ["", "## Limitations", ""] + ["- " + s for s in result["limitations"]]
    lines += ["", "Feature counts reflect the evaluator's annotations, not verified exhaustive counts.",
              "All structured annotations and rating evidence are available in [evaluation.json](evaluation.json).", ""]
    (folder / "report.md").write_text("\n".join(lines), encoding="utf-8")


def write_summary(output, records):
    with (output / "summary.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["source", "conversation_id", "evaluation_variant", "evaluation_language",
                         "level", "turn_id", "dimension", "status", "score"])
        for record in records:
            if record["status"] != "completed":
                continue
            result = read_json(Path(record["folder"]) / "evaluation.json")
            prefix = [record["source"], result["conversation_id"], record["evaluation_variant"], record["evaluation_language"]]
            if result["rubric_version"] in {"3.0", "3.1"}:
                for group in ("pedagogical_characteristics", "conversation_quality"):
                    for name, rating in result[group].items():
                        writer.writerow(prefix + ["conversation", "", name,
                                         rating.get("status", rating.get("value")), rating.get("score")])
                continue
            for item in result["explanation_evaluations"]:
                judgments = {**item["instructional_characteristics"],
                             **item.get("response_quality", {}),
                             "technical_accuracy": item["technical_accuracy"]}
                if "language_mechanics" in item:
                    judgments["language_mechanics"] = item["language_mechanics"]
                for name, judgment in judgments.items():
                    writer.writerow(prefix + ["response",
                                     item["turn_id"], name, judgment["status"], ""])
            for name, rating in result["conversation_evaluation"].items():
                writer.writerow(prefix + ["conversation",
                                 "", name, rating["status"], rating["score"]])


def evaluate_variant(source, conversation, folder, variant, rubric, schema, prompt,
                     translation_prompt, settings, translation_settings, dry_run, resume, call):
    folder.mkdir(parents=True, exist_ok=True)
    save_json(folder / "source.json", conversation)
    translate = variant == "translated" and needs_translation(conversation, schema)
    translation_path = source.with_name(source.stem + ".english.json")
    translation = translation_task(conversation, translation_prompt) if translate else None
    tasks = tasks_for(conversation, rubric, schema, prompt)
    record = dict(source=str(source), conversation_id=conversation["conversation_id"],
                  folder=str(folder), planned_calls=len(tasks) + int(translate), status="prepared",
                  evaluation_variant=variant,
                  evaluation_language="English" if translate else conversation["metadata"]["native_language"])
    if translate:
        record["translation_file"] = str(translation_path)
    try:
        evaluation_source = conversation
        ready = True
        if translate:
            save_json(folder / "translation/preview.json", dict(messages=translation["messages"],
                output_schema=translation["schema"], response_format=response_format(translation["schema"])))
            fingerprint = translation_fingerprint(conversation, translation, translation_settings)
            cached = load_translation(translation_path, fingerprint, translation, conversation)
            if cached is not None:
                evaluation_source = cached
            elif not dry_run:
                translated = run_stage(translation, folder, translation_settings, call, resume)
                evaluation_source = save_translation(source, translation_path, conversation, translation, translated, translation_settings)
            else:
                ready = False
                for task in tasks:
                    save_json(folder / task["name"] / "preview.json", dict(status="awaiting_translation",
                        system_prompt=prompt, evaluation_source=str(translation_path),
                        output_schema=task["schema"], response_format=response_format(task["schema"])))
        if ready:
            tasks = tasks_for(evaluation_source, rubric, schema, prompt)
            save_json(folder / "evaluation-source.json", evaluation_source)
            for task in tasks:
                save_json(folder / task["name"] / "preview.json", dict(messages=task["messages"],
                    output_schema=task["schema"],
                    response_format=response_format(task["schema"]) if is_v3(schema) else {"type": "json_object"}))
        if not dry_run:
            values = [run_stage(task, folder, settings, call, resume) for task in tasks]
            result = assemble(evaluation_source, values, schema)
            save_json(folder / "evaluation.json", result)
            write_report(folder, result)
            if is_v3(schema):
                with (folder / "report.md").open("a", encoding="utf-8") as handle:
                    handle.write(f"\nEvaluation version: {variant}; transcript language: {record['evaluation_language']}.\n")
                    handle.write("\nEvidence source: [Evaluated transcript](evaluation-source.json).\n")
            record["status"] = "completed"
            (folder / "failure.json").unlink(missing_ok=True)
    except (ValueError, RuntimeError, OSError) as exc:
        record.update(status="failed", error=str(exc))
        save_json(folder / "failure.json", {"error": str(exc)})
    return record


def write_variant_comparison(folder, records):
    completed = {r["evaluation_variant"]: r for r in records if r["status"] == "completed"}
    if set(completed) != {"original", "translated"}:
        return
    versions = {name: read_json(Path(record["folder"]) / "evaluation.json") for name, record in completed.items()}
    original, translated = versions["original"], versions["translated"]
    lines = [f"# Original and translated evaluation: {original['conversation_id']}", "",
             f"Original transcript language: {completed['original']['evaluation_language']}. Translated transcript language: English.", "",
             "Both evaluations use the same model and rubric independently. Counts and ratings are model annotations; differences may reflect translation or variation in model judgments.", "",
             "[Original evaluation](original/report.md) · [Translated evaluation](translated/report.md)", "",
             "## Instructional feature counts", "",
             "| Item | Original | Translated | Translated − original |", "| --- | ---: | ---: | ---: |"]
    for name, entries in original["instructional_features"].items():
        first = sum(entry.get("count", 1) for entry in entries)
        count = sum(entry.get("count", 1) for entry in translated["instructional_features"][name])
        lines.append(f"| {name.replace('_', ' ').title()} | {first} | {count} | {count - first:+d} |")
    lines += ["", "### Question classifications", "",
              "| Question type | Original | Translated | Translated − original |", "| --- | ---: | ---: | ---: |"]
    for question_type in ("Knowledge-checking", "Instructional"):
        first = sum(q.get("question_type") == question_type for q in original["instructional_features"]["questions"])
        second = sum(q.get("question_type") == question_type for q in translated["instructional_features"]["questions"])
        lines.append(f"| {question_type} | {first} | {second} | {second - first:+d} |")
    lines += ["", "## Ratings", "", "| Item | Original | Translated | Translated − original |", "| --- | --- | --- | --- |"]
    def label(judgment):
        return judgment.get("value", judgment["score"] if judgment.get("status") == "scored" else judgment.get("status"))
    for group in ("pedagogical_characteristics", "conversation_quality"):
        for name, first in original[group].items():
            second = translated[group][name]
            delta = f"{second['score'] - first['score']:+d}" if first.get("status") == second.get("status") == "scored" else "—"
            lines.append(f"| {name.replace('_', ' ').title()} | {label(first)} | {label(second)} | {delta} |")
    lines += ["", "## Errors", "",
              f"Confirmed error entries: original **{len(original['errors']['error'])}**; translated **{len(translated['errors']['error'])}**.", "",
              f"Cases needing verification: original **{len(original['verification_needed'])}**; translated **{len(translated['verification_needed'])}**.", "",
              "Error lists are shown separately below; entry counts do not establish whether the same underlying errors were identified.", ""]
    for variant, result in versions.items():
        lines += [f"### {variant.title()}", ""]
        if not result["errors"]["error"]:
            lines += ["No confirmed errors identified.", ""]
        for index, entry in enumerate(result["errors"]["error"], 1):
            lines += [f"{index}. **{entry['error']}** — turns: {', '.join(entry['turn_locations'])}.", "",
                      entry["explanation"], "", "Correction: " + entry["correction_status"], ""]
            lines += ["> " + line for line in entry["evidence"].splitlines()] + [""]
    (folder / "comparison.md").write_text("\n".join(lines), encoding="utf-8")


def main(argv=None, call=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inputs", nargs="+", type=Path, help="conversation.json, conversation.md with JSON sibling, or directories")
    parser.add_argument("--config", type=Path, default=HERE / "config.json")
    parser.add_argument("--model", help="Explicit OpenRouter provider/model ID")
    parser.add_argument("--translation-model", help="OpenRouter translation model; defaults to the evaluator model")
    parser.add_argument("--evaluation-mode", choices=("both", "original", "translated"), default="both",
                        help="v3 transcript versions to evaluate; English originals are evaluated once (default: both)")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--dry-run", action="store_true", help="Save all request previews without API calls")
    parser.add_argument("--resume", action="store_true", help="Reuse validated stages in an identical existing run")
    parser.add_argument("--rubric", type=Path, default=RUBRIC)
    parser.add_argument("--schema", type=Path, default=SCHEMA)
    parser.add_argument("--prompt", type=Path, default=PROMPT)
    args = parser.parse_args(argv)
    try:
        from jsonschema import Draft202012Validator
        settings = read_json(args.config)
        allowed = {"model", "max_tokens", "timeout", "http_retries", "repair_attempts", "reasoning"}
        if set(settings) != allowed:
            raise ValueError("Config must contain exactly: " + ", ".join(sorted(allowed)))
        if args.model:
            settings["model"] = args.model
        if settings["model"] is not None and (not isinstance(settings["model"], str) or "/" not in settings["model"]):
            raise ValueError("model must be an explicit provider/model ID or null for dry runs")
        for key in ("max_tokens", "timeout", "http_retries", "repair_attempts"):
            if type(settings[key]) is not int or settings[key] < (1 if key in {"max_tokens", "timeout"} else 0):
                raise ValueError(f"Invalid {key}")
        if (settings["reasoning"].get("effort") if isinstance(settings["reasoning"], dict) else settings["reasoning"]) not in {None, "none", "minimal", "low", "medium", "high"}:
            raise ValueError("Invalid reasoning setting")
        translation_settings = dict(settings)
        if args.translation_model:
            if "/" not in args.translation_model:
                raise ValueError("translation-model must be an explicit provider/model ID")
            translation_settings["model"] = args.translation_model
        translation_prompt = TRANSLATION_PROMPT.read_text(encoding="utf-8")
        if args.resume and args.output is None:
            raise ValueError("--resume requires --output")
        schema = read_json(args.schema)
        Draft202012Validator.check_schema(schema)
        rubric = args.rubric.read_text(encoding="utf-8-sig")
        prompt = args.prompt.read_text(encoding="utf-8-sig")
        sources = discover(args.inputs)
        prepared = [(p, normalize(p)) for p in sources]
        if not is_v3(schema):
            for _, conversation in prepared:
                schema_validate(conversation["metadata"], schema["properties"]["metadata"])
        if not args.dry_run and call is None:
            from dotenv import load_dotenv
            load_dotenv(ROOT / ".env")
            if not settings["model"]:
                raise ValueError("Choose --model provider/model or set model in config.json")
            if not os.environ.get("OPENROUTER_API_KEY", "").strip():
                raise ValueError("Missing OPENROUTER_API_KEY")
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        output = (args.output or HERE / "outputs" / stamp).resolve()
        fingerprint = digest(dict(version=PIPELINE_VERSION, settings=settings, rubric=rubric, schema=schema,
                                  prompt=prompt, translation_settings=translation_settings,
                                  translation_prompt=translation_prompt, evaluation_mode=args.evaluation_mode,
                                  sources=[(str(p), c) for p, c in prepared]))
        if output.exists():
            if not args.resume:
                raise ValueError("Output already exists; use a new directory or --resume")
            manifest = read_json(output / "manifest.json")
            if manifest["fingerprint"] != fingerprint:
                raise ValueError("Resume rejected: sources, settings, prompts, rubric, or schema changed")
        else:
            if args.resume:
                raise ValueError("Cannot resume a nonexistent run")
            output.mkdir(parents=True)
            save_json(output / "manifest.json", dict(fingerprint=fingerprint, settings=settings,
                      rubric_version=schema["properties"]["rubric_version"]["const"],
                      sources=[str(p) for p in sources], created_at=stamp,
                      prompt_path=str(args.prompt.resolve()), schema_path=str(args.schema.resolve()),
                      translation_model=translation_settings["model"], evaluation_mode=args.evaluation_mode))
        (output / "rubric.md").write_text(rubric, encoding="utf-8")
        save_json(output / "schema.json", schema)
        (output / "evaluator.md").write_text(prompt, encoding="utf-8")
        (output / "translator.md").write_text(translation_prompt, encoding="utf-8")
        records = []
        for source, conversation in prepared:
            slug = re.sub(r"[^A-Za-z0-9_-]", "_", conversation["conversation_id"])[:80] or "conversation"
            source_folder = output / (slug + "__" + digest(str(source))[:10])
            source_records = []
            for variant in evaluation_variants(conversation, schema, args.evaluation_mode):
                folder = source_folder / variant if is_v3(schema) else source_folder
                record = evaluate_variant(source, conversation, folder, variant, rubric, schema, prompt,
                    translation_prompt, settings, translation_settings, args.dry_run, args.resume, call or request_api)
                records.append(record)
                source_records.append(record)
                print(f"{conversation['conversation_id']} ({variant}): {record['status']} ({record['planned_calls']} planned stages)", flush=True)
                save_json(output / "run_status.json", records)
            if is_v3(schema):
                write_variant_comparison(source_folder, source_records)
        write_summary(output, records)
        print(f"Output: {output}", flush=True)
        return int(any(r["status"] == "failed" for r in records))
    except (ValueError, OSError, KeyError, TypeError, ImportError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
