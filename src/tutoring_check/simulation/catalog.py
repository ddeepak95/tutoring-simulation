"""Load the JSON catalogs in `data/` and resolve run-set items into runnable sessions (spec §2).
CI items take topic_id + language_id; CD items take topic_id + region_id (language defaults from the region).
"""
from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from pathlib import Path

from tutoring_check.personas.levels import level_names, resolve
from tutoring_check.personas.misconceptions import load_topic
from tutoring_check.personas.profile import StudentProfile
from tutoring_check.personas.render import build_sections
from tutoring_check.simulation.config import SessionConfig

_DATA_DIR = Path(__file__).resolve().parents[3] / "data"


@dataclass
class Catalogs:
    languages: dict[str, dict]          # id -> {name}
    models: dict[str, dict]             # id -> {litellm_model, ...}
    topics_ci: dict[str, dict]          # context-independent topic id -> topic
    topics_cd: dict[str, dict]          # context-dependent topic id -> topic
    regions: dict[str, dict]            # region id -> {name, language_id}
    students: dict[str, dict]           # student id -> {name, age, grade, speaks}


@dataclass
class ResolvedRun:
    item_id: str
    config: SessionConfig
    tutor_model: str                    # litellm model string
    student_model: str
    tutor_reasoning: str | None         # litellm reasoning_effort; None = provider default
    student_reasoning: str | None
    repeats: int
    tutor_model_params: dict = field(default_factory=dict)      # extra litellm kwargs from models.json
    student_model_params: dict = field(default_factory=dict)


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
        students=_index(_read("students.json", "students")),
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


def _model_params(cat: Catalogs, model_id: str) -> dict:
    """Extra litellm kwargs a model needs, e.g. `vertex_location` for region-pinned models.

    String values expand environment variables, so an entry can refer to `${VERTEXAI_PROJECT}`
    instead of hard-coding the project into the shared catalog.
    """
    params = _lookup(cat.models, model_id, "model id").get("litellm_params", {})
    return {k: os.path.expandvars(v) if isinstance(v, str) else v for k, v in params.items()}


def resolve_model_ref(ref: str, cat: Catalogs | None = None) -> tuple[str, dict]:
    """Resolve a model reference into (litellm model string, extra litellm kwargs).

    `ref` is either a models.json id or a raw litellm string. A raw string still picks up
    the catalog's `litellm_params` when it matches a known entry, so a region-pinned model
    works the same whether it is named by id or spelled out on the command line.
    """
    cat = cat or load_catalogs()
    if ref in cat.models:
        return _model_litellm(cat, ref), _model_params(cat, ref)
    for model_id, row in cat.models.items():
        if row["litellm_model"] == ref:
            return ref, _model_params(cat, model_id)
    return ref, {}


def build_session_config(item: dict, cat: Catalogs) -> SessionConfig:
    """Assemble a SessionConfig from one run-set item.

    `region_id` names the region the student is from (their profile); it may be set on any
    item and its default language is used when the item does not set `language_id`.
    `level` names the student level, whose compiled persona is loaded from disk here so a
    missing or unvalidated one fails when the run set loads, not partway into the campaign.
    """
    topic_type = item["topic_type"]
    if topic_type == "context_independent":
        topic = _lookup(cat.topics_ci, item["topic_id"], "context-independent topic_id")
    elif topic_type == "context_dependent":
        topic = _lookup(cat.topics_cd, item["topic_id"], "context-dependent topic_id")
    else:
        raise ValueError(f"unknown topic_type {topic_type!r} in run-set item {item.get('id')!r}")

    region = _lookup(cat.regions, item["region_id"], "region_id") if item.get("region_id") else None
    language_id = item.get("language_id") or (region and region["language_id"])
    if not language_id:
        raise KeyError(f"run-set item {item.get('id')!r} sets no language_id and its region has no default")

    # Resolved here so a typo or a missing misconception library fails when the run set loads
    # rather than partway into the campaign.
    level = item.get("level")
    if level not in level_names():
        raise ValueError(
            f"unknown level {level!r} in run-set item {item.get('id')!r}; known: {list(level_names())}"
        )
    if topic_type == "context_dependent":
        raise ValueError(
            f"run-set item {item.get('id')!r} names a context-dependent topic. On those the student "
            "is the expert on their own culture, so a misconception-structured persona does not apply."
        )

    traits = resolve(level)
    library = load_topic(item["topic_id"])
    language_name = _language_name(cat, language_id)

    # The profile is who the student is; the level is how they learn. Both are named by the run set,
    # and holding one fixed while varying the other is what makes either comparison mean anything.
    student_id = item.get("student_id")
    if not student_id:
        raise KeyError(
            f"run-set item {item.get('id')!r} sets no student_id; known: {sorted(cat.students)}"
        )
    profile = StudentProfile.from_row(
        _lookup(cat.students, student_id, "student_id"),
        region=region["name"] if region else "",
    )

    return SessionConfig(
        scenario_id=item["topic_id"],
        context_dependent=False,
        topic=topic["topic"],
        question=topic["question"],
        language=language_name,
        level=level,
        persona_sections=build_sections(level, library, profile, language_name, language_id),
        traits=traits,
        misconception_id=library.primary.id,
        region=region["name"] if region else "",
        student=profile,
    )


def resolve_run_item(item: dict, cat: Catalogs) -> ResolvedRun:
    return ResolvedRun(
        item_id=item["id"],
        config=build_session_config(item, cat),
        tutor_model=_model_litellm(cat, item["tutor_model_id"]),
        student_model=_model_litellm(cat, item["student_model_id"]),
        tutor_reasoning=item.get("tutor_reasoning"),
        student_reasoning=item.get("student_reasoning"),
        repeats=item.get("repeats", 1),
        tutor_model_params=_model_params(cat, item["tutor_model_id"]),
        student_model_params=_model_params(cat, item["student_model_id"]),
    )


def load_run_set(run_set_path: Path | None = None) -> list[ResolvedRun]:
    """Resolve every item in the given run-set file into a runnable ResolvedRun.

    The catalogs (languages, models, topics, regions) are loaded from the run-set
    file's own directory. A run set is an explicit `items` list; an optional
    `defaults` block is merged under each item, so shared fields (e.g. `region_id`,
    models) live in one place but stay overridable per item.
    """
    run_set_path = run_set_path or (_DATA_DIR / "run_set.json")
    cat = load_catalogs(run_set_path.parent)
    run_set = json.loads(run_set_path.read_text())
    defaults = run_set.get("defaults", {})
    items = [{**defaults, **item} for item in run_set["items"]]
    return [resolve_run_item(item, cat) for item in items]
