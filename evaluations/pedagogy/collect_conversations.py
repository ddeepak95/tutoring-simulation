"""Collect simulator transcripts under a run directory into a conversations.jsonl.

Walks <run_dir>/<item_id>/r<rep>/transcript.jsonl, renders each transcript as
"Student: ...\nTeacher: ..." text (same format as runs/convolearn/run_set_07081515/
conversations.jsonl), and labels each row with the part of the item id after
"-en-" (e.g. "gravity-en-acvh-cevl" -> "acvh-cevl", "gravity-en-ac-vh" -> "ac-vh").

Usage:
    uv run python evaluations/pedagogy/collect_conversations.py runs/contrast/<run_set_dir>
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def render(transcript_path: Path) -> str:
    lines = []
    for line in transcript_path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        rec = json.loads(line)
        if rec.get("type") in ("session_start", "session_end"):
            continue
        speaker = "Teacher" if rec["speaker"] == "tutor" else "Student"
        lines.append(f"{speaker}: {rec['content']}")
    if not lines:
        raise ValueError(f"no turns in {transcript_path}")
    return "\n".join(lines)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("run_dir", type=Path, help="Run output dir (the --out passed to the simulator).")
    ap.add_argument("--out", type=Path, default=None, help="Output path (default: <run_dir>/conversations.jsonl).")
    args = ap.parse_args()

    out = args.out or args.run_dir / "conversations.jsonl"
    rows = []
    for t in sorted(args.run_dir.glob("*/r*/transcript.jsonl")):
        item_id = t.parents[1].name
        label = item_id.split("-en-", 1)[1] if "-en-" in item_id else item_id
        rows.append({"label": label, "text": render(t)})
    if not rows:
        raise SystemExit(f"no transcripts found under {args.run_dir}")

    with open(out, "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"wrote {len(rows)} conversations to {out}")


if __name__ == "__main__":
    main()
