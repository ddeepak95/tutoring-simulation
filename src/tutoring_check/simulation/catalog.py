"""Load the JSON catalogs in `data/` and resolve run-set items into runnable sessions (spec §2).
CI items take topic_id + language_id; CD items take topic_id + region_id (language defaults from the region).
"""
from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from pathlib import Path

from tutoring_check.simulation.config import PedagogyLevel, SessionConfig

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


def _pedagogy_levels(item: dict) -> dict[str, PedagogyLevel]:
    """The item's assigned pedagogy levels, with scale labels (e.g. "Very Low")."""
    return {approach: PedagogyLevel(level) for approach, level in item.get("pedagogy_levels", {}).items()}


def build_session_config(item: dict, cat: Catalogs) -> SessionConfig:
    """Assemble a SessionConfig from one run-set item."""
    topic_type = item["topic_type"]

    if topic_type == "context_independent":
        topic = _lookup(cat.topics_ci, item["topic_id"], "context-independent topic_id")
        return SessionConfig(
            scenario_id=item["topic_id"],
            context_dependent=False,
            topic=topic["topic"],
            question=topic["question"],
            language=_language_name(cat, item["language_id"]),
            pedagogy_levels=_pedagogy_levels(item),
        )

    if topic_type == "context_dependent":
        topic = _lookup(cat.topics_cd, item["topic_id"], "context-dependent topic_id")
        region = _lookup(cat.regions, item["region_id"], "region_id")
        language_id = item.get("language_id") or region["language_id"]  # region default, overridable
        return SessionConfig(
            scenario_id=item["topic_id"],
            context_dependent=True,
            topic=topic["topic"],
            question=topic["question"],
            language=_language_name(cat, language_id),
            region=region["name"],
            pedagogy_levels=_pedagogy_levels(item),
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
        tutor_model_params=_model_params(cat, item["tutor_model_id"]),
        student_model_params=_model_params(cat, item["student_model_id"]),
    )


def _expand_sweep(run_set: dict) -> list[dict]:
    """Expand a compact `pedagogy_sweep` run set into item dicts.

    Each cell fixes one approach at one extreme (Very High / Very Low) with the rest
    at the baseline level, for every topic. The id is {topic}-{lang}-{approach}-{extreme}.
    """
    defaults = run_set.get("defaults", {})
    lang = defaults["language_id"].split("-")[0]
    sweep = run_set["pedagogy_sweep"]
    baseline, approaches, extremes = sweep["baseline"], sweep["approaches"], sweep["extremes"]

    items: list[dict] = []
    for topic in run_set["topics"]:
        for approach in approaches:
            for extreme in extremes:
                levels = {a["name"]: baseline for a in approaches}
                levels[approach["name"]] = extreme["level"]
                items.append(
                    {
                        **defaults,
                        "id": f"{topic}-{lang}-{approach['code']}-{extreme['code']}",
                        "topic_id": topic,
                        "pedagogy_levels": levels,
                    }
                )
    return items


def load_run_set(run_set_path: Path | None = None) -> list[ResolvedRun]:
    """Resolve every item in the given run-set file into a runnable ResolvedRun.

    The catalogs (languages, models, topics, regions) are loaded from the run-set
    file's own directory. A run set is either compact (a `pedagogy_sweep` expanded
    into cells here) or an explicit `items` list; in the latter the shared
    pedagogy_levels is folded into each item that does not set its own, so the
    tutor's assigned levels live in one place but stay overridable per item.
    """
    run_set_path = run_set_path or (_DATA_DIR / "run_set.json")
    cat = load_catalogs(run_set_path.parent)
    run_set = json.loads(run_set_path.read_text())
    if "pedagogy_sweep" in run_set:
        items = _expand_sweep(run_set)
    else:
        default_levels = run_set.get("pedagogy_levels", {})
        items = run_set["items"]
        for item in items:
            item.setdefault("pedagogy_levels", default_levels)
    return [resolve_run_item(item, cat) for item in items]
