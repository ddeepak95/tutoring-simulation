"""Expand a target run set into cells = script x language x tutor model (docs/target_turns.md §4).
Catalogs (languages, models, topics, regions) are the live simulation's, loaded from the run set's
own directory.
"""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path

from tutoring_check.simulation.catalog import Catalogs, load_catalogs, resolve_model_ref
from tutoring_check.targeted_simulation.script import Script, load_script


@dataclass(frozen=True)
class TargetConfig:
    """What a target cell contains. """
    topic: str                          # human-readable topic name
    question: str                       # the learning question
    language: str                       # language name, e.g. "English (US)"
    region: str = ""                    # the region the student is from


@dataclass
class Cell:
    """One fixed context under one model: `repeats` samples of the same target turn."""
    script: Script
    config: TargetConfig
    tutor_model_id: str
    tutor_model: str                    # litellm model string
    tutor_reasoning: str | None
    repeats: int
    tutor_model_params: dict = field(default_factory=dict)


def _lookup(table: dict[str, dict], key: str, label: str) -> dict:
    try:
        return table[key]
    except KeyError:
        raise KeyError(f"unknown {label} {key!r}; known: {sorted(table)}") from None


def build_target_config(script: Script, cat: Catalogs) -> TargetConfig:
    """Resolve a script's ids against the catalogs. Fails here rather than partway into a run."""
    topic = _lookup(cat.topics_ci, script.topic_id, "topic_id")
    region = _lookup(cat.regions, script.region_id, "region_id") if script.region_id else None
    return TargetConfig(
        topic=topic["topic"],
        question=topic["question"],
        language=_lookup(cat.languages, script.language_id, "language_id")["name"],
        region=region["name"] if region else "",
    )


def load_target_run_set(path: Path, scripts_root: Path | None = None) -> list[Cell]:
    """Cross the three axes into cells. `defaults` supplies the per-cell knobs."""
    run_set = json.loads(path.read_text(encoding="utf-8"))
    defaults = run_set.get("defaults", {})
    cat = load_catalogs(path.parent)

    cells: list[Cell] = []
    for script_id in run_set["scripts"]:
        for language_id in run_set["languages"]:
            script = load_script(script_id, language_id, scripts_root)
            config = build_target_config(script, cat)
            for model_id in run_set["tutor_models"]:
                _lookup(cat.models, model_id, "model id")
                # resolve_model_ref also expands ${VAR} in litellm_params, e.g. vertex_location.
                litellm_model, params = resolve_model_ref(model_id, cat)
                cells.append(
                    Cell(
                        script=script,
                        config=config,
                        tutor_model_id=model_id,
                        tutor_model=litellm_model,
                        tutor_reasoning=defaults.get("tutor_reasoning"),
                        repeats=defaults.get("repeats", 1),
                        tutor_model_params=params,
                    )
                )
    return cells
