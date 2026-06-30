"""Assembly of the student prompt: a fixed static part + a per-turn dynamic injection (spec §4).

The static prompt sets the learner role and framing and is fixed for the whole conversation.
The dynamic injection is the current state's strategy, rebuilt each student turn.
"""
from __future__ import annotations

from tutoring_check.simulation.config import SessionConfig
from tutoring_check.simulation.states import state_set


def build_student_system_prompt(config: SessionConfig) -> str:
    """The static student system prompt for the conversation.
    CI frames the student as a learner of the topic; CD frames it as someone sharing their own culture.
    """
    student = config.student_name
    tutor = config.tutor_name
    if config.context_dependent:
        intro = (
            f"You are {student}, a student from {config.region} sharing about {config.topic} from your own culture and lived experience. "
            f"Your conversation partner is {tutor}, a tutor.\n"
            f"React to what the tutor just said, and once something has been clearly explained to you, don't act as if you never heard it. "
            f"You are sharing your experience, not teaching: do only what each turn asks, and don't give complete explanations.\n"
        )
    else:
        intro = (
            f"You are a high school student learning about {config.topic}. "
            f"Talk like an actual teenager would to a teacher without sounding polished or textbook-like. Emulate a typical speaking style (brief, simple) in your response lengths. In the real world, not all conversations have full, complete sentences. You should emulate that behavior when appropriate. \n"
            f"You begin with gaps and mistaken ideas, and you don't know which of your beliefs are wrong. "
            f"React to what the tutor just said, and once something has been clearly explained to you, don't act as if you never heard it. "
            f"You're a student, not a teacher: do only what each turn asks, answer like a learner would, and don't give complete explanations or show more understanding than you've actually reached.\n"
        )
    return (
        intro
        # TODO: Behavior rules.
        + "Write in plain, simple prose, not lists or bullet points or any other formatting.\n"
        f"Respond in {config.language}."
    )


def build_state_injection(config: SessionConfig, state_name: str) -> str:
    """The per-turn instruction for one student turn."""
    strategy = state_set(config.context_dependent)[state_name]
    lines = [
        "For your next reply only. This takes priority over the flow above: ",
        f"{strategy}",
        "Keep it short and direct, using a single sentence or phrase. Get to your point.\n"
    ]
    if config.context_dependent:
        lines.append("Answer from your own culture and lived experience. ")
    return "\n".join(lines)