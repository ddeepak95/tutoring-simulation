"""Assemble the Instructional Ability annotator's prompts and structured-output schema.

The annotator identifies which Instructional Ability moves a tutor turn makes,
adapted from a per-utterance move-tagging prompt with a math context (National Tutoring Observatory RND).
"""
from __future__ import annotations

from tutoring_check.evaluation.dimensions import DIMENSIONS, SCALES, Dimension, ScaleDimension
from tutoring_check.evaluation.transcript import Transcript

_MOVES: tuple[Dimension, ...] = DIMENSIONS
_SCALES: tuple[ScaleDimension, ...] = SCALES


def _move_catalog_entry(d: Dimension) -> str:
    """Render one move as its name, key, criterion, and the examples that bound it."""
    lines = [f"- {d.name} [{d.key}]: {d.criteria}"]
    for ex in d.examples:
        lines.append(f"    - Counts: {ex.text} ({ex.note})")
    for ex in d.non_examples:
        lines.append(f"    - Doesn't count: {ex.text} ({ex.note})")
    return "\n".join(lines)


def _move_catalog() -> str:
    """Render the allowed moves grouped under their parent categories, preserving order."""
    lines: list[str] = []
    current_category: str | None = None
    for d in _MOVES:
        if d.category != current_category:
            current_category = d.category
            lines.append(f"{current_category}")
        lines.append(_move_catalog_entry(d))
    return "\n".join(lines)


def _scale_catalog() -> str:
    """Render each scale-rated dimension as its criterion and the meaning of every rating level."""
    lines: list[str] = []
    for s in _SCALES:
        lines.append(f"{s.category}")
        lines.append(f"- {s.name} [{s.key}]: {s.criteria}")
        for level in s.levels:
            lines.append(f"    - {level.value} = {level.descriptor}")
    return "\n".join(lines)


def build_system_prompt() -> str:
    """The fixed annotator system prompt: tag the present moves and rate the scale dimensions."""
    catalog = _move_catalog()
    scales = _scale_catalog()
    return (
        "You are an expert tutor.\n"
        "Your task is to identify every move the tutor made in the turn marked inside <target_turn>, "
        "and to rate that turn on each scaled dimension.\n\n"
        "Workflow\n"
        "1. Read the dialogue.\n"
        "2. Tag every instance of a move from the *Allowed Moves* list in the marked turn.\n"
        "3. Give the marked turn one rating for each dimension in *Scaled Dimensions*.\n"
        "Allowed Moves\n"
        f"{catalog}\n\n"
        "Scaled Dimensions\n"
        f"{scales}\n\n"
        "Clarifications (follow these exactly):\n"
        "- Return **only** moves from the Allowed Moves list by their key, no synonyms or casing changes.\n"
        "- Tag only the marked <target_turn>; use the rest of the dialogue as context only.\n"
        "- Tag each turn independently: if a move's behavior is present, tag it even if it also appeared in an earlier turn.\n"
        "- The moves are not mutually exclusive: the same turn may carry multiple moves.\n"
        "- A single sentence or phrase may exhibit more than one move. Each turn has at most one instance of any move.\n"
        "- Every scaled dimension gets exactly one integer rating from its listed levels; a turn always has a tone, so there is no 'absent'.\n\n"
        "Output your choices into the JSON structure where:\n"
        "move = the move's key from the Allowed Moves list.\n"
        "each scaled dimension's key = its integer rating.\n"
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
    """The structured-output schema: the present move keys plus one integer rating per scale dimension.

    Each turn has at most one instance of any move, so the annotator returns each present move key at
    most once; the evaluator turns this into a 0/1 vector over `dimension_keys()`. Each scale dimension
    is a required integer constrained to its allowed values.
    """
    keys = [d.key for d in _MOVES]
    properties: dict = {
        "moves": {
            "type": "array",
            "items": {"type": "string", "enum": keys},
            "uniqueItems": True,
        }
    }
    for s in _SCALES:
        properties[s.key] = {"type": "integer", "enum": list(s.values())}
    return {
        "type": "json_schema",
        "json_schema": {
            "name": "tutoring_moves",
            "schema": {
                "type": "object",
                "properties": properties,
                "required": ["moves", *(s.key for s in _SCALES)],
                "additionalProperties": False,
            },
        },
    }
