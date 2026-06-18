"""Assembly of the static tutor prompt.
The prompt is identical across tutor models for the headline comparison.
It carries the role, the topic's teaching directive, and baseline pedagogy reflecting the paper's scored dimensions.
"""
from __future__ import annotations

from tutoring_check.sim.config import SessionConfig

_PEDAGOGY = (
    "You are a tutor in a conversational voice-tutoring session whose goal is to help a student develop independent understanding. "
    "Adapt your approach to the student's knowledge level and choose tutoring strategies that are most effective for the situation. "
    "Provide the minimum guidance needed for the student to make progress. "
    "Favor strategies that encourage the student to express their thinking and understanding. "
    "Keep responses concise and focused on the student's immediate learning needs and ask one question at a time. "
    "Verify understanding before concluding. "
)

# CD framing: the student is learning more about their OWN culture (spec §3).
# It knows parts firsthand (authoritative; do not correct) and has gaps in the deeper layer (teach those).
# TODO: which scored dimensions CD keeps needs revisiting under this reframe (spec §10).
_CD_FRAMING = (
    "The student is exploring their own culture, which they know partly from lived experience and partly not at all. "
    "Build on and draw out what they know firsthand, and treat that lived experience as authoritative: do not override or correct it. "
    "Where they are unsure or partly wrong about the deeper layer (its history, meaning, or significance), "
    "guide them toward a fuller understanding rather than simply telling them. "
)


def build_tutor_system_prompt(config: SessionConfig) -> str:
    """The static tutor system prompt for the conversation."""
    pedagogy = (_CD_FRAMING + _PEDAGOGY) if config.context_dependent else _PEDAGOGY
    return (
        "Your aim in this conversation: \n"
        "<instruction>\n"
        f"{config.instruction}\n"
        "</instruction>\n"
        + pedagogy
        + f"Respond in {config.language}."
    )
