"""Load the JSON catalogs in `data/` and resolve run-set items into runnable sessions. """
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from tutoring_check.teachtune.agents import TeacherPrompt
from tutoring_check.teachtune.config import SessionConfig

_DATA_DIR = Path(__file__).resolve().parents[3] / "data"


@dataclass
class Catalogs:
    languages: dict[str, dict]          # id -> {name}
    models: dict[str, dict]             # id -> {litellm_model, ...}
    topics_ci: dict[str, dict]          # context-independent topic id -> topic
    topics_cd: dict[str, dict]          # context-dependent  topic id -> domain
    regions: dict[str, dict]            # region id -> {name, language_id}
    knowledge_packs: dict[str, dict]    # pack id -> {knowledge_components, ...}
    profiles: dict[str, dict]           # profile id -> {student_name, trait scores}


@dataclass
class ResolvedRun:
    item_id: str
    config: SessionConfig
    teacher_model: str                  # litellm model string
    student_model: str
    teacher_prompt: TeacherPrompt
    repeats: int


def _index(rows: list[dict], key: str = "id") -> dict[str, dict]:
    return {row[key]: row for row in rows}


def load_catalogs(data_dir: Path | None = None) -> Catalogs:
    data_dir = data_dir or _DATA_DIR

    def _read(name: str, root_key: str) -> list[dict]:
        return json.loads((data_dir / name).read_text())[root_key]

    return Catalogs(
        languages=_index(_read("languages.json", "languages")),
        models=_index(_read("models.json", "models")),
        topics_ci=_index(_read("topics_ci.json", "topics")),
        topics_cd=_index(_read("topics_cd.json", "topics")),
        regions=_index(_read("regions.json", "regions")),
        knowledge_packs=_index(_read("cultural_knowledge.json", "knowledge_packs")),
        profiles=_index(_read("profiles.json", "profiles")),
    )


def _lookup(table: dict[str, dict], key: str, label: str) -> dict:
    try:
        return table[key]
    except KeyError:
        raise KeyError(f"unknown {label} {key!r}; known: {sorted(table)}") from None


def _language_name(cat: Catalogs, language_id: str) -> str:
    return _lookup(cat.languages, language_id, "language_id")["name"]


def _model_litellm(cat: Catalogs, model_id: str) -> str:
    return _lookup(cat.models, model_id, "model id")["litellm_model"]


def _profile_fields(item: dict, cat: Catalogs) -> dict:
    """Student-psychology fields from an optional student_profile_id, otherwise defaults."""
    profile_id = item.get("student_profile_id")
    if not profile_id:
        return {}
    profile = _lookup(cat.profiles, profile_id, "student_profile_id")
    return {
        "student_name": profile.get("student_name", "Student"),
        "academic_self_efficacy": profile.get("academic_self_efficacy", 3),
        "intrinsic_motivation": profile.get("intrinsic_motivation", 3),
        "academic_stress": profile.get("academic_stress", 3),
        "goal_commitment": profile.get("goal_commitment", 3),
    }


def build_session_config(item: dict, cat: Catalogs) -> SessionConfig:
    """Assemble a SessionConfig from one run-set item."""
    topic_type = item["topic_type"]
    profile_fields = _profile_fields(item, cat)

    if topic_type == "context_independent":
        topic = _lookup(cat.topics_ci, item["topic_id"], "context-independent topic_id")
        sets = {s["id"]: s for s in topic.get("misconception_sets", [])}
        set_id = item["misconception_set_id"]
        if set_id not in sets:
            raise KeyError(
                f"topic {item['topic_id']!r} has no misconception_set {set_id!r}; known: {sorted(sets)}"
            )
        return SessionConfig(
            topic=topic["topic"],
            instruction=topic["instruction"],
            knowledge_components=dict(topic["knowledge_components"]),
            misconceptions=dict(sets[set_id]["misconceptions"]),
            num_turns=item.get("num_turns", 8),
            language=_language_name(cat, item["language_id"]),
            region="",
            context_dependent=False,
            **profile_fields,
        )

    if topic_type == "context_dependent":
        domain = _lookup(cat.topics_cd, item["topic_id"], "context-dependent topic_id")
        pack = _lookup(cat.knowledge_packs, item["knowledge_pack_id"], "knowledge_pack_id")
        region = _lookup(cat.regions, pack["region_id"], "region_id")  # region comes from the pack
        language_id = item.get("language_id") or region["language_id"]  # region default, overridable
        return SessionConfig(
            topic=domain["topic"],
            instruction=domain["instruction"],
            knowledge_components=dict(pack["knowledge_components"]),
            misconceptions={},
            num_turns=item.get("num_turns", 8),
            language=_language_name(cat, language_id),
            region=region["name"],
            context_dependent=True,
            **profile_fields,
        )

    raise ValueError(f"unknown topic_type {topic_type!r} in run-set item {item.get('id')!r}")


def resolve_run_item(item: dict, cat: Catalogs) -> ResolvedRun:
    return ResolvedRun(
        item_id=item["id"],
        config=build_session_config(item, cat),
        teacher_model=_model_litellm(cat, item["teacher_model_id"]),
        student_model=_model_litellm(cat, item["student_model_id"]),
        teacher_prompt=TeacherPrompt(item.get("prompt_variant", "P3")),
        repeats=item.get("repeats", 1),
    )


def load_run_set(data_dir: Path | None = None) -> list[ResolvedRun]:
    """Resolve every item in run_set.json into a runnable ResolvedRun."""
    data_dir = data_dir or _DATA_DIR
    cat = load_catalogs(data_dir)
    items = json.loads((data_dir / "run_set.json").read_text())["items"]
    return [resolve_run_item(item, cat) for item in items]
