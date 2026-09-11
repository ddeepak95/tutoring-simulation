"""CLI: expand a target run set into cells and fill each one, resume-safe.
Cells run in parallel; the repeats inside a cell run in order, so `responses.jsonl` stays ordered.
"""
from __future__ import annotations

import argparse
import asyncio
import shutil
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.simulation.catalog import reasoning_not_honoured
from tutoring_check.targeted_simulation.runset import Cell, load_target_run_set
from tutoring_check.targeted_simulation.target import completed_repeats, run_cell


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Sample target turns against prewritten scripts.")
    parser.add_argument("--run-set", type=Path, default=Path("data/target_run_set.json"))
    parser.add_argument("--scripts", type=Path, default=None, help="Script root (default data/scripts).")
    parser.add_argument("--out", type=Path, default=Path("runs/targets"))
    parser.add_argument("--script-id", type=str, default=None, help="Run only cells for this script.")
    parser.add_argument("--repeats", type=int, default=None, help="Override the run set's repeat count.")
    parser.add_argument("--concurrency", type=int, default=4, help="Max cells in flight at once.")
    return parser


def cell_dir(out_root: Path, cell: Cell) -> Path:
    return out_root / cell.script.script_id / cell.script.language_id / cell.tutor_model_id


async def run(args: argparse.Namespace) -> int:
    load_dotenv()
    cells = load_target_run_set(args.run_set, args.scripts)
    if args.script_id:
        cells = [c for c in cells if c.script.script_id == args.script_id]
        if not cells:
            raise ValueError(f"no cell matched --script-id {args.script_id!r}")
    if args.repeats:
        for c in cells:
            c.repeats = args.repeats

    # Warning that a reasoning setting is not supported by the provider
    warned: set[str] = set()
    for c in cells:
        msg = reasoning_not_honoured(c.tutor_model, c.tutor_reasoning)
        if msg and msg not in warned:
            warned.add(msg)
            print(f"WARNING: {msg}")

    out_root = args.out
    out_root.mkdir(parents=True, exist_ok=True)
    shutil.copy2(args.run_set, out_root / args.run_set.name)

    sem = asyncio.Semaphore(max(1, args.concurrency))

    async def fill(cell: Cell) -> None:
        async with sem:
            out_dir = await run_cell(cell, output_root=cell_dir(out_root, cell), concurrency=args.concurrency)
            print(f"completed {out_dir}")

    tasks = []
    for c in cells:
        done = completed_repeats(cell_dir(out_root, c))
        if done >= c.repeats:
            print(f"skip (complete) {cell_dir(out_root, c)}")
            continue
        if done:
            print(f"resume ({done}/{c.repeats}) {cell_dir(out_root, c)}")
        tasks.append(fill(c))
    await asyncio.gather(*tasks)
    return 0


def main() -> int:
    args = build_parser().parse_args()
    return asyncio.run(run(args))


if __name__ == "__main__":
    raise SystemExit(main())
