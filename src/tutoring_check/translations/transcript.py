"""Reading and writing the simulator's transcript.jsonl.
Turns cross the model as a JSON array, so alignment rides on array position, not invented markers.
"""
from __future__ import annotations

import json
from pathlib import Path

from tutoring_check.translations.model import ParseError

# Control lines in a transcript carry no dialogue turn.
CONTROL_TYPES = ("session_start", "session_end")

# response_format schema pinning the translation to a JSON array of turn strings,
# so the provider returns clean JSON and parsing is a plain json.loads.
TURNS_SCHEMA = {
    "type": "json_schema",
    "json_schema": {
        "name": "translated_turns",
        "schema": {"type": "array", "items": {"type": "string"}},
    },
}


def load_transcript(path: Path) -> tuple[list[dict], list[dict]]:
    """Split a transcript.jsonl into its control lines and its dialogue turns, in file order."""
    control, turns = [], []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        obj = json.loads(line)
        (control if obj.get("type") in CONTROL_TYPES else turns).append(obj)
    if not turns:
        raise ValueError(f"no dialogue turns in {path}")
    return control, turns


def flatten_turns(turns: list[dict]) -> str:
    """Render the turns' content as a JSON array of strings."""
    return json.dumps([turn["content"] for turn in turns], ensure_ascii=False)


def parse_turns(raw: str, expected: int) -> list[str]:
    """Read the translated JSON array back into `expected` turn strings.
    Raises when it is not a JSON array of exactly `expected` strings, so a merged, dropped, or reordered translation fails loudly rather than misaligning.
    """
    try:
        turns = json.loads(raw)
    except json.JSONDecodeError as e:
        raise ParseError(f"invalid JSON: {e}") from e
    if not isinstance(turns, list) or len(turns) != expected or not all(isinstance(t, str) for t in turns):
        raise ParseError(f"expected {expected} strings, got {turns!r}")
    return turns


def translated_path(source: Path, target_lang: str, mode: str) -> Path:
    """Beside the source, suffixed with the language and mode; its existence marks the job done.
    The mode is in the name because the two modes are different renderings of the same
    conversation into the same language, so they must not overwrite each other.
    e.g. gravity-en/r0/transcript.jsonl -> gravity-en/r0/transcript_Mandarin_Chinese_code_mixed.jsonl
    """
    slug = target_lang.replace(" ", "_")
    return source.with_name(f"{source.stem}_{slug}_{mode}{source.suffix}")


def write_transcript(
    path: Path, control: list[dict], turns: list[dict], target_lang: str, mode: str, refine_iters: int
) -> None:
    """Write a translated transcript.jsonl, recording the language, mode, and refinement count on its session_start."""
    path.parent.mkdir(parents=True, exist_ok=True)
    by_type = {c.get("type"): c for c in control}

    lines: list[dict] = []
    if start := by_type.get("session_start"):
        lines.append({**start, "target_lang": target_lang, "mode": mode, "refine_iters": refine_iters})
    lines.extend(turns)
    if end := by_type.get("session_end"):
        lines.append(end)

    with open(path, "w", encoding="utf-8") as out:
        for obj in lines:
            out.write(json.dumps(obj, ensure_ascii=False) + "\n")
