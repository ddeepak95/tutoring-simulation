"""The tutoring dimensions the evaluator scores on each tutor turn.

Most dimensions name one countable leaf move, present or absent; leaves are grouped under a parent
category (evaluation.md "Dimensions").
Affective support is the exception: a turn always has some tone, so it is a 1-5 rating from neutral to
positive rather than a move that is present or absent.

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
        key="eliciting_knowledge",
        name="Eliciting Knowledge",
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
        name="Eliciting Real-World Application of Knowledge",
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
        key="follow_up_probing",
        name="Follow-up Probing",
        category="Checking Understanding",
        criteria=(
            "Tutor asks a question that goes deeper on the student's immediately preceding answer — a "
            "natural next question that presses further on what the student just said, rather than "
            "opening a new thread."
        ),
        examples=(
            Example(
                text="You said the ball falls because it's heavy — so what would happen if it weighed half as much?",
                note="Presses directly on the claim the student just made.",
            ),
            Example(
                text="Okay, and why do you think the air pushes back harder at higher speeds?",
                note="Digs a layer deeper into the reason the student just gave.",
            ),
        ),
        non_examples=(
            Example(
                text="Let's move on — can you tell me what density means?",
                note="Opens a new thread instead of going deeper on the last answer.",
            ),
        ),
    ),
    Dimension(
        key="understanding_checkpoint",
        name="Understanding Checkpoint",
        category="Checking Understanding",
        criteria=(
            "Tutor asks the student to restate, summarize, or explain the concept back in their own "
            "words to confirm they have it, rather than to reason toward a new answer."
        ),
        examples=(
            Example(
                text="Can you put in your own words why the two balls land at the same time?",
                note="Asks the student to explain the concept back to confirm understanding.",
            ),
            Example(
                text="Before we go on, how would you summarize what we just figured out?",
                note="A checkpoint asking the student to summarize the concept.",
            ),
        ),
    ),
    Dimension(
        key="hinting",
        name="Hinting",
        category="Scaffolding",
        criteria=(
            "Tutor gives partial guidance — a directional nudge or draws attention to a feature — "
            "that helps the student take the next step without solving it for them. Usually phrased as "
            "a question that points the student toward the next step."
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
        key="planning_ahead",
        name="Planning Ahead",
        category="Metacognitive Prompting",
        criteria=(
            "Tutor asks the student to plan or think ahead about their own approach or process before "
            "acting — reasoning about how they will proceed, not just reasoning through the content."
        ),
        examples=(
            Example(text="Explain how you will set up that equation.", note="Asking student to plan their process out loud."),
            Example(text="Before you start, what's your plan for tackling this problem?", note="Prompting the student to plan ahead."),
        ),
        non_examples=(
            Example(
                text="Explain your thinking.",
                note="Eliciting reasoning about their response, not reasoning about their thinking.",
            ),
        ),
    ),
    Dimension(
        key="reflecting_back",
        name="Reflecting Back",
        category="Metacognitive Prompting",
        criteria=(
            "Tutor asks the student to reflect back on their own thinking, choices, or process after the "
            "fact — reasoning about a step they already took, not just reasoning through the content."
        ),
        examples=(
            Example(text="What made you decide to use subtraction there?", note="Reflecting on a choice already made."),
            Example(text="Looking back, what would you do differently next time?", note="Reflecting on their own process after the fact."),
        ),
        non_examples=(
            Example(
                text="Explain your thinking.",
                note="Eliciting reasoning about their response, not reasoning about their thinking.",
            ),
        ),
    ),
    Dimension(
        key="cultural_regional_grounding",
        name="Cultural/Regional Grounding",
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


@dataclass(frozen=True)
class ScaleLevel:
    """One point on an ordinal rating scale: its integer value and what that value means."""
    value: int
    descriptor: str


@dataclass(frozen=True)
class ScaleDimension:
    """One dimension rated on an ordinal scale rather than tagged present or absent.

    Every tutor turn gets exactly one `value` from `levels`; there is no "absent", since a turn always
    carries some tone.
    """
    key: str
    name: str
    category: str
    criteria: str
    levels: tuple[ScaleLevel, ...]

    def values(self) -> tuple[int, ...]:
        """The allowed integer values, low to high."""
        return tuple(level.value for level in self.levels)


# Affective support, rated 1 (neutral) to 5 (strongly positive). This replaces the former
# positive-encouragement and neutral-acknowledgment moves: warmth is a matter of degree, so a single
# turn's tone is better placed on a scale than split across two present/absent tags.
AFFECTIVE_TONE = ScaleDimension(
    key="affective_tone",
    name="Affective Tone",
    category="Affective Support",
    criteria=(
        "How warm the tutor's tone is toward the student, from neutral and matter-of-fact to explicitly "
        "positive and encouraging. Rate the affective coloring of the whole turn, not whether any "
        "content was correct."
    ),
    levels=(
        ScaleLevel(1, "Neutral: purely informational, no affective coloring."),
        ScaleLevel(2, "Acknowledging: registers the student's state or names a misconception as common, without warmth."),
        ScaleLevel(3, "Mildly encouraging: light, passing affirmation of the student."),
        ScaleLevel(4, "Warm: clear affirmation of the student's thinking, effort, or progress."),
        ScaleLevel(5, "Strongly positive: explicit praise or celebration of the student's effort or progress."),
    ),
)

SCALES: tuple[ScaleDimension, ...] = (AFFECTIVE_TONE,)

SCALES_MAP: dict[str, ScaleDimension] = {s.key: s for s in SCALES}


def dimension_keys() -> tuple[str, ...]:
    """The ordered keys of the present/absent move dimensions the evaluator tags."""
    return tuple(d.key for d in DIMENSIONS)


def scale_keys() -> tuple[str, ...]:
    """The ordered keys of the ordinal scale dimensions the evaluator rates."""
    return tuple(s.key for s in SCALES)