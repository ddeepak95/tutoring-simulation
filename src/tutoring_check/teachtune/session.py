from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

from litellm import acompletion

from tutoring_check.teachtune.agents import (
    build_student_system_prompt,
    build_teacher_system_prompt,
    can_say_components,
)
from tutoring_check.teachtune.knowledge import KnowledgeStateTracker, reflect_coverage
from tutoring_check.teachtune.student_profile import generate_trait_overview
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now
from tutoring_check.teachtune.config import SessionConfig


async def run_teachtune_session(
    config: SessionConfig,
    *,
    teacher_model: str,
    student_model: str,
    output_root: Path,
) -> Path:
    run_id = str(uuid4())
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out_dir = output_root / f"{timestamp}_{run_id}"
    logger = JsonlLogger(out_dir=out_dir)

    component_names = list(config.knowledge_components)
    total = len(component_names)

    # Setup before the conversation loop
    trait_overview = await generate_trait_overview(config, model=student_model)
    student_system = build_student_system_prompt(config, trait_overview)
    teacher_system = build_teacher_system_prompt(config)  # static for the whole session
    tracker = KnowledgeStateTracker(component_names)

    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "type": "session_start",
            "topic": config.topic,
            "language": config.language,
            "student_name": config.student_name,
            "teacher_name": config.teacher_name,
            "trait_levels": {
                "academic_self_efficacy": config.academic_self_efficacy,
                "intrinsic_motivation": config.intrinsic_motivation,
                "academic_stress": config.academic_stress,
                "goal_commitment": config.goal_commitment,
            },
            "trait_overview": trait_overview,
            "knowledge_components": config.knowledge_components,
            "can_say_only": can_say_components(config),
            "misconceptions": config.misconceptions,
        }
    )

    # Conversation loop
    teacher_messages: list[dict[str, Any]] = [
        {"role": "system", "content": teacher_system},
        {"role": "user", "content": "Begin the tutoring session."},
    ]
    student_messages: list[dict[str, Any]] = [
        {"role": "system", "content": student_system},
    ]
    transcript: list[dict] = []

    end_reason = "turn_limit"
    for turn_index in range(config.num_turns):
        # Teacher turn
        teacher_request = {"model": teacher_model, "messages": teacher_messages}
        logger.log_api_request({"timestamp": utc_now(), "role": "teacher", "payload": teacher_request})
        teacher_response = await acompletion(**teacher_request)
        teacher_content = getattr(teacher_response.choices[0].message, "content", None) or ""
        logger.log_api_response(
            {"timestamp": utc_now(), "role": "teacher", "raw_response": serialize_response(teacher_response)}
        )
        logger.log_transcript(
            {"timestamp": utc_now(), "turn_index": turn_index, "role": "teacher", "content": teacher_content}
        )
        teacher_messages.append({"role": "assistant", "content": teacher_content})
        student_messages.append({"role": "user", "content": teacher_content})
        transcript.append({"role": "teacher", "content": teacher_content})

        # Student turn
        student_request = {"model": student_model, "messages": student_messages}
        logger.log_api_request({"timestamp": utc_now(), "role": "student", "payload": student_request})
        student_response = await acompletion(**student_request)
        student_content = getattr(student_response.choices[0].message, "content", None) or ""
        logger.log_api_response(
            {"timestamp": utc_now(), "role": "student", "raw_response": serialize_response(student_response)}
        )
        logger.log_transcript(
            {"timestamp": utc_now(), "turn_index": turn_index, "role": "student", "content": student_content}
        )
        student_messages.append({"role": "assistant", "content": student_content})
        teacher_messages.append({"role": "user", "content": student_content})
        transcript.append({"role": "student", "content": student_content})

        # Reflect: which components were covered in this exchange.
        indices = await reflect_coverage(
            transcript,
            component_names,
            model=teacher_model,
            teacher_name=config.teacher_name,
            student_name=config.student_name,
        )
        tracker.update(indices)
        logger.log_transcript(
            {
                "timestamp": utc_now(),
                "type": "knowledge_snapshot",
                "turn": turn_index + 1,
                "reflected_indices": indices,
                "covered_indices": sorted(tracker.covered_indices),
            }
        )

        if tracker.is_complete(total):
            end_reason = "coverage_complete"
            break

    covered = [component_names[i] for i in sorted(tracker.covered_indices)]
    uncovered = [n for i, n in enumerate(component_names) if i not in tracker.covered_indices]
    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "type": "session_end",
            "end_reason": end_reason,
            "covered": covered,
            "uncovered": uncovered,
            "covered_count": len(covered),
            "total_components": total,
        }
    )

    return out_dir
