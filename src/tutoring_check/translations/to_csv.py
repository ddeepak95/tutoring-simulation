"""Export transcript.jsonl files to two-column CSVs for reading in a spreadsheet.

Each transcript's dialogue turns become rows of (speaker, content), skipping the
session_start/session_end control lines. Every transcript*.jsonl under the run
folder is converted, so originals and their translations both get a CSV beside them.
The CSV opens directly in Google Sheets or pastes straight into a sheet. Run it with:

    uv run python -m tutoring_check.translations.to_csv --run-dir runs/dialogic/run_set_<mmddHHMM>
"""
from __future__ import annotations

import argparse
import csv
from pathlib import Path

from tutoring_check.translations.transcript import load_transcript


def transcript_to_csv(source: Path) -> Path:
    """Write one transcript's turns as a (speaker, content) CSV beside it, returning that path."""
    _, turns = load_transcript(source)
    out_path = source.with_suffix(".csv")
    with open(out_path, "w", newline="", encoding="utf-8-sig") as out:
        writer = csv.writer(out)
        writer.writerow(["speaker", "content"])
        writer.writerows((turn["speaker"], turn["content"]) for turn in turns)
    return out_path


def run(run_dir: Path) -> None:
    transcripts = sorted(run_dir.rglob("transcript*.jsonl"))
    print(f"{len(transcripts)} transcript(s) under {run_dir}")
    for source in transcripts:
        print(f"wrote {transcript_to_csv(source).relative_to(run_dir)}")


def main():
    parser = argparse.ArgumentParser(description="Export transcript.jsonl files to two-column CSVs.")
    parser.add_argument("--run-dir", type=Path, required=True,
                        help="Simulation run folder holding the transcripts. CSVs are written beside their source.")
    args = parser.parse_args()

    if not args.run_dir.is_dir():
        parser.error(f"--run-dir does not exist: {args.run_dir}")
    run(args.run_dir.resolve())


if __name__ == "__main__":
    main()
