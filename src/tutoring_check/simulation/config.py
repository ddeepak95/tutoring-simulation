"""The content spec for one simulation = one conversation (spec §1, §7).
The learner's framing (learner vs. culture-sharer) follows from context_dependent + topic + region.
Run-level knobs (models, repeat index) live at the session call, not here.
"""
from __future__ import annotations

from dataclasses import dataclass

# The student personas, modelling the kinds of learner we want to compare.
# All are middle schoolers who do not understand the concept at the start; they differ in how
# readily they get there - the standard student follows an explanation and often lands on the
# right idea, the struggling one has thin prior knowledge and needs several passes, the advanced
# one gets there fast and pushes the teacher past the opening question. The Personality section
# for each lives in `student.PERSONALITY`; the ids live here so a run-set item can name one.
STANDARD = "standard"
STRUGGLING = "struggling"
ADVANCED = "advanced"
PERSONAS = (STANDARD, STRUGGLING, ADVANCED)


@dataclass
class SessionConfig:
    scenario_id: str                 # topic / scenario id, recorded in the transcript
    context_dependent: bool          # CI vs CD: picks the prompt frame and dimensions
    topic: str                       # human-readable topic name
    question: str                    # the question the student opens the conversation with
    language: str                    # language name, e.g. "English (US)"
    region: str = ""                 # the region the student is from (their profile), set from the run set
    persona: str = STANDARD          # which student persona speaks, one of PERSONAS
    student_name: str = "Jamie"
    tutor_name: str = "Tutor"
