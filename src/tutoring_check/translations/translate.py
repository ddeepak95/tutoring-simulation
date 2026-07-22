"""Translate simulated conversations, per a translate-set JSON.

The input is the `transcript.jsonl` written by the simulator: one file is one
conversation, and one conversation is the unit of translation. Each translation is
written beside its source, and a translation that already exists is skipped, so a
re-run only fills gaps. Translation follows a Translate -> Evaluate -> Refine
self-refinement loop (https://aclanthology.org/2025.findings-naacl.218.pdf).

The job is declared in one JSON file (default data/translations/translate_set.json),
mirroring data/run_set.json. Run it with:

    uv run python -m tutoring_check.translations.translate --run-dir runs/dialogic/run_set_<mmddHHMM>
"""
from __future__ import annotations

import argparse
import concurrent.futures
import shutil
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.translations.config import (
    DEFAULT_TRANSLATE_SET,
    TranslateSet,
    load_translate_set,
)
from tutoring_check.translations.pipeline import translate_transcript
from tutoring_check.translations.transcript import translated_path

MAX_WORKERS = 8


def run(ts: TranslateSet) -> None:
    # A translation that is already on disk is its own record that the job is done.
    pending = [
        (transcript, lang, mode)
        for transcript, lang, mode in ts.jobs
        if not translated_path(ts.run_dir / transcript, lang, mode).exists()
    ]
    skipped = len(ts.jobs) - len(pending)
    print(f"model={ts.model}  max_refine_iters={ts.max_refine_iters}  "
          f"{len(pending)} transcripts to translate ({skipped} already done)")

    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        futures = {
            pool.submit(translate_transcript, transcript, lang, mode, ts): (transcript, lang, mode)
            for transcript, lang, mode in pending
        }
        for future in concurrent.futures.as_completed(futures):
            transcript, lang, mode = futures[future]
            try:
                print(f"wrote {future.result().relative_to(ts.run_dir)}")
            except Exception as e:
                print(f"FAILED: {transcript} -> {lang}/{mode}: {e}")


def main():
    parser = argparse.ArgumentParser(description="Translate simulated conversations per a translate-set JSON.")
    parser.add_argument("--translate-set", type=Path, default=DEFAULT_TRANSLATE_SET,
                        help="Path to the translate-set JSON (default: data/translations/translate_set.json).")
    parser.add_argument("--run-dir", type=Path, required=True,
                        help="Simulation run folder holding the transcripts. Translations are written beside their source.")
    args = parser.parse_args()

    load_dotenv()
    ts = load_translate_set(args.translate_set, args.run_dir)
    # Keep the spec alongside its outputs, so the run stays self-describing.
    shutil.copy2(args.translate_set, ts.run_dir / Path(args.translate_set).name)
    print(f"outputs -> {ts.run_dir}")
    run(ts)


if __name__ == "__main__":
    main()
