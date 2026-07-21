"""Evaluate one conversation: mark which tutor moves each turn makes (evaluation.md "Current scope").

The driver loops the tutor turns of a transcript, asks the annotator model which moves each
makes, records a 0/1 presence vector over `dimension_keys()` per turn, and finishes with a
conversation total that sums each dimension's column, logged alongside the source
`transcript.jsonl` (evaluation.md "Modules").
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from litellm import acompletion

from tutoring_check.evaluation import instruction_annotator
from tutoring_check.evaluation.dimensions import dimension_keys
from tutoring_check.evaluation.transcript import Transcript, Turn, load_transcript
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now


def _completion_kwargs(model: str, messages: list[dict], reasoning: str | None = None) -> dict:
    """Assemble litellm kwargs with the annotator's structured-output schema.

    When reasoning is set it becomes litellm's unified reasoning_effort ("low"/"medium"/"high");
    the model's reasoning trace is then returned on the response and captured in the responses log.
    """
    kwargs: dict = {
        "model": model,
        "messages": messages,
        "response_format": instruction_annotator.response_format(),
    }
    if reasoning:
        kwargs["reasoning_effort"] = reasoning
    return kwargs


def _presence_vector(moves: list[str]) -> list[int]:
    """Turn the set of present move keys into a 0/1 vector over `dimension_keys()`, in that order."""
    present = set(moves)
    return [1 if key in present else 0 for key in dimension_keys()]


async def _annotate_turn(
    model: str, transcript: Transcript, turn: Turn, logger: JsonlLogger, reasoning: str | None = None
) -> list[int]:
    """Ask the annotator which moves `turn` makes, log the raw call, and return the 0/1 presence vector.

    The system message carries the fixed instructions; the user message is the whole dialogue with
    `turn` marked inside <target_turn> (evaluation.md "The annotators"). When `reasoning` is set the
    annotator model reasons before answering, and its reasoning trace is recorded in the responses log.
    """
    messages = [
        {"role": "system", "content": instruction_annotator.build_system_prompt()},
        {"role": "user", "content": instruction_annotator.mark_dialogue(transcript, turn.turn_id)},
    ]
    request = _completion_kwargs(model, messages, reasoning)
    logger.log_api_request({"timestamp": utc_now(), "turn_id": turn.turn_id, "payload": request})
    response = await acompletion(**request)
    logger.log_api_response(
        {"timestamp": utc_now(), "turn_id": turn.turn_id, "raw_response": serialize_response(response)}
    )
    content = getattr(response.choices[0].message, "content", None) or "{}"
    moves = json.loads(content).get("moves", [])
    return _presence_vector(moves)


async def evaluate_transcript(
    transcript_path: Path, *, annotator_model: str, annotator_reasoning: str | None = None
) -> Path | None:
    """Evaluate one conversation, writing move tags alongside its `transcript.jsonl`; resume-safe.

    Returns the output directory, or None if an `evaluation_transcript.jsonl` is already present there.
    """
    out_dir = transcript_path.parent
    # Allows both `transcript.jsonl` and `transcript_<Lang>.jsonl`
    stem = transcript_path.stem
    if (out_dir / f"evaluation_{stem}.jsonl").exists():
        return None

    transcript = load_transcript(transcript_path)
    logger = JsonlLogger(
        out_dir=out_dir,
        transcript_name=f"evaluation_{stem}.jsonl",
        response_name=f"evaluation_{stem}_responses.jsonl",
        request_name=f"evaluation_{stem}_requests.jsonl",
    )

    keys = list(dimension_keys())

    # Header (evaluation.md "Schema"). `dimensions` names each column of the per-turn vectors.
    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "scenario_id": transcript.scenario_id,
            "scenario_type": transcript.scenario_type,
            "region": transcript.region,
            "language": transcript.language,
            "annotator_model": annotator_model,
            "annotator_reasoning": annotator_reasoning,
            "tutor_model": transcript.tutor_model,
            "transcript_path": str(transcript_path),
            "dimensions": keys,
        }
    )

    totals = [0] * len(keys)
    for turn in transcript.tutor_turns():
        vector = await _annotate_turn(annotator_model, transcript, turn, logger, annotator_reasoning)
        totals = [t + v for t, v in zip(totals, vector)]
        logger.log_transcript({"timestamp": utc_now(), "turn_id": turn.turn_id, "dimensions": vector})

    # Conversation total: each dimension's column (see header `dimensions`) summed over all tutor turns.
    logger.log_transcript({"timestamp": utc_now(), "totals": totals})

    return out_dir
