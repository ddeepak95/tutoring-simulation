"""Assembly of the student prompt: a fixed static part + a per-turn dynamic injection (spec §4).

The static prompt sets the learner role and framing and is fixed for the whole conversation.
The dynamic injection is the current state's strategy, rebuilt each student turn.
"""
from __future__ import annotations

from tutoring_check.sim.config import SessionConfig
from tutoring_check.sim.states import state_set


def build_student_system_prompt(config: SessionConfig) -> str:
    """The static student system prompt for the conversation.
    CI frames the student as a learner of the topic; CD frames it as someone sharing their own culture.
    """
    student = config.student_name
    tutor = config.tutor_name
    if config.context_dependent:  # TODO: refine framing wording
        intro = (
            f"You are {student}, a student from {config.region} sharing about {config.topic} from your own culture and lived experience. "
            f"Your conversation partner is {tutor}, a tutor.\n"
        )
    else:  # TODO: refine framing wording
        intro = (
            f"You are {student}, a student learning about {config.topic}. "
            f"Your conversation partner is {tutor}, a tutor.\n"
        )
    return (
        intro
        # TODO: Behavior rules.
        + "Your messages should be in natural language, as if you are talking out loud in a two-way conversation, "
        "and should not include lists, bullet points, or other formatting.\n"
        f"Respond in {config.language}."
    )


def build_state_injection(config: SessionConfig, state_name: str) -> str:
    """The per-turn instruction for one student turn.

    Delivered as a trailing message so it sits at the generation point.
    """
    strategy = state_set(config.context_dependent)[state_name]
    lines = [
        "For your next reply only. This takes priority over the flow above: ",
        f"{strategy}",
        "Always keep it to a sentence or two, the way people actually talk.",
    ]
    if config.context_dependent:
        lines.append("Answer from your own culture and lived experience. ")
    return "\n".join(lines)