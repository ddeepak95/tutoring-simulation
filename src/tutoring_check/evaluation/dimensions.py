"""The tutoring dimensions the evaluator scores on each tutor turn.

Every dimension names one countable leaf move, present or absent; leaves are grouped under a parent
category (evaluation.md "Dimensions").

Leaves are named Verb + Noun by what the tutor does: Elicit draws content out of the student, Provide
gives content or support, Request asks the student about their own process or state.

`description` is the move itself.
`forms` are the shapes the move commonly takes, which are illustrative and never exhaustive
`examples`/`non_examples` are actual utterances. (Not included now).

This module is the single source of truth for the dimension vocabulary.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Example:
    """One utterance that illustrates a dimension.

    `text` is the utterance; `note` is a short gloss on why it does (or does not) fit.
    """
    text: str
    note: str


@dataclass(frozen=True)
class Dimension:
    """One countable tutor move: its parent category, what it is, and how it commonly appears.

    `description` defines the move and is the test the tag is decided on. `forms` are the shapes it
    commonly takes; they illustrate the description and never bound it, so a turn that fits the
    description but matches no listed form is still an instance of the move.
    `examples` are utterances that are instances of the move; `non_examples` are near-misses that are
    not. Both are empty while the rubric is being piloted on descriptions alone.
    """
    key: str
    name: str
    category: str
    description: str
    forms: tuple[str, ...] = ()
    examples: tuple[Example, ...] = ()
    non_examples: tuple[Example, ...] = ()


DIMENSIONS: tuple[Dimension, ...] = (
    Dimension(
        key="elicit_recall",
        name="Elicit Recall",
        category="Understanding Check",
        description=(
            "Tutor asks the student for a general rule, principle, or formula from the subject matter. "
            "The student states it rather than using it."
        ),
        forms=(
            "Asking for a fact, definition, formula, law, or named principle.",
            "Asking for a sequence or set of steps.",
            "Asking what a worked case shows in general.",
        ),
    ),
    Dimension(
        key="elicit_application",
        name="Elicit Application",
        category="Understanding Check",
        description=(
            "Tutor asks the student to apply knowledge on a particular case. "
            "The student uses it rather than stating it."
        ),
        forms=(
            "Asking for a value to be computed or a problem to be solved end-to-end.",
            "Asking what happens under a stated condition.",
            "Asking for a real-life application.",
        ),
    ),
    Dimension(
        key="elicit_elaboration",
        name="Elicit Elaboration",
        category="Understanding Check",
        description=(
            "Tutor asks the student to justify or expand on something they said. "
            "The question can only be answered by referring back to the student's own words."
        ),
        forms=(
            "Asking for the reasoning behind an answer.",
            "Asking 'how' or 'why' about something they said.",
            "Asking for more detail on a point they made.",
        ),
    ),
    Dimension(
        key="elicit_summary",
        name="Elicit Summary",
        category="Understanding Check",
        description=(
            "Tutor asks the student to account for what has been covered. "
            "The scope is the lesson rather than any single point in it."
        ),
        forms=(
            "Asking for a summary of the lesson so far.",
            "Asking for an explanation of what they have learned.",
        ),
    ),
    Dimension(
        key="provide_explanation",
        name="Provide Explanation",
        category="Scaffolding",
        description="Tutor supplies knowledge directly rather than having the student produce it.",
        forms=(
            "Stating a concept, rule, or principle.",
            "Explaining a procedure or a line of reasoning.",
            "Working an example through.",
            "Giving an analogy or a comparison.",
        ),
    ),
    Dimension(
        key="provide_hint",
        name="Provide Hint",
        category="Scaffolding",
        description=(
            "Tutor points the student toward material they weren't already using. "
            "If the hint were removed, the student's task would be different. "
            "It does not spell out the material outright and is not material the question already sets up."
        ),
        forms=(
            "Naming a concept, law, or formula to use, without stating what it says.",
            "Proposing a case or step to try that the student was not already working with.",
            "Pointing at a feature or place to look that the student was not already working with.",
        ),
    ),
    Dimension(
        key="request_planning",
        name="Request Planning",
        category="Metacognition",
        description="Tutor asks the student to describe their planned approach.",
        forms=(
            "Asking which strategy they will use, and why.",
            "Asking for a prediction of possible challenges.",
            "Asking how to approach a similar problem differently next time.",
        ),
    ),
    Dimension(
        key="request_reflection",
        name="Request Reflection",
        category="Metacognition",
        description="Tutor asks the student to look back on their learning experience.",
        forms=(
            "Asking what was difficult or confusing.",
            "Asking what the student would do differently.",
            "Asking how the student's understanding has changed.",
        ),
    ),
    Dimension(
        key="request_status",
        name="Request Status",
        category="Metacognition",
        description=(
            "Tutor asks the student to report whether they are following."
        ),
        forms=(
            "Asking if it makes sense.",
            "Asking if the student has any questions.",
            "Asking whether to continue or go over it again.",
            "Asking how confident or comfortable the student feels.",
        ),
    ),
    Dimension(
        key="provide_encouragement",
        name="Provide Encouragement",
        category="Affective Support",
        description="Tutor offers affective/motivational support directed at the student as a person independent "
        "of whether their answer was correct.",
        forms=(
            "Praising the student's effort or persistence.",
            "Affirming the student's progress.",
            "Reassuring the student that a difficulty, mistake, or confusion is normal.",
            "Expressing confidence in the student's ability to succeed.",
        ),
    ),
    Dimension(
        key="provide_confirmation",
        name="Provide Confirmation",
        category="Affective Support",
        description=(
            "Tutor evaluates the correctness of the student's answer rather than the student as a person. "
            "Restating what the student thinks, without assessing it, is not enough."
        ),
        forms=(
            "Explicitly confirming the correctness of the student's answer, whether stated plainly or as praise.",
        ),
    ),
    Dimension(
        key="provide_contextualization",
        name="Provide Contextualization",
        category="Personalized Contextualization",
        description=(
            "Tutor draws on this student's own life or surroundings rather than a generic setting. "
            "Any mention counts, including one that carries on a setting already introduced earlier."
        ),
        forms=(
            "Using a scenario from the student's region or local surroundings (e.g. plants, landmarks).",
            "Drawing on the student's stated interests or information about themselves.",
            "Using local units.",
        ),
    ),
)


DIMENSIONS_MAP: dict[str, Dimension] = {d.key: d for d in DIMENSIONS}


@dataclass(frozen=True)
class ScaleLevel:
    """One point on an ordinal rating scale: its integer value, what that value means, and sample utterances."""
    value: int
    descriptor: str
    examples: tuple[str, ...] = ()


@dataclass(frozen=True)
class ScaleDimension:
    """One dimension rated on an ordinal scale rather than tagged present or absent.

    Every tutor turn gets exactly one `value` from `levels`; there is no "absent".
    """
    key: str
    name: str
    category: str
    criteria: str
    levels: tuple[ScaleLevel, ...]

    def values(self) -> tuple[int, ...]:
        """The allowed integer values, low to high."""
        return tuple(level.value for level in self.levels)


def dimension_keys() -> tuple[str, ...]:
    """The ordered keys of the dimensions the evaluator tags."""
    return tuple(d.key for d in DIMENSIONS)



def categories() -> tuple[str, ...]:
    """The parent categories of the move dimensions, in order, without repeats."""
    seen: list[str] = []
    for d in DIMENSIONS:
        if d.category not in seen:
            seen.append(d.category)
    return tuple(seen)
