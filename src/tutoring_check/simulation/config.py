"""The content spec for one simulation = one conversation (spec §1, §7).
The learner's framing (learner vs. culture-sharer) follows from context_dependent + topic + region.
Run-level knobs (models, repeat index) live at the session call, not here.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class SessionConfig:
    scenario_id: str                 # topic / scenario id, recorded in the transcript
    context_dependent: bool          # CI vs CD: picks the prompt frame and dimensions
    topic: str                       # human-readable topic name
    question: str                    # the question the student opens the conversation with
    language: str                    # language name, e.g. "English (US)"
    region: str = ""                 # the region the student is from (their profile), set from the run set
    student_name: str = "Jamie"
    tutor_name: str = "Tutor"
