"""Run one conversation = one simulation, and log it (spec §6, §7).
Tutor-first, alternating; the fixed state sequence is walked one state per student turn.
The state label is stored on the student turn but never shown to the tutor (spec §0.3).
Comparability comes from the fixed student model + params + seed + state sequence, not identical wording.
"""
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

from litellm import acompletion

from tutoring_check.sim.config import SessionConfig
from tutoring_check.sim.student import build_student_system_prompt, build_state_injection
from tutoring_check.sim.tutor import build_tutor_system_prompt
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now


def _completion_kwargs(model: str, messages: list[dict], seed: int, temperature: float | None) -> dict:
    """Assemble litellm kwargs, omitting temperature when not set so the provider default applies."""
    kwargs: dict[str, Any] = {"model": model, "messages": messages, "seed": seed}
    if temperature is not None:
        kwargs["temperature"] = temperature
    return kwargs


async def run_session(
    config: SessionConfig,
    *,
    tutor_model: str,
    student_model: str,
    output_root: Path,
    seed: int,
    temperature: float | None = None,
    tutor_prompt_variant: str = "baseline",
) -> Path:
    run_id = str(uuid4())
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out_dir = output_root / f"{timestamp}_{run_id}"
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
            "tutor_prompt_variant": tutor_prompt_variant,
            "student_model": student_model,
            "student_params": {"seed": seed, "temperature": temperature},
            "seed": seed,
            "state_sequence": list(config.state_sequence),
            "tutor_system_prompt": tutor_system,
            "student_static_prompt": student_static,
        }
    )

    # The tutor sees only spoken text; it is seeded with a kickoff so it opens the conversation.
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": tutor_system},
        {"role": "user", "content": "Begin the conversation. Do not reply to this message. "},
    ]
    # The student turns hold spoken turns only; its system prompt is rebuilt each turn with the injection.
    student_turns: list[dict[str, Any]] = []

    turn_id = 0
    for state_name in config.state_sequence:
        # Tutor turn
        tutor_request = _completion_kwargs(tutor_model, messages, seed, temperature)
        logger.log_api_request({"timestamp": utc_now(), "role": "tutor", "payload": tutor_request})
        tutor_response = await acompletion(**tutor_request)
        tutor_text = getattr(tutor_response.choices[0].message, "content", None) or ""
        logger.log_api_response(
            {"timestamp": utc_now(), "role": "tutor", "raw_response": serialize_response(tutor_response)}
        )
        logger.log_transcript(
            {"timestamp": utc_now(), "turn_id": turn_id, "speaker": "tutor", "content": tutor_text}
        )
        messages.append({"role": "assistant", "content": tutor_text})
        student_turns.append({"role": "user", "content": tutor_text})
        turn_id += 1

        # Student turn: inject the current state into a freshly-built system prompt
        student_system = student_static + "\n\n" + build_state_injection(config, state_name)
        student_messages = [{"role": "system", "content": student_system}] + student_turns
        student_request = _completion_kwargs(student_model, student_messages, seed, temperature)
        logger.log_api_request({"timestamp": utc_now(), "role": "student", "payload": student_request})
        student_response = await acompletion(**student_request)
        student_text = getattr(student_response.choices[0].message, "content", None) or ""
        logger.log_api_response(
            {"timestamp": utc_now(), "role": "student", "raw_response": serialize_response(student_response)}
        )
        logger.log_transcript(
            {
                "timestamp": utc_now(),
                "turn_id": turn_id,
                "speaker": "student",
                "content": student_text,
                "state": state_name,
            }
        )
        student_turns.append({"role": "assistant", "content": student_text})
        messages.append({"role": "user", "content": student_text})
        turn_id += 1

    logger.log_transcript(
        {"timestamp": utc_now(), "type": "session_end", "turns": turn_id}
    )
    return out_dir
