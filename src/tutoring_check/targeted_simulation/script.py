"""One script = the hand-authored request that precedes a target turn (docs/target_turns.md §2).
Loaded from `data/scripts-messages/<language_id>/<script_id>.json`.
The file is the request: its `messages` are sent as they stand, with only `{region}` and `{language}`
filled into the system message from the catalogs, so the system prompt is never translated.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from tutoring_check.simulation.catalog import Catalogs, load_catalogs

_DATA_DIR = Path(__file__).resolve().parents[3] / "data"
SCRIPTS_DIR_NAME = "scripts-messages"

SYSTEM = "system"
TUTOR = "assistant"
STUDENT = "user"


@dataclass(frozen=True)
class Message:
    role: str           # SYSTEM, TUTOR or STUDENT
    content: str


@dataclass(frozen=True)
class Script:
    script_id: str
    language_id: str
    topic_id: str
    region_id: str
    language: str                       # catalog name, substituted into the system message
    region: str
    messages: list[Message]             # as authored: messages[0] is the system one, then the turns
    request: list[dict[str, str]]       


class ScriptError(ValueError):
    """A script that would not produce a well-formed request."""


def _validate(messages: list[Message], source: Path) -> None:
    """The cut point is implied by the shape, so the shape is checked instead of stored.
    A system message, then turns alternating tutor-first and ending on a student turn, which puts
    the target turn next.
    """
    if not messages or messages[0].role != SYSTEM:
        raise ScriptError(f"{source}: the first message must be the {SYSTEM!r} one")
    dialogue = messages[1:]
    if not dialogue:
        raise ScriptError(f"{source}: there are no turns after the system message")
    for i, message in enumerate(dialogue):
        expected = TUTOR if i % 2 == 0 else STUDENT
        if message.role != expected:
            raise ScriptError(
                f"{source}: turn {i} is {message.role!r}, expected {expected!r}; turns must "
                "alternate tutor-first"
            )
        if not message.content.strip():
            raise ScriptError(f"{source}: turn {i} has no content")
    if dialogue[-1].role != STUDENT:
        raise ScriptError(
            f"{source}: the conversation ends on a {TUTOR!r} turn; it must end on a {STUDENT!r} "
            "one so the target turn is the tutor's"
        )


def fill(content: str, *, language: str, region: str) -> str:
    """Substitute the two run variables. Braces elsewhere in a prompt are ordinary text, so the
    names are replaced rather than formatted.
    """
    return content.replace("{language}", language).replace("{region}", region)


def _lookup(table: dict[str, dict], key: str, label: str) -> dict:
    try:
        return table[key]
    except KeyError:
        raise ScriptError(f"unknown {label} {key!r}; known: {sorted(table)}") from None


def load_script(
    script_id: str,
    language_id: str,
    scripts_root: Path | None = None,
    cat: Catalogs | None = None,
) -> Script:
    path = (scripts_root or _DATA_DIR / SCRIPTS_DIR_NAME) / language_id / f"{script_id}.json"
    if not path.exists():
        raise ScriptError(f"no script at {path}")
    raw = json.loads(path.read_text(encoding="utf-8"))

    # The ids in the file are checked against the ones asked for: a script copied to a new language
    # directory without translating it would otherwise run silently under the wrong label.
    for field, want in (("script_id", script_id), ("language_id", language_id)):
        if raw.get(field) != want:
            raise ScriptError(f"{path}: {field} is {raw.get(field)!r}, expected {want!r}")

    cat = cat or load_catalogs(_DATA_DIR)
    region_id = raw.get("region_id", "")
    language = _lookup(cat.languages, language_id, "language_id")["name"]
    region = _lookup(cat.regions, region_id, "region_id")["name"] if region_id else ""

    messages = [Message(role=m["role"], content=m["content"]) for m in raw["messages"]]
    _validate(messages, path)
    return Script(
        script_id=raw["script_id"],
        language_id=raw["language_id"],
        topic_id=raw["topic_id"],
        region_id=region_id,
        language=language,
        region=region,
        messages=messages,
        # Only the system message carries variables; a turn is authored text either way.
        request=[
            {
                "role": m.role,
                "content": fill(m.content, language=language, region=region)
                if m.role == SYSTEM
                else m.content,
            }
            for m in messages
        ],
    )