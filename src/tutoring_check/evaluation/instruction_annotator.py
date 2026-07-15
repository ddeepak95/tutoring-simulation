"""Assemble the Instructional Ability annotator's prompts and structured-output schema.

The annotator identifies which Instructional Ability moves a tutor turn makes,
adapted from a per-utterance move-tagging prompt with a math context (National Tutoring Observatory RND).
"""
from __future__ import annotations

from tutoring_check.evaluation.dimensions import DIMENSIONS, Dimension
from tutoring_check.evaluation.transcript import Transcript

_MOVES: tuple[Dimension, ...] = DIMENSIONS


def _move_catalog_entry(d: Dimension) -> str:
    """Render one move as its name, key, criterion, and the examples that bound it."""
    lines = [f"- {d.name} [{d.key}]: {d.criteria}"]
    for ex in d.examples:
        lines.append(f"    - Counts: {ex.counts}")
        lines.append(f"      Doesn't count: {ex.doesnt_count}")
        lines.append(f"      Why: {ex.why}")
    return "\n".join(lines)


def build_system_prompt() -> str:
    """The fixed move-counting annotator system prompt."""
    catalog = "\n".join(_move_catalog_entry(d) for d in _MOVES)
    return (
        "You are an expert tutor.\n"
        "Your task is to identify every move the tutor made in the turn marked inside <target_turn>.\n\n"
        "Workflow\n"
        "1. Read the dialogue.\n"
        "2. Tag every instance of a move from the *Allowed Moves* list in the marked turn.\n"
        "Allowed Moves\n"
        f"{catalog}\n\n"
        "Clarifications (follow these exactly):\n"
        "- Return **only** moves from the Allowed Moves list by their key, no synonyms or casing changes.\n"
        "- Tag only the marked <target_turn>; use the rest of the dialogue as context only.\n"
        "- The moves are not mutually exclusive: the same turn may carry multiple moves.\n\n"
        "- A single sentence or phrase may exhibit more than one move. Each turn has at most one instance of any move.\n\n"
        "Output your choices into the JSON structure where:\n"
        "move = the move's key from the Allowed Moves list.\n"
        # TODO: add few-shot examples based on performance
    )


def mark_dialogue(transcript: Transcript, target_turn_id: int) -> str:
    """Render the full conversation with `target_turn_id` wrapped in <target_turn>; all instruction lives in the system prompt."""
    lines: list[str] = []
    for t in transcript.turns:
        speaker = "Tutor" if t.is_tutor else "Student"
        line = f"[{t.turn_id}] {speaker}: {t.content}"
        if t.turn_id == target_turn_id:
            line = f"<target_turn>\n{line}\n</target_turn>"
        lines.append(line)
    return "\n".join(lines)


def response_format() -> dict:
    """The structured-output schema: the set of move keys present on the marked turn.

    Each turn has at most one instance of any move, so the annotator returns each present
    move key at most once; the evaluator turns this into a 0/1 vector over `dimension_keys()`.
    """
    keys = [d.key for d in _MOVES]
    return {
        "type": "json_schema",
        "json_schema": {
            "name": "tutoring_moves",
            "schema": {
                "type": "object",
                "properties": {
                    "moves": {
                        "type": "array",
                        "items": {"type": "string", "enum": keys},
                        "uniqueItems": True,
                    }
                },
                "required": ["moves"],
                "additionalProperties": False,
            },
        },
    }
