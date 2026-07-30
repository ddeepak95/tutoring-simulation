"""Run one conversation = one simulation, and log it (spec §6, §7).
Tutor-first, alternating, for a fixed number of turns per speaker.
"""
from __future__ import annotations

import time
from dataclasses import asdict
from pathlib import Path
from typing import Any

import litellm
from litellm import acompletion

from tutoring_check.personas.traits import REGISTRY_VERSION
from tutoring_check.simulation.config import TURNS_PER_SPEAKER, SessionConfig
from tutoring_check.simulation.student import build_student_system_prompt
from tutoring_check.simulation.tutor import build_tutor_system_prompt
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now
from tutoring_check.vertex_auth import with_adc_token


# `TURNS_PER_SPEAKER` is imported from `config.py` rather than defined here, so `catalog.py` can
# default to it without importing this module - that import would pull litellm into
# `personas.cli lint`, which deliberately defers the simulation package.
#
# Conversation length changes what a tutor can get through, so a 20-message run and a 30-message run
# are not comparable as tutors. The value used is written into the transcript header.


def _completion_kwargs(
    model: str,
    messages: list[dict],
    reasoning: str | None = None,
    params: dict | None = None,
) -> dict:
    """Assemble litellm kwargs; the provider's default sampling applies.
    When reasoning is set it becomes litellm's unified reasoning_effort ("low"/"medium"/"high",
    plus "none"/"disable" where the provider supports it); unset leaves the provider default.
    `params` carries the model's own litellm kwargs from models.json (e.g. vertex_location).
    """
    kwargs: dict = {"model": model, "messages": messages}
    if reasoning:
        kwargs["reasoning_effort"] = reasoning
    if params:
        kwargs.update(params)
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

    The ADC sentinel is swapped for a live token here, i.e. after the caller has logged
    `kwargs`, so the credential never reaches `api_requests.jsonl`.
    """
    kwargs = with_adc_token(kwargs)
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


class EmptyTurnError(RuntimeError):
    """A speaker returned no text, so the transcript would have a hole in it.

    Seen in practice with `reasoning_effort="none"` on vertex_ai/gemini-3.5-flash: the request
    carries the flag, the model reasons anyway, and one turn spent 326 of its 327 completion tokens
    on reasoning and returned a bare newline. `finish_reason` was "stop", so nothing downstream
    would have noticed - the transcript simply had an empty tutor turn in the middle of it, and the
    student, correctly, asked if they were still there.

    Raised rather than logged because a transcript with a hole is not a smaller sample, it is a
    corrupt one, and the cell should be re-run. Delete the cell directory to retry: `cli.py` skips
    any cell whose transcript.jsonl already exists, including a partial one.
    """


async def _speak(
    request: dict, concurrency: int, *, role: str, turn: int
) -> tuple[Any, str, dict]:
    """One turn, retried once if it comes back empty."""
    response, text, metrics = await _acompletion_with_metrics(request, concurrency)
    if text.strip():
        return response, text, metrics

    response, text, metrics = await _acompletion_with_metrics(request, concurrency)
    if text.strip():
        metrics["retried_after_empty"] = True
        return response, text, metrics

    raise EmptyTurnError(
        f"{role} returned no text on turn {turn}, twice. Completion tokens went to reasoning: "
        f"{metrics.get('reasoning_tokens')} reasoning vs {metrics.get('completion_tokens')} total."
    )


async def run_session(
    config: SessionConfig,
    *,
    tutor_model: str,
    student_model: str,
    output_root: Path,
    tutor_reasoning: str | None = None,
    student_reasoning: str | None = None,
    tutor_model_params: dict | None = None,
    student_model_params: dict | None = None,
    concurrency: int = 1,
    turns_per_speaker: int = TURNS_PER_SPEAKER,
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
            # The student stimulus, recorded so a transcript stays interpretable after the level
            # bundles in personas/levels.py move on: persona_traits is the resolved vector that
            # actually produced this prompt. The prompt itself is logged below as
            # student_static_prompt, which is the full record - the persona is rendered
            # deterministically, so there is nothing else to pin.
            "level": config.level,
            "persona_registry_version": REGISTRY_VERSION,
            "persona_traits": config.traits,
            "misconception_id": config.misconception_id,
            "student_profile": asdict(config.student) if config.student else None,
            "tutor_model": tutor_model,
            "student_model": student_model,
            "tutor_reasoning": tutor_reasoning,
            "student_reasoning": student_reasoning,
            "concurrency": concurrency,
            "turns_per_speaker": turns_per_speaker,
            "tutor_system_prompt": tutor_system,
            "student_static_prompt": student_static,
        }
    )

    # The tutor speaks first; each side sees only spoken text. A pre-loaded message opens the
    # conversation.
    #
    # The first turn is an introduction, not the question. Real sessions do not open cold on an
    # assessment item, and opening on one gave every transcript the same abrupt shape. It also
    # gains something: the student's reply here is the cleanest read on their register, before any
    # subject matter is in play.
    #
    # No human name and no small talk. Left to itself the tutor invented one ("I'm Amit") and made
    # up a settling question, both of which vary run to run and neither of which is under study -
    # an unmeasured source of variance in the first thing the student ever sees. Naming the topic
    # and asking if they are ready is the same social opening with nothing improvised in it.
    #
    # Scoped to the first message explicitly - this stays in the tutor's context for the whole
    # conversation, so an unscoped "do not ask the question" would keep suppressing it.
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": tutor_system},
        {
            "role": "user",
            "content": (
                f"Begin the conversation. For this first message only: introduce yourself as the student's AI tutor. Say that today's topic is {config.topic}, and ask whether they are ready to start. Do not pose the learning question itself yet. From your next turn onward, move into the learning question and teach as your instructions. Address the student, not this message."
            ),
        },
    ]
    # The student turns hold spoken turns only; its static system prompt is prepended each turn.
    student_turns: list[dict[str, Any]] = []

    turn_id = 0
    reasoning_spent = {"tutor": 0, "student": 0}
    # Each iteration is one tutor turn followed by one student turn.
    for step in range(turns_per_speaker):
        # Tutor turn
        tutor_request = _completion_kwargs(tutor_model, messages, tutor_reasoning, tutor_model_params)
        logger.log_api_request({"timestamp": utc_now(), "role": "tutor", "payload": tutor_request})
        tutor_response, tutor_text, tutor_metrics = await _speak(
            tutor_request, concurrency, role="tutor", turn=turn_id
        )
        logger.log_api_response(
            {"timestamp": utc_now(), "role": "tutor", "raw_response": serialize_response(tutor_response), "metrics": tutor_metrics}
        )
        logger.log_transcript(
            {"timestamp": utc_now(), "turn_id": turn_id, "speaker": "tutor", "content": tutor_text, "metrics": tutor_metrics}
        )
        messages.append({"role": "assistant", "content": tutor_text})
        student_turns.append({"role": "user", "content": tutor_text})
        reasoning_spent["tutor"] += tutor_metrics.get("reasoning_tokens") or 0
        turn_id += 1

        # Student turn
        student_messages = [{"role": "system", "content": student_static}] + student_turns
        student_request = _completion_kwargs(student_model, student_messages, student_reasoning, student_model_params)
        logger.log_api_request({"timestamp": utc_now(), "role": "student", "payload": student_request})
        student_response, student_text, student_metrics = await _speak(
            student_request, concurrency, role="student", turn=turn_id
        )
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
        reasoning_spent["student"] += student_metrics.get("reasoning_tokens") or 0
        turn_id += 1

    # Reasoning tokens are recorded, not asserted. `tutor_reasoning` in the header says what was
    # *requested*; these say what was *spent*. On Gemini 3 the two disagree and cannot be made to
    # agree - see `catalog.reasoning_not_honoured` - so the transcript carries both.
    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "type": "session_end",
            "turns": turn_id,
            "reasoning_tokens_spent": reasoning_spent,
        }
    )
    return out_dir
