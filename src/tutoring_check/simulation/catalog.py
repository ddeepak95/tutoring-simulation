"""Load the JSON catalogs in `data/` and resolve run-set items into runnable sessions (spec §2).
CI items take topic_id + language_id; CD items take topic_id + region_id (language defaults from the region).
The state sequence comes from the topic and is validated when the SessionConfig is built.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from tutoring_check.simulation.config import SessionConfig

_DATA_DIR = Path(__file__).resolve().parents[3] / "data"


@dataclass
class Catalogs:
    languages: dict[str, dict]          # id -> {name}
    models: dict[str, dict]             # id -> {litellm_model, ...}
    topics_ci: dict[str, dict]          # context-independent topic id -> topic
    topics_cd: dict[str, dict]          # context-dependent topic id -> topic
    regions: dict[str, dict]            # region id -> {name, language_id}


@dataclass
class ResolvedRun:
    item_id: str
    config: SessionConfig
    tutor_model: str                    # litellm model string
    student_model: str
    tutor_reasoning: str | None         # litellm reasoning_effort; None = provider default
    student_reasoning: str | None
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


def build_session_config(item: dict, cat: Catalogs) -> SessionConfig:
    """Assemble a SessionConfig from one run-set item."""
    topic_type = item["topic_type"]

    if topic_type == "context_independent":
        topic = _lookup(cat.topics_ci, item["topic_id"], "context-independent topic_id")
        return SessionConfig(
            scenario_id=item["topic_id"],
            context_dependent=False,
            topic=topic["topic"],
            instruction=topic["instruction"],
            state_sequence=list(item["state_sequence"]),
            language=_language_name(cat, item["language_id"]),
        )

    if topic_type == "context_dependent":
        topic = _lookup(cat.topics_cd, item["topic_id"], "context-dependent topic_id")
        region = _lookup(cat.regions, item["region_id"], "region_id")
        language_id = item.get("language_id") or region["language_id"]  # region default, overridable
        return SessionConfig(
            scenario_id=item["topic_id"],
            context_dependent=True,
            topic=topic["topic"],
            instruction=topic["instruction"],
            state_sequence=list(item["state_sequence"]),
            language=_language_name(cat, language_id),
            region=region["name"],
        )

    raise ValueError(f"unknown topic_type {topic_type!r} in run-set item {item.get('id')!r}")


def resolve_run_item(item: dict, cat: Catalogs) -> ResolvedRun:
    return ResolvedRun(
        item_id=item["id"],
        config=build_session_config(item, cat),
        tutor_model=_model_litellm(cat, item["tutor_model_id"]),
        student_model=_model_litellm(cat, item["student_model_id"]),
        tutor_reasoning=item.get("tutor_reasoning"),
        student_reasoning=item.get("student_reasoning"),
        repeats=item.get("repeats", 1),
    )


def load_run_set(run_set_path: Path | None = None) -> list[ResolvedRun]:
    """Resolve every item in the given run-set file into a runnable ResolvedRun.

    The catalogs (languages, models, topics, regions) are loaded from the run-set
    file's own directory. The shared default_state_sequence is folded into each item
    that does not set its own, so the student arc lives in one place but stays
    overridable per item.
    """
    run_set_path = run_set_path or (_DATA_DIR / "run_set.json")
    cat = load_catalogs(run_set_path.parent)
    run_set = json.loads(run_set_path.read_text())
    default_sequence = run_set.get("default_state_sequence", [])
    items = run_set["items"]
    for item in items:
        item.setdefault("state_sequence", default_sequence)
    return [resolve_run_item(item, cat) for item in items]
