"""The TEaR (Translate, Estimate, and Refine) loop over one whole conversation.
Each stage re-parses the JSON array back into turns, so a structurally broken translation is retried rather than kept.
"""
from __future__ import annotations

import json
from pathlib import Path

from tutoring_check.translations.config import TranslateSet
from tutoring_check.translations.model import attempt, call_model
from tutoring_check.translations.prompts import (
    SOURCE_LANG,
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
    source: str,
    n_turns: int,
    target_lang: str,
    mode: str,
    ts: TranslateSet,
    source_lang: str = SOURCE_LANG,
) -> tuple[list[str], int]:
    """Translate one whole conversation, returning its turns and the number of refinement passes applied.
    The translate and refine calls are pinned to a JSON response_format, and the parsed turns are
    re-serialised as a bare array so the later stages see the same shape whatever the provider returned.
    `source_lang` names the language being translated from; target-turn scoring passes a target
    language and asks for English (docs/target_turns.md §6).
    """
    label = f"{source_lang}->{target_lang}/{mode}"

    def _translate() -> tuple[str, list[str]]:
        raw = call_model(
            build_translate_prompt(source, target_lang, mode, source_lang),
            ts.model,
            TURNS_SCHEMA,
            ts.model_params,
        )
        parsed = parse_turns(raw, n_turns)
        return json.dumps(parsed, ensure_ascii=False), parsed

    text, turns = attempt(_translate, f"translate/{label}")

    refinements = 0
    for _ in range(ts.max_refine_iters):
        evaluation = attempt(
            lambda: parse_estimate(
                call_model(
                    build_estimate_prompt(source, text, target_lang, mode, source_lang),
                    ts.model,
                    params=ts.model_params,
                )
            ),
            f"estimate/{label}",
        )
        if not evaluation.needs_fix:
            break

        def _refine() -> tuple[str, list[str]]:
            raw = call_model(
                build_refine_prompt(source, text, evaluation, target_lang, mode, source_lang),
                ts.model,
                TURNS_SCHEMA,
                ts.model_params,
            )
            parsed = parse_turns(raw, n_turns)
            return json.dumps(parsed, ensure_ascii=False), parsed

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
