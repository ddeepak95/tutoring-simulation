"""The learner-state set and per-state strategy description (spec §4).

A "state" describes the student behavior on one turn. 
The strategy description is the dynamic prompt injected for that turn (spec §4 "Dynamic (student)"). 
Only "make mistake" is paper-confirmed (A8). The others are authorial design decisions.

Two disjoint sets:
- Context-independent (CI): the student is a learner of the topic, so it keeps the correctness/mistake states.
- Context-dependent (CD): the student knows its own culture only partially. Lived experience and personal meaning are authoritative; anything outside it (the factual record, or customs it has never practiced) can be wrong or unknown.

An ordered sequence of these states are used for the simulation.
"""
from __future__ import annotations

CI_STATES: dict[str, str] = {
    "correct_answer": (
        "Answer the tutor's question correctly and briefly, the way you actually understand it."
    ),
    "partial_answer": (
        "Give an answer that is partly right but incomplete: you grasp some of it but leave out or get fuzzy on the rest."
    ),
    "misconception": (
        "Voice a specific, plausible misconception, as if it were correct. Do not hint that it might be wrong."
    ),
    "implicit_confusion": (
        "You are confused, but do not say so directly. Let it show through a hesitant, muddled answer."
    ),
    "explicit_confusion": (
        "You are confused and you say so: ask the tutor a question or express a lack of understanding."
    ),
    "frustration": (
        "You are getting a little frustrated and discouraged, and it is not clicking. Show it lightly, not dramatically."
    ),
    "correct_no_explanation": (
        "Give the correct answer, but only the bare answer with no reasoning or explanation, even when an explanation would help."
    ),
    "off_topic": (
        "Drift off the lesson onto a tangent the topic sparked: a curious side question or 'what about...' that is related to the subject but pulls away from what the tutor is trying to get at."
    ),
}


CD_STATES: dict[str, str] = {
    "detailed_answer": (
        "Share what you know firsthand in rich, specific detail, drawing on your own lived experience and what this means to you."
    ),
    "partial_answer": (
        "Try to explain something beyond your own lived experience, such as the origin, history, or meaning of a name, or a custom you do not practice yourself, "
        "but get a detail wrong or leave the explanation incomplete: you have a personal connection here, but have not fully learned this part."
    ),
    "misconception": (
        "Voice a specific, plausible but incorrect claim about something beyond your own lived experience, such as an origin, a date, or a general custom you do not practice yourself, "
        "stated as if it were correct. Do not hint that it might be wrong. This is never about your own lived experience."
    ),
    "knowledge_gap": (
        "This touches a part of your culture you do not really know, having neither lived it nor learned its background. "
        "Admit that briefly and naturally, in your own words, without elaborating."
    ),
    "hesitant": (
        "You half-remember the factual background but are unsure how to put it into words, "
        "so it comes out short, tentative, and trailing off."
    ),
    "confusion": (
        "You are not sure what the tutor is asking. Briefly ask them to clarify or rephrase before you answer."
    ),
    "off_topic": (
        "Drift into a loosely-related personal story or side detail that moves away from the conversation."
    ),
    "disengagement": (
        "You have lost interest. Reply in a flat, minimal way that shows you are not really engaged right now."
    ),
}


def state_set(context_dependent: bool) -> dict[str, str]:
    """Return the state set in force for this scenario type."""
    return CD_STATES if context_dependent else CI_STATES


def validate_sequence(sequence: list[str], context_dependent: bool) -> None:
    """Raise ValueError if any state name is not in the set for this scenario type.

    Called before the conversation so an authoring typo fails fast, before any API cost.
    """
    known = state_set(context_dependent)
    unknown = [name for name in sequence if name not in known]
    if unknown:
        kind = "context-dependent" if context_dependent else "context-independent"
        raise ValueError(
            f"unknown {kind} state(s) {unknown}; known states: {sorted(known)}"
        )
