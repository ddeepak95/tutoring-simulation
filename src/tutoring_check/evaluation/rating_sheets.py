"""Read the hand-rating spreadsheets exported from the shared annotation sheet.

Each file holds one rater's codes for one conversation, under a two-row header: row 1 groups columns
under a parent category and row 2 names the leaf, so row 2 is the row that identifies a dimension.
Only tutor turns are rated, and a sheet carries no turn ids, so a sheet is aligned to a run by matching
its Content column against the run's transcript; the transcript's turn ids are then the coded units.
Matching on text rather than on filename is what makes a sheet-vs-judge comparison trustworthy: a
mislabelled file would otherwise silently contrast two different conversations.
"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

from tutoring_check.evaluation.dimensions import SCALES_MAP, dimension_keys, scale_keys
from tutoring_check.evaluation.reliability import CodeKey

# Leaf label in the sheet's second header row -> binary dimension key. The sheet's wording is kept
# close to the raters' own column names so they are not asked to re-learn the vocabulary.
# Labels are matched case-insensitively, since the raters' capitalisation drifts between sheets.
SHEET_LABELS: dict[str, str] = {
    "Eliciting Knowledge": "eliciting_knowledge",
    "Reasoning/ Justification": "eliciting_reasoning",
    "Real-world Application": "eliciting_application",
    "Follow-up Probing": "follow_up_probing",
    "Understanding Checkpoint": "understanding_checkpoint",
    "Hinting": "hinting",
    "Explaining": "explaining",
    "Planning ahead": "planning_ahead",
    "Reflecting on Process": "reflecting_back",
    "Cultural/Regional Grounding": "cultural_regional_grounding",
}

# Leaf label -> ordinal scale key. The affective scale is rated as an integer in this column.
SHEET_SCALE_LABELS: dict[str, str] = {
    "Positive Tone": "affective_tone",
}

TRUTHY = {"TRUE", "1", "YES"}
FALSY = {"FALSE", "0", "NO", ""}


def rater_name(path: Path) -> str:
    """The rater a sheet belongs to, taken from the trailing token of its filename.

    Filenames look like `... - et-en-deepak.csv`; the rater is the last dash-separated token.
    """
    slug = path.stem.rsplit(" - ", 1)[-1]
    name = slug.rsplit("-", 1)[-1].strip().lower()
    if not name:
        raise ValueError(f"{path}: cannot read a rater name from the filename")
    return name


def _normalise(text: str) -> str:
    """Collapse whitespace so a spreadsheet round-trip cannot fail an otherwise exact text match."""
    return re.sub(r"\s+", " ", text).strip()


def load_transcripts(runs_dir: Path, *, language_file: str = "transcript.jsonl") -> dict[str, dict[int, tuple[str, str]]]:
    """Every scenario's turns under `runs_dir`, as scenario -> turn_id -> (speaker, content).

    Reads the untranslated `transcript.jsonl`, since the hand-rated sheets are of the English runs.
    """
    out: dict[str, dict[int, tuple[str, str]]] = {}
    for path in sorted(runs_dir.rglob(language_file)):
        scenario = path.parent.parent.name
        turns: dict[int, tuple[str, str]] = {}
        for line in path.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            row = json.loads(line)
            if "turn_id" not in row:
                continue
            turns[row["turn_id"]] = (row["speaker"], _normalise(row["content"]))
        if turns:
            out[scenario] = turns
    return out


def read_sheet(path: Path) -> tuple[list[str], list[tuple[str, str, dict[str, str]]]]:
    """Split a sheet into its leaf labels and its rows of (role, content, label -> raw value)."""
    rows = list(csv.reader(path.open(encoding="utf-8-sig")))
    if len(rows) < 3:
        raise ValueError(f"{path}: expected two header rows and at least one turn")
    # Match column labels case-insensitively; the raters' capitalisation drifts between sheets.
    # TODO: drop the .lower() and match exactly once the sheets are cleaned up to one capitalisation.
    labels = [label.strip().lower() for label in rows[1][2:]]
    records = []
    for row in rows[2:]:
        if not row or not row[0].strip():
            continue
        values = {label: (row[2 + i].strip() if 2 + i < len(row) else "") for i, label in enumerate(labels)}
        records.append((row[0].strip(), _normalise(row[1]), values))
    return [label for label in labels if label], records


def _speaker(role: str) -> str:
    """Map a sheet's role label to the transcript's speaker name (Teacher/Tutor -> tutor)."""
    # TODO: the sheets say "Teacher" while the transcripts say "tutor"; standardise on one term and
    # drop this mapping once the sheets are cleaned up.
    return "tutor" if role.lower().startswith(("teach", "tutor")) else "student"


def match_scenario(records: list[tuple[str, str, dict[str, str]]], transcripts: dict[str, dict[int, tuple[str, str]]]) -> str:
    """The scenario whose transcript the sheet's rows reproduce, by exact text on every row.

    A sheet may stop short of the transcript's last turns, so the sheet's rows must be a prefix of the
    transcript; anything else means the two are not the same conversation.
    """
    candidates = []
    for scenario, turns in transcripts.items():
        if all(
            turn in turns and turns[turn][1] == content and turns[turn][0] == _speaker(role)
            for turn, (role, content, _) in enumerate(records)
        ):
            candidates.append(scenario)
    if not candidates:
        raise ValueError(
            "no scenario in the run set reproduces this sheet's turns; "
            f"its first turn reads {records[0][1][:80]!r}"
        )
    if len(candidates) > 1:
        raise ValueError(f"sheet matches more than one scenario ({', '.join(candidates)}); cannot align it")
    return candidates[0]


def load_sheet(
    path: Path, transcripts: dict[str, dict[int, tuple[str, str]]], *, language: str
) -> tuple[str, dict[CodeKey, list[int]], dict[CodeKey, list[int]]]:
    """One sheet's tutor-turn ratings, keyed like judge codes.

    Returns the scenario it was matched to, a 0/1 vector over `dimension_keys()` for each tutor turn,
    and an integer vector over `scale_keys()` for each tutor turn.
    Columns the rubric does not name (e.g. the language-quality ratings) are ignored; every binary
    dimension and scale column must be present, since a coder is meant to have coded the full rubric.
    """
    labels, records = read_sheet(path)
    scenario = match_scenario(records, transcripts)

    # Sheet labels are already lower-cased by read_sheet, so match the rubric's labels case-insensitively.
    binary = {label.lower(): key for label, key in SHEET_LABELS.items()}
    scale = {label.lower(): key for label, key in SHEET_SCALE_LABELS.items()}
    missing = [label for label in (*binary, *scale) if label not in labels]
    if missing:
        raise ValueError(f"{path}: missing rating columns {missing}; the sheet's rubric does not match the current one")

    keys = list(dimension_keys())
    skeys = list(scale_keys())
    codes: dict[CodeKey, list[int]] = {}
    scales: dict[CodeKey, list[int]] = {}
    for turn, (role, _, values) in enumerate(records):
        if not role.lower().startswith("teach"):
            continue
        vector = [0] * len(keys)
        for label, key in binary.items():
            raw = values[label].upper()
            if raw in TRUTHY:
                vector[keys.index(key)] = 1
            elif raw not in FALSY:
                raise ValueError(f"{path}: unreadable value {values[label]!r} in column {label!r} on turn {turn}")
        codes[(scenario, language, turn)] = vector
        scales[(scenario, language, turn)] = [_read_scale(values[label], key, path, turn) for label, key in scale.items()]

    return scenario, codes, scales


def _read_scale(raw: str, key: str, path: Path, turn: int) -> int:
    """Parse one ordinal rating, checking it is an integer within the scale's allowed values."""
    allowed = SCALES_MAP[key].values()
    try:
        value = int(raw)
    except ValueError:
        raise ValueError(f"{path}: unreadable {key} rating {raw!r} on turn {turn}; expected one of {allowed}") from None
    if value not in allowed:
        raise ValueError(f"{path}: {key} rating {value} on turn {turn} is outside the allowed range {allowed}")
    return value


def load_sheets(
    paths: list[Path], transcripts: dict[str, dict[int, tuple[str, str]]], *, language: str
) -> tuple[dict[str, dict[CodeKey, list[int]]], dict[str, dict[CodeKey, list[int]]]]:
    """Every sheet's codes and scale ratings, each grouped by rater.

    Two sheets from one rater cover different scenarios, so they merge; the same rater coding one
    scenario twice is a mistake in the sheet set and raises.
    """
    by_rater: dict[str, dict[CodeKey, list[int]]] = {}
    scales_by_rater: dict[str, dict[CodeKey, list[int]]] = {}
    for path in sorted(paths):
        rater = rater_name(path)
        scenario, codes, scales = load_sheet(path, transcripts, language=language)
        bucket = by_rater.setdefault(rater, {})
        clash = set(bucket) & set(codes)
        if clash:
            raise ValueError(f"{path}: rater {rater!r} already has codes for {scenario}; two sheets cover the same conversation")
        bucket.update(codes)
        scales_by_rater.setdefault(rater, {}).update(scales)
    return by_rater, scales_by_rater
