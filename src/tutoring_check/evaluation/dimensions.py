"""The mTeach dimensions and their per-turn move definitions.

Each dimension is a bundle of sub-aspects; a move is tagged when the behavior those
sub-aspects describe is exhibited on the turn (evaluation.md "Dimensions").

This module is the single source of truth for the move vocabulary: the Instructional
Ability dimensions are the moves the annotator may tag (evaluation.md "Current scope").
"""
from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class Category(str, Enum):
    """The three mTeach dimension categories. """
    INSTRUCTIONAL_ABILITY = "instructional_ability"
    INFORMATIONAL_QUALITY = "informational_quality"
    LANGUAGE_QUALITY = "language_quality"


@dataclass(frozen=True)
class Dimension:
    """One mTeach dimension, the criterion describing its behavior, and its allowed labels. """
    key: str
    name: str
    category: Category
    criteria: str
    labels: tuple[str, ...]


# The label set shared by most dimensions.
_THREE_POINT: tuple[str, ...] = ("Yes", "To an extent", "No")


DIMENSIONS: tuple[Dimension, ...] = (
    # Instructional Ability
    Dimension(
        key="mistake_identification",
        name="Mistake Identification",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Has the tutor identified/recognized a mistake in a student's response?",
        labels=_THREE_POINT,
    ),
    Dimension(
        key="mistake_location",
        name="Mistake Location",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Does the tutor's response accurately point to a genuine mistake and its location?",
        labels=_THREE_POINT,
    ),
    Dimension(
        key="revealing_answer",
        name="Revealing the Answer",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Does the tutor reveal the final answer (whether correct or not)?",
        labels=("Yes (and correct)", "Yes (and incorrect)", "No"),
    ),
    Dimension(
        key="providing_guidance",
        name="Providing Guidance",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Does the tutor offer correct and relevant guidance, such as an explanation, elaboration, hint, examples, and so on?",
        labels=_THREE_POINT,
    ),
    Dimension(
        key="actionability",
        name="Actionability",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Is it clear from the tutor's feedback what the student should do next?",
        labels=_THREE_POINT,
    ),
    Dimension(
        key="coherence",
        name="Coherence",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Is the tutor's response logically consistent with the student's previous responses?",
        labels=_THREE_POINT,
    ),
    Dimension(
        key="tutor_tone",
        name="Tutor Tone",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Is the tutor's response encouraging, neutral, or offensive?",
        labels=("Encouraging", "Neutral", "Offensive"),
    ),
    Dimension(
        key="human_likeness",
        name="Human-likeness",
        category=Category.INSTRUCTIONAL_ABILITY,
        criteria="Does the tutor's response sound natural rather than robotic or artificial?",
        labels=_THREE_POINT,
    ),
)


DIMENSIONS_MAP: dict[str, Dimension] = {d.key: d for d in DIMENSIONS}


def dimension_keys() -> tuple[str, ...]:
    """The ordered dimension keys."""
    return tuple(d.key for d in DIMENSIONS)


def category_dimensions(category: Category) -> tuple[Dimension, ...]:
    """The dimensions in `category`, in registry order (the move vocabulary for that annotator)."""
    return tuple(d for d in DIMENSIONS if d.category is category)