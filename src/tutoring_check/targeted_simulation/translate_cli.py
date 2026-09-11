"""CLI: translate every target cell's sampled turns into English (docs/target_turns.md §6).
Run between sampling and scoring; the scorer picks up `responses_en.jsonl` when it is there.
"""
from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.simulation.catalog import resolve_model_ref
from tutoring_check.targeted_simulation.evaluate import TRANSLATED_NAME, read_cell
from tutoring_check.targeted_simulation.evaluate_cli import find_cells
from tutoring_check.targeted_simulation.translate import translate_cell, translated_repeats
from tutoring_check.targeted_simulation.target import RESPONSES_NAME
from tutoring_check.translations.prompts import MODES, CODE_MIXED


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Translate sampled target turns into English for scoring.")
    parser.add_argument("--runs", type=Path, default=Path("runs/targets"), help="Root dir to traverse for cells.")
    parser.add_argument("--translator-model", type=str, required=True, help="Translator model: a models.json id or a litellm model string.")
    parser.add_argument("--script-id", type=str, default=None, help="Translate only cells for this script.")
    parser.add_argument("--concurrency", type=int, default=4, help="Max cells in flight at once.")
    parser.add_argument(
        "--mode",
        type=str,
        default=CODE_MIXED,
        choices=sorted(MODES),
        help="Which kind of source this is: whether its subject matter is carried in English.",
    )
    parser.add_argument(
        "--max-refine-iters",
        type=int,
        default=1,
        help="Refinement passes the TEaR loop may apply per turn.",
    )
    return parser


async def run(args: argparse.Namespace) -> int:
    load_dotenv()
    cells = find_cells(args.runs, args.script_id)
    if not cells:
        raise ValueError(f"no cell with a {RESPONSES_NAME} found under {args.runs}")

    translator_model, translator_params = resolve_model_ref(args.translator_model)
    sem = asyncio.Semaphore(max(1, args.concurrency))

    async def translate(cell_dir: Path) -> None:
        async with sem:
            await translate_cell(
                cell_dir,
                model=translator_model,
                mode=args.mode,
                model_params=translator_params,
                max_refine_iters=args.max_refine_iters,
            )
            print(f"translated {cell_dir / TRANSLATED_NAME}")

    tasks = []
    for cell_dir in cells:
        done = translated_repeats(cell_dir)
        sampled = {r["repeat"] for r in read_cell(cell_dir, prefer_english=False)[1]}
        if sampled <= done:
            print(f"skip (complete) {cell_dir}")
            continue
        if done:
            print(f"resume ({len(done)}/{len(sampled)}) {cell_dir}")
        tasks.append(translate(cell_dir))
    await asyncio.gather(*tasks)
    return 0


def main() -> int:
    args = build_parser().parse_args()
    return asyncio.run(run(args))


if __name__ == "__main__":
    raise SystemExit(main())
