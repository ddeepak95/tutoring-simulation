from __future__ import annotations

import asyncio
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

from litellm import acompletion

from tutoring_check.schemas import ResolvedSession


END_CONVERSATION_TOOL = {
    "type": "function",
    "function": {
        "name": "end_conversation",
        "description": (
            "End the conversation gracefully. Call this when: (1) the student explicitly "
            "refuses to answer, or (2) the student has thoroughly answered the question "
            "according to the rubric. Always provide a polite closing message in the "
            "conversation language."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "enum": ["refusal", "thorough"],
                    "description": "Why the conversation is ending.",
                },
                "message": {
                    "type": "string",
                    "description": "Polite closing message in the same language.",
                },
            },
            "required": ["reason", "message"],
            "additionalProperties": False,
        },
    },
}


@dataclass
class SessionResult:
    run_set_item_id: str
    run_id: str
    output_dir: Path


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _serialize_response(response: Any) -> Any:
    if hasattr(response, "model_dump"):
        return response.model_dump(mode="json")
    return json.loads(json.dumps(response, default=str))


class JsonlLogger:
    def __init__(self, out_dir: Path):
        self.out_dir = out_dir
        self.transcript_path = out_dir / "transcript.jsonl"
        self.api_path = out_dir / "api_responses.jsonl"
        self.request_path = out_dir / "api_requests.jsonl"
        self.out_dir.mkdir(parents=True, exist_ok=True)

    def _append(self, path: Path, record: dict) -> None:
        with path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

    def log_transcript(self, record: dict) -> None:
        self._append(self.transcript_path, record)

    def log_api_response(self, record: dict) -> None:
        self._append(self.api_path, record)

    def log_api_request(self, record: dict) -> None:
        self._append(self.request_path, record)


def _teacher_system_prompt(session: ResolvedSession) -> str:
    criteria_lines = "\n".join(f"- {c}" for c in session.criteria)
    return (
        f"You are a Socratic teacher conducting a tutoring conversation in {session.language_name} "
        f"({session.language_locale}).\n\n"
        f"Target question:\n{session.question}\n\n"
        f"Rubric checklist:\n{criteria_lines}\n\n"
        "Rules:\n"
        "- Ask short probing questions and follow-ups.\n"
        "- Do not dump the full answer in one message.\n"
        "- Keep the conversation in the target language.\n"
        "- When the student has answered sufficiently according to the rubric, "
        "call end_conversation with reason='thorough'.\n"
        "- If the student explicitly refuses to answer, call end_conversation with reason='refusal'.\n"
    )


def _student_system_prompt(session: ResolvedSession) -> str:
    misconception_lines = "\n".join(f"- {m}" for m in session.misconceptions)
    return (
        f"You are a student in a tutoring session. Respond only in {session.language_name} "
        f"({session.language_locale}).\n\n"
        "You may hold these misconceptions or partial understandings:\n"
        f"{misconception_lines}\n\n"
        "Answer naturally and conversationally. Do not list these misconceptions directly."
    )


async def run_single_session(
    session: ResolvedSession,
    output_root: Path,
) -> SessionResult:
    run_id = str(uuid4())
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out_dir = output_root / f"{timestamp}_{run_id}"
    logger = JsonlLogger(out_dir=out_dir)

    teacher_system = _teacher_system_prompt(session)
    student_system = _student_system_prompt(session)

    teacher_messages: list[dict[str, Any]] = [
        {"role": "system", "content": teacher_system},
        {"role": "user", "content": "Begin the tutoring session."}
    ]
    student_messages: list[dict[str, Any]] = [
        {"role": "system", "content": student_system},
        {"role": "user", "content": "The teacher is starting the tutoring session. Respond as the student."}
    ]

    turn_index = 0
    while True:
        teacher_request = {
            "model": session.teacher_litellm_model,
            "messages": teacher_messages,
            "tools": [END_CONVERSATION_TOOL],
            "tool_choice": "auto",
        }
        logger.log_api_request(
            {
                "timestamp": _utc_now(),
                "role": "teacher",
                "run_set_item_id": session.run_set_item_id,
                "topic_id": session.topic_id,
                "misconception_set_id": session.misconception_set_id,
                "language_id": session.language_id,
                "payload": teacher_request,
            }
        )
        teacher_response = await acompletion(**teacher_request)
        teacher_message = teacher_response.choices[0].message
        logger.log_api_response(
            {
                "timestamp": _utc_now(),
                "role": "teacher",
                "model_preset_id": session.teacher_model_id,
                "litellm_model": session.teacher_litellm_model,
                "run_set_item_id": session.run_set_item_id,
                "topic_id": session.topic_id,
                "misconception_set_id": session.misconception_set_id,
                "language_id": session.language_id,
                "raw_response": _serialize_response(teacher_response),
            }
        )

        tool_calls = getattr(teacher_message, "tool_calls", None) or []
        if tool_calls:
            end_call = next(
                (
                    call
                    for call in tool_calls
                    if getattr(call.function, "name", None) == "end_conversation"
                ),
                None,
            )
            if end_call is not None:
                arguments_raw = getattr(end_call.function, "arguments", "{}")
                try:
                    arguments = json.loads(arguments_raw)
                except json.JSONDecodeError:
                    arguments = {"reason": "thorough", "message": str(arguments_raw)}
                logger.log_transcript(
                    {
                        "timestamp": _utc_now(),
                        "turn_index": turn_index,
                        "role": "teacher_tool",
                        "tool_name": "end_conversation",
                        "content": arguments,
                    }
                )
                break

        teacher_content = getattr(teacher_message, "content", None) or ""
        logger.log_transcript(
            {
                "timestamp": _utc_now(),
                "turn_index": turn_index,
                "role": "teacher",
                "content": teacher_content,
            }
        )
        teacher_messages.append({"role": "assistant", "content": teacher_content})
        student_messages.append({"role": "user", "content": teacher_content})

        student_request = {
            "model": session.student_litellm_model,
            "messages": student_messages,
        }
        logger.log_api_request(
            {
                "timestamp": _utc_now(),
                "role": "student",
                "run_set_item_id": session.run_set_item_id,
                "topic_id": session.topic_id,
                "misconception_set_id": session.misconception_set_id,
                "language_id": session.language_id,
                "payload": student_request,
            }
        )
        student_response = await acompletion(**student_request)
        student_message = student_response.choices[0].message
        student_content = getattr(student_message, "content", None) or ""
        logger.log_api_response(
            {
                "timestamp": _utc_now(),
                "role": "student",
                "model_preset_id": session.student_model_id,
                "litellm_model": session.student_litellm_model,
                "run_set_item_id": session.run_set_item_id,
                "topic_id": session.topic_id,
                "misconception_set_id": session.misconception_set_id,
                "language_id": session.language_id,
                "raw_response": _serialize_response(student_response),
            }
        )
        logger.log_transcript(
            {
                "timestamp": _utc_now(),
                "turn_index": turn_index,
                "role": "student",
                "content": student_content,
            }
        )

        student_messages.append({"role": "assistant", "content": student_content})
        teacher_messages.append({"role": "user", "content": student_content})
        turn_index += 1

        await asyncio.sleep(0)

    return SessionResult(run_set_item_id=session.run_set_item_id, run_id=run_id, output_dir=out_dir)
