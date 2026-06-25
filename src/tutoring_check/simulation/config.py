"""The content spec for one simulation = one conversation (spec §1, §7).
The student is driven by the injected per-turn state alone (spec §0.2).
The learner's framing (learner vs. culture-sharer) follows from context_dependent + topic + region.
Run-level knobs (models, repeat index) live at the session call, not here.
"""
from __future__ import annotations

from dataclasses import dataclass

from tutoring_check.simulation.states import validate_sequence


@dataclass
class SessionConfig:
    scenario_id: str                 # topic / scenario id, recorded in the transcript
    context_dependent: bool          # CI vs CD: picks the state set, prompt frame, dimensions
    topic: str                       # human-readable topic name
    instruction: str                 # opening prompt
    state_sequence: list[str]        # fixed per-turn states; conversation length == len(sequence)
    language: str                    # language name, e.g. "English (US)"
    region: str = ""                 # CD only: the culture/region the student speaks from
    student_name: str = "Student"
    tutor_name: str = "Tutor"

    def __post_init__(self) -> None:
        # Fail fast on an authoring typo before any model is called.
        validate_sequence(self.state_sequence, self.context_dependent)
