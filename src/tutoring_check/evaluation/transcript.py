"""Read a simulator `transcript.jsonl` into typed records for evaluation (evaluation.md "Inputs and Outputs"). """
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Turn:
    """One spoken turn. `state` is the student's dynamic-state label and is None on tutor turns."""

    turn_id: int
    speaker: str  # "tutor" | "student"
    content: str
    state: str | None = None

    @property
    def is_tutor(self) -> bool:
        return self.speaker == "tutor"


@dataclass(frozen=True)
class Transcript:
    """One conversation: the labels identifying which run it came from and the ordered turns."""

    path: Path
    scenario_id: str
    scenario_type: str
    region: str
    language: str
    tutor_model: str
    turns: tuple[Turn, ...]

    def tutor_turns(self) -> tuple[Turn, ...]:
        """The turns to score (evaluation.md: only `speaker == tutor` is evaluated)."""
        return tuple(t for t in self.turns if t.is_tutor)


def load_transcript(path: Path) -> Transcript:
    """Parse `transcript.jsonl` at `path`. Raise ValueError if elements are missing."""
    header: dict | None = None
    turns: list[Turn] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        record = json.loads(line)
        line_type = record.get("type")
        if line_type == "session_start":
            header = record
        elif line_type == "session_end":
            continue
        else:
            turns.append(
                Turn(
                    turn_id=record["turn_id"],
                    speaker=record["speaker"],
                    content=record["content"],
                    state=record.get("state"),
                )
            )

    if header is None:
        raise ValueError(f"no session_start header in {path}")
    if not turns:
        raise ValueError(f"no turns in {path}")

    return Transcript(
        path=path,
        scenario_id=header["scenario_id"],
        scenario_type=header["scenario_type"],
        region=header["region"],
        language=header["language"],
        tutor_model=header["tutor_model"],
        turns=tuple(turns),
    )
