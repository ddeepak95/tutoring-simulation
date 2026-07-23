"""Run one conversation = one simulation, and log it (spec §6, §7).
Tutor-first, alternating, for a fixed number of turns per speaker.
"""
from __future__ import annotations

import time
from pathlib import Path
from typing import Any

import litellm
from litellm import acompletion

from tutoring_check.simulation.config import SessionConfig
from tutoring_check.simulation.student import build_student_system_prompt
from tutoring_check.simulation.tutor import build_tutor_system_prompt
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now


TURNS_PER_SPEAKER = 10


def _completion_kwargs(model: str, messages: list[dict], reasoning: str | None = None) -> dict:
    """Assemble litellm kwargs; the provider's default sampling applies.
    When reasoning is set it becomes litellm's unified reasoning_effort ("low"/"medium"/"high",
    plus "none"/"disable" where the provider supports it); unset leaves the provider default.
    """
    kwargs: dict = {"model": model, "messages": messages}
    if reasoning:
        kwargs["reasoning_effort"] = reasoning
    return kwargs


def _extract_usage(response: Any) -> dict[str, Any]:
    """Normalize the provider's token accounting into a flat, comparable shape.
    Missing fields stay None so a provider that omits a breakdown is distinguishable from a zero.
    """
    usage = getattr(response, "usage", None)
    if usage is None:
        return {}
    u = usage.model_dump() if hasattr(usage, "model_dump") else dict(usage)
    completion_details = u.get("completion_tokens_details") or {}
    prompt_details = u.get("prompt_tokens_details") or {}
    cached = prompt_details.get("cached_tokens")
    if cached is None:
        cached = u.get("cache_read_input_tokens")
    return {
        "prompt_tokens": u.get("prompt_tokens"),
        "completion_tokens": u.get("completion_tokens"),
        "total_tokens": u.get("total_tokens"),
        "reasoning_tokens": completion_details.get("reasoning_tokens"),
        "output_text_tokens": completion_details.get("text_tokens"),
        "cached_tokens": cached,
    }


async def _acompletion_with_metrics(kwargs: dict, concurrency: int) -> tuple[Any, str, dict[str, Any]]:
    """Stream one completion so time-to-first-byte can be timed, then rebuild the full
    (non-streamed) response so downstream logging and parsing are unchanged.
    Returns (reconstructed_response, spoken_text, metrics).

    `concurrency` is the number of sessions sharing the event loop for this run; it is
    recorded with each call because at >1 the loop can suspend this coroutine between
    chunks, inflating latency_s. It is context for interpreting latency, not a measurement.
    """
    # perf_counter drives the durations (monotonic); wall-clock ISO stamps are for auditing only.
    start_ts = utc_now()
    start = time.perf_counter()
    ttfb: float | None = None
    chunks: list[Any] = []
    stream = await acompletion(**kwargs, stream=True, stream_options={"include_usage": True})
    async for chunk in stream:
        if ttfb is None:
            ttfb = time.perf_counter() - start
        chunks.append(chunk)
    latency = time.perf_counter() - start
    end_ts = utc_now()

    response = litellm.stream_chunk_builder(chunks, messages=kwargs.get("messages")) if chunks else None
    text = ""
    if response is not None:
        text = getattr(response.choices[0].message, "content", None) or ""

    metrics = {
        "ttfb_s": ttfb,
        "latency_s": latency,
        "start_ts": start_ts,
        "end_ts": end_ts,
        "n_chunks": len(chunks),
        "concurrency": concurrency,
        **_extract_usage(response),
    }
    return response, text, metrics


async def run_session(
    config: SessionConfig,
    *,
    tutor_model: str,
    student_model: str,
    output_root: Path,
    tutor_reasoning: str | None = None,
    student_reasoning: str | None = None,
    concurrency: int = 1,
) -> Path:
    out_dir = output_root
    logger = JsonlLogger(out_dir=out_dir)

    tutor_system = build_tutor_system_prompt(config)
    student_static = build_student_system_prompt(config)

    # Transcript header: everything the downstream critic/ranking needs to reconstruct the cell (spec §7).
    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "type": "session_start",
            "scenario_id": config.scenario_id,
            "scenario_type": "CD" if config.context_dependent else "CI",
            "region": config.region,
            "language": config.language,
            "tutor_model": tutor_model,
            "student_model": student_model,
            "tutor_reasoning": tutor_reasoning,
            "student_reasoning": student_reasoning,
            "concurrency": concurrency,
            "tutor_system_prompt": tutor_system,
            "student_static_prompt": student_static,
        }
    )

    # The tutor speaks first, posing the learning question; each side sees only spoken text.
    # A pre-loaded message opens the conversation by having the tutor pose the question.
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": tutor_system},
        {
            "role": "user",
            "content": (
                "Begin the conversation. Open by posing the learning question to the student. Address the student, not this message."
            ),
        },
    ]
    # The student turns hold spoken turns only; its static system prompt is prepended each turn.
    student_turns: list[dict[str, Any]] = []

    turn_id = 0
    # Each iteration is one tutor turn followed by one student turn.
    # The conversation is a fixed TURNS_PER_SPEAKER iterations long.
    for step in range(TURNS_PER_SPEAKER):
        # Tutor turn
        tutor_request = _completion_kwargs(tutor_model, messages, tutor_reasoning)
        logger.log_api_request({"timestamp": utc_now(), "role": "tutor", "payload": tutor_request})
        tutor_response, tutor_text, tutor_metrics = await _acompletion_with_metrics(tutor_request, concurrency)
        logger.log_api_response(
            {"timestamp": utc_now(), "role": "tutor", "raw_response": serialize_response(tutor_response), "metrics": tutor_metrics}
        )
        logger.log_transcript(
            {"timestamp": utc_now(), "turn_id": turn_id, "speaker": "tutor", "content": tutor_text, "metrics": tutor_metrics}
        )
        messages.append({"role": "assistant", "content": tutor_text})
        student_turns.append({"role": "user", "content": tutor_text})
        turn_id += 1

        # Student turn
        student_messages = [{"role": "system", "content": student_static}] + student_turns
        student_request = _completion_kwargs(student_model, student_messages, student_reasoning)
        logger.log_api_request({"timestamp": utc_now(), "role": "student", "payload": student_request})
        student_response, student_text, student_metrics = await _acompletion_with_metrics(student_request, concurrency)
        logger.log_api_response(
            {"timestamp": utc_now(), "role": "student", "raw_response": serialize_response(student_response), "metrics": student_metrics}
        )
        logger.log_transcript(
            {
                "timestamp": utc_now(),
                "turn_id": turn_id,
                "speaker": "student",
                "content": student_text,
                "metrics": student_metrics,
            }
        )
        student_turns.append({"role": "assistant", "content": student_text})
        messages.append({"role": "user", "content": student_text})
        turn_id += 1

    logger.log_transcript(
        {"timestamp": utc_now(), "type": "session_end", "turns": turn_id}
    )
    return out_dir
