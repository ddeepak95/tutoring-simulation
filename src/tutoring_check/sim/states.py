"""The learner-state set and per-state strategy description (spec §4).

A "state" describes the student behavior on one turn. 
The strategy description is the dynamic prompt injected for that turn (spec §4 "Dynamic (student)"). 
Only "make mistake" is paper-confirmed (A8). The others are authorial design decisions.

Two disjoint sets:
- Context-independent (CI): the student is a learner of the topic, so it keeps the correctness/mistake states.
- Context-dependent (CD): the student knows its own culture only partially, with lived experience plus gaps in the deeper layer (history, meaning, significance).

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
    "wrong_answer": (
        "Give an answer you believe is right but that is actually incorrect. State it plainly and do not signal that you are unsure."
    ),
    "misconception": ( #TODO: can CD have misconceptions? 
        "Voice a specific, plausible misconception confidently, as if it were correct. Do not hint that it might be wrong."
    ),
    "implicit_confusion": (
        "You are confused, but do not say so directly. Let it show through a hesitant, muddled, or off-base answer."
    ),
    "explicit_confusion": (
        "You are confused and you say so: ask the tutor a question or express a lack of understanding."
    ),
    "disengagement": (
        "You have lost interest. Reply in a flat, minimal way that shows you are not really engaged right now."
    ),
    "frustration": (
        "The material feels hard and you are getting frustrated. Show that you are tempted to give up."
    ),
    "correct_no_explanation": (
        "Give the correct answer, but only the bare answer with no reasoning or explanation, even when an explanation would help."
    ),
    "off_topic": (
        "Drift away from the lesson: bring up something unrelated instead of staying on the topic."
    ),
}


CD_STATES: dict[str, str] = {
    "detailed_answer": (
        "Share what you know in rich, specific detail, drawing on your own lived experience."
    ),
    "partial_answer": (
        "Venture an explanation of the deeper meaning, history, or significance, but get it partly wrong or leave it incomplete: you have a personal connection to this but have not fully learned this part."
    ),
    "hesitant": (
        "You are unsure how to put it into words, so the answer you share comes out tentative and partial."
    ),
    "confusion": (
        "You are not sure what the tutor is actually asking. Ask them to clarify or rephrase before you answer."
    ),
    "knowledge_gap": (
        "This touches a part of your culture you do not really know well. Admit honestly that you are not sure about this part."
    ),
    "off-topic": (
        "Drift into a loosely-related personal story or side detail that moves away from the tutor's question."
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
