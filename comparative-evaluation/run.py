"""Staged, order-checked comparative evaluation of saved tutoring conversations."""
from __future__ import annotations

import argparse
import copy
import csv
import importlib.util
import json
import os
import re
import shutil
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
spec = importlib.util.spec_from_file_location("conversation_evaluation_shared", ROOT / "conversation-evaluation/run.py")
shared = importlib.util.module_from_spec(spec)
spec.loader.exec_module(shared)
VERSION = "1"
LABELS = {
    "concepts_and_subtopics_covered": "Concepts and Subtopics Covered",
    "examples": "Examples", "analogies": "Analogies", "representations": "Representations",
    "cultural_references": "Cultural References", "questions": "Questions",
    "instructional_sequence": "Instructional Sequence", "concept_summarization": "Concept Summarization",
    "coherence": "Coherence", "information_load_appropriateness": "Information Load Appropriateness",
    "relevance": "Relevance", "real_world_connection_and_usefulness": "Real-World Connection and Usefulness",
    "appropriateness_for_the_learners_level": "Appropriateness for the Learner’s Level",
    "opportunities_to_demonstrate_understanding": "Opportunities to Demonstrate Understanding",
    "conversational_naturalness": "Conversational Naturalness", "responsiveness": "Responsiveness",
    "positivity_of_tone": "Positivity of Tone", "error": "Error",
}
GROUPS = {
    "pedagogical_characteristics": list(LABELS)[7:14],
    "conversation_quality": list(LABELS)[14:17],
}
VARIANTS = ("english_original", "non_english_original", "reviewed_english")
OUTCOMES = ("A", "B", "tie", "not_applicable", "insufficient_evidence")


def english(conversation):
    return str(conversation["metadata"]["native_language"] or "").strip().casefold() in {"english", "en", "en-us", "en-gb"}


def input_record(path):
    path = Path(path).resolve()
    raw = shared.read_json(path)
    models = raw.get("configuration", {}).get("models", {})
    model_key = tuple(models.get(role, {}).get("model") for role in ("tutor", "student"))
    return dict(path=path, conversation=shared.normalize(path), model_key=model_key,
                source_hash=shared.digest(raw))


def pair_record(first, second):
    if not english(first["conversation"]) or english(second["conversation"]):
        raise ValueError("Each pair requires an English original and a non-English original")
    if not second["conversation"]["metadata"]["native_language"]:
        raise ValueError("The non-English conversation needs an explicit source language")
    topic = first["conversation"]["topic_id"] or first["conversation"]["learning_topic"] or "pair"
    slug = re.sub(r"[^A-Za-z0-9_-]", "_", str(topic))[:65] or "pair"
    suffix = shared.digest([str(first["path"]), str(second["path"])])[:10]
    return dict(pair_id=f"{slug}__{suffix}", english=first, non_english=second)


def discover_pairs(inputs, pairs_file=None):
    if pairs_file:
        raw = shared.read_json(pairs_file)
        entries = raw.get("pairs") if isinstance(raw, dict) else raw
        if not isinstance(entries, list) or not entries:
            raise ValueError("Pairs manifest must contain a nonempty pairs array")
        base = Path(pairs_file).resolve().parent
        pairs = [pair_record(input_record(base / entry["english"]),
                             input_record(base / entry["non_english"])) for entry in entries]
    else:
        if not inputs:
            raise ValueError("Supply input transcripts/directories or --pairs")
        groups = {}
        for path in shared.discover(inputs):
            record = input_record(path)
            topic = record["conversation"]["topic_id"]
            if not topic:
                raise ValueError(f"Missing topic_id in {path}; provide --pairs for explicit matching")
            groups.setdefault((topic, record["model_key"]), []).append(record)
        pairs = []
        for records in groups.values():
            originals = [r for r in records if english(r["conversation"])]
            others = [r for r in records if not english(r["conversation"])]
            languages = [str(r["conversation"]["metadata"]["native_language"]).casefold() for r in others]
            if len(originals) != 1 or not others or len(languages) != len(set(languages)):
                raise ValueError("Ambiguous or unmatched topic/model group; provide --pairs instead of guessing")
            pairs.extend(pair_record(originals[0], other) for other in others)
    if len({p["pair_id"] for p in pairs}) != len(pairs):
        raise ValueError("Duplicate pairs in input")
    return pairs


def rubric_blocks(guide):
    """Keep descriptions and coding guidance verbatim, apart from HTML breaks."""
    result = {}
    reverse = {label: key for key, label in LABELS.items()}
    for line in guide.splitlines():
        if not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.split("|")[1:-1]]
        if cells and cells[0] in reverse:
            if len(cells) != 5:
                raise ValueError(f"Expected five rubric cells for {cells[0]}")
            key = reverse[cells[0]]
            result[key] = f"#### {cells[0]}\n\n{cells[1]}\n\n**Guidance**\n\n" + cells[4].replace("<br><br>", "\n\n").replace("<br>", "\n")
    if set(result) != set(LABELS):
        raise ValueError("Coding guidebook item labels differ from supported rubric")
    return result


def extraction_schema(base):
    keys = ("rubric_version", "conversation_id", "learning_topic", "instructional_features",
            "pedagogical_characteristics", "errors", "verification_needed", "limitations")
    properties = {k: copy.deepcopy(base["properties"][k]) for k in keys}
    properties["pedagogical_characteristics"] = shared.object_schema({
        "instructional_sequence": copy.deepcopy(base["properties"]["pedagogical_characteristics"]["properties"]["instructional_sequence"])})
    return {"$schema": base["$schema"], **shared.object_schema(properties),
            "$defs": {"evidence": copy.deepcopy(base["$defs"]["evidence"])}}


def comparison_schema(items, base):
    evidence = copy.deepcopy(base["$defs"]["evidence"])
    evidence["properties"].update(conversation={"type": "string", "enum": ["A", "B"]},
                                   version={"type": "string", "enum": ["original", "reviewed_english"]})
    evidence["required"] += ["conversation", "version"]
    judgment = shared.object_schema({"outcome": {"type": "string", "enum": list(OUTCOMES)},
        "reason": {"type": "string", "minLength": 1},
        "evidence": {"type": "array", "items": evidence}})
    return shared.object_schema({"items": shared.object_schema({key: copy.deepcopy(judgment) for key in items}),
                                  "limitations": {"type": "array", "items": {"type": "string"}}})


def resources(rubric_path=shared.RUBRIC):
    guide = Path(rubric_path).read_text(encoding="utf-8")
    blocks = rubric_blocks(guide)
    base = shared.read_json(shared.SCHEMA)
    prompts = {name: (HERE / "prompts" / f"{name}.md").read_text(encoding="utf-8")
               for name in ("translation-review", "extraction", "comparison", "comparison-english-only")}
    prompts["translation"] = shared.TRANSLATION_PROMPT.read_text(encoding="utf-8") + (
        "\n\nPreserve source errors, contradictions, omissions, repetition, tone, Markdown, numbers, "
        "formulas, and mathematical expressions exactly. Do not improve the teaching or add questions.")
    prompts["extraction"] += "\n\n## Coding rubric\n\n" + "\n\n".join(
        blocks[k] for k in list(LABELS)[:7] + ["error"])
    for group, items in GROUPS.items():
        prompts[group] = prompts["comparison"] + "\n\n## Coding rubric\n\n" + "\n\n".join(blocks[k] for k in items)
        prompts[group + "_english_only"] = prompts["comparison-english-only"] + "\n\n## Coding rubric\n\n" + "\n\n".join(blocks[k] for k in items)
    schemas = {"extraction": extraction_schema(base)}
    schemas.update({group: comparison_schema(items, base) for group, items in GROUPS.items()})
    return dict(guide=guide, base=base, prompts=prompts, schemas=schemas)


def task(name, stage, data, schema, prompt):
    data = dict(stage=stage, **data)
    return dict(name=name, data=data, schema=schema, messages=[
        {"role": "system", "content": prompt},
        {"role": "user", "content": json.dumps(data, ensure_ascii=False)}])


def review_task(original, draft, res):
    schema = copy.deepcopy(original["schema"])
    schema["properties"]["changes"] = {"type": "array", "items": shared.object_schema({
        "segment_id": {"type": "string"}, "reason": {"type": "string", "minLength": 1}})}
    schema["required"].append("changes")
    return task("translation_review", "translation_review", dict(
        source_language=original["data"]["source_language"], target_language="English",
        segments=[dict(id=s["id"], text=s["text"], draft_english=d["text"])
                  for s, d in zip(original["data"]["segments"], draft["segments"])]),
        schema, res["prompts"]["translation-review"])


def context(conversation, identity=False):
    # The supplied tutor context is visible to the tutor; hidden simulator student instructions stay out.
    result = dict(learning_topic=conversation["learning_topic"], topic_id=conversation["topic_id"],
        language=conversation["metadata"]["native_language"], learner_context=conversation["learner_context"],
        tutor_context=conversation["tutor_context"], messages=conversation["messages"],
        metadata={k: conversation["metadata"][k] for k in ("learner_level", "learning_objective", "reference_concepts")},
        source_limitations=conversation["limitations"])
    if identity:
        result["conversation_id"] = conversation["conversation_id"]
    return result


def extraction_task(conversation, variant, res):
    data = context(conversation, identity=True)
    data["rubric_version"] = res["base"]["properties"]["rubric_version"]["const"]
    data["evaluation_variant"] = variant
    return task("extract_" + variant, "extraction", data, res["schemas"]["extraction"], res["prompts"]["extraction"])


def judge_task(first, second, reviewed, group, reverse, res, comparison_mode="originals"):
    candidates = [dict(original=context(first)),
        dict(original=context(second), reviewed_english=context(reviewed)) if comparison_mode == "originals"
        else dict(reviewed_english=context(reviewed))]
    if reverse:
        candidates.reverse()
    return task(f"{group}_{'BA' if reverse else 'AB'}", "comparison",
        dict(group=group, candidates=dict(zip(("A", "B"), candidates))),
        res["schemas"][group], res["prompts"][group + ("_english_only" if comparison_mode == "english-only" else "")])


def validate(value, stage_task):
    shared.schema_validate(value, stage_task["schema"])
    stage = stage_task["data"]["stage"]
    if stage in {"translation", "translation_review"}:
        shared.validate_translation(value, stage_task)
        # The shared validator handles numbers and bracketed LaTeX. Also preserve
        # repeated expressions and dollar-delimited mathematics in both stages.
        math_pattern = r"\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$|(?<!\\)\$(?!\$)[^\n$]*?(?<!\\)\$"
        for source, translated in zip(stage_task["data"]["segments"], value["segments"]):
            if Counter(re.findall(math_pattern, source["text"])) != Counter(re.findall(math_pattern, translated["text"])):
                raise ValueError(f"{source['id']}: preserve every mathematical expression exactly")
        if stage == "translation_review":
            changed = {s["id"] for s, v in zip(stage_task["data"]["segments"], value["segments"])
                       if s["draft_english"] != v["text"]}
            recorded = [change["segment_id"] for change in value["changes"]]
            if len(recorded) != len(set(recorded)) or set(recorded) != changed:
                raise ValueError("Review changes must identify exactly the changed segments, without duplicates")
    elif stage == "extraction":
        # Project into the existing v3 validator without requesting any ordinal ratings.
        projected = dict(value, conversation_quality={})
        validation_task = copy.deepcopy(stage_task)
        validation_task["schema"]["properties"]["conversation_quality"] = shared.object_schema({})
        validation_task["schema"]["required"].append("conversation_quality")
        shared.validate_v3(projected, validation_task)
    else:
        problems = []
        for key, item in value["items"].items():
            for evidence in item["evidence"]:
                candidate = stage_task["data"]["candidates"][evidence["conversation"]]
                if evidence["version"] not in candidate:
                    problems.append(f"{key}: Evidence references an unavailable transcript version")
                    continue
                try:
                    shared.validate_evidence(evidence, candidate[evidence["version"]]["messages"])
                except ValueError as exc:
                    problems.append(f"{key}: {exc}")
        if problems:
            raise ValueError("\n".join(problems))


def execute(stage_task, folder, settings, call=shared.request_api, resume=False, dry_run=False, reuse_folder=None):
    destination = folder / stage_task["name"]
    destination.mkdir(parents=True, exist_ok=True)
    fingerprint = shared.digest(dict(version=VERSION, task=stage_task, settings=settings))
    metadata_path, result_path = destination / "stage.json", destination / "validated.json"
    # Only upstream stages may be borrowed. Comparative judgments must be sampled
    # independently with the selected transcript versions and presentation order.
    if reuse_folder and stage_task["data"]["stage"] != "comparison" and not result_path.exists():
        donor = Path(reuse_folder) / stage_task["name"]
        if (donor / "stage.json").exists() and (donor / "validated.json").exists():
            if shared.read_json(donor / "stage.json")["fingerprint"] == fingerprint:
                value = shared.read_json(donor / "validated.json")
                try:
                    validate(value, stage_task)
                except (ValueError, KeyError, TypeError):
                    pass
                else:
                    shutil.copytree(donor, destination, dirs_exist_ok=True)
                    shared.save_json(destination / "reused_from.json", dict(path=str(donor.resolve()), fingerprint=fingerprint))
                    print(f"Reusing {stage_task['name']}...", flush=True)
                    return value
    same_stage = metadata_path.exists() and shared.read_json(metadata_path)["fingerprint"] == fingerprint
    if resume and result_path.exists() and metadata_path.exists():
        if shared.read_json(metadata_path)["fingerprint"] == fingerprint:
            try:
                value = shared.read_json(result_path)
                validate(value, stage_task)
            except (ValueError, KeyError, TypeError):
                pass
            else:
                return value
    request_settings = dict(settings, response_format=shared.response_format(stage_task["schema"]))
    shared.save_json(destination / "schema.json", stage_task["schema"])
    shared.save_json(destination / "input.json", stage_task["data"])
    (destination / "system.md").write_text(stage_task["messages"][0]["content"], encoding="utf-8")
    shared.save_json(destination / "preview.json", dict(messages=stage_task["messages"], settings=request_settings))
    if dry_run:
        return None
    if result_path.exists():
        suffix = len(list(destination.glob("rejected_cache_*.json"))) + 1
        result_path.replace(destination / f"rejected_cache_{suffix:02d}.json")
    shared.save_json(metadata_path, dict(fingerprint=fingerprint))
    existing = list(destination.glob("attempt_*.json"))
    offset = max((int(p.stem.split("_")[1]) for p in existing), default=0)
    messages = copy.deepcopy(stage_task["messages"])
    # A rejected request may have exhausted its repairs. Resume with the latest
    # proposal and current validation feedback, not the original failing request.
    if resume and same_stage and existing:
        latest = shared.read_json(max(existing, key=lambda p: int(p.stem.split("_")[1])))
        previous_text = latest["response"]["text"]
        try:
            validate(json.loads(previous_text), stage_task)
        except (ValueError, KeyError, TypeError) as exc:
            messages += [{"role": "assistant", "content": previous_text},
                         {"role": "user", "content": "Return a complete corrected JSON result. Validation error: " + str(exc)}]
    print(f"Running {folder.name}/{stage_task['name']}...", flush=True)
    for attempt in range(settings["repair_attempts"] + 1):
        shared.save_json(destination / "request.json", dict(messages=messages, settings=request_settings))
        response = call(messages, request_settings)
        response["text"] = response["text"].replace(os.environ.get("OPENROUTER_API_KEY") or "\0", "[REDACTED]")
        shared.save_json(destination / f"attempt_{offset + attempt + 1:02d}.json", dict(response=response, messages=messages))
        try:
            value = json.loads(response["text"])
            validate(value, stage_task)
        except (ValueError, KeyError, TypeError) as exc:
            shared.save_json(destination / "validation_error.json", dict(error=str(exc)))
            if attempt == settings["repair_attempts"]:
                raise ValueError(f"{stage_task['name']}: {exc}") from exc
            messages = copy.deepcopy(stage_task["messages"]) + [
                {"role": "assistant", "content": response["text"]},
                {"role": "user", "content": "Return a complete corrected JSON result. Validation error: " + str(exc)}]
        else:
            shared.save_json(result_path, value)
            for name in ("validation_error.json", "failure.json"):
                (destination / name).unlink(missing_ok=True)
            return value


def publish_translation(record, translation, stage_task, settings, reviewed=False):
    """Protect generated JSON and Markdown against overwriting manual edits."""
    source = record["path"]
    name = source.stem + ".comparative.english" + ("" if reviewed else ".draft")
    path = source.with_name(name + ".json")
    conversation = shared.translated_conversation(record["conversation"], stage_task, translation)
    provenance = dict(source_path=str(source), source_hash=record["source_hash"], reviewed=reviewed,
        model=settings["model"], fingerprint=shared.digest(dict(task=stage_task, settings=settings)),
        segments=translation["segments"], changes=translation.get("changes", []))
    payload_hash = shared.digest(conversation)
    lines = [f"# {'Reviewed' if reviewed else 'Draft'} English translation", "",
             "Source claims and errors are preserved.", ""]
    for message in conversation["messages"]:
        lines += [f"## {message['turn_id']} — {message['speaker']}", "", message["text"], ""]
    markdown = "\n".join(lines)
    markdown_path = path.with_suffix(".md")
    if path.exists():
        old = shared.read_json(path)
        old_meta = old.get("translation", {})
        old_payload = {k: v for k, v in old.items() if k != "translation"}
        if old_meta.get("source_path") != str(source) or old_meta.get("payload_hash") != shared.digest(old_payload):
            raise ValueError(f"Preserving modified or unrelated translation: {path}")
        if markdown_path.exists() and old_meta.get("markdown_hash") != shared.digest(markdown_path.read_text(encoding="utf-8")):
            raise ValueError(f"Preserving manually modified translation: {markdown_path}")
    elif markdown_path.exists():
        raise ValueError(f"Preserving unrelated Markdown translation: {markdown_path}")
    conversation["translation"] = dict(provenance, payload_hash=payload_hash, markdown_hash=shared.digest(markdown))
    shared.save_json(path, conversation)
    markdown_path.write_text(markdown, encoding="utf-8")
    return conversation


def normalize_outcome(judgment, mapping):
    outcome = judgment["outcome"]
    return mapping[outcome] if outcome in {"A", "B"} else outcome


def consolidate(group, orders, identities):
    mapping = {"AB": dict(zip(("A", "B"), identities)), "BA": dict(zip(("A", "B"), reversed(identities)))}
    result = {}
    for key in GROUPS[group]:
        observations = {order: dict(judgment=value["items"][key], mapping=mapping[order], limitations=value["limitations"],
            normalized_outcome=normalize_outcome(value["items"][key], mapping[order]))
            for order, value in orders.items() if value is not None}
        if len(observations) != 2:
            outcome, status = None, "missing"
        else:
            first, second = (observations[o]["normalized_outcome"] for o in ("AB", "BA"))
            outcome, status = (first, "agreed") if first == second else (None, "order_disagreement")
        result[key] = dict(outcome=outcome, order_agreement=status, orders=observations)
    return result


def metrics(value):
    if value is None:
        return None
    features = value["instructional_features"]
    return dict(feature_counts={k: len(v) for k, v in features.items()},
        question_types={kind: sum(q["question_type"] == kind for q in features["questions"])
                        for kind in ("Knowledge-checking", "Instructional")},
        detail_levels={k: {level: sum(e["detail_level"] == level for e in features[k])
                          for level in ("Brief", "Explained", "Elaborated")}
                       for k in ("concepts_and_subtopics_covered", "examples", "analogies", "cultural_references")},
        representation_types=dict(Counter(e["representation_type"] for e in features["representations"])),
        errors=len(value["errors"]["error"]), verification_needed=len(value["verification_needed"]))


def pair_manifest(pair):
    return dict(pair_id=pair["pair_id"], **{side: dict(path=str(pair[side]["path"]),
        source_hash=pair[side]["source_hash"], conversation_id=pair[side]["conversation"]["conversation_id"],
        language=pair[side]["conversation"]["metadata"]["native_language"], model_key=pair[side]["model_key"])
        for side in ("english", "non_english")})


def evaluate_pair(pair, folder, res, settings, call=shared.request_api, resume=False, dry_run=False,
                  comparison_mode="originals", reuse_root=None):
    folder.mkdir(parents=True, exist_ok=True)
    first, second = (pair[side]["conversation"] for side in ("english", "non_english"))
    # Side keys also disambiguate duplicate conversation_id values in explicitly paired inputs.
    identities = ("english_original", "reviewed_english" if comparison_mode == "english-only" else "non_english_original")
    shared.save_json(folder / "pair.json", pair_manifest(pair))
    shared.save_json(folder / "sources.json", dict(english_original=first, non_english_original=second))
    outcomes, failures = {}, {}

    def stage(stage_task, kind):
        name = stage_task["name"]
        try:
            outcomes[name] = execute(stage_task, folder, settings[kind], call, resume, dry_run,
                                     Path(reuse_root) / pair["pair_id"] if reuse_root else None)
        except (ValueError, RuntimeError, OSError, KeyError, TypeError) as exc:
            failures[name] = str(exc)
            shared.save_json(folder / name / "failure.json", dict(error=str(exc)))
            outcomes[name] = None
        return outcomes[name]

    translation = shared.translation_task(second, res["prompts"]["translation"])
    draft = stage(translation, "translation")
    reviewed = None
    if draft is not None:
        try:
            if not dry_run:
                publish_translation(pair["non_english"], draft, translation, settings["translation"])
            review = review_task(translation, draft, res)
            reviewed_value = stage(review, "review")
            if reviewed_value is not None:
                reviewed = shared.translated_conversation(second, translation, reviewed_value)
                if not dry_run:
                    # The paths used to reconstruct the transcript belong to the translation task.
                    reviewed = publish_translation(pair["non_english"], reviewed_value,
                        dict(translation, messages=review["messages"], schema=review["schema"]), settings["review"], True)
                shared.save_json(folder / "reviewed-source.json", reviewed)
        except (ValueError, OSError, KeyError, TypeError) as exc:
            failures["translation_artifacts"] = str(exc)
            reviewed = None

    extractions = {}
    for variant, conversation in zip(VARIANTS, (first, second, reviewed)):
        extractions[variant] = stage(extraction_task(conversation, variant, res), "extraction") if conversation else None
    judgments = {}
    for group in GROUPS:
        orders = {}
        for order, reverse in (("AB", False), ("BA", True)):
            orders[order] = stage(judge_task(first, second, reviewed, group, reverse, res, comparison_mode), "judge") if reviewed else None
        judgments[group] = consolidate(group, orders, identities)

    pending = ["translation_review", "extract_reviewed_english"] + [f"{g}_{o}" for g in GROUPS for o in ("AB", "BA")]
    if reviewed is not None:
        pending = []
    status = "preview" if dry_run else "complete" if reviewed is not None and not failures else "incomplete"
    result = dict(pipeline_version=VERSION, pair=pair_manifest(pair), comparison_mode=comparison_mode, status=status, failures=failures,
        awaiting_translation_or_review=pending, extractions=extractions,
        metrics={variant: metrics(value) for variant, value in extractions.items()}, comparisons=judgments,
        order_mappings={"AB": dict(zip(("A", "B"), identities)), "BA": dict(zip(("A", "B"), reversed(identities)))})
    shared.save_json(folder / "result.json", result)
    write_report(folder, result)
    return result


def display(value):
    return "missing" if value is None else str(value)


def write_report(folder, result):
    english_only = result.get("comparison_mode") == "english-only"
    variants = ("english_original", "reviewed_english") if english_only else VARIANTS
    columns = ["English original", "Reviewed English"] if english_only else ["English original", "Non-English original", "Reviewed English"]
    def header(label, differences=False):
        names = [label] + columns
        if differences:
            names += ["Reviewed minus English"] if english_only else ["Non-English minus English", "Reviewed minus non-English"]
        return ["| " + " | ".join(names) + " |", "| --- | " + " | ".join("---:" for _ in names[1:]) + " |"]
    lines = ["# Comparative evaluation", "", f"Status: **{result['status']}**.", "",
        ("The original English conversation is compared with the reviewed English translation. Only English texts reach the judge; wording and tone judgments for the translation depend on fidelity. " if english_only else
         "English and non-English originals are compared using a reviewed English translation as support. ") +
        "Extraction is independent for all three versions and is excluded from judge inputs. "
        "Each quality group is judged in both presentation orders; disagreement is not treated as a tie.", "",
        "## Instructional feature counts", ""] + header("Item", True)
    def row(label, accessor, differences=False):
        values = [accessor(result["metrics"][v]) if result["metrics"][v] is not None else None for v in variants]
        if differences:
            deltas = [None if a is None or b is None else b - a for a, b in zip(values, values[1:])]
            values += deltas
        return "| " + label + " | " + " | ".join(display(v) for v in values) + " |"
    for key in list(LABELS)[:6]:
        lines.append(row(LABELS[key], lambda m, k=key: m["feature_counts"][k], True))
    for kind in ("Knowledge-checking", "Instructional"):
        lines.append(row("Questions: " + kind, lambda m, k=kind: m["question_types"][k], True))
    lines += ["", "Counts describe observed entries, not teaching quality. Reviewed English is a translation of the non-English original, not another generated conversation.", "",
        "## Detail levels", ""] + header("Item and level")
    for key in ("concepts_and_subtopics_covered", "examples", "analogies", "cultural_references"):
        for level in ("Brief", "Explained", "Elaborated"):
            lines.append(row(f"{LABELS[key]}: {level}", lambda m, k=key, l=level: m["detail_levels"][k][l]))
    kinds = sorted({k for m in result["metrics"].values() if m for k in m["representation_types"]})
    lines += ["", "## Representation types", ""] + header("Type")
    for kind in kinds:
        lines.append(row(kind, lambda m, k=kind: m["representation_types"].get(k, 0)))
    lines += ["", "## Instructional Sequence", ""]
    for variant, extraction in result["extractions"].items():
        if variant not in variants:
            continue
        sequence = extraction["pedagogical_characteristics"]["instructional_sequence"] if extraction else None
        lines += [f"- {variant}: {sequence['value'] if sequence else 'missing'}" + (f". {sequence['reason']}" if sequence else "")]
    for group, items in result["comparisons"].items():
        lines += ["", "## " + group.replace("_", " ").title(), "", "| Item | Outcome | Order agreement |", "| --- | --- | --- |"]
        for key, item in items.items():
            lines.append(f"| {LABELS[key]} | {display(item['outcome'])} | {item['order_agreement']} |")
        for key, item in items.items():
            lines += ["", "### " + LABELS[key], ""]
            for order, observation in item["orders"].items():
                judgment = observation["judgment"]
                lines += [f"**{order}: {observation['normalized_outcome']}** — {judgment['reason']}", ""]
                for evidence in judgment["evidence"]:
                    side = observation["mapping"][evidence["conversation"]]
                    lines += [f"{side}; {evidence['version']}; {evidence['turn_id']}; occurrence {evidence['occurrence']}.", "",
                              "> " + evidence["quote"].replace("\n", "\n> "), ""]
    lines += ["", "## Errors and verification", ""] + header("Measure", True) + [
        row("Confirmed errors", lambda m: m["errors"], True), row("Verification needed", lambda m: m["verification_needed"], True), "",
        "Errors are not merged across versions. Equal counts need not mean equal instructional impact; an empty list does not prove correctness.", ""]
    for variant, extraction in result["extractions"].items():
        if variant not in variants:
            continue
        lines += ["### " + variant, ""]
        if extraction is None:
            lines += ["Extraction missing.", ""]
            continue
        for error in extraction["errors"]["error"]:
            lines += [f"**{error['error']}** ({', '.join(error['turn_locations'])}; {error['correction_status']})", "",
                      "> " + error["evidence"].replace("\n", "\n> "), "", error["explanation"], ""]
        for case in extraction["verification_needed"]:
            lines += [f"Verification: {case['issue']} — {case['reason']}", ""]
            for evidence in case["evidence"]:
                lines += [f"{evidence['turn_id']}: {evidence['quote']}", ""]
        for limitation in extraction["limitations"]:
            lines += ["- " + limitation]
    lines += ["", "## Limitations and failures", "",
        "The original conversations are distinct dialogues. Findings describe this pair and do not isolate an effect of language. "
        "Schema, evidence, and punctuation checks do not establish semantic correctness. No external factual retrieval is performed.", ""]
    for name, error in result["failures"].items():
        lines += [f"- {name}: {error}"]
    for name in result["awaiting_translation_or_review"]:
        lines += [f"- {name}: awaiting translation or review."]
    for group, items in result["comparisons"].items():
        for order, observation in next(iter(items.values()))["orders"].items():
            for limitation in observation["limitations"]:
                lines += [f"- {group} {order}: {limitation}"]
    lines += ["", "[Structured results](result.json) contain all extraction entries and both judging orders.", ""]
    (folder / "comparison.md").write_text("\n".join(lines), encoding="utf-8")


def write_csv(output, results):
    features, comparisons, differences = [], [], []
    for result in results:
        pair_id = result["pair"]["pair_id"]
        for variant, m in result["metrics"].items():
            available = "complete" if m is not None else "missing"
            measures = [(k, None if m is None else m["feature_counts"][k]) for k in list(LABELS)[:6]]
            measures += [("questions:" + kind, None if m is None else m["question_types"][kind]) for kind in ("Knowledge-checking", "Instructional")]
            measures += [(key, None if m is None else m[key]) for key in ("errors", "verification_needed")]
            for key in ("concepts_and_subtopics_covered", "examples", "analogies", "cultural_references"):
                measures += [(key + ":" + level, None if m is None else m["detail_levels"][key][level]) for level in ("Brief", "Explained", "Elaborated")]
            kinds = sorted({kind for other in result["metrics"].values() if other for kind in other["representation_types"]})
            measures += [("representations:" + kind, None if m is None else m["representation_types"].get(kind, 0)) for kind in kinds]
            features.extend(dict(pair_id=pair_id, variant=variant, status=available, measure=key, count=value) for key, value in measures)
        for group, items in result["comparisons"].items():
            for key, item in items.items():
                comparisons.append(dict(pair_id=pair_id, group=group, item=key, outcome=item["outcome"],
                    order_agreement=item["order_agreement"],
                    AB=item["orders"].get("AB", {}).get("normalized_outcome"),
                    BA=item["orders"].get("BA", {}).get("normalized_outcome")))
        measures = {variant: {row["measure"]: row["count"] for row in features
                             if row["pair_id"] == pair_id and row["variant"] == variant} for variant in VARIANTS}
        for measure in measures["english_original"]:
            a, b, c = (measures[v][measure] for v in VARIANTS)
            differences.append(dict(pair_id=pair_id, measure=measure,
                non_english_minus_english=None if a is None or b is None else b - a,
                reviewed_minus_non_english=None if b is None or c is None else c - b,
                reviewed_minus_english=None if a is None or c is None else c - a))
    for name, rows, fields in (("features.csv", features, ("pair_id", "variant", "status", "measure", "count")),
        ("comparisons.csv", comparisons, ("pair_id", "group", "item", "outcome", "order_agreement", "AB", "BA")),
        ("differences.csv", differences, ("pair_id", "measure", "non_english_minus_english", "reviewed_minus_non_english", "reviewed_minus_english"))):
        with (output / name).open("w", encoding="utf-8-sig", newline="") as stream:
            writer = csv.DictWriter(stream, fieldnames=fields)
            writer.writeheader()
            writer.writerows(rows)


def main(argv=None, call=shared.request_api):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inputs", nargs="*", type=Path)
    parser.add_argument("--pairs", type=Path, help="Explicit pairs JSON; paths relative to manifest")
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--config", type=Path, default=HERE / "config.json")
    parser.add_argument("--rubric", type=Path, default=shared.RUBRIC)
    parser.add_argument("--comparison-mode", choices=("originals", "english-only"), default="originals")
    parser.add_argument("--reuse-from", type=Path, help="Reuse matching validated translation/review/extraction stages from an earlier run")
    parser.add_argument("--model", help="Default OpenRouter model for all stages")
    for stage in ("translation", "review", "extraction", "judge"):
        parser.add_argument(f"--{stage}-model")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--resume", action="store_true")
    args = parser.parse_args(argv)
    try:
        from dotenv import load_dotenv
        load_dotenv(ROOT / ".env")
        pairs = discover_pairs(args.inputs, args.pairs)
        res = resources(args.rubric)
        base = shared.read_json(args.config)
        if args.model:
            base["model"] = args.model
        settings = {stage: dict(base, model=getattr(args, stage + "_model") or base["model"])
                    for stage in ("translation", "review", "extraction", "judge")}
        output = args.output.resolve()
        if args.reuse_from and (not (args.reuse_from / "manifest.json").exists() or args.reuse_from.resolve() == output):
            raise ValueError("--reuse-from requires a different existing comparative output directory")
        if output.exists() and any(output.iterdir()) and not args.resume:
            raise ValueError("Output directory already contains files; use --resume or a new --output")
        if args.resume and output.exists() and any(output.iterdir()) and not (output / "manifest.json").exists():
            raise ValueError("Cannot resume an output directory without its manifest")
        output.mkdir(parents=True, exist_ok=True)
        manifest = dict(pipeline="comparative-evaluation", pipeline_version=VERSION,
            created_at=datetime.now(timezone.utc).isoformat(), settings=settings,
            pairs=[pair_manifest(p) for p in pairs], planned_calls_per_pair=9, dry_run=args.dry_run,
            comparison_mode=args.comparison_mode, reuse_from=str(args.reuse_from.resolve()) if args.reuse_from else None,
            fingerprint=shared.digest(dict(settings=settings, resources=res, comparison_mode=args.comparison_mode, pairs=[pair_manifest(p) for p in pairs])))
        if (output / "manifest.json").exists():
            old = shared.read_json(output / "manifest.json")
            if old.get("comparison_mode", "originals") != args.comparison_mode:
                raise ValueError("Use a separate output directory for a different comparison mode")
            if old.get("pipeline") != "comparative-evaluation" or old.get("pairs") != manifest["pairs"]:
                # Sources may change, but membership and pairing must not silently change on resume.
                old_paths = [(p["english"]["path"], p["non_english"]["path"]) for p in old.get("pairs", [])]
                new_paths = [(p["english"]["path"], p["non_english"]["path"]) for p in manifest["pairs"]]
                if old.get("pipeline") != "comparative-evaluation" or old_paths != new_paths:
                    raise ValueError("Resume requires the same input pair paths; use a new output for changed pairing")
            history = output / "manifest-history"
            shared.save_json(history / (datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ") + ".json"), old)
        shared.save_json(output / "manifest.json", manifest)
        (output / "rubric.md").write_text(res["guide"], encoding="utf-8")
        for name, prompt in res["prompts"].items():
            destination = output / "prompts" / (name + ".md")
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(prompt, encoding="utf-8")
        for name, schema in res["schemas"].items():
            shared.save_json(output / "schemas" / (name + ".json"), schema)
        results = []
        for pair in pairs:
            result = evaluate_pair(pair, output / pair["pair_id"], res, settings, call, args.resume, args.dry_run,
                                   args.comparison_mode, args.reuse_from)
            results.append(result)
            shared.save_json(output / "run_status.json", {r["pair"]["pair_id"]: dict(status=r["status"], failures=r["failures"]) for r in results})
            write_csv(output, results)
        lines = ["# Comparative evaluation run", "", "| Pair | Status | Report |", "| --- | --- | --- |"]
        lines += [f"| {r['pair']['pair_id']} | {r['status']} | [Comparison]({r['pair']['pair_id']}/comparison.md) |" for r in results]
        (output / "report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Saved comparative evaluation to {output}")
        return 1 if any(r["failures"] for r in results) else 0
    except (ValueError, RuntimeError, OSError, KeyError, TypeError) as exc:
        print(str(exc), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
