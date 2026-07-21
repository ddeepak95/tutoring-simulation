"""CLI: expand the run-set into cells x repeats and run each, resume-safe (spec §1, §9).
A cell whose transcript already exists on disk is skipped, so adding a model/topic only fills gaps.
"""
from __future__ import annotations

import argparse
import asyncio
import shutil
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.simulation.catalog import load_catalogs, load_run_set, resolve_model_ref
from tutoring_check.simulation.session import run_session


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run the state-driven tutoring simulator.")
    parser.add_argument("--run-set", type=Path, default=Path("data/run_set.json"))
    parser.add_argument("--item-id", type=str, default=None, help="Run only this run_set entry id.")
    parser.add_argument("--tutor-model", type=str, default=None, help="Override the tutor model for every run (models.json id or litellm string).")
    parser.add_argument("--student-model", type=str, default=None, help="Override the student model for every run (models.json id or litellm string).")
    parser.add_argument("--tutor-reasoning", type=str, default=None, help="Override the tutor reasoning_effort (e.g. low/medium/high) for every run.")
    parser.add_argument("--student-reasoning", type=str, default=None, help="Override the student reasoning_effort (e.g. low/medium/high) for every run.")
    parser.add_argument("--out", type=Path, default=Path("runs"))
    parser.add_argument(
        "--concurrency",
        type=int,
        default=4,
        help="Max cells (item_id x repeat) to run in parallel. Use 1 for sequential.",
    )
    return parser


async def run(args: argparse.Namespace) -> int:
    load_dotenv()
    # Each run_set item carries its own config, models, prompt, and repeat count
    # (resolved from the JSON catalogs in the same dir as --run-set).
    runs = load_run_set(args.run_set)
    # A --tutor-model/--student-model override still resolves through the catalog, so an
    # overridden model keeps its own litellm_params (e.g. a region-pinned vertex_location).
    cat = load_catalogs(args.run_set.parent)
    tutor_override = resolve_model_ref(args.tutor_model, cat) if args.tutor_model else None
    student_override = resolve_model_ref(args.student_model, cat) if args.student_model else None
    if args.item_id:
        runs = [r for r in runs if r.item_id == args.item_id]
        if not runs:
            raise ValueError(f"No run_set entry matched --item-id '{args.item_id}'")

    # Write outputs directly under --out; the caller picks a distinct --out per
    # run-set so outputs from different run-sets don't collide.
    out_root = args.out
    out_root.mkdir(parents=True, exist_ok=True)
    # Keep a copy of the run-set alongside its outputs so each run is self-describing.
    shutil.copy2(args.run_set, out_root / args.run_set.name)
    # Each cell writes to its own out_dir with no shared state, so cells run concurrently;
    # a semaphore caps how many hit the API at once (--concurrency, 1 = sequential).
    sem = asyncio.Semaphore(max(1, args.concurrency))

    async def run_cell(r, rep: int, cell: Path) -> None:
        async with sem:
            tutor_model, tutor_params = tutor_override or (r.tutor_model, r.tutor_model_params)
            student_model, student_params = student_override or (r.student_model, r.student_model_params)
            out_dir = await run_session(
                r.config,
                tutor_model=tutor_model,
                student_model=student_model,
                tutor_reasoning=args.tutor_reasoning or r.tutor_reasoning,
                student_reasoning=args.student_reasoning or r.student_reasoning,
                tutor_model_params=tutor_params,
                student_model_params=student_params,
                output_root=cell,
            )
            print(f"completed item_id={r.item_id} r{rep} output_dir={out_dir}")

    tasks = []
    for r in runs:
        for rep in range(r.repeats):
            cell = out_root / r.item_id / f"r{rep}"
            if (cell / "transcript.jsonl").exists():
                print(f"skip (exists) item_id={r.item_id} r{rep}")
                continue
            tasks.append(run_cell(r, rep, cell))
    await asyncio.gather(*tasks)
    return 0


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return asyncio.run(run(args))


if __name__ == "__main__":
    raise SystemExit(main())
