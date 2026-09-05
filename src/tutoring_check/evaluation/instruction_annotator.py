"""Assemble the annotator's prompts and structured-output schema.

The annotator returns the keys of the moves a tutor turn makes, and the evaluator turns them into a 0/1
vector. Reasoning comes from the model's `reasoning_effort`.

`PROMPT_VERSIONS` holds several phrasings side by side so a run can be repeated and the agreement
compared; all read the vocabulary from `dimensions.py`, so none can drift from the registry.
"""
from __future__ import annotations

from collections.abc import Callable

from tutoring_check.evaluation.dimensions import DIMENSIONS, Dimension
from tutoring_check.evaluation.transcript import Transcript

_MOVES: tuple[Dimension, ...] = DIMENSIONS


def _move_catalog_entry(d: Dimension, *, forms: bool, examples: bool) -> str:
    """Render one move: name, key, description, and whatever illustrates it."""
    lines = [f"- {d.name} [{d.key}]: {d.description}"]
    if forms and d.forms:
        lines.append(f"    Commonly appears as (not an exhaustive list): {' '.join(d.forms)}")
    if examples:
        for ex in d.examples:
            lines.append(f'    - Counts: "{ex.text}" ({ex.note})')
        for ex in d.non_examples:
            lines.append(f'    - Doesn\'t count: "{ex.text}" ({ex.note})')
    return "\n".join(lines)


def _move_catalog(*, forms: bool = True, examples: bool = True) -> str:
    """Render the moves grouped under their categories, in registry order, one blank line apart."""
    lines: list[str] = []
    current_category: str | None = None
    for d in _MOVES:
        if d.category != current_category:
            current_category = d.category
            if lines:
                lines.append("")
            lines.append(f"{current_category}")
        lines.append(_move_catalog_entry(d, forms=forms, examples=examples))
    return "\n".join(lines)


def _baseline(examples: bool = True) -> str:
    """Each move as its description plus the forms it commonly takes."""
    return f"""You are an expert annotator of tutoring dialogue.
Read the dialogue in the original language, then decide, for each move listed below, whether the tutor turn marked inside <target_turn> makes that move.
Return the keys of the moves it makes. You are describing what the tutor did, not judging how well they did it: a move made poorly is still that move.
Decide each move on its description and forms (the shapes it commonly but not always takes).

## Moves
{_move_catalog(forms=True, examples=examples)}

Return every move the marked turn makes, each at most once, using the keys exactly as written above, and read the rest of the dialogue as context only.
A `Student region:` line may precede the dialogue; it is not a turn, and says what counts as this student's own surroundings for provide_contextualization.

## Output
moves = the keys of the moves the marked turn makes; an empty list if it makes none.
"""


def _no_forms(examples: bool = True) -> str:
    """Each move as its description alone."""
    return f"""You are an expert annotator of tutoring dialogue.
Read the dialogue in the original language, then decide, for each move listed below, whether the tutor turn marked inside <target_turn> makes that move.
Return the keys of the moves it makes. You are describing what the tutor did, not judging how well they did it: a move made poorly is still that move.
Decide each move on its description.

## Moves
{_move_catalog(forms=False, examples=examples)}

Return every move the marked turn makes, each at most once, using the keys exactly as written above, and read the rest of the dialogue as context only.
A `Student region:` line may precede the dialogue; it is not a turn, and says what counts as this student's own surroundings for provide_contextualization.

## Output
moves = the keys of the moves the marked turn makes; an empty list if it makes none.
"""


def _bullets(examples: bool = True) -> str:
    """The baseline's content as terse bullets rather than prose."""
    return f"""You are an expert annotator of tutoring dialogue.
For each move listed below, decide whether the tutor turn marked inside <target_turn> makes it, and return that move's key.

## Moves
{_move_catalog(forms=True, examples=examples)}

## Rules
- Read the dialogue in its original language.
- Decide each move on its description. Forms are shapes it commonly, not always, takes.
- Describe what the tutor did, not how well: a move made poorly still counts.
- Mark the <target_turn> only. The rest of the dialogue is context.
- Return every move it makes, each at most once, keyed exactly as above.
- `Student region:` is not a turn. It says what counts as this student's own surroundings for provide_contextualization.

## Output
moves = the keys of the moves the marked turn makes; an empty list if it makes none.
"""


# Keep old entries once a run has used them, so a header's `annotator_prompt` still resolves.
PROMPT_VERSIONS: dict[str, Callable[[], str]] = {
    "v1_baseline": _baseline,
    "v2_no_forms": _no_forms,
    "v3_bullets": _bullets,
}

DEFAULT_PROMPT_VERSION = "v1_baseline"


def build_system_prompt(version: str = DEFAULT_PROMPT_VERSION) -> str:
    """The fixed annotator system prompt for `version`: tag the moves present in the marked turn."""
    try:
        return PROMPT_VERSIONS[version]()
    except KeyError:
        raise ValueError(
            f"unknown annotator prompt version {version!r}; known versions: {', '.join(PROMPT_VERSIONS)}"
        ) from None


def mark_dialogue(transcript: Transcript, target_turn_id: int) -> str:
    """Render the region and the full conversation, with `target_turn_id` wrapped in <target_turn>.

    Region is the only thing carried over from the run header; Provide Contextualization cannot be
    decided without it.
    """
    lines = [f"Student region: {transcript.region}", ""] if transcript.region else []
    lines.append("Dialogue:")
    for t in transcript.turns:
        speaker = "Tutor" if t.is_tutor else "Student"
        line = f"[{t.turn_id}] {speaker}: {t.content}"
        if t.turn_id == target_turn_id:
            line = f"<target_turn>\n{line}\n</target_turn>"
        lines.append(line)
    return "\n".join(lines)


def response_format() -> dict:
    """The structured-output schema: the keys of the moves present in the marked turn, each at most once."""
    return {
        "type": "json_schema",
        "json_schema": {
            "name": "tutoring_moves",
            "schema": {
                "type": "object",
                "properties": {
                    "moves": {
                        "type": "array",
                        "items": {"type": "string", "enum": [d.key for d in _MOVES]},
                        "uniqueItems": True,
                    }
                },
                "required": ["moves"],
                "additionalProperties": False,
            },
        },
    }


def main() -> int:
    """Print one prompt version."""
    import argparse

    parser = argparse.ArgumentParser(description="Print an annotator system prompt version.")
    parser.add_argument("--version", default=DEFAULT_PROMPT_VERSION, choices=sorted(PROMPT_VERSIONS))
    print(build_system_prompt(parser.parse_args().version))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
