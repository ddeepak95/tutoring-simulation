from __future__ import annotations

from dataclasses import dataclass


@dataclass
class SessionConfig:
    """Declarative spec for a single tutoring session (one student, one topic).

    Carries
    1. Content (topic, knowledge components, misconceptions)
    2. Student psychology (the four trait scores)
    3. Student and teacher names used throughout the prompts.

    `knowledge_components` maps each concept to its mastery (1-5), a frozen condition.

    `misconceptions` is retained as logged metadata only.
    The subset invariant (a misconception is always about a known component) is a sanity check.
    """

    topic: str
    instruction: str                          # authored teaching directive placed inside <instruction>
    knowledge_components: dict[str, int]      # concept name -> initial mastery 1-5
    misconceptions: dict[str, str]            # concept name -> misconception string (logged only)
    num_turns: int
    language: str
    region: str = ""                          # cultural/geographic context the student speaks from
    context_dependent: bool = False           # True -> student speaks from own background, not a forget-and-learn frame
    student_name: str = "Student"
    teacher_name: str = "Teacher"
    academic_self_efficacy: int = 3           # 1-5
    intrinsic_motivation: int = 3             # 1-5
    academic_stress: int = 3                  # 1-5
    goal_commitment: int = 3                  # 1-5

    def __post_init__(self) -> None:
        unknown = set(self.misconceptions) - set(self.knowledge_components)
        if unknown:
            raise ValueError(
                "misconceptions keys must be a subset of knowledge_components keys; "
                f"unknown components: {sorted(unknown)}"
            )


def create_pilot_profiles() -> list[SessionConfig]:
    """Three maximally-different students on ONE fixed topic, for the prompt-sensitivity pilot. """
    topic = "Photosynthesis basics"
    instruction = "Explain how photosynthesis works step by step."
    return [
        # A: low knowledge, low motivation.
        SessionConfig(
            topic=topic,
            instruction=instruction,
            knowledge_components={
                "gas exchange (CO2 in, O2 out)": 1,
                "glucose as stored energy": 1,
                "role of sunlight": 2,
                "light-dependent reactions": 1,
            },
            misconceptions={
                "gas exchange (CO2 in, O2 out)": "Plants take in oxygen and release carbon dioxide.",
                "glucose as stored energy": "A plant uses the food it makes right away and stores none of it.",
            },
            num_turns=8,
            language="English (US)",
            student_name="Avery",
            intrinsic_motivation=1,
        ),
        # B: medium knowledge, high stress.
        SessionConfig(
            topic=topic,
            instruction=instruction,
            knowledge_components={
                "gas exchange (CO2 in, O2 out)": 3,
                "glucose as stored energy": 2,
                "role of sunlight": 3,
                "light-dependent reactions": 2,
            },
            misconceptions={
                "glucose as stored energy": "A plant uses the food it makes right away and stores none of it.",
            },
            num_turns=8,
            language="English (US)",
            student_name="Blake",
            academic_stress=5,
        ),
        # C: high knowledge, high self-efficacy.
        SessionConfig(
            topic=topic,
            instruction=instruction,
            knowledge_components={
                "gas exchange (CO2 in, O2 out)": 5,
                "glucose as stored energy": 4,
                "role of sunlight": 5,
                "light-dependent reactions": 4,
            },
            misconceptions={},
            num_turns=8,
            language="English (US)",
            student_name="Casey",
            academic_self_efficacy=5,
        ),
    ]
