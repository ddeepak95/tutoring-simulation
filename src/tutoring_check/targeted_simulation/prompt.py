"""Assemble the request that ends at the target turn (docs/target_turns.md §3).
The tutor gets the live simulation's own system prompt and opening instruction, then the script's
turns in the ordinary message roles, so nothing in the prefix marks it as prewritten.
"""
from __future__ import annotations

from typing import Any

from tutoring_check.simulation.config import SessionConfig
from tutoring_check.simulation.tutor import build_tutor_system_prompt
from tutoring_check.targeted_simulation.runset import TargetConfig
from tutoring_check.targeted_simulation.script import Script

# Copied verbatim from `simulation/session.py`, where it is inline in the messages list. It is kept
# because it is present in every live request, and its absence would shape the prefix differently
# from a real one; the first scripted turn must therefore be the introduction it asks for.
OPENING_INSTRUCTION = (
    "Begin the conversation. For this first message only: introduce yourself as the student's AI tutor. Say that today's topic is {topic}, and ask whether they are ready to start. Do not pose the learning question itself yet. From your next turn onward, move into the learning question and teach as your instructions. Address the student, not this message."
)


def _session_config(config: TargetConfig) -> SessionConfig:
    """Adapt a TargetConfig to the SessionConfig the shared prompt builder takes.
    Only region, topic, question and language are read; the rest are left empty.
    """
    return SessionConfig(
        scenario_id="",
        context_dependent=False,
        topic=config.topic,
        question=config.question,
        language=config.language,
        level="",
        persona_sections={},
        region=config.region,
    )


def build_tutor_system(config: TargetConfig) -> str:
    return build_tutor_system_prompt(_session_config(config))


def build_messages(script: Script, config: TargetConfig) -> list[dict[str, Any]]:
    """system + opening instruction + the scripted turns. The completion is the target turn."""
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": build_tutor_system(config)},
        {"role": "user", "content": OPENING_INSTRUCTION.format(topic=config.topic)},
    ]
    # Tutor turns are the assistant's own; student turns arrive as user messages. The script ends on
    # a student turn (enforced in script.py), so the model is left holding the target turn.
    for turn in script.conversation:
        role = "assistant" if turn.speaker == "tutor" else "user"
        messages.append({"role": role, "content": turn.text})
    return messages
