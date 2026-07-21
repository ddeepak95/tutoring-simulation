"""The tutoring-move dimensions the evaluator counts on each tutor turn.

Each dimension names one countable leaf move; leaves are grouped under a parent category (evaluation.md "Dimensions").
The evaluator counts how many instances of each leaf dimension a tutor turn contains.

This module is the single source of truth for the move vocabulary.
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
    """One countable tutor move: its parent category, criterion, and illustrating utterances.

    `examples` are utterances that are instances of the move; `non_examples` are near-misses that are not.
    Either list may be empty.
    """
    key: str
    name: str
    category: str
    criteria: str
    examples: tuple[Example, ...] = ()
    non_examples: tuple[Example, ...] = ()


DIMENSIONS: tuple[Dimension, ...] = (
    Dimension(
        key="comprehension_check",
        name="Comprehension Check",
        category="Checking Understanding",
        criteria=(
            "Tutor asks a question that surfaces what the student knows or believes, "
            "probing recall of a definition or basic comprehension of the content."
        ),
        examples=(
            Example(text="What does 'velocity' mean?", note="Directly probing recall of a definition."),
            Example(text="Can you tell me what the variables mean in this equation?", note="Checking basic comprehension."),
            Example(text="How has the temperature changed?", note="Checking solving skills."),
        ),
    ),
    Dimension(
        key="eliciting_reasoning",
        name="Eliciting Reasoning/Justification",
        category="Checking Understanding",
        criteria=(
            "Tutor asks the student to justify or reason through a specific claim made by "
            "the tutor or the student, beyond just supplying an answer."
        ),
        examples=(
            Example(
                text="Elaborating on the 'tusk-hunting cultures' you mentioned, how have elephants adapted?",
                note="Asking them to justify a specific claim.",
            ),
            Example(
                text="Why do you think the volume of the liquid expanded?",
                note="Probing the reasoning behind a claim made by the teacher or student.",
            ),
        ),
    ),
    Dimension(
        key="eliciting_application",
        name="Eliciting Application of Knowledge",
        category="Checking Understanding",
        criteria=(
            "Tutor asks the student to apply a concept or transfer it to a new context or example."
        ),
        examples=(
            Example(
                text="Can you give me an example of where you'd use the Pythagorean theorem in real life?",
                note="Asking them to apply a concept.",
            ),
            Example(
                text="Where else have you seen fractions show up outside of math class?",
                note="Prompting transfer to new contexts.",
            ),
        ),
    ),
    Dimension(
        key="hinting",
        name="Hinting",
        category="Scaffolding",
        criteria=(
            "Tutor gives partial guidance — a directional nudge or draws attention to a feature — "
            "that helps the student take the next step without solving it for them."
        ),
        examples=(
            Example(
                text="Think about what happens to the equation if you move everything to one side.",
                note="Directional nudge but doesn't solve it.",
            ),
            Example(
                text="For the next step, what do you notice about the two denominators?",
                note="Draws attention to a feature and prompts the next step.",
            ),
        ),
    ),
    Dimension(
        key="explaining",
        name="Explaining",
        category="Scaffolding",
        criteria=(
            "Tutor gives direct instruction, elaboration, a worked example, or an analogy that "
            "supplies content to the student."
        ),
        examples=(
            Example(
                text="So the equals sign means both sides have to stay balanced, like a scale. Whatever you do to one side, you do to the other.",
                note="Analogy.",
            ),
            Example(text="Actually, X-rays and gamma rays differ in frequency.", note="Direct explanation."),
        ),
    ),
    Dimension(
        key="metacognition",
        name="Metacognitive Prompting",
        category="Metacognitive Prompting",
        criteria=(
            "Tutor asks the student to reflect on or plan their own thinking or process explicitly — "
            "reasoning about their thinking, not just reasoning through the content."
        ),
        examples=(
            Example(text="Explain how you will set up that equation.", note="Asking student to plan their process out loud."),
            Example(text="What made you decide to use subtraction there?", note="Reflecting on a choice already made."),
        ),
        non_examples=(
            Example(
                text="Explain your thinking.",
                note="Eliciting reasoning about their response, not reasoning about their thinking.",
            ),
        ),
    ),
    Dimension(
        key="positive_encouragement",
        name="Positive Encouragement",
        category="Affective Support",
        criteria=(
            "Tutor gives explicit positive affirmation of the student's thinking, effort, or progress."
        ),
        examples=(
            Example(text="That's a strong connection!", note="Positive affirmation of their thinking."),
            Example(
                text="I can see how hard you've been working on this, and it's paying off.",
                note="Acknowledging effort and progress.",
            ),
        ),
    ),
    Dimension(
        key="neutral_acknowledgment",
        name="Neutral Acknowledgment",
        category="Affective Support",
        criteria=(
            "Tutor validates the student's emotional state or experience without cheerleading — "
            "including acknowledging a misconception as common."
        ),
        examples=(
            Example(text="I hear you — that part does feel confusing.", note="Validating the experience without cheerleading."),
            Example(text="That's a very common thought.", note="Acknowledging their misconception."),
        ),
    ),
    Dimension(
        key="personalized_contextualization",
        name="Personalized Contextualization",
        category="Personalized Contextualization",
        criteria=(
            "Framing a concept using a scenario, context, or reference drawn from this specific "
            "student's known region, background, or interests."
        ),
        examples=(
            Example(
                text="Imagine making 10 empanadas, and your friend ate 3 of them.",
                note="Frames the problem around a food tied to the student's background.",
            ),
            Example(
                text="If you must pay a 18% tip on top of a 10% tax, how much additional cost did you have to pay?",
                note="Tipping and tax norms vary by region, so this frames the problem around the student's regional context.",
            ),
        ),
    ),
)


DIMENSIONS_MAP: dict[str, Dimension] = {d.key: d for d in DIMENSIONS}


def dimension_keys() -> tuple[str, ...]:
    """The ordered dimension keys (the move vocabulary the evaluator counts)."""
    return tuple(d.key for d in DIMENSIONS)