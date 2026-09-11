"""Run one cell: `repeats` samples of the same target turn, and log them (docs/target_turns.md §5).
Every repeat sends a byte-identical request, so the spread across them is the model's own.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now
from tutoring_check.simulation.session import EmptyTurnError, _acompletion_with_metrics, _completion_kwargs
from tutoring_check.targeted_simulation.prompt import build_messages, build_tutor_system
from tutoring_check.targeted_simulation.runset import Cell

RESPONSES_NAME = "responses.jsonl"


def completed_repeats(cell_dir: Path) -> int:
    """How many responses are already on disk.

    Counted rather than inferred from the directory existing: a cell interrupted midway leaves a
    short file, and a short file should be topped up, not skipped and not restarted.
    """
    path = cell_dir / RESPONSES_NAME
    if not path.exists():
        return 0
    with path.open(encoding="utf-8") as f:
        return sum(1 for line in f if line.strip() and "repeat" in json.loads(line))


async def _sample(request: dict, concurrency: int, repeat: int) -> tuple[Any, str, dict]:
    """One target turn, retried once if it comes back empty."""
    response, text, metrics = await _acompletion_with_metrics(request, concurrency)
    if text.strip():
        return response, text, metrics

    response, text, metrics = await _acompletion_with_metrics(request, concurrency)
    if text.strip():
        metrics["retried_after_empty"] = True
        return response, text, metrics

    raise EmptyTurnError(
        f"tutor returned no text for repeat {repeat}, twice. Completion tokens went to reasoning: "
        f"{metrics.get('reasoning_tokens')} reasoning vs {metrics.get('completion_tokens')} total."
    )


async def run_cell(cell: Cell, *, output_root: Path, concurrency: int = 1) -> Path:
    """Fill `cell.repeats` responses under `output_root`, appending to whatever is already there."""
    done = completed_repeats(output_root)
    if done >= cell.repeats:
        return output_root

    logger = JsonlLogger(out_dir=output_root, transcript_name=RESPONSES_NAME)
    tutor_system = build_tutor_system(cell.config)
    messages = build_messages(cell.script, cell.config)

    # Keyed on the file, not on `done`: a run that died between the header and the first repeat
    # leaves a header with no records, and resuming on `done == 0` would write a second one.
    if not logger.transcript_path.exists():
        logger.log_transcript(
            {
                "timestamp": utc_now(),
                "type": "target_start",
                "script_id": cell.script.script_id,
                "language": cell.config.language,
                "region": cell.config.region,
                "topic": cell.config.topic,
                "tutor_model": cell.tutor_model,
                "tutor_reasoning": cell.tutor_reasoning,
                "repeats": cell.repeats,
                # The scripted context, so scoring can render the dialogue from this file alone.
                "conversation": [
                    {"speaker": t.speaker, "text": t.text} for t in cell.script.conversation
                ],
                "tutor_system_prompt": tutor_system,
            }
        )

    request = _completion_kwargs(cell.tutor_model, messages, cell.tutor_reasoning, cell.tutor_model_params)
    for repeat in range(done, cell.repeats):
        logger.log_api_request({"timestamp": utc_now(), "repeat": repeat, "payload": request})
        response, text, metrics = await _sample(request, concurrency, repeat)
        logger.log_api_response(
            {
                "timestamp": utc_now(),
                "repeat": repeat,
                "raw_response": serialize_response(response),
                "metrics": metrics,
            }
        )
        logger.log_transcript(
            {"timestamp": utc_now(), "repeat": repeat, "content": text, "metrics": metrics}
        )
    return output_root
