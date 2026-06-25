"""Assemble the Instructional Ability annotator's prompts and structured-output schema.

The annotator identifies which Instructional Ability moves a tutor turn makes,
adapted from a per-utterance move-tagging prompt with a math context (National Tutoring Observatory RND).
"""
from __future__ import annotations

from tutoring_check.evaluation.dimensions import (
    Category,
    Dimension,
    category_dimensions,
)
from tutoring_check.evaluation.transcript import Transcript

_MOVES: tuple[Dimension, ...] = category_dimensions(Category.INSTRUCTIONAL_ABILITY)

def build_system_prompt() -> str:
    """The fixed Instructional Ability annotator system prompt."""
    # A string list where each move has a name, key, and joined sub-aspects.
    catalog = "\n".join(f"- {d.name} [{d.key}]: {' '.join(d.sub_aspects)}" for d in _MOVES)
    return (
        "You are an expert tutor.\n"
        "Your task is to identify every move the tutor made (tutor turns are marked inside <target_turn>).\n\n"
        "Workflow\n"
        "1. Read the dialogue.\n"
        "2. Map each tutor move to an utterance from the *Allowed Moves* list below.\n"
        "3. Omit any turns that are not marked a tutor turn.\n\n" #Diverges from omitting "off-topic, administrative, or not directly about solving the math prompt"
        "Allowed Moves\n"
        f"{catalog}\n\n"
        "Clarifications (follow these exactly):\n"
        "- Return **only** moves from the Allowed Moves list by their key-no synonyms or casing changes.\n"
        "- **Omit** any turns that are not marked a tutor turn.\n\n"
        "Output your choices into the JSON structure where:\n"
        "move = the move's key from the Allowed Moves list.\n"
        "location = an exact, verbatim substring of the marked turn where the move occurs.\n"
        "reasoning = the reason you chose this move explained in English.\n"
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
    """The structured-output schema: a list of tagged moves (evaluation.md "Schema")."""
    keys = [d.key for d in _MOVES]
    move_schema = {
        "type": "object",
        "properties": {
            "move": {"type": "string", "enum": keys},
            "location": {"type": "string"},
            "reasoning": {"type": "string"},
        },
        "required": ["move", "location", "reasoning"],
        "additionalProperties": False,
    }
    return {
        "type": "json_schema",
        "json_schema": {
            "name": "instructional_ability_moves",
            "schema": {
                "type": "object",
                "properties": {"moves": {"type": "array", "items": move_schema}},
                "required": ["moves"],
                "additionalProperties": False,
            },
        },
    }
