"""Translate a cell's sampled turns into English for scoring (docs/target_turns.md §6).
The same TEaR pipeline the corpus is translated with, called with the language pair reversed.
Every cell goes through it, English included, so the language axis does not also differ by pipeline.
"""
from __future__ import annotations

import asyncio
import json
from pathlib import Path

from tutoring_check.runlog import JsonlLogger, utc_now
from tutoring_check.targeted_simulation.evaluate import TRANSLATED_NAME, read_cell
from tutoring_check.translations.config import TranslateSet
from tutoring_check.translations.pipeline import translate_conversation
from tutoring_check.translations.prompts import SOURCE_LANG


def translated_repeats(cell_dir: Path) -> set[int]:
    """Which repeats already have an English rendering."""
    path = cell_dir / TRANSLATED_NAME
    if not path.exists():
        return set()
    return {
        record["repeat"]
        for line in path.read_text(encoding="utf-8").splitlines()
        if line.strip() and "repeat" in (record := json.loads(line))
    }


async def translate_cell(
    cell_dir: Path,
    *,
    model: str,
    mode: str,
    model_params: dict | None = None,
    max_refine_iters: int = 1,
) -> Path:
    """Write an English rendering of every sampled turn in `cell_dir`; resume-safe.
    `mode` describes the source, i.e. whether its subject matter is carried in English.
    """
    header, records = read_cell(cell_dir, prefer_english=False)
    done = translated_repeats(cell_dir)
    source_language = header.get("language", "")
    ts = TranslateSet(
        run_dir=cell_dir,
        jobs=[],
        model=model,
        max_refine_iters=max_refine_iters,
        model_params=model_params or {},
    )

    logger = JsonlLogger(out_dir=cell_dir, transcript_name=TRANSLATED_NAME)
    for record in records:
        repeat = record["repeat"]
        if repeat in done:
            continue
        turns, refinements = await asyncio.to_thread(
            translate_conversation,
            json.dumps([record["content"]], ensure_ascii=False),
            1,
            SOURCE_LANG,
            mode,
            ts,
            source_language,
        )
        logger.log_transcript(
            {
                "timestamp": utc_now(),
                "repeat": repeat,
                "content": turns[0],
                "source_language": source_language,
                "mode": mode,
                "refinements": refinements,
            }
        )
    return cell_dir
