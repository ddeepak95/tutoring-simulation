"""The translate-set spec resolved into a runnable job list.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
DATA_DIR = REPO_ROOT / "data"
DEFAULT_TRANSLATE_SET = DATA_DIR / "translations" / "translate_set.json"


@dataclass
class TranslateSet:
    run_dir: Path                       # the simulation run folder: holds the transcripts and their translations
    jobs: list[tuple[str, str]]         # (transcript path relative to run_dir, target language)
    model: str
    max_refine_iters: int


def _resolve_model(spec: dict) -> str:
    """A raw `model` litellm string wins; otherwise resolve `model_id` via data/models.json."""
    if spec.get("model"):
        return spec["model"]
    model_id = spec["model_id"]
    models = {m["id"]: m for m in json.loads((DATA_DIR / "models.json").read_text())["models"]}
    if model_id not in models:
        raise KeyError(f"unknown model_id {model_id!r}; known: {sorted(models)}")
    return models[model_id]["litellm_model"]


def _resolve_jobs(spec: dict) -> list[tuple[str, str]]:
    """Pair each transcript with each of its job's target languages, so different transcripts can go to different languages."""
    return [
        (transcript, lang)
        for job in spec["jobs"]
        for transcript in job["transcripts"]
        for lang in job["target_languages"]
    ]


def load_translate_set(path: Path, run_dir: Path) -> TranslateSet:
    """Resolve a translate-set JSON against `run_dir`, the simulation run folder holding the transcripts.
    The translations are written back into that same folder, beside their source.
    """
    if not run_dir.is_dir():
        raise NotADirectoryError(f"--run-dir does not exist: {run_dir}")
    spec = json.loads(path.read_text())
    return TranslateSet(
        run_dir=run_dir.resolve(),
        jobs=_resolve_jobs(spec),
        model=_resolve_model(spec),
        max_refine_iters=spec.get("max_refine_iters", 1),
    )