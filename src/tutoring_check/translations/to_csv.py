"""Export transcript.jsonl files to single-column text CSVs for reading in a spreadsheet.

Each transcript's dialogue turns become one content line each, dropping the speaker
label and the session_start/session_end control lines. The content is written
unquoted, one turn per line, so it pastes straight into a Google Sheets column.
Every transcript*.jsonl under the run folder is converted, so originals and their
translations both get a CSV beside them. Run it with:

    uv run python -m tutoring_check.translations.to_csv --run-dir runs/dialogic/run_set_<mmddHHMM>
"""
from __future__ import annotations

import argparse
from pathlib import Path

from tutoring_check.translations.transcript import load_transcript


def transcript_to_csv(source: Path) -> Path:
    """Write one transcript's turn contents as a single unquoted text column beside it, returning that path."""
    _, turns = load_transcript(source)
    out_path = source.with_suffix(".csv")
    with open(out_path, "w", newline="", encoding="utf-8-sig") as out:
        for turn in turns:
            out.write(" ".join(turn["content"].splitlines()) + "\n")
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
