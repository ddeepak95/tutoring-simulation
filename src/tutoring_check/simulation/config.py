"""The content spec for one simulation = one conversation (spec §1, §7).
The learner's framing (learner vs. culture-sharer) follows from context_dependent + topic + region.
Run-level knobs (models, repeat index) live at the session call, not here.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class PedagogyLevel(str, Enum):
    """The level a tutor is asked to exhibit a pedagogical approach at.
    The value is the label used verbatim in the tutor prompt.
    """
    VERY_LOW = "Very Low"
    LOW = "Low"
    NEUTRAL = "Neutral"
    HIGH = "High"
    VERY_HIGH = "Very High"


@dataclass
class SessionConfig:
    scenario_id: str                 # topic / scenario id, recorded in the transcript
    context_dependent: bool          # CI vs CD: picks the prompt frame and dimensions
    topic: str                       # human-readable topic name
    question: str                    # the question the student opens the conversation with
    language: str                    # language name, e.g. "English (US)"
    region: str = ""                 # CD only: the culture/region the student speaks from
    student_name: str = "Jamie"
    tutor_name: str = "Tutor"
    # approach name -> assigned level, from the run set; the tutor exhibits each at its level.
    pedagogy_levels: dict[str, PedagogyLevel] = field(default_factory=dict)
