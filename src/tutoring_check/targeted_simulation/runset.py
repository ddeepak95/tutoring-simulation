"""Expand a target run set into cells = script x language x tutor model (docs/target_turns.md §4).
Catalogs (languages, models, regions) are the live simulation's, loaded from the run set's own
directory; the script resolves its language and region names against them as it loads.
"""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path

from tutoring_check.simulation.catalog import load_catalogs, resolve_model_ref
from tutoring_check.targeted_simulation.script import Script, load_script


@dataclass
class Cell:
    """One fixed context under one model: `repeats` samples of the same target turn."""
    script: Script
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


def load_target_run_set(path: Path, scripts_root: Path | None = None) -> list[Cell]:
    """Cross the three axes into cells. `defaults` supplies the per-cell knobs."""
    run_set = json.loads(path.read_text(encoding="utf-8"))
    defaults = run_set.get("defaults", {})
    cat = load_catalogs(path.parent)

    cells: list[Cell] = []
    for script_id in run_set["scripts"]:
        for language_id in run_set["languages"]:
            script = load_script(script_id, language_id, scripts_root, cat)
            for model_id in run_set["tutor_models"]:
                _lookup(cat.models, model_id, "model id")
                # resolve_model_ref also expands ${VAR} in litellm_params, e.g. vertex_location.
                litellm_model, params = resolve_model_ref(model_id, cat)
                cells.append(
                    Cell(
                        script=script,
                        tutor_model_id=model_id,
                        tutor_model=litellm_model,
                        tutor_reasoning=defaults.get("tutor_reasoning"),
                        repeats=defaults.get("repeats", 1),
                        tutor_model_params=params,
                    )
                )
    return cells
