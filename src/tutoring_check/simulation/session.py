"""Run one conversation = one simulation, and log it (spec §6, §7).
Tutor-first, alternating; the fixed state sequence is walked one state per student turn.
The state label is stored on the student turn but never shown to the tutor (spec §0.3).
Comparability comes from the fixed student model + state sequence, not identical wording.
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from litellm import acompletion

from tutoring_check.simulation.config import SessionConfig
from tutoring_check.simulation.student import build_student_system_prompt, build_state_injection
from tutoring_check.simulation.tutor import build_tutor_system_prompt
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now


def _completion_kwargs(model: str, messages: list[dict]) -> dict:
    """Assemble litellm kwargs; the provider's default sampling applies."""
    return {"model": model, "messages": messages}


async def run_session(
    config: SessionConfig,
    *,
    tutor_model: str,
    student_model: str,
    output_root: Path,
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
            "state_sequence": list(config.state_sequence),
            "tutor_system_prompt": tutor_system,
            "student_static_prompt": student_static,
        }
    )

    # The tutor sees only spoken text; the pre-loaded message opens the conversation.
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": tutor_system},
        {
            "role": "user",
            "content": (
                "Begin the conversation. Open by posing the full problem from your instructions to the "
                "student. Address the student, not this message."
            ),
        },
    ]
    # The student turns hold spoken turns only; its system prompt is rebuilt each turn with the injection.
    student_turns: list[dict[str, Any]] = []

    turn_id = 0
    # One extra iteration past the states: each iteration opens with a tutor turn, so the final pass
    # captures the tutor's response to the last student turn before breaking. This is an ordinary
    # tutor turn, not a wrap-up; we do not assume the conversation has ended.
    for step in range(len(config.state_sequence)):
        # Tutor turn
        tutor_request = _completion_kwargs(tutor_model, messages)
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
        
        state_name = config.state_sequence[step]

        # Student turn: static system prompt up front, current state instruction folded onto the
        # end of the latest tutor turn so it sits at the generation point. Appending it as its own
        # message would make two consecutive user turns, which some providers (e.g. Anthropic) reject;
        # merging keeps the message list strictly alternating for every provider.
        *prior_turns, latest_tutor = student_turns
        student_messages = (
            [{"role": "system", "content": student_static}]
            + prior_turns
            + [
                {
                    "role": "user",
                    "content": latest_tutor["content"] + "\n\n" + build_state_injection(config, state_name),
                }
            ]
        )
        student_request = _completion_kwargs(student_model, student_messages)
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
