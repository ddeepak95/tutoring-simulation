"""Discover annotatable transcripts and persist human annotations (annotation_tool.md "Output").

The runs tree is read-only; annotations are the live SQLite store and export to jsonl for the judge.
"""
from __future__ import annotations

import json
import os
import re
import sqlite3
from dataclasses import dataclass
from datetime import datetime, timezone
from functools import lru_cache
from itertools import combinations
from pathlib import Path

from tutoring_check.evaluation.dimensions import DIMENSIONS
from tutoring_check.evaluation.transcript import Transcript

TUTOR_DIMENSIONS = DIMENSIONS


def runs_root() -> Path:
    """The read-only tree scanned for transcripts; override with ANNOTATION_RUNS_ROOT."""
    return Path(os.environ.get("ANNOTATION_RUNS_ROOT", "runs/annotating"))


def db_path() -> Path:
    """The SQLite annotation store; override with ANNOTATION_DB (put it on a durable volume when hosted)."""
    return Path(os.environ.get("ANNOTATION_DB", "annotations.sqlite3"))


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# --- transcript discovery -------------------------------------------------


@dataclass(frozen=True)
class TranscriptRef:
    """One transcript located by its (run_set, item, run) place in the runs tree."""

    run_set: str
    item: str
    run: str
    path: Path

    @property
    def key(self) -> str:
        return f"{self.run_set}/{self.item}/{self.run}"

    @property
    def slug(self) -> str:
        """A URL-safe handle (no slashes) for routing."""
        return self.key.replace("/", "__")


def key_from_slug(slug: str) -> str:
    return slug.replace("__", "/")


def discover() -> list[TranscriptRef]:
    """Every transcript under the runs root, keyed by its first three path segments."""
    root = runs_root()
    refs: list[TranscriptRef] = []
    if not root.exists():
        return refs
    for path in sorted(root.glob("**/transcript.jsonl")):
        parts = path.relative_to(root).parts
        # Layout is run_set/item/run/<session>/transcript.jsonl, where <session>
        # is the simulator's <timestamp>_<uuid> dir; older runs omit it. Accept
        # either depth and key on the first three (run_set, item, run) segments.
        if len(parts) not in (4, 5):
            continue
        refs.append(TranscriptRef(parts[0], parts[1], parts[2], path))
    return refs


def ref_for(key: str) -> TranscriptRef | None:
    return next((r for r in discover() if r.key == key), None)


def list_run_sets() -> list[str]:
    return sorted({r.run_set for r in discover()})


def list_items(run_set: str) -> list[str]:
    return sorted({r.item for r in discover() if r.run_set == run_set})


def list_runs(run_set: str, item: str) -> list[str]:
    return sorted({r.run for r in discover() if r.run_set == run_set and r.item == item})


@lru_cache(maxsize=512)
def header_of(path_str: str) -> dict:
    """Read just the session_start header line (transcripts are immutable, so cache it)."""
    for line in Path(path_str).read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        record = json.loads(line)
        if record.get("type") == "session_start":
            return record
    return {}


def topic_label(scenario_id: str) -> str:
    return scenario_id.replace("-", " ").replace("_", " ").title()


def display_name(header: dict) -> str:
    """The human handle `<Topic> - <Language>`, e.g. `Gravity - English`."""
    return f"{topic_label(header.get('scenario_id', '?'))} - {header.get('language', '?')}"


# --- conditional-formatting polarity --------------------------------------

_POS = {"Yes", "Yes (and correct)", "Encouraging"}
_MID = {"To an extent", "Neutral"}
_NEG = {"No", "Yes (and incorrect)", "Offensive"}


def label_class(label: str | None) -> str:
    """The CSS polarity class for a label value (positive/middling/negative)."""
    if label in _POS:
        return "pos"
    if label in _MID:
        return "mid"
    if label in _NEG:
        return "neg"
    return ""


# Conservatively strip a leaked JSON closing brace right after a closing quote (annotation_tool.md "Input").
_ARTIFACT = re.compile(r'"\}\s*$')


def sanitize(text: str) -> str:
    """Clean a turn's content for display; real newlines are kept and shown via CSS."""
    return _ARTIFACT.sub('"', text or "")


# SQLite persistence 

def connect() -> sqlite3.Connection:
    conn = sqlite3.connect(db_path())
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create the annotation tables if absent."""
    with connect() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS annotation_set (
                id INTEGER PRIMARY KEY,
                transcript_key TEXT NOT NULL,
                transcript_path TEXT NOT NULL,
                scenario_id TEXT, scenario_type TEXT, region TEXT,
                language TEXT, tutor_model TEXT,
                annotator_id TEXT NOT NULL,
                created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
                UNIQUE (transcript_key, annotator_id)
            );
            CREATE TABLE IF NOT EXISTS annotation (
                set_id INTEGER NOT NULL REFERENCES annotation_set(id),
                turn_id INTEGER NOT NULL,
                kind TEXT NOT NULL,
                data TEXT NOT NULL,          -- json payload
                updated_at TEXT NOT NULL,
                PRIMARY KEY (set_id, turn_id)
            );
            """
        )


def get_or_create_set(conn: sqlite3.Connection, ref: TranscriptRef, header: dict, annotator_id: str) -> int:
    """The annotation_set row id for this (transcript, annotator), creating it on first touch."""
    row = conn.execute(
        "SELECT id FROM annotation_set WHERE transcript_key = ? AND annotator_id = ?",
        (ref.key, annotator_id),
    ).fetchone()
    if row:
        return row["id"]
    ts = now_iso()
    cur = conn.execute(
        """INSERT INTO annotation_set
           (transcript_key, transcript_path, scenario_id, scenario_type, region,
            language, tutor_model, annotator_id, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            ref.key, str(ref.path), header.get("scenario_id"), header.get("scenario_type"),
            header.get("region"), header.get("language"), header.get("tutor_model"),
            annotator_id, ts, ts,
        ),
    )
    return int(cur.lastrowid)


def load_annotations(conn: sqlite3.Connection, set_id: int) -> dict[int, dict]:
    """Map turn_id -> {kind, data} for a set."""
    rows = conn.execute(
        "SELECT turn_id, kind, data FROM annotation WHERE set_id = ?", (set_id,)
    ).fetchall()
    return {r["turn_id"]: {"kind": r["kind"], "data": json.loads(r["data"])} for r in rows}


def _upsert(conn: sqlite3.Connection, set_id: int, turn_id: int, kind: str, data: dict) -> None:
    ts = now_iso()
    conn.execute(
        """INSERT INTO annotation (set_id, turn_id, kind, data, updated_at)
           VALUES (?, ?, ?, ?, ?)
           ON CONFLICT (set_id, turn_id) DO UPDATE SET kind = excluded.kind,
               data = excluded.data, updated_at = excluded.updated_at""",
        (set_id, turn_id, kind, json.dumps(data, ensure_ascii=False), ts),
    )
    conn.execute("UPDATE annotation_set SET updated_at = ? WHERE id = ?", (ts, set_id))


def set_dimension(conn: sqlite3.Connection, set_id: int, turn_id: int, dim_key: str, value: str) -> dict:
    """Set one tutor dimension label, merging into that turn's existing labels.

    Every dimension is optional: a blank value clears that dimension rather than
    storing an empty label, so blanks never reach completion checks or aggregation.
    """
    existing = load_annotations(conn, set_id).get(turn_id, {}).get("data", {})
    labels = dict(existing.get("labels", {}))
    if value:
        labels[dim_key] = value
    else:
        labels.pop(dim_key, None)
    data = {"labels": labels, "note": existing.get("note", "")}
    _upsert(conn, set_id, turn_id, "tutor_dimensions", data)
    return data


def set_note(conn: sqlite3.Connection, set_id: int, turn_id: int, kind: str, note: str) -> dict:
    existing = load_annotations(conn, set_id).get(turn_id, {}).get("data", {})
    data = dict(existing)
    data["note"] = note
    _upsert(conn, set_id, turn_id, kind, data)
    return data


# --- completion -----------------------------------------------------------


def turn_complete(kind: str, data: dict) -> bool:
    if kind == "tutor_dimensions":
        # Every dimension is optional, so a turn counts as annotated once the
        # annotator has labelled at least one dimension that applies.
        labels = data.get("labels", {})
        return any(labels.get(d.key) for d in TUTOR_DIMENSIONS)
    return False


def conversation_status(transcript: Transcript, annotations: dict[int, dict]) -> tuple[int, int]:
    """(#complete turns, #total turns) — only tutor turns are in scope."""
    total = 0
    done = 0
    for turn in transcript.turns:
        if not turn.is_tutor:
            continue
        total += 1
        ann = annotations.get(turn.turn_id)
        if ann and turn_complete("tutor_dimensions", ann["data"]):
            done += 1
    return done, total


# --- jsonl export ---------------------------------------------------------


def export_jsonl(conn: sqlite3.Connection, ref: TranscriptRef, header: dict, annotator_id: str) -> Path:
    """Materialize a completed set as human_annotation.<annotator>.jsonl next to the transcript."""
    set_id = get_or_create_set(conn, ref, header, annotator_id)
    annotations = load_annotations(conn, set_id)
    out_path = ref.path.parent / f"human_annotation.{annotator_id}.jsonl"
    lines = [
        {
            "timestamp": now_iso(),
            "scenario_id": header.get("scenario_id"),
            "scenario_type": header.get("scenario_type"),
            "region": header.get("region"),
            "language": header.get("language"),
            "tutor_model": header.get("tutor_model"),
            "annotator_id": annotator_id,
            "transcript_path": str(ref.path),
        }
    ]
    for turn_id in sorted(annotations):
        ann = annotations[turn_id]
        data, kind = ann["data"], ann["kind"]
        record = {"kind": kind, "turn_id": turn_id, "note": data.get("note", "")}
        if kind == "tutor_dimensions":
            record["labels"] = data.get("labels", {})
        lines.append(record)
    out_path.write_text(
        "\n".join(json.dumps(line, ensure_ascii=False) for line in lines) + "\n",
        encoding="utf-8",
    )
    return out_path


# --- interrater reliability -----------------------------------------------
#
# Agreement is computed from the committed human_annotation.<annotator>.jsonl exports,
# not the SQLite store: the db is gitignored and local to one machine, so only the
# exports carry every annotator's work once they are merged across computers.


def percent_agreement(pairs: list[tuple[str, str]]) -> float | None:
    """Raw fraction of aligned label pairs the two raters agree on, or None when empty."""
    if not pairs:
        return None
    return sum(a == b for a, b in pairs) / len(pairs)


def cohens_kappa(pairs: list[tuple[str, str]]) -> float | None:
    """Two-rater Cohen's kappa over aligned label pairs, chance-corrected.

    Returns the observed-minus-expected agreement scaled by its headroom,
    `(po - pe) / (1 - pe)`.
    Returns None when undefined: no pairs, or perfect expected agreement
    (`pe == 1`, i.e. both raters used a single constant label).
    """
    n = len(pairs)
    if n == 0:
        return None
    po = sum(a == b for a, b in pairs) / n
    labels_a: dict[str, int] = {}
    labels_b: dict[str, int] = {}
    for a, b in pairs:
        labels_a[a] = labels_a.get(a, 0) + 1
        labels_b[b] = labels_b.get(b, 0) + 1
    pe = sum((labels_a.get(k, 0) / n) * (labels_b.get(k, 0) / n) for k in set(labels_a) | set(labels_b))
    if pe == 1:
        return None
    return (po - pe) / (1 - pe)


def read_export(path: Path) -> tuple[dict, list[dict]]:
    """Parse a human_annotation.*.jsonl export into its (header, records).

    The first non-blank line is the session header; the rest are per-turn records.
    """
    header: dict = {}
    records: list[dict] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        record = json.loads(line)
        if not header and "annotator_id" in record and "kind" not in record:
            header = record
        else:
            records.append(record)
    return header, records


def _agreement(pairs: list[tuple[str, str]]) -> dict:
    """Count, percent agreement, and Cohen's kappa for one set of aligned label pairs."""
    return {"n": len(pairs), "agree": percent_agreement(pairs), "kappa": cohens_kappa(pairs)}


def _slot_keys(slot: dict):
    """Every (run, turn_id) key an annotator touched, across dimensions."""
    keys: set = set()
    for marks in slot["dims"].values():
        keys |= set(marks)
    return keys


def language_dimension_distribution(run_set: str) -> dict:
    """Tutor-dimension label averages-per-annotator grouped by transcript language.

    Counts each annotator's tutor_dimensions labels separately (per language, per
    dimension), then averages across the annotators who covered that language, so
    languages with uneven annotator coverage stay comparable. Descriptive, not an
    agreement measure.
    """
    root = runs_root()
    base = root / run_set
    # language -> dim_key -> annotator -> label -> count
    counts: dict[str, dict[str, dict[str, dict[str, int]]]] = {}
    for path in sorted(base.glob("**/human_annotation.*.jsonl")):
        header, records = read_export(path)
        language = header.get("language") or "?"
        annotator = header.get("annotator_id") or path.stem.split(".", 1)[-1]
        lang_counts = counts.setdefault(language, {})
        for rec in records:
            if rec.get("kind") != "tutor_dimensions":
                continue
            for key, label in rec.get("labels", {}).items():
                if not label:
                    continue
                annot_counts = lang_counts.setdefault(key, {}).setdefault(annotator, {})
                annot_counts[label] = annot_counts.get(label, 0) + 1

    languages = sorted(counts)
    rows = []
    for d in TUTOR_DIMENSIONS:
        by_language = {}
        for lang in languages:
            per_annotator = counts[lang].get(d.key, {})
            n_annotators = len(per_annotator)
            totals = {label: sum(a.get(label, 0) for a in per_annotator.values()) for label in d.labels}
            by_language[lang] = {
                "n_annotators": n_annotators,
                "labels": [
                    {"label": label,
                     "avg": (totals[label] / n_annotators) if n_annotators else None}
                    for label in d.labels
                ],
            }
        rows.append({"dimension": d, "by_language": by_language})
    return {"languages": languages, "rows": rows}


def interrater_run_set(run_set: str) -> dict:
    """Interrater reliability for one run set, broken down per topic item.

    Reads the per-annotator jsonl exports under the run set, pools each item's turns
    across its runs, and compares annotators pairwise on each tutor dimension.
    """
    root = runs_root()
    base = root / run_set
    # item -> annotator -> {"dims": {dim_key: {(run, tid): label}}, "header": dict}
    items: dict[str, dict[str, dict]] = {}
    for path in sorted(base.glob("**/human_annotation.*.jsonl")):
        parts = path.relative_to(root).parts  # run_set / item / run / [...] / file
        if len(parts) < 3:
            continue
        item, run = parts[1], parts[2]
        header, records = read_export(path)
        annotator = header.get("annotator_id") or path.stem.split(".", 1)[-1]
        slot = items.setdefault(item, {}).setdefault(
            annotator, {"dims": {}, "header": header}
        )
        for rec in records:
            tid = rec.get("turn_id")
            if rec.get("kind") == "tutor_dimensions":
                for key, label in rec.get("labels", {}).items():
                    slot["dims"].setdefault(key, {})[(run, tid)] = label

    result_items = []
    for item in sorted(items):
        annotators = sorted(items[item])
        pairs_out = []
        for a, b in combinations(annotators, 2):
            sa, sb = items[item][a], items[item][b]
            dim_out = {}
            for d in TUTOR_DIMENSIONS:
                ma, mb = sa["dims"].get(d.key, {}), sb["dims"].get(d.key, {})
                dim_pairs = [(ma[k], mb[k]) for k in ma if k in mb]
                dim_out[d.key] = _agreement(dim_pairs)
            runs_a = {run for run, _ in _slot_keys(sa)}
            runs_b = {run for run, _ in _slot_keys(sb)}
            n_transcripts = len(runs_a & runs_b)
            pairs_out.append(
                {"a": a, "b": b, "n_transcripts": n_transcripts, "dimensions": dim_out}
            )
        header = next((items[item][a]["header"] for a in annotators if items[item][a]["header"]), {})
        result_items.append(
            {"item": item, "display": display_name(header) if header else item,
             "annotators": annotators, "pairs": pairs_out}
        )
    return {"run_set": run_set, "items": result_items}
