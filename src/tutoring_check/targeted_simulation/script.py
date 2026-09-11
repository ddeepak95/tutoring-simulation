"""One script = the hand-authored context that precedes a target turn (docs/target_turns.md §2).
Loaded from `data/scripts/<language_id>/<script_id>.json`.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

_DATA_DIR = Path(__file__).resolve().parents[3] / "data"


@dataclass(frozen=True)
class Turn:
    speaker: str        # "tutor" or "student"
    text: str


@dataclass(frozen=True)
class Script:
    script_id: str
    language_id: str
    topic_id: str
    region_id: str
    conversation: list[Turn]     # the authored context; the target turn is what comes after it


class ScriptError(ValueError):
    """A script that would not produce a well-formed request."""


def _validate(script: Script, source: Path) -> None:
    """The cut point is implied by the shape, so the shape is checked instead of stored.
    Turns alternate tutor-first and end on a student turn, which puts the target turn next.
    """
    turns = script.conversation
    if not turns:
        raise ScriptError(f"{source}: conversation is empty")
    for i, turn in enumerate(turns):
        expected = "tutor" if i % 2 == 0 else "student"
        if turn.speaker != expected:
            raise ScriptError(
                f"{source}: turn {i} is {turn.speaker!r}, expected {expected!r}; turns must "
                "alternate tutor-first"
            )
        if not turn.text.strip():
            raise ScriptError(f"{source}: turn {i} has no text")
    if turns[-1].speaker != "student":
        raise ScriptError(
            f"{source}: conversation ends on a tutor turn; it must end on a student turn so the "
            "target turn is the tutor's"
        )


def load_script(script_id: str, language_id: str, scripts_root: Path | None = None) -> Script:
    path = (scripts_root or _DATA_DIR / "scripts") / language_id / f"{script_id}.json"
    if not path.exists():
        raise ScriptError(f"no script at {path}")
    raw = json.loads(path.read_text(encoding="utf-8"))

    # The ids in the file are checked against the ones asked for: a script copied to a new language
    # directory without editing them would otherwise run silently under the wrong label.
    for field, want in (("script_id", script_id), ("language_id", language_id)):
        if raw.get(field) != want:
            raise ScriptError(f"{path}: {field} is {raw.get(field)!r}, expected {want!r}")

    script = Script(
        script_id=raw["script_id"],
        language_id=raw["language_id"],
        topic_id=raw["topic_id"],
        region_id=raw.get("region_id", ""),
        conversation=[Turn(speaker=t["speaker"], text=t["text"]) for t in raw["conversation"]],
    )
    _validate(script, path)
    return script
