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
from tutoring_check.vertex_auth import with_adc_token


def _completion_kwargs(
    model: str, messages: list[dict], reasoning: str | None = None, params: dict | None = None
) -> dict:
    """Assemble litellm kwargs with the annotator's structured-output schema.

    When reasoning is set it becomes litellm's unified reasoning_effort ("low"/"medium"/"high");
    the model's reasoning trace comes back as `reasoning_content` and is captured in the responses log.
    `params` carries the model's own litellm kwargs from models.json (e.g. vertex_location).

    Temperature is pinned to 0: a rubric edit is judged by how the tags move, so sampling noise between
    two runs of the same wording would be read as the edit's effect. `params` can still override it.
    """
    kwargs: dict = {
        "model": model,
        "messages": messages,
        "response_format": instruction_annotator.response_format(),
        "temperature": 0,
        **(params or {}),
    }
    if reasoning:
        # Vertex Claude rejects the `thinking.type.enabled` litellm sends for reasoning_effort, and the
        # `thinking={"type": "adaptive"}` workaround is accepted but yields reasoning_tokens=0 -- a
        # billed call with no reasoning and no error. Refuse rather than silently annotate unreasoned.
        if model.startswith("vertex_ai/claude"):
            raise ValueError(
                f"{model} cannot reason through litellm: it rejects `thinking.type.enabled` and ignores "
                "the `adaptive` fallback. Drop --annotator-reasoning, or pick a model that supports it "
                "(e.g. vertex_ai/gemini-3.5-flash)."
            )
        kwargs["reasoning_effort"] = reasoning
    return kwargs


def _parse_moves(response: Any, turn_id: int) -> list[str]:
    """The move keys the annotator returned, or raise if the response cannot be read as an answer.

    Every failure here is indistinguishable from an honest empty list once it reaches the vector, so
    none of them may pass silently: an unreadable turn would be recorded as "this turn made no moves"
    and counted as data. The raw response is in the responses log for whichever turn is named.
    """
    content = getattr(response.choices[0].message, "content", None)
    if not content or not content.strip():
        raise ValueError(f"turn {turn_id}: annotator returned empty content; see the responses log")
    try:
        parsed = json.loads(content)
    except json.JSONDecodeError as e:
        raise ValueError(f"turn {turn_id}: annotator response is not JSON ({e}): {content[:200]!r}") from e
    if not isinstance(parsed, dict) or "moves" not in parsed:
        raise ValueError(f"turn {turn_id}: annotator response has no `moves` key: {content[:200]!r}")
    moves = parsed["moves"]
    if not isinstance(moves, list) or not all(isinstance(m, str) for m in moves):
        raise ValueError(f"turn {turn_id}: `moves` is not a list of strings: {moves!r}")
    # The schema pins these to an enum, but not every provider enforces it; an unknown key would
    # otherwise be dropped by the set lookup below and read as an absence.
    unknown = [m for m in moves if m not in set(dimension_keys())]
    if unknown:
        raise ValueError(f"turn {turn_id}: annotator returned keys outside the registry: {unknown}")
    return moves


def _presence_vector(moves: list[str]) -> list[int]:
    """Turn the set of present move keys into a 0/1 vector over `dimension_keys()`, in that order."""
    present = set(moves)
    return [1 if key in present else 0 for key in dimension_keys()]


async def _annotate_turn(
    model: str,
    transcript: Transcript,
    turn: Turn,
    logger: JsonlLogger,
    reasoning: str | None = None,
    params: dict | None = None,
    prompt_version: str = instruction_annotator.DEFAULT_PROMPT_VERSION,
) -> list[int]:
    """Annotate `turn`: log the raw call and return its 0/1 move vector.

    The system message carries the fixed instructions; the user message is the whole dialogue with
    `turn` marked inside <target_turn> (evaluation.md "The annotators"). When `reasoning` is set the
    annotator model reasons before answering, and its reasoning trace is recorded in the responses log.
    `prompt_version` selects which wording of the system prompt to use, so two versions can be run over
    the same transcripts and compared.
    """
    messages = [
        {"role": "system", "content": instruction_annotator.build_system_prompt(prompt_version)},
        {"role": "user", "content": instruction_annotator.mark_dialogue(transcript, turn.turn_id)},
    ]
    request = _completion_kwargs(model, messages, reasoning, params)
    logger.log_api_request({"timestamp": utc_now(), "turn_id": turn.turn_id, "payload": request})
    response = await acompletion(**with_adc_token(request))
    logger.log_api_response(
        {"timestamp": utc_now(), "turn_id": turn.turn_id, "raw_response": serialize_response(response)}
    )
    return _presence_vector(_parse_moves(response, turn.turn_id))


def _is_complete(path: Path) -> bool:
    """Whether an evaluation file was written all the way to its `totals` record."""
    lines = [l for l in path.read_text(encoding="utf-8").splitlines() if l.strip()]
    if not lines:
        return False
    try:
        return "totals" in json.loads(lines[-1])
    except json.JSONDecodeError:
        return False


async def evaluate_transcript(
    transcript_path: Path,
    *,
    annotator_model: str,
    annotator_reasoning: str | None = None,
    annotator_model_params: dict | None = None,
    annotator_prompt: str = instruction_annotator.DEFAULT_PROMPT_VERSION,
) -> Path | None:
    """Evaluate one conversation, writing move tags alongside its `transcript.jsonl`; resume-safe.

    Returns the output directory, or None if an `evaluation_transcript.jsonl` is already present there.
    `annotator_prompt` names a version in `instruction_annotator.PROMPT_VERSIONS`; it is recorded in the
    header, since two runs are only comparable if they were annotated under the same wording.
    """
    # Fail before any API call on a misspelled version or an unsupported reasoning effort, rather
    # than part-way through a run.
    instruction_annotator.build_system_prompt(annotator_prompt)
    _completion_kwargs(annotator_model, [], annotator_reasoning, annotator_model_params)
    out_dir = transcript_path.parent
    # Allows both `transcript.jsonl` and `transcript_<Lang>.jsonl`
    stem = transcript_path.stem
    existing = out_dir / f"evaluation_{stem}.jsonl"
    if existing.exists():
        # Presence alone is not completion: an annotation that raised part-way leaves a file whose
        # turns stop early, and skipping on presence would retire it as done. The `totals` record is
        # written last, so it is the only proof the run finished. JsonlLogger appends, so a partial
        # file cannot simply be re-run over -- it has to be removed first, which is the caller's call.
        if _is_complete(existing):
            return None
        raise ValueError(
            f"{existing} is a partial annotation (no `totals` record), left by a run that failed "
            "part-way. Delete it and its _requests/_responses logs to re-annotate this conversation."
        )

    transcript = load_transcript(transcript_path)
    logger = JsonlLogger(
        out_dir=out_dir,
        transcript_name=f"evaluation_{stem}.jsonl",
        response_name=f"evaluation_{stem}_responses.jsonl",
        request_name=f"evaluation_{stem}_requests.jsonl",
    )

    keys = list(dimension_keys())

    # Header (evaluation.md "Schema"). `dimensions` names each column of the per-turn move vectors.
    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "scenario_id": transcript.scenario_id,
            "scenario_type": transcript.scenario_type,
            "region": transcript.region,
            "language": transcript.language,
            "mode": transcript.mode,
            "annotator_model": annotator_model,
            "annotator_reasoning": annotator_reasoning,
            "annotator_prompt": annotator_prompt,
            "tutor_model": transcript.tutor_model,
            "transcript_path": str(transcript_path),
            "dimensions": keys,
        }
    )

    totals = [0] * len(keys)
    for turn in transcript.tutor_turns():
        vector = await _annotate_turn(
            annotator_model,
            transcript,
            turn,
            logger,
            annotator_reasoning,
            annotator_model_params,
            annotator_prompt,
        )
        totals = [t + v for t, v in zip(totals, vector)]
        logger.log_transcript(
            {"timestamp": utc_now(), "turn_id": turn.turn_id, "dimensions": vector}
        )

    # Conversation total: each move dimension's column (see header `dimensions`) summed over all tutor turns.
    logger.log_transcript({"timestamp": utc_now(), "totals": totals})

    return out_dir
