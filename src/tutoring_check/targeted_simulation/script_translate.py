"""Produce a script's per-language versions from the English one (docs/target_turns.md §2.1).
The TEaR pipeline forward, English -> target, over the script's turns as one conversation, so a
turn's phrasing stays consistent with the ones around it.
The system message is carried over verbatim, variables intact: it is the tutor's instructions
rather than dialogue, and `{language}` is what makes the tutor answer in the target language.
"""
from __future__ import annotations

import json
from pathlib import Path

from tutoring_check.simulation.catalog import Catalogs
from tutoring_check.targeted_simulation.script import (
    _DATA_DIR,
    SCRIPTS_DIR_NAME,
    ScriptError,
    load_script,
)
from tutoring_check.translations.config import TranslateSet
from tutoring_check.translations.pipeline import translate_conversation

SOURCE_LANGUAGE_ID = "en-US"


def default_region_id(language_id: str, cat: Catalogs) -> str:
    """The region whose default language is this one, or "" when no region names it."""
    for region_id, row in cat.regions.items():
        if row.get("language_id") == language_id:
            return region_id
    return ""


def translate_script(
    script_id: str,
    language_id: str,
    *,
    model: str,
    mode: str,
    cat: Catalogs,
    region_id: str | None = None,
    model_params: dict | None = None,
    max_refine_iters: int = 1,
    scripts_root: Path | None = None,
) -> Path:
    """Write `data/scripts-messages/<language_id>/<script_id>.json` from the English script."""
    root = scripts_root or _DATA_DIR / SCRIPTS_DIR_NAME
    source = load_script(script_id, SOURCE_LANGUAGE_ID, root, cat)
    if language_id not in cat.languages:
        raise ScriptError(f"unknown language_id {language_id!r}; known: {sorted(cat.languages)}")
    target_language = cat.languages[language_id]["name"]

    region = default_region_id(language_id, cat) if region_id is None else region_id
    if region and region not in cat.regions:
        raise ScriptError(f"unknown region_id {region!r}; known: {sorted(cat.regions)}")

    ts = TranslateSet(
        run_dir=root,
        jobs=[],
        model=model,
        max_refine_iters=max_refine_iters,
        model_params=model_params or {},
    )
    system, *dialogue = source.messages
    turns, refinements = translate_conversation(
        json.dumps([m.content for m in dialogue], ensure_ascii=False),
        len(dialogue),
        target_language,
        mode,
        ts,
    )

    out_path = root / language_id / f"{script_id}.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        json.dumps(
            {
                "script_id": script_id,
                "language_id": language_id,
                "topic_id": source.topic_id,
                "region_id": region,
                # Provenance only; the loader ignores them. `mode` decides whether the subject
                # matter is carried in English, so it is not recoverable from the text alone.
                "translated_from": SOURCE_LANGUAGE_ID,
                "mode": mode,
                "refinements": refinements,
                # The system message travels verbatim, variables intact; only the turns are translated.
                "messages": [{"role": system.role, "content": system.content}]
                + [{"role": m.role, "content": text} for m, text in zip(dialogue, turns)],
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    # Alternation and the ending-on-a-student-turn rule must survive translation.
    load_script(script_id, language_id, root, cat)
    return out_path


def source_script_ids(scripts_root: Path | None = None) -> list[str]:
    """Every script authored in English."""
    root = (scripts_root or _DATA_DIR / SCRIPTS_DIR_NAME) / SOURCE_LANGUAGE_ID
    return sorted(p.stem for p in root.glob("*.json"))
