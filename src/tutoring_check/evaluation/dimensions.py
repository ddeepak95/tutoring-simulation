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
    """One mTeach dimension and the sub-aspects that describe its behavior. """
    key: str
    name: str
    category: Category
    sub_aspects: tuple[str, ...]


DIMENSIONS: tuple[Dimension, ...] = (
    # Instructional Ability (from LearnLM)
    Dimension(
        key="manage_cognitive_load",
        name="Manage Cognitive Load",
        category=Category.INSTRUCTIONAL_ABILITY,
        sub_aspects=("Explains the underlying concepts or skills clearly and understandably.",),
    ),
    Dimension(
        key="encourage_active_learning",
        name="Encourage Active Learning",
        category=Category.INSTRUCTIONAL_ABILITY,
        sub_aspects=(
            "Keeps the student actively participating, e.g. through questions or practice problems to answer.",
            "Guides the student to an answer with appropriate steps.",
        ),
    ),
    Dimension(
        key="deepen_metacognition",
        name="Deepen Metacognition",
        category=Category.INSTRUCTIONAL_ABILITY,
        sub_aspects=(
            "Gives clear feedback identifying any mistakes the student made.",
            "Gives clear feedback pointing out the student's successes.",
        ),
    ),
    Dimension(
        key="motivate_curiosity",
        name="Motivate & Stimulate Curiosity",
        category=Category.INSTRUCTIONAL_ABILITY,
        sub_aspects=(
            "Inspires and stimulates the student's interest or curiosity.",
            "Monitors the student's motivational state and adjusts responses accordingly.",
            "Delivers feedback, whether positive or negative, in an encouraging way.",
        ),
    ),
    Dimension(
        key="adapt_to_learners",
        name="Adapt to Learners' Goals and Needs",
        category=Category.INSTRUCTIONAL_ABILITY,
        sub_aspects=("Identifies the student's goal or prior knowledge.",),
    ),
    # Informational Quality (adapted from Wang & Strong).
    Dimension(
        key="intrinsic_dq",
        name="Intrinsic Data Quality",
        category=Category.INFORMATIONAL_QUALITY,
        sub_aspects=("Believability", "Objectivity", "Accuracy", "Reputation"),
    ),
    Dimension(
        key="contextual_dq",
        name="Contextual Data Quality",
        category=Category.INFORMATIONAL_QUALITY,
        sub_aspects=("Value-added", "Relevancy", "Timelessness", "Completeness", "Appropriate amount of data"),
    ),
    Dimension(
        key="representational_dq",
        name="Representational Data Quality",
        category=Category.INFORMATIONAL_QUALITY,
        sub_aspects=("Interpretability", "Ease of understanding", "Consistency", "Conciseness"),
    ),
    # Language Quality
    Dimension(
        key="fluency",
        name="Fluency",
        category=Category.LANGUAGE_QUALITY,
        sub_aspects=("Pace", "Filler words"),  # TODO
    ),
    Dimension(
        key="grammaticality",
        name="Grammaticality",
        category=Category.LANGUAGE_QUALITY,
        sub_aspects=("Grammaticality",),  # TODO
    ),
    Dimension(
        key="naturalness",
        name="Naturalness",
        category=Category.LANGUAGE_QUALITY,
        sub_aspects=("Naturalness",),  # TODO
    ),
    Dimension(
        key="vocabulary",
        name="Vocabulary",
        category=Category.LANGUAGE_QUALITY,
        sub_aspects=("Vocabulary",),  # TODO
    ),
)


DIMENSIONS_MAP: dict[str, Dimension] = {d.key: d for d in DIMENSIONS}


def dimension_keys() -> tuple[str, ...]:
    """The ordered dimension keys."""
    return tuple(d.key for d in DIMENSIONS)


def category_dimensions(category: Category) -> tuple[Dimension, ...]:
    """The dimensions in `category`, in registry order (the move vocabulary for that annotator)."""
    return tuple(d for d in DIMENSIONS if d.category is category)