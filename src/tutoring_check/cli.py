"""CLI: expand the run-set into cells x repeats and run each, resume-safe (spec §1, §9).
A cell whose transcript already exists on disk is skipped, so adding a model/topic only fills gaps.
"""
from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.simulation.catalog import load_run_set
from tutoring_check.simulation.session import run_session


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run the state-driven tutoring simulator.")
    parser.add_argument("--run-set", type=Path, default=Path("data/run_set.json"))
    parser.add_argument("--item-id", type=str, default=None, help="Run only this run_set entry id.")
    parser.add_argument("--tutor-model", type=str, default=None, help="Override the tutor model for every run.")
    parser.add_argument("--student-model", type=str, default=None, help="Override the student model for every run.")
    parser.add_argument("--out", type=Path, default=Path("runs"))
    return parser


async def run(args: argparse.Namespace) -> int:
    load_dotenv()
    # Each run_set item carries its own config, models, prompt, and repeat count
    # (resolved from the JSON catalogs in the same dir as --run-set).
    runs = load_run_set(args.run_set.parent)
    if args.item_id:
        runs = [r for r in runs if r.item_id == args.item_id]
        if not runs:
            raise ValueError(f"No run_set entry matched --item-id '{args.item_id}'")

    args.out.mkdir(parents=True, exist_ok=True)
    for r in runs:
        tutor_model = args.tutor_model or r.tutor_model
        student_model = args.student_model or r.student_model
        for rep in range(r.repeats):
            cell = args.out / r.item_id / f"r{rep}"
            if list(cell.glob("*/transcript.jsonl")):
                print(f"skip (exists) item_id={r.item_id} r{rep}")
                continue
            out_dir = await run_session(
                r.config,
                tutor_model=tutor_model,
                student_model=student_model,
                output_root=cell,
            )
            print(f"completed item_id={r.item_id} r{rep} output_dir={out_dir}")
    return 0


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return asyncio.run(run(args))


if __name__ == "__main__":
    raise SystemExit(main())
