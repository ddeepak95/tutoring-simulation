"""The content spec for one simulation = one conversation (spec §1, §7).
The learner's framing (learner vs. culture-sharer) follows from context_dependent + topic + region.
Run-level knobs (models, repeat index) live at the session call, not here.
"""
from __future__ import annotations

from dataclasses import dataclass, field

from tutoring_check.personas.profile import StudentProfile

# One "turn" in a transcript is one message, so a conversation runs 2 x this many. A run-set item
# overrides it with `turns_per_speaker`, and the value used is written into the transcript header.
#
# It lives here rather than in `session.py` because `catalog.py` needs it as a dataclass default and
# must not import `session` - that would pull litellm into `personas.cli lint`, which deliberately
# defers importing the simulation package so linting still works while it is mid-edit.
TURNS_PER_SPEAKER = 10


@dataclass
class SessionConfig:
    scenario_id: str                 # topic / scenario id, recorded in the transcript
    context_dependent: bool          # CI vs CD: picks the prompt frame and dimensions
    topic: str                       # human-readable topic name
    question: str                    # the question the student opens the conversation with
    language: str                    # language name, e.g. "English (US)"
    # The student level this cell runs, one of `personas.levels.LEVELS`. The persona itself is
    # rendered deterministically from the level and the topic's misconception library, so these
    # fields are the whole record of which student spoke.
    level: str
    persona_sections: dict[str, str]        # rendered by `personas.render.build_sections`
    traits: dict[str, str] = field(default_factory=dict)   # the resolved trait vector, for the transcript
    misconception_id: str = ""
    region: str = ""                 # the region the student is from (their profile), set from the run set
    # Name, age, grade and languages. These reach the prompt only through `persona_sections`, which
    # already has them rendered; the object is kept so the transcript header can record which
    # profile spoke without re-parsing the prompt.
    student: StudentProfile | None = None
    tutor_name: str = "Tutor"
