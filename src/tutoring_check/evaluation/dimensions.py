"""The tutoring-move dimensions the evaluator counts on each tutor turn.

Each dimension names one kind of tutor move; the evaluator counts how many instances of each dimension a tutor turn contains (evaluation.md "Dimensions").

This module is the single source of truth for the move vocabulary.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Example:
    """A contrasting pair that bounds one dimension.

    `counts` is an utterance that is an instance of the dimension; `doesnt_count` is a
    near-miss that is not an instance of it; `why` explains the boundary.
    """
    counts: str
    doesnt_count: str
    why: str


@dataclass(frozen=True)
class Dimension:
    """One countable tutor move: its criterion and the examples that bound it. """
    key: str
    name: str
    criteria: str
    examples: tuple[Example, ...]


DIMENSIONS: tuple[Dimension, ...] = (
    Dimension(
        key="understanding_checks",
        name="Understanding Checks",
        criteria=(
            "Tutor asks a question aimed purely at finding out what the student currently "
            "understands, with no new information supplied and no justification demanded."
        ),
        examples=(
            Example(
                counts="What do you think happens when you multiply two negatives?",
                doesnt_count="Remember, a negative times a negative is positive — does that make sense?",
                why="The second sentence supplies the rule first, so it's Hints/Explanations, not a pure check.",
            ),
            Example(
                counts="Can you tell me in your own words what the question is asking?",
                doesnt_count="You said the area is 24 — how did you get that?",
                why="The second demands justification for a claim already made, so it's Asking for Justification.",
            ),
            Example(
                counts="Where are you feeling stuck right now?",
                doesnt_count="\"Does that make sense?\" asked reflexively after every explanation",
                why="Still technically a check — count it (quality is judged separately), don't exclude it.",
            ),
            Example(
                counts="Before we move on, what's the formula we just used?",
                doesnt_count="What's your plan for solving this?",
                why="The second asks about strategy, not content understanding, so it's Metacognition.",
            ),
        ),
    ),
    Dimension(
        key="hints_explanations",
        name="Hints/Explanations",
        criteria=(
            "Tutor supplies a hint, partial or full explanation, worked example, analogy, "
            "elaboration, or any kind of information."
        ),
        examples=(
            Example(
                counts="Here's a similar example: 2² × 2³ = 2⁵.",
                doesnt_count="What's 2 to the power of 3?",
                why="The second is a content-free arithmetic question with no hint or explanation attached — an Understanding Check.",
            ),
            Example(
                counts="Inertia is an object's resistance to being accelerated.",
                doesnt_count="What would that tell us about how all objects fall, regardless of their weight?",
                why="The second is a question that checks the student's understanding, not an explanation — an Understanding Check.",
            ),
            Example(
                counts="Think about what happens to the sign when you flip a fraction.",
                doesnt_count="Good job!",
                why="No content supplied — this is Positive Affective Behavior instead.",
            ),
        ),
    ),
    Dimension(
        key="asking_for_justification",
        name="Asking for Justification",
        criteria=(
            "Tutor requires the student to justify, evidence, or elaborate on a claim the "
            "student has already made."
        ),
        examples=(
            Example(
                counts="Why do you think the answer is?",
                doesnt_count="What do you think the answer is?",
                why="The second asks for an answer, not justification of one already given — Understanding Check.",
            ),
            Example(
                counts="Where in the passage does it say that?",
                doesnt_count="Can you re-read the passage?",
                why="The second is an instruction, not a demand for evidence of a specific claim.",
            ),
            Example(
                counts="Why does that method work?",
                doesnt_count="Nice, that's correct!",
                why="Simple confirmation with no push for reasoning doesn't count.",
            ),
            Example(
                counts="Explain your reasoning.",
                doesnt_count="Are you sure?",
                why="If the tutor never actually requires reasoning and just moves on, don't count it.",
            ),
        ),
    ),
    Dimension(
        key="metacognition",
        name="Metacognition",
        criteria=(
            "Tutor prompts awareness of the student's own thinking, strategy, planning, or "
            "self-monitoring — not the correctness of content."
        ),
        examples=(
            Example(
                counts="What's your plan before you start solving?",
                doesnt_count="What's the first step in solving this equation?",
                why="The second is content-specific, not the student's personal approach — Understanding Check.",
            ),
            Example(
                counts="How did you know that strategy would work?",
                doesnt_count="How did you get 42?",
                why="The second asks about the calculation, not the strategy choice — likely Asking for Justification.",
            ),
            Example(
                counts="Looking back, would you approach this differently next time?",
                doesnt_count="Good work today!",
                why="No reflection prompted — Positive Affective Behavior.",
            ),
            Example(
                counts="How do you usually check your own work?",
                doesnt_count="Can you check your work?",
                why="The second is an instruction to perform an action, not a prompt to articulate process — count only if the phrasing asks the student to explain, not just do.",
            ),
        ),
    ),
    Dimension(
        key="positive_affective_behavior",
        name="Positive Affective Behavior",
        criteria=(
            "An explicit affirming, encouraging, or collaborative statement — not just neutral "
            "politeness or task language."
        ),
        examples=(
            Example(
                counts="You're really getting the hang of this!",
                doesnt_count="Okay, let's continue.",
                why="Neutral transition, no affect.",
            ),
            Example(
                counts="I know this is frustrating, but you're making real progress.",
                doesnt_count="That's incorrect, try again.",
                why="Neutral/corrective, no warmth marker.",
            ),
            Example(
                counts="Let's figure this one out together.",
                doesnt_count="Please solve the next problem.",
                why="Plain instruction, no collaborative framing.",
            ),
            Example(
                counts="That was a great question to ask.",
                doesnt_count="Thanks.",
                why="Bare politeness, not encouragement about the student's thinking specifically.",
            ),
        ),
    ),
    Dimension(
        key="cultural_responsiveness",
        name="Cultural Responsiveness",
        criteria=(
            "Tutor references or actively builds on the student's specific background, community, "
            "or lived experience — not just generic real-world examples."
        ),
        examples=(
            Example(
                counts="You mentioned your family runs a bakery — how might they scale up a recipe? That's the same ratio idea.",
                doesnt_count="Think of it like a recipe — if you double the batch...",
                why="The second is a generic analogy available to any student, not tied to this student's actual background.",
            ),
            Example(
                counts="Does this match how your community measures distances or time?",
                doesnt_count="In real life, people use fractions when cooking.",
                why="Generic real-world framing isn't tied to the specific student.",
            ),
            Example(
                counts="Tutor adapts an example after the student mentions their home country's currency.",
                doesnt_count="Tutor uses dollars by default without ever asking or adapting.",
                why="No engagement with background at all.",
            ),
            Example(
                counts="I remember you said you play soccer — let's use field dimensions for this problem.",
                doesnt_count="Let's use a soccer field as an example.",
                why="The second doesn't reference anything the student actually shared.",
            ),
        ),
    ),
)


DIMENSIONS_MAP: dict[str, Dimension] = {d.key: d for d in DIMENSIONS}


def dimension_keys() -> tuple[str, ...]:
    """The ordered dimension keys (the move vocabulary the evaluator counts)."""
    return tuple(d.key for d in DIMENSIONS)
