"""Evaluate one conversation: tag Instructional Ability moves on each tutor turn (evaluation.md "Current scope").

The driver loops the tutor turns of a transcript, asks the annotator model which moves each
makes, validates every move's location against the turn text, and logs the result alongside
the source `transcript.jsonl` (evaluation.md "Modules").
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from litellm import acompletion

from tutoring_check.evaluation import instruction_annotator
from tutoring_check.evaluation.transcript import Transcript, Turn, load_transcript
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now


def _completion_kwargs(model: str, messages: list[dict]) -> dict:
    """Assemble litellm kwargs with the annotator's structured-output schema."""
    return {
        "model": model,
        "messages": messages,
        "response_format": instruction_annotator.response_format(),
    }


def _validate_locations(moves: list[dict], turn: Turn) -> list[dict]:
    """Mark each move with whether its `location` is a verbatim substring of the scored turn."""
    return [{**move, "location_found": move.get("location", "") in turn.content} for move in moves]


async def _annotate_turn(model: str, transcript: Transcript, turn: Turn, logger: JsonlLogger) -> list[dict]:
    """Ask the annotator which Instructional Ability moves `turn` makes, log the raw call, and validate locations.

    The system message carries the fixed instructions; the user message is the whole dialogue with
    `turn` marked inside <target_turn> (evaluation.md "The annotators").
    """
    messages = [
        {"role": "system", "content": instruction_annotator.build_system_prompt()},
        {"role": "user", "content": instruction_annotator.mark_dialogue(transcript, turn.turn_id)},
    ]
    request = _completion_kwargs(model, messages)
    logger.log_api_request({"timestamp": utc_now(), "turn_id": turn.turn_id, "payload": request})
    response = await acompletion(**request)
    logger.log_api_response(
        {"timestamp": utc_now(), "turn_id": turn.turn_id, "raw_response": serialize_response(response)}
    )
    content = getattr(response.choices[0].message, "content", None) or "{}"
    moves = json.loads(content).get("moves", [])
    return _validate_locations(moves, turn)


async def evaluate_transcript(transcript_path: Path, *, annotator_model: str) -> Path | None:
    """Evaluate one conversation, writing move tags alongside its `transcript.jsonl`; resume-safe.

    Returns the output directory, or None if an `evaluation_transcript.jsonl` is already present there.
    """
    out_dir = transcript_path.parent
    if (out_dir / "evaluation_transcript.jsonl").exists():
        return None

    transcript = load_transcript(transcript_path)
    logger = JsonlLogger(
        out_dir=out_dir,
        transcript_name="evaluation_transcript.jsonl",
        response_name="evaluation_responses.jsonl",
        request_name="evaluation_requests.jsonl",
    )

    # Header (evaluation.md "Schema").
    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "scenario_id": transcript.scenario_id,
            "scenario_type": transcript.scenario_type,
            "region": transcript.region,
            "language": transcript.language,
            "annotator_model": annotator_model,
            "tutor_model": transcript.tutor_model,
            "transcript_path": str(transcript_path),
        }
    )

    for turn in transcript.tutor_turns():
        moves = await _annotate_turn(annotator_model, transcript, turn, logger)
        logger.log_transcript({"timestamp": utc_now(), "turn_id": turn.turn_id, "moves": moves})

    return out_dir
