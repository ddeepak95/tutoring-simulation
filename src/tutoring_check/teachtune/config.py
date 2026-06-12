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
    knowledge_components: dict[str, int]      # concept name -> initial mastery 1-5
    misconceptions: dict[str, str]            # concept name -> misconception string (logged only)
    num_turns: int
    language: str
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


def create_example_configs() -> list[SessionConfig]:
    return [
        SessionConfig(
            topic="Photosynthesis basics",
            knowledge_components={
                "role of sunlight": 1,
                "light-dependent reactions": 1,
                "gas exchange (CO2 in, O2 out)": 2,
                "glucose as stored energy": 2,
            },
            misconceptions={
                "gas exchange (CO2 in, O2 out)": "Plants take in oxygen and release carbon dioxide.",
            },
            num_turns=8,
            language="English (US)",
        ),
        SessionConfig(
            topic="The water cycle",
            knowledge_components={
                "evaporation": 3,
                "condensation": 2,
                "precipitation": 2,
                "collection": 1,
            },
            misconceptions={
                "condensation": "Clouds are made of water vapor rather than tiny liquid droplets.",
            },
            num_turns=8,
            language="English (US)",
        ),
        SessionConfig(
            topic="Basic fractions",
            knowledge_components={
                "numerator and denominator": 3,
                "equivalent fractions": 1,
                "comparing fractions": 2,
            },
            misconceptions={
                "comparing fractions": "A fraction with a bigger denominator is always larger.",
            },
            num_turns=8,
            language="English (US)",
            academic_self_efficacy=2,
            intrinsic_motivation=2,
            academic_stress=4,
            goal_commitment=3,
        ),
    ]
