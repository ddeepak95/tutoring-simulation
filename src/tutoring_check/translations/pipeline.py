"""The Translate -> Evaluate -> Refine loop over one whole conversation.
Each stage re-parses the JSON array back into turns, so a structurally broken translation is retried rather than kept.
"""
from __future__ import annotations

from pathlib import Path

from tutoring_check.translations.config import TranslateSet
from tutoring_check.translations.model import attempt, call_model
from tutoring_check.translations.prompts import (
    build_estimate_prompt,
    build_refine_prompt,
    build_translate_prompt,
    parse_estimate,
)
from tutoring_check.translations.transcript import (
    TURNS_SCHEMA,
    flatten_turns,
    load_transcript,
    parse_turns,
    translated_path,
    write_transcript,
)


def translate_conversation(
    source: str, n_turns: int, target_lang: str, mode: str, ts: TranslateSet
) -> tuple[list[str], int]:
    """Translate one whole conversation, returning its turns and the number of refinement passes applied.
    The translate and refine calls are pinned to a JSON-array response_format, so the raw response is the turns.
    """
    label = f"{target_lang}/{mode}"

    def _translate() -> tuple[str, list[str]]:
        raw = call_model(build_translate_prompt(source, target_lang, mode), ts.model, TURNS_SCHEMA)
        return raw, parse_turns(raw, n_turns)

    text, turns = attempt(_translate, f"translate/{label}")

    refinements = 0
    for _ in range(ts.max_refine_iters):
        evaluation = attempt(
            lambda: parse_estimate(call_model(build_estimate_prompt(source, text, target_lang, mode), ts.model)),
            f"estimate/{label}",
        )
        if not evaluation.needs_fix:
            break

        def _refine() -> tuple[str, list[str]]:
            raw = call_model(
                build_refine_prompt(source, text, evaluation, target_lang, mode), ts.model, TURNS_SCHEMA
            )
            return raw, parse_turns(raw, n_turns)

        text, turns = attempt(_refine, f"refine/{label}")
        refinements += 1

    return turns, refinements


def translate_transcript(transcript: str, target_lang: str, mode: str, ts: TranslateSet) -> Path:
    """Translate one transcript into one language and mode, writing it beside its source and returning that path."""
    source = ts.run_dir / transcript
    control, turns = load_transcript(source)
    translated, refinements = translate_conversation(
        flatten_turns(turns), len(turns), target_lang, mode, ts
    )
    out_path = translated_path(source, target_lang, mode)
    write_transcript(
        out_path,
        control,
        [{**turn, "content": text} for turn, text in zip(turns, translated)],
        target_lang,
        mode,
        refinements,
    )
    return out_path
